import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// Helper function for making requests to the Sign Protocol Indexing Service
async function makeAttestationRequest(endpoint: string, options: any) {
  const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
  const res = await axios.request({
    url,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  });

  if (res.status !== 200) {
    throw new Error(JSON.stringify(res));
  }
  return res.data;
}

// Function to query driver attestation
async function queryDriverAttestation(signer: string) {
    try {
      const response = await makeAttestationRequest("index/attestations", {
        method: "GET",
        params: {
          mode: "onchain",
          schemaId: "onchain_evm_11155111_0x84", // Replace with your full schema ID
          attester: "0x878c92FD89d8E0B93Dc0a3c907A2adc7577e39c5", // Hardcoded attester address
          indexingValue: signer.toLowerCase(),
        },
      });
  
      if (!response.success) {
        return {
          success: false,
          message: response.message || "Attestation query failed.",
        };
      }
  
      if (response.data?.total === 0) {
        return {
          success: false,
          message: "No attestation for this address found.",
        };
      }
  
      return {
        success: true,
        attestations: response.data.rows,
      };
    } catch (error) {
      console.error("Error querying attestation:", error);
      return {
        success: false,
        message: "An error occurred while querying the attestation.",
      };
    }
  }
  

// API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { signer } = req.query;

  if (typeof signer !== 'string') {
    return res.status(400).json({ success: false, message: 'Invalid parameters.' });
  }

  try {
    const result = await queryDriverAttestation(signer);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
}
