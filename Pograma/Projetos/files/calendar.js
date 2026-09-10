/* =========================================================
   calendar.js
   Constrói a grade do mês e cuida dos compromissos
   (cada compromisso pertence a uma data "AAAA-MM-DD").
   ========================================================= */

const NOMES_MESES = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

const NOMES_DIAS_SEMANA = [
  "domingo", "segunda-feira", "terça-feira", "quarta-feira",
  "quinta-feira", "sexta-feira", "sábado",
];

// Mês/ano atualmente exibidos no calendário (não precisa ser o mês de hoje)
let calendarioAno = new Date().getFullYear();
let calendarioMes = new Date().getMonth(); // 0 a 11

/* ---------- Utilidades de data ---------- */

function formatarDataISO(dataObj) {
  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
  const dia = String(dataObj.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

function hojeISO() {
  return formatarDataISO(new Date());
}

/* ---------- Compromissos ---------- */

function obterCompromissosPorData(dataISO) {
  return carregarCompromissos()
    .filter((c) => c.data === dataISO)
    .sort((a, b) => (a.hora || "99:99").localeCompare(b.hora || "99:99"));
}

function adicionarCompromisso(dataISO, hora, titulo) {
  const compromissos = carregarCompromissos();
  compromissos.push({
    id: gerarId(),
    data: dataISO,
    hora: hora || "",
    titulo: titulo,
  });
  salvarCompromissos(compromissos);
}

function removerCompromisso(id) {
  const compromissos = carregarCompromissos().filter((c) => c.id !== id);
  salvarCompromissos(compromissos);
}

/* ---------- Navegação de mês ---------- */

function mudarMesCalendario(delta) {
  calendarioMes += delta;
  if (calendarioMes > 11) { calendarioMes = 0; calendarioAno += 1; }
  if (calendarioMes < 0) { calendarioMes = 11; calendarioAno -= 1; }
  renderizarCalendario();
}

/* ---------- Renderização da grade ---------- */

function renderizarCalendario() {
  const titulo = document.getElementById("calendario-mes-ano");
  titulo.textContent = `${NOMES_MESES[calendarioMes]} de ${calendarioAno}`;

  const grid = document.getElementById("calendario-grid");
  grid.innerHTML = "";

  const primeiroDiaDoMes = new Date(calendarioAno, calendarioMes, 1);
  const diaDaSemanaInicial = primeiroDiaDoMes.getDay(); // 0 = domingo
  const totalDiasNoMes = new Date(calendarioAno, calendarioMes + 1, 0).getDate();
  const hoje = hojeISO();

  // Espaços vazios antes do dia 1
  for (let i = 0; i < diaDaSemanaInicial; i++) {
    const vazio = document.createElement("div");
    vazio.className = "calendar-day is-empty";
    grid.appendChild(vazio);
  }

  // Um botão por dia do mês
  for (let dia = 1; dia <= totalDiasNoMes; dia++) {
    const dataISO = formatarDataISO(new Date(calendarioAno, calendarioMes, dia));
    const botaoDia = document.createElement("button");
    botaoDia.className = "calendar-day";
    if (dataISO === hoje) botaoDia.classList.add("is-today");

    const numero = document.createElement("span");
    numero.textContent = dia;
    botaoDia.appendChild(numero);

    if (obterCompromissosPorData(dataISO).length > 0) {
      const ponto = document.createElement("span");
      ponto.className = "calendar-day-dot";
      botaoDia.appendChild(ponto);
    }

    botaoDia.addEventListener("click", () => abrirModalDoDia(dataISO));
    grid.appendChild(botaoDia);
  }
}
