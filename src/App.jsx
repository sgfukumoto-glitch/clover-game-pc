import { useState, useEffect, useRef, useCallback, useMemo } from "react";


const TOUCAN_URL = "/toucan.png";

const T = {
  ja: {
    title: "🍀 CLOVER™️", subtitle: "♣ NUMBER CARD GAME ♣",
    best: "🏆 ベスト", sec: "秒", reset: "リセット", resetConfirm: "ベストタイムをリセットしますか？",
    howToPlay: "やり方を学ぶ 📖", start: "スタート 🃏",
    desc: (<>52枚の山からカードを引いて<br/><span style={{ color: "#60a5fa", fontWeight: "bold" }}>①②③④⑤</span> に書かれた数字を四則計算で繋げて並び替えて <span style={{ color: "#ef4444", fontWeight: "bold" }}>⑥</span> の数字(target)にしよう！！<br/>タイムを競うカードゲームだよ！</>),
    toBeHappy: "to be happy... 🍀", tutHint1: "📖 ピンク→チュートリアルで試し遊び！", tutHint2: "🃏 黄色字→本番スタート！",
    by: "by NPO法人 Foster Partner®️", back: "← 戻る", surrender: "降参 →", surrenderTitle: "解答例", surrenderSub: "こんな解き方があったよ！", surrenderNext: "次の問題へ 🃏", tut4surrender: "わからなくて解答を知りたい場合は「降参」ボタンを押すよ。",
    tutBanner: "チュートリアル中 🩷", backToTitle: "タイトルへ戻る", next: "次へ →",
    tut1: "👆 スタートと同時にタイムが動き出すよ！⏱",
    target: "⑥ TARGET",
    tut2: "これが⑥ターゲット！この数字を答えにするのが目標だよ！",
    tut3: "①②③④⑤の5枚！この数字を並べ替えて四則計算記号(+-×÷)で繋いでターゲットの数字にするよ",
    tut3b: "記号(+-×÷)は何度使ってもいいよ",
    tut4: "出来たら「フォスパ」と言って、👈のボタンを押すよ。わからない時は「降参」ボタン👆を押すよ",
    fospa: "フォスパ！🙋", dealing: "カードを配っています…",
    fospaTime: "フォスパ！ ⏱", tutBanner2: "チュートリアル中 🩷", backOk: "解き直したい時は戻れるよ",
    tut5: <>このように、数字と演算記号を組み合わせて解答していくよ！<br/>出来たら「答え合わせ」を押してね</>,
    tut6: <>式が入力されたよ！👇の「答え合わせ」ボタンを押してね。</>,
    exprPlaceholder: "ここに式が入るよ", check: "答え合わせ！", retry: "やり直す",
    errAll: "①〜⑤の数字を各1回ずつ全部使ってね！", errExpr: "式が正しくないよ。確認してね。",
    correct: (t) => `正解！= ${t} 🍀`, wrong: (v) => `その式は ${v} になるよ`,
    tutComplete: <>チュートリアル完了！🎉</>, correct2: "せいかい！🍬",
    tutResult1: "⬆️ はクリアしたタイムだよ！本番では記録が出るたびに更新されるよ🏆",
    tutResult2: <>やり方はわかったかな？さぁいよいよチャレンジだ👇</>,
    nextGame: "次の問題へ 🃏（本番！）", about: "🍀 CLOVER™️について読む",
    newRecord: "🎉 新記録！ 🎉", currentBest: "🏆 ただ今のベスト：",
    nextGame2: "次の問題へ 🃏", toTitle: "タイトルへ",
    aboutTitle: "🍀 CLOVER™️について",
    about1title: "🏢 監修", about1: <><strong style={{ color: "white" }}>NPO法人 Foster Partner®️</strong>が監修して作ったゲームアプリです。</>,
    about2title: "📖 誕生の背景", about2: <>以前、似たロジックのカードゲームが世にありましたが、今はどこにも販売されていません。<br/>その寂しさから、ロジックを逆算してデジタル版として<strong style={{ color: "white" }}>CLOVER™️</strong>を組み立てました！</>,
    about3title: "👨‍👩‍👧‍👦 こんな人に", about3: <>四則計算ができれば<strong style={{ color: "white" }}>小学3年生(?)から</strong>プレイ可能！<br/>大人だから強いとも言えないので、子どもから大人まで本気で勝負できます。<br/><br/>家族が揃っているのにやることない…そんな時に！<br/><span style={{ color: "#fbbf24" }}>・在宅勤務でおうち時間が増えた</span><br/><span style={{ color: "#fbbf24" }}>・祖父母と孫でボケ防止にも笑</span><br/><span style={{ color: "#fbbf24", fontWeight: "bold" }}>・家族全員が本気で競える！</span></>,
    about4title: "🍀 CLOVERの由来", about4: <>四葉のクローバー → 幸せを呼ぶ → 一見困難でも、工夫すれば（並び変えて四則計算で組むことで）答えを導き出せるかもしれない、という意味を込めました！<br/><br/><strong style={{ color: "#fbbf24", fontSize: "18px" }}>※C<span style={{ color: "#ef4444" }}>LOVE</span>R™️の中には「LOVE（愛）」があるのがまたポイント笑</strong></>,
  },
  en: {
    title: "🍀 CLOVER™️", subtitle: "♣ NUMBER CARD GAME ♣",
    best: "🏆 Best", sec: "s", reset: "Reset", resetConfirm: "Reset your best time?",
    howToPlay: "How to Play 📖", start: "Start 🃏",
    desc: (<>Draw cards from a 52-card deck!<br/>Use <span style={{ color: "#60a5fa", fontWeight: "bold" }}>①②③④⑤</span> with arithmetic operations to reach the <span style={{ color: "#ef4444", fontWeight: "bold" }}>⑥</span> target number!<br/>Race against the clock!</>),
    toBeHappy: "to be happy... 🍀", tutHint1: "📖 Pink → Try the tutorial first!", tutHint2: "🃏 Yellow → Start the real game!",
    by: "by NPO Foster Partner®️", back: "← Back", surrender: "Skip →", surrenderTitle: "Answer", surrenderSub: "Here's one way to solve it!", surrenderNext: "Next Game 🃏", tut4surrender: "If you're stuck and want to see the answer, press the \"Skip\" button.",
    tutBanner: "Tutorial 🩷", backToTitle: "Back to Title", next: "Next →",
    tut1: "👆 The timer starts as soon as the game begins！⏱",
    target: "⑥ TARGET",
    tut2: "👆 This is the ⑥ Target! Your goal is to make this number!",
    tut3: "These are the 5 cards ①②③④⑤! Rearrange them with arithmetic operators(+-×÷) to reach the target!",
    tut3b: "You can use operators as many times as you like!",
    tut4: "When you're ready, shout \"Fospa!\" and press 👈 the button! If you're stuck, press the \"Skip\" button 👆",
    fospa: "Fospa！🙋", dealing: "Dealing cards…",
    fospaTime: "Fospa！ ⏱", tutBanner2: "Tutorial 🩷", backOk: "You can go back to rethink!",
    tut5: <>Combine numbers and operators like this to build your answer!<br/>Then press "Check Answer"!</>,
    tut6: <>Expression entered! 👇 Press "Check Answer"!</>,
    exprPlaceholder: "Your expression goes here", check: "Check Answer！", retry: "Try Again",
    errAll: "Use each of ①~⑤ exactly once!", errExpr: "Invalid expression. Please check!",
    correct: (t) => `Correct！= ${t} 🍀`, wrong: (v) => `That equals ${v}`,
    tutComplete: <>Tutorial Complete！🎉</>, correct2: "Correct！🍬",
    tutResult1: "⬆️ That's your clear time! In the real game, your best is saved！🏆",
    tutResult2: <>Got the hang of it？ Now it's time to play for real！👇</>,
    nextGame: "Next Game 🃏 (Real!)", about: "🍀 About CLOVER™️",
    newRecord: "🎉 New Record！ 🎉", currentBest: "🏆 Current Best：",
    nextGame2: "Next Game 🃏", toTitle: "Title",
    aboutTitle: "🍀 About CLOVER™️",
    about1title: "🏢 Supervised By", about1: <>This app was created under the supervision of <strong style={{ color: "white" }}>NPO Foster Partner®️</strong>.</>,
    about2title: "📖 The Story Behind It", about2: <>There used to be a card game with similar logic, but it disappeared from stores. Out of nostalgia, we reverse-engineered the logic and rebuilt it digitally as <strong style={{ color: "white" }}>CLOVER™️</strong>!</>,
    about3title: "👨‍👩‍👧‍👦 Who Is It For?", about3: <>Anyone who can do basic arithmetic — <strong style={{ color: "white" }}>from about 3rd grade</strong> and up!<br/>Adults don't necessarily have the advantage, so the whole family can compete for real.<br/><br/>Perfect for when the family is home but bored！<br/><span style={{ color: "#fbbf24" }}>・Working from home? Great indoor activity!</span><br/><span style={{ color: "#fbbf24" }}>・Grandparents vs grandkids — great for the brain!</span><br/><span style={{ color: "#fbbf24", fontWeight: "bold" }}>・The whole family competing for real！</span></>,
    about4title: "The Name CLOVER", about4: "CLOVER has LOVE right in the name!",
  },
  pt: {
    title: "🍀 CLOVER™️", subtitle: "♣ JOGO DE CARTAS NUMERICO ♣",
    best: "🏆 Melhor", sec: "s", reset: "Resetar", resetConfirm: "Resetar seu melhor tempo?",
    howToPlay: "Como Jogar 📖", start: "Iniciar 🃏",
    desc: "Tire cartas de um baralho de 52! Use ①②③④⑤ com operacoes aritmeticas para chegar ao numero ⑥ alvo! Compita contra o relogio!",
    toBeHappy: "to be happy... 🍀", tutHint1: "📖 Rosa - Tente o tutorial primeiro!", tutHint2: "🃏 Amarelo - Iniciar o jogo de verdade!",
    by: "by NPO Foster Partner", back: "Voltar", surrender: "Pular", surrenderTitle: "Resposta", surrenderSub: "Uma forma de resolver!", surrenderNext: "Proximo Jogo 🃏", tut4surrender: "Se travar e quiser ver a resposta, pressione o botao Pular.",
    tutBanner: "Tutorial 🩷", backToTitle: "Voltar ao Inicio", next: "Proximo",
    tut1: "O cronometro comeca assim que o jogo inicia! ⏱",
    target: "⑥ ALVO",
    tut2: "Este e o ⑥ Alvo! Seu objetivo e chegar neste numero!",
    tut3: "Estas sao as 5 cartas ①②③④⑤! Reorganize-as com operadores aritmeticos para chegar ao alvo!",
    tut3b: "Voce pode usar operadores quantas vezes quiser!",
    tut4: "Quando estiver pronto, grite Fospa! e pressione o botao! Se travar, pressione Pular.",
    fospa: "Fospa! 🙋", dealing: "Distribuindo cartas...",
    fospaTime: "Fospa! ⏱", tutBanner2: "Tutorial 🩷", backOk: "Voce pode voltar para repensar!",
    tut5: "Combine numeros e operadores assim para construir sua resposta! Depois pressione Verificar Resposta!",
    tut6: "Expressao inserida! Pressione Verificar Resposta!",
    exprPlaceholder: "Sua expressao vai aqui", check: "Verificar Resposta!", retry: "Tentar de Novo",
    errAll: "Use cada um de ①~⑤ exatamente uma vez!", errExpr: "Expressao invalida. Por favor verifique!",
    correct: (t) => "Correto! = " + t + " 🍀", wrong: (v) => "Isso e igual a " + v,
    tutComplete: "Tutorial Completo! 🎉", correct2: "Correto! 🍬",
    tutResult1: "Esse e o seu tempo! No jogo real, seu melhor e salvo! 🏆",
    tutResult2: "Pegou o jeito? Agora e hora de jogar de verdade!",
    nextGame: "Proximo Jogo 🃏 (Real!)", about: "🍀 Sobre o CLOVER",
    newRecord: "🎉 Novo Recorde! 🎉", currentBest: "🏆 Melhor Atual:",
    nextGame2: "Proximo Jogo 🃏", toTitle: "Inicio",
    aboutTitle: "🍀 Sobre o CLOVER",
    about1title: "Supervisionado Por", about1: "Este app foi criado sob supervisao da NPO Foster Partner.",
    about2title: "A Historia Por Tras", about2: "Havia um jogo de cartas com logica similar, mas desapareceu das lojas. Com saudade, revertemos a logica e reconstruimos digitalmente como CLOVER!",
    about3title: "Para Quem E?", about3: "Qualquer um que saiba aritmetica basica - a partir do 3 ano em diante! Adultos nao tem necessariamente vantagem, entao toda a familia pode competir de verdade.",
    about4title: "O Nome CLOVER", about4: "Trevo de quatro folhas - traz felicidade - mesmo algo que parece dificil pode ter solucao se voce reorganizar! CLOVER tem LOVE (amor) bem no nome! :)",
  },
};

