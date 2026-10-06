import { defineField, defineType } from 'sanity';

export const glossaryTerm = defineType({
  name: 'glossaryTerm',
  title: 'Glossary Term',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'term', maxLength: 96 },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Macro', 'Technical', 'Central Banks', 'Automation', 'Risk'],
      },
    }),
    defineField({
      name: 'definition',
      title: 'Plain-English Definition',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'example',
      title: 'Practical Market Example',
      type: 'text',
      rows: 2,
    }),
  ],
});
