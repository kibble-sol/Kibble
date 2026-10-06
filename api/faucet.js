import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import bs58 from "bs58";

const DEVNET_RPC = "https://api.devnet.solana.com";

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
      return res.status(400).json({ error: "Recipient address required" });
    }

    const privateKeyStr = process.env.FAUCET_PRIVATE_KEY;
    if (!privateKeyStr) {
      return res.status(500).json({ error: "FAUCET_PRIVATE_KEY is not configured on Vercel." });
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

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: recipientPubkey,
        lamports: 5000000, // 0.005 SOL
      })
    );

    const solSig = await sendAndConfirmTransaction(connection, tx, [payer]);

    return res.status(200).json({
      success: true,
      solSig,
      message: "0.005 SOL successfully dispatched from Kibble Faucet!"
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
