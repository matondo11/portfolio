import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import ProjectManager from '@/components/dashboard/ProjectManager';

export default function AdminProjectsPage() {
  return (
    <AdminPageShell
      title="Projetos"
      description="Gerencie os projetos do portfólio, adicione detalhes do case, categorias e status."
    >
      <ProjectManager />
    </AdminPageShell>
  );
}
