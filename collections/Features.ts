import type { CollectionConfig } from 'payload';

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'body',
      type: 'textarea',
      required: true,
    },
    {
      name: 'iconColor',
      type: 'select',
      required: true,
      options: [
        { label: 'Blue', value: 'fi-blue' },
        { label: 'Green', value: 'fi-green' },
        { label: 'Red', value: 'fi-red' },
        { label: 'Amber', value: 'fi-amber' },
      ],
      defaultValue: 'fi-blue',
    },
    {
      name: 'iconSvg',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Raw SVG code for the icon',
      }
    }
  ],
};
