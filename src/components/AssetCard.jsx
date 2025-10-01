import React, { useState } from "react";
import * as blockchain from '../services/blockchain';
import { Connection } from "@solana/web3.js";

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
    }
}