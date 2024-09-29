const Listing = require("./model/listing");
const Review = require("./model/review.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema ,reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.originalUrl)
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listings!");
        return res.redirect("/login");
    }
    next();
};


module.exports.savaRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
} ;

module.exports.isOwner = async (req, res , next)=>{
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
          req.flash("error" , "You are not the owner of this listing ") ; 
             return  res.redirect(`/listings/${id}`);

    }
    next() ;
}

module.exports.isReviewOwner = async (req, res, next) => {
    let { id, reviewId } = req.params;
    
    // Use findById instead of findByIdAndUpdate
    let review = await Review.findById(reviewId);
    
    // Check if the review exists
    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    // Check if the current user is the author of the review
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "You are not the author of this review.");
        return res.redirect(`/listings/${id}`);
    }

    next();
};



module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {  
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);  // Replace result.error with errmsg
    } else {
        next();
    }
};


module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errmsg);  // Replace result.error with errmsg
    } else {
        next();
    }
};