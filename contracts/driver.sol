// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DecentralizedRideHailing {
   struct Driver {
            string gID;
            address driverAddress;
            bool attestation;
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

    struct Emergency {
        Ride ride;
        address emergencyResponder;
        bool isCompleted;
        bool isAccepted;
    }

    address public owner;
    mapping(address => Driver) public drivers;
    mapping(address => Rider) public riders;
    mapping(uint256 => Ride) public rides;
    mapping(uint256 => Emergency) public emergencies; // Add this line to define the mapping
    mapping(uint256 => Emergency) public emergencies; // Add this line to define the mapping
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
    event EmergencyTriggered(uint256 indexed rideId, address indexed rider);
    event EmergencyAccepted(uint256 indexed rideId, address indexed responder);
    event EmergencyCompleted(uint256 indexed rideId, address indexed rider);

    modifier onlyKYCVerified(address _driver) {
        require(drivers[_driver].kycVerified, "Driver is not KYC verified");
        _;
    }

    modifier onlyRider(uint256 rideId) {
        require(
            rides[rideId].rider == msg.sender,
            "Only the rider can perform this action"
        );
        _;
    }

    modifier onlyResponder() {
        // Implement responder check logic here
        require(
            msg.sender != address(0),
            "Only a valid responder can perform this action"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerDriver(string memory gID) external {
            drivers[msg.sender] = Driver({
                gID: gID,
                driverAddress: msg.sender,
                attestation: true,
                kycVerified: true,
                rating: 3,
                rideCount: 0,
                isAvailable: true
            });

            emit DriverRegistered(msg.sender);
        }

    function verifyDriverKYC(address driverAddress)
        external
    /* onlyOwner or KYC verifier */
    {
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

        require(
            ride.driver == msg.sender,
            "Only the assigned driver can accept this ride"
        );
        require(!ride.isAccepted, "Ride already accepted");

        ride.isAccepted = true;
        drivers[msg.sender].isAvailable = false;

        emit RideAccepted(msg.sender, ride.rider);
    }

    function startRide(address rider) external {
        emit RideStarted(msg.sender, rider);
    }

    function endRide(address rider, uint256 fare) external {
        payable(msg.sender).transfer(fare); // Ensure proper payment handling
        payable(msg.sender).transfer(fare); // Ensure proper payment handling
        drivers[msg.sender].rideCount++;
        drivers[msg.sender].isAvailable = true;
        emit RideEnded(msg.sender, rider, fare);
    }

    function reviewDriver(address driver, uint256 rating) external {
        drivers[driver].rating = (drivers[driver].rating * drivers[driver].rideCount + rating) / (drivers[driver].rideCount + 1);
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
    ) external {
        require(drivers[driver].isAvailable, "Driver is not available");
    ) external {
        require(drivers[driver].isAvailable, "Driver is not available");

        rideCounter++; // Increment the ride counter to get a unique ride ID
        rideCounter++; // Increment the ride counter to get a unique ride ID
        rides[rideCounter] = Ride({
            rideId: rideCounter,
            driver: driver,
            rider: msg.sender,
            startLocation: startLocation,
            endLocation: endLocation,
            currentLocation: startLocation,
            fare: fare,
            isCompleted: false,
            isAccepted: false
        });

        drivers[driver].isAvailable = false;
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

    function triggerEmergency(uint256 rideId) external onlyRider(rideId) {
        Emergency storage emergency = emergencies[rideId];
        emergency.ride = rides[rideId];
        emergency.isAccepted = false;
        emergency.isCompleted = false;

        emit EmergencyTriggered(rideId, msg.sender);
    }

    function acceptEmergency(uint256 rideId) external onlyResponder {
        Emergency storage emergency = emergencies[rideId];
        require(!emergency.isAccepted, "Emergency already accepted");

        emergency.emergencyResponder = msg.sender;
        emergency.isAccepted = true;

        emit EmergencyAccepted(rideId, msg.sender);
    }

    function completeEmergency(uint256 rideId) external onlyRider(rideId) {
        Emergency storage emergency = emergencies[rideId];
        require(
            emergency.isAccepted,
            "Emergency must be accepted before completion"
        );

        emergency.isCompleted = true;

        emit EmergencyCompleted(rideId, msg.sender);
    }
}
