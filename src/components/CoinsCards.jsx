import React, { useState } from "react";
import { Copy, Send, QrCode, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
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
    const [showSendForm, setShowSendForm] = useState(false);

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
            else if (coin.symbol === 'SOL') {
                const signature = await blockchain.sendSol(coin.privateKey, recipient, parseFloat(amount));
                setMessage(`Transaction sent! Confirming...`);
                await pollForSolanaConfirmation(signature);
            }
        }
        catch (err) {
            setError(`Error: ${err.message}`);
            setSending(false);
        }
    };

    const pollForSolanaConfirmation = async (signature) => {
        const solscanLink = `https://solscan.io/tx/${signature}`;
        const connection = new Connection(blockchain.SOL_RPC_URL);
        let confirmed = false;

        for (let i = 0; i < 30; i++) {
            const status = await connection.getSignatureStatus(signature, { searchTransactionHistory: true });
            if (status && status.value && (status.value.confirmationStatus === 'confirmed' || status.value.confirmationStatus === 'finalized')) {
                setMessage(<span>Success! <a href={solscanLink} target="_blank" rel="noopener noreferrer" className="underline font-black">View on Solscan</a></span>);
                confirmed = true;
                resetFormAndRefresh();
                break;
            }
            await sleep(2000);
        }
        if (!confirmed) {
            setError(<span>Confirmation timed out. <a href={solscanLink} target="_blank" rel="noopener noreferrer" className="underline font-black">Check Solscan</a></span>);
            setSending(false);
        }
    };

    const resetFormAndRefresh = () => {
        setRecipient('');
        setAmount('');
        setSending(false);
        setShowSendForm(false);
        if (onTransactionSuccess) onTransactionSuccess();
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setMessage('Address Copied!');
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <div className='bg-white border-4 md:border-8 border-black p-4 md:p-6 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all'>
            
            {/* Coin Header */}
            <div className='mb-4 pb-4 border-b-4 border-black'>
                <h3 className='text-2xl md:text-3xl font-black uppercase'>{coin.symbol}</h3>
                <p className='text-xs md:text-sm font-bold text-gray-600 uppercase'>{coin.name}</p>
            </div>

            {/* Balance Display */}
            <div className='bg-black text-white p-3 md:p-4 border-2 md:border-4 border-black mb-4'>
                <p className='text-xs font-black uppercase mb-1'>Balance</p>
                <p className='text-2xl md:text-3xl font-black'>
                    {balance == null ? (
                        <span className='inline-flex items-center gap-2'>
                            <Loader2 className='w-5 h-5 md:w-6 md:h-6 animate-spin' />
                            Loading...
                        </span>
                    ) : (
                        `${parseFloat(balance).toFixed(6)}`
                    )}
                </p>
                <p className='text-xs md:text-sm font-bold mt-1 text-gray-300'>{coin.symbol}</p>
            </div>

            {/* Address Section */}
            <div className='border-2 md:border-4 border-black p-3 mb-4 bg-white'>
                <p className='text-xs font-black uppercase mb-2'>Your Address</p>
                <div className='flex gap-2'>
                    <div className='flex-1 font-mono text-xs font-bold break-all bg-gray-100 p-2 border-2 border-black'>
                        {coin.address}
                    </div>
                    <button 
                        onClick={() => copyToClipboard(coin.address)}
                        className='bg-black text-white p-2 border-2 border-black hover:bg-white hover:text-black transition-all flex-shrink-0'
                        title='Copy Address'
                    >
                        <Copy className='w-4 h-4' />
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className='grid grid-cols-2 gap-2 md:gap-3 mb-4'>
                <button 
                    onClick={() => setShowSendForm(!showSendForm)}
                    className='bg-black text-white py-2 md:py-3 font-black text-xs md:text-sm uppercase border-2 md:border-4 border-black hover:bg-white hover:text-black transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-center gap-2'
                >
                    <Send className='w-3 h-3 md:w-4 md:h-4' />
                    Send
                    {showSendForm ? <ChevronUp className='w-3 h-3' /> : <ChevronDown className='w-3 h-3' />}
                </button>
                <button 
                    className='bg-white text-black py-2 md:py-3 font-black text-xs md:text-sm uppercase border-2 md:border-4 border-black hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-center gap-2'
                >
                    <QrCode className='w-3 h-3 md:w-4 md:h-4' />
                    Receive
                </button>
            </div>

            {/* Send Form - Collapsible */}
            {showSendForm && (
                <div className='border-4 border-black bg-gray-50 p-3 md:p-4 mb-4'>
                    <div className='bg-black text-white px-3 py-1 -mt-6 md:-mt-7 mb-4 w-fit'>
                        <p className='text-xs font-black uppercase'>Send {coin.symbol}</p>
                    </div>

                    <div className='mb-3'>
                        <label className='block text-xs font-black uppercase mb-2'>Recipient Address</label>
                        <input 
                            type="text" 
                            placeholder="Enter recipient address" 
                            value={recipient} 
                            onChange={(e) => setRecipient(e.target.value)} 
                            required 
                            className='w-full p-2 md:p-3 border-2 md:border-4 border-black font-mono text-xs font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-xs font-black uppercase mb-2'>Amount</label>
                        <input 
                            type="text" 
                            placeholder="0.00" 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                            required 
                            className='w-full p-2 md:p-3 border-2 md:border-4 border-black font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
                        />
                    </div>

                    <button 
                        onClick={handleSend}
                        disabled={sending || !recipient || !amount} 
                        className='w-full bg-black text-white py-3 font-black text-sm uppercase border-2 md:border-4 border-black hover:bg-white hover:text-black disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 disabled:shadow-none disabled:translate-x-0 disabled:translate-y-0 flex items-center justify-center gap-2'
                    >
                        {sending && <Loader2 className='w-4 h-4 animate-spin' />}
                        {sending ? 'Sending...' : `Send ${coin.symbol}`}
                    </button>
                </div>
            )}

            {/* Success Message */}
            {message && (
                <div className='bg-black text-white p-3 border-2 md:border-4 border-black mb-2'>
                    <p className='text-xs md:text-sm font-bold'>✓ {message}</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className='bg-white border-2 md:border-4 border-black p-3 overflow-hidden'>
                    <p className='text-xs md:text-sm font-bold text-black'>✗ {error}</p>
                </div>
            )}
        </div>
    );
}

export default AssetCard;