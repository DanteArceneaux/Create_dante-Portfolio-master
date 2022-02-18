
// animate on scroll

gsap.registerPlugin(ScrollTrigger);

gsap.to(".test", {
	x: 300,
	scrollTrigger: {
		trigger: ".test",
		start: "top 80%",
		end: "top 10%",
		scrub: 3,
		toggleActions: "restart none resume complete",
		// markers: {
		//     startColor: "purple",
		//     endColor: 'fuchsia',
		//     fontSize: '3rem',
		// },
	},
});

// Magic Mouse

options = {
	cursorOuter: "enable",
	hoverEffect: "pointer-blur",
	hoverItemMove: false,
	defaultCursor: false,
	outerWidth: 30,
	outerHeight: 30,
};
magicMouse(options);
// Animate canvas hero section

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let span = document.querySelectorAll(".blast");
let h1 = document.querySelector("h1");
const header = document.querySelector(".header");
const scroll = document.querySelector("scroll-down");
const square = document.querySelector(".square");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
let hue = 0;

window.addEventListener("resize", function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

const mouse = {
	x: undefined,
	y: undefined,
};

canvas.addEventListener("click", (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
	for (let i = 0; i < 10; i++) {
		particlesArray.push(new Particle());
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener("mousemove", (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
	for (let i = 0; i < 2; i++) {
		particlesArray.push(new Particle());
	}
});

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = Math.random() * 12;
		this.speedX = Math.random() * 3 - 1.5;
		this.speedY = Math.random() * 3 - 1.5;
		this.color = "#404040";
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1;
	}

	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();

		for (let j = i; j < particlesArray.length; j++) {
			const dx = particlesArray[i].x - particlesArray[j].x;
			const dy = particlesArray[i].y - particlesArray[j].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particlesArray[i].color;
				ctx.lineWidth = particlesArray[i].size / 30;
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
				ctx.stroke();
			}
		}
		if (particlesArray[i].size <= 0.3) {
			particlesArray.splice(i, 1);
			i--;
		}
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// ctx.fillStyle = 'rgba(0,0,0,0.1)'
	// ctx.fillRect(0,0,canvas.width, canvas.height)
	hue += 15;
	handleParticles();
	requestAnimationFrame(animate);
}

animate();

anime({
	targets: ["svg"],
	rotate: 360,
	duration: 1600,
	loop: false,
	elasticity: 600,
	easing: "easeOutElastic",
	delay: function (el, index) {
		return index * 80;
	},
});

const soundCloud = document.querySelector(".sound-cloud");
const off = document.querySelector("#off");
const on = document.querySelector("#on");
const myAudio = document.querySelector("#myAudio");

off.addEventListener("click", () => soundTrack("off"));
on.addEventListener("click", () => soundTrack("on"));

const soundTrack = (soundState) => {
	if (soundState === "off") {
		on.style.display = "block";
		off.style.display = "none";
		soundCloud.style.color = "#08fdd8";
		myAudio.play();
	} else if (soundState === "on") {
		on.style.display = "none";
		off.style.display = "block";
		soundCloud.style.color = "#f50057";
		myAudio.pause();
	}
};

// Play music functionality

const btnBars = document.querySelector(".bars");
const btnTimes = document.querySelector(".times");
const SideNav = document.querySelector(".aside");

btnBars.addEventListener("click", () => myFunc("open"));
btnTimes.addEventListener("click", () => myFunc("close"));

const myFunc = (navCondition) => {
	if (navCondition === "open") {
		SideNav.classList.add("show-nav");
		btnTimes.style.display = "block";
		btnBars.style.display = "none";
	} else if (navCondition === "close") {
		SideNav.classList.remove("show-nav");
		btnTimes.style.display = "none";
		btnBars.style.display = "block";
	}
};

// Animate letters in hero
$("h1").blast({
	delimiter: "character",
	customClass: "alpha small",
});
const elements = document.getElementsByClassName("alpha");

for (let i = 0; i <= elements.length; i++) {
	elements[i].addEventListener("animationend", function (e) {
		elements[i].classList.remove("animated");
	});

	elements[i].addEventListener("mouseover", function (e) {
		elements[i].classList.add("animated");
	});
}
