import matter from 'gray-matter';
import type { PostCardProps } from './components/PostCard';
import type { ContentModule } from './types';

export type PostFrontMatter = {
	title: string;
	slug: string;
	description: string;
	tags: string[];
	imgSrc: string;
	updatedAt: string;
	createdAt: string;
	readingTime: number;
	filename: string;
};

const postsFiles = import.meta.glob<ContentModule>(`/src/content/*.{md,svx}`, {
	eager: true,
	query: '?raw'
});

export const getPosts = async () => {
	const posts: PostFrontMatter[] = [];

	for (const [filepath, module] of Object.entries(postsFiles)) {
		const { data, content } = matter(module.default as string);

		posts.push({
			...(data as Partial<PostFrontMatter>),
			readingTime: Math.ceil(content.split(' ').length / 200),
			filename: filepath.split('/').pop()
		} as PostFrontMatter);
	}

	posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
	return posts;
};

export const getPostCardData = async (): Promise<PostCardProps[]> => {
	return (await getPosts()).map((p) => {
		return {
			slug: p.slug,
			postTitle: p.title,
			shortDescription: p.description,
			tags: p.tags,
			imgSrc: p.imgSrc
		};
	});
};
