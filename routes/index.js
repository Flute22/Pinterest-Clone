const express = require("express");
const router = express.Router();
const userModel = require("../models/user.models.js");
const postModel = require("../models/post.models.js");
const passport = require("passport");
const localStrategy = require("passport-local");
const upload = require("./multer.js");

passport.use(new localStrategy(userModel.authenticate()));


// Index or Login Route
router.get("/",  (req, res)=> {
  res.render("index", { nav: false });
});

// Register Route
router.get("/register", (req, res) => {
  res.render("register", { nav: false });
});

// Profile Route
router.get("/profile", isLoggedIn, async (req, res) => {
  const user = await userModel
      .findOne({ username: req.session.passport.user })
      .populate("posts")
  res.render("profile", { user, nav: true });
});

// Card Details route
router.get("/card-details/:id", isLoggedIn, async (req, res) => {
    try {
        const post = await postModel.findOne({ _id: req.params.id }).populate("user");
        if (!post) {
            // If the post isn’t found, redirect back to the profile page
            return res.redirect("/profile");
        }
        res.render("card-details", { post, nav: true });
    } catch (error) {
        console.error(error);
        res.redirect("/profile");
    }
});

router.get("/feed", isLoggedIn, async (req, res) => {
    try {
        const user = await userModel
            .findOne({ username: req.session.passport.user })

        const posts = await postModel.find().populate("user")

        if (!user) return res.redirect("/profile")

        res.render("feed", { nav: true, posts, user });
    } catch(err) {
        console.error(`feed route error: ${err}`);
    }
});

// Add Route
router.get("/add", isLoggedIn, async (req, res) => {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("add", { user, nav: true });
});



// Create Post Route
router.post("/create-post", isLoggedIn, upload.single("post-image"), async (req, res) => {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    const post = await postModel.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
    });

    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  }
);

// ProfilePic Upload Route
router.post("/fileupload", isLoggedIn, upload.single("image"), async (req, res, next) => {
    const user = await userModel.findOne({
      username: req.session.passport.user,
    });
    user.profilePic = req.file.filename;
    await user.save();
    res.redirect("/profile");
  }
);

router.post("/register", (req, res, next) => {
  const data = new userModel({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    profilePic: "default.jpg",
  });

  userModel.register(data, req.body.password).then(() => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/",
    successRedirect: "/profile",
  }),
  (req, res) => {}
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
