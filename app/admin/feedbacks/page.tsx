import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import FeedbackManager from '@/components/dashboard/FeedbackManager';

export default function AdminFeedbacksPage() {
  return (
    <AdminPageShell
      title="Depoimentos"
      description="Gerencie recomendações e avaliações que aparecerão no portfólio."
    >
      <FeedbackManager />
    </AdminPageShell>
  );
}
