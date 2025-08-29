import { Metadata } from 'next';
import PostDetailWrapper from './PostDetailWrapper';
import baseURL from '@/lib/config';

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
    commentCount?: number;
}

// Reusable function to fetch the post data
async function getPost(id: string): Promise<Post | null> {
    try {
        const res = await fetch(`${baseURL}/posts/${id}`, { next: { revalidate: 3600 } });
        if (res.ok) {
            return await res.json();
        }
        return null;
    } catch (error) {
        console.error("Error fetching post data:", error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = params;
    const post = await getPost(id);

    if (!post) {
        return {
            title: "Post Not Found",
            description: "This page does not exist."
        };
    }
    
    const plainTextDescription = post.body.replace(/<[^>]*>?/gm, '').substring(0, 160);

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
}

const PostDetailPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    // Next.js automatically caches this fetch call because it's the same URL and options as in generateMetadata
    const post = await getPost(id);

    return <PostDetailWrapper post={post} />;
};

export default PostDetailPage;