const express = require('express');
const router = express.Router({ mergeParams:true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require('../schema.js');
const Review = require("../models/reviews.js");
const Listing = require("../models/listing.js");
const {validateReview,isLoggedIn, isReviewAuthor} = require("../middleware.js");
const ReviewController = require("../controllers/reviews.js");

// post review route
router.post("/",isLoggedIn ,validateReview, wrapAsync(ReviewController.addReview));

// delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync(ReviewController.destroyReview));

module.exports = router;