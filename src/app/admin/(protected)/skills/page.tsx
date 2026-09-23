import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CrudList } from '@/components/admin/CrudList';
import { createSkill, deleteSkill, moveSkill, updateSkill } from '@/actions/skills';
import { getSkills } from '@/lib/queries';

export default async function AdminSkillsPage() {
  const skills = await getSkills();

  return (
    <>
      <AdminPageHeader title="Skills & Technologies" description="Skills shown on the homepage. Use the arrows to change the order." />
      <CrudList
        entityName="Skill"
        items={skills.map(({ id, name, icon }) => ({ id, name, icon }))}
        fields={[
          { name: 'name', label: 'Name', type: 'text', maxLength: 60, placeholder: 'TypeScript' },
          { name: 'icon', label: 'Icon', type: 'icon' },
        ]}
        titleField="name"
        iconField="icon"
        createAction={createSkill}
        updateAction={updateSkill}
        deleteAction={deleteSkill}
        moveAction={moveSkill}
      />
    </>
  );
}
