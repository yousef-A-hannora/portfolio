import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { ProjectForm } from '@/components/admin/ProjectForm';

export default function NewProjectPage() {
  return (
    <>
      <AdminPageHeader title="New project" />
      <ProjectForm project={null} />
    </>
  );
}
