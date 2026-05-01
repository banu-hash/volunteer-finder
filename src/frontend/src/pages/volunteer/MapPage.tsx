import { useAcceptTask, useAllTasks } from "@/api/tasks";
import { useMyVolunteerProfile } from "@/api/volunteers";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { MatchScoreBadge } from "@/components/shared/MatchScoreBadge";
import { SkillTag } from "@/components/shared/SkillTag";
import { Button } from "@/components/ui/button";
import { MapFilters } from "@/components/volunteer/MapFilters";
import type { MapFiltersState } from "@/components/volunteer/MapFilters";
import { TaskPriority } from "@/types";
import type { TaskPublic } from "@/types";
import { format } from "date-fns";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Calendar, Filter, Locate, MapPin, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { toast } from "sonner";

// Fix leaflet default icon issue with bundlers
(L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl = undefined;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const urgentIcon = new L.DivIcon({
  className: "",
  html: '<div style="width:28px;height:28px;background:oklch(0.78 0.17 68);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
});

const normalIcon = new L.DivIcon({
  className: "",
  html: '<div style="width:28px;height:28px;background:oklch(0.68 0.16 193);border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.4)"></div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -30],
});

function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function RecenterButton({ center }: { center: [number, number] }) {
  const map = useMap();
  return (
    <button
      type="button"
      onClick={() => map.setView(center, 11)}
      className="leaflet-control bg-card border border-border rounded-lg px-3 py-2 text-xs font-medium text-foreground flex items-center gap-1.5 hover:bg-muted transition-smooth shadow-card"
      aria-label="Center on my location"
      data-ocid="map.recenter_button"
    >
      <Locate size={14} className="text-primary" />
      My Location
    </button>
  );
}

export default function VolunteerMapPage() {
  const { data: tasks = [], isLoading } = useAllTasks();
  const { data: profile } = useMyVolunteerProfile();
  const acceptTask = useAcceptTask();

  const [filters, setFilters] = useState<MapFiltersState>({
    maxDistance: 50,
    skills: [],
    urgentOnly: false,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number]>([
    20.5937, 78.9629,
  ]);

  // Use volunteer's saved location or browser geolocation
  useEffect(() => {
    if (profile?.location) {
      setUserLocation([profile.location.lat, profile.location.lng]);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, [profile]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (!t.location) return false;
      if (filters.urgentOnly && t.priority !== TaskPriority.urgent)
        return false;
      const dist = haversineKm(
        userLocation[0],
        userLocation[1],
        t.location.lat,
        t.location.lng,
      );
      if (dist > filters.maxDistance) return false;
      if (filters.skills.length > 0) {
        const hasSkill = filters.skills.some((fs) =>
          t.requiredSkills.some((ts) =>
            ts.toLowerCase().includes(fs.toLowerCase()),
          ),
        );
        if (!hasSkill) return false;
      }
      return true;
    });
  }, [tasks, filters, userLocation]);

  async function handleAccept(task: TaskPublic) {
    try {
      await acceptTask.mutateAsync(task.id);
      toast.success(`Task "${task.title}" accepted!`);
    } catch {
      toast.error("Failed to accept task");
    }
  }

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[400px]"
        data-ocid="map.loading_state"
      >
        <LoadingSpinner size="lg" label="Loading map..." />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden"
      data-ocid="volunteer.map.page"
    >
      {/* Map header */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border flex-shrink-0 gap-3 flex-wrap">
        <div>
          <h1 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
            <MapPin size={20} className="text-primary" />
            Task Map
          </h1>
          <p className="text-xs text-muted-foreground">
            {filteredTasks.length} tasks nearby
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1.5"
          data-ocid="map.filters.open_modal_button"
        >
          <Filter size={14} />
          Filters
          {(filters.skills.length > 0 ||
            filters.urgentOnly ||
            filters.maxDistance < 50) && (
            <span className="bg-primary text-primary-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center ml-0.5">
              {filters.skills.length +
                (filters.urgentOnly ? 1 : 0) +
                (filters.maxDistance < 50 ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Map */}
        <div className="flex-1 relative z-0">
          <MapContainer
            center={userLocation}
            zoom={8}
            style={{ height: "100%", width: "100%" }}
            className="rounded-none"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <div
              className="leaflet-top leaflet-right"
              style={{ marginTop: "80px", marginRight: "10px" }}
            >
              <RecenterButton center={userLocation} />
            </div>

            {/* User location marker */}
            <Marker
              position={userLocation}
              icon={
                new L.DivIcon({
                  className: "",
                  html: '<div style="width:16px;height:16px;background:oklch(0.68 0.16 193);border-radius:50%;border:3px solid white;box-shadow:0 0 0 3px oklch(0.68 0.16 193 / 0.3)"></div>',
                  iconSize: [16, 16],
                  iconAnchor: [8, 8],
                })
              }
            >
              <Popup>
                <div className="text-sm font-medium">Your Location</div>
              </Popup>
            </Marker>

            {/* Task markers */}
            {filteredTasks.map((task) => {
              if (!task.location) return null;
              const dist = haversineKm(
                userLocation[0],
                userLocation[1],
                task.location.lat,
                task.location.lng,
              );
              const deadline = new Date(Number(task.deadline / 1_000_000n));
              return (
                <Marker
                  key={task.id.toString()}
                  position={[task.location.lat, task.location.lng]}
                  icon={
                    task.priority === TaskPriority.urgent
                      ? urgentIcon
                      : normalIcon
                  }
                >
                  <Popup maxWidth={280}>
                    <div className="space-y-2 min-w-[220px]">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm leading-snug">
                          {task.title}
                        </h3>
                        {task.priority === TaskPriority.urgent && (
                          <span
                            style={{
                              background: "oklch(var(--chart-2) / 0.15)",
                              color: "oklch(var(--chart-2))",
                            }}
                            className="text-xs px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                          >
                            Urgent
                          </span>
                        )}
                      </div>
                      <div
                        style={{ color: "oklch(var(--muted-foreground))" }}
                        className="text-xs space-y-1"
                      >
                        <div className="flex items-center gap-1">
                          <MapPin size={10} />
                          {task.location.displayName} · {dist.toFixed(1)} km
                          away
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={10} />
                          {format(deadline, "MMM d, yyyy")}
                        </div>
                      </div>
                      {task.requiredSkills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {task.requiredSkills.slice(0, 3).map((s) => (
                            <span
                              key={s}
                              style={{
                                background: "oklch(var(--chart-1) / 0.12)",
                                color: "oklch(var(--chart-1))",
                              }}
                              className="text-xs px-1.5 py-0.5 rounded"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleAccept(task)}
                        disabled={acceptTask.isPending}
                        style={{
                          background: "oklch(var(--primary))",
                          color: "oklch(var(--primary-foreground))",
                        }}
                        className="w-full mt-1 text-xs font-medium py-1.5 rounded hover:opacity-90 transition-opacity disabled:opacity-50"
                        data-ocid="map.task.accept_button"
                      >
                        Accept Task
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Filter sidebar */}
        {showFilters && (
          <div className="absolute top-2 right-2 z-[1000] w-72">
            <MapFilters
              filters={filters}
              onChange={setFilters}
              onClose={() => setShowFilters(false)}
            />
          </div>
        )}
      </div>

      {/* No tasks banner */}
      {filteredTasks.length === 0 && !isLoading && (
        <div className="flex-shrink-0 p-4 bg-muted/30 border-t border-border">
          <EmptyState
            icon={<MapPin size={24} />}
            title="No tasks in this area"
            description="Try increasing the distance or adjusting skill filters."
            action={{
              label: "Reset Filters",
              onClick: () =>
                setFilters({ maxDistance: 50, skills: [], urgentOnly: false }),
            }}
            data-ocid="map.empty_state"
          />
        </div>
      )}
    </div>
  );
}
