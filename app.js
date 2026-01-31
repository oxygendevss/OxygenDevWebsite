const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.container');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
	} else {
		header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

// Contact Form Handler with Formspree
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
	contactForm.addEventListener('submit', async function(e) {
		e.preventDefault();
		
		// Get form data
		const formData = {
			name: document.getElementById('contact-name').value.trim(),
			email: document.getElementById('contact-email').value.trim(),
			company: document.getElementById('contact-company').value.trim(),
			role: document.getElementById('contact-role').value,
			service: document.getElementById('contact-service').value,
			message: document.getElementById('contact-message').value.trim()
		};
		
		// Validate required fields
		if (!formData.name || !formData.email || !formData.message) {
			alert('Please fill in all required fields (Name, Email, and Message).');
			return;
		}
		
		// Show loading state
		const submitButton = contactForm.querySelector('.cta-submit');
		const originalButtonText = submitButton.textContent;
		submitButton.textContent = 'Sending...';
		submitButton.disabled = true;
		
		// Prepare data for Formspree in simple format (name, email, message)
		// Combine all additional fields into the message
		let fullMessage = formData.message;
		if (formData.company || formData.role || formData.service) {
			fullMessage = '';
			if (formData.company) {
				fullMessage += `Company: ${formData.company}\n`;
			}
			if (formData.role) {
				fullMessage += `Role: ${formData.role}\n`;
			}
			if (formData.service) {
				fullMessage += `Service Interest: ${formData.service}\n`;
			}
			fullMessage += `\nProject Details:\n${formData.message}`;
		}
		
		const formspreeData = new FormData();
		formspreeData.append('name', formData.name);
		formspreeData.append('email', formData.email);
		formspreeData.append('message', fullMessage);
		
		try {
			// Submit to Formspree
			const response = await fetch('https://formspree.io/f/xykjqqav', {
				method: 'POST',
				body: formspreeData,
				headers: {
					'Accept': 'application/json'
				}
			});
			
			// Check if submission was successful
			if (response.ok) {
				// Show success message
				contactForm.style.display = 'none';
				contactSuccess.style.display = 'block';
				
				// Scroll to success message
				contactSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
				
				// Reset form
				contactForm.reset();
				
				// Reset button
				submitButton.textContent = originalButtonText;
				submitButton.disabled = false;
			} else {
				// Handle API error (non-200 response)
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.error || 'Form submission failed');
			}
		} catch (error) {
			// Show error message on page
			const contactError = document.getElementById('contactError');
			contactForm.style.display = 'none';
			contactError.style.display = 'block';
			contactError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
			
			// Also try to open email client as fallback
			const userWantsEmail = confirm(
				`Failed to submit form. Would you like to open your email client with a pre-filled message?\n\n` +
				`Click OK to open email client, or Cancel to use the contact form again.`
			);
			
			if (userWantsEmail) {
				// Open email client as fallback
				const subject = encodeURIComponent(`Contact Form Submission - ${formData.service || 'General Inquiry'}`);
				const body = encodeURIComponent(
					`Name: ${formData.name}\n` +
					`Email: ${formData.email}\n` +
					`Company: ${formData.company || 'Not provided'}\n` +
					`Role: ${formData.role || 'Not provided'}\n` +
					`Service Interest: ${formData.service || 'Not specified'}\n\n` +
					`Message:\n${formData.message}`
				);
				window.location.href = `mailto:oxygendevelopers@gmail.com?subject=${subject}&body=${body}`;
			}
			
			// Reset button
			submitButton.textContent = originalButtonText;
			submitButton.disabled = false;
		}
	});
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		if (href !== '#' && href !== '') {
			e.preventDefault();
			const target = document.querySelector(href);
			if (target) {
				const headerOffset = 80;
				const elementPosition = target.getBoundingClientRect().top;
				const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

				window.scrollTo({
					top: offsetPosition,
					behavior: 'smooth'
				});
			}
		}
	});
});

// Add animation on scroll
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.opacity = '1';
			entry.target.style.transform = 'translateY(0)';
		}
	});
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.overview-item, .service-card, .why-item, .case-study-card, .tech-category, .contact-info-card').forEach(el => {
	el.style.opacity = '0';
	el.style.transform = 'translateY(30px)';
	el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	observer.observe(el);
});

// Add stagger animation delay
document.querySelectorAll('.overview-item').forEach((el, index) => {
	el.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.service-card').forEach((el, index) => {
	el.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.why-item').forEach((el, index) => {
	el.style.transitionDelay = `${index * 0.1}s`;
});
