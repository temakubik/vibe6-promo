import { notFound } from 'next/navigation'
import { GuideShell } from '@/components/site/GuideContent'
import { guideSections, type GuideSectionSlug } from '@/lib/knowledge-base'

export function generateStaticParams() {
  return guideSections.map((section) => ({ slug: section.slug }))
}

export default async function GuideSectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!guideSections.some((section) => section.slug === slug)) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-paper text-ink">
      <GuideShell currentSlug={slug as GuideSectionSlug} />
    </main>
  )
}
