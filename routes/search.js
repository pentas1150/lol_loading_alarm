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

    const intervalObj = setInterval(async() => {
      try {
        result = await axios.get(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner_data.data.id}?api_key=${process.env.API_KEY}`);
        console.log(`gameLength = ${result.data.gameLength}`);
        if(result.data.gameLength!==0) {
          console.log('게임 중입니다.');
          clearInterval(intervalObj);
        } else {
          console.log('로딩 중입니다.');
        }
      } catch(err) {
        if(typeof result==='undefined') {
          console.log('게임 중이 아닙니다.');
        }    
      }
    }, 3000);
    /*
    result = await axios.get(`https://kr.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner_data.data.id}?api_key=${process.env.API_KEY}`);
    console.log(result.data.gameLength);
    */
    console.log(`(clear)gameLength = ${result.data.gameLength}`);
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
