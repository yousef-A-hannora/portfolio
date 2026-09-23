import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CrudList } from '@/components/admin/CrudList';
import { createExperience, deleteExperience, moveExperience, updateExperience } from '@/actions/experience';
import { getExperiences } from '@/lib/queries';

export default async function AdminExperiencePage() {
  const experiences = await getExperiences();

  return (
    <>
      <AdminPageHeader title="Experience" description="Timeline entries shown on the homepage. Use the arrows to change the order." />
      <CrudList
        entityName="Experience"
        items={experiences.map(({ id, role, company, period, description }) => ({ id, role, company, period, description }))}
        fields={[
          { name: 'role', label: 'Role', type: 'text', maxLength: 80, placeholder: 'Web Developer' },
          { name: 'company', label: 'Company', type: 'text', maxLength: 80, placeholder: 'Freelance / Independent' },
          { name: 'period', label: 'Period', type: 'text', maxLength: 40, placeholder: '2024 - Present' },
          { name: 'description', label: 'Description', type: 'textarea', maxLength: 500 },
        ]}
        titleField="role"
        subtitleField="company"
        metaField="period"
        createAction={createExperience}
        updateAction={updateExperience}
        deleteAction={deleteExperience}
        moveAction={moveExperience}
      />
    </>
  );
}
