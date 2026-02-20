"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { AlertTriangle, Github, Trash2 } from "lucide-react";

export default function AccountFeatureRich() {
  return (
    <div className="mx-auto w-full max-w-2xl p-6">
      <div>
        <h2 className="text-2xl font-semibold">Account</h2>
        <p className="text-muted-foreground text-sm">Manage your account settings.</p>
      </div>
      <Separator className="mt-4" />

      <div className="mt-6 space-y-4">
        <h3 className="text-base font-semibold">General</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" defaultValue="johndoe" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="john@example.com" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select defaultValue="en">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select defaultValue="utc">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC</SelectItem>
                <SelectItem value="est">Eastern Time</SelectItem>
                <SelectItem value="pst">Pacific Time</SelectItem>
                <SelectItem value="cst">Central Time</SelectItem>
                <SelectItem value="jst">Japan Standard Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>

      <Separator className="mt-8" />

      <div className="mt-6 space-y-4">
        <h3 className="text-base font-semibold">Connected Accounts</h3>
        <p className="text-muted-foreground text-sm">
          Manage your connected accounts and integrations.
        </p>

        <Card className="rounded-lg py-0 shadow-none">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Github size={20} />
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-muted-foreground text-sm">github.com/johndoe</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg py-0 shadow-none">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full text-xs">
                G
              </div>
              <div>
                <p className="font-medium">Google</p>
                <p className="text-muted-foreground text-sm">john@example.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-lg py-0 shadow-none">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="bg-muted flex h-5 w-5 items-center justify-center rounded-full text-xs">
                S
              </div>
              <div>
                <p className="font-medium">Slack</p>
                <p className="text-muted-foreground text-sm">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </CardContent>
        </Card>
      </div>

      <Separator className="mt-8" />

      <Card className="border-destructive/50 mt-6 rounded-lg py-0 shadow-none">
        <CardContent className="space-y-4 p-4">
          <div>
            <h3 className="text-destructive text-base font-semibold">Danger Zone</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              Once you delete your account, there is no going back.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Deactivate Account</p>
              <p className="text-muted-foreground text-sm">Temporarily disable your account</p>
            </div>
            <Button variant="outline">Deactivate</Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-destructive h-4 w-4" />
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-muted-foreground text-sm">
                  Permanently delete your account and all data
                </p>
              </div>
            </div>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
