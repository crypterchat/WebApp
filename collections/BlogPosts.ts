import type { CollectionConfig } from 'payload';

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbColor',
      type: 'select',
      required: true,
      options: [
        { label: 'Blue Gradient', value: 'bt-blue' },
        { label: 'Green Gradient', value: 'bt-green' },
        { label: 'Amber Gradient', value: 'bt-amber' },
      ],
      defaultValue: 'bt-blue',
    },
    {
      name: 'thumbIcon',
      type: 'text',
      required: true,
      admin: {
        description: 'Emoji or short text for the thumbnail',
      }
    },
    {
      name: 'content',
      type: 'richText',
    }
  ],
};
