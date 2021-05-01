import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xDa8A3f48A867a6Ef0C5B5cdb5Ec4400073218069"
);

export default instance;