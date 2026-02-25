import { useState } from 'react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
    Users, Stethoscope, CalendarCheck2, TrendingUp,
    TrendingDown, ArrowUpRight, Clock, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import { MOCK_DOCTORS, MOCK_PATIENTS, MOCK_APPOINTMENTS, MONTHLY_STATS, SPECIALIZATION_STATS, STATUS_PIE } from '../data/mock.js';
import { cn } from '@/lib/utils';
import { useAdmin } from '../context/AdminContext.jsx';
import { format } from 'date-fns';

const totalRevenue = MOCK_APPOINTMENTS.reduce((s, a) => s + a.platformRevenue, 0);
const pendingDoctors = MOCK_DOCTORS.filter(d => d.status === 'Pending');
const recentAppointments = MOCK_APPOINTMENTS.slice(0, 6);

function StatCard({ icon: Icon, label, value, sub, trend, color }) {
    const isPositive = trend >= 0;
    return (
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={cn('h-11 w-11 rounded-xl flex items-center justify-center', color)}>
                    <Icon size={20} className="text-white" />
                </div>
                <span className={cn('flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full', isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500')}>
                    {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {Math.abs(trend)}%
                </span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-sm font-medium text-slate-500 mt-0.5">{label}</p>
            {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
        </div>
    );
}

const STATUS_CONFIG = {
    Completed: { icon: CheckCircle, cls: 'bg-emerald-50 text-emerald-600' },
    Pending: { icon: Clock, cls: 'bg-amber-50 text-amber-600' },
    Cancelled: { icon: XCircle, cls: 'bg-red-50 text-red-500' },
};

export default function AdminDashboard() {
    const { admin } = useAdmin();
    const [chartTab, setChartTab] = useState('appointments');

    return (
        <div className="space-y-6">
            {/* Greeting */}
            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},{' '}
                    {admin?.name?.split(' ')[0]} 👋
                </h1>
                <p className="text-sm text-slate-500 mt-1">Here's what's happening on Sanjiwani Health today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Stethoscope} label="Total Doctors" value={MOCK_DOCTORS.length}
                    sub={`${pendingDoctors.length} pending review`} trend={12} color="bg-gradient-to-br from-primary to-teal-400" />
                <StatCard icon={Users} label="Total Patients" value={MOCK_PATIENTS.length}
                    sub="Active users" trend={8} color="bg-gradient-to-br from-blue-500 to-blue-400" />
                <StatCard icon={CalendarCheck2} label="Appointments" value={MOCK_APPOINTMENTS.length}
                    sub="This month" trend={-3} color="bg-gradient-to-br from-violet-500 to-purple-400" />
                <StatCard icon={TrendingUp} label="Platform Revenue" value={`₹${(totalRevenue / 1000).toFixed(1)}K`}
                    sub="10% commission" trend={15} color="bg-gradient-to-br from-amber-500 to-orange-400" />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Area / Bar */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-800">Monthly Overview</h2>
                        <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
                            {['appointments', 'revenue'].map(tab => (
                                <button key={tab}
                                    onClick={() => setChartTab(tab)}
                                    className={cn('px-3 py-1 rounded-md text-xs font-medium transition-all capitalize',
                                        chartTab === tab ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'
                                    )}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={MONTHLY_STATS} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="hsl(174 58% 39%)" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="hsl(174 58% 39%)" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                                tickFormatter={v => chartTab === 'revenue' ? `₹${(v / 1000).toFixed(0)}K` : v} />
                            <Tooltip
                                contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 12 }}
                                formatter={v => chartTab === 'revenue' ? [`₹${v.toLocaleString()}`, 'Revenue'] : [v, 'Appointments']}
                            />
                            <Area type="monotone" dataKey={chartTab} stroke="hsl(174 58% 39%)" strokeWidth={2.5}
                                fill="url(#colorArea)" dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <h2 className="font-semibold text-slate-800 mb-4">Appointment Status</h2>
                    <ResponsiveContainer width="100%" height={160}>
                        <PieChart>
                            <Pie data={STATUS_PIE} innerRadius={48} outerRadius={72} paddingAngle={3} dataKey="value">
                                {STATUS_PIE.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-2">
                        {STATUS_PIE.map(s => (
                            <div key={s.name} className="flex items-center justify-between text-xs">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                                    <span className="text-slate-600">{s.name}</span>
                                </div>
                                <span className="font-semibold text-slate-700">{s.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                <h2 className="font-semibold text-slate-800 mb-4">Appointments by Specialization</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={SPECIALIZATION_STATS} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 12 }} />
                        <Bar dataKey="appointments" fill="hsl(174 58% 39%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Pending Doctor Applications */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-800">Pending Applications</h2>
                        <a href="/admin/doctors" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                            View all <ArrowUpRight size={11} />
                        </a>
                    </div>
                    <div className="space-y-3">
                        {pendingDoctors.slice(0, 4).map(doc => (
                            <div key={doc.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm flex-shrink-0">
                                    {doc.fullName.split(' ')[1]?.[0] || doc.fullName[0]}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-slate-800 truncate">{doc.fullName}</p>
                                    <p className="text-xs text-slate-500">{doc.specialization}</p>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-amber-50 text-amber-600">
                                    <AlertCircle size={10} /> Pending
                                </span>
                            </div>
                        ))}
                        {pendingDoctors.length === 0 && <p className="text-sm text-slate-400 text-center py-4">No pending applications</p>}
                    </div>
                </div>

                {/* Recent Appointments */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-slate-800">Recent Appointments</h2>
                        <a href="/admin/appointments" className="text-xs text-primary hover:underline flex items-center gap-0.5">
                            View all <ArrowUpRight size={11} />
                        </a>
                    </div>
                    <div className="space-y-3">
                        {recentAppointments.map(apt => {
                            const { icon: Icon, cls } = STATUS_CONFIG[apt.status] || STATUS_CONFIG.Pending;
                            return (
                                <div key={apt.id} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className={cn('h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0', cls)}>
                                        <Icon size={14} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-800 truncate">{apt.patientName}</p>
                                        <p className="text-xs text-slate-500">{apt.doctorName} · {apt.specialization}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-semibold text-slate-700">₹{apt.fee}</p>
                                        <p className="text-[10px] text-slate-400">{format(new Date(apt.date), 'dd MMM')}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
