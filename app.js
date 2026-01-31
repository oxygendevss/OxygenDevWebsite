const header = document.querySelector('.header.container');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = 'rgba(26, 26, 26, 0.98)';
	} else {
		header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
	}
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
				
				// Close mobile menu if open
				if (mobile_menu && mobile_menu.classList.contains('active')) {
					hamburger.classList.remove('active');
					mobile_menu.classList.remove('active');
				}
			}
		}
	});
});

// Chat button animation on load
window.addEventListener('load', () => {
	const chatButton = document.getElementById('chatButton');
	if (chatButton) {
		setTimeout(() => {
			chatButton.style.opacity = '1';
		}, 1000);
	}
});

// ============================================
// MODERN SCROLL ANIMATIONS & GEN-Z EFFECTS
// ============================================

// Enhanced Intersection Observer for Scroll Animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver(function(entries) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
			// Remove observer after animation to improve performance
			scrollObserver.unobserve(entry.target);
		}
	});
}, observerOptions);

// Add fade-up animation to sections and cards
document.querySelectorAll('section:not(#hero):not(#header)').forEach(section => {
	section.classList.add('fade-up');
	scrollObserver.observe(section);
});

// Animate cards and items with stagger
document.querySelectorAll('.overview-item, .service-card, .why-item, .case-study-card, .tech-category, .contact-info-card, .mission, .vision').forEach((el, index) => {
	el.classList.add('fade-up');
	el.style.transitionDelay = `${(index % 6) * 0.1}s`;
	scrollObserver.observe(el);
});

// Animate section titles
document.querySelectorAll('.section-title').forEach((el, index) => {
	el.classList.add('fade-in');
	el.style.transitionDelay = `${index * 0.2}s`;
	scrollObserver.observe(el);
});

// Count-Up Animation for Numbers
function animateCounter(element, target, duration = 2000) {
	let start = 0;
	const increment = target / (duration / 16);
	const timer = setInterval(() => {
		start += increment;
		if (start >= target) {
			element.textContent = target + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
			clearInterval(timer);
		} else {
			element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '') + (element.textContent.includes('%') ? '%' : '');
		}
	}, 16);
}

// Observe stats for count-up animation
const statsObserver = new IntersectionObserver(function(entries) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const text = entry.target.textContent;
			const number = parseInt(text.replace(/\D/g, ''));
			if (number && !entry.target.classList.contains('counted')) {
				entry.target.classList.add('counted', 'counter-animate');
				entry.target.textContent = '0' + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
				animateCounter(entry.target, number);
				statsObserver.unobserve(entry.target);
			}
		}
	});
}, { threshold: 0.5 });

// Find and observe stat numbers
document.querySelectorAll('.stat-item h3, .clients-stat h2 strong').forEach(stat => {
	statsObserver.observe(stat);
});

// Ripple Effect for Buttons
document.querySelectorAll('.cta, button').forEach(button => {
	button.addEventListener('click', function(e) {
		if (this.classList.contains('ripple')) {
			const ripple = document.createElement('span');
			ripple.style.cssText = `
				position: absolute;
				border-radius: 50%;
				background: rgba(255, 255, 255, 0.6);
				width: 20px;
				height: 20px;
				margin-top: -10px;
				margin-left: -10px;
				top: ${e.offsetY}px;
				left: ${e.offsetX}px;
				transform: scale(0);
				animation: ripple 0.6s;
				pointer-events: none;
			`;
			this.appendChild(ripple);
			setTimeout(() => ripple.remove(), 600);
		}
	});
});

// Parallax Effect on Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const parallaxElements = document.querySelectorAll('.parallax');
	
	parallaxElements.forEach(el => {
		const speed = el.dataset.speed || 0.5;
		const yPos = -(scrolled * speed);
		el.style.transform = `translateY(${yPos}px)`;
	});
	
	lastScroll = scrolled;
}, { passive: true });

