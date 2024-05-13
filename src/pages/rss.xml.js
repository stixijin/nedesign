import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection("posts");
  return rss({
    title: 'Ученик Astro | Блог',
    description: 'Мое путешествие по изучению Astro',
    site: 'http://nedesigner.ru/',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>ru-ru</language>`,
  });
}