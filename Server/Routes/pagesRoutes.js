const express = require('express');
const router = express.Router();
const pagesController = require('../Controllers/pagesController');

router.get('/getproductsCategory/:category', pagesController.getproductsCategory);
router.get('/getproductsType/:type', pagesController.getproductsType);

router.get('/getdetails/:id', pagesController.getProductDetails);

router.post('/addReaction/:id', pagesController.addReaction);
router.put('updateReaction', pagesController.updateReaction);
router.put('deleteReaction', pagesController.deleteReaction);

router.post('/addToOrdaers', pagesController.addToOreders);
router.post('/addToWishlist/:id', pagesController.addToWishlist);

router.post('/sendContactus', pagesController.sendContactus);

router.put('/removeFromOrders', pagesController.removeFromOrders);


module.exports = router;