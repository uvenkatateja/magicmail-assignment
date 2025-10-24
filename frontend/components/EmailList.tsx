import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  category?: string;
}

interface EmailListProps {
  emails: Email[];
  isLoading: boolean;
  selectedEmail: Email | null;
  onSelectEmail: (email: Email) => void;
  categoryColors: Record<string, string>;
}

export default function EmailList({
  emails,
  isLoading,
  selectedEmail,
  onSelectEmail,
  categoryColors
}: EmailListProps) {
  return (
    <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r overflow-y-auto max-h-[50vh] md:max-h-none">
      <div className="p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-3">
          {isLoading && (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 sm:mb-4 animate-spin" />
              <p className="text-sm sm:text-base">Loading your emails...</p>
            </div>
          )}

          {emails.length === 0 && !isLoading && (
            <div className="text-center py-8 sm:py-12 text-gray-500">
              <p className="text-sm sm:text-base">No emails found.</p>
            </div>
          )}

          {emails.map((email) => (
            <Card
              key={email.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedEmail?.id === email.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => onSelectEmail(email)}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2 mb-1 sm:mb-2">
                  <p className="font-medium text-xs sm:text-sm truncate flex-1">
                    {email.from.split('<')[0].trim() || email.from}
                  </p>
                  {email.category && (
                    <Badge
                      variant="outline"
                      className={`text-[10px] sm:text-xs shrink-0 ${categoryColors[email.category]}`}
                    >
                      {email.category}
                    </Badge>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-900 truncate mb-1">
                  {email.subject}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 line-clamp-2">
                  {email.snippet}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
