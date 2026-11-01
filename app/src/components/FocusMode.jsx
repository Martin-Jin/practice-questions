import { useEffect, useRef, useState } from 'react';
import { useFocusMode, sessionOfHash } from '../lib/focus.js';
import { Modal } from './Dialogs.jsx';

// Focus mode (Settings > Practice). When a session opens, asks to go full screen (the browser only allows that from a click, so
// it is a button). If the user then leaves full screen, a reminder asks them to get back to the question.
export default function FocusMode() {
  const on = useFocusMode();
  const [session, setSession] = useState(() => sessionOfHash(window.location.hash));
  const [dialog, setDialog] = useState(null);   // 'ask' | 'remind' | null
  const asked = useRef(new Set());              // sessions already asked about
  const engaged = useRef(false);                // full screen was entered through this mode
  const live = useRef({});
  live.current = { on, session };

  useEffect(() => {
    const onHash = () => setSession(sessionOfHash(window.location.hash));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!on || !session || asked.current.has(session) || document.fullscreenElement || !document.fullscreenEnabled) return;
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

  useEffect(() => {
    const onChange = () => {
      if (document.fullscreenElement) { setDialog(null); return; }
      if (engaged.current && live.current.on && live.current.session) setDialog('remind');
    };
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const enter = () => {
    engaged.current = true;
    setDialog(null);
    document.documentElement.requestFullscreen().catch(() => { engaged.current = false; });
  };
  const stop = () => { engaged.current = false; setDialog(null); };

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
