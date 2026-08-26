import {
  FileText,
  Folder,
  Handshake,
  Users,
  Mail,
  Phone,
  MapPin,
  Clock,
  Smartphone,
  Zap,
  Banknote,
  ShieldCheck,
  CreditCard,
  UserPlus,
  FileCheck,
  Rocket,
  TrendingUp,
  Wallet,
  Plane,
  Gift,
  Car,
  Fingerprint,
  Store,
  Network,
  Building2
} from "lucide-react";
import {
  IconBrandFacebook,
  IconBrandX,
  IconBrandInstagram,
  IconBrandYoutube
} from "@tabler/icons-react";
import type { ChatMessage } from "./types";

// Navbar - matches landing page sections
export const navItems = [
  {
    key: 0,
    name: "Services",
    link: "#services",
  },
  {
    key: 1,
    name: "How It Works",
    link: "#journey",
  },
  {
    key: 2,
    name: "Pricing",
    link: "#pricing",
  },
  {
    key: 3,
    name: "Testimonials",
    link: "#testimonials",
  },
  {
    key: 4,
    name: "FAQ",
    link: "#faqs",
  },
  {
    key: 5,
    name: "Contact",
    link: "#contact",
  },
];

// FAQs Constant
export const FAQS_ITEMS_CONSTANT = [
  {
    id: "item-1",
    title: "Company Overview",
    icon: FileText,
    textColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    collapsibles: [
      {
        id: "collapsible-1-1",
        title: "Mission Statement",
        content:
          "Our mission is to deliver high-quality products that improve the lives of our customers.",
      },
      {
        id: "collapsible-1-2",
        title: "Core Values",
        content:
          "Integrity, innovation, and customer satisfaction are at the heart of everything we do.",
      },
    ],
  },
  {
    id: "item-2",
    title: "Products & Services",
    icon: Folder,
    textColor: "text-orange-400",
    bgColor: "bg-orange-400/10",
    collapsibles: [
      {
        id: "collapsible-2-1",
        title: "Software Solutions",
        content:
          "We offer a range of software tools designed to enhance business efficiency and productivity.",
      },
      {
        id: "collapsible-2-2",
        title: "Consulting Services",
        content:
          "Our consulting team helps clients identify opportunities, streamline operations, and drive growth.",
      },
    ],
  },
  {
    id: "item-3",
    title: "Team & Culture",
    icon: Handshake,
    textColor: "text-teal-400",
    bgColor: "bg-teal-400/10",
    collapsibles: [
      {
        id: "collapsible-3-1",
        title: "Leadership Team",
        content:
          "Our leadership team is composed of experienced professionals committed to innovation and growth.",
      },
      {
        id: "collapsible-3-2",
        title: "Work Environment",
        content:
          "We foster a collaborative and inclusive culture where everyone can thrive.",
      },
    ],
  },
  {
    id: "item-4",
    title: "Contact Information",
    icon: Users,
    textColor: "text-red-500",
    bgColor: "bg-red-500/10",
    collapsibles: [
      {
        id: "collapsible-4-1",
        title: "Support",
        content:
          "Reach out to our support team via email or phone for any inquiries or assistance.",
      },
      {
        id: "collapsible-4-2",
        title: "Locations",
        content:
          "Our offices are located in New York, San Francisco, and London to serve clients globally.",
      },
    ],
  },
];

// Chatbot Responses & Config
export const BOT_RESPONSES = [
  "Hello! How can I help you today?",
  "I'm here to assist you with any questions about FinHub.",
  "What would you like to know?",
  "Feel free to ask me anything about our services!",
  "I'm available 24/7 to help you out.",
  "Is there anything specific I can help you with?",
];

export const INITIAL_CHAT_MESSAGE: Omit<ChatMessage, "timestamp"> = {
  id: "1",
  text: "Hi! Welcome to FinHub Support. How can I help you today?",
  sender: "bot",
};

export const CHATBOT_UI_TEXT = {
  HEADER_TITLE: "FinHub Support",
  HEADER_STATUS: "Online",
  INPUT_PLACEHOLDER: "Type a message...",
};

