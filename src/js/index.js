import '@/pug/pages/index.pug';
import '@styles/index.scss';

import './scrollController';

let zSpacing = -1000,
	lastPos = zSpacing / 5,
	$frames = document.querySelectorAll('.frame'),
	frames = Array.from($frames),
	zVals = [];

window.onscroll = () => {
	let top = document.documentElement.scrollTop,
		delta = lastPos - top;

	lastPos = top;

	frames.forEach((n, i) => {
		zVals.push((i * zSpacing) + zSpacing);
		zVals[i] += delta * -3;
		let frame = frames[i],
			transform = `translateZ(${zVals[i]}px)`,
			opacity = zVals[i] < Math.abs(zSpacing) / 1.5 ? 1 : 0;
		frame.setAttribute('style', `transform: ${transform}; opacity: ${opacity}`);
	});
	zVals = zVals.slice(0, frames.length);
};

window.scrollTo(0, 1);

// Audio

const soundButton = document.querySelector('.sound-button');
const audio = document.querySelector('.audio');

soundButton.addEventListener('click', (e) => {
	soundButton.classList.toggle('paused');
	audio.paused ? audio.play() : audio.pause();
});

window.onfocus = () => {
	soundButton.classList.contains('paused') ? audio.pause() : audio.play();
};

window.onblur = () => {
	audio.pause();
};
