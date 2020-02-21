var express = require('express');
var router = express.Router();
var resumeData = require('../resumeData');

router.get('/:name', function(req, res, next) {
    if (Object.keys(resumeData).indexOf(req.params.name) > -1)
        res.status(200).json(resumeData[req.params.name]);
    else
        res.status(500).send("no data");
});

module.exports = router;