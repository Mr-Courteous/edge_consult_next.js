'use client';

import dynamic from 'next/dynamic';

const PostDetailClient = dynamic(() => import('./PostDetailClient'), { ssr: false });

interface PostDetailWrapperProps {
  post: any; 
}

export default function PostDetailWrapper({ post }: PostDetailWrapperProps) {
  return <PostDetailClient post={post} />;
}