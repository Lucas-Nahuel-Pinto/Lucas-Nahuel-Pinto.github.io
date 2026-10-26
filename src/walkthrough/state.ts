/**
 * State machine for the walkthrough app.
 *
 * Flow: menu → panel (project grid) → case (project detail) → the Astro
 * case-study route. `classic` is the degradation escape hatch: the
 * traditional HTML page. Every state can bail out to `menu` or `classic`;
 * there is no dead end.
 */
export const STATES = ['menu', 'panel', 'case', 'classic'] as const;

export type WalkthroughState = (typeof STATES)[number];

const TRANSITIONS: Record<WalkthroughState, readonly WalkthroughState[]> = {
  menu: ['panel', 'classic'],
  panel: ['case', 'menu', 'classic'],
  case: ['panel', 'menu', 'classic'],
  classic: ['menu'],
} as const;

type Listener = (next: WalkthroughState, prev: WalkthroughState) => void;

export class StateMachine {
  private current: WalkthroughState = 'menu';
  private listeners = new Set<Listener>();

  get state(): WalkthroughState {
    return this.current;
  }

  /** Subscribe to state changes. Returns an unsubscribe function. */
  on(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Transition to `next`. Returns false (and logs in dev) on invalid moves. */
  set(next: WalkthroughState): boolean {
    if (next === this.current) return true;
    if (!TRANSITIONS[this.current].includes(next)) {
      console.warn(`[walkthrough] invalid transition: ${this.current} → ${next}`);
      return false;
    }
    const prev = this.current;
    this.current = next;
    for (const listener of this.listeners) listener(next, prev);
    return true;
  }
}
