import {getAllFlights} from "./flightAPI.ts";

const main = async () => {
    try {
        const flights = await getAllFlights();
        console.log( " Loading ..",flights);
    }catch (error) {
        console.log(error);
    }
}
main();
