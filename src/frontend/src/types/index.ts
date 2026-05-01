export type {
  Location,
  VolunteerProfilePublic,
  NGOProfilePublic,
  NGOProfileInput,
  ActivityLog,
  VolunteerWithScore,
  TaskInput,
  VolunteerProfileInput,
  TaskPublic,
  TaskWithScore,
  NotificationPublic,
  PlatformStats,
  UserId,
  TaskId,
  NotificationId,
  Timestamp,
} from "@/backend";

export {
  NGOStatus,
  NotificationType,
  TaskPriority,
  TaskStatus,
  UserRole,
  UserRole__1,
} from "@/backend";

export type AppRole = "volunteer" | "ngo" | "superAdmin" | "unknown";

export interface AuthUser {
  principalId: string;
  role: AppRole;
  name: string;
  isAuthenticated: boolean;
}
