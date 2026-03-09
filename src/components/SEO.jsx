import { useEffect } from 'react';

export default function SEO({ title, description, image }) {
  useEffect(() => {
    // Update Title
    if (title) {
      document.title = `${title} | ITSFAMM`;
    }

    // Update Meta Tags
    const updateMeta = (name, content) => {
      if (!content) return;
      
      // Try to find existing meta tag
      let element = document.querySelector(`meta[name="${name}"]`) || 
                   document.querySelector(`meta[property="${name}"]`);
      
      // Create if not exists
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      // Update content
      element.setAttribute('content', content);
    };

    if (description) {
      updateMeta('description', description);
      updateMeta('og:description', description);
      updateMeta('twitter:description', description);
    }
    
    if (title) {
      updateMeta('og:title', title);
      updateMeta('twitter:title', title);
    }

    if (image) {
      updateMeta('og:image', image);
      updateMeta('twitter:image', image);
      updateMeta('twitter:card', 'summary_large_image');
    }

    // Set default OG/Twitter type/url if missing
    updateMeta('og:type', 'website');
    updateMeta('og:url', window.location.href);
    
  }, [title, description, image]);

  return null;
}