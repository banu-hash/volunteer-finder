import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Location {
    lat: number;
    lng: number;
    displayName: string;
}
export type Timestamp = bigint;
export interface VolunteerProfilePublic {
    id: UserId;
    bio: string;
    ratingCount: bigint;
    name: string;
    createdAt: Timestamp;
    profilePhoto?: ExternalBlob;
    isActive: boolean;
    availability: string;
    updatedAt: Timestamp;
    rating: number;
    skills: Array<string>;
    location?: Location;
    totalTasksCompleted: bigint;
}
export interface NGOProfilePublic {
    id: UserId;
    status: NGOStatus;
    name: string;
    createdAt: Timestamp;
    description: string;
    isActive: boolean;
    website: string;
    updatedAt: Timestamp;
    contactEmail: string;
}
export interface NGOProfileInput {
    name: string;
    description: string;
    website: string;
    contactEmail: string;
}
export interface ActivityLog {
    id: bigint;
    action: string;
    userId: UserId;
    timestamp: Timestamp;
    details: string;
}
export interface VolunteerWithScore {
    matchScore: number;
    profile: VolunteerProfilePublic;
}
export type UserId = Principal;
export interface TaskInput {
    title: string;
    description: string;
    deadline: Timestamp;
    priority: TaskPriority;
    requiredSkills: Array<string>;
    location?: Location;
}
export interface VolunteerProfileInput {
    bio: string;
    name: string;
    profilePhoto?: ExternalBlob;
    availability: string;
    skills: Array<string>;
    location?: Location;
}
export interface TaskPublic {
    id: TaskId;
    status: TaskStatus;
    title: string;
    proofUrls: Array<ExternalBlob>;
    createdByNGO: UserId;
    createdAt: Timestamp;
    description: string;
    deadline: Timestamp;
    updatedAt: Timestamp;
    priority: TaskPriority;
    assignedVolunteer?: UserId;
    requiredSkills: Array<string>;
    location?: Location;
}
export type TaskId = bigint;
export interface TaskWithScore {
    task: TaskPublic;
    matchScore: number;
}
export type NotificationId = bigint;
export interface PlatformStats {
    totalVolunteers: bigint;
    totalTasks: bigint;
    completionRate: number;
    completedTasks: bigint;
    totalNGOs: bigint;
    pendingNGOs: bigint;
    verifiedTasks: bigint;
}
export interface NotificationPublic {
    id: NotificationId;
    userId: UserId;
    notificationType: NotificationType;
    createdAt: Timestamp;
    read: boolean;
    message: string;
}
export enum NGOStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum NotificationType {
    completion = "completion",
    assignment = "assignment",
    reminder = "reminder",
    rejection = "rejection",
    acceptance = "acceptance"
}
export enum TaskPriority {
    normal = "normal",
    urgent = "urgent"
}
export enum TaskStatus {
    verified = "verified",
    pending = "pending",
    completed = "completed",
    rejected = "rejected",
    accepted = "accepted"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserRole__1 {
    ngo = "ngo",
    superAdmin = "superAdmin",
    volunteer = "volunteer"
}
export interface backendInterface {
    acceptTask(taskId: TaskId): Promise<boolean>;
    approveNGO(userId: UserId, approve: boolean): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignUserRole(userId: UserId, role: UserRole__1): Promise<void>;
    assignVolunteer(taskId: TaskId, volunteerId: UserId): Promise<boolean>;
    createTask(input: TaskInput): Promise<TaskId>;
    deactivateNGO(userId: UserId): Promise<void>;
    deactivateVolunteer(userId: UserId): Promise<void>;
    deleteTask(taskId: TaskId): Promise<boolean>;
    filterVolunteersBySkills(skills: Array<string>): Promise<Array<VolunteerProfilePublic>>;
    getActivityLog(): Promise<Array<ActivityLog>>;
    getCallerUserRole(): Promise<UserRole>;
    getMatchScore(volunteerId: UserId, taskId: TaskId): Promise<number>;
    getMyNGOProfile(): Promise<NGOProfilePublic | null>;
    getMyNotifications(): Promise<Array<NotificationPublic>>;
    getMyRecommendedTasks(limit: bigint): Promise<Array<TaskWithScore>>;
    getMyVolunteerProfile(): Promise<VolunteerProfilePublic | null>;
    getNGOProfile(userId: UserId): Promise<NGOProfilePublic | null>;
    getPlatformStats(): Promise<PlatformStats>;
    getRecommendedTasks(volunteerId: UserId, limit: bigint): Promise<Array<TaskWithScore>>;
    getTask(taskId: TaskId): Promise<TaskPublic | null>;
    getTopVolunteers(taskId: TaskId, limit: bigint): Promise<Array<VolunteerWithScore>>;
    getVolunteerProfile(userId: UserId): Promise<VolunteerProfilePublic | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllTasks(): Promise<Array<TaskPublic>>;
    listMyNGOTasks(): Promise<Array<TaskPublic>>;
    listMyVolunteerTasks(): Promise<Array<TaskPublic>>;
    listNGOs(): Promise<Array<NGOProfilePublic>>;
    listPendingNGOs(): Promise<Array<NGOProfilePublic>>;
    listVolunteers(): Promise<Array<VolunteerProfilePublic>>;
    markAllNotificationsRead(): Promise<void>;
    markNotificationRead(notificationId: NotificationId): Promise<boolean>;
    markTaskCompleted(taskId: TaskId, proofs: Array<ExternalBlob>): Promise<boolean>;
    registerNGO(input: NGOProfileInput): Promise<void>;
    rejectTask(taskId: TaskId): Promise<boolean>;
    saveMyVolunteerProfile(input: VolunteerProfileInput): Promise<void>;
    updateMyNGOProfile(input: NGOProfileInput): Promise<void>;
    updateTask(taskId: TaskId, input: TaskInput): Promise<boolean>;
    verifyTask(taskId: TaskId, approved: boolean): Promise<boolean>;
}
