// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedRideHailing {
    struct Driver {
        address driverAddress;
        string attestation;
        bool kycVerified;
        uint256 rating;
        uint256 rideCount;
        bool isAvailable;
    }
    struct Location {
        string lat;
        string long;
    }
    struct Rider {
        address riderAddress;
    }
    struct Ride {
        uint256 rideId;
        address driver;
        address rider;
        Location startLocation;
        Location endLocation;
        Location currentLocation;
        uint256 fare;
        bool isCompleted;
        bool isAccepted;
    }
    mapping(address => Driver) public drivers;
    mapping(address => Rider) public riders;
    mapping(uint256 => Ride) public rides;
    uint256 public rideCounter;


    event DriverRegistered(address indexed driver);
    event RiderRegistered(address indexed rider);
    event RideRequested(address indexed rider, address[] nearbyDrivers);
    event RideAccepted(address indexed driver, address indexed rider);
    event RideStarted(address indexed driver, address indexed rider);
    event RideEnded(
        address indexed driver,
        address indexed rider,
        uint256 fare
    );
    event DriverReviewed(
        address indexed rider,
        address indexed driver,
        uint256 rating
    );
     event RideCreated(
        uint256 indexed rideId,
        address indexed driver,
        address indexed rider,
        Location startLocation,
        Location endLocation,
        uint256 fare
    );

    modifier onlyKYCVerified(address _driver) {
        require(drivers[_driver].kycVerified, "Driver is not KYC verified");
        _;
    }

    function registerDriver(string memory attestation) external {
        drivers[msg.sender] = Driver({
            driverAddress: msg.sender,
            attestation: attestation,
            kycVerified: false,
            rating: 0,
            rideCount: 0,
            isAvailable: true
        });

        emit DriverRegistered(msg.sender);
    }

    function verifyDriverKYC(
        address driverAddress
    ) external /* onlyOwner or KYC verifier */ {
        drivers[driverAddress].kycVerified = true;
    }

    function registerRider() external {
        riders[msg.sender] = Rider({riderAddress: msg.sender});

        emit RiderRegistered(msg.sender);
    }

    function requestRide() external {
        // Logic to find nearby drivers
        address[] memory nearbyDrivers = getNearbyDrivers();
        emit RideRequested(msg.sender, nearbyDrivers);
    }

 function acceptRide(uint256 rideId) external {
        require(drivers[msg.sender].isAvailable, "Driver is not available");

        Ride storage ride = rides[rideId];

        require(ride.driver == msg.sender, "Only the assigned driver can accept this ride");
        require(!ride.isAccepted, "Ride already accepted");

        
        ride.isAccepted = true;
        drivers[msg.sender].isAvailable = false;

        
        emit RideAccepted(msg.sender, ride.rider);
    }

    function startRide(address rider) external {
        emit RideStarted(msg.sender, rider);
    }

    function endRide(address rider, uint256 fare) external {
        payable(msg.sender).transfer(fare); // Assuming rider has sent the fare with the transaction
        drivers[msg.sender].rideCount++;
        drivers[msg.sender].isAvailable = true;
        emit RideEnded(msg.sender, rider, fare);
    }

    function reviewDriver(address driver, uint256 rating) external {
        drivers[driver].rating =
            (drivers[driver].rating * drivers[driver].rideCount + rating) /
            (drivers[driver].rideCount + 1);
        emit DriverReviewed(msg.sender, driver, rating);
    }

    function getNearbyDrivers() internal pure returns (address[] memory) {
        // Placeholder function; actual implementation needed to fetch nearest drivers
        address[] memory nearbyDrivers;
        return nearbyDrivers;
    }

    function createRide(
        address driver,
        Location memory startLocation,
        Location memory endLocation,
        uint256 fare
    ) external  {
        require(drivers[msg.sender].isAvailable, "Driver is not available");

        rideCounter++; // Increment the ride counter to get a unique ride ID
        rides[rideCounter] = Ride({
            rideId: rideCounter,
            driver: driver,
            rider: msg.sender,
            startLocation: startLocation,
            endLocation: endLocation,
            currentLocation: startLocation,
            fare: fare,
            isCompleted: false
        });

        drivers[driver].isAvailable = false; 
         // Emit event to notify driver
        emit RideCreated(
            rideCounter,
            driver,
            msg.sender,
            startLocation,
            endLocation,
            fare
        );
    }
    function getCurrentRide() external view returns (Ride memory) {
        for (uint256 i = 1; i <= rideCounter; i++) {
            if (rides[i].driver == msg.sender && !rides[i].isCompleted) {
                return rides[i];
            }
        }
        revert("No ongoing ride found");
    }

    // Additional functions as needed...
}
