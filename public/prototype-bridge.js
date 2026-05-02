/**
 * Static prototype navigation: matches visible button/link text to target screens.
 * Runs in iframe; updates parent HashRouter (#/screen/:slug).
 */
(function () {
  function go(slug) {
    if (window.parent && window.parent !== window) {
      window.parent.location.hash = '#/screen/' + slug;
    } else {
      window.location.hash = '#/screen/' + slug;
    }
  }

  function norm(s) {
    return (s || '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  /** @type {Record<string, [string, string][]>} — [substring match, target slug] */
  var NAV = {
    splash: [['retry connection', 'splash']],
    'onboarding-1': [['continue', 'onboarding-2']],
    'onboarding-2': [['continue', 'onboarding-3']],
    'onboarding-3': [
      ['create account', 'signup'],
      ['log in', 'login'],
    ],
    'location-permission': [
      ['allow while using app', 'signup'],
      ['not now', 'signup'],
    ],
    signup: [
      ['create account', 'verify-email'],
      ['apple', 'verify-email'],
      ['google', 'verify-email'],
    ],
    'verify-email': [
      ['verify', 'trial-success'],
      ['continue', 'trial-success'],
      ['open mail app', 'trial-success'],
      ['resend', 'verify-email'],
      ['change email', 'signup'],
    ],
    'trial-success': [
      ['go to map', 'home-map'],
      ['manage subscription', 'subscriptions'],
    ],
    login: [
      ['log in', 'home-map'],
      ['sign up', 'signup'],
    ],
    'forgot-password': [
      ['send reset link', 'login'],
      ['back to login', 'login'],
      ['back', 'login'],
    ],
    'home-map': [
      ['search', 'search-filters'],
      ['activity', 'bookings-history'],
      ['profile', 'profile'],
      ['map', 'home-map'],
    ],
    'search-filters': [
      ['apply', 'home-map'],
      ['clear', 'home-map'],
    ],
    'parking-details': [
      ['start parking', 'booking-step-1'],
      ['directions', 'home-map'],
      ['map', 'home-map'],
      ['search', 'search-filters'],
      ['scan', 'scanner-camera'],
      ['history', 'bookings-history'],
    ],
    'booking-step-1': [
      ['continue to payment', 'booking-step-2'],
      ['map', 'home-map'],
      ['search', 'search-filters'],
      ['scan', 'scanner-camera'],
      ['history', 'bookings-history'],
    ],
    'booking-step-2': [
      ['confirm & pay', 'booking-step-3'],
      ['confirm', 'booking-step-3'],
      ['map', 'home-map'],
      ['scan', 'scanner-camera'],
    ],
    'booking-step-3': [
      ['map', 'home-map'],
      ['search', 'search-filters'],
      ['scan', 'scanner-camera'],
      ['history', 'bookings-history'],
      ['view full receipt', 'bookings-history'],
    ],
    'bookings-history': [
      ['map', 'home-map'],
      ['search', 'search-filters'],
      ['scan', 'scanner-camera'],
      ['profile', 'profile'],
    ],
    'scanner-camera': [
      ['capture', 'scanner-results'],
      ['scan', 'scanner-results'],
      ['map', 'home-map'],
    ],
    'scanner-results': [
      ['book now', 'booking-step-1'],
      ['find nearby alternatives', 'home-map'],
      ['save rule', 'scanner-history'],
      ['report mismatch', 'issue-report-category'],
      ['map', 'home-map'],
      ['scan', 'scanner-camera'],
      ['history', 'scanner-history'],
    ],
    'scanner-history': [
      ['map', 'home-map'],
      ['scan', 'scanner-camera'],
      ['search', 'search-filters'],
    ],
    'street-cleaning-map': [
      ['map', 'home-map'],
      ['search', 'search-filters'],
      ['cleaning', 'street-cleaning-map'],
    ],
    'street-cleaning-details': [
      ['calendar', 'street-cleaning-calendar'],
      ['map', 'street-cleaning-map'],
    ],
    'street-cleaning-calendar': [
      ['map', 'street-cleaning-map'],
      ['alerts', 'street-cleaning-alerts'],
    ],
    'street-cleaning-alerts': [
      ['save', 'street-cleaning-map'],
      ['map', 'home-map'],
    ],
    'ev-map': [
      ['map', 'home-map'],
      ['search', 'search-filters'],
      ['scan', 'scanner-camera'],
      ['history', 'bookings-history'],
      ['menu', 'side-menu'],
      ['navigate', 'ev-details'],
      ['details', 'ev-details'],
    ],
    'ev-details': [
      ['directions', 'ev-map'],
      ['navigate', 'ev-map'],
      ['map', 'home-map'],
    ],
    notifications: [
      ['settings', 'notifications'],
      ['map', 'home-map'],
    ],
    profile: [
      ['vehicles', 'vehicles-saved'],
      ['subscription', 'subscriptions'],
      ['map', 'home-map'],
    ],
    subscriptions: [
      ['map', 'home-map'],
      ['profile', 'profile'],
    ],
    'vehicles-saved': [
      ['map', 'home-map'],
      ['profile', 'profile'],
    ],
    'issue-report-category': [
      ['next step', 'issue-report-details'],
      ['continue', 'issue-report-details'],
      ['next', 'issue-report-details'],
    ],
    'issue-report-details': [
      ['submit report', 'issue-report-success'],
      ['submit', 'issue-report-success'],
    ],
    'issue-report-success': [
      ['view report status', 'issue-report-history'],
      ['view my reports', 'issue-report-history'],
      ['back to map', 'home-map'],
      ['return home', 'home-map'],
      ['done', 'home-map'],
    ],
    'issue-report-history': [
      ['report issue', 'issue-report-category'],
      ['map', 'home-map'],
    ],
    feedback: [
      ['submit feedback', 'profile'],
      ['submit', 'profile'],
      ['map', 'home-map'],
    ],
    privacy: [
      ['save', 'profile'],
      ['map', 'home-map'],
    ],
    'delete-account': [
      ['delete my account', 'splash'],
      ['cancel', 'profile'],
      ['keep account', 'profile'],
      ['map', 'home-map'],
    ],
    'side-menu': [
      ['home map', 'home-map'],
      ['ev charging map', 'ev-map'],
      ['street cleaning map', 'street-cleaning-map'],
      ['bookings history', 'bookings-history'],
      ['sign scanner', 'scanner-camera'],
      ['notifications', 'notifications'],
      ['profile details', 'profile'],
      ['vehicles & places', 'vehicles-saved'],
      ['subscriptions', 'subscriptions'],
      ['report issue', 'issue-report-category'],
      ['feedback', 'feedback'],
      ['privacy & terms', 'privacy'],
      ['log out', 'login'],
    ],
  };

  document.addEventListener(
    'click',
    function (e) {
      var el = e.target.closest('button, a');
      if (!el) return;
      var screen = document.body && document.body.getAttribute('data-pw-screen');
      if (!screen) return;

      /* Icon-only controls (no readable label) */
      var btn = el.closest('button');
      if (btn && screen === 'ev-map' && btn.querySelector('.fa-arrow-left')) {
        e.preventDefault();
        e.stopPropagation();
        go('home-map');
        return;
      }
      if (btn && (screen === 'home-map' || screen === 'ev-map')) {
        if (screen === 'home-map' && btn.querySelector('.fa-bars')) {
          e.preventDefault();
          e.stopPropagation();
          go('side-menu');
          return;
        }
        if (btn.querySelector('.fa-camera') && btn.classList.contains('w-14')) {
          e.preventDefault();
          e.stopPropagation();
          go('scanner-camera');
          return;
        }
      }

      if (!NAV[screen]) return;
      var text = norm(el.textContent);
      if (!text || text.length > 120) return;

      var pairs = NAV[screen];
      for (var i = 0; i < pairs.length; i++) {
        var needle = pairs[i][0];
        var dest = pairs[i][1];
        if (text.indexOf(needle) !== -1) {
          e.preventDefault();
          e.stopPropagation();
          go(dest);
          return;
        }
      }
    },
    true
  );
})();
