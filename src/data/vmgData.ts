export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  bullets: string[];
  previewImage: string;
  detailImage: string;
  visible: boolean;
  orderIndex: number;
}

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  market: 'Warehouse' | 'Multifamily Residential' | 'Educational Facility' | 'Hospitality';
  priceRange: string;
  gc: string;
  sqft: string;
  description: string;
  photos: string[];
  visible: boolean;
  orderIndex: number;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Operations & Restoration' | 'Estimating' | 'Marketing & Business Dev';
  cardPhoto: string;
  detailPhoto: string;
  bioPara1: string;
  bioPara2: string;
  visible: boolean;
  orderIndex: number;
  note?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  coverImage: string;
  contentHtml: string;
  aiGenerated?: boolean;
  promptUsed?: string;
  seoKeywords?: string[];
  orderIndex: number;
}

export interface JobPosition {
  id: string;
  title: string;
  type: 'Full Time' | 'Part Time' | 'Contract';
  location: string;
  department: string;
  description: string;
  salaryRange: string;
  visible: boolean;
  datePosted: string;
}

export interface RestorationItem {
  id: string;
  category: 'wall-repairs' | 'concrete-pourbacks' | 'door-stoops' | 'wood-decks';
  label: string;
  img: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface EstimateLead {
  id: string;
  createdAt: string;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  serviceType: string;
  estimatedSqft: string;
  budgetRange: string;
  projectLocation: string;
  timeline: string;
  message: string;
  apiSynced: boolean;
  apiKeyPrefix: string;
  status: 'New' | 'In Estimating' | 'Proposal Sent';
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  address: string;
  emailGeneral: string;
  emailCeo: string;
  emailCareers: string;
  estimatingApiKey: string;
  estimatingEndpoint: string;
  geminiApiKey: string;
  heroVideoDesktop: string;
  heroVideoMobile: string;
  servicesVideoDesktop: string;
  logoHeader: string;
  logoFooter: string;
  socialLinkedin: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTiktok: string;
}

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'VMG NeXT Construction',
  tagline: "Utah's Premier Commercial & Structural Concrete Contractor",
  phone: '801-640-5684',
  address: '7370 S Creek Rd. STE 204, Sandy, Utah 84093',
  emailGeneral: 'info@vmgnext.com',
  emailCeo: 'victor@vmgnext.com',
  emailCareers: 'yolanda@vmgnext.com',
  estimatingApiKey: 'ocv1_bBAB9MUQVzEagJKFYOmhIhwFItKDx3L0vvZlKgDTEs8=',
  estimatingEndpoint: 'https://api.estimating-gateway.vmgnext.com/v1/leads',
  geminiApiKey: '',
  heroVideoDesktop: 'https://vmgnext.com/wp-content/uploads/2025/10/Vmg-Next-WebsiteV4-1920X640.mp4',
  heroVideoMobile: 'https://vmgnext.com/wp-content/uploads/2025/10/Vmg-Next-V4-440X400.mp4',
  servicesVideoDesktop: 'https://vmgnext.com/wp-content/uploads/2026/07/Services-1920X640.mp4',
  logoHeader: 'https://vmgnext.com/wp-content/uploads/2025/09/header_white.png',
  logoFooter: 'https://vmgnext.com/wp-content/uploads/2025/06/logo-white.png',
  socialLinkedin: 'https://www.linkedin.com/company/vmgnext',
  socialFacebook: 'https://www.facebook.com/profile.php?id=61572415653958',
  socialInstagram: 'https://www.instagram.com/vmg.next/',
  socialTiktok: 'https://www.tiktok.com/@vmgnext',
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    slug: 'tilt-up',
    title: 'Tilt-Up Construction',
    shortDesc: 'Fast, efficient method for building durable concrete structures using large pre-formed panels cast directly on-site.',
    fullDesc:
      'Tilt-up construction is a fast, efficient method for building durable concrete structures using large, pre-formed panels cast directly on-site. VMG NeXT brings precision engineering, expert coordination, and industry-leading safety practices to every tilt-up project across the Salt Lake City area. From warehouses to offices and educational facilities, our team delivers high-performance buildings with speed and accuracy, without sacrificing quality or design.',
    bullets: [
      'Cost-effective for large-scale, repeatable designs',
      'Strong, low-maintenance structures built to last',
      'Accelerated timelines with fewer delays',
    ],
    previewImage: 'https://vmgnext.com/wp-content/uploads/2025/10/TiltUpPreview.png',
    detailImage: 'https://vmgnext.com/wp-content/uploads/2025/07/tilt-up.png',
    visible: true,
    orderIndex: 1,
  },
  {
    id: 'srv-2',
    slug: 'slabs',
    title: 'Structural Concrete Slabs',
    shortDesc: 'Expertly poured concrete slabs with precision leveling, reinforced strength, and a flawless finish across Utah.',
    fullDesc:
      'Whether it is a foundation for a multi-story building or a smooth, level base for a high-traffic facility, slab work is the backbone of any structure we build in Utah. VMG NeXT delivers expertly poured concrete slabs with precision leveling, reinforced strength, and a flawless finish. From initial prep to final cure, our disciplined approach ensures your project starts with a solid foundation, literally and figuratively.',
    bullets: [
      'Durable, high-performance foundations that last',
      'Precision execution to support structural integrity',
      'Seamless integration into broader project timelines',
    ],
    previewImage: 'https://vmgnext.com/wp-content/uploads/2025/10/SlabsPreview2.png',
    detailImage: 'https://vmgnext.com/wp-content/uploads/2025/10/Slabs.png',
    visible: true,
    orderIndex: 2,
  },
  {
    id: 'srv-3',
    slug: 'cast-in-place',
    title: 'Cast-In-Place Concrete',
    shortDesc: 'Versatile structural concrete method offering unmatched strength and durability for complex geometries.',
    fullDesc:
      'Cast-in-place concrete is a versatile construction method that offers unmatched strength and durability for complex structures. VMG NeXT specializes in delivering seamless, high-quality cast-in-place solutions for complex projects in Salt Lake City and beyond, ensuring that every project meets the highest standards of safety, precision, and performance. From foundations to intricate architectural details, our expertise ensures lasting results.',
    bullets: [
      'Ideal for custom designs and unique geometries',
      'Superior load-bearing capacity and durability',
      'Precision-engineered for long-term performance',
    ],
    previewImage: 'https://vmgnext.com/wp-content/uploads/2025/10/CastInPlacePreview3.png',
    detailImage: 'https://vmgnext.com/wp-content/uploads/2025/10/CastInPlaceNew.png',
    visible: true,
    orderIndex: 3,
  },
  {
    id: 'srv-4',
    slug: 'educational-facilities',
    title: 'Educational Facilities',
    shortDesc: 'Thoughtful, detail-driven educational campus construction built for high daily use and long-term safety.',
    fullDesc:
      'Schools, colleges, and campuses need more than just buildings. They need spaces that foster growth, safety, and long-term sustainability. VMG NeXT brings a thoughtful, detail-driven approach to educational construction throughout Utah, working closely with stakeholders to deliver environments that serve students, staff, and the community. Whether it is new construction or complex renovations, we build learning spaces that stand the test of time.',
    bullets: [
      'Safe, functional spaces designed for high daily use',
      'Flexible designs that adapt to future needs',
      'Delivered with minimal disruption to learning environments',
    ],
    previewImage: 'https://vmgnext.com/wp-content/uploads/2025/06/educational-facilities-1.png',
    detailImage: 'https://vmgnext.com/wp-content/uploads/2025/06/Mask-group-2.png',
    visible: true,
    orderIndex: 4,
  },
  {
    id: 'srv-5',
    slug: 'commercial-construction',
    title: 'Commercial Construction',
    shortDesc: 'Large-scale commercial builds in Park City and Salt Lake City delivered on schedule and within budget.',
    fullDesc:
      'From sleek office buildings to large-scale retail centers, commercial construction demands speed, scalability, and attention to detail. VMG NeXT delivers all three, your trusted partner for commercial construction in Park City and Salt Lake City. We work collaboratively with owners, developers, and design teams to create commercial spaces that perform as well as they look, always staying on schedule and within budget.',
    bullets: [
      'Functional, future-ready spaces that elevate your brand',
      'Efficient builds that minimize downtime and delays',
      'Trusted processes for cost control and quality assurance',
    ],
    previewImage: 'https://vmgnext.com/wp-content/uploads/2025/07/commercial-121.png',
    detailImage: 'https://vmgnext.com/wp-content/uploads/2025/10/CommercialConstruction.png',
    visible: true,
    orderIndex: 5,
  },
  {
    id: 'srv-6',
    slug: 'water-treatment',
    title: 'Water Treatment Facilities',
    shortDesc: 'Specialized cast-in-place concrete infrastructure for highly regulated water treatment facilities in Utah.',
    fullDesc:
      'Building water treatment facilities demands precision, durability, and zero room for error. VMG NeXT specializes in cast-in-place concrete for complex water treatment facilities in Utah, where strength and stability are non-negotiable. Our team brings deep experience in managing these highly regulated environments, delivering infrastructure that supports entire communities and meets the strictest safety and environmental standards.',
    bullets: [
      'Engineered for long-term performance and resilience',
      'Ideal for complex geometries and demanding specs',
      'Delivered with full compliance and quality assurance',
    ],
    previewImage: 'https://vmgnext.com/wp-content/uploads/2026/03/water-treatment.png',
    detailImage: 'https://vmgnext.com/wp-content/uploads/2026/03/Water-treatment-1.png',
    visible: true,
    orderIndex: 6,
  },
  {
    id: 'srv-7',
    slug: 'high-end-homes',
    title: 'High-End Homes',
    shortDesc: 'Bespoke structural concrete and architectural craftsmanship for luxury residential estates in Park City.',
    fullDesc:
      'Crafting high-end homes requires more than construction know-how: it demands artistry, discretion, and a relentless focus on detail. VMG NeXT partners with homeowners, architects, and designers to bring bold residential visions to life with structural precision and premium craftsmanship. From complex concrete work to polished finishes, we deliver homes that are as enduring as they are extraordinary.',
    bullets: [
      'Bespoke construction tailored to your lifestyle and vision',
      'Premium execution with zero compromises on quality',
      'Seamless coordination with architects and design teams',
    ],
    previewImage: 'https://vmgnext.com/wp-content/uploads/2025/07/high-end-homes.png',
    detailImage: 'https://vmgnext.com/wp-content/uploads/2025/07/high-end-homes.png',
    visible: false,
    orderIndex: 7,
  },
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'prj-1',
    number: '01',
    name: 'TOW / PLOW MANILA',
    market: 'Warehouse',
    priceRange: '$30,000 – $50,000',
    gc: 'Stout Building Contractors',
    sqft: '1,322 SF',
    description: 'Footings, walls, concrete apron, concrete waterway, and bollards.',
    photos: [
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
    ],
    visible: true,
    orderIndex: 1,
  },
  {
    id: 'prj-2',
    number: '02',
    name: 'TOW / PLOW TABIONA',
    market: 'Warehouse',
    priceRange: '$133,000 – $155,000',
    gc: 'Stout Building Contractors',
    sqft: '4,538 SF',
    description:
      'Footings, walls, and slab for the building, including a propane pad, concrete waterway, concrete approach, and bollards.',
    photos: [
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo01.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo02-scaled.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo03-scaled.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo04-scaled.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo05-scaled.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo06-scaled.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo07-scaled.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo08.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo27-scaled.jpg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project2_photo30-scaled.jpg',
    ],
    visible: true,
    orderIndex: 2,
  },
  {
    id: 'prj-3',
    number: '03',
    name: 'PROMONTORY PLACE APARTMENTS',
    market: 'Multifamily Residential',
    priceRange: '$210,000 – $230,000',
    gc: 'Keir Construction',
    sqft: '17,596 SF',
    description: 'Pool deck, balconies, curb and gutter, and sidewalks.',
    photos: [
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo01.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo02.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo03.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo04.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo05.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo08-scaled.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo10-scaled.jpeg',
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo16-scaled.jpeg',
    ],
    visible: true,
    orderIndex: 3,
  },
  {
    id: 'prj-4',
    number: '04',
    name: 'K & B APARTMENTS',
    market: 'Multifamily Residential',
    priceRange: '$200,000 – $230,000',
    gc: 'Sean Campbell Construction',
    sqft: '33,887 SF',
    description:
      "Apartment building featuring 16' and 18' tall cast-in-place walls, a level 1 parking garage, and residential units above.",
    photos: [
      'https://vmgnext.com/wp-content/uploads/2025/10/CastInPlaceNew.png',
      'https://vmgnext.com/wp-content/uploads/2026/08/project3_photo01.jpeg',
    ],
    visible: true,
    orderIndex: 4,
  },
  {
    id: 'prj-5',
    number: '05',
    name: 'TIMPVIEW HIGH SCHOOL',
    market: 'Educational Facility',
    priceRange: '$5M – $5.5M',
    gc: 'Westland Construction',
    sqft: '277,000 SF',
    description:
      'Expansion of the school campus, including new classrooms and supporting educational facilities. VMG NeXT scope includes all foundations, foundation walls, and flatwork concrete as part of the overall high school renovation and building additions.',
    photos: [
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
    ],
    visible: true,
    orderIndex: 5,
  },
  {
    id: 'prj-6',
    number: '06',
    name: 'OGDEN 5 LIGHT BAY',
    market: 'Warehouse',
    priceRange: '$330,000 – $400,000',
    gc: 'Engage Contracting',
    sqft: '21,000 SF',
    description:
      'Construction of a 21,000 SF warehouse building. VMG NeXT scope includes all foundations, foundation walls, slabs, retaining walls, and flatwork concrete.',
    photos: [
      'https://vmgnext.com/wp-content/uploads/2025/07/tilt-up.png',
      'https://vmgnext.com/wp-content/uploads/2025/10/Slabs.png',
    ],
    visible: true,
    orderIndex: 6,
  },
  {
    id: 'prj-7',
    number: '07',
    name: 'CANYON CREEK FAIRFIELD INN & SUITES',
    market: 'Hospitality',
    priceRange: '$345,000 – $365,000',
    gc: 'R&O Construction',
    sqft: '18,670 SF',
    description: 'Footings, foundations, and 18,670 SF slab on grade.',
    photos: [
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
    visible: true,
    orderIndex: 7,
  },
  {
    id: 'prj-8',
    number: '08',
    name: 'THE GROVE BUILDINGS 1 & 2',
    market: 'Warehouse',
    priceRange: '$3.5M – $4M',
    gc: 'Westland Construction',
    sqft: '128,000 SF',
    description:
      'Two approximately 64,000 SF warehouse buildings utilizing tilt-up construction. VMG NeXT scope includes all foundations, foundation walls, slabs, tilt-up concrete, heavy paving, truck loading docks, and flatwork concrete.',
    photos: [
      'https://vmgnext.com/wp-content/uploads/2025/10/CommercialConstruction.png',
      'https://vmgnext.com/wp-content/uploads/2025/07/tilt-up.png',
    ],
    visible: true,
    orderIndex: 8,
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    slug: 'victor-galvan',
    name: 'Victor Galvan',
    role: 'CEO',
    department: 'Leadership',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/VictorGalvanPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/VictorFinal2.png',
    bioPara1:
      'Victor Galvan is the visionary behind VMG NeXT, leading the company with a bold commitment to innovation, integrity, and industry-defining excellence. As CEO, Victor sets the strategic direction, inspires a culture of leadership at every level, and drives the mission to deliver long-term value through disciplined execution and elevated craftsmanship.',
    bioPara2:
      "With a deep understanding of both the construction landscape and the human element behind every build, Victor has positioned VMG NeXT as more than a construction company—it's a platform for growth. His leadership bridges entrepreneurial energy with operational precision, helping the company scale while staying true to its core values.",
    visible: true,
    orderIndex: 1,
  },
  {
    id: 'tm-2',
    slug: 'yolanda-galvan',
    name: 'Yolanda Galvan',
    role: "Owner's Vision Support",
    department: 'Leadership',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/Yolanda-GalvanPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/YolandaFinal2.png',
    bioPara1:
      "Yolanda Galván is the Owner's Vision Support at VMG NeXT Construction, where she helps align the company's goals, vision, and team culture. Known for her discipline, organization, and leadership, Yolanda plays a key role in keeping the business focused on growth, excellence, and teamwork.",
    bioPara2:
      'She combines her entrepreneurial mindset with a passion for leadership and personal growth, helping the company move forward with purpose and structure across every division in Utah.',
    visible: true,
    orderIndex: 2,
  },
  {
    id: 'tm-3',
    slug: 'mayra-gonzalez',
    name: 'Mayra Gonzalez',
    role: 'Director of VMG NeXT Operations',
    department: 'Leadership',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/MayraPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/MayraFinal2.png',
    bioPara1:
      "Mayra Gonzalez is the backbone of VMG NeXT's internal excellence—leading with a rare blend of operational insight, regulatory expertise, and people-first leadership. As Director of People, Compliance, and Operations, she ensures that every part of our organization operates with integrity, efficiency, and alignment to our core values.",
    bioPara2:
      "Her ability to navigate the complex intersection of people and process is key to maintaining VMG NeXT's reputation for professionalism and discipline. Whether she is supporting team growth, refining operational standards, or ensuring regulatory alignment, Mayra plays a vital role in helping our company grow responsibly.",
    visible: true,
    orderIndex: 3,
  },
  {
    id: 'tm-4',
    slug: 'scott-longhurst',
    name: 'Scott Longhurst',
    role: 'Director of Operations',
    department: 'Operations & Restoration',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/ScottPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/Scot-Final2.png',
    bioPara1:
      'As Director of Operations at VMG NeXT, Scott Longhurst is the driving force behind our day-to-day execution and long-term operational strategy. With a sharp focus on efficiency, performance, and continuous improvement, Scott oversees all aspects of field operations—ensuring that every project moves forward with clarity, consistency, and exceptional quality.',
    bioPara2:
      'His deep understanding of construction workflows, resource management, and team coordination allows him to optimize processes across departments and job sites. Scott is known for his hands-on leadership style, clear communication, and commitment to delivering results without compromise.',
    visible: true,
    orderIndex: 4,
  },
  {
    id: 'tm-5',
    slug: 'abner-palacios',
    name: 'Abner Palacios',
    role: 'Director of Special Projects',
    department: 'Operations & Restoration',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/AbnerPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/AberFinal2.png',
    bioPara1:
      'Abner Palacios is the Director of Special Projects at VMG NeXT Construction, leading a division dedicated to providing concrete repair, restoration, and specialty services throughout Utah. Working with homeowners, homeowners associations, and property management companies, Abner oversees projects ranging from crack and spall repairs to foundation and wall restoration, concrete resurfacing, protective coatings, and epoxy flooring.',
    bioPara2:
      "At VMG NeXT, Abner plays a key role in strengthening client relationships, coordinating specialty projects, and delivering solutions that improve the safety, functionality, and longevity of concrete structures. His commitment to accountability, customer service, and disciplined execution reflects the company's standards of integrity, quality, and excellence.",
    visible: true,
    orderIndex: 5,
  },
  {
    id: 'tm-6',
    slug: 'archer-wagner',
    name: 'Archer Wagner',
    role: 'Director of Restoration Division',
    department: 'Operations & Restoration',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/ArcherPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/ArcherFINAL2.png',
    bioPara1:
      'Archer brings a strong combination of field experience and technical expertise to VMG NeXT Construction, specializing in concrete, asphalt, and site development projects. His background in both hands-on construction and detailed estimating allows him to bridge the gap between planning and execution—ensuring projects are built efficiently, safely, and within budget.',
    bioPara2:
      "He has managed complex multi-acre developments, residential and commercial builds, and large-scale infrastructure improvements. Archer's leadership emphasizes communication, accountability, and quality, setting a high standard for VMG NeXT's growing construction and restoration operations.",
    visible: true,
    orderIndex: 6,
  },
  {
    id: 'tm-7',
    slug: 'johana-gutierrez',
    name: 'Johana Gutiérrez',
    role: 'Executive Assistant',
    department: 'Leadership',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/11/JohanaPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/11/JohanaFinal2.png',
    bioPara1:
      'Johana Gutiérrez delivers executive-level administrative support to ensure smooth operations and effective coordination across teams. Through proactive management and strong attention to detail, Johana helps maintain structure and supports the daily functions of leadership and project teams.',
    bioPara2:
      'Her dedication to organization, efficiency, and excellence contributes directly to overall operational success and client satisfaction across VMG NeXT.',
    visible: true,
    orderIndex: 7,
  },
  {
    id: 'tm-8',
    slug: 'sophia-galvan',
    name: 'Sophia Galvan',
    role: 'Marketing Director',
    department: 'Marketing & Business Dev',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/SophiaPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/SophiaFinal2.png',
    bioPara1:
      "Sophia Galvan is the Marketing Director at VMG NeXT Construction, leading the company's marketing strategy, brand development, and digital presence with creativity, precision, and a results-driven approach. She oversees marketing initiatives, content strategy, social media, and brand communications.",
    bioPara2:
      "At VMG NeXT, Sophia plays a key role in shaping the company's brand identity, strengthening its market position, and developing strategies that connect its people, projects, and achievements with a broader audience across Utah.",
    visible: true,
    orderIndex: 8,
  },
  {
    id: 'tm-9',
    slug: 'rene-villanueva',
    name: 'Rene Villanueva',
    role: 'Lead Estimator',
    department: 'Estimating',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/LuisAlonsoPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/LuisAlonsoFinal2.png',
    bioPara1:
      'Rene Villanueva is the Lead Estimator at VMG NeXT Construction, overseeing estimating operations, developing competitive proposals, and building strong relationships with general contractors throughout Utah. With experience in construction operations, project management, and leadership, Rene brings a strategic approach to evaluating project scopes and coordinating bids.',
    bioPara2:
      "At VMG NeXT, Rene plays an important role in strengthening estimating processes, supporting business development, and building lasting client relationships. His commitment to clear communication, accuracy, and continuous improvement reflects the company's high standards of integrity, accountability, and excellence.",
    visible: true,
    orderIndex: 9,
  },
  {
    id: 'tm-10',
    slug: 'eduardo-galvan',
    name: 'Eduardo Galvan',
    role: 'Assistant Project Manager',
    department: 'Operations & Restoration',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/AllanPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/AllanFinal.png',
    bioPara1:
      'Eduardo Galvan is an Assistant Project Manager at VMG NeXT Construction, supporting project planning, coordination, and execution. His responsibilities include reviewing drawings and specifications, coordinating concrete submittals, verifying mix designs, and resolving project questions before work begins.',
    bioPara2:
      "At VMG NeXT, Eduardo works closely with project managers and field crews to strengthen communication, maintain efficiency, and support quality throughout every phase of construction. His hands-on approach, attention to detail, and commitment to continuous improvement reflect the company's high standards of accountability, teamwork, and excellence.",
    visible: true,
    orderIndex: 10,
  },
  {
    id: 'tm-11',
    slug: 'lisamara-garcia',
    name: 'Lisamara Garcia',
    role: 'Estimator',
    department: 'Estimating',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/LisamaraqGarciaPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/LisamaraFinal2.png',
    bioPara1:
      "Lisamara Garcia supports the foundation of every successful project at VMG NeXT through her expertise in estimating and preconstruction planning. With a sharp analytical mindset and a strong grasp of cost structures, Lisamara works alongside the lead estimator and project teams to ensure our proposals are thorough, competitive, and aligned with each client's vision and budget.",
    bioPara2:
      "Her ability to balance precision with speed makes her an invaluable part of our estimating department, especially in fast-paced environments where accuracy is non-negotiable. Lisamara's work plays a key role in setting the stage for projects that are financially sound and built for success.",
    visible: true,
    orderIndex: 11,
  },
  {
    id: 'tm-12',
    slug: 'luis-alonso',
    name: 'Luis Alonso',
    role: 'Estimator',
    department: 'Estimating',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/LuisAlonsoPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/LuisAlonsoFinal2.png',
    bioPara1:
      'Luis Alonso brings a detail-driven approach to every estimate, helping VMG NeXT build with confidence from the ground up. As part of our estimating team, Luis is responsible for analyzing plans, performing quantity takeoffs, and preparing accurate cost projections that align with both project goals and client expectations.',
    bioPara2:
      'Working closely with project managers, architects, and subcontractors, Luis helps create bids that are competitive, transparent, and grounded in real-world data.',
    visible: true,
    orderIndex: 12,
  },
  {
    id: 'tm-13',
    slug: 'erick-patoni-morato',
    name: 'Erick Patoni-Morato',
    role: 'Safety & Quality Coordinator',
    department: 'Operations & Restoration',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/ErickPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/ErickFinal.png',
    bioPara1:
      "Erick Patoni-Morato plays a key role in supporting VMG NeXT's commitment to safety, quality, and operational excellence. As the Safety & Quality Coordinator, he works closely with field teams and leadership to maintain high safety standards, uphold quality expectations, and promote accountability across every project.",
    bioPara2:
      'Passionate about continuous improvement, Erick is dedicated to protecting people, strengthening processes, and ensuring quality remains a priority from start to finish.',
    visible: true,
    orderIndex: 13,
  },
  {
    id: 'tm-14',
    slug: 'nahomy-sinclair',
    name: 'Nahomy Sinclair',
    role: 'Concrete Estimator',
    department: 'Estimating',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/NahomyPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/NahomyFinal.png',
    bioPara1:
      "Nahomy brings a unique architectural background to VMG NeXT's estimating team, combining design knowledge with a strong focus on preconstruction and cost analysis. As a Concrete Estimator, she works closely with the estimating team to develop accurate proposals that support successful project planning and execution.",
    bioPara2:
      'Committed to organization, teamwork, and continuous learning, Nahomy collaborates with colleagues to solve challenges and find practical solutions that keep projects moving forward.',
    visible: true,
    orderIndex: 14,
  },
  {
    id: 'tm-15',
    slug: 'allan-saenz',
    name: 'Allan Saenz',
    role: 'Concrete Estimator',
    department: 'Estimating',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/AllanPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/AllanFinal.png',
    bioPara1:
      "Allan brings a strong civil engineering background to VMG NeXT's estimating team, specializing in the preconstruction and estimating of commercial, industrial, and infrastructure concrete projects. As a Concrete Estimator, he analyzes drawings and specifications, develops accurate quantity takeoffs, and prepares competitive proposals.",
    bioPara2:
      'Committed to excellence, Allan is always looking for opportunities to optimize costs, identify value, and contribute to successful project outcomes across Utah.',
    visible: true,
    orderIndex: 15,
  },
  {
    id: 'tm-16',
    slug: 'alexander',
    name: 'Alexander',
    role: 'Marketing Coordinator',
    department: 'Marketing & Business Dev',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/AlexanderPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/AlexanderFinal.png',
    bioPara1:
      'Alexander serves as Marketing Coordinator at VMG NeXT Construction, executing digital campaigns, job-site media production, and visual storytelling that showcase the scale and precision of our structural concrete projects across Utah.',
    bioPara2:
      'Working alongside the marketing and business development leadership, Alexander helps amplify VMG NeXT across social channels and industry platforms.',
    visible: true,
    orderIndex: 16,
  },
  {
    id: 'tm-17',
    slug: 'scarlet',
    name: 'Scarlet Watson',
    role: 'Business Development Coordinator',
    department: 'Marketing & Business Dev',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/ScarletPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/ScarletFinal.png',
    bioPara1:
      "Scarlet Watson is the Business Development Coordinator at VMG NeXT Construction, where she builds and strengthens relationships with general contractors while expanding the company's presence throughout the construction industry.",
    bioPara2:
      'As one of the primary faces of VMG NeXT, Scarlet represents the company through client visits, networking events, Lunch & Learn presentations, and ongoing communication that fosters trust and lasting partnerships.',
    visible: true,
    orderIndex: 17,
  },
  {
    id: 'tm-18',
    slug: 'darwing-grijalba',
    name: 'Darwing Grijalba',
    role: 'Collection Specialist',
    department: 'Operations & Restoration',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/DarwingPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2026/07/Darwing-Final.png',
    bioPara1:
      'Darwing Grijalba serves as Collection Specialist at VMG NeXT Construction, overseeing accounts receivable, billing reconciliation, and financial coordination with general contractors and commercial partners.',
    bioPara2:
      'His disciplined follow-through and transparent communication ensure healthy project cash flow and streamlined administrative execution across all active builds.',
    visible: true,
    orderIndex: 18,
  },
  // Hidden / Archived members preserved in database (toggleable in 1 click from /admin!)
  {
    id: 'tm-19',
    slug: 'savannah',
    name: 'Savannah',
    role: 'Chief Growth Officer',
    department: 'Leadership',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/11/SavannahPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/11/SavannahPreviewFinal.png',
    bioPara1: 'Archived team profile preserved in CMS database.',
    bioPara2: 'Can be restored or hidden with one click from the VMG NeXT Admin Panel.',
    visible: false,
    orderIndex: 19,
    note: 'Hidden per client request (preserved in CMS without deleting data)',
  },
  {
    id: 'tm-20',
    slug: 'zachariah-maynard',
    name: 'Zachariah Maynard',
    role: 'Landscape Architect',
    department: 'Operations & Restoration',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/11/ZacariahPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/11/ZacariahPreviewFinal.png',
    bioPara1: 'Archived team profile preserved in CMS database.',
    bioPara2: 'Can be restored or hidden with one click from the VMG NeXT Admin Panel.',
    visible: false,
    orderIndex: 20,
    note: 'Hidden per client request (preserved in CMS without deleting data)',
  },
  {
    id: 'tm-21',
    slug: 'levi-palacios',
    name: 'Levi Palacios',
    role: 'Field Specialist',
    department: 'Operations & Restoration',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2026/03/LeviPreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2026/03/LeviPreviewFinal.png',
    bioPara1: 'Archived team profile preserved in CMS database.',
    bioPara2: 'Can be restored or hidden with one click from the VMG NeXT Admin Panel.',
    visible: false,
    orderIndex: 21,
    note: 'Hidden per client request (preserved in CMS without deleting data)',
  },
  {
    id: 'tm-22',
    slug: 'valerie-diaz',
    name: 'Valerie Diaz',
    role: 'Marketing Director (Former)',
    department: 'Marketing & Business Dev',
    cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/11/ValeriePreviewFinal.png',
    detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/11/ValeriePreviewFinal.png',
    bioPara1: 'Temporarily hidden per VMG NeXT request.',
    bioPara2: 'Preserved in CMS database for instant restoration if needed.',
    visible: false,
    orderIndex: 22,
    note: 'Hidden temporarily per VMG NeXT request',
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-380',
    slug: 'beyond-the-blueprint-the-art-and-science-of-structural-concrete',
    title: 'Beyond the Blueprint: The Art and Science of Structural Concrete',
    excerpt:
      'In modern construction, steel frames and glass facades often get the spotlight. But the true strength and longevity of any building lie in its foundation—its structural concrete.',
    category: 'Structural Concrete',
    publishedAt: '2025-12-03',
    readTime: '5 min read',
    author: 'Victor Galvan · VMG NeXT Engineering',
    coverImage: 'https://vmgnext.com/wp-content/uploads/2025/12/20220813_104243-scaled.jpg',
    seoKeywords: ['Structural Concrete Utah', 'Cast-in-Place Salt Lake City', 'Commercial Foundations'],
    orderIndex: 1,
    contentHtml: `
      <p>In modern construction, steel frames and glass facades often get the spotlight. But the true strength and longevity of any building lie in its foundation—its <strong>structural concrete</strong>. This is where the art of craftsmanship meets the science of engineering, and where excellence is non-negotiable.</p>
      <h2>Why Structural Concrete Defines Project Longevity in Utah</h2>
      <p>Across <strong>Salt Lake City</strong>, <strong>Park City</strong>, and the Wasatch Front, commercial structures face extreme freeze-thaw cycles, seismic design requirements, and heavy industrial loads. At VMG NeXT, our structural concrete engineering goes far beyond pouring mix into forms:</p>
      <ul>
        <li><strong>Precision Mix Verification:</strong> Balancing water-cement ratios, air entrainment, and admixtures tailored for Utah elevations and temperature swings.</li>
        <li><strong>Reinforced Load Path Integrity:</strong> Exacting rebar placement, post-tensioning coordination, and anchor bolt tolerances verified before every pour.</li>
        <li><strong>Laser-Screed Flatness & Curing Discipline:</strong> Achieving high FF/FL floor flatness numbers critical for modern high-bay distribution warehouses.</li>
      </ul>
      <blockquote>"A commercial building is only as reliable as the slab and foundation walls beneath it. When we pour, we build for decades of performance." — Victor Galvan, CEO</blockquote>
      <h3>Partnering with Utah General Contractors</h3>
      <p>From 277,000 SF educational campus expansions like Timpview High School to heavy industrial tilt-up warehouses, VMG NeXT brings disciplined preconstruction estimating and field execution that keeps general contractors ahead of schedule.</p>
    `,
  },
  {
    id: 'blog-378',
    slug: '5-essential-qualities-of-a-top-commercial-construction-partner-in-utah',
    title: '5 Essential Qualities of a Top Commercial Construction Partner in Utah',
    excerpt:
      'Choosing a partner for your next commercial construction project in Utah is one of the most critical business decisions you will make. The right contractor protects your investment and turns vision into reality.',
    category: 'Commercial Construction',
    publishedAt: '2025-12-03',
    readTime: '6 min read',
    author: 'Scott Longhurst · Director of Operations',
    coverImage: 'https://vmgnext.com/wp-content/uploads/2025/12/7379D6ED-B5CD-4077-90D6-67A9AD6A0AEB.jpeg',
    seoKeywords: ['Commercial Construction Partner Utah', 'General Contractors Salt Lake City', 'Concrete Subcontractor'],
    orderIndex: 2,
    contentHtml: `
      <p>Choosing a partner for your next <strong>commercial construction project in Utah</strong> is one of the most critical business decisions you will make. The right contractor does more than just build; they become an extension of your team, protecting your investment and turning your vision into a reality.</p>
      <h2>What Separates a Good Contractor from a Great Partner?</h2>
      <ul>
        <li><strong>1. Transparent Preconstruction & Accurate Takeoffs:</strong> Eliminate change-order surprises with data-backed quantity takeoffs and value engineering from day one.</li>
        <li><strong>2. Proven Safety & Quality Control Systems:</strong> Dedicated safety & quality coordinators on-site ensuring OSHA compliance and zero-defect turnovers.</li>
        <li><strong>3. Mastery of Tilt-Up and Cast-In-Place Concrete:</strong> Self-performing complex structural scopes accelerates critical-path schedules.</li>
        <li><strong>4. Proactive Field Communication:</strong> Real-time coordination with general contractors, structural engineers, and inspectors.</li>
        <li><strong>5. A Culture of Ownership & Accountability:</strong> Every crew member treats the project schedule and budget like their own.</li>
      </ul>
      <blockquote>"We do what we say we will. Discipline and transparency drive every milestone we deliver across Utah."</blockquote>
    `,
  },
  {
    id: 'blog-376',
    slug: 'why-tilt-up-construction-is-the-future-for-utahs-commercial-buildings',
    title: "Why Tilt-Up Construction is the Future for Utah's Commercial Buildings",
    excerpt:
      "In Utah's fast-growing commercial landscape, speed, efficiency, and durability are no longer optional—they are essential. Discover why tilt-up concrete is reshaping warehouses, offices, and large-scale facilities.",
    category: 'Tilt-Up Concrete',
    publishedAt: '2025-12-03',
    readTime: '5 min read',
    author: 'Rene Villanueva · Lead Estimator',
    coverImage: 'https://vmgnext.com/wp-content/uploads/2025/12/IMG-20250504-WA0033.jpg',
    seoKeywords: ['Tilt-Up Construction Utah', 'Commercial Warehouses Salt Lake City', 'Concrete Panels'],
    orderIndex: 3,
    contentHtml: `
      <p>In Utah's fast-growing commercial landscape, speed, efficiency, and durability are no longer optional—they are essential. For developers and general contractors looking to build smarter, one method stands out for its unmatched advantages: <strong>tilt-up concrete construction</strong>.</p>
      <h2>Key Advantages of Tilt-Up for Industrial & Commercial Developments</h2>
      <p>From 128,000 SF distribution centers like <em>The Grove Buildings 1 & 2</em> to modern flex-office spaces, casting wall panels directly on the building slab delivers measurable ROI:</p>
      <ul>
        <li><strong>Speed to Market:</strong> Casting panels horizontally on-site eliminates steel fabrication lead times and shaves weeks off enclosure schedules.</li>
        <li><strong>Superior Thermal & Structural Performance:</strong> Massive concrete panels offer high thermal mass, fire resistance, and long-term structural resilience.</li>
        <li><strong>Lower Lifecycle Maintenance:</strong> Durable exterior envelopes withstand Utah weather with minimal upkeep over 50+ years.</li>
      </ul>
      <blockquote>"Tilt-up construction combines structural muscle with schedule velocity—giving Utah developers a decisive competitive edge."</blockquote>
    `,
  },
];

