const createModal = document.getElementById('createPostModal');
const editModal = document.getElementById('editPostModal');
const createButton = document.getElementById('createPostButton');
const editButtons = document.querySelectorAll('editPostButton');
const createModalClose = createModal.getElementsByClassName('close')[0];
const editModalClose = editModal.getElementsByClassName('close')[0];

createButton.onclick = function() {
    createModal.style.display = 'block';
};

createModalClose.onclick = function() {
    createModal.style.display = 'none';
};

editModalClose.onclick = function() {
    editModal.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target === createModal) {
        createModal.style.display = 'none';
    }
    if (event.target === editModal) {
        editModal.style.display = 'none';
    }
};

const newPost = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    if (title && content) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create post');
        }
    }
};

const editPost = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        const post = await response.json();
        document.querySelector('#editTitle').value = postData.title;
        document.querySelector('#editContent').value = postData.content;
        editModal.style.display = 'block';

        const saveChanges = async (event) => {
            event.preventDefault();
            const title = document.querySelector('#editTitle').value.trim();
            const content = document.querySelector('#editContent').value.trim();
            if (title && content) {
                const response = await fetch(`/api/posts/${postId}`, {
                    method: 'PUT',
                    body: JSON.stringify({ title, content }),
                    headers: { 'Content-Type': 'application/json' },
                });
                if (response.ok) {
                    document.location.replace('/profile');
                } else {
                    alert('Failed to edit post');
                }
            }
        };
    }
};

const deletePost = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete post');
        }
    }
};

editButtons.forEach(function (button) {
    button.onclick = function () {
        const postId = button.getAttribute('data-id');
        editPost(event, postId);
    }
}
);

document
    .querySelector('#newPostButton')
    .addEventListener('click', newPost);

document
    .querySelector('#deletePostButton')
    .addEventListener('click', deletePost);