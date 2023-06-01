// Next, React
import { FC, useEffect, useState,useRef } from 'react';
import Link from 'next/link';

// Wallet
import { useWallet, useConnection } from '@solana/wallet-adapter-react';

// Components
import { RequestAirdrop } from '../../components/RequestAirdrop';
import pkg from '../../../package.json';

// Store
import useUserSOLBalanceStore from '../../stores/useUserSOLBalanceStore';

// Solana pay
import { createQR } from "@solana/pay";

export const BasicPayView: FC = ({ }) => {
  const wallet = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance)
  const { getUserSOLBalance } = useUserSOLBalanceStore()
  const QrRf= useRef<HTMLDivElement>();
  const solana_url="solana:https://solana-pay-demo-phi.vercel.app/api/hello";
  const qr = createQR(solana_url,360,'white','black');
  //set the generated solana qr on a ref element
  if(QrRf.current){

    QrRf.current.innerHTML='';
    qr.append(QrRf.current);
  }
  useEffect(() => {
    if (wallet.publicKey) {
      console.log(wallet.publicKey.toBase58())
      getUserSOLBalance(wallet.publicKey, connection)
    }
  }, [wallet.publicKey, connection, getUserSOLBalance])

  return (

    <div className="md:hero mx-auto p-4">
      <div className="md:hero-content flex flex-col">
        <div className='mt-6'>
        {/* <div className='text-sm font-normal align-bottom text-right text-slate-600 mt-4'>v{pkg.version}</div> */}
        <h1 className="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-br from-indigo-500 to-fuchsia-500 mb-4">
          Solana Pay
        </h1>
        </div>
       <div ref={QrRf} />
        
      </div>
    </div>
  );
};
