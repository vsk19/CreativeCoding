
// calculate number of milliseconds between each beat
let beats_per_min = 168;
let beats_per_sec = beats_per_min/60;
let millis_between_beats = 1000/beats_per_sec;
let next_change = millis_between_beats;

let offbeat = true;
let beat_number = 1;

let color1 = [255, 0, 0];
let color2 = [0, 255, 0];

// preload images and audio
let padmaavati_front;
let padmaavati_right;
let padmaavati_left;

let dancer_small_front;
let dancer_small_right;
let dancer_small_left;

let dancer_med_front;
let dancer_med_right;
let dancer_med_left;

let aunty_red;
let aunty_orange;
let aunty_green;

let music;
let just_played = false;

function preload() {

	padmaavati_front = loadImage('images/deepika_front.png');
	padmaavati_right = loadImage('images/deepika_right.png');
	padmaavati_left = loadImage('images/deepika_left.png');

	dancer_small_front = loadImage('images/dancer_front.png');
	dancer_small_right = loadImage('images/dancer_right.png');
	dancer_small_left = loadImage('images/dancer_left.png');

	dancer_med_front = loadImage('images/dancer_front.png');
	dancer_med_right = loadImage('images/dancer_right.png');
	dancer_med_left = loadImage('images/dancer_left.png');

	aunty_red = loadImage('images/aunty_red.png');
	aunty_orange = loadImage('images/aunty_orange.png');
	aunty_green = loadImage('images/aunty_green.png');

	music = loadSound('music/ghoomar_trimmed.m4a');

}

class Aunty {

	constructor(x, y, color, opposite_dir) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.direction = 1;
		if (opposite_dir) {
			this.direction = -1;
		}
	}

	show() {
		let aunty = null;
		if (this.color == 'red') {
			aunty = aunty_red;
		} if (this.color == 'orange') {
			aunty = aunty_orange;
		} if (this.color == 'green') {
			aunty = aunty_green;
		} 
		
		if (beat_number == 1 || beat_number == 3) {
			image(aunty, this.x + (this.direction * 5), this.y);
		} else {
			image(aunty, this.x, this.y);
		}
	}
}

class Dancer {

	constructor(x, y, dancer_type) {
		this.x = x;
		this.y = y;
		this.dancer_type = dancer_type;

	}
	
	show() {
		let front = null;
		let right = null;
		let left = null;

		if (this.dancer_type == 'queen') {
			front = padmaavati_front;
		 	right = padmaavati_right;
			left = padmaavati_left;
		} if (this.dancer_type == 'small') {
			front = dancer_small_front;
		 	right = dancer_small_right;
			left = dancer_small_left;
		} if (this.dancer_type == 'med') {
			front = dancer_med_front;
		 	right = dancer_med_right;
			left = dancer_med_left;
		} 

		// change orientation of dancer as beats count to 4
		if (beat_number == 1 || beat_number == 0) {
			image(front, this.x, this.y);
		} if (beat_number == 2) {
			image(right, this.x, this.y);
		} if (beat_number == 3) {
			image(left, this.x, this.y);
		} if (beat_number == 4) {
			image(front, this.x, this.y);
			// reset beat counter when one measure is done
			beat_number = 0;
		}

	}

}

// Counts number of milliseconds elapsed
// if time for next beat, flips offbeat switch
function alternateBeat() {
    
	if (millis() > next_change) {
		next_change = millis() + millis_between_beats;
		offbeat = !offbeat;
		beat_number++;
	}
}

function showLamp(x, y) {
	if (offbeat) {
		fill(255, 140, 0)
	} else {
		fill(255, 164, 54)
	}
	ellipse(x, y, 10, 10);
}

function setup() {
	createCanvas(800, 600);

	let padmaavati_scale = 0.6;
	let small_scale = 0.3;
	let med_scale = 0.4;
	let aunty_scale = 0.1

	padmaavati_front.resize(padmaavati_front.width * padmaavati_scale, 0);
	padmaavati_right.resize(padmaavati_right.width * padmaavati_scale, 0);
	padmaavati_left.resize(padmaavati_left.width * padmaavati_scale, 0);

	dancer_small_front.resize(dancer_small_front.width * small_scale, 0);
	dancer_small_right.resize(dancer_small_right.width * small_scale, 0);
	dancer_small_left.resize(dancer_small_left.width * small_scale, 0);

	dancer_med_front.resize(dancer_med_front.width * med_scale, 0);
	dancer_med_right.resize(dancer_med_right.width * med_scale, 0);
	dancer_med_left.resize(dancer_med_left.width * med_scale, 0);

	aunty_red.resize(aunty_red.width * aunty_scale, 0);
	aunty_orange.resize(aunty_orange.width * aunty_scale, 0);
	aunty_green.resize(aunty_green.width * aunty_scale, 0);

}

