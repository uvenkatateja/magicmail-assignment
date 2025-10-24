'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from '@/components/DashboardHeader';
import EmailList from '@/components/EmailList';
import EmailDetail from '@/components/EmailDetail';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Email {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet: string;
  category?: string;
}

const categoryColors: Record<string, string> = {
  Important: 'text-green-600 bg-green-50 border-green-200',
  Promotional: 'text-purple-600 bg-purple-50 border-purple-200',
  Social: 'text-blue-600 bg-blue-50 border-blue-200',
  Marketing: 'text-orange-600 bg-orange-50 border-orange-200',
  Spam: 'text-red-600 bg-red-50 border-red-200',
  General: 'text-gray-600 bg-gray-50 border-gray-200',
};

export default function Dashboard() {
  const router = useRouter();
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);
  const [maxResults, setMaxResults] = useState(15);
  const [user, setUser] = useState<any>(null);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    const openaiKey = localStorage.getItem('openai_key');
    const userData = localStorage.getItem('user');

    if (!accessToken || !openaiKey) {
      router.push('/');
      return;
    }

    if (userData) {
      try {
        setUser(JSON.parse(decodeURIComponent(userData)));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }

    fetchEmails();
  }, [router]);

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken && user) {
      fetchEmails();
    }
  }, [maxResults]);

  const fetchEmails = async () => {
    setIsLoading(true);
    const accessToken = localStorage.getItem('access_token');

    try {
      const response = await fetch(`${API_URL}/api/emails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accessToken,
          maxResults,
        }),
      });

      const data = await response.json();

      if (data.emails) {
        setEmails(data.emails);
        await classifyEmails(data.emails);
      }
    } catch (error) {
      console.error('Error fetching emails:', error);
      alert('Failed to fetch emails');
    } finally {
      setIsLoading(false);
    }
  };

  const classifyEmails = async (emailsToClassify: Email[]) => {
    setIsClassifying(true);
    const openaiKey = localStorage.getItem('openai_key');

    try {
      const response = await fetch(`${API_URL}/api/classify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emails: emailsToClassify,
          openaiApiKey: openaiKey,
        }),
      });

      const data = await response.json();

      if (data.classifications) {
        const classifiedEmails = emailsToClassify.map((email, idx) => ({
          ...email,
          category: data.classifications[idx]?.category || 'General',
        }));
        setEmails(classifiedEmails);
        localStorage.setItem('classified_emails', JSON.stringify(classifiedEmails));
      }
    } catch (error) {
      console.error('Error classifying emails:', error);
      alert('Failed to classify emails');
    } finally {
      setIsClassifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    localStorage.removeItem('classified_emails');
    router.push('/');
  };

  const handleClassify = async () => {
    if (emails.length === 0) {
      alert('Please fetch emails first');
      return;
    }
    await classifyEmails(emails);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <DashboardHeader
        user={user}
        maxResults={maxResults}
        onMaxResultsChange={setMaxResults}
        onLogout={handleLogout}
        onClassify={handleClassify}
        isClassifying={isClassifying}
        hasEmails={emails.length > 0}
      />

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <EmailList
          emails={emails}
          isLoading={isLoading}
          selectedEmail={selectedEmail}
          onSelectEmail={setSelectedEmail}
          categoryColors={categoryColors}
        />
        <EmailDetail
          selectedEmail={selectedEmail}
          categoryColors={categoryColors}
        />
      </div>
    </div>
  );
}
