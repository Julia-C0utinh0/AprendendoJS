/* =========================================================
   app.js
   Liga tudo: navegação entre telas, formulários,
   renderização das listas e o loop que atualiza os timers.
   ========================================================= */

let dataDoModalAberto = null; // guarda qual dia está aberto no modal de compromissos

/* =========================================================
   NAVEGAÇÃO ENTRE TELAS
   ========================================================= */

function mostrarView(nomeView) {
  document.querySelectorAll(".view").forEach((el) => el.classList.remove("is-active"));
  document.getElementById(`view-${nomeView}`).classList.add("is-active");

  document.querySelectorAll(".nav-item").forEach((el) => {
    el.classList.toggle("is-active", el.dataset.view === nomeView);
  });

  if (nomeView === "calendario") renderizarCalendario();
  if (nomeView === "timers") renderizarListaTimers();
  if (nomeView === "inicio") renderizarInicio();
}

function configurarNavegacao() {
  document.querySelectorAll(".nav-item").forEach((botao) => {
    botao.addEventListener("click", () => mostrarView(botao.dataset.view));
  });

  document.getElementById("btn-ir-calendario").addEventListener("click", () => mostrarView("calendario"));
  document.getElementById("btn-ir-timers").addEventListener("click", () => mostrarView("timers"));
}

/* =========================================================
   TELA: INÍCIO
   ========================================================= */

function renderizarInicio() {
  const agora = new Date();

  document.getElementById("hoje-dia-semana").textContent = NOMES_DIAS_SEMANA[agora.getDay()];
  document.getElementById("hoje-numero").textContent = agora.getDate();
  document.getElementById("hoje-mes-ano").textContent = `${NOMES_MESES[agora.getMonth()]} de ${agora.getFullYear()}`;

  // Compromissos de hoje
  const listaCompromissos = document.getElementById("lista-compromissos-hoje");
  const compromissosHoje = obterCompromissosPorData(hojeISO());
  listaCompromissos.innerHTML = "";

  if (compromissosHoje.length === 0) {
    listaCompromissos.appendChild(criarItemVazio("Nenhum compromisso marcado para hoje."));
  } else {
    compromissosHoje.forEach((c) => listaCompromissos.appendChild(criarItemCompromisso(c, false)));
  }

  renderizarResumoTimers();
}

function criarItemVazio(texto) {
  const li = document.createElement("li");
  li.textContent = texto;
  li.style.color = "var(--text-ink-dim)";
  li.style.borderBottom = "none";
  return li;
}

function criarItemCompromisso(compromisso, comBotaoExcluir) {
  const li = document.createElement("li");

  const hora = document.createElement("span");
  hora.className = "appointment-time";
  hora.textContent = compromisso.hora || "—";
  li.appendChild(hora);

  const titulo = document.createElement("span");
  titulo.className = "appointment-title";
  titulo.textContent = compromisso.titulo;
  li.appendChild(titulo);

  if (comBotaoExcluir) {
    const botaoExcluir = document.createElement("button");
    botaoExcluir.className = "btn-danger-text";
    botaoExcluir.textContent = "remover";
    botaoExcluir.addEventListener("click", () => {
      removerCompromisso(compromisso.id);
      abrirModalDoDia(dataDoModalAberto);
      renderizarCalendario();
      renderizarInicio();
    });
    li.appendChild(botaoExcluir);
  }

  return li;
}

function renderizarResumoTimers() {
  const lista = document.getElementById("lista-timers-resumo");
  lista.innerHTML = "";

  const timers = carregarTimers();
  const rapidosAtivos = timers.filter((t) => t.tipo === "rapido" && t.status !== "concluido");
  const projetosFuturos = timers
    .filter((t) => t.tipo === "projeto")
    .sort((a, b) => a.dataAlvo.localeCompare(b.dataAlvo))
    .slice(0, 3);

  const itens = [...rapidosAtivos, ...projetosFuturos];

  if (itens.length === 0) {
    lista.appendChild(criarItemVazio("Nenhum timer criado ainda."));
    return;
  }

  itens.forEach((timer) => {
    const li = document.createElement("li");
    const nome = document.createElement("span");
    nome.textContent = timer.nome;

    const valor = document.createElement("span");
    valor.textContent = timer.tipo === "rapido"
      ? formatarHMS(obterSegundosRestantes(timer))
      : formatarTextoProjeto(timer);

    li.appendChild(nome);
    li.appendChild(valor);
    lista.appendChild(li);
  });
}

/* =========================================================
   TELA: NOVO TIMER
   ========================================================= */

