/**
 * Smooth Scroll Handler with Lenis / RAF inertia
 * Respects prefers-reduced-motion
 */

export class SmoothScroller {
  private isDestroyed = false;
  private currentY = window.scrollY;
  private targetY = window.scrollY;
  private rafId: number | null = null;
  private ease = 0.085;
  private isReducedMotion = false;

  constructor() {
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.isReducedMotion) return;

    this.init();
  }

  private init() {
    // Attempt dynamic Lenis import if present, or provide silky smooth RAF lerp
    this.onWheel = this.onWheel.bind(this);
    this.update = this.update.bind(this);

    window.addEventListener('wheel', this.onWheel, { passive: false });
    this.rafId = requestAnimationFrame(this.update);
  }

  private onWheel(e: WheelEvent) {
    if (this.isReducedMotion || this.isDestroyed) return;
    
    // Check if target is inside an independently scrollable container (e.g. modal or code box)
    let target = e.target as HTMLElement | null;
    let isInsideScrollable = false;
    while (target && target !== document.body) {
      const overflowY = window.getComputedStyle(target).overflowY;
      if (['auto', 'scroll'].includes(overflowY) && target.scrollHeight > target.clientHeight) {
        isInsideScrollable = true;
        break;
      }
      target = target.parentElement;
    }

    if (isInsideScrollable) return;

    e.preventDefault();
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    this.targetY = Math.min(maxScroll, Math.max(0, this.targetY + e.deltaY * 1.1));
  }

  private update() {
    if (this.isDestroyed) return;

    const diff = this.targetY - this.currentY;
    if (Math.abs(diff) > 0.5) {
      this.currentY += diff * this.ease;
      window.scrollTo(0, this.currentY);
    } else {
      this.currentY = this.targetY;
    }

    this.rafId = requestAnimationFrame(this.update);
  }

  public scrollTo(target: number | string | HTMLElement, options: { offset?: number; duration?: number } = {}) {
    let top = 0;
    const offset = options.offset || 0;

    if (typeof target === 'number') {
      top = target;
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) {
        top = el.getBoundingClientRect().top + window.scrollY;
      }
    } else if (target instanceof HTMLElement) {
      top = target.getBoundingClientRect().top + window.scrollY;
    }

    this.targetY = Math.max(0, top + offset);
    if (this.isReducedMotion) {
      window.scrollTo({ top: this.targetY, behavior: 'auto' });
      this.currentY = this.targetY;
    }
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('wheel', this.onWheel);
  }
}

let scrollerInstance: SmoothScroller | null = null;

export function initSmoothScroll(): SmoothScroller {
  if (!scrollerInstance && typeof window !== 'undefined') {
    scrollerInstance = new SmoothScroller();
  }
  return scrollerInstance!;
}
