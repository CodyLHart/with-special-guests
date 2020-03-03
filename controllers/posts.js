const Profile = require('../models/profile');

module.exports = {
    new: newPost,
    create,
    show
}

function newPost(req, res) {
    Profile.findOne({user: req.user._id}, function(err, profile) {
        if (profile) hasProfile = true;
        res.render('posts/new', {
            user: req.user,
            name: req.query.name,
            hasProfile: hasProfile,
            profile: profile
        });
    })
}

function create(req, res) {
    Profile.findOne({user: req.user._id}, function(err, profile) {
        profile.posts.push(req.body);
        profile.save(function(err) {
            res.redirect('/posts');
        });
    });
}

function show(req, res) {
    Profile.findOne({user: req.user._id}, function(err, profile) {
        if (profile) hasProfile = true;
        res.render('posts/show', {
            user: req.user,
            name: req.query.name,
            hasProfile: hasProfile,
            profile: profile
        });
    })
}
