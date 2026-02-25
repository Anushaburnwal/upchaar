// ─── MOCK DATA — Sanjiwani Health Admin ─────────────────────────────────────

export const MOCK_ADMIN = {
  super_admin: { email: 'superadmin@sanjiwani.health', password: 'admin123', role: 'super_admin', name: 'Arjun Mehta', avatar: null },
  support_admin: { email: 'support@sanjiwani.health', password: 'support123', role: 'support_admin', name: 'Sneha Rao', avatar: null },
};

// ─── DOCTORS ────────────────────────────────────────────────────────────────
export const SPECIALIZATIONS = [
  'General Physician', 'Cardiologist', 'Dermatologist', 'Endocrinologist',
  'ENT Specialist', 'Gastroenterologist', 'Gynaecologist', 'Neurologist',
  'Nephrologist', 'Oncologist', 'Ophthalmologist', 'Orthopaedic Surgeon',
  'Paediatrician', 'Psychiatrist', 'Pulmonologist', 'Urologist', 'Dentist', 'Physiotherapist',
];

const DOCTOR_STATUSES = ['Pending', 'Approved', 'Approved', 'Approved', 'Rejected', 'Suspended'];

export const MOCK_DOCTORS = Array.from({ length: 28 }, (_, i) => ({
  id: `DOC-${1000 + i}`,
  fullName: ['Dr. Priya Sharma', 'Dr. Rohan Verma', 'Dr. Anita Patel', 'Dr. Suresh Iyer', 'Dr. Meena Nair',
    'Dr. Vikram Singh', 'Dr. Kavitha Reddy', 'Dr. Arjun Das', 'Dr. Pooja Gupta', 'Dr. Rahul Joshi'][i % 10],
  email: `doctor${i + 1}@clinic.com`,
  phone: `9${String(800000000 + i * 37).slice(0, 9)}`,
  dob: `198${(i % 9) + 1}-0${(i % 9) + 1}-1${(i % 9) + 5}`,
  gender: i % 3 === 0 ? 'Female' : i % 3 === 1 ? 'Male' : 'Male',
  specialization: SPECIALIZATIONS[i % SPECIALIZATIONS.length],
  subSpecialization: i % 4 === 0 ? 'Interventional' : '',
  degree: ['MBBS', 'MBBS, MD', 'BDS', 'MBBS, MS', 'BAMS'][i % 5],
  additionalQualifications: i % 3 === 0 ? 'DNB, Fellowship (USA)' : '',
  passingYear: 2000 + (i % 15),
  institution: ['AIIMS Delhi', 'JIPMER Puducherry', 'CMC Vellore', 'KEM Mumbai', 'Grant Medical'][i % 5],
  licenseNo: `MH-${2005 + (i % 15)}-${100000 + i * 7}`,
  nmcNo: `NMC-${200000 + i * 13}`,
  experience: 2 + (i % 20),
  consultationFee: [300, 500, 700, 800, 1000, 1200, 1500][i % 7],
  consultationType: i % 2 === 0 ? 'In-person & Online' : 'In-person',
  clinicName: ['Apollo Clinic', 'Fortis OPD', 'City Care Hospital', 'Sunrise Polyclinic'][i % 4],
  clinicAddress: `${i + 1}${['st', 'nd', 'rd', 'th'][Math.min(i % 4, 3)]} Street, Sector ${i + 1}`,
  city: ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'][i % 7],
  state: ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra', 'West Bengal'][i % 7],
  languages: [['English', 'Hindi'], ['English', 'Tamil'], ['English', 'Kannada'], ['English', 'Telugu']][i % 4],
  availableDays: i % 2 === 0 ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : ['Mon', 'Wed', 'Fri', 'Sat'],
  hoursFrom: '09:00',
  hoursTo: i % 3 === 0 ? '17:00' : '13:00',
  status: DOCTOR_STATUSES[i % 6],
  rejectionReason: DOCTOR_STATUSES[i % 6] === 'Rejected' ? 'Incomplete documentation provided.' : '',
  appliedAt: new Date(2025, 10 + (i % 4), (i % 28) + 1).toISOString(),
  approvedAt: DOCTOR_STATUSES[i % 6] === 'Approved' ? new Date(2025, 11 + (i % 2), (i % 25) + 2).toISOString() : null,
  totalAppointments: i % 2 === 0 ? 40 + i * 3 : 0,
  totalRevenue: i % 2 === 0 ? (40 + i * 3) * [300, 500, 700, 800][i % 4] : 0,
  documents: {
    govtId: `/mock/doc/id_${i}.jpg`,
    licenseDoc: `/mock/doc/license_${i}.pdf`,
    degreeCert: `/mock/doc/degree_${i}.pdf`,
    profilePhoto: null,
  },
  rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
}));

