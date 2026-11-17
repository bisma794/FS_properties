'use client';

import React, { useState } from 'react';
import {
  AVAILABLE_DYNAMIC_COMPONENTS,
  DynamicComponentDefinition,
  DynamicSectionInstance,
} from './dynamicPageTypes';
import RichTextSummernote from './RichTextSummernote';

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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

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
      detailHtml: def.category === 'Hero' || def.category === 'Content'
        ? `<h2>${def.defaultTitle}</h2><p>${def.defaultDescription}</p>`
        : '',
      buttonText: def.type === 'amenity-1' ? 'See All Listing' : 'Learn More',
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* ============================================================== */}
      {/* LEFT SIDEBAR: GENERAL TAB + DYNAMIC SECTION TABS WITH DRAG&DROP */}
      {/* ============================================================== */}
      <aside className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E0D8] p-3 shadow-xs space-y-2 sticky top-28 max-h-[85vh] overflow-y-auto">
        {/* TAB 1: General (Matches Reference Image 1) */}
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
          <span className="text-[10px] text-[#BFA16A] font-medium">Drag to reorder</span>
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
        </div>

        {/* Dropdown / Component Selector Trigger (Matches Image 2) */}
        <div className="pt-2 border-t border-[#F0ECE1] relative">
          <button
            type="button"
            onClick={() => setIsComponentDropdownOpen(!isComponentDropdownOpen)}
            className="w-full py-2.5 px-3 bg-[#FAF9F6] hover:bg-[#F2ECE1] border border-dashed border-[#BFA16A] rounded-xl text-xs font-bold text-[#BFA16A] flex items-center justify-center gap-2 transition cursor-pointer shadow-2xs"
          >
            <span>+</span> Add Section / Component
            <span className="text-[9px]">{isComponentDropdownOpen ? '▲' : '▼'}</span>
          </button>

          {/* Component Selection Dropdown (Matches Reference Image 2) */}
          {isComponentDropdownOpen && (
            <div className="absolute left-0 bottom-full mb-2 w-[340px] bg-white border border-[#E5E0D8] rounded-2xl shadow-2xl z-50 p-3 max-h-[420px] overflow-y-auto space-y-2">
              <div className="border-b border-[#E5E0D8] pb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#737373] uppercase tracking-wider">
                  Select Component To Add
                </span>
                <button
                  type="button"
                  onClick={() => setIsComponentDropdownOpen(false)}
                  className="text-xs text-[#888888] hover:text-[#171717]"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                {AVAILABLE_DYNAMIC_COMPONENTS.map((comp) => (
                  <button
                    key={comp.type}
                    type="button"
                    onClick={() => handleAddComponent(comp)}
                    className="flex items-center gap-3 p-2 rounded-xl border border-[#E5E0D8] hover:border-[#BFA16A] hover:bg-[#FAF9F6] transition text-left group cursor-pointer"
                  >
                    <div className="w-14 h-10 rounded-lg overflow-hidden bg-[#FAF9F6] border border-[#E5E0D8] shrink-0 flex items-center justify-center">
                      <img
                        src={comp.previewImage}
                        alt={comp.name}
                        className="w-full h-full object-cover"
                        onError={(e) => (e.currentTarget.src = '/buy_hero.png')}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-[#171717] group-hover:text-[#BFA16A] transition-colors truncate">
                        {comp.name}
                      </div>
                      <div className="text-[10px] text-[#737373] truncate">
                        {comp.category} • {comp.defaultTitle}
                      </div>
                    </div>
                    <span className="text-[#BFA16A] font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      +
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ============================================================== */}
      {/* RIGHT WORKSPACE: ACTIVE TAB EDITOR (MATCHES IMAGES 1, 3, 4, 5)  */}
      {/* ============================================================== */}
      <main className="lg:col-span-9 bg-white rounded-2xl border border-[#E5E0D8] p-6 lg:p-8 shadow-xs">
        {/* ------------------------------------------------------------ */}
        {/* CASE 1: GENERAL TAB (Matches Reference Image 1)               */}
        {/* ------------------------------------------------------------ */}
        {activeSectionTab === 'basic' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">General Settings</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Set the page name, URL slug, SEO metadata and social sharing image.
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

            {/* Row 4: OG Image Upload (Matches Image 1) */}
            <div>
              <label className="block text-xs font-semibold text-[#525252] mb-1.5">OG Image</label>
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

            {/* Multi-Component Selector Bar below General Settings (Matches Image 2) */}
            <div className="pt-6 border-t border-[#E5E0D8] space-y-3">
              <label className="block text-xs font-bold text-[#171717] uppercase tracking-wider">
                Select Components
              </label>

              {/* Selected Components Tags Box (Matches Image 2) */}
              <div className="p-3 bg-white border border-[#0066FF] rounded-xl shadow-xs space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {dynamicSections.map((sec) => {
                    const compDef = AVAILABLE_DYNAMIC_COMPONENTS.find((c) => c.type === sec.type);
                    return (
                      <div
                        key={sec.id}
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#FAF9F6] border border-[#E5E0D8] text-xs font-medium text-[#171717] shadow-2xs"
                      >
                        <img
                          src={compDef?.previewImage || sec.bgImage || '/buy_hero.png'}
                          alt={sec.name}
                          className="w-8 h-5 object-cover rounded"
                          onError={(e) => (e.currentTarget.src = '/buy_hero.png')}
                        />
                        <span>{sec.name}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveComponent(sec.id)}
                          className="text-[#888888] hover:text-rose-500 font-bold ml-1 text-xs"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                  {dynamicSections.length === 0 && (
                    <span className="text-xs text-[#888888] italic py-1">
                      No components selected yet. Click below to add.
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Component Picker Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                {AVAILABLE_DYNAMIC_COMPONENTS.map((comp) => {
                  const isAdded = dynamicSections.some((s) => s.type === comp.type);
                  return (
                    <button
                      key={comp.type}
                      type="button"
                      onClick={() => handleAddComponent(comp)}
                      className={`flex flex-col items-center p-3 rounded-xl border text-center transition cursor-pointer ${
                        isAdded
                          ? 'border-[#BFA16A] bg-[#FAF9F6]'
                          : 'border-[#E5E0D8] bg-white hover:border-[#BFA16A]'
                      }`}
                    >
                      <div className="w-full h-16 rounded-lg overflow-hidden bg-white border border-[#E5E0D8] mb-2">
                        <img
                          src={comp.previewImage}
                          alt={comp.name}
                          className="w-full h-full object-cover"
                          onError={(e) => (e.currentTarget.src = '/buy_hero.png')}
                        />
                      </div>
                      <span className="text-xs font-bold text-[#171717] truncate w-full">{comp.name}</span>
                      <span className="text-[10px] text-[#BFA16A] mt-0.5">
                        {isAdded ? '+ Add Another' : '+ Add Component'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CASE 2: HERO SECTION EDITOR (Matches Reference Image 3)      */}
        {/* ------------------------------------------------------------ */}
        {currentSection && currentSection.type.startsWith('hero-') && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Configure headline, typography, rich-text detail, and hero background asset.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              >
                Delete Section
              </button>
            </div>

            {/* Thumbnail Preview Banner */}
            <div className="relative w-64 h-36 rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#FAF9F6]">
              <img
                src={currentSection.bgImage || '/buy_hero.png'}
                alt={currentSection.name}
                className="w-full h-full object-cover"
                onError={(e) => (e.currentTarget.src = '/buy_hero.png')}
              />
              <label className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-xs p-1.5 rounded-lg shadow-sm cursor-pointer text-xs font-bold text-[#171717] hover:bg-white transition border border-[#E5E0D8]">
                <span>✏️ Change Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files?.[0] &&
                    handleFileUpload(e.target.files[0], (url) => updateSection(currentSection.id, { bgImage: url }))
                  }
                />
              </label>
            </div>

            {/* Main Title & Subtitle */}
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

            {/* Summernote / RichText Editor for Detail (Matches Reference Image 3) */}
            <div>
              <RichTextSummernote
                label="Detail"
                value={currentSection.detailHtml || ''}
                onChange={(html) => updateSection(currentSection.id, { detailHtml: html })}
                placeholder="Enter full content..."
                minHeight="280px"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CASE 3: AMENITY SECTION 1 EDITOR (Matches Reference Image 4) */}
        {/* ------------------------------------------------------------ */}
        {currentSection && currentSection.type === 'amenity-1' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Configure section title, description, button text, button color, and amenities selection.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              >
                Delete Section
              </button>
            </div>

            {/* Thumbnail Preview Banner */}
            <div className="w-48 h-28 rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#FAF9F6]">
              <img
                src="/affordable-plans.png"
                alt="Amenity Section Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title (Matches Reference Image 4) */}
            <div>
              <label className="block text-xs font-semibold text-[#525252] mb-1">Title</label>
              <input
                type="text"
                value={currentSection.title || ''}
                onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                placeholder="Enter Title"
                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
              />
            </div>

            {/* Description (Matches Reference Image 4) */}
            <div>
              <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
              <textarea
                rows={3}
                value={currentSection.description || ''}
                onChange={(e) => updateSection(currentSection.id, { description: e.target.value })}
                placeholder="Enter Description"
                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
              />
            </div>

            {/* Button Text & Button Color (Matches Reference Image 4) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Button Text</label>
                <input
                  type="text"
                  value={currentSection.buttonText || 'See All Listing'}
                  onChange={(e) => updateSection(currentSection.id, { buttonText: e.target.value })}
                  placeholder="See All Listing"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Button Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={currentSection.buttonColor || '#BFA16A'}
                    onChange={(e) => updateSection(currentSection.id, { buttonColor: e.target.value })}
                    className="w-12 h-10 rounded-xl cursor-pointer border border-[#E5E0D8] p-1 bg-white"
                  />
                  <input
                    type="text"
                    value={currentSection.buttonColor || '#BFA16A'}
                    onChange={(e) => updateSection(currentSection.id, { buttonColor: e.target.value })}
                    className="w-32 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-3 py-2 text-sm font-mono text-[#171717]"
                  />
                  <div
                    className="h-3 flex-1 rounded-full border border-black/10"
                    style={{ backgroundColor: currentSection.buttonColor || '#BFA16A' }}
                  />
                </div>
              </div>
            </div>

            {/* Amenities Multi-Select (Matches Reference Image 4: "Please select (max 8)") */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#525252]">
                Amenities <span className="text-[#888888] font-normal">(Please select max 8)</span>
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
                    <span className="text-xs text-[#888888] italic">No amenities selected yet.</span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2 border-t border-[#E5E0D8]/60">
                  {amenitiesList.slice(0, 20).map((am) => {
                    const isSelected = (currentSection.selectedAmenities || []).includes(am.name);
                    return (
                      <button
                        key={am.id || am.name}
                        type="button"
                        onClick={() => {
                          const current = currentSection.selectedAmenities || [];
                          if (isSelected) {
                            updateSection(currentSection.id, {
                              selectedAmenities: current.filter((x) => x !== am.name),
                            });
                          } else {
                            if (current.length >= 8) {
                              alert('Maximum 8 amenities allowed for this section.');
                              return;
                            }
                            updateSection(currentSection.id, {
                              selectedAmenities: [...current, am.name],
                            });
                          }
                        }}
                        className={`px-3 py-2 text-xs rounded-lg border text-left font-medium transition cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#BFA16A] text-white border-[#BFA16A]'
                            : 'bg-white text-[#525252] border-[#E5E0D8] hover:border-[#BFA16A]'
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
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CASE 4: TRENDING PROJECTS EDITOR (Matches Reference Image 5) */}
        {/* ------------------------------------------------------------ */}
        {currentSection && currentSection.type === 'trending-projects' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Configure section title, description, and selected off-plan project cards.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              >
                Delete Section
              </button>
            </div>

            {/* Thumbnail Preview Banner */}
            <div className="w-56 h-28 rounded-xl overflow-hidden border border-[#E5E0D8] bg-[#FAF9F6]">
              <img
                src="/1793600655_al-marjan.png"
                alt="Trending Projects Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title (Matches Reference Image 5) */}
            <div>
              <label className="block text-xs font-semibold text-[#525252] mb-1">Title</label>
              <input
                type="text"
                value={currentSection.title || ''}
                onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                placeholder="Enter Title"
                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
              />
            </div>

            {/* Description (Matches Reference Image 5) */}
            <div>
              <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
              <textarea
                rows={3}
                value={currentSection.description || ''}
                onChange={(e) => updateSection(currentSection.id, { description: e.target.value })}
                placeholder="Enter Description"
                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
              />
            </div>

            {/* Project Selection */}
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
                    <span className="text-xs text-[#888888] italic">
                      All published off-plan projects will be featured automatically.
                    </span>
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
                          const current = currentSection.selectedProjects || [];
                          updateSection(currentSection.id, {
                            selectedProjects: isSelected
                              ? current.filter((x) => x !== op.title)
                              : [...current, op.title],
                          });
                        }}
                        className={`p-2 rounded-lg border text-left text-xs transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#525252] border-[#E5E0D8] hover:border-[#171717]'
                        }`}
                      >
                        <span className="truncate font-semibold">{op.title}</span>
                        <span className="text-[10px] shrink-0 ml-1 opacity-70">
                          {isSelected ? '✓' : '+'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CASE 5: CONTENT SECTION 1 (Summernote Editor)                */}
        {/* ------------------------------------------------------------ */}
        {currentSection && currentSection.type === 'content-1' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Full rich-text story editor for article paragraphs, headings, image embeds, and comparison tables.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              >
                Delete Section
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#525252] mb-1">Section Title</label>
              <input
                type="text"
                value={currentSection.title || ''}
                onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                placeholder="Enter Title"
                className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717] focus:outline-none focus:border-[#BFA16A]"
              />
            </div>

            <div>
              <RichTextSummernote
                label="Article / Editorial Content"
                value={currentSection.detailHtml || ''}
                onChange={(html) => updateSection(currentSection.id, { detailHtml: html })}
                placeholder="Write article story, add images and comparison tables..."
                minHeight="320px"
              />
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CASE 6: EXPLORE MORE COMMUNITIES                             */}
        {/* ------------------------------------------------------------ */}
        {currentSection && currentSection.type === 'explore-more' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Featured master communities directory cards.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              >
                Delete Section
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Title</label>
                <input
                  type="text"
                  value={currentSection.title || ''}
                  onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                  placeholder="Explore More Communities"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
                <input
                  type="text"
                  value={currentSection.description || ''}
                  onChange={(e) => updateSection(currentSection.id, { description: e.target.value })}
                  placeholder="Discover vibrant neighborhoods across Dubai"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#525252]">Featured Communities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
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
                        isSelected
                          ? 'bg-[#BFA16A] text-white border-[#BFA16A]'
                          : 'bg-white text-[#525252] border-[#E5E0D8] hover:border-[#BFA16A]'
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

        {/* ------------------------------------------------------------ */}
        {/* CASE 7: DEVELOPER LOGOS                                      */}
        {/* ------------------------------------------------------------ */}
        {currentSection && currentSection.type === 'developer-logos' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Trusted master developers directory logos grid.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              >
                Delete Section
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Title</label>
                <input
                  type="text"
                  value={currentSection.title || ''}
                  onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                  placeholder="Premier Master Developers"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Description</label>
                <input
                  type="text"
                  value={currentSection.description || ''}
                  onChange={(e) => updateSection(currentSection.id, { description: e.target.value })}
                  placeholder="Partnered with the UAE's leading developers"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#525252]">Featured Developers</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
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
                      className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'bg-[#FAF9F6] border-[#BFA16A] shadow-xs'
                          : 'bg-white border-[#E5E0D8] hover:border-[#BFA16A]'
                      }`}
                    >
                      <img
                        src={d.logo || '/developers/emaar.png'}
                        alt={d.name}
                        className="h-8 w-auto object-contain"
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

        {/* ------------------------------------------------------------ */}
        {/* CASE 8: FOOTER FORM                                         */}
        {/* ------------------------------------------------------------ */}
        {currentSection && currentSection.type === 'footer-form' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  High-converting contact / interest registration form.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              >
                Delete Section
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Headline</label>
                <input
                  type="text"
                  value={currentSection.title || ''}
                  onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                  placeholder="Register Your Interest"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Subheading</label>
                <input
                  type="text"
                  value={currentSection.description || ''}
                  onChange={(e) => updateSection(currentSection.id, { description: e.target.value })}
                  placeholder="Our advisory team will reach out with unit pricing and floor plans."
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Submit Button Text</label>
                <input
                  type="text"
                  value={currentSection.buttonText || 'Submit Enquiry'}
                  onChange={(e) => updateSection(currentSection.id, { buttonText: e.target.value })}
                  placeholder="Submit Enquiry"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Button Color</label>
                <input
                  type="color"
                  value={currentSection.buttonColor || '#BFA16A'}
                  onChange={(e) => updateSection(currentSection.id, { buttonColor: e.target.value })}
                  className="w-full h-10 rounded-xl cursor-pointer border border-[#E5E0D8] p-1 bg-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* CASE 9: BUYER GUIDE & FAQS                                   */}
        {/* ------------------------------------------------------------ */}
        {currentSection && currentSection.type === 'faqs' && (
          <div className="space-y-6">
            <div className="border-b border-[#E5E0D8] pb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#171717]">{currentSection.name}</h3>
                <p className="text-xs text-[#737373] mt-0.5">
                  Frequently asked questions and buyer guide accordion.
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveComponent(currentSection.id)}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition"
              >
                Delete Section
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Heading</label>
                <input
                  type="text"
                  value={currentSection.title || ''}
                  onChange={(e) => updateSection(currentSection.id, { title: e.target.value })}
                  placeholder="Frequently Asked Questions"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#525252] mb-1">Tagline</label>
                <input
                  type="text"
                  value={currentSection.description || ''}
                  onChange={(e) => updateSection(currentSection.id, { description: e.target.value })}
                  placeholder="UAE off-plan property · Buyer guide"
                  className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-sm text-[#171717]"
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