function buildDeck() {
  const deck = [];
  for (let n = 1; n <= 10; n++) for (let i = 0; i < 3; i++) deck.push(n);
  for (let n = 11; n <= 17; n++) for (let i = 0; i < 2; i++) deck.push(n);
  for (let n = 18; n <= 25; n++) deck.push(n);
  return deck;
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function findSolution(nums, target) {
  const ops = ["+", "-", "*", "/"];
  const opSymbols = { "+": "+", "-": "-", "*": "×", "/": "÷" };
  function perms(arr) {
    if (arr.length <= 1) return [arr];
    const r = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const p of perms(rest)) r.push([arr[i], ...p]);
    }
    return r;
  }
  function opCombos(n) {
    if (n === 0) return [[]];
    const r = [];
    for (const op of ops) for (const rest of opCombos(n - 1)) r.push([op, ...rest]);
    return r;
  }
  function evaluate(vals, operators) {
    let result = vals[0];
    for (let i = 0; i < operators.length; i++) {
      const v = vals[i + 1];
      if (operators[i] === "+") result += v;
      else if (operators[i] === "-") result -= v;
      else if (operators[i] === "*") result *= v;
      else { if (v === 0) return null; result /= v; }
    }
    return result;
  }
  for (const perm of perms(nums))
    for (const combo of opCombos(4)) {
      const val = evaluate(perm, combo);
      if (val !== null && Math.abs(val - target) < 0.0001) {
        const expr = perm.map((n, i) => i === 0 ? n : `${opSymbols[combo[i-1]]} ${n}`).join(" ");
        return expr;
      }
    }
  return null;
}

function findSolutionSteps(nums, target) {
  const ops = ["+", "-", "*", "/"];
  const opSymbols = { "+": "+", "-": "-", "*": "×", "/": "÷" };
  function perms(arr) {
    if (arr.length <= 1) return [arr];
    const r = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const p of perms(rest)) r.push([arr[i], ...p]);
    }
    return r;
  }
  function opCombos(n) {
    if (n === 0) return [[]];
    const r = [];
    for (const op of ops) for (const rest of opCombos(n - 1)) r.push([op, ...rest]);
    return r;
  }
  function evaluate(vals, operators) {
    let result = vals[0];
    for (let i = 0; i < operators.length; i++) {
      const v = vals[i + 1];
      if (operators[i] === "+") result += v;
      else if (operators[i] === "-") result -= v;
      else if (operators[i] === "*") result *= v;
      else { if (v === 0) return null; result /= v; }
    }
    return result;
  }
  for (const perm of perms(nums))
    for (const combo of opCombos(4)) {
      const val = evaluate(perm, combo);
      if (val !== null && Math.abs(val - target) < 0.0001) {
        const steps = [];
        let current = perm[0];
        for (let i = 0; i < combo.length; i++) {
          const next = perm[i + 1];
          const sym = opSymbols[combo[i]];
          let result;
          if (combo[i] === "+") result = current + next;
          else if (combo[i] === "-") result = current - next;
          else if (combo[i] === "*") result = current * next;
          else result = current / next;
          const resultDisplay = Number.isInteger(result) ? result : Math.round(result * 100) / 100;
          steps.push({ left: current, op: sym, right: next, result: resultDisplay });
          current = result;
        }
        return steps;
      }
    }
  return null;
}

