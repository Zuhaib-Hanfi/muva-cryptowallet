import React, { useState } from "react";
import * as blockchain from '../services/blockchain';
import { Connection } from "@solana/web3.js";
import { signature } from "bitcoinjs-lib/src/script";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function AssetCard({ coin, balance, onTransactionSuccess }) {
    if (!coin) return null;

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSend = async (e) => {
        e.preventDefault();
        setSending(true);
        setMessage('');
        setError('');

        try {
            if (coin.symbol === 'ETH' || coin.symbol === 'BTC') {
                const txHash = coin.symbol === 'ETH'
                    ? await blockchain.sendEth(coin.privateKey, recipient, amount)
                    : await blockchain.sendBtc(coin.privateKey, recipient, parseFloat(amount));

                setMessage(`Success! Tx: ${txHash.substring(0, 10)}...`);
                resetFormAndRefresh();
            }
            else if(coin.symbol==='SOL'){
                const signature =await blockchain.sendSol(coin.privateKey,recipient,parseFloat(amount));
                setMessage(`Transaction sent! Confirming...`);
                await pollForSolanaConfirmation(signature);
            }
        }
        catch(err){
            setError(`Error: ${err.message}`);
            setSending(false);
        }
    };

    const pollForSolanaCOnfirmation=async (signature)=>{
        const solscanLink=`https://solscan.io/tx/${signature}`;
        const connection=new Connection(blockchain.SOL_RPC_URL);
        let confirmed=false;

        for(let i=0;i<30;i++){
            const status =await connection.getSignatureStatus(signature,{searchTransactionHistory:true});
            if(status && status.value && (status.value.confirmationStatus === 'confirmed' || status.value.confirmationStatus ==='finalized')){
                setMessage(<span>Success! <a href={solscanLink} traget="_blank" rel="noopener noreferrer" className="link link-primary">View on Solscan</a></span>);
                confirmed=true;
                resetFormAndRefresh();
                break;
            }
            await sleep(2000);
        }
        if(!confirmed){
            setError(<span>Confirmation timed out. <a href={solscanLink} target="_black" rel="noopener noreferrer" className="link link-error">Check Solscan</a></span>);
            setSending(false);
        }
    };

    const resetFormAndRefresh =()=>{
        setRecipient('');
        setAmount('');
        setSending(false);
        if(onTransactionSuccess) onTransactionSuccess();
    }

    const copyToClipboard=(text)=>{
        navigatior.clipboard.writeText(text);
        alert('Address Copied!!');
    }


    return(
        <div>
            
        </div>
    )
}