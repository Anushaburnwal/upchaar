import { createContext, useContext, useState, useCallback } from 'react';
import { MOCK_ADMIN } from '../data/mock.js';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
    const [admin, setAdmin] = useState(() => {
        try {
            const stored = localStorage.getItem('sanjiwani_admin');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const login = useCallback((email, password, role) => {
        const credential = Object.values(MOCK_ADMIN).find(
            a => a.email === email && a.password === password && a.role === role
        );
        if (!credential) throw new Error('Invalid credentials');
        const session = { ...credential, loginAt: new Date().toISOString() };
        localStorage.setItem('sanjiwani_admin', JSON.stringify(session));
        setAdmin(session);
        return session;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('sanjiwani_admin');
        setAdmin(null);
    }, []);

    const isSuperAdmin = admin?.role === 'super_admin';

    return (
        <AdminContext.Provider value={{ admin, login, logout, isSuperAdmin }}>
            {children}
        </AdminContext.Provider>
    );
}

export function useAdmin() {
    const ctx = useContext(AdminContext);
    if (!ctx) throw new Error('useAdmin must be used inside AdminProvider');
    return ctx;
}
