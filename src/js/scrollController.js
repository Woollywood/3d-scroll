import Lenis from '@studio-freight/lenis';
import '@styles/lenis.scss';

export const smoothScrolling = new Lenis();

function raf(time) {
	smoothScrolling.raf(time);
	requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
