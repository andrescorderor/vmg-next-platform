import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useVmg } from '../context/VmgContext';
import { ContactMapSection, PreFooterCta } from '../components/Layout';
import { INITIAL_RESTORATION } from '../data/vmgData';
import type { ProjectItem } from '../data/vmgData';

/* Full high-res gallery map for the 8 projects on vmgnext.com */
const FULL_PROJECT_GALLERIES: Record<string, string[]> = {
  'prj-1': [
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo01.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo02.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo03-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo04.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo05.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo06.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo07.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo08.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo09.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo10-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo11-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo12.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo13.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo14-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo15.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo16.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo17-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo18.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo19-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo20.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo21.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo22.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo23.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo24.jpeg',
  ],
  'prj-2': [
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo01.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo02-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo03-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo04-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo05-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo06-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo07-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo08.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo09-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo10-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo11-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo12-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo13-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo14-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo15.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo16-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo17-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo18-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo19.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo20-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo21-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo22-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo23-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo24-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo25.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo26-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo27-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo28-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo29-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo30-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo31-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo32-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo33-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo34-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo35-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo36-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo37-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo38-scaled.jpg',
  ],
  'prj-3': [
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo01.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo02.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo03.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo04.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo05.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo06.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo07.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo08-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo09.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo10-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo11.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo12-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo13.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo14.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo15.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo16-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo17-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo18.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo19.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo20.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo21-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo22.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo23-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo24-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo25.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo26.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo27.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo28.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo29-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo30.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo31.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo32-scaled.jpeg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo33.jpeg',
  ],
  'prj-5': [
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo01-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo02-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo03-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo04-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo05-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo06-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo07-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo08-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo09-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo10-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo11-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo12-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo13-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo14-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo15-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo16-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo17-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo18-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo19-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo20-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo21-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo22-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo23-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo24-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo25-scaled.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo26-scaled.jpg',
  ],
  'prj-7': [
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo01.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo02.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo03.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo04.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo05.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo06.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo07.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo08.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo09.jpg',
    'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo10-scaled.jpg',
  ],
};

/* ============================================================================
   1. HOME PAGE (Exact 1:1 DOM & CSS from https://vmgnext.com/)
   ============================================================================ */
