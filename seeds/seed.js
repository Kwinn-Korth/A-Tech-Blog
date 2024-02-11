const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Create users
    await User.bulkCreate([
        {
            username: 'jrjimmer',
            password: 'password123',
            email: 'jrjimmer@gmail.com'
        },
        {
            username: 'joshhigg',
            password: 'password123',
            email: 'joshhigg@gmail.com'
        },
        {
            username: 'nadee.z',
            password: 'password123',
            email: 'nadee.z@gmail.com'
        }
    ]);

    // Create posts
    await Post.bulkCreate([
        {
            title: 'Understanding RESTful APIs',
            post_text: 'RESTful APIs are a crucial aspect of modern web development.',
            user_id: 1
        },
        {
            title: 'Introduction to React Hooks',
            post_text: 'React Hooks provide a more concise and readable way to write React components.',
            user_id: 2
        },
        {
            title: 'Deploying Node.js Applications with Docker',
            post_text: 'Docker simplifies the deployment process for Node.js applications.',
            user_id: 3
        }
    ]);

    // Create comments
    await Comment.bulkCreate([
        {
            comment_text: 'I love RESTful APIs!',
            user_id: 1,
            post_id: 1
        },
        {
            comment_text: 'React Hooks are amazing!',
            user_id: 2,
            post_id: 2
        },
        {
            comment_text: 'Docker is a game-changer for deployment.',
            user_id: 3,
            post_id: 3
        }
    ]);
};

seedDatabase();
