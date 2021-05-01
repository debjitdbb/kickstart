// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

contract CampaignFactory
{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum,msg.sender));
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
}

contract Campaign{
    
    struct Request{
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address=>bool) approvals;
    }
    uint public numRequests;
    mapping (uint => Request) public requests;
    // Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address=>bool) public approvers;
    uint public approversCount;
    
    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    
    
    constructor(uint minimum, address creator){
        manager = creator;
        minimumContribution = minimum;
    }
    
    function contribute() public payable{
        require(msg.value > minimumContribution);
        
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string memory description, uint value, address payable recipient) public restricted{
        require(approvers[msg.sender]);
        //  Request memory newRequest = Request({
        //      description: description,
        //      value: value,
        //      recipient: recipient,
        //      complete: false,
        //      approvalCount: 0
        //  });
         
         Request storage r = requests[numRequests++];
            r.description = description;
            r.value = value;
            r.recipient = recipient;
            r.complete = false;
            r.approvalCount = 0;
         
        //  requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount/2));
        request.complete = true;
        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns(
        uint, uint, uint, uint, address
    ){
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager

        );
    }

    function getRequestCount() public view returns(uint){
        return numRequests;
    }
    
    
    
}