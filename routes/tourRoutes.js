const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router();

// Param Middleware
router.param('id', tourController.checkID);

router
    .route('/')
    .get(tourController.getAllTours)             // Get All Tours
    .post(tourController.checkBody, tourController.createTour);            // Create Tour

router
    .route('/:id')
    .get(tourController.getTour)                 // Get Tour
    .patch(tourController.updateTour)            // Update Tour
    .delete(tourController.deleteTour);          // Delete Tour

module.exports = router;