import { ReactNode } from "react";

export type OnboardingData = {
  id: number;
  logo: ReactNode;
  title: string;
  progress: ReactNode;
  content: ReactNode;
  sideImage: ReactNode;
  alt?: string;
};

export type TOnboarding = OnboardingData[];
