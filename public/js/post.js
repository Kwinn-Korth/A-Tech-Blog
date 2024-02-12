const commentModal = document.getElementById('createCommentModal');
const commentButton = document.getElementById('comment-button');
const commentModalClose = commentModal.getElementsByClassName("close")[0];

commentButton.onclick = function() {
    commentModal.style.display = 'block';
};

commentModalClose.onclick = function() {
    commentModal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target === commentModal) {
        commentModal.style.display = 'none';
    }
};

const currentPost = document.querySelector('#currentPost').textContent;

const newCommentHandler = async (event) => {
    event.preventDefault();
    const content = document.querySelector('#add-comment').value.trim();
    if (content) {
        const response = await fetch(`/api/comments/${currentPost}`, {
            method: 'POST',
            body: JSON.stringify({ content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/post/${currentPost}`);
            console.log('Comment added');
        } else {
            alert('Failed to comment');
        }
    }
};

document
    .querySelector('#newCommentButton')
    .addEventListener('click', newCommentHandler);