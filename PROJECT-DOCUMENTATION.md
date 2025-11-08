# 📋 Princess Puff Customer Sign-Up Form - Kompletna Dokumentacija

## 📖 **SADRŽAJ**
1. [O Projektu](#o-projektu)
2. [Funkcionalnost](#funkcionalnost)
3. [Tehnički Detalji](#tehnički-detalji)
4. [Trenutno Stanje](#trenutno-stanje)
5. [Transfer Ownership](#transfer-ownership)
6. [Deploy Online](#deploy-online)
7. [Uputstvo za Korišćenje](#uputstvo-za-korišćenje)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 **O PROJEKTU**

**Projekat:** Customer data collection form za Princess Puff poslastičarnicu
**Lokacija:** Belgrade, Serbia
**Vlasnik:** Jarred Cozen (jarredcozen@gmail.com)
**Developer:** Andrej Zorec (andrej.zorec@wm.rs)
**Folder:** `D:\dev\princess-puff-formular\`

### **Svrha:**
Prikupljanje customer podataka za marketing i email kampanje. Sistem automatski šalje welcome email-ove na turskom i notifikacije owner-u na engleskom.

---

## ✅ **FUNKCIONALNOST**

### **1. Customer Sign-Up Forma**

**Jezik:**
- Frontend: TURSKI (forma, poruke, validacija)
- Backend: ENGLESKI (Google Sheet kolone, owner email)

**Polja:**
- First Name (obavezno) - Auto-capitalize
- Last Name (obavezno) - Auto-capitalize, apostrophe handling
- Email Address (obavezno) - Auto-lowercase
- Phone Number (obavezno) - TEXT format
- Birthday (opciono) - Day/Month/Year (engleski meseci u backend-u)
- How did you hear about us? (opciono) - Instagram, Facebook, Friend/Family, Google Search, Walking by, Other
- Favorite Taste (opciono)
- Marketing Consent (obavezno) - checkbox

**Validacija:**
- Client-side validacija
- Email format provera
- Duplicate email BLOKIRANJE (backend)
- Turkish characters support (ş, ğ, ü, ö, ç, ı)

---

### **2. Email Sistem**

#### **Welcome Email (za korisnike):**

**Jezik:** TURSKI
**Šalje se:** SAMO prvi put (novi email)
**NE šalje se:** Ako je email već registrovan

**Sadržaj:**
```
Subject: 👑 Princess Puff Topluluğuna Hoş Geldiniz

Sevgili [FirstName],

Princess Puff topluluğuna hoş geldiniz! 🍪

Türkiye'deki açılışımızdan sonra, tüm üyelerimiz özel indirimler,
etkinlik davetleri ve özel hediyeler alacak.

Saygılarımızla,
Princess Puff Ekibi

---
Princess Puff
Belgrade, Serbia
```

---

#### **Owner Notification Email:**

**Jezik:** ENGLESKI
**Šalje se:** Za SVAKOG novog korisnika
**Prima:** orders@princesspuff.com

**Sadržaj:**
```
Subject: 🆕 New Customer: [FirstName] [LastName]

New customer has joined Princess Puff!

Customer Details:
- Name: [FirstName] [LastName]
- Email: [email]
- Phone: [phone]
- Birthday: [birthday]
- Heard from: [referral]
- Favorite Taste: [favoriteTaste]
- Signed up: [timestamp]

✅ Welcome email sent to customer.

Check your Google Sheet for full details.
```

---

### **3. Google Sheet CRM**

**Kolone (na ENGLESKOM):**
1. **Timestamp** - Auto-generated
2. **First Name** - Auto-capitalized
3. **Last Name** - Auto-capitalized (apostrophe support)
4. **Email** - Lowercase, kolona D (za duplicate check)
5. **Phone** - TEXT format (prevents #ERROR!)
6. **Birthday** - Format: "15 February 1990" (engleski meseci)
7. **How They Heard** - Instagram, Facebook, Friend/Family, Google Search, Walking by, Other
8. **Favorite Taste** - Free text
9. **Marketing Consent** - "Yes" ili "No"

**Styling:**
- Header: Gold (#C9A961), bold
- Alternating rows: Cream (#FFF8F0)
- Frozen header row
- Auto-resized columns

---

### **4. Duplicate Email Blokiranje**

**Princip:**
- Backend proverava email u koloni D (case-insensitive)
- Ako postoji → error
- Ako nov → registracija

**Error poruka:** "Bu e-posta adresi zaten kayıtlı. Lütfen gelen kutunuzu kontrol edin!"

**Šta se dešava:**
| Akcija | Prvi put | Drugi put |
|--------|----------|-----------|
| Upis u Sheet | ✅ DA | ❌ NE |
| Welcome email | ✅ DA | ❌ NE |
| Owner email | ✅ DA | ❌ NE |

---

## 🎨 **DIZAJN**

### **Brend:**
- **Boje:** Black (#000), Dark gray (#0a0a0a), Gold (#C9A961)
- **Stil:** Luxury, minimalistički, elegantno
- **Fontovi:**
  - Playfair Display (serif) - naslovi
  - Inter (sans-serif) - body tekst

### **Layout:**

**Desktop:**
```
┌─────────────────────────────────────┐
│                                     │
│  FORMA (levo)    │   SLIKA (desno)  │
│                  │                  │
│  [Input fields]  │   [Puff sa       │
│  [Submit btn]    │    kafe zrnima]  │
│                  │                  │
└─────────────────────────────────────┘
```

**Mobile:**
```
┌──────────────┐
│   FORMA      │
│              │
│ [Input]      │
│ [Input]      │
│ [Submit]     │
│              │
│ (slika       │
│  skrivena)   │
└──────────────┘
```

### **Key Features:**
- Transparentna pozadina forme
- Input polja sa blur efektom (`backdrop-filter: blur(10px)`)
- Gold border na focus
- Custom checkbox (gold)
- Smooth animations (fade-in, hover efekti)

---

## 💻 **TEHNIČKI DETALJI**

### **Fajlovi:**

```
D:\dev\princess-puff-formular\
├── index.html              # Glavna forma (v2 - final)
├── form-handler.js         # Frontend JavaScript
├── google-apps-script.js   # Backend (Google Apps Script)
├── hero-image.jpg          # Hero slika (puff sa kafe zrnima)
├── README.md               # Setup instrukcije
├── PROJECT-DOCUMENTATION.md # Ovaj fajl
├── index-v1.html          # Backup (sa crown SVG header-om)
└── form-handler-v1.js     # Backup verzija
```

### **Stack:**

**Frontend:**
- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript (ES6+)
- Google Fonts (Playfair Display, Inter)

**Backend:**
- Google Apps Script (JavaScript)
- Google Sheets API
- Gmail API (MailApp)

**Integration:**
- Fetch API
- JSON data format
- CORS handling

---

### **form-handler.js - Ključne funkcije:**

```javascript
// Google Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwoRMIZJlbnKQVVR4ApDy6zeEhPtJ2q_oH-8haYGbn0zb6hEYaKInxuoTnM5AHAbU3x/exec';

// Prikuplja podatke iz forme
- firstName, lastName
- email, phone
- birthday (kombinuje Day/Month/Year)
- referral, favoriteTaste
- consent, timestamp

// Šalje na Google Sheets
- POST request sa JSON payload
- no-cors mode (zbog file:// protokola)
- Success/error notifikacije

// Validacija
- Email format check
- Required fields check
- Consent checkbox check
```

---

### **google-apps-script.js - Ključne funkcije:**

```javascript
// generateDiscountCode()
- Generiše PP2025-XXXXX format
- 5 random karaktera (A-Z, 2-9)

// checkIfEmailExists(sheet, email)
- Proverava kolonu D (Email)
- Case-insensitive poređenje
- Vraća true/false

// doPost(e)
- Prima POST request
- Proverava duplicate email
- Kreira headere ako je prvi unos
- Upisuje podatke u Google Sheet
- Šalje emailove
- Vraća JSON response

// sendWelcomeEmail(data, discountCode)
- Šalje welcome email korisniku
- Uključuje unique discount kod

// sendOwnerNotification(data, discountCode)
- Šalje notifikaciju owner-u
- Svi customer detalji
```

---

## 📊 **TRENUTNO STANJE**

### **Deployment Status:**

✅ **Lokalno funkcionalno**
- Radi sa `file://` protokolom

✅ **Apps Script Deploy-ovan**
- Account: Drugarov Google account
- Owner email: orders@princesspuff.com
- Execute as: Me (drugarov account)
- Who has access: Anyone

✅ **Google Sheet**
- Owner: Drugarov account
- Kolone: Timestamp, First Name, Last Name, Email, Phone, Birthday, How They Heard, Favorite Taste, Marketing Consent

✅ **Language Setup**
- Frontend (forma): TURSKI
- Backend (Google Sheet, Owner email): ENGLESKI
- Customer email: TURSKI

✅ **Data Formatting**
- Imena: Auto-capitalize (ahmet → Ahmet, o'brien → O'Brien)
- Email: Lowercase (Test@Gmail.Com → test@gmail.com)
- Phone: TEXT format (bez #ERROR!)
- Meseci: Engleski u backend-u (January, February...)

❌ **Nije deploy-ovano online**
- Nema javnog URL-a
- Ne može QR kod
- **SLEDEĆI KORAK:** GitHub + Netlify deploy

---

### **Testiranje:**

**Testirano:**
✅ Form submission - radi
✅ Google Sheet upis - radi
✅ Welcome email - stiže
✅ Owner notifikacija - stiže
✅ Unique kod generisanje - radi
✅ Duplicate email blokiranje - radi (backend)
✅ Responsive dizajn - radi

**Ne radi:**
❌ "Email already registered" poruka (CORS zbog file://)

---

## 🔄 **TRANSFER OWNERSHIP**

### **CILJ:**
Prebaciti sve sa Andrej-evog account-a na drugarov account kako bi:
- Emailovi išli sa njegovog brenda
- On kontrolisao Google Sheet
- Owner notifikacije stizale njemu

---

### **OPCIJA 1: Screen Share Session (PREPORUČENO)**

#### **Alati:**
- AnyDesk
- TeamViewer
- Google Meet (screen share)
- Zoom

#### **Proces:**

**Priprema (5 min):**
1. Drugar instalira AnyDesk/TeamViewer
2. Deli ID/link sa Andrej-em
3. Andrej se konektuje

**Setup (15 min):**
1. Drugar se loguje na svoj Google account
2. Andrej kontroliše ekran remotely
3. Kreira Google Sheet "Princess Puff Customers"
4. Extensions → Apps Script
5. Copy-paste kod iz `google-apps-script.js`
6. Save projekt
7. Deploy → New deployment → Web app
   - Execute as: Me (drugarov account)
   - Who has access: Anyone
8. Authorize access (drugar klikne Allow)
9. Copy Web App URL
10. Pošalje Andrej-u URL

**Finalizacija:**
- Andrej update-uje `form-handler.js` sa novim URL-om
- Testiranje
- Gotovo!

#### **Prednosti:**
✅ NEMA deljenja passworda
✅ Siguran pristup
✅ Brzo (15 min)
✅ Andrej vodi proceduru

---

### **OPCIJA 2: Privremeni Pristup**

#### **Šta drugar daje:**
- Email + password Google account-a (privremeno)

#### **Proces:**

**Andrej radi:**
1. Login na drugarov Google account
2. Kreira Google Sheet
3. Setup Apps Script
4. Deploy Web App
5. Copy URL
6. Logout

**Drugar posle:**
- Menja password
- **Sve ostaje funkcionalno!**

#### **Važno:**
✅ Apps Script deployment NIJE vezan za password
✅ Google Sheet ostaje
✅ Emailovi idu sa drugarovog account-a
✅ Siguran transfer

---

### **Transfer Checklist:**

```
Pre transfera:
□ Drugar ima Google account (Gmail ili Workspace)
□ Odlučen pristup (screen share ili login)
□ Andrej ima kod spreman

Tokom transfera:
□ Google Sheet kreiran na drugarovom account-u
□ Apps Script kod paste-ovan
□ Deployment kreiran (Web app, Anyone)
□ URL kopiran
□ Testiran sa dummy podatkom

Posle transfera:
□ form-handler.js update-ovan sa novim URL-om
□ Testiran end-to-end
□ Drugar promenio password (ako treba)
□ Andrej-ev Google Sheet i Apps Script obrisani
```

---

## 🚀 **DEPLOY ONLINE**

### **ZAŠTO?**

**Za owner-a:**
✅ Jedan URL za sve radnje (npr. `princesspuff.netlify.app`)
✅ QR kod - printuje, stavlja na pult
✅ Bilo koji uređaj - telefon, tablet, kompjuter
✅ Nema instalacija - samo link
✅ Auto-update - sve radnje vide izmene odmah

**Za developera (Andrej):**
✅ Edituje lokalno - VS Code
✅ Git push - jedna komanda
✅ Auto-deploy - Netlify/Vercel
✅ Version control - čuva istoriju

---

### **OPCIJE:**

#### **1. Netlify (Preporučeno)**

**Prednosti:**
- 100% besplatno
- Auto-deploy sa GitHub-a
- Custom domain support
- HTTPS automatski
- Fast CDN

**Setup (10 min):**
1. GitHub repo (upload kod)
2. Netlify account (connect GitHub)
3. Deploy settings:
   - Build command: (none)
   - Publish directory: `/`
4. Deploy
5. URL: `princesspuff.netlify.app`

---

#### **2. Vercel**

**Prednosti:**
- Brži od Netlify
- Odlična DX
- Analytics

**Setup:**
- Isti kao Netlify
- URL: `princesspuff.vercel.app`

---

#### **3. GitHub Pages**

**Prednosti:**
- Direktno sa GitHub-a
- Besplatno

**Mane:**
- Malo sporije setup
- URL: `username.github.io/princess-puff-form`

---

### **DEPLOYMENT PLAN:**

#### **KORAK 1: GitHub Repo**

```bash
# Inicijalizuj Git
cd D:\dev\princess-puff-formular
git init

# Dodaj fajlove
git add .

# Commit
git commit -m "Initial commit - Princess Puff form"

# Kreiraj GitHub repo (na github.com)
# New repository → princess-puff-form

# Connect i push
git remote add origin https://github.com/USERNAME/princess-puff-form.git
git branch -M main
git push -u origin main
```

#### **KORAK 2: Netlify Deploy**

1. Idi na [netlify.com](https://netlify.com)
2. Sign up (sa GitHub account-om)
3. **New site from Git**
4. Connect GitHub
5. Izaberi `princess-puff-form` repo
6. Deploy settings:
   - Build command: (ostavi prazno)
   - Publish directory: `/`
7. **Deploy site**
8. Dobija URL: `random-name-12345.netlify.app`

#### **KORAK 3: Custom Domain (Opciono)**

1. Netlify → Domain settings
2. Add custom domain: `princesspuff.com` ili `form.princesspuff.com`
3. Update DNS records (ako drugar ima domain)

---

### **WORKFLOW ZA IZMENE:**

```bash
# 1. Edituj fajl lokalno (VS Code)
# npr. promeni boju u index.html

# 2. Commit
git add .
git commit -m "Update: Changed button color to gold"

# 3. Push
git push

# 4. Netlify auto-deploy (30 sekundi)
# Sve radnje vide novi update!
```

---

### **POST-DEPLOY:**

✅ **QR Kod:**
- Generator: [qr-code-generator.com](https://www.qr-code-generator.com)
- URL: `https://princesspuff.netlify.app`
- Format: PNG, 300x300px
- Print i stavi na pult u radnjama

✅ **Testiranje:**
- Desktop, tablet, mobile
- Različiti browseri
- Submit test podatke
- Proveri Google Sheet
- Proveri emailove

✅ **CORS fix:**
- Online deployment rešava CORS problem
- "Email already registered" poruka sada radi!

---

## 📖 **UPUTSTVO ZA KORIŠĆENJE (Za Vlasnika)**

### **Dnevna Upotreba:**

#### **1. Google Sheet - Praćenje Korisnika**

**Link:** [Google Sheet URL]

**Šta vidiš:**
- Sve registrovane korisnike
- Contact info (email, phone)
- Birthday datume
- Discount kodove
- Status kodova (Used/Not Used)

**Kako koristiti:**
- **Filter:** Data → Create a filter
- **Search:** `Ctrl+F` za brzu pretragu
- **Export:** File → Download → CSV (za Mailchimp)

---

#### **2. Discount Kod Tracking**

**Scenario:** Korisnik dolazi sa kodom `PP2025-K8H3M`

**Proces:**
1. Otvori Google Sheet
2. `Ctrl+F` → unesi kod `PP2025-K8H3M`
3. Pronađi red
4. Proveri kolonu **"Code Used"**:
   - Ako piše **"No"** → KOD JE VALIDAN ✅
     - Daj 10% popust
     - Promeni "No" → **"Yes"**
   - Ako piše **"Yes"** → KOD JE VEĆ KORIŠĆEN ❌
     - Ne daj popust
     - Objasni korisniku da je već iskorišćen

**Napomena:** Jednom iskorišten kod ne može ponovo!

---

#### **3. URL Forme - Deljenje sa Korisnicima**

**Online URL:** `https://princesspuff.netlify.app` (posle deploya)

**Kako deliti:**

**Opcija 1: QR Kod (Preporučeno)**
- Printuj QR kod
- Stavi u ram na pultu
- Korisnici skeniraju telefonom
- Automatski otvara formu

**Opcija 2: Link**
- Pošalji na Instagram DM
- Stavi u Instagram bio
- Email potpis
- Facebook post

**Opcija 3: Tablet na pultu**
- iPad/Android tablet
- Otvori URL
- Klijenti popunjavaju na licu mesta

---

#### **4. Email Marketing**

**Export email liste:**
1. Google Sheet → Kolona D (Email)
2. Select svi email-ovi
3. Copy
4. Paste u Mailchimp/Sendinblue

**Besplatni servisi:**
- **Mailchimp:** Do 500 kontakata besplatno
- **Sendinblue:** Do 300 email-ova dnevno
- **MailerLite:** Do 1000 subscribera

**Birthday kampanje:**
- Filter po koloni "Birthday"
- Izvuci rođendane za tekući mesec
- Pošalji "Happy Birthday" email sa special ponudom

---

### **ŠTA NE TREBA DA RADIŠ:**

❌ **NE MENJAJ** Google Apps Script kod
❌ **NE BRIŠI** Google Sheet kolone
❌ **NE DELI** Apps Script URL javno
❌ **NE BUNI** discount kodove sa drugim akcijama

---

### **Šta Radiš Ako:**

**Problem:** Forma ne radi
→ **Kontaktiraj Andreja** (andrej.zorec@wm.rs)

**Problem:** Email-ovi ne stižu korisnicima
→ Proveri Spam folder prvo
→ Kontaktiraj Andreja

**Problem:** Duplicate korisnik želi novi kod
→ NE daj - jedan email = jedan kod (policy)
→ Može da koristi stari kod ako nije iskorišćen

**Problem:** Korisnik izgubio email sa kodom
→ Pronađi u Google Sheet-u po email-u
→ Pošalji mu kod ručno

---

## 🔧 **TROUBLESHOOTING**

### **Forma Issues:**

**Problem:** "Something went wrong" poruka
- **Uzrok:** Apps Script nije deploy-ovan ili URL pogrešan
- **Rešenje:**
  1. Proveri Apps Script deployment (Manage deployments)
  2. Proveri URL u `form-handler.js` linija 2

**Problem:** CORS error u Console-u
- **Uzrok:** Otvara se sa `file://` protokola
- **Rešenje:** Deploy online (Netlify/Vercel)

**Problem:** Forma submituje ali nema podataka u Sheet-u
- **Uzrok:** Apps Script greška
- **Rešenje:**
  1. Apps Script editor → Executions
  2. Vidi error log
  3. Kontaktiraj developera

---

### **Email Issues:**

**Problem:** Welcome email ne stiže
- **Uzrok 1:** Spam folder
  - **Rešenje:** Proveri Spam/Junk
- **Uzrok 2:** Duplicate email
  - **Rešenje:** Email već registrovan - ne šalje ponovo
- **Uzrok 3:** Apps Script permissions
  - **Rešenje:** Re-authorize Apps Script

**Problem:** Owner notifikacija ne stiže
- **Uzrok:** Pogrešan email u kodu
- **Rešenje:**
  1. Apps Script → funkcija `sendOwnerNotification`
  2. Proveri liniju: `const ownerEmail = '...'`
  3. Update ako treba

---

### **Google Sheet Issues:**

**Problem:** Headeri nestali
- **Uzrok:** Slučajno obrisani
- **Rešenje:** Submituj novu formu - automatski kreira headere

**Problem:** Data formatting pogrešan
- **Uzrok:** Google Sheets auto-format
- **Rešenje:** Select kolona → Format → Plain text

---

## 📞 **KONTAKT**

**Developer:**
Andrej Zorec
Email: andrej.zorec@wm.rs
Telefon: +381 63 621 224

**Owner:**
Jarred Cozen
Email: jarredcozen@gmail.com

---

## 📝 **VERSION HISTORY**

**v2.1** (Current) - Nov 8, 2025
- Frontend na TURSKOM (forma, poruke)
- Backend na ENGLESKOM (Sheet, owner email)
- Uklonjen discount kod sistem
- Auto-capitalize imena (sa apostrophe handlingom)
- Email auto-lowercase
- Phone TEXT format fix
- Turkish characters full support
- Owner email: orders@princesspuff.com
- Birthday meseci engleski u backend-u

**v2.0** - Nov 7, 2025
- Black & gold luxury dizajn
- Split screen layout
- Birthday dropdown
- Duplicate email blokiranje

**v1.0** - Initial version
- Pink/purple gradient
- Basic functionality

---

## 🎯 **PROMPT ZA SLEDEĆU SESIJU**

```
Nastavljamo Princess Puff formu - ONLINE DEPLOYMENT.

ZAVRŠENO:
- Forma funkcionalna lokalno (turski frontend, engleski backend)
- Apps Script deploy-ovan na drugarov account
- Owner email: orders@princesspuff.com
- Auto-capitalize, lowercase email, apostrophe handling
- Phone TEXT format, duplicate email blokiranje
- Fajlovi: D:\dev\princess-puff-formular\

SLEDEĆI KORACI:
1. GitHub repo setup (init, add, commit, push)
2. Netlify deployment (connect GitHub, deploy)
3. QR kod generisanje (sa Netlify URL-om)
4. Test online forma

Sve detalje vidi u PROJECT-DOCUMENTATION.md.
```

---

## ✅ **CHECKLIST ZA FINALIZACIJU**

**Završeno:**
- [x] Apps Script na drugarov account
- [x] Owner email: orders@princesspuff.com
- [x] Frontend na turskom
- [x] Backend na engleskom
- [x] Auto-capitalize, lowercase email
- [x] Phone TEXT format fix
- [x] Apostrophe handling (O'Brien)
- [x] Turkish characters support
- [x] Duplicate email blokiranje
- [x] Email sistem testiran
- [x] Edge case-ovi pokriveni

**Preostaje:**
- [ ] GitHub repo setup
- [ ] Netlify deployment
- [ ] QR kod generisanje
- [ ] Online testiranje

---

## 🎓 **LEARNING RESOURCES**

**Za owner-a (ako želi da nauči više):**
- Google Sheets basics: [YouTube Tutorial](https://www.youtube.com/results?search_query=google+sheets+tutorial)
- Mailchimp email marketing: [Mailchimp Academy](https://mailchimp.com/help/)

**Za developera:**
- Google Apps Script docs: [developers.google.com/apps-script](https://developers.google.com/apps-script)
- Netlify docs: [docs.netlify.com](https://docs.netlify.com)

---

## 🎨 **FRONTEND FEATURES (Može bez backend pristupa)**

**Lake implementacije (mogu se dodati bez Google account pristupa):**
- Copy discount code dugme (3 min)
- Loading spinner tokom submit-a (2 min)
- Favicon - tab ikonica (2 min)
- Confetti animation posle registracije 🎉 (10 min)
- Autocomplete atributi za browser autofill (5 min)
- Google Analytics tracking (5 min)
- Social media linkovi u footeru (5 min)
- Meta tags za social sharing (5 min)
- Save draft u LocalStorage (15 min)

**Zahteva backend izmenu (Google Apps Script pristup):**
- Prikaz discount koda ODMAH posle submit-a (10 min - screen share)

---

## 🎂 **FUTURE FEATURE: Birthday Automation**

**Planirana funkcionalnost za implementaciju kasnije:**
- Google Apps Script time-driven trigger (svako jutro 6am)
- Automatski proverava rođendane za današnji dan u Google Sheet-u
- Šalje birthday email sa special discount kodom (format: `PP2025-BDAY-XXXXX`)
- **Implementacija:** Screen share session sa vlasnikom (15-20 min)
- **Kompleksnost:** Medium (Apps Script kod ~100 linija + trigger setup)
- **Troškovi:** $0 (besplatno, koristi Gmail API limit 100 email-ova/dan)

**Kada implementirati:** FAZA 3 - posle transfera ownership-a i online deploya

---

**Dokumentacija kreirana:** Nov 7, 2025
**Poslednji update:** Nov 8, 2025
**Verzija:** 2.1

---

🍪 **Princess Puff - Belgrade's Finest Patisserie** 🍪
