import { notFound } from 'next/navigation';
import Link from 'next/link';
import configPromise from '@/payload.config';
import { getPayload } from 'payload';

export default async function CaseStudyPage({ params }: { params: { id: string } }) {
  const payload = await getPayload({ config: configPromise });
  let caseStudy;
  try {
    caseStudy = await payload.findByID({
      collection: 'case-studies',
      id: params.id,
    });
  } catch {
    notFound();
  }

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="container py-24 max-w-4xl mx-auto min-h-[60vh]">
      <div className="mb-12" dangerouslySetInnerHTML={{ __html: caseStudy.svgCode || '' }} />
      <h1 className="text-4xl md:text-5xl font-bold mb-8">{caseStudy.title}</h1>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        {caseStudy.isQuote ? (
          <blockquote className="border-l-4 border-indigo-500 pl-6 italic text-2xl text-gray-600 my-8">
            {caseStudy.body}
          </blockquote>
        ) : (
          <p className="text-xl leading-relaxed whitespace-pre-wrap">{caseStudy.body}</p>
        )}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100">
        <Link href="/" className="text-indigo-600 font-medium hover:text-indigo-700 flex items-center gap-2">
          &larr; Back to homepage
        </Link>
      </div>
    </div>
  );
}