// Contact Form Values
export const CONTACT_DEFAULT_VALUES = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export const CONTACT_SERVICES = [
  "Book Flight Ticket",
  "Card To Cash",
  "Gift Card",
  "Google Play",
  "PAN INSPAY",
  "AEPS (Yes Bank / Kotak Bank)",
  "Mobile Prepaid & DTH Recharge",
  "Electricity & BBPS Bill Pay",
  "UPI Transfer & Money Transfer",
  "PAN UTI & PAN NSDL",
  "Fastag Recharge",
  "Micro ATM (mATM)",
  "Train Ticket Booking (IRCTC)",
  "LIC Insurance",
  "Retailer Registration",
  "Distributor Registration",
  "Whitelabel Solution",
  "Other",
];

export const CONTACT_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: "info@aslwallets.co.in",
    href: "mailto:info@aslwallets.co.in",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 99976 69866",
    href: "tel:+919997669866",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "ASL Solutions Tech Pvt. Ltd., India",
    href: "#",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "9:00 AM - 8:00 PM (24×7 Helpdesk)",
    href: "#",
  },
];

// Testimonials Data
export const testimonials = [
  {
    name: 'Priya Singh',
    role: 'Shopkeeper, MP',
    initials: 'PS',
    color: 'bg-amber-500',
    rating: 5,
    text: 'After joining ASL Wallets, our shop has become famous for banking services in the whole village, due to which the number of our customers has increased a lot.',
  },
  {
    name: 'Ajay Patel',
    role: 'Master Distributor, Gujarat',
    initials: 'AP',
    color: 'bg-red-500',
    rating: 5,
    text: 'The real-time commission and backoffice dashboard make managing my agent network effortless. ASL Wallets has truly transformed how I run my business.',
  },
  {
    name: 'Deepak Yadav',
    role: 'Retailer, Jharkhand',
    initials: 'DY',
    color: 'bg-teal-500',
    rating: 5,
    text: 'Best platform for BBPS and money transfers. Customers now prefer to come to my shop for all banking needs. Highly recommended!',
  },
];

export const TESTIMONIALS = testimonials;

// Stats Data
export const stats = [
  { icon: Store, value: 12000, suffix: '+', label: 'Active Retailers', description: 'Empowered merchant network' },
  { icon: Network, value: 2500, suffix: '+', label: 'Sub-Distributors', description: 'Expanding local reach' },
  { icon: Building2, value: 500, suffix: '+', label: 'Master Distributors', description: 'Driving regional growth' },
  { icon: Users, value: 50000, suffix: '+', label: 'Happy Customers', description: 'Daily served across India' },
];

