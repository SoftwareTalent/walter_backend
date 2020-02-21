var express = require('express');
var router = express.Router();
var EmailContent = require('../model/emailcontent');
const sgMail = require('@sendgrid/mail');

/* GET users listing. */
router.post('/send', function(req, res, next) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: process.env.EMAIL_TO,
      from: req.body.email,
      subject: req.body.subject,
      text: req.body.message,
    };
    sgMail.send(msg, function(err, json){
        if(err) { res.status(500).json({ message: 'failed', error: err }); return; }

        var newEmailContent = new EmailContent({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        newEmailContent.save(function(err) {
            if (err) {
                return res.status(500).json({ message: 'failed', error: err });
            }        
            res.status(200).json({ message: 'Email was successfully!' });
        });
    });       
});

router.get('/fetch', function(req, res, next) {
    EmailContent.find({}, function(err, emails) {
        if (err)
            return res.status(500).json({ message: 'Error', error: err });

        res.status(200).json({ emails });
    });
});

router.get('/', function(req, res) {
    res.json({hello: "hello"})
})

module.exports = router;
