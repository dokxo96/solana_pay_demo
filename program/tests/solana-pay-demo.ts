import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { SolanaPayDemo } from "../target/types/solana_pay_demo";

describe("solana-pay-demo", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaPayDemo as Program<SolanaPayDemo>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
