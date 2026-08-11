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
  IconBrandTwitter,
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
    value: "info@payzones.net",
    href: "mailto:info@payzones.net",
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
    name: 'Ramesh Kumar',
    role: 'Shopkeeper, UP',
    initials: 'RK',
    color: 'bg-blue-500',
    rating: 5,
    text: "Payzones is a very very good app for my business. It's improving day by day and is the best service provider for AEPS. Thumbs Up from my side!",
  },
  {
    name: 'Sunil Sharma',
    role: 'Retailer, Bihar',
    initials: 'SS',
    color: 'bg-purple-500',
    rating: 5,
    text: 'Earlier it used to take me half a day to earn ₹300 but after joining Payzones I earn ₹300 in just 15 minutes by providing account opening service.',
  },
  {
    name: 'Mohit Verma',
    role: 'Distributor, Rajasthan',
    initials: 'MV',
    color: 'bg-green-500',
    rating: 5,
    text: 'I have experienced AEPS services from many companies. Thanks to Payzones, which is the most trusted company in this domain. It provides many services I earn well from.',
  },
  {
    name: 'Priya Singh',
    role: 'Shopkeeper, MP',
    initials: 'PS',
    color: 'bg-amber-500',
    rating: 5,
    text: 'After joining Payzones, our shop has become famous for banking services in the whole village, due to which the number of our customers has increased a lot.',
  },
  {
    name: 'Ajay Patel',
    role: 'Master Distributor, Gujarat',
    initials: 'AP',
    color: 'bg-red-500',
    rating: 5,
    text: 'The real-time commission and backoffice dashboard make managing my agent network effortless. Payzones has truly transformed how I run my business.',
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

// Stats Data
export const stats = [
  { icon: Calendar, value: 10, suffix: '+', label: 'Years of Experience', description: 'Serving since Feb 2019' },
  { icon: Monitor, value: 180, suffix: '+', label: 'Successful Projects', description: 'Across India' },
  { icon: Users, value: 50, suffix: '+', label: 'Team Members', description: 'Expert professionals' },
  { icon: Handshake, value: 8000, suffix: '+', label: 'Happy Clients', description: 'Retailers & distributors' },
];

// Services Data
export const services = [
  { icon: Banknote, title: 'AEPS Service', desc: 'Aadhaar-enabled payment system for withdrawals, balance enquiry & mini statement.', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20 hover:border-blue-500/50' },
  { icon: Building2, title: 'Money Transfer (DMT)', desc: 'Domestic money transfer to any bank account across India in seconds.', color: 'from-green-500/20 to-green-600/10', border: 'border-green-500/20 hover:border-green-500/50' },
  { icon: Zap, title: 'BBPS Bill Payments', desc: 'Bharat Bill Payment System — pay electricity, water, gas, telecom bills instantly.', color: 'from-yellow-500/20 to-yellow-600/10', border: 'border-yellow-500/20 hover:border-yellow-500/50' },
  { icon: Smartphone, title: 'Mobile Recharge', desc: 'Recharge any network — Airtel, Jio, BSNL, Vi across all circles in India.', color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/20 hover:border-purple-500/50' },
  { icon: Tv2, title: 'DTH Recharge', desc: 'Quick DTH recharges for Tata Sky, Dish TV, Airtel DTH, DEN and more.', color: 'from-pink-500/20 to-pink-600/10', border: 'border-pink-500/20 hover:border-pink-500/50' },
  { icon: FileText, title: 'PAN Card Services', desc: 'Apply for new PAN, corrections & NSDL/UTI PAN card services at your fingertips.', color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/20 hover:border-orange-500/50' },
  { icon: ShieldCheck, title: 'Insurance', desc: 'Motor, life and general insurance policies — premium collection made easy.', color: 'from-teal-500/20 to-teal-600/10', border: 'border-teal-500/20 hover:border-teal-500/50' },
  { icon: Train, title: 'Travel Booking (IRCTC)', desc: 'Book train tickets via IRCTC integration and bus tickets for your customers.', color: 'from-red-500/20 to-red-600/10', border: 'border-red-500/20 hover:border-red-500/50' },
  { icon: ShoppingBag, title: 'E-Commerce (Amazon)', desc: 'Enable customers to shop on Amazon and other portals through your outlet.', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/20 hover:border-amber-500/50' },
  { icon: Ticket, title: 'OTT & Vouchers', desc: 'Netflix, Amazon Prime, Hotstar subscription vouchers — sell & earn commissions.', color: 'from-indigo-500/20 to-indigo-600/10', border: 'border-indigo-500/20 hover:border-indigo-500/50' },
  { icon: CreditCard, title: 'Micro ATM', desc: 'Portable Micro ATM device for cash withdrawal and payment services anywhere.', color: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/20 hover:border-cyan-500/50' },
  { icon: Wifi, title: 'Data Card Recharge', desc: 'Recharge data cards and broadband accounts for all major internet providers.', color: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/20 hover:border-violet-500/50' },
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

export const MOCKUP_CHART_DATA = [40, 65, 45, 80, 55, 90, 70];

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
  { label: 'X / Twitter', href: '#', icon: IconBrandTwitter },
  { label: 'Instagram', href: '#', icon: IconBrandInstagram },
  { label: 'YouTube', href: '#', icon: IconBrandYoutube },
];



