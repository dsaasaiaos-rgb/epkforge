import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen font-sans">
      {children}
    </div>
  );
}