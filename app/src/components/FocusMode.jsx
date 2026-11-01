import { useEffect, useRef, useState } from 'react';
import { useFocusMode, sessionOfHash, isFullScreen } from '../lib/focus.js';
import { Modal } from './Dialogs.jsx';

// Focus mode (Settings > Practice). When a session opens, asks to go full screen (the browser only allows that from a click, so
// it is a button). If the user then leaves full screen, a reminder asks them to get back to the question.
export default function FocusMode() {
  const on = useFocusMode();
  const [session, setSession] = useState(() => sessionOfHash(window.location.hash));
  const [dialog, setDialog] = useState(null);   // 'ask' | 'remind' | null
  const asked = useRef(new Set());              // sessions already asked about
  const engaged = useRef(false);                // the session has been in full screen (button or F11)
  const live = useRef({});
  live.current = { on, session };

  useEffect(() => {
    const onHash = () => setSession(sessionOfHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!on || !session || asked.current.has(session) || isFullScreen() || !document.fullscreenEnabled) return;
    asked.current.add(session);
    setDialog('ask');
  }, [on, session]);

  // Leaving the session (or turning the mode off) ends full screen and the reminder.
  useEffect(() => {
    if (on && session) return;
    setDialog(null);
    if (engaged.current) {
      engaged.current = false;
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    }
  }, [on, session]);

  // `engaged` means the session has been in full screen, by the button or by F11. Leaving it shows the reminder. F11 gives no
  // fullscreenchange event, so the window's size is checked too (after it settles).
  useEffect(() => {
    let timer = 0;
    const check = () => {
      const { on: active, session: current } = live.current;
      if (!active || !current) return;
      if (isFullScreen()) { engaged.current = true; setDialog((d) => (d === 'remind' || d === 'ask' ? null : d)); return; }
      if (engaged.current) { engaged.current = false; setDialog('remind'); }
    };
    const soon = () => { clearTimeout(timer); timer = setTimeout(check, 150); };
    document.addEventListener('fullscreenchange', soon);
    window.addEventListener('resize', soon);
    check();
    return () => { clearTimeout(timer); document.removeEventListener('fullscreenchange', soon); window.removeEventListener('resize', soon); };
  }, [on, session]);

  const enter = () => {
    setDialog(null);
    document.documentElement.requestFullscreen().catch(() => {});
  };
  const stop = () => { setDialog(null); };

  if (dialog === 'ask') {
    return (
      <Modal title="Focus mode" compact onClose={stop}
        footer={<><button type="button" className="btn" onClick={stop}>Not now</button><button type="button" className="btn primary" autoFocus onClick={enter}>Go full screen</button></>}>
        <p>Go full screen to keep your attention on the questions. Press Esc to leave it.</p>
      </Modal>
    );
  }
  if (dialog === 'remind') {
    return (
      <Modal title="Stay on the question" compact onClose={stop}
        footer={<><button type="button" className="btn" onClick={stop}>Carry on without it</button><button type="button" className="btn primary" autoFocus onClick={enter}>Back to full screen</button></>}>
        <p>You left full screen. Focus on the question in front of you.</p>
      </Modal>
    );
  }
  return null;
}
