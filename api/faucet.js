import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { createTransferCheckedInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, getAccount } from "@solana/spl-token";
import bs58 from "bs58";

const DEVNET_RPC = "https://api.devnet.solana.com";
const KIBBLE_MINT = new PublicKey("AdFbAWmDHU3Sbo9LJGaZApsQxRUdRfjb2FAkiXfFPRtv");

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { recipient } = req.body;
    if (!recipient) return res.status(400).json({ success: false, error: "Recipient required" });

    const pkEnv = process.env.FAUCET_PRIVATE_KEY;
    if (!pkEnv) return res.status(500).json({ success: false, error: "FAUCET_PRIVATE_KEY missing" });

    let secretKey;
    if (pkEnv.trim().startsWith("[")) {
      secretKey = Uint8Array.from(JSON.parse(pkEnv));
    } else {
      secretKey = bs58.decode(pkEnv.trim());
    }

    const payer = Keypair.fromSecretKey(secretKey);
    const recipientPubkey = new PublicKey(recipient);
    const connection = new Connection(DEVNET_RPC, "confirmed");

    const transaction = new Transaction();

    // 1. SOL Transfer (0.005 SOL)
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: recipientPubkey,
        lamports: 5000000,
      })
    );

    // 2. KIBBLE Transfer (100 Token) ve Hesap Kontrolü
    const sourceATA = await getAssociatedTokenAddress(KIBBLE_MINT, payer.publicKey);
    const recipientATA = await getAssociatedTokenAddress(KIBBLE_MINT, recipientPubkey);

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

    const { blockhash } = await connection.getLatestBlockhash("confirmed");
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payer.publicKey;
    
    // Gerçek imza ve ağa gönderim
    const txSig = await sendAndConfirmTransaction(connection, transaction, [payer], {
      commitment: "confirmed"
    });

    return res.status(200).json({ success: true, solSig: txSig });
  } catch (err) {
    console.error("Transfer error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
