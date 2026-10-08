import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
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
    const { recipient, blockhash } = req.body;
    if (!recipient || !blockhash) {
      return res.status(400).json({ success: false, error: "Recipient and blockhash required" });
    }

    const privateKeyStr = process.env.FAUCET_PRIVATE_KEY;
    if (!privateKeyStr) {
      return res.status(500).json({ success: false, error: "FAUCET_PRIVATE_KEY is not configured on Vercel." });
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
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = payer.publicKey;

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: recipientPubkey,
        lamports: 5000000, // 0.005 SOL
      })
    );

    transaction.sign(payer);
    const signedTxBase64 = transaction.serialize().toString("base64");

    return res.status(200).json({
      success: true,
      signedTxBase64,
      message: "Transaction signed successfully by Kibble Faucet vault!"
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
