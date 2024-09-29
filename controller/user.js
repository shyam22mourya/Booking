const User = require("../model/user") ; 
 

module.exports.renderSignUp =  (req, res) => {
    res.render("users/signUp.ejs");
}; 

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        // Auto log in fuctions 
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wonderlust");
            res.redirect("/listings");
        })

    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup")
    }
};


module.exports.renderLogIn  = (req, res) => {
    res.render("users/login.ejs");
} ; 

module.exports.logIn = async  (req, res) => {
    req.flash("success", "Welcome to Wonderlust! ");
    let  redirectUrl = res.locals.redirectUrl || "/listings" ; 
    res.redirect(redirectUrl);
} ;

module.exports.logOut=  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are Logged out now");
        res.redirect("/listings");
    })
} ; 