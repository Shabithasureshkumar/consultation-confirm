export type NavigationTab = 
  | 'Dashboard' 
  | 'Appointment' 
  | 'Patient' 
  | 'Reports' 
  | 'Chats' 
  | 'Billing';

export interface Doctor {
  name: string;
  role: string;
  badge: string;
  department: string;
  experience: string;
  rating: number;
  reviewCount: number;
  availableToday: boolean;
  highlyRated: boolean;
  avatarUrl: string;
}

export interface CurrentUser {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface AppointmentDetail {
  id: string;
  label: string;
  value: string;
  iconName: 'calendar' | 'clock' | 'video' | 'id';
}

export interface ClinicalSummary {
  description: string;
  keyFindings: string[];
  recommendations: string[];
}

export interface Prescription {
  medicationName: string;
  dosage: string;
  schedule: string;
  supplyDays: number;
  refillsRemaining: number;
  prescribedBy: string;
  instructions: string;
  formattedInstruction: string;
}

export interface LabOrder {
  id: string;
  name: string;
  code?: string;
  status: 'ready' | 'pending' | 'issued';
  completed: boolean;
}

export interface NextStep {
  id: string;
  title: string;
  description: string;
  iconType: 'activity' | 'reminder' | 'recap';
  details?: string[];
  actionLabel?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'appointment' | 'prescription' | 'lab' | 'system';
}
