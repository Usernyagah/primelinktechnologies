import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactApi } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Mail, Trash2, Inbox } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { Timestamp } from 'firebase/firestore';

function formatSubmittedAt(createdAt?: Timestamp | null) {
  if (!createdAt?.toDate) return '—';
  return format(createdAt.toDate(), 'MMM d, yyyy · h:mm a');
}

const AdminMessages = () => {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading, isError, error } = useQuery({
    queryKey: ['contactMessages'],
    queryFn: () => contactApi.list(),
  });

  const deleteMessage = useMutation({
    mutationFn: contactApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      toast.success('Message deleted');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <main className="container-px py-10">
      <div className="space-y-8">
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary/40 border border-border rounded-md text-sm font-medium w-fit">
          <Mail className="w-4 h-4" />
          Contact form submissions
        </div>

        {isLoading ? (
          <p className="text-center text-muted-foreground py-16">Loading messages...</p>
        ) : isError ? (
          <p className="text-center text-destructive py-16">
            {(error as Error).message || 'Failed to load messages'}
          </p>
        ) : messages.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface py-16 text-center">
            <Inbox className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">No messages yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Submissions from the site contact form will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <article
                key={msg.id}
                className="rounded-xl border border-border bg-surface p-6 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="grid sm:grid-cols-2 gap-4 flex-1">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Name
                      </p>
                      <p className="mt-1 font-semibold">{msg.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Email
                      </p>
                      <a
                        href={`mailto:${msg.email}`}
                        className="mt-1 block text-accent hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {formatSubmittedAt(msg.createdAt)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => deleteMessage.mutate(msg.id)}
                      disabled={deleteMessage.isPending}
                      aria-label="Delete message"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    How can we help?
                  </p>
                  <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminMessages;
