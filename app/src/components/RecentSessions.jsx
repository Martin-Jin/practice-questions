import { runStatus, libraryRunSet } from '../lib/practice.js';
import { LIB_MODE_LABELS } from '../../shared/librarymodes.js';
import { abandonLibRun } from './LibraryPractice.jsx';
import { useDialogs } from './Dialogs.jsx';
import { timeAgo, plural } from '../lib/format.js';

const DAY = 24 * 60 * 60 * 1000;

// A compact list of the latest practice sessions in a box as tall as the practice options beside it (`height`), so it fills the same space with one session or many. It is not shown when no session is recent (finished more than a day ago counts as not recent). `limit` is how many rows fit
// (the page measures the options beside it); when there are more sessions than that, "See all" calls onAll (a window with every one). A × at the right of a row, shown on hover or focus, removes that session.
export default function RecentSessions({ runs: all, limit, height, onAll }) {
  const { confirm } = useDialogs();
  // Sessions finished more than a day ago drop off this list (they stay in See all and History).
  const runs = all.filter((r) => !r.completedAt || Date.now() - Date.parse(r.completedAt) <= DAY);
  if (runs.length === 0) return null;   // nothing recent to show
  const shown = runs.slice(0, limit);
  return (
    <section className="recent">
      <div className="section-title"><h2>Recent sessions</h2><span className="muted">{runs.length}</span></div>
      <ul className="recent-list" style={height ? { height } : undefined}>
          {shown.map((run) => {
            const done = run.questions.filter((uid) => runStatus(run, uid)).length;
            const right = run.questions.filter((uid) => runStatus(run, uid) === 'right').length;
            const pct = run.questions.length ? (done / run.questions.length) * 100 : 0;
            const open = !!libraryRunSet(run);
            return (
              <li key={run.id}>
                <a className="recent-row" href={open ? `#/practice/${run.id}${run.completedAt ? '/summary' : ''}` : undefined} title={`${run.name} (${LIB_MODE_LABELS[run.mode]})`}>
                  <span className="recent-name">{run.name}</span>
                  <span className="recent-meta">{done} / {run.questions.length} checked · {right} right · {timeAgo(run.updatedAt)}</span>
                  <span className={`bar${run.completedAt ? ' ok' : ''}`}><i style={{ width: `${pct}%` }} /></span>
                </a>
                <button type="button" className="recent-x" onClick={() => abandonLibRun(run, confirm)} aria-label={`Delete ${run.name}`} title="Delete"><span aria-hidden="true">×</span></button>
              </li>
            );
          })}
      </ul>
      {all.length > shown.length && (
        <button type="button" className="btn ghost sm" onClick={onAll}>See all {plural(all.length, 'session')}</button>
      )}
    </section>
  );
}