// ─── PATIENTS ────────────────────────────────────────────────────────────────
const PATIENT_NAMES = ['Aditya Kumar', 'Sunita Sharma', 'Rajan Patel', 'Geeta Roy', 'Mohan Das',
  'Lata Singh', 'Vijay Nair', 'Rekha Iyer', 'Sunil Gupta', 'Preeti Verma'];

export const MOCK_PATIENTS = Array.from({ length: 40 }, (_, i) => ({
  id: `PAT-${2000 + i}`,
  name: PATIENT_NAMES[i % 10],
  email: `patient${i + 1}@gmail.com`,
  phone: `7${String(700000000 + i * 41).slice(0, 9)}`,
  city: ['Mumbai', 'Delhi', 'Pune', 'Bengaluru', 'Jaipur'][i % 5],
  joinedAt: new Date(2025, 6 + (i % 6), (i % 28) + 1).toISOString(),
  totalAppointments: Math.floor(Math.random() * 10),
  status: i % 7 === 0 ? 'Blocked' : 'Active',
  bookingHistory: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
    id: `APT-${3000 + i * 10 + j}`,
    doctor: MOCK_DOCTORS[j % MOCK_DOCTORS.length].fullName,
    specialization: MOCK_DOCTORS[j % MOCK_DOCTORS.length].specialization,
    date: new Date(2026, 0 + j, (j % 25) + 1).toLocaleDateString('en-IN'),
    status: ['Completed', 'Pending', 'Cancelled'][j % 3],
    fee: [300, 500, 700][j % 3],
  })),
}));

// ─── APPOINTMENTS ────────────────────────────────────────────────────────────
const APT_STATUSES = ['Completed', 'Pending', 'Cancelled', 'Completed', 'Completed'];
export const MOCK_APPOINTMENTS = Array.from({ length: 60 }, (_, i) => {
  const doc = MOCK_DOCTORS[i % MOCK_DOCTORS.length];
  const pat = MOCK_PATIENTS[i % MOCK_PATIENTS.length];
  const status = APT_STATUSES[i % 5];
  return {
    id: `APT-${4000 + i}`,
    patientName: pat.name,
    patientId: pat.id,
    doctorName: doc.fullName,
    doctorId: doc.id,
    specialization: doc.specialization,
    date: new Date(2026, 0 + Math.floor(i / 10), (i % 25) + 1).toISOString(),
    timeSlot: `0${9 + (i % 8)}:00 ${i % 2 === 0 ? 'AM' : 'PM'}`,
    status,
    type: i % 2 === 0 ? 'In-person' : 'Online',
    fee: doc.consultationFee,
    platformRevenue: status === 'Completed' ? Math.round(doc.consultationFee * 0.1) : 0,
    notes: i % 4 === 0 ? 'Follow-up appointment' : '',
  };
});

// ─── ANALYTICS ───────────────────────────────────────────────────────────────
export const MONTHLY_STATS = [
  { month: 'Mar', appointments: 42, revenue: 18400 },
  { month: 'Apr', appointments: 58, revenue: 24600 },
  { month: 'May', appointments: 71, revenue: 31200 },
  { month: 'Jun', appointments: 65, revenue: 28900 },
  { month: 'Jul', appointments: 83, revenue: 37500 },
  { month: 'Aug', appointments: 92, revenue: 41800 },
  { month: 'Sep', appointments: 88, revenue: 39200 },
  { month: 'Oct', appointments: 105, revenue: 48600 },
  { month: 'Nov', appointments: 118, revenue: 54300 },
  { month: 'Dec', appointments: 130, revenue: 61700 },
  { month: 'Jan', appointments: 112, revenue: 52400 },
  { month: 'Feb', appointments: 97, revenue: 43800 },
];

export const SPECIALIZATION_STATS = SPECIALIZATIONS.slice(0, 8).map((s, i) => ({
  name: s.replace(' Specialist', '').replace('Orthopaedic ', 'Ortho '),
  appointments: 15 + i * 12,
  revenue: (15 + i * 12) * (400 + i * 50),
}));

