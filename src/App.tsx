import { HashRouter, Route, Routes } from 'react-router-dom';
import { VmgProvider } from './context/VmgContext';
import { Layout } from './components/Layout';
import {
  AboutPage,
  BlogPage,
  BlogPostDetailPage,
  CareersPage,
  ContactPage,
  HomePage,
  LegalPage,
  ProjectsPage,
  RestorationPage,
  ServicesPage,
  TeamMemberDetailPage,
  TeamPage,
} from './pages/PublicPages';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  return (
    <HashRouter>
      <VmgProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="about-us" element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="team/:slug" element={<TeamMemberDetailPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="restoration" element={<RestorationPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPostDetailPage />} />
            <Route path="contact-us" element={<ContactPage />} />
            <Route path="privacy-policy" element={<LegalPage type="privacy" />} />
            <Route path="terms-of-use" element={<LegalPage type="terms" />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </VmgProvider>
    </HashRouter>
  );
}
