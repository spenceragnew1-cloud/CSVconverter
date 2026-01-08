// TypeScript declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: {
        page_path?: string;
        [key: string]: unknown;
      }
    ) => void;
  }
}

/**
 * Safely sends a GA4 event via window.gtag
 * @param name - Event name
 * @param params - Optional event parameters
 */
export function trackEvent(name: string, params?: Record<string, any>): void {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  try {
    window.gtag("event", name, params || {});
  } catch (error) {
    // Silently fail if gtag is not available or errors
    console.warn("Failed to track event:", error);
  }
}