function configurarFormularioNovoTimer() {
  const abas = document.querySelectorAll(".tab-btn");
  const formRapido = document.getElementById("form-timer-rapido");
  const formProjeto = document.getElementById("form-timer-projeto");

  abas.forEach((aba) => {
    aba.addEventListener("click", () => {
      abas.forEach((a) => a.classList.toggle("is-active", a === aba));
      const ehRapido = aba.dataset.tipo === "rapido";
      formRapido.classList.toggle("is-hidden", !ehRapido);
      formProjeto.classList.toggle("is-hidden", ehRapido);
    });
  });

  formRapido.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = document.getElementById("rapido-nome").value.trim();
    const horas = Number(document.getElementById("rapido-horas").value) || 0;
    const minutos = Number(document.getElementById("rapido-minutos").value) || 0;
    const segundos = Number(document.getElementById("rapido-segundos").value) || 0;

    if (!nome || (horas === 0 && minutos === 0 && segundos === 0)) return;

    const timers = carregarTimers();
    timers.push(criarTimerRapido(nome, horas, minutos, segundos));
    salvarTimers(timers);

    formRapido.reset();
    document.getElementById("rapido-minutos").value = 5;
    mostrarView("timers");
  });

  formProjeto.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = document.getElementById("projeto-nome").value.trim();
    const data = document.getElementById("projeto-data").value;
    const notas = document.getElementById("projeto-notas").value.trim();

    if (!nome || !data) return;

    const timers = carregarTimers();
    timers.push(criarTimerProjeto(nome, data, notas));
    salvarTimers(timers);

    formProjeto.reset();
    mostrarView("timers");
  });
}

/* =========================================================
   TELA: TODOS OS TIMERS
   ========================================================= */

function renderizarListaTimers() {
  const timers = carregarTimers();
  const rapidos = timers.filter((t) => t.tipo === "rapido");
  const projetos = timers.filter((t) => t.tipo === "projeto").sort((a, b) => a.dataAlvo.localeCompare(b.dataAlvo));

  const listaRapidos = document.getElementById("lista-timers-rapidos");
  const listaProjetos = document.getElementById("lista-timers-projeto");
  listaRapidos.innerHTML = "";
  listaProjetos.innerHTML = "";

  document.getElementById("vazio-timers-rapidos").style.display = rapidos.length ? "none" : "block";
  document.getElementById("vazio-timers-projeto").style.display = projetos.length ? "none" : "block";

  rapidos.forEach((timer) => listaRapidos.appendChild(criarCardTimerRapido(timer)));
  projetos.forEach((timer) => listaProjetos.appendChild(criarCardTimerProjeto(timer)));
}

function criarCardTimerRapido(timer) {
  const restante = obterSegundosRestantes(timer);
  if (restante === 0 && timer.status === "rodando") timer.status = "concluido";

  const li = document.createElement("li");
  li.className = "timer-card";

  const info = document.createElement("div");
  info.className = "timer-card-info";

  const nome = document.createElement("p");
  nome.className = "timer-card-name";
  nome.textContent = timer.nome;
  info.appendChild(nome);

  const sub = document.createElement("p");
  sub.className = "timer-card-sub";
  sub.textContent = timer.status === "concluido" ? "concluído"
    : timer.status === "pausado" ? "pausado"
    : "em andamento";
  info.appendChild(sub);

  const progresso = document.createElement("div");
  progresso.className = "timer-progress";
  const preenchimento = document.createElement("div");
  preenchimento.className = "timer-progress-fill";
  const percentual = timer.duracaoTotalSegundos > 0
    ? Math.max(0, Math.min(100, (restante / timer.duracaoTotalSegundos) * 100))
    : 0;
  preenchimento.style.width = `${percentual}%`;
  progresso.appendChild(preenchimento);
  info.appendChild(progresso);

  li.appendChild(info);

  const valor = document.createElement("span");
  valor.className = "timer-card-value" + (restante <= 10 && restante > 0 ? " is-urgent" : "");
  valor.textContent = formatarHMS(restante);
  li.appendChild(valor);

  const acoes = document.createElement("div");
  acoes.className = "timer-card-actions";

  if (timer.status !== "concluido") {
    const botaoPausar = document.createElement("button");
    botaoPausar.className = "btn-icon";
    botaoPausar.title = timer.status === "pausado" ? "Retomar" : "Pausar";
    botaoPausar.textContent = timer.status === "pausado" ? "▶" : "⏸";
    botaoPausar.addEventListener("click", () => {
      alternarPausaTimerRapido(timer);
      salvarTimers(carregarTimers().map((t) => (t.id === timer.id ? timer : t)));
      renderizarListaTimers();
    });
    acoes.appendChild(botaoPausar);
  }

  const botaoReiniciar = document.createElement("button");
  botaoReiniciar.className = "btn-icon";
  botaoReiniciar.title = "Reiniciar";
  botaoReiniciar.textContent = "↺";
  botaoReiniciar.addEventListener("click", () => {
    reiniciarTimerRapido(timer);
    salvarTimers(carregarTimers().map((t) => (t.id === timer.id ? timer : t)));
    renderizarListaTimers();
  });
  acoes.appendChild(botaoReiniciar);

  const botaoExcluir = document.createElement("button");
  botaoExcluir.className = "btn-danger-text";
  botaoExcluir.textContent = "excluir";
  botaoExcluir.addEventListener("click", () => {
    salvarTimers(carregarTimers().filter((t) => t.id !== timer.id));
    renderizarListaTimers();
  });
  acoes.appendChild(botaoExcluir);

  li.appendChild(acoes);
  return li;
}

