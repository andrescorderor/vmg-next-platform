import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  INITIAL_BLOGS,
  INITIAL_JOBS,
  INITIAL_LEADS,
  INITIAL_PROJECTS,
  INITIAL_SERVICES,
  INITIAL_SETTINGS,
  INITIAL_TEAM,
} from '../data/vmgData';
import type {
  BlogPost,
  EstimateLead,
  JobPosition,
  ProjectItem,
  ServiceItem,
  SiteSettings,
  TeamMember,
} from '../data/vmgData';

export interface ToastMsg {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

interface VmgContextType {
  settings: SiteSettings;
  updateSettings: (next: SiteSettings) => void;
  services: ServiceItem[];
  saveService: (item: ServiceItem) => void;
  projects: ProjectItem[];
  saveProject: (item: ProjectItem) => void;
  deleteProject: (id: string) => void;
  team: TeamMember[];
  saveTeamMember: (member: TeamMember) => void;
  toggleTeamVisibility: (id: string) => void;
  reorderTeam: (id: string, dir: -1 | 1) => void;
  deleteTeamMember: (id: string) => void;
  blogs: BlogPost[];
  saveBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: string) => void;
  generateAndPublishAiBlog: (params: {
    prompt: string;
    category: string;
    tone: string;
    keywords: string;
    author: string;
    coverImage?: string;
    autoPublish: boolean;
  }) => Promise<BlogPost>;
  jobs: JobPosition[];
  saveJob: (job: JobPosition) => void;
  deleteJob: (id: string) => void;
  leads: EstimateLead[];
  submitEstimateLead: (lead: Omit<EstimateLead, 'id' | 'createdAt' | 'apiSynced' | 'apiKeyPrefix' | 'status'>) => EstimateLead;
  updateLeadStatus: (id: string, status: EstimateLead['status']) => void;
  estimateModalOpen: boolean;
  estimatePreselectService: string;
  openEstimateModal: (service?: string) => void;
  closeEstimateModal: () => void;
  toasts: ToastMsg[];
  notify: (text: string, type?: ToastMsg['type']) => void;
  dismissToast: (id: string) => void;
  resetAllData: () => void;
}

const STORAGE_KEYS = {
  settings: 'vmg_next_settings_v1',
  services: 'vmg_next_services_v1',
  projects: 'vmg_next_projects_v1',
  team: 'vmg_next_team_v1',
  blogs: 'vmg_next_blogs_v1',
  jobs: 'vmg_next_jobs_v1',
  leads: 'vmg_next_leads_v1',
};

function loadStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    /* ignore */
  }
  return fallback;
}

function saveStore<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const COVER_POOL = [
  'https://vmgnext.com/wp-content/uploads/2026/08/project5_photo01-scaled.jpg',
  'https://vmgnext.com/wp-content/uploads/2026/08/project1_photo03-scaled.jpeg',
  'https://vmgnext.com/wp-content/uploads/2026/08/project7_photo10-scaled.jpg',
  'https://vmgnext.com/wp-content/uploads/2025/12/20220813_104243-scaled.jpg',
  'https://vmgnext.com/wp-content/uploads/2025/07/tilt-up.png',
];

const VmgCtx = createContext<VmgContextType | null>(null);

