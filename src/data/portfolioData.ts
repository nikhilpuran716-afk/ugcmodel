/**
 * CENTRALIZED STUDIO & PORTFOLIO CONFIGURATION
 * --------------------------------------------
 * Edit brand details, social links, sample UGC ad projects, and section copy here.
 * Place your actual 9:16 MP4 video files inside `/public/videos/` to replace placeholders automatically.
 */

export interface StoryboardScene {
  timeRange: string;
  label: string;
  visualDirection: string;
  scriptLine: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  productReference: string;
  creativeConcept: string;
  format: string;
  description: string;
  specLabel: 'Concept Ad' | 'Spec Ad';
  videoSrc: string;
  posterSrc: string;
  aspectRatio: '9:16';
  durationLabel: string;
  accentColor: string;
  storyboardScenes: StoryboardScene[];
}

export interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

export const BRAND_CONFIG = {
  studioName: 'Faceless UGC Studio',
  owner: 'Nikhil Anand',
  professionalTitle: 'UGC Ad Creator & AI Creative Specialist',
  location: 'Delhi, India',
  email: 'nikhilpuran716@gmail.com',
  emailSubject: 'UGC Ad Project Inquiry',
  instagramUrl: 'https://www.instagram.com/_its_.nikhil_.btw/',
  instagramHandle: '@_its_.nikhil_.btw',
  primaryCta: "Let's Work Together",
  secondaryCta: 'Watch My Work',
} as const;

export function getMailtoHref(customSubject?: string): string {
  const subject = encodeURIComponent(customSubject || BRAND_CONFIG.emailSubject);
  return `mailto:${BRAND_CONFIG.email}?subject=${subject}`;
}

/**
 * Normalizes paths starting with `/public/` so Vite serves them cleanly from `/`
 * while allowing paths in this file to be written as `/public/videos/...` or `/videos/...`.
 */
