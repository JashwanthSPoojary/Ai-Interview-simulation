import React from 'react';
import { FileEdit, EyeIcon, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PreviewHeader = ({interviewId}:{interviewId:string}) => {
  return (
    <div className="p-6 mb-6 bg-white rounded-lg shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <EyeIcon className="h-5 w-5 text-gray-700" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Profile Preview</h2>
        </div>
        
        <Link href={`/interview/live/${interviewId}`} className="w-full sm:w-auto">
          <Button 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white"
          >
            Save and Proceed
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-md border border-gray-200 flex items-start gap-2 dark:bg-gray-900/20 dark:border-gray-700">
        <AlertCircle className="h-5 w-5 text-gray-700 mt-0.5 md:mt-0" />
        <p className="text-sm text-gray-700 dark:text-gray-300">
          You can edit, delete and add information of the profile
        </p>
      </div>
    </div>
  );
};

export default PreviewHeader;