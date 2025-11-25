import React, { useState, useEffect, useRef } from 'react';
import { Wallet, Shield, Zap, Lock, Users, Github, Twitter, Send, ChevronRight, Menu, X, ArrowRight, CheckCircle, Rocket, TrendingUp, Code, Globe, Star, ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

function LandingPage() {
    const [userCount, setUserCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [submitStatus, setSubmitStatus] = useState('');
    const [isVisible, setIsVisible] = useState({});
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Animated counter for users
    useEffect(() => {
        const targetCount = 247; // Update with actual count
        let current = 0;
        const increment = targetCount / 60;
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetCount) {
                setUserCount(targetCount);
                clearInterval(timer);
            } else {
                setUserCount(Math.floor(current));
            }
        }, 25);
        return () => clearInterval(timer);
    }, []);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('[data-animate]').forEach((el) => {
            if (el.id) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        // Add your backend integration here
        setSubmitStatus('success');
        setEmail('');
        setTimeout(() => setSubmitStatus(''), 3000);
    };

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    return (
        <div className='min-h-screen bg-white text-black overflow-x-hidden'>
            {/* Navigation */}
            <nav className='fixed top-0 w-full bg-white border-b-4 border-black z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16 md:h-20'>
                        <div className='flex items-center gap-2 md:gap-3 group cursor-pointer'>
                            <div className='bg-black p-1.5 md:p-2 border-2 md:border-3 border-black group-hover:animate-pulse'>
                                <Wallet className='w-5 h-5 md:w-6 md:h-6 text-white' />
                            </div>
                            <span className='text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter'>MUVA</span>
                        </div>

                        {/* Desktop Menu */}
                        <div className='hidden lg:flex items-center gap-6 xl:gap-8'>
                            {['Features', 'Security', 'Demo', 'Community'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className='font-black text-sm xl:text-base uppercase tracking-wide hover:scale-110 transition-transform relative group'
                                >
                                    {item}
                                    <span className='absolute -bottom-1 left-0 w-0 h-1 bg-black group-hover:w-full transition-all duration-300'></span>
                                </button>
                            ))}
                            <Link to='/app'
                                className='bg-black text-white px-4 md:px-6 py-2 md:py-3 font-black text-sm uppercase border-3 md:border-4 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5'
                            >
                                Try Now →
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className='lg:hidden p-2 border-2 border-black hover:bg-black hover:text-white transition-all'
                        >
                            {mobileMenuOpen ? <X className='w-5 h-5 md:w-6 md:h-6' /> : <Menu className='w-5 h-5 md:w-6 md:h-6' />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className='lg:hidden border-t-4 border-black bg-white animate-slideDown'>
                        <div className='px-4 py-6 space-y-4'>
                            {['Features', 'Security', 'Demo', 'Community'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item.toLowerCase())}
                                    className='block w-full text-left font-black py-3 px-4 border-2 border-black hover:bg-black hover:text-white transition-all uppercase'
                                >
                                    {item}
                                </button>
                            ))}
                            <Link to='/app'
                                
                                className='w-full bg-black text-white px-6 py-4 font-black uppercase border-4 border-black'
                            >
                                Try Now →
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className='relative pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-20 lg:pb-32 px-4 overflow-hidden'>
                {/* Animated Background Elements */}
                <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                    <div className='absolute top-20 left-10 w-32 h-32 border-8 border-black opacity-20 rotate-12 animate-float'></div>
                    <div className='absolute bottom-20 right-10 w-40 h-40 border-8 border-black opacity-20 -rotate-12 animate-float-delayed'></div>
                    <div className='absolute top-1/2 left-1/4 w-24 h-24 border-8 border-black opacity-10 rotate-45 animate-spin-slow'></div>
                </div>

                <div className='max-w-7xl mx-auto relative z-10'>
                    <div className='grid lg:grid-cols-2 gap-8 lg:gap-16 items-center'>
                        <div className='space-y-6 md:space-y-8'>
                            <div className='inline-block bg-black text-white px-3 md:px-4 py-2 font-black text-xs md:text-sm uppercase border-3 md:border-4 border-black transform -rotate-2 hover:rotate-0 transition-transform cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                                <div className='flex items-center gap-2'>
                                    <Star className='w-3 h-3 md:w-4 md:h-4 fill-white' />
                                    Multi-Chain • Non-Custodial • Secure
                                </div>
                            </div>

                            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase leading-none'>
                                <span className='inline-block hover:scale-105 transition-transform'>Your</span>{' '}
                                <span className='inline-block hover:scale-105 transition-transform'>Gateway</span>
                                <br />
                                <span className='inline-block bg-black text-white px-3 md:px-6 py-2 md:py-4 mt-4 border-4 md:border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-default'>
                                    To Crypto
                                </span>
                            </h1>

                            <p className='text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-relaxed max-w-2xl'>
                                Manage <span className='bg-black text-white px-2 py-1 border-2 border-black'>Ethereum</span>,{' '}
                                <span className='bg-black text-white px-2 py-1 border-2 border-black'>Solana</span>, and{' '}
                                <span className='bg-black text-white px-2 py-1 border-2 border-black'>Bitcoin</span> in one stunning wallet.
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4'>
                                <Link to='/app'
                                    
                                    className='group bg-black text-white px-6 md:px-8 py-4 md:py-5 font-black text-base md:text-lg uppercase border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center justify-center gap-2'
                                >
                                    Launch App
                                    <Rocket className='w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform' />
                                </Link>
                                <a href='https://github.com/Zuhaib-Hanfi/muva-cryptowallet' target='_blank' className='group bg-white text-black px-6 md:px-8 py-4 md:py-5 font-black text-base md:text-lg uppercase border-4 border-black hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 flex items-center justify-center gap-2'>
                                    <Github className='w-4 h-4 md:w-5 md:h-5' />
                                    GitHub
                                    <ExternalLink className='w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform' />
                                </a>
                            </div>

                            <div className='flex flex-wrap gap-4 pt-4'>
                                <div className='flex items-center gap-2 bg-white border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                                    <CheckCircle className='w-5 h-5' />
                                    <span className='font-black text-sm'>Open Source</span>
                                </div>
                                <div className='flex items-center gap-2 bg-white border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                                    <CheckCircle className='w-5 h-5' />
                                    <span className='font-black text-sm'>No Fees</span>
                                </div>
                                <div className='flex items-center gap-2 bg-white border-3 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'>
                                    <CheckCircle className='w-5 h-5' />
                                    <span className='font-black text-sm'>Your Keys</span>
                                </div>
                            </div>
                        </div>

                        {/* Hero Mockup */}
                        <div className='relative group mt-8 lg:mt-0'>
                            <div className='absolute -inset-4 bg-black opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500'></div>
                            <div className='relative bg-black border-4 md:border-8 border-black p-4 md:p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] md:group-hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] transition-all'>
                                <div className='bg-white border-4 border-white p-4 md:p-6 space-y-3 md:space-y-4'>
                                    {/* Wallet Header */}
                                    <div className='flex items-center justify-between border-b-4 border-black pb-3 md:pb-4'>
                                        <div className='flex items-center gap-2'>
                                            <div className='bg-black p-1.5 md:p-2 border-2 border-black'>
                                                <Wallet className='w-4 h-4 md:w-6 md:h-6 text-white' />
                                            </div>
                                            <span className='font-black text-lg md:text-xl'>MUVA</span>
                                        </div>
                                        <div className='font-black text-lg md:text-2xl'>$8,742</div>
                                    </div>

                                    {/* Asset Cards */}
                                    <div className='space-y-2 md:space-y-3'>
                                        {[
                                            { coin: 'ETH', name: 'Ethereum', balance: '2.45', change: '+12', color: 'bg-black' },
                                            { coin: 'SOL', name: 'Solana', balance: '45.23', change: '+8', color: 'bg-black' },
                                            { coin: 'BTC', name: 'Bitcoin', balance: '0.083', change: '+5', color: 'bg-black' }
                                        ].map((asset, i) => (
                                            <div
                                                key={asset.coin}
                                                className='bg-white border-3 md:border-4 border-black p-3 md:p-4 flex justify-between items-center hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-pointer'
                                                style={{ animationDelay: `${i * 100}ms` }}
                                            >
                                                <div>
                                                    <div className='font-black text-base md:text-lg'>{asset.coin}</div>
                                                    <div className='text-xs md:text-sm font-bold text-gray-600'>{asset.name}</div>
                                                </div>
                                                <div className='text-right'>
                                                    <div className='font-black text-sm md:text-base'>{asset.balance}</div>
                                                    <div className='text-xs font-bold text-green-600'>{asset.change}%</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className='grid grid-cols-2 gap-2 md:gap-3 pt-2'>
                                        <button className='bg-black text-white py-2 md:py-3 font-black text-xs md:text-sm uppercase border-2 md:border-3 border-black hover:bg-white hover:text-black transition-all'>
                                            Send
                                        </button>
                                        <button className='bg-white text-black py-2 md:py-3 font-black text-xs md:text-sm uppercase border-2 md:border-3 border-black hover:bg-black hover:text-white transition-all'>
                                            Receive
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Banner */}
            <section className='bg-black text-white py-8 md:py-12 border-y-4 md:border-y-8 border-black'>
                <div className='max-w-7xl mx-auto px-4'>
                    <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8'>
                        {[
                            { value: `${userCount}+`, label: 'Beta Testers', icon: Users },
                            { value: '3', label: 'Blockchains', icon: Globe },
                            { value: '100%', label: 'Open Source', icon: Code },
                            { value: '0', label: 'Platform Fees', icon: TrendingUp }
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className='text-center p-4 md:p-6 border-3 md:border-4 border-white hover:bg-white hover:text-black transition-all group cursor-default'
                            >
                                <stat.icon className='w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform' />
                                <div className='text-3xl md:text-4xl lg:text-5xl font-black mb-2'>{stat.value}</div>
                                <div className='text-xs md:text-sm lg:text-base font-bold uppercase'>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id='features' className='py-16 md:py-24 lg:py-32 px-4' data-animate>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12 md:mb-20'>
                        <div className='inline-block bg-black text-white px-4 py-2 font-black text-xs md:text-sm uppercase mb-6 border-3 border-black'>
                            Why MUVA?
                        </div>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 md:mb-6'>
                            Built Different
                        </h2>
                        <p className='text-base md:text-lg lg:text-xl font-bold text-gray-600 max-w-2xl mx-auto'>
                            Security meets simplicity in a wallet designed for the future
                        </p>
                    </div>

                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                        {[
                            {
                                icon: Shield,
                                title: 'Fort Knox Security',
                                desc: 'Non-custodial design. Your keys never leave your device. Military-grade encryption protects everything.',
                                highlight: 'Your Keys, Your Crypto'
                            },
                            {
                                icon: Zap,
                                title: 'Lightning Fast',
                                desc: 'Real-time balance updates, instant broadcasts, and optimized for speed across all chains.',
                                highlight: 'Sub-second Responses'
                            },
                            {
                                icon: Globe,
                                title: 'Multi-Chain Native',
                                desc: 'Ethereum, Solana, Bitcoin - all in one place. No switching between apps.',
                                highlight: '3 Chains, 1 Wallet'
                            },
                            {
                                icon: Lock,
                                title: 'Privacy First',
                                desc: 'Zero tracking. Zero data collection. Your transactions are your business.',
                                highlight: 'Anonymous by Default'
                            },
                            {
                                icon: Code,
                                title: '100% Open Source',
                                desc: 'Fully transparent codebase. Audit every line. Community-driven development.',
                                highlight: 'Trust Through Transparency'
                            },
                            {
                                icon: Wallet,
                                title: 'Beautiful UX',
                                desc: 'Manga-inspired design that makes crypto management feel like an experience.',
                                highlight: 'Design Meets Function'
                            }
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className='group bg-white border-4 md:border-6 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all cursor-default'
                            >
                                <div className='bg-black text-white p-3 md:p-4 border-3 md:border-4 border-black w-fit mb-4 md:mb-6 group-hover:scale-110 transition-transform'>
                                    <feature.icon className='w-6 h-6 md:w-8 md:h-8' />
                                </div>
                                <h3 className='text-xl md:text-2xl font-black uppercase mb-3 md:mb-4'>{feature.title}</h3>
                                <p className='font-bold text-sm md:text-base text-gray-700 mb-4'>{feature.desc}</p>
                                <div className='inline-block bg-black text-white px-3 py-1 text-xs font-black uppercase border-2 border-black'>
                                    {feature.highlight}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security Deep Dive */}
            <section id='security' className='bg-black text-white py-16 md:py-24 lg:py-32 px-4 border-y-4 md:border-y-8 border-black' data-animate>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid lg:grid-cols-2 gap-12 md:gap-16 items-center'>
                        <div className='space-y-6 md:space-y-8'>
                            <div>
                                <div className='inline-block bg-white text-black px-4 py-2 font-black text-xs md:text-sm uppercase mb-6 border-3 border-white'>
                                    Security First
                                </div>
                                <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6'>
                                    Fort Knox Level Protection
                                </h2>
                                <p className='text-base md:text-lg font-bold opacity-90 leading-relaxed'>
                                    We take security seriously. Your assets deserve military-grade protection.
                                </p>
                            </div>

                            <div className='space-y-4 md:space-y-6'>
                                {[
                                    {
                                        title: 'Non-Custodial',
                                        desc: 'You own your keys. We never have access to your funds or private keys. Ever.',
                                        icon: '🔒'
                                    },
                                    {
                                        title: 'Local Encryption',
                                        desc: 'All sensitive data encrypted locally using AES-256. Industry standard security.',
                                        icon: '🔐'
                                    },
                                    {
                                        title: 'Seed Phrase Backup',
                                        desc: 'BIP39 standard 12-word mnemonic. Recover your wallet anytime, anywhere.',
                                        icon: '✅'
                                    },
                                    {
                                        title: 'Open Source',
                                        desc: 'Every line of code is public. Audit it yourself. No hidden backdoors.',
                                        icon: '🛡️'
                                    }
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className='group border-3 md:border-4 border-white p-4 md:p-6 hover:bg-white hover:text-black transition-all cursor-default'
                                    >
                                        <div className='flex items-start gap-4'>
                                            <span className='text-2xl md:text-3xl'>{item.icon}</span>
                                            <div>
                                                <h3 className='font-black text-lg md:text-xl mb-2 uppercase'>{item.title}</h3>
                                                <p className='font-bold text-sm md:text-base opacity-90'>{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='bg-white text-black border-4 md:border-8 border-white p-6 md:p-8 lg:p-12 shadow-[12px_12px_0px_0px_rgba(255,255,255,0.3)] md:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.3)]'>
                            <div className='space-y-6'>
                                <div className='font-black text-2xl md:text-3xl uppercase border-b-4 border-black pb-4'>
                                    Security Checklist
                                </div>
                                {[
                                    'Private keys stored locally',
                                    'BIP39 mnemonic generation',
                                    'HD wallet derivation',
                                    'Zero server-side storage',
                                    'No tracking or analytics',
                                    'Fully open source code',
                                    'Community audited',
                                    'Regular security updates'
                                ].map((item, i) => (
                                    <div key={i} className='flex items-center gap-3 md:gap-4 font-bold text-sm md:text-base lg:text-lg group'>
                                        <div className='bg-black text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border-2 md:border-3 border-black font-black group-hover:scale-110 transition-transform flex-shrink-0'>
                                            ✓
                                        </div>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works / Demo */}
            <section id='demo' className='py-16 md:py-24 lg:py-32 px-4' data-animate>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12 md:mb-20'>
                        <div className='inline-block bg-black text-white px-4 py-2 font-black text-xs md:text-sm uppercase mb-6 border-3 border-black'>
                            How It Works
                        </div>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 md:mb-6'>
                            Get Started in Seconds
                        </h2>
                        <p className='text-base md:text-lg lg:text-xl font-bold text-gray-600 max-w-2xl mx-auto'>
                            Three simple steps to managing your crypto portfolio
                        </p>
                    </div>

                    <div className='grid md:grid-cols-3 gap-8 md:gap-12 mb-16'>
                        {[
                            {
                                step: '01',
                                title: 'Create or Import',
                                desc: 'Generate a new wallet or import your existing one using a 12-word seed phrase',
                                icon: Wallet
                            },
                            {
                                step: '02',
                                title: 'Manage Assets',
                                desc: 'View balances, send and receive ETH, SOL, and BTC from one unified dashboard',
                                icon: TrendingUp
                            },
                            {
                                step: '03',
                                title: 'Track Portfolio',
                                desc: 'Real-time updates, transaction confirmations, and complete transaction history',
                                icon: ChevronRight
                            }
                        ].map((step, i) => (
                            <div
                                key={i}
                                className='group bg-white border-4 md:border-6 border-black p-6 md:p-8 relative hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all'
                            >
                                <div className='absolute -top-4 md:-top-6 -left-4 md:-left-6 bg-black text-white w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border-4 border-black font-black text-xl md:text-3xl group-hover:scale-110 transition-transform'>
                                    {step.step}
                                </div>
                                <div className='bg-black text-white p-3 md:p-4 border-3 border-black w-fit mb-4 md:mb-6 mt-4'>
                                    <step.icon className='w-6 h-6 md:w-8 md:h-8' />
                                </div>
                                <h3 className='text-xl md:text-2xl font-black uppercase mb-3 md:mb-4'>{step.title}</h3>
                                <p className='font-bold text-sm md:text-base text-gray-700'>{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTA Box */}
                    <div className='bg-black border-4 md:border-8 border-black p-6 md:p-12 lg:p-16 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)]'>
                        <div className='bg-white border-4 md:border-6 border-white p-8 md:p-12 lg:p-16 text-center'>
                            <div className='bg-black text-white p-4 md:p-6 border-4 border-black w-fit mx-auto mb-6 md:mb-8'>
                                <Send className='w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20' />
                            </div>
                            <h3 className='text-2xl sm:text-3xl md:text-4xl font-black uppercase mb-4 md:mb-6'>
                                Ready to Take Control?
                            </h3>
                            <p className='text-base md:text-lg lg:text-xl font-bold mb-6 md:mb-8 max-w-2xl mx-auto'>
                                Join our growing community of users who trust MUVA for their crypto management
                            </p>
                            <Link to='/app'
                                onClick={() => scrollToSection('beta')}
                                className='group bg-black text-white px-8 md:px-12 py-4 md:py-6 font-black text-lg md:text-xl uppercase border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 inline-flex items-center gap-3'
                            >
                                Launch MUVA Now
                                <ArrowRight className='w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-2 transition-transform' />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section id='community' className='bg-black text-white py-16 md:py-24 lg:py-32 px-4 border-y-4 md:border-y-8 border-black' data-animate>
                <div className='max-w-7xl mx-auto'>
                    <div className='text-center mb-12 md:mb-16'>
                        <div className='inline-block bg-white text-black px-4 py-2 font-black text-xs md:text-sm uppercase mb-6 border-3 border-white'>
                            Join the Movement
                        </div>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 md:mb-6'>
                            Built by the Community
                        </h2>
                        <p className='text-base md:text-lg lg:text-xl font-bold opacity-90 max-w-2xl mx-auto'>
                            Open source, transparent, and driven by users like you
                        </p>
                    </div>

                    <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                        {[
                            {
                                icon: Github,
                                title: 'Open Source',
                                value: 'View Code',
                                desc: 'Every line is public. Fork it, audit it, improve it.'
                            },
                            {
                                icon: Users,
                                title: 'Community',
                                value: `${userCount}+ Users`,
                                desc: 'Growing community of crypto enthusiasts and developers.'
                            },
                            {
                                icon: Star,
                                title: 'Contribute',
                                value: 'Get Involved',
                                desc: 'Report bugs, suggest features, or submit pull requests.'
                            }
                        ].map((item, i) => (
                            <div
                                key={i}
                                className='group border-4 border-white p-6 md:p-8 hover:bg-white hover:text-black transition-all cursor-pointer'
                            >
                                <item.icon className='w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 group-hover:scale-110 transition-transform' />
                                <h3 className='font-black text-xl md:text-2xl uppercase mb-2'>{item.title}</h3>
                                <div className='text-2xl md:text-3xl font-black mb-3 md:mb-4'>{item.value}</div>
                                <p className='font-bold text-sm md:text-base opacity-90'>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beta Program / Waitlist */}
            {/* <section id='beta' className='py-16 md:py-24 lg:py-32 px-4' data-animate>
                <div className='max-w-4xl mx-auto'>
                    <div className='text-center mb-12 md:mb-16'>
                        <div className='inline-block bg-black text-white px-4 py-2 font-black text-xs md:text-sm uppercase mb-6 border-3 border-black'>
                            Beta Access
                        </div>
                        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4 md:mb-6'>
                            Try MUVA Today
                        </h2>
                        <p className='text-base md:text-lg lg:text-xl font-bold text-gray-600 max-w-2xl mx-auto'>
                            Be part of the future. Test MUVA, share feedback, and help us build the best wallet.
                        </p>
                    </div>

                    <div className='bg-white border-4 md:border-8 border-black p-6 md:p-10 lg:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] md:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]'>
                        <form onSubmit={handleNewsletterSubmit} className='space-y-4 md:space-y-6'>
                            <div>
                                <h2 className='text-3xl sm:text-4xl md:text-5xl text-center font-black uppercase mb-4 md:mb-6'>
                            Hey Beta Tester
                        </h2>
                            </div>
                            <Link to='/app'
                                type='submit'
                                className='w-full bg-black text-white py-4 md:py-5 font-black text-lg md:text-xl uppercase border-4 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 flex items-center justify-center gap-3'
                            >
                                <Rocket className='w-5 h-5 md:w-6 md:h-6' />
                                Launch MUVA Wallet
                            </Link>
                        </form>

                        {submitStatus === 'success' && (
                            <div className='mt-6 bg-black text-white border-4 border-black p-4 md:p-5 font-bold text-center animate-slideDown'>
                                <CheckCircle className='w-6 h-6 inline-block mr-2' />
                                Welcome aboard! Check your email to get started.
                            </div>
                        )}

                        <div className='mt-8 md:mt-12 grid grid-cols-3 gap-4'>
                            {[
                                { label: 'Free', sublabel: 'Forever' },
                                { label: 'Open', sublabel: 'Source' },
                                { label: 'Secure', sublabel: 'Keys' }
                            ].map((item, i) => (
                                <div key={i} className='flex flex-col justify-center items-center border-4 border-black p-4 md:p-6 text-center hover:bg-black hover:text-white transition-all cursor-default'>
                                    <div className='text-2xl md:text-3xl font-black mb-2'>{item.label}</div>
                                    <div className='text-xs md:text-sm font-bold uppercase'>{item.sublabel}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className='text-center text-xs md:text-sm font-bold text-gray-600 mt-6 md:mt-8'>
                        By joining, you agree to test MUVA and provide feedback. No spam, ever.
                    </p>
                </div>
            </section> */}

            {/* Footer */}
            <footer className='bg-white py-12 md:py-16 lg:py-20 px-4 border-t-4 md:border-t-8 border-black'>
                <div className='max-w-7xl mx-auto'>
                    <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16'>
                        <div>
                            <div className='flex items-center gap-2 md:gap-3 mb-4 md:mb-6'>
                                <div className='bg-black p-2 border-2 md:border-3 border-black'>
                                    <Wallet className='w-5 h-5 md:w-6 md:h-6 text-white' />
                                </div>
                                <span className='text-2xl md:text-3xl font-black uppercase'>MUVA</span>
                            </div>
                            <p className='font-bold text-sm md:text-base text-gray-600 leading-relaxed'>
                                Your secure gateway to the decentralized world. Non-custodial, open source, and built for you.
                            </p>
                        </div>

                        <div>
                            <h4 className='font-black uppercase mb-4 md:mb-6 text-base md:text-lg'>Product</h4>
                            <div className='space-y-2 md:space-y-3 font-bold text-sm md:text-base'>
                                {['Features', 'Security', 'Demo', 'Download'].map((item) => (
                                    <div key={item} className='hover:underline cursor-pointer'>{item}</div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className='font-black uppercase mb-4 md:mb-6 text-base md:text-lg'>Resources</h4>
                            <div className='space-y-2 md:space-y-3 font-bold text-sm md:text-base'>
                                {['Docs', 'GitHub', 'Support', 'Blog'].map((item) => (
                                    <div key={item} className='hover:underline cursor-pointer'>{item}</div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className='font-black uppercase mb-4 md:mb-6 text-base md:text-lg'>Connect</h4>
                            <div className='flex gap-3 md:gap-4'>
                               
                                    <a
                                        target='_blank'
                                        href='https://x.com/ZuhaibHanfi'
                                        className='bg-black text-white p-2 md:p-3 border-2 md:border-3 border-black hover:bg-white hover:text-black transition-all hover:scale-110'
                                    >
                                        <Twitter className='w-5 h-5 md:w-6 md:h-6' />
                                    </a>

                                    <a
                                        target='_blank'
                                        href='https://github.com/Zuhaib-Hanfi'
                                        className='bg-black text-white p-2 md:p-3 border-2 md:border-3 border-black hover:bg-white hover:text-black transition-all hover:scale-110'
                                    >
                                        <Github className='w-5 h-5 md:w-6 md:h-6' />
                                    </a>
                               
                            </div>
                        </div>
                    </div>

                    <div className='border-t-4 border-black pt-8 md:pt-12'>
                        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
                            <p className='font-bold text-xs md:text-sm text-center sm:text-left'>
                                © 2025 MUVA Wallet. Open Source • Non-Custodial • Secure
                            </p>
                            <div className='flex gap-4 md:gap-6 font-bold text-xs md:text-sm'>
                                <a href='#' className='hover:underline'>Privacy</a>
                                <a href='#' className='hover:underline'>Terms</a>
                                <a href='#' className='hover:underline'>License</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(12deg); }
                    50% { transform: translateY(-20px) rotate(12deg); }
                }
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(-12deg); }
                    50% { transform: translateY(-30px) rotate(-12deg); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(45deg); }
                    to { transform: rotate(405deg); }
                }
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-float-delayed {
                    animation: float-delayed 8s ease-in-out infinite;
                }
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                .animate-slideDown {
                    animation: slideDown 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}

export default LandingPage;