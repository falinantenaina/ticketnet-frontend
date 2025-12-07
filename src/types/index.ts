import type { LucideIcon } from "lucide-react";

export interface Plan {
  _id: number;
  name: string;
  duration: number;
  price: number;
  description?: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Ticket {
  code: string;
  duration: number;
  planName?: string;
  price: number;
}

export interface Summary {
  totalSales: number;
  totalRevenue: number;
  averageSaleAmount: number;
  completedSales: number;
  completedRevenue: number;
}

export interface TimelineData {
  _id: string;
  totalSales: number;
  totalRevenue: number;
  completedSales: number;
  pendingSales: number;
  failedSales: number;
  completedRevenue: number;
}

export interface PaymentMethodData {
  _id: string;
  count: number;
  totalAmount: number;
}

export interface DateRange {
  $gte: Date;
  $lte: Date;
}

export interface StatsResponse {
  success: boolean;
  period: string;
  dateRange: DateRange;
  summary: Summary;
  timeline: TimelineData[];
  paymentMethods: PaymentMethodData[];
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

export type Period = "day" | "week" | "month" | "custom";
