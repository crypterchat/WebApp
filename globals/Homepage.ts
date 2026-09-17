import type { GlobalConfig } from 'payload';

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      fields: [
        { name: 'eyebrow', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'linkText', type: 'text', required: true },
        { name: 'linkUrl', type: 'text', required: true },
        {
          name: 'visualType',
          type: 'select',
          options: [
            { label: 'Key & Lock Illustration (Slide 1)', value: 'illustration_1' },
            { label: 'Code Block Illustration (Slide 2)', value: 'illustration_2' },
            { label: 'ProtonMail Illustration (Slide 3)', value: 'illustration_3' },
          ],
          required: true,
          defaultValue: 'illustration_1',
        }
      ]
    },
    {
      name: 'stats',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      fields: [
        { name: 'number', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ]
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'primaryBtnText', type: 'text', required: true },
        { name: 'primaryBtnUrl', type: 'text', required: true },
        { name: 'secondaryBtnText', type: 'text', required: true },
        { name: 'secondaryBtnUrl', type: 'text', required: true },
      ]
    },
    {
      name: 'codeSnippet',
      type: 'group',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
        { name: 'primaryBtnText', type: 'text', required: true },
        { name: 'primaryBtnUrl', type: 'text', required: true },
        { name: 'secondaryBtnText', type: 'text', required: true },
        { name: 'secondaryBtnUrl', type: 'text', required: true },
        { name: 'codeTitle', type: 'text', required: true },
        { name: 'code', type: 'textarea', required: true, admin: { description: 'Raw code snippet to display (highlighting applied on frontend)' } },
      ]
    }
  ],
};
