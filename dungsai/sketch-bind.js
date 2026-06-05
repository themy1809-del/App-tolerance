/* Sketch auto-bind — Tự động gán sketch cho rule cũ trong tolerances-data.js
   mà không cần sửa data gốc. Match theo (element, feature). */
(function(){
  if (!window.APP_DATA || !window.DS_SKETCH) return;
  const D = window.APP_DATA;
  const SK = window.DS_SKETCH;

  /* Bảng map (element regex, feature regex) → sketch key */
  const MAP = [
    /* Plumb / verticality */
    [/column|cot|tru/i, /plumb|straight|vertical|thẳng đứng/i, 'column_plumb'],
    [/tank|bồn|vessel/i, /plumb|vertical|thẳng đứng/i, 'tank_plumb'],

    /* Beam straightness */
    [/beam|girder|dầm|rafter/i, /straight|camber|sweep|bow|cong|vong/i, 'beam_straight'],
    [/purlin|xà gồ/i, /straight|cong/i, 'beam_straight'],

    /* Floor / plate flatness */
    [/plate|tấm|floor|deck|sàn/i, /flat|plan|phẳng/i, 'floor_flatness'],

    /* Bolt hole position */
    [/connection|liên kết|bolt|hole|lỗ/i, /position|pitch|gauge|edge|vị trí/i, 'bolt_hole'],

    /* Weld undercut */
    [/weld|butt|fillet|hàn|mối/i, /undercut|cháy chân/i, 'weld_undercut'],

    /* Weld reinforcement */
    [/weld|butt|hàn|mối/i, /reinforcement|convex|lồi/i, 'weld_reinforcement'],

    /* Fillet leg */
    [/fillet|góc/i, /leg|throat|size|kích thước/i, 'fillet_leg'],

    /* Tank/vessel roundness */
    [/tank|shell|bồn/i, /round|diameter|đường kính|méo/i, 'tank_round'],
    [/vessel|pressure|áp lực/i, /round|oor|out.?of.?round|méo/i, 'vessel_oor'],

    /* Tank bottom */
    [/bottom|đáy/i, /flat|phẳng/i, 'tank_bottom']
  ];

  function findSketch(rule){
    if (!rule || rule.sketch) return null; // already has sketch
    const el = rule.element || '';
    const ft = rule.feature || '';
    const title = (rule.title && (rule.title.vi || rule.title.en || '')) || '';
    const hay = el + ' ' + title;
    for (const [eRe, fRe, key] of MAP){
      if (eRe.test(hay) && fRe.test(ft + ' ' + title)){
        if (SK[key]) return key;
      }
    }
    return null;
  }

  let bound = 0;
  D.tolerances.forEach(r => {
    const k = findSketch(r);
    if (k){ r.sketch = k; bound++; }
  });

  console.log(`Sketch auto-bind: gắn ${bound} sketches cho rule cũ`);
})();
