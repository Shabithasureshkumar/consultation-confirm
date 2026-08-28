import { 
  Doctor, 
  CurrentUser, 
  AppointmentDetail, 
  ClinicalSummary, 
  Prescription, 
  LabOrder, 
  NextStep,
  NotificationItem 
} from '../types';
import { DR_JENKINS_AVATAR, DR_BROCK_AVATAR } from '../assets/avatars';

export const currentUser: CurrentUser = {
  name: 'David Brock',
  role: 'General Physician',
  avatarUrl: DR_BROCK_AVATAR,
};

export const attendingDoctor: Doctor = {
  name: 'Dr. Sarah Jenkins',
  role: 'Senior Neurologist',
  badge: 'SENIOR NEUROLOGIST',
  department: 'Family Medicine',
  experience: '12+ Years Exp.',
  rating: 4.8,
  reviewCount: 1299,
  availableToday: true,
  highlyRated: true,
  avatarUrl: DR_JENKINS_AVATAR,
};

export const appointmentDetails: AppointmentDetail[] = [
  {
    id: 'date',
    label: 'Date',
    value: 'October 24, 2024',
    iconName: 'calendar',
  },
  {
    id: 'time',
    label: 'Time & Duration',
    value: '10:30 AM (45 Mins)',
    iconName: 'clock',
  },
  {
    id: 'type',
    label: 'Consultation Type',
    value: 'Holographic Telepresence',
    iconName: 'video',
  },
  {
    id: 'meetingId',
    label: 'Meeting ID',
    value: 'ATH-992-041-8X',
    iconName: 'id',
  },
];

export const clinicalSummary: ClinicalSummary = {
  description:
    'Analysis of your recent vitals and consultation with Dr. Chen indicates a stable cardiovascular profile. While minor tachycardia was observed during exertion, your overall heart health index remains high. The recommended Propranolol will assist in regulating resting heart rate.',
  keyFindings: [
    'Stable Sinus Rhythm',
    'Normal BP (118/79)',
    'Low inflammation markers',
  ],
  recommendations: [
    '30m moderate cardio',
    'Increase water intake',
    'Meditation practice',
  ],
};

export const activePrescription: Prescription = {
  medicationName: 'Propranolol 10mg',
  dosage: '10mg',
  schedule: '1 Tablet daily in the morning',
  supplyDays: 30,
  refillsRemaining: 2,
  prescribedBy: 'Dr. Sarah Jenkins (MD, Neurologist)',
  instructions: 'Take 1 tablet by mouth every morning with water before breakfast.',
  formattedInstruction: '1 Tablet daily in the morning. 30 Days supply. 2 Refills remaining.',
};

export const labOrders: LabOrder[] = [
  {
    id: 'lab-1',
    name: 'Complete Blood Count (CBC)',
    code: 'LAB-CBC-901',
    status: 'issued',
    completed: true,
  },
  {
    id: 'lab-2',
    name: 'Lipid Panel',
    code: 'LAB-LPD-402',
    status: 'issued',
    completed: true,
  },
];

export const nextSteps: NextStep[] = [
  {
    id: 'lifestyle',
    title: 'Lifestyle Advice',
    description: 'Integrate 25 minutes of low-impact cardiovascular activity daily.',
    iconType: 'activity',
    details: [
      'Brisk walking or cycling at a conversational pace',
      'Target heart rate range: 110 - 135 bpm',
      'Keep hydrated before, during, and after sessions',
    ],
    actionLabel: 'View Exercise Guide',
  },
  {
    id: 'reminders',
    title: 'Medication Reminders',
    description: 'Set reminders for your morning Propranolol dosage via Aether App.',
    iconType: 'reminder',
    details: [
      'Scheduled notification at 8:00 AM daily',
      'Track adherence streak in patient portal',
      'Automatic refill notification triggered at 5 remaining tablets',
    ],
    actionLabel: 'Configure Push Reminders',
  },
  {
    id: 'followup',
    title: 'Follow-up Recap',
    description: 'A 3-month review is recommended to assess medication efficacy.',
    iconType: 'recap',
    details: [
      'Target check-in window: January 2025',
      'Includes updated blood pressure panel and Holter log',
      'Can be conducted via Holographic Telepresence or in-clinic',
    ],
    actionLabel: 'Schedule 3-Month Checkup',
  },
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Consultation Complete',
    message: 'Dr. Sarah Jenkins finalized the holographic telepresence summary.',
    time: '5m ago',
    read: false,
    type: 'appointment',
  },
  {
    id: 'notif-2',
    title: 'Digital Rx Generated',
    message: 'Propranolol 10mg (30-day supply) has been transmitted to your pharmacy.',
    time: '12m ago',
    read: false,
    type: 'prescription',
  },
  {
    id: 'notif-3',
    title: 'Lab Orders Transmitted',
    message: 'CBC and Lipid Panel orders are ready for booking.',
    time: '20m ago',
    read: true,
    type: 'lab',
  },
];
