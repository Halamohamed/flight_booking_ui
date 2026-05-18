import type {flight} from "../../types/flight.ts";
import Card from "./Card.tsx";
import {CalendarClock, Plane, Tag} from "lucide-react";
import {Link} from "react-router-dom";
import Button from "../booking/Button.tsx";


const FlightCard = ({flight}: {flight:flight}) => {
   const isBooked = flight.status === "BOOKED";

    return (
        <Card>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                            <Plane size={20} />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-950">
                                {flight.flightNumber} to {flight.destination}
                            </h3>
                            <p className="flex items-center gap-2 text-sm text-slate-600">
                                <CalendarClock size={16} />
                                {flight.departureTime}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span
                            className={
                                isBooked
                                    ? "rounded-full bg-red-50 px-2.5 py-1 font-semibold text-red-700"
                                    : "rounded-full bg-green-50 px-2.5 py-1 font-semibold text-green-700"
                            }
                        >
                            {flight.status}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-800">
                            <Tag size={16} />
                            ${flight.price}
                        </span>
                    </div>
                </div>

                <Link to={`/${flight.id}/book`}>
                    <Button disabled={isBooked}>
                        {isBooked ? "Booked" : "Book Flight"}
                    </Button>
                </Link>
            </div>
        </Card>
    );
};

export default FlightCard;
