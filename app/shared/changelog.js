// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.50';

export const CHANGELOG = [
  {
    version: '2.50', date: '2026-11-02', title: 'Space pauses the timer, and a focus mode',
    items: [
      'Press Space to pause or resume the timers (not while typing, in the editor or on a focused button). Settings > Practice > Focus mode asks for full screen when a session starts, and shows a reminder to get back to the question if you leave full screen before the session ends.',
    ],
  },
  {
    version: '2.49', date: '2026-11-01', title: 'Drop-downs stay inside the page',
    items: [
      'Drop-down lists and menus that would run past the edge of a phone screen are shifted sideways to keep the page margin, instead of being cut off.',
    ],
  },
  {
    version: '2.48', date: '2026-11-01', title: 'Cut-off text scrolls by hand',
    items: [
      'Text cut off at one line (set rows, recent sessions, tiles, question lists and more) now scrolls sideways with a finger, wheel or trackpad instead of ending in dots. On the set page the title, details and location line no longer slide by themselves. On a phone, Start hides while the practice mode drop-down is open instead of dropping to a second line, and the customise-sections button has no border or background. The top bar search finds question sets only, on every page; to search the questions in a set, open the set. Its icon is a list with a magnifier, to tell it from the search beside a set\'s title.',
    ],
  },
  {
    version: '2.47', date: '2026-11-01', title: 'Button rows stay on one line',
    items: [
      'The Mark as difficult / Solution / Formulas buttons, I got it / Not quite and Previous / Next stay on one line. When there is no room they are cut off at the padding and you scroll them sideways by hand.',
    ],
  },
  {
    version: '2.46', date: '2026-11-01', title: 'Long titles stay inside the screen',
    items: [
      'A long set title or details line no longer pushes past the edge of a phone screen: it is cut off at the page margin and slides along by itself. The same goes for the section name beside Questions in, which is cut off and slides instead of pushing Questions in onto a second line. In a practice session the location line no longer slides by itself: you scroll it by hand.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