export const services = [
  { 
    icon: Fingerprint, 
    title: 'AEPS (Yes Bank & Kotak)', 
    desc: 'Aadhaar Enabled Payment System for biometric cash withdrawal, balance enquiry & mini statements.', 
    color: 'from-teal-500/10 to-teal-600/5', 
    border: 'border-border hover:border-teal-500/50',
    tag: 'Highest Margin',
    tagColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
  },
  { 
    icon: Banknote, 
    title: 'Money Transfer (DMT & UPI)', 
    desc: 'Domestic 24x7 IMPS money transfer and instant UPI withdrawals to all Indian bank accounts.', 
    color: 'from-emerald-500/10 to-emerald-600/5', 
    border: 'border-border hover:border-emerald-500/50',
    tag: '24×7 IMPS',
    tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  },
  { 
    icon: Zap, 
    title: 'BBPS & Electricity Bill Pay', 
    desc: 'Unified Bharat BillPay for 20,000+ electricity, gas, water, broadband and municipal billers.', 
    color: 'from-blue-500/10 to-blue-600/5', 
    border: 'border-border hover:border-blue-500/50',
    tag: 'NPCI Certified',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  { 
    icon: Smartphone, 
    title: 'Mobile & DTH Recharge', 
    desc: 'Instant recharge for Jio, Airtel, Vi, BSNL, Tata Play, Sun Direct & D2H with special offer fetch.', 
    color: 'from-green-500/10 to-green-600/5', 
    border: 'border-border hover:border-green-500/50',
    tag: 'Auto-Cashback',
    tagColor: 'bg-green-500/10 text-green-600 dark:text-green-400'
  },
  { 
    icon: CreditCard, 
    title: 'Micro ATM & Card To Cash', 
    desc: 'Debit card POS cash withdrawal and credit card cashout services with Bluetooth terminal.', 
    color: 'from-rose-500/10 to-rose-600/5', 
    border: 'border-border hover:border-rose-500/50',
    tag: 'POS Terminal',
    tagColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
  },
  { 
    icon: FileText, 
    title: 'PAN Card (INSPAY/NSDL/UTI)', 
    desc: 'Paperless biometric e-KYC PAN Card creation, correction & 2-hour digital e-PAN delivery.', 
    color: 'from-indigo-500/10 to-indigo-600/5', 
    border: 'border-border hover:border-indigo-500/50',
    tag: 'NSDL / UTI PSA',
    tagColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
  },
  { 
    icon: Plane, 
    title: 'Book Flight & Train (IRCTC)', 
    desc: 'Authorized IRCTC Rail ticketing & domestic/international flight ticket booking agent.', 
    color: 'from-amber-500/10 to-amber-600/5', 
    border: 'border-border hover:border-amber-500/50',
    tag: 'IRCTC Agent',
    tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
  },
  { 
    icon: ShieldCheck, 
    title: 'LIC & General Insurance', 
    desc: 'LIC premium collections, two/four wheeler motor, health and shopkeeper policies.', 
    color: 'from-blue-500/10 to-indigo-600/5', 
    border: 'border-border hover:border-blue-500/50',
    tag: 'Instant Policy',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  { 
    icon: Gift, 
    title: 'Gift Card & Google Play', 
    desc: 'Sell 100+ top brand digital shopping vouchers, Google Play codes & gaming credits.', 
    color: 'from-purple-500/10 to-purple-600/5', 
    border: 'border-border hover:border-purple-500/50',
    tag: 'Brand Codes',
    tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  { 
    icon: Car, 
    title: 'FASTag Highway Recharge', 
    desc: 'Instant vehicle plate NETC FASTag toll recharge for all major issuing partner banks.', 
    color: 'from-teal-500/10 to-emerald-600/5', 
    border: 'border-border hover:border-teal-500/50',
    tag: 'NETC Sync',
    tagColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
  },
];


export const providerDetails = [
  {
    title: 'Book Flight Ticket',
    description: 'Domestic and international airline flight booking with instant seat selection, automated PNR generation, cancellation support, and high commissions.',
    tag: 'Flight API',
    color: 'from-sky-500/20 via-blue-500/20 to-indigo-500/20',
    accentColor: 'text-sky-500',
    icon: 'Plane',
    features: ['All Domestic & Global Airlines', 'Instant PNR & E-Ticket', 'Easy Rescheduling', 'Instant Commission']
  },
  {
    title: 'Card To Cash',
    description: 'Instant debit card and credit card POS cash payout services. Help customers withdraw urgent emergency cash right from your counter.',
    tag: 'POS Cashout',
    color: 'from-emerald-500/20 via-teal-500/20 to-cyan-500/20',
    accentColor: 'text-emerald-500',
    icon: 'CreditCard',
    features: ['Debit / Credit Card Swipe', 'Instant Cash Settlement', 'High Per-Transaction Limits', 'Safe & Secure PIN']
  },
  {
    title: 'Gift Card',
    description: 'Instant digital gift card issuing for top retail brands, shopping portals, fashion outlets, and lifestyle stores with zero physical inventory.',
    tag: 'Brand Vouchers',
    color: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    accentColor: 'text-amber-500',
    icon: 'Gift',
    features: ['100+ Top Shopping Brands', 'Instant Code SMS / Email', 'Zero Inventory Hassle', 'High Profit Margin']
  },
  {
    title: 'Google Play',
    description: 'Sell Google Play Store recharge codes and gaming credits for mobile game top-ups, subscriptions, and digital app purchases with instant code delivery.',
    tag: 'Play Store Codes',
    color: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
    accentColor: 'text-green-500',
    icon: 'Gamepad2',
    features: ['Instant Voucher Codes', 'BGMI & FreeFire Top-ups', 'Direct SMS Delivery', 'Official Google Channel']
  },
  {
    title: 'PAN INSPAY',
    description: 'Instant PAN Card application and correction processing via INSPAY route with rapid biometric Aadhaar e-KYC and digital acknowledgement.',
    tag: 'Instant PAN Gateway',
    color: 'from-indigo-500/20 via-blue-500/20 to-cyan-500/20',
    accentColor: 'text-indigo-500',
    icon: 'FileText',
    features: ['Biometric Paperless KYC', 'Digital Slip Generation', 'Fast-Track Processing', 'Direct Govt. Record']
  },
  {
    title: 'AEPS (YES BANK)',
    description: 'Aadhaar Enabled Payment System powered by Yes Bank gateway for instant cash withdrawal, balance enquiry, and Aadhaar mini statement.',
    tag: 'Yes Bank Switch',
    color: 'from-teal-500/20 via-cyan-500/20 to-blue-500/20',
    accentColor: 'text-teal-500',
    icon: 'Fingerprint',
    features: ['Yes Bank Direct Switch', 'Fingerprint Biometric Auth', 'Mini Statement & Balance', '99.9% Route Uptime']
  },
  {
    title: 'AEPS (KOTAK BANK)',
    description: 'High-speed AePS banking channel integrated directly with Kotak Mahindra Bank for uninterrupted transaction processing and rapid settlement.',
    tag: 'Kotak Bank Switch',
    color: 'from-rose-500/20 via-red-500/20 to-orange-500/20',
    accentColor: 'text-rose-500',
    icon: 'Fingerprint',
    features: ['Kotak Direct Gateway', 'Zero Transaction Fallback', 'Instant Aadhaar Cash Out', 'Real-time Commission']
  },
  {
    title: 'Mobile Prepaid',
    description: 'Instant prepaid mobile recharges across all telecom circles for Jio, Airtel, Vi, and BSNL with automated plan fetch and commission credit.',
    tag: 'Telecom Gateway',
    color: 'from-green-500/20 via-emerald-500/20 to-lime-500/20',
    accentColor: 'text-green-500',
    icon: 'Smartphone',
    features: ['All Telecom Operators', 'Special Offer / R-Offer Fetch', 'Instant Recharge Status', 'Highest Commission']
  },
  {
    title: 'DTH Recharge',
    description: 'Instant recharge and pack activation for Tata Play, Airtel DTH, Dish TV, Sun Direct, and D2H with real-time customer info lookup.',
    tag: 'DTH Gateway',
    color: 'from-purple-500/20 via-fuchsia-500/20 to-pink-500/20',
    accentColor: 'text-purple-500',
    icon: 'Tv',
    features: ['Customer Info / Name Fetch', 'Plan Refresh Support', 'All Major DTH Operators', 'Instant Balance Update']
  },
  {
    title: 'Electricity',
    description: 'Online electricity bill payments for 100+ state and private power distribution boards across India with instant BBPS digital receipts.',
    tag: 'Power Utility',
    color: 'from-yellow-500/20 via-amber-500/20 to-orange-500/20',
    accentColor: 'text-yellow-500',
    icon: 'Zap',
    features: ['All State Electricity Boards', 'Automated Bill Fetch', 'Instant Official Receipt', 'Zero Surcharge Mode']
  },
  {
    title: 'BBPS',
    description: 'Bharat Bill Payment System unified platform for water, piped gas, broadband, municipal tax, landline, and recurring utility bill collections.',
    tag: 'NPCI BBPS',
    color: 'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
    accentColor: 'text-cyan-500',
    icon: 'ReceiptText',
    features: ['20,000+ Verified Billers', 'Instant Bill Validation', 'Assured Cashbacks', 'NPCI Certified Switch']
  },
  {
    title: 'UPI TRANSFER',
    description: 'Instant P2P and P2M money transfers directly using UPI VPA ID or QR code with 24x7 instant credit and double encryption protection.',
    tag: 'UPI Gateway',
    color: 'from-blue-500/20 via-sky-500/20 to-teal-500/20',
    accentColor: 'text-blue-500',
    icon: 'Send',
    features: ['Transfer via UPI ID / VPA', 'Real-Time Bank Settlement', '24x7 Instant Transfer', 'Encrypted Security']
  },
  {
    title: 'Money Transfer',
    description: 'Domestic Money Transfer (DMT) to any bank account in India 24x7 via IMPS / NEFT with instant beneficiary verification and SMS alerts.',
    tag: 'Domestic Remittance',
    color: 'from-indigo-500/20 via-purple-500/20 to-violet-500/20',
    accentColor: 'text-indigo-500',
    icon: 'Banknote',
    features: ['Instant IMPS Route', 'Instant Name Verification', 'All National & Rural Banks', 'Lowest Surcharge']
  },
  {
    title: 'PAN UTI',
    description: 'Official UTI Infrastructure Technology and Services Limited (UTIITSL) PSA portal login and PAN card generation center.',
    tag: 'UTI PSA Official',
    color: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
    accentColor: 'text-orange-500',
    icon: 'FileText',
    features: ['Direct UTI PSA Access', 'Coupons & Token System', 'Minor & Major PAN Cards', 'Correction & Reprint']
  },
  {
    title: 'PAN NSDL',
    description: 'Official Protean (NSDL) e-Governance PAN card processing platform with biometric fingerprint and OTP based instant paperless approval.',
    tag: 'NSDL Protean',
    color: 'from-blue-500/20 via-indigo-500/20 to-cyan-500/20',
    accentColor: 'text-blue-500',
    icon: 'FileText',
    features: ['Protean NSDL Integration', 'Paperless 2-Hour e-PAN', 'Biometric Thumb Approval', 'Physical Card Delivery']
  },
  {
    title: 'Fastag Recharge',
    description: 'Instant national highway FASTag recharge for all issuing banks (SBI, ICICI, HDFC, Axis, Paytm, IDFC) with vehicle number lookup.',
    tag: 'Toll & FASTag',
    color: 'from-emerald-500/20 via-green-500/20 to-teal-500/20',
    accentColor: 'text-emerald-500',
    icon: 'Car',
    features: ['All Issuing Banks', 'Vehicle Plate Lookup', 'Instant NETC Toll Sync', 'Zero Failure Route']
  },
  {
    title: 'mATM',
    description: 'Micro ATM debit card cash withdrawal and PIN pad balance inquiry terminal with NPCI certification and bluetooth POS connectivity.',
    tag: 'Micro ATM POS',
    color: 'from-rose-500/20 via-pink-500/20 to-red-500/20',
    accentColor: 'text-rose-500',
    icon: 'Calculator',
    features: ['All Indian Bank Debit Cards', 'High Transaction Limit', 'Bluetooth Device Sync', 'Instant Settlement']
  },
  {
    title: 'Train Ticket Booking',
    description: 'Official IRCTC Rail ticketing agent channel. Book Tatkal, General, and Premium train tickets with instant PNR and refund status.',
    tag: 'IRCTC Authorized',
    color: 'from-amber-500/20 via-orange-500/20 to-red-500/20',
    accentColor: 'text-amber-500',
    icon: 'TrainTrack',
    features: ['Official IRCTC Rail Agent', 'Tatkal & General Booking', 'Instant PNR Confirmation', 'Automated Refund Policy']
  },
  {
    title: 'LIC',
    description: 'Life Insurance Corporation of India (LIC) premium collection service with automated policy status check and instant official receipt.',
    tag: 'LIC Premium Pay',
    color: 'from-blue-500/20 via-indigo-500/20 to-emerald-500/20',
    accentColor: 'text-blue-500',
    icon: 'ShieldCheck',
    features: ['Direct LIC India Gateway', 'Policy Due Date & Info', 'Instant Premium Receipt', 'Zero Extra Surcharge']
  }
];

export const partnerTickers = [
  'Airtel', 'Jio', 'BSNL', 'Vi', 'Tata Sky', 'Dish TV',
  'IRCTC', 'Amazon', 'NSDL', 'UTI', 'Axis Bank', 'SBI',
  'Netflix', 'Hotstar', 'Amazon Prime', 'Zee5', 'LIC', 'ICICI',
];

export const providerStats = [
  { label: '₹3,500', sub: 'Starting Plan' },
  { label: '24×7', sub: 'Support' },
  { label: '5 mins', sub: 'Go Live' },
  { label: '100%', sub: 'Digital' },
];

// Pricing Plans
export const plans = [
  {
    role: 'Retailer',
    price: '₹3,500',
    tagline: 'Perfect for shop owners to start earning',
    popular: false,
    features: [
      'Free Registration',
      '25+ Banking Services',
      'Account Opening',
      'Free AEPS Service',
      'Zero Wallet Charges',
      'Live in 5 Minutes',
    ],
    cta: 'Join as Retailer',
    gradient: 'from-blue-500/10 to-transparent',
    border: 'border-blue-500/20 hover:border-blue-500/50',
    badge: '',
  },
  {
    role: 'Distributor',
    price: '₹15,000',
    tagline: 'Appoint agents & earn on every transaction',
    popular: true,
    features: [
      'Unlimited Agents',
      'Real-time Commission',
      'Set Custom Deals',
      'Backoffice Access',
      'Custom Dashboard',
      'Android Application',
    ],
    cta: 'Join as Distributor',
    gradient: 'from-primary/20 to-blue-500/10',
    border: 'border-primary/50',
    badge: 'Most Popular',
  },
  {
    role: 'Master Distributor',
    price: '₹25,000',
    tagline: 'Manage distributors & scale your network',
    popular: false,
    features: [
      'Unlimited Distributors',
      'Real-time Commission',
      'Set Custom Deals',
      'Backoffice Access',
      'Custom Dashboard',
      'Android Application',
    ],
    cta: 'Join as MD',
    gradient: 'from-purple-500/10 to-transparent',
    border: 'border-purple-500/20 hover:border-purple-500/50',
    badge: '',
  },
  {
    role: 'Whitelabel',
    price: '₹1,50,000',
    tagline: 'Launch your own branded fintech empire',
    popular: false,
    features: [
      'Your Own Brand & Domain',
      'Branded Android + iOS App',
      'Unlimited Distributors',
      'Unlimited Agents & Retailers',
      'Full Backoffice Panel',
      'Custom Commission Structure',
      'API Access & Integration',
      'Marketing Materials Included',
      'Dedicated Account Manager',
      'Priority 24×7 Support',
    ],
    cta: 'Get Whitelabel',
    gradient: 'from-amber-500/10 to-transparent',
    border: 'border-amber-500/20 hover:border-amber-500/50',
    badge: 'Enterprise',
  },
];

// Journey Steps
export const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Apply & Register',
    desc: 'Choose your plan — Retailer, Distributor, Master Distributor or Whitelabel. Register online in minutes.',
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-500',
    borderColor: 'border-blue-500/40',
    dotColor: '#3b82f6',
  },
  {
    icon: FileCheck,
    step: '02',
    title: 'KYC Verification',
    desc: 'Complete your KYC with Aadhaar & PAN. Our team verifies and activates your account within 24 hours.',
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-500',
    borderColor: 'border-purple-500/40',
    dotColor: '#a855f7',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Get Activated',
    desc: 'Go live in 5 minutes! Access 25+ banking & utility services via our app, portal or API.',
    iconBg: 'bg-primary/15',
    iconColor: 'text-primary',
    borderColor: 'border-primary/40',
    dotColor: '#F7941D',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Start Earning',
    desc: 'Earn real-time commissions on every transaction. Track your earnings live on the dashboard.',
    iconBg: 'bg-green-500/15',
    iconColor: 'text-green-500',
    borderColor: 'border-green-500/40',
    dotColor: '#22c55e',
  },
];

// Hero Constants
export const QUICK_SERVICES = [
  { label: 'AEPS', emoji: '🏧' },
  { label: 'Recharge', emoji: '📱' },
  { label: 'Bill Pay', emoji: '⚡' },
  { label: 'Transfer', emoji: '💸' },
];

export const STATIC_PARTICLES = [
  { id: 1, left: 12, top: 25, duration: 5.2, delay: 0.5 },
  { id: 2, left: 78, top: 15, duration: 6.8, delay: 1.2 },
  { id: 3, left: 34, top: 85, duration: 4.5, delay: 2.1 },
  { id: 4, left: 56, top: 45, duration: 7.2, delay: 0.8 },
  { id: 5, left: 89, top: 65, duration: 5.9, delay: 1.5 },
  { id: 6, left: 23, top: 55, duration: 6.1, delay: 0.3 },
  { id: 7, left: 45, top: 12, duration: 4.8, delay: 2.7 },
  { id: 8, left: 67, top: 88, duration: 5.4, delay: 1.1 },
  { id: 9, left: 91, top: 32, duration: 7.5, delay: 0.4 },
  { id: 10, left: 15, top: 73, duration: 6.3, delay: 1.9 },
  { id: 11, left: 50, top: 92, duration: 5.0, delay: 2.3 },
  { id: 12, left: 82, top: 50, duration: 6.6, delay: 0.7 },
  { id: 13, left: 28, top: 20, duration: 7.0, delay: 1.6 },
  { id: 14, left: 70, top: 78, duration: 4.9, delay: 2.2 },
  { id: 15, left: 38, top: 60, duration: 5.5, delay: 0.9 },
  { id: 16, left: 62, top: 28, duration: 6.2, delay: 1.4 },
  { id: 17, left: 95, top: 82, duration: 7.8, delay: 2.5 },
  { id: 18, left: 5, top: 40, duration: 5.7, delay: 1.8 },
  { id: 19, left: 48, top: 70, duration: 6.4, delay: 0.2 },
  { id: 20, left: 87, top: 95, duration: 4.7, delay: 1.0 },
];

export const HERO_FEATURES = [
  { icon: ShieldCheck, label: 'RBI Compliant' },
  { icon: Zap, label: 'Instant Settlement' },
  { icon: Wallet, label: 'Zero Wallet Charges' },
];

export const HERO_STATS = [
  { val: '10+', label: 'Years' },
  { val: '8,000+', label: 'Retailers' },
  { val: '25+', label: 'Services' },
];

export const MOCKUP_STATS = [
  { label: 'Commission', value: '₹1,240', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-500/10' },
  { label: 'Agents', value: '23', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'AEPS Txn', value: '156', icon: Banknote, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export const MOCKUP_CHART_DATA = [
  { day: 'Mon', value: 40 },
  { day: 'Tue', value: 65 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 80 },
  { day: 'Fri', value: 55 },
  { day: 'Sat', value: 90 },
  { day: 'Sun', value: 70 },
];

export const FOOTER_SECTIONS = [
  {
    title: 'Services',
    links: [
      { label: 'AEPS Service', href: '#services' },
      { label: 'Money Transfer', href: '#services' },
      { label: 'BBPS Bill Payments', href: '#services' },
      { label: 'Mobile Recharge', href: '#services' },
      { label: 'PAN Card Services', href: '#services' },
    ],
  },
  {
    title: 'Join Us',
    links: [
      { label: 'Retailer Plan', href: '#pricing' },
      { label: 'Distributor Plan', href: '#pricing' },
      { label: 'Master Distributor', href: '#pricing' },
      { label: 'Whitelabel Solution', href: '#pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Contact', href: '#contact' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cancellation & Refund', href: '#' },
    ],
  },
];

export const COMPLIANCE_BADGES = ['RBI Compliant', 'SSL Secure', 'PCI DSS', 'ISO 27001'];

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: '#', icon: IconBrandFacebook },
  { label: 'X', href: '#', icon: IconBrandX },
  { label: 'Instagram', href: '#', icon: IconBrandInstagram },
  { label: 'YouTube', href: '#', icon: IconBrandYoutube },
];



