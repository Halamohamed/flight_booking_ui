import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AppLayout from "./components/layout/AppLayout.tsx";
import FlightPage from "./pages/FlightPage.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import AvailableFlightsPage from "./pages/AvailableFlightsPage.tsx";
import ManageBookingPage from "./pages/ManageBookingPage.tsx";

function App() {
 // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <AppLayout>
            <Routes>
                <Route path="/" element={<FlightPage />} />
                <Route path="/available" element={<AvailableFlightsPage />} />
                <Route path="/:flightId/book" element={<BookingPage />} />
                <Route path="/bookings" element={<ManageBookingPage />} />

            </Routes>
        </AppLayout>
    </BrowserRouter>
  )
}

export default App
