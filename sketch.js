let cnv;
const voiceAddresses = ['assets/notes-1.wav', 'assets/notes-2.wav', 'assets/notes-3.wav', 'assets/notes-4.wav'];
const musicManager = createMusicManager(voiceAddresses);
let verb = new Tone.Reverb(4.5).toDestination();

window.addEventListener("click", musicManager.play, {once: true});


function setup() {


}


//w : 87
//a : 65
//s : 83
//d : 68


function draw(){
  if(keyIsDown(87)){
    //console.log('w');
    musicManager.voices[0].triggerVoice();
  }
  if(keyIsDown(65)){
    //console.log('a');
    musicManager.voices[1].triggerVoice();
  }
  if(keyIsDown(83)){
    //console.log('s');
    musicManager.voices[2].triggerVoice();
  }
  if(keyIsDown(68)){
    //console.log('d');
    musicManager.voices[3].triggerVoice();
  }

  musicManager.update();

}


