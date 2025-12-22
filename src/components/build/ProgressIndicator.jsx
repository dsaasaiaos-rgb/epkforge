import React from "react";
import { motion } from "framer-motion";

export default function ProgressIndicator({ step }) {
  const steps = [1, 2, 3, 4, 5];
  
  return (
    <div className="flex justify-center gap-2 mb-8">
      {steps.map((s) => (
        <motion.div
          key={s}
          className={`h-2 rounded-full ${s <= step ? 'bg-emerald-500' : 'bg-zinc-800'}`}
          initial={{ width: 16 }}
          animate={{ width: s === step ? 32 : 16 }}
          transition={{ duration: 0.3 }}
        />
      ))}
    </div>
  );
}