export function HomePage() {
  const { settings, services, openEstimateModal } = useVmg();
  const visibleServices = services
    .filter((s) => s.visible)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const servicesSwiperRef = useRef<HTMLDivElement | null>(null);
  const mySwiperRef = useRef<HTMLDivElement | null>(null);
  const testiSwiperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const instances: any[] = [];
    let timer: any;

    const initSwipers = () => {
      if (!window.Swiper) {
        timer = setTimeout(initSwipers, 200);
        return;
      }
      if (servicesSwiperRef.current) {
        instances.push(
          new window.Swiper(servicesSwiperRef.current, {
            loop: true,
            slidesPerView: 1.2,
            spaceBetween: 30,
            speed: 3000,
            autoplay: {
              delay: 0,
              disableOnInteraction: false,
            },
            breakpoints: {
              640: { slidesPerView: 2.2, spaceBetween: 30 },
              768: { slidesPerView: 2.5, spaceBetween: 30 },
              991: { slidesPerView: 3.5, spaceBetween: 40 },
              1200: { slidesPerView: 4.5, spaceBetween: 40 },
            },
          })
        );
      }
      if (mySwiperRef.current) {
        instances.push(
          new window.Swiper(mySwiperRef.current, {
            slidesPerView: 1.2,
            spaceBetween: 30,
            loop: true,
            speed: 7000,
            autoplay: {
              delay: 0,
              disableOnInteraction: false,
            },
            breakpoints: {
              640: { slidesPerView: 1.2, spaceBetween: 30 },
              768: { slidesPerView: 1.9, spaceBetween: 30 },
              991: { slidesPerView: 2.5, spaceBetween: 30 },
              1200: { slidesPerView: 3.4, spaceBetween: 40 },
            },
          })
        );
      }
      if (testiSwiperRef.current) {
        instances.push(
          new window.Swiper(testiSwiperRef.current, {
            slidesPerView: 1.2,
            spaceBetween: 30,
            loop: true,
            speed: 7000,
            autoplay: {
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: true,
            },
            breakpoints: {
              640: { slidesPerView: 1.2, spaceBetween: 30 },
              768: { slidesPerView: 1.9, spaceBetween: 30 },
              991: { slidesPerView: 2.5, spaceBetween: 30 },
              1200: { slidesPerView: 3.4, spaceBetween: 40 },
            },
          })
        );
      }
    };

    initSwipers();
    return () => {
      if (timer) clearTimeout(timer);
      instances.forEach((inst) => {
        try {
          inst.destroy(true, true);
        } catch {
          // ignore
        }
      });
    };
  }, [visibleServices.length]);

  const row1Testimonials = [
    {
      name: 'Tom Widener',
      job: 'Vice-President Wharton- Smith, Inc',
      img: 'https://vmgnext.com/wp-content/uploads/2025/06/Tom-Widener_Nov-2019_2O7B6302_sq-1-1.png',
      review:
        '“Victor consistently demonstrates an exceptional level of focus and dedication when it comes to serving his clients. You can always count on him to follow through and deliver quality work, no matter the challenge”',
    },
    {
      name: 'Brandon M Dawson',
      job: 'Chairman & CEO, Cardone Ventures',
      img: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-3-1.png',
      review:
        '“Victor is a remarkable person! Trustworthy, dependable, dedicated and honest. I have immense respect for him as both a business leader and a human!”',
    },
    {
      name: 'Bora Erbilen',
      job: 'President, BBM Structural',
      img: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-4.png',
      review:
        '“I recommend Victor and all of his business ventures to clients because you will get quality work at a fair price, and our communities will be better place for all the people Victor will get involved in these business teaming opportunities.”',
    },
    {
      name: 'Randy Barnhill',
      job: 'Regional Director of Field Operations, Core',
      img: 'https://vmgnext.com/wp-content/uploads/2025/07/Screenshot-2025-05-05-at-15.18.13-1.png',
      review:
        '“The Core Florida Team has had many projects with the VMG team over the years with great success, mainly to the leadership of Victor Galvan that built his businesses from the ground up with integrity and a drive to Deliver with a high level of professionalism and quality”',
    },
  ];

  const row2Testimonials = [
    {
      name: 'Luis F. Bedoya',
      job: 'Principal, BBM Structural',
      img: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-4-1.png',
      review:
        '“I highly recommend Victor as a person and as an industry partner. Victor is the most trustworthy person that I know. You always know that he will keep his word and that he and his team will do whatever it takes to get the job done and done right.”',
    },
    {
      name: 'Sean Meder',
      job: 'Senior Vice-President, Bank OZK',
      img: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-4-2.png',
      review:
        '“I would like to take a moment to recognize the pleasure of having collaborated with Victor Galvan over the past 5+ years. We have worked on multiple companies projects and partnerships over the past 5 years. We have had a great deal of success on a host of different projects”',
    },
    {
      name: 'James R.',
      job: 'Project Manager',
      img: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-4-3.png',
      review:
        '“Working with VMG Next was a game changer. Their team treated our project like it was their own—from planning to execution. They delivered ahead of schedule without cutting corners, and the communication was flawless throughout. We’ve never felt more confident in a construction partner.”',
    },
    {
      name: 'Laura M.',
      job: 'Director of Facilities',
      img: 'https://vmgnext.com/wp-content/uploads/2025/07/Avatar-4.png',
      review:
        '“We chose VMG Next for their reputation in tilt-up and commercial builds, and they exceeded every expectation. Their attention to detail, drive for quality, and ability to solve problems before they became delays made a lasting impression. These are true professionals.”',
    },
  ];

  return (
    <div>
      {/* 1. EXACT VIDEO HEADER */}
      <div className="section-video-header">
        <div className="home-video home-video-desktop">
          <video autoPlay loop muted playsInline>
            <source src={settings.heroVideoDesktop} type="video/mp4" />
          </video>
        </div>
        <div className="home-video home-video-mobile">
          <video autoPlay loop muted playsInline>
            <source src={settings.heroVideoMobile} type="video/mp4" />
          </video>
        </div>
      </div>

      {/* 2. EXACT SECTION METRICS (220+, 20, 100%) */}
      <div className="section-metrics">
        <div className="custom-container metrics-first-container">
          <div className="row">
            <div className="col-12">
              <div className="metrics-header">
                <div className="metrics-title-wrapper">
                  <div className="mission-wrapper">
                    <p className="highlights home-highlights-animate">highlights</p>
                  </div>
                  <h2 className="metrics-title home-highlights-animate-title">
                    Utah&apos;s Premier
                    <br />
                    Concrete Contractor
                  </h2>
                </div>
                <div className="btn-wrapper" style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => openEstimateModal()}
                    className="global-btn"
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    <span className="btn-text-wrapper">
                      <span className="btn-text">Request Consultation</span>
                    </span>
                  </button>
                  <Link to="/contact-us" className="global-btn-white-metrics">
                    <span className="btn-text-wrapper">
                      <span className="btn-text">Schedule a call</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-container metrics-second-container">
          <div className="global-seperator-dark"></div>
          <div className="row pt-4 pb-4">
            <div className="col-xl-6 col-lg-7 col-md-8">
              <div className="metrics-number">220+</div>
            </div>
            <div className="col-xl-6 col-lg-5 col-md-4">
              <div className="metrics-content-wrapper">
                <div className="metrics-content-title">Projects Completed</div>
                <div className="metrics-content-para">
                  From large-scale <strong>commercial builds</strong> in{' '}
                  <strong>Salt Lake City</strong> to our expertise on structural{' '}
                  <strong>concrete slabs</strong>, our portfolio proves we deliver excellence across{' '}
                  <strong>Utah</strong>.
                </div>
              </div>
            </div>
          </div>
          <div className="global-seperator-dark"></div>
          <div className="row pt-4 pb-4">
            <div className="col-xl-6 col-lg-7 col-md-8">
              <div className="metrics-number">20</div>
            </div>
            <div className="col-xl-6 col-lg-5 col-md-4">
              <div className="metrics-content-wrapper">
                <div className="metrics-content-title">YEARS OF EXPERTISE</div>
                <div className="metrics-content-para">
                  Two decades of hands-on experience in <strong>tilt-up</strong> and{' '}
                  <strong>cast-in-place</strong> methods, delivering strategic execution and
                  structural excellence across <strong>Utah</strong>.
                </div>
              </div>
            </div>
          </div>
          <div className="global-seperator-dark"></div>
          <div className="row pt-4 pb-4">
            <div className="col-xl-6 col-lg-7 col-md-8">
              <div className="metrics-number">100%</div>
            </div>
            <div className="col-xl-6 col-lg-5 col-md-4">
              <div className="metrics-content-wrapper">
                <div className="metrics-content-title">CUSTOMER SATISFACTION</div>
                <div className="metrics-content-para">
                  Our commitment to quality on every <strong>commercial construction</strong> and{' '}
                  <strong>concrete project</strong> in <strong>Utah</strong> ensures clients are not
                  just satisfied, but genuinely impressed.
                </div>
              </div>
            </div>
          </div>
          <div className="global-seperator-dark"></div>
        </div>
      </div>

      {/* 3. EXACT SECTION BUILD MORE (About Us) */}
      <div className="section-build-more">
        <div className="container pb-6">
          <div className="row">
            <div className="col-lg-6 mobile-border-bottom">
              <div className="home-header-wrapper flex-content-end">
                <div className="home-about-wrapper">
                  <p className="home-about home-about-animate">About Us</p>
                </div>
                <h2 className="home-about-title home-about-animate-title">
                  Leading Commercial Construction: We Build Value
                </h2>
              </div>
            </div>
            <div className="col-lg-6 section-build-more-col-mobile-border-none">
              <div className="home-header-wrapper left-border flex-content-end">
                <p className="home-about-para home-about-para-animate">
                  At VMG NeXT, we are Utah&apos;s premier partner for advanced structural solutions.
                  Our expertise in <strong>commercial construction</strong>, specializing in{' '}
                  <strong>tilt-up</strong> and <strong>cast-in-place concrete</strong> for projects
                  in <strong>Salt Lake City</strong> and <strong>Park City</strong>, is backed by a
                  relentless focus on operational excellence and a culture that inspires every team
                  member to lead &amp; excel.
                </p>
                <div className="btn-wrapper">
                  <Link to="/contact-us" className="global-btn">
                    <span className="btn-text-wrapper">
                      <span className="btn-text">Let&apos;s Build together</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. EXACT SECTION SERVICES WITH SWIPER CAROUSEL */}
      <div className="section-services">
        <div className="custom-container">
          <div className="row">
            <div className="col-12">
              <div className="metrics-third-wrapper">
                <h2 className="metrics-title home-highlights-animate-title-2">
                  Our Specialized Construction Services in Utah
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="swiper servicesSwiper" ref={servicesSwiperRef}>
          <div className="swiper-wrapper">
            {[...visibleServices, ...visibleServices].map((srv, idx) => (
              <div className="swiper-slide" key={`${srv.id}-${idx}`}>
                <Link to="/services">
                  <div className="home-services-box">
                    <i className="fa-solid fa-arrow-right fa-arrow-right-custom"></i>
                    <div className="arrow-background">
                      <div className="arrow-background-top"></div>
                      <div className="arrow-background-middle"></div>
                      <div className="arrow-background-bottom"></div>
                    </div>
                    <div className="service-box-content">
                      <h4 className="service-box-title">
                        {srv.title.replace(' Construction', '').replace('Structural Concrete ', '').replace(' Concrete', '').replace(' Facilities', '') === 'Educational'
                          ? 'Educational Facilities'
                          : srv.title.replace(' Construction', '') === 'Commercial'
                          ? 'Commercial Construction'
                          : srv.title.replace(' Construction', '').replace('Structural Concrete ', '').replace(' Concrete', '').replace(' Facilities', '')}
                      </h4>
                      <img
                        src={srv.previewImage}
                        alt={srv.title}
                        className="service-box-img"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="btn-wrapper" style={{ marginTop: '80px' }}>
                <Link to="/services" className="global-btn-white">
                  <span className="btn-text-wrapper">
                    <span className="btn-text-new">Browse all services</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. EXACT SECTION HOME TESTIMONIALS (mySwiper + testiSwiper) */}
      <div className="section-home-testimonials">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="metrics-third-wrapper">
                <div className="mission-wrapper">
                  <p className="testi-subtitle home-testi-animate">testimonials</p>
                </div>
                <h2 className="testi-title home-testi-animate-title">
                  Trusted by Utah&apos;s Biggest Builders
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="swiper mySwiper" ref={mySwiperRef}>
          <div className="swiper-wrapper">
            {[...row1Testimonials, ...row1Testimonials].map((item, idx) => (
              <div className="swiper-slide" key={`r1-${idx}`}>
                <div className="testimonial-card">
                  <div className="testimonial-meta">
                    <div className="col-md-2">
                      <img src={item.img} alt={item.name} className="testi-img" />
                    </div>
                    <div className="col-md-10">
                      <p className="testi-client-name">{item.name}</p>
                      <p className="testi-client-job">{item.job}</p>
                    </div>
                  </div>
                  <p className="testi-review">{item.review}</p>
                  <img
                    src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4126@2x.png"
                    alt="Rating stars"
                    className="testi-stars"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>

        <div className="swiper testiSwiper" ref={testiSwiperRef}>
          <div className="swiper-wrapper">
            {[...row2Testimonials, ...row2Testimonials].map((item, idx) => (
              <div className="swiper-slide" key={`r2-${idx}`}>
                <div className="testimonial-card">
                  <div className="testimonial-meta">
                    <div className="col-md-2">
                      <img src={item.img} alt={item.name} className="testi-img" />
                    </div>
                    <div className="col-md-10">
                      <p className="testi-client-name">{item.name}</p>
                      <p className="testi-client-job">{item.job}</p>
                    </div>
                  </div>
                  <p className="testi-review">{item.review}</p>
                  <img
                    src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4126@2x.png"
                    alt="Rating stars"
                    className="testi-stars"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      {/* 6. EXACT PREFOOTER CTA & LEAFLET MAP */}
      <PreFooterCta />
      <ContactMapSection />
    </div>
  );
}

/* ============================================================================
   2. SERVICES PAGE (Exact 1:1 DOM & CSS from https://vmgnext.com/services/)
   ============================================================================ */
export function ServicesPage() {
  const { services, openEstimateModal } = useVmg();
  const visibleServices = services
    .filter((s) => s.visible)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div>
      {/* 1. SERVICES HERO VIDEO */}
      <div className="services-hero-video-wrapper" aria-hidden="true">
        <video className="services-hero-video-desktop" autoPlay loop muted playsInline>
          <source
            src="https://vmgnext.com/wp-content/uploads/2026/07/Services-1920X640.mp4"
            type="video/mp4"
          />
        </video>
        <video className="services-hero-video-mobile" autoPlay loop muted playsInline>
          <source
            src="https://vmgnext.com/wp-content/uploads/2026/07/Services-440X400.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* 2. SOCIAL TRUST BANNER */}
      <div className="section-social-trust">
        <div className="container">
          <div className="row first-row-social-trust">
            <div className="col-xl-4">
              <div className="review-container">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4126@2x.png"
                  alt="Five-star review for VMG NeXT construction services in Utah"
                  className="photo-review"
                />
                <span className="services-review-title">220+ Satisfied Customers</span>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="social-trust-content-wrapper">
                <h2 className="social-trust-title">
                  From commercial construction in Salt Lake City to custom projects in Park City, we
                  are passionate about building the future of Utah.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MAIN SERVICES CONTENT */}
      <div className="section-services-main-content">
        <div className="container">
          <div className="row services-title-margin">
            <div className="col-md-6 col-12">
              <div className="home-about-wrapper">
                <p className="home-about services-animate">OUR SERVICES</p>
              </div>
              <h2 className="home-about-title services-animate-title">
                Our Expert Construction Services in Utah
              </h2>
            </div>
          </div>

          <div className="row">
            {visibleServices.map((srv, idx) => {
              const imageLeft = idx % 2 === 0;
              return (
                <div className="col-12" key={srv.id}>
                  <div className="service-card">
                    {imageLeft && (
                      <div className="col-xxl-6 col-12">
                        <img src={srv.detailImage} alt={srv.title} className="service-img" />
                      </div>
                    )}
                    <div className="col-xxl-6 col-12">
                      <div className="service-content-wrapper">
                        <h3 className="service-title">{srv.title}</h3>
                        <p className="service-para">{srv.fullDesc}</p>
                        <ul className="service-bullet-points">
                          {srv.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>
                              <div className="service-list-item-content">
                                <div className="service-bullet-icon">
                                  <img
                                    src="https://vmgnext.com/wp-content/uploads/2025/06/check.png"
                                    alt="checkbox icon"
                                  />
                                </div>
                                {bullet}
                              </div>
                            </li>
                          ))}
                        </ul>
                        <div className="btn-wrapper" style={{ marginTop: '28px' }}>
                          <button
                            type="button"
                            onClick={() => openEstimateModal(srv.title)}
                            className="global-btn"
                            style={{ border: 'none', cursor: 'pointer' }}
                          >
                            <span className="btn-text-wrapper">
                              <span className="btn-text">Request Consultation</span>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    {!imageLeft && (
                      <div className="col-xxl-6 col-12 text-right">
                        <img src={srv.detailImage} alt={srv.title} className="service-img" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. PREFOOTER CTA */}
      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   3. PROJECTS PAGE (Exact 1:1 DOM & CSS from https://vmgnext.com/projects/)
   ============================================================================ */
export function ProjectsPage() {
  const { projects, openEstimateModal } = useVmg();
  const visibleProjects = projects
    .filter((p) => p.visible)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const [photoIdxMap, setPhotoIdxMap] = useState<Record<string, number>>({});
  const [lightboxProject, setLightboxProject] = useState<ProjectItem | null>(null);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const getProjectImages = (prj: ProjectItem) => {
    const full = FULL_PROJECT_GALLERIES[prj.id];
    if (full && full.length >= prj.photos.length) return full;
    return prj.photos;
  };

  const getPhotoIdx = (id: string) => photoIdxMap[id] ?? 0;
  const stepPhoto = (prj: ProjectItem, delta: number) => {
    const imgs = getProjectImages(prj);
    const curr = getPhotoIdx(prj.id);
    const next = (curr + delta + imgs.length) % imgs.length;
    setPhotoIdxMap((prev) => ({ ...prev, [prj.id]: next }));
  };

  const openGalleryModal = (prj: ProjectItem, startIdx = 0) => {
    const imgs = getProjectImages(prj);
    setLightboxProject(prj);
    setLightboxImages(imgs);
    setLightboxIdx(startIdx);
    document.body.style.overflow = 'hidden';
  };

  const closeGalleryModal = () => {
    setLightboxProject(null);
    document.body.style.overflow = '';
  };

  return (
    <>
      <div
        id="post-664"
        className="projects-page-wrapper post-664 page type-page status-publish hentry"
        role="main"
      >
        {/* 1. HERO SECTION */}
        <section
          className="careers-hero-section projects-hero-section"
          aria-label="Projects Portfolio at VMG NeXT — Hero"
        >
          <div className="careers-hero-video-wrapper" aria-hidden="true">
            <video
              className="careers-hero-video careers-hero-video-desktop"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://vmgnext.com/wp-content/uploads/2025/10/Vmg-Next-WebsiteV4-1920X640.mp4"
                type="video/mp4"
              />
            </video>
            <video
              className="careers-hero-video careers-hero-video-mobile"
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="https://vmgnext.com/wp-content/uploads/2025/10/Vmg-Next-V4-440X400.mp4"
                type="video/mp4"
              />
            </video>
            <div className="careers-hero-overlay"></div>
          </div>

          <div className="careers-hero-content container">
            <div className="row">
              <div className="col-lg-8 col-12">
                <nav className="careers-breadcrumb" aria-label="Breadcrumb">
                  <ol className="careers-breadcrumb-list">
                    <li>
                      <Link to="/">
                        <span>Home</span>
                      </Link>
                    </li>
                    <li className="careers-breadcrumb-sep" aria-hidden="true">
                      /
                    </li>
                    <li>
                      <span>Projects</span>
                    </li>
                  </ol>
                </nav>

                <div className="mission-wrapper careers-hero-badge-wrapper" aria-hidden="true">
                  <p className="highlights">PORTFOLIO</p>
                </div>

                <h1 className="careers-hero-title">
                  PROJECT <span className="careers-red">PORTFOLIO</span>
                </h1>

                <p className="careers-hero-subtitle">
                  Built on experience. Delivered with precision. Explore our commercial concrete
                  solutions across Utah — from tilt-up warehouses to educational, multifamily, and
                  hospitality structures.
                </p>

                <div className="careers-hero-cta" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a href="#featured-projects" className="global-btn-white">
                    <span className="btn-text-wrapper">
                      <span className="btn-text">EXPLORE PROJECTS</span>
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={() => openEstimateModal()}
                    className="global-btn"
                    style={{ border: 'none', cursor: 'pointer' }}
                  >
                    <span className="btn-text-wrapper">
                      <span className="btn-text">REQUEST CONSULTATION</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. METRICS / HIGHLIGHTS BANNER */}
        <section className="projects-metrics-banner">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-3 col-6">
                <div className="projects-metric-item">
                  <div className="projects-metric-icon">
                    <i className="fa-solid fa-city"></i>
                  </div>
                  <div className="projects-metric-text">
                    <span className="projects-metric-number">{visibleProjects.length}</span>
                    <span className="projects-metric-label">FEATURED PROJECTS</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="projects-metric-item">
                  <div className="projects-metric-icon">
                    <i className="fa-solid fa-ruler-combined"></i>
                  </div>
                  <div className="projects-metric-text">
                    <span className="projects-metric-number">1,322 - 277K</span>
                    <span className="projects-metric-label">SF PROJECT SIZES</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="projects-metric-item">
                  <div className="projects-metric-icon">
                    <i className="fa-solid fa-helmet-safety"></i>
                  </div>
                  <div className="projects-metric-text">
                    <span className="projects-metric-number">$30K - $5.5M</span>
                    <span className="projects-metric-label">CONCRETE SCOPES</span>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="projects-metric-item">
                  <div className="projects-metric-icon">
                    <i className="fa-solid fa-chart-line"></i>
                  </div>
                  <div className="projects-metric-text">
                    <span className="projects-metric-number">MULTIPLE</span>
                    <span className="projects-metric-label">MARKETS SERVED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED PROJECTS GRID / CARDS */}
        <section id="featured-projects" className="projects-grid-section">
          <div className="container">
            <div className="projects-section-header text-center">
              <div
                className="mission-wrapper style-center"
                style={{ justifyContent: 'center' }}
                aria-hidden="true"
              >
                <p className="highlights">OUR WORK</p>
              </div>
              <h2 className="projects-section-title">
                FEATURED <span className="projects-red">PROJECTS</span>
              </h2>
              <p className="projects-section-desc">
                Explore key commercial concrete projects executed with precision across Utah.
              </p>
            </div>

            <div className="row g-4">
              {visibleProjects.map((prj) => {
                const imgs = getProjectImages(prj);
                const currIdx = getPhotoIdx(prj.id) % imgs.length;
                return (
                  <div className="col-lg-6 col-12" key={prj.id}>
                    <div className="project-card">
                      <div className="project-card-image-box">
                        <span className="project-number-badge">{prj.number}</span>
                        <span className="project-market-chip">{prj.market}</span>

                        <div className="swiper project-swiper">
                          <div className="swiper-wrapper">
                            <div className="swiper-slide">
                              <img
                                src={imgs[currIdx]}
                                alt={`${prj.name} - Photo ${currIdx + 1}`}
                                className="project-img"
                              />
                            </div>
                          </div>
                          {imgs.length > 1 && (
                            <>
                              <div
                                className="swiper-button-next"
                                onClick={() => stepPhoto(prj, 1)}
                                role="button"
                                tabIndex={0}
                              ></div>
                              <div
                                className="swiper-button-prev"
                                onClick={() => stepPhoto(prj, -1)}
                                role="button"
                                tabIndex={0}
                              ></div>
                            </>
                          )}
                        </div>

                        <button
                          type="button"
                          className="project-expand-gallery-btn"
                          onClick={() => openGalleryModal(prj, currIdx)}
                        >
                          <i className="fa-solid fa-expand"></i> Gallery ({imgs.length})
                        </button>
                      </div>

                      <div className="project-card-body">
                        <div className="project-title-row">
                          <h3 className="project-name">{prj.name}</h3>
                          <span className="project-price-tag">{prj.priceRange}</span>
                        </div>
                        <div className="project-meta-chips">
                          <span>
                            <i className="fa-solid fa-hard-hat"></i> GC: {prj.gc}
                          </span>
                          <span>
                            <i className="fa-solid fa-ruler-square"></i> {prj.sqft}
                          </span>
                        </div>
                        <p className="project-description">{prj.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. MARKETS WE SERVE */}
        <section className="projects-markets-section">
          <div className="container">
            <div className="text-center mb-5">
              <div
                className="mission-wrapper style-center"
                style={{ justifyContent: 'center' }}
                aria-hidden="true"
              >
                <p className="highlights">DIVERSE EXPERTISE</p>
              </div>
              <h2 className="projects-section-title">
                MARKETS <span className="projects-red">WE SERVE</span>
              </h2>
            </div>

            <div className="row g-4 justify-content-center">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="market-card">
                  <div className="market-icon-box">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <h3 className="market-title">Educational Facilities</h3>
                  <p className="market-desc">
                    High-capacity school expansions, foundations, structural walls, and campus
                    concrete infrastructure.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="market-card">
                  <div className="market-icon-box">
                    <i className="fa-solid fa-hotel"></i>
                  </div>
                  <h3 className="market-title">Hospitality</h3>
                  <p className="market-desc">
                    Hotels, suites, and commercial lodging facilities requiring engineered footings,
                    slabs, and exterior work.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="market-card">
                  <div className="market-icon-box">
                    <i className="fa-solid fa-building-user"></i>
                  </div>
                  <h3 className="market-title">Multifamily Residential</h3>
                  <p className="market-desc">
                    Multilevel residential complexes, tall cast-in-place walls, parking garages,
                    balconies, and amenities.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="market-card">
                  <div className="market-icon-box">
                    <i className="fa-solid fa-warehouse"></i>
                  </div>
                  <h3 className="market-title">Warehouse &amp; Industrial</h3>
                  <p className="market-desc">
                    Large-scale industrial buildings, tilt-up concrete panels, heavy paving, loading
                    docks, and slabs on grade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. OUR CONCRETE CAPABILITIES */}
        <section className="projects-capabilities-section">
          <div className="container">
            <div className="text-center mb-5">
              <div
                className="mission-wrapper style-center"
                style={{ justifyContent: 'center' }}
                aria-hidden="true"
              >
                <p className="highlights">TECHNICAL EXCELLENCE</p>
              </div>
              <h2 className="projects-section-title">
                OUR CONCRETE <span className="projects-red">CAPABILITIES</span>
              </h2>
              <p className="projects-capabilities-intro">
                Comprehensive structural concrete solutions engineered to deliver durability,
                precision, and architectural excellence.
              </p>
            </div>

            <div className="row g-4">
              <div className="col-lg-4 col-md-6 col-12">
                <div className="capability-card">
                  <div className="capability-icon">
                    <i className="fa-solid fa-layer-group"></i>
                  </div>
                  <h3 className="capability-title">Foundations &amp; Foundation Walls</h3>
                  <p className="capability-desc">
                    Heavy structural footings, deep foundations, and reinforced cast-in-place
                    retaining and perimeter walls for any building scale.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="capability-card">
                  <div className="capability-icon">
                    <i className="fa-solid fa-border-all"></i>
                  </div>
                  <h3 className="capability-title">Slabs On Grade</h3>
                  <p className="capability-desc">
                    High-flatness industrial floor slabs, reinforced slab-on-grade systems
                    engineered for heavy load-bearing requirements.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="capability-card">
                  <div className="capability-icon">
                    <i className="fa-solid fa-cubes-stacked"></i>
                  </div>
                  <h3 className="capability-title">Tilt-Up Concrete</h3>
                  <p className="capability-desc">
                    Speed-efficient tilt-up wall panel construction for warehouses, commercial
                    distribution centers, and light industrial facilities.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="capability-card">
                  <div className="capability-icon">
                    <i className="fa-solid fa-road"></i>
                  </div>
                  <h3 className="capability-title">Heavy Paving &amp; Flatwork</h3>
                  <p className="capability-desc">
                    Heavy-duty exterior concrete paving, waterways, aprons, sidewalks, and curb
                    &amp; gutter for commercial developments.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="capability-card">
                  <div className="capability-icon">
                    <i className="fa-solid fa-truck-ramp-box"></i>
                  </div>
                  <h3 className="capability-title">Loading Docks &amp; Site Concrete</h3>
                  <p className="capability-desc">
                    Truck loading docks, dock aprons, propane pads, security bollards, and
                    specialized industrial site concrete solutions.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="capability-card capability-card--highlight">
                  <div className="capability-icon">
                    <i className="fa-solid fa-shield-halved"></i>
                  </div>
                  <h3 className="capability-title">Quality &amp; Precision Execution</h3>
                  <p className="capability-desc">
                    Rigorous quality control, strict schedule adherence, and certified crews
                    ensuring every scope is delivered with precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA SECTION */}
        <PreFooterCta
          badge="PROJECTS"
          heading="Ready to Start Your Project?"
          phoneSubtext="Need an estimate or project consultation? Give Us a Call"
          formHeading="Partner with Utah's premier commercial concrete contractor. Submit your bid request below."
          showExploreLinks={true}
        />
      </div>

      {/* FULL-SCREEN LIGHTBOX GALLERY MODAL (#projectGalleryModal) */}
      {lightboxProject && (
        <div id="projectGalleryModal" className="project-gallery-modal active">
          <button
            type="button"
            className="project-modal-close-btn"
            onClick={closeGalleryModal}
            aria-label="Close Gallery"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="project-modal-content">
            <div className="project-modal-header">
              <h3 id="projectModalTitle" className="project-modal-title">
                {lightboxProject.name}
              </h3>
              <span id="projectModalCounter" className="project-modal-counter">
                {lightboxIdx + 1} / {lightboxImages.length}
              </span>
            </div>

            <div className="modal-swiper-wrapper-box">
              <button
                type="button"
                className="modal-nav-btn modal-nav-prev"
                onClick={() =>
                  setLightboxIdx(
                    (lightboxIdx - 1 + lightboxImages.length) % lightboxImages.length
                  )
                }
                aria-label="Previous photo"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              <div className="swiper modal-swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide modal-slide">
                    <img
                      src={lightboxImages[lightboxIdx]}
                      alt={`${lightboxProject.name} Photo ${lightboxIdx + 1}`}
                      className="modal-project-img"
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="modal-nav-btn modal-nav-next"
                onClick={() => setLightboxIdx((lightboxIdx + 1) % lightboxImages.length)}
                aria-label="Next photo"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================================
   4. ABOUT PAGE (Exact 1:1 DOM & CSS from https://vmgnext.com/about-us/)
   ============================================================================ */
export function AboutPage() {
  return (
    <div>
      {/* 1. HEADER PHOTOS */}
      <div className="section-page-header-photo desktop-header-photo">
        <img
          src="https://vmgnext.com/wp-content/uploads/2025/09/header-about-long.jpg"
          alt="About VMG NeXT - Utah's trusted commercial construction and concrete contractors"
          className="img-photo-header"
        />
      </div>
      <div className="section-page-header-photo mobile-header-photo">
        <img
          src="https://vmgnext.com/wp-content/uploads/2025/09/header-about.png"
          alt="About VMG NeXT - Utah's trusted commercial construction and concrete contractors"
          className="img-photo-header"
        />
      </div>

      {/* 2. WHO WE ARE + BRANDON DAWSON CARD */}
      <div className="section-about-who-we-are">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="who-we-are-wrapper">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/07/Mask-group-1-1.png"
                  alt="The VMG NeXT team planning a commercial construction project in Utah"
                  className="who-we-are-img"
                />
                <div className="about-who-we-are-brandon-dawson-card">
                  <p className="brandon-quote">
                    “Victor is a remarkable person! Trustworthy, dependable, dedicated and honest. I
                    have immense respect for him as both a business leader and a human!”
                  </p>
                  <div className="brandon-meta-wrapper">
                    <div className="col-2">
                      <img
                        src="https://vmgnext.com/wp-content/uploads/2025/06/Avatar-3.png"
                        alt="Brandon M Dawson, Chairman & CEO of Cardone Ventures"
                        className="brandon-dawson-img"
                      />
                    </div>
                    <div className="col-10">
                      <div className="brandon-dawson-name">Brandon M Dawson</div>
                      <div className="brandon-dawson-title">Chairman &amp; CEO, Cardone Ventures</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-who-we-are">
              <div className="home-about-wrapper">
                <p className="home-about about-animate">ABOUT US</p>
              </div>
              <h2 className="home-about-title about-animate-title">Who We Are</h2>
              <p className="about-who-we-are-para about-animate-para">
                At VMG NeXT, we’re reshaping what construction means in the modern world. Based in
                Utah and led by a visionary leadership team, specialize in advanced structural
                solutions like <strong>tilt-up construction</strong>, slabs, and{' '}
                <strong>cast-in-place concrete for projects across Utah</strong>. But we’re more
                than builders, we’re a platform for growth. With every project, we bring a culture
                of leadership, discipline, and innovation that drives results for our clients and
                inspires progress in our industry.
              </p>
              <p className="about-who-we-are-para about-animate-para-2">
                Clients choose us because we deliver more than structures; we deliver confidence.
                Our team is known for its integrity, responsiveness, and precision. From the
                earliest planning stages to the final walk-through, we take pride in being a
                collaborative, transparent partner who’s as invested in your success as you are.
                Whether it’s a <strong>commercial space in Salt Lake City</strong>, a public
                facility, or a <strong>high-end home in Park City</strong>, we’re here to build
                something that lasts together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MISSION & VISION */}
      <div className="section-about-mission-vision">
        <div className="container">
          <div className="row">
            <div className="col-xl-4">
              <div className="mission-wrapper">
                <p className="highlights">mission &amp; vision statement</p>
              </div>
            </div>
            <div className="col-xl-8">
              <p className="about-mission-para">We’re not just building projects</p>
              <p className="vision-para">
                we’re building a company powered by leadership, scale, and a relentless commitment
                to raising the standard of construction across the West.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-6">
              <div className="our-mission-wrapper">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4184.png"
                  alt="Icon representing the VMG NeXT mission"
                  className="mission-icon"
                />
                <div className="mission-meta-wrapper">
                  <h4 className="our-mission-title">Our Mission</h4>
                  <p className="our-mission-para">
                    To cultivate a culture that develops great leaders and delivers{' '}
                    <strong>massive value to our customers&apos; success.</strong>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div className="our-mission-wrapper">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/06/Isolation_Mode.png"
                  alt="Icon representing the VMG NeXT vision"
                  className="mission-icon"
                />
                <div className="mission-meta-wrapper">
                  <h4 className="our-mission-title">Our Vision</h4>
                  <p className="our-mission-para">
                    To become a $125 million platform company with 360 team members in three years,
                    recognized as one of the most trusted{' '}
                    <strong>commercial and concrete construction companies</strong> in the West.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. VALUES SECTION */}
      <div className="values-section">
        <div className="container">
          <div className="global-seperator"></div>

          <div className="row justify-content-center mt-5">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="vmg-point-card h-100">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/10/Frame-41160.png"
                  alt="Icon for VMG NeXT's value of Transparency"
                  className="vmg-point-icon"
                />
                <h2 className="vmg-point-title">TRANSPARENT</h2>
                <p className="vmg-point-para">
                  We move quickly with transparency toward our big goals.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="vmg-point-card h-100">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/10/Frame-4160.png"
                  alt="Icon for VMG NeXT's value of Alignment"
                  className="vmg-point-icon"
                />
                <h2 className="vmg-point-title">ALIGNED</h2>
                <p className="vmg-point-para">
                  When our people grow, the company wins. We align our goals to make it happen.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="vmg-point-card h-100">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/10/Cure.png"
                  alt="Icon for VMG NeXT's value of Inspiration"
                  className="vmg-point-icon"
                />
                <h2 className="vmg-point-title">INSPIRATIONAL</h2>
                <p className="vmg-point-para">
                  We work for something bigger, making our team and clients stronger.
                </p>
              </div>
            </div>
          </div>

          <div className="global-seperator my-5"></div>

          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="vmg-point-card h-100">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/09/icon4.png"
                  alt="Icon for VMG NeXT's value of Accountability"
                  className="vmg-point-icon"
                />
                <h2 className="vmg-point-title">ACCOUNTABLE</h2>
                <p className="vmg-point-para">
                  We hold ourselves accountable, knowing true growth doesn’t happen by accident.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="vmg-point-card h-100">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/09/time.png"
                  alt="Icon for VMG NeXT's value of being Results Oriented"
                  className="vmg-point-icon"
                />
                <h2 className="vmg-point-title">RESULTS ORIENTED</h2>
                <p className="vmg-point-para">
                  Every service has one goal: to deliver the results our clients expect.
                </p>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 mb-4">
              <div className="vmg-point-card h-100">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/10/Brain.png"
                  alt="Icon for VMG NeXT's value of Discipline"
                  className="vmg-point-icon"
                />
                <h2 className="vmg-point-title">DISCIPLINED</h2>
                <p className="vmg-point-para">
                  We do what we say we will. Discipline drives us to keep learning and growing.
                </p>
              </div>
            </div>
          </div>

          <div className="global-seperator mt-5"></div>
        </div>
      </div>

      {/* 5. WHY CHOOSE US */}
      <div className="section-why-us">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 pos-rel">
              <div className="img-wrapper">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2026/08/Group-43434197.png"
                  alt="Aerial photo of a large-scale VMG NeXT commercial construction project in Utah"
                />
              </div>
              <div className="review-box">
                <p className="review-number">220+</p>
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4159.png"
                  alt="clients photo"
                />
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4126@2x.png"
                  alt="review stars"
                />
                <p className="review-para">satisfied customers</p>
              </div>
            </div>
            <div className="col-xl-6 flex-col">
              <div className="why-us-content-wrapper">
                <div className="mission-wrapper">
                  <p className="why-us home-why-us-animate">Why Choose Us</p>
                </div>
                <h2 className="why-title home-why-us-animate-title">Why VMG NeXT</h2>
                <p className="why-para home-why-us-animate-para">
                  At VMG NeXT, <strong>commercial construction</strong> is more than a process; it’s
                  a platform for innovation, leadership, and long-term impact.
                </p>
              </div>
              <div className="row row-checkboxes">
                <div className="col-md-6 p-0">
                  <div className="checkbox-wrapper home-checkbox-wrapper-animate">
                    <img
                      src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4153.png"
                      alt="check icon"
                    />
                    <p className="checkbox-para">A team that treats your project like their own</p>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="checkbox-wrapper home-checkbox-wrapper-animate-2">
                    <img
                      src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4153.png"
                      alt="check icon"
                    />
                    <p className="checkbox-para">
                      Proven systems that keep things moving smoothly
                    </p>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="checkbox-wrapper home-checkbox-wrapper-animate-3">
                    <img
                      src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4153.png"
                      alt="check icon"
                    />
                    <p className="checkbox-para">
                      Construction expertise that goes beyond the basics
                    </p>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="checkbox-wrapper home-checkbox-wrapper-animate-4">
                    <img
                      src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4153.png"
                      alt="check icon"
                    />
                    <p className="checkbox-para">Results you can measure &amp; rely on</p>
                  </div>
                </div>
                <div className="col-md-6 p-0">
                  <div className="checkbox-wrapper home-checkbox-wrapper-animate-5">
                    <img
                      src="https://vmgnext.com/wp-content/uploads/2025/06/Group-4153.png"
                      alt="check icon"
                    />
                    <p className="checkbox-para">Integrity, accountability, and follow-through</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. PREFOOTER CTA */}
      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   5. TEAM PAGE & TEAM MEMBER DETAIL PAGE (Exact 1:1 DOM & CSS from /team/)
   ============================================================================ */
export function TeamPage() {
  const { team } = useVmg();
  const visibleTeam = [...team]
    .filter((m) => m.visible)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  const teamSwiperRef = useRef<HTMLDivElement | null>(null);
  const prevBtnRef = useRef<HTMLDivElement | null>(null);
  const nextBtnRef = useRef<HTMLDivElement | null>(null);
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  useEffect(() => {
    let instance: any = null;
    let timer: any;

    const initTeamSwiper = () => {
      if (!window.Swiper) {
        timer = setTimeout(initTeamSwiper, 200);
        return;
      }
      if (teamSwiperRef.current) {
        instance = new window.Swiper(teamSwiperRef.current, {
          slidesPerView: 1.2,
          spaceBetween: 20,
          loop: visibleTeam.length > 4,
          navigation: {
            nextEl: nextBtnRef.current,
            prevEl: prevBtnRef.current,
          },
          breakpoints: {
            640: { slidesPerView: 1.9, spaceBetween: 20 },
            991: { slidesPerView: 2.5, spaceBetween: 30 },
            1200: { slidesPerView: 3.3, spaceBetween: 20 },
            1400: { slidesPerView: 4.2, spaceBetween: 20 },
          },
        });
      }
    };

    initTeamSwiper();
    return () => {
      if (timer) clearTimeout(timer);
      if (instance) {
        try {
          instance.destroy(true, true);
        } catch {
          // ignore
        }
      }
    };
  }, [visibleTeam.length]);

  const departments = [
    'ALL',
    'Leadership',
    'Operations & Restoration',
    'Estimating',
    'Marketing & Business Dev',
  ];

  const filteredDirectory =
    selectedDept === 'ALL'
      ? visibleTeam
      : visibleTeam.filter((m) => m.department === selectedDept);

  return (
    <div>
      {/* 1. EXACT SECTION-OUR-TEAM SWIPER CAROUSEL (1:1 WITH VMGNEXT.COM/TEAM/) */}
      <div className="section-our-team">
        <div className="container">
          <div className="row">
            <div
              className="metrics-third-wrapper"
              style={{ paddingTop: '100px', textAlign: 'center' }}
            >
              <div className="mission-wrapper" style={{ justifyContent: 'center' }}>
                <p className="testi-subtitle about-our-team-animate">Our Team</p>
              </div>
              <h2 className="testi-title about-our-team-animate-title">
                Our Team of Construction &amp; Concrete Experts
              </h2>
            </div>
          </div>
        </div>

        <div className="swiper teamSwiper" ref={teamSwiperRef}>
          <div className="swiper-wrapper">
            {visibleTeam.map((member) => (
              <div className="swiper-slide" key={member.id}>
                <div className="team-card-wrapper">
                  <Link className="team-member-link" to={`/team/${member.slug}`}>
                    <img
                      className="team-member-photo"
                      src={member.cardPhoto}
                      alt={`${member.name}, ${member.role} at VMG NeXT`}
                    />
                  </Link>
                  <div className="team-meta">
                    <div className="team-member-name">{member.name}</div>
                    <div className="team-member-title">{member.role}</div>
                  </div>
                  &nbsp;
                </div>
              </div>
            ))}
          </div>

          <div className="pagination-wrapper" style={{ marginTop: '50px' }}>
            <div className="pagination-inner-wrapper">
              <div className="swiper-button-prev" ref={prevBtnRef}></div>
              <div className="swiper-button-next" ref={nextBtnRef}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. COMPLETE INTERACTIVE DIRECTORY VIEW (All 18 Active Members + Department Filter) */}
      <div style={{ backgroundColor: '#181818', padding: '40px 0 100px' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              borderTop: '1px solid rgba(255,255,255,0.12)',
              paddingTop: '48px',
              marginBottom: '36px',
            }}
          >
            <div>
              <h3
                style={{
                  color: '#ffffff',
                  fontFamily: '"BBH Sans Bartle", sans-serif',
                  fontSize: '24px',
                  margin: 0,
                }}
              >
                Full Leadership &amp; Estimating Directory ({filteredDirectory.length})
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', marginTop: '6px' }}>
                Click any team member to view their biography page, or manage photos, roles, and
                visibility in the{' '}
                <Link to="/admin" style={{ color: '#E70000', fontWeight: 700 }}>
                  Team 360° Admin CMS →
                </Link>
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setSelectedDept(dept)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '50px',
                    border:
                      selectedDept === dept
                        ? '1px solid #E70000'
                        : '1px solid rgba(255,255,255,0.25)',
                    backgroundColor: selectedDept === dept ? '#E70000' : 'transparent',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  {dept === 'ALL' ? `All (${visibleTeam.length})` : dept}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {filteredDirectory.map((member) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={`dir-${member.id}`}>
                <div className="team-card-wrapper" style={{ marginBottom: '20px' }}>
                  <Link className="team-member-link" to={`/team/${member.slug}`}>
                    <img
                      className="team-member-photo"
                      src={member.cardPhoto}
                      alt={`${member.name}, ${member.role} at VMG NeXT`}
                      style={{ width: '100%' }}
                    />
                  </Link>
                  <div className="team-meta">
                    <div className="team-member-name">{member.name}</div>
                    <div className="team-member-title">{member.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PreFooterCta />
    </div>
  );
}

/* EXACT 1:1 TEAM MEMBER BIO PAGE (Matches team-member-template.php) */
export function TeamMemberDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { team } = useVmg();

  const member =
    team.find((m) => m.slug === slug || `team-member-${m.slug}` === slug) ?? team[0];

  return (
    <div>
      <div className="section-team-member">
        <div className="container">
          <div style={{ marginBottom: '24px' }}>
            <Link
              to="/team"
              style={{
                color: '#E70000',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              ← Back to Our Team
            </Link>
          </div>
          <div className="row">
            <div className="col-xxl-6 align-center">
              <div className="home-about-wrapper">
                <p className="home-about">{member.role}</p>
              </div>
              <h2 className="home-about-title">{member.name}</h2>
              <p className="about-who-we-are-para">{member.bioPara1}</p>
              {member.bioPara2 && <p className="about-who-we-are-para">{member.bioPara2}</p>}
            </div>
            <div className="col-xxl-6 team-member-img">
              <img
                src={member.detailPhoto || member.cardPhoto}
                alt={member.name}
                className="team-member-img"
              />
            </div>
          </div>
        </div>
      </div>
      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   6. CAREERS PAGE (Exact 1:1 DOM & CSS from https://vmgnext.com/careers/)
   ============================================================================ */
export function CareersPage() {
  const { jobs, settings } = useVmg();
  const visibleJobs = jobs.filter((j) => j.visible);

  return (
    <div id="post-600" className="post-600 page type-page status-publish hentry" role="main">
      {/* 1. HERO WITH BACKGROUND VIDEO */}
      <section className="careers-hero-section" aria-label="Careers at VMG NeXT — Hero">
        <div className="careers-hero-video-wrapper" aria-hidden="true">
          <video
            className="careers-hero-video careers-hero-video-desktop"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://vmgnext.com/wp-content/uploads/2025/10/Vmg-Next-WebsiteV4-1920X640.mp4"
              type="video/mp4"
            />
          </video>
          <video
            className="careers-hero-video careers-hero-video-mobile"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://vmgnext.com/wp-content/uploads/2025/10/Vmg-Next-V4-440X400.mp4"
              type="video/mp4"
            />
          </video>
          <div className="careers-hero-overlay"></div>
        </div>

        <div className="careers-hero-content container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <nav className="careers-breadcrumb" aria-label="Breadcrumb">
                <ol className="careers-breadcrumb-list">
                  <li>
                    <Link to="/">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="careers-breadcrumb-sep" aria-hidden="true">
                    /
                  </li>
                  <li>
                    <span>Careers</span>
                  </li>
                </ol>
              </nav>

              <div className="mission-wrapper careers-hero-badge-wrapper" aria-hidden="true">
                <p className="highlights">Careers</p>
              </div>

              <h1 className="careers-hero-title">
                Build Something <span className="careers-red">That Lasts.</span>
              </h1>

              <p className="careers-hero-subtitle">
                Join VMG NeXT — Utah&apos;s premier commercial construction team. We move with
                purpose, lead with action, and build careers as strong as the structures we create.
              </p>

              <div className="careers-hero-cta">
                <a href="#open-positions" className="global-btn-white">
                  <span className="btn-text-wrapper">
                    <span className="btn-text">View Open Positions</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY VMG NeXT */}
      <section className="careers-why-section" aria-labelledby="why-vmgnext-heading">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 col-12 careers-why-left">
              <div className="mission-wrapper" aria-hidden="true">
                <p className="highlights">Why VMG NeXT</p>
              </div>
              <h2 id="why-vmgnext-heading" className="careers-section-title">
                More Than a Job.
                <br />A Career Worth Building.
              </h2>
              <p className="careers-why-para">
                At VMG NeXT, we don&apos;t just build structures — we build futures. We&apos;re a{' '}
                <strong>commercial construction company in Utah</strong> driven by excellence,
                grounded in integrity, and committed to the growth of every single person on our
                team.
              </p>
              <p className="careers-why-para">
                Whether you&apos;re an experienced professional or just starting your career in{' '}
                <strong>construction in Salt Lake City</strong>, you&apos;ll find a place where your
                work matters and your potential has no ceiling.
              </p>
              <p className="careers-why-para">
                <Link to="/about-us" className="careers-link-red">
                  Learn more about who we are →
                </Link>
              </p>
            </div>

            <div className="col-lg-7 col-12">
              <div className="careers-stats-grid" role="list">
                <div className="careers-stat-card" role="listitem">
                  <div className="careers-stat-number">
                    20<span className="careers-stat-plus">+</span>
                  </div>
                  <div className="careers-stat-label">Years of Excellence</div>
                </div>
                <div className="careers-stat-card" role="listitem">
                  <div className="careers-stat-number">
                    220<span className="careers-stat-plus">+</span>
                  </div>
                  <div className="careers-stat-label">Projects Completed</div>
                </div>
                <div className="careers-stat-card" role="listitem">
                  <div className="careers-stat-number">
                    100<span className="careers-stat-plus">%</span>
                  </div>
                  <div className="careers-stat-label">Client Satisfaction</div>
                </div>
                <div className="careers-stat-card careers-stat-card--dark" role="listitem">
                  <div className="careers-stat-highlight">&quot;We win together.&quot;</div>
                  <div className="careers-stat-label">— VMG NeXT Culture</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS */}
      <section className="careers-benefits-section" aria-labelledby="benefits-heading">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div
                className="mission-wrapper"
                style={{ justifyContent: 'center' }}
                aria-hidden="true"
              >
                <p className="highlights">Benefits</p>
              </div>
              <h2
                id="benefits-heading"
                className="careers-section-title careers-section-title--center"
              >
                What We Offer Our Team
              </h2>
              <p className="careers-benefits-intro">
                We believe that taking care of our people is the foundation of every great project.
              </p>
            </div>
          </div>

          <ul className="row g-4 careers-benefits-grid" role="list">
            <li className="col-lg-4 col-md-6 col-12" role="listitem">
              <article className="careers-benefit-card">
                <div className="careers-benefit-icon" aria-hidden="true">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <h3 className="careers-benefit-title">Health &amp; Medical Benefits</h3>
                <p className="careers-benefit-para">
                  Comprehensive medical, dental, and vision coverage for you and your family.
                  Eligible after 60 days of employment during the next open enrollment.
                </p>
              </article>
            </li>
            <li className="col-lg-4 col-md-6 col-12" role="listitem">
              <article className="careers-benefit-card">
                <div className="careers-benefit-icon" aria-hidden="true">
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <h3 className="careers-benefit-title">Career Growth &amp; Advancement</h3>
                <p className="careers-benefit-para">
                  Clear pathways for advancement, mentorship programs, and leadership development
                  designed to take you further.
                </p>
              </article>
            </li>
            <li className="col-lg-4 col-md-6 col-12" role="listitem">
              <article className="careers-benefit-card">
                <div className="careers-benefit-icon" aria-hidden="true">
                  <i className="fa-solid fa-dollar-sign"></i>
                </div>
                <h3 className="careers-benefit-title">Competitive Compensation</h3>
                <p className="careers-benefit-para">
                  Industry-leading compensation packages with performance bonuses and incentives
                  that reward results.
                </p>
              </article>
            </li>
            <li className="col-lg-4 col-md-6 col-12" role="listitem">
              <article className="careers-benefit-card">
                <div className="careers-benefit-icon" aria-hidden="true">
                  <i className="fa-solid fa-users"></i>
                </div>
                <h3 className="careers-benefit-title">Strong Team Culture</h3>
                <p className="careers-benefit-para">
                  A team that has your back. We celebrate wins together and grow stronger through
                  every challenge.
                </p>
              </article>
            </li>
            <li className="col-lg-4 col-md-6 col-12" role="listitem">
              <article className="careers-benefit-card">
                <div className="careers-benefit-icon" aria-hidden="true">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h3 className="careers-benefit-title">Training &amp; Development</h3>
                <p className="careers-benefit-para">
                  Ongoing training, industry certifications, and education support to keep you at
                  the top of your field in construction.
                </p>
              </article>
            </li>
            <li className="col-lg-4 col-md-6 col-12" role="listitem">
              <article className="careers-benefit-card">
                <div className="careers-benefit-icon" aria-hidden="true">
                  <i className="fa-solid fa-hard-hat"></i>
                </div>
                <h3 className="careers-benefit-title">Safety &amp; Equipment First</h3>
                <p className="careers-benefit-para">
                  Industry-leading safety protocols, top-tier gear, and modern equipment to ensure
                  every team member returns home safely.
                </p>
              </article>
            </li>
          </ul>
        </div>
      </section>

      {/* 4. OPEN POSITIONS + YOLANDA RESUME BANNER */}
      <section
        className="careers-positions-section"
        id="open-positions"
        aria-labelledby="positions-heading"
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="mission-wrapper" aria-hidden="true">
                <p className="highlights">Now Hiring</p>
              </div>
              <h2 id="positions-heading" className="careers-section-title">
                Open Construction Jobs in Utah
              </h2>
              <p className="careers-positions-intro">
                We&apos;re always looking for talented people to join VMG NeXT. If you don&apos;t
                see a perfect fit below, send us your resume anyway — we&apos;re always growing.
              </p>
            </div>
          </div>

          <div className="careers-positions-list" role="list">
            {visibleJobs.map((job) => (
              <article className="careers-position-card" role="listitem" key={job.id}>
                <div className="careers-position-left">
                  <div className="careers-position-type">{job.type}</div>
                  <h3 className="careers-position-title">{job.title}</h3>
                  <div className="careers-position-meta">
                    <span>
                      <i className="fa-solid fa-location-dot" aria-hidden="true"></i> {job.location}
                    </span>
                    <span>
                      <i className="fa-solid fa-briefcase" aria-hidden="true"></i> {job.department}
                    </span>
                  </div>
                  <p className="careers-position-desc">{job.description}</p>
                </div>
                <div className="careers-position-right">
                  <a
                    href={`mailto:${settings.emailCareers}?subject=Application for ${encodeURIComponent(
                      job.title
                    )} — VMG NeXT Careers`}
                    className="careers-apply-btn global-btn-white"
                  >
                    <span className="btn-text-wrapper">
                      <span className="btn-text">Email Resume</span>
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="careers-resume-banner" aria-labelledby="resume-banner-title">
            <div className="careers-resume-banner-inner">
              <div className="careers-resume-icon-box" aria-hidden="true">
                <i className="fa-solid fa-paper-plane"></i>
              </div>
              <div className="careers-resume-content">
                <span className="careers-resume-badge">Direct Talent Network</span>
                <h3 id="resume-banner-title" className="careers-resume-title">
                  Don&apos;t See The Right Role?
                </h3>
                <p className="careers-resume-desc">
                  We are always expanding our Utah commercial construction team. Email your resume
                  directly to Yolanda Galvan and we will match you with upcoming positions.
                </p>
                <div className="careers-resume-email-chip">
                  <i className="fa-solid fa-envelope"></i>
                  <span>
                    Direct Email: <strong>{settings.emailCareers}</strong>
                  </span>
                </div>
              </div>
              <div className="careers-resume-action">
                <a
                  href={`mailto:${settings.emailCareers}?subject=General Resume Submission — VMG NeXT Careers`}
                  className="careers-resume-btn"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                  <span>Send Resume to Yolanda</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERTICAL VIDEO TESTIMONIALS (Valerie, Victor, Scott) */}
      <section className="careers-testimonials-section" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div
                className="mission-wrapper"
                style={{ justifyContent: 'center' }}
                aria-hidden="true"
              >
                <p className="highlights" style={{ borderColor: '#fff', color: '#fff' }}>
                  Our Team
                </p>
              </div>
              <h2
                id="testimonials-heading"
                className="careers-section-title careers-section-title--white careers-section-title--center"
              >
                Hear From Our Team
              </h2>
              <p className="careers-testi-intro">
                Real stories from the people who build VMG NeXT every day. See what it&apos;s like
                to grow your career with us.
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center careers-testi-grid" role="list">
            <div className="col-lg-4 col-md-5 col-sm-8 col-12" role="listitem">
              <div className="careers-video-card">
                <div className="careers-video-wrapper">
                  <video className="careers-vertical-video" controls playsInline preload="metadata">
                    <source
                      src="https://vmgnext.com/wp-content/uploads/2026/08/VMGNEXT_WEBSITEVIDEO_VALERIE.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="careers-testi-info mt-3">
                  <div className="careers-testi-name">Valerie</div>
                  <div className="careers-testi-role">— VMG NeXT Team</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-5 col-sm-8 col-12" role="listitem">
              <div className="careers-video-card">
                <div className="careers-video-wrapper">
                  <video className="careers-vertical-video" controls playsInline preload="metadata">
                    <source
                      src="https://vmgnext.com/wp-content/uploads/2026/08/VMGNEXT_WEBSITEVIDEO_VICTOR.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="careers-testi-info mt-3">
                  <div className="careers-testi-name">Victor</div>
                  <div className="careers-testi-role">— VMG NeXT Team</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-5 col-sm-8 col-12" role="listitem">
              <div className="careers-video-card">
                <div className="careers-video-wrapper">
                  <video className="careers-vertical-video" controls playsInline preload="metadata">
                    <source
                      src="https://vmgnext.com/wp-content/uploads/2026/08/VMGNEXT_WEBSITEVIDEO_SCOTT_1.mp4"
                      type="video/mp4"
                    />
                  </video>
                </div>
                <div className="careers-testi-info mt-3">
                  <div className="careers-testi-name">Scott</div>
                  <div className="careers-testi-role">— VMG NeXT Team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PREFOOTER CTA */}
      <PreFooterCta
        badge="CAREERS"
        heading="Ready to Build Your Career?"
        phoneSubtext="Have questions about our roles? Give Us a Call"
        formHeading="Join Utah's premier commercial construction team. Submit your details below to get started."
        showExploreLinks={true}
      />
    </div>
  );
}

/* ============================================================================
   7. RESTORATION PAGE (Exact 1:1 DOM & CSS from https://vmgnext.com/restoration/)
   ============================================================================ */
export function RestorationPage() {
  const [filter, setFilter] = useState<string>('all');
  const restoSwiperRef = useRef<HTMLDivElement | null>(null);

  const filteredItems =
    filter === 'all'
      ? INITIAL_RESTORATION
      : INITIAL_RESTORATION.filter((item) => item.category === filter);

  useEffect(() => {
    let instance: any = null;
    let timer: any;

    const initRestoSwiper = () => {
      if (!window.Swiper) {
        timer = setTimeout(initRestoSwiper, 200);
        return;
      }
      if (restoSwiperRef.current) {
        instance = new window.Swiper(restoSwiperRef.current, {
          slidesPerView: 'auto',
          spaceBetween: 20,
          loop: filteredItems.length > 4,
          speed: 3500,
          autoplay: {
            delay: 0,
            disableOnInteraction: false,
          },
        });
      }
    };

    initRestoSwiper();
    return () => {
      if (timer) clearTimeout(timer);
      if (instance) {
        try {
          instance.destroy(true, true);
        } catch {
          // ignore
        }
      }
    };
  }, [filter, filteredItems.length]);

  return (
    <div id="post-398" className="content post-398 page type-page status-publish hentry">
      {/* 1. SERVICE INTRO SECTION */}
      <div
        className="service-intro-section"
        style={{ paddingTop: '100px', paddingBottom: '50px', backgroundColor: '#ffffff' }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center">
              <img
                src="https://vmgnext.com/wp-content/uploads/2026/02/Services_resto2.jpg"
                alt="Detailed view of concrete repair work in Salt Lake City"
                className="resto-main-img"
                style={{ width: '80%', borderRadius: '8px' }}
              />
            </div>
            <div className="col-lg-6">
              <div className="home-about-wrapper">
                <p className="home-about">RESTORATION DIVISION</p>
              </div>
              <h2 className="home-about-title">Expert Structural Restoration in Utah</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#555' }}>
                From aging infrastructure to structures compromised by wear or damage, VMG
                NeXT&apos;s Restoration Division provides specialized solutions to extend the life
                and performance of your assets. We serve property management companies, general
                contractors, and homeowners across <strong>Salt Lake City</strong>,{' '}
                <strong>Park City</strong>, and all of <strong>Utah</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. RESTORATION HERO SECTION */}
      <div className="restoration-hero-section">
        <div className="container">
          <h1 className="home-about-title">Every Structure Tells a Story</h1>
          <p className="sub-headline">
            Our job is to bring it back stronger, safer, and{' '}
            <strong>ready for the future.</strong>
          </p>
          <ul className="restoration-checklist">
            <li>
              <i className="fa-solid fa-check-circle"></i> Concrete Repair &amp; Strengthening
            </li>
            <li>
              <i className="fa-solid fa-check-circle"></i> Structural Restoration
            </li>
            <li>
              <i className="fa-solid fa-check-circle"></i> Surface Finishing &amp; Sealing
            </li>
          </ul>
        </div>
      </div>

      {/* 3. RESTORATION GALLERY SECTION (All 29 Restoration Photos) */}
      <div className="restoration-gallery-section">
        <div className="section-header">
          <div className="home-about-wrapper" style={{ justifyContent: 'center' }}>
            <p className="home-about">OUR WORK</p>
          </div>
          <h2 className="home-about-title">Restoration Projects Gallery</h2>
        </div>

        <div className="project-filters" id="projectFilters">
          <button
            type="button"
            className={`project-filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects ({INITIAL_RESTORATION.length})
          </button>
          <button
            type="button"
            className={`project-filter-btn ${filter === 'wall-repairs' ? 'active' : ''}`}
            onClick={() => setFilter('wall-repairs')}
          >
            Structural Foundation Wall Repairs
          </button>
          <button
            type="button"
            className={`project-filter-btn ${filter === 'concrete-pourbacks' ? 'active' : ''}`}
            onClick={() => setFilter('concrete-pourbacks')}
          >
            Concrete Pourbacks
          </button>
          <button
            type="button"
            className={`project-filter-btn ${filter === 'door-stoops' ? 'active' : ''}`}
            onClick={() => setFilter('door-stoops')}
          >
            Concrete Additions
          </button>
          <button
            type="button"
            className={`project-filter-btn ${filter === 'wood-decks' ? 'active' : ''}`}
            onClick={() => setFilter('wood-decks')}
          >
            Wood Decks
          </button>
        </div>

        <div className="swiper resto-gallery-swiper" ref={restoSwiperRef}>
          <div className="swiper-wrapper">
            {filteredItems.map((item) => (
              <div className="swiper-slide" key={item.id}>
                <div className="resto-gallery-item">
                  <img src={item.img} alt={item.label} />
                  <span className="project-badge">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. OUR PROCESS SECTION */}
      <div
        className="our-process-section"
        style={{ padding: '100px 0', backgroundColor: '#f9f9f9' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12 text-center" style={{ marginBottom: '60px' }}>
              <div className="home-about-wrapper" style={{ justifyContent: 'center' }}>
                <p className="home-about">OUR APPROACH</p>
              </div>
              <h2 className="home-about-title">A Disciplined Process You Can Trust</h2>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="process-card">
                <div className="process-number">1</div>
                <h4>Assessment &amp; Diagnostics</h4>
                <p>
                  We begin with a thorough investigation to identify the root cause of the damage or
                  deterioration, ensuring our solution is precise and effective.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="process-card">
                <div className="process-number">2</div>
                <h4>Strategy &amp; Solution Design</h4>
                <p>
                  We develop a tailored restoration plan using advanced materials and proven
                  engineering techniques to ensure long-term structural integrity.
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="process-card">
                <div className="process-number">3</div>
                <h4>Execution &amp; Quality Control</h4>
                <p>
                  Our expert team executes the restoration with meticulous attention to detail,
                  adhering to the highest standards of safety and quality at every step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. PREFOOTER CTA */}
      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   8. BLOG PAGE & SINGLE BLOG POST PAGE (Powered by AI Auto-Publisher in /admin)
   ============================================================================ */
export function BlogPage() {
  const { blogs } = useVmg();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(blogs.map((b) => b.category)))];
  const filteredBlogs =
    selectedCategory === 'ALL'
      ? blogs
      : blogs.filter((b) => b.category === selectedCategory);

  return (
    <div>
      {/* HERO */}
      <section className="careers-hero-section projects-hero-section">
        <div className="careers-hero-video-wrapper" aria-hidden="true">
          <video
            className="careers-hero-video careers-hero-video-desktop"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://vmgnext.com/wp-content/uploads/2025/10/Vmg-Next-WebsiteV4-1920X640.mp4"
              type="video/mp4"
            />
          </video>
          <div className="careers-hero-overlay"></div>
        </div>

        <div className="careers-hero-content container">
          <div className="row">
            <div className="col-lg-9 col-12">
              <div className="mission-wrapper careers-hero-badge-wrapper">
                <p className="highlights">INSIGHTS &amp; AI PUBLISHING ENGINE</p>
              </div>
              <h1 className="careers-hero-title">
                VMG NeXT <span className="careers-red">CONSTRUCTION BLOG</span>
              </h1>
              <p className="careers-hero-subtitle">
                Expert perspectives on commercial construction, tilt-up wall engineering,
                cast-in-place foundations, and structural concrete restoration across Utah.
              </p>
              <div className="careers-hero-cta">
                <Link to="/admin" className="global-btn">
                  <span className="btn-text-wrapper">
                    <span className="btn-text">
                      <i className="fa-solid fa-wand-magic-sparkles"></i> Generate &amp; Auto-Publish Blog with AI
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="projects-grid-section" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`project-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <Link
              to="/admin"
              style={{
                color: '#E70000',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '14px',
              }}
            >
              + Write New Article with AI Prompt →
            </Link>
          </div>

          <div className="row g-4">
            {filteredBlogs.map((post) => (
              <div className="col-lg-4 col-md-6 col-12" key={post.id}>
                <div
                  className="project-card"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div className="project-card-image-box" style={{ height: '240px' }}>
                    {post.aiGenerated && (
                      <span className="project-number-badge" style={{ fontSize: '11px' }}>
                        AI PUBLISHED
                      </span>
                    )}
                    <span className="project-market-chip">{post.category}</span>
                    <Link to={`/blog/${post.slug}`}>
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="project-img"
                        style={{ height: '240px', width: '100%', objectFit: 'cover' }}
                      />
                    </Link>
                  </div>
                  <div
                    className="project-card-body"
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div className="project-meta-chips" style={{ marginBottom: '12px' }}>
                        <span>
                          <i className="fa-regular fa-calendar"></i> {post.publishedAt}
                        </span>
                        <span>
                          <i className="fa-regular fa-clock"></i> {post.readTime}
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <h3 className="project-name" style={{ fontSize: '20px', lineHeight: 1.35 }}>
                          {post.title}
                        </h3>
                      </Link>
                      <p className="project-description" style={{ marginTop: '12px' }}>
                        {post.excerpt}
                      </p>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                      <Link
                        to={`/blog/${post.slug}`}
                        style={{
                          color: '#E70000',
                          fontWeight: 700,
                          textDecoration: 'none',
                          fontSize: '13px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Read Full Article →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PreFooterCta />
    </div>
  );
}

export function BlogPostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { blogs, openEstimateModal } = useVmg();
  const post = blogs.find((b) => b.slug === slug) ?? blogs[0];

  return (
    <div>
      <div style={{ backgroundColor: '#181818', color: '#ffffff', padding: '80px 0 60px' }}>
        <div className="container">
          <Link
            to="/blog"
            style={{
              color: '#E70000',
              fontWeight: 700,
              textDecoration: 'none',
              fontSize: '13px',
              textTransform: 'uppercase',
            }}
          >
            ← Back to All Articles
          </Link>
          <div className="mission-wrapper" style={{ marginTop: '20px' }}>
            <p className="highlights">{post.category}</p>
          </div>
          <h1
            style={{
              fontFamily: '"BBH Sans Bartle", sans-serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
              lineHeight: 1.15,
              marginTop: '12px',
              maxWidth: '920px',
            }}
          >
            {post.title}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '16px', fontSize: '14px' }}>
            By <strong>{post.author}</strong> · {post.publishedAt} · {post.readTime}
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: '#ffffff', padding: '60px 0 90px' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <img
            src={post.coverImage}
            alt={post.title}
            style={{
              width: '100%',
              maxHeight: '460px',
              objectFit: 'cover',
              borderRadius: '18px',
              marginBottom: '40px',
            }}
          />
          <div
            style={{ fontSize: '18px', lineHeight: 1.8, color: '#222' }}
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div
            style={{
              marginTop: '50px',
              padding: '36px',
              borderRadius: '20px',
              backgroundColor: '#181818',
              color: '#ffffff',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '20px',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: '"BBH Sans Bartle", sans-serif',
                  fontSize: '22px',
                  margin: 0,
                }}
              >
                Planning a Commercial Concrete Project in Utah?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.75)', margin: '8px 0 0', fontSize: '15px' }}>
                Connect directly with our Estimating Desk for quantity takeoffs and structural
                consultations.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEstimateModal()}
              className="global-btn"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              <span className="btn-text-wrapper">
                <span className="btn-text">Request Consultation</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <PreFooterCta />
    </div>
  );
}

/* ============================================================================
   9. CONTACT PAGE (Exact 1:1 DOM & CSS from https://vmgnext.com/contact-us/)
   ============================================================================ */
export function ContactPage() {
  const { settings, submitEstimateLead } = useVmg();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    submitEstimateLead({
      fullName: name.trim(),
      company: 'Contact Page Inquiry',
      email: email.trim(),
      phone: phone.trim(),
      serviceType: service || 'Commercial Construction',
      estimatedSqft: 'TBD',
      budgetRange: 'TBD',
      projectLocation: 'Utah',
      timeline: 'Within 60 Days',
      message: message.trim() || 'Contact Us form inquiry.',
    });
    setName('');
    setEmail('');
    setPhone('');
    setService('');
    setMessage('');
  };

  return (
    <div>
      {/* 1. HEADER PHOTOS */}
      <div className="section-page-header-photo desktop-header-photo">
        <img
          src="https://vmgnext.com/wp-content/uploads/2026/02/Contact_new1.jpg"
          alt="Contact VMG NeXT for commercial construction projects in Utah"
          className="img-photo-header"
        />
      </div>
      <div className="section-page-header-photo mobile-header-photo">
        <img
          src="https://vmgnext.com/wp-content/uploads/2026/02/Contact_new2.jpg"
          alt="Contact VMG NeXT for commercial construction projects in Utah"
          className="img-photo-header"
        />
      </div>

      {/* 2. CONTACT INFO CARDS */}
      <div className="section-contact-info">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <a href={`mailto:${settings.emailGeneral}`} className="contact-info-link">
                <div className="info-card">
                  <img
                    src="https://vmgnext.com/wp-content/uploads/2025/06/mail.png"
                    alt="mail icon"
                    className="info-icon"
                  />
                  <h3 className="info-title">Email Us</h3>
                  <p className="info-para">
                    Have a question or project in mind? Let&apos;s talk.
                  </p>
                </div>
              </a>
            </div>
            <div className="col-lg-4">
              <a
                href={`tel:${settings.phone.replace(/[^0-9]/g, '')}`}
                className="contact-info-link"
              >
                <div className="info-card">
                  <img
                    src="https://vmgnext.com/wp-content/uploads/2025/06/Vector-1.png"
                    alt="phone icon"
                    className="info-icon"
                  />
                  <h3 className="info-title">Call Us</h3>
                  <p className="info-para">
                    Speak directly with our team—no wait, no hassle.
                  </p>
                </div>
              </a>
            </div>
            <div className="col-lg-4">
              <a
                href="https://maps.app.goo.gl/WrMaTfr4mdUvjJBJA"
                className="contact-info-link"
                target="_blank"
                rel="noreferrer"
              >
                <div className="info-card">
                  <img
                    src="https://vmgnext.com/wp-content/uploads/2025/06/icon.png"
                    alt="location icon"
                    className="info-icon"
                  />
                  <h3 className="info-title">Visit Us</h3>
                  <p className="info-para">
                    Visit our office and experience the VMG NeXT culture.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CONTACT FORM */}
      <div className="section-contact-form">
        <div className="container">
          <div className="row">
            <div className="col-xl-6">
              <div className="contact-form-wrapper">
                <img
                  src="https://vmgnext.com/wp-content/uploads/2025/10/Contact.png"
                  alt="A VMG NeXT project manager ready to discuss your construction project in Utah"
                  className="contact-form-photo"
                />
              </div>
            </div>
            <div className="col-xl-6">
              <div className="contact-form-wrapper">
                <h3 className="home-form-title">Let’s Start Building Together</h3>
                <div className="wpcf7 js" lang="en-US" dir="ltr">
                  <form onSubmit={handleSubmit} className="wpcf7-form init" aria-label="Contact form">
                    <div className="form-wrapper">
                      <div className="row">
                        <div className="col-12">
                          <p>
                            <label>
                              Full Name{' '}
                              <span className="wpcf7-form-control-wrap">
                                <input
                                  size={40}
                                  maxLength={400}
                                  className="wpcf7-form-control wpcf7-text wpcf7-validates-as-required"
                                  required
                                  placeholder="Wes Johnson"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                  type="text"
                                />
                              </span>
                            </label>
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <label>
                              Email
                              <span className="wpcf7-form-control-wrap">
                                <input
                                  size={40}
                                  maxLength={400}
                                  className="wpcf7-form-control wpcf7-email wpcf7-validates-as-required wpcf7-text"
                                  required
                                  placeholder="Wesjohnson@gmail.com"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  type="email"
                                />
                              </span>
                            </label>
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <label>
                              Phone
                              <span className="wpcf7-form-control-wrap">
                                <input
                                  size={40}
                                  maxLength={400}
                                  className="wpcf7-form-control wpcf7-tel wpcf7-validates-as-required wpcf7-text"
                                  required
                                  placeholder="+1 (123) 456-7891"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  type="tel"
                                />
                              </span>
                            </label>
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p>
                            <label>
                              Service
                              <span className="wpcf7-form-control-wrap">
                                <select
                                  className="wpcf7-form-control wpcf7-select wpcf7-validates-as-required"
                                  value={service}
                                  onChange={(e) => setService(e.target.value)}
                                >
                                  <option value="">Select Service</option>
                                  <option value="Tilt-Up">Tilt-Up</option>
                                  <option value="Water Treatment">Water Treatment</option>
                                  <option value="Slabs">Slabs</option>
                                  <option value="Educational Facilities">
                                    Educational Facilities
                                  </option>
                                  <option value="Commercial Construction">
                                    Commercial Construction
                                  </option>
                                  <option value="High-End Homes">High-End Homes</option>
                                </select>
                              </span>
                            </label>
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <p>
                            <label>
                              Message
                              <span className="wpcf7-form-control-wrap">
                                <textarea
                                  cols={40}
                                  rows={6}
                                  maxLength={2000}
                                  className="wpcf7-form-control wpcf7-textarea"
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                />
                              </span>
                            </label>
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
          </div>
        </div>
      </div>

      {/* 4. LEAFLET MAP */}
      <ContactMapSection />
    </div>
  );
}

/* ============================================================================
   10. PRIVACY POLICY & TERMS OF USE PAGES
   ============================================================================ */
export function LegalPage({ type }: { type: 'privacy' | 'terms' }) {
  const { settings } = useVmg();
  const isPrivacy = type === 'privacy';

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '100px 0', color: '#181818' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        <div className="home-about-wrapper">
          <p className="home-about">LEGAL</p>
        </div>
        <h1 className="home-about-title">
          {isPrivacy ? 'Privacy Policy' : 'Terms of Use'}
        </h1>
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#444', marginTop: '24px' }}>
          {isPrivacy
            ? `At ${settings.companyName}, located at ${settings.address}, we respect your privacy and are committed to protecting any personal and project information you share with us through our website, consultation forms, and estimating portal.`
            : `Welcome to ${settings.companyName}. By accessing or using our website, portfolio, and project estimating forms, you agree to comply with and be bound by the following Terms of Use.`}
        </p>
        <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#444', marginTop: '16px' }}>
          For any questions regarding this policy, please contact us at{' '}
          <a href={`mailto:${settings.emailGeneral}`} style={{ color: '#E70000' }}>
            {settings.emailGeneral}
          </a>{' '}
          or call {settings.phone}.
        </p>
      </div>
    </div>
  );
}
