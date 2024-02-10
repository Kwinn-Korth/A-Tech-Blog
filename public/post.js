const commentModal = document.getElementById('commentModal');
const commentButton = document.getElementById('commentButton');
const commentModalClose = document.getElementById('commentModalClose');

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

const newComment = async (event) => {
    event.preventDefault();
    const content = document.querySelector('#currentPost').value.trim();
    if (content) {
        const response = await fetch(`/api/comments/${currentPost}`, {
            method: 'POST',
            body: JSON.stringify({ content, currentPost }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(`/post/${currentPost}`);
        } else {
            alert('Failed to comment');
        }
    }
};

document
    .querySelector('#newCommentButton')
    .addEventListener('click', newComment);