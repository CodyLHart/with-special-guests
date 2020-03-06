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
    Post.find({}).sort([['date']]).exec(function(err, posts) {
        posts.forEach(post => {
            // console.log('POST:', post);
            Profile.findById(post.host, function(err, profile) {
                // console.log('PROFILE:', profile);
                post.hostBand = profile.bandName;
            });
        });
        Profile.findOne({user: req.user._id}, function(err, profile) {
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
    // console.log('TESTING');
    Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, post) {
        // console.log(post);
        res.redirect(`/posts`)
    });
}

function view(req, res) {
    Post.findById(req.params.id, function(err, post) {
        Profile.findById(post.host, function(err, profile) {
            // console.log('PROFILE:', profile);
            post.hostBand = profile.bandName;
        });
        Profile.findOne({user: req.user._id}, function(err, profile) {
            res.render('posts/view', {
                post,
                // user: req.user,
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
        // post.submissions.forEach(submission => {
        //     Profile.findById(submission.profileId, function(err, profile) {
        //         submitted.push(profile);
        //     });
        //     console.log("SUBMITTED", submitted)
        // });
        Profile.findOne({user: req.user._id}, function(err, profile) {
            res.render('posts/viewMine', {
                post,
                // user: req.user,
                profile,
                submitted
            });
        });
    });
}

// WHY THE FUCK IS MY VIEWMINE FUNCTION BEING SO WEIRD WITH THE SUBMITTED ARRAY
// WHEN I REFRESH THE APP IT JUST THROWS THE BANDS IN AND OUT ALL WILLY NILLY
// IF I CONSOLE LOG IN PROFILE.FINDONE IT CAN FIND THE SUBMITTED ARRAY
// IF I CONSOLE LOG AT ANY OTHER TIME THE ARRAY IS EMPTY
// WHAT THE REAL LIFE ACTUAL FUCK