export function resolveMediaSrc(rawPath: string): string {
  if (!rawPath) return '';
  if (rawPath.startsWith('/public/')) {
    return rawPath.replace(/^\/public\//, '/');
  }
  return rawPath;
}

export const HERO_CONTENT = {
  headline: 'UGC Ads That Make Products Impossible to Ignore.',
  supportingCopy:
    'I create scroll-stopping UGC-style video ads, AI influencer creatives, and product-focused storytelling for brands that want fresh ways to showcase their products.',
  primaryButton: 'Watch My Work',
  secondaryButton: "Let's Work Together",
  featuredVideoSrc: '/public/videos/skincare-ad.mp4',
  featuredPosterSrc: '/posters/skincare-ad.svg',
  featuredLabel: 'Spec Ad · 9:16 Vertical Preview',
};

export const PORTFOLIO_SECTION = {
  heading: "A Few Things I've Been Creating.",
  supportingCopy:
    'Explore sample UGC-style ads, AI influencer concepts, product demonstrations, and creative experiments across different product categories.',
  disclaimer:
    'Sample creative directions and spec concepts produced independently to demonstrate format, pacing, and visual storytelling.',
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'skincare-ugc-ad',
    title: 'Skincare UGC Ad',
    category: 'Beauty & Skincare',
    productReference: 'Minimalist Vitamin C 10% Face Serum',
    creativeConcept: 'A relatable skincare routine and product introduction',
    format: 'Creator-style testimonial and product demo',
    description:
      'A relatable skincare routine and product introduction featuring Minimalist Vitamin C 10% Face Serum in a creator-style testimonial and product demo.',
    specLabel: 'Spec Ad',
    videoSrc: '/public/videos/skincare-ad.mp4',
    posterSrc: '/posters/skincare-ad.svg',
    aspectRatio: '9:16',
    durationLabel: '0:18',
    accentColor: '#C88D48',
    storyboardScenes: [
      {
        timeRange: '00:00 – 00:04',
        label: '01 · Visual Hook',
        visualDirection: 'Morning sunlight across bathroom vanity; close-up dropper dispensing golden serum.',
        scriptLine: '"If your morning skincare routine still feels complicated, start with one bottle that actually delivers."',
      },
      {
        timeRange: '00:04 – 00:12',
        label: '02 · Texture & Demo',
        visualDirection: 'Macro texture shot showing lightweight absorption and clean ingredient breakdown on bottle label.',
        scriptLine: '"Minimalist Vitamin C 10% absorbs in seconds without stickiness—just clean, everyday radiance."',
      },
      {
        timeRange: '00:12 – 00:18',
        label: '03 · Product Hero Close',
        visualDirection: 'Bottle resting on travertine counter with natural dewy skin reflection and clear product framing.',
        scriptLine: '"Simple formula, visible glow. Make it the centerpiece of your daily routine."',
      },
    ],
  },
  {
    id: 'perfume-ugc-ad',
    title: 'Perfume UGC Ad',
    category: 'Fragrance',
    productReference: 'CHANEL COCO MADEMOISELLE Eau de Parfum Intense',
    creativeConcept: 'A fragrance-focused product presentation',
    format: 'Lifestyle creator ad and product close-up',
    description:
      'A fragrance-focused product presentation highlighting CHANEL COCO MADEMOISELLE Eau de Parfum Intense through a lifestyle creator ad and product close-up.',
    specLabel: 'Concept Ad',
    videoSrc: '/public/videos/perfume-ad.mp4',
    posterSrc: '/posters/perfume-ad.svg',
    aspectRatio: '9:16',
    durationLabel: '0:15',
    accentColor: '#B37A3E',
    storyboardScenes: [
      {
        timeRange: '00:00 – 00:04',
        label: '01 · Sensory Hook',
        visualDirection: 'Golden hour shadows slicing across faceted glass flacon; slow camera push-in.',
        scriptLine: '"Some fragrances don\'t just finish an outfit—they set the entire mood of the room."',
      },
      {
        timeRange: '00:04 – 00:10',
        label: '02 · Mist & Notes',
        visualDirection: 'Backlit atomizer spray catching warm sunlight; editorial close-up of amber bottle geometry.',
        scriptLine: '"Warm amber, deep patchouli, and crisp citrus that lingers from evening into night."',
      },
      {
        timeRange: '00:10 – 00:15',
        label: '03 · Signature Finish',
        visualDirection: 'Creator hand placing the bottle onto limestone pedestal with crisp label focus.',
        scriptLine: '"Unmistakable presence in a single spray."',
      },
    ],
  },
  {
    id: 'whey-protein-ugc-ad',
    title: 'Whey Protein UGC Ad',
    category: 'Fitness & Supplements',
    productReference: 'Optimum Nutrition Gold Standard 100% Whey, Double Rich Chocolate',
    creativeConcept: 'Fitness creator product introduction and demonstration',
    format: 'Fitness lifestyle UGC ad',
    description:
      'A fitness creator product introduction and demonstration for Optimum Nutrition Gold Standard 100% Whey, Double Rich Chocolate in a native fitness lifestyle UGC format.',
    specLabel: 'Concept Ad',
    videoSrc: '/public/videos/whey-protein-ad.mp4',
    posterSrc: '/posters/whey-protein-ad.svg',
    aspectRatio: '9:16',
    durationLabel: '0:20',
    accentColor: '#A52332',
    storyboardScenes: [
      {
        timeRange: '00:00 – 00:05',
        label: '01 · Post-Workout Hook',
        visualDirection: 'Dynamic scoop lift from matte black tub; cocoa powder dust catching directional studio light.',
        scriptLine: '"Post-workout recovery shouldn\'t taste like chalk or leave clumps at the bottom of your shaker."',
      },
      {
        timeRange: '00:05 – 00:14',
        label: '02 · Mixability & Macros',
        visualDirection: 'Pouring water into shaker, 3-second shake test, smooth Double Rich Chocolate pour.',
        scriptLine: '"24 grams of whey protein, 5.5 grams of BCAAs, and effortless mixability every single session."',
      },
      {
        timeRange: '00:14 – 00:20',
        label: '03 · Daily Ritual Callout',
        visualDirection: 'Tub and shaker framed together on stone counter with crisp label typography.',
        scriptLine: '"Fuel the work you put in—Gold Standard 100% Whey."',
      },
    ],
  },
  {
    id: 'fashion-ugc-ad',
    title: 'Fashion UGC Ad',
    category: 'Fashion & Lifestyle',
    productReference: 'Velmora red midi dress',
    creativeConcept: "A casual outfit reveal showing the dress's silhouette, color, and movement",
    format: 'Fashion try-on and creator-style video',
    description:
      "A casual outfit reveal showing the Velmora red midi dress's silhouette, color, and movement in a fashion try-on and creator-style video.",
    specLabel: 'Spec Ad',
    videoSrc: '/public/videos/fashion-ad.mp4',
    posterSrc: '/posters/fashion-ad.svg',
    aspectRatio: '9:16',
    durationLabel: '0:16',
    accentColor: '#A52332',
    storyboardScenes: [
      {
        timeRange: '00:00 – 00:04',
        label: '01 · Color & Drape Hook',
        visualDirection: 'Close-up of deep crimson fabric catching natural window light before stepping back into full frame.',
        scriptLine: '"When a dress moves like this in natural light, you don\'t need to over-style it."',
      },
      {
        timeRange: '00:04 – 00:11',
        label: '02 · Silhouette & Movement',
        visualDirection: 'Full-length 9:16 turn showcasing waist tailoring, midi hemline flow, and breathable drape.',
        scriptLine: '"The Velmora red midi dress balances structured tailoring at the waist with effortless movement."',
      },
      {
        timeRange: '00:11 – 00:16',
        label: '03 · Styling Reveal',
        visualDirection: 'Final editorial pose in sunlit plaster studio highlighting rich crimson hue.',
        scriptLine: '"From daytime errands to evening dinner—one piece that carries the whole look."',
      },
    ],
  },
];

