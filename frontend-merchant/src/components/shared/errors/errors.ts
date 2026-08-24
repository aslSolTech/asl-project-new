import { ReactNode } from "react";

export interface ErrorCardProps {
  readonly statusCode?: number | string;
  readonly title: string;
  readonly description: string;
  readonly imageSrc?: string;
  readonly emoji?: string;
  readonly icon?: ReactNode;
  readonly onRetry?: () => void;
  readonly showHomeBtn?: boolean;
  readonly showBackBtn?: boolean;
}
