import { useEffect, useRef, useState } from 'react';

import { toast, connect } from '../lib/toast.js';
import { useAutoSlide } from '../lib/autoslide.js';

export { toast };
export function validationError(message) { toast(message, 'bad'); }

const MAX = 3;
const SHOWN = { bad: 5200, action: 5000 };   // how long, in ms, before a toast disappears; others last 3500

function Toast({ item, remove }) {
  const timer = useRef(null);
  const left = useRef(item.ms);
  const started = useRef(0);
  const text = useRef(null);
  useAutoSlide(text, item.id, { pace: 14, hold: 700 });   // a note too long for a phone slides along instead of wrapping
  const msg = <span className="toast-msg" ref={text}>{item.message}</span>;
  const start = () => { started.current = Date.now(); timer.current = setTimeout(remove, left.current); };
  const stop = () => { clearTimeout(timer.current); left.current = Math.max(200, left.current - (Date.now() - started.current)); };
  useEffect(() => { start(); return () => clearTimeout(timer.current); }, []);
  // pushed out by a newer note: fade away quickly instead of vanishing
  useEffect(() => { if (!item.leaving) return undefined; clearTimeout(timer.current); const t = setTimeout(remove, 160); return () => clearTimeout(t); }, [item.leaving]);
  const props = { className: `toast ${item.kind}${item.action ? ' action' : ''}${item.leaving ? ' leaving' : ''}`, style: { animationDuration: `${item.ms}ms` }, onMouseEnter: stop, onMouseLeave: start };
  if (!item.action) return <div {...props} role={item.kind === 'bad' ? 'alert' : 'status'}>{msg}</div>;
  return (
    <button type="button" {...props} onClick={() => { remove(); item.onClick(); }}>
      <b>{item.action}</b>{msg}
    </button>
  );
}

export default function ToastHost() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    let id = 0;
    return connect((message, kind, { action, onClick, ms } = {}) => {
      const item = { id: ++id, message, kind, action, onClick, ms: ms || (action ? SHOWN.action : SHOWN[kind] || 3500) };
      // at most MAX notes show: the oldest ones beyond that fade out at once
      setItems((l) => {
        const next = [...l, item];
        let extra = next.filter((x) => !x.leaving).length - MAX;
        return next.map((x) => (extra > 0 && !x.leaving && extra-- ? { ...x, leaving: true } : x));
      });
    });
  }, []);
  const remove = (item) => () => setItems((l) => l.filter((x) => x.id !== item.id));
  return (
    <div id="toasts">
      {items.map((t) => <Toast key={t.id} item={t} remove={remove(t)} />)}
    </div>
  );
}
