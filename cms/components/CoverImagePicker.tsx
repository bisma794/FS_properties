'use client';

import { useRef } from 'react';

interface CoverImagePickerProps {
  label?: string;
  imageUrl: string;
  onChange: (url: string) => void;
  onFileUpload: (file: File, callback: (url: string) => void) => void;
}

export default function CoverImagePicker({
  label = 'Cover Image',
  imageUrl,
  onChange,
  onFileUpload,
}: CoverImagePickerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileUpload(e.target.files[0], onChange);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[#525252]">
        {label}
      </label>

      {/* Preview Card */}
      <div className="relative group w-full max-w-sm rounded-xl border border-[#D5D0C7] bg-white overflow-hidden shadow-xs">
        {/* Image display */}
        <div className="relative aspect-[16/9] w-full bg-[#F5F2EB] flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Cover Image Preview"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/buy_hero.png';
              }}
            />
          ) : (
            <div className="text-center p-4 text-[#888]">
              <svg className="w-8 h-8 text-[#A39982] mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-xs">No image selected</span>
            </div>
          )}

          {/* Action buttons in top-right corner: Edit/Replace and Remove */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
            {/* Edit / Replace Button */}
            <button
              type="button"
              title="Edit/Replace Image"
              onClick={() => fileInputRef.current?.click()}
              className="w-8 h-8 rounded-lg bg-white/95 hover:bg-white text-emerald-600 border border-emerald-500/30 flex items-center justify-center shadow-md transition hover:scale-105 cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </button>

            {/* Remove Image Button (Only visible if image exists) */}
            {imageUrl ? (
              <button
                type="button"
                title="Remove Image"
                onClick={() => onChange('')}
                className="w-8 h-8 rounded-lg bg-white/95 hover:bg-white text-red-500 hover:text-red-700 border border-red-300 flex items-center justify-center shadow-md transition hover:scale-105 cursor-pointer"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            ) : null}
          </div>
        </div>


        {/* Input box to manually paste or inspect path */}
        <div className="p-2.5 bg-[#FAF8F5] border-t border-[#E5E0D8] flex items-center gap-2">
          <input
            type="text"
            value={imageUrl || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image path or URL (e.g. /buy_hero.png)"
            className="flex-1 bg-white border border-[#D5D0C7] rounded-lg px-2.5 py-1 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#BFA16A]"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 text-xs font-semibold text-[#171717] bg-[#EFE5D3] hover:bg-[#E2D5BE] rounded-lg transition cursor-pointer"
          >
            Browse
          </button>
          {imageUrl ? (
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition cursor-pointer"
              title="Remove image"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>


      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
