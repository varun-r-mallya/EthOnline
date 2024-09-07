import axios from "axios";
import * as dotenv from "dotenv";
import { exchangeToken } from "@/store/gettoken";
dotenv.config();

const url = "https://telemetry-api.dimo.zone/query";

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
console.log("wcwd", process.env.NEXT_PUBLIC_BEARER_TOKEN);
export async function getVehicleLoc(tokenId: number): Promise<{} | null> {
  const privToken =
    "Bearer " + (await exchangeToken(process.env.NEXT_PUBLIC_BEARER_TOKEN || "", tokenId));

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
    query,
  };

  try {
    const response = await axios.post<{ data: { signalsLatest: Signal } }>(
      url,
      requestBody,
      {
        headers: {
          Authorization: `${privToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const lat = response.data.data.signalsLatest.lat.value;
    const long =
      response.data.data.signalsLatest.currentLocationLongitude.value;
    const location = { lat, long };
    console.log(location);
    return location || null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error Response:", error.response.data);
    }
    throw error;
  }
}
