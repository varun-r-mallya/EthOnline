import { useState, useEffect } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const AttestationQuery = () => {
  const [signer, setSigner] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to connect to MetaMask and get the user's address
    const getMetamaskAddress = async () => {
      if (window.ethereum) {
        try {
          const accounts = await (window.ethereum.request({ method: 'eth_requestAccounts' }) as Promise<string[]>);
          if (accounts.length > 0) {
            setSigner(accounts[0]);
          } else {
            setError('No MetaMask account found.');
          }
        } catch (err) {
          setError('Failed to connect to MetaMask.');
        }
      } else {
        setError('MetaMask not found.');
      }
    };

    getMetamaskAddress();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!signer) {
      setError("Signer's address is not available.");
      return;
    }

    try {
      const response = await axios.get('/api/queryAttestation', {
        params: { signer }
      });

      if (response.data.success) {
        setResult(response.data.attestations);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while querying the attestation.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-gray-300">
          Signer Address: {signer || 'Loading...'}
        </label>
        <button
          type="submit"
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold py-2 px-4 rounded"
        >
          Query Attestation
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-6 bg-gray-800 p-4 rounded">
          <h3 className="text-xl text-gray-100">Attestation Results:</h3>
          <pre className="text-gray-300 mt-2">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AttestationQuery;