export const INITIAL_JOBS: JobPosition[] = [
  {
    id: 'job-1',
    title: 'Project Manager — Commercial Construction',
    type: 'Full Time',
    location: 'Salt Lake City, UT',
    department: 'Construction Management',
    description:
      'Lead commercial construction projects from planning through completion across Utah. Experience with tilt-up, foundations, or structural concrete preferred.',
    salaryRange: 'Competitive Base + Performance Bonus + 401(k) Match',
    visible: true,
    datePosted: '2026-11-22',
  },
  {
    id: 'job-2',
    title: 'Senior Estimator — Concrete & Commercial',
    type: 'Full Time',
    location: 'Salt Lake City, UT',
    department: 'Estimating',
    description:
      'Prepare accurate bid estimates, digital quantity takeoffs, and subcontractor coordination for commercial concrete and tilt-up projects across Utah.',
    salaryRange: 'Competitive Base + Incentives + Full Benefits',
    visible: true,
    datePosted: '2026-11-22',
  },
  {
    id: 'job-3',
    title: 'Concrete Superintendent — Field Operations',
    type: 'Full Time',
    location: 'Utah — Multiple Job Sites',
    department: 'Field Operations',
    description:
      'Oversee daily field operations on commercial concrete job sites. Expertise in tilt-up, slabs on grade, and cast-in-place methods required.',
    salaryRange: 'Top Industry Package + Truck Allowance + Benefits',
    visible: true,
    datePosted: '2026-11-22',
  },
];

