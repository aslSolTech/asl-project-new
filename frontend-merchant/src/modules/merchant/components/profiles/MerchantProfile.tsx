"use client";

import { memo, useState, useTransition } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  User,
  Shield,
  KeyRound,
  Mail,
  Phone,
  MapPin,
  Camera,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  Smartphone,
  Save,
  RotateCcw,
  BadgeCheck,
  History,
  Laptop,
  Globe,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";
import { formatISODate } from "@/lib/datefns";
import { AVATAR_OPTIONS } from "@/modules/merchant/constants";
import {
  merchantProfileSchema,
  merchantChangePasswordSchema,
  MerchantProfileFormInput,
  MerchantChangePasswordFormInput,
} from "@/modules/merchant/validations";

interface HeaderBannerProps {
  readonly profile: ReturnType<typeof useMerchantProfileStore.getState>["profile"];
}

const ProfileHeaderBanner = memo(function ProfileHeaderBanner({ profile }: HeaderBannerProps) {
  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white shadow-xl p-6 sm:p-8">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-48 h-48 rounded-full bg-white/10 blur-xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar Section */}
        <div className="relative group">
          <Avatar className="w-24 h-24 sm:w-28 sm:h-28 border-4 border-white/80 shadow-2xl bg-white/10 backdrop-blur-sm">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-emerald-400 border-2 border-white rounded-full flex items-center justify-center shadow">
            <span className="w-2 h-2 rounded-full bg-emerald-900 animate-ping" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {profile.name}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-white/20 text-white hover:bg-white/30 border-white/30 backdrop-blur-md font-semibold text-xs py-0.5">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
              {profile.role}
            </Badge>  
            <Badge className="bg-emerald-500/20 text-emerald-200 border-emerald-400/30 text-xs py-0.5">
              <BadgeCheck className="w-3.5 h-3.5 mr-1" />
              {profile.status}
            </Badge>
          </div>
            </div>

          <p className="text-blue-100 text-sm font-mono">@{profile.username}</p>
          <p className="text-white/80 text-xs sm:text-sm max-w-2xl leading-relaxed">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-blue-100 font-medium">
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 opacity-80" />
              {profile.email}
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 opacity-80" />
              {profile.phone}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 opacity-80" />
              {profile.location}
            </span>
            {profile.lastLogin && (
              <span className="flex items-center gap-1.5 bg-white/15 px-2.5 py-0.5 rounded-full border border-white/20 font-mono">
                <Clock className="w-3.5 h-3.5 opacity-90" />
                Last Login: {formatISODate({ date: profile.lastLogin, formatType: "short" })}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

interface AvatarPresetSelectorProps {
  readonly currentAvatar: string;
  readonly onSelectAvatar: (url: string) => void;
}

const AvatarPresetSelector = memo(function AvatarPresetSelector({
  currentAvatar,
  onSelectAvatar,
}: AvatarPresetSelectorProps) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-foreground text-base">Choose Avatar Preset</h3>
        </div>
        <Badge variant="outline" className="text-xs">Quick Select</Badge>
      </div>
      <p className="text-xs text-muted-foreground">
        Select one of the pre-rendered SVG avatars or enter a custom link.
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-1">
        {AVATAR_OPTIONS.map((avatarUrl, idx) => {
          const isSelected = currentAvatar === avatarUrl;
          return (
            <button
              key={avatarUrl}
              type="button"
              onClick={() => {
                onSelectAvatar(avatarUrl);
                toast.success(`Avatar preset #${idx + 1} selected!`);
              }}
              className={`relative p-1.5 rounded-2xl border-2 transition-all cursor-pointer hover:scale-105 ${
                isSelected
                  ? "border-primary bg-primary/10 shadow-sm"
                  : "border-border hover:border-primary/40 bg-muted/40"
              }`}
            >
              <Image
                src={avatarUrl}
                alt={`Avatar option ${idx + 1}`}
                width={64}
                height={64}
                unoptimized
                className="w-full h-auto rounded-xl object-contain"
              />
              {isSelected && (
                <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-3 border-t border-border space-y-1.5">
        <Label className="text-xs font-semibold">Custom Avatar URL</Label>
        <Input
          placeholder="https://..."
          value={currentAvatar}
          onChange={(e) => onSelectAvatar(e.target.value)}
          className="text-xs font-mono"
        />
      </div>
    </div>
  );
});

interface ProfileFormCardProps {
  readonly formData:  MerchantProfileFormInput;
  readonly profileErrors: Record<string, string>;
  readonly isPending: boolean;
  readonly onChangeField: (field: keyof MerchantProfileFormInput, val: string) => void;
  readonly onSubmit: (e: React.SyntheticEvent) => void;
  readonly onReset: () => void;
}

const ProfileFormCard = memo(function ProfileFormCard({
  formData,
  profileErrors,
  isPending,
  onChangeField,
  onSubmit,
  onReset,
}: ProfileFormCardProps) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="text-lg font-bold text-foreground">Admin Personal Information</h3>
            <p className="text-xs text-muted-foreground">
              Update your official admin credentials and contact information.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onReset}
            title="Reset to default admin settings"
            className="text-xs flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold">
              Full Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onChangeField("name", e.target.value)}
              placeholder="Enter full name"
              className={profileErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {profileErrors.name && (
              <p className="text-xs text-destructive font-medium">{profileErrors.name}</p>
            )}
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <Label htmlFor="username" className="text-xs font-semibold">
              Username <span className="text-destructive">*</span>
            </Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => onChangeField("username", e.target.value)}
              placeholder="Enter admin username"
              className={profileErrors.username ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {profileErrors.username && (
              <p className="text-xs text-destructive font-medium">{profileErrors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold">
              Email Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => onChangeField("email", e.target.value)}
              placeholder="admin@aslwallets.co.in"
              className={profileErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {profileErrors.email && (
              <p className="text-xs text-destructive font-medium">{profileErrors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-xs font-semibold">
              Phone Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => onChangeField("phone", e.target.value)}
              placeholder="+91 9876543210"
              className={profileErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {profileErrors.phone && (
              <p className="text-xs text-destructive font-medium">{profileErrors.phone}</p>
            )}
          </div>

          {/* Designation */}
          <div className="space-y-1.5">
            <Label htmlFor="designation" className="text-xs font-semibold">
              Designation <span className="text-destructive">*</span>
            </Label>
            <Input
              id="designation"
              value={formData.designation}
              onChange={(e) => onChangeField("designation", e.target.value)}
              placeholder="Super Administrator"
              className={profileErrors.designation ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {profileErrors.designation && (
              <p className="text-xs text-destructive font-medium">{profileErrors.designation}</p>
            )}
          </div>

          {/* Department */}
          <div className="space-y-1.5">
            <Label htmlFor="department" className="text-xs font-semibold">
              Department <span className="text-destructive">*</span>
            </Label>
            <Input
              id="department"
              value={formData.department}
              onChange={(e) => onChangeField("department", e.target.value)}
              placeholder="Operations & Technology"
              className={profileErrors.department ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {profileErrors.department && (
              <p className="text-xs text-destructive font-medium">{profileErrors.department}</p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="location" className="text-xs font-semibold">
              Location / Office Address <span className="text-destructive">*</span>
            </Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => onChangeField("location", e.target.value)}
              placeholder="New Delhi, India"
              className={profileErrors.location ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {profileErrors.location && (
              <p className="text-xs text-destructive font-medium">{profileErrors.location}</p>
            )}
          </div>

          {/* Bio */}
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="bio" className="text-xs font-semibold">
              Bio / Responsibilities Note
            </Label>
            <Textarea
              id="bio"
              rows={3}
              value={formData.bio}
              onChange={(e) => onChangeField("bio", e.target.value)}
              placeholder="Write a short summary of admin tasks..."
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 font-semibold cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {isPending ? "Saving Profile..." : "Save Profile Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
});

interface SecurityTabProps {
  readonly passwords: MerchantChangePasswordFormInput;
  readonly passwordErrors: Record<string, string>;
  readonly showPassword: boolean;
  readonly isPending: boolean;
  readonly onChangePassword: (field: keyof MerchantChangePasswordFormInput, val: string) => void;
  readonly onToggleShowPassword: () => void;
  readonly onSubmit: (e: React.SyntheticEvent) => void;
}

const SecurityTab = memo(function SecurityTab({
  passwords,
  passwordErrors,
  showPassword,
  isPending,
  onChangePassword,
  onToggleShowPassword,
  onSubmit,
}: SecurityTabProps) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-2 text-primary">
            <Lock className="w-5 h-5" />
            <h3 className="text-lg font-bold text-foreground">Change Password</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Ensure your admin account is using a strong, unique password to prevent unauthorized access.
          </p>
        </div>

        <div className="space-y-4">
          {/* Current Password */}
          <div className="space-y-1.5">
            <Label htmlFor="currentPass" className="text-xs font-semibold">
              Current Password <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="currentPass"
                type={showPassword ? "text" : "password"}
                value={passwords.currentPassword}
                onChange={(e) => onChangePassword("currentPassword", e.target.value)}
                placeholder="••••••••"
                className={passwordErrors.currentPassword ? "border-destructive focus-visible:ring-destructive pr-10" : "pr-10"}
              />
              <button
                type="button"
                onClick={onToggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordErrors.currentPassword && (
              <p className="text-xs text-destructive font-medium">{passwordErrors.currentPassword}</p>
            )}
          </div>

          {/* New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="newPass" className="text-xs font-semibold">
              New Password <span className="text-destructive">*</span>
            </Label>
            <Input
              id="newPass"
              type={showPassword ? "text" : "password"}
              value={passwords.newPassword}
              onChange={(e) => onChangePassword("newPassword", e.target.value)}
              placeholder="At least 6+ characters (Uppercase + Number)"
              className={passwordErrors.newPassword ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {passwordErrors.newPassword && (
              <p className="text-xs text-destructive font-medium">{passwordErrors.newPassword}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="space-y-1.5">
            <Label htmlFor="confirmPass" className="text-xs font-semibold">
              Confirm New Password <span className="text-destructive">*</span>
            </Label>
            <Input
              id="confirmPass"
              type={showPassword ? "text" : "password"}
              value={passwords.confirmPassword}
              onChange={(e) => onChangePassword("confirmPassword", e.target.value)}
              placeholder="Re-type new password"
              className={passwordErrors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : ""}
            />
            {passwordErrors.confirmPassword && (
              <p className="text-xs text-destructive font-medium">{passwordErrors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground space-y-1">
          <p className="font-semibold text-foreground">Password requirements:</p>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>Minimum 6 characters in length</li>
            <li>Must include at least 1 uppercase letter and 1 number</li>
            <li>Confirm password must exactly match the new password</li>
          </ul>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 font-semibold cursor-pointer"
          >
            <KeyRound className="w-4 h-4" />
            {isPending ? "Updating Password..." : "Update Password"}
          </Button>
        </div>
      </form>
    </div>
  );
});

interface PreferencesTabProps {
  readonly twoFactor: boolean;
  readonly onToggle2FA: (checked: boolean) => void;
}

const PreferencesTab = memo(function PreferencesTab({
  twoFactor,
  onToggle2FA,
}: PreferencesTabProps) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-card border border-border shadow-xs space-y-6">
      <div className="border-b border-border pb-4">
        <div className="flex items-center gap-2 text-primary">
          <Shield className="w-5 h-5" />
          <h3 className="text-lg font-bold text-foreground">Two-Factor Authentication (2FA)</h3>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Add an extra layer of security to your admin account during login.
        </p>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/40 border border-border">
        <div className="space-y-1 max-w-md">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" />
            <p className="text-sm font-bold text-foreground">Authenticator App / OTP</p>
          </div>
          <p className="text-xs text-muted-foreground">
            Require an OTP or authenticator verification code every time you log in to the admin panel.
          </p>
        </div>
        <Switch
          checked={twoFactor}
          onCheckedChange={onToggle2FA}
          aria-label="Toggle 2FA"
        />
      </div>

      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Active Admin Privileges
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-muted/40 border border-border/80 flex items-center justify-between text-xs font-medium">
            <span>API Management & Switch</span>
            <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">Granted</Badge>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/80 flex items-center justify-between text-xs font-medium">
            <span>Merchant & Retailer Control</span>
            <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">Granted</Badge>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/80 flex items-center justify-between text-xs font-medium">
            <span>Fund Request Approval</span>
            <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">Granted</Badge>
          </div>
          <div className="p-3 rounded-xl bg-muted/40 border border-border/80 flex items-center justify-between text-xs font-medium">
            <span>Service Status Control</span>
            <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">Granted</Badge>
          </div>
        </div>
      </div>
    </div>
  );
});

interface LoginHistorySidebarProps {
  readonly loginHistory?: ReturnType<typeof useMerchantProfileStore.getState>["profile"]["loginHistory"];
}

const LoginHistorySidebar = memo(function LoginHistorySidebar({
  loginHistory,
}: LoginHistorySidebarProps) {
  const historyList = loginHistory || [];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-xs space-y-4 sticky top-20">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm">Login History</h3>
            <p className="text-[11px] text-muted-foreground">Recent Admin Access Sessions</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] font-mono">
          {historyList.length} Logs
        </Badge>
      </div>

      <div className="space-y-3">
        {historyList.length > 0 ? (
          historyList.map((item, index) => {
            const isCurrent = index === 0;
            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border transition-colors space-y-1.5 ${
                  isCurrent
                    ? "bg-primary/5 border-primary/30 dark:bg-primary/10"
                    : "bg-muted/30 border-border/60 hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Laptop className="w-3.5 h-3.5 text-primary" />
                    <span className="truncate max-w-[130px]">{item.device}</span>
                  </div>
                  {isCurrent ? (
                    <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[9px] px-1.5 py-0 font-bold uppercase">
                      Active Session
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0">
                      {item.status}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {item.ip}
                  </span>
                  <span>{item.browser}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1 border-t border-border/40 text-muted-foreground">
                  <span className="truncate max-w-[110px]">{item.location}</span>
                  <span className="font-mono text-[10px] text-primary/80">
                    {formatISODate({ date: item.timestamp, formatType: "short" })}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-xs text-muted-foreground">
            No login history records found.
          </div>
        )}
      </div>

      <div className="pt-2 border-t border-border text-[11px] text-muted-foreground flex items-center justify-between">
        <span>Security Status:</span>
        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
          <BadgeCheck className="w-3.5 h-3.5" /> Protected
        </span>
      </div>
    </div>
  );
});

export const MerchantProfileView = memo(function MerchantProfileView() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "general";
  const [activeTab, setActiveTab] = useState<"general" | "security" | "preferences">(
    (initialTab as "general" | "security" | "preferences") || "general"
  );

  const { profile, updateProfile, updateAvatar, resetProfile } = useMerchantProfileStore();
  const [isPending, startTransition] = useTransition();

  // General Profile Form state
  const [formData, setFormData] = useState<MerchantProfileFormInput>({
    name: profile.name,
    email: profile.email,
    username: profile.username,
    phone: profile.phone,
    designation: profile.designation,
    department: profile.department,
    location: profile.location,
    bio: profile.bio || "",
  });
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // Password state
  const [passwords, setPasswords] = useState<MerchantChangePasswordFormInput>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  // 2FA state
  const [twoFactor, setTwoFactor] = useState(profile.twoFactorEnabled);

  // Profile Field Change Handler with live field validation
  const handleProfileFieldChange = (field: keyof MerchantProfileFormInput, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (profileErrors[field]) {
      setProfileErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleProfileSave = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = merchantProfileSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && typeof path === "string" && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setProfileErrors(fieldErrors);
      toast.error(result.error.issues[0]?.message || "Please fix validation errors in the form!");
      return;
    }

    setProfileErrors({});
    startTransition(() => {
      updateProfile(result.data);
      toast.success("Merchant Profile updated successfully!");
    });
  };

  const handleResetProfile = () => {
    resetProfile();
    setFormData({
      name: profile.name,
      email: profile.email,
      username: profile.username,
      phone: profile.phone,
      designation: profile.designation,
      department: profile.department,
      location: profile.location,
      bio: profile.bio || "",
    });
    setProfileErrors({});
  };

  // Password Field Change Handler
  const handlePasswordFieldChange = (field: keyof MerchantChangePasswordFormInput, val: string) => {
    setPasswords((prev) => ({ ...prev, [field]: val }));
    if (passwordErrors[field]) {
      setPasswordErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handlePasswordChange = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const result = merchantChangePasswordSchema.safeParse(passwords);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path && typeof path === "string" && !fieldErrors[path]) {
          fieldErrors[path] = issue.message;
        }
      });
      setPasswordErrors(fieldErrors);
      toast.error(result.error.issues[0]?.message || "Please fix password validation errors!");
      return;
    }

    setPasswordErrors({});
    startTransition(() => {
      setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Admin password changed successfully!");
    });
  };

  const handleToggle2FA = (checked: boolean) => {
    setTwoFactor(checked);
    updateProfile({ twoFactorEnabled: checked });
    toast.success(checked ? "2-Factor Authentication enabled!" : "2-Factor Authentication disabled!");
  };

  return (
    <div className="mx-auto w-full space-y-6 pb-12">
      {/* Top Banner Card */}
      <ProfileHeaderBanner profile={profile} />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border/80 pb-3 overflow-x-auto">
        <Button
          variant={activeTab === "general" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 rounded-xl font-semibold cursor-pointer ${
            activeTab === "general"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <User className="w-4 h-4" />
          Edit Profile
        </Button>

        <Button
          variant={activeTab === "security" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 rounded-xl font-semibold cursor-pointer ${
            activeTab === "security"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <KeyRound className="w-4 h-4" />
          Password & Security
        </Button>

        <Button
          variant={activeTab === "preferences" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("preferences")}
          className={`flex items-center gap-2 rounded-xl font-semibold cursor-pointer ${
            activeTab === "preferences"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Shield className="w-4 h-4" />
          2FA & Access
        </Button>
      </div>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* LEFT 2 COLUMNS: Tab Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "general" && (
            <div className="space-y-6">
              <AvatarPresetSelector
                currentAvatar={profile.avatar}
                onSelectAvatar={updateAvatar}
              />
              <ProfileFormCard
                formData={formData}
                profileErrors={profileErrors}
                isPending={isPending}
                onChangeField={handleProfileFieldChange}
                onSubmit={handleProfileSave}
                onReset={handleResetProfile}
              />
            </div>
          )}

          {activeTab === "security" && (
            <SecurityTab
              passwords={passwords}
              passwordErrors={passwordErrors}
              showPassword={showPassword}
              isPending={isPending}
              onChangePassword={handlePasswordFieldChange}
              onToggleShowPassword={() => setShowPassword(!showPassword)}
              onSubmit={handlePasswordChange}
            />
          )}

          {activeTab === "preferences" && (
            <PreferencesTab
              twoFactor={twoFactor}
              onToggle2FA={handleToggle2FA}
            />
          )}
        </div>

        {/* RIGHT 1 COLUMN: SIDE BOX LOGIN HISTORY */}
        <div className="lg:col-span-1 space-y-4">
          <LoginHistorySidebar loginHistory={profile.loginHistory} />
        </div>
      </div>
    </div>
  );
});

export const AdminProfileView = MerchantProfileView;
