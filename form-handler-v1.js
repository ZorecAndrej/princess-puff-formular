// Configuration - Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';

// Form handling
document.getElementById('customerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const form = e.target;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Submitting...';

    // Collect form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        birthday: document.getElementById('birthday').value || 'Not provided',
        referral: document.getElementById('referral').value || 'Not specified',
        favoriteProduct: document.getElementById('favoriteProduct').value.trim() || 'Not specified',
        consent: document.getElementById('consent').checked,
        timestamp: new Date().toISOString()
    };

    // Validate consent
    if (!formData.consent) {
        showNotification('Please agree to receive promotional communications', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Join the Sweet Community';
        return;
    }

    try {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Note: no-cors mode doesn't allow reading the response
        // We assume success if no error is thrown

        // Show success message
        showNotification('Welcome to Princess Puff! Check your email for exclusive offers.', 'success');

        // Reset form
        form.reset();

        // Optional: Track conversion (if you use Google Analytics)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_submission', {
                'event_category': 'engagement',
                'event_label': 'customer_signup'
            });
        }

    } catch (error) {
        console.error('Error:', error);
        showNotification('Something went wrong. Please try again or contact us directly.', 'error');
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit';
    }
});

// Notification function
function showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';

    if (type === 'success') {
        notification.style.background = '#0a0a0a';
        notification.style.border = '1px solid #C9A961';
        notification.style.color = '#C9A961';
    } else {
        notification.style.background = '#0a0a0a';
        notification.style.border = '1px solid #ef4444';
        notification.style.color = '#ef4444';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.4s ease-out reverse';
        setTimeout(() => notification.remove(), 400);
    }, 5000);
}

// Phone number formatting (optional enhancement)
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    // This is a basic formatter - adjust based on your region
    if (value.length > 0 && !value.startsWith('381') && !value.startsWith('+')) {
        // Auto-add country code if needed
    }
});

// Email validation enhancement
document.getElementById('email').addEventListener('blur', function(e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = '#ef4444';
        showNotification('Please enter a valid email address', 'error');
    } else {
        e.target.style.borderColor = '#e5e7eb';
    }
});

// Form field animations
const inputs = document.querySelectorAll('.input-field');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});
