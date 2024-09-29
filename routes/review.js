const express = require("express");
const router = express.Router({ mergeParams: true });


const wrapAsync = require("../utils/wrapAsync.js");
const { validateReview, isLoggedIn, isReviewOwner } = require("../middleWare.js");


const Listing = require("../model/listing.js");
const Review = require("../model/review.js");
const { merge } = require("./listing.js");

const reviewController = require("../controller/review.js");


// Reviews  
// post Route

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

// Delete route reviws
router.delete("/:reviewId", isLoggedIn, isReviewOwner, wrapAsync(reviewController.destroyReview));


module.exports = router; 