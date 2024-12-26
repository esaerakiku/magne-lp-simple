import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import AnimatedBackground from './animated-background';

const GOOGLE_FORM_URL = 'YOUR_GOOGLE_FORM_URL';

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('entry.YOUR_FORM_ID', email);

      const response = await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors',
      });

      setEmail('');
      toast({
        title: "You're on the list! 🎉",
        description: "Thanks for joining. We'll keep you updated on our progress.",
      });
    } catch (error) {
      toast({
        title: 'Something went wrong',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <AnimatedBackground />
      
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-[#84CCB3]/20 shadow-xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-[#84CCB3]/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-[#324D43]" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-[#324D43] mb-3 text-center">
            Join Magne Waitlist
          </h1>
          
          <p className="text-center text-[#324D43]/70 mb-8">
            Be among the first to experience our revolutionary platform
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 bg-white/20 border-[#84CCB3]/30 
                          text-[#324D43] placeholder-[#324D43]/50 backdrop-blur-sm
                          focus:border-[#84CCB3] focus:ring-[#84CCB3]/20
                          transition-all duration-300"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#84CCB3] hover:bg-[#324D43] text-white 
                       transition-colors duration-300 py-6"
            >
              {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
            </Button>
          </form>

          <p className="mt-8 text-center text-[#3C3C43]/70 text-sm px-4">
            By joining, you'll receive updates about our launch and early access opportunities
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WaitlistForm;