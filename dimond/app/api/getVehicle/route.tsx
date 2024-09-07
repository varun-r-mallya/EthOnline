import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { exchangeToken } from "@/store/gettoken"; // Adjust the path as needed

export async function POST(request: NextRequest) {
  try {
    const { tokenId } = await request.json(); // Extract tokenId from request body

    if (!tokenId) {
      return NextResponse.json(
        { error: "Token ID is required" },
        { status: 400 }
      );
    }

    const privToken =
      "Bearer " +
      (await exchangeToken(
        process.env.NEXT_PUBLIC_BEARER_TOKEN || "",
        tokenId
      ));

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

    const requestBody = {
      query,
    };

    const response = await axios.post(
      "https://telemetry-api.dimo.zone/query",
      requestBody,
      {
        headers: {
          Authorization: privToken,
          "Content-Type": "application/json",
        },
      }
    );
    const lat = response.data.data.signalsLatest.lat.value;
    const long =
      response.data.data.signalsLatest.currentLocationLongitude.value;
    const location = { lat, long };
    console.log(location);
    return NextResponse.json(location);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
