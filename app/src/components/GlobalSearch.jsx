import { useEffect, useMemo, useState } from 'react';
import { useStore, state } from '../lib/store.js';
import Icon from './Icon.jsx';
import QuickSearch from './QuickSearch.jsx';
import { eventCombo, actionFor } from '../lib/shortcuts.js';

const count = (set) => set.categories.reduce((n, c) => n + c.questions.length, 0);
const typing = (t) => t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);

// The search box in the top bar. It finds question sets only, on every page. The questions of a set are searched after opening
// it (a set of your own has a search button beside its title).
export default function GlobalSearch() {
  const st = useStore();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      const action = actionFor(eventCombo(e), state.shortcuts);
      if (action && action.id === 'search' && !document.querySelector('dialog[open]')) { e.preventDefault(); setOpen(true); }
      else if (e.key === '/' && !typing(e.target) && !e.ctrlKey && !e.metaKey) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const items = useMemo(() => [
    ...st.catalog.sets.map((set) => ({
      key: `set:${set.id}`, label: set.name, rank: 10, badge: 'Set',
      sub: `Question set · ${count(set)} questions`,
      keywords: `${set.description} ${set.categories.map((c) => c.name).join(' ')}`,
      onSelect: () => { window.location.hash = `#/set/${set.id}`; },
    })),
    ...Object.values(st.library.sets).map((set) => ({
      key: `lib:${set.id}`, label: set.title, rank: 10, badge: 'Set', sub: `Your library · ${set.manifest.questions.length} questions`,
      keywords: `${set.course} ${[...new Set(set.manifest.questions.map((q) => q.section))].join(' ')}`,
      onSelect: () => { window.location.hash = `#/lib/${encodeURIComponent(set.id)}`; },
    })),
  ], [st.catalog, st.library]);

  const label = 'Search question sets';
  return (
    <>
      <button type="button" className="nav-search" onClick={() => setOpen(true)} title={label} aria-label={label}>
        <Icon name="globeSearch" /><span className="nav-search-text">Search sets</span>
      </button>
      {open && (
        <QuickSearch
          items={items} onClose={() => setOpen(false)}
          placeholder={`${label}…`}
          emptyHint={`Type to search ${items.length} question set(s).`}
        />
      )}
    </>
  );
}
