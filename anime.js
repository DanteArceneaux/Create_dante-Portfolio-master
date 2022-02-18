anime({
	targets: ".text-zone",
	translateY: [
		{ value: 200, duration: 500 },
		{ value: 0, duration: 800 },
	],
	loop: false,
	rotate: {
		value: "1turn",
	},
	borderRadius: 50,
	direction: "alternate",
	easing: "easeInOutQuad",
	delay: function () {
		return anime.random(0, 1000);
	},
	loop: false,
	elasticity: 200,
});
playPause.play();
