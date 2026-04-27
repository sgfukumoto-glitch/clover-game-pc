import { useState, useEffect, useRef, useCallback } from "react";

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

function validateExpression(expr, nums, target) {
  const tokens = expr.replace(/[+\-*/()]/g, " ").trim().split(/\s+/).filter(Boolean);
  const usedNums = tokens.map(Number).filter(n => !isNaN(n));
  const sortedUsed = [...usedNums].sort((a, b) => a - b);
  const sortedNums = [...nums].sort((a, b) => a - b);
  if (JSON.stringify(sortedUsed) !== JSON.stringify(sortedNums))
    return { ok: false, msg: "①〜⑤の数字を各1回ずつ全部使ってね！" };
  try {
    const safe = expr.replace(/[^0-9+\-*/().]/g, "");
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + safe + ")")();
    if (Math.abs(result - target) < 0.0001) return { ok: true, msg: `正解！= ${target} 🍀` };
    return { ok: false, msg: `その式は ${Number(result.toFixed(4))} になるよ` };
  } catch { return { ok: false, msg: "式が正しくないよ。確認してね。" }; }
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
      <text x="98" y="110" textAnchor="end" fontSize="7" fontWeight="bold" fill="#3a9a3a" fontStyle="italic" fontFamily="Georgia,serif">to be happy…</text>
    </svg>
  );
}

