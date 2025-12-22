import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { Upload, X, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function UploadDropzone({ 
  label, 
  description, 
  value, 
  onChange, 
  multiple = false, 
  maxFiles = 1,
  aspectRatio = 'square'
}) {
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    try {
      if (multiple) {
        const uploadPromises = files.slice(0, maxFiles).map(file => 
          base44.integrations.Core.UploadFile({ file })
        );
        const results = await Promise.all(uploadPromises);
        const urls = results.map(r => r.file_url);
        onChange([...(value || []), ...urls].slice(0, maxFiles));
      } else {
        const result = await base44.integrations.Core.UploadFile({ file: files[0] });
        onChange(result.file_url);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
    setUploading(false);
  };

  const removeFile = (urlToRemove) => {
    if (multiple) {
      onChange((value || []).filter(url => url !== urlToRemove));
    } else {
      onChange(null);
    }
  };

  const displayValue = multiple ? (value || []) : (value ? [value] : []);

  return (
    <div className="space-y-2">
      <Label className="text-zinc-300">{label}</Label>
      {description && <p className="text-sm text-zinc-500">{description}</p>}
      
      {displayValue.length > 0 && (
        <div className={cn(
          "grid gap-4",
          multiple ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1"
        )}>
          {displayValue.map((url, idx) => (
            <div key={idx} className="relative group">
              <img 
                src={url} 
                alt={`Upload ${idx + 1}`}
                className={cn(
                  "w-full rounded-xl object-cover",
                  aspectRatio === 'square' && "aspect-square",
                  aspectRatio === 'video' && "aspect-video",
                  aspectRatio === 'portrait' && "aspect-[3/4]"
                )}
              />
              <button
                type="button"
                onClick={() => removeFile(url)}
                className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}

      {(!multiple || displayValue.length < maxFiles) && (
        <label className={cn(
          "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors",
          uploading ? "border-zinc-700 bg-zinc-900/50" : "border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-900/50"
        )}>
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            accept="image/*"
            multiple={multiple}
            disabled={uploading}
          />
          {uploading ? (
            <Loader2 className="w-8 h-8 text-zinc-500 animate-spin" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-zinc-500 mb-2" />
              <span className="text-sm text-zinc-400">Click to upload</span>
            </>
          )}
        </label>
      )}
    </div>
  );
}