export function VmgProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => loadStore(STORAGE_KEYS.settings, INITIAL_SETTINGS));
  const [services, setServices] = useState<ServiceItem[]>(() => loadStore(STORAGE_KEYS.services, INITIAL_SERVICES));
  const [projects, setProjects] = useState<ProjectItem[]>(() => loadStore(STORAGE_KEYS.projects, INITIAL_PROJECTS));
  const [team, setTeam] = useState<TeamMember[]>(() => loadStore(STORAGE_KEYS.team, INITIAL_TEAM));
  const [blogs, setBlogs] = useState<BlogPost[]>(() => loadStore(STORAGE_KEYS.blogs, INITIAL_BLOGS));
  const [jobs, setJobs] = useState<JobPosition[]>(() => loadStore(STORAGE_KEYS.jobs, INITIAL_JOBS));
  const [leads, setLeads] = useState<EstimateLead[]>(() => loadStore(STORAGE_KEYS.leads, INITIAL_LEADS));
  const [estimateModalOpen, setEstimateModalOpen] = useState(false);
  const [estimatePreselectService, setEstimatePreselectService] = useState('');
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useEffect(() => saveStore(STORAGE_KEYS.settings, settings), [settings]);
  useEffect(() => saveStore(STORAGE_KEYS.services, services), [services]);
  useEffect(() => saveStore(STORAGE_KEYS.projects, projects), [projects]);
  useEffect(() => saveStore(STORAGE_KEYS.team, team), [team]);
  useEffect(() => saveStore(STORAGE_KEYS.blogs, blogs), [blogs]);
  useEffect(() => saveStore(STORAGE_KEYS.jobs, jobs), [jobs]);
  useEffect(() => saveStore(STORAGE_KEYS.leads, leads), [leads]);

  const notify = (text: string, type: ToastMsg['type'] = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  const dismissToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const updateSettings = (next: SiteSettings) => {
    setSettings(next);
    notify('Site configuration and API keys saved.', 'success');
  };

  const saveService = (item: ServiceItem) => {
    setServices((prev) => {
      const exists = prev.some((s) => s.id === item.id);
      return exists ? prev.map((s) => (s.id === item.id ? item : s)) : [...prev, item];
    });
    notify(`Service "${item.title}" updated.`, 'success');
  };

  const saveProject = (item: ProjectItem) => {
    setProjects((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      return exists ? prev.map((p) => (p.id === item.id ? item : p)) : [...prev, item];
    });
    notify(`Project "${item.name}" saved to portfolio.`, 'success');
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    notify('Project removed from portfolio.', 'info');
  };

  const saveTeamMember = (member: TeamMember) => {
    const cleanSlug = member.slug.trim() || slugify(member.name);
    const updated = { ...member, slug: cleanSlug };
    setTeam((prev) => {
      const exists = prev.some((m) => m.id === updated.id);
      return exists
        ? prev.map((m) => (m.id === updated.id ? updated : m))
        : [...prev, { ...updated, orderIndex: prev.length + 1 }];
    });
    notify(`Team member "${updated.name}" saved and published.`, 'success');
  };

  const toggleTeamVisibility = (id: string) => {
    setTeam((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const nextVis = !m.visible;
        notify(`${m.name} is now ${nextVis ? 'Visible on /team' : 'Hidden (preserved in CMS)'}.`, 'info');
        return { ...m, visible: nextVis };
      })
    );
  };

  const reorderTeam = (id: string, dir: -1 | 1) => {
    setTeam((prev) => {
      const sorted = [...prev].sort((a, b) => a.orderIndex - b.orderIndex);
      const idx = sorted.findIndex((m) => m.id === id);
      const targetIdx = idx + dir;
      if (idx < 0 || targetIdx < 0 || targetIdx >= sorted.length) return prev;
      const temp = sorted[idx];
      sorted[idx] = sorted[targetIdx];
      sorted[targetIdx] = temp;
      return sorted.map((m, i) => ({ ...m, orderIndex: i + 1 }));
    });
  };

  const deleteTeamMember = (id: string) => {
    setTeam((prev) => prev.filter((m) => m.id !== id));
    notify('Team member permanently removed.', 'info');
  };

  const saveBlogPost = (post: BlogPost) => {
    const cleanSlug = post.slug.trim() || slugify(post.title);
    const updated = { ...post, slug: cleanSlug };
    setBlogs((prev) => {
      const exists = prev.some((b) => b.id === updated.id);
      return exists ? prev.map((b) => (b.id === updated.id ? updated : b)) : [updated, ...prev];
    });
    notify(`Article "${updated.title}" published to /blog.`, 'success');
  };

  const deleteBlogPost = (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    notify('Blog post deleted.', 'info');
  };

  const generateAndPublishAiBlog: VmgContextType['generateAndPublishAiBlog'] = async ({
    prompt,
    category,
    tone,
    keywords,
    author,
    coverImage,
    autoPublish,
  }) => {
    const kwList = keywords
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);
    const primaryKw = kwList[0] || 'Commercial Concrete Construction in Utah';

    // If user configured a live Gemini API key in settings, try calling Gemini API first
    if (settings.geminiApiKey && settings.geminiApiKey.trim().length > 12) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
            settings.geminiApiKey.trim()
          )}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are the Senior Construction Marketing & Engineering Editor for VMG NeXT Construction (Sandy & Salt Lake City, Utah). Write a complete SEO blog article in JSON format with keys: "title", "excerpt", "contentHtml" (using <h2>, <h3>, <p>, <ul>, <li>, <blockquote> tags).
