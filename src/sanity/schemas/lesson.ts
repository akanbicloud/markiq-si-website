import { defineField, defineType } from 'sanity';

export const lesson = defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
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
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: [{ type: 'course' }],
    }),
    defineField({
      name: 'lessonNumber',
      title: 'Lesson Number',
      type: 'number',
    }),
    defineField({
      name: 'duration',
      title: 'Reading / Watch Duration',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video Embed URL (Optional)',
      type: 'url',
      description: 'Official educational video or central bank stream embed',
    }),
    defineField({
      name: 'content',
      title: 'Lesson Content (Rich Text)',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    }),
    defineField({
      name: 'reflectionPrompt',
      title: 'Active Recall Reflection Prompt',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key Takeaways',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
