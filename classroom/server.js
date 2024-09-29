const express = require("express");
const app = express();
const user = require("./route/user.js");
const post = require("./route/post.js");
// const cookieparser = require('cookie-parser')
const section = require("express-session");
// app.use(cookieparser("secretcode"));
const flash = require("connect-flash");

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const sectionOption = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(section(sectionOption));
app.use(flash());
app.use((req, res, next) => {
    res.locals.errorMsg = req.flash("success");
    res.locals.successMsg = req.flash("error");
    next() ; 
});


app.get("/register", (req, res) => {
    let { name = "anonumous" } = req.query;
    req.session.name = name;
    if (name === "anonumous") {
        req.flash("error", "use not registered ");
    } else {
        req.flash("success", " use , registered successfully !")
    }
    res.redirect("/hello");
})


app.get("/hello", (req, res) => {

    res.render("index.ejs", { name: req.session.name });
})

// app.get("/reqcount", (req, res) => {
//     if (req.session.count) {
//         req.session.count++;
//     } else {
//         req.session.count = 1;
//     }

//     res.send(`you sent a request  ${req.session.count} times `);
// })

// app.get("/test", (req, res) => {
//     res.send("test succesfull");
// });

app.use("/posts", post);
app.use("/users", user);


// app.get("/getcookies", (req, res) => {
//     res.cookie("Greet", "namaste");
//     res.cookie("Made in ", "India");
//     res.send("Send you some cookies ");
// });

// // to secrest
// app.get("/getsignedcookies", (req, res) => {
//     res.cookie("Made-in", "India", { signed: true });
//     res.send("signed cookies  sent ");
// })

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verifed");
// });

// app.get("/greet", (req, res) => {
//     let { name = "annoymous" } = req.cookies;
//     res.send(` Hi ${name}`);
// });


// Express session 


app.get("/", (req, res) => {
    console.dir(req.cookies);
    res.send("sent you some cookies ");
})

app.listen(3000, () => {
    console.log(" Server is running  3000")
})

