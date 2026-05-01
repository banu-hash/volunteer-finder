import { c as createLucideIcon, u as useAuthStore, r as reactExports, j as jsxRuntimeExports, d as LoadingSpinner, L as ListChecks, U as User, A as Card, D as CardContent, B as Button, F as Label, I as Input, X, M as MapPin, h as ue, E as ExternalBlob } from "./index-D4bjddjr.js";
import { u as useMyVolunteerProfile, a as useSaveVolunteerProfile } from "./volunteers-DGSeelEA.js";
import { S as SkillTag } from "./SkillTag-CgRS11xk.js";
import { T as Textarea } from "./textarea-BzQxctt9.js";
import { S as Star } from "./star-Cm4lNMeQ.js";
import { P as Plus } from "./plus-CGiSCtCP.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["polygon", { points: "3 11 22 2 13 21 11 13 3 11", key: "1ltx0t" }]
];
const Navigation = createLucideIcon("navigation", __iconNode);
function VolunteerProfilePage() {
  const { data: profile, isLoading } = useMyVolunteerProfile();
  const saveProfile = useSaveVolunteerProfile();
  const { setName } = useAuthStore();
  const [name, setNameVal] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [availability, setAvailability] = reactExports.useState("");
  const [skills, setSkills] = reactExports.useState([]);
  const [skillInput, setSkillInput] = reactExports.useState("");
  const [location, setLocation] = reactExports.useState(void 0);
  const [gpsLoading, setGpsLoading] = reactExports.useState(false);
  const [photoPreview, setPhotoPreview] = reactExports.useState(null);
  const [photoBlob, setPhotoBlob] = reactExports.useState(
    void 0
  );
  const photoInputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
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
  function removeSkill(skill) {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }
  function handleSkillKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  }
  async function detectGPS() {
    if (!navigator.geolocation) {
      ue.error("Geolocation not supported by your browser");
      return;
    }
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          displayName: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
        });
        setGpsLoading(false);
        ue.success("Location detected!");
      },
      () => {
        ue.error("Failed to detect location");
        setGpsLoading(false);
      }
    );
  }
  async function handlePhotoSelect(e) {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      var _a2;
      return setPhotoPreview((_a2 = ev.target) == null ? void 0 : _a2.result);
    };
    reader.readAsDataURL(file);
    const bytes = new Uint8Array(await file.arrayBuffer());
    setPhotoBlob(ExternalBlob.fromBytes(bytes));
    e.target.value = "";
  }
  async function handleSave() {
    if (!name.trim()) {
      ue.error("Name is required");
      return;
    }
    const input = {
      name: name.trim(),
      bio: bio.trim(),
      availability: availability.trim(),
      skills,
      location,
      profilePhoto: photoBlob
    };
    try {
      await saveProfile.mutateAsync(input);
      setName(name.trim());
      ue.success("Profile saved successfully!");
    } catch {
      ue.error("Failed to save profile");
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center min-h-[400px]",
        "data-ocid": "profile.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Loading profile..." })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-2xl mx-auto p-4 md:p-6 space-y-6",
      "data-ocid": "volunteer.profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "My Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Keep your profile updated to get better task matches" })
        ] }),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { size: 16, className: "text-primary" }),
            value: profile.totalTasksCompleted.toString(),
            label: "Completed"
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 16, className: "text-accent fill-accent" }),
            value: profile.rating.toFixed(1),
            label: "Rating"
          },
          {
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, className: "text-success" }),
            value: profile.isActive ? "Active" : "Inactive",
            label: "Status"
          }
        ].map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-3 px-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-1", children: stat.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-bold text-foreground", children: stat.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: stat.label })
        ] }) }, stat.label)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base mb-4", children: "Profile Photo" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-2xl bg-muted overflow-hidden border border-border flex-shrink-0", children: photoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: photoPreview,
                alt: "Profile",
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 28 }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  ref: photoInputRef,
                  type: "file",
                  accept: "image/*",
                  className: "hidden",
                  onChange: handlePhotoSelect
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => {
                    var _a;
                    return (_a = photoInputRef.current) == null ? void 0 : _a.click();
                  },
                  "data-ocid": "profile.photo.upload_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { size: 14, className: "mr-1.5" }),
                    photoPreview ? "Change Photo" : "Upload Photo"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "JPG, PNG up to 5MB" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base", children: "Basic Information" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "Full Name *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "name",
                value: name,
                onChange: (e) => setNameVal(e.target.value),
                placeholder: "Your full name",
                "data-ocid": "profile.name_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bio", children: "Bio / Experience" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                id: "bio",
                value: bio,
                onChange: (e) => setBio(e.target.value),
                placeholder: "Describe your volunteer experience and motivation...",
                rows: 4,
                "data-ocid": "profile.bio_textarea"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "availability", children: "Availability" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "availability",
                value: availability,
                onChange: (e) => setAvailability(e.target.value),
                placeholder: "e.g. Weekends, Mon–Wed evenings",
                "data-ocid": "profile.availability_input"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base", children: "Skills" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                value: skillInput,
                onChange: (e) => setSkillInput(e.target.value),
                onKeyDown: handleSkillKeyDown,
                placeholder: "Add a skill (e.g. Teaching, Medical)",
                className: "flex-1",
                "data-ocid": "profile.skill_input"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                size: "sm",
                onClick: addSkill,
                disabled: !skillInput.trim(),
                "data-ocid": "profile.add_skill_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 })
              }
            )
          ] }),
          skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-1.5 bg-primary/10 border border-primary/30 rounded-lg px-2.5 py-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SkillTag,
                  {
                    skill,
                    variant: "outline",
                    className: "border-0 bg-transparent p-0 text-xs"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeSkill(skill),
                    className: "text-muted-foreground hover:text-destructive transition-colors",
                    "aria-label": `Remove ${skill}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 })
                  }
                )
              ]
            },
            skill
          )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No skills added yet. Add some to improve your task matches." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base", children: "Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lat", children: "Latitude" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "lat",
                  type: "number",
                  step: "any",
                  value: (location == null ? void 0 : location.lat) ?? "",
                  onChange: (e) => setLocation((prev) => ({
                    lat: Number.parseFloat(e.target.value) || 0,
                    lng: (prev == null ? void 0 : prev.lng) ?? 0,
                    displayName: (prev == null ? void 0 : prev.displayName) ?? ""
                  })),
                  placeholder: "e.g. 12.9716",
                  "data-ocid": "profile.location_lat_input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "lng", children: "Longitude" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "lng",
                  type: "number",
                  step: "any",
                  value: (location == null ? void 0 : location.lng) ?? "",
                  onChange: (e) => setLocation((prev) => ({
                    lat: (prev == null ? void 0 : prev.lat) ?? 0,
                    lng: Number.parseFloat(e.target.value) || 0,
                    displayName: (prev == null ? void 0 : prev.displayName) ?? ""
                  })),
                  placeholder: "e.g. 77.5946",
                  "data-ocid": "profile.location_lng_input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "displayName", children: "Location Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "displayName",
                value: (location == null ? void 0 : location.displayName) ?? "",
                onChange: (e) => setLocation((prev) => ({
                  lat: (prev == null ? void 0 : prev.lat) ?? 0,
                  lng: (prev == null ? void 0 : prev.lng) ?? 0,
                  displayName: e.target.value
                })),
                placeholder: "e.g. Bangalore, Karnataka",
                "data-ocid": "profile.location_input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: detectGPS,
              disabled: gpsLoading,
              className: "flex items-center gap-2",
              "data-ocid": "profile.gps_detect_button",
              children: [
                gpsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Navigation, { size: 14 }),
                gpsLoading ? "Detecting..." : "Detect My Location"
              ]
            }
          ),
          location && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 14, className: "text-primary flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: location.displayName || `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end gap-3 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleSave,
            disabled: saveProfile.isPending,
            size: "lg",
            className: "min-w-32",
            "data-ocid": "profile.save_button",
            children: saveProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 16, className: "animate-spin mr-2" }),
              "Saving..."
            ] }) : "Save Profile"
          }
        ) })
      ]
    }
  );
}
export {
  VolunteerProfilePage as default
};
