const router = require('express').Router();
const {User, Comment, Post} = require('../../models');
const withAuth = require('../../utils/auth');

// Function to create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Function to update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    };
});

// Function to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            }
    });
    if (!deletedPost) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
    }
    res.status(200).json(deletedPost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// Function to view one post
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{model: User, attributes: ['username'],}],
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.json(200).json(postData);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
 );

module.exports = router;