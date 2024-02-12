const createModal = document.getElementById('createPostModal');
const editModal = document.getElementById('editPostModal');
const newButton = document.getElementById("new-button");
const editButtons = document.querySelectorAll(".edit-button");
const createModalClose = createModal.getElementsByClassName("close")[0];
const editModalClose = editModal.getElementsByClassName("close")[0];

newButton.onclick = function () {
    createModal.style.display = "block";
};

createModalClose.onclick = function () {
    createModal.style.display = "none";
};

editModalClose.onclick = function () {
    editModal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == createModal) {
        createModal.style.display = "none";
    }
    if (event.target == editModal) {
        editModal.style.display = "none";
    }
};

const newPostHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-post').value.trim();
    const content = document.querySelector('#content-post').value.trim();
    if (title && content) {
        const response = await fetch('./api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create post')
        }
    }
};

const editPostHandler = async (event, postId) => {
    event.preventDefault();
    const response = await fetch(`./api/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const postData = await response.json();
        document.querySelector('#edit-title-post').value = postData.title;
        document.querySelector('#edit-content-post').value = postData.content;
        editModal.style.display = 'block';
        const saveChangesHandler = async (event) => {
            event.preventDefault();
            const title = document.querySelector('#edit-title-post').value.trim();
            const content = document.querySelector('#edit-content-post').value.trim();
            if (title && content) {
                const response = await fetch(`./api/posts/${postId}`, {
                    method: 'PUT',
                    body: JSON.stringify({ title, content }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    document.location.replace('/profile');
                } else {
                    alert('Failed to edit post')
                }
            }
        };
        document
            .querySelector('#saveChangesButton')
            .addEventListener('click', saveChangesHandler);
    } else {
        alert('Failed to fetch post data');
    }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete post')
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
    .addEventListener('click', newPostHandler);

document
    .querySelector('#deletePostButton')
    .addEventListener('click', delButtonHandler);