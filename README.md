# Oxygen Developers Website

A modern, attractive website for Oxygen Developers - a full-cycle software development and technology solutions company.

## Features

- 🎨 Modern, attractive design with smooth animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 📅 Booking/Appointment system for consultations
- 💼 Comprehensive About Us section
- 🛠️ Skills and expertise showcase
- 📧 Contact form integration
- ⚡ Fast loading and optimized

## Technologies Used

- HTML5
- CSS3 (with animations and gradients)
- JavaScript (Vanilla JS)
- GitHub Pages compatible

## GitHub Pages Deployment

This website is designed to work seamlessly with GitHub Pages. To deploy:

1. **Push to GitHub Repository**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll down to **Pages** section
   - Under **Source**, select **main** branch (or your default branch)
   - Select **/ (root)** folder
   - Click **Save**

3. **Access Your Website**
   - Your site will be available at: `https://[username].github.io/[repository-name]`
   - It may take a few minutes for the site to be live

## Local Development

To run this website locally:

1. Clone the repository
   ```bash
   git clone [your-repo-url]
   cd OxygenDevWebsite
   ```

2. Open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. Navigate to `http://localhost:8000` in your browser

## File Structure

```
OxygenDevWebsite/
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── app.js              # JavaScript functionality
├── img/                # Images directory
└── README.md           # This file
```

## Features Breakdown

### Booking System
- Interactive booking form
- Email integration (opens email client with pre-filled form)
- Service selection dropdown
- Date picker for preferred consultation date

### About Us Section
- Company mission and vision
- Statistics showcase
- Professional presentation

### Skills Section
- Core technologies display
- Tools & frameworks showcase
- Interactive hover effects

### Contact Section
- Multiple contact options
- Social media links
- Quick contact buttons

## Customization

### Update Contact Information
Edit the email addresses and social media links in `index.html`:
- Search for `oxygendevelopers@gmail.com` and replace with your email
- Update LinkedIn and GitHub links in the contact section and footer

### Change Colors
The main brand color is `#dc143c` (crimson). To change it:
- Search for `#dc143c` in `style.css` and replace with your color
- Also update `crimson` references

### Add/Remove Skills
Edit the skills section in `index.html` (around line 95-200) to add or remove skill items.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Oxygen Developers. All rights reserved.

## Contact

For questions or support, contact: oxygendevelopers@gmail.com

