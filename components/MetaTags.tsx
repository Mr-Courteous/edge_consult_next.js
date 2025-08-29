// components/MetaTags.tsx
interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogUrl?: string;
  ogImage?: string;
}

const MetaTags = ({
  title = "Default Title",
  description = "Default description",
  keywords = [],
  ogUrl = window.location.origin,
  ogImage = "/default.jpg",
}: MetaTagsProps) => {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
};

export default MetaTags;
