import React, { useEffect, useState, useCallback } from 'react';
import { Eye, EyeOff, RefreshCw, LogOut, Wallet, TrendingUp } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { getEthBalance, getSolBalance, getBtcBalance } from '../services/blockchain';
import AssetCard from './CoinsCards';

function DashboardManga() {
    // Mock wallet context for demo
    // const wallet = {
    //     mnemonic: "example seed phrase words here for demonstration purposes",
    //     ethereum: { address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", privateKey: "..." },
    //     solana: { address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU", privateKey: "..." },
    //     bitcoin: { address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", privateKey: "..." }
    // };
    // const logout = () => console.log("Logout");

    const { wallet, logout } = useWallet();

    const [balances, setBalance] = useState({ eth: "9.99", sol: "9.99", btc: "9.99" });
    const [showMnemonic, setShowMnemonic] = useState(false);
    const [totalUSD, setTotalUSD] = useState("9999.99");

    // const fetchBalances = useCallback(async () => {
    //     if (!wallet || !wallet.ethereum || !wallet.bitcoin || !wallet.solana) return;
    //     console.log("Refreshing Balances...");
    //     // Mock balance fetch
    // }, [wallet]);

    const fetchBalances = useCallback(async () => {
        if (!wallet || !wallet.ethereum || !wallet.bitcoin || !wallet.solana) return;

        try {
            console.log("Refreshing Balances...");
            const [eth, sol, btc] = await Promise.all([
                getEthBalance(wallet.ethereum.address),
                getSolBalance(wallet.solana.address),
                getBtcBalance(wallet.bitcoin.address)
            ]);
            setBalance({ eth, sol, btc });
            const totalUSDBalance = eth + sol + btc;
            setTotalUSD(totalUSDBalance);
        }
        catch (error) {
            console.error("Failed to fetch all balances: ", error);
        }
    }, [wallet]);

    useEffect(() => {
        fetchBalances();
        const interval = setInterval(fetchBalances, 3000);
        return () => clearInterval(interval);
    }, [fetchBalances]);

    if (!wallet || !wallet.ethereum || !wallet.bitcoin || !wallet.solana) {
        return (
            <div className='min-h-screen bg-white flex items-center justify-center p-4'>
                <div className='bg-white border-8 border-black p-8 max-w-md shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'>
                    <h2 className='text-3xl font-black text-black mb-4 uppercase'>Wallet Data Error</h2>
                    <p className='my-6 font-bold text-lg'>There was a problem while loading your wallet data. Please try logging out and importing your wallet again</p>
                    <button
                        onClick={logout}
                        className='w-full bg-black text-white font-black py-4 px-6 uppercase tracking-wider border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    const coins = [
        { name: 'Ethereum', symbol: 'ETH', color: 'border-black', ...wallet.ethereum },
        { name: 'Solana', symbol: 'SOL', color: 'border-black', ...wallet.solana },
        { name: 'Bitcoin', symbol: 'BTC', color: 'border-black', ...wallet.bitcoin }
    ];

    return (
        <div className='min-h-screen bg-transparent p-4 md:p-8'>
            <div className='max-w-7xl mx-auto'>
                {/* Header */}
                <header className='mb-8 border-b-8 border-black pb-6'>
                    <div className='flex justify-between items-start mb-4'>
                        <div>
                            <div className='flex items-center gap-3 mb-2'>
                                <div className='bg-black p-2 border-4 border-black'>
                                    <Wallet className='w-8 h-8 text-white' />
                                </div>
                                <h1 className='text-4xl md:text-5xl font-black uppercase tracking-tighter'>MUVA</h1>
                            </div>
                            <p className='text-sm font-bold uppercase tracking-wider'>Wallet Dashboard</p>
                        </div>
                        <button
                            onClick={logout}
                            className='bg-black text-white font-black py-3 px-6 uppercase text-sm border-4 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 flex items-center gap-2'
                        >
                            <LogOut className='w-4 h-4' />
                            Logout
                        </button>
                    </div>
                </header>

                {/* Total Balance Card */}
                <div className='bg-black text-white border-8 border-black p-8 mb-8 relative shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]'>
                    <div className='absolute -top-4 left-8 bg-black px-4 border-4 border-white'>
                        <p className='text-xs font-black uppercase tracking-widest'>Total Balance</p>
                    </div>
                    <div className='flex justify-between items-end mt-4'>
                        <div>
                            <p className='text-6xl font-black mb-2'>${totalUSD}</p>
                            <div className='flex items-center gap-2 bg-white text-black px-3 py-1 w-fit font-black text-sm'>
                                <TrendingUp className='w-4 h-4' />
                                <span>+0.5% TODAY</span>
                            </div>
                        </div>
                        <button
                            onClick={fetchBalances}
                            className='bg-white text-black p-3 border-4 border-white hover:bg-black hover:text-white hover:border-white transition-all'
                        >
                            <RefreshCw className='w-6 h-6' />
                        </button>
                    </div>
                </div>

                {/* Mnemonic Warning */}
                <div className='bg-white border-4 md:border-8 border-black p-4 md:p-6 mb-8 relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]'>
                    <div className='absolute -top-3 md:-top-4 left-4 md:left-8 bg-white px-2 md:px-4 border-2 md:border-4 border-black'>
                        <p className='text-xs md:text-sm font-black uppercase'>⚠ Secret Recovery Phrase</p>
                    </div>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mt-4 md:mt-2'>
                        <div className='flex-1'>
                            <p className='font-black mb-2 text-base md:text-lg uppercase'>Keep This Secret!</p>
                            <div className='font-mono text-xs md:text-sm font-bold break-words bg-black text-white p-3 border-2 md:border-4 border-black overflow-hidden'>
                                {showMnemonic ? wallet.mnemonic : '•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*•*'}
                            </div>
                        </div>
                        <button
                            onClick={() => setShowMnemonic(!showMnemonic)}
                            className='bg-black text-white p-3 border-2 md:border-4 border-black hover:bg-white hover:text-black transition-all self-start sm:self-auto sm:ml-4'
                        >
                            {showMnemonic ? <EyeOff className='w-4 h-4 md:w-5 md:h-5' /> : <Eye className='w-4 h-4 md:w-5 md:h-5' />}
                        </button>
                    </div>
                </div>

                {/* Assets Grid */}
                <div className='mb-6'>
                    <h2 className='text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2 inline-block'>Your Assets</h2>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                    {coins.map(coin => (
                        <AssetCard
                            key={coin.symbol}
                            coin={coin}
                            balance={balances[coin.symbol.toLowerCase()]}
                            onTransactionSuccess={fetchBalances}
                        />
                    ))}

                    {/* {coins.map((coin, index) => (
                        <div
                            key={coin.symbol}
                            className='bg-white border-8 border-black p-6 relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all'
                        >
                            <div className='absolute -top-4 -left-4 bg-black text-white w-12 h-12 flex items-center justify-center border-4 border-black font-black text-xl'>
                                {index + 1}
                            </div>

                            <div className='mb-4'>
                                <h3 className='text-2xl font-black uppercase'>{coin.symbol}</h3>
                                <p className='text-sm font-bold text-gray-600 uppercase'>{coin.name}</p>
                            </div>

                            <div className='bg-black text-white p-4 border-4 border-black mb-4'>
                                <p className='text-xs font-black uppercase mb-1'>Balance</p>
                                <p className='text-3xl font-black'>{balances[coin.symbol.toLowerCase()] || '0.00'}</p>
                                <p className='text-sm font-bold mt-1'>{coin.symbol}</p>
                            </div>

                            <div className='border-4 border-black p-3 mb-4 bg-white'>
                                <p className='text-xs font-black uppercase mb-1'>Address</p>
                                <p className='font-mono text-xs font-bold break-all'>{coin.address}</p>
                            </div>

                            <div className='grid grid-cols-2 gap-3'>
                                <button className='bg-black text-white py-3 font-black text-sm uppercase border-4 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'>
                                    Send
                                </button>
                                <button className='bg-white text-black py-3 font-black text-sm uppercase border-4 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'>
                                    Receive
                                </button>
                            </div>
                        </div>
                    ))} */}
                </div>

                {/* Footer Badge */}
                <div className='mt-12 text-center'>
                    <div className='inline-block bg-black text-white px-6 py-2 font-black text-xs uppercase tracking-widest border-4 border-black transform rotate-1'>
                        Secured by Blockchain Technology
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardManga;