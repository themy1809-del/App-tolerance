/* ===== AI-FAB — nút trợ lý AI nổi dùng chung cho mọi module =====
   Dùng: <script src="../assistant.js"></script>
         <script src="../ai-fab.js"></script>
         <script>AIFab.mount({ module: 'QC Hàn', color: '#b54708' });</script>
   - Trả lời offline tức thì bằng QCAssistant (trích dẫn đã xác minh)
   - Có key (localStorage qc_ai_key, dùng chung toàn app) → tự hỏi thêm AI
*/
(function () {
  'use strict';
  let CFG = { module: '', color: '#0c447c' };
  let lastAsked = '';

  function esc(s) { return String(s).replace(/</g, '&lt;'); }
  function mdLite(s) {
    return esc(s).replace(/\*\*([^*\n]+)\*\*/g, '<b>$1</b>').replace(/^[*-] /gm, '• ');
  }

  function css() {
    const st = document.createElement('style');
    st.textContent = `
#aifabBtn{position:fixed;right:14px;bottom:84px;z-index:9990;width:52px;height:52px;border-radius:50%;border:0;cursor:pointer;
  background:linear-gradient(135deg,#7c3aed,#5f4ab7);color:#fff;font-size:22px;box-shadow:0 6px 20px rgba(124,58,237,.45);
  display:flex;align-items:center;justify-content:center;transition:.2s}
#aifabBtn:hover{transform:scale(1.08)}
@media(min-width:980px){#aifabBtn{bottom:24px;right:24px}}
#aifabOvl{position:fixed;inset:0;z-index:9991;background:rgba(10,20,35,.55);backdrop-filter:blur(3px);display:none;align-items:flex-end;justify-content:center}
#aifabOvl.on{display:flex}
@media(min-width:700px){#aifabOvl.on{align-items:center}}
#aifabBox{background:#fff;width:100%;max-width:560px;max-height:82vh;border-radius:18px 18px 0 0;display:flex;flex-direction:column;overflow:hidden}
@media(min-width:700px){#aifabBox{border-radius:18px}}
#aifabHead{display:flex;align-items:center;gap:9px;padding:13px 16px;background:linear-gradient(135deg,#7c3aed,#5f4ab7);color:#fff}
#aifabHead b{font-size:14.5px}
#aifabHead .x{margin-left:auto;background:rgba(255,255,255,.18);border:0;color:#fff;width:30px;height:30px;border-radius:8px;font-size:15px;cursor:pointer}
#aifabInRow{display:flex;gap:8px;padding:12px 14px;border-bottom:1px solid #e8edf3}
#aifabIn{flex:1;padding:11px 13px;border:1.5px solid #d6dee8;border-radius:11px;font-size:14px;font-family:inherit;outline:none}
#aifabIn:focus{border-color:#7c3aed;box-shadow:0 0 0 3px rgba(124,58,237,.13)}
#aifabGo{padding:0 16px;border:0;border-radius:11px;background:linear-gradient(135deg,#7c3aed,#5f4ab7);color:#fff;font-weight:800;font-size:13px;cursor:pointer;font-family:inherit}
#aifabOut{overflow-y:auto;padding:13px 16px;font-size:13.5px;line-height:1.6;flex:1;min-height:120px}
#aifabOut .hint{color:#7e8b98;font-size:12.5px}
#aifabOut .aians{background:#faf8ff;border:1px solid #e4dcf7;border-left:4px solid #7c3aed;border-radius:12px;padding:12px 14px;margin-top:12px;white-space:pre-wrap}
#aifabOut .tag{display:inline-block;font-size:10px;font-weight:800;background:#efecfa;color:#5f4ab7;padding:2px 8px;border-radius:6px;margin-bottom:6px}
#aifabChips{display:flex;gap:6px;padding:0 14px 12px;overflow-x:auto;scrollbar-width:none}
#aifabChips button{font-size:11px;font-weight:600;padding:5px 11px;border-radius:999px;border:1px solid #d6dee8;background:#f4f7fa;cursor:pointer;white-space:nowrap;flex:none;font-family:inherit}
`;
    document.head.appendChild(st);
  }

  function html() {
    const btn = document.createElement('button');
    btn.id = 'aifabBtn'; btn.type = 'button'; btn.title = 'Hỏi trợ lý AI'; btn.textContent = '✨';
    btn.onclick = open;
    document.body.appendChild(btn);

    const ovl = document.createElement('div');
    ovl.id = 'aifabOvl';
    ovl.innerHTML = `
<div id="aifabBox">
  <div id="aifabHead"><span>✨</span><b>Trợ lý QC — ${esc(CFG.module)}</b>
    <button class="x" type="button" onclick="AIFab.close()">✕</button></div>
  <div id="aifabInRow">
    <input id="aifabIn" type="search" placeholder="Hỏi gì cũng được — Enter để hỏi" autocomplete="off">
    <button id="aifabGo" type="button">Hỏi</button>
  </div>
  <div id="aifabChips"></div>
  <div id="aifabOut"><div class="hint">💡 Gõ câu hỏi — trợ lý offline trả lời ngay (có trích dẫn tiêu chuẩn).${localStorage.getItem('qc_ai_key') ? ' AI sẽ tự trả lời thêm phía dưới.' : ' Cài API key ở trang chủ (nút ✨ Cài AI) để hỏi thêm AI.'}</div></div>
</div>`;
    ovl.addEventListener('click', e => { if (e.target === ovl) close(); });
    document.body.appendChild(ovl);

    const inp = document.getElementById('aifabIn');
    const go = document.getElementById('aifabGo');
    let t = null;
    inp.addEventListener('input', () => {
      answerOffline(inp.value.trim());
      clearTimeout(t);
      t = setTimeout(() => autoAI(inp.value.trim()), 1600);
    });
    inp.addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); clearTimeout(t); ask(inp.value.trim(), true); }
      if (e.key === 'Escape') close();
    });
    go.onclick = () => { clearTimeout(t); ask(inp.value.trim(), true); };

    /* chip gợi ý theo module */
    const chips = (window.QCAssistant && QCAssistant.EXAMPLES || []).slice(0, 6);
    const cBox = document.getElementById('aifabChips');
    cBox.innerHTML = chips.map(c => `<button type="button">${esc(c)}</button>`).join('');
    cBox.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      inp.value = b.textContent; inp.focus();
      ask(inp.value, true);
    });
  }

  function answerOffline(q) {
    const out = document.getElementById('aifabOut');
    if (q.length < 2) { out.innerHTML = '<div class="hint">💡 Gõ câu hỏi để bắt đầu.</div>'; return ''; }
    let a = '';
    try { if (window.QCAssistant) a = QCAssistant.answer(q) || ''; } catch (e) {}
    out.innerHTML = (a || '<div class="hint">Chưa có đáp án offline cho câu này' + (localStorage.getItem('qc_ai_key') ? ' — AI sẽ trả lời sau giây lát…' : ' — cài API key để hỏi AI.') + '</div>') + '<div id="aifabAiSlot"></div>';
    return a;
  }

  function autoAI(q) {
    if (!q || q.length < 8 || q === lastAsked) return;
    if (!localStorage.getItem('qc_ai_key')) return;
    if (q.split(/\s+/).length < 3 && !(window.QCAssistant && QCAssistant.isQuestion(q))) return;
    ask(q, false);
  }

  async function ask(q, manual) {
    if (!q) return;
    if (manual) answerOffline(q);
    const key = localStorage.getItem('qc_ai_key');
    const slot = document.getElementById('aifabAiSlot');
    if (!key || !slot) return;
    if (q === lastAsked && !manual) return;
    lastAsked = q;
    slot.innerHTML = '<div class="aians"><span class="tag">AI · CẦN KIỂM CHỨNG</span><br>⏳ AI đang trả lời…</div>';
    try {
      const ans = await QCAssistant.askClaude(q, 'Người hỏi đang ở module: ' + CFG.module, key);
      slot.innerHTML = '<div class="aians"><span class="tag">AI · CẦN KIỂM CHỨNG</span><br>' + mdLite(ans) + '</div>';
    } catch (e) {
      slot.innerHTML = '<div class="aians"><span class="tag">LỖI</span><br>' + esc(e.message || e) + '</div>';
    }
  }

  function open() {
    document.getElementById('aifabOvl').classList.add('on');
    setTimeout(() => document.getElementById('aifabIn').focus(), 80);
  }
  function close() { document.getElementById('aifabOvl').classList.remove('on'); }

  window.AIFab = {
    mount(cfg) {
      CFG = Object.assign(CFG, cfg || {});
      if (document.getElementById('aifabBtn')) return;
      css(); html();
    },
    open, close
  };
})();
