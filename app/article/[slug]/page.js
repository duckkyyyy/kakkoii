import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticleSlugs } from '../../../lib/articles';
import ArticlePageClient from './ArticlePageClient';

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return { title: 'Статья не найдена | KAKKOII' };
  }
  const description =
    article.description ||
    (typeof article.introduction === 'string' ? article.introduction.slice(0, 155) : undefined);
  return {
    title: `${article.title} | KAKKOII`,
    description,
    openGraph: {
      title: article.title,
      description,
      ...(article.cover && { images: [{ url: article.cover }] }),
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  return <ArticlePageClient key={slug} article={article} />;
}