export const INITIAL_RESTORATION: RestorationItem[] = [
  { id: 'r-1', category: 'wall-repairs', label: 'Structural Foundation Wall Repairs', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto1.png' },
  { id: 'r-2', category: 'wall-repairs', label: 'Structural Foundation Wall Repairs', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto2.png' },
  { id: 'r-3', category: 'wall-repairs', label: 'Structural Foundation Wall Repairs', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto3.png' },
  { id: 'r-4', category: 'wall-repairs', label: 'Structural Foundation Wall Repairs', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto4.png' },
  { id: 'r-5', category: 'wall-repairs', label: 'Structural Foundation Wall Repairs', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto5.png' },
  { id: 'r-6', category: 'wall-repairs', label: 'Structural Foundation Wall Repairs', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto6.png' },
  { id: 'r-7', category: 'concrete-pourbacks', label: 'Concrete Pourbacks', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto7.png' },
  { id: 'r-8', category: 'concrete-pourbacks', label: 'Concrete Pourbacks', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto8.png' },
  { id: 'r-9', category: 'concrete-pourbacks', label: 'Concrete Pourbacks', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto9.png' },
  { id: 'r-10', category: 'concrete-pourbacks', label: 'Concrete Pourbacks', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto10.png' },
  { id: 'r-11', category: 'concrete-pourbacks', label: 'Concrete Pourbacks', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto11.png' },
  { id: 'r-12', category: 'concrete-pourbacks', label: 'Concrete Pourbacks', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto12.png' },
  { id: 'r-13', category: 'concrete-pourbacks', label: 'Concrete Pourbacks', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto13.png' },
  { id: 'r-14', category: 'door-stoops', label: 'Concrete Additions', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto14.png' },
  { id: 'r-15', category: 'door-stoops', label: 'Concrete Additions', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto15.png' },
  { id: 'r-16', category: 'door-stoops', label: 'Concrete Additions', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto16.png' },
  { id: 'r-17', category: 'wood-decks', label: 'Wood Decks Restoration', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto17.png' },
  { id: 'r-18', category: 'wood-decks', label: 'Wood Decks Restoration', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto18.png' },
  { id: 'r-19', category: 'wood-decks', label: 'Wood Decks Restoration', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto19.png' },
  { id: 'r-20', category: 'wood-decks', label: 'Wood Decks Restoration', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto20.png' },
  { id: 'r-21', category: 'wood-decks', label: 'Wood Decks Restoration', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto21.png' },
  { id: 'r-22', category: 'wood-decks', label: 'Wood Decks Restoration', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto22.png' },
  { id: 'r-23', category: 'wood-decks', label: 'Wood Decks Restoration', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto23.png' },
  { id: 'r-24', category: 'wood-decks', label: 'Wood Decks Restoration', img: 'https://vmgnext.com/wp-content/uploads/2026/02/resto24.png' },
];

export const INITIAL_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Tom Widener',
    role: 'Vice-President, Wharton-Smith, Inc',
    quote:
      'Victor consistently demonstrates an exceptional level of focus and dedication when it comes to serving his clients. You can always count on him to follow through and deliver quality work, no matter the challenge.',
    avatar: 'https://vmgnext.com/wp-content/uploads/2025/06/Tom-Widener_Nov-2019_2O7B6302_sq-1-1.png',
  },
  {
    id: 't-2',
    name: 'Brandon M Dawson',
    role: 'Chairman & CEO, Cardone Ventures',
    quote:
      'Victor is a remarkable person! Trustworthy, dependable, dedicated and honest. I have immense respect for him as both a business leader and a human!',
    avatar: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-3-1.png',
  },
  {
    id: 't-3',
    name: 'Bora Erbilen',
    role: 'President, BBM Structural',
    quote:
      'I recommend Victor and all of his business ventures to clients because you will get quality work at a fair price, and our communities will be a better place for all the people Victor will get involved in these business teaming opportunities.',
    avatar: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-4.png',
  },
  {
    id: 't-4',
    name: 'Randy Barnhill',
    role: 'Regional Director of Field Operations, Core',
    quote:
      'The Core Florida Team has had many projects with the VMG team over the years with great success, mainly to the leadership of Victor Galvan that built his businesses from the ground up with integrity and a drive to deliver with a high level of professionalism and quality.',
    avatar: 'https://vmgnext.com/wp-content/uploads/2025/07/Screenshot-2025-05-05-at-15.18.13-1.png',
  },
  {
    id: 't-5',
    name: 'Luis F. Bedoya',
    role: 'Principal, BBM Structural',
    quote:
      'I highly recommend Victor as a person and as an industry partner. Victor is the most trustworthy person that I know. You always know that he will keep his word and that he and his team will do whatever it takes to get the job done and done right.',
    avatar: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-4-1.png',
  },
  {
    id: 't-6',
    name: 'Sean Meder',
    role: 'Senior Vice-President, Bank OZK',
    quote:
      'I would like to take a moment to recognize the pleasure of having collaborated with Victor Galvan over the past 5+ years. We have worked on multiple companies projects and partnerships with a great deal of success.',
    avatar: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-4-2.png',
  },
  {
    id: 't-7',
    name: 'James R.',
    role: 'Project Manager',
    quote:
      'Working with VMG NeXT was a game changer. Their team treated our project like it was their own—from planning to execution. They delivered ahead of schedule without cutting corners, and the communication was flawless throughout.',
    avatar: 'https://vmgnext.com/wp-content/uploads/2025/06/Avatar-4-3.png',
  },
  {
    id: 't-8',
    name: 'Laura M.',
    role: 'Director of Facilities',
    quote:
      'We chose VMG NeXT for their reputation in tilt-up and commercial builds, and they exceeded every expectation. Their attention to detail, drive for quality, and ability to solve problems before they became delays made a lasting impression.',
    avatar: 'https://vmgnext.com/wp-content/uploads/2025/07/Avatar-4.png',
  },
];

export const INITIAL_LEADS: EstimateLead[] = [
  {
    id: 'lead-101',
    createdAt: '2026-11-20 09:42',
    fullName: 'Marcus Vance',
    company: 'Wasatch Industrial Developers',
    email: 'mvance@wasatchind.com',
    phone: '(801) 555-0194',
    serviceType: 'Tilt-Up Construction',
    estimatedSqft: '85,000 SF',
    budgetRange: '$1.8M – $2.4M',
    projectLocation: 'Salt Lake City, UT',
    timeline: 'Q1 2027 Mobilization',
    message: 'Requesting concrete scope estimate for two tilt-up distribution bays including dock aprons and 7" slab on grade.',
    apiSynced: true,
    apiKeyPrefix: 'ocv1_bBAB9M...',
    status: 'In Estimating',
  },
  {
    id: 'lead-102',
    createdAt: '2026-11-21 14:15',
    fullName: 'Elena Rostova',
    company: 'Summit Alpine Hospitality',
    email: 'erostova@summitalpine.com',
    phone: '(435) 555-0148',
    serviceType: 'Cast-In-Place Concrete',
    estimatedSqft: '42,000 SF',
    budgetRange: '$650,000 – $850,000',
    projectLocation: 'Park City, UT',
    timeline: 'Spring 2027',
    message: 'Foundation walls, podium slab, and heated concrete apron for boutique hotel expansion.',
    apiSynced: true,
    apiKeyPrefix: 'ocv1_bBAB9M...',
    status: 'New',
  },
];
