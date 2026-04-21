import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, Store, CreditCard, Smartphone, CheckCircle2, X, Loader2, ScanLine } from 'lucide-react';
import { useBookings } from '../context/BookingContext';

const Payment = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const bookingAddedRef = React.useRef(false);

    const [cardDetails, setCardDetails] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: ''
    });

    // Initialize state from location or localStorage
    const initializePaymentState = () => {
        if (state && state.movie && state.seats) {
            localStorage.setItem('paymentSession', JSON.stringify(state));
            return state;
        }
        const saved = localStorage.getItem('paymentSession');
        return saved ? JSON.parse(saved) : {};
    };

    const paymentData = initializePaymentState();

    // Destructure state with empty defaults
    const {
        movie = null,
        seats = [],
        total = 0,
        time = '',
        date = ''
    } = paymentData;

    // Redirect if essential data is missing
    useEffect(() => {
        if (!movie || seats.length === 0) {
            console.warn("Missing booking state, redirecting...");
            navigate('/');
        }
    }, [movie, seats, navigate]);

    useEffect(() => {
        let interval;
        if (showScanner) {
            setScanProgress(0);
            interval = setInterval(() => {
                setScanProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            handlePaymentSuccess();
                        }, 500);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [showScanner]);

    const { addBooking } = useBookings();

    const isCardComplete = () => {
        return cardDetails.number.trim() && cardDetails.expiry.trim() && cardDetails.cvc.trim() && cardDetails.name.trim();
    };

    const isFormValid = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim() || !emailRegex.test(email)) return false;
        if (paymentMethod === 'card') return isCardComplete();
        return true; // Cash app only needs email
    };

    const handlePaymentSuccess = () => {
        if (bookingAddedRef.current) return;
        bookingAddedRef.current = true;

        setShowScanner(false);
        setIsProcessing(false);

        // Save to dynamic context
        addBooking({
            user: { name: "You" }, // In a real app, this would be the logged-in user
            show: {
                movie,
                showDateTime: date === "Today" ? new Date().toISOString() : new Date(date).toISOString(),
                showPrice: total / seats.length
            },
            amount: total,
            bookedSeats: seats,
            email: email,
            date: date,
            time: time
        });

        alert('Payment Successful!');
        navigate('/bookings');
    };

    const handleContinue = () => {
        if (!isFormValid()) {
            alert('Please fill in all required details.');
            return;
        }

        if (paymentMethod === 'cashapp') {
            setShowScanner(true);
        } else {
            setIsProcessing(true);
            setTimeout(() => {
                handlePaymentSuccess();
            }, 2000);
        }
    };

    if (!movie) return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                <p className="text-zinc-500 font-medium">Resolving booking details...</p>
                <button onClick={() => navigate('/')} className="mt-6 text-primary font-bold hover:underline">Back to Home</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row text-zinc-900 font-sans relative overflow-x-hidden">

            {/* Cash App Fake Scanner Overlay */}
            {showScanner && (
                <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6 transition-all duration-500">
                    <div className="absolute top-8 right-8 text-white cursor-pointer" onClick={() => setShowScanner(false)}>
                        <X className="w-8 h-8" />
                    </div>

                    <div className="relative w-72 h-72 border-2 border-[#00D54B] rounded-3xl p-4 overflow-hidden shadow-[0_0_50px_rgba(0,213,75,0.3)]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#00D54B] shadow-[0_0_15px_#00D54B] animate-scan-move"></div>
                        <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=quickshow_payment')] bg-contain bg-center bg-no-repeat opacity-90 invert grayscale"></div>
                    </div>

                    <div className="mt-12 text-center text-white">
                        <h2 className="text-2xl font-bold mb-2">Scan to Pay</h2>
                        <p className="text-zinc-400">Open Cash App and point your camera at the code</p>
                    </div>

                    <div className="mt-12 w-64 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#00D54B] transition-all duration-100 ease-linear shadow-[0_0_10px_#00D54B]"
                            style={{ width: `${scanProgress}%` }}
                        ></div>
                    </div>
                    <p className="mt-4 text-[#00D54B] font-bold text-sm tracking-widest uppercase">
                        {scanProgress < 100 ? `Scanning... ${scanProgress}%` : 'Payment Verified'}
                    </p>
                </div>
            )}

            {/* Left Side: Summary */}
            <div className="flex-1 p-8 md:p-20 flex flex-col items-start border-r border-zinc-100">
                <div className="flex items-center gap-4 mb-16">
                    <button onClick={() => navigate(-1)} className="p-1 hover:bg-zinc-100 rounded-full transition">
                        <ChevronLeft className="w-5 h-5 text-zinc-500" />
                    </button>
                    <div className="w-10 h-10 bg-zinc-50 rounded-xl flex items-center justify-center border border-zinc-200">
                        <Store className="w-5 h-5 text-zinc-400" />
                    </div>
                    <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Test Mode</span>
                </div>

                <div className="space-y-6 max-w-md">
                    <p className="text-zinc-500 font-medium">QuickShow Checkout</p>
                    <div className="flex gap-6 items-start">
                        <div className="w-20 aspect-[2/3] rounded-lg overflow-hidden flex-shrink-0 border border-zinc-200 shadow-sm">
                            <img src={movie.poster_path} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight leading-tight mb-2">{movie.title}</h1>
                            <p className="text-zinc-500 text-sm font-medium">Showtime: {date} at {time}</p>
                            <p className="text-zinc-400 text-xs mt-1 italic">Seats: {seats.join(', ')}</p>
                        </div>
                    </div>
                    <div className="pt-6 border-t border-zinc-100 w-full">
                        <h2 className="text-5xl font-bold tracking-tighter">₹{total}.00</h2>
                    </div>
                </div>
            </div>

            {/* Right Side: Payment Form */}
            <div className="flex-1 p-8 md:p-20 bg-zinc-50/50 flex flex-col items-center">
                <div className="max-w-md w-full">
                    {/* Express Checkout */}
                    <div className="flex gap-4 mb-8">
                        <button className="flex-1 bg-[#00D54B] hover:bg-[#00B53F] text-white py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition">
                            <span className="italic text-lg underline decoration-2 underline-offset-4 tracking-tighter">link</span>
                        </button>
                        <button className="flex-1 bg-[#FFC439] hover:bg-[#F2B930] text-zinc-900 py-3 rounded-lg flex items-center justify-center gap-2 font-bold transition">
                            <span className="text-sm font-black italic">amazon</span>
                            <span className="text-sm font-medium">pay</span>
                        </button>
                    </div>

                    <div className="relative flex items-center justify-center mb-8">
                        <div className="w-full h-px bg-zinc-200"></div>
                        <span className="absolute bg-zinc-50 px-4 text-xs font-bold text-zinc-400 uppercase tracking-widest">or</span>
                    </div>

                    {/* Contact Info */}
                    <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }} className="w-full">
                        <div className="mb-8">
                            <label className="block text-sm font-bold text-zinc-700 mb-2">Contact information</label>
                            <div className="text-[10px] text-zinc-400 mb-2 font-bold uppercase tracking-widest">Email address</div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-zinc-200 bg-white rounded-lg p-3 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm"
                                placeholder="user@example.com"
                                required
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="mb-10">
                            <label className="block text-sm font-bold text-zinc-700 mb-3">Payment method</label>
                            <div className="border border-zinc-200 rounded-xl overflow-hidden bg-white shadow-sm">

                                {/* Card Option Selection */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('card')}
                                    className={`w-full p-4 flex items-center justify-between border-b border-zinc-100 transition ${paymentMethod === 'card' ? 'bg-blue-50/30' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-zinc-900 bg-zinc-900 shadow-sm' : 'border-zinc-300'}`}>
                                            {paymentMethod === 'card' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                        </div>
                                        <CreditCard className="w-5 h-5 text-zinc-400" />
                                        <span className="text-sm font-bold text-zinc-700">Card</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-2 opacity-60" alt="Visa" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-3 opacity-60" alt="MasterCard" />
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-2.5 opacity-60" alt="PayPal" />
                                    </div>
                                </button>

                                {/* Card Information Detail Form */}
                                {paymentMethod === 'card' && (
                                    <div className="p-4 bg-white space-y-4 border-b border-zinc-100 animate-in fade-in duration-300">
                                        <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Card information</div>

                                        {/* Card Number */}
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="1234 1234 1234 1234"
                                                value={cardDetails.number}
                                                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                className="w-full border border-zinc-200 rounded-lg p-3 pr-20 text-sm focus:outline-none focus:border-zinc-400 transition"
                                                required={paymentMethod === 'card'}
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1 items-center grayscale opacity-80">
                                                <span className="text-[8px] font-bold text-zinc-300">VISA</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                placeholder="MM / YY"
                                                value={cardDetails.expiry}
                                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                className="border border-zinc-200 rounded-lg p-3 text-sm focus:outline-none focus:border-zinc-400 transition"
                                                required={paymentMethod === 'card'}
                                            />
                                            <input
                                                type="text"
                                                placeholder="CVC"
                                                value={cardDetails.cvc}
                                                onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                                className="border border-zinc-200 rounded-lg p-3 text-sm focus:outline-none focus:border-zinc-400 transition"
                                                required={paymentMethod === 'card'}
                                            />
                                        </div>

                                        <div className="space-y-4 pt-2">
                                            <div>
                                                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Cardholder name</div>
                                                <input
                                                    type="text"
                                                    placeholder="Full name on card"
                                                    value={cardDetails.name}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                                    className="w-full border border-zinc-200 rounded-lg p-3 text-sm focus:outline-none focus:border-zinc-400 transition"
                                                    required={paymentMethod === 'card'}
                                                />
                                            </div>

                                            <div>
                                                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-2">Country or region</div>
                                                <select className="w-full border border-zinc-200 rounded-lg p-3 text-sm bg-white focus:outline-none focus:border-zinc-400 transition appearance-none">
                                                    <option>United States</option>
                                                    <option>India</option>
                                                    <option>United Kingdom</option>
                                                    <option>Canada</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Card Brand Logos Row */}
                                        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-zinc-100 opacity-40 grayscale">
                                            <span className="text-[9px] font-black italic">VISA</span>
                                            <span className="text-[9px] font-black italic">mastercard</span>
                                            <span className="text-[9px] font-black italic">AMEX</span>
                                            <span className="text-[9px] font-black italic">UnionPay</span>
                                            <span className="text-[9px] font-black italic">JCB</span>
                                            <span className="text-[9px] font-black italic">DISCOVER</span>
                                            <span className="text-[9px] font-black italic">Diners Club</span>
                                        </div>
                                    </div>
                                )}

                                {/* Cash App Option Selection */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('cashapp')}
                                    className={`w-full p-4 flex flex-col transition ${paymentMethod === 'cashapp' ? 'bg-blue-50/30' : ''}`}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${paymentMethod === 'cashapp' ? 'border-zinc-900 bg-zinc-900 shadow-sm' : 'border-zinc-300'}`}>
                                                {paymentMethod === 'cashapp' && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                                            </div>
                                            <div className="p-1 bg-[#00D54B] rounded text-white italic font-black text-[10px]">$</div>
                                            <span className="text-sm font-bold text-zinc-700">Cash App Pay</span>
                                        </div>
                                    </div>

                                    {paymentMethod === 'cashapp' && (
                                        <div className="mt-4 flex gap-4 items-center animate-in slide-in-from-top-2 duration-300">
                                            <div className="w-16 h-16 bg-zinc-100 rounded-xl border border-zinc-200 flex items-center justify-center border-dashed">
                                                <Smartphone className="w-8 h-8 text-zinc-400" />
                                            </div>
                                            <p className="text-xs text-zinc-500 leading-tight font-medium">
                                                You will be shown a QR code to scan using Cash App Pay.
                                            </p>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isProcessing || !isFormValid()}
                            className={`w-full py-4 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] ${!isFormValid() ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none' : 'bg-[#0070E0] hover:bg-[#0061C2] text-white'
                                }`}
                        >
                            {isProcessing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : paymentMethod === 'cashapp' ? (
                                <>
                                    <ScanLine className="w-5 h-5" />
                                    Continue with Cash App
                                </>
                            ) : (
                                'Pay now'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center justify-center gap-4 text-[11px] text-zinc-400">
                        <span className="flex items-center gap-1">Powered by <span className="font-bold text-zinc-500 tracking-tighter text-sm">stripe</span></span>
                        <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
                        <button className="hover:text-zinc-600 transition">Terms</button>
                        <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
                        <button className="hover:text-zinc-600 transition">Privacy</button>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes scan-move {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .animate-scan-move {
          animation: scan-move 2.5s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default Payment;
