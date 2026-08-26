'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { FAQS_ITEMS_CONSTANT } from '../../constants';

const items = FAQS_ITEMS_CONSTANT;

export default function FaqsSection() {
  return (
    <section id="faqs" className="py-20 bg-muted/20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2 block">
            Support & Clarification
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Clear answers about agent onboarding, commission settlement, hardware support, and compliance.
          </p>
        </div>

        {/* FAQs Accordion Container */}
        <div className="max-w-7xl mx-auto">
          <Accordion
            className="w-full space-y-4"
            defaultValue={[items[0]?.id]}
          >
            {items.map((item) => (
              <AccordionItem
                className="overflow-hidden border border-border/80 bg-card rounded-2xl shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
                key={item.id}
                 value={item.id}
              >
                <AccordionTrigger showChevron={false} className="px-6 py-5 hover:no-underline group cursor-pointer">
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'p-3 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110',
                          item.bgColor,
                          item.textColor
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="flex-1 text-left font-bold text-base sm:text-lg text-foreground tracking-tight">
                        {item.title}
                      </span>
                    </div>
                    
                    {/* Category Plus / Minus Animated Icon */}
                    <div className="relative h-7 w-7 shrink-0 flex items-center justify-center rounded-full bg-muted/80 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <PlusIcon className="absolute h-4 w-4 transition-all duration-300 ease-in-out group-[&[data-state=open]]:rotate-90 group-[&[data-state=open]]:opacity-0 group-[&[aria-expanded=true]]:rotate-90 group-[&[aria-expanded=true]]:opacity-0" />
                      <MinusIcon className="absolute h-4 w-4 transition-all duration-300 ease-in-out opacity-0 group-[&[data-state=open]]:rotate-180 group-[&[data-state=open]]:opacity-100 group-[&[aria-expanded=true]]:rotate-180 group-[&[aria-expanded=true]]:opacity-100" />
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-6 pb-6 pt-0 space-y-3">
                  {item.collapsibles.map((collapsible) => (
                    <Collapsible
                      className="space-y-2 border border-border/60 bg-muted/30 dark:bg-muted/20 rounded-xl p-4 transition-colors"
                      key={collapsible.id}
                    >
                      <CollapsibleTrigger className="group/sub flex items-center justify-between w-full font-semibold text-sm text-foreground text-left gap-2 py-1 cursor-pointer">
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {collapsible.title}
                        </span>
                        
                        {/* Sub-Item Plus / Minus Animated Icon */}
                        <div className="relative h-6 w-6 shrink-0 flex items-center justify-center rounded-full bg-muted/80 text-muted-foreground group-hover/sub:bg-primary/20 group-hover/sub:text-primary transition-all duration-300">
                          <PlusIcon className="absolute h-3.5 w-3.5 transition-all duration-300 ease-in-out group-[&[aria-expanded=true]]/sub:rotate-90 group-[&[aria-expanded=true]]/sub:opacity-0 group-[&[data-state=open]]/sub:rotate-90 group-[&[data-state=open]]/sub:opacity-0" />
                          <MinusIcon className="absolute h-3.5 w-3.5 transition-all duration-300 ease-in-out opacity-0 group-[&[aria-expanded=true]]/sub:rotate-180 group-[&[aria-expanded=true]]/sub:opacity-100 group-[&[data-state=open]]/sub:rotate-180 group-[&[data-state=open]]/sub:opacity-100" />
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="overflow-hidden ps-3.5 pt-1.5 text-sm text-muted-foreground leading-relaxed">
                        {collapsible.content}
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
