import axios from 'axios';
import type {Booking} from "../types/booking.ts";
import type {flight} from "../types/flight.ts";

export const BASE_URL = "http://localhost:8080/api/flights";
const BOOKINGS_STORAGE_KEY = "flight-booker-bookings";
const FLIGHTS_STORAGE_KEY = "flight-booker-flights";


export interface flightRequest {
    "passengerName": string,
    "passengerEmail": string,
}

const demoFlights: flight[] = [
    {
        id: 1,
        flightNumber: "SK101",
        departureTime: "2026-05-12 08:15",
        arrivalTime: "2026-05-12 10:30",
        status: "AVAILABLE",
        destination: "Stockholm",
        price: 129,
    },
    {
        id: 2,
        flightNumber: "LH204",
        departureTime: "2026-05-14 13:45",
        arrivalTime: "2026-05-14 16:05",
        status: "AVAILABLE",
        destination: "Berlin",
        price: 159,
    },
    {
        id: 3,
        flightNumber: "AF330",
        departureTime: "2026-05-18 18:20",
        arrivalTime: "2026-05-18 21:10",
        status: "AVAILABLE",
        destination: "Paris",
        price: 189,
    },
];

const readStoredFlights = (): flight[] => {
    const storedFlights = localStorage.getItem(FLIGHTS_STORAGE_KEY);

    if (!storedFlights) {
        localStorage.setItem(FLIGHTS_STORAGE_KEY, JSON.stringify(demoFlights));
        return demoFlights;
    }

    try {
        return JSON.parse(storedFlights) as flight[];
    } catch {
        localStorage.setItem(FLIGHTS_STORAGE_KEY, JSON.stringify(demoFlights));
        return demoFlights;
    }
};

const writeStoredFlights = (flights: flight[]) => {
    localStorage.setItem(FLIGHTS_STORAGE_KEY, JSON.stringify(flights));
};

const readStoredBookings = (): Booking[] => {
    const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);

    if (!storedBookings) {
        return [];
    }

    try {
        return JSON.parse(storedBookings) as Booking[];
    } catch {
        localStorage.removeItem(BOOKINGS_STORAGE_KEY);
        return [];
    }
};

const writeStoredBookings = (bookings: Booking[]) => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
};

export const getAllFlights = async (): Promise<flight[]> => {

    try{
        const response= await axios.get(BASE_URL);
        return response.data;
    }catch(error){
        console.log("Backend unavailable, loading demo flights.",error);
        return readStoredFlights();
    }

}

export const getAvailableFlight = async (): Promise<flight[]> => {
try {
   const availableFlight = await axios.get(BASE_URL + "/" + "available");
   return availableFlight.data;

}catch(error){
    console.log("Backend unavailable, loading available demo flights.",error);
    return readStoredFlights().filter((flight) => flight.status !== "BOOKED");
}
}

export const bookFlight = async (bookingData: flightRequest, flightId:string): Promise<boolean> => {
    try {
        await axios.post(`${BASE_URL}/${flightId}/book`, bookingData );
        return true;
    }catch(error){
        console.log("Backend unavailable, saving booking locally.",error);

        const flights = readStoredFlights();
        const flightToBook = flights.find((flight) => String(flight.id) === flightId);

        if (!flightToBook || flightToBook.status === "BOOKED") {
            return false;
        }

        const bookings = readStoredBookings();
        const booking: Booking = {
            id: Date.now(),
            flightNumber: flightToBook.flightNumber,
            passengerName: bookingData.passengerName,
            passengerEmail: bookingData.passengerEmail,
            departureTime: flightToBook.departureTime,
            arrivalTime: flightToBook.arrivalTime,
            status: "BOOKED",
            destination: flightToBook.destination,
            price: flightToBook.price,
        };

        writeStoredBookings([...bookings, booking]);
        writeStoredFlights(
            flights.map((flight) =>
                String(flight.id) === flightId ? {...flight, status: "BOOKED"} : flight,
            ),
        );

        return true;
    }

}

export const getBookingsByEmail = async (email: string): Promise<Booking[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/bookings`, {
            params: {email},
        });
        return response.data;
    } catch (error) {
        console.log("Backend unavailable, searching local bookings.", error);
        return readStoredBookings().filter(
            (booking) => booking.passengerEmail.toLowerCase() === email.toLowerCase(),
        );
    }
}

export const cancelBooking = async (flightId: number, email: string): Promise<boolean> => {
    try {
        await axios.delete(`${BASE_URL}/${flightId}/cancel`, {
            params: {email},
        });
        return true;
    } catch (error) {
        console.log("Backend unavailable, cancelling local booking.", error);

        const bookings = readStoredBookings();
        const bookingToCancel = bookings.find(
            (booking) =>
                booking.id === flightId &&
                booking.passengerEmail.toLowerCase() === email.trim().toLowerCase(),
        );

        if (!bookingToCancel || bookingToCancel.status === "CANCELLED") {
            return false;
        }

        writeStoredBookings(
            bookings.map((booking) =>
                booking.id === flightId ? {...booking, status: "CANCELLED"} : booking,
            ),
        );

        const flights = readStoredFlights();
        writeStoredFlights(
            flights.map((flight) =>
                flight.flightNumber === bookingToCancel.flightNumber
                    ? {...flight, status: "AVAILABLE"}
                    : flight,
            ),
        );

        return true;
    }
}
