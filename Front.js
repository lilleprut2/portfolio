/*

TemplateMo 593 personal shape

https://templatemo.com/tm-593-personal-shape

*/

// JavaScript Document

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
        });

        // Close mobile menu when clicking on links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Enhanced Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Staggered animation for portfolio items
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.portfolio-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 150);
                    });
                }
            });
        }, { threshold: 0.1 });

        // Observe all animation elements
        document.addEventListener('DOMContentLoaded', () => {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            animatedElements.forEach(el => observer.observe(el));

            const portfolioSection = document.querySelector('.portfolio-grid');
            if (portfolioSection) {
                portfolioObserver.observe(portfolioSection);
            }
        });

        // Enhanced smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Enhanced form submission with better UX
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = document.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                // Add loading state
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';
                
                // Simulate form submission with better feedback
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent! ✓';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                    
                    // Show success animation
                    submitBtn.style.transform = 'scale(1.05)';
                    setTimeout(() => {
                        submitBtn.style.transform = 'scale(1)';
                    }, 200);
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        submitBtn.style.background = '';
                        contactForm.reset();
                    }, 3000);
                }, 2000);
            });
        }

        // Enhanced parallax effect for hero background
        let ticking = false;
        const hero = document.querySelector('.hero');
        
        function updateParallax() {
            if (!hero) {
                ticking = false;
                return;
            }
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });

        // Add subtle hover effects to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Certificate hover manager: debounce show/hide to avoid choppy transitions
        (() => {
            const hideTimers = new WeakMap();
            const overlayListeners = new WeakMap();
            const HIDE_DELAY = 180; // ms

            function attachHandlers() {
                const cards = document.querySelectorAll('.cert-card');
                if (!cards || cards.length === 0) return;

                cards.forEach(card => {
                    if (card.dataset.hoverAttached) return;
                    card.dataset.hoverAttached = '1';
                    const hover = card.querySelector('.cert-hover');

                        card.addEventListener('mouseenter', () => {
                        const t = hideTimers.get(card);
                        if (t) { clearTimeout(t); hideTimers.delete(card); }
                        card.classList.add('is-expanded');
                        // move overlay out of document flow so it doesn't force section scrolling
                        if (hover) attachFixedOverlay(card, hover);
                    });

                    card.addEventListener('mouseleave', () => {
                        const timer = setTimeout(() => {
                            card.classList.remove('is-expanded');
                            detachFixedOverlay(card, hover);
                            hideTimers.delete(card);
                        }, HIDE_DELAY);
                        hideTimers.set(card, timer);
                    });

                    // keyboard accessibility
                    card.addEventListener('focusin', () => {
                        const t = hideTimers.get(card);
                        if (t) { clearTimeout(t); hideTimers.delete(card); }
                        card.classList.add('is-expanded');
                        if (hover) attachFixedOverlay(card, hover);
                    });
                    card.addEventListener('focusout', () => {
                        const timer = setTimeout(() => { card.classList.remove('is-expanded'); detachFixedOverlay(card, hover); hideTimers.delete(card); }, HIDE_DELAY);
                        hideTimers.set(card, timer);
                    });
                    // click to open full image preview if available
                    card.addEventListener('click', (e) => {
                        // prefer the hover preview img, fall back to main image
                        const img = card.querySelector('.cert-hover-img') || card.querySelector('.cert-image img');
                        if (img && img.src) {
                            openLightbox(img.src, img.alt || card.querySelector('.cert-name')?.textContent || 'Certificate', card);
                            e.stopPropagation();
                        }
                    });
                });
            }

            // Helpers to position overlay fixed over the viewport so it doesn't expand the section
            function positionOverlay(card, hover) {
                const rect = card.getBoundingClientRect();
                // calculate a slightly larger overlay width so text has room (same as Campfire)
                const padding = 16;
                const viewportW = window.innerWidth - padding * 2;
                // make overlay match the card width but don't exceed viewport
                const desiredWidth = Math.min(rect.width, viewportW);
                // align the overlay's left edge with the card so it reads as an expansion
                let left = rect.left;
                left = Math.max(padding, Math.min(left, window.innerWidth - desiredWidth - padding));
                const top = Math.max(8, rect.top);
                hover.style.position = 'fixed';
                hover.style.left = left + 'px';
                hover.style.top = top + 'px';
                hover.style.width = desiredWidth + 'px';
                hover.style.zIndex = 9999;
            }

            function attachFixedOverlay(card, hover) {
                if (!hover) return;
                // if already attached, update position
                positionOverlay(card, hover);

                // measure content height by temporarily allowing auto height
                const rect = card.getBoundingClientRect();
                const initialHeight = rect.height;

                // prepare overlay for measurement
                const prevVisibility = hover.style.visibility;
                const prevHeight = hover.style.height;
                const prevMaxHeight = hover.style.maxHeight;

                hover.style.height = 'auto';
                hover.style.visibility = 'hidden';
                hover.style.maxHeight = '';
                // ensure width is set for accurate scrollHeight measurement
                const desiredWidth = hover.style.width || rect.width + 'px';
                hover.style.width = desiredWidth;
                const contentHeight = Math.min(hover.scrollHeight + 24, window.innerHeight * 0.8);

                // restore measurement state and set initial collapsed state
                hover.style.visibility = prevVisibility || '';
                hover.style.height = initialHeight + 'px';
                hover.style.maxHeight = contentHeight + 'px';

                // set up transition
                hover.style.transition = 'height 420ms cubic-bezier(.2,.9,.2,1), opacity 420ms cubic-bezier(.2,.9,.2,1), transform 420ms cubic-bezier(.2,.9,.2,1)';
                hover.style.transformOrigin = 'top left';
                hover.style.opacity = '0';
                hover.style.transform = 'translateY(6px) scale(0.995)';

                // force reflow then expand to measured content height
                // store data for cleanup
                const onUpdate = () => positionOverlay(card, hover);
                window.addEventListener('resize', onUpdate);
                window.addEventListener('scroll', onUpdate, { passive: true });

                const data = { onUpdate, initialHeight, contentHeight, prevStyles: { height: prevHeight, visibility: prevVisibility, maxHeight: prevMaxHeight } };
                overlayListeners.set(card, data);

                // start animation on next frame
                requestAnimationFrame(() => {
                    hover.style.height = data.contentHeight + 'px';
                    hover.style.opacity = '1';
                    hover.style.transform = 'translateY(0) scale(1)';
                });
            }

            function detachFixedOverlay(card, hover) {
                if (!hover) return;
                const data = overlayListeners.get(card);
                if (data && data.onUpdate) {
                    window.removeEventListener('resize', data.onUpdate);
                    window.removeEventListener('scroll', data.onUpdate, { passive: true });
                    overlayListeners.delete(card);
                }

                // animate collapse back to card height
                const collapseTo = (data && data.initialHeight) ? data.initialHeight : (card.getBoundingClientRect().height || 180);
                // ensure transition is set
                hover.style.transition = hover.style.transition || 'height 320ms cubic-bezier(.2,.9,.2,1), opacity 320ms cubic-bezier(.2,.9,.2,1), transform 320ms cubic-bezier(.2,.9,.2,1)';
                hover.style.height = collapseTo + 'px';
                hover.style.opacity = '0';
                hover.style.transform = 'translateY(6px) scale(0.995)';

                // after transition ends, cleanup inline styles so CSS rules take over
                const cleanup = (e) => {
                    if (e && e.target !== hover) return;
                    hover.removeEventListener('transitionend', cleanup);
                    hover.style.position = '';
                    hover.style.left = '';
                    hover.style.top = '';
                    hover.style.width = '';
                    hover.style.zIndex = '';
                    hover.style.height = '';
                    hover.style.maxHeight = '';
                    hover.style.transition = '';
                    hover.style.opacity = '';
                    hover.style.transform = '';
                    hover.style.transformOrigin = '';
                };

                hover.addEventListener('transitionend', cleanup);
            }

            // Attach immediately and also when DOM is ready (covers timing edge cases)
            // Lightbox for viewing full certificate images
            let lightbox;
            function createLightbox() {
                if (lightbox) return lightbox;
                const overlay = document.createElement('div');
                overlay.className = 'lightbox-overlay';
                overlay.innerHTML = `
                    <div class="lightbox-content">
                        <button class="lightbox-close" aria-label="Close">✕</button>
                        <img class="lightbox-img" src="" alt="Certificate preview">
                    </div>
                `;
                document.body.appendChild(overlay);
                const img = overlay.querySelector('.lightbox-img');
                const close = overlay.querySelector('.lightbox-close');
                overlay.addEventListener('click', (e) => { if (e.target === overlay || e.target === close) closeLightbox(); });
                document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
                lightbox = { overlay, img };
                return lightbox;
            }

            function openLightbox(src, alt, card) {
                const lb = createLightbox();
                lb.img.src = src;
                lb.img.alt = alt || 'Certificate preview';
                // allow the lightbox image to be larger than the card (up to viewport)
                try {
                    const rect = card ? card.getBoundingClientRect() : null;
                    const padding = 48; // safety margin
                    const viewportW = window.innerWidth - padding;
                    // prefer up to 1.5x card width, but at least 360px and never exceed viewport
                    const desired = rect ? Math.min(Math.max(rect.width * 1.5, 360), viewportW) : Math.min(900, viewportW);
                    lb.img.style.maxWidth = desired + 'px';
                    lb.img.style.maxHeight = 'calc(100vh - 48px)';
                    lb.img.style.width = 'auto';
                    lb.img.style.objectFit = 'contain';
                } catch (e) {
                    lb.img.style.maxWidth = '90vw';
                    lb.img.style.maxHeight = 'calc(100vh - 48px)';
                }
                lb.overlay.classList.add('open');
            }

            function closeLightbox() {
                if (!lightbox) return;
                lightbox.overlay.classList.remove('open');
                // clear src after transition to free memory
                setTimeout(() => { if (lightbox && lightbox.img) lightbox.img.src = ''; }, 300);
            }

            attachHandlers();
            document.addEventListener('DOMContentLoaded', attachHandlers);
        })();