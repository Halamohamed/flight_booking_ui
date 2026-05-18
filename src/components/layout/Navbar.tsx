import {Link} from "react-router-dom";
import {Plane, Ticket, Search} from "lucide-react";

const Navbar = () => {
    const linkClass = "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950";

    return (
        <nav className="flex flex-wrap items-center gap-2">
           <Link to="/" className={linkClass}>
               <Plane size={18} /> Flights
            </Link>

            <div className="flex flex-wrap gap-2">
                <Link to="/available" className={linkClass}>
                    <Search size={18} /> Available
                </Link>

                <Link to="/bookings" className={linkClass}>
                    <Ticket size={18} /> My Bookings
                </Link>
            </div>
        </nav>
    );
};



export default Navbar;