// make dancer objects
let padmaavati = new Dancer(290, 250, 'queen');
let dancer1 = new Dancer(20, 270, 'small');
let dancer2 = new Dancer(660, 270, 'small');
let dancer3 = new Dancer(130, 270, 'med');
let dancer4 = new Dancer(510, 270, 'med');

// make aunty objects
let aunty1 = new Aunty(52, 210, 'green', false);
let aunty2 = new Aunty(162, 210, 'red', false);
let aunty3 = new Aunty(608, 210, 'green', true);
let aunty4 = new Aunty(718, 210, 'orange', true);

function draw() {
    alternateBeat()
    stroke(0, 0, 0, 0);
	background(227, 192, 161);
	
	// ground
	fill(199, 144, 95);
	
	rect(0, 400, 800, 600);
	
	// middle wall
	fill(171, 115, 84);
	rect(250, 0, 300, 400);

	fill(135, 83, 57);
	rect(350, 300, 100, 100);
	arc(400, 300, 100, 100, PI, 2*PI);

	fill(135, 83, 57);
	rect(275, 200, 50, 50);
	arc(300, 200, 50, 50, PI, 2*PI);

	fill(135, 83, 57);
	rect(475, 200, 50, 50);
	arc(500, 200, 50, 50, PI, 2*PI);

	fill(179, 123, 91);
	rect(250, 130, 300, 20);
	rect(325, 0, 150, 150);
	fill(143, 95, 67);

	rect(375, 70, 50, 60);
	arc(400, 70, 50, 50, PI, 2*PI);
	rect(335, 80, 30, 50);
	arc(350, 80, 30, 30, PI, 2*PI);
	rect(435, 80, 30, 50);
	arc(450, 80, 30, 30, PI, 2*PI);

	// left wall
	fill(130, 87, 60);
	rect(0, 100, 250, 300);
	rect(10, 80, 20, 20);
	rect(50, 80, 20, 20);
	rect(90, 80, 20, 20);
	rect(130, 80, 20, 20);
	rect(170, 80, 20, 20);
	rect(210, 80, 20, 20);

	fill(153, 102, 73);
	rect(0, 250, 250, 150);

	// pagodas
	rect(40, 200, 10, 50);
	rect(90, 200, 10, 50);
	rect(30, 190, 80, 10);
	arc(70, 190, 60, 60, PI, 2*PI)
	
	push();
	translate(120, 0);
	rect(30, 200, 10, 50);
	rect(80, 200, 10, 50);
	rect(20, 190, 80, 10);
	arc(60, 190, 60, 60, PI, 2*PI)
	pop();

	// right wall
	fill(130, 87, 60);
	rect(550, 100, 250, 300);
	rect(570, 80, 20, 20);
	rect(50+560, 80, 20, 20);
	rect(90+560, 80, 20, 20);
	rect(130+560, 80, 20, 20);
	rect(170+560, 80, 20, 20);
	rect(210+560, 80, 20, 20);

	push();
	translate(550, 0);
	fill(153, 102, 73);
	rect(0, 250, 250, 150);

	// pagodas
	rect(40, 200, 10, 50);
	rect(90, 200, 10, 50);
	rect(30, 190, 80, 10);
	arc(70, 190, 60, 60, PI, 2*PI)
	
	push();
	translate(120, 0);
	rect(30, 200, 10, 50);
	rect(80, 200, 10, 50);
	rect(20, 190, 80, 10);
	arc(60, 190, 60, 60, PI, 2*PI)
	pop();
	pop();

	aunty1.show();
	aunty2.show();
	aunty3.show();
	aunty4.show();

	// Place lamps around scene
	showLamp(70, 245);
	showLamp(58, 245);
	showLamp(82, 245);
	
	showLamp(180, 245);
	showLamp(180-12, 245);
	showLamp(180+12, 245);

	showLamp(300, 245);
	showLamp(300-12, 245);
	showLamp(300+12, 245);

	showLamp(width - 70, 245);
	showLamp(width - 58, 245);
	showLamp(width - 82, 245);
	
	showLamp(width - 180, 245);
	showLamp(width - 180-12, 245);
	showLamp(width - 180+12, 245);

	showLamp(width - 300, 245);
	showLamp(width - 300-12, 245);
	showLamp(width - 300+12, 245);

	dancer1.show();
	dancer2.show();
	dancer3.show();
	dancer4.show();
	padmaavati.show();

	// display instructions
	textAlign(CENTER);
	fill(153, 51, 51);
	noStroke();
	text("Click to play/stop", 720, 570);

}

function mousePressed() 
{
  if (just_played) {
  	music.stop();
  } else {
	  music.loop();
  }
  just_played = !just_played;

}