function canSolve(nums, target) {
  const ops = ["+", "-", "*", "/"];
  function perms(arr) {
    if (arr.length <= 1) return [arr];
    const r = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      for (const p of perms(rest)) r.push([arr[i], ...p]);
    }
    return r;
  }
  function opCombos(n) {
    if (n === 0) return [[]];
    const r = [];
    for (const op of ops) for (const rest of opCombos(n - 1)) r.push([op, ...rest]);
    return r;
  }
  function evaluate(vals, operators) {
    let result = vals[0];
    for (let i = 0; i < operators.length; i++) {
      const v = vals[i + 1];
      if (operators[i] === "+") result += v;
      else if (operators[i] === "-") result -= v;
      else if (operators[i] === "*") result *= v;
      else { if (v === 0) return null; result /= v; }
    }
    return result;
  }
  for (const perm of perms(nums))
    for (const combo of opCombos(4)) {
      const val = evaluate(perm, combo);
      if (val !== null && Math.abs(val - target) < 0.0001) return true;
    }
  return false;
}
function drawCards() {
  for (let i = 0; i < 500; i++) {
    const deck = shuffle(buildDeck());
    const target = deck[0];
    const nums = deck.slice(1, 6);
    if (canSolve(nums, target)) return { target, nums };
  }
  return { target: 10, nums: [1, 2, 3, 4, 5] };
}

function validateExpression(expr, nums, target, t) {
  const tokens = expr.replace(/[+\-*/()]/g, " ").trim().split(/\s+/).filter(Boolean);
  const usedNums = tokens.map(Number).filter(n => !isNaN(n));
  const sortedUsed = [...usedNums].sort((a, b) => a - b);
  const sortedNums = [...nums].sort((a, b) => a - b);
  if (JSON.stringify(sortedUsed) !== JSON.stringify(sortedNums))
    return { ok: false, msg: t.errAll };
  try {
    const safe = expr.replace(/[^0-9+\-*/().]/g, "");
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + safe + ")")();
    if (Math.abs(result - target) < 0.0001) return { ok: true, msg: t.correct(target) };
    return { ok: false, msg: t.wrong(Number(result.toFixed(4))) };
  } catch { return { ok: false, msg: t.errExpr }; }
}

const TUTORIAL_CARDS = { target: 18, nums: [1, 17, 5, 2, 6] };

function CloverSVG({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 112" style={{ display: "block", overflow: "visible" }}>
      <line x1="50" y1="54" x2="36" y2="108" stroke="#3a9a3a" strokeWidth="5" strokeLinecap="round"/>
      {[0, 90, 180, 270].map(deg => (
        <g key={deg} transform={`rotate(${deg} 50 50)`}>
          <path d="M50,50 C50,50 30,38 30,22 C30,12 42,8 50,18 C58,8 70,12 70,22 C70,38 50,50 50,50Z"
            fill="#e8f8e8" stroke="#3a9a3a" strokeWidth="2.5" />
        </g>
      ))}
      <circle cx="50" cy="50" r="5" fill="#3a9a3a"/>
      <text x="50" y="24" textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="900" fill="#111" fontFamily="Arial,sans-serif" stroke="white" strokeWidth="5" paintOrder="stroke">＋</text>
      <text x="76" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="18" fontWeight="900" fill="#111" fontFamily="Arial,sans-serif" stroke="white" strokeWidth="5" paintOrder="stroke">÷</text>
      <text x="50" y="76" textAnchor="middle" dominantBaseline="middle" fontSize="22" fontWeight="900" fill="#111" fontFamily="Arial,sans-serif" stroke="white" strokeWidth="5" paintOrder="stroke">－</text>
      <text x="24" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20" fontWeight="900" fill="#111" fontFamily="Arial,sans-serif" stroke="white" strokeWidth="5" paintOrder="stroke">×</text>
      <text x="98" y="110" textAnchor="end" fontSize="8" fontWeight="bold" fill="#3a9a3a" fontStyle="italic" fontFamily="Georgia,serif">to be happy…</text>
    </svg>
  );
}

function CloverCard({ number, isTarget = false, size = "normal" }) {
  const d = {
    large:   { w: 300, h: 435, numSz: 150, svgSz: 240, r: 32, bw: 8 },
    normal:  { w: 230, h: 338, numSz: 112, svgSz: 170, r: 28, bw: 6 },
    small:   { w: 174, h: 275, numSz: 88,  svgSz: 145, r: 22, bw: 6 },
    xsmall:  { w: 154, h: 244, numSz: 72,  svgSz: 115, r: 18, bw: 5 },
    normal7: { w: 161, h: 237, numSz: 78,  svgSz: 119, r: 20, bw: 4 },
    small7:  { w: 122, h: 193, numSz: 62,  svgSz: 102, r: 15, bw: 4 },
    xsmall7: { w: 108, h: 171, numSz: 50,  svgSz:  81, r: 13, bw: 3 },
  }[size];
  return (
    <div style={{
      width: d.w, height: d.h, borderRadius: d.r, background: "white",
      border: `${d.bw}px solid ${isTarget ? "#ef4444" : "#f97316"}`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between",
      padding: "8px 4px 3px", boxSizing: "border-box",
      boxShadow: "0 3px 14px rgba(0,0,0,0.45)", flexShrink: 0,
    }}>
      <div style={{ fontSize: d.numSz, fontWeight: "900", color: "#111", lineHeight: 1, fontFamily: "Georgia,serif" }}>{number}</div>
      <CloverSVG size={d.svgSz} />
    </div>
  );
}

function CardBack({ size = "normal", lang = "ja" }) {
  const d = {
    large:  { w: 110, h: 160, r: 12, fs: 35 },
    normal: { w: 85,  h: 123, r: 11, fs: 28 },
    small:  { w: 63,  h: 90,  r: 9,  fs: 20 },
    xsmall: { w: 50,  h: 73,  r: 7,  fs: 15 },
  }[size];
  return (
    <div style={{
      width: d.w, height: d.h, borderRadius: d.r,
      background: "linear-gradient(160deg,#1a3a22,#0d2414)",
      border: "2px solid #4ade8033",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: d.fs, flexShrink: 0, boxShadow: "0 3px 14px rgba(0,0,0,0.45)",
      overflow: "hidden",
    }}>
      {lang === "pt"
        ? <img src={TOUCAN_URL} alt="🍀" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        : "🍀"}
    </div>
  );
}

function TutorialBubble({ text }) {
  return (
    <div style={{
      background: "#ff69b4", color: "white", borderRadius: "14px", padding: "20px 24px",
      fontSize: "20px", fontWeight: "bold", lineHeight: "1.6", margin: "12px 0",
      boxShadow: "0 4px 20px rgba(255,105,180,0.5)", border: "2px solid #ff1493",
      animation: "pulse-pink 2s infinite",
    }}>
      {text}
    </div>
  );
}

