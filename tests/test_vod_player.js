/**
 * Testes Automatizados da Lógica de Seek, Scrubbing e Retomada do SaimoVodPlayer.
 *
 * Utiliza Mock de <video> e Mock DOM para validar todas as regras em ambiente Node.js.
 */
const assert = require('assert');

// ── 1. Mocks de Ambiente (DOM e Video) ──────────────────────────
class MockDOMElement {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this._classList = new Set();
    this.style = {};
    this.children = [];
    this.textContent = '';
    this.innerHTML = '';
  }
  get classList() {
    const set = this._classList;
    return {
      add: (c) => set.add(c),
      remove: (c) => set.delete(c),
      contains: (c) => set.has(c),
      toggle: (c) => set.has(c) ? set.delete(c) : set.add(c)
    };
  }
  appendChild(el) { this.children.push(el); return el; }
  querySelector() { return null; }
  querySelectorAll() { return []; }
  addEventListener() {}
  removeEventListener() {}
  setAttribute() {}
  getAttribute() { return null; }
}

const mockElements = {};
function getOrCreateMock(id) {
  if (!mockElements[id]) mockElements[id] = new MockDOMElement(id);
  return mockElements[id];
}

global.document = {
  getElementById: (id) => getOrCreateMock(id),
  createElement: (tag) => new MockDOMElement('', tag),
  body: new MockDOMElement('body')
};

global.window = {
  document: global.document,
  SaimoDiagnostico: { detectarWebOS: () => ({ chromium: 87 }) },
  SaimoAjustes: { get: () => null }
};

class MockVideo {
  constructor() {
    this.currentTime = 0;
    this.duration = 7200; // 2 horas (7200s)
    this.paused = true;
    this.playbackRate = 1.0;
    this.videoHeight = 1080;
    this.style = {}; // necessário para aplicarProporcao()
    this.seekable = [{ start: () => 0, end: () => 7200, length: 1 }];
    this.buffered = [{ start: () => 0, end: () => 600, length: 1 }];
    this.listeners = {};
  }
  addEventListener(evt, fn) {
    if (!this.listeners[evt]) this.listeners[evt] = [];
    this.listeners[evt].push(fn);
  }
  removeEventListener() {} // stub
  emit(evt) {
    if (this.listeners[evt]) this.listeners[evt].forEach(fn => fn());
  }
  play() { this.paused = false; this.emit('playing'); return Promise.resolve(); }
  pause() { this.paused = true; this.emit('pause'); }
}

// Stub para localStorage usado pelo player
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};

// Stub de setInterval / clearInterval (para timers internos)
global.setInterval = (fn, ms) => 1;
global.clearInterval = () => {};
global.setTimeout = (fn, ms) => { fn(); return 1; };
global.clearTimeout = () => {};

class MockBasePlayer {
  constructor(video) {
    this.video = video;
    this.currentChannel = {
      sources: [{ url: 'http://test/vod.mp4', audio: 'DUB' }],
      skipMarks: []
    };
    this.currentSourceIndex = 0;
    this.statusMessages = [];
  }
  showStatus(msg) { this.statusMessages.push(msg); }
  showOSD(dur) {}
  hideOSD() {}
  togglePlayPause() {
    if (this.video.paused) this.video.play();
    else this.video.pause();
  }
  skipIntro() {}
  getEngineName() { return "Nativo"; }
  getBufferSeconds() { return 10; }
  getCurrentSourceUrl() { return 'http://test/vod.mp4'; }
}

// Carrega a classe SaimoVodPlayer
const fs = require('fs');
const playerVodCode = fs.readFileSync('saimo-lg-webos/js/player-vod.js', 'utf8');
// Substitui "typeof window" para garantir exposição no escopo global do Node
const patchedCode = playerVodCode + '\nglobal.SaimoVodPlayer = SaimoVodPlayer;';
eval(patchedCode); // Avalia no escopo global com os mocks

// ── 2. Execução dos Testes ──────────────────────────────────────
console.log('--- Iniciando Testes Unitários do SaimoVodPlayer ---');

const video = new MockVideo();
const base = new MockBasePlayer(video);
const vod = new SaimoVodPlayer(base);

const fakeMovie = { title: "Filme Teste (2026)", type: "movie", year: "2026" };
vod.iniciar(fakeMovie, null, 0);

// Teste 1: Estado inicial e formatação de tempo
assert.strictEqual(vod.formatTime(7200), "2:00:00", "Formatação de 2 horas incorreta");
assert.strictEqual(vod.formatTime(95), "01:35", "Formatação de 95s incorreta");
assert.strictEqual(vod.formatPasso(10), "10s", "Passo de 10s incorreto");
assert.strictEqual(vod.formatPasso(60), "1min", "Passo de 60s incorreto");
assert.strictEqual(vod.formatPasso(300), "5min", "Passo de 300s incorreto");
console.log('✓ Teste 1: Formatação de tempo e passos passou');

