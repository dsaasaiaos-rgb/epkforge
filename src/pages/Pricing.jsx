import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Zap, Shield, Edit, FileDown, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Pricing() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const userData = await base44.auth.me();
          setUser(userData);
        }
      } catch (e) {
        console.log('Not authenticated');
      }
    };
    loadUser();
  }, []);

  const handleUpgrade = () => {
    if (!user) {
      base44.auth.redirectToLogin(window.location.href);
    } else {
      // TODO: Implement Stripe checkout
      alert('Stripe integration coming soon!');
    }
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, Creator-First Pricing
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Choose the plan that works for you. Upgrade or cancel anytime.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-3xl h-full">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl text-white mb-2">Free</CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$0</span>
                  <span className="text-zinc-500">forever</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Basic EPK (read-only)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Public profile</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-300">Spotlight rotation</span>
                  </div>
                  <div className="flex items-start gap-3 opacity-50">
                    <span className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span className="text-zinc-500">Lower Spotlight frequency</span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate(createPageUrl('Build'))}
                  variant="outline"
                  className="w-full h-12 border-zinc-700 text-zinc-300 rounded-xl"
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-emerald-900/20 to-emerald-950/20 border-emerald-500/30 rounded-3xl h-full relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                  POPULAR
                </span>
              </div>
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl text-white mb-2">Pro</CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$1</span>
                  <span className="text-zinc-400">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Edit & regenerate EPK</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Claim & verify profile</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Export PDF</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Higher Spotlight frequency</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white font-medium">Verified badge</span>
                  </div>
                </div>

                <Button
                  onClick={handleUpgrade}
                  className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold"
                >
                  Upgrade for $1/month
                </Button>
                <p className="text-xs text-center text-zinc-500">Cancel anytime</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Feature Comparison
          </h2>
          <Card className="bg-zinc-900/50 border-zinc-800 rounded-3xl overflow-hidden">
            <CardContent className="p-0">
              <div className="divide-y divide-zinc-800">
                <FeatureRow
                  icon={<Zap className="w-5 h-5" />}
                  label="Basic EPK Generation"
                  free={true}
                  pro={true}
                />
                <FeatureRow
                  icon={<Eye className="w-5 h-5" />}
                  label="Public Profile"
                  free={true}
                  pro={true}
                />
                <FeatureRow
                  icon={<Edit className="w-5 h-5" />}
                  label="Edit EPK"
                  free={false}
                  pro={true}
                />
                <FeatureRow
                  icon={<Shield className="w-5 h-5" />}
                  label="Claim & Verify"
                  free={false}
                  pro={true}
                />
                <FeatureRow
                  icon={<FileDown className="w-5 h-5" />}
                  label="Export PDF"
                  free={true}
                  pro={true}
                />
                <FeatureRow
                  icon={<Zap className="w-5 h-5" />}
                  label="Spotlight Frequency"
                  free="Lower"
                  pro="3x Higher"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function FeatureRow({ icon, label, free, pro }) {
  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      <div className="flex items-center gap-3 text-white">
        {icon}
        <span>{label}</span>
      </div>
      <div className="flex items-center justify-center">
        {typeof free === 'boolean' ? (
          free ? <Check className="w-5 h-5 text-emerald-500" /> : <span className="text-zinc-600">—</span>
        ) : (
          <span className="text-zinc-400 text-sm">{free}</span>
        )}
      </div>
      <div className="flex items-center justify-center">
        {typeof pro === 'boolean' ? (
          pro ? <Check className="w-5 h-5 text-emerald-500" /> : <span className="text-zinc-600">—</span>
        ) : (
          <span className="text-emerald-400 text-sm font-medium">{pro}</span>
        )}
      </div>
    </div>
  );
}