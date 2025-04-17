import { StructuredDataSupportedPath } from '~/types/typedef';

const baseUrl = 'https://lgutimetable.vercel.app';

const breadcrumbsMap: Record<StructuredDataSupportedPath, { name: string; url: string }[]> = {
  '/': [{ name: 'Home', url: `${baseUrl}/` }],
  '/developer': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Developer', url: `${baseUrl}/developer` }
  ],
  '/contribute': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Contribute', url: `${baseUrl}/contribute` }
  ],
  '/profile': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Profile', url: `${baseUrl}/profile` }
  ],
  '/timetable': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Timetable', url: `${baseUrl}/timetable` }
  ],
  '/discussions': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Discussions', url: `${baseUrl}/discussions` }
  ],
  '/freeclassrooms': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Free Classrooms', url: `${baseUrl}/freeclassrooms` }
  ],
  '/admin': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Admin', url: `${baseUrl}/admin` }
  ],
  '/timetable/teachers': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Teacher Timetable', url: `${baseUrl}/timetable/teachers` }
  ],
  '/timetable/rooms': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Room Timetable', url: `${baseUrl}/timetable/rooms` }
  ],
  '/util/timetable_clashresolver': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Clash Resolver', url: `${baseUrl}/util/timetable_clashresolver` }
  ],
  '/room-activities': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Room Activities', url: `${baseUrl}/room-activities` }
  ],
  '/pastpaper': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Past Papers', url: `${baseUrl}/pastpaper` }
  ],
  '/blogs': [
    { name: 'Home', url: `${baseUrl}/` },
    { name: 'Blogs', url: `${baseUrl}/blogs` }
  ]
};

export type AdditionalBreadCrumbCBType = ((baseUrl: string) => { name: string; url: string })[];

export function getBreadcrumbJsonLd(
  pathname: StructuredDataSupportedPath,
  ...additionalBreadCrumbCBs: AdditionalBreadCrumbCBType
) {
  const items = breadcrumbsMap[pathname];
  if (!items) return null;

  const merged = [...breadcrumbsMap[pathname], ...additionalBreadCrumbCBs.map((cb) => cb(baseUrl))];

  switch (pathname) {
    case '/':
      return JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: merged.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url
          }))
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Zain ul din',
          jobTitle: 'Software Developer',
          url: 'https://github.com/Zain-ul-din',
          sameAs: ['https://github.com/Zain-ul-din/LGU-Timetable']
        }
      ]);
    default:
      return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: merged.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url
        }))
      });
  }
}
