import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, FileDown, Printer, Loader2, Calendar, ExternalLink, User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

export default function DashboardExports() {
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [exports, setExports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const params = new URLSearchParams(window.location.search);
    const artistId = params.get('artistId');
    
    if (!artistId) {
      navigate(createPageUrl('Dashboard'));
      return;
    }

    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }

      const user = await base44.auth.me();
      const artists = await base44.entities.Artist.filter({ id: artistId });
      
      if (artists.length > 0) {
        setArtist(artists[0]);
        
        // Load exports
        const artistExports = await base44.entities.EpkExport.filter({ artistId });
        setExports(artistExports.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)));
      } else {
        navigate(createPageUrl('Dashboard'));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setIsLoading(false);
  };

  const generateExport = async () => {
    setIsGenerating(true);
    
    try {
      const user = await base44.auth.me();
      const newVersion = exports.length + 1;
      
      // Create export record
      await base44.entities.EpkExport.create({
        artistId: artist.id,
        userId: user.id,
        version: newVersion,
        pdfUrl: null // Will be the print page URL
      });

      // Open print page
      window.open(createPageUrl('PrintExport') + `?artistId=${artist.id}`, '_blank');
      
      // Reload exports
      const artistExports = await base44.entities.EpkExport.filter({ artistId: artist.id });
      setExports(artistExports.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)));
      
    } catch (error) {
      console.error('Error generating export:', error);
    }
    
    setIsGenerating(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!artist) return null;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to={createPageUrl('Dashboard')}>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-zinc-800">
              {artist.profilePhotoUrl ? (
                <img src={artist.profilePhotoUrl} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <User className="w-6 h-6 text-zinc-600" />
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PDF Exports</h1>
              <p className="text-zinc-400">{artist.stageName}</p>
            </div>
          </div>
          <Button
            onClick={generateExport}
            disabled={isGenerating}
            className="bg-emerald-600 hover:bg-emerald-500"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Printer className="w-4 h-4 mr-2" />
            )}
            Generate PDF
          </Button>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-emerald-500/10 to-purple-500/10 border-emerald-500/20 rounded-2xl mb-8">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Printer className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    How PDF Export Works
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    Click "Generate PDF" to open a print-optimized version of your EPK. 
                    Use your browser's print function (Ctrl/Cmd + P) and select "Save as PDF" 
                    to download your professional press kit.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Export History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-white mb-4">Export History</h2>
          
          {exports.length > 0 ? (
            <div className="space-y-3">
              {exports.map((exp, index) => (
                <Card key={exp.id} className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                        <FileDown className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Version {exp.version}</p>
                        <p className="text-sm text-zinc-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(exp.created_date), 'MMM d, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                    <a
                      href={createPageUrl('PrintExport') + `?artistId=${artist.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardContent className="py-12 text-center">
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileDown className="w-8 h-8 text-zinc-600" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  No exports yet
                </h3>
                <p className="text-zinc-400 text-sm">
                  Generate your first PDF export to share with labels and venues.
                </p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}