import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from '@/layouts/AppLayout';
import LandingPage from '@/pages/Landing';
import DashboardPage from '@/pages/Dashboard';
import DoctorsPage from '@/pages/Doctors';
import DiagnosticsPage from '@/pages/Diagnostics';
import HospitalsPage from '@/pages/Hospitals';
import RecordsPage from '@/pages/Records';
import EmergencyPage from '@/pages/Emergency';

// Blog
import { BlogProvider } from '@/blog/context/BlogContext.jsx';
import BlogsPage from '@/pages/Blogs.jsx';
import BlogPostPage from '@/pages/BlogPost.jsx';
import BloggerLogin from '@/blog/pages/BloggerLogin.jsx';
import BloggerLayout from '@/blog/layouts/BloggerLayout.jsx';
import BloggerDashboard from '@/blog/pages/BloggerDashboard.jsx';
import PostEditor from '@/blog/pages/PostEditor.jsx';
import MyPosts from '@/blog/pages/MyPosts.jsx';
import BloggerProfile from '@/blog/pages/BloggerProfile.jsx';

// Admin
import { AdminProvider } from '@/admin/context/AdminContext.jsx';
import AdminLayout from '@/admin/layouts/AdminLayout.jsx';
import AdminLogin from '@/admin/pages/AdminLogin.jsx';
import AdminDashboard from '@/admin/pages/AdminDashboard.jsx';
import DoctorManagement from '@/admin/pages/DoctorManagement.jsx';
import PatientManagement from '@/admin/pages/PatientManagement.jsx';
import AppointmentManagement from '@/admin/pages/AppointmentManagement.jsx';
import NotificationCenter from '@/admin/pages/NotificationCenter.jsx';
import ActivityLogs from '@/admin/pages/ActivityLogs.jsx';
import Settings from '@/admin/pages/Settings.jsx';

function App() {
  return (
    <BlogProvider>
      <AdminProvider>
        <Router>
          <Routes>
            {/* Public patient-facing routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
            <Route path="/doctors" element={<AppLayout><DoctorsPage /></AppLayout>} />
            <Route path="/diagnostics" element={<AppLayout><DiagnosticsPage /></AppLayout>} />
            <Route path="/hospitals" element={<AppLayout><HospitalsPage /></AppLayout>} />
            <Route path="/records" element={<AppLayout><RecordsPage /></AppLayout>} />
            <Route path="/emergency" element={<AppLayout><EmergencyPage /></AppLayout>} />

            {/* Blog public routes */}
            <Route path="/blogs" element={<AppLayout><BlogsPage /></AppLayout>} />
            <Route path="/blogs/:slug" element={<AppLayout><BlogPostPage /></AppLayout>} />

            {/* Blogger dashboard routes */}
            <Route path="/blogger/login" element={<BloggerLogin />} />
            <Route path="/blogger" element={<BloggerLayout />}>
              <Route index element={<BloggerDashboard />} />
              <Route path="dashboard" element={<BloggerDashboard />} />
              <Route path="write" element={<PostEditor />} />
              <Route path="edit/:id" element={<PostEditor />} />
              <Route path="posts" element={<MyPosts />} />
              <Route path="profile" element={<BloggerProfile />} />
            </Route>

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="doctors" element={<DoctorManagement />} />
              <Route path="patients" element={<PatientManagement />} />
              <Route path="appointments" element={<AppointmentManagement />} />
              <Route path="notifications" element={<NotificationCenter />} />
              <Route path="logs" element={<ActivityLogs />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AdminProvider>
    </BlogProvider>
  );
}

export default App;