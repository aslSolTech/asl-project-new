'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap } from 'lucide-react';

const plans = [
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

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">Choose Your Plan</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Join{' '}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Payzones
            </span>{' '}
            at Your Level
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            From a single shop owner to building your own branded fintech empire — we have a plan for every level of ambition.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.role}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-2xl border bg-gradient-to-b ${plan.gradient} ${plan.border} bg-card overflow-hidden transition-all duration-300 shadow-sm hover:shadow-xl`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className={`absolute top-0 right-0 left-0 flex justify-center py-1.5 text-[11px] font-bold uppercase tracking-widest ${plan.popular ? 'bg-primary text-primary-foreground' : 'bg-amber-500/80 text-white'}`}>
                  {plan.popular && <Star className="h-3 w-3 mr-1 fill-current" />}
                  {plan.badge}
                </div>
              )}

              <div className={`p-6 ${plan.badge ? 'pt-10' : ''}`}>
                <h3 className="font-bold text-foreground text-lg">{plan.role}</h3>
                <p className="text-xs text-muted-foreground mt-1 mb-4">{plan.tagline}</p>

                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm mb-1">one-time</span>
                </div>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-sm">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-primary/15 flex items-center justify-center">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                      <span className="text-foreground/80">{feat}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full text-center py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90'
                      : 'bg-muted border border-border text-foreground hover:bg-accent'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {plan.popular && <Zap className="h-4 w-4" />}
                    {plan.cta}
                  </span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          All plans include 24×7 support. Need a custom plan?{' '}
          <a href="#contact" className="text-primary hover:underline font-medium">Contact us</a>
        </motion.p>
      </div>
    </section>
  );
}
