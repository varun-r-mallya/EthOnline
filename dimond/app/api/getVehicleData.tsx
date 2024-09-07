import axios from 'axios';
import * as dotenv from 'dotenv';
import { exchangeToken } from './getPrivExchangeToken'; 
dotenv.config();

const url = "https://telemetry-api.dimo.zone/query"

interface GraphQLRequestBody {
    query: string;
}


interface Location {
    timestamp: string;
    value: number;
}

interface Signal {
    lat: Location;
    currentLocationLongitude: Location;
}

export async function getVehicleLoc(tokenId: number): Promise<{} | null> {
    const privToken = "Bearer " + await exchangeToken(process.env.BEARER_TOKEN||"", tokenId);

    const query = `
    query GetLatestSignals {
      signalsLatest(tokenId: ${tokenId}) {
        lat: currentLocationLatitude {
          timestamp
          value
        }
        currentLocationLongitude {
          timestamp
          value
        }
      }
    }
    `;

    const requestBody: GraphQLRequestBody = {
        query
    };


    try {
        const response = await axios.post<{ data: { signalsLatest: Signal } }>(url, requestBody, {
            headers: {
                'Authorization': `${privToken}`,
                'Content-Type': 'application/json'
            }
        });
        const lat = response.data.data.signalsLatest.lat.value;
        const long = response.data.data.signalsLatest.currentLocationLongitude.value; 
        const location = {lat, long};
        console.log(location);
        return location || null;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error Response:', error.response.data);
        } 
        throw error; // Rethrow the error to be handled by the caller
    }
}

//Returns [lat, long] or null