import Web3 from "web3";
let web3;
if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
    // We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
    web3.currentProvider.enable();
} else{
    // We are on the server or the user is not running metamask
    console.log(typeof window);
    const provider = new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/d62ac338108c4854bfefca44ce317244"
    );
    web3 = new Web3(provider);
    // web3.currentProvider.enable();
}


export default web3;