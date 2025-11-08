// Configuration - Replace this URL with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxJUoswQNu4ZAp1-ZwcKR6_PK4iXN71KIG2TNJNeGbWuTXX8MkQ6T4v6kOkJGSDLg/exec';

// Form handling
document.getElementById('customerForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const form = e.target;

    // Disable button and show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Gönderiliyor...';

    // Collect form data
    const birthDay = document.getElementById('birthDay').value;
    const birthMonth = document.getElementById('birthMonth').value;
    const birthYear = document.getElementById('birthYear').value;
    const birthday = (birthDay && birthMonth && birthYear)
        ? `${birthDay} ${birthMonth} ${birthYear}`
        : 'Not provided';

    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        birthday: birthday,
        referral: document.getElementById('referral').value || 'Not specified',
        favoriteTaste: document.getElementById('favoriteTaste').value.trim() || 'Not specified',
        consent: document.getElementById('consent').checked,
        timestamp: new Date().toISOString()
    };

    // Validate consent
    if (!formData.consent) {
        showNotification('Lütfen tanıtım iletişimlerini almayı kabul edin', 'error');
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Gönder';
        return;
    }

    try {
        console.log('🚀 Sending data to Google Sheets...', formData);

        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Note: no-cors mode doesn't allow reading the response
        // We'll assume success and let the backend handle duplicate checking
        console.log('✅ Request sent successfully');

        // Success! Show message and reset form
        showNotification('Katıldığınız için teşekkür ederiz! İlk kez kayıt oluyorsanız, hoş geldiniz e-postanız için e-postanızı kontrol edin.', 'success');

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
        showNotification('Bir şeyler yanlış gitti. Lütfen tekrar deneyin veya doğrudan bizimle iletişime geçin.', 'error');
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Gönder';
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
        showNotification('Lütfen geçerli bir e-posta adresi girin', 'error');
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
