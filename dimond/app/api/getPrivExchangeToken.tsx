import axios from 'axios';

// Define the request body interface
interface ExchangeRequestBody {
    nftContractAddress: string;
    privileges: number[];
    tokenId: number;
}

// Define a response interface (adjust based on actual response structure)
interface ExchangeResponse {
    exchangeToken: string; // Assuming the token is in the response under this key
}

// Define the function to make the POST request and return the exchange token
export async function exchangeToken(bearerToken: string): Promise<string> {
    const url = 'https://token-exchange-api.dimo.zone/v1/tokens/exchange';
    
    // Create the request body
    const requestBody: ExchangeRequestBody = {
        nftContractAddress: '0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF',
        privileges: [4],
        tokenId: 21957,
    };

    try {
        // Make the POST request
        const response = await axios.post<ExchangeResponse>(url, requestBody, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        // Return the exchange token from the response
        return response.data.token;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error Response:', error.response.data);
        } 
        throw error; // Rethrow the error to be handled by the caller
    }
}
