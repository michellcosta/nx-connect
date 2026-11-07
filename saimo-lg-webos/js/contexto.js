"use strict";

/**
 * OK longo → menu de contexto (favoritar, fontes, etc.).
 * O app registra callbacks via SaimoContexto.ligar(api).
 */
var SaimoContexto = {
  MS: 800,
  _api: null,
  _timer: null,
  _longFired: false,
  _aguardando: false,

  ligar: function ligar(api) {
    this._api = api || null;
  },

  cancelar: function cancelar() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    this._aguardando = false;
    this._longFired = false;
  },

  podeOkLongo: function podeOkLongo() {
    if (!this._api || !this._api.podeOkLongo) return false;
    if (this._api.telaModal && this._api.telaModal()) return false;
    return !!this._api.podeOkLongo();
  },

  onOkDown: function onOkDown(e) {
    if (!this.podeOkLongo() || e.repeat) return false;
    var self = this;
    this._aguardando = true;
    this._longFired = false;
    this._timer = setTimeout(function () {
      self._timer = null;
      self._longFired = true;
      self.abrir();
    }, this.MS);
    return true;
  },

  onOkUp: function onOkUp(e) {
    var code = e.keyCode || e.which;
    if (code !== 13 || !this._aguardando) return false;
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    var longo = this._longFired;
    this._aguardando = false;
    this._longFired = false;
    if (longo) return true;
    if (this._api && this._api.okCurto) this._api.okCurto();
    return true;
  },

  abrir: function abrir() {
    if (!this._api || !this._api.montarMenu) return;
    var pack = this._api.montarMenu();
    if (!pack || !pack.items || !pack.items.length) return;
    if (this._api.abrirModal) this._api.abrirModal(pack.title || "Opções", pack.items);
  }
};

window.SaimoContexto = SaimoContexto;
