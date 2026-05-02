/**
 * Copies UXPilot HTML screens into public/screens with slug filenames,
 * injects data-pw-screen on <body> and loads the navigation bridge.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const repoRoot = path.join(projectRoot, '..');
const uxRoot = path.join(repoRoot, 'uxpilot-export-1777696787925');
const outDir = path.join(projectRoot, 'public', 'screens');

/** baseDir defaults to uxRoot; set baseDir: repoRoot for files living next to uxpilot export */
const SCREEN_MAP = [
  { slug: 'splash', file: '1-ParkWise App - Splash.html' },
  { slug: 'onboarding-1', file: '2-ParkWise App - Onboarding - St.html' },
  { slug: 'onboarding-2', file: '3-ParkWise App - Onboarding - St.html' },
  { slug: 'onboarding-3', file: '4-ParkWise App - Onboarding - St.html' },
  { slug: 'location-permission', file: '5-ParkWise App - Location Permis.html' },
  { slug: 'signup', file: '6-ParkWise App - Sign Up.html' },
  { slug: 'verify-email', file: '7-ParkWise App - Verify Email.html' },
  { slug: 'trial-success', file: '8-ParkWise App - Trial Success.html' },
  { slug: 'login', file: '9-ParkWise App - Login.html' },
  { slug: 'forgot-password', file: '10-ParkWise App - Forgot Password.html' },
  { slug: 'home-map', file: '11-ParkWise App - Home Map (Marke.html' },
  { slug: 'search-filters', file: '12-ParkWise App - Search (Filters.html' },
  { slug: 'parking-details', file: '13-ParkWise App - Parking Details.html' },
  { slug: 'booking-step-1', file: '14-ParkWise App - Booking - Step.html' },
  { slug: 'booking-step-2', file: '15-ParkWise App - Booking - Step.html' },
  { slug: 'booking-step-3', file: '16-ParkWise App - Booking - Step.html' },
  { slug: 'bookings-history', file: '17-ParkWise App - Bookings Histor.html' },
  { slug: 'scanner-camera', file: '18-ParkWise App - Scanner (Camera.html' },
  { slug: 'scanner-results', file: '19-ParkWise App - Scanner Results.html' },
  { slug: 'scanner-history', file: '20-ParkWise App - Scanner History.html' },
  { slug: 'street-cleaning-map', file: '21-ParkWise App - Street Cleaning.html' },
  { slug: 'street-cleaning-details', file: '22-ParkWise App - Street Cleaning.html' },
  { slug: 'street-cleaning-calendar', file: '23-ParkWise App - Street Cleaning.html' },
  { slug: 'street-cleaning-alerts', file: '24-ParkWise App - Street Cleaning.html' },
  { slug: 'ev-map', file: 'EV Charging Map.html', baseDir: repoRoot },
  { slug: 'ev-details', file: '26-ParkWise App - EV Details.html' },
  { slug: 'notifications', file: '27-ParkWise App - Notifications.html' },
  { slug: 'profile', file: '28-ParkWise App - Profile.html' },
  { slug: 'subscriptions', file: '29-ParkWise App - Subscriptions.html' },
  { slug: 'vehicles-saved', file: '30-ParkWise App - Vehicles & Save.html' },
  { slug: 'issue-report-category', file: '31-ParkWise App - Issue Reporting.html' },
  { slug: 'issue-report-details', file: '32-ParkWise App - Issue Reporting.html' },
  { slug: 'issue-report-success', file: '33-ParkWise App - Issue Reporting.html' },
  { slug: 'issue-report-history', file: '34-ParkWise App - Issue Reporting.html' },
  { slug: 'feedback', file: '35-ParkWise App - Feedback.html' },
  { slug: 'privacy', file: '36-ParkWise App - Privacy.html' },
  { slug: 'delete-account', file: '37-ParkWise App - Delete Account.html' },
  { slug: 'side-menu', file: '38-ParkWise App - Side Menu.html' },
];

function inject(html, slug) {
  let out = html;
  if (/data-pw-screen=/.test(out)) {
    out = out.replace(/data-pw-screen="[^"]*"/, `data-pw-screen="${slug}"`);
  } else {
    out = out.replace(/<body([^>]*)>/i, `<body$1 data-pw-screen="${slug}">`);
  }
  const bridge = `\n<script defer src="/prototype-bridge.js"></script>\n`;
  if (!out.includes('prototype-bridge.js')) {
    out = out.replace(/<\/body>/i, `${bridge}</body>`);
  }
  return out;
}

fs.mkdirSync(outDir, { recursive: true });

if (!fs.existsSync(uxRoot)) {
  const existing = fs.existsSync(outDir) && fs.readdirSync(outDir).filter((f) => f.endsWith('.html'));
  if (existing && existing.length) {
    console.warn(
      'UXPilot folder not found at',
      uxRoot,
      '— keeping',
      existing.length,
      'existing file(s) in public/screens (OK for deploy).',
    );
    process.exit(0);
  }
  console.error('Missing UXPilot export and no public/screens/*.html. Clone screens or set path.');
  process.exit(1);
}

for (const entry of SCREEN_MAP) {
  const { slug, file } = entry;
  const baseDir = entry.baseDir ?? uxRoot;
  const srcPath = path.join(baseDir, file);
  if (!fs.existsSync(srcPath)) {
    console.error('Missing:', srcPath);
    process.exit(1);
  }
  let html = fs.readFileSync(srcPath, 'utf8');
  html = inject(html, slug);
  const dest = path.join(outDir, `${slug}.html`);
  fs.writeFileSync(dest, html, 'utf8');
  console.log('Wrote', slug + '.html');
}

console.log('Done. Prepared', SCREEN_MAP.length, 'screens.');
