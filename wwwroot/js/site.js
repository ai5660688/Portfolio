// ===== Portfolio — Main Script =====

(function () {
    "use strict";

    // --- Navbar scroll effect ---
    const navbar = document.getElementById("mainNav");
    const backToTop = document.getElementById("backToTop");

    function onScroll() {
        const scrolled = window.scrollY > 60;
        navbar?.classList.toggle("scrolled", scrolled);
        backToTop?.classList.toggle("visible", window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll);
    onScroll();

    // --- Smooth-scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });

                // Close mobile nav if open
                const toggler = document.querySelector(".navbar-collapse.show");
                if (toggler) {
                    new bootstrap.Collapse(toggler).hide();
                }
            }
        });
    });

    // --- Intersection Observer for scroll animations ---
    const animElements = document.querySelectorAll(".animate-on-scroll");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animElements.forEach(function (el) { observer.observe(el); });
    } else {
        // Fallback: show everything
        animElements.forEach(function (el) { el.classList.add("visible"); });
    }

    // --- Active nav highlight on scroll ---
    const sections = document.querySelectorAll("section[id]");

    function highlightNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(function (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");
            const link = document.querySelector('.navbar .nav-link[href="#' + id + '"]');
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            }
        });
    }
    window.addEventListener("scroll", highlightNav);
    highlightNav();

    // --- Contact form (client-side placeholder) ---
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var btn = form.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
            btn.disabled = true;
            btn.style.opacity = ".8";
            setTimeout(function () {
                form.reset();
                btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
                btn.disabled = false;
                btn.style.opacity = "1";
            }, 3000);
        });
    }
})();
