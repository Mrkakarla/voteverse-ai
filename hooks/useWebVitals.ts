import { useEffect } from 'react'

/**
 * Hook to monitor and report Web Vitals metrics
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay) / INP (Interaction to Next Paint)
 * - CLS (Cumulative Layout Shift)
 */
export function useWebVitals() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reportMetric = (metric: any) => {
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
        })
      }

      // Send to analytics service in production
      if (process.env.NODE_ENV === 'production') {
        // Example: Send to your analytics service
        // fetch('/api/analytics/vitals', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(metric),
        // })
      }
    }

    // Use dynamic import to avoid issues with server-side rendering
    import('web-vitals').then(({ onCLS, onFID, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(reportMetric)
      onFID(reportMetric)
      onFCP(reportMetric)
      onINP(reportMetric)
      onLCP(reportMetric)
      onTTFB(reportMetric)
    })
  }, [])
}
