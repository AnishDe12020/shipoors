import {
  bundlrStorage,
  findMetadataPda,
  keypairIdentity,
  Metaplex,
  toMetaplexFile,
} from "@metaplex-foundation/js";
import {
  DataV2,
  createCreateMetadataAccountV2Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import { createMint } from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { readFileSync, writeFileSync } from "fs";
import { initializeKeypair } from "./initializeKeypair";

const TOKEN_NAME = "SHIP";
const TOKEN_SYMBOL = "SHIP";
const TOKEN_DESCRIPTION = "A token for shippoors";
const TOKEN_IMAGE_PATH = "tokens/ship/assets/rickroll.gif";
const TOKEN_IMAGE_NAME = "rickroll.gif";
const TOKEN_DECIMALS = 2;

const createShipToken = async (conn: Connection, payer: Keypair) => {
  const tokenMint = await createMint(
    conn,
    payer,
    payer.publicKey,
    payer.publicKey,
    TOKEN_DECIMALS
  );

  const metaplex = Metaplex.make(conn)
    .use(keypairIdentity(payer))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );

  const imageBuffer = readFileSync(TOKEN_IMAGE_PATH);
  const file = toMetaplexFile(imageBuffer, TOKEN_IMAGE_NAME);
  const imageUri = await metaplex.storage().upload(file);

  const { uri } = await metaplex
    .nfts()
    .uploadMetadata({
      name: TOKEN_NAME,
      description: TOKEN_DESCRIPTION,
      image: imageUri,
    })
    .run();

  const metadataPda = findMetadataPda(tokenMint);

  const tokenMetadata = {
    name: TOKEN_NAME,
    symbol: TOKEN_SYMBOL,
    uri,
    sellerFeeBasisPoints: 0,
    creators: null,
    uses: null,
    collection: null,
  } as DataV2;

  const instruction = createCreateMetadataAccountV2Instruction(
    {
      metadata: metadataPda,
      mint: tokenMint,
      mintAuthority: payer.publicKey,
      updateAuthority: payer.publicKey,
      payer: payer.publicKey,
    },
    {
      createMetadataAccountArgsV2: {
        data: tokenMetadata,
        isMutable: true,
      },
    }
  );

  const transaction = new Transaction();
  transaction.add(instruction);

  const sig = await sendAndConfirmTransaction(conn, transaction, [payer]);
  console.log(
    `$SHIP Token Transaction: https://explorer.solana.com/tx/${sig}?cluster=devnet`
  );

  writeFileSync(
    "tokens/ship/cache.json",
    JSON.stringify({
      mint: tokenMint.toBase58(),
      imageUri: imageUri,
      metadataUri: uri,
      tokenMetadata: metadataPda.toBase58(),
      metadataTransaction: sig,
    })
  );
};

const main = async () => {
  const connection = new Connection(clusterApiUrl("devnet"));
  const payer = await initializeKeypair(connection);

  await createShipToken(connection, payer);
};

main()
  .then(() => {
    console.log("Finished successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
