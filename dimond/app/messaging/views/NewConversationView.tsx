import React, { FormEvent, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClient } from "../hooks/useClient";
import { startConversation } from "../model/conversations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Send } from "lucide-react";

export default function NewConversationView() {
  const client = useClient()!;
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  function validateAddress(): string | undefined {
    const address = addressInputRef.current?.value?.trim() || "";
    if (address.length === 0) {
      addressInputRef.current?.focus();
      return;
    }
    return address;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const address = validateAddress();
    if (!address) return;

    try {
      const conversation = await startConversation(client, address);
      navigate(`/c/${conversation.topic}`);
    } catch (e) {
      setError(String(e));
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 pt-14 z-1000">
      <Card className="max-w-2xl mx-auto bg-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-100">New Conversation</CardTitle>
            <Link to="/">
              <Button variant="outline" size="sm" className="text-black border-gray-600 bg-white hover:bg-gray-700">
                <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
              </Button>
            </Link>
          </div>
          <CardDescription className="text-gray-400">Start a new conversation by entering an address</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-900 border-red-800 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">
                Who do you want to message?
              </label>
              <Input
                ref={addressInputRef}
                type="text"
                placeholder="Enter an address"
                className="w-full bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                autoFocus
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={onSubmit} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="mr-2 h-4 w-4" /> Start Conversation
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}