export const STATUS_PIE = [
  { name: 'Completed', value: 58, color: '#10b981' },
  { name: 'Pending', value: 24, color: '#f59e0b' },
  { name: 'Cancelled', value: 18, color: '#ef4444' },
];

// ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
export const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'broadcast', audience: 'All Doctors', subject: 'Platform Update — New Telemedicine Features', sentAt: '2026-02-20T10:30:00Z', sentBy: 'Arjun Mehta' },
  { id: 2, type: 'individual', audience: 'Dr. Priya Sharma', subject: 'Your application has been approved', sentAt: '2026-02-18T09:15:00Z', sentBy: 'Sneha Rao' },
  { id: 3, type: 'broadcast', audience: 'All Patients', subject: 'Scheduled Maintenance - Feb 25', sentAt: '2026-02-17T14:00:00Z', sentBy: 'Arjun Mehta' },
  { id: 4, type: 'individual', audience: 'Dr. Rohan Verma', subject: 'Document verification required', sentAt: '2026-02-15T11:45:00Z', sentBy: 'Sneha Rao' },
];

// ─── ACTIVITY LOGS ───────────────────────────────────────────────────────────
export const MOCK_LOGS = [
  { id: 1, admin: 'Arjun Mehta', adminId: 'ADM-001', action: 'Approved Doctor', target: 'Dr. Priya Sharma (DOC-1000)', details: 'All documents verified', timestamp: '2026-02-24T08:32:11Z' },
  { id: 2, admin: 'Sneha Rao', adminId: 'ADM-002', action: 'Rejected Doctor', target: 'Dr. Rohan Verma (DOC-1001)', details: 'Reason: License expired', timestamp: '2026-02-24T09:15:44Z' },
  { id: 3, admin: 'Arjun Mehta', adminId: 'ADM-001', action: 'Suspended Doctor', target: 'Dr. Anita Patel (DOC-1002)', details: 'Patient complaint filed', timestamp: '2026-02-23T14:20:05Z' },
  { id: 4, admin: 'Sneha Rao', adminId: 'ADM-002', action: 'Blocked Patient', target: 'Aditya Kumar (PAT-2000)', details: 'Repeated no-shows', timestamp: '2026-02-23T11:08:33Z' },
  { id: 5, admin: 'Arjun Mehta', adminId: 'ADM-001', action: 'Updated Settings', target: 'Commission Rate', details: 'Changed from 8% to 10%', timestamp: '2026-02-22T16:45:00Z' },
  { id: 6, admin: 'Arjun Mehta', adminId: 'ADM-001', action: 'Sent Broadcast', target: 'All Doctors', details: 'Platform update email', timestamp: '2026-02-20T10:30:00Z' },
  { id: 7, admin: 'Sneha Rao', adminId: 'ADM-002', action: 'Approved Doctor', target: 'Dr. Suresh Iyer (DOC-1003)', details: 'Fast-tracked — senior applicant', timestamp: '2026-02-19T13:55:22Z' },
  { id: 8, admin: 'Arjun Mehta', adminId: 'ADM-001', action: 'Added Specialization', target: 'Addiction Medicine', details: 'New category added', timestamp: '2026-02-18T10:10:00Z' },
  { id: 9, admin: 'Sneha Rao', adminId: 'ADM-002', action: 'Unblocked Patient', target: 'Sunita Sharma (PAT-2001)', details: 'Review resolved', timestamp: '2026-02-17T15:00:00Z' },
  { id: 10, admin: 'Arjun Mehta', adminId: 'ADM-001', action: 'Rejected Doctor', target: 'Dr. Meena Nair (DOC-1004)', details: 'Reason: Duplicate registration', timestamp: '2026-02-16T09:45:11Z' },
];

// ─── SETTINGS ────────────────────────────────────────────────────────────────
export const DEFAULT_SETTINGS = {
  commissionPercent: 10,
  currency: 'INR',
  bookingFee: 25,
  minNoticeHours: 2,
  cancellationWindow: 24,
  specializations: [...SPECIALIZATIONS],
  banners: [
    { id: 1, title: 'Book Your Appointment Today', active: true, url: '' },
    { id: 2, title: 'New Telemedicine Features Available', active: false, url: '' },
  ],
};