export const SERVICES_SECTION = {
  heading: 'What I Create for Brands.',
  supportingCopy:
    'From the first hook to the final edit, I help turn products into engaging short-form ad concepts.',
  closingLine: "Have a product in mind? Let's create something for it.",
  ctaButton: 'Discuss Your Project',
  items: [
    {
      number: '01',
      title: 'UGC-Style Video Ads',
      description:
        'Short-form product advertisements created around relatable situations, conversational scripts, and native social-video aesthetics.',
    },
    {
      number: '02',
      title: 'AI Influencer Ad Creatives',
      description:
        'Realistic virtual creator visuals and AI-assisted video concepts tailored to a product and campaign brief.',
    },
    {
      number: '03',
      title: 'Product Demonstration Ads',
      description:
        'Product showcases, feature demonstrations, packaging close-ups, unboxing concepts, and everyday-use scenarios.',
    },
    {
      number: '04',
      title: 'Ad Concepts & Storyboards',
      description:
        'Creative hooks, scripts, shot lists, storyboards, and AI-video production prompts.',
    },
  ] satisfies ServiceItem[],
};

export const ABOUT_SECTION = {
  heading: 'Creative Ideas. Product-Focused Storytelling.',
  paragraphs: [
    "I'm Nikhil, the creator behind Faceless UGC Studio. I create UGC-style advertising concepts that combine relatable storytelling, product-focused visuals, and AI-assisted creative production.",
    'My goal is to help brands explore fresh creative angles through videos that feel natural to social platforms while keeping the product and its message at the center.',
  ],
  portraitSrc: '/posters/creator-portrait.svg',
  portraitAlt: 'Faceless UGC Studio creative workspace and 9:16 storyboard frame illustration',
};

export const CONTACT_SECTION = {
  heading: "Let's Create Your Next Ad.",
  supportingCopy:
    "Have a product you'd like to showcase? Tell me about your brand and the kind of creative you need.",
};

export const FOOTER_CONTENT = {
  tagline: 'UGC Ads · AI Creative Production · Product Storytelling.',
  navLinks: [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
};