function criarCardTimerProjeto(timer) {
  const li = document.createElement("li");
  li.className = "timer-card";

  const info = document.createElement("div");
  info.className = "timer-card-info";

  const nome = document.createElement("p");
  nome.className = "timer-card-name";
  nome.textContent = timer.nome;
  info.appendChild(nome);

  const dataFormatada = new Date(timer.dataAlvo + "T00:00:00");
  const sub = document.createElement("p");
  sub.className = "timer-card-sub";
  sub.textContent = timer.notas
    ? `${timer.notas} · alvo: ${dataFormatada.getDate()} de ${NOMES_MESES[dataFormatada.getMonth()]} de ${dataFormatada.getFullYear()}`
    : `alvo: ${dataFormatada.getDate()} de ${NOMES_MESES[dataFormatada.getMonth()]} de ${dataFormatada.getFullYear()}`;
  info.appendChild(sub);

  li.appendChild(info);

  const valor = document.createElement("span");
  valor.className = "timer-card-value";
  valor.textContent = formatarTextoProjeto(timer);
  li.appendChild(valor);

  const acoes = document.createElement("div");
  acoes.className = "timer-card-actions";
  const botaoExcluir = document.createElement("button");
  botaoExcluir.className = "btn-danger-text";
  botaoExcluir.textContent = "excluir";
  botaoExcluir.addEventListener("click", () => {
    salvarTimers(carregarTimers().filter((t) => t.id !== timer.id));
    renderizarListaTimers();
  });
  acoes.appendChild(botaoExcluir);
  li.appendChild(acoes);

  return li;
}

/* =========================================================
   TELA: CALENDÁRIO + MODAL DE COMPROMISSOS
   ========================================================= */

function configurarCalendario() {
  document.getElementById("btn-mes-anterior").addEventListener("click", () => mudarMesCalendario(-1));
  document.getElementById("btn-mes-seguinte").addEventListener("click", () => mudarMesCalendario(1));
}

function abrirModalDoDia(dataISO) {
  dataDoModalAberto = dataISO;
  const data = new Date(dataISO + "T00:00:00");

  document.getElementById("modal-data-titulo").textContent =
    `${NOMES_DIAS_SEMANA[data.getDay()]}, ${data.getDate()} de ${NOMES_MESES[data.getMonth()]}`;

  const lista = document.getElementById("modal-lista-compromissos");
  lista.innerHTML = "";
  const compromissos = obterCompromissosPorData(dataISO);

  if (compromissos.length === 0) {
    lista.appendChild(criarItemVazio("Nenhum compromisso neste dia."));
  } else {
    compromissos.forEach((c) => lista.appendChild(criarItemCompromisso(c, true)));
  }

  document.getElementById("modal-overlay").classList.add("is-active");
}

function fecharModal() {
  document.getElementById("modal-overlay").classList.remove("is-active");
  document.getElementById("form-novo-compromisso").reset();
  dataDoModalAberto = null;
}

function configurarModal() {
  document.getElementById("modal-fechar").addEventListener("click", fecharModal);

  document.getElementById("modal-overlay").addEventListener("click", (evento) => {
    if (evento.target.id === "modal-overlay") fecharModal();
  });

  document.getElementById("form-novo-compromisso").addEventListener("submit", (evento) => {
    evento.preventDefault();
    const hora = document.getElementById("compromisso-hora").value;
    const titulo = document.getElementById("compromisso-titulo").value.trim();
    if (!titulo || !dataDoModalAberto) return;

    adicionarCompromisso(dataDoModalAberto, hora, titulo);
    document.getElementById("form-novo-compromisso").reset();
    abrirModalDoDia(dataDoModalAberto); // recarrega a lista do dia
    renderizarCalendario();
    renderizarInicio();
  });
}

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  configurarNavegacao();
  configurarFormularioNovoTimer();
  configurarCalendario();
  configurarModal();

  renderizarInicio();
  renderizarCalendario();
  renderizarListaTimers();

  // Atualiza timers rápidos e o resumo da home a cada segundo
  setInterval(() => {
    const viewAtiva = document.querySelector(".view.is-active").id;
    if (viewAtiva === "view-timers") renderizarListaTimers();
    if (viewAtiva === "view-inicio") renderizarResumoTimers();
  }, 1000);
});
