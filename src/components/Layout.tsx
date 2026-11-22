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
   1. ESTIMATING SOFTWARE API MODAL ("Request Consultation" -> ocv1_...)
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
      className="vmg-admin-scope fixed inset-0 z-[9995] flex items-center justify-center bg-[#121214]/85 p-4 backdrop-blur-md"
    >
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/15 bg-[#18181c] p-6 text-white shadow-2xl sm:p-8">
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
  const { settings, submitEstimateLead, openEstimateModal } = useVmg();
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
                  <a href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`} className="header-telephone">
                    <i></i> {settings.phone}
                  </a>
                </div>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => openEstimateModal()}
                  className="global-btn"
                  style={{ cursor: 'pointer', border: 'none' }}
                >
                  <span className="btn-text-wrapper">
                    <span className="btn-text">Request Consultation &amp; Estimate</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <h3 className="home-form-title home-form-title-animate">{formHeading}</h3>
            <div className="wpcf7 js" lang="en-US" dir="ltr">
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
                          <button
                            type="submit"
                            className="global-btn"
                            style={{ border: 'none', cursor: 'pointer' }}
                          >
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
   4. MAIN LAYOUT (#wrapper -> header.navbar-black-bg + Outlet + footer#footer)
   ============================================================================ */
export function Layout() {
  const { settings, openEstimateModal, toasts, team, blogs } = useVmg();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMobileMenu = () => {
    const next = !mobileOpen;
    setMobileOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  return (
    <>
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
        {/* EXACT VMG NeXT HEADER */}
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
                      <i className="fa-solid fa-phone"></i> {settings.phone}
                    </a>
                    <button
                      type="button"
                      onClick={() => openEstimateModal()}
                      className="header-estimate-btn"
                    >
                      <i className="fa-solid fa-calculator"></i> Request Consultation
                    </button>
                    <Link to="/contact-us" className="header-calendar">
                      Schedule a call
                    </Link>
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
                      <li className="menu-item">
                        <Link to="/admin" className="menu-item-link" style={{ color: '#E70000' }}>
                          Admin CMS &amp; AI Studio
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
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        openEstimateModal();
                      }}
                      className="header-estimate-btn"
                    >
                      Request Consultation
                    </button>
                    <Link to="/contact-us" className="header-calendar">
                      Schedule a call
                    </Link>
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
                  <li className="footer-menu-item">
                    <Link to="/admin" className="footer-menu-link" style={{ color: '#E70000' }}>
                      Admin Studio &amp; AI Blog
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

      {/* FLOATING ADMIN CMS & AI BLOG LAUNCHER (Bottom-Left) */}
      {location.pathname === '/admin' ? (
        <Link to="/" className="vmg-floating-admin-pill">
          <i className="fa-solid fa-arrow-left" style={{ color: '#E70000' }}></i>
          <span>Back to Live Public Site</span>
        </Link>
      ) : (
        <Link to="/admin" className="vmg-floating-admin-pill">
          <Sparkles className="h-4 w-4 text-[#E70000]" />
          <span>
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
