import { useGetAllSubmissions } from '../../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Mail, User, Calendar } from 'lucide-react';

export default function SubmissionsView() {
  const { data: submissions, isLoading } = useGetAllSubmissions();

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading submissions...</p>
      </div>
    );
  }

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-900">Contact Form Submissions</h2>

      {submissions && submissions.length > 0 ? (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <Card key={submission.id.toString()} className="border-amber-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg text-amber-900 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Submission #{submission.id.toString()}
                  </CardTitle>
                  <Badge variant="outline" className="border-amber-300 text-amber-700">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(submission.timestamp)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-amber-600" />
                  <span className="font-medium">Name:</span>
                  <span className="text-muted-foreground">{submission.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span className="font-medium">Email:</span>
                  <a
                    href={`mailto:${submission.email}`}
                    className="text-amber-700 hover:text-amber-900 transition-colors"
                  >
                    {submission.email}
                  </a>
                </div>
                <div className="pt-2 border-t border-amber-100">
                  <p className="text-sm font-medium text-amber-900 mb-1">Message:</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {submission.message}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-amber-200">
          <CardContent className="py-16 text-center">
            <MessageSquare className="w-16 h-16 text-amber-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-amber-900 mb-2">No Submissions Yet</h3>
            <p className="text-muted-foreground">
              Contact form submissions will appear here when customers reach out
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
