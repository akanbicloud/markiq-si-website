import { defineField, defineType } from 'sanity';

export const quiz = defineType({
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Quiz Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
    }),
    defineField({
      name: 'lesson',
      title: 'Associated Lesson',
      type: 'reference',
      to: [{ type: 'lesson' }],
    }),
    defineField({
      name: 'passMark',
      title: 'Pass Mark Percentage',
      type: 'number',
      initialValue: 80,
      description: 'Strict 80% passing threshold required before proceeding',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'options',
              title: 'Options',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.min(2),
            }),
            defineField({
              name: 'correctAnswer',
              title: 'Correct Option Index (0-based)',
              type: 'number',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'explanation',
              title: 'Explanation / Reasoning',
              type: 'text',
              rows: 2,
            }),
          ],
        },
      ],
    }),
  ],
});
