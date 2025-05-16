let cnv;
const voiceAddresses = [
  'assets/ForestRave Drums.wav', 
  'assets/ForestRave Bass.wav', 
  'assets/ForestRave Bubbly.wav', 
  'assets/ForestRave Stabby.wav',
  'assets/ForestRave_Ambience.wav'
];
const musicManager = createMusicManager(voiceAddresses);

let verb = new Tone.Reverb(4.5).toDestination();

window.addEventListener("click", musicManager.play, {once: true});


var aFern;
var mofern;
var lastfern;

function setup() {
  createCanvas(windowWidth, windowHeight);

  musicManager.voices[2].setGainMult(2);
  musicManager.voices[3].setGainMult(2);

    background(230, 230, 255);
  noSmooth();

  let n = 0;
  noStroke();
  while (n < width) {
    fill(random(10, 40), random(80, 120), random(10, 59));
    let r = random(10, 50);
    rect(n, 0, r + 1, height);
    n += r;
  }

  fill(100, 90, 25);
  rect(0, height - 10, width, 20);

  for (let i = 0; i < 30; i++) {
    strokeWeight(random(3, 20));
    stroke(100, 10, 15, 100);
    let w = random(width);
    line(w, height - 12, w + random(-10, 10), height - random(100, 500));
  }

  strokeWeight(1);
  stroke(55);
  fill(30, 100, 50);
  for (let i = 0; i < 20; i++) {
    let w = random(width);
    ellipse(w, height - random(7, 10), random(8, 20), random(4, 8));
    line(w, height - 10, w + 1, height - 14);
    //line(w+2, height -8, w +2, height -14);
    line(w - 2, height - 10, w - 4, height - 14);
  }

  //fallen trees, rotting logs, sticks, moss, grass tufts, trees, moss on trees

  //VEctor rocks!
  for (let i = 0; i < 5; i++) {
    fill(130);
    ellipse(random(width), height - 18, random(10, 35), random(10, 15));
  }

  translate(0, height * 0.75);
  scale(0.25);
  for (let i = 0; i < 40; i++) {
    let f = new fern(random(width * 4), height + random(-10, 10));
    f.render();
  }
}


//w : 87
//a : 65
//s : 83
//d : 68


function draw(){
  if(keyIsDown(87)){
    console.log('w');
    musicManager.voices[0].triggerVoice();
  }
  if(keyIsDown(65)){
    console.log('a');
    musicManager.voices[1].triggerVoice();
  }
  if(keyIsDown(83)){
    console.log('s');
    musicManager.voices[2].triggerVoice();
  }
  if(keyIsDown(68)){
    console.log('d');
    musicManager.voices[3].triggerVoice();
  }

  musicManager.voices[4].triggerVoice();

  musicManager.update();

}





function fern(posx, posy) {
  //this.fernHeight = 80;
  this.numLeaves = floor(random(8, 19));
  this.pos = createVector(posx, posy);

  //this.leafH;
  //this.leafW;

  this.render = function() {

    strokeWeight(3);
    stroke(125, 125 + random(-25, 25), 50);
    //stroke(30, 150 + random(-50, 20), 25);
    line(this.pos.x, this.pos.y, this.pos.x, this.pos.y - this.numLeaves * 18.5);

    strokeWeight(1);
    stroke(35);

    fill(30, 220 + random(-20, 30), 50);
    noStroke();
    let n = 0;
    for (let i = 0; i < this.numLeaves; i++) {
      //ellipse(this.pos.x + i*2, this.pos.y + i* 20, 20, 10);
      //ellipse(this.pos.x -6 + i*2, (this.pos.y + i* 20) + 10, 20, 10);

      strokeWeight(2);
      stroke(20, 150, 25);

      if (i > this.numLeaves / 1.75) {


        let l = 20 + n > 2 ? 20 + n + 2 : 2;

        rect(this.pos.x + 6, this.pos.y - i * 20, l, 7);
        rect(this.pos.x - l - 6, (this.pos.y - i * 20) + 10, l, 7);

        line(this.pos.x + 2, this.pos.y - i * 20 + 4, this.pos.x + 6, this.pos.y - i * 20 + 4);
        line(this.pos.x - 2, this.pos.y - i * 20 + 12, this.pos.x - 6, this.pos.y - i * 20 + 12);

        n -= 4;
      } else if (i > this.numLeaves / 4) {
        r = random(0, 10);
        rect(this.pos.x + 6, this.pos.y - i * 20, 20 + r, 7);
        rect(this.pos.x - 20 - r - 2 - 6, (this.pos.y - i * 20) + 10, 20 + r, 7);

        line(this.pos.x + 2, this.pos.y - i * 20 + 4, this.pos.x + 6, this.pos.y - i * 20 + 4);
        line(this.pos.x - 2, this.pos.y - i * 20 + 12, this.pos.x - 6, this.pos.y - i * 20 + 12);
      }
    }

  }
}