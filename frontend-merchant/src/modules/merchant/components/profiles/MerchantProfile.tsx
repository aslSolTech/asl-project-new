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
  FileCheck,
  CreditCard,
  Fingerprint,
  Calendar,
  Maximize2,
  Check,
  ShieldCheck,
  Copy,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useMerchantProfileStore } from "@/stores/useMerchantProfileStore";
import { formatISODate } from "@/lib/datefns";
import { AVATAR_OPTIONS, DEFAULT_MERCHANT_KYC } from "@/modules/merchant/constants";
import { MerchantKycData } from "@/modules/merchant/types";
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
    <div className="rounded-2xl bg-card border border-border p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Avatar Section */}
        <div className="relative group shrink-0">
          <Avatar className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-border shadow-xs bg-muted">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-base font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-card rounded-full flex items-center justify-center shadow-xs">
            <span className="w-1 h-1 rounded-full bg-white" />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
                  {profile.name}
                </h1>
                <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-semibold">
                  <Sparkles className="w-3 h-3 mr-1 text-primary" />
                  {profile.role}
                </Badge>
                <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] py-0 px-1.5">
                  <BadgeCheck className="w-3 h-3 mr-1" />
                  {profile.status}
                </Badge>
              </div>
              <p className="text-[11px] text-muted-foreground font-mono">@{profile.username}</p>
            </div>

            {profile.lastLogin && (
              <span className="flex items-center gap-1 bg-muted/60 px-2.5 py-0.5 rounded-full border border-border/80 font-mono text-[10px] text-muted-foreground self-center sm:self-start">
                <Clock className="w-3 h-3" />
                Last Login: {formatISODate({ date: profile.lastLogin, formatType: "short" })}
              </span>
            )}
          </div>

          <p className="text-xs text-muted-foreground max-w-2xl line-clamp-1">
            {profile.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-0.5 text-[11px] text-muted-foreground font-medium">
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-primary" />
              {profile.email}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-primary" />
              {profile.phone}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-primary" />
              {profile.location}
            </span>
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

interface AccountKycTabProps {
  readonly kycData?: MerchantKycData;
}

interface DocumentModalState {
  title: string;
  docType: string;
  docNumber?: string;
  docUrl: string;
  description: string;
  renderType: "profile" | "aadhaar_front" | "aadhaar_back" | "pan_card";
}

interface KycSubCardProps {
  readonly kycData: MerchantKycData;
  readonly copiedField: string | null;
  readonly onCopy: (text: string, label: string) => void;
  readonly isVerified?: boolean;
}

interface KycShopDetailsCardProps {
  readonly kycData: MerchantKycData;
  readonly copiedField: string | null;
  readonly onCopy: (text: string, label: string) => void;
}

const KycStatusBanner = memo(function KycStatusBanner({
  kycData,
  isVerified,
  copiedField,
  onCopy,
}: KycSubCardProps) {
  const badgeText = kycData.verificationBadgeText || (isVerified ? "UIDAI & NSDL Verified" : "Verification In Progress");

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br via-card to-card border p-6 sm:p-7 shadow-xs transition-colors ${
        isVerified
          ? "from-emerald-500/10 border-emerald-500/30"
          : "from-amber-500/10 border-amber-500/30"
      }`}
    >
      <div
        className={`absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 rounded-full blur-2xl pointer-events-none ${
          isVerified ? "bg-emerald-500/10" : "bg-amber-500/10"
        }`}
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-2xl border shrink-0 ${
              isVerified
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-amber-500/15 border-amber-500/30 text-amber-600 dark:text-amber-400"
            }`}
          >
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-xl font-extrabold text-foreground tracking-tight">
                KYC Verification
              </h3>
              <Badge
                className={`text-xs px-2.5 py-0.5 font-bold flex items-center gap-1.5 shadow-xs ${
                  isVerified
                    ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40"
                    : "bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    isVerified ? "bg-emerald-500" : "bg-amber-500"
                  }`}
                />
                {kycData.status.toUpperCase()}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              {isVerified
                ? "Your merchant identity and business premises are verified & authenticated. All banking, AePS, recharge, and payout services are fully active."
                : "Your KYC verification is currently in progress or awaiting admin approval. Please ensure all documents are properly submitted."}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-muted-foreground font-medium">
              <span
                className={`flex items-center gap-1 font-semibold ${
                  isVerified
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                {badgeText}
              </span>
              {kycData.verificationDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Verified on: {formatISODate({ date: kycData.verificationDate, formatType: "short" })}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-border/60">
          <div className="px-3.5 py-2 rounded-xl bg-muted/60 border border-border/80 text-left md:text-right space-y-0.5">
            <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">
              Merchant ID
            </p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-extrabold text-foreground">
                {kycData.merchantId}
              </span>
              <button
                type="button"
                onClick={() => onCopy(kycData.merchantId, "Merchant ID")}
                className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title="Copy Merchant ID"
              >
                {copiedField === "Merchant ID" ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const KycPersonalDetailsCard = memo(function KycPersonalDetailsCard({
  kycData,
  isVerified,
  copiedField,
  onCopy,
}: KycSubCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-border pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <User className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm">Personal & Identity Details</h4>
            <p className="text-[11px] text-muted-foreground">Verified govt. identity credentials</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`text-[10px] ${
            isVerified
              ? "text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/5"
              : "text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-500/5"
          }`}
        >
          {isVerified ? "100% Match" : "Pending Verification"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-primary" /> Full Name
          </span>
          <p className="text-sm font-bold text-foreground">{kycData.fullName}</p>
        </div>

        {/* Contact Number */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-primary" /> Contact Number
            </span>
            <button
              type="button"
              onClick={() => onCopy(kycData.contactNumber, "Contact Number")}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              title="Copy Contact"
            >
              {copiedField === "Contact Number" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <p className="text-sm font-bold text-foreground font-mono">{kycData.contactNumber}</p>
        </div>

        {/* DOB */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-primary" /> DOB (dd/mm/yyyy)
          </span>
          <p className="text-sm font-bold text-foreground font-mono">{kycData.dob}</p>
        </div>

        {/* Gender */}
        {kycData.gender && (
          <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" /> Gender
            </span>
            <p className="text-sm font-bold text-foreground">{kycData.gender}</p>
          </div>
        )}

        {/* Aadhaar Number */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
              <Fingerprint className="w-3.5 h-3.5 text-primary" /> Aadhaar Number
            </span>
            <button
              type="button"
              onClick={() => onCopy(kycData.aadhaarNumber, "Aadhaar Number")}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              title="Copy Aadhaar"
            >
              {copiedField === "Aadhaar Number" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-extrabold text-foreground font-mono tracking-wider">
              {kycData.aadhaarNumber}
            </p>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[9px] px-1 py-0">
              UIDAI
            </Badge>
          </div>
        </div>

        {/* PAN Card Number */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-primary" /> Pancard Number
            </span>
            <button
              type="button"
              onClick={() => onCopy(kycData.panNumber, "PAN Number")}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              title="Copy PAN"
            >
              {copiedField === "PAN Number" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-extrabold text-foreground font-mono tracking-wider">
              {kycData.panNumber}
            </p>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[9px] px-1 py-0">
              NSDL
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
});

const KycShopDetailsCard = memo(function KycShopDetailsCard({
  kycData,
  copiedField,
  onCopy,
}: KycShopDetailsCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border shadow-xs space-y-5">
      <div className="flex items-center justify-between border-b border-border pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Store className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm">Shop & Address Details</h4>
            <p className="text-[11px] text-muted-foreground">Registered outlet & banking point location</p>
          </div>
        </div>
        <Badge variant="outline" className="text-[10px] text-primary border-primary/30 bg-primary/5">
          CSP Outlet
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Shop Name */}
        <div className="sm:col-span-2 p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-primary" /> Shop / Business Name
          </span>
          <p className="text-base font-extrabold text-foreground tracking-tight">
            {kycData.shopName}
          </p>
        </div>

        {/* Shop Address */}
        <div className="sm:col-span-2 p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" /> Registered Address
          </span>
          <p className="text-xs font-semibold text-foreground leading-relaxed">
            {kycData.address}
          </p>
        </div>

        {/* State */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground">State</span>
          <p className="text-sm font-bold text-foreground">{kycData.state}</p>
        </div>

        {/* City */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground">City</span>
          <p className="text-sm font-bold text-foreground">{kycData.city}</p>
        </div>

        {/* District */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <span className="text-[11px] font-semibold text-muted-foreground">District</span>
          <p className="text-sm font-bold text-foreground">{kycData.district}</p>
        </div>

        {/* Pincode */}
        <div className="p-3 rounded-xl bg-muted/30 border border-border/60 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-muted-foreground">Pincode</span>
            <button
              type="button"
              onClick={() => onCopy(kycData.pincode, "Pincode")}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
              title="Copy Pincode"
            >
              {copiedField === "Pincode" ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <p className="text-sm font-bold text-foreground font-mono">{kycData.pincode}</p>
        </div>
      </div>
    </div>
  );
});

interface KycDocumentsGalleryProps {
  readonly kycData: MerchantKycData;
  readonly onSelectDoc: (doc: DocumentModalState) => void;
}

const KycDocumentsGallery = memo(function KycDocumentsGallery({
  kycData,
  onSelectDoc,
}: KycDocumentsGalleryProps) {
  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-card border border-border shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-primary" />
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              KYC DOCUMENTS
            </h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Uploaded and authenticated govt. verification documents with biometric validation.
          </p>
        </div>
        <Badge className="w-fit bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs px-2.5 py-1">
          4 Documents Verified
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Doc 1: Profile Picture */}
        <div className="group rounded-2xl border border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-primary" /> Profile Picture
              </span>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0">
                Verified
              </Badge>
            </div>

            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-slate-900/10 dark:bg-slate-950/40 border border-border/80 flex items-center justify-center p-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-3 border-primary/40 shadow-md">
                <Avatar className="w-full h-full">
                  <AvatarImage src={kycData.documents.profilePicture} alt="Merchant Profile" />
                  <AvatarFallback className="bg-primary/20 text-primary font-bold text-xl">
                    {kycData.fullName[0] || "N"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-2 left-2 right-2 px-2 py-0.5 rounded bg-background/80 backdrop-blur-xs text-[10px] text-center font-mono text-muted-foreground border border-border/50 truncate">
                Live Selfie • Face Matched
              </div>
            </div>
          </div>

          <div className="p-3 pt-0 border-t border-border/40 mt-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                onSelectDoc({
                  title: "Profile Picture",
                  docType: "Live Biometric Capture",
                  docUrl: kycData.documents.profilePicture,
                  description: `Live photograph of merchant ${kycData.fullName} verified during agent onboarding.`,
                  renderType: "profile",
                })
              }
              className="w-full text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" /> View Photo
            </Button>
          </div>
        </div>

        {/* Doc 2: E-Aadhaar (Front) */}
        <div className="group rounded-2xl border border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-primary" /> E-Aadhaar (Front)
              </span>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0">
                Verified
              </Badge>
            </div>

            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-gradient-to-b from-amber-500/10 via-background to-emerald-500/10 border border-border p-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-border/60 pb-1">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="text-[9px] font-extrabold text-foreground uppercase tracking-tight">
                    UIDAI Govt of India
                  </span>
                </div>
                <span className="text-[8px] text-muted-foreground font-mono">e-KYC</span>
              </div>

              <div className="flex items-center gap-2 py-1">
                <div className="w-10 h-12 rounded bg-muted border border-border overflow-hidden shrink-0 flex items-center justify-center">
                  <User className="w-6 h-6 text-muted-foreground opacity-60" />
                </div>
                <div className="text-[10px] space-y-0.5 truncate">
                  <p className="font-bold text-foreground truncate">{kycData.fullName}</p>
                  <p className="text-muted-foreground text-[9px]">DOB: {kycData.dob}</p>
                  <p className="text-muted-foreground text-[9px]">{kycData.gender || "Male"}</p>
                </div>
              </div>

              <div className="border-t border-border/60 pt-1 text-center">
                <span className="font-mono text-[11px] font-black tracking-widest text-primary">
                  {kycData.aadhaarNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 pt-0 border-t border-border/40 mt-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                onSelectDoc({
                  title: "E-Aadhaar (Front)",
                  docType: "Aadhaar Card (UIDAI)",
                  docNumber: kycData.aadhaarNumber,
                  docUrl: kycData.documents.aadhaarFront,
                  description: `Official digital Aadhaar card front of ${kycData.fullName} verified through UIDAI e-KYC.`,
                  renderType: "aadhaar_front",
                })
              }
              className="w-full text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" /> View Aadhaar Front
            </Button>
          </div>
        </div>

        {/* Doc 3: E-Aadhaar (Back) */}
        <div className="group rounded-2xl border border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Fingerprint className="w-3.5 h-3.5 text-primary" /> E-Aadhaar (Back)
              </span>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0">
                Verified
              </Badge>
            </div>

            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-gradient-to-b from-background via-muted/40 to-background border border-border p-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-border/60 pb-1">
                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                  Address / पता
                </span>
                <span className="text-[8px] font-mono text-muted-foreground">1947 UIDAI</span>
              </div>

              <div className="text-[9px] text-muted-foreground leading-tight py-1 space-y-0.5">
                <p className="font-semibold text-foreground truncate">
                  Address: {kycData.address}
                </p>
                <p className="truncate">Dist: {kycData.district}, State: {kycData.state}</p>
                <p className="font-mono font-bold text-primary">PIN: {kycData.pincode}</p>
              </div>

              <div className="border-t border-border/60 pt-1 flex items-center justify-between text-[9px] font-mono text-muted-foreground">
                <span className="tracking-widest">||||||||||||||||</span>
                <span className="text-[8px]">QR VERIFIED</span>
              </div>
            </div>
          </div>

          <div className="p-3 pt-0 border-t border-border/40 mt-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                onSelectDoc({
                  title: "E-Aadhaar (Back)",
                  docType: "Aadhaar Address Side",
                  docNumber: kycData.aadhaarNumber,
                  docUrl: kycData.documents.aadhaarBack,
                  description: `Address verification side of Aadhaar card matching merchant business premises.`,
                  renderType: "aadhaar_back",
                })
              }
              className="w-full text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" /> View Aadhaar Back
            </Button>
          </div>
        </div>

        {/* Doc 4: PAN Card */}
        <div className="group rounded-2xl border border-border bg-muted/20 hover:border-primary/40 hover:bg-muted/40 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs">
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-primary" /> PAN Card
              </span>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0">
                Verified
              </Badge>
            </div>

            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-gradient-to-br from-sky-500/10 via-background to-indigo-500/10 border border-border p-2.5 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-border/60 pb-1">
                <div className="text-[8px] font-extrabold uppercase text-foreground leading-tight">
                  INCOME TAX DEPARTMENT<br />
                  <span className="text-[7px] text-muted-foreground">GOVT. OF INDIA</span>
                </div>
                <div className="w-4 h-4 rounded bg-amber-400/30 border border-amber-500/40 flex items-center justify-center text-[7px] font-bold">
                  ITD
                </div>
              </div>

              <div className="flex items-center gap-2 py-0.5">
                <div className="w-9 h-10 rounded bg-muted border border-border flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground opacity-60" />
                </div>
                <div className="text-[9px] space-y-0.5 truncate">
                  <p className="font-bold text-foreground uppercase truncate">{kycData.fullName}</p>
                  <p className="text-[8px] text-muted-foreground">DOB: {kycData.dob}</p>
                </div>
              </div>

              <div className="border-t border-border/60 pt-1 text-center">
                <span className="font-mono text-[11px] font-black tracking-widest text-primary">
                  {kycData.panNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 pt-0 border-t border-border/40 mt-1">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                onSelectDoc({
                  title: "PAN Card",
                  docType: "Income Tax Department (NSDL/UTI)",
                  docNumber: kycData.panNumber,
                  docUrl: kycData.documents.panCard,
                  description: `Permanent Account Number (PAN) card of ${kycData.fullName} verified with NSDL database.`,
                  renderType: "pan_card",
                })
              }
              className="w-full text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" /> View PAN Card
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

interface KycDocumentPreviewDialogProps {
  readonly selectedDoc: DocumentModalState | null;
  readonly kycData: MerchantKycData;
  readonly onClose: () => void;
  readonly onCopy: (text: string, label: string) => void;
}

const KycDocumentPreviewDialog = memo(function KycDocumentPreviewDialog({
  selectedDoc,
  kycData,
  onClose,
  onCopy,
}: KycDocumentPreviewDialogProps) {
  if (!selectedDoc) return null;

  return (
    <Dialog open={Boolean(selectedDoc)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-6 rounded-2xl bg-card border border-border shadow-2xl">
        <DialogHeader className="border-b border-border pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-foreground">
                  {selectedDoc.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {selectedDoc.docType}
                </DialogDescription>
              </div>
            </div>
            <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-xs px-2.5 py-0.5">
              Verified by Admin
            </Badge>
          </div>
        </DialogHeader>

        {/* Document High-Fidelity Rendered Preview */}
        <div className="my-3 space-y-4">
          {selectedDoc.renderType === "profile" && (
            <div className="p-8 rounded-2xl bg-muted/40 border border-border flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-primary shadow-xl">
                <Avatar className="w-full h-full">
                  <AvatarImage src={selectedDoc.docUrl} alt="Merchant Profile" />
                  <AvatarFallback className="text-3xl font-bold bg-primary/20 text-primary">
                    {kycData.fullName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-foreground">{kycData.fullName}</h4>
                <p className="text-xs text-muted-foreground font-mono">{kycData.contactNumber}</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1 pt-1">
                  <CheckCircle2 className="w-4 h-4" /> Live Biometric Matched (99.8%)
                </p>
              </div>
            </div>
          )}

          {selectedDoc.renderType === "aadhaar_front" && (
            <div className="rounded-2xl border-2 border-border bg-gradient-to-b from-amber-500/10 via-card to-emerald-500/10 p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <div>
                  <h5 className="font-extrabold text-foreground text-sm tracking-tight">
                    भारत सरकार • GOVERNMENT OF INDIA
                  </h5>
                  <p className="text-[10px] text-muted-foreground">
                    Unique Identification Authority of India
                  </p>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  UIDAI e-KYC
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1 flex flex-col items-center justify-center p-2 rounded-xl bg-muted/60 border border-border">
                  <Avatar className="w-20 h-24 rounded-lg">
                    <AvatarImage src={kycData.documents.profilePicture} />
                    <AvatarFallback className="text-lg font-bold">{kycData.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-[9px] text-muted-foreground mt-1">Photo</span>
                </div>

                <div className="col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold">Name</span>
                    <p className="font-bold text-foreground text-sm">{kycData.fullName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold">DOB</span>
                    <p className="font-bold text-foreground font-mono">{kycData.dob}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold">Gender</span>
                    <p className="font-bold text-foreground">{kycData.gender || "Male"}</p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-border/80 pt-3 text-center">
                <p className="font-mono text-xl font-extrabold tracking-widest text-primary">
                  {kycData.aadhaarNumber}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">मेरा आधार, मेरी पहचान</p>
              </div>
            </div>
          )}

          {selectedDoc.renderType === "aadhaar_back" && (
            <div className="rounded-2xl border-2 border-border bg-gradient-to-b from-card via-muted/30 to-card p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <h5 className="font-extrabold text-foreground text-sm tracking-tight">
                  पता / ADDRESS DETAILS
                </h5>
                <span className="text-xs font-mono text-muted-foreground">Helpline: 1947</span>
              </div>

              <div className="p-4 rounded-xl bg-muted/40 border border-border/80 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase">
                    Registered Address:
                  </span>
                  <p className="font-bold text-foreground leading-relaxed mt-0.5">
                    {kycData.address}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/40 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground">City:</span>
                    <p className="font-semibold">{kycData.city}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">District:</span>
                    <p className="font-semibold">{kycData.district}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Pincode:</span>
                    <p className="font-semibold font-mono">{kycData.pincode}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1">
                <span>UIDAI Digital Verification Token: #9948-2810</span>
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[10px]">
                  Authentic
                </Badge>
              </div>
            </div>
          )}

          {selectedDoc.renderType === "pan_card" && (
            <div className="rounded-2xl border-2 border-sky-500/30 bg-gradient-to-br from-sky-500/10 via-card to-indigo-500/10 p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-border/80 pb-2">
                <div>
                  <h5 className="font-black text-foreground text-sm tracking-tight">
                    आयकर विभाग / INCOME TAX DEPARTMENT
                  </h5>
                  <p className="text-[10px] text-muted-foreground uppercase">
                    GOVT. OF INDIA / भारत सरकार
                  </p>
                </div>
                <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 text-[10px]">
                  Permanent Account Card
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <div className="col-span-1 flex flex-col items-center justify-center p-2 rounded-xl bg-muted/60 border border-border">
                  <Avatar className="w-20 h-24 rounded-lg">
                    <AvatarImage src={kycData.documents.profilePicture} />
                    <AvatarFallback className="text-lg font-bold">{kycData.fullName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-[9px] text-muted-foreground mt-1">Photo</span>
                </div>

                <div className="col-span-2 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold">NAME</span>
                    <p className="font-black text-foreground text-sm uppercase">{kycData.fullName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold">DATE OF BIRTH</span>
                    <p className="font-bold text-foreground font-mono">{kycData.dob}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-semibold">STATUS</span>
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">INDIVIDUAL • ACTIVE</p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-border/80 pt-3 text-center">
                <span className="text-[10px] text-muted-foreground font-semibold block uppercase">
                  Permanent Account Number (PAN)
                </span>
                <p className="font-mono text-2xl font-black tracking-widest text-primary mt-1">
                  {kycData.panNumber}
                </p>
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground leading-relaxed pt-1">
            {selectedDoc.description}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
          {selectedDoc.docNumber ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onCopy(selectedDoc.docNumber!, selectedDoc.title)}
              className="text-xs flex items-center gap-1.5 w-full sm:w-auto cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy {selectedDoc.title} Number
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={onClose}
            className="text-xs w-full sm:w-auto cursor-pointer"
          >
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

interface AccountKycTabProps {
  readonly kycData?: MerchantKycData;
}

const AccountKycTab = memo(function AccountKycTab({
  kycData = DEFAULT_MERCHANT_KYC,
}: AccountKycTabProps) {
  const [selectedDoc, setSelectedDoc] = useState<DocumentModalState | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const isVerified = kycData.status === "Verified";

  return (
    <div className="space-y-6">
      <KycStatusBanner
        kycData={kycData}
        isVerified={isVerified}
        copiedField={copiedField}
        onCopy={handleCopy}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KycPersonalDetailsCard
          kycData={kycData}
          isVerified={isVerified}
          copiedField={copiedField}
          onCopy={handleCopy}
        />
        <KycShopDetailsCard
          kycData={kycData}
          copiedField={copiedField}
          onCopy={handleCopy}
        />
      </div>

      <KycDocumentsGallery
        kycData={kycData}
        onSelectDoc={setSelectedDoc}
      />

      <KycDocumentPreviewDialog
        selectedDoc={selectedDoc}
        kycData={kycData}
        onClose={() => setSelectedDoc(null)}
        onCopy={handleCopy}
      />
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
  const [activeTab, setActiveTab] = useState<"general" | "kyc" | "security" | "preferences">(
    (initialTab as "general" | "kyc" | "security" | "preferences") || "general"
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
          variant={activeTab === "kyc" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("kyc")}
          className={`flex items-center gap-2 rounded-xl font-semibold cursor-pointer ${
            activeTab === "kyc"
              ? "shadow-sm shadow-primary/20"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileCheck className="w-4 h-4" />
          Account KYC
          <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] px-1.5 py-0">
            Verified
          </Badge>
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

          {activeTab === "kyc" && (
            <AccountKycTab kycData={profile.kyc || DEFAULT_MERCHANT_KYC} />
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
