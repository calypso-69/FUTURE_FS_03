// =====================================================
//  SONAM'S BAKERY — JavaScript
//  Author: [Karmanya Kedia] | Future Interns Project 2026
//  Description: Handles all interactivity on the page
// =====================================================


// ── 1. NAVBAR: Add shadow on scroll ─────────────────
window.addEventListener('scroll', function () {

  // Add 'scrolled' class to navbar when user scrolls down
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Show/hide the back-to-top button
  const backToTop = document.getElementById('backToTop');
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

});


// ── 2. MOBILE MENU: Toggle open/close ───────────────
function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('open');
}

// Close the mobile menu when any link is clicked
document.querySelectorAll('.nav-links a').forEach(function (link) {
  link.addEventListener('click', function () {
    document.getElementById('navLinks').classList.remove('open');
  });
});


// ── 3. SCROLL REVEAL ANIMATIONS ─────────────────────
// Uses IntersectionObserver to add 'visible' class
// when elements scroll into view

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Observe all elements with the 'reveal' class
document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});


// ── 4. MENU FILTER: Show/hide by category ───────────
function filterMenu(category, clickedBtn) {

  // Remove 'active' from all filter buttons
  document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.classList.remove('active');
  });

  // Set clicked button as active
  clickedBtn.classList.add('active');

  // Show or hide menu cards based on category
  document.querySelectorAll('.menu-card').forEach(function (card) {
    const match = (category === 'all') || (card.dataset.cat === category);

    if (match) {
      card.style.display = 'block';
      card.style.animation = 'fadeSlideUp 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });

}


// ── 5. WISHLIST: Toggle heart icon ──────────────────
function toggleHeart(btn) {

  if (btn.textContent === '🤍') {
    btn.textContent = '❤️';
    showToast('❤️ Added to favourites!');
  } else {
    btn.textContent = '🤍';
  }

}


// ── 6. WHATSAPP ORDER: From menu card ───────────────
function orderOnWhatsApp(productName) {

  // Build the pre-filled WhatsApp message
  const message = `Hi Sonam! I'd like to order: ${productName}. Can you please share more details and pricing? 🎂`;

  // Open WhatsApp with the message
  const whatsappURL = `https://wa.me/918511845653?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');

}


// ── 7. WHATSAPP ORDER: From contact form ────────────
function sendOrderWhatsApp() {

  // Get form values
  const name    = document.getElementById('cName').value.trim();
  const phone   = document.getElementById('cPhone').value.trim();
  const product = document.getElementById('cProduct').value;
  const notes   = document.getElementById('cMessage').value.trim();

  // Basic validation — make sure required fields are filled
  if (!name || !phone || !product) {
    showToast('⚠️ Please fill in all required fields!');
    return;
  }

  // Build a structured order message for WhatsApp
  const message =
    `🎂 *New Order from Sonam Bakery Website!*\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `🛒 Product: ${product}\n` +
    `📝 Notes: ${notes || 'None'}\n\n` +
    `Please confirm my order! Thank you 😊`;

  // Send to WhatsApp
  const whatsappURL = `https://wa.me/918511845653?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');

  showToast('✅ Redirecting to WhatsApp!');

}


// ── 8. TOAST NOTIFICATION ───────────────────────────
function showToast(message) {

  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');

  // Hide the toast after 3 seconds
  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);

}


// ── 9. BACK TO TOP BUTTON ───────────────────────────
document.getElementById('backToTop').addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
