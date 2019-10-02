const axios = require('axios');
require('dotenv').config();

module.exports = async(summoner_id) => {
    let summoner_data, result;
    try {
    const req_url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner_id}?api_key=${process.env.API_KEY}`;
    summoner_data = await axios.get(req_url);

    result = await axios.get(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner_data.data.id}?api_key=${process.env.API_KEY}`);
    
    return result;
  } catch(err) {
    return result;
  }
};