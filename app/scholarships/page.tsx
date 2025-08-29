import { Metadata } from 'next';
import ScholarshipsClient from './ScholarshipsClient';
import baseURL from '@/lib/config';

// Define the interface for a scholarship post
interface ScholarshipPost {
  _id: string;
  title: string;
  body: string;
  image_path?: string;
  tags?: string[];
  scholarshipDetails?: {
    country?: string;
    degree?: string;
    funding?: string;
    deadline?: string;
    requirements?: string[];
  };
}

// Optional: Generate metadata dynamically on the server
export const metadata: Metadata = {
  title: 'Scholarship Opportunities',
  description: 'Discover life-changing scholarship opportunities worldwide, from undergraduate to PhD programs.',
};

const ScholarshipsPage = async () => {
  let scholarships = [];
  let error = null;

  try {
    const response = await fetch(`${baseURL}/scholarships`, {
      cache: 'no-store', // Ensures the data is always fresh
    });
    if (!response.ok) {
      throw new Error('Failed to fetch scholarship posts');
    }
    scholarships = await response.json();
  } catch (err) {
    console.error("Error fetching scholarships:", err);
    error = "Could not load scholarships. Please try again later.";
  }

  // Pass the fetched data to the client component
  return <ScholarshipsClient scholarships={scholarships} error={error} />;
};

export default ScholarshipsPage;