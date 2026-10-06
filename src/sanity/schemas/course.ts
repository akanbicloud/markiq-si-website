import { defineField, defineType } from 'sanity';

export const course = defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Course Code ID',
      type: 'string',
      description: 'e.g. F1, T2, A1',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Course Title',
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
      name: 'track',
      title: 'Track',
      type: 'string',
      options: {
        list: [
          { title: 'Fundamentals', value: 'Fundamentals' },
          { title: 'Technicals', value: 'Technicals' },
          { title: 'Automation', value: 'Automation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lessonsCount',
      title: 'Number of Lessons',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'duration',
      title: 'Estimated Duration',
      type: 'string',
      description: 'e.g. 45 min, 1h 15m',
    }),
    defineField({
      name: 'level',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced'],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverArtType',
      title: 'Generative Cover Art Type',
      type: 'string',
      options: {
        list: [
          { title: 'Rate Bars (Fundamentals)', value: 'bars' },
          { title: 'Candlesticks (Technicals)', value: 'candlestick' },
          { title: 'Neural Nodes (Automation)', value: 'network' },
        ],
      },
    }),
  ],
});
