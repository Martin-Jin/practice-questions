// The app's version and its change log (the five latest changes), shown in the welcome window (src/components/Welcome.jsx).
// Version numbers count pushes to main: 1.00 was the first, so a push that lands after N commits on main is
// `${1 + floor(N / 100)}.${N % 100, two digits}` (the 73rd push is 1.72). Every change a user can see adds an entry at the top,
// sets VERSION to it and drops the oldest, so the window opens on the change log after an update. A new feature also needs
// its place in the tutorial in Welcome.jsx.
export const VERSION = '2.69';

export const CHANGELOG = [
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
  {
    version: '2.66', date: '2026-11-02', title: 'The pause reminder asks once',
    items: [
      'After you answer No to "Did you forget to unpause it?", the pop-up stays away until you carry on and pause again. Before, it came back every 5 minutes for as long as the timer stayed paused.',
    ],
  },
  {
    version: '2.65', date: '2026-11-02', title: 'Edit mode switches itself off',
    items: [
      'Edit mode now turns off when you click or tab to anything other than its own buttons, so Space pauses the timer again instead of toggling it. It stays on when you move to another question.',
    ],
  },
];

// Which tab the welcome window opens on, given the version stored the last time it was shown: null (nothing to show) when
// the user has seen this version, the tutorial for someone who has never seen it, the change log after an update.
export function startTab(seen) {
  if (seen === VERSION) return null;
  return seen === null || seen === undefined ? 'tutorial' : 'changelog';
}
