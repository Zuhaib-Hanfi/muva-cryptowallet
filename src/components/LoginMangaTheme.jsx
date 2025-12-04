import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { generateMnemonic } from "../services/wallet";
import { Link } from "react-router";

function LoginNew() {
    const [mnemonic, setMnemonic] = useState('');
    const [newMnemonic, setNewMnemonic] = useState('');
    const [error, setError] = useState('');
    const { login } = useWallet();

    // Mock functions for demo
    // const generateMnemonic = () => "example seed phrase words here for demonstration purposes only";
    // const login = async (phrase) => {
    //     console.log("Login with:", phrase);
    // };

    const handleImport = async () => {
        if (!mnemonic.trim() || mnemonic.trim().split(' ').length !== 12) {
            setError('Please enter a valid 12-words Mnemonic phrase.');
            return;
        }
        try {
            setError('');
            await login(mnemonic.trim());
        }
        catch (err) {
            setError('Invalid mnemonic phrase. Please check and try again.');
        }
    };

    const handleCreate = () => setNewMnemonic(generateMnemonic());
    const proceedWithNewMnemonic = async () => await login(newMnemonic);

    if (newMnemonic) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-black text-white p-8 border-8 border-black relative">
                    <div className="absolute -top-3 -left-3 w-full h-full border-4 border-black -z-10"></div>

                    <h2 className="text-3xl font-black text-center mb-6 uppercase tracking-tight border-b-4 border-white pb-4">
                        Save Your Seed Phrase
                    </h2>

                    <div className="bg-white text-black border-4 border-black p-6 mb-6 relative">
                        <div className="absolute top-0 left-0 bg-black text-white px-4 py-1 text-xs font-black uppercase tracking-wider">
                            ⚠ Warning
                        </div>
                        <div className="mt-6">
                            <p className="font-black text-lg mb-2">!!IMPORTANT!!</p>
                            <p className="font-bold text-sm leading-tight">
                                Save this 12-word Seed Phrase somewhere safe and don't share it with anyone.
                            </p>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-black"></div>
                        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-black"></div>
                    </div>

                    <div className="bg-white text-black p-6 border-4 border-white mb-6 font-mono text-sm font-bold break-words text-center shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                        {newMnemonic}
                    </div>

                    <button
                        onClick={proceedWithNewMnemonic}
                        className="w-full bg-white text-black py-4 font-black text-xl uppercase tracking-wider border-4 border-white hover:bg-black hover:text-white transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                    >
                        Continue →
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent p-4">
            <div className="max-w-2xl mx-auto pt-10">
                <h1 className="text-6xl font-black text-center mb-12 uppercase tracking-tighter leading-none">
                    <Link to={'/'} className="inline-block border-8 border-black bg-black text-white px-6 py-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                        MUVA
                    </Link>
                    <div className="text-2xl mt-4 font-bold">A Super Secure Crypto Wallet</div>
                </h1>

                <div className="bg-white border-8 border-black p-8 mb-8 relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="absolute -top-4 left-8 bg-white px-4 border-4 border-black">
                        <h2 className="text-2xl font-black uppercase">Import Wallet</h2>
                    </div>

                    <div className="mt-6">
                        <textarea
                            value={mnemonic}
                            onChange={(e) => setMnemonic(e.target.value)}
                            placeholder="Enter your 12-Word mnemonic phrase"
                            className="w-full p-4 border-4 border-black font-mono font-bold text-black placeholder-gray-500 focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                            rows="4"
                        />
                        <button
                            onClick={handleImport}
                            className="mt-6 w-full bg-black text-white py-4 font-black text-xl uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                        >
                            Import →
                        </button>
                        {error && (
                            <div className="mt-4 bg-black text-white p-3 font-bold text-sm border-4 border-black">
                                ⚠ {error}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-black text-white border-8 border-black p-8 relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="absolute -top-4 left-8 bg-black px-4 border-4 border-white">
                        <h2 className="text-2xl font-black uppercase">New Wallet</h2>
                    </div>

                    <p className="text-gray-300 mb-6 font-bold text-lg mt-4">
                        No Wallet yet? Create one in seconds
                    </p>
                    <button
                        onClick={handleCreate}
                        className="w-full bg-white text-black py-4 font-black text-xl uppercase tracking-wider border-4 border-white hover:bg-black hover:text-white hover:border-white transition-all duration-200 shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                    >
                        Create New →
                    </button>
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-block bg-black text-white px-6 py-2 font-black text-xs uppercase tracking-widest border-2 border-black transform -rotate-2">
                        Maximum Security • Zero Compromise
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginNew;
