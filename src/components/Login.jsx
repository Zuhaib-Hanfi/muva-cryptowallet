import React, { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { generateMnemonic } from "../services/wallet";

function login() {
    const [mnemonic, setMnemonic] = useState('');
    const [newMnemonic, setNewMnemonic] = useState('');
    const [error, setError] = useState('');
    const { login } = useWallet();

    const handleImport = async (e) => {
        e.preventDefault();
        if (!mnemonic.trim() || mnemonic.trim().split(' ').length !== 12) {
            setError('Please enter a valid 12-words Mnemonic phrase.');
            return;
        }
        try {
            setError(' ');
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
            <div className="max-w-md mx-auto bg-gray-300 p-8 rounded-2xl shadow-lg shadow-amber-300">
                <h2 className="text-2xl font-bold text-center mb-4">Save your Seed Phrase</h2>
                <div className="bg-red-200 border-l-4 border-red-400 backdrop-blur-3xl text-red-900 p-4 rounded-b-2xl mb-6">
                    <p className="font-extrabold">!!IMPORTANT!!</p>
                    <p>Save this 12-word Seed Phrase somewhere safe and don't share it with anyone.</p>
                </div>
                <div className="bg-gray-400 p-4 rounded-2xl text-center font-mono text-lg tracking-wider my-4">
                    {newMnemonic}
                </div>
                <button onClick={proceedWithNewMnemonic} className="w-full btn btn-primary mt-2">
                    Continue
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-4xl font-bold text-center mb-4">MUVA - A Super Secure Crypto Wallet</h1>
            <div className="bg-gray-300 p-8 rounded-2xl shadow-lg shadow-amber-300 mb-6">
                <h2 className="text-2xl font-semibold mb-4">Import Your Existing Wallet</h2>
                <form onSubmit={handleImport}>
                    <textarea
                        value={mnemonic}
                        onChange={(e) => setMnemonic(e.target.value)}
                        placeholder="Enter your 12-Word mnemonic phrase"
                        className="w-full p-3 border border-gray-500 rounded-2xl bg-gray-400 focus:ring-2 focus:ring-orange-300 transition-all"
                        rows="3"
                    />
                    <button type="submit" className="mt-4 w-full btn btin-primary">
                        Import Wallet
                    </button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </form>
            </div>

            <div className="bg-gray-300 p-8 rounded-2xl shadow-lg shadow-amber-300">
                <h2 className="text-2xl font-semibold mb-2">Create a New Wallet</h2>
                <p className="text-gray-400 mb-4">No Walet yet? Create one in seconds</p>
                <button onClick={handleCreate} className="w-full btn btn-neutral">
                    Create New Wallet
                </button>
            </div>
        </div>
    )
}

export default login;