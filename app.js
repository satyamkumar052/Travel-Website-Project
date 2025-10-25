require("dotenv").config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
 

app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));

mongoose.set('strictPopulate', false);
// app.get(express.urlencoded({extended:true}));


// connection with db
// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main().then(()=>console.log("Connected to db")).catch(err=>console.log(err));
async function main() {
    await mongoose.connect(dbUrl);
}


const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto : {
        secret : process.env.SECRET,
    },
    touchAfter : 24 * 60 * 60,
});

store.on("error", ()=>{
    console.log("Error in mongo session store",err);
});

const sessionOption = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
    }
}; 



app.use(session(sessionOption)); // *--> Configuring passport
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser()); //

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
}); 

app.get("/demouser", async (req,res,next)=> {
    let fakeUser = new User({
        email : "satyam@gmail.com",
        username : "satyam"
    });
    let registeredUser = await User.register(fakeUser, "helloWoorld");  // register checks if username is unique automatically
    res.send(registeredUser);
});


app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/", userRouter);


// check all route and if not exists then throw this error
app.all("*",(req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});


app.use((err, req, res, next)=>{
    let {statusCode=400,message} = err;
    res.status(statusCode).send(message);
    // res.render("error.ejs",{err});
});

app.listen(8080,()=>{
    console.log("Server is listening to port 8080");
});