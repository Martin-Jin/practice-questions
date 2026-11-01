// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.57';

export const CHANGELOG = [
  {
    version: '2.57', date: '2026-11-02', title: 'Copy any question, solution or formula image',
    items: [
      'Hover a question image, a solution page or a formula sheet and press the new copy button beside the magnifying glass to copy just the picture shown (the page on screen for a PDF) to the clipboard. The larger viewer has one too.',
    ],
  },
  {
    version: '2.56', date: '2026-11-02', title: 'Re-upload a set, new search and palette keys',
    items: [
      'The pencil menu on a question set has Re-upload the PDF (or the folder): pick the changed file and the set updates in place, keeping your answers and progress for the questions still there. Search is now Ctrl+O and the command palette Ctrl+P (both can be changed in Settings), and the palette has a Search command. A tick-box line that is too long scrolls sideways by hand.',
    ],
  },
  {
    version: '2.55', date: '2026-11-02', title: 'Paused timer asks in a pop-up',
    items: [
      'After 5 minutes paused, the timer asks in a pop-up whether you forgot to unpause. Yes, I forgot carries on and adds those 5 minutes to the question; No leaves it paused. Small pop-ups keep their title and buttons on one line and scroll sideways by hand on a narrow screen.',
    ],
  },
  {
    version: '2.54', date: '2026-11-02', title: 'Smoother dashboard, sliding run names, full-screen dialogs',
    items: [
      'The maths symbols behind the dashboard header are lighter on a phone, so they lag less. Run and session names that are cut off now slide along by themselves, in every list. On a phone every large window (the tutorial, Settings, the add and export windows) opens full screen; small yes/no boxes stay small.',
    ],
  },
  {
    version: '2.53', date: '2026-11-02', title: 'Settings fills a phone screen',
    items: [
      'On a phone, Settings opens full screen like the tutorial. The editor and practice options, which were squashed out of sight in a scrolling dialog, show again.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
