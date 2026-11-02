// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.71';

export const CHANGELOG = [
  {
    version: '2.71', date: '2026-11-02', title: 'Held keys toggle once, F for full screen',
    items: [
      'Holding down a shortcut key such as D (difficult), S (solution) or Alt+T (formula sheet) no longer flips it on and off over and over. It changes once, and you release and press the key again to change it back. The same goes for the shortcuts in a practice run. Pressing F on a question now goes full screen, and again to leave it. In full screen (Chrome and Edge), Esc closes an enlarged question first instead of leaving full screen; press Esc again to leave it.',
    ],
  },
  {
    version: '2.70', date: '2026-11-02', title: 'Set tiles show a name and tags',
    items: [
      'Set and folder tiles on the Question sets tab show only the name and the tags. The description (or, for a folder, the names of its sets) appears in a small pop-up above the pointer when you hover over the tile, and fades away when you move off it. A folder also has a tag with how many questions are in it, counting its sub-folders. The progress bar on your own sets is gone.',
    ],
  },
  {
    version: '2.69', date: '2026-11-02', title: 'Folders name their sets again',
    items: [
      'A folder on the Question sets tab shows the names of all its sets on one line, which slides along when it is cut off, with the tags ("3 sets", "1 folder") underneath. The description of a coding set also stays on one line that slides, with its tags underneath, instead of wrapping onto two lines. Your own question sets show a bar under their tags with how many questions you have answered correctly (3 / 9), turning green when all are done.',
    ],
  },
  {
    version: '2.68', date: '2026-11-02', title: 'Folders show counts',
    items: [
      'A folder on the Question sets tab now shows tags such as "3 sets" and "1 folder", like a set does, instead of listing the names of the sets inside it.',
    ],
  },
  {
    version: '2.67', date: '2026-11-02', title: 'Shorter set tiles',
    items: [
      'On the Question sets tab, the course and counts of a set now share one line instead of two, and the line slides along when the tile is too narrow to show all of it.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
