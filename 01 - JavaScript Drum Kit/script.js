window.addEventListener('focus', function() {
	const keys = document.querySelectorAll(".key");
	const audios = document.querySelectorAll("audio");

	keys.forEach(function(key) {
		const codeKey = Number(key.attributes[0].value);

		audios.forEach(function(audio) {
			const codeSound = Number(audio.attributes[0].value);
			
			if (codeKey === codeSound) {
				key.appendChild(audio);
			}
		});
	});
});

window.addEventListener('keydown', function(e) {
	const keys = document.querySelectorAll(".key");

	keys.forEach(function(key) {
		const codeKey = Number(key.attributes[0].value);
		const audio = key.children[2];

		if (e.keyCode === codeKey) {
			key.classList.toggle("playing");
			audio.load();
			audio.play();
		}
	});
});

window.addEventListener('keyup', function(e) {
	const keys = document.querySelectorAll(".key");

	keys.forEach(function(key) {
		const codeKey = Number(key.attributes[0].value);

		if (e.keyCode === codeKey) {
			key.classList.remove("playing");
		}
	});
});