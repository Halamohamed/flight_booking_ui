
import SearchBooking from "../components/booking/SearchBooking.tsx";

const ManageBookingPage = () => {
    return (
        <div className="grid gap-4">
            <div>
                <h2 className="text-xl font-bold text-slate-950">Manage Booking</h2>
                <p className="mt-1 text-sm text-slate-600">Search by passenger email to view or cancel bookings.</p>
            </div>
            <SearchBooking />
        </div>
    );
};

export default ManageBookingPage;
