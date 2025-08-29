import { Metadata } from 'next';
import PostDetailClient from './PostDetailClient';
import baseURL from '@/lib/config';
import DOMPurify from 'dompurify';

// Define a richer Post interface to match the fetched data
interface Post {
  _id: string;
  title: string;
  body: string;
  image_path?: string;
  tags?: string[];
  likeCount?: number;
  category?: string;
  author?: { username: string };
  createdAt: string;
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
    
    // Sanitize the body before using it in metadata
    const sanitizedBody = DOMPurify.sanitize(post.body);

    // Extract plain text from the sanitized HTML
    const plainTextDescription = sanitizedBody.replace(/<[^>]*>?/gm, '').substring(0, 160);

    return {
      title: post.title,
      description: plainTextDescription,
      openGraph: {
        title: post.title,
        description: plainTextDescription,
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

// PostDetailPage is now an async Server Component
const PostDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch the post data once on the server
  let post = null;
  try {
    const res = await fetch(`${baseURL}/posts/${id}`, { next: { revalidate: 3600 } }); // Add revalidation option
    if (res.ok) {
      post = await res.json();
    }
  } catch (error) {
    console.error("Error fetching post data in PostDetailPage:", error);
  }

  // Pass the fetched post data to the client component
  return <PostDetailClient post={post} />;
};

export default PostDetailPage;