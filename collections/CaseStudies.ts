import type { CollectionConfig } from 'payload';

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Brand logo SVG or image',
      }
    },
    {
      name: 'svgCode',
      type: 'textarea',
      required: false,
      admin: {
        description: 'Raw SVG code (used as fallback if no logo image is uploaded)',
      }
    },
    {
      name: 'body',
      type: 'textarea',
      admin: {
        description: 'Provide body text or quote.',
      }
    },
    {
      name: 'isQuote',
      type: 'checkbox',
      label: 'Format as Quote',
      defaultValue: false,
    },
    {
      name: 'linkUrl',
      type: 'text',
      required: true,
      defaultValue: '#',
    },
    {
      name: 'linkText',
      type: 'text',
      required: true,
      defaultValue: 'Read more',
    }
  ],
};
