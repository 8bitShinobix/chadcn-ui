"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Camera, Check } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
  website: z.string().url("Please enter a valid URL").or(z.literal("")).optional(),
  location: z.string().optional(),
  timezone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSettings() {
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      bio: "Product designer...",
      website: "https://johndoe.com",
      location: "San Francisco, CA",
      timezone: "utc-8",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    console.log("Profile update:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <h2 className="text-lg font-semibold">Profile</h2>
      <p className="text-muted-foreground mt-1 text-sm">Manage your personal information.</p>
      <Separator className="mt-4" />
      <div className="mt-6 space-y-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-muted-foreground text-sm">john@example.com</p>
            <Button variant="outline" size="sm" className="mt-2">
              <Camera size={14} className="mr-2" />
              Change Avatar
            </Button>
          </div>
        </div>
        <Separator />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" {...register("firstName")} />
                {errors.firstName && (
                  <p className="text-destructive text-sm">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" {...register("lastName")} />
                {errors.lastName && (
                  <p className="text-destructive text-sm">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" className="min-h-[80px]" {...register("bio")} />
              {errors.bio && (
                <p className="text-destructive text-sm">{errors.bio.message}</p>
              )}
              <p className="text-muted-foreground text-xs">
                {watch("bio")?.length || 0}/500 characters
              </p>
            </div>
          </div>
          <Separator />
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Additional Details</h3>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" {...register("website")} />
              {errors.website && (
                <p className="text-destructive text-sm">{errors.website.message}</p>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...register("location")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select
                  defaultValue="utc-8"
                  onValueChange={(value) => setValue("timezone", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc-8">UTC-8 Pacific</SelectItem>
                    <SelectItem value="utc-5">UTC-5 Eastern</SelectItem>
                    <SelectItem value="utc-0">UTC+0 GMT</SelectItem>
                    <SelectItem value="utc-1">UTC+1 CET</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <Separator />
          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : isSaved ? (
                <>
                  <Check size={14} className="mr-2" />
                  Saved
                </>
              ) : "Save Changes"}
            </Button>
            <Button type="button" variant="outline">Cancel</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
