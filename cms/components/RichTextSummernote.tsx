'use client';

import { useState, useRef, useEffect } from 'react';

interface RichTextSummernoteProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
}

export default function RichTextSummernote({
  label = 'Detail',
  value,
  onChange,
  placeholder = 'Write content here...',
  minHeight = '280px',
}: RichTextSummernoteProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isCodeView, setIsCodeView] = useState(false);
  const [internalCode, setInternalCode] = useState(value || '');

  // Flag to know when user is typing to avoid resetting innerHTML and collapsing cursor
  const isTypingRef = useRef(false);

  // Synchronize incoming value when changed externally (not from user typing)
  useEffect(() => {
    if (editorRef.current && !isCodeView) {
      if (!isTypingRef.current && editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value || '';
      }
    }
    setInternalCode(value || '');
  }, [value, isCodeView]);

  const savedSelection = useRef<Range | null>(null);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0);
    }
  };

  const restoreSelection = () => {
    if (savedSelection.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(savedSelection.current);
      }
    }
  };

  // Execute formatting command
  const execCmd = (command: string, arg: string | undefined = undefined) => {
    if (isCodeView) return;
    if (editorRef.current) {
      editorRef.current.focus();
    }
    restoreSelection();

    if (command === 'formatBlock' && arg) {
      const tagWithBrackets = `<${arg}>`;
      const success = document.execCommand('formatBlock', false, tagWithBrackets);
      if (!success) {
        document.execCommand('formatBlock', false, arg);
      }
    } else {
      document.execCommand(command, false, arg);
    }

    saveSelection();
    handleInput();
  };

  const handleInput = () => {
    if (editorRef.current) {
      isTypingRef.current = true;
      const html = editorRef.current.innerHTML;
      setInternalCode(html);
      onChange(html);
      // Reset typing flag shortly after
      setTimeout(() => {
        isTypingRef.current = false;
      }, 50);
    }
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInternalCode(val);
    onChange(val);
  };

  // Word & Char counts
  const plainText = internalCode.replace(/<[^>]+>/g, ' ').trim();
  const charCount = plainText ? plainText.length : 0;
  const wordCount = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Insert Table
  const insertTable = () => {
    const tableHtml = `
      <table style="width:100%; border-collapse: collapse; margin: 16px 0; border: 1px solid #D5D0C7;">
        <thead>
          <tr style="background:#F5F2EB;">
            <th style="border:1px solid #D5D0C7; padding:10px; text-align:left;">Topic</th>
            <th style="border:1px solid #D5D0C7; padding:10px; text-align:left;">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border:1px solid #D5D0C7; padding:10px;">Item 1</td>
            <td style="border:1px solid #D5D0C7; padding:10px;">Description 1</td>
          </tr>
          <tr>
            <td style="border:1px solid #D5D0C7; padding:10px;">Item 2</td>
            <td style="border:1px solid #D5D0C7; padding:10px;">Description 2</td>
          </tr>
        </tbody>
      </table>
      <p></p>
    `;
    execCmd('insertHTML', tableHtml);
  };

  // Insert HTML Image Block at Cursor
  const insertImageHtml = (url: string, alt: string = 'Content image') => {
    const imgHtml = `
      <figure style="margin: 20px 0; text-align: center;">
        <img src="${url}" alt="${alt}" style="max-width: 100%; height: auto; border-radius: 12px; border: 1px solid #E5E0D8; box-shadow: 0 4px 12px rgba(0,0,0,0.06); display: inline-block;" />
      </figure>
      <p></p>
    `;
    execCmd('insertHTML', imgHtml);
  };

  // Handle local image file upload directly into content
  const handleEditorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('http://127.0.0.1:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success && json.url) {
          insertImageHtml(json.url, file.name);
          return;
        }
      }

      // Fallback: Read as base64 DataURL
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          insertImageHtml(evt.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      const reader = new FileReader();
      reader.onload = (evt) => {
        if (evt.target?.result) {
          insertImageHtml(evt.target.result as string, file.name);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-[#525252] mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Editor Container */}
      <div className="border border-[#E5E0D8] rounded-xl overflow-hidden bg-white shadow-xs focus-within:border-[#BFA16A] transition">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-[#FAF8F5] border-b border-[#E5E0D8] text-sm text-[#444444]">
          {/* Format Block (Paragraph / Headings) */}
          <select
            title="Styles"
            onChange={(e) => execCmd('formatBlock', e.target.value)}
            className="h-7 text-xs px-2 bg-white border border-[#E5E0D8] rounded text-[#171717] focus:outline-none focus:border-[#BFA16A] cursor-pointer"
            defaultValue="p"
          >
            <option value="p">Normal (p)</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="blockquote">Quote</option>
            <option value="pre">Code Block</option>
          </select>

          {/* Font Family */}
          <select
            title="Font Family"
            onChange={(e) => execCmd('fontName', e.target.value)}
            className="h-7 text-xs px-2 bg-white border border-[#E5E0D8] rounded text-[#171717] focus:outline-none focus:border-[#BFA16A] cursor-pointer"
            defaultValue="Inter"
          >
            <option value="Inter">Inter</option>
            <option value="Arial">Arial</option>
            <option value="Georgia">Georgia</option>
            <option value="Impact">Impact</option>
            <option value="Tahoma">Tahoma</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Verdana">Verdana</option>
          </select>

          {/* Font Size */}
          <select
            title="Font Size"
            onChange={(e) => execCmd('fontSize', e.target.value)}
            className="h-7 text-xs px-2 bg-white border border-[#E5E0D8] rounded text-[#171717] focus:outline-none focus:border-[#BFA16A] cursor-pointer"
            defaultValue="3"
          >
            <option value="1">10px</option>
            <option value="2">13px</option>
            <option value="3">16px</option>
            <option value="4">18px</option>
            <option value="5">24px</option>
            <option value="6">32px</option>
            <option value="7">48px</option>
          </select>

          <div className="w-[1px] h-5 bg-[#E5E0D8] mx-0.5" />

          {/* Basic Inline Styles */}
          <button
            type="button"
            title="Bold (Ctrl+B)"
            onClick={() => execCmd('bold')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] font-bold text-xs h-7 w-7 flex items-center justify-center transition"
          >
            B
          </button>
          <button
            type="button"
            title="Italic (Ctrl+I)"
            onClick={() => execCmd('italic')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] italic text-xs h-7 w-7 flex items-center justify-center transition"
          >
            I
          </button>
          <button
            type="button"
            title="Underline (Ctrl+U)"
            onClick={() => execCmd('underline')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] underline text-xs h-7 w-7 flex items-center justify-center transition"
          >
            U
          </button>
          <button
            type="button"
            title="Strikethrough"
            onClick={() => execCmd('strikeThrough')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] line-through text-xs h-7 w-7 flex items-center justify-center transition"
          >
            S
          </button>

          <div className="w-[1px] h-5 bg-[#E5E0D8] mx-0.5" />

          {/* Lists */}
          <button
            type="button"
            title="Bullet List"
            onClick={() => execCmd('insertUnorderedList')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] text-xs h-7 w-7 flex items-center justify-center transition"
          >
            •≡
          </button>
          <button
            type="button"
            title="Numbered List"
            onClick={() => execCmd('insertOrderedList')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] text-xs h-7 w-7 flex items-center justify-center transition"
          >
            1.≡
          </button>

          <div className="w-[1px] h-5 bg-[#E5E0D8] mx-0.5" />

          {/* Alignments */}
          <button
            type="button"
            title="Align Left"
            onClick={() => execCmd('justifyLeft')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] text-xs h-7 w-7 flex items-center justify-center transition"
          >
            ⇤
          </button>
          <button
            type="button"
            title="Align Center"
            onClick={() => execCmd('justifyCenter')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] text-xs h-7 w-7 flex items-center justify-center transition"
          >
            ↔
          </button>
          <button
            type="button"
            title="Align Right"
            onClick={() => execCmd('justifyRight')}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] text-xs h-7 w-7 flex items-center justify-center transition"
          >
            ⇥
          </button>

          <div className="w-[1px] h-5 bg-[#E5E0D8] mx-0.5" />

          {/* Link */}
          <button
            type="button"
            title="Insert Link"
            onClick={() => {
              const url = prompt('Enter link URL (e.g. https://...):');
              if (url) execCmd('createLink', url);
            }}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] text-xs h-7 w-7 flex items-center justify-center transition"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </button>

          {/* Image Upload */}
          <button
            type="button"
            title="Insert Image (Upload or URL)"
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] text-xs h-7 px-2 flex items-center gap-1 transition"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-[10px] hidden sm:inline">Image</span>
          </button>

          {/* Code View */}
          <button
            type="button"
            title="Toggle HTML Code View"
            onClick={() => setIsCodeView(!isCodeView)}
            className={`px-2 h-7 rounded text-xs font-mono font-bold flex items-center justify-center transition ${
              isCodeView ? 'bg-[#BFA16A] text-white' : 'hover:bg-[#EFE5D3] text-[#171717]'
            }`}
          >
            &lt;/&gt;
          </button>

          {/* Table */}
          <button
            type="button"
            title="Insert Table"
            onClick={insertTable}
            className="p-1.5 hover:bg-[#EFE5D3] rounded text-[#171717] text-xs h-7 w-7 flex items-center justify-center transition"
          >
            ▦
          </button>
        </div>

        {/* Content Editable Area or Code View */}
        {isCodeView ? (
          <textarea
            value={internalCode}
            onChange={handleCodeChange}
            className="w-full p-4 font-mono text-xs text-[#171717] bg-[#FAF8F5] focus:outline-none resize-y"
            style={{ minHeight }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onBlur={handleInput}
            onMouseUp={saveSelection}
            onKeyUp={saveSelection}
            data-placeholder={placeholder}
            className="p-4 text-[#171717] focus:outline-none prose max-w-none text-base leading-relaxed overflow-y-auto [&>h1]:text-3xl [&>h1]:font-extrabold [&>h1]:text-[#111827] [&>h1]:my-4 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#111827] [&>h2]:my-3 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-[#111827] [&>h3]:my-2 [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:text-[#111827] [&>p]:my-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
            style={{ minHeight }}
          />
        )}

        {/* Footer Info Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-[#FAF8F5] border-t border-[#E5E0D8] text-[10px] text-[#888888] font-mono tracking-wider select-none">
          <div className="flex items-center gap-1">
            <span>⊞</span>
          </div>
          <div className="flex items-center gap-3">
            <span>CHARS: {charCount}</span>
            <span>WORDS: {wordCount}</span>
            <span className="font-semibold text-[#737373] uppercase">POWERED BY JODIT</span>
          </div>
        </div>
      </div>

      {/* Hidden file input for inserting inline images at cursor position */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleEditorImageUpload}
        className="hidden"
      />
    </div>
  );
}
