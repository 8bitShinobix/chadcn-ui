"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Shield, Smartphone, Monitor, MapPin, LogOut } from "lucide-react";

export default function SecurityFeatureRich() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-2xl font-bold">Security</h2>
        <p className="text-muted-foreground mt-1 text-sm">Manage your security preferences.</p>
      </div>
      <Separator className="my-6" />

      {/* Change Password Section */}
      <div>
        <h3 className="text-lg font-semibold">Change Password</h3>
        <form className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" placeholder="Enter current password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" placeholder="Enter new password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="Confirm new password" />
          </div>
          <Button type="submit">Update Password</Button>
        </form>
      </div>

      <Separator className="mt-8" />

      {/* Two-Factor Authentication Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold">Two-Factor Authentication</h3>
              <Shield className="text-muted-foreground h-4 w-4" />
            </div>
            <p className="text-muted-foreground mt-1 text-sm">
              Add an extra layer of security to your account.
            </p>
          </div>
          <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
        </div>
        {twoFactorEnabled ? (
          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
            <Smartphone className="h-4 w-4" />
            <span>Authenticator app configured</span>
          </div>
        ) : (
          <p className="text-muted-foreground mt-3 text-sm">
            Set up two-factor authentication using an authenticator app for enhanced security.
          </p>
        )}
      </div>

      <Separator className="mt-8" />

      {/* Active Sessions Section */}
      <div className="mt-6">
        <div>
          <h3 className="text-lg font-semibold">Active Sessions</h3>
          <p className="text-muted-foreground mt-1 text-sm">Manage your logged-in devices.</p>
        </div>
        <div className="mt-4 space-y-3">
          {/* Current Session */}
          <Card className="rounded-lg py-0 shadow-none">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Monitor className="text-muted-foreground h-5 w-5" />
                <div>
                  <div className="text-sm font-medium">MacBook Pro — Chrome</div>
                  <div className="text-muted-foreground flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    <span>San Francisco, US · 2 min ago</span>
                  </div>
                </div>
              </div>
              <Badge variant="secondary">Current</Badge>
            </CardContent>
          </Card>

          {/* iPhone Session */}
          <Card className="rounded-lg py-0 shadow-none">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="text-muted-foreground h-5 w-5" />
                <div>
                  <div className="text-sm font-medium">iPhone 15 — Safari</div>
                  <div className="text-muted-foreground flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    <span>New York, US · 1 hour ago</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Revoke
              </Button>
            </CardContent>
          </Card>

          {/* Windows Session */}
          <Card className="rounded-lg py-0 shadow-none">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Monitor className="text-muted-foreground h-5 w-5" />
                <div>
                  <div className="text-sm font-medium">Windows PC — Firefox</div>
                  <div className="text-muted-foreground flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    <span>London, UK · 3 days ago</span>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Revoke
              </Button>
            </CardContent>
          </Card>
        </div>
        <Button variant="outline" size="sm" className="mt-3">
          <LogOut className="mr-2 h-4 w-4" />
          Revoke All Other Sessions
        </Button>
      </div>

      <Separator className="mt-8" />

      {/* Login History Section */}
      <div className="mt-6">
        <div>
          <h3 className="text-lg font-semibold">Login History</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Recent login activity on your account.
          </p>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between border-b py-2 text-sm last:border-0">
            <span>Successful login from Chrome on macOS</span>
            <span className="text-muted-foreground">Jan 15, 2024 10:23 AM</span>
          </div>
          <div className="flex items-center justify-between border-b py-2 text-sm last:border-0">
            <span>Successful login from Safari on iOS</span>
            <span className="text-muted-foreground">Jan 14, 2024 3:45 PM</span>
          </div>
          <div className="flex items-center justify-between border-b py-2 text-sm last:border-0">
            <span>Successful login from Firefox on Windows</span>
            <span className="text-muted-foreground">Jan 12, 2024 9:12 AM</span>
          </div>
          <div className="flex items-center justify-between border-b py-2 text-sm last:border-0">
            <span>Successful login from Chrome on macOS</span>
            <span className="text-muted-foreground">Jan 10, 2024 2:30 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
