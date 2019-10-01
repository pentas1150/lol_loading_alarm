const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const url = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/RiotSchmick?api_key=<key>';

/* GET home page. */
router.get('/:id', async(req, res, next) => {
  let summoner_data, result;
  try {
    const req_url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.params.id}?api_key=${process.env.API_KEY}`;
    summoner_data = await axios.get(req_url);
    result = await axios.get(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner_data.data.id}?api_key=${process.env.API_KEY}`);
    console.log(result.data.gameLength);

    return res.send(`${result.data.gameLength}`);
    
  } catch(err) {
    if(typeof result==='undefined') {
      return res.send('undefined');
    }
    console.log(result);
    return res.send(`error\n ${result}`);
  }
});

module.exports = router;
