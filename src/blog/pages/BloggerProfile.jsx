import { useState } from 'react';
import { useBlog } from '../context/BlogContext.jsx';
import { Save, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#0d9488', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#10b981', '#6366f1', '#ec4899'];
const SPECIALTIES = ['General Medicine', 'Cardiologist', 'Dermatologist', 'Nutritionist', 'Psychiatrist', 'Neurologist', 'Paediatrician', 'Gynaecologist', 'Other'];

export default function BloggerProfile() {
    const { blogger, updateBlogger } = useBlog();
    const [form, setForm] = useState({
        name: blogger?.name || '',
        bio: blogger?.bio || '',
        specialty: blogger?.specialty || SPECIALTIES[0],
        avatarColor: blogger?.avatarColor || COLORS[0],
    });
    const [toast, setToast] = useState(false);

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
    const initials = form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'B';

    const handleSave = () => {
        updateBlogger(form);
        setToast(true);
        setTimeout(() => setToast(false), 3000);
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-xl font-bold text-slate-800">My Profile</h1>
                <p className="text-sm text-slate-500 mt-0.5">Your public bio shown on all blog articles</p>
            </div>

            {/* Avatar preview */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-6">
                <div className="h-20 w-20 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0 shadow-md"
                    style={{ background: form.avatarColor }}>
                    {initials}
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-lg">{form.name || 'Your Name'}</p>
                    <p className="text-sm text-primary">{form.specialty}</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm line-clamp-2">{form.bio || 'Your bio will appear here…'}</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Display Name</label>
                    <input type="text" value={form.name} onChange={e => set('name', e.target.value)}
                        placeholder="Dr. Firstname Lastname"
                        className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Specialty</label>
                    <select value={form.specialty} onChange={e => set('specialty', e.target.value)}
                        className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition">
                        {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Bio <span className="text-slate-400 text-xs">(max 200 chars)</span></label>
                    <textarea value={form.bio} onChange={e => set('bio', e.target.value.slice(0, 200))} rows={3}
                        placeholder="A brief description about yourself and your area of expertise…"
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                    <p className="text-[11px] text-slate-400 text-right mt-1">{form.bio.length}/200</p>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Avatar Color</label>
                    <div className="flex flex-wrap gap-3">
                        {COLORS.map(c => (
                            <button key={c} type="button" onClick={() => set('avatarColor', c)}
                                className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 ${form.avatarColor === c ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''}`}
                                style={{ background: c }}>
                                {form.avatarColor === c && <CheckCircle size={14} className="text-white" />}
                            </button>
                        ))}
                    </div>
                </div>

                <button onClick={handleSave}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 shadow-md shadow-primary/20 transition">
                    <Save size={15} /> Save Profile
                </button>
            </div>

            <AnimatePresence>
                {toast && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg bg-emerald-500 text-white text-sm font-medium">
                        <CheckCircle size={15} /> Profile saved successfully!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
