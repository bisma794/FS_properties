'use client';

import React, { useState } from 'react';
import {
  AVAILABLE_DYNAMIC_COMPONENTS,
  DynamicComponentDefinition,
  DynamicSectionInstance,
  DynamicCategory,
} from './dynamicPageTypes';
import RichTextSummernote from './RichTextSummernote';

const CATEGORIES: Array<'All' | DynamicCategory> = [
  'All',
  'Hero',
  'Properties',
  'Community',
  'Developer',
  'The Valley',
  'Blog',
  'Advisory',
  'General',
];

interface DynamicPageBuilderProps {
  // General Tab Fields
  pageTitle: string;
  setPageTitle: (val: string) => void;
  pageSlug: string;
  setPageSlug: (val: string) => void;
  pageMetaTitle: string;
  setPageMetaTitle: (val: string) => void;
  pageMetaKeywords: string;
  setPageMetaKeywords: (val: string) => void;
  pageMetaDesc: string;
  setPageMetaDesc: (val: string) => void;
  pageOgImage: string;
  setPageOgImage: (val: string) => void;
  handleFileUpload: (file: File, callback: (url: string) => void) => Promise<string>;

  // Sections List & Reordering
  dynamicSections: DynamicSectionInstance[];
  setDynamicSections: (sections: DynamicSectionInstance[]) => void;

  // Active Tab Controls
  activeSectionTab: string;
  setActiveSectionTab: (tabId: string) => void;

  // Global collections available in CMS
  amenitiesList: Array<{ id: string; name: string; category?: string }>;
  offplansList: Array<{ id?: string | number; title: string; slug?: string; developer?: string; starting_price?: string }>;
  communitiesList: Array<{ id?: string | number; name: string; slug?: string; image?: string; startingPrice?: string }>;
  developerCards: Array<{ id?: string | number; name: string; slug?: string; logo?: string }>;
}

