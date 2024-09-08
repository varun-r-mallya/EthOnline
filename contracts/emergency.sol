// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// contract DecentralizedRideHailing {
//     struct Responder {
//         uint256 stake;
//         bool isActive;
//     }

//     address public owner;
//     mapping(address => Responder) public responders;
//     uint256 public fixedPayment;

//     event ResponderJoined(address indexed responder, uint256 stake);
//     event ResponderLeft(address indexed responder, uint256 stakeReturned);
//     event ServiceRequested(address indexed rider, address indexed responder, uint256 payment);
//     event ComplaintFiled(address indexed rider, address indexed responder);
//     event StakeForfeited(address indexed responder, uint256 stake);

//     modifier onlyOwner() {
//         require(msg.sender == owner, "Only owner can call this function");
//         _;
//     }

//     modifier onlyActiveResponder() {
//         require(responders[msg.sender].isActive, "You are not an active responder");
//         _;
//     }

//     constructor(uint256 _fixedPayment) {
//         owner = msg.sender;
//         fixedPayment = _fixedPayment;
//     }

//     function join() external payable {
//         require(msg.value > 0, "You need to stake some amount to join");
//         require(!responders[msg.sender].isActive, "You are already an active responder");

//         responders[msg.sender] = Responder({
//             stake: msg.value,
//             isActive: true
//         });

//         emit ResponderJoined(msg.sender, msg.value);
//     }

//     function leave() external onlyActiveResponder {
//         uint256 stake = responders[msg.sender].stake;

//         responders[msg.sender].stake = 0;
//         responders[msg.sender].isActive = false;

//         payable(msg.sender).transfer(stake);

//         emit ResponderLeft(msg.sender, stake);
//     }

//     function requestService(address responder) external payable {
//         require(responders[responder].isActive, "Responder is not active");
//         require(msg.value == fixedPayment, "Incorrect payment amount");

//         payable(responder).transfer(msg.value);

//         emit ServiceRequested(msg.sender, responder, msg.value);
//     }

//     function fileComplaint(address responder) external {
//         require(responders[responder].isActive, "Responder is not active");

//         responders[responder].isActive = false;
//         uint256 stake = responders[responder].stake;
//         responders[responder].stake = 0;

//         emit ComplaintFiled(msg.sender, responder);
//         emit StakeForfeited(responder, stake);
//     }

//     function getContractBalance() external view returns (uint256) {
//         return address(this).balance;
//     }

//     function getResponderStake(address responder) external view returns (uint256) {
//         return responders[responder].stake;
//     }
// }
