import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type HeaderPanelId = "loans" | "help";

type Ctx = {
  open: HeaderPanelId | null;
  /** Open immediately (click / keyboard). */
  openNow: (id: HeaderPanelId) => void;
  /** Open after a forgiving delay (pointer intent). */
  openSoon: (id: HeaderPanelId) => void;
  /** Close after a forgiving delay (pointer leave). */
  closeSoon: () => void;
  closeNow: () => void;
  cancelClose: () => void;
  toggle: (id: HeaderPanelId) => void;
};

const HeaderMenuContext = createContext<Ctx | null>(null);

const OPEN_DELAY = 100;
const CLOSE_DELAY = 140;

/** Coordinates the header disclosure panels — only one may be open at a time. */
export function HeaderMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<HeaderPanelId | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = null;
    closeTimer.current = null;
  }, []);

  const openNow = useCallback(
    (id: HeaderPanelId) => {
      clear();
      setOpen(id);
    },
    [clear],
  );

  const openSoon = useCallback(
    (id: HeaderPanelId) => {
      clear();
      openTimer.current = setTimeout(() => setOpen(id), OPEN_DELAY);
    },
    [clear],
  );

  const closeSoon = useCallback(() => {
    clear();
    closeTimer.current = setTimeout(() => setOpen(null), CLOSE_DELAY);
  }, [clear]);

  const closeNow = useCallback(() => {
    clear();
    setOpen(null);
  }, [clear]);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);

  const toggle = useCallback(
    (id: HeaderPanelId) => {
      clear();
      setOpen((current) => (current === id ? null : id));
    },
    [clear],
  );

  useEffect(() => () => clear(), [clear]);

  const value = useMemo(
    () => ({ open, openNow, openSoon, closeSoon, closeNow, cancelClose, toggle }),
    [open, openNow, openSoon, closeSoon, closeNow, cancelClose, toggle],
  );

  return <HeaderMenuContext.Provider value={value}>{children}</HeaderMenuContext.Provider>;
}

export function useHeaderMenu() {
  const ctx = useContext(HeaderMenuContext);
  if (!ctx) throw new Error("useHeaderMenu must be used within HeaderMenuProvider");
  return ctx;
}

/**
 * Shared close behaviour for one disclosure: Escape (focus returns to the
 * trigger), outside pointer press, and focus leaving the trigger + panel.
 */
export function useDisclosureBehaviour({
  isOpen,
  close,
  rootRef,
  triggerRef,
  panelRef,
}: {
  isOpen: boolean;
  close: () => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  /** Optional portalled panel that also counts as "inside". */
  panelRef?: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    if (!isOpen) return;

    const inside = (target: EventTarget | null) => {
      if (!(target instanceof Node)) return false;
      if (rootRef.current?.contains(target)) return true;
      if (panelRef?.current?.contains(target)) return true;
      return false;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      close();
      triggerRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (inside(event.target)) return;
      close();
    };

    const onFocusIn = (event: FocusEvent) => {
      if (inside(event.target)) return;
      close();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [isOpen, close, rootRef, triggerRef, panelRef]);
}

/** Keeps a panel mounted for its short exit transition. */
export function usePresence(isOpen: boolean, exitMs = 140) {
  const [present, setPresent] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setPresent(true);
      return;
    }
    const timer = setTimeout(() => setPresent(false), exitMs);
    return () => clearTimeout(timer);
  }, [isOpen, exitMs]);

  return present;
}