function AnimatedExprDemo({ nums, onUsedIdxsChange, onDone }) {
  const sequence = [
    { type: "num", idx: 0, val: String(nums[0]) },
    { type: "op", val: "*" },
    { type: "op", val: "(" },
    { type: "num", idx: 3, val: String(nums[3]) },
    { type: "op", val: "+" },
    { type: "num", idx: 2, val: String(nums[2]) },
    { type: "op", val: ")" },
    { type: "op", val: "+" },
    { type: "num", idx: 1, val: String(nums[1]) },
    { type: "op", val: "-" },
    { type: "num", idx: 4, val: String(nums[4]) },
  ];
  const FINAL_EXPR = `${nums[0]}*(${nums[3]}+${nums[2]})+${nums[1]}-${nums[4]}`;
  const [started, setStarted] = useState(false);
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const usedIdxs = sequence.slice(0, shown).filter(s => s.type === "num").map(s => s.idx);
  const displayStr = sequence.slice(0, shown).map(s => s.val).join("").replace(/\*/g, "×");
  useEffect(() => { onUsedIdxsChange(usedIdxs); }, [shown]);
  useEffect(() => { const t = setTimeout(() => setStarted(true), 3000); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!started) return;
    if (shown < sequence.length) { const t = setTimeout(() => setShown(s => s + 1), 700); return () => clearTimeout(t); }
    else if (!done) { const t = setTimeout(() => { setDone(true); onDone(FINAL_EXPR); }, 600); return () => clearTimeout(t); }
  }, [started, shown, done]);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{
        background: "#ff69b4", color: "white", borderRadius: "14px", padding: "16px",
        fontSize: "20px", fontWeight: "bold", lineHeight: "1.6", margin: "12px 0",
        border: "2px solid #ff1493", animation: "pulse-pink 2s infinite",
      }}>
        このように、数字と演算記号を組み合わせて解答していくよ！<br/>出来たら「答え合わせ」を押してね
      </div>
      <div style={{
        background: "#111f14", border: "2px solid #4ade8033", borderRadius: "14px", padding: "16px",
        fontSize: "36px", fontFamily: "monospace", fontWeight: "bold", color: "white",
        textAlign: "center", minHeight: "60px", wordBreak: "break-all",
      }}>
        {displayStr || <span style={{ color: "#2a4a2a", fontSize: "16px" }}>3秒後にデモが始まるよ…</span>}
        {started && !done && <span style={{ animation: "blink 0.8s infinite" }}>|</span>}
      </div>
    </div>
  );
}

// ハープグリッサンド✨効果音（リセット用）
function playKyuririn() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const now = ctx.currentTime;
    const baseFreq = 1046.50; // C6（ド）
    const totalNotes = 32;
    const totalDur = 1.5;
    const step = totalDur / totalNotes;
    for (let i = 0; i < totalNotes; i++) {
      const t = now + i * step;
      const ratio = Math.pow(16, i / (totalNotes - 1));
      const freq = baseFreq * ratio;
      const noteDur = step * 3.0;
      const isEnding = i >= totalNotes - 6;
      const endBoost = isEnding ? 1.0 + (i - (totalNotes - 6)) * 0.25 : 1.0;
      [1, 2, 3].forEach((harmonic) => {
        const o = ctx.createOscillator(); const g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = "sine";
        o.frequency.setValueAtTime(freq * harmonic, t);
        g.gain.setValueAtTime(0.0, t);
        g.gain.linearRampToValueAtTime((0.15 / harmonic) * endBoost, t + 0.006);
        g.gain.exponentialRampToValueAtTime(0.001, t + noteDur * (isEnding ? 1.6 : 1.0));
        o.start(t); o.stop(t + noteDur * 1.8);
      });
    }
  } catch(e) {}
}

