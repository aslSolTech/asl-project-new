import {
  FileText,
  Folder,
  Handshake,
  Users,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Monitor,
  Smartphone,
  Tv2,
  Zap,
  Banknote,
  ShieldCheck,
  Train,
  ShoppingBag,
  Ticket,
  Wifi,
  CreditCard,
  Building2,
  UserPlus,
  FileCheck,
  Rocket,
  TrendingUp,
  Wallet
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
  "AEPS Service",
  "Money Transfer (DMT)",
  "BBPS Bill Payments",
  "Mobile/DTH Recharge",
  "PAN Card Services",
  "Insurance",
  "Travel Booking (IRCTC)",
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
  { icon: Calendar, value: 10, suffix: '+', label: 'Years of Experience', description: 'Serving since Feb 2019' },
  { icon: Monitor, value: 180, suffix: '+', label: 'Successful Projects', description: 'Across India' },
  { icon: Users, value: 50, suffix: '+', label: 'Team Members', description: 'Expert professionals' },
  { icon: Handshake, value: 8000, suffix: '+', label: 'Happy Clients', description: 'Retailers & distributors' },
];

export const services = [
  { 
    icon: Banknote, 
    title: 'AEPS Cash Withdrawal', 
    desc: 'Aadhaar-enabled payment system for withdrawals, balance enquiry & mini statement with zero downtime.', 
    color: 'from-amber-500/10 to-amber-600/5', 
    border: 'border-border hover:border-amber-500/50',
    tag: 'Highest Margin',
    tagColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
  },
  { 
    icon: Building2, 
    title: 'Money Transfer (DMT)', 
    desc: 'Domestic money transfer to any bank account across India in seconds via IMPS & NEFT 24×7.', 
    color: 'from-emerald-500/10 to-emerald-600/5', 
    border: 'border-border hover:border-emerald-500/50',
    tag: '24×7 IMPS',
    tagColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
  },
  { 
    icon: Zap, 
    title: 'BBPS Bill Payments', 
    desc: 'Bharat BillPay System — pay electricity, water, gas, FASTag & telecom bills instantly with receipts.', 
    color: 'from-blue-500/10 to-blue-600/5', 
    border: 'border-border hover:border-blue-500/50',
    tag: 'NPCI Certified',
    tagColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
  },
  { 
    icon: Smartphone, 
    title: 'Mobile & DTH Recharge', 
    desc: 'Instant recharge for Jio, Airtel, Vi, BSNL, Tata Play, Sun Direct with auto-fetch plans.', 
    color: 'from-orange-500/10 to-orange-600/5', 
    border: 'border-border hover:border-orange-500/50',
    tag: 'Instant Cashback',
    tagColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
  },
  { 
    icon: Tv2, 
    title: 'Micro ATM Terminal', 
    desc: 'Turn your counter into an ATM point for all Debit and Credit cards with low transaction fees.', 
    color: 'from-purple-500/10 to-purple-600/5', 
    border: 'border-border hover:border-purple-500/50',
    tag: 'Card Swipe',
    tagColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
  },
  { 
    icon: FileText, 
    title: 'PAN Card Center (NSDL/UTI)', 
    desc: 'Instant Paperless e-KYC PAN Card creation and corrections within 2 hours delivery.', 
    color: 'from-rose-500/10 to-rose-600/5', 
    border: 'border-border hover:border-rose-500/50',
    tag: 'e-KYC Fast',
    tagColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
  },
  { 
    icon: ShieldCheck, 
    title: 'Insurance & General POSP', 
    desc: 'Motor, health, life, and personal accident policies with instant policy generation.', 
    color: 'from-teal-500/10 to-teal-600/5', 
    border: 'border-border hover:border-teal-500/50',
    tag: 'Instant Policy',
    tagColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400'
  },
  { 
    icon: CreditCard, 
    title: 'Instant Merchant Payouts', 
    desc: 'Bulk disbursement API and payout routes directly connected to banking switch.', 
    color: 'from-indigo-500/10 to-indigo-600/5', 
    border: 'border-border hover:border-indigo-500/50',
    tag: 'Bulk API',
    tagColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
  },
];

// Providers Data
export const providers = [
  'Financial Services',
  'Insurance',
  'Travel Booking – IRCTC',
  'Bill Payments (BBPS)',
  'E-Commerce – Amazon',
  'Vouchers & OTT',
  'Mobile & DTH Recharges',
  'PAN Card Services',
  'Micro ATM',
  'AEPS Withdrawals',
  'Money Transfer (DMT)',
  'Bank Account Opening',
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



