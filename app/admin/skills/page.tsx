import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import SkillManager from '@/components/dashboard/SkillManager';

export default function AdminSkillsPage() {
  return (
    <AdminPageShell
      title="Skills"
      description="Adicione e gerencie habilidades que aparecem no portfólio."
    >
      <SkillManager />
    </AdminPageShell>
  );
}
