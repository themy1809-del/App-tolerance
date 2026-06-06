(function(){
  if (!window.APP_DATA || !window.DS_SKETCH) return;
  var D = window.APP_DATA, SK = window.DS_SKETCH;

  function flat(v){
    if (v == null) return '';
    if (typeof v === 'string') return v;
    if (Array.isArray(v)) return v.map(flat).join(' ');
    if (typeof v === 'object'){
      var s = '';
      for (var k in v) s += ' ' + flat(v[k]);
      return s;
    }
    return String(v);
  }
  function norm(s){
    return s.normalize('NFD').replace(/[̀-ͯ]/g,'')
            .replace(/[đĐ]/g,'d').toLowerCase();
  }

  // (regexEl, regexFt, sketchKey) — ƯU TIÊN từ trên xuống
  var MAP = [
    // ===== TIẾT DIỆN I — SPECIFIC =====
    [/tiet dien i|i to hop|i.profile|welded i|h.beam|i.beam|hep section/,
     /squareness|vuong goc|do vuong/, 'i_squareness'],
    [/tiet dien i|i to hop|welded i|i.profile|h.beam|i.beam|ban bung/,
     /lech tam bung|web off|web.centre|web center/, 'i_web_offcenter_v2'],
    [/ban bung|web plate|tiet dien i.*bung/,
     /straight|cong tam|theo chieu cao/, 'i_web_straight_v2'],
    [/canh tiet dien i|flange.*i|i.*flange|canh i|ban canh/,
     /flat|flatness|meo canh|distortion|undulation|phang/, 'i_flange_flat_v2'],

    // ===== V2 (chi tiết) =====
    [/column|cot|tru/, /plumb|verticality|thang dung|nghieng/, 'column_plumb_2axis'],
    [/beam|girder|dam|truss|keo|rafter/, /camber|vong|cong doc/, 'beam_camber_load'],
    [/fillet|filet/, /size|leg|throat|chan han|kich thuoc chan/, 'fillet_detail'],
    [/butt|cjp|doi dau|ngau hoan toan/, /reinforcement|profile|mat cat|gia cuong/, 'butt_cjp'],
    [/weld|han|porosity|ro khi/, /porosity|ro khi|inclusion|tap chat/, 'weld_porosity'],
    [/weld|han|crack|nut/, /crack|nut|ran/, 'weld_crack'],
    [/anchor|bu long neo|mong/, /position|pattern|bolt circle|vi tri/, 'anchor_bolt_pattern'],
    [/hsfg|cap 10|cap 8|pretension|preload/, /tighten|siet|turn.?of.?nut/, 'bolt_turn_nut'],
    [/slot|oversize|lo o van|lo dai/, /hole|lo|kich thuoc lo/, 'slot_hole'],
    [/cut edge|flame|plasma|mep cat/, /quality|rz|nham|do nham/, 'cut_edge'],
    [/butt|joint|moi noi|doi dau/, /high.?low|misalign|lech tam|offset|chenh mat/, 'joint_offset'],
    [/tank|shell|bon/, /circumference|chu vi|perimeter/, 'tank_circumference'],

    // ===== V1 (fallback) =====
    [/column|cot|tru/, /plumb|straight|vertical|thang dung/, 'column_plumb'],
    [/tank|bon|vessel/, /plumb|vertical|thang dung/, 'tank_plumb'],
    [/beam|girder|dam|rafter/, /straight|straightness|camber|sweep|bow|cong|vong/, 'beam_straight'],
    [/purlin|xa go/, /straight|cong/, 'beam_straight'],
    [/plate|tam|floor|deck|san/, /flat|flatness|plan|phang|meo|gon song/, 'floor_flatness'],
    [/connection|lien ket|bolt|hole|lo/, /position|pitch|gauge|edge|vi tri/, 'bolt_hole'],
    [/weld|butt|han|moi/, /undercut|chay chan/, 'weld_undercut'],
    [/weld|butt|han|moi/, /reinforcement|convex|loi/, 'weld_reinforcement'],
    [/fillet/, /leg|throat|size|kich thuoc/, 'fillet_leg'],
    [/tank|shell|bon/, /round|diameter|duong kinh|meo/, 'tank_round'],
    [/vessel|pressure|ap luc/, /round|oor|out.?of.?round|meo/, 'vessel_oor'],
    [/bottom|day/, /flat|phang/, 'tank_bottom'],
    // Catch-all defaults — chỉ chạy nếu k có gì khác match
    [/i|tiet dien|hop han|box|tube|hss|ong/, /twist|do van/, 'beam_straight'],
    [/.*/, /flatness|phang/, 'floor_flatness'],
    [/.*/, /straightness|do thang/, 'beam_straight']
  ];

  function pick(rule){
    if (!rule || rule.sketch) return null;
    var el = norm(flat(rule.element));
    var ft = norm(flat(rule.feature));
    var ti = norm(flat(rule.title || rule.title_vi || ''));
    var he = el + ' ' + ti;
    var hf = ft + ' ' + ti;
    for (var i=0;i<MAP.length;i++){
      var m = MAP[i];
      if (m[0].test(he) && m[1].test(hf)){
        if (SK[m[2]]) return m[2];
      }
    }
    return null;
  }

  var bound = 0;
  D.tolerances.forEach(function(r){
    var k = pick(r);
    if (k){ r.sketch = k; bound++; }
  });

  console.log('Sketch auto-bind v3: bound ' + bound + ', total ' +
    D.tolerances.filter(function(r){return r.sketch;}).length + '/' + D.tolerances.length);
})();
