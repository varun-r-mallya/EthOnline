import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, CreditCard, User } from 'lucide-react';

const ClientPage = () => {
  return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <User className="mr-2 text-yellow-400" />
              Welcome, Rider!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gray-700">
                <CardContent className="p-4 flex items-center">
                  <Clock className="text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Last Ride</p>
                    <p className="text-xl font-bold">2 days ago</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-700">
                <CardContent className="p-4 flex items-center">
                  <CreditCard className="text-green-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Wallet Balance</p>
                    <p className="text-xl font-bold">$50.75</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 ">
          <CardHeader>
            <CardTitle className="text-xl">Request a Ride</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-yellow-400" />
              <Input placeholder="Pickup Location" className="bg-gray-700 border-gray-600 text-gray-100" />
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-orange-400" />
              <Input placeholder="Drop-off Location" className="bg-gray-700 border-gray-600 text-gray-100" />
            </div>
            <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold">
              Find Drivers
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl">Recent Rides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((ride) => (
                <Card key={ride} className="bg-gray-700">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">City Center to Airport</p>
                        <p className="text-sm text-gray-400">August {20 + ride}, 2024</p>
                      </div>
                      <p className="font-bold">$24.50</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default ClientPage;