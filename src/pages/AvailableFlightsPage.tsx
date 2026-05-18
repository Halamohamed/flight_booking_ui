
import FlightList from "../components/flight/FlightList.tsx";

const AvailableFlightsPage = () => {
    return (
        <div>
            <FlightList availableOnly={true} />
        </div>
    );
};

export default AvailableFlightsPage;
