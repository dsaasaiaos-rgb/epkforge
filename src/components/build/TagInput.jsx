import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

export default function TagInput({ label, placeholder, value, onChange, maxTags, suggestions = [] }) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = (tagToAdd = input) => {
    const trimmed = tagToAdd.trim();
    if (trimmed && value.length < maxTags && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInput("");
    }
  };

  const removeTag = (tag) => {
    onChange(value.filter(t => t !== tag));
  };

  return (
    <div className="space-y-3">
      <Label className="text-zinc-300">{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map(tag => (
          <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm border border-emerald-500/20">
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:text-emerald-300">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length >= maxTags ? `Max ${maxTags} tags reached` : placeholder}
        disabled={value.length >= maxTags}
        className="bg-zinc-900/50 border-zinc-700"
      />
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {suggestions.slice(0, 8).map(s => (
            <button
              key={s}
              onClick={() => addTag(s)}
              disabled={value.includes(s) || value.length >= maxTags}
              className="text-xs px-2 py-1 rounded-md bg-zinc-800 text-zinc-400 hover:bg-zinc-700 disabled:opacity-50"
            >
              + {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}