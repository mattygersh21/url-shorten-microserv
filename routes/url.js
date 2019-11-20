const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/Url');

router.post('/shorten', async (req, res) => {
  const { origUrl } = req.body;
  const baseUrl = config.get('baseUrl')
  
  if(!validUrl.isUri(baseUrl)) {
     return res.json({msg: "error"});
     }
  
  const suffCode = shortid.generate();
  
  if(validUrl.isUri(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl: origUrl });
      
      if(url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + '/' + suffCode;
        
        url = new Url({
          origUrl,
          shortUrl,
          suffCode,
          date: new Date()
        });
        
        await url.save();
        
        res.json(url);
      } 
    } catch (err) {
      console.error(err);
      res.json({msg: "Server error"});
    }
  } else {
    res.json({ msg: "Error - invalid long url"});
  }
  
});

module.exports = router;