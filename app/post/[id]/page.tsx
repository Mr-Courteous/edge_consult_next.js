import { Metadata } from 'next';
import PostDetailClient from './PostDetailClient';
import baseURL from '@/lib/config';

interface Post {
  title: string;
  body: string;
  image_path?: string;
  tags?: string[];
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = params;

  try {
    const res = await fetch(`${baseURL}/posts/${id}`);
    if (!res.ok) {
      return {
        title: "Post Not Found",
        description: "This page does not exist."
      };
    }
    const post: Post = await res.json();

    return {
      title: post.title,
      description: post.body.substring(0, 160),
      openGraph: {
        title: post.title,
        description: post.body.substring(0, 160),
        images: [
          {
            url: post.image_path || '/default-post-image.jpg',
            alt: post.title,
          },
        ],
        url: `${baseURL}/posts/${id}`,
        type: 'article',
      },
      keywords: post.tags?.join(', ') || 'blog, post, article',
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Post Not Found",
      description: "An error occurred while loading this page."
    };
  }
}

const PostDetailPage = () => {
  return <PostDetailClient />;
};

export default PostDetailPage;