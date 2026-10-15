import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import TimelineManager from '@/components/dashboard/TimelineManager';

export default function AdminEducationPage() {
  return (
    <AdminPageShell
      title="Educação"
      description="Gerencie sua formação acadêmica e cursos relevantes para o portfólio."
    >
      <TimelineManager category="education" />
    </AdminPageShell>
  );
}
