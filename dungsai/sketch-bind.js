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
  function noDiac(s){
    return s.normalize('NFD').replace(/[̀-ͯ]/g,'')
            .replace(/[dD]/g,'d').toLowerCase()
            .replace(/\b(d)/g,'d');
  }
  // We also fold d->d (đ->d done via NFD + combining mark strip)
  // Replace standalone đ chars that survive
  function key(s){
    return s.replace(/[đĐ]/g,'d').toLowerCase();
  }
  function norm(s){ return noDiac(key(s)); }

  var MAP = [
    [/column|cot|tru/, /plumb|verticality|thang dung|nghieng/, 'column_plumb_2axis'],
    [/beam|girder|dam|truss|keo|rafter/, /camber|vong|cong doc/, 'beam_camber_load'],
    [/fillet|goc|filet/, /size|leg|throat|chan han/, 'fillet_detail'],
    [/butt|cjp|doi dau|ngau hoan toan/, /reinforcement|profile|mat cat|gia cuong/, 'butt_cjp'],
    [/weld|han|porosity|ro khi/, /porosity|ro khi|inclusion|tap chat/, 'weld_porosity'],
    [/weld|han|crack|nut/, /crack|nut|ran/, 'weld_crack'],
    [/anchor|bu long neo|mong/, /position|pattern|bolt circle|vi tri/, 'anchor_bolt_pattern'],
    [/hsfg|cap 10|cap 8|pretension|preload/, /tighten|siet|turn.?of.?nut/, 'bolt_turn_nut'],
    [/slot|oversize|lo o van|lo dai/, /hole|lo|kich thuoc lo/, 'slot_hole'],
    [/cut edge|flame|plasma|mep cat/, /quality|rz|nham|do nham/, 'cut_edge'],
    [/butt|joint|moi noi|doi dau/, /high.?low|misalign|lech tam|offset|chenh mat/, 'joint_offset'],
    [/tank|shell|bon/, /circumference|chu vi|perimeter/, 'tank_circumference'],
    [/column|cot|tru/, /plumb|straight|vertical|thang dung/, 'column_plumb'],
    [/tank|bon|vessel/, /plumb|vertical|thang dung/, 'tank_plumb'],
    [/beam|girder|dam|rafter|tiet dien i|i to hop/, /straight|straightness|camber|sweep|bow|cong|vong/, 'beam_straight'],
    [/purlin|xa go/, /straight|cong/, 'beam_straight'],
    [/plate|tam|floor|deck|san|ban bung|ban canh|canh tiet dien/, /flat|flatness|plan|phang|meo|gon song/, 'floor_flatness'],
    [/connection|lien ket|bolt|hole|lo/, /position|pitch|gauge|edge|vi tri/, 'bolt_hole'],
    [/weld|butt|fillet|han|moi/, /undercut|chay chan/, 'weld_undercut'],
    [/weld|butt|han|moi/, /reinforcement|convex|loi/, 'weld_reinforcement'],
    [/fillet|goc/, /leg|throat|size|kich thuoc/, 'fillet_leg'],
    [/tank|shell|bon/, /round|diameter|duong kinh|meo/, 'tank_round'],
    [/vessel|pressure|ap luc/, /round|oor|out.?of.?round|meo/, 'vessel_oor'],
    [/bottom|day/, /flat|phang/, 'tank_bottom'],
    [/.*/, /squareness|do vuong/, 'fillet_leg'],
    [/i|tiet dien|hop han|box|tube|hss|ong/, /twist|do van/, 'beam_straight'],
    [/.*/, /flatness|phang/, 'floor_flatness'],
    [/.*/, /straightness|do thang/, 'beam_straight']
  ];

  function pickSketch(rule){
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
    var k = pickSketch(r);
    if (k){ r.sketch = k; bound++; }
  });

  console.log('Sketch auto-bind v2: bound ' + bound + ', total ' +
    D.tolerances.filter(function(r){return r.sketch;}).length + '/' + D.tolerances.length);
})();
