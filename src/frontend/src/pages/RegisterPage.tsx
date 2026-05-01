import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/stores/authStore";
import type { AppRole } from "@/types";
import { UserRole__1 } from "@/types";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import { Building2, Shield, UserCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface RegisterForm {
  name: string;
  role: "volunteer" | "ngo";
  ngoName?: string;
  ngoEmail?: string;
  ngoDescription?: string;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated, isInitializing, isLoggingIn, identity } =
    useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);
  const { setAuth } = useAuthStore();
  const [step, setStep] = useState<"auth" | "profile">("auth");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    defaultValues: { role: "volunteer" },
  });

  const selectedRole = watch("role");

  // If user just logged in, move to profile step
  if (isAuthenticated && step === "auth") {
    setStep("profile");
  }

  const onSubmit = async (data: RegisterForm) => {
    if (!actor || !identity) {
      toast.error("Please sign in first");
      return;
    }
    setIsSubmitting(true);
    try {
      const principalStr = identity.getPrincipal().toString();
      const appRole: AppRole = data.role === "ngo" ? "ngo" : "volunteer";

      await actor
        .assignUserRole(identity.getPrincipal(), UserRole__1.volunteer)
        .catch(() => {});

      if (data.role === "volunteer") {
        await actor.saveMyVolunteerProfile({
          name: data.name,
          bio: "",
          availability: "weekends",
          skills: [],
        });
      } else if (data.role === "ngo" && data.ngoName && data.ngoEmail) {
        await actor.registerNGO({
          name: data.ngoName,
          description: data.ngoDescription || "",
          website: "",
          contactEmail: data.ngoEmail,
        });
      }

      setAuth(principalStr, appRole, data.name);
      toast.success("Account created successfully!");

      if (appRole === "ngo") navigate({ to: "/ngo/dashboard" });
      else navigate({ to: "/volunteer/dashboard" });
    } catch {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-elevated">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            VMS Connect
          </h1>
          <p className="text-muted-foreground text-sm">Create your account</p>
        </div>

        <Card className="shadow-elevated">
          <CardHeader className="pb-4">
            <h2 className="font-display font-semibold text-lg text-foreground">
              {step === "auth" ? "Get started" : "Complete your profile"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {step === "auth"
                ? "Sign in with Internet Identity to create your account"
                : "Tell us about yourself to get started"}
            </p>
          </CardHeader>
          <CardContent>
            {step === "auth" ? (
              <div className="space-y-4">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => login()}
                  disabled={isInitializing || isLoggingIn}
                  data-ocid="register.auth_button"
                >
                  {isInitializing
                    ? "Initializing..."
                    : isLoggingIn
                      ? "Signing in..."
                      : "Sign in with Internet Identity"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary hover:underline"
                    data-ocid="register.login_link"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                data-ocid="register.form"
              >
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    I want to join as
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-smooth ${
                        selectedRole === "volunteer"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        value="volunteer"
                        {...register("role")}
                        className="sr-only"
                        data-ocid="register.role_volunteer"
                      />
                      <UserCheck size={20} />
                      <span className="text-xs font-medium">Volunteer</span>
                    </label>
                    <label
                      className={`flex flex-col items-center gap-2 p-3 rounded-lg border cursor-pointer transition-smooth ${
                        selectedRole === "ngo"
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border text-muted-foreground hover:border-muted-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        value="ngo"
                        {...register("role")}
                        className="sr-only"
                        data-ocid="register.role_ngo"
                      />
                      <Building2 size={20} />
                      <span className="text-xs font-medium">
                        NGO / Organization
                      </span>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name">Your name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Alex Johnson"
                    {...register("name", { required: "Name is required" })}
                    data-ocid="register.name_input"
                  />
                  {errors.name && (
                    <p
                      className="text-xs text-destructive"
                      data-ocid="register.name.field_error"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* NGO-specific fields */}
                {selectedRole === "ngo" && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="ngoName">Organization name</Label>
                      <Input
                        id="ngoName"
                        placeholder="e.g. City Green Initiative"
                        {...register("ngoName", {
                          required:
                            selectedRole === "ngo"
                              ? "Organization name is required"
                              : false,
                        })}
                        data-ocid="register.ngo_name_input"
                      />
                      {errors.ngoName && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="register.ngo_name.field_error"
                        >
                          {errors.ngoName.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="ngoEmail">Contact email</Label>
                      <Input
                        id="ngoEmail"
                        type="email"
                        placeholder="contact@organization.org"
                        {...register("ngoEmail", {
                          required:
                            selectedRole === "ngo"
                              ? "Contact email is required"
                              : false,
                        })}
                        data-ocid="register.ngo_email_input"
                      />
                      {errors.ngoEmail && (
                        <p
                          className="text-xs text-destructive"
                          data-ocid="register.ngo_email.field_error"
                        >
                          {errors.ngoEmail.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !actor || isFetching}
                  data-ocid="register.submit_button"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
