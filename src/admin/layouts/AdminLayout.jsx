import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext.jsx';
import AdminTopbar from './AdminTopbar.jsx';
import {
    LayoutDashboard, Users, UserCog, CalendarCheck2,
    Bell, ScrollText, Settings, ChevronLeft, ChevronRight, Stethoscope
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/doctors', icon: Stethoscope, label: 'Doctors' },
    { to: '/admin/patients', icon: Users, label: 'Patients' },
    { to: '/admin/appointments', icon: CalendarCheck2, label: 'Appointments' },
    { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { to: '/admin/logs', icon: ScrollText, label: 'Activity Logs' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
    const { admin } = useAdmin();
    const [collapsed, setCollapsed] = useState(false);

    if (!admin) return <Navigate to="/admin/login" replace />;

    return (
        <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                animate={{ width: collapsed ? 64 : 220 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="relative flex flex-col bg-white border-r border-slate-200 shadow-sm flex-shrink-0 overflow-hidden z-20"
            >
                {/* Logo */}
                <div className="flex items-center gap-2 px-4 py-5 border-b border-slate-100 h-16 flex-shrink-0">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-teal-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.15 }}
                                className="font-bold text-sm text-primary whitespace-nowrap"
                            >
                                Sanjiwani Admin
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Nav */}
                <nav className="flex flex-col gap-1 p-3 flex-1 overflow-y-auto">
                    {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) => cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                                isActive
                                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                            )}
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={cn('h-4.5 w-4.5 flex-shrink-0', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600')} size={18} />
                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.1 }}
                                                className="whitespace-nowrap"
                                            >
                                                {label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* Collapse toggle */}
                <button
                    onClick={() => setCollapsed(c => !c)}
                    className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-slate-200 bg-white shadow flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-colors z-10"
                >
                    {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
                </button>
            </motion.aside>

            {/* Main */}
            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <AdminTopbar />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
