import {useEffect, useState} from "react";
import type {flight} from "../../types/flight.ts";
import {getAllFlights, getAvailableFlight} from "../../api/flightAPI.ts";
import FlightCard from "./FlightCard.tsx";


const FlightList = ({availableOnly = false}: {availableOnly?: boolean}) => {
    const [flights, setFlights] = useState<flight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const request = availableOnly ? getAvailableFlight : getAllFlights;
        request().then(data => {
            setFlights(data);
            setLoading(false);
        });
    },[availableOnly]);

    if (loading) {
        return <p className="text-sm text-textMuted">Loading flights...</p>;
    }
    if (!flights.length) return <p>No flights found.</p>

    return (
        <div className="grid gap-4">
            {flights.map((flight) => (
                <FlightCard key = {flight.id} flight={flight} />

            ))}

        </div>
    );
};

export default FlightList;
