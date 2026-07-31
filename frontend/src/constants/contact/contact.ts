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

import { Mail, Phone, MapPin, Clock } from 'lucide-react';
  export const CONTACT_CARDS = [
    {
      icon: Mail,
      label: 'Email',
      value: 'info@payzones.net',
      href: 'mailto:info@payzones.net',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 99976 69866',
      href: 'tel:+919997669866',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'ASL Solutions Tech Pvt. Ltd., India',
      href: '#',
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: '9:00 AM - 8:00 PM (24×7 Helpdesk)',
      href: '#',
    },
  ];