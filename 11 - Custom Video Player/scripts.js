const video = document.querySelector(".player__video");
const buttonPlay = document.querySelector(".player__button");
const progressBar = document.querySelector(".progress");
const progressBarEffect = document.querySelector(".progress__filled");
const skipButtons = document.querySelectorAll("button");
const volumeRange = document.querySelector(".player__slider[name='volume']");
const playbackRateRange = document.querySelector(".player__slider[name='playbackRate']");



function togglePlay() {
	if (video.paused) {
		video.play();
	} else {
		video.pause();
	}
}

buttonPlay.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

video.addEventListener("timeupdate", () => {
	const maxDuration = video.duration;
	const currentTime = video.currentTime;
	const width = (currentTime / maxDuration) * 100;

	progressBarEffect.style["flex-basis"] = `${width}%`;
});

skipButtons.forEach((button) => {
	if (button.dataset.skip !== undefined) {
		button.addEventListener("click", () => {
			video.currentTime += Number(button.dataset.skip);
		});
	}
});

volumeRange.addEventListener("input", () => {
	video.volume = volumeRange.value;
});

playbackRateRange.addEventListener("input", () => {
	video.playbackRate = playbackRateRange.value;
});

video.addEventListener("play", () => {
	buttonPlay.textContent = "❚ ❚";
});

video.addEventListener("pause", () => {
	buttonPlay.textContent = "►";
});

function setTimeVideo(event) {
	const time = (event.offsetX / progressBar.offsetWidth) * video.duration;

	video.currentTime = time;
}

let mouseDown = false;

progressBar.addEventListener("click", setTimeVideo);
progressBar.addEventListener("mousedown", () => mouseDown = true);
progressBar.addEventListener("mouseup", () => mouseDown = false);
progressBar.addEventListener("mousemove", (event) => {
	if (mouseDown) {
		setTimeVideo(event)
	}
});