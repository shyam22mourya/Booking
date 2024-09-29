const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");

const Listing = require("../model/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleWare.js");

const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// controller 
const listingController = require("../controller/listing.js");

router
    .route("/")
    .get(wrapAsync(listingController.index)) // Index
    .post(
        isLoggedIn,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.createListing)
    ); // Create 

//New Route
router.get("/new", isLoggedIn, listingController.renderNewform);

router.route("/:id")
    .get(wrapAsync(listingController.showListing))//Show Route
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'),
        validateListing, wrapAsync(listingController.updateListing))//Update Route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));//Delete Route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router; 