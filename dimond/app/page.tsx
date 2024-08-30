"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarFront, ChevronRight } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <CarFront size={64} className="text-yellow-400 inline-block mb-4" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            Dimond
          </h1>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-center text-gray-100">
              Welcome to the future of ride-sharing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-center text-gray-400">
              Experience decentralized transportation powered by blockchain
              technology.
            </p>
            <br />
            <a href="/login">
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold">
                Login
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Decentralized</h3>
            <p className="text-gray-400">No central authority</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Secure</h3>
            <p className="text-gray-400">Blockchain-powered</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Transparent</h3>
            <p className="text-gray-400">Fair pricing</p>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        © 2024 Dimond. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
