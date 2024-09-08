import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useClient, useSetClient } from "../hooks/useClient";
import { Wallet } from "ethers";
import { Client } from "@xmtp/xmtp-js";
import { MessageSquare } from "lucide-react";

export default function LoginView() {
  const setClient = useSetClient();

  async function generateWallet() {
    const wallet = Wallet.createRandom();
    const client = await Client.create(wallet, {
      env: "dev",
    });

    // Don't do this in real life.
    localStorage.setItem("_insecurePrivateKey", wallet.privateKey);

    setClient(client);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100 z-1000">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
          <CardDescription>Start chatting with your driver or rider</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-400 mb-4">
            Connect securely and begin your conversation right away.
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={generateWallet}>
            <MessageSquare className="mr-2 h-4 w-4" /> Start Chatting
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}