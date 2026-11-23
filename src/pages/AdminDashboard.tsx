import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDown,
  ArrowUp,
  Briefcase,
  Building2,
  CheckCircle2,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  ImagePlus,
  Pencil,
  Plus,
  RotateCcw,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  Wand2,
  Wrench,
  X,
} from 'lucide-react';
import { useVmg, slugify } from '../context/VmgContext';
import { compressImageToDataUrl } from '../lib/imageUtils';
import type { BlogPost, JobPosition, ProjectItem, TeamMember } from '../data/vmgData';

type AdminTab = 'ai-blog' | 'team' | 'projects' | 'careers' | 'leads' | 'settings';

const PRESET_PROMPTS = [
  'Why Tilt-Up Concrete Reduces Winter Construction Schedules for Salt Lake City Warehouses',
  'Structural Concrete Slabs vs. Post-Tensioned Foundations for Utah Industrial Facilities',
  'How Proactive Concrete Restoration Extends Commercial Property Value in Park City',
  'Top 5 Preconstruction Estimating Benchmarks for General Contractors in Utah',
];

const BLOG_COVER_PRESETS = [
  {
    label: 'Tilt-Up Commercial Build',
    url: 'https://vmgnext.com/wp-content/uploads/2025/12/20220813_104243-scaled.jpg',
  },
  {
    label: 'Site Concrete Pour',
    url: 'https://vmgnext.com/wp-content/uploads/2025/09/IMG-20250925-WA0026.jpg',
  },
  {
    label: 'Architectural Facade',
    url: 'https://vmgnext.com/wp-content/uploads/2025/09/ChatGPT-Image-Sep-17-2025-12_27_14-PM.png',
  },
  {
    label: 'Structural Restoration',
    url: 'https://vmgnext.com/wp-content/uploads/2025/12/20220829_084805-scaled.jpg',
  },
];

