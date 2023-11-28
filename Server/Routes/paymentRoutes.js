const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController');

router.use(express.static("."));

router.post('/create-checkout-session', paymentController.getPayment);
router.post('/addRecipientInfo', paymentController.addRecipientInfo);

router.get('/homepage', (req, res) => {
    res.send("successfully");
});

router.get('/notResponding', (req, res) => {
    res.send("sorry there is an error");
});

module.exports = router;