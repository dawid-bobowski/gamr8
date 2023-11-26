export const titleToSlug = (title: string): string => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
