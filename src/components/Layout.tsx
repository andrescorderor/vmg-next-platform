import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  ArrowUp,
  CheckCircle2,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react';
import { useVmg } from '../context/VmgContext';

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
  const [budgetRange, setBudgetRange] = useState('$250,000 – $1,000,000');
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
    }, 550);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeEstimateModal();
      }}
      className="fixed inset-0 z-[9990] flex items-center justify-center bg-[#121214]/80 p-4 backdrop-blur-md"
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
              Connected directly to VMG NeXT Estimating Pipeline ({settings.estimatingApiKey.slice(0, 12)}...)
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

export function PreFooterCta({ badge = 'CONTACT', heading = "Ready to Build What's Next?" }: { badge?: string; heading?: string }) {
  const { settings, services, submitEstimateLead, openEstimateModal } = useVmg();
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
      company: 'Website Inquiry',
      email: email.trim(),
      phone: phone.trim(),
      serviceType: service || 'Commercial Construction',
      estimatedSqft: 'TBD',
      budgetRange: 'Standard Inquiry',
      projectLocation: 'Utah',
      timeline: 'Immediate',
      message: `Quick Schedule a Call request from footer form (${service || 'General'}).`,
    });
    setName('');
    setEmail('');
    setPhone('');
    setService('');
  };

  return (
    <section className="border-t border-zinc-200 bg-white py-20 text-[#121214]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#121214]">
              {badge}
            </span>
            <h2 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-[#121214] sm:text-5xl">
              {heading}
            </h2>
            <p className="mt-4 max-w-xl text-base text-zinc-600">
              Partner with Utah&apos;s premier commercial construction and structural concrete team. From Salt Lake City to Park City, we deliver on time and on budget.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E70000] text-white shadow-lg shadow-[#E70000]/30">
                <Phone className="h-7 w-7" />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500">Have a question? Give Us a Call</p>
                <a
                  href={`tel:${settings.phone.replace(/\D/g, '')}`}
                  className="font-heading text-2xl font-extrabold text-[#121214] transition hover:text-[#E70000] sm:text-3xl"
                >
                  {settings.phone}
                </a>
              </div>
            </div>
            <div className="mt-7">
              <button
                type="button"
                onClick={() => openEstimateModal()}
                className="inline-flex min-h-[48px] items-center gap-2.5 rounded-full border-2 border-[#E70000] bg-[#E70000]/10 px-6 text-xs font-bold uppercase tracking-wider text-[#E70000] transition hover:bg-[#E70000] hover:text-white"
              >
                <Wrench className="h-4 w-4" />
                <span>Open Estimating Software Portal (Request Consultation)</span>
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-6 shadow-sm sm:p-9 lg:col-span-6">
            <h3 className="font-heading text-xl font-bold leading-snug text-[#121214] sm:text-2xl">
              Let&apos;s build something great on time, on budget, and beyond expectations.
            </h3>
            <form onSubmit={handleQuickSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  placeholder="Full Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-[#121214] focus:border-[#E70000] focus:outline-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-[#121214] focus:border-[#E70000] focus:outline-none"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="tel"
                  required
                  placeholder="Phone Number*"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-[#121214] focus:border-[#E70000] focus:outline-none"
                />
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm text-[#121214] focus:border-[#E70000] focus:outline-none"
                >
                  <option value="">Select Services</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </div>
              <label className="flex items-center gap-2.5 text-xs text-zinc-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                  className="h-4 w-4 accent-[#E70000]"
                />
                <span>
                  I have read and agree to the{' '}
                  <Link to="/privacy-policy" className="font-semibold text-[#E70000] underline">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link to="/terms-of-use" className="font-semibold text-[#E70000] underline">
                    Terms of Use
                  </Link>
                  .
                </span>
              </label>
              <button
                type="submit"
                className="min-h-[48px] rounded-full bg-[#E70000] px-8 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#121214]"
              >
                Schedule a call
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Layout() {
  const { settings, openEstimateModal, toasts, dismissToast } = useVmg();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'About', path: '/about-us' },
    { label: 'Team', path: '/team' },
    { label: 'Careers', path: '/careers' },
    { label: 'Blog', path: '/blog' },
    { label: 'Restoration', path: '/restoration' },
    { label: 'Contact', path: '/contact-us' },
  ];

  const isActive = (p: string) => location.pathname === p || location.pathname.startsWith(p + '/');

  return (
    <div className="flex min-h-screen flex-col bg-[#121214] text-[#f5f5f7]">
      {/* Top Navbar replicating VMG NeXT header.php + Request Consultation & Admin CMS Pill */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#121214]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img
              src={settings.logoHeader}
              alt="VMG NeXT Construction Logo"
              className="h-10 w-auto object-contain sm:h-11"
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-5 xl:flex">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`text-xs font-bold uppercase tracking-wider transition ${
                    isActive(item.path) ? 'text-[#E70000]' : 'text-zinc-200 hover:text-[#E70000]'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Action Buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={`tel:${settings.phone.replace(/\D/g, '')}`}
              className="inline-flex min-h-[42px] items-center gap-2 text-xs font-bold tracking-wide text-zinc-200 transition hover:text-[#E70000]"
            >
              <Phone className="h-3.5 w-3.5 text-[#E70000]" />
              <span>{settings.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => openEstimateModal()}
              className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-[#E70000] px-4 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E70000]/25 transition hover:bg-[#ff1f1f]"
            >
              <span>Request Consultation</span>
            </button>

            <Link
              to="/admin"
              className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-full border px-3.5 text-[11px] font-bold uppercase tracking-wider transition ${
                isActive('/admin')
                  ? 'border-[#E70000] bg-[#E70000]/20 text-white'
                  : 'border-white/20 bg-white/5 text-zinc-200 hover:border-[#E70000] hover:text-white'
              }`}
              title="Open Admin CMS & AI Blog Studio"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#E70000]" />
              <span>Admin CMS</span>
            </Link>
          </div>

          {/* Mobile Burger Button */}
          <div className="flex items-center gap-2 xl:hidden">
            <Link
              to="/admin"
              className="inline-flex min-h-[42px] items-center gap-1 rounded-full border border-white/20 bg-white/5 px-3 text-[11px] font-bold uppercase text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#E70000]" />
              <span>CMS</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="border-t border-white/10 bg-[#16161a] px-6 py-6 xl:hidden">
            <ul className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex min-h-[44px] items-center rounded-xl px-3 text-xs font-bold uppercase tracking-wider ${
                      isActive(item.path)
                        ? 'bg-[#E70000] text-white'
                        : 'bg-white/5 text-zinc-200 hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-4">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openEstimateModal();
                }}
                className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#E70000] text-xs font-bold uppercase tracking-wider text-white"
              >
                <Wrench className="h-4 w-4" />
                <span>Request Consultation (Estimating Portal)</span>
              </button>
              <a
                href={`tel:${settings.phone.replace(/\D/g, '')}`}
                className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-white/15 text-xs font-bold text-zinc-200"
              >
                <Phone className="h-4 w-4 text-[#E70000]" />
                <span>Call {settings.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main" className="flex-1">
        <Outlet />
      </main>

      {/* VMG NeXT Footer */}
      <footer className="border-t border-white/10 bg-[#121214] pt-16 pb-12 text-zinc-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link to="/" className="inline-block">
                <img
                  src={settings.logoFooter}
                  alt="VMG NeXT Footer Logo"
                  className="h-11 w-auto object-contain"
                />
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                VMG NeXT is a pioneering construction company redefining the future of construction with innovative strategies and high-impact projects. Specializing in advanced structural solutions like slabs, cast-in-place, and tilt-up across Utah.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Info</h3>
              <p className="mt-4 text-sm text-zinc-400">{settings.address}</p>
              <div className="mt-4 space-y-2 text-sm">
                <div>
                  <span className="block text-xs font-semibold uppercase text-zinc-500">Victor Galvan (CEO)</span>
                  <a href={`mailto:${settings.emailCeo}`} className="text-zinc-200 transition hover:text-[#E70000]">
                    {settings.emailCeo}
                  </a>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-zinc-500">Office &amp; Estimating</span>
                  <a href={`mailto:${settings.emailGeneral}`} className="text-zinc-200 transition hover:text-[#E70000]">
                    {settings.emailGeneral}
                  </a>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-zinc-500">Direct Phone</span>
                  <a href={`tel:${settings.phone.replace(/\D/g, '')}`} className="text-zinc-200 transition hover:text-[#E70000]">
                    {settings.phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">More</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link to="/services" className="hover:text-[#E70000]">Services</Link></li>
                <li><Link to="/projects" className="hover:text-[#E70000]">Projects Portfolio</Link></li>
                <li><Link to="/about-us" className="hover:text-[#E70000]">About Us</Link></li>
                <li><Link to="/team" className="hover:text-[#E70000]">Leadership &amp; Team</Link></li>
                <li><Link to="/careers" className="hover:text-[#E70000]">Careers</Link></li>
                <li><Link to="/restoration" className="hover:text-[#E70000]">Restoration Division</Link></li>
                <li><Link to="/blog" className="hover:text-[#E70000]">Blog &amp; Insights</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-[#E70000]">Privacy Policy</Link></li>
                <li><Link to="/terms-of-use" className="hover:text-[#E70000]">Terms Of Use</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Social Media &amp; Portal</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a href={settings.socialLinkedin} target="_blank" rel="noreferrer" className="hover:text-[#E70000]">
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a href={settings.socialFacebook} target="_blank" rel="noreferrer" className="hover:text-[#E70000]">
                    Facebook ↗
                  </a>
                </li>
                <li>
                  <a href={settings.socialInstagram} target="_blank" rel="noreferrer" className="hover:text-[#E70000]">
                    Instagram ↗
                  </a>
                </li>
                <li>
                  <a href={settings.socialTiktok} target="_blank" rel="noreferrer" className="hover:text-[#E70000]">
                    TikTok ↗
                  </a>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold text-white">Admin &amp; AI Blog Studio</p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  Manage team members, AI blog posts, and estimating leads.
                </p>
                <Link
                  to="/admin"
                  className="mt-3 inline-flex min-h-[38px] w-full items-center justify-center gap-1.5 rounded-xl bg-[#E70000] px-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#ff1a1a]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Open /admin Panel</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500">
            <p>Copyright {new Date().getFullYear()} © VMG NeXT Construction. All Rights Reserved.</p>
            <p>Sandy · Salt Lake City · Park City, Utah · Cloud Architecture $0/mo</p>
          </div>
        </div>
      </footer>

      {/* Fixed Action Buttons (matching VMG NeXT fixed-buttons-container) */}
      <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3">
        {showTopBtn && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#18181c] text-white shadow-xl transition hover:border-[#E70000] hover:bg-[#E70000]"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
        <a
          href={`tel:${settings.phone.replace(/\D/g, '')}`}
          title="Call VMG NeXT"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E70000] text-white shadow-xl shadow-[#E70000]/40 transition hover:scale-105"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>

      {/* Estimating Consultation Modal */}
      <EstimatingConsultationModal />

      {/* In-App Toast Notifications */}
      <div className="fixed bottom-5 left-5 z-[9999] flex flex-col gap-2.5">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 rounded-2xl border border-white/15 bg-[#18181c] px-4 py-3 text-xs font-medium text-white shadow-2xl"
          >
            <CheckCircle2
              className={`h-4 w-4 shrink-0 ${
                t.type === 'error' ? 'text-rose-400' : t.type === 'info' ? 'text-sky-400' : 'text-emerald-400'
              }`}
            />
            <span>{t.text}</span>
            <button
              type="button"
              onClick={() => dismissToast(t.id)}
              className="ml-2 text-zinc-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
