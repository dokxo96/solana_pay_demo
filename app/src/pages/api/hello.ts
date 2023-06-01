// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next'

type GetData = {
  label: string
  icon:String
}

type PostData = {
  transaction: string
  message:String
}
let methods:String[]=["GET","POST","PUT","DELETE"];

function get(req:NextApiRequest,res:NextApiResponse<GetData>){

  const label ="solana pay demo";
  const icon ="https://solana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogotype.e4df684f.svg&w=384&q=75";

  res.status(200).send({label,icon});

}

async function    post(req:NextApiRequest, res:NextApiResponse<PostData>) 
{
  const accountField=req.body?.account;
  if(!accountField) throw new Error(`No account field''`);
  const sender = new PublicKey(accountField);

//Build the transaction
const ix = SystemProgram.transfer({
  fromPubkey: sender,
  toPubkey: new PublicKey("2DL7TkTJXaZHY7NbYHYWje1pbufF3mpbtLc1V26WFGiM"),
  lamports: 133700000
});
const transaction = new Transaction();

transaction.add(ix);
const connection = new Connection("https://api.devnet.solana.com");
const bh =await connection.getLatestBlockhash();
transaction.recentBlockhash=bh.blockhash;
transaction.feePayer=sender;
//Serialize the transaction
 const serializedTX= transaction.serialize({
   verifySignatures:false,
   requireAllSignatures:false,
 });

 const base64transaction = serializedTX.toString("base64");
 const message= "hellow"; 

 res.status(200).send({ tx : base64transaction,message});
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetData>
) {
  if(req.method=="GET"){
    console.log("🚀 ~ file: hello.ts:13 ~ req:GET method")
    get(req,res);
  }
  else  if(req.method=="POST"){
    console.log("🚀 ~ file: hello.ts:13 ~ req:POST method")
    
  }
  
}
