import { Ticket, MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { useBookings } from '../context/BookingContext';
import TrailersSection from '../components/TrailersSection';

const MyBookings = () => {
  const { bookings: allBookings } = useBookings();

  return (
    <div className="min-h-screen bg-[#09090B] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Ticket className="w-8 h-8 text-primary" />
            My Bookings
          </h1>
          <div className="text-zinc-500 font-medium">
            {allBookings.length} Tickets Found
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {allBookings.map((booking, idx) => (
            <div key={idx} className="bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row transition hover:border-primary/30">
              {/* Left: Movie Info */}
              <div className="flex-1 p-8 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-32 aspect-[2/3] rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
                  <img
                    src={booking.show.movie.poster_path}
                    alt={booking.show.movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 text-green-400 text-sm font-bold uppercase tracking-wider mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Booking Confirmed</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-4">{booking.show.movie.title}</h2>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    <div className="flex items-center gap-3 text-zinc-400">
                      <MapPin className="w-5 h-5 text-zinc-600" />
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Theatre</p>
                        <p className="text-sm font-medium text-zinc-300">Nexus Mall, Bengaluru</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Calendar className="w-5 h-5 text-zinc-600" />
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Date</p>
                        <p className="text-sm font-medium text-zinc-300">
                          {booking.date || new Date(booking.show.showDateTime).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Clock className="w-5 h-5 text-zinc-600" />
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Time</p>
                        <p className="text-sm font-medium text-zinc-300">
                          {booking.time || new Date(booking.show.showDateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-400">
                      <Ticket className="w-5 h-5 text-zinc-600" />
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">Seats</p>
                        <p className="text-sm font-medium text-zinc-300">{booking.bookedSeats.join(', ')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Barcode Section */}
              <div className="w-full md:w-56 bg-zinc-800/50 border-t md:border-t-0 md:border-l border-white/5 p-8 flex flex-col items-center justify-center relative">
                {/* Decoration Circles (Ticket Cutout Effect) */}
                <div className="hidden md:block absolute -top-4 -left-4 w-8 h-8 bg-[#09090B] rounded-full"></div>
                <div className="hidden md:block absolute -bottom-4 -left-4 w-8 h-8 bg-[#09090B] rounded-full"></div>

                <div className="w-full aspect-square bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
                  {/* Mock QR Representation */}
                  <div className="w-full h-full bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=booking_id')] bg-no-repeat bg-center bg-contain opacity-80"></div>
                </div>
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">ID: {booking._id.slice(-8).toUpperCase()}</p>
                <div className="w-full h-px bg-white/5 my-3"></div>
                <p className="text-white font-bold">₹{booking.amount}</p>
                <p className="text-zinc-500 text-xs mt-1">Status: {booking.isPaid ? 'Paid' : 'Unpaid'}</p>
              </div>
            </div>
          ))}
        </div>

        <TrailersSection />
      </div>

      {/* Custom Glow Effect in background */}
      <div className="fixed top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </div>
  );
};

export default MyBookings;
