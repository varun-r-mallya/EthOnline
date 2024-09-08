import axios from 'axios';

interface ExchangeRequestBody {
    nftContractAddress: string;
    privileges: number[];
    tokenId: number;
}

interface ExchangeResponse {
    token: string; 
}

export async function exchangeToken(bearerToken: string, tokenid: number): Promise<string> {
    const url = 'https://token-exchange-api.dimo.zone/v1/tokens/exchange';
    
    const requestBody: ExchangeRequestBody = {
        nftContractAddress: '0xbA5738a18d83D41847dfFbDC6101d37C69c9B0cF',
        privileges: [4],
        tokenId: tokenid,
    };

    try {
        const response = await axios.post<ExchangeResponse>(url, requestBody, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.token;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error Response:', error.response.data);
        } 
        throw error;
    }
}
