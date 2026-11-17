'use client';

import React, { useState, useRef, useEffect } from 'react';

export interface IconDropdownItem {
  id: string;
  name: string;
  category?: string;
  type?: 'svg' | 'image';
  preview?: string;
  codeOrUrl: string;
}

interface IconDropdownSelectProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  icons: IconDropdownItem[];
  placeholder?: string;
}

export default function IconDropdownSelect({
  label = 'Select Icon',
  value,
  onChange,
  icons = [],
  placeholder = 'Select icon from library...',
}: IconDropdownSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Find currently matched icon from library
  const matched = icons.find(
    (ic) =>
      ic.codeOrUrl === value ||
      ic.preview === value ||
      (value && ic.name.toLowerCase() === value.toLowerCase())
  );

  const filteredIcons = icons.filter((ic) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      ic.name.toLowerCase().includes(q) ||
      (ic.category && ic.category.toLowerCase().includes(q)) ||
      (ic.codeOrUrl && ic.codeOrUrl.toLowerCase().includes(q))
    );
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {label && <label className="block text-xs font-semibold text-[#525252] mb-1">{label}</label>}

      {/* Selector Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full bg-white border border-[#E5E0D8] hover:border-[#BFA16A] rounded-xl px-3 py-2 flex items-center justify-between text-left transition shadow-2xs group focus:outline-none focus:border-[#BFA16A]"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-[#FAF9F6] border border-[#E5E0D8] flex items-center justify-center p-1 shrink-0">
            {matched ? (
              matched.type === 'svg' ? (
                <svg
                  className="w-4 h-4 text-[#BFA16A]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  dangerouslySetInnerHTML={{ __html: matched.codeOrUrl }}
                />
              ) : (
                <img
                  src={matched.codeOrUrl || matched.preview}
                  alt={matched.name}
                  className="w-5 h-5 object-contain"
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                />
              )
            ) : value ? (
              <img
                src={value}
                alt="Selected icon"
                className="w-5 h-5 object-contain"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            ) : (
              <span className="text-[10px] text-[#A3A3A3]">None</span>
            )}
          </div>
          <div className="truncate">
            <span className="text-xs font-semibold text-[#171717] block truncate">
              {matched ? matched.name : value ? value : placeholder}
            </span>
            {matched && (
              <span className="text-[10px] text-[#737373] block truncate">
                {matched.category || 'Icon'} · {matched.codeOrUrl}
              </span>
            )}
          </div>
        </div>
        <span className="text-[10px] text-[#737373] group-hover:text-[#BFA16A] transition ml-2 shrink-0">
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown Menu Popup */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E5E0D8] rounded-2xl shadow-xl z-50 p-2 space-y-2 max-h-72 flex flex-col">
          <div className="px-1 pt-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search icons in library..."
              className="w-full bg-[#FAF9F6] border border-[#E5E0D8] rounded-lg px-3 py-1.5 text-xs text-[#171717] focus:outline-none focus:border-[#BFA16A]"
              autoFocus
            />
          </div>

          <div className="overflow-y-auto space-y-1 flex-1 pr-1">
            {filteredIcons.length === 0 ? (
              <div className="p-3 text-center text-xs text-[#737373]">No matching icons found</div>
            ) : (
              filteredIcons.map((ic) => {
                const isSelected =
                  (matched && matched.id === ic.id) ||
                  value === ic.codeOrUrl ||
                  value === ic.preview;
                return (
                  <button
                    key={ic.id}
                    type="button"
                    onClick={() => {
                      onChange(ic.codeOrUrl || ic.preview || '');
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition ${
                      isSelected
                        ? 'bg-[#BFA16A]/15 border border-[#BFA16A]/40 text-[#171717]'
                        : 'hover:bg-[#FAF9F6] text-[#525252] hover:text-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-white border border-[#E5E0D8] flex items-center justify-center p-1 shrink-0">
                        {ic.type === 'svg' ? (
                          <svg
                            className="w-4 h-4 text-[#BFA16A]"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            dangerouslySetInnerHTML={{ __html: ic.codeOrUrl }}
                          />
                        ) : (
                          <img
                            src={ic.codeOrUrl || ic.preview}
                            alt={ic.name}
                            className="w-5 h-5 object-contain"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                          />
                        )}
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-semibold block truncate">{ic.name}</span>
                        <span className="text-[10px] text-[#888888] font-mono block truncate">
                          {ic.codeOrUrl}
                        </span>
                      </div>
                    </div>
                    {ic.category && (
                      <span className="text-[10px] font-semibold text-[#BFA16A] bg-[#BFA16A]/10 px-2 py-0.5 rounded-md shrink-0 ml-2">
                        {ic.category}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

