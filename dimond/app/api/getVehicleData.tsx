
import axios from 'axios';

import { exchangeToken } from './getPrivExchangeToken'; 

// Define the URL for the GraphQL API
const url = "https://telemetry-api.dimo.zone"

// Define the request body interface for GraphQL query
interface GraphQLRequestBody {
    query: string;
}

// Define the response structure based on the query
interface Speed {
    timestamp: string;
    value: number;
}

interface Location {
    timestamp: string;
    value: number;
}

interface Signal {
    lastSeen: string;
    speed: Speed;
    lat: Location;
    currentLocationLongitude: Location;
    currentLocationAltitude: {
        value: number;
    };
}

// Define the function to make the GraphQL request and return the signals
async function getLatestSignals(tokenId: number): Promise<Signal | null> {

    const privToken = "Bearer " + await exchangeToken("eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxMzExZmMwOWYyZWQ5YTU5ODg5OTM1ZDZjYWY4ZjEzMmU4ODQ0MTAifQ.eyJpc3MiOiJodHRwczovL2F1dGguZGltby56b25lIiwicHJvdmlkZXJfaWQiOiJ3ZWIzIiwic3ViIjoiQ2lvd2VEVkdZa1V5UWpZeVpUZGhNbVEyWldVNFEwWTRNalEwT0RrNU5qRXlNV0pETlRJNE9UWTFPREVTQkhkbFlqTSIsImF1ZCI6IjB4NUZiRTJCNjJlN2EyZDZlZThDRjgyNDQ4OTk2MTIxYkM1Mjg5NjU4MSIsImV4cCI6MTcyNjc3NjIyNiwiaWF0IjoxNzI1NTY2NjI2LCJhdF9oYXNoIjoiS21sUEtkZDM3WEJfOXo4bDNiWVYyUSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZXRoZXJldW1fYWRkcmVzcyI6IjB4NUZiRTJCNjJlN2EyZDZlZThDRjgyNDQ4OTk2MTIxYkM1Mjg5NjU4MSJ9.zn9MjAILjBvChLW_mQ-V2kHEQtVCisKhZZcs_Ej6Tn9BcZNXoQ9-cBOK83iBdKa1pSdanRjDfcf-TBjmpQ5dSMrpWx_EII6pTvW_YO-EIdPrKX_ZQCOnD9liT0zHYO78yYpKIZmaScjMAlacN3sp8UBSZShGNjHZRCCUJ3CLWHrp-cuwMGfSI2ZXaVOzvCKUlJ2dyOvE06lSB_OPv8XiThTRfjjBKcoqDYOHS01r8-Bh9SxHIvGfYSIVmBsBisdSHVcb58954G4EG7L1qrerMwrabblvdensqGxplzQGJwhUB6zQBMCZJbJtSVV5PdypIGGr4g12RqRehgfOV-z_Vw");
    console.log(privToken);
    // Define the GraphQL query
    const query = `
    query GetLatestSignals {
      signalsLatest(tokenId: ${tokenId}) {
        lastSeen
        speed {
          timestamp
          value
        }
        lat: currentLocationLatitude {
          timestamp
          value
        }
        currentLocationLongitude {
          timestamp
          value
        }
        currentLocationAltitude {
          value
        }
      }
    }
    `;

    // Create the request body
    const requestBody: GraphQLRequestBody = {
        query
    };

    console.log(requestBody);

    try {
        // Make the POST request
        const response = await axios.post<{ data: { signalsLatest: Signal } }>(url, requestBody, {
            headers: {
                'Authorization': `${privToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Return the signals from the response data
        //console.log(response.data);
        return response.data.data.signalsLatest || null;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error Response:', error.response.data);
        } 
        throw error; // Rethrow the error to be handled by the caller
    }
}

console.log(getLatestSignals(3));