export function AdminDashboard() {
  const {
    settings,
    updateSettings,
    team,
    saveTeamMember,
    toggleTeamVisibility,
    reorderTeam,
    deleteTeamMember,
    blogs,
    saveBlogPost,
    deleteBlogPost,
    generateAndPublishAiBlog,
    projects,
    saveProject,
    deleteProject,
    services,
    saveService,
    jobs,
    saveJob,
    deleteJob,
    leads,
    updateLeadStatus,
    resetAllData,
    notify,
  } = useVmg();

  const [activeTab, setActiveTab] = useState<AdminTab>('ai-blog');

  // AI Blog Generator State
  const [aiPrompt, setAiPrompt] = useState(PRESET_PROMPTS[0]);
  const [aiCategory, setAiCategory] = useState('Tilt-Up Concrete');
  const [aiTone, setAiTone] = useState('Executive & Technical (For General Contractors)');
  const [aiKeywords, setAiKeywords] = useState('Tilt-Up Concrete Utah, Salt Lake City Warehouses, VMG NeXT');
  const [aiAuthor, setAiAuthor] = useState('Victor Galvan · CEO, VMG NeXT');
  const [aiCover, setAiCover] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [blogEditorView, setBlogEditorView] = useState<'split' | 'code' | 'preview'>('split');
  const [blogKeywordsDraft, setBlogKeywordsDraft] = useState('');

  const openBlogEditor = (post: BlogPost) => {
    setEditingBlog({ ...post });
    setBlogKeywordsDraft((post.seoKeywords || []).join(', '));
    setBlogEditorView('split');
  };

  const insertBlogHtmlBlock = (snippet: string) => {
    setEditingBlog((prev) =>
      prev
        ? {
            ...prev,
            contentHtml: `${prev.contentHtml.trimEnd()}\n${snippet}`,
          }
        : null
    );
  };

  // Team Member Editor Modal State
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [teamFilter, setTeamFilter] = useState<'ALL' | 'VISIBLE' | 'HIDDEN'>('ALL');

  // Project Editor Modal State
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Job Editor Modal State
  const [editingJob, setEditingJob] = useState<JobPosition | null>(null);

  // Settings Draft State
  const [settingsDraft, setSettingsDraft] = useState(settings);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    onResult: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImageToDataUrl(file);
      onResult(compressed);
      notify('Image compressed & optimized in browser ($0 storage cost).', 'info');
    } catch {
      notify('Could not process image file. Please select a valid PNG/JPG/WebP.', 'error');
    } finally {
      e.target.value = '';
    }
  };

  const handleRunAiBlog = async (autoPublish: boolean) => {
    if (!aiPrompt.trim()) {
      notify('Please enter a prompt or topic for the AI blog article.', 'error');
      return;
    }
    setAiGenerating(true);
    try {
      const generated = await generateAndPublishAiBlog({
        prompt: aiPrompt,
        category: aiCategory,
        tone: aiTone,
        keywords: aiKeywords,
        author: aiAuthor,
        coverImage: aiCover || undefined,
        autoPublish,
      });
      if (!autoPublish) {
        openBlogEditor(generated);
      }
    } finally {
      setAiGenerating(false);
    }
  };

  const sortedTeam = [...team]
    .sort((a, b) => a.orderIndex - b.orderIndex)
    .filter((m) =>
      teamFilter === 'VISIBLE' ? m.visible : teamFilter === 'HIDDEN' ? !m.visible : true
    );

  return (
    <div className="vmg-admin-scope min-h-screen bg-[#f4f4f6] pb-20 text-[#121214]">
      {/* Top Executive Admin Banner */}
      <div className="border-b border-zinc-200 bg-[#121214] py-8 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E70000]/40 bg-[#E70000]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#ff6b6b]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>VMG NeXT Autonomous Control Center · $0/mo Cloud Architecture</span>
              </div>
              <h1 className="mt-2 font-heading text-2xl font-extrabold sm:text-4xl">
                Admin CMS &amp; AI Publishing Suite
              </h1>
              <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                Manage Team Members (photos, bios &amp; visibility), auto-publish SEO blogs with AI prompts, update project portfolios, and track Estimating API leads.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={resetAllData}
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 text-xs font-semibold text-zinc-300 transition hover:bg-white/10"
                title="Reset demo changes to default audited data"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Demo Data</span>
              </button>
              <Link
                to="/"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-full bg-white px-5 text-xs font-bold uppercase tracking-wider text-[#121214] transition hover:bg-[#E70000] hover:text-white"
              >
                <span>View Live Site</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Navigation Tabs (Horizontally scrollable on mobile, wrapping on desktop) */}
          <div className="no-scrollbar mt-7 flex flex-nowrap gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {[
              { id: 'ai-blog', label: 'AI Blog Studio & Auto-Publisher', icon: Wand2, count: blogs.length },
              { id: 'team', label: 'Team Members 360°', icon: Users, count: `${team.filter((t) => t.visible).length}/${team.length}` },
              { id: 'projects', label: 'Projects & Services', icon: Building2, count: projects.length },
              { id: 'careers', label: 'Careers & Jobs ATS', icon: Briefcase, count: jobs.length },
              { id: 'leads', label: 'Estimating API Leads', icon: Wrench, count: leads.length },
              { id: 'settings', label: 'API Keys & Cloud $0', icon: Settings },
            ].map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as AdminTab)}
                  className={`inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-xl px-4 text-xs font-bold transition ${
                    active
                      ? 'bg-[#E70000] text-white shadow-lg shadow-[#E70000]/30'
                      : 'bg-white/10 text-zinc-300 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{t.label}</span>
                  {t.count !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono-code text-[10px] ${
                        active ? 'bg-black/30 text-white' : 'bg-white/10 text-zinc-300'
                      }`}
                    >
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Workspace Container */}
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ====================================================================
            TAB 1: AI BLOG STUDIO & AUTO-PUBLISHER
            ==================================================================== */}
        {activeTab === 'ai-blog' && (
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Column: Prompt to Auto-Publish Engine */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-6">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E70000]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#E70000]">
                  <Wand2 className="h-3.5 w-3.5" /> Prompt-to-Blog AI Auto-Publisher
                </span>
                <span className="font-mono-code text-xs text-zinc-500">SEO Schema Ready</span>
              </div>

              <h2 className="mt-3 font-heading text-2xl font-extrabold text-[#121214]">
                Draft &amp; Publish a Construction Blog from a Prompt
              </h2>
              <p className="mt-1 text-xs text-zinc-500">
                Type a topic or click a preset below. The AI structures headings, Utah local SEO keywords, technical takeaways, and publishes it directly to <code>/blog</code>.
              </p>

              {/* Preset Prompt Pills */}
              <div className="mt-4">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  Quick Construction Prompt Presets:
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {PRESET_PROMPTS.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAiPrompt(p)}
                      className={`rounded-xl border px-3 py-1.5 text-left text-xs transition ${
                        aiPrompt === p
                          ? 'border-[#E70000] bg-[#E70000]/10 font-semibold text-[#121214]'
                          : 'border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-400'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Your Blog Prompt / Topic *
                  </span>
                  <textarea
                    rows={3}
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. Write a technical blog about why cast-in-place foundation walls are critical for Park City hillside commercial builds..."
                    className="w-full rounded-xl border border-zinc-300 bg-white p-3.5 text-sm text-[#121214] focus:border-[#E70000] focus:outline-none"
                  />
                </label>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Category
                    </span>
                    <select
                      value={aiCategory}
                      onChange={(e) => setAiCategory(e.target.value)}
                      className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm"
                    >
                      <option value="Tilt-Up Concrete">Tilt-Up Concrete</option>
                      <option value="Structural Concrete">Structural Concrete</option>
                      <option value="Commercial Construction">Commercial Construction</option>
                      <option value="Structural Restoration">Structural Restoration</option>
                      <option value="Educational & Institutional">Educational &amp; Institutional</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Editorial Tone
                    </span>
                    <select
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm"
                    >
                      <option value="Executive & Technical (For General Contractors)">
                        Executive &amp; Technical (For GCs)
                      </option>
                      <option value="Educational & Solution-Oriented (For Property Owners)">
                        Educational (For Property Owners)
                      </option>
                      <option value="Project Case Study & ROI Analysis">
                        Project Case Study &amp; ROI
                      </option>
                    </select>
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Target SEO Keywords (Comma separated)
                    </span>
                    <input
                      type="text"
                      value={aiKeywords}
                      onChange={(e) => setAiKeywords(e.target.value)}
                      className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Author Byline
                    </span>
                    <input
                      type="text"
                      value={aiAuthor}
                      onChange={(e) => setAiAuthor(e.target.value)}
                      className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm"
                    />
                  </label>
                </div>

                {/* Optional Cover Photo Upload */}
                <div>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Cover Photo (Optional — Auto-selects real VMG NeXT project photo if empty)
                  </span>
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="inline-flex min-h-[42px] items-center gap-2 rounded-xl border border-zinc-300 bg-zinc-50 px-4 text-xs font-bold text-[#121214] hover:border-[#E70000]">
                      <ImagePlus className="h-4 w-4 text-[#E70000]" />
                      <span>Upload &amp; Compress Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setAiCover(url))}
                        className="sr-only"
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste image URL..."
                      value={aiCover}
                      onChange={(e) => setAiCover(e.target.value)}
                      className="min-h-[42px] flex-1 rounded-xl border border-zinc-300 bg-white px-3.5 text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    type="button"
                    disabled={aiGenerating}
                    onClick={() => handleRunAiBlog(true)}
                    className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-[#E70000] px-6 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E70000]/25 transition hover:bg-[#121214] disabled:opacity-50"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>
                      {aiGenerating ? 'Drafting & Publishing SEO Article...' : 'Generate & Auto-Publish Now'}
                    </span>
                  </button>
                  <button
                    type="button"
                    disabled={aiGenerating}
                    onClick={() => handleRunAiBlog(false)}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-xs font-bold uppercase tracking-wider text-[#121214] hover:border-[#E70000]"
                  >
                    <span>Draft to Review First</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Published Blogs List & Manual Editor Trigger */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div>
                  <h3 className="font-heading text-xl font-extrabold text-[#121214]">
                    Published Blog Articles ({blogs.length})
                  </h3>
                  <p className="text-xs text-zinc-500">
                    All articles are live at <code>/blog</code> with automatic Schema.org metadata.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openBlogEditor({
                      id: `blog-${Date.now()}`,
                      slug: '',
                      title: '',
                      excerpt: '',
                      category: 'Commercial Construction',
                      publishedAt: new Date().toISOString().slice(0, 10),
                      readTime: '5 min read',
                      author: 'Victor Galvan · VMG NeXT',
                      coverImage: BLOG_COVER_PRESETS[0].url,
                      contentHtml:
                        '<p>Write an engaging introduction focused on Utah commercial construction...</p>\n<h2>Key Engineering Takeaways</h2>\n<ul>\n  <li><strong>Structural Precision:</strong> Engineered tolerances for demanding commercial scopes.</li>\n</ul>',
                      seoKeywords: ['Commercial Concrete Utah', 'VMG NeXT'],
                      orderIndex: 1,
                    })
                  }
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full bg-[#121214] px-4 text-xs font-bold text-white transition hover:bg-[#E70000]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Manual Post</span>
                </button>
              </div>

              <div className="mt-5 space-y-3.5">
                {blogs.map((post) => (
                  <div
                    key={post.id}
                    className="group flex flex-col gap-3.5 rounded-2xl border border-zinc-200 bg-[#f8f9fb] p-3.5 transition hover:border-[#E70000]/40 hover:bg-white hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 flex-1 items-start gap-3.5 sm:items-center">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="h-20 w-24 shrink-0 rounded-xl border border-zinc-200 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-[#121214] px-2.5 py-0.5 font-mono-code text-[10px] font-bold uppercase tracking-wider text-white">
                            {post.category}
                          </span>
                          <span className="font-mono-code text-[11px] text-zinc-500">
                            {post.publishedAt} · {post.readTime}
                          </span>
                          {post.aiGenerated && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#E70000]/10 px-2 py-0.5 text-[10px] font-bold text-[#E70000]">
                              <Sparkles className="h-2.5 w-2.5" /> AI Auto-Published
                            </span>
                          )}
                        </div>
                        <h4 className="mt-1.5 truncate font-heading text-sm font-bold text-[#121214]">
                          {post.title}
                        </h4>
                        <p className="mt-0.5 line-clamp-1 text-xs text-zinc-500">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-end gap-2 border-t border-zinc-200/70 pt-2.5 sm:border-t-0 sm:pt-0">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-300 bg-white px-3 text-xs font-bold text-zinc-700 transition hover:border-[#121214] hover:text-[#121214]"
                        title="Open public article"
                      >
                        <span>View</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openBlogEditor(post)}
                        className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-[#121214] px-3 text-xs font-bold text-white transition hover:bg-[#E70000]"
                        title="Edit article"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBlogPost(post.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-300 bg-white text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
                        title="Delete article"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 2: TEAM MEMBERS MANAGER 360° (Active + Hidden Roster)
            ==================================================================== */}
        {activeTab === 'team' && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E70000]">
                  Zero HTML Editing Required
                </span>
                <h2 className="mt-1 font-heading text-2xl font-extrabold text-[#121214] sm:text-3xl">
                  Team Members &amp; Biography Manager ({team.length})
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Update card photos, high-res detail portraits, titles, and full biographies—or hide/unhide members (like Savannah, Zachariah, Levi, Abner, Rene, Eduardo) in 1 click without touching code.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex rounded-full border border-zinc-200 bg-zinc-100 p-1 text-xs font-bold">
                  {(['ALL', 'VISIBLE', 'HIDDEN'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setTeamFilter(f)}
                      className={`rounded-full px-3.5 py-1.5 transition ${
                        teamFilter === f ? 'bg-[#121214] text-white' : 'text-zinc-600'
                      }`}
                    >
                      {f === 'ALL'
                        ? `All (${team.length})`
                        : f === 'VISIBLE'
                          ? `Visible (${team.filter((m) => m.visible).length})`
                          : `Hidden (${team.filter((m) => !m.visible).length})`}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditingMember({
                      id: `tm-${Date.now()}`,
                      slug: '',
                      name: '',
                      role: '',
                      department: 'Operations & Restoration',
                      cardPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/VictorGalvanPreviewFinal.png',
                      detailPhoto: 'https://vmgnext.com/wp-content/uploads/2025/10/VictorFinal2.png',
                      bioPara1: '',
                      bioPara2: '',
                      visible: true,
                      orderIndex: team.length + 1,
                    })
                  }
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#E70000] px-6 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#121214]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Team Member</span>
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {sortedTeam.map((member) => (
                <div
                  key={member.id}
                  className={`flex flex-col justify-between rounded-2xl border p-4 transition ${
                    member.visible
                      ? 'border-zinc-200 bg-white shadow-sm'
                      : 'border-dashed border-zinc-300 bg-zinc-100/80 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={member.cardPhoto}
                      alt={member.name}
                      className="h-20 w-16 shrink-0 rounded-xl bg-zinc-900 object-cover object-top"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                            member.visible
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {member.visible ? '● Visible on Site' : '○ Hidden (Archived)'}
                        </span>
                        <span className="font-mono-code text-[11px] text-zinc-400">
                          #{member.orderIndex}
                        </span>
                      </div>
                      <h3 className="mt-1.5 truncate font-heading text-base font-extrabold text-[#121214]">
                        {member.name}
                      </h3>
                      <p className="truncate text-xs font-semibold text-[#E70000]">{member.role}</p>
                      <p className="text-[11px] text-zinc-500">{member.department}</p>
                    </div>
                  </div>

                  {member.note && (
                    <p className="mt-2 rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] text-amber-800">
                      {member.note}
                    </p>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-zinc-100 pt-3">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => reorderTeam(member.id, -1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-[#121214]"
                        title="Move Up"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => reorderTeam(member.id, 1)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-[#121214]"
                        title="Move Down"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                      <Link
                        to={`/team/${member.slug}`}
                        className="ml-1 text-[11px] font-bold text-zinc-500 hover:text-[#E70000]"
                      >
                        View Bio ↗
                      </Link>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleTeamVisibility(member.id)}
                        className={`inline-flex h-8 items-center gap-1 rounded-lg px-2.5 text-[11px] font-bold transition ${
                          member.visible
                            ? 'bg-zinc-100 text-zinc-700 hover:bg-amber-100 hover:text-amber-900'
                            : 'bg-emerald-600 text-white hover:bg-emerald-700'
                        }`}
                        title={member.visible ? 'Hide from public website' : 'Restore to public website'}
                      >
                        {member.visible ? (
                          <>
                            <EyeOff className="h-3.5 w-3.5" /> <span>Hide</span>
                          </>
                        ) : (
                          <>
                            <Eye className="h-3.5 w-3.5" /> <span>Unhide</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setEditingMember(member)}
                        className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#121214] px-2.5 text-[11px] font-bold text-white hover:bg-[#E70000]"
                      >
                        <Pencil className="h-3 w-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteTeamMember(member.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-rose-600 hover:bg-rose-50"
                        title="Delete permanently"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: PROJECTS PORTFOLIO & SERVICES MANAGER
            ==================================================================== */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
                <div>
                  <h2 className="font-heading text-2xl font-extrabold text-[#121214]">
                    Featured Projects Portfolio ({projects.length})
                  </h2>
                  <p className="text-xs text-zinc-500">
                    Add or update project cards, concrete budget scopes, square footage, GCs, and multi-photo galleries.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setEditingProject({
                      id: `prj-${Date.now()}`,
                      number: `0${projects.length + 1}`,
                      name: '',
                      market: 'Warehouse',
                      priceRange: '$250,000 – $400,000',
                      gc: '',
                      sqft: '25,000 SF',
                      description: '',
                      photos: ['https://vmgnext.com/wp-content/uploads/2025/07/tilt-up.png'],
                      visible: true,
                      orderIndex: projects.length + 1,
                    })
                  }
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#E70000] px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#121214]"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add New Project</span>
                </button>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {projects.map((prj) => (
                  <div
                    key={prj.id}
                    className="flex gap-4 rounded-2xl border border-zinc-200 bg-[#f7f7f8] p-4"
                  >
                    <img
                      src={prj.photos[0]}
                      alt={prj.name}
                      className="h-24 w-28 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono-code text-xs font-bold text-[#E70000]">
                            #{prj.number} · {prj.market}
                          </span>
                          <span className="font-mono-code text-xs font-bold text-[#121214]">
                            {prj.priceRange}
                          </span>
                        </div>
                        <h3 className="mt-1 font-heading text-base font-extrabold text-[#121214]">
                          {prj.name}
                        </h3>
                        <p className="text-xs text-zinc-500">
                          GC: {prj.gc} · {prj.sqft} · {prj.photos.length} photos
                        </p>
                      </div>
                      <div className="mt-3 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(prj)}
                          className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#121214] px-3 text-xs font-bold text-white hover:bg-[#E70000]"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProject(prj.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-300 bg-white text-rose-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Services Visibility Toggle (including High-End Homes) */}
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <h3 className="font-heading text-xl font-extrabold text-[#121214]">
                Construction Services Visibility ({services.length})
              </h3>
              <p className="text-xs text-zinc-500">
                Toggle which services appear on <code>/services</code> and homepage carousels (e.g., High-End Homes is preserved and can be enabled anytime).
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((srv) => (
                  <div
                    key={srv.id}
                    className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-[#f7f7f8] p-4"
                  >
                    <div>
                      <div className="font-heading text-sm font-bold text-[#121214]">{srv.title}</div>
                      <div className="text-[11px] text-zinc-500">
                        {srv.visible ? 'Active on site' : 'Hidden (Commented in legacy WP)'}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => saveService({ ...srv, visible: !srv.visible })}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold ${
                        srv.visible
                          ? 'bg-emerald-600 text-white'
                          : 'border border-zinc-300 bg-white text-zinc-700'
                      }`}
                    >
                      {srv.visible ? 'Active' : 'Enable'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 4: CAREERS & OPEN POSITIONS ATS
            ==================================================================== */}
        {activeTab === 'careers' && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
              <div>
                <h2 className="font-heading text-2xl font-extrabold text-[#121214]">
                  Careers &amp; Open Construction Positions ({jobs.length})
                </h2>
                <p className="text-xs text-zinc-500">
                  Manage open roles on <code>/careers</code>. Automatically generates Google Jobs <code>JobPosting</code> structured data.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setEditingJob({
                    id: `job-${Date.now()}`,
                    title: '',
                    type: 'Full Time',
                    location: 'Salt Lake City, UT',
                    department: 'Field Operations',
                    description: '',
                    salaryRange: 'Competitive Pay + 401(k) Match + Medical',
                    visible: true,
                    datePosted: new Date().toISOString().slice(0, 10),
                  })
                }
                className="inline-flex min-h-[42px] items-center gap-2 rounded-full bg-[#E70000] px-5 text-xs font-bold uppercase tracking-wider text-white"
              >
                <Plus className="h-4 w-4" />
                <span>Post New Job</span>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-[#f7f7f8] p-5"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#E70000] px-2.5 py-0.5 text-[10px] font-bold uppercase text-white">
                        {job.type}
                      </span>
                      <span className="text-xs font-semibold text-zinc-500">
                        {job.location} · {job.department}
                      </span>
                    </div>
                    <h3 className="mt-1 font-heading text-lg font-extrabold text-[#121214]">
                      {job.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-xs text-zinc-600">{job.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => saveJob({ ...job, visible: !job.visible })}
                      className={`rounded-xl px-3 py-1.5 text-xs font-bold ${
                        job.visible ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-200 text-zinc-600'
                      }`}
                    >
                      {job.visible ? 'Hiring Active' : 'Paused'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingJob(job)}
                      className="rounded-xl bg-[#121214] px-3 py-1.5 text-xs font-bold text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteJob(job.id)}
                      className="rounded-xl border border-zinc-300 bg-white p-1.5 text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 5: ESTIMATING SOFTWARE LEADS & API BRIDGE (ocv1_...)
            ==================================================================== */}
        {activeTab === 'leads' && (
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-5">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Estimating API Key Connected: {settings.estimatingApiKey.slice(0, 18)}...</span>
                </div>
                <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#121214]">
                  Estimating Software Lead Pipeline ({leads.length})
                </h2>
                <p className="text-xs text-zinc-500">
                  Every prospect who clicks &ldquo;Request Consultation&rdquo; is synced with your estimating software key and logged here.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-2xl border border-zinc-200 bg-[#f7f7f8] p-5 transition hover:border-[#E70000]"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-heading text-base font-extrabold text-[#121214]">
                          {lead.fullName}
                        </span>
                        <span className="rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-semibold text-zinc-700">
                          {lead.company}
                        </span>
                        <span className="font-mono-code text-xs text-zinc-500">{lead.createdAt}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-4 text-xs text-zinc-600">
                        <span>Email: <strong>{lead.email}</strong></span>
                        <span>Phone: <strong>{lead.phone}</strong></span>
                        <span>Location: <strong>{lead.projectLocation}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateLeadStatus(lead.id, e.target.value as typeof lead.status)
                        }
                        className="min-h-[36px] rounded-xl border border-zinc-300 bg-white px-3 text-xs font-bold text-[#121214]"
                      >
                        <option value="New">● New Lead</option>
                        <option value="In Estimating">◐ In Estimating</option>
                        <option value="Proposal Sent">✓ Proposal Sent</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 rounded-xl border border-zinc-200 bg-white p-3.5 text-xs sm:grid-cols-4">
                    <div>
                      <span className="text-zinc-400">Scope:</span>{' '}
                      <strong className="text-[#121214]">{lead.serviceType}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">Size:</span>{' '}
                      <strong className="text-[#121214]">{lead.estimatedSqft}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">Budget:</span>{' '}
                      <strong className="text-[#E70000]">{lead.budgetRange}</strong>
                    </div>
                    <div>
                      <span className="text-zinc-400">API Sync:</span>{' '}
                      <strong className="font-mono-code text-emerald-700">{lead.apiKeyPrefix}</strong>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-zinc-600">&ldquo;{lead.message}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 6: SITE SETTINGS, API KEYS & $0 CLOUD SAVINGS
            ==================================================================== */}
        {activeTab === 'settings' && (
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7">
              <h2 className="font-heading text-2xl font-extrabold text-[#121214]">
                Company Settings, Estimating API &amp; AI Configuration
              </h2>
              <div className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">
                      Public Phone
                    </span>
                    <input
                      type="text"
                      value={settingsDraft.phone}
                      onChange={(e) => setSettingsDraft({ ...settingsDraft, phone: e.target.value })}
                      className="min-h-[44px] w-full rounded-xl border border-zinc-300 px-3.5 text-sm"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">
                      General &amp; Estimating Email
                    </span>
                    <input
                      type="email"
                      value={settingsDraft.emailGeneral}
                      onChange={(e) =>
                        setSettingsDraft({ ...settingsDraft, emailGeneral: e.target.value })
                      }
                      className="min-h-[44px] w-full rounded-xl border border-zinc-300 px-3.5 text-sm"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">
                    Utah Headquarters Address
                  </span>
                  <input
                    type="text"
                    value={settingsDraft.address}
                    onChange={(e) => setSettingsDraft({ ...settingsDraft, address: e.target.value })}
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 px-3.5 text-sm"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase text-[#E70000]">
                    Estimating Software API Key (Request Consultation Integration)
                  </span>
                  <input
                    type="text"
                    value={settingsDraft.estimatingApiKey}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, estimatingApiKey: e.target.value })
                    }
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 font-mono-code text-xs"
                  />
                </label>

                <label className="block">
                  <span className="mb-1 block text-xs font-bold uppercase text-zinc-700">
                    Google Gemini AI API Key (Optional — Built-in Construction AI Engine active by default)
                  </span>
                  <input
                    type="password"
                    placeholder="AIzaSy... (Leave blank to use built-in $0 Construction AI Generator)"
                    value={settingsDraft.geminiApiKey}
                    onChange={(e) =>
                      setSettingsDraft({ ...settingsDraft, geminiApiKey: e.target.value })
                    }
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 px-3.5 font-mono-code text-xs"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => updateSettings(settingsDraft)}
                  className="min-h-[48px] rounded-full bg-[#E70000] px-8 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#121214]"
                >
                  Save Configuration
                </button>
              </div>
            </div>

            {/* Right: Security Audit & Cost Reduction Summary */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-3xl bg-[#121214] p-7 text-white shadow-xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400">
                  <ShieldCheck className="h-4 w-4" /> Infrastructure &amp; Security Audit
                </span>
                <h3 className="mt-3 font-heading text-2xl font-extrabold">
                  Why This Replaces WordPress + SiteGround
                </h3>
                <ul className="mt-4 space-y-3 text-xs leading-relaxed text-zinc-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      <strong>$0 USD/Month Server Cost:</strong> Eliminates ~$360–$600/yr SiteGround hosting renewals using Google Firebase Spark &amp; GitHub/Edge CDN.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      <strong>Immune to PHP Backdoors:</strong> Completely eliminates the <code>updater.php</code> / <code>header.php</code> self-healing malware injection vulnerability found in WordPress.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      <strong>No More Broken HTML Comments:</strong> Hide/unhide team members, reorder profiles, and upload photos without breaking Swiper HTML or purging SG Cache.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          MODAL: EDIT TEAM MEMBER
          ==================================================================== */}
      {editingMember && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingMember(null);
          }}
          className="fixed inset-0 z-[9995] flex items-center justify-center bg-[#0f0f12]/80 p-3 backdrop-blur-md sm:p-5"
        >
          <div className="vmg-modal-animate max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white text-[#121214] shadow-[0_32px_90px_rgba(0,0,0,0.45)]">
            <div
              className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-white sm:px-7 sm:py-5"
              style={{
                background:
                  'radial-gradient(circle at 92% 20%, rgba(231, 0, 0, 0.24), transparent 55%), #141416',
              }}
            >
              <div>
                <span className="font-mono-code text-[10.5px] font-bold uppercase tracking-widest text-[#ff6b6b]">
                  Team Member 360°
                </span>
                <h3 className="mt-0.5 font-heading text-lg font-extrabold text-white sm:text-xl">
                  {editingMember.name ? `Edit ${editingMember.name}` : 'Add New Team Member'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                aria-label="Close team modal"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-zinc-200 transition hover:border-[#E70000] hover:bg-[#E70000] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Full Name *
                  </span>
                  <input
                    type="text"
                    value={editingMember.name}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        name: e.target.value,
                        slug: editingMember.slug || slugify(e.target.value),
                      })
                    }
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm font-medium text-[#121214]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Role / Title *
                  </span>
                  <input
                    type="text"
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm font-medium text-[#121214]"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Department
                  </span>
                  <select
                    value={editingMember.department}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        department: e.target.value as TeamMember['department'],
                      })
                    }
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-[#121214]"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Operations & Restoration">Operations &amp; Restoration</option>
                    <option value="Estimating">Estimating</option>
                    <option value="Marketing & Business Dev">Marketing &amp; Business Dev</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Profile URL Slug
                  </span>
                  <input
                    type="text"
                    value={editingMember.slug}
                    onChange={(e) => setEditingMember({ ...editingMember, slug: slugify(e.target.value) })}
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 font-mono-code text-xs text-[#121214]"
                  />
                </label>
              </div>

              {/* Card Photo & Detail Portrait Uploaders */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    1. Card Preview Photo (/team)
                  </span>
                  <div className="mt-2.5 flex items-center gap-3">
                    <img
                      src={editingMember.cardPhoto}
                      alt=""
                      className="h-16 w-14 shrink-0 rounded-xl bg-zinc-900 object-cover object-top"
                    />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <label className="inline-flex min-h-[36px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#121214] px-3 text-[11px] font-bold text-white transition hover:bg-[#E70000]">
                        <ImagePlus className="h-3.5 w-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, (url) =>
                              setEditingMember({ ...editingMember, cardPhoto: url })
                            )
                          }
                          className="sr-only"
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or paste image URL..."
                        value={editingMember.cardPhoto}
                        onChange={(e) =>
                          setEditingMember({ ...editingMember, cardPhoto: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-[11px] text-[#121214]"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3.5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    2. Detail Biography Photo
                  </span>
                  <div className="mt-2.5 flex items-center gap-3">
                    <img
                      src={editingMember.detailPhoto || editingMember.cardPhoto}
                      alt=""
                      className="h-16 w-14 shrink-0 rounded-xl bg-zinc-900 object-cover object-top"
                    />
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <label className="inline-flex min-h-[36px] w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#121214] px-3 text-[11px] font-bold text-white transition hover:bg-[#E70000]">
                        <ImagePlus className="h-3.5 w-3.5" />
                        <span>Upload File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, (url) =>
                              setEditingMember({ ...editingMember, detailPhoto: url })
                            )
                          }
                          className="sr-only"
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Or paste image URL..."
                        value={editingMember.detailPhoto}
                        onChange={(e) =>
                          setEditingMember({ ...editingMember, detailPhoto: e.target.value })
                        }
                        className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-[11px] text-[#121214]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Biography Paragraph 1
                </span>
                <textarea
                  rows={3}
                  value={editingMember.bioPara1}
                  onChange={(e) => setEditingMember({ ...editingMember, bioPara1: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white p-3.5 text-sm leading-relaxed text-[#121214]"
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Biography Paragraph 2
                </span>
                <textarea
                  rows={3}
                  value={editingMember.bioPara2}
                  onChange={(e) => setEditingMember({ ...editingMember, bioPara2: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white p-3.5 text-sm leading-relaxed text-[#121214]"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 pt-4">
                <label className="flex cursor-pointer items-center gap-2.5 text-xs font-bold text-[#121214]">
                  <input
                    type="checkbox"
                    checked={editingMember.visible}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, visible: e.target.checked })
                    }
                    className="h-4 w-4 rounded accent-[#E70000]"
                  />
                  <span>Visible on public Team page</span>
                </label>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingMember(null)}
                    className="min-h-[42px] rounded-full border border-zinc-300 bg-white px-5 text-xs font-bold text-zinc-700 transition hover:border-zinc-400 hover:bg-zinc-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!editingMember.name.trim()) return;
                      saveTeamMember(editingMember);
                      setEditingMember(null);
                    }}
                    className="min-h-[42px] rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E70000]/25 transition hover:bg-[#121214]"
                  >
                    Save Team Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: EDITORIAL BLOG COMPOSER & LIVE PREVIEW
          ==================================================================== */}
      {editingBlog && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingBlog(null);
          }}
          className="fixed inset-0 z-[9995] flex items-center justify-center bg-[#0f0f12]/80 p-3 backdrop-blur-md sm:p-5"
        >
          <div className="vmg-modal-animate flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white text-[#121214] shadow-[0_32px_90px_rgba(0,0,0,0.48)]">
            {/* Sticky Obsidian Studio Header */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4 text-white sm:px-7 sm:py-5"
              style={{
                background:
                  'radial-gradient(circle at 92% 20%, rgba(231, 0, 0, 0.25), transparent 55%), #141416',
              }}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono-code text-[10.5px] font-bold uppercase tracking-widest text-[#ff6b6b]">
                    Editorial &amp; SEO Blog Composer
                  </span>
                  {editingBlog.aiGenerated && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#E70000]/25 px-2.5 py-0.5 text-[10px] font-bold text-[#ffdede]">
                      <Sparkles className="h-2.5 w-2.5" /> AI Generated Draft
                    </span>
                  )}
                </div>
                <h3 className="mt-0.5 font-heading text-lg font-extrabold text-white sm:text-xl">
                  {editingBlog.title ? editingBlog.title : 'Compose New Field Journal Article'}
                </h3>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="flex rounded-full border border-white/15 bg-white/5 p-1">
                  {(
                    [
                      { id: 'split', label: 'Split View' },
                      { id: 'code', label: 'Editor' },
                      { id: 'preview', label: 'Live Preview' },
                    ] as const
                  ).map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setBlogEditorView(mode.id)}
                      className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                        blogEditorView === mode.id
                          ? 'bg-[#E70000] text-white shadow'
                          : 'text-zinc-300 hover:text-white'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  aria-label="Close blog modal"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-zinc-200 transition hover:border-[#E70000] hover:bg-[#E70000] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 space-y-5 overflow-y-auto p-5 sm:p-7">
              {/* Top Metadata & Cover Studio */}
              <div className="grid gap-5 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-7">
                  <label className="block">
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Article Headline *
                    </span>
                    <input
                      type="text"
                      placeholder="e.g. Why Tilt-Up Concrete Speeds Up Industrial Delivery in Utah"
                      value={editingBlog.title}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditingBlog({
                          ...editingBlog,
                          title: val,
                          slug: editingBlog.slug ? editingBlog.slug : slugify(val),
                        });
                      }}
                      className="min-h-[46px] w-full rounded-xl border border-zinc-300 bg-white px-4 text-sm font-bold text-[#121214]"
                    />
                  </label>

                  <div className="grid gap-3.5 sm:grid-cols-3">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                        Category
                      </span>
                      <select
                        value={editingBlog.category}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, category: e.target.value })
                        }
                        className="min-h-[42px] w-full rounded-xl border border-zinc-300 bg-white px-3 text-xs font-semibold text-[#121214]"
                      >
                        <option value="Commercial Construction">Commercial Construction</option>
                        <option value="Tilt-Up Concrete">Tilt-Up Concrete</option>
                        <option value="Structural Concrete">Structural Concrete</option>
                        <option value="Structural Restoration">Structural Restoration</option>
                        <option value="Educational & Institutional">
                          Educational &amp; Institutional
                        </option>
                        {![
                          'Commercial Construction',
                          'Tilt-Up Concrete',
                          'Structural Concrete',
                          'Structural Restoration',
                          'Educational & Institutional',
                        ].includes(editingBlog.category) && (
                          <option value={editingBlog.category}>{editingBlog.category}</option>
                        )}
                      </select>
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                        Publish Date
                      </span>
                      <input
                        type="date"
                        value={editingBlog.publishedAt}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, publishedAt: e.target.value })
                        }
                        className="min-h-[42px] w-full rounded-xl border border-zinc-300 bg-white px-3 text-xs text-[#121214]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                        Read Time
                      </span>
                      <input
                        type="text"
                        placeholder="5 min read"
                        value={editingBlog.readTime}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, readTime: e.target.value })
                        }
                        className="min-h-[42px] w-full rounded-xl border border-zinc-300 bg-white px-3 text-xs text-[#121214]"
                      />
                    </label>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                        Author Byline
                      </span>
                      <input
                        type="text"
                        value={editingBlog.author}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, author: e.target.value })
                        }
                        className="min-h-[42px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-xs font-medium text-[#121214]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                        URL Slug (/blog/...)
                      </span>
                      <input
                        type="text"
                        value={editingBlog.slug}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, slug: slugify(e.target.value) })
                        }
                        className="min-h-[42px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 font-mono-code text-xs text-[#121214]"
                      />
                    </label>
                  </div>

                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                        SEO Excerpt Summary
                      </span>
                      <textarea
                        rows={2}
                        value={editingBlog.excerpt}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, excerpt: e.target.value })
                        }
                        className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-xs leading-relaxed text-[#121214]"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                        SEO Keywords (Comma separated)
                      </span>
                      <textarea
                        rows={2}
                        placeholder="Utah Tilt-Up, Salt Lake City Commercial Concrete"
                        value={blogKeywordsDraft}
                        onChange={(e) => setBlogKeywordsDraft(e.target.value)}
                        className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-xs leading-relaxed text-[#121214]"
                      />
                    </label>
                  </div>
                </div>

                {/* Cover Photo Studio */}
                <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-[#f8f9fb] p-4 lg:col-span-5">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
                      Cover Image Studio
                    </span>
                    <div className="mt-2.5 overflow-hidden rounded-xl border border-zinc-200 bg-[#141416]">
                      <img
                        src={editingBlog.coverImage}
                        alt={editingBlog.title || 'Article cover preview'}
                        className="h-44 w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="mt-3 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="inline-flex min-h-[38px] cursor-pointer items-center gap-1.5 rounded-xl bg-[#121214] px-3.5 text-xs font-bold text-white transition hover:bg-[#E70000]">
                        <ImagePlus className="h-3.5 w-3.5" />
                        <span>Upload Cover</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            handleImageUpload(e, (url) =>
                              setEditingBlog({ ...editingBlog, coverImage: url })
                            )
                          }
                          className="sr-only"
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Paste image URL..."
                        value={editingBlog.coverImage}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, coverImage: e.target.value })
                        }
                        className="min-h-[38px] min-w-0 flex-1 rounded-xl border border-zinc-300 bg-white px-3 text-xs text-[#121214]"
                      />
                    </div>

                    <div>
                      <span className="block font-mono-code text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                        Quick-Pick Real VMG NeXT Photos:
                      </span>
                      <div className="mt-1.5 grid grid-cols-4 gap-2">
                        {BLOG_COVER_PRESETS.map((preset) => (
                          <button
                            key={preset.url}
                            type="button"
                            onClick={() =>
                              setEditingBlog({ ...editingBlog, coverImage: preset.url })
                            }
                            title={preset.label}
                            className={`overflow-hidden rounded-lg border-2 transition ${
                              editingBlog.coverImage === preset.url
                                ? 'border-[#E70000] ring-2 ring-[#E70000]/25'
                                : 'border-transparent opacity-75 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="h-11 w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content Studio: Formatting Bar + Split Code / Live Preview */}
              <div className="rounded-2xl border border-zinc-200 bg-[#f8f9fb] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-3">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-zinc-800">
                      Article Body &amp; Live Editorial Preview
                    </span>
                    <span className="text-[11px] text-zinc-500">
                      Insert formatted blocks with 1 click and inspect how your article renders on <code>/blog</code>.
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      {
                        label: '+ H2 Section',
                        code: '\n<h2>New Technical Section Heading</h2>\n<p>Explain structural details, mix tolerances, and schedule impact...</p>',
                      },
                      {
                        label: '+ H3 Subhead',
                        code: '\n<h3>Key Engineering Consideration</h3>',
                      },
                      {
                        label: '+ Quote',
                        code: '\n<blockquote>"Disciplined preconstruction protects schedule velocity and structural integrity."</blockquote>',
                      },
                      {
                        label: '+ Bullet List',
                        code: '\n<ul>\n  <li><strong>Milestone Control:</strong> Engineered sequencing across footings and slabs.</li>\n  <li><strong>Quality Assurance:</strong> Laser-screed flatness &amp; core verification.</li>\n</ul>',
                      },
                      {
                        label: '+ Paragraph',
                        code: '\n<p>Add additional field perspective for general contractors across the Wasatch Front.</p>',
                      },
                    ].map((tool) => (
                      <button
                        key={tool.label}
                        type="button"
                        onClick={() => insertBlogHtmlBlock(tool.code)}
                        className="rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 font-mono-code text-[11px] font-bold text-[#121214] transition hover:border-[#E70000] hover:bg-[#fff5f5] hover:text-[#E70000]"
                      >
                        {tool.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div
                  className={`mt-4 grid gap-4 ${
                    blogEditorView === 'split' ? 'lg:grid-cols-2' : 'grid-cols-1'
                  }`}
                >
                  {blogEditorView !== 'preview' && (
                    <div className="flex flex-col">
                      <span className="mb-1.5 font-mono-code text-[10.5px] font-bold uppercase tracking-wider text-zinc-500">
                        HTML Content Source
                      </span>
                      <textarea
                        rows={13}
                        value={editingBlog.contentHtml}
                        onChange={(e) =>
                          setEditingBlog({ ...editingBlog, contentHtml: e.target.value })
                        }
                        className="min-h-[320px] w-full flex-1 rounded-2xl border border-zinc-300 bg-white p-4 font-mono-code text-xs leading-relaxed text-[#121214]"
                      />
                    </div>
                  )}

                  {blogEditorView !== 'code' && (
                    <div className="flex flex-col">
                      <span className="mb-1.5 font-mono-code text-[10.5px] font-bold uppercase tracking-wider text-[#E70000]">
                        Live Public Article Preview
                      </span>
                      <div className="vmg-blog-editor-preview max-h-[380px] min-h-[320px] flex-1 overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
                        <div
                          className="vmg-blog-prose"
                          dangerouslySetInnerHTML={{ __html: editingBlog.contentHtml }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Sticky Bottom Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 bg-zinc-50 px-5 py-4 sm:px-7">
              <div className="font-mono-code text-[11px] text-zinc-500">
                Slug: <code>/blog/{editingBlog.slug || slugify(editingBlog.title || 'new-article')}</code>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBlog(null)}
                  className="min-h-[42px] rounded-full border border-zinc-300 bg-white px-5 text-xs font-bold text-zinc-700 transition hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!editingBlog.title.trim()) {
                      notify('Please enter an article headline before publishing.', 'error');
                      return;
                    }
                    const parsedKw = blogKeywordsDraft
                      .split(',')
                      .map((k) => k.trim())
                      .filter(Boolean);
                    saveBlogPost({
                      ...editingBlog,
                      slug: editingBlog.slug.trim() || slugify(editingBlog.title),
                      seoKeywords: parsedKw,
                    });
                    setEditingBlog(null);
                  }}
                  className="min-h-[42px] rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E70000]/25 transition hover:bg-[#121214]"
                >
                  Publish &amp; Save Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: EDIT PROJECT
          ==================================================================== */}
      {editingProject && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingProject(null);
          }}
          className="fixed inset-0 z-[9995] flex items-center justify-center bg-[#0f0f12]/80 p-3 backdrop-blur-md sm:p-5"
        >
          <div className="vmg-modal-animate max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white text-[#121214] shadow-[0_32px_90px_rgba(0,0,0,0.45)]">
            <div
              className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-white sm:px-7 sm:py-5"
              style={{
                background:
                  'radial-gradient(circle at 92% 20%, rgba(231, 0, 0, 0.24), transparent 55%), #141416',
              }}
            >
              <div>
                <span className="font-mono-code text-[10.5px] font-bold uppercase tracking-widest text-[#ff6b6b]">
                  Portfolio Case Study
                </span>
                <h3 className="mt-0.5 font-heading text-lg font-extrabold text-white sm:text-xl">
                  {editingProject.name || 'Add Featured Project'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                aria-label="Close project modal"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-zinc-200 transition hover:border-[#E70000] hover:bg-[#E70000] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5 sm:p-7">
              {editingProject.photos?.[0] && (
                <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-[#f8f9fb] p-3">
                  <img
                    src={editingProject.photos[0]}
                    alt={editingProject.name}
                    className="h-16 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="block font-mono-code text-[10.5px] font-bold uppercase text-[#E70000]">
                      Gallery Preview ({editingProject.photos.length} photos)
                    </span>
                    <input
                      type="text"
                      placeholder="Primary thumbnail URL..."
                      value={editingProject.photos[0]}
                      onChange={(e) => {
                        const nextPhotos = [...editingProject.photos];
                        nextPhotos[0] = e.target.value;
                        setEditingProject({ ...editingProject, photos: nextPhotos });
                      }}
                      className="mt-1.5 min-h-[36px] w-full rounded-lg border border-zinc-300 bg-white px-2.5 text-xs text-[#121214]"
                    />
                  </div>
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Project Name *
                  </span>
                  <input
                    type="text"
                    value={editingProject.name}
                    onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm font-medium text-[#121214]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Market
                  </span>
                  <select
                    value={editingProject.market}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        market: e.target.value as ProjectItem['market'],
                      })
                    }
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-[#121214]"
                  >
                    <option value="Warehouse">Warehouse</option>
                    <option value="Multifamily Residential">Multifamily Residential</option>
                    <option value="Educational Facility">Educational Facility</option>
                    <option value="Hospitality">Hospitality</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Concrete Budget
                  </span>
                  <input
                    type="text"
                    value={editingProject.priceRange}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, priceRange: e.target.value })
                    }
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm text-[#121214]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    General Contractor
                  </span>
                  <input
                    type="text"
                    value={editingProject.gc}
                    onChange={(e) => setEditingProject({ ...editingProject, gc: e.target.value })}
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm text-[#121214]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Square Footage
                  </span>
                  <input
                    type="text"
                    value={editingProject.sqft}
                    onChange={(e) => setEditingProject({ ...editingProject, sqft: e.target.value })}
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm text-[#121214]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Scope Description
                </span>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-300 bg-white p-3.5 text-sm leading-relaxed text-[#121214]"
                />
              </label>

              <div className="flex justify-end gap-3 border-t border-zinc-200 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="min-h-[42px] rounded-full border border-zinc-300 bg-white px-5 text-xs font-bold text-zinc-700 transition hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!editingProject.name.trim()) return;
                    saveProject(editingProject);
                    setEditingProject(null);
                  }}
                  className="min-h-[42px] rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E70000]/25 transition hover:bg-[#121214]"
                >
                  Save Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL: EDIT JOB POSITION
          ==================================================================== */}
      {editingJob && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingJob(null);
          }}
          className="fixed inset-0 z-[9995] flex items-center justify-center bg-[#0f0f12]/80 p-3 backdrop-blur-md sm:p-5"
        >
          <div className="vmg-modal-animate max-h-[92dvh] w-full max-w-xl overflow-y-auto rounded-3xl border border-zinc-200 bg-white text-[#121214] shadow-[0_32px_90px_rgba(0,0,0,0.45)]">
            <div
              className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-white sm:px-7 sm:py-5"
              style={{
                background:
                  'radial-gradient(circle at 92% 20%, rgba(231, 0, 0, 0.24), transparent 55%), #141416',
              }}
            >
              <div>
                <span className="font-mono-code text-[10.5px] font-bold uppercase tracking-widest text-[#ff6b6b]">
                  Careers &amp; Hiring ATS
                </span>
                <h3 className="mt-0.5 font-heading text-lg font-extrabold text-white sm:text-xl">
                  {editingJob.title || 'Post Open Position'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingJob(null)}
                aria-label="Close job modal"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-zinc-200 transition hover:border-[#E70000] hover:bg-[#E70000] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 p-5 sm:p-7">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Job Title *
                </span>
                <input
                  type="text"
                  value={editingJob.title}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm font-medium text-[#121214]"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Location
                  </span>
                  <input
                    type="text"
                    value={editingJob.location}
                    onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm text-[#121214]"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                    Department
                  </span>
                  <input
                    type="text"
                    value={editingJob.department}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    className="min-h-[44px] w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-sm text-[#121214]"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-700">
                  Role Description
                </span>
                <textarea
                  rows={3}
                  value={editingJob.description}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  className="w-full rounded-xl border border-zinc-300 bg-white p-3.5 text-sm leading-relaxed text-[#121214]"
                />
              </label>
              <div className="flex justify-end gap-3 border-t border-zinc-200 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingJob(null)}
                  className="min-h-[42px] rounded-full border border-zinc-300 bg-white px-5 text-xs font-bold text-zinc-700 transition hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!editingJob.title.trim()) return;
                    saveJob(editingJob);
                    setEditingJob(null);
                  }}
                  className="min-h-[42px] rounded-full bg-[#E70000] px-7 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[#E70000]/25 transition hover:bg-[#121214]"
                >
                  Save Position
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
