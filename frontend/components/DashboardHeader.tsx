import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  user: any;
  maxResults: number;
  onMaxResultsChange: (value: number) => void;
  onLogout: () => void;
  onClassify: () => void;
  isClassifying: boolean;
  hasEmails: boolean;
}

export default function DashboardHeader({
  user,
  maxResults,
  onMaxResultsChange,
  onLogout,
  onClassify,
  isClassifying,
  hasEmails
}: DashboardHeaderProps) {
  return (
    <header className="border-b px-3 sm:px-6 py-3 sm:py-4 bg-white">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-6 flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
              <span className="text-xs sm:text-sm font-medium">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="hidden sm:block min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || 'Deadpool'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'peterparker@marvel.com'}</p>
            </div>
          </div>

          <Select value={maxResults.toString()} onValueChange={(val) => onMaxResultsChange(parseInt(val))}>
            <SelectTrigger className="w-16 sm:w-20 text-xs sm:text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button onClick={onLogout} variant="ghost" size="sm" className="text-xs sm:text-sm px-2 sm:px-3">
            Logout
          </Button>
          <Button
            onClick={onClassify}
            disabled={isClassifying || !hasEmails}
            size="sm"
            className="text-xs sm:text-sm px-2 sm:px-3"
          >
            {isClassifying ? (
              <>
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                <span className="hidden sm:inline">Classifying...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              'Classify'
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
