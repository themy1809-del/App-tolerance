/* Sketch Overlay v2 — Parametric upgrade với layout không đè lên sketch gốc.
   Mở rộng viewBox phía dưới để chèn "RULE BADGE" riêng — giá trị thực
   của từng rule. 200+ rule giờ KHÔNG bị nhìn giống nhau. */
(function(){
  if (!window.DS_SKETCH) return;
  var S = window.DS_SKETCH;

  function tx(o){
    if (!o) return '';
    if (typeof o === 'string') return o;
    if (o.vi) return o.vi;
    if (o.en) return o.en;
    return String(o);
  }
  function esc(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function getExpr(rule){
    if (!rule || !rule.permitted) return '';
    var e = rule.permitted.expression;
    if (typeof e === 'string') return e;
    if (typeof e === 'object') return tx(e);
    return '';
  }
  function getUnit(rule){
    return (rule && rule.permitted && rule.permitted.unit) || '';
  }
  function getAccept(rule){
    return tx(rule && rule.acceptance);
  }
  function getStd(rule){
    return (rule && rule.standard) || '';
  }
  function getClause(rule){
    if (!rule || !rule.clause) return '';
    var c = rule.clause.number || '';
    if (rule.clause.page) c += ' · tr.' + rule.clause.page;
    return c;
  }
  function getKind(rule){
    return (rule && rule.permitted && rule.permitted.kind) || '';
  }
  // Cắt text dài cho vừa SVG
  function shorten(s, max){
    if (!s) return '';
    if (s.length <= max) return s;
    return s.slice(0, max-1) + '…';
  }
  // Tự xuống dòng cho acceptance dài
  function wrap2(s, max){
    if (!s) return ['', ''];
    if (s.length <= max) return [s, ''];
    // tìm khoảng trống gần max
    var cut = s.lastIndexOf(' ', max);
    if (cut < max/2) cut = max;
    return [s.slice(0, cut), shorten(s.slice(cut+1), max)];
  }

  function buildOverlay(rule){
    if (!rule) return { svgAppend: '', heightAdd: 0 };
    var std = esc(getStd(rule));
    var clause = esc(getClause(rule));
    var expr = esc(getExpr(rule));
    var unit = esc(getUnit(rule));
    var kind = esc(getKind(rule));
    var accept = esc(getAccept(rule));
    var acceptLines = wrap2(accept, 90);
    var fullExpr = expr;
    if (expr && unit && !expr.match(/mm|µm|um|°|\bmin\b/i)) fullExpr = expr + ' ' + unit;
    if (!fullExpr) fullExpr = 'Tham chiếu định tính (xem dưới)';

    // Overlay block — đặt y bắt đầu từ 290 (sau viewBox gốc), thêm 110px
    var y0 = 290;
    var H = 110;

    var kindBadge = '';
    var kindCol = '#0c447c';
    if (kind === 'FIXED'){ kindBadge = 'GIÁ TRỊ CỐ ĐỊNH'; kindCol = '#0f6e56'; }
    else if (kind === 'FORMULA'){ kindBadge = 'CÔNG THỨC TÍNH'; kindCol = '#185fa5'; }
    else if (kind === 'REF'){ kindBadge = 'THAM CHIẾU'; kindCol = '#854f0b'; }
    else if (kind === 'TABLE'){ kindBadge = 'BẢNG NHIỀU CẤP'; kindCol = '#7c3f00'; }
    else if (kind === 'MULTI'){ kindBadge = 'NHIỀU BỘ DUNG SAI'; kindCol = '#5f4ab7'; }

    return {
      heightAdd: H,
      svgAppend: '<g class="rule-overlay" pointer-events="none" font-family="Arial,sans-serif">'
        // separator line
        + '<line x1="0" y1="' + y0 + '" x2="500" y2="' + y0 + '" stroke="#0c447c" stroke-width="2"/>'
        // banner standard | clause
        + '<rect x="0" y="' + y0 + '" width="500" height="22" fill="#0c447c"/>'
        + '<text x="8" y="' + (y0+15) + '" font-size="11" fill="#fff" font-weight="800">' + std + '</text>'
        + '<text x="492" y="' + (y0+15) + '" font-size="10" fill="#cbd9e8" text-anchor="end">' + clause + '</text>'
        // kind tag
        + '<rect x="8" y="' + (y0+28) + '" width="125" height="18" fill="' + kindCol + '"/>'
        + '<text x="70" y="' + (y0+41) + '" font-size="10" fill="#fff" font-weight="800" text-anchor="middle">' + kindBadge + '</text>'
        // permitted expression — giá trị riêng từng rule
        + '<text x="145" y="' + (y0+43) + '" font-size="15" fill="#aa4322" font-weight="900">' + esc(fullExpr) + '</text>'
        // acceptance line
        + '<text x="8" y="' + (y0+66) + '" font-size="10.5" fill="#1b2430" font-weight="700">✓ Tiêu chí ĐẠT:</text>'
        + '<text x="8" y="' + (y0+82) + '" font-size="10" fill="#1b2430">' + esc(acceptLines[0]) + '</text>'
        + (acceptLines[1] ? '<text x="8" y="' + (y0+96) + '" font-size="10" fill="#1b2430">' + esc(acceptLines[1]) + '</text>' : '')
        + '</g>'
    };
  }

  function inject(svgStr, rule){
    if (!svgStr || !rule) return svgStr;
    var ov = buildOverlay(rule);
    if (!ov.svgAppend) return svgStr;

    // 1) Cập nhật viewBox để chứa overlay phía dưới
    svgStr = svgStr.replace(/viewBox="([\d\.\-]+)\s+([\d\.\-]+)\s+([\d\.\-]+)\s+([\d\.\-]+)"/i, function(m, x, y, w, h){
      var newH = parseFloat(h) + ov.heightAdd;
      return 'viewBox="' + x + ' ' + y + ' ' + w + ' ' + newH + '"';
    });
    // 2) Chèn overlay trước </svg>
    return svgStr.replace(/<\/svg>\s*$/i, ov.svgAppend + '</svg>');
  }

  var wrapped = 0;
  Object.keys(S).forEach(function(key){
    var orig = S[key];
    if (typeof orig !== 'function' || orig.__wrapped) return;
    var wrap = function(rule){
      var base;
      try { base = orig(rule); } catch(e){ try { base = orig(); } catch(e2){ base = ''; } }
      if (typeof base !== 'string') return base;
      return inject(base, rule);
    };
    wrap.__wrapped = true;
    S[key] = wrap;
    wrapped++;
  });

  console.log('Sketch overlay v2: wrapped ' + wrapped + ' sketches → parametric (extended viewBox)');
})();
