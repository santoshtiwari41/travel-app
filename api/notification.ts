import { apiClient } from "./client";

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  createdAt?: string;
  read?: boolean;
  successCount?: number;
  failedCount?: number;
  totalCount?: number;
}

export type NotificationsResponse = {
  notifications: NotificationItem[];
  unreadCount: number;
};

export async function getNotifications(): Promise<NotificationsResponse> {
  const res = await apiClient.get('/notifications');
  const data = res.data as NotificationsResponse;
  return {
    notifications: data?.notifications ?? [],
    unreadCount: data?.unreadCount ?? 0,
  };
}

export async function readAllNotifications() {
  const res = await apiClient.post('/notifications/read-all');
  return res.data;
}

export async function readNotification(id: string) {
  const res = await apiClient.post(`/notifications/${id}/read`);
  return res.data;
}

