import { AdminPageShell } from '@/components/dashboard/AdminPageShell';
import MediaManager from '@/components/dashboard/MediaManager';

export default function AdminUploadsPage() {
  return (
    <AdminPageShell
      title="Mídia"
      description="Gerencie uploads de imagens, banners, PDFs e outros ativos visuais."
    >
      <MediaManager />
    </AdminPageShell>
  );
}
