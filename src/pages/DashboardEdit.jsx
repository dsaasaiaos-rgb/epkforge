import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, Save, RefreshCw, Loader2, Check, User, X, Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import TagInput from '@/components/build/TagInput';
import LinkInputField from '@/components/build/LinkInputField';
import UploadDropzone from '@/components/build/UploadDropzone';
import { toast } from 'sonner';

const genreSuggestions = [
  'Hip-Hop', 'R&B', 'Pop', 'Rock', 'Alternative', 'Electronic', 'EDM', 'House',
  'Trap', 'Jazz', 'Soul', 'Country', 'Indie', 'Metal', 'Punk', 'Latin', 'Reggae'
];

const vibeSuggestions = [
  'Melodic', 'Energetic', 'Chill', 'Dark', 'Uplifting', 'Introspective', 'Raw',
  'Atmospheric', 'Dreamy', 'Aggressive', 'Romantic', 'Nostalgic', 'Experimental'
];

export default function DashboardEdit() {
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [saving, setSaving] = useState({});
  const [regenerating, setRegenerating] = useState({});

  useEffect(() => {
    loadArtist();
  }, []);

  const loadArtist = async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    
    if (!id) {
      navigate(createPageUrl('Dashboard'));
      return;
    }

    try {
      const isAuth = await base44.auth.isAuthenticated();
      if (!isAuth) {
        base44.auth.redirectToLogin(window.location.href);
        return;
      }

      const artists = await base44.entities.Artist.filter({ id });
      if (artists.length > 0) {
        setArtist(artists[0]);
      } else {
        navigate(createPageUrl('Dashboard'));
      }
    } catch (error) {
      console.error('Error loading artist:', error);
    }
    setIsLoading(false);
  };

  const updateField = (field, value) => {
    setArtist(prev => ({ ...prev, [field]: value }));
  };

  const updateLink = (platform, value) => {
    setArtist(prev => ({
      ...prev,
      verifiedLinks: { ...prev.verifiedLinks, [platform]: value }
    }));
  };

  const saveSection = async (fields) => {
    const sectionKey = fields.join('_');
    setSaving(prev => ({ ...prev, [sectionKey]: true }));
    
    try {
      const updateData = {};
      fields.forEach(field => {
        updateData[field] = artist[field];
      });
      
      await base44.entities.Artist.update(artist.id, updateData);
      toast.success('Changes saved');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Failed to save changes');
    }
    
    setSaving(prev => ({ ...prev, [sectionKey]: false }));
  };

  const regenerateSection = async (section) => {
    setRegenerating(prev => ({ ...prev, [section]: true }));
    
    try {
      const prompt = `Regenerate the ${section} section for this artist EPK. Keep it press-ready and professional.

Artist: ${artist.stageName}
Location: ${artist.primaryLocation || 'Not specified'}
Genres: ${artist.genres?.join(', ') || 'Not specified'}
Vibes: ${artist.vibes?.join(', ') || 'Not specified'}

Current Bio: ${artist.bioLong || 'None'}

Generate a new ${section === 'bioLong' ? 'long bio (150-250 words)' : 
  section === 'bioShort' ? 'short bio (50-75 words)' :
  section === 'tagline' ? 'tagline (max 100 characters)' :
  section === 'highlights' ? 'list of 3-5 career highlights' : section}.

CRITICAL: NEVER fabricate awards, chart positions, or collaborations. Only use provided information.`;

      let response;
      
      if (section === 'highlights') {
        response = await base44.integrations.Core.InvokeLLM({
          prompt,
          response_json_schema: {
            type: "object",
            properties: {
              highlights: { type: "array", items: { type: "string" } }
            }
          }
        });
        updateField('highlights', response.highlights);
        await base44.entities.Artist.update(artist.id, { highlights: response.highlights });
      } else {
        response = await base44.integrations.Core.InvokeLLM({
          prompt,
          response_json_schema: {
            type: "object",
            properties: {
              [section]: { type: "string" }
            }
          }
        });
        updateField(section, response[section]);
        await base44.entities.Artist.update(artist.id, { [section]: response[section] });
      }
      
      toast.success(`${section} regenerated`);
    } catch (error) {
      console.error('Error regenerating:', error);
      toast.error('Failed to regenerate');
    }
    
    setRegenerating(prev => ({ ...prev, [section]: false }));
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
          <div className="flex items-center gap-4">
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
              <h1 className="text-2xl font-bold text-white">Edit EPK</h1>
              <p className="text-zinc-400">{artist.stageName}</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-white">Basic Info</CardTitle>
                <Button
                  size="sm"
                  onClick={() => saveSection(['stageName', 'primaryLocation', 'secondaryLocation', 'genres', 'vibes'])}
                  disabled={saving.stageName_primaryLocation_secondaryLocation_genres_vibes}
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  {saving.stageName_primaryLocation_secondaryLocation_genres_vibes ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><Save className="w-4 h-4 mr-1" /> Save</>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Stage Name</Label>
                    <Input
                      value={artist.stageName || ''}
                      onChange={(e) => updateField('stageName', e.target.value)}
                      className="bg-zinc-900/80 border-zinc-700 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-zinc-300">Primary Location</Label>
                    <Input
                      value={artist.primaryLocation || ''}
                      onChange={(e) => updateField('primaryLocation', e.target.value)}
                      className="bg-zinc-900/80 border-zinc-700 rounded-xl"
                    />
                  </div>
                </div>
                <TagInput
                  label="Genres"
                  value={artist.genres || []}
                  onChange={(v) => updateField('genres', v)}
                  suggestions={genreSuggestions}
                />
                <TagInput
                  label="Vibes"
                  value={artist.vibes || []}
                  onChange={(v) => updateField('vibes', v)}
                  suggestions={vibeSuggestions}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-white">Tagline</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => regenerateSection('tagline')}
                    disabled={regenerating.tagline}
                    className="border-zinc-700 text-zinc-300"
                  >
                    {regenerating.tagline ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <><RefreshCw className="w-4 h-4 mr-1" /> Regenerate</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveSection(['tagline'])}
                    disabled={saving.tagline}
                    className="bg-emerald-600 hover:bg-emerald-500"
                  >
                    {saving.tagline ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1" /> Save</>}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Input
                  value={artist.tagline || ''}
                  onChange={(e) => updateField('tagline', e.target.value)}
                  placeholder="One-line catchy description"
                  className="bg-zinc-900/80 border-zinc-700 rounded-xl"
                  maxLength={100}
                />
                <p className="text-xs text-zinc-500 mt-2">{(artist.tagline || '').length}/100 characters</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Long Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-white">Full Bio</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => regenerateSection('bioLong')}
                    disabled={regenerating.bioLong}
                    className="border-zinc-700 text-zinc-300"
                  >
                    {regenerating.bioLong ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <><RefreshCw className="w-4 h-4 mr-1" /> Regenerate</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveSection(['bioLong'])}
                    disabled={saving.bioLong}
                    className="bg-emerald-600 hover:bg-emerald-500"
                  >
                    {saving.bioLong ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1" /> Save</>}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={artist.bioLong || ''}
                  onChange={(e) => updateField('bioLong', e.target.value)}
                  placeholder="Full biography (150-250 words)"
                  className="bg-zinc-900/80 border-zinc-700 rounded-xl min-h-[200px]"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Short Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-white">Short Description</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => regenerateSection('bioShort')}
                    disabled={regenerating.bioShort}
                    className="border-zinc-700 text-zinc-300"
                  >
                    {regenerating.bioShort ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <><RefreshCw className="w-4 h-4 mr-1" /> Regenerate</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveSection(['bioShort'])}
                    disabled={saving.bioShort}
                    className="bg-emerald-600 hover:bg-emerald-500"
                  >
                    {saving.bioShort ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1" /> Save</>}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={artist.bioShort || ''}
                  onChange={(e) => updateField('bioShort', e.target.value)}
                  placeholder="Short description (50-75 words)"
                  className="bg-zinc-900/80 border-zinc-700 rounded-xl min-h-[100px]"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-white">Career Highlights</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => regenerateSection('highlights')}
                    disabled={regenerating.highlights}
                    className="border-zinc-700 text-zinc-300"
                  >
                    {regenerating.highlights ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <><RefreshCw className="w-4 h-4 mr-1" /> Regenerate</>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => saveSection(['highlights'])}
                    disabled={saving.highlights}
                    className="bg-emerald-600 hover:bg-emerald-500"
                  >
                    {saving.highlights ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-1" /> Save</>}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {(artist.highlights || []).map((highlight, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={highlight}
                      onChange={(e) => {
                        const newHighlights = [...(artist.highlights || [])];
                        newHighlights[index] = e.target.value;
                        updateField('highlights', newHighlights);
                      }}
                      className="bg-zinc-900/80 border-zinc-700 rounded-xl"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        updateField('highlights', artist.highlights.filter((_, i) => i !== index));
                      }}
                      className="text-zinc-400 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() => updateField('highlights', [...(artist.highlights || []), ''])}
                  className="border-zinc-700 text-zinc-300 w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-white">Media</CardTitle>
                <Button
                  size="sm"
                  onClick={() => saveSection(['profilePhotoUrl', 'bannerUrl', 'pressPhotos'])}
                  disabled={saving.profilePhotoUrl_bannerUrl_pressPhotos}
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  {saving.profilePhotoUrl_bannerUrl_pressPhotos ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><Save className="w-4 h-4 mr-1" /> Save</>
                  )}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <UploadDropzone
                  label="Profile Photo"
                  value={artist.profilePhotoUrl}
                  onChange={(v) => updateField('profilePhotoUrl', v)}
                  aspectRatio="square"
                />
                <UploadDropzone
                  label="Banner Image"
                  value={artist.bannerUrl}
                  onChange={(v) => updateField('bannerUrl', v)}
                  aspectRatio="video"
                />
                <UploadDropzone
                  label="Press Photos"
                  value={artist.pressPhotos}
                  onChange={(v) => updateField('pressPhotos', v)}
                  multiple
                  maxFiles={5}
                  aspectRatio="portrait"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg text-white">Social Links</CardTitle>
                <Button
                  size="sm"
                  onClick={() => saveSection(['verifiedLinks'])}
                  disabled={saving.verifiedLinks}
                  className="bg-emerald-600 hover:bg-emerald-500"
                >
                  {saving.verifiedLinks ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <><Save className="w-4 h-4 mr-1" /> Save</>
                  )}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['instagram', 'tiktok', 'youtube', 'spotify', 'appleMusic', 'soundcloud', 'website'].map(platform => (
                    <LinkInputField
                      key={platform}
                      platform={platform}
                      value={artist.verifiedLinks?.[platform] || ''}
                      onChange={(v) => updateLink(platform, v)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}