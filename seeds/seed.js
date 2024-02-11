const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Create users
    await User.bulkCreate([
        {
            username: 'johndoe',
            password: 'password123',
            email: 'johndoe@gmail.com'
        },
        {
            username: 'lorumipsum',
            password: 'password123',
            email: 'lorumipsum@gmail.com'
        },
        {
            username: 'steve',
            password: 'password123',
            email: 'steve@steve.com'
        }
    ]);

    // Create posts
    await Post.bulkCreate([
        {
            title: 'Understanding regular expressions',
            post_text: 'Never even try, it isnt worth it.',
            user_id: 1
        },
        {
            title: 'On the subject of handlebars',
            post_text: 'I think that React makes more sense than handlebars .',
            user_id: 2
        },
        {
            title: 'Deploying a application',
            post_text: 'I would recommend using netlify because they make it simple but you have to use vite.',
            user_id: 3
        }
    ]);

    // Create comments
    await Comment.bulkCreate([
        {
            comment_text: 'I read a great gist by someone to learn regex!',
            user_id: 1,
            post_id: 1
        },
        {
            comment_text: 'Handlebars makes no sense, I always use React!',
            user_id: 2,
            post_id: 2
        },
        {
            comment_text: 'What if I dont want to use vite? I dont like it.',
            user_id: 3,
            post_id: 3
        }
    ]);
};

seedDatabase();
