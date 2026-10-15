import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import TimelineManager from '@/components/dashboard/TimelineManager';

export default function AdminExperiencePage() {
  return (
    <AdminPageShell
      title="Experiência"
      description="Adicione, edite e organize experiências profissionais com datas, cargos e descrições."
    >
      <TimelineManager category="experience" />
    </AdminPageShell>
  );
}
