const Profile = require('../models/profile');
const Post = require('../models/post');

module.exports = {
    new: newPost,
    create,
    show,
    index,
    delete: deletePost,
    edit,
    update
}

function newPost(req, res) {
    Profile.findOne({user: req.user._id}, function(err, profile) {
        if (profile) hasProfile = true;
        // console.log(req.user);
        res.render('posts/new', {
            // user: req.user,
            name: req.query.name,
            hasProfile: hasProfile,
            profile: profile
        });
    });
}

function create(req, res) {
    Post.create(req.body, function (err, post) {
        // console.log(post);
        res.redirect('/posts');
    });
    // Profile.findOne({user: req.user._id}, function(err, profile) {
    //     profile.posts.push(req.body);
    //     profile.save(function(err) {
    //         res.redirect('/users/posts');
    //     });
    // });
}

function show(req, res) {
    // console.log('TESTING');

    // console.log(posts);
    Profile.findOne({user: req.user._id}, function(err, profile) {
            Post.find({host: profile._id}).sort([['date']]).exec(function(err, posts) {
            res.render('posts/show', {
                posts,
                // user: req.user,
                profile
            });
        });
    });
}

function index(req, res) {
    // console.log('TEST', req.user);
    Post.find({}, function(err, posts) {
        posts.forEach(post => {
            console.log('POST:', post);
            Profile.findById(post.host, function(err, profile) {
                console.log('PROFILE:', profile);
                post.hostBand = profile.bandName;
            });
        });
        Profile.findOne(req.params.id, function(err, profile) {
            res.render('posts/index', {
                posts,
                // user: req.user,
                profile
            });
        })
    });
}

function deletePost(req, res) {
    Post.findByIdAndRemove(req.params.id, function(err, post) {
        res.redirect('/posts')
    })
}

function edit(req, res) {
    Post.findById(req.params.id, function(err, post) {
        Profile.findOne({user: req.user._id}, function(err, profile) {
            res.render('posts/edit', {
                post,
                // user: req.user,
                profile
            });
        });
    });
}

function update(req, res) {
    console.log('TESTING');
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, post) {
        console.log(post);
        res.redirect(`/posts`)
    });
}