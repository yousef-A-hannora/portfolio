import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { CrudList } from '@/components/admin/CrudList';
import { createService, deleteService, moveService, updateService } from '@/actions/services';
import { getServices } from '@/lib/queries';

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <>
      <AdminPageHeader title="Services" description="Services shown on the homepage. Use the arrows to change the order." />
      <CrudList
        entityName="Service"
        items={services.map(({ id, title, description, icon }) => ({ id, title, description, icon }))}
        fields={[
          { name: 'title', label: 'Title', type: 'text', maxLength: 80, placeholder: 'Full Stack Development' },
          { name: 'icon', label: 'Icon', type: 'icon' },
          { name: 'description', label: 'Description', type: 'textarea', maxLength: 300 },
        ]}
        titleField="title"
        metaField="description"
        iconField="icon"
        createAction={createService}
        updateAction={updateService}
        deleteAction={deleteService}
        moveAction={moveService}
      />
    </>
  );
}
