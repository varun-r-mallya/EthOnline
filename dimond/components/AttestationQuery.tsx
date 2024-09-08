// import { SignProtocolClient, SpMode, EvmChains,delegateSignAttestation } from "@ethsign/sp-sdk";
// import { privateKeyToAccount } from 'viem/accounts';
// import { useAppStore } from "@/store/useAppStore";
// import { useEffect, useState } from "react";

// // Initialize your SignProtocolClient
// let signProtocolClient: SignProtocolClient | null = null;

// const CreateAttestation = ({ address }: any) => {
//   const [signer, setSigner] = useState<string | null>(null);
//   const [attestationResult, setAttestationResult] = useState<any>(null);
//   const [error, setError] = useState<string | null>(null);

//   const {
//     web3authSFAuth,
//     provider,
//     initWeb3Auth,
//     getAccounts,
//   } = useAppStore();

  
//   // Function to initialize SignProtocolClient
//   const initializeClient = async () => {
//     if (web3authSFAuth && provider) {
//       signProtocolClient = new SignProtocolClient(SpMode.OnChain, {
//         chain: EvmChains.sepolia,
//         account: undefined,
//       });
//     } else {
//       console.error("Web3Auth or provider is not initialized.");
//     }
//   };
  
//   const create = async (contractDetails: string, signer: string) => {
//     if (!signProtocolClient) {
//       console.error("SignProtocolClient is not initialized.");
//       return;
//     }

//     try {
//       const res = await signProtocolClient.createAttestation({
//         schemaId: "0x84", 
//         data: {
//           contractDetails,
//           signer,
//         },
//         indexingValue: signer.toLowerCase(),
//       });

//       console.log("Attestation created:", res);
//       return res;
//     } catch (error) {
//       console.error("Error creating attestation:", error);
//       throw new Error("Failed to create attestation");
//     }
//   };

//   useEffect(() => {
//     initWeb3Auth();
//   }, [initWeb3Auth]);

//   useEffect(() => {
//     if (web3authSFAuth) {
//         getAccounts().then((data) => {
//             setSigner(data);
//             initializeClient();
//           });
//     }
//   }, [web3authSFAuth, getAccounts]);
  
//   export const handleCreateAttestation = async () => {
//     if (!signer) {
//       setError("Signer's address is not available.");
//       return;
//     }

//     try {
//       const result = await create("Sample Contract Details", signer);
//       setAttestationResult(result);
//     } catch (err) {
//       setError('An error occurred while creating the attestation.');
//     }
//   };

//   const signAttestation = async () => {
//     if (!signProtocolClient) {
//       console.error("SignProtocolClient is not initialized.");
//       return;
//     }

//     try {
//         const delegationResult = await delegateSignAttestation(
//             {
//               schemaId: '0x84',
//               data: { contractDetails: 'Sample Contract Details', signer: '0xcE4486c967A6609e5B3FF7123Aae45D666D623f7' },
//               indexingValue: '0xcE4486c967A6609e5B3FF7123Aae45D666D623f7',
//             },
//             {
//               chain: EvmChains.baseSepolia,
//               delegationAccount: undefined,
//             }
//           );
//           const res = await signProtocolClient.createAttestation(delegationResult.attestation, {
//             delegationSignature: delegationResult.delegationSignature,
//           });

//       console.log("Attestation created:", res);
//       return res;
//     } catch (error) {
//       console.error("Error creating attestation:", error);
//       throw new Error("Failed to create attestation");
//     }
//   };
//   export const handleSign = async () => {
    
//     try {
//       const result = await signAttestation();
//       setAttestationResult(result);
//     } catch (err) {
//       setError('An error occurred while creating the attestation.');
//     }
//   };
//   return (
//     <div>
//       <form onSubmit={(e) => { e.preventDefault(); handleCreateAttestation(); }} className="space-y-4">
//         <label className="block text-gray-300">
//           Signer Address: {signer || 'Loading...'}
//         </label>
//         <button
//           type="submit"
//           className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold py-2 px-4 rounded"
//         >
//           Create Attestation
//         </button>
//       </form>
//       <form onSubmit={(e) => { e.preventDefault(); handleSign(); }} className="space-y-4">
//         <label className="block text-gray-300">
//           Signer Address: {signer || 'Loading...'}
//         </label>
//         <button
//           type="submit"
//           className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold py-2 px-4 rounded"
//         >
//           Sign Attestation
//         </button>
//       </form>

//       {error && <p className="text-red-500 mt-4">{error}</p>}
//       {attestationResult && (
//         <div className="mt-6 bg-gray-800 p-4 rounded">
//           <h3 className="text-xl text-gray-100">Attestation Results:</h3>
//           <pre className="text-gray-300 mt-2">{JSON.stringify(attestationResult, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateAttestation;
