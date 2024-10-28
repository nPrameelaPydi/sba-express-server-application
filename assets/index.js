document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('postForm');
    const feedbackDiv = document.getElementById('feedback');

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = {
            userId: document.getElementById('userId').value,
            title: document.getElementById('title').value,
            content: document.getElementById('content').value
        };

        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                showFeedback('Post created successfully!', 'success');
                event.target.reset();
            } else {
                showFeedback('Error: ' + result.error, 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            showFeedback('Error creating post. Please try again.', 'error');
        }
    }

    function showFeedback(message, type) {
        feedbackDiv.textContent = message;
        feedbackDiv.className = `feedback ${type}`;
        feedbackDiv.style.display = 'block';

        // Optional: Scroll to feedback
        feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    form.addEventListener('submit', handleSubmit);
});