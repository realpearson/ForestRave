//Tone.Transport.scheduleRepeat(callback, "16n");

function createMusicManager(voiceAssets){
  const voices = [];

  voiceAssets.forEach((asset) => {
    voices.push(createVoice(asset));
  });

  function play(){
    voices.forEach((voice) => {
      voice.voicePlayer.start();
    })
  }

  function update(){
    voices.forEach((voice) => {
      voice.update();
    })
  }

  return {
    play,
    update,
    voices,
  }

}

function createVoice(voiceAsset){
  //Setup Internal State
  let currentState = VOICE_STATES.IDLE;
  let stateTimer = 0;
  let rampUpTime = 10;
  let rampDownTime = 20;
  let activeTime = 5//45;
  let frameCountBuffer = 0;
  let frameCountBreakThreshold = 5;

  //Setup Voice
  let voiceGainVal = 0;
  const voiceGain = new Tone.Gain(voiceGainVal).toDestination();
  
  const voicePlayer = new Tone.Player(voiceAsset).connect(voiceGain);
  voicePlayer.loop = true;

  function triggerVoice(){
    if(currentState == VOICE_STATES.ACTIVE) return;
    currentState = VOICE_STATES.RAMP_UP;
    frameCountBuffer = 0;
  }

  function update(){
    switch(currentState){
      case VOICE_STATES.IDLE:
        //console.log(currentState);
        stateTimer = 0;
        break;
      case VOICE_STATES.RAMP_UP:
        //console.log(currentState);
        frameCountBuffer++;
        if(frameCountBuffer >= frameCountBreakThreshold) {
          currentState = VOICE_STATES.RAMP_DOWN;
          break;
        }
        if(frameCountBuffer) voiceGainVal += (deltaTime/1000) / rampUpTime;
        if(voiceGainVal >= 1){
          voiceGainVal = 1;
          currentState = VOICE_STATES.ACTIVE;
        }
        voiceGain.set({gain: voiceGainVal});
        break;
      case VOICE_STATES.RAMP_DOWN:
        //console.log(currentState);
        voiceGainVal -= (deltaTime/1000) / rampDownTime;
        if(voiceGainVal <= 0) {
          voiceGainVal = 0;
          currentState = VOICE_STATES.IDLE;
        }
        voiceGain.set({gain: voiceGainVal});
        break;
      case VOICE_STATES.ACTIVE:
        //console.log(currentState);
        stateTimer += deltaTime/1000;
        if(stateTimer >= activeTime) {
          stateTimer = 0;
          currentState = VOICE_STATES.RAMP_DOWN;
        }
        break;
    }
  }

  return {
    voiceGain,
    voicePlayer,
    update,
    triggerVoice
  }
}


const VOICE_STATES = {
  IDLE: 'idle',
  RAMP_UP: 'ramp_up',
  RAMP_DOWN: 'ramp_down',
  ACTIVE: 'active'
}

