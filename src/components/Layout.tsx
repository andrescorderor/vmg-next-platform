import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { useVmg } from '../context/VmgContext';

declare global {
  interface Window {
    Swiper?: any;
    L?: any;
  }
}

/* ============================================================================
   1. ESTIMATING SOFTWARE API MODAL ("Schedule a call" / "Request Consultation")
   ============================================================================ */
export function EstimatingConsultationModal() {
  const {
    estimateModalOpen,
    estimatePreselectService,
    closeEstimateModal,
    submitEstimateLead,
    settings,
    services,
  } = useVmg();

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Tilt-Up Construction');
  const [estimatedSqft, setEstimatedSqft] = useState('');
  const [budgetRange, setBudgetRange] = useState('$150,000 – $500,000');
  const [projectLocation, setProjectLocation] = useState('Salt Lake City, UT');
  const [timeline, setTimeline] = useState('Within 60 Days');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (estimatePreselectService) {
      setServiceType(estimatePreselectService);
    }
  }, [estimatePreselectService]);

  if (!estimateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      submitEstimateLead({
        fullName: fullName.trim(),
        company: company.trim() || 'Commercial Partner',
        email: email.trim(),
        phone: phone.trim(),
        serviceType,
        estimatedSqft: estimatedSqft.trim() || 'TBD',
        budgetRange,
        projectLocation: projectLocation.trim() || 'Utah',
        timeline,
        message: message.trim() || 'Requesting structural concrete consultation and estimate.',
      });
      setSubmitting(false);
      setFullName('');
      setCompany('');
      setEmail('');
      setPhone('');
      setEstimatedSqft('');
      setMessage('');
      closeEstimateModal();
    }, 500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeEstimateModal();
      }}
      className="vmg-admin-scope fixed inset-0 z-[9995] flex items-center justify-center bg-[#121214]/85 p-3 sm:p-4 backdrop-blur-md"
    >
      <div className="vmg-modal-animate relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#18181c] p-5 text-white shadow-2xl sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E70000]/40 bg-[#E70000]/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#ff6b6b]">
              <Wrench className="h-3.5 w-3.5" />
              <span>Direct Estimating Software Integration</span>
            </div>
            <h2 className="mt-2 font-heading text-2xl font-bold tracking-tight text-white">
              Request Consultation &amp; Project Estimate
            </h2>
            <p className="mt-1 text-xs text-zinc-400">
              Connected directly to VMG NeXT Estimating Pipeline ({settings.estimatingApiKey.slice(0, 14)}...)
            </p>
          </div>
          <button
            type="button"
            onClick={closeEstimateModal}
            aria-label="Close modal"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-[#E70000] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Full Name *
              </span>
              <input
                type="text"
                required
                placeholder="Wes Johnson"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#E70000] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Company / General Contractor
              </span>
              <input
                type="text"
                placeholder="Westland / Stout / Developer"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#E70000] focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Email Address *
              </span>
              <input
                type="email"
                required
                placeholder="wes@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#E70000] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Phone Number *
              </span>
              <input
                type="tel"
                required
                placeholder="(801) 555-0199"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#E70000] focus:outline-none"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Concrete / Service Scope
              </span>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3 text-sm text-white focus:border-[#E70000] focus:outline-none"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Structural Restoration">Structural Restoration</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Estimated Area (SF)
              </span>
              <input
                type="text"
                placeholder="e.g. 45,000 SF"
                value={estimatedSqft}
                onChange={(e) => setEstimatedSqft(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#E70000] focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Estimated Concrete Budget
              </span>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3 text-sm text-white focus:border-[#E70000] focus:outline-none"
              >
                <option value="$30,000 – $150,000">$30,000 – $150,000</option>
                <option value="$150,000 – $500,000">$150,000 – $500,000</option>
                <option value="$500,000 – $1,500,000">$500,000 – $1,500,000</option>
                <option value="$1.5M – $5.5M+">$1.5M – $5.5M+</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Project Location (Utah)
              </span>
              <input
                type="text"
                placeholder="Salt Lake City / Park City / Ogden"
                value={projectLocation}
                onChange={(e) => setProjectLocation(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#E70000] focus:outline-none"
              />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Target Mobilization
              </span>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-white/15 bg-[#121214] px-3 text-sm text-white focus:border-[#E70000] focus:outline-none"
              >
                <option value="Immediate / Bidding Now">Immediate / Bidding Now</option>
                <option value="Within 60 Days">Within 60 Days</option>
                <option value="Next Quarter">Next Quarter</option>
                <option value="Preconstruction Planning">Preconstruction Planning</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Scope Details / Drawing Link / Notes
            </span>
            <textarea
              rows={3}
              placeholder="Describe footings, foundation walls, slabs on grade, tilt-up panels, or restoration requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-[#121214] p-3.5 text-sm text-white placeholder-zinc-500 focus:border-[#E70000] focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Instant lead dispatch to Rene Villanueva &amp; Estimating Desk</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={closeEstimateModal}
                className="min-h-[44px] rounded-full border border-white/15 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-300 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="min-h-[44px] rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E70000]/30 transition hover:bg-[#ff1a1a] disabled:opacity-50"
              >
                {submitting ? 'Syncing with Estimating Software...' : 'Submit to Estimating System'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================================
   2. EXACT VMG NeXT PRE-FOOTER CTA (.section-call-to-action-bottom)
   ============================================================================ */
export function PreFooterCta({
  badge = 'CONTACT',
  heading = "Ready to Build What’s Next?",
  formHeading = "Let’s build something great on time, on budget, and beyond expectations.",
  phoneSubtext = 'Have a question? Give Us a Call',
  showExploreLinks = false,
}: {
  badge?: string;
  heading?: string;
  formHeading?: string;
  phoneSubtext?: string;
  showExploreLinks?: boolean;
}) {
  const { settings, submitEstimateLead } = useVmg();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [agreed, setAgreed] = useState(true);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    submitEstimateLead({
      fullName: name.trim(),
      company: 'Website Form Inquiry',
      email: email.trim(),
      phone: phone.trim(),
      serviceType: service || 'Commercial Construction',
      estimatedSqft: 'TBD',
      budgetRange: 'TBD',
      projectLocation: 'Utah',
      timeline: 'Within 60 Days',
      message: `Submitted via ${badge} bottom CTA form.`,
    });
    setName('');
    setEmail('');
    setPhone('');
    setService('');
  };

  return (
    <div className="section-call-to-action-bottom">
      <div className="container">
        <div className="row pb-4">
          <div className="col-xl-6">
            <div className="why-us-content-wrapper">
              <div className="mission-wrapper">
                <p className="why-us home-prefooter-animate">{badge}</p>
              </div>
              <h2 className="why-title home-prefooter-animate-title">{heading}</h2>
              <div className="phone-wrapper home-prefooter-animate-phone">
                <div className="big-red-bullet">
                  <img
                    src="https://vmgnext.com/wp-content/uploads/2025/06/Vector.png"
                    alt="phone icon"
                    className="phone-icon"
                  />
                </div>
                <div className="phone-inner-wrapper">
                  <p className="why-para bottom-para">{phoneSubtext}</p>
                  <a href={`tel:+1${settings.phone.replace(/[^0-9]/g, '')}`} className="header-telephone">
                    <i></i> {settings.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <h3 className="home-form-title home-form-title-animate">{formHeading}</h3>
            <div className="wpcf7 no-js" lang="en-US" dir="ltr">
              <form onSubmit={handleQuickSubmit} className="wpcf7-form init" aria-label="Contact form">
                <div className="form-wrapper">
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <span className="wpcf7-form-control-wrap">
                          <input
                            size={40}
                            maxLength={400}
                            className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                            required
                            placeholder="Full Name*"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                          />
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <span className="wpcf7-form-control-wrap">
                          <input
                            size={40}
                            maxLength={400}
                            className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text"
                            required
                            placeholder="Email*"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                          />
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <p>
                        <span className="wpcf7-form-control-wrap">
                          <input
                            size={40}
                            maxLength={400}
                            className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text"
                            required
                            placeholder="Phone Number*"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                          />
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <span className="wpcf7-form-control-wrap">
                          <select
                            className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                          >
                            <option value="">Select Services</option>
                            <option value="Tilt-Up">Tilt-Up</option>
                            <option value="Water Treatment">Water Treatment</option>
                            <option value="Slabs">Slabs</option>
                            <option value="Educational Facilities">Educational Facilities</option>
                            <option value="Commercial Construction">Commercial Construction</option>
                            <option value="High-End Homes">High-End Homes</option>
                          </select>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="form-bottom">
                    <div className="form-radio-section">
                      <p>
                        <span className="wpcf7-form-control-wrap">
                          <span className="wpcf7-form-control wpcf7-checkbox">
                            <span className="wpcf7-list-item first last">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={agreed}
                                  onChange={(e) => setAgreed(e.target.checked)}
                                />
                                <span className="wpcf7-list-item-label">
                                  I have read and agree to your Privacy Policy and Terms of Use.
                                </span>
                              </label>
                            </span>
                          </span>
                        </span>
                      </p>
                    </div>
                    <div className="form-submission">
                      <div className="btn-wrapper">
                        <p>
                          <button type="submit" className="global-btn">
                            <span className="btn-text-wrapper">
                              <span className="btn-text">Schedule a call</span>
                            </span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {showExploreLinks && (
          <div className="careers-cta-links-row">
            <div className="global-seperator" style={{ margin: '50px 0 40px' }}></div>
            <p className="careers-cta-links-label">Explore More</p>
            <div className="careers-cta-links">
              <Link to="/about-us" className="careers-cta-link">
                About Us
              </Link>
              <Link to="/team" className="careers-cta-link">
                Our Team
              </Link>
              <Link to="/services" className="careers-cta-link">
                Our Services
              </Link>
              <Link to="/careers" className="careers-cta-link">
                Careers
              </Link>
              <Link to="/contact-us" className="careers-cta-link">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   3. EXACT VMG NeXT LEAFLET MAP (.section-contact-maps)
   ============================================================================ */
export function ContactMapSection() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    let timer: any;
    const initLeaflet = () => {
      if (!mapContainerRef.current) return;
      if (mapInstanceRef.current) return;
      if (window.L) {
        try {
          const map = window.L.map(mapContainerRef.current).setView([40.6171431, -111.8568923], 16);
          window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap & CartoDB',
            subdomains: 'abcd',
            maxZoom: 19,
          }).addTo(map);
          window.L.marker([40.6171431, -111.8568923])
            .addTo(map)
            .bindPopup('7370 S Creek Rd. STE 204<br>Sandy, Utah 84093')
            .openPopup();
          mapInstanceRef.current = map;
        } catch {
          // ignore duplicate map container errors
        }
      } else {
        timer = setTimeout(initLeaflet, 250);
      }
    };
    initLeaflet();
    return () => {
      if (timer) clearTimeout(timer);
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // ignore
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="section-contact-maps">
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '400px', borderRadius: '12px' }}
      />
    </div>
  );
}

/* ============================================================================
   4. PAGE-WIDE SCROLL REVEAL & COUNTER ANIMATION ENGINE
   ============================================================================ */
function usePageAnimations(pathname: string) {
  useEffect(() => {
    if (pathname === '/admin') return;

    const wrapper = document.getElementById('wrapper');
    if (!wrapper) return;

    // 1. Scroll Reveal Targets
    const revealSelectors = [
      '.mission-wrapper',
      '.home-about-wrapper',
      '.metrics-title',
      '.metrics-content-wrapper',
      '.home-about-title',
      '.home-about-para',
      '.testi-title',
      '.why-title',
      '.home-form-title',
      '.projects-section-title',
      '.projects-section-desc',
      '.projects-metric-item',
      '.project-card',
      '.market-card',
      '.capability-card',
      '.service-card',
      '.vmg-point-card',
      '.checkbox-wrapper',
      '.our-mission-wrapper',
      '.who-we-are-wrapper',
      '.review-box',
      '.phone-wrapper',
      '.form-wrapper',
      '.careers-hero-title',
      '.careers-hero-subtitle',
      '.careers-hero-cta',
      '.careers-section-title',
      '.careers-why-para',
      '.careers-stat-card',
      '.careers-benefit-card',
      '.careers-position-card',
      '.careers-resume-banner',
      '.careers-video-card',
      '.resto-main-img',
      '.restoration-hero-section h1',
      '.restoration-hero-section .sub-headline',
      '.restoration-checklist li',
      '.process-card',
      '.info-card',
      '.contact-form-photo',
      '.section-team-member .col-xxl-6',
      '.vmg-blog-toolbar',
      '.vmg-featured-post',
      '.vmg-blog-card',
      '.vmg-article-tags-box',
      '.vmg-article-cta-box',
    ];

    const elements = Array.from(wrapper.querySelectorAll<HTMLElement>(revealSelectors.join(',')));

    elements.forEach((el, idx) => {
      el.classList.add('vmg-anim-item');
      if (
        el.classList.contains('who-we-are-wrapper') ||
        el.classList.contains('phone-wrapper') ||
        el.classList.contains('resto-main-img') ||
        el.classList.contains('contact-form-photo')
      ) {
        el.classList.add('vmg-anim-left');
      } else if (
        el.classList.contains('home-about-para') ||
        el.classList.contains('form-wrapper') ||
        el.classList.contains('team-member-img')
      ) {
        el.classList.add('vmg-anim-right');
      } else if (
        el.classList.contains('project-card') ||
        el.classList.contains('market-card') ||
        el.classList.contains('capability-card') ||
        el.classList.contains('vmg-point-card') ||
        el.classList.contains('careers-benefit-card') ||
        el.classList.contains('process-card') ||
        el.classList.contains('info-card') ||
        el.classList.contains('vmg-blog-card') ||
        el.classList.contains('vmg-featured-post')
      ) {
        el.classList.add('vmg-anim-scale');
      }
      const staggerMs = (idx % 4) * 75;
      el.style.setProperty('--vmg-delay', `${staggerMs}ms`);
    });

    // 1b. Image Architectural Curtain Reveal (.vmg-img-reveal)
    const imageSelectors = [
      '.service-card .service-img',
      '.who-we-are-img',
      '.section-why-us .img-wrapper img',
      '.resto-main-img',
      '.contact-form-photo',
      '.section-team-member .team-member-img img',
      '.vmg-article-cover-wrap img',
    ];
    const images = Array.from(wrapper.querySelectorAll<HTMLElement>(imageSelectors.join(',')));
    images.forEach((img) => img.classList.add('vmg-img-reveal'));

    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vmg-img-visible');
            imgObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    images.forEach((img) => imgObserver.observe(img));

    // 1c. Interactive Spotlight Mouse Tracker on Dark Sections
    const darkSections = Array.from(
      wrapper.querySelectorAll<HTMLElement>(
        '.section-metrics, .section-services, .section-home-testimonials, .projects-markets-section, .careers-testimonials-section, .careers-hero-section, .vmg-article-hero, .vmg-featured-body, .vmg-article-cta-box'
      )
    );
    const cleanupSpotlight: Array<() => void> = [];
    darkSections.forEach((sec) => {
      sec.classList.add('vmg-spotlight-active');
      const onMove = (e: MouseEvent) => {
        const rect = sec.getBoundingClientRect();
        sec.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        sec.style.setProperty('--my', `${e.clientY - rect.top}px`);
      };
      sec.addEventListener('mousemove', onMove, { passive: true });
      cleanupSpotlight.push(() => sec.removeEventListener('mousemove', onMove));
    });

    // 1d. Subtle 3D Perspective Card Tilt on Desktop Pointer Devices
    const canHoverTilt = window.matchMedia?.('(pointer: fine) and (min-width: 992px)')?.matches;
    const cleanupTilt: Array<() => void> = [];
    if (canHoverTilt) {
      const tiltCards = Array.from(
        wrapper.querySelectorAll<HTMLElement>(
          '.project-card, .market-card, .capability-card, .careers-benefit-card, .process-card, .info-card, .vmg-blog-card'
        )
      );
      tiltCards.forEach((card) => {
        const onCardMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = `perspective(900px) rotateX(${(-py * 5).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-6px)`;
        };
        const onCardLeave = () => {
          card.style.transform = '';
        };
        card.addEventListener('mousemove', onCardMove, { passive: true });
        card.addEventListener('mouseleave', onCardLeave);
        cleanupTilt.push(() => {
          card.removeEventListener('mousemove', onCardMove);
          card.removeEventListener('mouseleave', onCardLeave);
        });
      });
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vmg-in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => revealObserver.observe(el));

    // 2. Animated Horizontal Divider Lines (.global-seperator & .global-seperator-dark)
    const lines = Array.from(
      wrapper.querySelectorAll<HTMLElement>('.global-seperator, .global-seperator-dark')
    );
    lines.forEach((line) => line.classList.add('vmg-line-hidden'));

    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('vmg-line-hidden');
            entry.target.classList.add('vmg-line-visible');
            lineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    lines.forEach((line) => lineObserver.observe(line));

    // 3. Animated Number Counters (.metrics-number, .review-number)
    const counterEls = Array.from(
      wrapper.querySelectorAll<HTMLElement>('.metrics-number, .review-number')
    );

    const animateCounter = (el: HTMLElement) => {
      if (el.dataset.vmgCounted === 'true') return;
      const raw = (el.dataset.vmgOriginal || el.textContent || '').trim();
      el.dataset.vmgOriginal = raw;
      const match = raw.match(/[\d,.]+/);
      if (!match) return;
      el.dataset.vmgCounted = 'true';

      const numStr = match[0];
      const suffix = raw.replace(numStr, '');
      const target = parseFloat(numStr.replace(',', '.'));
      const decimals = numStr.includes('.') ? 1 : 0;
      const duration = 1800;
      const startTime = performance.now();

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = (eased * target).toFixed(decimals);
        el.textContent = `${current}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = raw;
        }
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target as HTMLElement);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );

    counterEls.forEach((el) => counterObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      imgObserver.disconnect();
      lineObserver.disconnect();
      counterObserver.disconnect();
      cleanupSpotlight.forEach((fn) => fn());
      cleanupTilt.forEach((fn) => fn());
    };
  }, [pathname]);
}

/* ============================================================================
   5. MAIN LAYOUT (#wrapper -> header.navbar-black-bg + Outlet + footer#footer)
   ============================================================================ */
export function Layout() {
  const { settings, openEstimateModal, toasts, team, blogs } = useVmg();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  usePageAnimations(location.pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 300);
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (docHeight > 0) {
        setScrollPct(Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobileMenu = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  const isNavActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      {/* TOP SCROLL PROGRESS INDICATOR */}
      <div className="vmg-top-scroll-progress" style={{ width: `${scrollPct}%` }} />

      <a href="#main" className="visually-hidden-focusable">
        Skip to main content
      </a>

      {/* Toast Notification Banner */}
      {toasts.length > 0 && (
        <div className="vmg-admin-scope fixed top-6 right-6 z-[9999] flex max-w-md items-center gap-3 rounded-2xl border border-white/20 bg-[#18181c] px-5 py-3.5 text-sm font-medium text-white shadow-2xl">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-[#E70000]" />
          <span>{toasts[toasts.length - 1].text}</span>
        </div>
      )}

      <div id="wrapper">
        {/* EXACT VMG NeXT HEADER (1:1 Original Structure) */}
        <header className="navbar-black-bg">
          <nav className="container navigation-wrapper navbar-black-bg">
            <div className="row">
              <div className="col-xxl-4 col-lg-12 col-6">
                <div className="header-logo-wrapper">
                  <Link to="/" className="header-logo-link">
                    <img src={settings.logoHeader} alt="header VMG Next logo" />
                  </Link>
                </div>
              </div>
              <div className="col-xxl-8 col-lg-12 col-6 mobile-menu-column-flex d-flex d-xxl-block justify-content-end align-items-center">
                {/* DESKTOP MENU */}
                <div className="main-nav-right-part desktop-menu">
                  <div className="main-nav-wrapper">
                    <ul className="main-nav">
                      <li className="menu-item">
                        <Link
                          to="/services"
                          className={`menu-item-link ${isNavActive('/services') ? 'active-nav-link' : ''}`}
                        >
                          Services
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/projects"
                          className={`menu-item-link ${isNavActive('/projects') ? 'active-nav-link' : ''}`}
                        >
                          Projects
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/about-us"
                          className={`menu-item-link ${isNavActive('/about-us') ? 'active-nav-link' : ''}`}
                        >
                          About
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/team"
                          className={`menu-item-link ${isNavActive('/team') ? 'active-nav-link' : ''}`}
                        >
                          Team
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/careers"
                          className={`menu-item-link ${isNavActive('/careers') ? 'active-nav-link' : ''}`}
                        >
                          Careers
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/blog"
                          className={`menu-item-link ${isNavActive('/blog') ? 'active-nav-link' : ''}`}
                        >
                          Blog
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/restoration"
                          className={`menu-item-link ${isNavActive('/restoration') ? 'active-nav-link' : ''}`}
                        >
                          Restoration
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/contact-us"
                          className={`menu-item-link ${isNavActive('/contact-us') ? 'active-nav-link' : ''}`}
                        >
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="header-book-wrapper">
                    <a
                      href={`tel:+1${settings.phone.replace(/[^0-9]/g, '')}`}
                      className="header-telephone"
                    >
                      <i className="fa-solid fa-phone"></i> {settings.phone}
                    </a>
                    <a
                      href="#schedule-call"
                      onClick={(e) => {
                        e.preventDefault();
                        openEstimateModal();
                      }}
                      className="header-calendar"
                    >
                      Schedule a call
                    </a>
                  </div>
                </div>

                {/* MOBILE MENU BURGER */}
                <button
                  type="button"
                  className={`burger ${mobileOpen ? 'open' : ''}`}
                  id="burger"
                  onClick={toggleMobileMenu}
                  aria-label="Toggle navigation menu"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>

                {/* MOBILE MENU DRAWER */}
                <div
                  className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
                  id="mobileMenu"
                  style={{
                    transform: mobileOpen ? 'translateX(0%)' : 'translateX(100%)',
                    opacity: mobileOpen ? 1 : 0,
                    visibility: mobileOpen ? 'visible' : 'hidden',
                    transition: 'transform 0.35s ease, opacity 0.35s ease, visibility 0.35s ease',
                  }}
                >
                  <div className="header-logo-wrapper">
                    <Link to="/" className="header-logo-link" onClick={() => setMobileOpen(false)}>
                      <img
                        src="https://vmgnext.com/wp-content/uploads/2025/06/Group-1.png"
                        alt="header VMG Next logo"
                      />
                    </Link>
                  </div>
                  <div className="main-nav-wrapper">
                    <ul className="main-nav">
                      <li className="menu-item">
                        <Link to="/services" className="menu-item-link">
                          Services
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/projects" className="menu-item-link">
                          Projects
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/about-us" className="menu-item-link">
                          About
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/team" className="menu-item-link">
                          Team
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/careers" className="menu-item-link">
                          Careers
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/blog" className="menu-item-link">
                          Blog
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/restoration" className="menu-item-link">
                          Restoration
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/contact-us" className="menu-item-link">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="header-book-wrapper">
                    <a
                      href={`tel:+1${settings.phone.replace(/[^0-9]/g, '')}`}
                      className="header-telephone"
                    >
                      <img
                        src="https://vmgnext.com/wp-content/uploads/2025/06/Vector-1.png"
                        alt="mobile telephone icon"
                        className="mobile-tel-icon"
                      />{' '}
                      {settings.phone}
                    </a>
                    <a
                      href="#schedule-call"
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileOpen(false);
                        openEstimateModal();
                      }}
                      className="header-calendar"
                    >
                      Schedule a call
                    </a>
                  </div>
                  <div className="mobile-menu-footer">
                    <div className="mobile-menu-copyrights">
                      <p>Copyright 2026 © VMG Next. All Rights Reserved.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>

        {/* PAGE CONTENT */}
        <main id="main">
          <Outlet />
        </main>

        {/* EXACT VMG NeXT FOOTER */}
        <footer id="footer">
          <div className="row footer-first-row">
            <div className="col-xl-3 col-md-6 col-12">
              <div className="footer-widget-wrapper border-none">
                <Link to="/" className="footer-logo">
                  <img src={settings.logoFooter} alt="VMG Next footer logo" />
                </Link>
                <p className="footer-about-para">
                  VMG NeXT Is A Pioneering Construction Company Redefining The Future Of Construction
                  With Innovative Strategies And High Impact Projects. Specializing In Advanced
                  Structural Solutions Like Slabs, Cast-In-Place And Tilt-Up, VMG Next Is Committed
                  To Delivering Exceptional Value To Clients Across Diverse Sectors.
                </p>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-12">
              <div className="footer-widget-wrapper">
                <h3 className="widget-title">Info</h3>
                <p className="address-footer">7370 S Creek Rd. STE 204 Sandy Utah 84093</p>
                <div className="footer-info-wrapper">
                  <p className="info-title">Victor Galvan</p>
                  <a href="mailto:victor@vmgnext.com" className="info-link">
                    info@vmgnext.com
                  </a>
                </div>
                <div className="footer-info-wrapper">
                  <p className="info-title">Office</p>
                  <a href="mailto:info@vmgnext.com" className="info-link">
                    info@vmgnext.com
                  </a>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-12">
              <div className="footer-widget-wrapper">
                <h3 className="widget-title">More</h3>
                <ul className="footer-menu">
                  <li className="footer-menu-item">
                    <Link to="/privacy-policy" className="footer-menu-link">
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link to="/terms-of-use" className="footer-menu-link">
                      Terms Of Use
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link to="/services" className="footer-menu-link">
                      Services
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link to="/about-us" className="footer-menu-link">
                      About
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link to="/blog" className="footer-menu-link">
                      Blog
                    </Link>
                  </li>
                  <li className="footer-menu-item">
                    <Link to="/contact-us" className="footer-menu-link">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-md-6 col-12">
              <div className="footer-widget-wrapper">
                <h3 className="widget-title">Social Media</h3>
                <ul className="footer-social">
                  <li className="footer-menu-item">
                    <a
                      href={settings.socialLinkedin}
                      className="footer-menu-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li className="footer-menu-item">
                    <a
                      href={settings.socialFacebook}
                      className="footer-menu-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Facebook
                    </a>
                  </li>
                  <li className="footer-menu-item">
                    <a
                      href={settings.socialInstagram}
                      className="footer-menu-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>
                  </li>
                  <li className="footer-menu-item">
                    <a
                      href={settings.socialTiktok}
                      className="footer-menu-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      TikTok
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row footer-second-row"></div>
        </footer>
      </div>

      {/* EXACT FIXED BUTTONS (#callBtn & #backToTopBtn) */}
      <div className="fixed-buttons-container">
        <a
          id="callBtn"
          href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
          title="Call Us"
        >
          <i className="fa-solid fa-phone"></i>
        </a>
        <a
          id="backToTopBtn"
          href="#top"
          title="Go to top"
          className={showTopBtn ? 'show' : ''}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <i className="fa-solid fa-arrow-up"></i>
        </a>
      </div>

      {/* FLOATING ADMIN CMS & AI BLOG LAUNCHER (Bottom-Left, Compact on Mobile) */}
      {location.pathname === '/admin' ? (
        <Link to="/" className="vmg-floating-admin-pill">
          <i className="fa-solid fa-arrow-left" style={{ color: '#E70000' }}></i>
          <span className="sm:hidden">Live Site</span>
          <span className="hidden sm:inline">Back to Live Public Site</span>
        </Link>
      ) : (
        <Link to="/admin" className="vmg-floating-admin-pill">
          <Sparkles className="h-4 w-4 shrink-0 text-[#E70000]" />
          <span className="sm:hidden">Admin Studio</span>
          <span className="hidden sm:inline">
            Admin CMS &amp; AI Blog ({team.filter((t) => t.visible).length} Team · {blogs.length}{' '}
            Posts)
          </span>
        </Link>
      )}

      {/* ESTIMATING CONSULTATION MODAL */}
      <EstimatingConsultationModal />
    </>
  );
}
