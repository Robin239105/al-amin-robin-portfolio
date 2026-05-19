import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface SEOProps {
  title: string
  description: string
  keywords?: string
  schemaType?: 'Person' | 'WebSite' | 'ProfilePage' | 'CollectionPage' | 'ContactPage'
  schemaData?: Record<string, unknown>
}

export default function SEO({ title, description, keywords, schemaType = 'WebSite', schemaData }: SEOProps) {
  const location = useLocation()
  const canonicalUrl = `https://alaminrobin.com${location.pathname}`

  useEffect(() => {
    // 1. Update document title
    document.title = `${title} | Al Amin Robin`

    // Helper to set/create meta tags
    const updateMetaTag = (attribute: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, attributeValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Primary Meta Tags
    updateMetaTag('name', 'description', description)
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords)
    }

    // 3. Open Graph Meta Tags
    updateMetaTag('property', 'og:title', `${title} | Al Amin Robin`)
    updateMetaTag('property', 'og:description', description)
    updateMetaTag('property', 'og:url', canonicalUrl)
    updateMetaTag('property', 'og:type', 'website')

    // 4. Twitter Card Meta Tags
    updateMetaTag('name', 'twitter:title', `${title} | Al Amin Robin`)
    updateMetaTag('name', 'twitter:description', description)
    updateMetaTag('name', 'twitter:url', canonicalUrl)

    // 5. Update Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', canonicalUrl)

    // 6. Inject Schema Markup (JSON-LD)
    const existingSchemaScript = document.getElementById('json-ld-schema')
    if (existingSchemaScript) {
      existingSchemaScript.remove()
    }

    const defaultSchema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      'name': `${title} | Al Amin Robin`,
      'description': description,
      'url': canonicalUrl,
    }

    const finalSchema = {
      ...defaultSchema,
      ...schemaData,
    }

    const script = document.createElement('script')
    script.id = 'json-ld-schema'
    script.type = 'application/ld+json'
    script.innerHTML = JSON.stringify(finalSchema)
    document.head.appendChild(script)

    return () => {
      // Clean up dynamic schema script on unmount
      const scriptToRemove = document.getElementById('json-ld-schema')
      if (scriptToRemove) {
        scriptToRemove.remove()
      }
    }
  }, [title, description, keywords, canonicalUrl, schemaType, schemaData])

  return null
}
