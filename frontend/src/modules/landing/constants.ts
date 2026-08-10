import { FileText, Folder, Handshake, Users, Mail, Phone, MapPin, Clock } from "lucide-react";
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
