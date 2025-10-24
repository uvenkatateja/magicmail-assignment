import { Badge } from '@/components/ui/badge';

interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  category?: string;
}

interface EmailDetailProps {
  selectedEmail: Email | null;
  categoryColors: Record<string, string>;
}

export default function EmailDetail({ selectedEmail, categoryColors }: EmailDetailProps) {
  if (!selectedEmail) {
    return (
      <div className="w-full md:w-1/2 bg-gray-50 overflow-y-auto">
        <div className="h-full flex items-center justify-center text-gray-400 p-4">
          <p className="text-sm sm:text-base text-center">Select an email to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 bg-gray-50 overflow-y-auto">
      <div className="p-3 sm:p-6">
        <div className="bg-white rounded-lg border p-4 sm:p-6">
          <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
            <div className="flex-1 min-w-0">
              <h2 className="text-base sm:text-lg font-semibold mb-1 truncate">
                {selectedEmail.from.split('<')[0].trim() || selectedEmail.from}
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 truncate">
                {selectedEmail.from.match(/<(.+)>/)?.[1] || selectedEmail.from}
              </p>
            </div>
            {selectedEmail.category && (
              <Badge
                variant="outline"
                className={`text-[10px] sm:text-xs shrink-0 ${categoryColors[selectedEmail.category]}`}
              >
                {selectedEmail.category}
              </Badge>
            )}
          </div>

          <div className="border-t pt-3 sm:pt-4">
            <p className="text-xs sm:text-sm font-medium mb-2">{selectedEmail.subject}</p>
            <p className="text-xs sm:text-sm text-gray-700 whitespace-pre-wrap">
              {selectedEmail.snippet}
            </p>
          </div>

          <div className="border-t mt-3 sm:mt-4 pt-3 sm:pt-4">
            <p className="text-[10px] sm:text-xs text-gray-500">{selectedEmail.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
