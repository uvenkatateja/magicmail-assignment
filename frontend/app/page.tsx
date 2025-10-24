'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openaiKey, setOpenaiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const user = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      alert('Authentication failed. Please try again.');
      return;
    }

    if (accessToken && user) {
      localStorage.setItem('access_token', accessToken);
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }
      localStorage.setItem('user', user);

      const savedKey = localStorage.getItem('openai_key');
      if (savedKey) {
        router.push('/dashboard');
      }
    }

    const savedKey = localStorage.getItem('openai_key');
    if (savedKey) {
      setOpenaiKey(savedKey);
    }
  }, [searchParams, router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/auth/google`);
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Error initiating Google login:', error);
      alert('Failed to initiate login');
      setIsLoading(false);
    }
  };

  const handleSaveKey = () => {
    if (!openaiKey.trim()) {
      alert('Please enter your OpenRouter API key');
      return;
    }
    localStorage.setItem('openai_key', openaiKey);

    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      router.push('/dashboard');
    } else {
      alert('API key saved! Now please log in with Google.');
    }
  };

  return (
    <LoginForm
      openaiKey={openaiKey}
      isLoading={isLoading}
      onKeyChange={setOpenaiKey}
      onSaveKey={handleSaveKey}
      onGoogleLogin={handleGoogleLogin}
    />
  );
}
