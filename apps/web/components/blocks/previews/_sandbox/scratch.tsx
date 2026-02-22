/**
 * Sandbox Scratch Component
 *
 * Edit this file to test new components in the playground.
 * Open /playground in your browser and switch to "Sandbox" mode.
 *
 * This file is for development only and should not be committed
 * with real component code — treat it as a scratch pad.
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Scratch(): React.ReactElement {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sandbox</CardTitle>
        <CardDescription>
          Edit this file to test your component
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          File: <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">components/blocks/previews/_sandbox/scratch.tsx</code>
        </p>
        <Button>Example Button</Button>
      </CardContent>
    </Card>
  );
}
