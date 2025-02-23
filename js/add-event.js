import config from './config.js';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('concertForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        // Reset messages
        successMessage.classList.add('d-none');
        errorMessage.classList.add('d-none');

        // Validate form
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Verify reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            document.getElementById('recaptchaError').style.display = 'block';
            return;
        }

        try {
            // Prepare form data
            const formData = {
                submitterName: document.getElementById('submitterName').value,
                submitterEmail: document.getElementById('submitterEmail').value,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value,
                title: document.getElementById('title').value,
                description: document.getElementById('description').value,
                artist: document.getElementById('artist').value,
                genre: document.getElementById('genre').value,
                venue: document.getElementById('venue').value,
                city: document.getElementById('city').value,
                cost: document.getElementById('cost').value,
                ticketLink: document.getElementById('ticketLink').value,
                posterLink: document.getElementById('posterLink').value,
                recaptchaResponse: recaptchaResponse
            };

            // Submit to Google Sheet
            const response = await fetch(
                `https://script.google.com/macros/s/${config.GOOGLE_SCRIPT_ID}/exec`,
                {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Show success message
            form.reset();
            form.classList.remove('was-validated');
            grecaptcha.reset();
            successMessage.classList.remove('d-none');
            
        } catch (error) {
            console.error('Error:', error);
            errorMessage.classList.remove('d-none');
        }
    });

    // Add input validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (input.checkValidity()) {
                input.classList.remove('is-invalid');
                input.classList.add('is-valid');
            } else {
                input.classList.remove('is-valid');
                input.classList.add('is-invalid');
            }
        });
    });
});
