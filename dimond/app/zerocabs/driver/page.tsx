import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Car, DollarSign, Star, MapPin } from 'lucide-react';

const DriverPage = () => {
  return (
      <div className="max-w-4xl mx-auto space-y-6 ">
        <Card className="bg-gray-800 border-gray-700 text-gray-50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center">
              <Car className="mr-2 text-yellow-400" />
              Driver Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Available for rides</span>
              <Switch />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-50">
              <Card className="bg-gray-700 text-gray-50">
                <CardContent className="p-4 flex items-center">
                  <DollarSign className="text-green-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Today's Earnings</p>
                    <p className="text-xl font-bold">$120.50</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-700 text-gray-50">
                <CardContent className="p-4 flex items-center">
                  <Star className="text-yellow-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Rating</p>
                    <p className="text-xl font-bold">4.8</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-700 text-gray-50">
                <CardContent className="p-4 flex items-center">
                  <MapPin className="text-blue-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-400">Total Trips</p>
                    <p className="text-xl font-bold">253</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-gray-700 text-gray-50">
          <CardHeader>
            <CardTitle className="text-xl">Recent Rides</CardTitle>
          </CardHeader>
          <CardContent>
            {/* You can add a table or list of recent rides here */}
            <p className="text-gray-400">No recent rides to display.</p>
          </CardContent>
        </Card>
        
        <Button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-semibold">
          Start New Ride
        </Button>
      </div>
  );
};

export default DriverPage;