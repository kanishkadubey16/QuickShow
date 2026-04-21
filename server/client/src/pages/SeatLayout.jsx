import React, { useState } from 'react';
import { ChevronLeft, Info } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SeatLayout = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Restored this line

  // Initialize state from location or localStorage
  const initializeState = () => {
    if (state && state.movie) {
      localStorage.setItem('bookingSession', JSON.stringify(state));
      return state;
    }
    const saved = localStorage.getItem('bookingSession');
    return saved ? JSON.parse(saved) : {};
  };

  const bookingData = initializeState();
  const { movie = null, date = "Today" } = bookingData;

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(bookingData.time || '07:30 PM');
  const seatPrice = 250; // Mock price per seat

  // Update localStorage when time changes
  React.useEffect(() => {
    if (movie) {
      const updatedSession = { ...bookingData, time: selectedTime };
      localStorage.setItem('bookingSession', JSON.stringify(updatedSession));
    }
  }, [selectedTime, movie]);

  // If no movie data, redirect to home
  React.useEffect(() => {
    if (!movie) {
      navigate('/');
    }
  }, [movie, navigate]);

  const timings = ['10:30 AM', '02:00 PM', '05:30 PM', '07:30 PM', '10:00 PM'];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const cols = Array.from({ length: 12 }, (_, i) => i + 1);
  const occupiedSeats = ['B3', 'B4', 'E6', 'E7', 'E8', 'G1', 'G2'];

  const toggleSeat = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(s => s !== seatId)
        : [...prev, seatId]
    );
  };

  if (!movie) return null; // Prevent render before redirect

  return (
    <div className="min-h-screen bg-[#09090B] pt-24 pb-32">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
            <p className="text-zinc-500 text-sm">Nexus Mall, Bengaluru | {date}</p>
          </div>
        </div>

        {/* Timing Selector */}
        <div className="hidden lg:flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
          {timings.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedTime === time
                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
            >
              {time}
            </button>
          ))}
        </div>

        <button className="hidden md:flex items-center gap-2 text-zinc-400 hover:text-white transition">
          <Info className="w-5 h-5" />
          <span>Ticket Info</span>
        </button>
      </div>

      {/* Mobile Timing Selector */}
      <div className="lg:hidden flex items-center gap-3 overflow-x-auto px-6 mb-12 scrollbar-hide">
        {timings.map(time => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`flex-shrink-0 px-6 py-3 rounded-2xl text-sm font-bold border transition-all ${selectedTime === time
              ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
              : 'bg-white/5 border-white/5 text-zinc-500'
              }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Screen Indicator */}
      <div className="flex flex-col items-center mb-16 relative">
        <div className="w-[60%] h-2 bg-primary rounded-full blur-[2px] opacity-50 mb-4"></div>
        <div className="w-[50%] h-[50px] border-t-4 border-white/10 rounded-[100%] absolute -top-8 bg-gradient-to-b from-white/5 to-transparent"></div>
        <span className="text-zinc-600 text-xs font-bold uppercase tracking-[0.5em] mt-4">Screen This Way</span>
      </div>

      {/* Seat Grid */}
      <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-4">
        {rows.map(row => (
          <div key={row} className="flex items-center gap-4 md:gap-8">
            <span className="text-zinc-700 text-sm font-bold w-4">{row}</span>
            <div className="flex gap-2 md:gap-3">
              {cols.map(col => {
                const seatId = `${row}${col}`;
                const isOccupied = occupiedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    disabled={isOccupied}
                    onClick={() => toggleSeat(seatId)}
                    className={`
                      w-6 h-6 md:w-8 md:h-8 rounded-lg flex items-center justify-center text-[10px] font-bold transition-all duration-300
                      ${isOccupied ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' :
                        isSelected ? 'bg-primary text-white scale-110 shadow-lg shadow-primary/30' :
                          'bg-white/5 text-zinc-400 border border-white/5 hover:border-primary/50 hover:bg-white/10'}
                      ${col === 3 || col === 9 ? 'mr-4 md:mr-8' : ''}
                    `}
                  >
                    {col}
                  </button>
                );
              })}
            </div>
            <span className="text-zinc-700 text-sm font-bold w-4">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="max-w-md mx-auto mt-16 px-6 flex items-center justify-between border-t border-white/5 pt-8">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/5"></div>
          <span className="text-zinc-500 text-xs uppercase font-bold tracking-wider">Available</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary shadow-lg shadow-primary/30"></div>
          <span className="text-zinc-500 text-xs uppercase font-bold tracking-wider">Selected</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-zinc-800"></div>
          <span className="text-zinc-500 text-xs uppercase font-bold tracking-wider">Reserved</span>
        </div>
      </div>

      {/* Floating Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#09090B]/80 backdrop-blur-xl border-t border-white/10 p-6 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <div>
              <p className="text-zinc-500 text-sm mb-1 uppercase font-bold tracking-wider">Selected Seats</p>
              <div className="flex flex-wrap gap-2 h-6">
                {selectedSeats.length > 0 ? (
                  selectedSeats.map(seat => (
                    <span key={seat} className="text-white font-bold">{seat}</span>
                  ))
                ) : (
                  <span className="text-zinc-600 italic">None selected</span>
                )}
              </div>
            </div>
            <div className="h-10 w-px bg-white/10 hidden md:block"></div>
            <div>
              <p className="text-zinc-500 text-sm mb-1 uppercase font-bold tracking-wider">Total Price</p>
              <p className="text-2xl font-bold text-white">₹{selectedSeats.length * seatPrice}</p>
            </div>
          </div>

          <button
            disabled={selectedSeats.length === 0}
            onClick={() => navigate('/payment', { state: { movie, seats: selectedSeats, total: selectedSeats.length * seatPrice, time: selectedTime, date } })}
            className={`
              w-full md:w-auto px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300
              ${selectedSeats.length > 0
                ? 'bg-primary text-white hover:bg-primary-dull shadow-xl shadow-primary/20 scale-105 active:scale-100'
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
            `}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