// Word-by-Word Text Reveal for Hero
function revealTextByWords(element) {
	const text = element.textContent;
	const words = text.split(' ');
	element.textContent = '';
	
	words.forEach((word, index) => {
		const span = document.createElement('span');
		span.textContent = word + ' ';
		span.style.opacity = '0';
		span.style.transform = 'translateY(20px)';
		span.style.transition = `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
		element.appendChild(span);
		
		setTimeout(() => {
			span.style.opacity = '1';
			span.style.transform = 'translateY(0)';
		}, 100);
	});
}

// Apply word reveal to hero tagline after initial animation
setTimeout(() => {
	const heroTagline = document.querySelector('.hero-tagline');
	if (heroTagline) {
		revealTextByWords(heroTagline);
	}
}, 2500);

// Smooth Cursor Follow Effect (Subtle)
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
}, { passive: true });

// Animate cursor follow
function animateCursor() {
	cursorX += (mouseX - cursorX) * 0.1;
	cursorY += (mouseY - cursorY) * 0.1;
	requestAnimationFrame(animateCursor);
}
animateCursor();

// Add animated mesh background to hero
const hero = document.querySelector('#hero');
if (hero) {
	const mesh = document.createElement('div');
	mesh.classList.add('animated-mesh');
	hero.appendChild(mesh);
}

// Enhanced Button Hover Glow
document.querySelectorAll('.cta-primary').forEach(btn => {
	btn.addEventListener('mouseenter', function() {
		this.style.boxShadow = '0 0 30px rgba(220, 20, 60, 0.6), 0 8px 25px rgba(220, 20, 60, 0.4)';
	});
	btn.addEventListener('mouseleave', function() {
		this.style.boxShadow = '';
	});
});

// Form Input Focus Enhancement
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
	input.addEventListener('focus', function() {
		this.parentElement.style.transform = 'scale(1.01)';
		this.parentElement.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
	});
	input.addEventListener('blur', function() {
		this.parentElement.style.transform = 'scale(1)';
	});
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
	position: fixed;
	top: 0;
	left: 0;
	width: 0%;
	height: 3px;
	background: linear-gradient(90deg, #dc143c, #ff3366);
	z-index: 9999;
	transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

// Hide scroll indicator when scrolling past hero
const scrollIndicator = document.querySelector('.scroll-indicator');
window.addEventListener('scroll', () => {
	const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	const scrolled = (window.scrollY / windowHeight) * 100;
	scrollProgress.style.width = scrolled + '%';
	
	// Hide scroll indicator after hero section
	if (scrollIndicator && window.scrollY > 300) {
		scrollIndicator.style.opacity = '0';
		scrollIndicator.style.transition = 'opacity 0.3s ease';
	} else if (scrollIndicator) {
		scrollIndicator.style.opacity = '0.7';
	}
}, { passive: true });

// Add smooth entrance animation to page load
window.addEventListener('load', () => {
	document.body.style.opacity = '0';
	document.body.style.transition = 'opacity 0.5s ease';
	setTimeout(() => {
		document.body.style.opacity = '1';
	}, 100);
});

// ============================================
// ADDITIONAL ANIMATIONS & INTERACTIONS
// ============================================

// Add magnetic hover effect to cards
document.querySelectorAll('.service-card, .case-study-card, .overview-item').forEach(card => {
	card.addEventListener('mousemove', function(e) {
		const rect = this.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		
		const moveX = (x - centerX) / 10;
		const moveY = (y - centerY) / 10;
		
		this.style.transform = `translateY(-12px) scale(1.02) translate(${moveX}px, ${moveY}px)`;
	});
	
	card.addEventListener('mouseleave', function() {
		this.style.transform = '';
	});
});

// Add scale-in animation to images on load
document.querySelectorAll('img').forEach(img => {
	img.style.opacity = '0';
	img.style.transform = 'scale(0.95)';
	img.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	
	const imgObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'scale(1)';
				imgObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.1 });
	
	imgObserver.observe(img);
});

// Add animated gradient to section titles
document.querySelectorAll('.section-title').forEach(title => {
	title.addEventListener('mouseenter', function() {
		this.style.background = 'linear-gradient(90deg, #1a1a1a, #dc143c, #1a1a1a)';
		this.style.backgroundSize = '200% auto';
		this.style.webkitBackgroundClip = 'text';
		this.style.webkitTextFillColor = 'transparent';
		this.style.backgroundClip = 'text';
		this.style.animation = 'gradientText 3s linear infinite';
	});
});

// Add stagger animation to service grid
const servicesGrid = document.querySelector('.services-grid');
if (servicesGrid) {
	servicesGrid.classList.add('stagger-children');
}

// Add rotate on hover to icons
document.querySelectorAll('.service-icon, .overview-icon, .why-icon').forEach(icon => {
	icon.addEventListener('mouseenter', function() {
		this.style.transform = 'rotate(360deg) scale(1.2)';
		this.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
	});
	icon.addEventListener('mouseleave', function() {
		this.style.transform = '';
	});
});

// Add pulse animation to CTA buttons periodically
setInterval(() => {
	document.querySelectorAll('.cta-primary').forEach(btn => {
		btn.style.animation = 'glowPulse 2s ease-in-out';
		setTimeout(() => {
			btn.style.animation = '';
		}, 2000);
	});
}, 10000);

// Add scroll-triggered animations for tech items
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
	item.style.opacity = '0';
	item.style.transform = 'scale(0.8) rotate(-10deg)';
	
	const techObserver = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				setTimeout(() => {
					entry.target.style.opacity = '1';
					entry.target.style.transform = 'scale(1) rotate(0deg)';
					entry.target.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.05}s`;
				}, index * 50);
				techObserver.unobserve(entry.target);
			}
		});
	}, { threshold: 0.2 });
	
	techObserver.observe(item);
});

// Add animated border to active navigation items
const updateActiveNav = () => {
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('#header .nav-list ul a');
	
	const scrollPos = window.scrollY + 100;
	
	sections.forEach(section => {
		const top = section.offsetTop;
		const height = section.offsetHeight;
		const id = section.getAttribute('id');
		
		if (scrollPos >= top && scrollPos < top + height) {
			navLinks.forEach(link => {
				link.classList.remove('active-nav');
				if (link.getAttribute('href') === `#${id}`) {
					link.classList.add('active-nav');
				}
			});
		}
	});
};

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// Add CSS for active nav
const style = document.createElement('style');
style.textContent = `
	.active-nav {
		color: #dc143c !important;
		position: relative;
	}
	.active-nav::after {
		content: '';
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: 2px;
		background: #dc143c;
		animation: slideInLeft 0.3s ease;
	}
`;
document.head.appendChild(style);
