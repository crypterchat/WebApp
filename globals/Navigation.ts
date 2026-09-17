import type { GlobalConfig } from 'payload';

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'links',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'isExternal',
          type: 'checkbox',
          defaultValue: false,
        }
      ]
    },
    {
      name: 'githubUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://github.com/pgpjs',
    },
    {
      name: 'npmUrl',
      type: 'text',
      required: true,
      defaultValue: 'https://www.npmjs.com/package/openpgp',
    }
  ],
};
