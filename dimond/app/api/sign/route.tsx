import { NextResponse } from 'next/server';
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
        schemaId: "onchain_evm_11155111_0x84",
        attester: "0x878c92FD89d8E0B93Dc0a3c907A2adc7577e39c5",
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

// API route handler (POST handler)
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { signer } = body;

    if (!signer || typeof signer !== 'string') {
      return NextResponse.json({ success: false, message: 'Invalid parameters.' }, { status: 400 });
    }

    const result = await queryDriverAttestation(signer);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
  }
}