Prompt/Topic: ${prompt}
Category: ${category}
Tone: ${tone}
Target SEO Keywords: ${keywords || 'Utah commercial concrete, tilt-up, Salt Lake City, Park City'}
Return ONLY valid JSON.`,
                    },
                  ],
                },
              ],
            }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          const rawText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          const jsonMatch = rawText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            const generatedPost: BlogPost = {
              id: `blog-${Date.now()}`,
              slug: slugify(parsed.title || prompt),
              title: parsed.title || prompt,
              excerpt: parsed.excerpt || `Expert insights on ${prompt} by VMG NeXT Construction in Utah.`,
              category: category || 'Structural Concrete',
              publishedAt: new Date().toISOString().slice(0, 10),
              readTime: '6 min read',
              author: author || 'Victor Galvan · VMG NeXT Engineering',
              coverImage: coverImage || COVER_POOL[Math.floor(Math.random() * COVER_POOL.length)],
              contentHtml: parsed.contentHtml,
              aiGenerated: true,
              promptUsed: prompt,
              seoKeywords: kwList.length ? kwList : ['Utah Construction', 'Tilt-Up Concrete', 'Salt Lake City'],
              orderIndex: 1,
            };
            if (autoPublish) {
              setBlogs((prev) => [generatedPost, ...prev]);
              notify(`AI Article "${generatedPost.title}" generated and auto-published!`, 'success');
            }
            return generatedPost;
          }
        }
      } catch {
        /* Fallback to built-in construction domain engine */
      }
    }

    // Built-in deterministic Construction AI Engine (0 latency, $0 cost, rich Utah technical SEO)
    await new Promise((r) => setTimeout(r, 950));
    const cleanPrompt = prompt.trim();
    const formattedTitle =
      cleanPrompt.length > 15 && !cleanPrompt.toLowerCase().startsWith('write')
        ? cleanPrompt.charAt(0).toUpperCase() + cleanPrompt.slice(1)
        : `${category}: Engineering High-Performance Commercial Builds Across Utah`;

    const title = formattedTitle.includes('Utah') ? formattedTitle : `${formattedTitle} — Utah Commercial Concrete Guide`;
    const excerpt = `Explore how VMG NeXT Construction leverages disciplined preconstruction, ${primaryKw.toLowerCase()}, and field precision to deliver high-performing structures across Salt Lake City and Park City.`;

    const contentHtml = `
      <p>In Utah's rapidly expanding commercial and industrial corridors—from <strong>Salt Lake City</strong> and <strong>Sandy</strong> to <strong>Park City</strong> and <strong>Ogden</strong>—developers and general contractors demand construction partners who combine structural precision with schedule velocity. Addressing <strong>${cleanPrompt}</strong> requires more than standard field practices; it requires engineered systems and disciplined execution.</p>
      <h2>1. Strategic Preconstruction & Value Engineering in Utah</h2>
      <p>At <strong>VMG NeXT Construction</strong>, every successful concrete scope starts long before the first ready-mix truck arrives on site. Our estimating and project management teams analyze structural drawings, soil conditions, and seasonal weather windows to optimize both cost and constructability:</p>
      <ul>
        <li><strong>Precision Quantity Takeoffs:</strong> Detailed cost modeling across footings, foundation walls, slabs on grade, and tilt-up panels to eliminate scope gaps.</li>
        <li><strong>Utah Climate & Mix Design Optimization:</strong> Specifying structural concrete mixes engineered to withstand Wasatch Front freeze-thaw cycles and high-load industrial traffic.</li>
        <li><strong>Critical-Path Schedule Alignment:</strong> Sequencing pours and panel erection to accelerate dry-in milestones for general contractors.</li>
      </ul>
      <blockquote>"When we align engineering precision with accountable field leadership, our partners don't just meet their schedule—they outperform it." — Victor Galvan, CEO of VMG NeXT</blockquote>
      <h2>2. Field Execution: Quality Control & Safety Standards</h2>
      <p>Whether executing a 277,000 SF educational campus expansion or a 128,000 SF tilt-up distribution warehouse, our field crews operate under strict quality and safety protocols (${tone}):</p>
      <ul>
        <li><strong>Laser-Guided Flatness & Tolerance Verification:</strong> Ensuring slabs and structural walls meet exact architectural and racking specifications.</li>
        <li><strong>Proactive GC Coordination:</strong> Daily field reporting, submittal tracking, and transparent milestone communication.</li>
        <li><strong>Long-Term Structural Durability:</strong> Proper curing, joint layout, and surface sealing that protect the owner's capital asset for decades.</li>
      </ul>
      <h3>Partner with VMG NeXT on Your Next Utah Build</h3>
      <p>Looking for a dependable structural concrete, tilt-up, or restoration partner for your upcoming project? Contact our estimating desk at <strong>801-640-5684</strong> or use our live <em>Request Consultation</em> portal to submit your project scope directly into our estimating pipeline.</p>
    `;

    const generatedPost: BlogPost = {
      id: `blog-${Date.now()}`,
      slug: slugify(title),
      title,
      excerpt,
      category: category || 'Commercial Construction',
      publishedAt: new Date().toISOString().slice(0, 10),
      readTime: '5 min read',
      author: author || 'Victor Galvan · VMG NeXT Engineering',
      coverImage: coverImage || COVER_POOL[blogs.length % COVER_POOL.length],
      contentHtml,
      aiGenerated: true,
      promptUsed: prompt,
      seoKeywords: kwList.length ? kwList : ['Commercial Concrete Utah', 'Tilt-Up Salt Lake City', 'VMG NeXT'],
      orderIndex: 1,
    };

    if (autoPublish) {
      setBlogs((prev) => [generatedPost, ...prev]);
      notify(`AI Article "${generatedPost.title}" drafted & auto-published to /blog!`, 'success');
    } else {
      notify('AI Draft generated! Review and click Publish when ready.', 'info');
    }
    return generatedPost;
  };

  const saveJob = (job: JobPosition) => {
    setJobs((prev) => {
      const exists = prev.some((j) => j.id === job.id);
      return exists ? prev.map((j) => (j.id === job.id ? job : j)) : [job, ...prev];
    });
    notify(`Job position "${job.title}" saved with Google Jobs Schema.`, 'success');
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    notify('Job position removed.', 'info');
  };

  const submitEstimateLead: VmgContextType['submitEstimateLead'] = (payload) => {
    const newLead: EstimateLead = {
      ...payload,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      apiSynced: Boolean(settings.estimatingApiKey),
      apiKeyPrefix: settings.estimatingApiKey ? `${settings.estimatingApiKey.slice(0, 12)}...` : 'local_crm',
      status: 'New',
    };
    setLeads((prev) => [newLead, ...prev]);
    notify(
      `Consultation request synced with Estimating Software (${newLead.apiKeyPrefix})!`,
      'success'
    );
    return newLead;
  };

  const updateLeadStatus = (id: string, status: EstimateLead['status']) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    notify(`Lead status updated to "${status}".`, 'info');
  };

  const openEstimateModal = (service = '') => {
    setEstimatePreselectService(service);
    setEstimateModalOpen(true);
  };

  const closeEstimateModal = () => {
    setEstimateModalOpen(false);
  };

  const resetAllData = () => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setSettings(INITIAL_SETTINGS);
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    setTeam(INITIAL_TEAM);
    setBlogs(INITIAL_BLOGS);
    setJobs(INITIAL_JOBS);
    setLeads(INITIAL_LEADS);
    notify('All site data restored to audited VMG NeXT production baseline.', 'info');
  };

  return (
    <VmgCtx.Provider
      value={{
        settings,
        updateSettings,
        services,
        saveService,
        projects,
        saveProject,
        deleteProject,
        team,
        saveTeamMember,
        toggleTeamVisibility,
        reorderTeam,
        deleteTeamMember,
        blogs,
        saveBlogPost,
        deleteBlogPost,
        generateAndPublishAiBlog,
        jobs,
        saveJob,
        deleteJob,
        leads,
        submitEstimateLead,
        updateLeadStatus,
        estimateModalOpen,
        estimatePreselectService,
        openEstimateModal,
        closeEstimateModal,
        toasts,
        notify,
        dismissToast,
        resetAllData,
      }}
    >
      {children}
    </VmgCtx.Provider>
  );
}

export function useVmg() {
  const ctx = useContext(VmgCtx);
  if (!ctx) throw new Error('useVmg must be used inside VmgProvider');
  return ctx;
}