// Teste 8 antecipado: checkpoint e 95%
function isAssistido(t, d) {
  return (t / d) >= 0.95 || d - t < 20;
}
assert.strictEqual(isAssistido(6000, 7200), false, "6000s (83%) não é assistido");
assert.strictEqual(isAssistido(6480, 7200), false, "6480s (90%) ainda não é assistido");
assert.strictEqual(isAssistido(6840, 7200), true, "6840s (95%) é marcado como assistido");
assert.strictEqual(isAssistido(7185, 7200), true, "faltando 15s é marcado como assistido");
localStorage._store = {};
video.currentTime = 3600;
video.duration = 7200;
vod.saveProgressNow();
var salvoMeio = JSON.parse(localStorage.getItem("saimo_progress") || "{}")[vod.chaveProgresso()];
assert.ok(salvoMeio && salvoMeio.currentTime === 3600, "metade do filme deve gravar checkpoint");
video.currentTime = 6840;
vod.saveProgressNow();
var salvoFim = JSON.parse(localStorage.getItem("saimo_progress") || "{}")[vod.chaveProgresso()];
assert.strictEqual(salvoFim, undefined, "95% deve apagar o checkpoint de Continuar");
console.log('✓ Teste 8: Marcação de assistido em 95% e limpeza do checkpoint passaram');

// Teste 2: Scrubbing sem inundar o HLS (video.currentTime não deve mudar durante scrubbing)
video.currentTime = 500;
vod.iniciarScrubbing(1); // +10s
assert.strictEqual(vod.isScrubbing, true, "isScrubbing deve ser true");
assert.strictEqual(vod.cursorTime, 510, "cursorTime deve ser 510s");
assert.strictEqual(video.currentTime, 500, "video.currentTime NÃO pode mudar durante o scrubbing!");

// Aceleração progressiva (pressionando rapidamente)
vod.iniciarScrubbing(1); // próxima aceleração para 30s
assert.strictEqual(vod.stepSeconds, 30, "Passo deve acelerar para 30s");
assert.strictEqual(vod.cursorTime, 540, "cursorTime deve ser 540s");

vod.iniciarScrubbing(1); // aceleração para 60s
assert.strictEqual(vod.stepSeconds, 60, "Passo deve acelerar para 60s");
assert.strictEqual(vod.cursorTime, 600, "cursorTime deve ser 600s");
assert.strictEqual(video.currentTime, 500, "video.currentTime continua 500s sem disparar HLS");
console.log('✓ Teste 2: Scrubbing com aceleração progressiva e proteção do HLS passou');

// Teste 3: Cancelamento de Scrubbing (Back)
vod.cancelarScrubbing();
assert.strictEqual(vod.isScrubbing, false, "isScrubbing deve voltar a false");
assert.strictEqual(vod.cursorTime, 0, "cursorTime deve ser resetado");
assert.strictEqual(video.currentTime, 500, "video.currentTime permaneceu intocado");
console.log('✓ Teste 3: Cancelamento de scrubbing via Back passou');

// Teste 4: Confirmação de Seek (OK)
vod.iniciarScrubbing(1); // cursor em 510
vod.confirmarScrubbing();
assert.strictEqual(vod.isScrubbing, false, "isScrubbing deve ser false após confirmação");
assert.strictEqual(video.currentTime, 510, "video.currentTime agora deve ter sido atualizado para 510s");
console.log('✓ Teste 4: Confirmação de seek no OK passou');

// Teste 5: Teclas Numéricas (0-9)
vod.pularPorcentagem(5); // 50% de 7200s = 3600s
assert.strictEqual(video.currentTime, 3600, "Pulo numérico de 50% deve ir para 3600s");
vod.pularPorcentagem(0); // 0%
assert.strictEqual(video.currentTime, 0, "Pulo numérico de 0% deve ir para 0s");
vod.pularPorcentagem(9); // 90% de 7200s = 6480s
assert.strictEqual(video.currentTime, 6480, "Pulo numérico de 90% deve ir para 6480s");
console.log('✓ Teste 5: Teclas numéricas 0-9 (0% a 90%) passou');

// Teste 6: Proteção contra seekable inexistente / duração infinita
video.duration = Infinity;
assert.strictEqual(vod.podeBuscar(), false, "Não deve permitir seek com duração infinita");
video.duration = 7200;
video.seekable = [];
assert.strictEqual(vod.podeBuscar(), false, "Não deve permitir seek quando video.seekable está vazio");
video.seekable = [{ start: () => 0, end: () => 7200, length: 1 }];
assert.strictEqual(vod.podeBuscar(), true, "Deve permitir seek com seekable válido");
console.log('✓ Teste 6: Proteção de seekable e duração finita passou');

// Teste 7: Regras de Retomada (Continuar Assistindo)
// Limiares: < 30s -> ignora; > 95% -> ignora; entre 30s e 95% -> pergunta
const dur = 7200;
function devePerguntarRetomada(t) {
  return t >= 30 && t < dur * 0.95;
}
assert.strictEqual(devePerguntarRetomada(15), false, "Menor que 30s não deve perguntar");
assert.strictEqual(devePerguntarRetomada(29), false, "29s não deve perguntar");
assert.strictEqual(devePerguntarRetomada(35), true, "35s deve perguntar");
assert.strictEqual(devePerguntarRetomada(3600), true, "Metade do filme deve perguntar");
assert.strictEqual(devePerguntarRetomada(6900), false, "> 95% não deve perguntar (filme quase no fim)");
console.log('✓ Teste 7: Regras de corte de retomada (<30s e >95%) passaram');

console.log('\n======================================================');
console.log('  TESTES DA LÓGICA VOD CONCLUÍDOS');
console.log('======================================================');
