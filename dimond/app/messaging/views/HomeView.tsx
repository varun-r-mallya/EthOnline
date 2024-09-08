import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useClient, useSetClient } from "../hooks/useClient";
import { useDisconnect } from "wagmi";
import { shortAddress } from "../util/shortAddress";
import ConversationListView from "./ConversationListView";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, LogOut, Plus, Router, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const client = useClient()!;
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const { disconnectAsync } = useDisconnect();
  const setClient = useSetClient();

  function copy() {
    navigator.clipboard.writeText(client.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function logout() {
    await disconnectAsync();
    indexedDB.deleteDatabase("DB");
    localStorage.removeItem("_insecurePrivateKey");
    setClient(null);
    localStorage.removeItem("accessToken");
    router.push("/zerocabs/choice");
  }

  return (
    <div className="min-h-screen bg-black dark:bg-gray-900 p-4 z-100">
      <Card className="max-w-4xl mx-auto bg-gray-800 text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Welcome to Driver/Rider Chatting</CardTitle>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={copy}>
                    <Copy className="h-4 w-4 text-black" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{copied ? "Copied!" : "Copy Address"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="outline" size="sm" onClick={logout} className="text-black">
              <LogOut className="mr-2 h-4 w-4 text-black" /> Back
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex items-center space-x-2 mb-4">
            <User className="h-4 w-4" />
            <span>{shortAddress(client.address)}</span>
          </CardDescription>
          <div className="flex justify-between items-center mb-4 text-black">
            <h2 className="text-lg font-semibold text-white">Your Conversations</h2>
            <Link to="new">
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4 text-black" /> New Conversation with drivers/riders/emergency responders
              </Button>
            </Link>
          </div>
          <ConversationListView />
        </CardContent>
      </Card>
    </div>
  );
}