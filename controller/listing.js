const Listing = require("../model/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
// Index
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

// New form
module.exports.renderNewform = (req, res) => {
    res.render("listings/new.ejs");
};

//show 
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: { path: "author" },
        })
        .populate("owner");
    // console.log(listing);

    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
};


// create 
module.exports.createListing = async (req, res, next) => {
    console.log(req.body)
  let response = await  geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send() ;

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { filename, url };
 
     newListing.geometry = response.body.features[0].geometry ; 
     let savelistiny = await newListing.save();
     console.log(savelistiny) ; 
    req.flash("success", "New Listing Created ! ");
    res.redirect("/listings");

};

// Edit 
module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist ! ");
        res.redirect("/listings");
    }

    let orgImgUrl = listing.image.url ;
    orgImgUrl = orgImgUrl.replace("/uploud" , "uploud/w_250") ; 
    res.render("listings/edit.ejs", { listing , orgImgUrl });
};

// update 
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listings = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listings.image = { url, filename };
        await listings.save();
    }
    req.flash("success", "Listing is Update ! ");
    res.redirect(`/listings/${id}`);
};

//deleteListing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "  Listing Deleted ! ");
    res.redirect("/listings");
}