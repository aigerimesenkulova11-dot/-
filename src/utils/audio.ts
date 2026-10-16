// Web Audio API Sound Generator for Bowling Alley

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Read mute preference from localStorage
    const saved = localStorage.getItem('math_bowling_muted');
    this.isMuted = saved === 'true';
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('math_bowling_muted', String(this.isMuted));
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    localStorage.setItem('math_bowling_muted', String(this.isMuted));
  }

  // Authentic sound of bowling ball rolling along maple wood lane
  public playBallRoll(duration: number = 1.2) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Buffer with pink noise
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      data[i] = (b0 + b1 + b2) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Low pass filter sweeping up slightly as ball gets closer
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, now);
    filter.frequency.exponentialRampToValueAtTime(320, now + duration);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.35, now + duration * 0.8);
    gain.gain.linearRampToValueAtTime(0.01, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  }

  // Wooden pins crashing sound - clattering of multiple hard maple wood pins
  public playPinsCrash(pinCount: number = 10) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const intensity = Math.min(pinCount / 10, 1);

    // Initial heavy impact thump
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);
    oscGain.gain.setValueAtTime(0.7 * intensity, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);

    // Multiple wooden clack bursts
    const numHits = Math.max(2, Math.floor(pinCount * 1.5));
    for (let i = 0; i < numHits; i++) {
      const hitTime = now + (i === 0 ? 0.02 : 0.04 + Math.random() * 0.28);
      const hitOsc = this.ctx.createOscillator();
      const hitFilter = this.ctx.createBiquadFilter();
      const hitGain = this.ctx.createGain();

      hitOsc.type = 'triangle';
      const baseFreq = 380 + Math.random() * 650;
      hitOsc.frequency.setValueAtTime(baseFreq, hitTime);
      hitOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.4, hitTime + 0.08);

      hitFilter.type = 'bandpass';
      hitFilter.frequency.setValueAtTime(baseFreq * 1.2, hitTime);
      hitFilter.Q.setValueAtTime(4, hitTime);

      const hitVol = (0.2 + Math.random() * 0.3) * intensity;
      hitGain.gain.setValueAtTime(hitVol, hitTime);
      hitGain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.09);

      hitOsc.connect(hitFilter);
      hitFilter.connect(hitGain);
      hitGain.connect(this.ctx.destination);

      hitOsc.start(hitTime);
      hitOsc.stop(hitTime + 0.1);
    }
  }

  // Strike fanfare
  public playStrikeFanfare() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [392, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6
    const startTime = this.ctx.currentTime + 0.2;

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.09);

      gain.gain.setValueAtTime(0.3, startTime + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.09 + (idx === notes.length - 1 ? 0.7 : 0.2));

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(startTime + idx * 0.09);
      osc.stop(startTime + idx * 0.09 + (idx === notes.length - 1 ? 0.75 : 0.25));
    });
  }

  // Spare chime
  public playSpareSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    const startTime = this.ctx.currentTime + 0.1;

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.08);

      gain.gain.setValueAtTime(0.25, startTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(startTime + idx * 0.08);
      osc.stop(startTime + idx * 0.08 + 0.4);
    });
  }

  // Gutter ball sound - dull hollow sliding drop
  public playGutterSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.5);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Correct answer bell
  public playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.08); // A5

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Wrong answer low buzzer
  public playWrong() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.setValueAtTime(130, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Simple UI button click
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(700, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }
}

export const soundManager = new SoundManager();
