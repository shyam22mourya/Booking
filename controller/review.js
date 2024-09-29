const Listing = require("../model/listing") ; 
const Review = require("../model/review") ; 



// post 
 module.exports.postReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New reviews Created ! ");

    res.redirect(`/listings/${listing._id}`)

} ; 

// delete 
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params; // Correct param destructuring
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", " Review deleted  ! ");

    res.redirect(`/listings/${id}`);
};