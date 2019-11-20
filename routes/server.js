const express = require('express');
const router = express.Router();

const Url = require('../models/Url');

router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findOne({ suffCode: req.params.code });
    
    if(url) {
      return res.redirect(url.origUrl);
    } else {
      return res.status(404).json('No url found');
    }
  } catch(err) {
    console.error(err);
    res.status(500).json('Server error');
  }
});

module.exports = router;