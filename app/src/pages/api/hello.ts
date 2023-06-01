// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}
let methods:String[]=["GET","POST","PUT","DELETE"];
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method=="GET"){
    console.log("🚀 ~ file: hello.ts:13 ~ req:GET method")
    
  }
  else  if(req.method=="POST"){
    console.log("🚀 ~ file: hello.ts:13 ~ req:POST method")
    
  }
  res.status(200).json({ name: 'John Doe' })
}
