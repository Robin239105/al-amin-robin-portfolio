# Premium Full-Stack Developer Portfolio

A high-performance, stunningly designed, and fully SEO-optimized Single Page Application (SPA) developer portfolio. Built using **React**, **Vite**, **TailwindCSS**, and **Framer Motion** for sleek micro-interactions and smooth animations.

---

## 🌟 Key Features

- **Modern & Interactive UI**: Beautiful dark-mode dashboard aesthetics with glassmorphic cards, orange accent glows, and smooth transitions.
- **Dynamic SEO Engine**: Auto-injects dynamic HTML head meta-tags, canonical links, and customized JSON-LD structured schemas (`Person`, `ProfilePage`, `CollectionPage`, `ContactPage`) on every route change for high search visibility.
- **Sitemap & Robots.txt**: Pre-configured automatic sitemap routes for Google Search indexing.
- **Interactive Chatbot Widget**: Clean floating assistant to answer common questions and guide users.
- **Contact Intake System**: Interactive form backed by a secure PHP Mailer backend (`send-email.php`) with support for uploading project files/specifications.
- **Responsive Layout**: Designed for optimal reading on all screens, from mobile devices to large desktop monitors.

---

## 🚀 Tech Stack

- **Frontend Core**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS, CSS Variables, Lucide Icons, React Icons
- **Animations**: Framer Motion, GSAP
- **Backend Email Handler**: PHP (with PHPMailer / native multi-part mail support)

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Robin239105/al-amin-robin-portfolio.git
   cd al-amin-robin-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Build the production bundle:**
   ```bash
   npm run build
   ```

---

## ✉️ Contact Form Setup (PHP Backend)

The form submissions on the contact page are directed to `/send-email.php`.

To configure or deploy the email script on Apache or shared cPanel hosting:
1. Ensure your hosting server runs **PHP 7.4 or newer**.
2. Open `public/send-email.php` and set your recipient email:
   ```php
   $recipient = 'contact@alaminrobin.com';
   ```
3. The script automatically checks if you have **PHPMailer** installed via Composer. If not, it falls back to secure native PHP `mail()` formatting, so it works out-of-the-box on standard hosts while preserving the beautiful HTML template and attachments.

---

## 📄 License

This repository is open-sourced under the MIT License. Feel free to copy, modify, and distribute for your personal projects.
