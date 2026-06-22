// Dashboard Types and Interfaces
export interface DashboardStats {
  total: number;
  production: number;
  inProgress: number;
  idea: number;
  viewsThisMonth: number;
  feedbackCount: number;
}

export interface ActivityItem {
  id: string;
  type: 'project-created' | 'feedback-received';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface ProjectStats {
  monthlyViews: ChartDataPoint[];
  monthlyProjects: ChartDataPoint[];
  statusDistribution: {
    name: string;
    value: number;
    fill: string;
  }[];
}

export interface NotificationPayload {
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