export default function App() {
  const [phase, setPhase] = useState("start");
  const [lang, setLang] = useState("ja");
  const t = T[lang];
  const isMobile = window.innerWidth < 1024;
  const [cards, setCards] = useState(null);
  const [revealedCount, setRevealedCount] = useState(-1);
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [expr, setExpr] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [bestTime, setBestTime] = useState(() => {
    try { const s = localStorage.getItem("clover_best_pc"); return s ? Number(s) : null; } catch { return null; }
  });
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [isTutorial, setIsTutorial] = useState(false);
  const [tutStep, setTutStep] = useState(0);
  const [usedNums, setUsedNums] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [dealtCount, setDealtCount] = useState(0);
  const [allRevealed, setAllRevealed] = useState(false);
  const [exprTokens, setExprTokens] = useState([]);
  const timerRef = useRef(null);
  const dealingTimeoutsRef = useRef([]);

  const startGame = useCallback((tutorial = false) => {
    dealingTimeoutsRef.current.forEach(id => clearTimeout(id));
    dealingTimeoutsRef.current = [];
    setIsTutorial(tutorial); setTutStep(0); setPhase("dealing"); setCountdown(null);
    setExpr(""); setFeedback(null); setUsedNums([]); setExprTokens([]);
    setTime(0); setRunning(false); setRevealedCount(-1); setDealtCount(0); setAllRevealed(false);
    const drawn = tutorial ? TUTORIAL_CARDS : drawCards();
    setCards(drawn);
    [400, 800, 1200, 1600, 2000, 2400].forEach((d, i) => {
      const id = setTimeout(() => {
        setDealtCount(i + 1);
        if (i === 5) {
          const c3 = setTimeout(() => setCountdown(3), 400);
          const c2 = setTimeout(() => setCountdown(2), 1400);
          const c1 = setTimeout(() => setCountdown(1), 2400);
          const cGo = setTimeout(() => {
            setCountdown("GO!"); setAllRevealed(true); setPhase("playing"); setRunning(true);
            if (tutorial) setTutStep(1);
            const cStart = setTimeout(() => {
              setCountdown(null);
            }, 800);
            dealingTimeoutsRef.current.push(cStart);
          }, 3400);
          [c3, c2, c1, cGo].forEach(id => dealingTimeoutsRef.current.push(id));
        }
      }, d);
      dealingTimeoutsRef.current.push(id);
    });
  }, []);

  useEffect(() => {
    if (running) timerRef.current = setInterval(() => setTime(t => t + 10), 10);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const goBackToPlaying = () => { setPhase("playing"); setRunning(true); if (isTutorial) setTutStep(4); };
  const solutionSteps = useMemo(() => cards ? findSolutionSteps(cards.nums, cards.target) : null, [cards]);
  const fospa = () => { setRunning(false); setPhase("fospa"); if (isTutorial) setTutStep(5); };

  const checkAnswer = () => {
    if (!cards) return;
    const r = validateExpression(expr, cards.nums, cards.target, t);
    setFeedback(r);
    if (r.ok) {
      if (!isTutorial && (bestTime === null || time < bestTime)) {
        setBestTime(time); setIsNewRecord(true);
        try { localStorage.setItem("clover_best_pc", String(time)); } catch {}
      } else { setIsNewRecord(false); }
      setTimeout(() => setPhase("result"), 900);
    }
  };

  const advanceTutorial = () => setTutStep(s => s + 1);
  const fmt = ms => `${Math.floor(ms / 1000)}.${String(Math.floor((ms % 1000) / 10)).padStart(2, "0")}`;
  const tokensToDisplay = (tokens) => tokens.map(t => t.val).join("").replace(/\*/g, "×").replace(/\//g, "÷");
  const tokensToExpr = (tokens) => tokens.map(t => t.val).join("");
  const tokensToUsedIdxs = (tokens) => tokens.filter(t => t.type === "num").map(t => t.idx);
  const clearExpr = () => { setExpr(""); setUsedNums([]); setExprTokens([]); };
  const backspaceExpr = () => {
    if (!cards) return;
    const newTokens = exprTokens.slice(0, -1);
    setExprTokens(newTokens); setExpr(tokensToExpr(newTokens)); setUsedNums(tokensToUsedIdxs(newTokens));
  };
  const appNum = (idx, val) => {
    if (!cards) return;
    const token = { type: "num", idx, val: String(val) };
    const newTokens = [...exprTokens, token];
    setExprTokens(newTokens); setExpr(tokensToExpr(newTokens)); setUsedNums(tokensToUsedIdxs(newTokens));
  };
  const appOp = (val) => {
    if (!cards) return;
    const token = { type: "op", val };
    const newTokens = [...exprTokens, token];
    setExprTokens(newTokens); setExpr(tokensToExpr(newTokens));
  };

  // ピコンッ効果音
  const playPikon = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.type = "sine";
      o.frequency.setValueAtTime(880, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
      g.gain.setValueAtTime(0.3, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      o.start(ctx.currentTime);
      o.stop(ctx.currentTime + 0.25);
    } catch(e) {}
  };

  const btnDown = (e, shadowPressed) => {
    e.currentTarget.style.transform = "translateY(4px)";
    e.currentTarget.style.boxShadow = shadowPressed;
  };
  const btnUp = (e, shadowNormal, cb) => {
    try {
      if (e.currentTarget) {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = shadowNormal;
      }
    } catch {}
    playPikon();
    if (cb) cb();
  };
  const btnLeave = (e, shadowNormal) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = shadowNormal;
  };

  const PBtn = ({ label, onClick, color = "#16a34a", textColor = "#fbbf24" }) => {
    const sNormal = `0 6px 0 ${color}99, 0 8px 16px ${color}44`;
    const sPressed = `0 2px 0 ${color}99, 0 3px 8px ${color}33`;
    return (
      <button
        onPointerDown={e => btnDown(e, sPressed)}
        onPointerUp={e => btnUp(e, sNormal, onClick)}
        onPointerLeave={e => btnLeave(e, sNormal)}
        style={{
          background: `linear-gradient(145deg,${color}ee,${color})`, border: "none", borderRadius: "14px",
          color: textColor, fontWeight: "bold", fontSize: "20px", padding: "18px 0",
          cursor: "pointer", width: "100%", letterSpacing: "2px",
          boxShadow: sNormal, transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s",
        }}>{label}</button>
    );
  };

  const GBtn = ({ label, onClick }) => {
    const sNormal = "0 6px 0 #0a1a0f, 0 8px 16px rgba(0,0,0,0.3)";
    const sPressed = "0 2px 0 #0a1a0f, 0 3px 8px rgba(0,0,0,0.2)";
    return (
      <button
        onPointerDown={e => btnDown(e, sPressed)}
        onPointerUp={e => btnUp(e, sNormal, onClick)}
        onPointerLeave={e => btnLeave(e, sNormal)}
        style={{
          background: "#111f14", border: "1px solid #4ade8033", borderRadius: "12px",
          color: "#86efac", fontWeight: "bold", fontSize: "18px", padding: "16px 0",
          cursor: "pointer", width: "100%",
          boxShadow: sNormal, transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s",
        }}>{label}</button>
    );
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0a1a0f", display: "flex", flexDirection: "column", alignItems: "center",
      padding: phase === "start" ? "32px 48px" : "16px 48px", color: "white", fontFamily: "Georgia,serif", boxSizing: "border-box",
    }}>
      {phase === "start" && (
      <div style={{ textAlign: "center", marginBottom: "20px", width: "100%", maxWidth: "1100px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", paddingRight: "8px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", paddingRight: "8px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
            <button
              onPointerDown={e=>btnDown(e,"0 3px 0 #333")}
              onPointerUp={e=>btnUp(e,"0 10px 0 #333",()=>setLang(l=>l==="ja"?"en":l==="en"?"pt":"ja"))}
              onPointerLeave={e=>btnLeave(e,"0 10px 0 #333")}
              style={{ background: "linear-gradient(145deg,#444,#222)", border: "3px solid #888", borderRadius: "30px", color: "white", fontWeight: "bold", fontSize: "20px", padding: "10px 20px", cursor: "pointer", boxShadow: "0 10px 0 #111", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s", letterSpacing: "2px" }}>
              {lang === "ja" ? "🇺🇸 English" : lang === "en" ? "🇧🇷 Português" : "🇯🇵 日本語"}
            </button>
            <div style={{ display: "flex", gap: "8px", fontSize: "14px", letterSpacing: "1px", alignItems: "center" }}>
              <span style={{ color: lang === "ja" ? "#4ade80" : "#4ade8044" }}>日本語</span>
              <span style={{ color: "#4ade8033" }}>/</span>
              <span style={{ color: lang === "en" ? "#4ade80" : "#4ade8044" }}>English</span>
              <span style={{ color: "#4ade8033" }}>/</span>
              <span style={{ color: lang === "pt" ? "#4ade80" : "#4ade8044" }}>Português</span>
            </div>
            <button
              onClick={() => window.location.href = "https://clover-game-mobile.vercel.app"}
              style={{ background: "linear-gradient(145deg,#444,#222)", border: "3px solid #888", borderRadius: "30px", color: "white", fontWeight: "bold", fontSize: "20px", padding: "10px 20px", cursor: "pointer", boxShadow: "0 10px 0 #111", letterSpacing: "2px" }}>
              {lang === "ja" ? "📱Mobile版へ" : lang === "en" ? "📱To Mobile" : "📱Versão Mobile"}
            </button>
            <div style={{ display: "flex", gap: "8px", fontSize: "14px", letterSpacing: "1px", alignItems: "center" }}>
              <span style={{ color: "#4ade8044" }}>📱Mobile</span>
              <span style={{ color: "#4ade8033" }}>/</span>
              <span style={{ color: "#4ade80", fontWeight: "bold" }}>💻PC</span>
            </div>
          </div>
        </div>
        <div style={{ fontSize: "52px", fontWeight: "900", letterSpacing: "5px", color: "#4ade80", lineHeight: 1 }}>{t.title}</div>
        <div style={{ fontSize: "13px", letterSpacing: "3px", color: "#4ade8044", marginTop: "5px" }}>{t.subtitle}</div>
        {bestTime !== null && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px", justifyContent: "center" }}>
            <div style={{ fontSize: "16px", color: "#fbbf24" }}>{t.best}: {fmt(bestTime)}{t.sec}</div>
            <button
              onPointerDown={e=>btnDown(e,"0 1px 0 #7f1d1d")}
              onPointerUp={e=>{ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 0 #7f1d1d"; playKyuririn(); setBestTime(null); try { localStorage.removeItem("clover_best_pc"); } catch {} }}
              onPointerLeave={e=>btnLeave(e,"0 4px 0 #7f1d1d")}
              style={{ background: "linear-gradient(145deg,#ef4444,#dc2626)", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold", fontSize: "11px", padding: "4px 10px", cursor: "pointer", boxShadow: "0 4px 0 #7f1d1d", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.reset}</button>
          </div>
        )}
      </div>
      )}

      {phase === "start" && (
        <div style={{ width: "100%", maxWidth: "1100px", display: "flex", gap: "48px", alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0 }}><CloverCard number="？" size="large" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "#111f14", border: "1px solid #4ade8020", borderRadius: "20px", padding: "24px", marginBottom: "20px" }}>
              <div style={{ fontSize: "17px", lineHeight: "2.0", color: "#86efac" }}>{t.desc}</div>
              <div style={{ fontSize: "16px", color: "#5cb85c", marginTop: "14px", fontStyle: "italic" }}>{t.toBeHappy}</div>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <button
                onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")}
                onPointerUp={e=>btnUp(e,"0 6px 0 #c0145a, 0 8px 16px rgba(255,105,180,0.3)",()=>startGame(true))}
                onPointerLeave={e=>btnLeave(e,"0 6px 0 #c0145a, 0 8px 16px rgba(255,105,180,0.3)")}
                style={{ background: "linear-gradient(145deg,#ff69b4,#ff1493)", border: "none", borderRadius: "14px", color: "white", fontWeight: "bold", fontSize: "20px", padding: "18px 0", cursor: "pointer", width: "100%", letterSpacing: "2px", boxShadow: "0 6px 0 #c0145a, 0 8px 16px rgba(255,105,180,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.howToPlay}</button>
            </div>
            <PBtn label={t.start} onClick={() => startGame(false)} />
            <div style={{ fontSize: "14px", color: "#86efac", marginTop: "16px", lineHeight: "2.0" }}>{t.tutHint1} {t.tutHint2}</div>
            <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}>{t.by}</div>
              <a href="http://nextchallenge.jp" target="_blank" style={{ color: "#4ade80", fontSize: "14px", textDecoration: "none", letterSpacing: "1px" }}>nextchallenge.jp</a>
            </div>
          </div>
        </div>
      )}

      {(phase === "dealing" || phase === "playing") && cards && (
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <button
              onPointerDown={e => btnDown(e, "0 2px 0 #166534, 0 3px 8px rgba(74,222,128,0.2)")}
              onPointerUp={e => btnUp(e, "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)", () => {
                if (isTutorial) {
                  if (tutStep <= 1) { dealingTimeoutsRef.current.forEach(id => clearTimeout(id)); dealingTimeoutsRef.current = []; setPhase("start"); setIsTutorial(false); setRunning(false); }
                  else setTutStep(s => s - 1);
                } else { dealingTimeoutsRef.current.forEach(id => clearTimeout(id)); dealingTimeoutsRef.current = []; setPhase("start"); setRunning(false); clearExpr(); }
              })}
              onPointerLeave={e => btnLeave(e, "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)")}
              style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "10px", color: "#4ade80", fontWeight: "900", padding: "10px 18px", cursor: "pointer", fontSize: "15px", flexShrink: 0, boxShadow: "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.back}</button>
            {isTutorial
              ? <div style={{ flex: 1, background: "#ff69b4", color: "white", borderRadius: "10px", padding: "10px 16px", fontSize: "16px", fontWeight: "bold" }}>{t.tutBanner}</div>
              : <div style={{ flex: 1, fontSize: "13px", color: "#4ade8066" }}>{t.backToTitle}</div>}
            {phase === "playing" && (
              <button
                onPointerDown={e => btnDown(e, "0 2px 0 #166534, 0 3px 8px rgba(74,222,128,0.2)")}
                onPointerUp={e => btnUp(e, "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)", () => { setRunning(false); setPhase("surrender"); })}
                onPointerLeave={e => btnLeave(e, "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)")}
                style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "10px", color: "#4ade80", fontWeight: "900", padding: "10px 18px", cursor: "pointer", fontSize: "15px", flexShrink: 0, boxShadow: "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.surrender}</button>
            )}
          </div>
          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div style={{ fontSize: "40px", fontWeight: "900", fontFamily: "monospace", color: running ? "#4ade80" : "#1e3a22" }}>{fmt(time)}</div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "12px", letterSpacing: "3px", color: "#ef4444cc", marginBottom: "6px", fontWeight: "bold" }}>⑥ TARGET</div>
                    {dealtCount >= 1
                      ? (allRevealed ? <CloverCard number={cards.target} isTarget size="normal7" /> : <CardBack size="normal" lang={lang} />)
                      : <div style={{ width: 161, height: 237 }} />}
                  </div>
                </div>
                {phase === "playing" && (isTutorial ? tutStep >= 4 : true) && (
                  <button onPointerUp={() => { playPikon(); fospa(); }}
                    style={{ background: "linear-gradient(145deg,#22c55e,#16a34a)", border: "none", borderRadius: "50%", width: "150px", height: "150px", color: "white", fontWeight: "bold", fontSize: "14px", cursor: "pointer", letterSpacing: "1px", flexShrink: 0, boxShadow: isTutorial && tutStep === 4 ? "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4), 0 0 0 4px #4ade80" : "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}
                    onPointerDown={e => { e.currentTarget.style.transform = "translateY(6px)"; e.currentTarget.style.boxShadow = isTutorial && tutStep === 4 ? "0 2px 0 #166534, 0 4px 10px rgba(74,222,128,0.3), 0 0 0 4px #4ade80" : "0 2px 0 #166534, 0 4px 10px rgba(74,222,128,0.3)"; }}
                    onPointerLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isTutorial && tutStep === 4 ? "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4), 0 0 0 4px #4ade80" : "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4)"; }}>
                    <span style={{ fontSize: "40px" }}>🙋</span>
                    <span>{t.fospa}</span>
                  </button>
                )}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%", opacity: 0.2 }}>
                <div style={{ flex: 1, height: "2px", background: "#4ade80" }}/><span style={{ fontSize: "14px" }}>🍀</span><div style={{ flex: 1, height: "2px", background: "#4ade80" }}/>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", gap: "5px", justifyContent: "center", marginBottom: "3px" }}>
                  {["①","②","③","④","⑤"].map((n, i) => <div key={i} style={{ width: 122, textAlign: "center", fontSize: "14px", fontWeight: "900", color: "#aaa" }}>{n}</div>)}
                </div>
                <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
                  {cards.nums.map((n, i) => (
                    dealtCount >= i + 2
                      ? (allRevealed ? <CloverCard key={i} number={n} size="small7" /> : <CardBack key={i} size="small" lang={lang} />)
                      : <div key={i} style={{ width: 122, height: 193 }} />
                  ))}
                </div>
              </div>
              {phase === "dealing" && (
                <div style={{ minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {countdown !== null
                    ? <div style={{ fontSize: countdown === "GO!" ? "64px" : "80px", fontWeight: "900", color: countdown === "GO!" ? "#4ade80" : "#fbbf24", fontFamily: "monospace", animation: "countdown-pop 0.3s ease-out" }}>{countdown}</div>
                    : <div style={{ color: "#4ade8033", fontSize: "16px" }}>{t.dealing}</div>}
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              {isTutorial && tutStep === 1 && (<div><TutorialBubble text={t.tut1} /><button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 6px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 6px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "10px", color: "white", fontWeight: "bold", padding: "12px 24px", cursor: "pointer", fontSize: "16px", boxShadow: "0 6px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.next}</button></div>)}
              {isTutorial && tutStep === 2 && (<div><TutorialBubble text={t.tut2} /><button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 6px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 6px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "10px", color: "white", fontWeight: "bold", padding: "12px 24px", cursor: "pointer", fontSize: "16px", boxShadow: "0 6px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.next}</button></div>)}
              {isTutorial && tutStep === 3 && (<div><TutorialBubble text={t.tut3} /><div style={{ background: "#e8336d", color: "white", borderRadius: "12px", padding: "12px", fontSize: "16px", fontWeight: "bold", margin: "10px 0" }}>{t.tut3b}</div><button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 6px 0 #c0145a",advanceTutorial)} onPointerLeave={e=>btnLeave(e,"0 6px 0 #c0145a")} style={{ background: "#ff69b4", border: "none", borderRadius: "10px", color: "white", fontWeight: "bold", padding: "12px 24px", cursor: "pointer", fontSize: "16px", boxShadow: "0 6px 0 #c0145a", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.next}</button></div>)}
              {isTutorial && tutStep === 4 && (<div><TutorialBubble text={t.tut4} /><div style={{ fontSize: "14px", color: "#86efac", marginTop: "10px", lineHeight: "1.7" }}>{t.tut4surrender}</div></div>)}
            </div>
          </div>
        </div>
      )}

      {phase === "fospa" && cards && (
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <button onPointerDown={e=>btnDown(e,"0 2px 0 #166534")} onPointerUp={e=>btnUp(e,"0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)",goBackToPlaying)} onPointerLeave={e=>btnLeave(e,"0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)")} style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "10px", color: "#4ade80", fontWeight: "900", padding: "10px 18px", cursor: "pointer", fontSize: "16px", flexShrink: 0, boxShadow: "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.back}</button>
            {isTutorial
              ? <div style={{ flex: 1, background: "#ff69b4", color: "white", borderRadius: "10px", padding: "10px 14px", fontSize: "16px", fontWeight: "bold" }}>{t.tutBanner2}</div>
              : <div style={{ flex: 1, fontSize: "13px", color: "#4ade8066" }}>解き直したい時は戻れるよ</div>}
          </div>
          <div style={{ fontSize: "18px", color: "#4ade80", marginBottom: "10px" }}>{t.fospaTime} {fmt(time)}{t.sec}</div>
          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
              <CloverCard number={cards.target} isTarget size="normal7" />
              <div style={{ display: "flex", gap: "5px" }}>
                {cards.nums.map((n, i) => (
                  <div key={i} style={{ opacity: usedNums.includes(i) ? 0.25 : 1, transition: "opacity 0.2s" }}>
                    <CloverCard number={n} size="xsmall7" />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              {isTutorial && tutStep === 5 && (
                <AnimatedExprDemo nums={cards.nums} onUsedIdxsChange={(idxs) => setUsedNums(idxs)}
                  onDone={(finalExpr) => {
                    setExpr(finalExpr);
                    const nums = cards.nums;
                    const tokens = [
                      { type:"num", idx:0, val:String(nums[0]) }, { type:"op", val:"*" }, { type:"op", val:"(" },
                      { type:"num", idx:3, val:String(nums[3]) }, { type:"op", val:"+" },
                      { type:"num", idx:2, val:String(nums[2]) }, { type:"op", val:")" }, { type:"op", val:"+" },
                      { type:"num", idx:1, val:String(nums[1]) }, { type:"op", val:"-" },
                      { type:"num", idx:4, val:String(nums[4]) },
                    ];
                    setExprTokens(tokens); setUsedNums([0,3,2,1,4]); setTutStep(6);
                  }}
                />
              )}
              {isTutorial && tutStep === 6 && (<TutorialBubble text={t.tut6} />)}
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                {cards.nums.map((n, i) => {
                  const bg = ["#3b82f6","#ec4899","#f97316","#8b5cf6","#10b981"][i];
                  const sN = `0 5px 0 ${bg}99, 0 6px 12px ${bg}44`;
                  const sP = `0 1px 0 ${bg}99`;
                  return (
                    <button key={i} onPointerDown={e => btnDown(e, sP)} onPointerUp={e => btnUp(e, sN, () => appNum(i, n))} onPointerLeave={e => btnLeave(e, sN)}
                      style={{ background: `linear-gradient(145deg,${bg}ee,${bg})`, border: "none", borderRadius: "10px", color: "white", fontWeight: "900", flex: 1, height: "72px", fontSize: "28px", cursor: isTutorial && tutStep === 5 ? "default" : "pointer", opacity: usedNums.includes(i) ? 0.25 : 1, boxShadow: sN, transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s", pointerEvents: isTutorial && tutStep === 5 ? "none" : "auto" }}>{n}</button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                {[["＋","+"],["－","-"],["×","*"],["÷","/"],["（","("],["）",")"]].map(([l,v]) => {
                  const sN = "0 5px 0 #0a1a0f, 0 6px 12px rgba(0,0,0,0.3)";
                  const sP = "0 1px 0 #0a1a0f";
                  return (
                    <button key={l} onPointerDown={e => btnDown(e, sP)} onPointerUp={e => btnUp(e, sN, () => appOp(v))} onPointerLeave={e => btnLeave(e, sN)}
                      style={{ background: "#1a2f1e", border: "2px solid #4ade8033", borderRadius: "10px", color: "#4ade80", fontWeight: "900", flex: 1, height: "72px", fontSize: "28px", cursor: isTutorial && tutStep === 5 ? "default" : "pointer", boxShadow: sN, transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s", pointerEvents: isTutorial && tutStep === 5 ? "none" : "auto" }}>{l}</button>
                  );
                })}
              </div>
              {(!isTutorial || tutStep !== 5) && (
                <div style={{ background: "#111f14", border: "2px solid #4ade8033", borderRadius: "12px", padding: "14px", fontSize: exprTokens.length > 12 ? "28px" : exprTokens.length > 8 ? "34px" : "40px", fontFamily: "monospace", fontWeight: "bold", color: "white", textAlign: "center", marginBottom: "10px", minHeight: "56px", wordBreak: "break-all" }}>
                  {exprTokens.length > 0 ? tokensToDisplay(exprTokens) : <span style={{ color: "#2a4a2a", fontSize: "16px" }}>{t.exprPlaceholder}</span>}
                </div>
              )}
              {(!isTutorial || tutStep !== 5) && (
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <button onPointerDown={e=>btnDown(e,"0 1px 0 #0a1a0f")} onPointerUp={e=>btnUp(e,"0 5px 0 #0a1a0f",backspaceExpr)} onPointerLeave={e=>btnLeave(e,"0 5px 0 #0a1a0f")} style={{ background: "#1a2f1e", border: "1px solid #4ade8033", borderRadius: "10px", color: "#86efac", fontWeight: "bold", width: "60px", height: "50px", fontSize: "22px", cursor: "pointer", flexShrink: 0, boxShadow: "0 5px 0 #0a1a0f", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>⌫</button>
                  <button onPointerDown={e=>btnDown(e,"0 1px 0 #0a1a0f")} onPointerUp={e=>btnUp(e,"0 5px 0 #0a1a0f",clearExpr)} onPointerLeave={e=>btnLeave(e,"0 5px 0 #0a1a0f")} style={{ background: "#1a2f1e", border: "1px solid #4ade8033", borderRadius: "10px", color: "#86efac", fontWeight: "bold", flex: 1, height: "50px", fontSize: "18px", cursor: "pointer", boxShadow: "0 5px 0 #0a1a0f", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{lang === "ja" ? "全消し" : lang === "en" ? "All Clear" : "Apagar"}</button>
                </div>
              )}
              {feedback && (
                <div style={{ padding: "12px", borderRadius: "10px", marginBottom: "10px", fontSize: "18px", background: feedback.ok ? "#4ade8018" : "#ef444418", border: `1px solid ${feedback.ok ? "#4ade80" : "#ef4444"}`, color: feedback.ok ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 2 }}>
                  <button onPointerDown={e=>btnDown(e,"0 2px 0 #166534, 0 3px 8px rgba(74,222,128,0.2)")} onPointerUp={e=>btnUp(e,"0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)",checkAnswer)} onPointerLeave={e=>btnLeave(e,"0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)")}
                    style={{ background: "linear-gradient(145deg,#22c55e,#16a34a)", border: "none", borderRadius: "12px", color: "white", fontWeight: "bold", fontSize: "22px", padding: "18px 0", cursor: "pointer", width: "100%", letterSpacing: "2px", boxShadow: isTutorial && tutStep === 6 ? "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3), 0 0 0 3px #ff69b4" : "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.check}</button>
                </div>
                <div style={{ flex: 1 }}><GBtn label={t.retry} onClick={() => startGame(false)} /></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === "about" && (
        <div style={{ width: "100%", maxWidth: "900px" }}>
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <div style={{ fontSize: "40px", fontWeight: "900", color: "#4ade80" }}>{t.aboutTitle}</div>
          </div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "20px", padding: "24px", marginBottom: "16px" }}><div style={{ fontSize: "20px", fontWeight: "bold", color: "#4ade80", marginBottom: "12px" }}>{t.about1title}</div><div style={{ fontSize: "16px", color: "#86efac", lineHeight: "1.9" }}>{t.about1}</div></div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "20px", padding: "24px", marginBottom: "16px" }}><div style={{ fontSize: "20px", fontWeight: "bold", color: "#4ade80", marginBottom: "12px" }}>{t.about2title}</div><div style={{ fontSize: "16px", color: "#86efac", lineHeight: "1.9" }}>{t.about2}</div></div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "20px", padding: "24px", marginBottom: "16px" }}><div style={{ fontSize: "20px", fontWeight: "bold", color: "#4ade80", marginBottom: "12px" }}>{t.about3title}</div><div style={{ fontSize: "16px", color: "#86efac", lineHeight: "1.9" }}>{t.about3}</div></div>
          <div style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "20px", padding: "24px", marginBottom: "24px" }}><div style={{ fontSize: "20px", fontWeight: "bold", color: "#4ade80", marginBottom: "12px" }}>{t.about4title}</div><div style={{ fontSize: "16px", color: "#86efac", lineHeight: "1.9" }}>{t.about4}</div></div>
          <div style={{ display: "flex", gap: "12px" }}>
            <div style={{ flex: 1 }}><PBtn label={t.nextGame} onClick={() => startGame(false)} /></div>
            <div style={{ flex: 1 }}><GBtn label={t.toTitle} onClick={() => setPhase("start")} /></div>
          </div>
        </div>
      )}

      {/* SURRENDER */}
      {phase === "surrender" && cards && (
        <div style={{ textAlign: "center", width: "100%", maxWidth: "900px" }}>
          <div style={{ fontSize: "44px", fontWeight: "900", color: "#4ade80", marginBottom: "4px" }}>{t.surrenderTitle}</div>
          <div style={{ fontSize: "20px", color: "#86efac", marginBottom: "12px" }}>{t.surrenderSub}</div>

          <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "8px", alignItems: "flex-end" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "12px", letterSpacing: "3px", color: "#ef4444cc", marginBottom: "8px", fontWeight: "bold" }}>{t.target}</div>
              <CloverCard number={cards.target} isTarget size="normal7" />
            </div>
            <div style={{ display: "flex", gap: "8px", justifyContent: "center", alignItems: "flex-end" }}>
              {cards.nums.map((n, i) => <CloverCard key={i} number={n} size="xsmall7" />)}
            </div>
          </div>

          <div style={{ background: "#111f14", border: "2px solid #4ade8055", borderRadius: "20px", padding: "16px 32px", marginBottom: "12px" }}>
            <div style={{ fontSize: "14px", color: "#4ade8088", marginBottom: "10px", letterSpacing: "2px" }}>例えば…</div>
            {solutionSteps ? (() => {
              const pool = [...cards.nums];
              const isCard = (val) => {
                const idx = pool.findIndex(n => n === val);
                if (idx !== -1) { pool.splice(idx, 1); return true; }
                return false;
              };
              return solutionSteps.map((step, i) => {
                const leftIsCard = i === 0 ? isCard(step.left) : false;
                const rightIsCard = isCard(step.right);
                const isLast = i === solutionSteps.length - 1;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", fontSize: "24px", fontWeight: "900", fontFamily: "monospace", marginBottom: "8px" }}>
                    <span style={{ color: leftIsCard ? "#4ade80" : "white" }}>{step.left}</span>
                    <span style={{ color: "#f97316" }}>{step.op}</span>
                    <span style={{ color: rightIsCard ? "#4ade80" : "white" }}>{step.right}</span>
                    <span style={{ color: "#aaa" }}>=</span>
                    <span style={{ color: isLast ? "#ef4444" : "white" }}>{step.result}</span>
                  </div>
                );
              });
            })() : <div style={{ fontSize: "24px", color: "white" }}>…</div>}
          </div>

          <div style={{ maxWidth: "400px", margin: "0 auto" }}>
            <PBtn label={t.surrenderNext} onClick={() => { clearExpr(); startGame(false); }} />
          </div>
        </div>
      )}

      {phase === "result" && (
        <div style={{ textAlign: "center", width: "100%", maxWidth: "900px", position: "relative" }}>
          {!isTutorial && isNewRecord && (
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
              {[...Array(40)].map((_, i) => (
                <div key={i} style={{ position: "absolute", left: `${(i * 7.3) % 100}%`, top: `-${10 + (i * 13) % 20}px`, fontSize: `${16 + (i * 7) % 24}px`, animation: `confetti-fall ${2 + (i * 0.17) % 3}s linear ${(i * 0.23) % 2}s infinite`, opacity: 0.9 }}>
                  {["🎉","🍀","✨","🌟","💚","🎊","⭐"][i % 7]}
                </div>
              ))}
            </div>
          )}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: "64px", marginBottom: "8px" }}>🍀</div>
            <div style={{ fontSize: "44px", fontWeight: "900", color: "#4ade80", marginBottom: "6px" }}>{isTutorial ? t.tutComplete : t.correct2}</div>
            <div style={{ fontSize: "56px", fontFamily: "monospace", fontWeight: "900", color: "#4ade80", marginBottom: "6px" }}>{fmt(time)}{t.sec}</div>
            {isTutorial ? (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "16px", color: "#86efac", lineHeight: "1.8", marginBottom: "14px" }}>{t.tutResult1}</div>
                <div style={{ background: "#ff69b422", border: "2px solid #ff69b4", borderRadius: "14px", padding: "14px", marginBottom: "14px", color: "#ff69b4", fontSize: "18px", fontWeight: "bold" }}>{t.tutResult2}</div>
                <div style={{ marginBottom: "12px" }}><PBtn label={t.nextGame} onClick={() => startGame(false)} /></div>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #166534")} onPointerUp={e=>btnUp(e,"0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)",()=>setPhase("about"))} onPointerLeave={e=>btnLeave(e,"0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)")} style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "14px", color: "#4ade80", fontWeight: "bold", fontSize: "16px", padding: "14px 0", cursor: "pointer", width: "100%", boxShadow: "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.about}</button>
              </div>
            ) : (
              <>
                {isNewRecord && <div style={{ color: "#fbbf24", fontSize: "24px", fontWeight: "900", marginBottom: "8px", animation: "blink-gold 1.8s infinite" }}>{t.newRecord}</div>}
                {bestTime !== null && (
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "8px" }}>
                    <div style={{ color: "#fbbf24", fontSize: "18px" }}>{t.currentBest}{fmt(bestTime)}{t.sec}</div>
                    <button
                      onPointerDown={e=>btnDown(e,"0 1px 0 #7f1d1d")}
                      onPointerUp={e=>{ try { if(e.currentTarget){ e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 4px 0 #7f1d1d"; } } catch {} playKyuririn(); setBestTime(null); try { localStorage.removeItem("clover_best_pc"); } catch {} }}
                      onPointerLeave={e=>btnLeave(e,"0 4px 0 #7f1d1d")}
                      style={{ background: "linear-gradient(145deg,#ef4444,#dc2626)", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold", fontSize: "11px", padding: "4px 10px", cursor: "pointer", boxShadow: "0 4px 0 #7f1d1d", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s", flexShrink: 0 }}>{t.reset}</button>
                  </div>
                )}
                <div style={{ color: "#555", fontSize: "15px", marginBottom: "6px" }}>{feedback?.msg}</div>
                <div style={{ fontSize: "18px", color: "#5cb85c", fontStyle: "italic", marginBottom: "20px" }}>{t.toBeHappy}</div>
                <div style={{ display: "flex", gap: "14px", marginBottom: "14px" }}><div style={{ flex: 1 }}><PBtn label={t.nextGame2} onClick={() => startGame(false)} /></div></div>
                <div style={{ marginBottom: "14px" }}>
                  <button onPointerDown={e=>btnDown(e,"0 2px 0 #166534")} onPointerUp={e=>btnUp(e,"0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)",()=>setPhase("about"))} onPointerLeave={e=>btnLeave(e,"0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)")} style={{ background: "linear-gradient(145deg,#1e4a2a,#1a3a22)", border: "2px solid #4ade80", borderRadius: "14px", color: "#4ade80", fontWeight: "bold", fontSize: "16px", padding: "14px 0", cursor: "pointer", width: "100%", boxShadow: "0 6px 0 #166534, 0 8px 16px rgba(74,222,128,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.about}</button>
                </div>
              </>
            )}
            <div style={{ display: "flex", gap: "14px" }}>
              <div style={{ flex: 1 }}>
                <button onPointerDown={e=>btnDown(e,"0 2px 0 #c0145a")} onPointerUp={e=>btnUp(e,"0 6px 0 #c0145a, 0 8px 16px rgba(255,105,180,0.3)",()=>startGame(true))} onPointerLeave={e=>btnLeave(e,"0 6px 0 #c0145a, 0 8px 16px rgba(255,105,180,0.3)")} style={{ background: "linear-gradient(145deg,#ff69b4,#ff1493)", border: "none", borderRadius: "14px", color: "white", fontWeight: "bold", fontSize: "16px", padding: "18px 0", cursor: "pointer", width: "100%", boxShadow: "0 6px 0 #c0145a, 0 8px 16px rgba(255,105,180,0.3)", transform: "translateY(0)", transition: "transform 0.1s, box-shadow 0.1s" }}>{t.howToPlay}</button>
              </div>
              <div style={{ flex: 1 }}><GBtn label={t.toTitle} onClick={() => setPhase("start")} /></div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse-pink { 0%, 100% { box-shadow: 0 4px 20px rgba(255,105,180,0.5); } 50% { box-shadow: 0 6px 28px rgba(255,105,180,0.9); transform: scale(1.01); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes blink-gold { 0%, 100% { color: #fbbf24; opacity: 1; } 50% { color: #f59e0b; opacity: 0.3; } }
        @keyframes confetti-fall { 0% { transform: translateY(-20px) rotate(0deg); opacity: 1; } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0.2; } }
        @keyframes countdown-pop { 0% { transform: scale(1.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
