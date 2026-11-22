import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Expand,
  HardHat,
  Layers,
  Mail,
  MapPin,
  Phone,
  Quote,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wrench,
  X,
} from 'lucide-react';
import { useVmg } from '../context/VmgContext';
import { PreFooterCta } from '../components/Layout';
import { INITIAL_RESTORATION, INITIAL_TESTIMONIALS } from '../data/vmgData';
import type { ProjectItem } from '../data/vmgData';

/* ============================================================================
   1. HOME PAGE (Replicating vmgnext.com Home + Enhancements)
   ============================================================================ */
export function HomePage() {
  const { settings, services, projects, team, blogs, openEstimateModal } = useVmg();
  const visibleServices = services.filter((s) => s.visible).sort((a, b) => a.orderIndex - b.orderIndex);
  const visibleProjects = projects.filter((p) => p.visible).slice(0, 4);
  const visibleTeam = team.filter((m) => m.visible).sort((a, b) => a.orderIndex - b.orderIndex).slice(0, 8);

  return (
    <div>
      {/* Video Hero Section */}
      <section className="relative flex min-h-[84vh] items-center overflow-hidden bg-[#121214]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        >
          <source src={settings.heroVideoDesktop} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(18,18,20,0.88) 0%, rgba(18,18,20,0.62) 55%, rgba(231,0,0,0.25) 100%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 backdrop-blur-md">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#E70000]" />
              <span className="text-xs font-bold uppercase tracking-widest text-white">
                Building Your Dreams · Utah&apos;s Premier Concrete Partner
              </span>
            </div>

            <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Building the Future with{' '}
              <span className="text-[#E70000]">Precision and Purpose.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-200 sm:text-xl">
              At VMG NeXT, we are Utah&apos;s trusted partner for commercial construction, tilt-up, and structural cast-in-place concrete across Salt Lake City, Park City, and beyond.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => openEstimateModal()}
                className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-[#E70000] px-8 text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-[#E70000]/30 transition hover:bg-[#ff1f1f]"
              >
                <Wrench className="h-4 w-4" />
                <span>Request Consultation</span>
              </button>
              <Link
                to="/projects"
                className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-white bg-white px-8 text-xs font-bold uppercase tracking-widest text-[#121214] transition hover:border-[#E70000] hover:bg-[#E70000] hover:text-white"
              >
                <span>Explore Project Portfolio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Metrics (220+, 20 Years, 100%, $600M+) */}
      <section className="bg-[#16161a] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-10">
            <div>
              <span className="inline-flex rounded-full border border-white/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
                highlights
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold tracking-tight sm:text-5xl">
                Utah&apos;s Premier <span className="text-[#E70000]">Concrete Contractor</span>
              </h2>
            </div>
            <Link
              to="/contact-us"
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white bg-white px-7 text-xs font-bold uppercase tracking-wider text-[#121214] transition hover:border-[#E70000] hover:bg-[#E70000] hover:text-white"
            >
              <span>Schedule a call</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="divide-y divide-white/10">
            <div className="grid items-center gap-6 py-10 md:grid-cols-12">
              <div className="font-heading text-6xl font-extrabold tracking-tight text-[#E70000] sm:text-7xl md:col-span-5">
                220+
              </div>
              <div className="md:col-span-7">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                  Projects Completed
                </h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-300">
                  From large-scale <strong>commercial builds</strong> in <strong>Salt Lake City</strong> to our expertise on structural <strong>concrete slabs</strong>, our portfolio proves we deliver excellence across <strong>Utah</strong>.
                </p>
              </div>
            </div>

            <div className="grid items-center gap-6 py-10 md:grid-cols-12">
              <div className="font-heading text-6xl font-extrabold tracking-tight text-white sm:text-7xl md:col-span-5">
                20+
              </div>
              <div className="md:col-span-7">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                  Years of Expertise
                </h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-300">
                  Two decades of hands-on experience in <strong>tilt-up</strong> and <strong>cast-in-place</strong> methods, delivering strategic execution and structural excellence across <strong>Utah</strong>.
                </p>
              </div>
            </div>

            <div className="grid items-center gap-6 py-10 md:grid-cols-12">
              <div className="font-heading text-6xl font-extrabold tracking-tight text-[#E70000] sm:text-7xl md:col-span-5">
                100%
              </div>
              <div className="md:col-span-7">
                <h3 className="font-heading text-xl font-bold uppercase tracking-wider text-white">
                  Customer Satisfaction
                </h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-300">
                  Our commitment to quality on every <strong>commercial construction</strong> and <strong>concrete project</strong> in <strong>Utah</strong> ensures clients are not just satisfied, but genuinely impressed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Split Banner */}
      <section className="bg-white py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
                About Us
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold leading-tight sm:text-5xl">
                Leading Commercial Construction: <span className="text-[#E70000]">We Build Value</span>
              </h2>
            </div>
            <div className="border-l-0 border-zinc-200 lg:col-span-6 lg:border-l lg:pl-10">
              <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
                At VMG NeXT, we are Utah&apos;s premier partner for advanced structural solutions. Our expertise in <strong>commercial construction</strong>, specializing in <strong>tilt-up</strong> and <strong>cast-in-place concrete</strong> for projects in <strong>Salt Lake City</strong> and <strong>Park City</strong>, is backed by a relentless focus on operational excellence and a culture that inspires every team member to lead &amp; excel.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/about-us"
                  className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#121214]"
                >
                  <span>Let&apos;s Build Together</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Construction Services Grid */}
      <section className="bg-[#121214] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex rounded-full border border-white/40 px-4 py-1 text-xs font-bold uppercase tracking-widest">
                Capabilities
              </span>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
                Our Specialized Construction Services in Utah
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white bg-white px-6 text-xs font-bold uppercase tracking-wider text-[#121214] transition hover:border-[#E70000] hover:bg-[#E70000] hover:text-white"
            >
              <span>Browse all services</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleServices.map((srv) => (
              <div
                key={srv.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#18181c] p-6 transition hover:-translate-y-1.5 hover:border-[#E70000]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading text-xl font-bold text-white">{srv.title}</h3>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E70000]/15 text-[#E70000] transition group-hover:bg-[#E70000] group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm text-zinc-400">{srv.shortDesc}</p>
                </div>
                <div className="mt-5 overflow-hidden rounded-2xl bg-[#121214]">
                  <img
                    src={srv.previewImage}
                    alt={srv.title}
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between pt-2">
                  <Link
                    to="/services"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white"
                  >
                    View specifications →
                  </Link>
                  <button
                    type="button"
                    onClick={() => openEstimateModal(srv.title)}
                    className="text-xs font-bold uppercase tracking-wider text-[#E70000] hover:underline"
                  >
                    Request Estimate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="bg-[#f7f7f8] py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
                Portfolio
              </span>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
                Featured Utah <span className="text-[#E70000]">Concrete Projects</span>
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#121214] px-7 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#E70000]"
            >
              <span>View Full Portfolio (8 Projects)</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {visibleProjects.map((prj) => (
              <div
                key={prj.id}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#E70000] hover:shadow-xl"
              >
                <div className="relative h-72 w-full bg-[#121214]">
                  <img
                    src={prj.photos[0]}
                    alt={prj.name}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-4 left-4 rounded-xl bg-[#E70000] px-3 py-1 font-mono-code text-xs font-bold text-white">
                    {prj.number}
                  </span>
                  <span className="absolute top-4 right-4 rounded-full bg-[#121214]/80 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    {prj.market}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-heading text-xl font-extrabold text-[#121214]">{prj.name}</h3>
                    <span className="rounded-full bg-[#E70000]/10 px-3 py-1 font-mono-code text-xs font-bold text-[#E70000]">
                      {prj.priceRange}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs font-semibold text-zinc-600">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1">
                      <HardHat className="h-3.5 w-3.5 text-[#E70000]" /> GC: {prj.gc}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-100 px-2.5 py-1">
                      <Ruler className="h-3.5 w-3.5 text-[#E70000]" /> {prj.sqft}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{prj.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team Preview */}
      <section className="bg-[#121214] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex rounded-full border border-white/40 px-4 py-1 text-xs font-bold uppercase tracking-widest">
                Our Team
              </span>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
                Our Team of Construction &amp; Concrete Experts
              </h2>
            </div>
            <Link
              to="/team"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white bg-white px-7 text-xs font-bold uppercase tracking-wider text-[#121214] transition hover:border-[#E70000] hover:bg-[#E70000] hover:text-white"
            >
              <span>Meet All {team.filter((t) => t.visible).length} Team Members</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {visibleTeam.map((member) => (
              <Link
                key={member.id}
                to={`/team/${member.slug}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-[#18181c] transition hover:-translate-y-1.5 hover:border-[#E70000]"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#222228]">
                  <img
                    src={member.cardPhoto}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="font-heading text-base font-bold text-white group-hover:text-[#E70000]">
                    {member.name}
                  </div>
                  <div className="mt-0.5 text-xs text-zinc-400">{member.role}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Marquee Testimonials Section ("Trusted by Utah's Biggest Builders") */}
      <section className="overflow-hidden bg-[#18181c] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-white/40 px-4 py-1 text-xs font-bold uppercase tracking-widest">
            testimonials
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Trusted by Utah&apos;s <span className="text-[#E70000]">Biggest Builders</span>
          </h2>
        </div>

        <div className="mt-12 space-y-6">
          <div className="overflow-hidden">
            <div className="animate-marquee-left gap-6 px-4">
              {[...INITIAL_TESTIMONIALS, ...INITIAL_TESTIMONIALS].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-[380px] shrink-0 rounded-2xl border border-white/10 bg-[#121214] p-6"
                >
                  <div className="flex items-center gap-3.5">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-heading text-sm font-bold text-white">{item.name}</div>
                      <div className="text-xs text-zinc-400">{item.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-300">&ldquo;{item.quote}&rdquo;</p>
                  <div className="mt-4 flex gap-1 text-[#E70000]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[#E70000]" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Preview */}
      <section className="bg-[#f7f7f8] py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
                Insights &amp; AI Blog Studio
              </span>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">
                Latest Construction Insights
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#121214] px-6 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#E70000]"
            >
              <span>Read All Articles</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {blogs.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#E70000]"
              >
                <div className="h-52 w-full overflow-hidden bg-zinc-900">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#E70000]">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="mt-2 font-heading text-lg font-bold text-[#121214] group-hover:text-[#E70000]">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{post.excerpt}</p>
                  </div>
                  <div className="mt-4 pt-3 text-xs font-bold uppercase tracking-wider text-[#121214] group-hover:text-[#E70000]">
                    Read Full Article →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   2. SERVICES PAGE (Replicating Services-template.php)
   ============================================================================ */
export function ServicesPage() {
  const { settings, services, openEstimateModal } = useVmg();
  const visibleServices = services.filter((s) => s.visible).sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div>
      {/* Video Hero */}
      <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden bg-[#121214]">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-70">
          <source src={settings.servicesVideoDesktop} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="inline-flex rounded-full border border-white/50 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              OUR SERVICES
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold text-white sm:text-6xl">
              Expert Construction <span className="text-[#E70000]">Services in Utah</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Social Trust Banner */}
      <section className="border-b border-zinc-200 bg-white py-14 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-3 rounded-2xl border border-zinc-200 bg-[#f7f7f8] px-5 py-4">
                <div className="flex gap-1 text-[#E70000]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-[#E70000]" />
                  ))}
                </div>
                <span className="font-heading text-sm font-bold text-[#121214]">
                  220+ Satisfied Customers
                </span>
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-heading text-2xl font-bold leading-snug text-[#121214] sm:text-3xl">
                From commercial construction in Salt Lake City to custom projects in Park City, we are passionate about building the future of Utah.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* Alternating Service Cards */}
      <section className="bg-[#f7f7f8] py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          {visibleServices.map((srv, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={srv.id}
                className="grid items-center gap-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-12"
              >
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="overflow-hidden rounded-2xl bg-[#121214]">
                    <img
                      src={srv.detailImage}
                      alt={srv.title}
                      className="h-80 w-full object-cover sm:h-96"
                    />
                  </div>
                </div>
                <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : ''}`}>
                  <span className="font-mono-code text-xs font-bold uppercase tracking-widest text-[#E70000]">
                    0{idx + 1} / STRUCTURAL SCOPE
                  </span>
                  <h3 className="mt-2 font-heading text-3xl font-extrabold text-[#121214]">
                    {srv.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-zinc-600">{srv.fullDesc}</p>
                  <ul className="mt-6 space-y-3">
                    {srv.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-semibold text-[#121214]">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E70000]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <button
                      type="button"
                      onClick={() => openEstimateModal(srv.title)}
                      className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#121214]"
                    >
                      <Wrench className="h-4 w-4" />
                      <span>Request Consultation for {srv.title}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   3. PROJECTS PORTFOLIO PAGE (Replicating template-projects.php + Lightbox)
   ============================================================================ */
export function ProjectsPage() {
  const { settings, projects, openEstimateModal } = useVmg();
  const [marketFilter, setMarketFilter] = useState<string>('ALL');
  const [slideIndexes, setSlideIndexes] = useState<Record<string, number>>({});
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const visibleProjects = projects
    .filter((p) => p.visible)
    .filter((p) => (marketFilter === 'ALL' ? true : p.market === marketFilter))
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const markets = ['ALL', 'Warehouse', 'Multifamily Residential', 'Educational Facility', 'Hospitality'];

  const stepCardPhoto = (prj: ProjectItem, dir: -1 | 1) => {
    const cur = slideIndexes[prj.id] || 0;
    const next = (cur + dir + prj.photos.length) % prj.photos.length;
    setSlideIndexes((prev) => ({ ...prev, [prj.id]: next }));
  };

  return (
    <div>
      {/* Hero with Video Background */}
      <section className="relative flex min-h-[68vh] items-center overflow-hidden bg-[#121214]">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-50">
          <source src={settings.heroVideoDesktop} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.84) 0%, rgba(0,0,0,0.62) 60%, rgba(231,0,0,0.22) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <nav className="mb-4 text-xs text-zinc-400">
            <Link to="/" className="hover:text-white">Home</Link> <span className="mx-2">/</span>{' '}
            <span className="font-semibold text-white">Projects</span>
          </nav>
          <span className="inline-flex rounded-full border border-white/60 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
            PORTFOLIO
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            PROJECT <span className="text-[#E70000]">PORTFOLIO</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
            Built on experience. Delivered with precision. Explore our commercial concrete solutions across Utah — from tilt-up warehouses to educational, multifamily, and hospitality structures.
          </p>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="border-y border-white/10 bg-[#0d0d0f] py-9 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              { num: String(projects.filter((p) => p.visible).length), label: 'FEATURED PROJECTS', icon: Building2 },
              { num: '1,322 - 277K', label: 'SF PROJECT SIZES', icon: Ruler },
              { num: '$30K - $5.5M', label: 'CONCRETE SCOPES', icon: HardHat },
              { num: 'MULTIPLE', label: 'MARKETS SERVED', icon: Layers },
            ].map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#E70000]/15 text-[#E70000]">
                  <m.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-heading text-xl font-extrabold text-white">{m.num}</div>
                  <div className="text-[11px] font-semibold tracking-wider text-zinc-400">{m.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Grid with Market Filters */}
      <section id="featured-projects" className="bg-[#f7f7f8] py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
              OUR WORK
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
              FEATURED <span className="text-[#E70000]">PROJECTS</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-zinc-600">
              Explore key commercial concrete projects executed with precision across Utah.
            </p>
          </div>

          {/* Interactive Market Filter */}
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {markets.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setMarketFilter(m)}
                className={`min-h-[42px] rounded-full border px-5 text-xs font-bold uppercase tracking-wider transition ${
                  marketFilter === m
                    ? 'border-[#E70000] bg-[#E70000] text-white shadow-md'
                    : 'border-zinc-300 bg-white text-zinc-700 hover:border-[#E70000]'
                }`}
              >
                {m === 'ALL' ? 'All Markets' : m}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {visibleProjects.map((prj) => {
              const curPhotoIdx = slideIndexes[prj.id] || 0;
              const currentPhoto = prj.photos[curPhotoIdx] || prj.photos[0];
              return (
                <div
                  key={prj.id}
                  className="flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#E70000] hover:shadow-xl"
                >
                  {/* Image Carousel Box */}
                  <div className="relative h-[420px] w-full bg-[#121214]">
                    <img
                      src={currentPhoto}
                      alt={`${prj.name} - Photo ${curPhotoIdx + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute top-4 left-4 rounded-xl bg-[#E70000] px-3.5 py-1.5 font-mono-code text-xs font-bold text-white shadow">
                      {prj.number}
                    </span>
                    <span className="absolute top-4 right-4 rounded-full bg-[#121214]/85 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      {prj.market}
                    </span>

                    {prj.photos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() => stepCardPhoto(prj, -1)}
                          aria-label="Previous photo"
                          className="absolute top-1/2 left-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-[#E70000]"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => stepCardPhoto(prj, 1)}
                          aria-label="Next photo"
                          className="absolute top-1/2 right-3 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-[#E70000]"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}

                    <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between">
                      <span className="rounded-full bg-black/70 px-3 py-1 font-mono-code text-[11px] text-white backdrop-blur-sm">
                        Photo {curPhotoIdx + 1} of {prj.photos.length}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setLightboxProject(prj);
                          setLightboxIdx(curPhotoIdx);
                        }}
                        className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-white/95 px-4 text-xs font-bold text-[#121214] shadow transition hover:bg-[#E70000] hover:text-white"
                      >
                        <Expand className="h-3.5 w-3.5" />
                        <span>Gallery ({prj.photos.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-heading text-2xl font-extrabold text-[#121214]">{prj.name}</h3>
                        <span className="rounded-full bg-[#E70000]/10 px-4 py-1 font-mono-code text-sm font-bold text-[#E70000]">
                          {prj.priceRange}
                        </span>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-zinc-700">
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-100 px-3 py-1.5">
                          <HardHat className="h-4 w-4 text-[#E70000]" />
                          <span>GC: {prj.gc}</span>
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-100 px-3 py-1.5">
                          <Ruler className="h-4 w-4 text-[#E70000]" />
                          <span>{prj.sqft}</span>
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-zinc-600">{prj.description}</p>
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
                      <button
                        type="button"
                        onClick={() => openEstimateModal(prj.market)}
                        className="text-xs font-bold uppercase tracking-wider text-[#E70000] hover:underline"
                      >
                        Request Similar Scope Estimate →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxProject(null);
          }}
          className="fixed inset-0 z-[9995] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
        >
          <div className="relative flex max-h-[90vh] w-full max-w-5xl flex-col items-center">
            <div className="mb-3 flex w-full items-center justify-between text-white">
              <div>
                <h3 className="font-heading text-lg font-bold">{lightboxProject.name}</h3>
                <p className="text-xs text-zinc-400">
                  {lightboxProject.gc} · {lightboxProject.sqft} · Photo {lightboxIdx + 1} of{' '}
                  {lightboxProject.photos.length}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxProject(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#E70000]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative flex h-[72vh] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#121214]">
              <img
                src={lightboxProject.photos[lightboxIdx]}
                alt={lightboxProject.name}
                className="max-h-full max-w-full object-contain"
              />
              {lightboxProject.photos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIdx(
                        (lightboxIdx - 1 + lightboxProject.photos.length) % lightboxProject.photos.length
                      )
                    }
                    className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white hover:bg-[#E70000]"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightboxIdx((lightboxIdx + 1) % lightboxProject.photos.length)}
                    className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 text-white hover:bg-[#E70000]"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <PreFooterCta badge="PROJECTS" heading="Ready to Start Your Project?" />
    </div>
  );
}

/* ============================================================================
   4. ABOUT US PAGE (Replicating about-template.php)
   ============================================================================ */
export function AboutPage() {
  const coreValues = [
    {
      title: 'TRANSPARENT',
      desc: 'We move quickly with transparency toward our big goals.',
      icon: 'https://vmgnext.com/wp-content/uploads/2025/10/Frame-41160.png',
    },
    {
      title: 'ALIGNED',
      desc: 'When our people grow, the company wins. We align our goals to make it happen.',
      icon: 'https://vmgnext.com/wp-content/uploads/2025/10/Frame-4160.png',
    },
    {
      title: 'INSPIRATIONAL',
      desc: 'We work for something bigger, making our team and clients stronger.',
      icon: 'https://vmgnext.com/wp-content/uploads/2025/10/Cure.png',
    },
    {
      title: 'ACCOUNTABLE',
      desc: "We hold ourselves accountable, knowing true growth doesn't happen by accident.",
      icon: 'https://vmgnext.com/wp-content/uploads/2025/09/icon4.png',
    },
    {
      title: 'RESULTS ORIENTED',
      desc: 'Every service has one goal: to deliver the results our clients expect.',
      icon: 'https://vmgnext.com/wp-content/uploads/2025/09/time.png',
    },
    {
      title: 'DISCIPLINED',
      desc: 'We do what we say we will. Discipline drives us to keep learning and growing.',
      icon: 'https://vmgnext.com/wp-content/uploads/2025/10/Brain.png',
    },
  ];

  return (
    <div>
      {/* Header Photo */}
      <div className="w-full overflow-hidden bg-[#121214]">
        <img
          src="https://vmgnext.com/wp-content/uploads/2025/09/header-about-long.jpg"
          alt="About VMG NeXT Construction"
          className="max-h-[420px] w-full object-cover"
        />
      </div>

      {/* Who We Are */}
      <section className="bg-white py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="relative lg:col-span-6">
              <img
                src="https://vmgnext.com/wp-content/uploads/2025/07/Mask-group-1-1.png"
                alt="VMG NeXT team planning a commercial construction project in Utah"
                className="w-full rounded-3xl object-cover shadow-lg"
              />
              <div className="mt-6 rounded-2xl border border-zinc-200 bg-[#121214] p-6 text-white shadow-xl sm:-mt-16 sm:ml-8 sm:max-w-md relative z-10">
                <p className="text-sm italic leading-relaxed text-zinc-200">
                  &ldquo;Victor is a remarkable person! Trustworthy, dependable, dedicated and honest. I have immense respect for him as both a business leader and a human!&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src="https://vmgnext.com/wp-content/uploads/2025/06/Avatar-3.png"
                    alt="Brandon M Dawson"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-heading text-sm font-bold text-white">Brandon M Dawson</div>
                    <div className="text-xs text-zinc-400">Chairman &amp; CEO, Cardone Ventures</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
                ABOUT US
              </span>
              <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">Who We Are</h1>
              <p className="mt-6 text-base leading-relaxed text-zinc-600">
                At VMG NeXT, we&apos;re reshaping what construction means in the modern world. Based in Utah and led by a visionary leadership team, we specialize in advanced structural solutions like <strong>tilt-up construction</strong>, slabs, and <strong>cast-in-place concrete for projects across Utah</strong>. But we&apos;re more than builders—we&apos;re a platform for growth. With every project, we bring a culture of leadership, discipline, and innovation that drives results for our clients and inspires progress in our industry.
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                Clients choose us because we deliver more than structures; we deliver confidence. Our team is known for its integrity, responsiveness, and precision. From the earliest planning stages to the final walk-through, we take pride in being a collaborative, transparent partner who is as invested in your success as you are. Whether it is a <strong>commercial space in Salt Lake City</strong>, a public facility, or a <strong>high-end home in Park City</strong>, we&apos;re here to build something that lasts together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#121214] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="inline-flex rounded-full border border-white/50 px-4 py-1 text-xs font-bold uppercase tracking-widest">
                mission &amp; vision statement
              </span>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-heading text-3xl font-extrabold text-[#E70000] sm:text-4xl">
                We&apos;re not just building projects
              </h2>
              <p className="mt-2 font-heading text-2xl font-bold leading-snug text-white sm:text-3xl">
                we&apos;re building a company powered by leadership, scale, and a relentless commitment to raising the standard of construction across the West.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            <div className="flex items-start gap-5 rounded-3xl border border-white/10 bg-[#18181c] p-8">
              <img
                src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4184.png"
                alt="Our Mission"
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div>
                <h3 className="font-heading text-2xl font-bold text-white">Our Mission</h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-300">
                  To cultivate a culture that develops great leaders and delivers <strong>massive value to our customers&apos; success.</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-5 rounded-3xl border border-white/10 bg-[#18181c] p-8">
              <img
                src="https://vmgnext.com/wp-content/uploads/2025/06/Isolation_Mode.png"
                alt="Our Vision"
                className="h-14 w-14 shrink-0 object-contain"
              />
              <div>
                <h3 className="font-heading text-2xl font-bold text-white">Our Vision</h3>
                <p className="mt-2 text-base leading-relaxed text-zinc-300">
                  To become a $125 million platform company with 360 team members in three years, recognized as one of the most trusted <strong>commercial and concrete construction companies</strong> in the West.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-[#f7f7f8] py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="h-1 w-full bg-[#E70000]/20" />
          <div className="my-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((v) => (
              <div
                key={v.title}
                className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:border-[#E70000]"
              >
                <img src={v.icon} alt={v.title} className="h-14 w-14 object-contain" />
                <h3 className="mt-6 font-heading text-2xl font-extrabold text-[#121214]">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="h-1 w-full bg-[#E70000]/20" />
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   5. TEAM DIRECTORY & TEAM MEMBER DETAIL PAGE (Replicating /team/ & ACF bio)
   ============================================================================ */
export function TeamPage() {
  const { team } = useVmg();
  const [deptFilter, setDeptFilter] = useState<string>('ALL');

  const visibleTeam = team
    .filter((m) => m.visible)
    .filter((m) => (deptFilter === 'ALL' ? true : m.department === deptFilter))
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const departments = ['ALL', 'Leadership', 'Operations & Restoration', 'Estimating', 'Marketing & Business Dev'];

  return (
    <div className="bg-[#f7f7f8] text-[#121214]">
      <section className="bg-[#121214] py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <span className="inline-flex rounded-full border border-white/40 px-4 py-1 text-xs font-bold uppercase tracking-widest">
            Our Team
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-6xl">
            Our Team of Construction &amp; <span className="text-[#E70000]">Concrete Experts</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-300">
            Meet the leadership, estimating, operations, and restoration professionals driving VMG NeXT across Utah. Click any member to read their full biography.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Department Filter Pills */}
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {departments.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDeptFilter(d)}
              className={`min-h-[42px] rounded-full border px-5 text-xs font-bold uppercase tracking-wider transition ${
                deptFilter === d
                  ? 'border-[#E70000] bg-[#E70000] text-white shadow-md'
                  : 'border-zinc-300 bg-white text-zinc-700 hover:border-[#E70000]'
              }`}
            >
              {d === 'ALL' ? `All Team (${team.filter((m) => m.visible).length})` : d}
            </button>
          ))}
        </div>

        {/* Team Member Cards Grid */}
        <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleTeam.map((member) => (
            <Link
              key={member.id}
              to={`/team/${member.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1.5 hover:border-[#E70000] hover:shadow-xl"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#18181c]">
                <img
                  src={member.cardPhoto}
                  alt={`${member.name}, ${member.role} at VMG NeXT`}
                  className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#E70000]">
                    {member.department}
                  </span>
                  <h2 className="mt-1 font-heading text-lg font-extrabold text-[#121214] group-hover:text-[#E70000]">
                    {member.name}
                  </h2>
                  <p className="mt-0.5 text-xs font-medium text-zinc-500">{member.role}</p>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs font-bold text-[#121214] group-hover:text-[#E70000]">
                  <span>View Biography</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}

export function TeamMemberDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { team } = useVmg();
  const member = team.find((m) => m.slug === slug) || team[0];
  const visibleTeam = team.filter((m) => m.visible).sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="bg-white text-[#121214]">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/team"
          className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-zinc-300 px-5 text-xs font-bold uppercase tracking-wider text-[#121214] transition hover:border-[#E70000] hover:text-[#E70000]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Our Team</span>
        </Link>

        {/* Exact replication of team-member-template.php */}
        <div className="mt-10 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#121214]">
              {member.role}
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold text-[#121214] sm:text-5xl">
              {member.name}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 sm:text-lg">{member.bioPara1}</p>
            {member.bioPara2 && (
              <p className="mt-4 text-base leading-relaxed text-zinc-600 sm:text-lg">{member.bioPara2}</p>
            )}
          </div>

          <div className="flex justify-center lg:col-span-6">
            <div className="max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-[#18181c] shadow-2xl">
              <img
                src={member.detailPhoto || member.cardPhoto}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Other Team Members Quick Carousel */}
        <div className="mt-20 border-t border-zinc-200 pt-12">
          <h3 className="font-heading text-xl font-bold text-[#121214]">Explore More VMG NeXT Leaders</h3>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {visibleTeam
              .filter((m) => m.id !== member.id)
              .slice(0, 6)
              .map((m) => (
                <Link
                  key={m.id}
                  to={`/team/${m.slug}`}
                  className="group rounded-2xl border border-zinc-200 bg-[#f7f7f8] p-3 transition hover:border-[#E70000]"
                >
                  <img
                    src={m.cardPhoto}
                    alt={m.name}
                    className="aspect-square w-full rounded-xl object-cover object-top"
                  />
                  <div className="mt-2 font-heading text-xs font-bold text-[#121214] group-hover:text-[#E70000]">
                    {m.name}
                  </div>
                  <div className="truncate text-[11px] text-zinc-500">{m.role}</div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   6. CAREERS PAGE (Replicating template-careers.php / Cardone Ventures style)
   ============================================================================ */
export function CareersPage() {
  const { settings, jobs } = useVmg();
  const visibleJobs = jobs.filter((j) => j.visible);

  const benefits = [
    {
      title: 'Health & Medical Benefits',
      desc: 'Comprehensive medical, dental, and vision coverage for you and your family. Eligible after 60 days of employment.',
      icon: ShieldCheck,
    },
    {
      title: 'Career Growth & Advancement',
      desc: 'Clear pathways for advancement, mentorship programs, and leadership development designed to take you further.',
      icon: Sparkles,
    },
    {
      title: 'Competitive Compensation',
      desc: 'Industry-leading compensation packages with performance bonuses and incentives that reward results.',
      icon: Award,
    },
    {
      title: 'Strong Team Culture',
      desc: 'A team that has your back. We celebrate wins together and grow stronger through every challenge.',
      icon: Users,
    },
    {
      title: 'Training & Development',
      desc: 'Ongoing training, industry certifications, and education support to keep you at the top of your field in construction.',
      icon: Briefcase,
    },
    {
      title: 'Safety & Equipment First',
      desc: 'Industry-leading safety protocols, top-tier gear, and modern equipment to ensure every team member returns home safely.',
      icon: HardHat,
    },
  ];

  const videoTestimonials = [
    {
      name: 'Valerie',
      role: 'VMG NeXT Team',
      src: 'https://vmgnext.com/wp-content/uploads/2026/08/VMGNEXT_WEBSITEVIDEO_VALERIE.mp4',
    },
    {
      name: 'Victor Galvan',
      role: 'CEO — VMG NeXT',
      src: 'https://vmgnext.com/wp-content/uploads/2026/08/VMGNEXT_WEBSITEVIDEO_VICTOR.mp4',
    },
    {
      name: 'Scott Longhurst',
      role: 'Director of Operations',
      src: 'https://vmgnext.com/wp-content/uploads/2026/08/VMGNEXT_WEBSITEVIDEO_SCOTT_1.mp4',
    },
  ];

  return (
    <div>
      {/* Video Hero */}
      <section className="relative flex min-h-[72vh] items-center overflow-hidden bg-[#121214]">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-50">
          <source src={settings.heroVideoDesktop} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.60) 60%, rgba(231,0,0,0.24) 100%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-white/60 px-4 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Careers
          </span>
          <h1 className="mt-4 font-heading text-4xl font-extrabold text-white sm:text-6xl">
            Build Something <span className="text-[#E70000]">That Lasts.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">
            Join VMG NeXT — Utah&apos;s premier commercial construction team. We move with purpose, lead with action, and build careers as strong as the structures we create.
          </p>
          <div className="mt-8">
            <a
              href="#open-positions"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full bg-white px-8 text-xs font-bold uppercase tracking-wider text-[#121214] transition hover:bg-[#E70000] hover:text-white"
            >
              <span>View Open Positions</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Why VMG NeXT + 4 KPI Cards */}
      <section className="bg-white py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
                Why VMG NeXT
              </span>
              <h2 className="mt-4 font-heading text-3xl font-extrabold sm:text-4xl">
                More Than a Job. <br />
                <span className="text-[#E70000]">A Career Worth Building.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-600">
                At VMG NeXT, we don&apos;t just build structures — we build futures. We&apos;re a <strong>commercial construction company in Utah</strong> driven by excellence, grounded in integrity, and committed to the growth of every single person on our team.
              </p>
              <p className="mt-3 text-base leading-relaxed text-zinc-600">
                Whether you&apos;re an experienced professional or just starting your career in <strong>construction in Salt Lake City</strong>, you&apos;ll find a place where your work matters and your potential has no ceiling.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5 lg:col-span-7">
              <div className="rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-7">
                <div className="font-heading text-5xl font-extrabold text-[#121214]">
                  20<span className="text-[#E70000]">+</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-zinc-600">Years of Excellence</div>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-7">
                <div className="font-heading text-5xl font-extrabold text-[#121214]">
                  220<span className="text-[#E70000]">+</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-zinc-600">Projects Completed</div>
              </div>
              <div className="rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-7">
                <div className="font-heading text-5xl font-extrabold text-[#121214]">
                  100<span className="text-[#E70000]">%</span>
                </div>
                <div className="mt-2 text-sm font-semibold text-zinc-600">Client Satisfaction</div>
              </div>
              <div className="flex flex-col justify-center rounded-3xl bg-[#121214] p-7 text-white">
                <div className="font-heading text-2xl font-extrabold text-[#E70000]">
                  &ldquo;We win together.&rdquo;
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-zinc-400">
                  — VMG NeXT Culture
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-[#f7f7f8] py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
              Benefits
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
              What We Offer Our Team
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-[#E70000]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E70000]/10 text-[#E70000]">
                  <b.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#121214]">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="open-positions" className="bg-white py-20 text-[#121214]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
            Now Hiring
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Open Construction Jobs in Utah
          </h2>

          <div className="mt-10 space-y-5">
            {visibleJobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-6 transition hover:border-[#E70000] sm:p-8"
              >
                <div className="max-w-2xl">
                  <span className="inline-block rounded-full bg-[#E70000] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    {job.type}
                  </span>
                  <h3 className="mt-3 font-heading text-2xl font-extrabold text-[#121214]">
                    {job.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold text-zinc-600">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-[#E70000]" /> {job.location}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4 text-[#E70000]" /> {job.department}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-zinc-600">{job.description}</p>
                </div>
                <div>
                  <a
                    href={`mailto:${settings.emailCareers}?subject=${encodeURIComponent(
                      `Application for ${job.title} — VMG NeXT Careers`
                    )}`}
                    className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#121214] px-7 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#E70000]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email Resume</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Talent Network Banner */}
          <div className="mt-10 rounded-3xl bg-[#121214] p-8 text-white sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E70000]">
                  Direct Talent Network
                </span>
                <h3 className="mt-2 font-heading text-2xl font-extrabold">
                  Don&apos;t See The Right Role?
                </h3>
                <p className="mt-2 text-sm text-zinc-300">
                  We are always expanding our Utah commercial construction team. Email your resume directly to Yolanda Galvan ({settings.emailCareers}) and we will match you with upcoming positions.
                </p>
              </div>
              <a
                href={`mailto:${settings.emailCareers}?subject=General Resume Submission — VMG NeXT Careers`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#ff1a1a]"
              >
                <Mail className="h-4 w-4" />
                <span>Send Resume to Yolanda</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vertical Video Testimonials */}
      <section className="bg-[#121214] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-white/50 px-4 py-1 text-xs font-bold uppercase tracking-widest">
              Our Team
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
              Hear From Our Team
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-zinc-400">
              Real stories from the people who build VMG NeXT every day.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {videoTestimonials.map((v) => (
              <div
                key={v.name}
                className="overflow-hidden rounded-3xl border border-white/10 bg-[#18181c] p-4"
              >
                <div className="aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black">
                  <video controls playsInline preload="metadata" className="h-full w-full object-cover">
                    <source src={v.src} type="video/mp4" />
                  </video>
                </div>
                <div className="mt-4 text-center">
                  <div className="font-heading text-base font-bold text-white">{v.name}</div>
                  <div className="text-xs text-zinc-400">{v.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCta badge="CAREERS" heading="Ready to Build Your Career?" />
    </div>
  );
}

/* ============================================================================
   7. RESTORATION DIVISION PAGE (Replicating /restoration/)
   ============================================================================ */
export function RestorationPage() {
  const [filter, setFilter] = useState<string>('all');

  const items = INITIAL_RESTORATION.filter((item) =>
    filter === 'all' ? true : item.category === filter
  );

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'wall-repairs', label: 'Structural Foundation Wall Repairs' },
    { id: 'concrete-pourbacks', label: 'Concrete Pourbacks' },
    { id: 'door-stoops', label: 'Concrete Additions' },
    { id: 'wood-decks', label: 'Wood Decks' },
  ];

  return (
    <div className="bg-white text-[#121214]">
      {/* Intro Split */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="flex justify-center lg:col-span-6">
            <img
              src="https://vmgnext.com/wp-content/uploads/2026/02/Services_resto2.jpg"
              alt="Detailed view of concrete repair work in Salt Lake City"
              className="w-4/5 rounded-2xl object-cover shadow-xl"
            />
          </div>
          <div className="lg:col-span-6">
            <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
              RESTORATION DIVISION
            </span>
            <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-5xl">
              Expert Structural Restoration in Utah
            </h1>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 sm:text-lg">
              From aging infrastructure to structures compromised by wear or damage, VMG NeXT&apos;s Restoration Division provides specialized solutions to extend the life and performance of your assets. We serve property management companies, general contractors, and homeowners across <strong>Salt Lake City</strong>, <strong>Park City</strong>, and all of <strong>Utah</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Dark Hero Statement */}
      <section className="relative overflow-hidden bg-[#18181c] py-24 text-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: "url('https://vmgnext.com/wp-content/uploads/2026/02/Services_resto3-scaled.jpg')",
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <h2 className="font-heading text-4xl font-extrabold sm:text-5xl">
            Every Structure Tells a Story
          </h2>
          <p className="mt-3 text-lg text-zinc-200">
            Our job is to bring it back stronger, safer, and{' '}
            <strong className="text-[#E70000]">ready for the future.</strong>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm font-bold">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E70000]" /> Concrete Repair &amp; Strengthening
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E70000]" /> Structural Restoration
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#E70000]" /> Surface Finishing &amp; Sealing
            </span>
          </div>
        </div>
      </section>

      {/* Filterable Restoration Gallery */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
            OUR WORK
          </span>
          <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
            Restoration Projects Gallery
          </h2>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2.5">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`min-h-[42px] rounded-full border-2 px-5 text-xs font-bold transition ${
                filter === f.id
                  ? 'border-[#E70000] bg-[#E70000] text-white'
                  : 'border-zinc-300 bg-transparent text-zinc-600 hover:border-[#E70000]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-zinc-900 shadow-md"
            >
              <img
                src={item.img}
                alt={item.label}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-[#E70000]/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3-Step Disciplined Process */}
      <section className="bg-[#f7f7f8] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex rounded-full border border-[#121214] px-4 py-1 text-xs font-bold uppercase tracking-widest">
              OUR APPROACH
            </span>
            <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-5xl">
              A Disciplined Process You Can Trust
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                num: '1',
                title: 'Assessment & Diagnostics',
                desc: 'We begin with a thorough investigation to identify the root cause of the damage or deterioration, ensuring our solution is precise and effective.',
              },
              {
                num: '2',
                title: 'Strategy & Solution Design',
                desc: 'We develop a tailored restoration plan using advanced materials and proven engineering techniques to ensure long-term structural integrity.',
              },
              {
                num: '3',
                title: 'Execution & Quality Control',
                desc: 'Our expert team executes the restoration with meticulous attention to detail, adhering to the highest standards of safety and quality at every step.',
              },
            ].map((step) => (
              <div
                key={step.num}
                className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E70000] font-heading text-2xl font-extrabold text-white">
                  {step.num}
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold text-[#121214]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   8. BLOG & SINGLE ARTICLE PAGE (Connected to AI Blog Studio)
   ============================================================================ */
export function BlogPage() {
  const { blogs } = useVmg();

  return (
    <div className="bg-[#f7f7f8] text-[#121214]">
      <section className="bg-[#121214] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="inline-flex rounded-full border border-white/50 px-4 py-1 text-xs font-bold uppercase tracking-widest">
                VMG NeXT Journal
              </span>
              <h1 className="mt-4 font-heading text-4xl font-extrabold sm:text-6xl">
                Construction &amp; Concrete <span className="text-[#E70000]">Insights</span>
              </h1>
              <p className="mt-3 max-w-2xl text-base text-zinc-300">
                Technical articles, tilt-up engineering guides, and commercial construction benchmarks across Utah.
              </p>
            </div>
            <Link
              to="/admin"
              className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#E70000] px-6 text-xs font-bold uppercase tracking-wider text-white shadow-lg transition hover:bg-[#ff1f1f]"
            >
              <Sparkles className="h-4 w-4" />
              <span>Write &amp; Auto-Publish with AI</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1.5 hover:border-[#E70000] hover:shadow-xl"
            >
              <div className="relative h-56 w-full overflow-hidden bg-zinc-900">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {post.aiGenerated && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#121214]/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    <Sparkles className="h-3 w-3 text-[#E70000]" /> AI Studio
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#E70000]">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="mt-2.5 font-heading text-xl font-extrabold text-[#121214] group-hover:text-[#E70000]">
                    {post.title}
                  </h2>
                  <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-zinc-600">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4 text-xs text-zinc-500">
                  <span>{post.publishedAt}</span>
                  <span className="font-bold text-[#121214] group-hover:text-[#E70000]">
                    Read Article →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}

export function BlogPostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { blogs, openEstimateModal } = useVmg();
  const post = blogs.find((b) => b.slug === slug) || blogs[0];

  return (
    <div className="bg-white text-[#121214]">
      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="inline-flex min-h-[42px] items-center gap-2 rounded-full border border-zinc-300 px-5 text-xs font-bold uppercase tracking-wider text-[#121214] hover:border-[#E70000] hover:text-[#E70000]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Articles</span>
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#E70000]">
          <span>{post.category}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 text-zinc-500">
            <Calendar className="h-3.5 w-3.5" /> {post.publishedAt}
          </span>
          <span>·</span>
          <span className="inline-flex items-center gap-1 text-zinc-500">
            <Clock className="h-3.5 w-3.5" /> {post.readTime}
          </span>
        </div>

        <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight text-[#121214] sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-3 text-xs font-semibold text-zinc-500">By {post.author}</p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-900 shadow-lg">
          <img src={post.coverImage} alt={post.title} className="max-h-[480px] w-full object-cover" />
        </div>

        <div
          className="vmg-prose mt-10"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {post.seoKeywords && post.seoKeywords.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-zinc-200 pt-6">
            {post.seoKeywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full bg-zinc-100 px-3.5 py-1 text-xs font-semibold text-zinc-600"
              >
                #{kw}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 rounded-3xl bg-[#121214] p-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="font-heading text-2xl font-bold">
                Planning a Commercial or Structural Concrete Project in Utah?
              </h3>
              <p className="mt-1 text-sm text-zinc-300">
                Connect directly with our estimating software and preconstruction desk.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEstimateModal(post.category)}
              className="min-h-[48px] rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#ff1a1a]"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

/* ============================================================================
   9. CONTACT US PAGE (Replicating contact-template.php + Sandy UT Map)
   ============================================================================ */
export function ContactPage() {
  const { settings, services, submitEstimateLead } = useVmg();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Tilt-Up Construction');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    submitEstimateLead({
      fullName: name.trim(),
      company: 'Contact Page Inquiry',
      email: email.trim(),
      phone: phone.trim(),
      serviceType: service,
      estimatedSqft: 'TBD',
      budgetRange: 'TBD',
      projectLocation: 'Utah',
      timeline: 'Immediate',
      message: message.trim() || 'Contact Us inquiry.',
    });
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="bg-white text-[#121214]">
      <div className="w-full overflow-hidden bg-[#121214]">
        <img
          src="https://vmgnext.com/wp-content/uploads/2026/02/Contact_new1.jpg"
          alt="Contact VMG NeXT"
          className="max-h-[380px] w-full object-cover"
        />
      </div>

      {/* 3 Info Cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <a
            href={`mailto:${settings.emailGeneral}`}
            className="rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-8 transition hover:-translate-y-1 hover:border-[#E70000]"
          >
            <Mail className="h-9 w-9 text-[#E70000]" />
            <h3 className="mt-4 font-heading text-2xl font-bold">Email Us</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Have a question or project in mind? Let&apos;s talk: <strong>{settings.emailGeneral}</strong>
            </p>
          </a>

          <a
            href={`tel:${settings.phone.replace(/\D/g, '')}`}
            className="rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-8 transition hover:-translate-y-1 hover:border-[#E70000]"
          >
            <Phone className="h-9 w-9 text-[#E70000]" />
            <h3 className="mt-4 font-heading text-2xl font-bold">Call Us</h3>
            <p className="mt-2 text-sm text-zinc-600">
              Speak directly with our team—no wait, no hassle: <strong>{settings.phone}</strong>
            </p>
          </a>

          <a
            href="https://maps.app.goo.gl/WrMaTfr4mdUvjJBJA"
            target="_blank"
            rel="noreferrer"
            className="rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-8 transition hover:-translate-y-1 hover:border-[#E70000]"
          >
            <MapPin className="h-9 w-9 text-[#E70000]" />
            <h3 className="mt-4 font-heading text-2xl font-bold">Visit Us</h3>
            <p className="mt-2 text-sm text-zinc-600">{settings.address}</p>
          </a>
        </div>

        {/* Contact Form Split */}
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <img
              src="https://vmgnext.com/wp-content/uploads/2025/10/Contact.png"
              alt="VMG NeXT Project Manager"
              className="w-full rounded-3xl object-cover shadow-lg"
            />
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-[#f7f7f8] p-8 lg:col-span-6">
            <h2 className="font-heading text-3xl font-extrabold text-[#121214]">
              Let&apos;s Start Building Together
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">Full Name</span>
                <input
                  type="text"
                  required
                  placeholder="Wes Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">Email</span>
                  <input
                    type="email"
                    required
                    placeholder="wes@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">Phone</span>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (801) 640-5684"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">Service</span>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">Message</span>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project timeline, location, and concrete scope..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 bg-white p-4 text-sm"
                />
              </label>
              <button
                type="submit"
                className="min-h-[48px] rounded-full bg-[#E70000] px-8 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#121214]"
              >
                Schedule a call
              </button>
            </form>
          </div>
        </div>

        {/* Sandy Utah Interactive Map */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-zinc-200 shadow-sm">
          <iframe
            title="VMG NeXT Office Location - 7370 S Creek Rd STE 204 Sandy Utah"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-111.865%2C40.612%2C-111.848%2C40.622&layer=mapnik&marker=40.6171431%2C-111.8568923"
            className="h-96 w-full border-0"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   10. LEGAL PAGES (Privacy Policy & Terms of Use)
   ============================================================================ */
export function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const { settings } = useVmg();
  return (
    <div className="bg-[#f7f7f8] py-16 text-[#121214]">
      <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
        <h1 className="font-heading text-3xl font-extrabold">
          {type === 'privacy' ? 'Privacy Policy for VMG NeXT' : 'Terms of Use for VMG NeXT'}
        </h1>
        <p className="mt-2 text-xs font-semibold text-zinc-500">Last Updated: November 2026</p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-700">
          <p>
            This website is operated by <strong>{settings.companyName}</strong> ({settings.address}). We are a commercial construction and structural concrete contractor based in Utah, specializing in tilt-up, slabs, cast-in-place concrete, and structural restoration.
          </p>
          <p>
            When you submit an inquiry or consultation request through our website, your project scope and contact details are transmitted securely to our estimating and customer service team ({settings.emailGeneral}). We do not sell, rent, or trade your personal information with third parties.
          </p>
          <p>
            These terms and policies are governed by and construed in accordance with the laws of the State of Utah. For any questions, contact us at{' '}
            <a href={`mailto:${settings.emailGeneral}`} className="font-bold text-[#E70000] underline">
              {settings.emailGeneral}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
