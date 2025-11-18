/**
 * Contact Form Handler for DestoraTech
 * Handles form submission, validation, and user feedback
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        
        const form = document.getElementById('contactForm');
        const statusDiv = document.getElementById('form-status');
        const submitBtn = document.getElementById('submitBtn');
        
        // Check if elements exist
        if (!form || !statusDiv || !submitBtn) {
            console.error('Contact form elements not found');
            return;
        }

        // Form validation function
        function validateForm() {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const service = document.getElementById('service') ? document.getElementById('service').value : '';

            // Validate name
            if (name === '' || name.length < 2) {
                showStatus('error', 'Please enter a valid name (at least 2 characters)');
                return false;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showStatus('error', 'Please enter a valid email address');
                return false;
            }

            // Validate subject
            if (subject === '' || subject.length < 5) {
                showStatus('error', 'Please enter a subject (at least 5 characters)');
                return false;
            }

            // Validate message
            if (message === '' || message.length < 20) {
                showStatus('error', 'Please enter a detailed message (at least 20 characters)');
                return false;
            }

            // Validate service if field exists
            if (document.getElementById('service') && service === '') {
                showStatus('error', 'Please select a service');
                return false;
            }

            return true;
        }

        // Show status message function
        function showStatus(type, message) {
            statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            let icon = '';
            let alertClass = '';

            switch(type) {
                case 'success':
                    icon = '<i class="fas fa-check-circle me-2"></i>';
                    alertClass = 'alert-success';
                    break;
                case 'error':
                    icon = '<i class="fas fa-exclamation-circle me-2"></i>';
                    alertClass = 'alert-danger';
                    break;
                case 'loading':
                    icon = '<i class="fas fa-spinner fa-spin me-2"></i>';
                    alertClass = 'alert-info';
                    break;
                default:
                    icon = '<i class="fas fa-info-circle me-2"></i>';
                    alertClass = 'alert-info';
            }

            statusDiv.innerHTML = `
                <div class="alert ${alertClass} animate__animated animate__fadeIn" role="alert">
                    ${icon}${message}
                </div>
            `;

            // Auto-hide success or info messages after 5 seconds
            if (type === 'success' || type === 'info') {
                setTimeout(() => {
                    statusDiv.innerHTML = '';
                }, 5000);
            }
        }

        // Reset button to default state
        function resetButton() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
        }

        // Set button to loading state
        function setButtonLoading() {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        }

        // Handle form submission
        form.addEventListener('submit', async function(event) {
            event.preventDefault();

            // Clear previous status
            statusDiv.innerHTML = '';

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Set loading state
            setButtonLoading();
            showStatus('loading', 'Sending your message, please wait...');

            // Prepare form data
            const formData = new FormData(form);

            try {
                // Submit to Formspree
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    showStatus(
                        'success', 
                        '<strong>Thank You!</strong> Your message has been sent successfully. I\'ll get back to you within 24-48 hours.'
                    );
                    
                    // Reset form
                    form.reset();

                    // Optional: Send confirmation email notification
                    console.log('Form submitted successfully');

                    // Optional: Track with analytics
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'form_submission', {
                            'event_category': 'Contact',
                            'event_label': 'Contact Form Submission'
                        });
                    }

                } else {
                    // Server error
                    const data = await response.json();
                    if (data.errors) {
                        const errorMessages = data.errors.map(error => error.message).join(', ');
                        showStatus('error', `<strong>Error:</strong> ${errorMessages}`);
                    } else {
                        showStatus(
                            'error', 
                            '<strong>Oops!</strong> Something went wrong. Please try again or email me directly at <a href="mailto:Destoratech55@gmail.com" class="text-white"><u>Destoratech55@gmail.com</u></a>'
                        );
                    }
                }

            } catch (error) {
                // Network error
                console.error('Form submission error:', error);
                showStatus(
                    'error', 
                    '<strong>Network Error!</strong> Unable to send message. Please check your internet connection or email me directly at <a href="mailto:Destoratech55@gmail.com" class="text-white"><u>Destoratech55@gmail.com</u></a>'
                );
            } finally {
                // Reset button state
                resetButton();
            }
        });

        // Real-time validation on blur
        const formFields = ['name', 'email', 'subject', 'message'];
        formFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', function() {
                    if (this.value.trim() === '') {
                        this.classList.add('is-invalid');
                    } else {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                });

                // Remove validation classes on focus
                field.addEventListener('focus', function() {
                    this.classList.remove('is-invalid', 'is-valid');
                });
            }
        });

        // Email validation on input
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('input', function() {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(this.value)) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else if (this.value.length > 0) {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        }

        // Character counter for message field
        const messageField = document.getElementById('message');
        if (messageField) {
            const counterDiv = document.createElement('small');
            counterDiv.className = 'text-muted';
            counterDiv.style.float = 'right';
            messageField.parentElement.appendChild(counterDiv);

            messageField.addEventListener('input', function() {
                const length = this.value.length;
                const minLength = 20;
                const remaining = minLength - length;

                if (length < minLength) {
                    counterDiv.textContent = `${remaining} more characters needed`;
                    counterDiv.style.color = '#dc3545';
                } else {
                    counterDiv.textContent = `${length} characters`;
                    counterDiv.style.color = '#28a745';
                }
            });
        }

        // Prevent double submission
        let isSubmitting = false;
        form.addEventListener('submit', function() {
            if (isSubmitting) {
                return false;
            }
            isSubmitting = true;
            setTimeout(() => {
                isSubmitting = false;
            }, 3000);
        });

        console.log('Contact form handler initialized successfully');
    });

})();