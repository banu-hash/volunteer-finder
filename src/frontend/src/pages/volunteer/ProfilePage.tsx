import {
  useMyVolunteerProfile,
  useSaveVolunteerProfile,
} from "@/api/volunteers";
import { ExternalBlob } from "@/backend";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { SkillTag } from "@/components/shared/SkillTag";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/stores/authStore";
import type { Location, VolunteerProfileInput } from "@/types";
import {
  Camera,
  ListChecks,
  Loader2,
  MapPin,
  Navigation,
  Plus,
  Star,
  User,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function VolunteerProfilePage() {
  const { data: profile, isLoading } = useMyVolunteerProfile();
  const saveProfile = useSaveVolunteerProfile();
  const { setName } = useAuthStore();

  const [name, setNameVal] = useState("");
  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [location, setLocation] = useState<Location | undefined>(undefined);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoBlob, setPhotoBlob] = useState<ExternalBlob | undefined>(
    undefined,
  );
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile) {
      setNameVal(profile.name ?? "");
      setBio(profile.bio ?? "");
      setAvailability(profile.availability ?? "");
      setSkills(profile.skills ?? []);
      setLocation(profile.location);
      if (profile.profilePhoto) {
        setPhotoPreview(profile.profilePhoto.getDirectURL());
      }
    }
  }, [profile]);

  function addSkill() {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills((prev) => [...prev, s]);
    }
    setSkillInput("");
  }

  function removeSkill(skill: string) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }

  function handleSkillKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }

  async function detectGPS() {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported by your browser");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          displayName: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
        });
        setGpsLoading(false);
        toast.success("Location detected!");
      },
      () => {
        toast.error("Failed to detect location");
        setGpsLoading(false);
      },
    );
  }

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    const bytes = new Uint8Array(await file.arrayBuffer());
    setPhotoBlob(ExternalBlob.fromBytes(bytes));
    e.target.value = "";
  }

  async function handleSave() {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }
    const input: VolunteerProfileInput = {
      name: name.trim(),
      bio: bio.trim(),
      availability: availability.trim(),
      skills,
      location,
      profilePhoto: photoBlob,
    };
    try {
      await saveProfile.mutateAsync(input);
      setName(name.trim());
      toast.success("Profile saved successfully!");
    } catch {
      toast.error("Failed to save profile");
    }
  }

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[400px]"
        data-ocid="profile.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading profile..." />
      </div>
    );
  }

  return (
    <div
      className="max-w-2xl mx-auto p-4 md:p-6 space-y-6"
      data-ocid="volunteer.profile.page"
    >
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          My Profile
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Keep your profile updated to get better task matches
        </p>
      </div>

      {/* Stats */}
      {profile && (
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: <ListChecks size={16} className="text-primary" />,
              value: profile.totalTasksCompleted.toString(),
              label: "Completed",
            },
            {
              icon: <Star size={16} className="text-accent fill-accent" />,
              value: profile.rating.toFixed(1),
              label: "Rating",
            },
            {
              icon: <User size={16} className="text-success" />,
              value: profile.isActive ? "Active" : "Inactive",
              label: "Status",
            },
          ].map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="py-3 px-2">
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <div className="font-display font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Profile Photo */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h2 className="font-display font-semibold text-base mb-4">
          Profile Photo
        </h2>
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-muted overflow-hidden border border-border flex-shrink-0">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <Camera size={28} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoSelect}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => photoInputRef.current?.click()}
              data-ocid="profile.photo.upload_button"
            >
              <Camera size={14} className="mr-1.5" />
              {photoPreview ? "Change Photo" : "Upload Photo"}
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="font-display font-semibold text-base">
          Basic Information
        </h2>

        <div className="space-y-1.5">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setNameVal(e.target.value)}
            placeholder="Your full name"
            data-ocid="profile.name_input"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="bio">Bio / Experience</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Describe your volunteer experience and motivation..."
            rows={4}
            data-ocid="profile.bio_textarea"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="availability">Availability</Label>
          <Input
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            placeholder="e.g. Weekends, Mon–Wed evenings"
            data-ocid="profile.availability_input"
          />
        </div>
      </div>

      {/* Skills */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="font-display font-semibold text-base">Skills</h2>

        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleSkillKeyDown}
            placeholder="Add a skill (e.g. Teaching, Medical)"
            className="flex-1"
            data-ocid="profile.skill_input"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSkill}
            disabled={!skillInput.trim()}
            data-ocid="profile.add_skill_button"
          >
            <Plus size={14} />
          </Button>
        </div>

        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-1.5 bg-primary/10 border border-primary/30 rounded-lg px-2.5 py-1"
              >
                <SkillTag
                  skill={skill}
                  variant="outline"
                  className="border-0 bg-transparent p-0 text-xs"
                />
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No skills added yet. Add some to improve your task matches.
          </p>
        )}
      </div>

      {/* Location */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h2 className="font-display font-semibold text-base">Location</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="lat">Latitude</Label>
            <Input
              id="lat"
              type="number"
              step="any"
              value={location?.lat ?? ""}
              onChange={(e) =>
                setLocation((prev) => ({
                  lat: Number.parseFloat(e.target.value) || 0,
                  lng: prev?.lng ?? 0,
                  displayName: prev?.displayName ?? "",
                }))
              }
              placeholder="e.g. 12.9716"
              data-ocid="profile.location_lat_input"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lng">Longitude</Label>
            <Input
              id="lng"
              type="number"
              step="any"
              value={location?.lng ?? ""}
              onChange={(e) =>
                setLocation((prev) => ({
                  lat: prev?.lat ?? 0,
                  lng: Number.parseFloat(e.target.value) || 0,
                  displayName: prev?.displayName ?? "",
                }))
              }
              placeholder="e.g. 77.5946"
              data-ocid="profile.location_lng_input"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="displayName">Location Name</Label>
          <Input
            id="displayName"
            value={location?.displayName ?? ""}
            onChange={(e) =>
              setLocation((prev) => ({
                lat: prev?.lat ?? 0,
                lng: prev?.lng ?? 0,
                displayName: e.target.value,
              }))
            }
            placeholder="e.g. Bangalore, Karnataka"
            data-ocid="profile.location_input"
          />
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={detectGPS}
          disabled={gpsLoading}
          className="flex items-center gap-2"
          data-ocid="profile.gps_detect_button"
        >
          {gpsLoading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Navigation size={14} />
          )}
          {gpsLoading ? "Detecting..." : "Detect My Location"}
        </Button>

        {location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2">
            <MapPin size={14} className="text-primary flex-shrink-0" />
            <span className="truncate">
              {location.displayName ||
                `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`}
            </span>
          </div>
        )}
      </div>

      {/* Save */}
      <div className="flex items-center justify-end gap-3 pb-6">
        <Button
          onClick={handleSave}
          disabled={saveProfile.isPending}
          size="lg"
          className="min-w-32"
          data-ocid="profile.save_button"
        >
          {saveProfile.isPending ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Saving...
            </>
          ) : (
            "Save Profile"
          )}
        </Button>
      </div>
    </div>
  );
}
