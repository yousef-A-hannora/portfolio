'use client';

import { useState, useTransition } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { Icon } from '@/components/ui/Icon';
import type { ActionResult, FieldErrors } from '@/lib/action-result';
import { ConfirmDeleteButton } from './ConfirmDeleteButton';
import { ReorderButtons } from './ReorderButtons';
import { Field } from './form/Field';
import { FormMessage } from './form/FormMessage';
import { IconPicker } from './form/IconPicker';
import { cardClass, inputClass, primaryButtonClass, secondaryButtonClass } from './form/styles';

export type CrudFieldDef = {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'icon';
  placeholder?: string;
  maxLength?: number;
  fullWidth?: boolean;
};

type CrudItem = { id: string } & Record<string, string | number>;

type CrudListProps = {
  entityName: string;
  items: CrudItem[];
  fields: CrudFieldDef[];
  titleField: string;
  subtitleField?: string;
  metaField?: string;
  iconField?: string;
  createAction: (input: Record<string, string>) => Promise<ActionResult>;
  updateAction: (id: string, input: Record<string, string>) => Promise<ActionResult>;
  deleteAction: (id: string) => Promise<ActionResult>;
  moveAction: (id: string, direction: 'up' | 'down') => Promise<ActionResult>;
};

function emptyValues(fields: CrudFieldDef[]) {
  return Object.fromEntries(fields.map((field) => [field.name, '']));
}

function valuesFromItem(fields: CrudFieldDef[], item: CrudItem) {
  return Object.fromEntries(fields.map((field) => [field.name, String(item[field.name] ?? '')]));
}

export function CrudList(props: CrudListProps) {
  const { entityName, items, titleField, subtitleField, metaField, iconField, deleteAction, moveAction } = props;
  const [editingId, setEditingId] = useState<string | 'new' | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function runListAction(action: () => Promise<ActionResult>) {
    setListError(null);
    startTransition(async () => {
      try {
        const result = await action();
        if (!result.ok) setListError(result.error);
      } catch {
        setListError('Something went wrong. Please try again.');
      }
    });
  }

  return (
    <div className="space-y-4">
      <FormMessage type="error" message={listError} />

      {editingId === 'new' ? (
        <ItemForm {...props} mode="create" onDone={() => setEditingId(null)} />
      ) : (
        <button type="button" className={primaryButtonClass} onClick={() => setEditingId('new')}>
          <Plus size={16} /> Add {entityName}
        </button>
      )}

      {items.length === 0 && editingId !== 'new' && (
        <div className={`${cardClass} p-10 text-center text-sm text-gray-500`}>No {entityName.toLowerCase()} items yet.</div>
      )}

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={item.id}>
            {editingId === item.id ? (
              <ItemForm {...props} mode="edit" item={item} onDone={() => setEditingId(null)} />
            ) : (
              <div className={`${cardClass} p-4 flex items-center gap-4`}>
                <ReorderButtons
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                  disabled={isPending}
                  onMove={(direction) => runListAction(() => moveAction(item.id, direction))}
                />
                {iconField && (
                  <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                    <Icon name={String(item[iconField])} size={22} />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{item[titleField]}</p>
                  {subtitleField && <p className="text-xs text-orange-500 font-medium truncate">{item[subtitleField]}</p>}
                  {metaField && <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{item[metaField]}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setEditingId(item.id)}
                    disabled={isPending}
                    className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-xs font-semibold text-gray-500 hover:bg-orange-50 hover:text-orange-500 transition-colors"
                  >
                    <Pencil size={14} /> <span className="sr-only sm:not-sr-only">Edit</span>
                  </button>
                  <ConfirmDeleteButton disabled={isPending} onConfirm={() => runListAction(() => deleteAction(item.id))} />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type ItemFormProps = CrudListProps & {
  mode: 'create' | 'edit';
  item?: CrudItem;
  onDone: () => void;
};

function ItemForm({ entityName, fields, mode, item, onDone, createAction, updateAction }: ItemFormProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    item ? valuesFromItem(fields, item) : emptyValues(fields),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setErrors({});
    setFormError(null);
    startTransition(async () => {
      try {
        const result = mode === 'create' ? await createAction(values) : await updateAction(item!.id, values);
        if (result.ok) {
          onDone();
        } else {
          setFormError(result.error);
          setErrors(result.fieldErrors ?? {});
        }
      } catch {
        setFormError('Something went wrong. Please try again.');
      }
    });
  }

  const formId = item?.id ?? 'new';

  return (
    <form onSubmit={handleSubmit} className={`${cardClass} p-5 space-y-4 border-orange-200`}>
      <p className="text-sm font-bold text-gray-900">{mode === 'create' ? `New ${entityName}` : `Edit ${entityName}`}</p>
      <FormMessage type="error" message={formError} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((field) => {
          const id = `${formId}-${field.name}`;
          const fieldErrors = errors[field.name];
          return (
            <Field
              key={field.name}
              label={field.label}
              htmlFor={id}
              error={fieldErrors}
              className={field.fullWidth || field.type === 'textarea' ? 'md:col-span-2' : undefined}
            >
              {field.type === 'icon' ? (
                <IconPicker
                  id={id}
                  value={values[field.name]}
                  onChange={(icon) => setValues((current) => ({ ...current, [field.name]: icon }))}
                  invalid={!!fieldErrors}
                />
              ) : field.type === 'textarea' ? (
                <textarea
                  id={id}
                  rows={3}
                  value={values[field.name]}
                  maxLength={field.maxLength}
                  placeholder={field.placeholder}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className={inputClass}
                />
              ) : (
                <input
                  id={id}
                  type="text"
                  value={values[field.name]}
                  maxLength={field.maxLength}
                  placeholder={field.placeholder}
                  onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                  className={inputClass}
                />
              )}
            </Field>
          );
        })}
      </div>
      <div className="flex items-center gap-3 pt-1">
        <button type="submit" className={primaryButtonClass} disabled={isPending}>
          {isPending ? 'Saving…' : mode === 'create' ? `Add ${entityName}` : 'Save changes'}
        </button>
        <button type="button" className={secondaryButtonClass} onClick={onDone} disabled={isPending}>
          Cancel
        </button>
      </div>
    </form>
  );
}
