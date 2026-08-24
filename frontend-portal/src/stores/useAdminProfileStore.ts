import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserProfile } from "@/modules/admin/types";
import { DEFAULT_USER_PROFILE } from "@/modules/admin/constants";
import { secureZustandStorage } from "@/lib/secureStorage";
import { formatISODate } from "@/lib/datefns";

export interface LoginHistoryItem {
  id: string;
  ip: string;
  device: string;
  browser: string;
  location: string;
  timestamp: string; // ISO string e.g. "2026-08-14T11:45:00.000Z"
  status: "Success" | "Failed";
}

export interface AdminProfile extends UserProfile {
  phone: string;
  designation: string;
  department: string;
  location: string;
  bio?: string;
  twoFactorEnabled: boolean;
  status: "Active" | "Inactive";
  lastLogin: string; // ISO string
  loginHistory: LoginHistoryItem[];
}

interface AdminProfileStore {
  profile: AdminProfile;
  updateProfile: (data: Partial<AdminProfile>) => void;
  updateAvatar: (avatarUrl: string) => void;
  addLoginHistory: (item: Omit<LoginHistoryItem, "id">) => void;
  resetProfile: () => void;
}

const initialLoginHistory: LoginHistoryItem[] = [
  {
    id: "LOG-01",
    ip: "103.240.198.42",
    device: "Windows 11 (Desktop)",
    browser: "Chrome 128.0",
    location: "New Delhi, India",
    timestamp: "2026-08-14T11:45:30.000Z",
    status: "Success",
  },
  {
    id: "LOG-02",
    ip: "103.240.198.42",
    device: "Windows 11 (Desktop)",
    browser: "Chrome 128.0",
    location: "New Delhi, India",
    timestamp: "2026-08-13T09:20:15.000Z",
    status: "Success",
  },
  {
    id: "LOG-03",
    ip: "49.36.120.15",
    device: "iPhone 15 Pro",
    browser: "Safari Mobile",
    location: "Noida, India",
    timestamp: "2026-08-12T18:15:00.000Z",
    status: "Success",
  },
  {
    id: "LOG-04",
    ip: "182.72.65.12",
    device: "macOS Sonoma",
    browser: "Firefox 129.0",
    location: "Gurugram, India",
    timestamp: "2026-08-11T14:10:22.000Z",
    status: "Success",
  },
];

const initialProfile: AdminProfile = {
  ...DEFAULT_USER_PROFILE,
  lastLogin: "2026-08-14T11:45:30.000Z",
  phone: "+91 9876543210",
  designation: "Super Administrator",
  department: "IT & Core Banking Operations",
  location: "New Delhi, India",
  bio: "Managing core banking, API integrations, recharge switch, and merchant services across the platform.",
  twoFactorEnabled: true,
  status: "Active",
  loginHistory: initialLoginHistory,
};

const formatDate = formatISODate();

export const useAdminProfileStore = create<AdminProfileStore>()(
  persist(
    (set) => ({
      profile: initialProfile,
    
      updateProfile: (data) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...data,
          },
        })),
      updateAvatar: (avatarUrl) =>
        set((state) => ({
          profile: {
            ...state.profile,
            avatar: avatarUrl,
          },
        })),
      addLoginHistory: (item) =>
        set((state) => ({
          profile: {
            ...state.profile,
            lastLogin: formatDate,
            loginHistory: [
              {
                id: `LOG-${formatDate}`,
                ...item,
              },
              ...state.profile.loginHistory,
            ],
          },
        })),
      resetProfile: () => set({ profile: initialProfile }),
    }),
    {
      name: "admin-profile-store",
      storage: createJSONStorage(() => secureZustandStorage),
    }
  )
);
