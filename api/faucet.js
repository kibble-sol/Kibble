const { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } = require("@solana/web3.js");
const { createTransferCheckedInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, getAccount, TOKEN_2022_PROGRAM_ID } = require("@solana/spl-token");
const bs58 = require("bs58");
const http = require("http");

const PORT = process.env.PORT || 3000;
const DEVNET_RPC = "https://api.devnet.solana.com";
const KIBBLE_MINT = new PublicKey("AdFbAWmDHU3Sbo9LJGaZApsQxRUdRfjb2FAkiXfFPRtv");

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url === "/api/faucet" && req.method === "POST") {
    let body = "";
    req.on("data", chunk => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);
        const recipient = data.recipient;

        if (!recipient) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "Recipient address required" }));
          return;
        }

        const privateKeyStr = process.env.FAUCET_PRIVATE_KEY;
        if (!privateKeyStr) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: false, error: "FAUCET_PRIVATE_KEY is missing on Render." }));
          return;
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

        // 1. SOL Transferi (0.005 SOL = 5,000,000 Lamports)
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: recipientPubkey,
            lamports: 5000000,
          })
        );

        // 2. Token-2022 ATA (Associated Token Account) Adresleri
        const sourceATA = await getAssociatedTokenAddress(KIBBLE_MINT, payer.publicKey, false, TOKEN_2022_PROGRAM_ID);
        const recipientATA = await getAssociatedTokenAddress(KIBBLE_MINT, recipientPubkey, false, TOKEN_2022_PROGRAM_ID);

        try {
          await getAccount(connection, recipientATA, "confirmed", TOKEN_2022_PROGRAM_ID);
        } catch (e) {
          transaction.add(
            createAssociatedTokenAccountInstruction(
              payer.publicKey,
              recipientATA,
              recipientPubkey,
              KIBBLE_MINT,
              TOKEN_2022_PROGRAM_ID
            )
          );
        }

        // Token-2022 transfer kontrolü (9 decimals, 100 token)
        transaction.add(
          createTransferCheckedInstruction(
            sourceATA,
            KIBBLE_MINT,
            recipientATA,
            payer.publicKey,
            100 * 10**9,
            9,
            [],
            TOKEN_2022_PROGRAM_ID
          )
        );

        const txSig = await sendAndConfirmTransaction(connection, transaction, [payer], {
          commitment: "confirmed",
          skipPreflight: false,
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
          success: true,
          solSig: txSig,
          message: "0.005 SOL and 100 KIBBLE successfully dispatched from vault!"
        }));

      } catch (err) {
        console.error("Faucet execution error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: false, error: err.message }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Faucet server running on port ${PORT}`);
});
