/* =========================================================
   storage.js
   Tudo relacionado a salvar/ler dados fica neste arquivo.
   Se um dia quiser trocar localStorage por outra coisa
   (ex: um servidor), só precisa mexer aqui.
   ========================================================= */

const STORAGE_KEYS = {
  TIMERS: "painel_timers",
  COMPROMISSOS: "painel_compromissos",
};

/**
 * Lê uma lista salva no localStorage.
 * Se não existir nada ainda, devolve uma lista vazia.
 */
function lerLista(chave) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : [];
  } catch (erro) {
    console.error("Erro ao ler storage:", erro);
    return [];
  }
}

/**
 * Salva uma lista no localStorage.
 */
function salvarLista(chave, lista) {
  try {
    localStorage.setItem(chave, JSON.stringify(lista));
  } catch (erro) {
    console.error("Erro ao salvar storage:", erro);
  }
}

/* ---------- Timers ---------- */

function carregarTimers() {
  return lerLista(STORAGE_KEYS.TIMERS);
}

function salvarTimers(timers) {
  salvarLista(STORAGE_KEYS.TIMERS, timers);
}

/* ---------- Compromissos ---------- */

function carregarCompromissos() {
  return lerLista(STORAGE_KEYS.COMPROMISSOS);
}

function salvarCompromissos(compromissos) {
  salvarLista(STORAGE_KEYS.COMPROMISSOS, compromissos);
}

/**
 * Gera um id simples e único o bastante para este app.
 */
function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
