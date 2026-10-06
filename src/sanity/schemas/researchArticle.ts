import { defineField, defineType } from 'sanity';

export const researchArticle = defineType({
  name: 'researchArticle',
  title: 'Research Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Weekly Outlook', value: 'Weekly outlook' },
          { title: 'Event Breakdown', value: 'Event breakdown' },
          { title: 'Explainer', value: 'Explainer' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. 5 min, 8 min read',
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'sections',
      title: 'Article Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
            defineField({ name: 'content', title: 'Content', type: 'text', rows: 4 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'keyTakeaway',
      title: 'Institutional Takeaway',
      type: 'text',
      rows: 2,
    }),
  ],
});
