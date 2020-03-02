const User = require('../models/user');
const Profile = require('../models/profile');

module.exports = {
    index,
    show,
    new: newUser
}

function index(req, res, next) {
    res.render('index', {
        user: req.user,
        name: req.query.name
    });
}

function show(req, res) {
    if (req.user) {
        console.log(req.user);
        let hasProfile = false;
        Profile.find({user: req.user._id}, function(err, profiles) {
            if (profiles.length) hasProfile = true;
            res.render('users/home', {
                user: req.user,
                name: req.query.name,
                hasProfile: hasProfile,
                profile: profiles
            });
        })
    } else {
        res.redirect('/');
    };
}

function newUser(req, res) {
    res.render('users/profile', {
        user: req.user,
    });
}