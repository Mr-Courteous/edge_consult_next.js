'use client';

import dynamic from 'next/dynamic';
import { Post } from '@/types/post'; // Assuming you created this file as per our last conversation

const PostDetailClient = dynamic(() => import('./PostDetailClient'), { ssr: false });

interface PostDetailWrapperProps {
  post: Post | null; 
}

export default function PostDetailWrapper({ post }: PostDetailWrapperProps) {
  return <PostDetailClient post={post} />;
}