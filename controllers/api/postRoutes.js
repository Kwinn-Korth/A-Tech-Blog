const router = require('express').Router();
const {User, Comment, Post} = require('../../models');
const withAuth = require('../../utils/auth');

// Function to create a new post if the user is logged in
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost)
    } catch (err) {
        res.status(400).json(err);
    }
});

// Function to update a post
router.put('/:id', async (req, res) => {
    const updatedPost = await Post.update(
        {
            title: req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    );

    res.json(updatedPost);
});

// Function to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            }
        });
        if (!postData) {
            res.status(404).json({ message: "No post with this ID or Invalid permissions" })
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Function to view one post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        if (!postData) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const post = postData.get({ plain: true });

        return res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;