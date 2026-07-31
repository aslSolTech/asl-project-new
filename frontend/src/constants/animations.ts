import { Variants } from "framer-motion";

export const FORM_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04,
      delayChildren: 0,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export const FORM_ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};
