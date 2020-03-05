const User = require('../models/user');
const Profile = require('../models/profile');

module.exports = {
    index,
    home,
    new: newUser,
    create,
    edit
}

function index(req, res, next) {
    res.render('index', {
        user: req.user,
        name: req.query.name
    });
}

function home(req, res) {
    if (req.user) {
        // console.log(req.user);
        let hasProfile = false;
        Profile.findOne({user: req.user._id}, function(err, profile) {
            if (profile) hasProfile = true;
            res.render('users/home', {
                user: req.user,
                name: req.query.name,
                hasProfile: hasProfile,
                profile: profile
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

function create(req, res) {
    // console.log(req.body);
    Profile.create(req.body, function(err, profile) {
        // console.log(profile)
        res.redirect('/users/home');
    });
}

function edit(req,res) {
    Profile.findOne({user: req.user._id}, function(err, profile) {
        res.render('users/edit', {
            user: req.user,
            profile: profile
        });
    })
}