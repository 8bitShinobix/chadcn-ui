"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, ArrowRight, User, Settings, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// --- Per-step Zod schemas ---

const profileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z
    .string()
    .max(500, "Bio must be 500 characters or fewer")
    .optional()
    .or(z.literal("")),
});

const teamSchema = z.object({
  teamName: z.string().min(3, "Team name must be at least 3 characters"),
  inviteEmails: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const emails = val.split(",").map((e) => e.trim());
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emails.every((email) => emailRegex.test(email));
      },
      {
        message: "Please enter valid email addresses separated by commas",
      }
    ),
});

type ProfileData = z.infer<typeof profileSchema>;
type TeamData = z.infer<typeof teamSchema>;

export default function WizardFeatureRich() {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  // Step 0: Profile form
  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      bio: "",
    },
  });

  // Step 2: Team form
  const teamForm = useForm<TeamData>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      teamName: "",
      inviteEmails: "",
    },
  });

  const steps = [
    { icon: User, title: "Profile", description: "Basic info" },
    { icon: Settings, title: "Preferences", description: "Customize" },
    { icon: Users, title: "Team", description: "Invite members" },
    { icon: Check, title: "Complete", description: "All done" },
  ];

  const progress = ((step + 1) / 4) * 100;

  const handleNext = async () => {
    if (step === 0) {
      const valid = await profileForm.trigger();
      if (!valid) return;
    }

    if (step === 2) {
      const valid = await teamForm.trigger();
      if (!valid) return;
    }

    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handleFinish = async () => {
    setIsLoading(true);
    const profileData = profileForm.getValues();
    const teamData = teamForm.getValues();
    console.log("Onboarding complete:", { profileData, teamData });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden w-48 shrink-0 sm:block">
          <div className="space-y-1">
            {steps.map((s, i) => {
              const Icon = i < step ? Check : s.icon;
              return (
                <div
                  key={i}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                    i === step
                      ? "bg-muted font-medium"
                      : i < step
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <div>
                    <div>{s.title}</div>
                    <div className="text-xs">{s.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-muted-foreground mt-6 text-xs">
            Step {step + 1} of 4 · {Math.round(progress)}% complete
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="min-h-[300px]">
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">{steps[0].title}</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Tell us a bit about yourself
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    placeholder="Enter your full name"
                    {...profileForm.register("fullName")}
                  />
                  {profileForm.formState.errors.fullName && (
                    <p className="text-destructive text-sm">
                      {profileForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...profileForm.register("email")}
                  />
                  {profileForm.formState.errors.email && (
                    <p className="text-destructive text-sm">
                      {profileForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">
                    Bio <span className="text-muted-foreground text-xs">(optional)</span>
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself"
                    className="min-h-[80px]"
                    {...profileForm.register("bio")}
                  />
                  {profileForm.formState.errors.bio && (
                    <p className="text-destructive text-sm">
                      {profileForm.formState.errors.bio.message}
                    </p>
                  )}
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">{steps[1].title}</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Customize your experience
                  </p>
                </div>
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">UTC-8 (Pacific)</SelectItem>
                      <SelectItem value="utc-5">UTC-5 (Eastern)</SelectItem>
                      <SelectItem value="utc-0">UTC+0 (London)</SelectItem>
                      <SelectItem value="utc-1">UTC+1 (Berlin)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Notifications</Label>
                  <div
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                    className={cn(
                      "mt-1.5 flex w-full cursor-pointer items-center justify-between rounded-md border px-4 py-3 text-sm",
                      notificationsEnabled ? "border-primary bg-primary/10" : "border-input"
                    )}
                  >
                    <span>Enable email notifications</span>
                    <Switch
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">{steps[2].title}</h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Invite your team members
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    placeholder="Enter your team name"
                    {...teamForm.register("teamName")}
                  />
                  {teamForm.formState.errors.teamName && (
                    <p className="text-destructive text-sm">
                      {teamForm.formState.errors.teamName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invite-emails">
                    Invite Emails{" "}
                    <span className="text-muted-foreground text-xs">(optional)</span>
                  </Label>
                  <Input
                    id="invite-emails"
                    placeholder="Enter email addresses, separated by commas"
                    {...teamForm.register("inviteEmails")}
                  />
                  {teamForm.formState.errors.inviteEmails && (
                    <p className="text-destructive text-sm">
                      {teamForm.formState.errors.inviteEmails.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger className="mt-1.5 w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <Check className="h-8 w-8 text-foreground" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold">You&apos;re all set!</h2>
                  <p className="text-muted-foreground mt-2 max-w-md text-sm">
                    Your account has been created and configured. You can now start using the
                    platform.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t pt-4">
            {step > 0 && (
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            {step === 0 && <div />}
            <div className="flex gap-2">
              {step < 3 && (
                <Button variant="ghost" disabled={isLoading}>
                  Complete Later
                </Button>
              )}
              <Button
                onClick={() => (step < 3 ? handleNext() : handleFinish())}
                disabled={isLoading}
              >
                {step < 3 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : isLoading ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Finishing...
                  </>
                ) : (
                  "Finish"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
