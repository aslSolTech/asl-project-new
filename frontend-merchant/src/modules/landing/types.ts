export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export type Message = ChatMessage;

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface ContainerVariants {
  hidden: { opacity: number };
  visible: {
    opacity: number;
    transition: {
      staggerChildren: number;
      delayChildren: number;
    };
  };
}

export interface ItemVariants {
  hidden: { opacity: number; y: number };
  visible: {
    opacity: number;
    y: number;
    transition: { duration: number; ease: string };
  };
}

export interface MobileMenuVariants {
  hidden: { opacity: number; height: number };
  visible: {
    opacity: number;
    height: string;
    transition: { duration: number; ease: string };
  };
  exit: {
    opacity: number;
    height: number;
    transition: { duration: number; ease: string };
  };
}

export interface MobileLinkVariants {
  hidden: { opacity: number; x: number };
  visible: (i: number) => {
    opacity: number;
    x: number;
    transition: { delay: number; duration: number };
  };
}

export interface SubTestimonial {
  readonly rating: number;
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly color: string;
  readonly text: string;
}

export interface TestimonialCardProps {
  readonly testimonial: SubTestimonial;
}

export interface SubStat {
  readonly value: number;
  readonly suffix: string;
  readonly inView: boolean;
}

export interface Indice {
  readonly index: number;
}
