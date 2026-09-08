/* =========================================================
   timers.js
   Regras dos dois tipos de timer:
   - "rapido"  -> contagem regressiva em horas/min/seg
   - "projeto" -> contagem até (ou desde) uma data alvo,
                  pensado para coisas que duram meses
   ========================================================= */

/* ---------- Criação ---------- */

function criarTimerRapido(nome, horas, minutos, segundos) {
  const duracaoTotal = (horas * 3600) + (minutos * 60) + segundos;
  const agora = Date.now();
  return {
    id: gerarId(),
    tipo: "rapido",
    nome: nome,
    duracaoTotalSegundos: duracaoTotal,
    terminaEm: agora + duracaoTotal * 1000,
    restantePausado: null, // só usado quando status === "pausado"
    status: "rodando",     // "rodando" | "pausado" | "concluido"
    criadoEm: agora,
  };
}

function criarTimerProjeto(nome, dataAlvoISO, notas) {
  return {
    id: gerarId(),
    tipo: "projeto",
    nome: nome,
    dataAlvo: dataAlvoISO, // string "AAAA-MM-DD"
    notas: notas || "",
    criadoEm: Date.now(),
  };
}

/* ---------- Timers rápidos: tempo restante e controles ---------- */

function obterSegundosRestantes(timer) {
  if (timer.status === "pausado") return timer.restantePausado;
  const restante = Math.round((timer.terminaEm - Date.now()) / 1000);
  return Math.max(restante, 0);
}

function alternarPausaTimerRapido(timer) {
  if (timer.status === "rodando") {
    timer.restantePausado = obterSegundosRestantes(timer);
    timer.status = "pausado";
  } else if (timer.status === "pausado") {
    timer.terminaEm = Date.now() + timer.restantePausado * 1000;
    timer.restantePausado = null;
    timer.status = "rodando";
  }
  return timer;
}

function reiniciarTimerRapido(timer) {
  timer.terminaEm = Date.now() + timer.duracaoTotalSegundos * 1000;
  timer.restantePausado = null;
  timer.status = "rodando";
  return timer;
}

/* ---------- Timers de projeto: diferença de calendário ---------- */

/**
 * Calcula a diferença entre duas datas em anos / meses / dias,
 * de um jeito que bate com o calendário de verdade
 * (não é só "dividir por 30").
 */
function diferencaEmComponentes(de, para) {
  const passou = para < de;
  const inicio = passou ? para : de;
  const fim = passou ? de : para;

  let anos = fim.getFullYear() - inicio.getFullYear();
  let meses = fim.getMonth() - inicio.getMonth();
  let dias = fim.getDate() - inicio.getDate();

  if (dias < 0) {
    meses -= 1;
    const diasNoMesAnterior = new Date(fim.getFullYear(), fim.getMonth(), 0).getDate();
    dias += diasNoMesAnterior;
  }
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  return { anos, meses, dias, passou };
}

function obterDiferencaProjeto(timer) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const alvo = new Date(timer.dataAlvo + "T00:00:00");
  return diferencaEmComponentes(hoje, alvo);
}

/* ---------- Formatação ---------- */

function formatarHMS(totalSegundos) {
  const h = Math.floor(totalSegundos / 3600);
  const m = Math.floor((totalSegundos % 3600) / 60);
  const s = totalSegundos % 60;
  const dois = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${dois(h)}:${dois(m)}:${dois(s)}` : `${dois(m)}:${dois(s)}`;
}

function formatarComponentes({ anos, meses, dias }) {
  const partes = [];
  if (anos > 0) partes.push(`${anos} ano${anos > 1 ? "s" : ""}`);
  if (meses > 0) partes.push(`${meses} ${meses > 1 ? "meses" : "mês"}`);
  if (dias > 0 || partes.length === 0) partes.push(`${dias} dia${dias !== 1 ? "s" : ""}`);
  return partes.join(", ");
}

function formatarTextoProjeto(timer) {
  const diff = obterDiferencaProjeto(timer);
  const texto = formatarComponentes(diff);
  if (diff.anos === 0 && diff.meses === 0 && diff.dias === 0) return "É hoje";
  return diff.passou ? `${texto} atrás` : `faltam ${texto}`;
}
