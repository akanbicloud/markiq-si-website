import { client } from './client';
import { SANITY_COURSES, SanityCourseDocument } from './coursesData';

const COURSES_QUERY = `*[_type == "course"] | order(id asc) {
  _id,
  _type,
  id,
  code,
  title,
  slug,
  track,
  level,
  description,
  lessonsCount,
  duration,
  coverArtType,
  recommended
}`;

export async function getCourses(): Promise<SanityCourseDocument[]> {
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      const sanityData = await client.fetch<SanityCourseDocument[]>(COURSES_QUERY);
      if (Array.isArray(sanityData) && sanityData.length > 0) {
        return sanityData;
      }
    }
  } catch (err: any) {
    console.warn('[Sanity Fetch Warning]: Falling back to local course documents:', err.message);
  }
  return SANITY_COURSES;
}

export async function getCourseByCode(code: string): Promise<SanityCourseDocument | null> {
  const all = await getCourses();
  return all.find((c) => c.code.toLowerCase() === code.toLowerCase() || c.id.toLowerCase() === code.toLowerCase()) || null;
}
