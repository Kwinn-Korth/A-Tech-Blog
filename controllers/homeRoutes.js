const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');

// Function to render the Handlebars file with layout
function renderPage(res, view, data) {
    const viewPath = path.join(__dirname, `../views/${view}.hbs`);
    res.render(viewPath, { layout: 'layouts/main', ...data });
}

// Function/ Route to get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        renderPage(res, 'homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Function/ Route to get a single post by its id
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['content', 'date_created'],
                    include: {
                        model: User,
                        attributes: ['name'],
                    },
                },
            ],
        });
        const post = postData.get({ plain: true });
        renderPage(res, 'post', { 
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// Function/ Route to get the user profile page
router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });
        const user = userData.get({ plain: true });
        renderPage(res, 'profile', { 
            ...user,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// Function/ Route to get the login page
router.get('/login', (req, res) => {
    if (req.session.logged_in_) {
        res.redirect('/profile');
        return
    }
    renderPage(res, 'login'); 
});

module.exports = router;
