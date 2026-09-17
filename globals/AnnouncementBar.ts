import type { GlobalConfig } from 'payload';

export const AnnouncementBar: GlobalConfig = {
  slug: 'announcement-bar',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Text and links to display in the top blue announcement bar.',
      }
    }
  ],
};
