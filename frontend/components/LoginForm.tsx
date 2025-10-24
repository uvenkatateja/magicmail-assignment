import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail } from 'lucide-react';

interface LoginFormProps {
  openaiKey: string;
  isLoading: boolean;
  onKeyChange: (value: string) => void;
  onSaveKey: () => void;
  onGoogleLogin: () => void;
}

export default function LoginForm({
  openaiKey,
  isLoading,
  onKeyChange,
  onSaveKey,
  onGoogleLogin
}: LoginFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-3 sm:p-4 md:p-6">
      <Card className="w-full max-w-[95%] sm:max-w-md shadow-lg">
        <CardHeader className="text-center px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 bg-primary/10 rounded-full">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold">
            Email Classifier
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm mt-2">
            Classify your Gmail emails using GPT-4o via OpenRouter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-5 sm:pb-6">
          <div className="space-y-2">
            <label htmlFor="openai-key" className="text-xs sm:text-sm font-medium block">
              OpenRouter API Key
            </label>
            <Input
              id="openai-key"
              type="password"
              placeholder="sk-or-v1-..."
              value={openaiKey}
              onChange={(e) => onKeyChange(e.target.value)}
              className="text-sm sm:text-base h-9 sm:h-10"
            />
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
              Using GPT-4o model. Your key is stored locally in your browser.
            </p>
          </div>

          <Button
            onClick={onSaveKey}
            variant="outline"
            className="w-full text-sm sm:text-base h-9 sm:h-10"
          >
            Save API Key
          </Button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-[10px] sm:text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Then sign in
              </span>
            </div>
          </div>

          <Button
            onClick={onGoogleLogin}
            disabled={isLoading}
            className="w-full text-sm sm:text-base h-9 sm:h-10 font-medium"
          >
            {isLoading ? 'Redirecting...' : 'Sign in with Google'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
