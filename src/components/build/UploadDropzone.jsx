import React, { useCallback, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, X, Image, Loader2 } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function UploadDropzone({ 
  label,
  description,
  value,
  onChange,
  multiple = false,
  maxFiles = 5,
  aspectRatio = "square"
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const aspectClasses = {
    square: "aspect-square",
    video: "aspect-video",
    portrait: "aspect-[3/4]"
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    await uploadFiles(files);
  }, []);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    await uploadFiles(files);
  };

  const uploadFiles = async (files) => {
    if (files.length === 0) return;
    
    setIsUploading(true);
    try {
      const uploadPromises = files.slice(0, multiple ? maxFiles : 1).map(async (file) => {
        const result = await base44.integrations.Core.UploadFile({ file });
        return result.file_url;
      });
      
      const uploadedUrls = await Promise.all(uploadPromises);
      
      if (multiple) {
        const currentUrls = Array.isArray(value) ? value : [];
        onChange([...currentUrls, ...uploadedUrls].slice(0, maxFiles));
      } else {
        onChange(uploadedUrls[0]);
      }
    } catch (error) {
      console.error('Upload error:', error);
    }
    setIsUploading(false);
  };

  const removeImage = (index) => {
    if (multiple) {
      const newUrls = [...value];
      newUrls.splice(index, 1);
      onChange(newUrls);
    } else {
      onChange(null);
    }
  };

  const images = multiple ? (Array.isArray(value) ? value : []) : (value ? [value] : []);
  const canAddMore = multiple ? images.length < maxFiles : images.length === 0;

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-medium text-white">{label}</h4>
        {description && (
          <p className="text-xs text-zinc-500 mt-1">{description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {/* Existing Images */}
        {images.map((url, index) => (
          <div key={index} className={cn("relative rounded-xl overflow-hidden bg-zinc-800 w-28", aspectClasses[aspectRatio])}>
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}

        {/* Upload Area */}
        {canAddMore && (
          <label
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "w-28 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all",
              aspectClasses[aspectRatio],
              isDragging 
                ? "border-emerald-500 bg-emerald-500/10" 
                : "border-zinc-700 hover:border-zinc-600 bg-zinc-900/50"
            )}
          >
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              onChange={handleFileSelect}
              className="hidden"
            />
            {isUploading ? (
              <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
            ) : (
              <>
                <Upload className="w-6 h-6 text-zinc-500 mb-1" />
                <span className="text-xs text-zinc-500">Upload</span>
              </>
            )}
          </label>
        )}
      </div>

      {multiple && (
        <p className="text-xs text-zinc-500">
          {images.length}/{maxFiles} images
        </p>
      )}
    </div>
  );
}