export default function DynamicPageBuilder({
  pageTitle,
  setPageTitle,
  pageSlug,
  setPageSlug,
  pageMetaTitle,
  setPageMetaTitle,
  pageMetaKeywords,
  setPageMetaKeywords,
  pageMetaDesc,
  setPageMetaDesc,
  pageOgImage,
  setPageOgImage,
  handleFileUpload,
  dynamicSections,
  setDynamicSections,
  activeSectionTab,
  setActiveSectionTab,
  amenitiesList,
  offplansList,
  communitiesList,
  developerCards,
}: DynamicPageBuilderProps) {
  const [isComponentDropdownOpen, setIsComponentDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'All' | DynamicCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Filter components based on category and search query
  const filteredComponents = AVAILABLE_DYNAMIC_COMPONENTS.filter((comp) => {
    const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      comp.name.toLowerCase().includes(q) ||
      comp.defaultTitle.toLowerCase().includes(q) ||
      comp.category.toLowerCase().includes(q) ||
      comp.defaultDescription.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Add Component to Dynamic Page
  const handleAddComponent = (def: DynamicComponentDefinition) => {
    const countSameType = dynamicSections.filter((s) => s.type === def.type).length;
    const instanceId = `${def.type}-${Date.now().toString().slice(-6)}`;
    const instanceName = countSameType > 0 ? `${def.name} (${countSameType + 1})` : def.name;

    const newSection: DynamicSectionInstance = {
      id: instanceId,
      type: def.type,
      name: instanceName,
      title: def.defaultTitle,
      description: def.defaultDescription,
      detailHtml:
        def.category === 'Hero' || def.category === 'General' || def.category === 'Advisory'
          ? `<h2>${def.defaultTitle}</h2><p>${def.defaultDescription}</p>`
          : '',
      buttonText: def.type === 'amenity-1' ? 'See All Listing' : 'Learn More',
      buttonLink: '/buy',
      buttonColor: '#BFA16A',
      selectedAmenities: [],
      selectedProjects: [],
      selectedCommunities: [],
      selectedDevelopers: [],
      bgImage: def.previewImage,
      items: [],
    };

    const nextList = [...dynamicSections, newSection];
    setDynamicSections(nextList);
    setActiveSectionTab(instanceId);
    setIsComponentDropdownOpen(false);
  };

  // Remove Component
  const handleRemoveComponent = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextList = dynamicSections.filter((s) => s.id !== id);
    setDynamicSections(nextList);
    if (activeSectionTab === id) {
      setActiveSectionTab('basic');
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (idx: number) => {
    setDraggedIndex(idx);
  };

  const handleDragOver = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIdx) return;
    const reordered = [...dynamicSections];
    const [draggedItem] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIdx, 0, draggedItem);
    setDraggedIndex(targetIdx);
    setDynamicSections(reordered);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // Update specific section
  const updateSection = (id: string, updates: Partial<DynamicSectionInstance>) => {
    const updated = dynamicSections.map((sec) => (sec.id === id ? { ...sec, ...updates } : sec));
    setDynamicSections(updated);
  };

  const currentSection = dynamicSections.find((s) => s.id === activeSectionTab);
  const currentDef = currentSection
    ? AVAILABLE_DYNAMIC_COMPONENTS.find((c) => c.type === currentSection.type)
    : undefined;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ============================================================== */}
      {/* LEFT SIDEBAR: GENERAL TAB + DYNAMIC SECTION TABS WITH DRAG&DROP */}
      {/* ============================================================== */}
      <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E0D8] p-3 shadow-xs space-y-2 sticky top-28 max-h-[85vh] overflow-y-auto">
        {/* TAB 1: General Settings */}
        <button
          type="button"
          onClick={() => setActiveSectionTab('basic')}
          className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between ${
            activeSectionTab === 'basic'
              ? 'bg-[#EFE5D3] text-[#171717] font-bold border-[#D4C3A6] shadow-xs'
              : 'bg-white text-[#525252] border-transparent hover:bg-[#FAF9F6] hover:text-[#171717]'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="text-sm">⚙️</span> General
          </span>
          <span className="text-[10px] text-[#A39982] font-mono">Core</span>
        </button>

        {/* Section Header */}
        <div className="pt-2 pb-1 px-3 flex items-center justify-between border-t border-[#F0ECE1]">
          <p className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">
            Added Sections ({dynamicSections.length})
          </p>
          {dynamicSections.length > 1 && (
            <span className="text-[10px] text-[#BFA16A] font-medium">Drag to reorder</span>
          )}
        </div>

        {/* Dynamic Section Tabs (Drag and Drop List) */}
        <div className="space-y-1.5">
          {dynamicSections.map((sec, idx) => {
            const isActive = activeSectionTab === sec.id;
            return (
              <div
                key={sec.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                onClick={() => setActiveSectionTab(sec.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border flex items-center justify-between group cursor-grab active:cursor-grabbing ${
                  isActive
                    ? 'bg-[#EFE5D3] text-[#171717] font-bold border-[#D4C3A6] shadow-xs'
                    : 'bg-white text-[#525252] border-[#E5E0D8]/60 hover:bg-[#FAF9F6] hover:text-[#171717]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span className="text-[#A39982] hover:text-[#171717] cursor-grab select-none text-xs">
                    ⠿
                  </span>
                  <span className="truncate">{sec.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-[#A39982] font-mono">#{idx + 1}</span>
                  <button
                    type="button"
                    onClick={(e) => handleRemoveComponent(sec.id, e)}
                    className="w-5 h-5 rounded-full flex items-center justify-center text-rose-500 hover:text-white hover:bg-rose-500 transition-colors text-xs"
                    title="Remove Section"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}

          {dynamicSections.length === 0 && (
            <div className="p-4 text-center border border-dashed border-[#E5E0D8] rounded-xl bg-[#FAF9F6]/50">
              <p className="text-xs text-[#888888] font-medium">No sections added yet.</p>
              <p className="text-[10px] text-[#A39982] mt-0.5">Click below to add any section from the website.</p>
            </div>
          )}
        </div>

        {/* Add Section / Component Trigger Button */}
        <div className="pt-2 border-t border-[#F0ECE1]">
          <button
            type="button"
            onClick={() => setIsComponentDropdownOpen(true)}
            className="w-full py-2.5 px-3 bg-[#FAF9F6] hover:bg-[#F2ECE1] border border-dashed border-[#BFA16A] rounded-xl text-xs font-bold text-[#BFA16A] flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
          >
            <span>+</span> Add Section / Component
            <span className="text-[9px]">▼</span>
          </button>
        </div>
      </aside>

      {/* ============================================================== */}
      {/* COMPONENT SELECTION MODAL (Comprehensive Website Catalog)        */}
      {/* ============================================================== */}
      {isComponentDropdownOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-[#E5E0D8] shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#E5E0D8] flex items-center justify-between bg-[#FAF9F6]">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#171717]">Add Website Section / Component</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Choose from any fixed page section across the entire website ({AVAILABLE_DYNAMIC_COMPONENTS.length} sections available).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsComponentDropdownOpen(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E5E0D8] hover:bg-[#171717] hover:text-white flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="p-4 border-b border-[#E5E0D8] bg-white space-y-3">
              {/* Search Bar */}
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#888888]">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by section name, category or keywords (e.g. Hero, Villa, Amenities, Valley, Blog)..."
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF9F6] border border-[#D5D0C7] rounded-xl text-xs sm:text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#888888] hover:text-[#171717]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer shrink-0 ${
                      selectedCategory === cat
                        ? 'bg-[#BFA16A] text-white shadow-2xs'
                        : 'bg-[#FAF9F6] text-[#525252] border border-[#E5E0D8] hover:border-[#BFA16A]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Components Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredComponents.map((comp) => (
                <div
                  key={comp.type}
                  onClick={() => handleAddComponent(comp)}
                  className="border border-[#E5E0D8] hover:border-[#BFA16A] hover:shadow-md rounded-2xl p-3 bg-white transition group cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {/* Thumbnail Preview */}
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-[#FAF9F6] border border-[#E5E0D8]/60 relative">
                      <img
                        src={comp.previewImage}
                        alt={comp.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => (e.currentTarget.src = '/buy_hero.png')}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                        {comp.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[#171717] group-hover:text-[#BFA16A] transition-colors">
                        {comp.name}
                      </h4>
                      <p className="text-xs text-[#737373] mt-1 line-clamp-2 leading-relaxed">
                        {comp.defaultDescription}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#F0ECE1] flex items-center justify-between text-xs">
                    <span className="text-[11px] text-[#A39982] font-mono">{comp.defaultTitle}</span>
                    <span className="font-bold text-[#BFA16A] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      + Add Section
                    </span>
                  </div>
                </div>
              ))}

              {filteredComponents.length === 0 && (
                <div className="col-span-full py-16 text-center text-[#888888] space-y-2">
                  <p className="text-base font-semibold">No components match your search.</p>
                  <p className="text-xs">Try selecting a different category or clearing the search box.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#FAF9F6] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-[#737373]">
              <span>Showing {filteredComponents.length} of {AVAILABLE_DYNAMIC_COMPONENTS.length} total website sections</span>
              <button
                type="button"
                onClick={() => setIsComponentDropdownOpen(false)}
                className="px-4 py-1.5 rounded-lg border border-[#D5D0C7] bg-white hover:bg-neutral-50 text-xs font-semibold text-[#171717]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* RIGHT WORKSPACE: ACTIVE TAB EDITOR                             */}
      {/* ============================================================== */}
      <main className="lg:col-span-9 bg-white rounded-2xl border border-[#E5E0D8] p-6 lg:p-8 shadow-xs">
        {/* ------------------------------------------------------------ */}
        {/* CASE 1: GENERAL TAB                                          */}
        {/* ------------------------------------------------------------ */}
        {activeSectionTab === 'basic' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">General Settings</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Set the page title, URL slug, SEO metadata and social sharing image.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-3 py-1 rounded-full border border-[#BFA16A]/30">
                Dynamic Page
              </span>
            </div>

            {/* Row 1: Page Name & Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1.5">
                  Page Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={pageTitle}
                  onChange={(e) => {
                    setPageTitle(e.target.value);
                    if (!pageSlug || pageSlug.trim() === '') {
                      setPageSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, '-')
                          .replace(/(^-|-$)+/g, '')
                      );
                    }
                  }}
                  placeholder="Enter page name"
                  className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1.5">Slug</label>
                <input
                  type="text"
                  required
                  value={pageSlug}
                  onChange={(e) => setPageSlug(e.target.value)}
                  placeholder="enter-slug"
                  className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm font-mono text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                />
              </div>
            </div>

            {/* Row 2: Meta Title & Meta Keyword */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1.5">Meta Title</label>
                <input
                  type="text"
                  value={pageMetaTitle}
                  onChange={(e) => setPageMetaTitle(e.target.value)}
                  placeholder="Enter Meta Title"
                  className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1.5">Meta Keyword</label>
                <input
                  type="text"
                  value={pageMetaKeywords}
                  onChange={(e) => setPageMetaKeywords(e.target.value)}
                  placeholder="Enter Meta Keyword"
                  className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                />
              </div>
            </div>

            {/* Row 3: Meta Description */}
            <div>
              <label className="block text-xs font-semibold text-[#525252] mb-1.5">Meta Description</label>
              <textarea
                rows={3}
                value={pageMetaDesc}
                onChange={(e) => setPageMetaDesc(e.target.value)}
                placeholder="Enter Meta Description"
                className="w-full bg-white border border-[#D5D0C7] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
              />
            </div>

            {/* Row 4: OG Image Upload */}
            <div>
              <label className="block text-xs font-semibold text-[#525252] mb-1.5">OG Social Share Image</label>
              <div className="relative w-80 h-44 rounded-2xl border-2 border-dashed border-[#D5D0C7] overflow-hidden group bg-[#FAF9F6] flex flex-col items-center justify-center cursor-pointer hover:bg-[#F2ECE1]/30 transition">
                {pageOgImage ? (
                  <img
                    src={pageOgImage}
                    alt="OG Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.src = '/buy_hero.png')}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-4">
                    <span className="text-2xl text-[#888888] mb-1">🖼️</span>
                    <span className="text-xs text-[#737373]">Click to upload file</span>
                  </div>
                )}
                <label className="absolute inset-0 cursor-pointer flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition text-white text-xs font-bold">
                  <span>Change OG Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], setPageOgImage)}
                  />
                </label>
              </div>
            </div>

            {/* Added Sections Preview & Quick Add Callout */}
            <div className="pt-6 border-t border-[#E5E0D8] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#171717] uppercase tracking-wider">
                    Page Sections ({dynamicSections.length})
                  </h4>
                  <p className="text-xs text-[#737373]">
                    {dynamicSections.length === 0
                      ? 'No sections have been added yet. Click "+ Add Section / Component" to start building your page.'
                      : 'These sections are currently stacked on this page. Drag in the sidebar to reorder.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsComponentDropdownOpen(true)}
                  className="px-4 py-2 bg-[#BFA16A] hover:bg-[#aa8e59] text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
                >
                  <span>+</span> Add Section
                </button>
              </div>

              {/* Tag Badges for Added Sections */}
              {dynamicSections.length > 0 && (
                <div className="p-3 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl flex flex-wrap gap-2">
                  {dynamicSections.map((sec, i) => (
                    <div
                      key={sec.id}
                      onClick={() => setActiveSectionTab(sec.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#E5E0D8] hover:border-[#BFA16A] text-xs font-semibold text-[#171717] shadow-2xs cursor-pointer transition"
                    >
                      <span className="text-[10px] text-[#A39982] font-mono">#{i + 1}</span>
                      <span>{sec.name}</span>
                      <button
                        type="button"
                        onClick={(e) => handleRemoveComponent(sec.id, e)}
                        className="text-[#888888] hover:text-rose-500 font-bold ml-1 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CASE 2: DYNAMIC SECTION ACTIVE EDITOR (All 36 Sections)        */}
        {/* ------------------------------------------------------------ */}
        {currentSection && activeSectionTab !== 'basic' && (
          <div className="space-y-6">
            {/* Header with Title and Delete Button */}
            <div className="border-b border-[#E5E0D8] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#BFA16A]/10 border border-[#BFA16A]/30 text-[10px] font-bold text-[#BFA16A] uppercase tracking-wider">
                    {currentDef?.category || 'Custom Section'}
                  </span>
                  <span className="text-xs text-[#888888] font-mono">Type: {currentSection.type}</span>
                </div>
                <h3 className="text-xl font-bold text-[#171717] mt-1">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  {currentDef?.defaultDescription || 'Configure content, headline, media and settings.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="self-start sm:self-auto text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200 transition"
              >
                Delete This Section
              </button>
            </div>

            {/* Display Label (Renaming the section in the list) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-xs font-semibold text-[#525252] mb-1">
                  Sidebar Display Name
                </label>
                <input
                  type="text"
                  value={currentSection.name || ''}
                  onChange={(e) => updateSection(currentSection.id, { name: e.target.value })}
                  placeholder="e.g. Hero Section 1"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>

              {/* Preview Asset / Background Image */}
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-[#525252] mb-1">
                  Section Media / Background Asset
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#FAF9F6] shrink-0">
                    <img
                      src={currentSection.bgImage || currentDef?.previewImage || '/buy_hero.png'}
                      alt={currentSection.name}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.currentTarget.src = '/buy_hero.png')}
                    />
                  </div>
                  <label className="px-4 py-2 rounded-xl bg-white border border-[#D5D0C7] hover:border-[#BFA16A] text-xs font-semibold text-[#171717] cursor-pointer transition shadow-2xs">
                    <span>Upload New Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files?.[0] &&
                        handleFileUpload(e.target.files[0], (url) =>
                          updateSection(currentSection.id, { bgImage: url })
                        )
                      }
                    />
                  </label>
                  {currentSection.bgImage && (
                    <button
                      type="button"
                      onClick={() => updateSection(currentSection.id, { bgImage: '' })}
                      className="text-xs text-rose-500 hover:underline"
                    >
                      Reset Image
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Main Headline & Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={currentSection.title || ''}
                  onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                  placeholder="Enter Title"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Subtitle / Tagline</label>
                <input
                  type="text"
                  value={currentSection.description || ''}
                  onChange={(e) => updateSection(currentSection.id, { description: e.target.value })}
                  placeholder="Enter Subtitle"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                />
              </div>
            </div>

            {/* CTA Button Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl bg-[#FAF9F6] border border-[#E5E0D8]">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Button Text</label>
                <input
                  type="text"
                  value={currentSection.buttonText || ''}
                  onChange={(e) => updateSection(currentSection.id, { buttonText: e.target.value })}
                  placeholder="e.g. Explore Opportunities"
                  className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-sm text-[#171717]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Button Link URL</label>
                <input
                  type="text"
                  value={currentSection.buttonLink || ''}
                  onChange={(e) => updateSection(currentSection.id, { buttonLink: e.target.value })}
                  placeholder="e.g. /buy or /communities"
                  className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3.5 py-2 text-sm text-[#171717]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Button Accent Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentSection.buttonColor || '#BFA16A'}
                    onChange={(e) => updateSection(currentSection.id, { buttonColor: e.target.value })}
                    className="w-10 h-9 rounded-lg border border-[#E5E0D8] cursor-pointer p-0.5 bg-white"
                  />
                  <input
                    type="text"
                    value={currentSection.buttonColor || '#BFA16A'}
                    onChange={(e) => updateSection(currentSection.id, { buttonColor: e.target.value })}
                    className="w-28 bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-mono text-[#171717]"
                  />
                </div>
              </div>
            </div>

            {/* RichText Editor (For Content, Story, Hero Detail or Guides) */}
            {(currentSection.type.startsWith('hero-') ||
              currentSection.type === 'content-1' ||
              currentSection.type === 'about-story' ||
              currentSection.type === 'valley-why' ||
              currentSection.type === 'offplan-guide') && (
              <div>
                <RichTextSummernote
                  label="Detailed Rich Content / Editorial Story"
                  value={currentSection.detailHtml || ''}
                  onChange={(html) => updateSection(currentSection.id, { detailHtml: html })}
                  placeholder="Write rich content, headings, styled paragraphs, and comparison tables..."
                  minHeight="240px"
                />
              </div>
            )}

            {/* Special Picker: Amenities (If Amenities section) */}
            {currentSection.type === 'amenity-1' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#525252]">
                  Select Featured Amenities <span className="text-[#888888] font-normal">(max 8)</span>
                </label>
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(currentSection.selectedAmenities || []).map((amName) => (
                      <span
                        key={amName}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#BFA16A] text-white rounded-lg text-xs font-medium shadow-2xs"
                      >
                        {amName}
                        <button
                          type="button"
                          onClick={() =>
                            updateSection(currentSection.id, {
                              selectedAmenities: (currentSection.selectedAmenities || []).filter((a) => a !== amName),
                            })
                          }
                          className="hover:text-black font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {(currentSection.selectedAmenities || []).length === 0 && (
                      <span className="text-xs text-[#888888] italic">Default luxury amenities will be displayed.</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2 border-t border-[#E5E0D8]/60 max-h-48 overflow-y-auto">
                    {amenitiesList.map((am) => {
                      const isSelected = (currentSection.selectedAmenities || []).includes(am.name);
                      return (
                        <button
                          key={am.id || am.name}
                          type="button"
                          onClick={() => {
                            const cur = currentSection.selectedAmenities || [];
                            if (isSelected) {
                              updateSection(currentSection.id, { selectedAmenities: cur.filter((x) => x !== am.name) });
                            } else {
                              if (cur.length >= 8) {
                                alert('Maximum 8 amenities allowed.');
                                return;
                              }
                              updateSection(currentSection.id, { selectedAmenities: [...cur, am.name] });
                            }
                          }}
                          className={`px-3 py-2 text-xs rounded-lg border text-left font-medium transition cursor-pointer flex items-center justify-between ${
                            isSelected ? 'bg-[#BFA16A] text-white border-[#BFA16A]' : 'bg-white text-[#525252] border-[#E5E0D8] hover:border-[#BFA16A]'
                          }`}
                        >
                          <span className="truncate">{am.name}</span>
                          <span>{isSelected ? '✓' : '+'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Special Picker: Off-Plan Projects */}
            {(currentSection.type === 'trending-projects' ||
              currentSection.type === 'recommended-opportunities' ||
              currentSection.type === 'similar-projects' ||
              currentSection.type === 'developer-projects') && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#525252]">
                  Select Projects To Feature
                </label>
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(currentSection.selectedProjects || []).map((pTitle) => (
                      <span
                        key={pTitle}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#171717] text-white rounded-lg text-xs font-medium shadow-2xs"
                      >
                        {pTitle}
                        <button
                          type="button"
                          onClick={() =>
                            updateSection(currentSection.id, {
                              selectedProjects: (currentSection.selectedProjects || []).filter((x) => x !== pTitle),
                            })
                          }
                          className="hover:text-rose-400 font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {(currentSection.selectedProjects || []).length === 0 && (
                      <span className="text-xs text-[#888888] italic">All active projects will be displayed dynamically.</span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2 border-t border-[#E5E0D8]/60 max-h-48 overflow-y-auto">
                    {offplansList.map((op) => {
                      const isSelected = (currentSection.selectedProjects || []).includes(op.title);
                      return (
                        <button
                          key={op.id || op.title}
                          type="button"
                          onClick={() => {
                            const cur = currentSection.selectedProjects || [];
                            updateSection(currentSection.id, {
                              selectedProjects: isSelected ? cur.filter((x) => x !== op.title) : [...cur, op.title],
                            });
                          }}
                          className={`p-2 rounded-lg border text-left text-xs transition flex items-center justify-between ${
                            isSelected ? 'bg-[#171717] text-white border-[#171717]' : 'bg-white text-[#525252] border-[#E5E0D8] hover:border-[#171717]'
                          }`}
                        >
                          <span className="truncate font-semibold">{op.title}</span>
                          <span className="text-[10px] shrink-0 ml-1 opacity-70">{isSelected ? '✓' : '+'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Special Picker: Communities */}
            {(currentSection.type === 'explore-more' ||
              currentSection.type === 'explore-community' ||
              currentSection.type === 'communities-grid' ||
              currentSection.type === 'community-comparison') && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#525252]">Featured Communities</label>
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(currentSection.selectedCommunities || []).map((cName) => (
                      <span
                        key={cName}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#BFA16A] text-white rounded-lg text-xs font-medium shadow-2xs"
                      >
                        {cName}
                        <button
                          type="button"
                          onClick={() =>
                            updateSection(currentSection.id, {
                              selectedCommunities: (currentSection.selectedCommunities || []).filter((x) => x !== cName),
                            })
                          }
                          className="hover:text-black font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {(currentSection.selectedCommunities || []).length === 0 && (
                      <span className="text-xs text-[#888888] italic">All top master communities will be featured.</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2 border-t border-[#E5E0D8]/60 max-h-48 overflow-y-auto">
                    {communitiesList.map((c) => {
                      const isSelected = (currentSection.selectedCommunities || []).includes(c.name);
                      return (
                        <button
                          key={c.id || c.name}
                          type="button"
                          onClick={() => {
                            const cur = currentSection.selectedCommunities || [];
                            updateSection(currentSection.id, {
                              selectedCommunities: isSelected ? cur.filter((x) => x !== c.name) : [...cur, c.name],
                            });
                          }}
                          className={`p-2 rounded-lg border text-xs text-left transition flex items-center justify-between ${
                            isSelected ? 'bg-[#BFA16A] text-white border-[#BFA16A]' : 'bg-white text-[#525252] border-[#E5E0D8] hover:border-[#BFA16A]'
                          }`}
                        >
                          <span className="truncate">{c.name}</span>
                          <span>{isSelected ? '✓' : '+'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Special Picker: Developers */}
            {(currentSection.type === 'developer-logos' ||
              currentSection.type === 'developers-grid' ||
              currentSection.type === 'developers-intro') && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#525252]">Featured Developers</label>
                <div className="p-4 bg-[#FAF9F6] rounded-xl border border-[#E5E0D8] space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {(currentSection.selectedDevelopers || []).map((dName) => (
                      <span
                        key={dName}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#171717] text-white rounded-lg text-xs font-medium shadow-2xs"
                      >
                        {dName}
                        <button
                          type="button"
                          onClick={() =>
                            updateSection(currentSection.id, {
                              selectedDevelopers: (currentSection.selectedDevelopers || []).filter((x) => x !== dName),
                            })
                          }
                          className="hover:text-rose-400 font-bold ml-1"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {(currentSection.selectedDevelopers || []).length === 0 && (
                      <span className="text-xs text-[#888888] italic">Top UAE developers will be showcased automatically.</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 pt-2 border-t border-[#E5E0D8]/60 max-h-48 overflow-y-auto">
                    {developerCards.map((d) => {
                      const isSelected = (currentSection.selectedDevelopers || []).includes(d.name);
                      return (
                        <button
                          key={d.id || d.name}
                          type="button"
                          onClick={() => {
                            const cur = currentSection.selectedDevelopers || [];
                            updateSection(currentSection.id, {
                              selectedDevelopers: isSelected ? cur.filter((x) => x !== d.name) : [...cur, d.name],
                            });
                          }}
                          className={`p-2 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                            isSelected ? 'bg-[#FAF9F6] border-[#BFA16A] shadow-xs' : 'bg-white border-[#E5E0D8] hover:border-[#BFA16A]'
                          }`}
                        >
                          <img
                            src={d.logo || '/developers/emaar.png'}
                            alt={d.name}
                            className="h-7 w-auto object-contain"
                            onError={(e) => (e.currentTarget.src = '/developers/emaar.png')}
                          />
                          <span className="text-[10px] font-bold text-[#171717] truncate w-full">{d.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
