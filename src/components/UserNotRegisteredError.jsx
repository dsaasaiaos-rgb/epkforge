import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from "@/components/ui/button";

const UserNotRegisteredError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You don't have access to this application. Please contact the administrator to request access.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="w-full"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default UserNotRegisteredError;