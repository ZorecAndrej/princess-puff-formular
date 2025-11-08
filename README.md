# 🧁 Princess Puff - Customer Sign-Up Form

A beautiful, modern customer data collection form for Princess Puff patisserie. Collect customer information with automatic Google Sheets integration.

## ✨ Features

- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Beautiful Design** - Modern pink/purple gradient theme
- ✅ **Form Validation** - Client-side validation for all fields
- 📊 **Google Sheets Integration** - Automatic data collection in spreadsheet
- 📧 **Email Notifications** - Optional welcome emails for customers
- 🎂 **Birthday Tracking** - Collect birthdays for special offers
- 🔒 **GDPR Compliant** - Marketing consent checkbox
- ⚡ **Fast & Lightweight** - No heavy frameworks required

## 📋 Collected Data

- First Name & Last Name
- Email Address
- Phone Number
- Birthday (optional)
- How they heard about you (optional)
- Favorite product (optional)
- Marketing consent
- Timestamp

## 🚀 Quick Setup (15 minutes)

### Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Princess Puff Customers" (or any name you prefer)

### Step 2: Setup Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy the **entire content** from `google-apps-script.js` file
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) and name the project "Princess Puff Form Handler"

### Step 3: Deploy Web App

1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Select **Web app**
4. Configure the deployment:
   - **Description**: "Princess Puff Form v1"
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. If prompted, click **Authorize access** and grant permissions
7. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 4: Connect Form to Google Sheets

1. Open `form-handler.js` file in a text editor
2. Find line 2: `const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';`
3. Replace `YOUR_GOOGLE_SCRIPT_URL_HERE` with your Web App URL from Step 3
4. Save the file

Example:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123DEF456GHI789/exec';
```

### Step 5: Test Your Form

1. Open `index.html` in a web browser (double-click the file)
2. Fill out the form with test data
3. Click "Join the Sweet Community"
4. Check your Google Sheet - the data should appear!

## 📧 Optional: Enable Email Notifications

### Welcome Email for Customers

1. Open `google-apps-script.js` in Apps Script editor
2. Find the `sendWelcomeEmail` function
3. Customize the email content (subject, body, discount code)
4. The email will automatically send when customers sign up

### Owner Notifications

1. In `google-apps-script.js`, find the `sendOwnerNotification` function
2. Replace `YOUR_EMAIL@example.com` with your actual email
3. Uncomment this line:
   ```javascript
   // MailApp.sendEmail(ownerEmail, subject, body);
   ```
   Remove the `//` to activate it:
   ```javascript
   MailApp.sendEmail(ownerEmail, subject, body);
   ```
4. Save and deploy a new version

## 🌐 Hosting Options

Choose one of these FREE hosting options:

### Option 1: Netlify (Recommended)
1. Go to [Netlify](https://www.netlify.com)
2. Sign up for free
3. Drag and drop your folder (with all files)
4. Done! You get a URL like `princess-puff.netlify.app`
5. Optional: Add custom domain

### Option 2: GitHub Pages
1. Create a GitHub account
2. Create a new repository named "princess-puff-form"
3. Upload all files
4. Go to Settings → Pages
5. Select main branch and save
6. Your site will be at `yourusername.github.io/princess-puff-form`

### Option 3: Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up for free
3. Import your project
4. Deploy!

### Option 4: Local Hosting
- Simply open `index.html` in a browser
- Share the file with someone on the same network
- Works offline!

## 🎨 Customization

### Change Colors

Edit `index.html`, find the tailwind.config section:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'puff-pink': '#FFB6C1',      // Change these!
                'puff-purple': '#E6B8FF',    // Change these!
                'puff-cream': '#FFF8F0',     // Change these!
            }
        }
    }
}
```

### Add/Remove Form Fields

1. Edit `index.html` to add HTML input fields
2. Edit `form-handler.js` to collect the new field data
3. Edit `google-apps-script.js` to add new column headers

### Change Form Text

All text is in `index.html` - just search and replace!

## 📊 View Your Data

### In Google Sheets
- All customer data appears automatically
- Sort, filter, and analyze as needed
- Export to CSV/Excel anytime
- Create charts and graphs

### Optional: Create Dashboard
In your Google Sheet's Apps Script, run the `createDashboard()` function to auto-generate a summary dashboard.

## 🔒 Privacy & Security

- All data is stored in YOUR Google account
- No third-party has access to customer data
- SSL encrypted (when hosted online)
- GDPR compliant with consent checkbox
- No cookies, no tracking scripts

## 📱 Mobile Friendly

The form automatically adjusts to:
- Phones (320px+)
- Tablets (768px+)
- Desktops (1024px+)

## 🐛 Troubleshooting

### Form submits but no data in Sheet
- Double-check the Web App URL in `form-handler.js`
- Make sure you deployed the Apps Script as "Anyone" can access
- Check Apps Script executions: **Extensions** → **Apps Script** → **Executions**

### Email notifications not working
- Check your Gmail quota (100 emails/day for free accounts)
- Verify email addresses are correct
- Check spam folder
- Ensure MailApp.sendEmail line is uncommented

### Form doesn't load
- Open browser console (F12) to see errors
- Ensure all 3 files are in the same folder

### Styling looks broken
- Check your internet connection (Tailwind loads from CDN)
- Try a different browser

## 🆘 Support

### Need Help?
- Check [Google Apps Script Documentation](https://developers.google.com/apps-script)
- Review [Tailwind CSS Docs](https://tailwindcss.com)

## 📈 Next Steps

### Free CRM Integration
Export your Google Sheet to:
- **Mailchimp** (free up to 500 contacts) - for email marketing
- **HubSpot** (free CRM) - for contact management
- **Sendinblue** (free up to 300 emails/day) - for newsletters

### Analytics
Add Google Analytics to track:
- Form views
- Submission rate
- Traffic sources

### Advanced Features
- Add SMS notifications (Twilio)
- Add payment integration
- Create customer portal
- Add loyalty points system

---

## 🇷🇸 Srpski (Setup u 5 koraka)

### Korak 1: Napravi Google Sheet
1. Idi na [Google Sheets](https://sheets.google.com)
2. Napravi novu tabelu "Princess Puff Mušterije"

### Korak 2: Podesi Apps Script
1. Extensions → Apps Script
2. Obriši postojeći kod
3. Kopiraj SVE iz `google-apps-script.js`
4. Nalepi i sačuvaj

### Korak 3: Deploy Web App
1. Deploy → New deployment → Web app
2. Execute as: **Me**
3. Who has access: **Anyone**
4. Deploy i **kopiraj URL**

### Korak 4: Poveži formu
1. Otvori `form-handler.js`
2. Linija 2: ubaci svoj URL umesto `YOUR_GOOGLE_SCRIPT_URL_HERE`
3. Sačuvaj

### Korak 5: Testiraj
1. Otvori `index.html` u browser-u
2. Popuni formu
3. Proveri Google Sheet!

### Hosting (besplatno)
- **Netlify**: Prevuci folder na netlify.com
- **GitHub Pages**: Upload na GitHub, uključi Pages
- **Lokalno**: Samo otvori `index.html`

---

Made with 💖 for Princess Puff
