import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle } from "lucide-react";

const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to Supabase to store email
    console.log("Newsletter signup:", email);
    setIsSubmitted(true);
    setEmail("");
  };

  return (
    <Card className="border-0 bg-gradient-secondary shadow-lg">
      <CardHeader className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <CardTitle className="font-display text-2xl">Stay Updated</CardTitle>
        <p className="text-muted-foreground">
          Get notified about new scholarship opportunities and educational resources
        </p>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="text-center py-4">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-green-600 font-medium">Successfully subscribed!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Check your email for confirmation
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-primary/20 focus:border-primary"
            />
            <Button type="submit" className="w-full">
              Subscribe to Newsletter
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsletterSignup;