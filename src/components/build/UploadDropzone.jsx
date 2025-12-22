import React, { useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function UploadDropzone({ label, description, value, onChange, multiple = false, maxFiles = 1, aspectRatio }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map(file => base44.integrations.Core.UploadFile({ file }));
      const results = await Promise.all(uploadPromises);
      const urls = results.map(r => r.file_url);

      if (multiple) {
        const newValue = [...(value || []), ...urls].slice(0, maxFiles);
        onChange(newValue);
      } else {
        onChange(urls[0]);
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
    setIsUploading(false);
  };

  const removeFile = (urlToRemove) => {
    if (multiple) {
      onChange(value.filter(url => url !== urlToRemove));
    } else {
      onChange(null);
    }
  };

  const displayFiles = multiple ? (value || []) : (value ? [value] : []);

  return (
    <div className="space-y-2">
      <Label className="text-zinc-300">{label}</Label>
      <p className="text-sm text-zinc-500 mb-2">{description}</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        {displayFiles.map((url, i) => (
          <div key={i} className={`relative group rounded-xl overflow-hidden bg-zinc-800 ${aspectRatio === 'video' ? 'aspect-video' : 'aspect-square'}`}>
            <img src={url} alt="Upload" className="w-full h-full object-cover" />
            <button
              onClick={() => removeFile(url)}
              className="absolute top-1 right-1 p-1 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        {displayFiles.length < maxFiles && (
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className={`border-2 border-dashed border-zinc-700 rounded-xl flex flex-col items-center justify-center gap-2 hover:border-emerald-500 hover:bg-zinc-800/50 transition-colors ${aspectRatio === 'video' ? 'aspect-video' : 'aspect-square'}`}
          >
            {isUploading ? (
              <div className="animate-spin w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-zinc-500" />
                <span className="text-xs text-zinc-500 font-medium">Upload</span>
              </>
            )}
          </button>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple={multiple}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}