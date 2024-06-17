import { TAvatar, TFinanceType, Theme, TRoles } from "../pages/Onboarding";

export type TUserOnboardingData = {
  id: string;
  username: string;
  financeType: TFinanceType | null;
  theme: Theme;
  avatar: TAvatar | null;
  role: TRoles | null;
};

export type TUser = {
  id: string;
  username: string;
  financeType: TFinanceType | null;
  theme: Theme;
  avatar: TAvatar | null;
  role: TRoles | null;
  isOnboarded?: boolean;
};
