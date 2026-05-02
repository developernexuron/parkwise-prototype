/** Ordered list for Prev / Next in the prototype chrome */
export const SCREEN_FLOW: { slug: string; title: string }[] = [
  { slug: 'splash', title: 'Splash' },
  { slug: 'onboarding-1', title: 'Onboarding 1' },
  { slug: 'onboarding-2', title: 'Onboarding 2' },
  { slug: 'onboarding-3', title: 'Onboarding 3' },
  { slug: 'location-permission', title: 'Location' },
  { slug: 'signup', title: 'Sign up' },
  { slug: 'verify-email', title: 'Verify email' },
  { slug: 'trial-success', title: 'Trial success' },
  { slug: 'login', title: 'Login' },
  { slug: 'forgot-password', title: 'Forgot password' },
  { slug: 'home-map', title: 'Home map' },
  { slug: 'search-filters', title: 'Search & filters' },
  { slug: 'parking-details', title: 'Parking details' },
  { slug: 'booking-step-1', title: 'Booking — setup' },
  { slug: 'booking-step-2', title: 'Booking — payment' },
  { slug: 'booking-step-3', title: 'Booking — confirmation' },
  { slug: 'bookings-history', title: 'Bookings history' },
  { slug: 'scanner-camera', title: 'Scanner (camera)' },
  { slug: 'scanner-results', title: 'Scanner results' },
  { slug: 'scanner-history', title: 'Scan history' },
  { slug: 'street-cleaning-map', title: 'Street cleaning map' },
  { slug: 'street-cleaning-details', title: 'Street cleaning detail' },
  { slug: 'street-cleaning-calendar', title: 'Cleaning calendar' },
  { slug: 'street-cleaning-alerts', title: 'Cleaning alerts' },
  { slug: 'ev-map', title: 'EV map' },
  { slug: 'ev-details', title: 'EV details' },
  { slug: 'notifications', title: 'Notifications' },
  { slug: 'profile', title: 'Profile' },
  { slug: 'subscriptions', title: 'Subscriptions' },
  { slug: 'vehicles-saved', title: 'Vehicles & saved' },
  { slug: 'issue-report-category', title: 'Report — category' },
  { slug: 'issue-report-details', title: 'Report — details' },
  { slug: 'issue-report-success', title: 'Report — submitted' },
  { slug: 'issue-report-history', title: 'My reports' },
  { slug: 'feedback', title: 'Feedback' },
  { slug: 'privacy', title: 'Privacy' },
  { slug: 'delete-account', title: 'Delete account' },
  { slug: 'side-menu', title: 'Side menu' },
];

export const SLUG_SET = new Set(SCREEN_FLOW.map((s) => s.slug));

export function titleForSlug(slug: string): string {
  return SCREEN_FLOW.find((s) => s.slug === slug)?.title ?? slug;
}
