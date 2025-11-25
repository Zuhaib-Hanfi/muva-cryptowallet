import React, { useState, useEffect, useRef } from "react";
import { Copy, Send, QrCode, ChevronDown, ChevronUp, Loader2, X } from 'lucide-react';
import * as blockchain from '../services/blockchain';
import { Connection } from "@solana/web3.js";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// QR Code generation function
const generateQRCode = (text, size = 200) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Simple QR-like pattern (for demo - in production use a proper QR library)
    const qrSize = 21; // Standard QR code is 21x21 modules for version 1
    const moduleSize = size / qrSize;

    canvas.width = size;
    canvas.height = size;

    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);

    // Create a simple pattern based on the address
    ctx.fillStyle = 'black';
    const hash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    for (let y = 0; y < qrSize; y++) {
        for (let x = 0; x < qrSize; x++) {
            // Create pseudo-random pattern based on position and hash
            const val = (x * y + hash + x + y) % 3;
            if (val === 0 || (x < 3 && y < 3) || (x > qrSize - 4 && y < 3) || (x < 3 && y > qrSize - 4)) {
                ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
            }
        }
    }

    return canvas.toDataURL();
};

function AssetCard({ coin, balance, onTransactionSuccess }) {
    if (!coin) return null;

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showSendForm, setShowSendForm] = useState(false);
    const [showReceiveModal, setShowReceiveModal] = useState(false);
    const [qrCodeDataUrl, setQrCodeDataUrl] = useState('');
    const modalRef = useRef(null);
    const cardRef = useRef(null);

    // Generate QR code when modal opens
    useEffect(() => {
        if (showReceiveModal && coin.address) {
            const qrCode = generateQRCode(coin.address, 240);
            setQrCodeDataUrl(qrCode);
        }
    }, [showReceiveModal, coin.address]);

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowReceiveModal(false);
            }
        };

        if (showReceiveModal) {
            document.addEventListener('mousedown', handleClickOutside);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.body.style.overflow = 'unset';
            };
        }
    }, [showReceiveModal]);

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

    const handleReceiveClick = () => {
        setShowReceiveModal(true);
        setShowSendForm(false); // Close send form if open
    };

    return (
        <>
            <div
                ref={cardRef}
                className='bg-white border-4 md:border-8 border-black p-4 md:p-6 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200'
            >

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
                        onClick={handleReceiveClick}
                        className='bg-white text-black py-2 md:py-3 font-black text-xs md:text-sm uppercase border-2 md:border-4 border-black hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] md:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center justify-center gap-2'
                    >
                        <QrCode className='w-3 h-3 md:w-4 md:h-4' />
                        Receive
                    </button>
                </div>

                {/* Send Form - Collapsible */}
                {showSendForm && (
                    <div className='border-4 border-black bg-gray-50 p-3 md:p-4 mb-4 animate-slideDown'>
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
                                className='w-full p-2 md:p-3 border-2 md:border-4 border-black font-mono text-xs font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-white'
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
                                className='w-full p-2 md:p-3 border-2 md:border-4 border-black font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-white'
                            />
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={sending || !recipient || !amount}
                            className='w-full bg-black text-white py-3 font-black text-sm uppercase border-2 md:border-4 border-black hover:bg-white hover:text-black disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed transition-all disabled:shadow-none flex items-center justify-center gap-2'
                        >
                            {sending && <Loader2 className='w-4 h-4 animate-spin' />}
                            {sending ? 'Sending...' : `Send ${coin.symbol}`}
                        </button>
                    </div>
                )}

                {/* Success Message */}
                {message && (
                    <div className='bg-black text-white p-3 border-2 md:border-4 border-black mb-2 shadow-sm shadow-green-500 '>
                        <p className='text-xs md:text-sm font-bold'>✓ {message}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    
                    <div className='flex flex-wrap justify-center items-center bg-white border-2 md:border-4 border-black p-3 overflow-hidden shadow-sm shadow-red-500 '>
                         <p className='text-xs md:text-sm font-bold text-black'>✗ {error}</p>
                      
                    </div>
                )}

            </div>


            {/* Receive Modal - Rendered outside card to prevent layout issues */}
            {showReceiveModal && (
                <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 overflow-y-auto' style={{ margin: 0 }}>
                    <div ref={modalRef} className='bg-white border-4 md:border-8 border-black p-4 md:p-6 max-w-md w-full shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] relative my-auto'>
                        {/* Close Button */}
                        <button
                            onClick={() => setShowReceiveModal(false)}
                            className='absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-black text-white p-2 border-2 md:border-4 border-black hover:bg-white hover:text-black transition-all z-10'
                        >
                            <X className='w-4 h-4 md:w-5 md:h-5' />
                        </button>

                        {/* Modal Header */}
                        <div className='border-b-2 md:border-b-4 border-black pb-3 md:pb-4 mb-3 md:mb-4'>
                            <h3 className='text-xl md:text-2xl lg:text-3xl font-black uppercase'>Receive {coin.symbol}</h3>
                            <p className='text-xs md:text-sm font-bold text-gray-600 uppercase mt-1'>Share this address to receive {coin.name}</p>
                        </div>

                        {/* QR Code */}
                        <div className='bg-white border-2 md:border-4 border-black p-3 md:p-4 mb-3 md:mb-4 flex justify-center items-center'>
                            {qrCodeDataUrl ? (
                                <img
                                    src={qrCodeDataUrl}
                                    alt="QR Code"
                                    className='w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 border-2 md:border-4 border-black'
                                />
                            ) : (
                                <div className='w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 bg-gray-200 border-2 md:border-4 border-black flex items-center justify-center'>
                                    <Loader2 className='w-6 h-6 md:w-8 md:h-8 animate-spin' />
                                </div>
                            )}
                        </div>

                        {/* Instructions */}
                        <div className='bg-black text-white p-3 md:p-4 border-2 md:border-4 border-black mb-3 md:mb-4'>
                            <p className='font-black text-xs uppercase mb-2'>⚠ How to Receive</p>
                            <ul className='text-xs font-bold space-y-1'>
                                <li>1. Scan QR code with sender's wallet</li>
                                <li>2. Or copy address below</li>
                                <li>3. Send only {coin.symbol} to this address</li>
                            </ul>
                        </div>

                        {/* Address Display */}
                        <div className='border-2 md:border-4 border-black p-3 mb-3 md:mb-4 bg-gray-50'>
                            <p className='text-xs font-black uppercase mb-2'>Your {coin.symbol} Address</p>
                            <div className='font-mono text-xs font-bold break-all bg-white p-2 md:p-3 border-2 border-black mb-3'>
                                {coin.address}
                            </div>
                            <button
                                onClick={() => copyToClipboard(coin.address)}
                                className='w-full bg-black text-white py-2 md:py-3 font-black text-xs md:text-sm uppercase border-2 md:border-4 border-black hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2'
                            >
                                <Copy className='w-3 h-3 md:w-4 md:h-4' />
                                Copy Address
                            </button>
                        </div>

                        {/* Warning */}
                        <div className='bg-white border-2 md:border-4 border-black p-3'>
                            <p className='text-xs font-bold'>
                                <span className='font-black'>⚠ WARNING:</span> Only send {coin.symbol} ({coin.name}) to this address. Sending other coins may result in permanent loss.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AssetCard;