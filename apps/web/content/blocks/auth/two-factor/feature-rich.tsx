"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TwoFactorForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [backupCode, setBackupCode] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isLocked = attempts >= 5;

  const submitCode = useCallback(
    async (code: string, isBackup: boolean) => {
      if (isLocked) return;

      setIsLoading(true);
      console.log("2FA verification:", { code, isBackup, rememberDevice });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);

      // Simulate failure for demo
      setAttempts((prev) => prev + 1);
      setError("Invalid code. Please try again.");

      if (!isBackup) {
        setOtp(Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    },
    [isLocked, rememberDevice]
  );

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when last digit is entered
    if (value && index === 5 && !useBackupCode) {
      const code = newOtp.join("");
      if (code.length === 6) {
        submitCode(code, false);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i];
    }
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();

    // Auto-submit if full code was pasted
    if (pasted.length === 6 && !useBackupCode) {
      submitCode(newOtp.join(""), false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (useBackupCode) {
      if (!backupCode.trim()) {
        setError("Please enter your backup code");
        return;
      }
      await submitCode(backupCode, true);
    }
    // OTP auto-submits via useEffect
  };

  const toggleBackupCode = () => {
    setUseBackupCode(!useBackupCode);
    setError("");
    setOtp(Array(6).fill(""));
    setBackupCode("");
  };

  return (
    <div className="mx-auto w-full max-w-sm">
      <div className="mb-8 text-center">
        <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <svg
            className="text-foreground h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          {useBackupCode ? "Enter backup code" : "Two-factor authentication"}
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {useBackupCode
            ? "Enter one of your backup recovery codes"
            : "Enter the 6-digit code from your authenticator app"}
        </p>
      </div>

      {isLocked ? (
        <div className="text-center">
          <div className="bg-destructive/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
            <svg
              className="text-destructive h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <p className="text-destructive text-sm font-medium">Too many failed attempts</p>
          <p className="text-muted-foreground mt-1 text-sm">
            Your account has been temporarily locked. Please contact support for assistance.
          </p>
          <Button variant="outline" className="mt-4 w-full" asChild>
            <a href="#">Contact Support</a>
          </Button>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="space-y-4">
            {useBackupCode ? (
              <div className="space-y-2">
                <Label htmlFor="backupCode">Backup Code</Label>
                <Input
                  id="backupCode"
                  type="text"
                  value={backupCode}
                  onChange={(e) => {
                    setBackupCode(e.target.value);
                    setError("");
                  }}
                  placeholder="xxxx-xxxx-xxxx"
                  className="font-mono"
                />
              </div>
            ) : (
              <div className="flex justify-center gap-2" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-12 w-12 text-center text-lg"
                    aria-label={`Digit ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {error && <p className="text-destructive text-center text-sm">{error}</p>}

            {attempts >= 3 && !isLocked && (
              <p className="text-center text-xs text-orange-500">
                Warning: {5 - attempts} attempt(s) remaining before lockout
              </p>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberDevice"
                className="border-input h-4 w-4 rounded"
                checked={rememberDevice}
                onChange={(e) => setRememberDevice(e.target.checked)}
              />
              <Label htmlFor="rememberDevice" className="text-sm font-normal">
                Remember this device for 30 days
              </Label>
            </div>

            {useBackupCode && (
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
            )}
          </form>

          <div className="mt-4 space-y-2 text-center">
            <button
              type="button"
              onClick={toggleBackupCode}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              {useBackupCode ? "Use authenticator code instead" : "Use a backup code instead"}
            </button>
            <p className="text-muted-foreground text-sm">
              <a href="#" className="hover:text-foreground">
                Contact support
              </a>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
