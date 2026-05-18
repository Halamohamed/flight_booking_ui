

import {type FormEvent, useState} from "react";
import {cancelBooking, getBookingsByEmail} from "../../api/flightAPI.ts";
import type {Booking} from "../../types/booking.ts";
import Alert from "./Alert.tsx";
import Button from "./Button.tsx";
import Input from "./Input.tsx";
import Card from "../flight/Card.tsx";
import {Mail, Search, XCircle} from "lucide-react";

const SearchBooking = () => {
    const [email, setEmail] = useState("");
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cancellingBookingId, setCancellingBookingId] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedEmail = email.trim();
        if (!trimmedEmail) {
            setError("Enter an email address to search.");
            setBookings([]);
            setHasSearched(false);
            return;
        }

        setIsLoading(true);
        setError("");
        setMessage("");
        setHasSearched(true);

        const result = await getBookingsByEmail(trimmedEmail);
        setBookings(result);
        setIsLoading(false);
    };

    const handleCancel = async (bookingId: number, passengerEmail: string) => {
        setCancellingBookingId(bookingId);
        setError("");
        setMessage("");

        const cancelled = await cancelBooking(bookingId, passengerEmail);

        if (cancelled) {
            setBookings((currentBookings) =>
                currentBookings.map((booking) =>
                    booking.id === bookingId ? {...booking, status: "CANCELLED"} : booking,
                ),
            );
            setMessage("Booking cancelled.");
        } else {
            setError("Could not cancel this booking.");
        }

        setCancellingBookingId(null);
    };

    return (
        <div className="grid gap-4">
            <Card>
                <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto]">
                    <label className="grid gap-1.5">
                        <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                            <Mail size={16} />
                            Email address
                        </span>
                        <Input
                            type="email"
                            placeholder="Passenger email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <Button type="submit" disabled={isLoading}>
                        <Search size={16} className="mr-2" />
                        {isLoading ? "Searching..." : "Search"}
                    </Button>
                </form>
            </Card>

            {error && <Alert type="error" message={error} />}
            {message && <Alert type="success" message={message} />}

            {hasSearched && !isLoading && !error && bookings.length === 0 && (
                <p className="rounded-lg border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
                    No bookings found.
                </p>
            )}

            {bookings.length > 0 && (
                <div className="grid gap-3">
                    {bookings.map((booking) => (
                        <Card key={booking.id}>
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h3 className="font-semibold text-slate-950">
                                        {booking.flightNumber} -&gt; {booking.destination}
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        {booking.passengerName} ({booking.passengerEmail})
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        Departure: {booking.departureTime}
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={
                                                booking.status === "CANCELLED"
                                                    ? "rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-600"
                                                    : "rounded-full bg-green-50 px-2.5 py-1 font-semibold text-green-700"
                                            }
                                        >
                                            {booking.status}
                                        </span>
                                        <span className="font-semibold text-slate-900">${booking.price}</span>
                                    </div>
                                    <button
                                        type="button"
                                        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-red-600 px-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                                        title="Cancel booking"
                                        aria-label={`Cancel booking ${booking.id}`}
                                        disabled={
                                            booking.status === "CANCELLED" ||
                                            cancellingBookingId === booking.id
                                        }
                                        onClick={() => handleCancel(booking.id, booking.passengerEmail)}
                                    >
                                        <XCircle size={20} aria-hidden="true" />
                                        <span>
                                            {cancellingBookingId === booking.id ? "Cancelling" : "Cancel"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBooking;
