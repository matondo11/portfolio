import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import ServiceManager from '@/components/dashboard/ServiceManager';

export default function AdminServicesPage() {
  return (
    <AdminPageShell
      title="Services"
      description="Gerencie os serviços exibidos no site e atualize os detalhes de cada oferta."
    >
      <ServiceManager />
    </AdminPageShell>
  );
}
