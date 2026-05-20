import {type FormEvent, useState} from "react";
import {useParams} from "react-router-dom";
import Alert from "./Alert.tsx";
import Input from "./Input.tsx";
import Button from "./Button.tsx";
import {bookFlight} from "../../api/flightAPI.ts";


const BookingForm = () => {
    const {flightId} = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Something went wrong.");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!flightId) {
            setErrorMessage("Missing flight id. Please choose a flight before booking.");
            setStatus("error");
            return;
        }

        const confirmed = window.confirm(
            `Confirm booking for ${name.trim()} using ${email.trim()}?`,
        );

        if (!confirmed) {
            return;
        }

        setIsSubmitting(true);
        setStatus("idle");

        const createBooking = await bookFlight(
            {
                passengerName: name.trim(),
                passengerEmail: email.trim(),
            },
            flightId,
        );

        if (createBooking) {
            setStatus("success");
            setName("");
            setEmail("");
        } else {
            setErrorMessage("Something went wrong.");
            setStatus("error");
        }

        setIsSubmitting(false);
    };

    return (
        <div className="mx-auto max-w-xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-slate-950">Book Flight</h2>
                <p className="mt-1 text-sm text-slate-600">Enter passenger details to confirm this booking.</p>
            </div>

            {status === "success" && (
                <Alert type="success" message="Booking confirmed!" />
            )}

            {status === "error" && (
                <Alert type="error" message={errorMessage} />
            )}

            <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
                <label className="grid gap-1.5">
                    <span className="text-sm font-semibold text-slate-700">Passenger name</span>
                    <Input
                        placeholder="Passenger name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required={true}
                    />
                </label>

                <label className="grid gap-1.5">
                    <span className="text-sm font-semibold text-slate-700">Passenger email</span>
                    <Input
                        placeholder="Passenger email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </label>

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                </Button>
            </form>
        </div>
    );
};

export default BookingForm;
