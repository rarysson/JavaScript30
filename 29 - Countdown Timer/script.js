const timerDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
let idInterval;



function timer(seconds) {
	const now = Date.now();
	const then = now + seconds * 1000;

	displayTimeLeft(seconds);
	displayEndTime(then);
	clearInterval(idInterval);

	idInterval = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		if (secondsLeft < 0) {
			clearInterval(idInterval);
			return;
		}

		displayTimeLeft(secondsLeft);
	}, 1000);
}

function fixTime(time) {
	return time < 10 ? `0${time}` : time;
}

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	seconds %= 60;
	const display = `${fixTime(minutes)}:${fixTime(seconds)}`;

	timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();

	endTimeDisplay.textContent = `Be back at ${fixTime(hour)}:${fixTime(minutes)}`;
}

buttons.forEach(button => {
	button.addEventListener("click", function() {
		const seconds = +this.dataset.time;
		timer(seconds);
	});
});

document.customForm.addEventListener("submit", function(event) {
	event.preventDefault();

	const minutes = this.minutes.value;
	timer(minutes * 60);

	this.reset();
});