function CloverCard({ number, isTarget = false, size = "normal" }) {
  const d = {
    large:   { w: 300, h: 435, numSz: 150, svgSz: 240, r: 32, bw: 8 },
    normal:  { w: 230, h: 338, numSz: 112, svgSz: 170, r: 28, bw: 6 },
    small:   { w: 174, h: 275, numSz: 88,  svgSz: 145, r: 22, bw: 6 },
    xsmall:  { w: 154, h: 244, numSz: 72,  svgSz: 115, r: 18, bw: 5 },
    // ゲーム中0.7倍サイズ
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

function CardBack({ size = "normal" }) {
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
    }}>🍀</div>
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

export default function App() {
  const [phase, setPhase] = useState("start");
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
            setCountdown("GO!"); setAllRevealed(true);
            const cStart = setTimeout(() => {
              setCountdown(null); setPhase("playing"); setRunning(true);
              if (tutorial) setTutStep(1);
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
  const fospa = () => { setRunning(false); setPhase("fospa"); if (isTutorial) setTutStep(5); };

  const checkAnswer = () => {
    if (!cards) return;
    const r = validateExpression(expr, cards.nums, cards.target);
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

  const PBtn = ({ label, onClick, color = "#16a34a", textColor = "#fbbf24" }) => (
    <button onClick={onClick} style={{
      background: `linear-gradient(135deg,${color},${color}dd)`, border: "none", borderRadius: "14px",
      color: textColor, fontWeight: "bold", fontSize: "20px", padding: "18px 0",
      cursor: "pointer", width: "100%", letterSpacing: "2px", boxShadow: `0 5px 20px ${color}66`,
    }}>{label}</button>
  );

  const GBtn = ({ label, onClick }) => (
    <button onClick={onClick} style={{
      background: "#111f14", border: "1px solid #4ade8033", borderRadius: "12px",
      color: "#86efac", fontWeight: "bold", fontSize: "18px", padding: "16px 0", cursor: "pointer", width: "100%",
    }}>{label}</button>
  );

  return (
    <div style={{
      minHeight: "100vh", background: "#0a1a0f", display: "flex", flexDirection: "column", alignItems: "center",
      padding: phase === "start" ? "32px 48px" : "16px 48px", color: "white", fontFamily: "Georgia,serif", boxSizing: "border-box",
    }}>
      {/* HEADER - STARTのみ表示 */}
      {phase === "start" && (
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div style={{ fontSize: "52px", fontWeight: "900", letterSpacing: "5px", color: "#4ade80", lineHeight: 1 }}>
          🍀 CLOVER™️
        </div>
        <div style={{ fontSize: "13px", letterSpacing: "3px", color: "#4ade8044", marginTop: "5px" }}>♣ NUMBER CARD GAME ♣</div>
        {bestTime !== null && <div style={{ fontSize: "16px", color: "#fbbf24", marginTop: "6px" }}>🏆 ベスト: {fmt(bestTime)}秒</div>}
      </div>
      )}

      {/* START */}
      {phase === "start" && (
        <div style={{ width: "100%", maxWidth: "1100px", display: "flex", gap: "48px", alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0 }}>
            <CloverCard number="？" size="large" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ background: "#111f14", border: "1px solid #4ade8020", borderRadius: "20px", padding: "24px", marginBottom: "20px" }}>
              <div style={{ fontSize: "17px", lineHeight: "2.0", color: "#86efac" }}>
                52枚の山からカードを引いて<br/>
                <span style={{ color: "#60a5fa", fontWeight: "bold" }}>①②③④⑤</span> に書かれた数字を四則計算で繋げて並び替えて{" "}
                <span style={{ color: "#ef4444", fontWeight: "bold" }}>⑥</span> の数字(target)にしよう！！<br/>
                タイムを競うカードゲームだよ！
              </div>
              <div style={{ fontSize: "16px", color: "#5cb85c", marginTop: "14px", fontStyle: "italic" }}>to be happy... 🍀</div>
            </div>
            <div style={{ marginBottom: "14px" }}>
              <button onClick={() => startGame(true)} style={{
                background: "linear-gradient(135deg,#ff69b4,#ff1493)", border: "none", borderRadius: "14px",
                color: "white", fontWeight: "bold", fontSize: "20px", padding: "18px 0",
                cursor: "pointer", width: "100%", letterSpacing: "2px",
              }}>やり方を学ぶ 📖</button>
            </div>
            <PBtn label="スタート 🃏" onClick={() => startGame(false)} />
            <div style={{ fontSize: "14px", color: "#86efac", marginTop: "16px", lineHeight: "2.0" }}>
              📖 ピンク→チュートリアルで試し遊び！🃏 黄色字→本番スタート！
            </div>
            <div style={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold", color: "white" }}>
              by NPO法人 Foster Partner®️
            </div>
          </div>
        </div>
      )}

      {/* DEALING / PLAYING */}
      {(phase === "dealing" || phase === "playing") && cards && (
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <button onClick={() => {
              if (isTutorial) {
                if (tutStep <= 1) { dealingTimeoutsRef.current.forEach(id => clearTimeout(id)); dealingTimeoutsRef.current = []; setPhase("start"); setIsTutorial(false); setRunning(false); }
                else setTutStep(s => s - 1);
              } else { dealingTimeoutsRef.current.forEach(id => clearTimeout(id)); dealingTimeoutsRef.current = []; setPhase("start"); setRunning(false); clearExpr(); }
            }} style={{
              background: "linear-gradient(135deg,#1a3a22,#0d2414)", border: "2px solid #4ade80",
              borderRadius: "10px", color: "#4ade80", fontWeight: "900", padding: "10px 18px",
              cursor: "pointer", fontSize: "15px", flexShrink: 0,
            }}>← 戻る</button>
            {isTutorial
              ? <div style={{ flex: 1, background: "#ff69b4", color: "white", borderRadius: "10px", padding: "10px 16px", fontSize: "16px", fontWeight: "bold" }}>チュートリアル中 🩷</div>
              : <div style={{ flex: 1, fontSize: "13px", color: "#4ade8066" }}>タイトルへ戻る</div>}
          </div>

          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            {/* 左: カードエリア */}
            <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
              {/* タイムと⑥カードとフォスパボタンを横並び */}
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div style={{ fontSize: "40px", fontWeight: "900", fontFamily: "monospace", color: running ? "#4ade80" : "#1e3a22" }}>{fmt(time)}</div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "12px", letterSpacing: "3px", color: "#ef4444cc", marginBottom: "6px", fontWeight: "bold" }}>⑥ TARGET</div>
                    {dealtCount >= 1
                      ? (allRevealed ? <CloverCard number={cards.target} isTarget size="normal7" /> : <CardBack size="normal" />)
                      : <div style={{ width: 161, height: 237 }} />}
                  </div>
                </div>
                {/* フォスパ丸ボタン */}
                {phase === "playing" && (isTutorial ? tutStep >= 4 : true) && (
                  <button onPointerUp={() => {
                    // ピコンッ効果音
                    try {
                      const ctx = new (window.AudioContext || window.webkitAudioContext)();
                      const o = ctx.createOscillator();
                      const g = ctx.createGain();
                      o.connect(g); g.connect(ctx.destination);
                      o.type = "sine";
                      o.frequency.setValueAtTime(880, ctx.currentTime);
                      o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.08);
                      g.gain.setValueAtTime(0.4, ctx.currentTime);
                      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                      o.start(ctx.currentTime);
                      o.stop(ctx.currentTime + 0.3);
                    } catch(e) {}
                    fospa();
                  }} style={{
                    background: "linear-gradient(145deg,#22c55e,#16a34a)",
                    border: "none", borderRadius: "50%",
                    width: "150px", height: "150px",
                    color: "white", fontWeight: "bold", fontSize: "14px",
                    cursor: "pointer", letterSpacing: "1px", flexShrink: 0,
                    boxShadow: isTutorial && tutStep === 4
                      ? "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4), 0 0 0 4px #4ade80"
                      : "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "4px",
                    transform: "translateY(0)",
                    transition: "transform 0.1s, box-shadow 0.1s",
                  }}
                  onPointerDown={e => {
                    e.currentTarget.style.transform = "translateY(6px)";
                    e.currentTarget.style.boxShadow = isTutorial && tutStep === 4
                      ? "0 2px 0 #166534, 0 4px 10px rgba(74,222,128,0.3), 0 0 0 4px #4ade80"
                      : "0 2px 0 #166534, 0 4px 10px rgba(74,222,128,0.3)";
                  }}
                  onPointerLeave={e => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isTutorial && tutStep === 4
                      ? "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4), 0 0 0 4px #4ade80"
                      : "0 8px 0 #166534, 0 10px 20px rgba(74,222,128,0.4)";
                  }}
                  >
                    <span style={{ fontSize: "40px" }}>🙋</span>
                    <span>フォスパ！</span>
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
                      ? (allRevealed ? <CloverCard key={i} number={n} size="small7" /> : <CardBack key={i} size="small" />)
                      : <div key={i} style={{ width: 122, height: 193 }} />
                  ))}
                </div>
              </div>
              {phase === "dealing" && (
                <div style={{ minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {countdown !== null
                    ? <div style={{ fontSize: countdown === "GO!" ? "64px" : "80px", fontWeight: "900", color: countdown === "GO!" ? "#4ade80" : "#fbbf24", fontFamily: "monospace", animation: "countdown-pop 0.3s ease-out" }}>{countdown}</div>
                    : <div style={{ color: "#4ade8033", fontSize: "16px" }}>カードを配っています…</div>}
                </div>
              )}
            </div>

            {/* 右: チュートリアル */}
            <div style={{ flex: 1 }}>
              {isTutorial && tutStep === 1 && (<div><TutorialBubble text="👆 スタートと同時にタイムが動き出すよ！⏱" /><button onClick={advanceTutorial} style={{ background: "#ff69b4", border: "none", borderRadius: "10px", color: "white", fontWeight: "bold", padding: "12px 24px", cursor: "pointer", fontSize: "16px" }}>次へ →</button></div>)}
              {isTutorial && tutStep === 2 && (<div><TutorialBubble text="これが⑥ターゲット！この数字を答えにするのが目標だよ！" /><button onClick={advanceTutorial} style={{ background: "#ff69b4", border: "none", borderRadius: "10px", color: "white", fontWeight: "bold", padding: "12px 24px", cursor: "pointer", fontSize: "16px" }}>次へ →</button></div>)}
              {isTutorial && tutStep === 3 && (<div><TutorialBubble text="①②③④⑤の5枚！この数字を並べ替えて四則計算記号(+-×÷)で繋いでターゲットの数字にするよ" /><div style={{ background: "#e8336d", color: "white", borderRadius: "12px", padding: "12px", fontSize: "16px", fontWeight: "bold", margin: "10px 0" }}>記号(+-×÷)は何度使ってもいいよ</div><button onClick={advanceTutorial} style={{ background: "#ff69b4", border: "none", borderRadius: "10px", color: "white", fontWeight: "bold", padding: "12px 24px", cursor: "pointer", fontSize: "16px" }}>次へ →</button></div>)}
              {isTutorial && tutStep === 4 && (<TutorialBubble text="出来たら「フォスパ」と言って、👈のボタンを押すよ" />)}
            </div>
          </div>
        </div>
      )}

      {/* FOSPA */}
      {phase === "fospa" && cards && (
        <div style={{ width: "100%", maxWidth: "1100px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <button onClick={goBackToPlaying} style={{
              background: "linear-gradient(135deg,#1a3a22,#0d2414)", border: "2px solid #4ade80",
              borderRadius: "10px", color: "#4ade80", fontWeight: "900", padding: "10px 18px",
              cursor: "pointer", fontSize: "16px", flexShrink: 0,
            }}>← 戻る</button>
            {isTutorial
              ? <div style={{ flex: 1, background: "#ff69b4", color: "white", borderRadius: "10px", padding: "10px 14px", fontSize: "16px", fontWeight: "bold" }}>チュートリアル中 🩷</div>
              : <div style={{ flex: 1, fontSize: "13px", color: "#4ade8066" }}>解き直したい時は戻れるよ</div>}
          </div>
          <div style={{ fontSize: "18px", color: "#4ade80", marginBottom: "10px" }}>フォスパ！ ⏱ {fmt(time)}秒</div>

          <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            {/* 左: カード */}
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

            {/* 右: 入力 */}
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
              {isTutorial && tutStep === 6 && (
                <TutorialBubble text="式が入力されたよ！👇の「答え合わせ」ボタンを押してね。" />
              )}

              {/* 数字ボタン */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                {cards.nums.map((n, i) => (
                  <button key={i} onClick={() => appNum(i, n)} style={{
                    background: ["#3b82f6","#ec4899","#f97316","#8b5cf6","#10b981"][i],
                    border: "none", borderRadius: "10px", color: "white", fontWeight: "900",
                    flex: 1, height: "72px", fontSize: "28px",
                    cursor: isTutorial && tutStep === 5 ? "default" : "pointer",
                    opacity: usedNums.includes(i) ? 0.25 : 1, transition: "opacity 0.2s",
                    pointerEvents: isTutorial && tutStep === 5 ? "none" : "auto",
                  }}>{n}</button>
                ))}
              </div>

              {/* 演算子 */}
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                {[["＋","+"],["－","-"],["×","*"],["÷","/"],["（","("],["）",")"]].map(([l,v]) => (
                  <button key={l} onClick={() => appOp(v)} style={{
                    background: "#111f14", border: "2px solid #4ade8033", borderRadius: "10px",
                    color: "#4ade80", fontWeight: "900", flex: 1, height: "72px", fontSize: "28px",
                    cursor: isTutorial && tutStep === 5 ? "default" : "pointer",
                    pointerEvents: isTutorial && tutStep === 5 ? "none" : "auto",
                  }}>{l}</button>
                ))}
              </div>

              {/* 式表示 */}
              {(!isTutorial || tutStep !== 5) && (
                <div style={{
                  background: "#111f14", border: "2px solid #4ade8033", borderRadius: "12px", padding: "14px",
                  fontSize: exprTokens.length > 12 ? "28px" : exprTokens.length > 8 ? "34px" : "40px",
                  fontFamily: "monospace", fontWeight: "bold", color: "white",
                  textAlign: "center", marginBottom: "10px", minHeight: "56px", wordBreak: "break-all",
                }}>
                  {exprTokens.length > 0 ? tokensToDisplay(exprTokens) : <span style={{ color: "#2a4a2a", fontSize: "16px" }}>ここに式が入るよ</span>}
                </div>
              )}
              {(!isTutorial || tutStep !== 5) && (
                <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                  <button onClick={backspaceExpr} style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "10px", color: "#86efac", fontWeight: "bold", width: "60px", height: "50px", fontSize: "22px", cursor: "pointer", flexShrink: 0 }}>⌫</button>
                  <button onClick={clearExpr} style={{ background: "#111f14", border: "1px solid #4ade8033", borderRadius: "10px", color: "#86efac", fontWeight: "bold", flex: 1, height: "50px", fontSize: "18px", cursor: "pointer" }}>全消し</button>
                </div>
              )}
              {feedback && (
                <div style={{ padding: "12px", borderRadius: "10px", marginBottom: "10px", fontSize: "18px", background: feedback.ok ? "#4ade8018" : "#ef444418", border: `1px solid ${feedback.ok ? "#4ade80" : "#ef4444"}`, color: feedback.ok ? "#4ade80" : "#fca5a5" }}>{feedback.msg}</div>
              )}
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 2 }}>
                  <button onClick={checkAnswer} style={{
                    background: "linear-gradient(135deg,#16a34a,#15803d)", border: "none", borderRadius: "12px",
                    color: "white", fontWeight: "bold", fontSize: "22px", padding: "18px 0",
                    cursor: "pointer", width: "100%", letterSpacing: "2px",
                    boxShadow: isTutorial && tutStep === 6 ? "0 5px 20px rgba(255,105,180,0.6), 0 0 0 3px #ff69b4" : "0 5px 20px rgba(74,222,128,0.3)",
                  }}>答え合わせ！</button>
                </div>
                <div style={{ flex: 1 }}><GBtn label="やり直す" onClick={() => startGame(false)} /></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESULT */}
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
            <div style={{ fontSize: "44px", fontWeight: "900", color: "#4ade80", marginBottom: "6px" }}>
              {isTutorial ? "チュートリアル完了！🎉" : "せいかい！🍬"}
            </div>
            <div style={{ fontSize: "56px", fontFamily: "monospace", fontWeight: "900", color: "#4ade80", marginBottom: "6px" }}>{fmt(time)}秒</div>
            {isTutorial ? (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "16px", color: "#86efac", lineHeight: "1.8", marginBottom: "14px" }}>⬆️ はクリアしたタイムだよ！本番では記録が出るたびに更新されるよ🏆</div>
                <div style={{ background: "#ff69b422", border: "2px solid #ff69b4", borderRadius: "14px", padding: "14px", marginBottom: "14px", color: "#ff69b4", fontSize: "18px", fontWeight: "bold" }}>やり方はわかったかな？さぁいよいよチャレンジだ👇</div>
                <PBtn label="次の問題へ 🃏（本番！）" onClick={() => startGame(false)} />
              </div>
            ) : (
              <>
                {isNewRecord && <div style={{ color: "#fbbf24", fontSize: "24px", fontWeight: "900", marginBottom: "8px", animation: "blink-gold 1.8s infinite" }}>🎉 新記録！ 🎉</div>}
                {bestTime !== null && <div style={{ color: "#fbbf24", fontSize: "18px", marginBottom: "8px" }}>🏆 ただ今のベスト：{fmt(bestTime)}秒</div>}
                <div style={{ color: "#555", fontSize: "15px", marginBottom: "6px" }}>{feedback?.msg}</div>
                <div style={{ fontSize: "18px", color: "#5cb85c", fontStyle: "italic", marginBottom: "20px" }}>to be happy... 🍀</div>
                <div style={{ display: "flex", gap: "14px", marginBottom: "14px" }}>
                  <div style={{ flex: 1 }}><PBtn label="次の問題へ 🃏" onClick={() => startGame(false)} /></div>
                </div>
              </>
            )}
            <div style={{ display: "flex", gap: "14px" }}>
              <div style={{ flex: 1 }}>
                <button onClick={() => startGame(true)} style={{ background: "linear-gradient(135deg,#ff69b4,#ff1493)", border: "none", borderRadius: "14px", color: "white", fontWeight: "bold", fontSize: "16px", padding: "18px 0", cursor: "pointer", width: "100%" }}>やり方を学ぶ 📖</button>
              </div>
              <div style={{ flex: 1 }}><GBtn label="タイトルへ" onClick={() => setPhase("start")} /></div>
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
