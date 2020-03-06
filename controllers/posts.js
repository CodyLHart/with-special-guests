const Profile = require('../models/profile');
const Post = require('../models/post');

module.exports = {
    new: newPost,
    create,
    show,
    index,
    delete: deletePost,
    edit,
    update,
    view,
    submit,
    viewMine
}

function newPost(req, res) {
    Profile.findOne({user: req.user._id}, function(err, profile) {
        if (profile) hasProfile = true;
        res.render('posts/new', {
            name: req.query.name,
            hasProfile: hasProfile,
            profile: profile
        });
    });
}

function create(req, res) {
    Post.create(req.body, function (err, post) {
        res.redirect('/posts');
    });
}

function show(req, res) {

    Profile.findOne({user: req.user._id}, function(err, profile) {
            Post.find({host: profile._id}).sort([['date']]).exec(function(err, posts) {
            res.render('posts/show', {
                posts,
                profile
            });
        });
    });
}

function index(req, res) {
    Post.find({}).sort([['date']]).exec(function(err, posts) {
        posts.forEach(post => {
            Profile.findById(post.host, function(err, profile) {
                post.hostBand = profile.bandName;
            });
        });
        Profile.findOne({user: req.user._id}, function(err, profile) {
            res.render('posts/index', {
                posts,
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
                profile
            });
        });
    });
}

function update(req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, post) {
        res.redirect(`/posts`)
    });
}

function view(req, res) {
    Post.findById(req.params.id, function(err, post) {
        Profile.findById(post.host, function(err, profile) {
            post.hostBand = profile.bandName;
        });
        Profile.findOne({user: req.user._id}, function(err, profile) {
            res.render('posts/view', {
                post,
                profile
            });
        });
    });
}

function submit(req, res) {
    console.log('SUBMIT PUSHED');
    console.log(req.user);
    Profile.findOne({user: req.user._id}, function(err, profile) {
        console.log(profile);
        Post.findById(req.params.id, function(err, post) {
            let hasSubmitted = false;
            post.submissions.forEach(submission => {
                if (profile._id.toString() === submission.profileId.toString()) {
                    hasSubmitted = true;
                };
            });
            if (hasSubmitted) {
                console.log("USER HAS ALREADY SUBMITTED")
                res.redirect('/posts/index');
            } else {
            const newSubmission = {profileId: profile._id}
            post.submissions.push(newSubmission);
            post.save(function(err){
                 console.log("UPDATED:", post)
                 res.redirect('/posts/index');
             });
            };
        });
    });
}

function viewMine(req, res) {
    const submitted = [];
    Post.findById(req.params.id, function(err, post) {
        for (let i = 0; i < post.submissions.length; i++) {
            Profile.findById(post.submissions[i].profileId, function(err, profile) {
                submitted.push(profile);
            });
        }
        console.log('SUBMITTED:', submitted);
        Profile.findOne({user: req.user._id}, function(err, profile) {
            res.render('posts/viewMine', {
                post,
                profile,
                submitted
            });
        });
    });
}