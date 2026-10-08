import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { createTransferCheckedInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, getAccount } from "@solana/spl-token";
import bs58 from "bs58";

const DEVNET_RPC = "https://api.devnet.solana.com";
const KIBBLE_MINT = new PublicKey("AdFbAWmDHU3Sbo9LJGaZApsQxRUdRfjb2FAkiXfFPRtv");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { recipient } = req.body;
    if (!recipient) {
      return res.status(400).json({ success: false, error: "Recipient address required" });
    }

    const privateKeyStr = process.env.FAUCET_PRIVATE_KEY;
    if (!privateKeyStr) {
      return res.status(500).json({ success: false, error: "FAUCET_PRIVATE_KEY is missing on Vercel." });
    }

    let secretKey;
    if (privateKeyStr.trim().startsWith("[")) {
      secretKey = Uint8Array.from(JSON.parse(privateKeyStr));
    } else {
      secretKey = bs58.decode(privateKeyStr.trim());
    }

    const payer = Keypair.fromSecretKey(secretKey);
    const recipientPubkey = new PublicKey(recipient);
    const connection = new Connection(DEVNET_RPC, "confirmed");

    const transaction = new Transaction();

    // 1. SOL Transferi (0.005 SOL)
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: recipientPubkey,
        lamports: 5000000,
      })
    );

    // 2. $KIBBLE (Token-2022) Hesap Kontrolü ve Transferi
    const sourceATA = await getAssociatedTokenAddress(KIBBLE_MINT, payer.publicKey);
    const recipientATA = await getAssociatedTokenAddress(KIBBLE_MINT, recipientPubkey);

    // Alıcının Token-2022 hesabı var mı kontrol ediyoruz, yoksa işlem içine oluşturma talimatı ekliyoruz
    try {
      await getAccount(connection, recipientATA, "confirmed");
    } catch (e) {
      transaction.add(
        createAssociatedTokenAccountInstruction(
          payer.publicKey,
          recipientATA,
          recipientPubkey,
          KIBBLE_MINT
        )
      );
    }

    // $KIBBLE Transfer Talimatı (100 Token, 9 decimals)
    transaction.add(
      createTransferCheckedInstruction(
        sourceATA,
        KIBBLE_MINT,
        recipientATA,
        payer.publicKey,
        100 * 10**9,
        9
      )
    );

    const txSig = await sendAndConfirmTransaction(connection, transaction, [payer], {
      commitment: "confirmed",
      skipPreflight: false,
    });

    return res.status(200).json({
      success: true,
      solSig: txSig,
      message: "0.005 SOL and 100 KIBBLE successfully dispatched from vault!"
    });

  } catch (err) {
    console.error("Faucet execution error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
