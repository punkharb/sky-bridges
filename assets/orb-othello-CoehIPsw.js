import{A as e,B as t,C as n,D as r,E as i,F as a,G as o,H as s,I as c,K as l,L as u,M as d,N as f,O as p,P as m,R as h,S as g,T as _,U as v,V as y,W as b,_ as x,b as S,c as C,d as w,f as T,g as E,h as D,i as ee,j as O,k,l as A,m as te,n as j,o as M,r as N,s as ne,t as re,u as ie,v as P,w as F,x as I,y as L,z as ae}from"./index-C0nr0woY.js";import{a as oe,i as R,n as se,o as ce,r as z,s as le,t as ue}from"./board-DJ2SqiVI.js";var de=[[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]],B=[`tectonic`,`holes`,`nova`,`night`],V=e=>3-e,H=(e,t,n=16)=>e*n+(t%n+n)%n,U=(e,t=16)=>Math.floor(e/t),W=(e,t=16)=>e%t;function G(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function fe(e=8,t=16){let n=e/2-1,r=t/2-1;return[[n,r,2],[n,r+1,1],[n+1,r,1],[n+1,r+1,2]]}function K(e,t,n){let{rows:r,cols:i,cells:a}=e,o=[],s=(e,t)=>{let n=Math.abs(U(e,i)-U(t,i)),r=Math.abs(W(e,i)-W(t,i));return n<=1&&Math.min(r,i-r)<=1},c=t=>a[t]!==0||e.stars[t]||o.some(e=>s(t,e))||[...a].some((e,n)=>e!==0&&s(t,n)),l=[];for(let e=0;l.length<t*2&&e<500;e++){let e=1+Math.floor(n()*(r-2)),t=Math.floor(n()*i),a=H(e,t,i),u=H(r-1-e,t+i/2,i);a===u||c(a)||c(u)||s(a,u)||(o.push(a,u),l.push(a,u))}return l}function pe({rows:e=8,cols:t=16,start:n=fe(e,t),first:r=1,rules:i={},seed:a=1}={}){let o={rows:e,cols:t,cells:new Int8Array(e*t),stars:new Uint8Array(e*t),current:r,history:z(),ply:0,seed:a>>>0,rules:Object.fromEntries(B.map(e=>[e,!!i[e]]))};for(let[e,r,i]of n)o.cells[H(e,r,t)]=i;let s=G(o.seed);if(o.rules.holes)for(let e of K(o,3,s))o.cells[e]=3;if(o.rules.nova)for(let e of K(o,2,s))o.stars[e]=1;return o.nightOffset=Math.floor(s()*t),o}function me(e){return{...e,cells:e.cells.slice(),stars:e.stars.slice(),rules:{...e.rules},history:z(),_night:null,_moves:null}}var he=(e,t=e.ply)=>(((e.nightOffset??0)+t)%e.cols+e.cols)%e.cols;function q(e,t=e.ply){if(!e.rules?.night)return[];let n=he(e,t);return Array.from({length:5},(t,r)=>(n+r)%e.cols)}function ge(e){if(!e.rules?.night)return null;if(e._night?.ply===e.ply)return e._night.mask;let t=new Uint8Array(e.cols);for(let n of q(e))t[n]=1;return e._night={ply:e.ply,mask:t},t}var _e=(e,t)=>!!ge(e)?.[W(t,e.cols)];function ve(e,t){let n=G((e.seed^Math.imul(t,2654435761))>>>0);return n(),{row:1+Math.floor(n()*(e.rows-2)),k:(n()<.5?-1:1)*(n()<.6?1:2)}}function ye(e){if(!e.rules?.tectonic)return null;let t=Math.floor(e.ply/6)+1;return{...ve(e,t),in:t*6-e.ply,n:t}}function be(e,t,n){let{cols:r}=e,i=t*r,a=e.cells.slice(i,i+r),o=e.stars.slice(i,i+r);for(let t=0;t<r;t++){let s=i+((t+n)%r+r)%r;e.cells[s]=a[t],e.stars[s]=o[t]}}function J(e,t,n=e.current){let{rows:r,cols:i,cells:a}=e;if(a[t]!==0)return[];let o=ge(e),s=U(t,i),c=W(t,i),l=V(n),u=[];for(let[e,d]of de){let f=[],p=!1,m=s+e,h=c+d;for(;m>=0&&m<r;){let r=H(m,h,i);if(r===t){f.length&&u.push(f);break}let s=a[r];if(s===l)f.push(r),o&&o[W(r,i)]&&(p=!0);else{s===n&&f.length&&!p&&u.push(f);break}m+=e,h+=d}}if(u.length>1){let e=new Set;return u.filter(t=>{let n=[...t].sort((e,t)=>e-t).join(`,`);return!e.has(n)&&e.add(n)})}return u}function xe(e,t,n=e.current){let{rows:r,cols:i,cells:a}=e;if(a[t]!==0)return!1;let o=ge(e),s=U(t,i),c=W(t,i),l=V(n);for(let[e,u]of de){let d=s+e,f=c+u,p=0,m=!1;for(;d>=0&&d<r;){let r=H(d,f,i);if(r===t){if(p>0)return!0;break}let s=a[r];if(s===l)p++,o&&o[W(r,i)]&&(m=!0);else{if(s===n&&p>0&&!m)return!0;break}d+=e,f+=u}}return!1}function Y(e,t=e.current){let n=[];for(let r=0;r<e.cells.length;r++)e.cells[r]===0&&xe(e,r,t)&&n.push(r);return n}function Se(e,t,n=e.current){let{rows:r,cols:i,cells:a}=e,o=V(n),s=[],c=U(t,i);for(let[n,l]of de){let u=c+n;if(u<0||u>=r)continue;let d=H(u,W(t,i)+l,i);a[d]===o&&!_e(e,d)&&s.push(d)}return s}function Ce(e){if(e.ply++,!e.rules.tectonic||e.ply%6)return null;let t=ve(e,e.ply/6);return be(e,t.row,t.k),t}function we(e,t){let n=e.current;if(t===-1){if(Y(e,n).length)return null;e.current=V(n);let t=Ce(e);return e.history.push({player:n,move:-1,lines:[],flipped:[],nova:[],shift:t})}let r=J(e,t,n);if(!r.length)return null;let i=[...new Set(r.flat())],a=[],o=!!e.stars[t];o&&(a=Se(e,t,n).filter(e=>!i.includes(e)),i.push(...a),e.stars[t]=0),e.cells[t]=n;for(let t of i)e.cells[t]=n;e.current=V(n);let s=Ce(e);return e.history.push({player:n,move:t,lines:r,flipped:i,nova:a,star:o,shift:s})}function Te(e){let t=e.history.pop();if(t){if(t.shift&&be(e,t.shift.row,-t.shift.k),e.ply--,t.move!==-1){e.cells[t.move]=0;for(let n of t.flipped)e.cells[n]=V(t.player);t.star&&(e.stars[t.move]=1)}return e.current=t.player,t}}function Ee(e){let t={1:0,2:0};for(let n of e.cells)(n===1||n===2)&&t[n]++;return t}function X(e,t){let n=e.rules.night;e.rules.night=!1;let r=Y(e,t).length;return e.rules.night=n,r}function De(e){if(Y(e,1).length||Y(e,2).length)return!1;if(!e.rules.night||!X(e,1)&&!X(e,2))return!0;let t=e.history.entries;return t.length>=e.cols&&t.slice(-e.cols).every(e=>e.move===-1)}function Oe(e){let t=Ee(e),n=De(e);return{over:n,scores:t,winner:n?t[1]===t[2]?0:t[1]>t[2]?1:2:null}}var ke=e=>!Y(e).length&&!De(e);function*Ae(e,{moves:t,play:n,undo:r,evaluate:i,isOver:a=()=>!1,depth:o=3,order:s},c){let l=(e,t)=>{let i=n(e,t);return r?e:i};function*u(e,n,o,d){if(c.due()&&(yield),n===0||c.out()||a(e))return i(e);let f=t(e);if(!f.length)return i(e);s&&(f=s(e,f));let p=-1/0;for(let t of f){let i=-(yield*u(l(e,t),n-1,-d,-o));if(r&&r(e,t),i>p&&(p=i),p>o&&(o=p),o>=d)break}return p}let d=t(e);s&&(d=s(e,d));let f=d[0];for(let t=1;t<=o;t++){let n=-1/0,i=d[0];for(let a of d){let o=-(yield*u(l(e,a),t-1,-1/0,1/0));if(r&&r(e,a),c.out())break;o>n&&([n,i]=[o,a])}if(c.out())break;f=i,d=[i,...d.filter(e=>e!==i)]}return f}var je=()=>new Promise(e=>{if(typeof MessageChannel>`u`)return setTimeout(e,0);let t=new MessageChannel;t.port1.onmessage=()=>(t.port1.close(),e()),t.port2.postMessage(0)});async function Me(e,{timeLimitMs:t=1e3,sliceMs:n=8,cancelled:r,pause:i=je,...a}={}){let o=0,s=performance.now(),c=!1,l=Ae(e,a,{due:()=>performance.now()-s>n,out:()=>c||=o+performance.now()-s>t});for(;;){let e=l.next();if(e.done)return e.value;if(o+=performance.now()-s,await i(),r?.())return;s=performance.now()}}var Ne={easy:{label:`Easy`},medium:{label:`Medium`,depth:2,timeLimitMs:200},hard:{label:`Hard`,depth:12,timeLimitMs:350}},Pe=6,Fe=-3,Ie=4,Le=3,Re=1,ze=14,Be=4,Ve=1;function He(e){return e._moves||={mine:Y(e,e.current),theirs:Y(e,V(e.current))},e._moves}var Ue=e=>{let t=He(e);return t.mine.length||t.theirs.length?!1:(t.over===void 0&&(t.over=De(e)),t.over)};function We(e,t){let{rows:n,cols:r,cells:i}=e,a=U(t,r);if(a===0||a===n-1)return Pe;let o=1;if(e.rules?.holes){let e=W(t,r);for(let t=-1;t<=1;t++)for(let n=-1;n<=1;n++)i[H(a+t,e+n,r)]===3&&(o+=Ve)}if(a===1||a===n-2){let e=a===1?0:n-1,s=W(t,r);return i[H(e,s-1,r)]===0||i[H(e,s,r)]===0||i[H(e,s+1,r)]===0?Fe:o}return o}function Ge(e,{mobility:t=!0}={}){let{rows:n,cols:r,cells:i}=e,a=e.current,o=0,s=0,c=0,l=0;for(let u=0;u<i.length;u++){let d=i[u];if(d===0){s++;continue}if(d===3)continue;let f=d===a?1:-1;if(o+=f,c+=f*We(e,u),t){let e=U(u,r),t=W(u,r);for(let a=-1;a<=1;a++){let o=e+a;if(!(o<0||o>=n)&&(i[H(o,t-1,r)]===0||i[H(o,t,r)]===0||i[H(o,t+1,r)]===0)){l+=f;break}}}}if(Ue(e))return o>0?1e4+o:o<0?-1e4+o:0;for(let e of[0,n-1]){let t=!0,n=0;for(let o=0;o<r&&t;o++){let s=i[H(e,o,r)];s===0?t=!1:n+=s===a?1:-1}t&&(c+=n*Ie)}let u=c;if(t){let t=He(e);if(u+=Le*(t.mine.length-t.theirs.length)-Re*l,e.rules?.nova){for(let n of t.mine)e.stars[n]&&(u+=Be);for(let n of t.theirs)e.stars[n]&&(u-=Be)}}return s<=ze&&(u+=o*(15-s)),u}var Ke=e=>{let t=He(e);return t.mine.length?t.mine:Ue(e)?[]:[-1]},qe=(e,t)=>{we(e,t),e._moves=null},Je=e=>{Te(e),e._moves=null};function Ye(e,t,n){if(n()<.35)return t[Math.floor(n()*t.length)];let r=t[0],i=-1/0;for(let a of t){let t=we(e,a).flipped.length+.3*We(e,a)+n()*3;Te(e),t>i&&([r,i]=[a,t])}return r}function Xe(e,t,{random:n=Math.random,...r}){let i=me(e),a=Y(i);if(!a.length)return{now:-1};if(a.length===1)return{now:a[0]};if(t===`easy`)return{now:Ye(i,a,n)};let o={...Ne[t]??Ne.hard,...r},s=t!==`medium`,c=(e,t)=>We(e,t)+(e.stars[t]?8:0);return{g:i,search:{moves:Ke,play:qe,undo:Je,evaluate:e=>Ge(e,{mobility:s}),isOver:Ue,order:(e,t)=>t.length<2?t:t.map(t=>[t,c(e,t)]).sort((e,t)=>t[1]-e[1]).map(([e])=>e),depth:o.depth,timeLimitMs:o.timeLimitMs}}}async function Ze(e,t=`hard`,{cancelled:n,sliceMs:r=8,pause:i,...a}={}){let{now:o,g:s,search:c}=Xe(e,t,a);return o===void 0?Me(s,{...c,cancelled:n,sliceMs:r,...i&&{pause:i}}):o}var Qe=`
  uniform vec3 uBase, uNebA, uNebB, uNebC, uGiantDir, uGiantA, uGiantB, uGiantLight;
  uniform float uNebula, uStars, uGiantSize, uSeed;
  varying vec3 vDir;
  
  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 x) {
    vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  const mat3 ROT = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64); // rotate octaves: no grid artefacts
  float fbm(vec3 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 6; i++) { s += a * noise(p); p = ROT * p * 2.03 + 0.7; a *= 0.5; } return s; }

  void main() {
    vec3 d = normalize(vDir);
    vec3 col = uBase;
    vec3 q = d * 2.2 + uSeed;
    // nebula: domain-warped clouds in three colours, brightest along a tilted galactic band
    vec3 w = vec3(fbm(q + 3.1), fbm(q + 7.7), fbm(q + 1.3));
    float n = fbm(q * 1.4 + w * 1.6);
    float bd = dot(d, normalize(vec3(0.25, 1.0, -0.35))) * 2.4;
    float band = exp(-bd * bd); // (pow() of a negative number is NaN in GLSL, and bloom smears NaN everywhere)
    float dust = smoothstep(0.42, 0.9, n) * (0.25 + 0.75 * band);
    vec3 neb = mix(uNebA, uNebB, smoothstep(0.3, 0.7, w.x));
    neb = mix(neb, uNebC, smoothstep(0.55, 0.85, w.y) * 0.8);
    col += neb * dust * uNebula;
    col *= 1.0 - smoothstep(0.55, 0.75, fbm(q * 3.0 + 9.0)) * band * 0.6; // dark dust lanes
    // stars at three scales (hash cells on the sphere); brighter and denser inside the band
    for (int k = 0; k < 3; k++) {
      float sc = 90.0 + float(k) * 140.0;
      vec3 c = d * sc;
      vec3 id = floor(c);
      float h = hash(id + float(k) * 13.0);
      vec3 pos = id + 0.5 + (vec3(hash(id + 1.1), hash(id + 2.2), hash(id + 3.3)) - 0.5) * 0.7;
      float dist = length(c - pos);
      float on = step(1.0 - (0.06 + 0.1 * band) * uStars, h);
      float size = 0.05 + 0.1 * hash(id + 4.4) * (k == 0 ? 2.0 : 1.0);
      vec3 tint = mix(vec3(0.75, 0.85, 1.0), vec3(1.0, 0.85, 0.65), hash(id + 5.5));
      col += tint * on * smoothstep(size, 0.0, dist) * (k == 0 ? 2.2 : 1.1);
    }
    // a distant banded gas giant, lit from one side
    float gd = dot(d, uGiantDir);
    float ang = acos(clamp(gd, -1.0, 1.0));
    if (uGiantSize > 0.0 && ang < uGiantSize * 1.25) {
      vec3 up = normalize(cross(uGiantDir, vec3(0.2, 1.0, 0.1)));
      vec3 rt = cross(up, uGiantDir);
      vec2 p = vec2(dot(d, rt), dot(d, up)) / sin(uGiantSize);
      float r2 = dot(p, p);
      if (r2 < 1.0) {
        vec3 sn = normalize(p.x * rt + p.y * up - sqrt(1.0 - r2) * uGiantDir);
        float lat = p.y * 0.9 + 0.12 * p.x;
        float bands = fbm(vec3(lat * 9.0, lat * 2.0, p.x * 0.6 + uSeed));
        vec3 gc = mix(uGiantA, uGiantB, bands);
        float lit = smoothstep(-0.15, 0.6, dot(sn, uGiantLight));
        float limb = pow(1.0 - sqrt(1.0 - r2), 3.0);
        col = mix(col, gc * (0.03 + lit * 0.9) + uGiantB * limb * lit * 0.6, smoothstep(1.0, 0.985, r2));
      }
      float halo = smoothstep(uGiantSize * 1.25, uGiantSize, ang) * smoothstep(uGiantSize * 0.98, uGiantSize * 1.02, ang);
      col += uGiantB * halo * 0.25 * smoothstep(-0.2, 0.5, dot(normalize(d - uGiantDir), uGiantLight));
    }
    gl_FragColor = vec4(col, 1.0);
  }`;function $e(e,{size:t=1024,seed:n=1,base:r=`#020208`,nebula:i=[`#3a1a6a`,`#0f4a6e`,`#8a3a5a`],nebulaStrength:a=.55,stars:o=1,giant:s={dir:[-.6,.18,-.78],size:.16,colors:[`#5a3a6e`,`#d9a07a`],light:[.8,.3,.5]}}={}){let l=e=>new b(...e).normalize(),d={uBase:{value:new T(r)},uNebA:{value:new T(i[0])},uNebB:{value:new T(i[1])},uNebC:{value:new T(i[2])},uNebula:{value:a},uStars:{value:o},uSeed:{value:n*7.31},uGiantDir:{value:l(s?s.dir:[0,1,0])},uGiantSize:{value:s?s.size:0},uGiantA:{value:new T(s?s.colors[0]:`#000`)},uGiantB:{value:new T(s?s.colors[1]:`#000`)},uGiantLight:{value:l(s?s.light:[1,0,0])}},f=new c,p=new u({uniforms:d,side:1,depthWrite:!1,vertexShader:`varying vec3 vDir; void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:Qe}),m=new F(new M(10,10,10),p);f.add(m);let h=new ee(t,{type:P,generateMipmaps:!0,minFilter:I});return new te(.1,100,h).update(e,f),m.geometry.dispose(),p.dispose(),h.texture}function et(e,{thickness:t=.12,day:n=`#5fb4ff`,sunset:r=`#ff8a5c`,night:i=`#3a2a7a`,strength:a=1}={}){let o=1+t,s={uDay:{value:new T(n)},uSunset:{value:new T(r)},uNight:{value:new T(i)},uLight:{value:new b(0,1,0)},uLimb:{value:Math.sqrt(1-1/(o*o))},uStrength:{value:a}},c=new F(new h(e*o,96,48),new u({uniforms:s,vertexShader:`
        varying vec3 vNormalV, vViewV, vNormalW;
        void main() {
          vNormalV = normalize(normalMatrix * normal);
          vNormalW = normalize(mat3(modelMatrix) * normal);
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vViewV = normalize(-mv.xyz);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        uniform vec3 uDay, uSunset, uNight, uLight;
        uniform float uLimb, uStrength;
        varying vec3 vNormalV, vViewV, vNormalW;
        void main() {
          // back faces: 0 at the outer edge of the shell, uLimb where it meets the planet's silhouette
          float t = clamp(-dot(vNormalV, vViewV) / uLimb, 0.0, 1.0);
          float a = pow(t, 2.6);
          float l = dot(vNormalW, uLight);
          vec3 c = mix(uNight * 0.6, uSunset * 0.7, smoothstep(-0.3, -0.02, l));
          c = mix(c, uDay, smoothstep(-0.06, 0.3, l));
          float lit = 0.25 + 0.75 * smoothstep(-0.4, 0.3, l);
          gl_FragColor = vec4(c * a * lit * uStrength, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`,side:1,transparent:!0,blending:2,depthWrite:!1}));return c.raycast=()=>{},{mesh:c,uniforms:s,setLight:e=>s.uLight.value.copy(e).normalize(),setColors({day:e,sunset:t,night:n}={}){e&&s.uDay.value.set(e),t&&s.uSunset.value.set(t),n&&s.uNight.value.set(n)}}}function tt(e){let t=document.createElement(`canvas`);t.width=t.height=256;let n=t.getContext(`2d`);if(e===`glow`){let e=n.createRadialGradient(128,128,0,128,128,128);e.addColorStop(0,`rgba(255,255,255,1)`),e.addColorStop(.08,`rgba(255,255,255,0.9)`),e.addColorStop(.25,`rgba(255,255,255,0.25)`),e.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=e,n.fillRect(0,0,256,256)}else if(e===`rays`){n.translate(128,128);for(let e=0;e<14;e++){n.rotate(Math.PI*2/14+e%3*.07);let t=128*(e%2?.55:.95),r=n.createLinearGradient(0,0,t,0);r.addColorStop(0,`rgba(255,255,255,0.7)`),r.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=r,n.beginPath(),n.moveTo(0,-2.5),n.lineTo(t,0),n.lineTo(0,2.5),n.fill()}}else if(e===`streak`){let e=n.createLinearGradient(0,0,256,0);e.addColorStop(0,`rgba(255,255,255,0)`),e.addColorStop(.5,`rgba(255,255,255,1)`),e.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=e,n.fillRect(0,125,256,6),n.globalCompositeOperation=`destination-in`;let t=n.createLinearGradient(0,125,0,131);t.addColorStop(0,`rgba(0,0,0,0)`),t.addColorStop(.5,`rgba(0,0,0,1)`),t.addColorStop(1,`rgba(0,0,0,0)`),n.fillStyle=t,n.fillRect(0,0,256,256)}else{let e=n.createRadialGradient(128,128,70.4,128,128,128);e.addColorStop(0,`rgba(255,255,255,0.05)`),e.addColorStop(.75,`rgba(255,255,255,0.35)`),e.addColorStop(.85,`rgba(255,255,255,0.08)`),e.addColorStop(1,`rgba(255,255,255,0)`),n.fillStyle=e,n.fillRect(0,0,256,256)}let r=new A(t);return r.colorSpace=a,r}function nt({color:e=`#bcd8ff`,size:n=1,ghosts:r=4}={}){let i=new x;i.renderOrder=10;let a=(e,n,r)=>{let a=new t({map:e,color:n,transparent:!0,opacity:r,depthWrite:!1,depthTest:!1,blending:2,sizeAttenuation:!1,toneMapped:!1}),o=new ae(a);return o.userData.opacity=r,o.raycast=()=>{},i.add(o),o},o=a(tt(`glow`),e,1),s=a(tt(`glow`),`#ffffff`,1),c=a(tt(`rays`),e,.55),l=a(tt(`streak`),e,.6),u=tt(`ring`),f=Array.from({length:r},(t,n)=>{let r=a(n%2?u:tt(`glow`),new T(e).offsetHSL(.08*n,0,-.1),.07);return r.userData.t=[.45,.8,1.25,1.7][n%4],r.userData.size=[.05,.12,.035,.09][n%4],r}),p=new b,m=new b,h=new d,_=1;return{group:i,strength:1,update(e,t,{occluder:r,distance:a=80}={}){let u=m.copy(t).normalize().multiplyScalar(a).add(e.position);p.copy(u).project(e);let d=+(p.z<1&&Math.abs(p.x)<1.3&&Math.abs(p.y)<1.3);if(r&&d){h.origin.copy(e.position),h.direction.copy(t).normalize();let n=h.distanceToPoint(r.center);d*=g.smoothstep(n,r.radius*.98,r.radius*1.12)}_+=(d-_)*.15;let v=_*this.strength;if(i.visible=v>.01,!i.visible)return;let y=(t,n,r)=>{m.set(n,r,.5).unproject(e),t.position.copy(m)};for(let e of[o,s,c,l])y(e,p.x,p.y);o.scale.setScalar(.2*n),s.scale.setScalar(.05*n),c.scale.setScalar(.45*n),l.scale.set(1.2*n,.06*n,1);let b=1-Math.min(1,Math.hypot(p.x,p.y)*.6);for(let e of[o,s,c,l])e.material.opacity=e.userData.opacity*v;c.material.rotation=p.x*.6;for(let e of f)y(e,p.x*(1-e.userData.t),p.y*(1-e.userData.t)),e.scale.setScalar(e.userData.size*n),e.material.opacity=e.userData.opacity*v*(.5+b)}}}var rt=`
  uniform float uMode, uLatMax, uSeed;
  varying vec2 vUv;
  
  float hash(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float noise(vec3 x) {
    vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x), mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
               mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x), mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y), f.z);
  }
  // each octave is rotated, so the noise lattice never lines up into blocky, axis-aligned coastlines
  const mat3 ROT = mat3(0.00, 0.80, 0.60, -0.80, 0.36, -0.48, -0.60, -0.48, 0.64);
  // 5 octaves: finer noise than the texture can hold would only alias into blocky pixels
  float fbm(vec3 p) { float a = 0.5, s = 0.0; for (int i = 0; i < 5; i++) { s += a * noise(p); p = ROT * p * 2.02 + 0.37; a *= 0.5; } return s / 0.97; }

  void main() {
    float phi = vUv.x * 6.2831853, theta = (1.0 - vUv.y) * 3.1415927; // same mapping as THREE.SphereGeometry
    vec3 n = vec3(-cos(phi) * sin(theta), cos(theta), sin(phi) * sin(theta));
    float lat = (vUv.y - 0.5) * 3.1415927;
    vec3 p = n * 1.7 + uSeed;
    vec3 w = vec3(fbm(p * 1.2 + 1.7), fbm(p * 1.2 + 9.2), fbm(p * 1.2 + 4.4));
    float h = fbm(p + w * 1.1);
    float ridge = 1.0 - abs(fbm(p * 3.3 + 2.0) * 2.0 - 1.0);
    float sea = 0.5;
    float land = smoothstep(sea - 0.004, sea + 0.012, h); // soft: a hard edge stair-steps when the texture is magnified
    float alt = clamp((h - sea) / 0.2, 0.0, 1.0);
    alt = clamp(alt + ridge * ridge * ridge * 0.45 * smoothstep(0.08, 0.5, alt), 0.0, 1.0);
    float detail = fbm(n * 7.0 + uSeed);
    // the ice cap starts just past the board's edge, with a ragged rim, and never reaches into the board
    float iceLine = uLatMax + 0.035 + 0.06 * fbm(n * 5.0 + 3.0);
    float ice = smoothstep(iceLine, iceLine + 0.02, abs(lat));
    if (uMode < 0.5) {
      float depth = clamp((sea - h) / 0.12, 0.0, 1.0);
      vec3 water = mix(vec3(0.016, 0.085, 0.13), vec3(0.003, 0.016, 0.05), pow(depth, 0.6));
      water = mix(water, vec3(0.035, 0.19, 0.2), smoothstep(0.08, 0.0, depth) * 0.8); // shallow shelves glow teal
      float arid = smoothstep(0.55, 0.05, abs(lat)) * smoothstep(0.45, 0.65, fbm(p * 2.0 + 5.0));
      vec3 low = mix(vec3(0.05, 0.1, 0.045), vec3(0.24, 0.15, 0.07), arid);
      low = mix(low, vec3(0.12, 0.14, 0.11), smoothstep(0.5, 0.95, abs(lat) / uLatMax)); // tundra near the caps
      vec3 col = mix(vec3(0.3, 0.25, 0.16), low, smoothstep(0.0, 0.06, alt)); // beaches
      col = mix(col, vec3(0.13, 0.09, 0.065), smoothstep(0.3, 0.6, alt));
      col = mix(col, vec3(0.2, 0.19, 0.2), smoothstep(0.6, 0.85, alt));
      col = mix(col, vec3(0.55, 0.6, 0.66), smoothstep(0.92, 1.1, alt + detail * 0.08) * 0.5); // snowy peaks
      col *= 0.8 + 0.4 * detail;
      col = mix(water, col, land);
      // polar ice: bright, blue in the cracks
      float crack = smoothstep(0.04, 0.0, abs(fbm(n * 9.0 + 1.0) - 0.5));
      vec3 iceCol = mix(vec3(0.32, 0.42, 0.55), vec3(0.5, 0.6, 0.72), detail) - crack * vec3(0.2, 0.12, 0.04);
      col = mix(col, iceCol, ice);
      gl_FragColor = vec4(col, (1.0 - land) * (1.0 - ice));
    } else {
      // city lights: clusters on habitable lowland, joined by faint roads along coasts
      float lowland = land * smoothstep(0.55, 0.05, alt) * (1.0 - ice);
      float clusters = smoothstep(0.55, 0.8, fbm(n * 7.0 + 11.0));
      float dots = smoothstep(0.6, 0.9, noise(n * 140.0)) + 0.4 * smoothstep(0.7, 0.95, noise(n * 60.0));
      float coast = exp(-abs(h - sea) * 140.0) * 0.5;
      float city = lowland * clusters * dots + land * coast * clusters * dots * 0.6;
      // clouds: long streaks along the latitudes, a few swirls
      vec3 cq = vec3(n.x * 2.4, n.y * 5.5, n.z * 2.4) + uSeed + 20.0;
      vec3 cw = vec3(fbm(cq * 0.7), fbm(cq * 0.7 + 3.0), fbm(cq * 0.7 + 6.0));
      float cl = fbm(cq + cw * 2.2);
      float cloud = smoothstep(0.5, 0.78, cl) * (0.65 + 0.35 * smoothstep(0.2, 0.7, abs(lat)));
      gl_FragColor = vec4(alt * land, min(city, 1.0), cloud, 1.0);
    }
  }`;function it(e,{size:t=2048,latMax:n,seed:r=3}){let i=new u({uniforms:{uMode:{value:0},uLatMax:{value:n},uSeed:{value:r}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:rt,depthTest:!1}),a=new F(new k(2,2),i);a.frustumCulled=!1;let o=new c().add(a),s=new C,d=n=>{let r=new l(t,t/2,{generateMipmaps:!0,minFilter:I,wrapS:f,anisotropy:4});i.uniforms.uMode.value=n;let a=e.getRenderTarget();return e.setRenderTarget(r),e.render(o,s),e.setRenderTarget(a),r.texture},p=d(0),m=d(1);return i.dispose(),a.geometry.dispose(),{albedo:p,data:m}}var at=`
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 p = modelMatrix * vec4(position, 1.0);
    vPosW = p.xyz;
    gl_Position = projectionMatrix * viewMatrix * p;
  }`,ot=`
  uniform sampler2D uAlbedo, uData, uCells, uMarks;
  uniform float uRows, uCols, uLatMax, uTime, uHintPulse, uBump;
  uniform vec3 uLight, uRimDir, uRimCol, uColA, uColB, uTurn, uGrid, uNightGrid, uAtmo, uSunset;
  uniform vec4 uRipples[4];
  uniform vec3 uRippleCol[4];
  uniform vec4 uFlood;    // xyz origin, w start time (< 0: off)
  uniform vec3 uFloodCol;
  uniform vec4 uBand;     // x row, y direction (±1), z strength 0..1
  uniform vec3 uBandCol;
  uniform vec4 uRowFlash; // x row, y start time, z: 1 = a whole band, 0 = off
  uniform vec3 uRowFlashCol;
  uniform vec3 uNight;    // x first night column (float: it glides), y width, z on
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;

  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(cameraPosition - vPosW);
    float lat = (vUv.y - 0.5) * 3.14159265;
    vec4 alb = texture2D(uAlbedo, vUv);
    vec4 dat = texture2D(uData, vUv);
    float water = alb.a;
    vec3 albedo = alb.rgb;

    // relief: bend the normal along the height map's screen-space slope (land only)
    vec3 dpdx = dFdx(vPosW), dpdy = dFdy(vPosW);
    vec3 r1 = cross(dpdy, n), r2 = cross(n, dpdx);
    float det = dot(dpdx, r1);
    vec3 grad = sign(det) * (dFdx(dat.r) * r1 + dFdy(dat.r) * r2);
    vec3 nb = abs(det) > 1e-12 ? normalize(abs(det) * n - grad * uBump) : n;

    // night rule: the night columns are dark from pole to pole (they glide as the night moves)
    float nightAmt = 0.0;
    if (uNight.z > 0.5) {
      float x = mod(vUv.x * uCols - uNight.x, uCols);
      nightAmt = smoothstep(-0.05, 0.35, x) * smoothstep(uNight.y + 0.05, uNight.y - 0.35, x);
    }
    vec3 glow = vec3(0.0);
    float shade = 1.0;   // contact shadows / craters darken the lit surface
    float gridBoost = 1.0;

    // ripples: rings of light racing across the surface from each placed disc
    vec3 wave = vec3(0.0);
    float waveAmt = 0.0;
    for (int k = 0; k < 4; k++) {
      vec4 r = uRipples[k];
      float age = uTime - r.w;
      if (age < 0.0 || age > 1.8) continue;
      float ang = acos(clamp(dot(n, r.xyz), -1.0, 1.0));
      float x = (ang - age * 1.6) * 10.0;
      float a = exp(-x * x) * (1.0 - age / 1.8);
      wave += uRippleCol[k] * a;
      waveAmt += a;
    }

    if (abs(lat) < uLatMax) {
      float cu = vUv.x * uCols;
      float cv = (uLatMax - lat) / (2.0 * uLatMax) * uRows;
      vec2 f = fract(vec2(cu, cv));
      ivec2 cell = ivec2(int(min(floor(cu), uCols - 1.0)), int(min(floor(cv), uRows - 1.0)));
      vec4 s = texelFetch(uCells, cell, 0);
      vec4 mk = texelFetch(uMarks, cell, 0);
      float row = float(cell.y);
      // distance to the cell edge, in pixels (crisp lines) and in cell units (soft glow)
      vec2 fw = max(vec2(fwidth(cu), fwidth(cv)), vec2(1e-5));
      vec2 e = min(f, 1.0 - f);
      float edgePx = min(e.x / fw.x, e.y / fw.y);
      float edge = min(e.x * cos(lat) * 1.4, e.y);
      float line = 1.0 - smoothstep(0.35, 1.25, edgePx);
      // physical offset from the cell centre (so round things stay round near the caps)
      vec2 d = (f - 0.5) * vec2(cos(lat) * 6.2832 / uCols, 2.0 * uLatMax / uRows);
      float rr = length(d) / (2.0 * uLatMax / uRows);

      vec3 gridCol = mix(uGrid, uNightGrid, nightAmt);

      float owner = s.r; // 0 empty, ~0.33 Ember, ~0.66 Frost, 1 hole
      if (owner > 0.9) {
        // black hole: a crater falling into darkness, with a violet event-horizon rim
        shade *= smoothstep(0.08, 0.42, rr);
        glow += vec3(0.5, 0.25, 1.0) * exp(-abs(rr - 0.36) * 28.0) * 0.55;
      } else if (owner > 0.15) {
        vec3 oc = owner > 0.5 ? uColB : uColA;
        albedo = mix(albedo, oc * 0.2, 0.18);       // territory
        glow += oc * 0.025 * (1.0 - nightAmt * 0.5);
        shade *= 1.0 - 0.6 * smoothstep(0.46, 0.22, rr); // contact shadow under the disc
      }
      // supernova star cell: a warm halo with a slow pulse
      if (mk.r > 0.5) {
        float pulse = 0.6 + 0.4 * sin(uTime * 3.0 + row);
        glow += vec3(1.0, 0.78, 0.45) * (smoothstep(0.5, 0.0, rr) * 0.18 + exp(-abs(rr - 0.33) * 40.0) * 0.6) * pulse;
      }
      // the grid: thin holographic lines, brighter where a ripple passes
      glow += gridCol * (line * 0.36 + exp(-edge * 28.0) * 0.06) * (1.0 + waveAmt * 6.0);
      // move hints (rings), flip preview, hover
      float hint = s.g * smoothstep(0.045, 0.0, abs(rr - 0.2)) * (0.55 + 0.45 * uHintPulse);
      glow += uTurn * hint * 1.7 + uTurn * s.g * smoothstep(0.2, 0.0, rr) * 0.07;
      glow += uTurn * s.b * (0.45 + 0.35 * uHintPulse) * smoothstep(0.5, 0.2, rr);
      glow += uTurn * s.a * (0.1 + 0.9 * smoothstep(0.06, 0.0, edge));
      // tectonic warning: chevrons racing round the band that is about to slide
      if (uBand.z > 0.0 && abs(row - uBand.x) < 0.5) {
        float chev = fract(cu * 1.0 - (abs(f.y - 0.5) * 0.9) * uBand.y - uTime * 0.9 * uBand.y);
        float arrow = smoothstep(0.12, 0.0, abs(chev - 0.5)) ;
        float rim = smoothstep(0.1, 0.0, min(f.y, 1.0 - f.y));
        glow += uBandCol * uBand.z * (arrow * 0.45 + rim * 0.8 + 0.06) * (0.7 + 0.3 * uHintPulse);
      }
      if (uRowFlash.z > 0.0 && abs(row - uRowFlash.x) < 0.5) {
        // two bright fronts race round the band from the move, both ways, and meet on the far side
        float age = max(uTime - uRowFlash.y, 0.0);
        float x = mod(cu - uRowFlash.w, uCols) / uCols;
        float d = min(x, 1.0 - x);
        float front = exp(-pow(abs(d - age * 0.55) * 14.0, 2.0));
        float edges = smoothstep(0.14, 0.0, min(f.y, 1.0 - f.y));
        glow += uRowFlashCol * exp(-age * 1.6) * (0.12 + 1.2 * front * (0.4 + 0.6 * edges) + 0.35 * edges);
      }
      glow += wave * 0.35;
    } else {
      // the board's edge: a fine glowing seam where the ice begins
      float rim = abs(lat) - uLatMax;
      glow += uGrid * exp(-rim * 90.0) * 0.9 * (1.0 + waveAmt * 3.0);
      glow += wave * 0.2;
    }

    // ---------- light: warm key sun, cool rim star, city lights at night ----------
    float ndl = dot(nb, uLight);
    float day = smoothstep(-0.15, 0.2, dot(n, uLight)) * (1.0 - nightAmt * 0.92);
    vec3 col = albedo * (max(ndl, 0.0) * 1.25 * (1.0 - nightAmt * 0.92) + 0.035 + 0.04 * day) * shade;
    col += albedo * vec3(0.12, 0.1, 0.3) * nightAmt * 0.35; // moonlit, so the night side isn't a hole
    vec3 hv = normalize(uLight + v);
    float nh = max(dot(n, hv), 0.0);
    col += water * (pow(nh, 1500.0) * 0.35 + pow(nh, 60.0) * 0.035) * vec3(1.0, 0.86, 0.66) * day * shade; // sun glint on the sea
    col += vec3(1.0, 0.62, 0.3) * dat.g * (1.0 - day) * 1.4; // cities on the night side
    float nv = max(dot(n, v), 0.0);
    float fres = pow(1.0 - nv, 3.0);
    col += uRimCol * pow(1.0 - nv, 2.2) * max(dot(n, uRimDir), 0.0) * 1.1;
    vec3 haze = mix(uSunset, uAtmo, smoothstep(0.0, 0.4, dot(n, uLight)));
    col = mix(col, haze * (0.15 + 0.85 * day), fres * 0.6 * smoothstep(-0.1, 0.25, dot(n, uLight)) * (1.0 - nightAmt * 0.7));

    // end of game: the winner's colour floods out across the planet
    if (uFlood.w > 0.0) {
      float ang = acos(clamp(dot(n, uFlood.xyz), -1.0, 1.0));
      float front = (uTime - uFlood.w) * 1.3;
      float inside = smoothstep(front, front - 0.35, ang);
      col = mix(col, col * 0.5 + uFloodCol * 0.12, inside * 0.7);
      glow = mix(glow, glow * 0.6 + uFloodCol * (glow.r + glow.g + glow.b) * 0.5, inside);
      float fd = (ang - front) * 7.0;
      glow += uFloodCol * exp(-fd * fd) * 1.3;
    }
    gl_FragColor = vec4(col + glow, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`,st=`
  uniform sampler2D uData;
  uniform float uTime, uLatMax, uBoard, uCols;
  uniform vec3 uLight, uNight;
  varying vec2 vUv;
  varying vec3 vNormalW;
  varying vec3 vPosW;
  void main() {
    vec3 n = normalize(vNormalW);
    vec3 v = normalize(cameraPosition - vPosW);
    float c = texture2D(uData, vUv + vec2(uTime * 0.0035, 0.0)).b;
    float lat = (vUv.y - 0.5) * 3.14159265;
    float l = dot(n, uLight);
    float day = smoothstep(-0.2, 0.25, l);
    if (uNight.z > 0.5) {
      float x = mod(vUv.x * uCols - uNight.x, uCols);
      day *= 1.0 - 0.9 * smoothstep(-0.05, 0.35, x) * smoothstep(uNight.y + 0.05, uNight.y - 0.35, x);
    }
    float fres = pow(1.0 - max(dot(n, v), 0.0), 2.0);
    // thin over the board (discs and hints must read), fuller over the caps and at the limb
    float a = c * mix(uBoard, 0.85, max(smoothstep(uLatMax - 0.05, uLatMax + 0.1, abs(lat)), fres));
    vec3 col = mix(vec3(0.05, 0.06, 0.12), vec3(1.0, 0.97, 0.93), day) * (0.35 + 0.75 * max(l, 0.0));
    col = mix(col, vec3(1.0, 0.6, 0.4), smoothstep(0.25, 0.0, abs(l)) * 0.35); // pink at the terminator
    gl_FragColor = vec4(col, a * (0.25 + 0.75 * day));
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }`;function ct(e,t){let{scene:n,renderer:r}=e,{radius:i,rows:a,cols:s,latMax:c,colors:l}=t,d=it(r,{size:t.quality===`low`?1024:2048,latMax:c,seed:t.seed??3.7}),f=()=>{let e=new E(new Uint8Array(a*s*4),s,a,O);return e.magFilter=e.minFilter=p,e.needsUpdate=!0,e},m=f(),g=f(),_=m.image.data,v=e=>new T(e),y={uAlbedo:{value:d.albedo},uData:{value:d.data},uCells:{value:m},uMarks:{value:g},uRows:{value:a},uCols:{value:s},uLatMax:{value:c},uTime:{value:0},uHintPulse:{value:0},uBump:{value:.22},uLight:{value:new b(.4,.6,.7).normalize()},uRimDir:{value:new b(-1,.3,0).normalize()},uRimCol:{value:v(l.companion)},uColA:{value:v(l.a)},uColB:{value:v(l.b)},uTurn:{value:v(l.a)},uGrid:{value:v(l.grid)},uNightGrid:{value:v(l.nightGrid)},uAtmo:{value:v(l.atmo)},uSunset:{value:v(l.sunset)},uRipples:{value:Array.from({length:4},()=>new o(0,1,0,-99))},uRippleCol:{value:Array.from({length:4},()=>v(l.grid))},uFlood:{value:new o(0,1,0,-1)},uFloodCol:{value:v(l.a)},uBand:{value:new o(0,1,0,0)},uBandCol:{value:v(l.band)},uRowFlash:{value:new o(0,-99,0,0)},uRowFlashCol:{value:v(l.a)},uNight:{value:new b(0,5,0)}},x=new F(new h(i,160,96),new u({uniforms:y,vertexShader:at,fragmentShader:ot}));x.name=`planet`,n.add(x);let S={uData:y.uData,uTime:y.uTime,uLatMax:y.uLatMax,uLight:y.uLight,uNight:y.uNight,uCols:y.uCols,uBoard:{value:.28}},C=new F(new h(i*1.014,128,64),new u({uniforms:S,vertexShader:at,fragmentShader:st,transparent:!0,depthWrite:!1}));C.raycast=()=>{},C.renderOrder=1,n.add(C);let w=et(i,{thickness:.1,day:l.atmo,sunset:l.sunset,night:`#2a1f66`,strength:1.15});n.add(w.mesh);let D=0;return{mesh:x,clouds:C,atmosphere:w,uniforms:y,setCells(e,{legal:t=[],preview:n=[],hover:r=null}={}){_.fill(0);for(let t=0;t<e.length;t++)_[t*4]=[0,85,170,255][e[t]];for(let e of t)_[e*4+1]=255;for(let e of n)_[e*4+2]=255;r!==null&&(_[r*4+3]=255),m.needsUpdate=!0},setMarks(e){let t=g.image.data;t.fill(0);for(let n=0;n<e.length;n++)t[n*4]=e[n]?255:0;g.needsUpdate=!0},setTurn(e){y.uTurn.value.set(e)},ripple(e,t=l.grid){let n=D++%4;y.uRipples.value[n].set(e.x,e.y,e.z,y.uTime.value),y.uRippleCol.value[n].set(t)},rowFlash(e,t,n=0){y.uRowFlash.value.set(e,y.uTime.value,1,n+.5),y.uRowFlashCol.value.set(t)},setBand(e,t,n){y.uBand.value.set(e,Math.sign(t)||1,n,0)},setNight(e,t,n=!0){y.uNight.value.set(e,t,+!!n)},flood(e,t){if(!e)return y.uFlood.value.set(0,1,0,-1);y.uFlood.value.set(e.x,e.y,e.z,y.uTime.value),y.uFloodCol.value.set(t)},setLight(e){y.uLight.value.copy(e),w.setLight(e)},setRim(e){y.uRimDir.value.copy(e)},update(e){y.uTime.value=e,y.uHintPulse.value=.5+.5*Math.sin(e*4)}}}var lt=e=>(e.raycast=()=>{},e);function ut(){let e=document.createElement(`canvas`);e.width=512,e.height=256;let t=e.getContext(`2d`);t.fillStyle=`#8f8aa3`,t.fillRect(0,0,512,256);let n=3,r=()=>(n=n*16807%2147483647)/2147483647;for(let e=0;e<260;e++){let e=r()*512,n=20+r()*216,i=2+r()**3*26,a=t.createRadialGradient(e-i*.2,n-i*.2,i*.2,e,n,i);a.addColorStop(0,`rgba(60,55,75,0.55)`),a.addColorStop(.8,`rgba(70,65,85,0.25)`),a.addColorStop(.92,`rgba(210,205,225,0.35)`),a.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=a,t.beginPath(),t.ellipse(e,n,i,i*.8,0,0,Math.PI*2),t.fill()}let i=new A(e);return i.colorSpace=a,i}var dt={vertexShader:`
    varying vec2 vUv;
    varying vec3 vPos;
    void main() { vUv = uv; vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
    uniform float uTime, uStrength;
    uniform vec3 uColA, uColB;
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      float a = atan(vPos.z, vPos.x);
      // hanging curtains: folds that drift round the pole, bright at the foot, fading upward
      float folds = 0.5 + 0.5 * sin(a * 7.0 + uTime * 0.35 + 2.0 * sin(a * 3.0 - uTime * 0.2));
      float rays = 0.6 + 0.4 * sin(a * 61.0 + sin(a * 13.0 + uTime) * 3.0);
      // clamp: with MSAA, varyings can land a hair outside 0..1, and pow() of a negative is NaN (bloom turns that black)
      float y = clamp(vUv.y, 0.0, 1.0);
      float foot = smoothstep(0.0, 0.08, y) * pow(1.0 - y, 1.6);
      vec3 col = mix(uColA, uColB, smoothstep(0.1, 0.8, y));
      gl_FragColor = vec4(col * folds * rays * foot * uStrength, 1.0);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`},ft={vertexShader:`
    varying vec3 vLocal;
    varying vec3 vWorld;
    void main() {
      vLocal = position;
      vec4 w = modelMatrix * vec4(position, 1.0);
      vWorld = w.xyz;
      gl_Position = projectionMatrix * viewMatrix * w;
    }`,fragmentShader:`
    uniform vec3 uLight, uColA, uColB, uNormal;
    uniform float uInner, uOuter, uPlanetR, uOpacity;
    varying vec3 vLocal;
    varying vec3 vWorld;
    float h1(float x) { return fract(sin(x * 127.1) * 43758.5453); }
    float n1(float x) { float i = floor(x), f = fract(x); return mix(h1(i), h1(i + 1.0), f * f * (3.0 - 2.0 * f)); }
    void main() {
      float r = length(vLocal.xy);
      float t = (r - uInner) / (uOuter - uInner);
      // many thin ringlets of different density, a clear gap (like Cassini's) two thirds out
      float dens = 0.35 + 0.65 * n1(t * 38.0) * n1(t * 9.0 + 3.0);
      dens *= smoothstep(0.0, 0.15, t) * smoothstep(1.0, 0.85, t);
      dens *= 1.0 - 0.6 * smoothstep(0.03, 0.0, abs(t - 0.66));
      vec3 col = mix(uColA, uColB, n1(t * 6.0));
      float lit = 0.35 + 0.65 * abs(dot(uNormal, uLight));
      // the planet's shadow falls across the rings behind it
      vec3 p = vWorld;
      float along = dot(p, uLight);
      float off = length(p - uLight * along);
      float shadow = along < 0.0 ? smoothstep(uPlanetR * 0.92, uPlanetR * 1.05, off) : 1.0;
      // see-through where the rings pass in front of the planet, so they never hide the board
      vec3 dir = normalize(vWorld - cameraPosition);
      float closest = length(cross(-cameraPosition, dir));
      float inFront = dot(vWorld - cameraPosition, dir) < dot(-cameraPosition, dir) ? 1.0 : 0.0;
      float veil = 1.0 - inFront * smoothstep(uPlanetR * 1.3, uPlanetR * 0.98, closest) * 0.93;
      gl_FragColor = vec4(col * lit * (0.25 + 0.75 * shadow), dens * uOpacity * veil);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`};function pt(i,a){let{scene:o,renderer:s}=i,{radius:c,latMax:l,colors:d}=a,f=a.quality===`low`;o.background=$e(s,{size:f?512:1024,seed:4,base:`#010106`,nebula:[`#40206e`,`#0d4a6a`,`#7a2c4a`],nebulaStrength:.5,stars:1.1,giant:!1});let p=new S([new v(0,-.3),new v(.26,-.3),new v(.3,.85),new v(.21,1.15),new v(0,1.65)],6);{let e=p.attributes.position,t=new Float32Array(e.count*3);for(let n=0;n<e.count;n++)t.fill(.35+.65*g.smoothstep(e.getY(n),-.3,1.65),n*3,n*3+3);p.setAttribute(`color`,new ne(t,3))}let _=new r({color:d.crystal,vertexColors:!0,emissive:d.crystalGlow,emissiveIntensity:.3,roughness:.3,metalness:.1,flatShading:!0,envMap:a.env??null,envMapIntensity:.55}),y=lt(new L(p,_,108)),C=11,w=()=>(C=C*16807%2147483647)/2147483647,E=new n,ee=new e,O=new e,k=new b(0,1,0),A=new T,te=0;for(let t of[1,-1])for(let n=0;n<54;n++){let r=n<30,i=r?l+.11+w()*.06:l+.2+Math.sqrt(w())*(Math.PI/2-l-.2),a=r?n/30*Math.PI*2+w()*.12:w()*Math.PI*2,o=new b(Math.cos(i)*Math.cos(a),Math.sin(i)*t,Math.cos(i)*Math.sin(a));ee.setFromUnitVectors(k,o);let s=new b(0,t,0).sub(o.clone().multiplyScalar(o.y*t)).normalize(),u=new b().crossVectors(o,s).normalize();O.setFromAxisAngle(u,r?.35+w()*.2:(w()-.5)*.5);let f=r?.22+w()*w()*.36:.18+w()*w()*.55;E.compose(o.clone().multiplyScalar(c-.04),O.clone().multiply(ee).multiply(new e().setFromAxisAngle(k,w()*6.28)),new b(f,f*(.8+w()*.5),f)),y.setMatrixAt(te,E),y.setColorAt(te++,A.set(d.crystal).offsetHSL((w()-.5)*.06,0,(w()-.5)*.2))}o.add(y);for(let e of[1,-1]){let t=lt(new F(p,_));t.position.set(0,e*(c-.1),0),t.scale.set(.7,1.05,.7),e<0&&(t.rotation.x=Math.PI),o.add(t)}let j={uTime:{value:0},uStrength:{value:.75},uColA:{value:new T(d.auroraA)},uColB:{value:new T(d.auroraB)}},N=[1,-1].map(e=>{let t=l+.18,n=c*Math.cos(t)*1.02,r=new D(n*1.45,n,1.6,96,1,!0);r.translate(0,.8,0);let i=lt(new F(r,new u({...dt,uniforms:j,transparent:!0,blending:2,depthWrite:!1,side:2})));return i.position.y=e*c*Math.sin(t)*1,e<0&&(i.rotation.x=Math.PI),i.renderOrder=2,o.add(i),i}),re=c*1.6,ie=c*2.3,P={uLight:{value:new b(0,1,0)},uNormal:{value:new b(0,0,1)},uColA:{value:new T(d.ringA)},uColB:{value:new T(d.ringB)},uInner:{value:re},uOuter:{value:ie},uPlanetR:{value:c},uOpacity:{value:.62}},I=lt(new F(new m(re,ie,192,1),new u({...ft,uniforms:P,transparent:!0,depthWrite:!1,side:2})));I.rotation.set(-Math.PI/2+.38,0,.22),I.renderOrder=3,o.add(I),I.updateMatrixWorld(),P.uNormal.value.set(0,0,1).transformDirection(I.matrixWorld);let oe=new r({map:ut(),roughness:.95,metalness:0}),R=lt(new F(new h(1.6,48,24),oe)),se=new x;se.rotation.set(.32,0,.18),R.position.set(36,0,0),se.add(R),o.add(se);let ce=new M(.1,.1,.16),z=new M(.62,.01,.12),le=new r({color:`#c9c2a8`,metalness:.8,roughness:.35,envMap:a.env??null}),ue=new r({color:`#1b2a6a`,metalness:.6,roughness:.25,emissive:`#0a1640`,emissiveIntensity:.6}),de=new t({color:`#ff5a4a`,transparent:!0,blending:2,depthWrite:!1}),B=[[7,.5,0,.11],[7.6,-.35,2.1,-.08],[6.7,1.1,4,.09]].map(([e,t,n,r])=>{let i=new x;i.rotation.set(t,n,t*.5);let a=new x;a.add(lt(new F(ce,le)),lt(new F(z,ue)));let s=lt(new ae(de));return s.scale.setScalar(.12),a.add(s),a.position.set(e,0,0),i.add(a),o.add(i),{pivot:i,sat:a,beacon:s,speed:r,phase:n}}),V=nt({color:d.companion,size:f?.8:1});o.add(V.group);let H={center:new b,radius:c*1.05};return{crystals:y,ring:I,auroras:N,flare:V,moon:R,setAurora(e,t,n=.75){j.uColA.value.set(e),j.uColB.value.set(t),j.uStrength.value=n},update(e,t,n,r){j.uTime.value=e,P.uLight.value.copy(n),_.emissiveIntensity=.25+.1*Math.sin(e*1.1),se.rotation.y=e*.03,R.rotation.y=e*.05;for(let t of B)t.pivot.rotation.y=t.phase+e*t.speed,t.sat.rotation.y=e*.3,t.beacon.visible=(e*1.2+t.phase)%1.6<.12;V.update(t,r,{occluder:H})}}}var mt=new b(0,1,0),ht=new b(0,0,1),gt=new e().setFromAxisAngle(new b(1,0,0),Math.PI),_t=.17,vt=.82;function yt(e,t,n=!0){let r=document.createElement(`canvas`);r.width=r.height=e,t(r.getContext(`2d`),e);let i=new A(r);return n&&(i.colorSpace=a),i.anisotropy=4,i}function bt(e){return yt(256,(t,n)=>{let r=n/2;if(t.fillStyle=`#000`,t.fillRect(0,0,n,n),t.translate(r,r),t.strokeStyle=`#ffffff`,t.lineCap=`round`,t.shadowColor=`#ffffff`,t.shadowBlur=10,t.lineWidth=4,t.beginPath(),t.arc(0,0,r*.86,0,Math.PI*2),t.stroke(),e===`sun`){t.lineWidth=10,t.beginPath(),t.arc(0,0,26,0,Math.PI*2),t.stroke();for(let e=0;e<12;e++)t.rotate(Math.PI/6),t.lineWidth=e%2?6:9,t.beginPath(),t.moveTo(0,42),t.lineTo(0,e%2?62:80),t.stroke()}else{t.lineWidth=8;for(let e=0;e<6;e++)t.rotate(Math.PI/3),t.beginPath(),t.moveTo(0,8),t.lineTo(0,80),t.moveTo(0,44),t.lineTo(-17,62),t.moveTo(0,44),t.lineTo(17,62),t.moveTo(0,22),t.lineTo(-10,32),t.moveTo(0,22),t.lineTo(10,32),t.stroke()}})}var xt=()=>yt(256,(e,t)=>{let n=t/2;for(let t=n;t>0;t-=2){let r=200+Math.round(40*(.5+.5*Math.sin(t*.9)));e.fillStyle=`rgb(${r},${r},${r})`,e.beginPath(),e.arc(n,n,t,0,Math.PI*2),e.fill()}});function St(){let e=_t/2,t=(e,t)=>new v(e,t),n=new S([t(vt,-.085*.55),t(.9,-.085),t(.975,-.085),t(1,-.085*.55),t(1,e*.55),t(.975,e),t(.9,e),t(vt,e*.55)],56),r=new w(vt,56).rotateX(-Math.PI/2).translate(0,e*.55,0),i=new w(vt,56).rotateX(Math.PI/2).translate(0,-.085*.55,0);return j([n,r,i],!0)}function Ct(n,a){let{fx:o,camera:c,scene:l}=n,{radius:d,rows:f,cols:p,latMax:h,colors:v}=a,S=2*h/f,C=Math.PI*2/p,E=f*p,D=(e,t=new b)=>{let n=h-(U(e,p)+.5)*S,r=(W(e,p)+.5)*C;return t.set(-Math.cos(r)*Math.cos(n),Math.sin(n),Math.sin(r)*Math.cos(n))},ee=e=>{let t=e.clone().normalize(),n=Math.asin(g.clamp(t.y,-1,1));if(Math.abs(n)>=h)return null;let r=Math.atan2(t.z,-t.x);r<0&&(r+=Math.PI*2);let i=Math.min(p-1,Math.floor(r/C));return Math.min(f-1,Math.floor((h-n)/S))*p+i},O=e=>{let t=h-(U(e,p)+.5)*S;return .4*Math.min(d*Math.cos(t)*C,d*S)},k=(t,n,r=new e)=>(r.setFromUnitVectors(mt,D(t)),n===2?r.multiply(gt):r),A=St(),te=xt(),j=(e,t,n,r,o)=>new i({color:e,map:te,metalness:r,roughness:r>.5?.26:.2,clearcoat:1,clearcoatRoughness:.12,emissive:t,emissiveIntensity:o,emissiveMap:n,envMap:a.env??null,envMapIntensity:1.3}),M=[new r({color:v.rim,metalness:1,roughness:.22,envMap:a.env??null,envMapIntensity:1.5}),j(v.a,v.aGlow,bt(`sun`),.85,1.9),j(v.bFace,v.bGlow,bt(`flake`),.5,1.25)],N=oe(n,A,M,E),ne=new T(1,1,1),re=new T(v.asleep);for(let e=0;e<E;e++)N.mesh.setColorAt(e,ne);let P=.10500000000000001,I=(e,t=new b)=>D(e,t).multiplyScalar(d+P),L=(e,t)=>{let r=N.at(e);le(n,r),r.visible=t===1||t===2,r.userData.owner=t,I(e,r.position),k(e,t,r.quaternion);let i=O(e);r.scale.set(i,1,i)},se=new _({color:v.a,transparent:!0,opacity:.45,depthWrite:!1}),z=new F(A,[se,se,se]);z.visible=!1,l.add(z);let de=new _({color:new T(1.3,1.25,1.5),transparent:!0,opacity:.85,toneMapped:!1}),B=new F(new y(1,.03,8,64),de);B.visible=!1,l.add(B);let V=null,H=null,G=[],fe=new e,K=new m(.86,1,64),pe=Array.from({length:6},()=>{let e=new F(K,new _({transparent:!0,blending:2,depthWrite:!1,side:2,toneMapped:!1}));return e.visible=!1,e.raycast=()=>{},l.add(e),e}),me=0,he=e=>new u({uniforms:{uHead:{value:0},uColor:{value:new T(e).multiplyScalar(2.2)},uLen:{value:1}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
        uniform float uHead, uLen; uniform vec3 uColor; varying vec2 vUv;
        void main() {
          float x = vUv.x;
          float behind = uHead - x;
          float a = behind < 0.0 ? 0.0 : exp(-behind * 6.0 / uLen) ;
          a *= smoothstep(0.0, 0.03, x);
          float core = 1.0 - abs(vUv.y - 0.5) * 2.0;
          gl_FragColor = vec4(uColor * a * (0.5 + core), a);
        }`,transparent:!0,blending:2,depthWrite:!1,toneMapped:!1}),q=new x;l.add(q);let ge={uTime:{value:0}},_e=new u({uniforms:ge,vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      uniform float uTime; varying vec2 vUv;
      void main() {
        vec2 p = vUv - 0.5;
        float r = length(p) * 2.0;
        float a = atan(p.y, p.x + 1e-5);
        float swirl = 0.55 + 0.45 * sin(a * 3.0 + 5.0 / (r + 0.2) - uTime * 2.6);
        float disk = smoothstep(1.0, 0.6, r) * smoothstep(0.28, 0.42, r);
        float core = smoothstep(0.34, 0.26, r);
        float lens = exp(-abs(r - 0.36) * 40.0);
        vec3 hot = mix(vec3(1.0, 0.55, 0.2), vec3(0.55, 0.3, 1.0), smoothstep(0.35, 0.9, r));
        vec3 col = hot * swirl * disk * 1.8 + vec3(1.0, 0.85, 1.0) * lens * 1.2;
        float alpha = max(core, max(disk * swirl * 0.85, lens));
        gl_FragColor = vec4(col * (1.0 - core), alpha);
      }`,transparent:!0,depthWrite:!1,toneMapped:!1}),ve=new w(1,48),ye=yt(128,(e,t)=>{let n=t/2,r=e.createRadialGradient(n,n,0,n,n,n);r.addColorStop(0,`rgba(255,255,255,1)`),r.addColorStop(.15,`rgba(255,240,200,0.8)`),r.addColorStop(.4,`rgba(255,200,120,0.15)`),r.addColorStop(1,`rgba(255,200,120,0)`),e.fillStyle=r,e.fillRect(0,0,t,t),e.translate(n,n),e.fillStyle=`rgba(255,250,235,0.95)`;for(let t=0;t<4;t++)e.rotate(Math.PI/2),e.beginPath(),e.moveTo(0,-4),e.quadraticCurveTo(2,-n*.2,0,-n*.98),e.quadraticCurveTo(-2,-n*.2,0,-4),e.fill()}),be=new t({map:ye,color:v.star,transparent:!0,blending:2,depthWrite:!1,toneMapped:!1}),J=new Map;function xe(e){for(let e of[...q.children])q.remove(e);J.clear();for(let t=0;t<E;t++)if(e.cells[t]===3){let e=new F(ve,_e);e.quaternion.setFromUnitVectors(ht,D(t)),e.position.copy(D(t)).multiplyScalar(d+.012),e.scale.setScalar(O(t)*1.25),e.userData={cell:t,kind:`hole`},e.raycast=()=>{},q.add(e),J.set(t,e)}else if(e.stars?.[t]&&e.cells[t]===0){let e=new ae(be);e.userData={cell:t,kind:`star`,base:O(t)*2.1},e.position.copy(D(t)).multiplyScalar(d+.32),e.raycast=()=>{},q.add(e),J.set(t,e)}}let Y=new b,Se=0,Ce=0,we=0,Te=``,Ee=()=>{let e=innerWidth,t=innerHeight,n=`${e}x${t}:${Ce.toFixed(4)}:${we.toFixed(4)}`;n!==Te&&(Te=n,Math.abs(Ce)<1e-4&&Math.abs(we)<1e-4?c.clearViewOffset():c.setViewOffset(e,t,-Ce*e,-we*t,e,t))},X={pieces:N,normalOf:D,cellAtPoint:ee,restPos:I,discRadius:O,sync(e){G=[];for(let t=0;t<E;t++)L(t,e.cells[t]);xe(e),X.setLastMove(e.history.entries.findLast(e=>e.move>=0)?.move??null)},setAsleep(e){let t=new Set(e);for(let e=0;e<E;e++)N.mesh.setColorAt(e,t.has(W(e,p))?re:ne);N.mesh.instanceColor.needsUpdate=!0},async animateMove(e,{onLand:t,onFlip:r,onNova:i,step:a=.085}={}){let o=e.move;L(o,e.player);let s=D(o);X.setGhost(null);let c=J.get(o);await ce(n,N.at(o),{up:s,drop:1.8,duration:.32}),t?.(),X.setLastMove(o),c&&(q.remove(c),J.delete(o));let l=e.player===1?v.a:v.b;for(let t of e.lines)X.beam([o,...t],l,{duration:.25+t.length*a,closed:t.length>=p-1});let u=I(o),d=new Set(e.nova??[]),f=ue(e.lines,{start:.04,step:a});d.size&&i?.();for(let e of d)f.set(e,.12);let m=0,h=[...f].map(([t,i])=>{let a=N.at(t);a.userData.owner=e.player;let o=D(t),s=Y.copy(a.position).sub(u),c=new b().crossVectors(o,s).normalize();return c.lengthSq()<.5&&c.set(1,0,0).applyQuaternion(a.quaternion),R(n,a,{axis:c,up:o,height:d.has(t)?.9:.55,duration:.4,delay:i,onFlip:()=>r?.(t,m++)})});await Promise.all(h)},async animateShift(t,r,i,{duration:a=1.1}={}){let s=[];for(let e=0;e<p;e++){let r=t*p+e,i=N.at(r);le(n,i),i.visible&&s.push({obj:i,pos:i.position.clone(),quat:i.quaternion.clone()});let a=J.get(r);a&&s.push({obj:a,pos:a.position.clone(),quat:a.quaternion.clone()})}let c={t:0},l=new e;await o.tween(c,{t:1},{duration:a,ease:`inOutSine`,onUpdate:()=>{let e=r*C*(c.t+Math.sin(c.t*Math.PI)*.06);l.setFromAxisAngle(mt,e);for(let e of s)e.obj.position.copy(e.pos).applyQuaternion(l),e.obj.quaternion.copy(e.quat).premultiply(l)}}),X.sync(i)},beam(e,t,{duration:n=.5,closed:r=!1}={}){let i=e.map((t,n)=>D(t).multiplyScalar(d+.28+.12*Math.sin(n/Math.max(1,e.length-1)*Math.PI)));if(r&&i.push(i[0].clone()),i.length<2)return;let a=new ie(i,!1,`centripetal`),c=new s(a,Math.max(12,i.length*10),.035,6,!1),u=he(t);u.uniforms.uLen.value=Math.min(1,3/i.length);let f=new F(c,u);f.raycast=()=>{},f.renderOrder=5,l.add(f);let p=u.uniforms.uHead;o.tween(p,{value:1.6},{duration:n*1.6,ease:`linear`}).then(()=>{l.remove(f),c.dispose(),u.dispose()})},shockwave(e,t,{size:n=2.4,duration:r=.6}={}){let i=pe[me++%pe.length],a=D(e);i.visible=!0,i.material.color.set(t).multiplyScalar(1.6),i.material.opacity=1,i.quaternion.setFromUnitVectors(ht,a),i.position.copy(a).multiplyScalar(d+.03);let s=O(e),c={k:0};o.tween(c,{k:1},{duration:r,ease:`outQuad`,onUpdate:()=>{i.scale.setScalar(s*(.6+n*c.k)),i.material.opacity=(1-c.k)*(1-c.k)}}).then(()=>i.visible=!1)},setGhost(e,t){if(V=e,z.visible=e!==null,e===null)return;se.color.set(t),k(e,1,z.quaternion);let n=O(e);z.scale.set(n,1,n)},setPreview(e){for(let t of G){if(e.includes(t))continue;let n=N.at(t);I(t,n.position),k(t,n.userData.owner,n.quaternion)}G=e},setLastMove(e){H=e,B.visible=e!==null,e!==null&&(B.quaternion.setFromUnitVectors(ht,D(e)),B.userData.r=O(e)*1.3)},faceCell(e,{duration:t=.75,minAngle:n=.55}={}){let r=c.position.clone(),i=r.length(),a=D(e).multiplyScalar(i);return a.y=g.lerp(a.y,r.y,.35),a.setLength(i),r.angleTo(a)<n?Promise.resolve():X.flyTo(a,{duration:t})},flyTo(t,{duration:n=1,ease:r=`inOutSine`}={}){let i=c.position.clone(),a=new e().setFromUnitVectors(i.clone().normalize(),t.clone().normalize()),s=i.length(),l=t.length(),u=++Se,d={t:0},f=new e;return o.tween(d,{t:1},{duration:n,ease:r,onUpdate:()=>{u===Se&&(f.identity().slerp(a,d.t),c.position.copy(i).normalize().applyQuaternion(f).multiplyScalar(g.lerp(s,l,d.t)))}})},intro(e,{duration:t=2.6}={}){let n=e.clone().normalize().applyAxisAngle(mt,-1.5).add(new b(0,.8,0)).normalize().multiplyScalar(48);return c.position.copy(n),X.flyTo(e,{duration:t,ease:e=>1-(1-e)**3})},frame(e,t=.9,n=0){let r={x:Ce,y:we};return o.tween(r,{x:e,y:n},{duration:t,ease:`inOutSine`,onUpdate:()=>(Ce=r.x,we=r.y)})},nudge(e=.35){let t={k:0},n=0,r=()=>{c.position.addScaledVector(Y.copy(c.position).normalize(),-(t.k-n)*e),n=t.k};o.tween(t,{k:1},{duration:.07,ease:`outQuad`,onUpdate:r}).then(()=>o.tween(t,{k:0},{duration:.35,ease:`outQuad`,onUpdate:r}))},update(e){if(Ee(),ge.uTime.value=e,z.visible){let t=D(V);z.position.copy(t).multiplyScalar(d+P+.35+Math.sin(e*4)*.08),se.opacity=.35+.15*Math.sin(e*4)}if(G.forEach((t,n)=>{let r=N.at(t),i=D(t);I(t,r.position).addScaledVector(i,.12+.07*Math.sin(e*9+n)),k(t,r.userData.owner,r.quaternion).premultiply(fe.setFromAxisAngle(Y.set(1,0,0).applyQuaternion(r.quaternion),.18*Math.sin(e*9+n)))}),B.visible){let t=B.userData.r*(1+.06*Math.sin(e*3));B.scale.set(t,t,t),D(H,B.position).multiplyScalar(d+.03)}for(let t of q.children){if(t.userData.kind!==`star`)continue;let n=1+.18*Math.sin(e*3+t.userData.cell);t.scale.setScalar(t.userData.base*n),t.material.rotation=e*.4}}};return X}var Z=(e,t,n)=>Object.assign(document.createElement(e),{className:t??``,innerHTML:n??``}),wt={tectonic:`<svg viewBox="0 0 24 24"><path d="M3 8h13l-3-3M21 16H8l3 3"/></svg>`,holes:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3a9 9 0 0 1 9 9M12 21a9 9 0 0 1-9-9M19 6a9 9 0 0 1-1 12M5 18A9 9 0 0 1 6 6"/></svg>`,nova:`<svg viewBox="0 0 24 24"><path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"/></svg>`,night:`<svg viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z"/></svg>`},Tt={tectonic:{name:`Tectonic shift`,line:`Every 3 turns a band of the planet slides round, carrying its discs. The band with racing arrows moves next.`},holes:{name:`Black holes`,line:`Six voids swallow cells. Nobody can play there, and lines stop at them, so some rings can never close.`},nova:{name:`Supernova stars`,line:`Play on a star (it must still be a legal move) and it bursts: every enemy disc touching it flips too.`},night:{name:`Night side`,line:`Night sweeps round the planet. Discs in the dark are asleep: lines through them capture nothing, unless you close a whole ring.`}};function Et(e,t,n){let r=Z(`div`,`orb-seg`),i={el:r,value:t};for(let[a,o,s]of e){let e=Z(`button`,s??``,o);e.type=`button`,e.classList.toggle(`on`,a===t),e.addEventListener(`click`,()=>{i.value=a,r.querySelectorAll(`button`).forEach(t=>t.classList.toggle(`on`,t===e)),n?.(a)}),r.append(e)}return i}var Dt=(e,t)=>{let n=Z(`div`,`orb-field`);return n.append(Z(`div`,`orb-label`,e),t.el??t),n};function Ot(e,t){let n=Number(e.dataset.value??e.textContent)||0;if(e.dataset.value=t,n===t)return e.textContent=t;let r=performance.now(),i=Math.min(450,90+Math.abs(t-n)*40);cancelAnimationFrame(e._roll);let a=o=>{let s=Math.min(1,(o-r)/i);e.textContent=Math.round(n+(t-n)*(1-(1-s)**3)),s<1&&(e._roll=requestAnimationFrame(a))};e._roll=requestAnimationFrame(a)}function kt(e,{names:t,actions:n,cells:r=128}){let i=Z(`div`,`orb`);i.style.pointerEvents=`none`,e.ui.root.append(i),i.append(Z(`div`,`orb-vignette`));let a=Z(`div`,`orb-score`),o=(e,n)=>{let r=Z(`div`,`orb-side ${e}`),i=Z(`div`,`orb-info`,`<div class="orb-name">${t[n]}</div><div class="orb-who"></div>`),a=Z(`div`,`orb-chip`),o=Z(`div`,`orb-count`,`2`);return e===`ember`?r.append(i,o,a):r.append(a,o,i),{s:r,count:o,who:i.querySelector(`.orb-who`)}},s={1:o(`ember`,1),2:o(`frost`,2)},c=Z(`div`,`orb-bar`,`<i class="e"></i><i class="f"></i><b></b>`),l=Z(`div`,`orb-score-row`);l.append(s[1].s,s[2].s),a.append(l,c);let u=Z(`div`,`orb-turn`);i.append(a,u);let d=Z(`div`,`orb-chips`),f=Z(`div`,`orb-tip`);i.append(d,f);let p={},m=(e,t)=>{f.innerHTML=t;let n=e.getBoundingClientRect();f.style.left=`${n.left}px`,f.style.top=`${n.bottom+8}px`,f.classList.add(`on`)},h=()=>f.classList.remove(`on`),g=Z(`div`,`orb-ticker`);i.append(g);let _=Z(`div`,`orb-tools`),v=(e,t,r,i)=>{let a=Z(`button`,`orb-tool`,`<span>${e}</span><kbd>${t}</kbd>`);return a.title=i??e,a.addEventListener(`click`,e=>{e.stopPropagation(),n.click?.(),r()}),a.addEventListener(`pointerenter`,()=>n.hover?.()),_.append(a),a};v(`New`,`N`,n.newGame,`New game`),v(`Undo`,`U`,n.undo,`Take back your last move`);let y=v(`Hints`,`H`,n.hints,`Show the moves you can make`),b=v(`Music`,`M`,n.music,`Music on/off`),x=Z(`input`,`orb-vol`);Object.assign(x,{type:`range`,min:0,max:1,step:.05,value:.7,title:`Volume`}),x.addEventListener(`input`,()=>n.volume?.(Number(x.value))),x.addEventListener(`pointerdown`,e=>e.stopPropagation()),_.append(x),v(`Menu`,`Esc`,n.menu,`Back to the menu`);let S=Z(`div`,`orb-help`,`Drag to spin the planet · scroll to zoom · click a glowing ring to play`);i.append(_,S);let C=[a,u,_,S,d,g],w={setScores(e){for(let t of[1,2])Ot(s[t].count,e[t]);let t=Math.max(1,e[1]+e[2]);c.querySelector(`.e`).style.width=`${e[1]/r*100}%`,c.querySelector(`.f`).style.width=`${e[2]/r*100}%`,c.querySelector(`b`).style.left=`${e[1]/t*100}%`},bump(e){let t=s[e].count;t.classList.remove(`bump`),t.offsetWidth,t.classList.add(`bump`)},setPlayers(e){for(let t of[1,2])s[t].who.textContent=e[t]},setTurn(e,t){for(let t of[1,2])s[t].s.classList.toggle(`active`,t===e);u.innerHTML!==t&&(u.innerHTML=t,u.classList.remove(`swap`),u.offsetWidth,u.classList.add(`swap`)),u.dataset.p=e??0},setToggles({hints:e,music:t,volume:n}){y.classList.toggle(`off`,!e),b.classList.toggle(`off`,!t),n!==void 0&&(x.value=n)},setRules(e){for(let[t,n]of Object.entries(e)){let e=p[t];e||(e=p[t]=Z(`div`,`orb-rchip ${t}`,`<span class="ic">${wt[t]}</span><span class="nm">${Tt[t].name}</span><span class="st"></span>`),e.addEventListener(`pointerenter`,()=>m(e,`<b>${Tt[t].name}</b>${Tt[t].line}`)),e.addEventListener(`pointerleave`,h),d.append(e));let r=e.querySelector(`.st`);r.innerHTML!==(n??``)&&(r.innerHTML=n??``),e.classList.toggle(`alert`,/now|next/i.test(n??``))}for(let t of Object.keys(p))t in e||(p[t].remove(),delete p[t])},log({player:e,text:t,detail:n=``}){let r=Z(`div`,`orb-tick p${e}`,`<i></i><span>${t}</span><em>${n}</em>`);for(g.prepend(r);g.children.length>6;)g.lastChild.remove()},clearLog(){g.innerHTML=``},hideHelp(){S.style.opacity=`0`},showPlayUi(e){for(let t of C)t.classList.toggle(`orb-hidden`,!e);e||h()},banner(e,t=`var(--ink)`,n=``){i.querySelector(`.orb-banner`)?.remove();let r=Z(`div`,`orb-banner ${n}`,e);r.style.color=t,i.append(r),setTimeout(()=>r.remove(),n===`big`?2400:1900)},menu(e){return w.showPlayUi(!1),new Promise(r=>{let a=Z(`div`,`orb-overlay orb-menu`),o=Z(`div`,`orb-card`);o.append(Z(`div`,`orb-kicker`,`A strategy game in orbit`),Z(`h1`,`orb-title`,`ORB<br>OTHELLO`),Z(`p`,`orb-tag`,`<b>Flank</b> your rival’s discs to flip them. Rows run <b>all the way round</b> the world, and if your disc closes a <b>ring</b>, the whole ring is yours.`));let s=structuredClone(e),c=Dt(`Computer`,Et([[`easy`,`Easy`],[`medium`,`Medium`],[`hard`,`Hard`]],s.level,e=>(s.level=e,n.click?.()))),l=Dt(`You play`,Et([[1,`${t[1]} · first`,`ember`],[2,t[2],`frost`]],s.human,e=>(s.human=e,n.click?.()))),u=()=>[c,l].forEach(e=>e.classList.toggle(`hidden`,s.mode!==`ai`)),d=Z(`div`,`orb-rules`);for(let e of Object.keys(Tt)){let t=Z(`button`,`orb-rule ${e}`,`<span class="ic">${wt[e]}</span><span class="tx"><b>${Tt[e].name}</b><small>${Tt[e].line}</small></span><span class="sw"></span>`);t.type=`button`,t.classList.toggle(`on`,!!s.rules[e]),t.addEventListener(`click`,()=>{s.rules[e]=!s.rules[e],t.classList.toggle(`on`,s.rules[e]),n.click?.()}),t.addEventListener(`pointerenter`,()=>n.hover?.()),d.append(t)}let f=Z(`div`,`orb-label`,`Cosmic rules <span class="dimmer">· none = classic</span>`),p=Z(`div`,`orb-col`),m=Z(`div`,`orb-col`);p.append(Dt(`Mode`,Et([[`ai`,`vs Computer`],[`hotseat`,`2 Players`]],s.mode,e=>(s.mode=e,u(),n.click?.()))),c,l,Dt(`Move hints`,Et([[!0,`On`],[!1,`Off`]],s.hints,e=>(s.hints=e,n.click?.()))),Dt(`Graphics`,Et([[`auto`,`Auto`],[`low`,`Low`],[`medium`,`Medium`],[`high`,`High`]],s.quality,e=>(s.quality=e,n.click?.(),n.quality?.(e))))),m.append(f,d);let h=Z(`div`,`orb-cols`);h.append(p,m),o.append(h),u();let g=Z(`button`,`orb-go`,`Launch`);g.addEventListener(`click`,()=>{a.classList.add(`leaving`),setTimeout(()=>a.remove(),380),r(s)}),g.addEventListener(`pointerenter`,()=>n.hover?.()),o.append(g,Z(`div`,`orb-foot`,`Drag to spin · scroll to zoom · U undo · H hints · M music · Esc menu`)),a.append(o),i.append(a),g.focus()})},end({title:e,color:t,scores:n,text:r,stats:a=[]}){return new Promise(o=>{let s=Z(`div`,`orb-overlay orb-end`),c=Z(`div`,`orb-card`),l=Z(`h1`,`orb-title`,e);t&&(l.style.background=`linear-gradient(90deg, ${t}, #fff 50%, ${t})`,l.style.webkitBackgroundClip=l.style.backgroundClip=`text`),c.append(l,Z(`div`,`orb-final`,`<span class="e">${n[1]}</span><i>vs</i><span class="f">${n[2]}</span>`),Z(`p`,`orb-tag`,r),Z(`div`,`orb-stats`,a.map(([e,t])=>`<div><b>${t}</b><span>${e}</span></div>`).join(``)));let u=Z(`button`,`orb-go`,`Play again`),d=Z(`button`,`orb-ghost`,`Change mode`);u.addEventListener(`click`,()=>(s.remove(),o(`again`))),d.addEventListener(`click`,()=>(s.remove(),o(`menu`))),c.append(u,d),s.append(c),i.append(s)})},closeOverlays(){i.querySelectorAll(`.orb-overlay`).forEach(e=>e.remove())}};return w}var Q={radius:5,latMax:60*Math.PI/180,camera:{distance:16,min:8.5,max:26},aiPauseMs:320,passPauseMs:1500,flipStep:.085,musicVolume:.5,names:{1:`Ember`,2:`Frost`},colors:{a:`#ffb43a`,aGlow:`#ff6a00`,b:`#5fd8ff`,bFace:`#3fb6ea`,bGlow:`#18b8ff`,rim:`#3a3550`,asleep:`#5a6390`,grid:`#a99bff`,nightGrid:`#6a4bd8`,atmo:`#5fa8ff`,sunset:`#c0607a`,companion:`#9cc4ff`,crystal:`#4f86c4`,crystalGlow:`#1d3fae`,auroraA:`#3dffc4`,auroraB:`#7a4dff`,ringA:`#9a8a76`,ringB:`#5a5672`,band:`#ff8a4c`,star:`#fff1cf`}},$={ember:[`/assets/sounds/kenney-impact/impactMetal_light_000.ogg`,`/assets/sounds/kenney-impact/impactMetal_light_001.ogg`,`/assets/sounds/kenney-impact/impactMetal_light_002.ogg`],frost:[`/assets/sounds/kenney-impact/impactGlass_light_000.ogg`,`/assets/sounds/kenney-impact/impactGlass_light_001.ogg`,`/assets/sounds/kenney-impact/impactGlass_light_002.ogg`],flip:`/assets/sounds/kenney-interface/glass_002.ogg`,hover:`/assets/sounds/kenney-interface/tick_002.ogg`,invalid:`/assets/sounds/kenney-interface/error_004.ogg`,pass:`/assets/sounds/kenney-interface/question_001.ogg`,undo:`/assets/sounds/kenney-interface/back_001.ogg`,click:`/assets/sounds/kenney-interface/click_001.ogg`,start:`/assets/sounds/kenney-interface/maximize_001.ogg`,ring:`/assets/sounds/kenney-scifi/forceField_000.ogg`,boom:`/assets/sounds/kenney-scifi/lowFrequency_explosion_000.ogg`,nova:`/assets/sounds/kenney-scifi/forceField_002.ogg`,rumble:`/assets/sounds/kenney-scifi/lowFrequency_explosion_001.ogg`,whoosh:`/assets/sounds/kenney-scifi/spaceEngineLarge_000.ogg`,win:`/assets/music/space-victory.ogg`,lose:`/assets/music/space-defeat.ogg`},At={calm:`/assets/music/space-ambient.ogg`,intense:`/assets/music/space-urgent-loop.ogg`},jt=`ABCDEFGHIJKLMNOP`,Mt=.06,Nt=e=>`${jt[W(e)]}${U(e)+1}`,Pt={low:{bloom:!1,grade:!1},medium:{bloom:{strength:.55,radius:.45,threshold:.92},grade:!1},high:{bloom:{strength:.72,radius:.55,threshold:.86},grade:{saturation:1.08,contrast:1.06,shadows:`#0d0628`}}},Ft={async setup(e){let{look:t,audio:n,fx:r,input:i,camera:a,renderer:o}=e,s=Q.colors,c=e=>e===1?s.a:s.b,l=e=>e===1?`var(--ember)`:`var(--frost)`;t.preset(`space`,{sky:`#010106`,env:!1,vignette:0,fog:!1,sun:{color:`#fff0d8`,intensity:2.6},rim:{color:s.companion,intensity:1.4},hemi:{sky:`#3a3070`,ground:`#05030f`,intensity:.25}}),t.sun.castShadow=!1;let u=``,d=()=>{u!==t.quality&&(u=t.quality,t.set(Pt[t.quality]??Pt.medium))},f=new N(o).fromScene(new re,.04).texture,p={radius:Q.radius,rows:8,cols:16,latMax:Q.latMax,colors:s,env:f,quality:t.quality},m=ct(e,p),h=pt(e,p),g=Ct(e,p);d();let _=e.cameraRig.orbit({target:[0,0,0],distance:Q.camera.distance,minDistance:Q.camera.min,maxDistance:Q.camera.max,maxPolarAngle:Math.PI-.25}),v=()=>g.normalOf(55).add(g.normalOf(72)).normalize().add(new b(0,.22,0)).setLength(Q.camera.distance);a.position.copy(v()).multiplyScalar(1.45),Object.assign(_,{minPolarAngle:.25,enablePan:!1,rotateSpeed:.55,zoomSpeed:.8,dampingFactor:.07,autoRotateSpeed:.35});let y=new b(.4,.6,.7).normalize(),x=new b,S=new b(-1,.4,0).normalize(),C=new b,w=new b,T=new b,E=new b,D=0,ee=e=>{if(E.copy(a.position).normalize(),w.crossVectors(a.up,E).normalize(),T.crossVectors(E,w),O.rules.night){let t=((q(O)[0]-D)%16+24)%16-8;D=(D+t*Math.min(1,e*2.5)+16)%16,m.setNight(D,5,!0)}else m.setNight(0,0,!1);x.copy(E).multiplyScalar(.75).addScaledVector(T,.55).addScaledVector(w,-.45).normalize(),y.lerp(x,Math.min(1,e*6)).normalize(),C.copy(E).multiplyScalar(-.85).addScaledVector(w,.42).addScaledVector(T,.3).normalize(),S.lerp(C,Math.min(1,e*3)).normalize(),m.setLight(y),m.setRim(S),t.sun.position.copy(y).multiplyScalar(50),t.sun.target.position.set(0,0,0),t.rim.position.copy(S).multiplyScalar(50),t.rim.target.position.set(0,0,0)},O=pe(),k={mode:`ai`,level:`medium`,human:1,hints:!0,rules:Object.fromEntries(B.map(e=>[e,!1])),quality:t.qualityMode??`auto`},A=!0,te=.8,j=0,M=!1,ne=!1,ie=!1,P=null,F=[],I=null,L=null,ae=e=>k.mode===`ai`&&e!==k.human,oe=()=>!M&&!ne&&!ie&&!ae(O.current),R=(e,t)=>n.play(e,t).catch(e=>console.warn(e.message)),ce=e=>e[Math.floor(Math.random()*e.length)],z=null,le=null,ue=!1;function de(){!A||z||le||(le=n.musicLayers(At,{volume:Q.musicVolume,xfade:4,fadeIn:3}).then(e=>{if(le=null,!A)return e.stop(.1);z=e,ie&&e.muffle(900,.01),e.setIntensity(+!!ue,.01)}).catch(e=>(le=null,console.warn(e.message))))}function V(){A=!A,A?de():(n.stopMusic(),z=null),K()}function H(){let e=Ee(O),t=(e[1]+e[2])/128,n=Math.abs(e[1]-e[2]);!ue&&(t>.5&&n<=14||t>.72)?ue=!0:ue&&t<.4&&(ue=!1),z?.setIntensity(+!!ue,6)}window.addEventListener(`pointerdown`,de),window.addEventListener(`keydown`,de);let G=kt(e,{names:Q.names,cells:128,actions:{newGame:()=>X(),undo:()=>De(),hints:()=>{k.hints=!k.hints,K()},music:()=>V(),volume:e=>{te=e,n.setVolume(`master`,e)},quality:e=>t.quality=e,menu:()=>Ae(),click:()=>(de(),R($.click,{volume:.35})),hover:()=>R($.hover,{volume:.12,rate:1.3})}});n.setVolume(`master`,te);let fe=()=>{let e={};if(O.rules.tectonic){let t=ye(O);e.tectonic=t.in===1?`after this move`:`in ${t.in} moves`}if(O.rules.holes&&(e.holes=`${[...O.cells].filter(e=>e===3).length} voids`),O.rules.nova){let t=O.stars.reduce((e,t)=>e+t,0);e.nova=t?`${t} star${t>1?`s`:``} left`:`all used`}if(O.rules.night){let t=new Set(q(O));e.night=`${[...O.cells].filter((e,n)=>(e===1||e===2)&&t.has(W(n))).length} asleep`}return e},K=()=>{G.setToggles({hints:k.hints,music:A});let e=k.hints&&oe()?Y(O):[],t=oe()&&P!==null&&J(O,P).length>0;F=t?J(O,P).flat():[],m.setCells(O.cells,{legal:e,preview:F,hover:t?P:null}),m.setMarks(O.stars),m.setTurn(c(O.current)),g.setGhost(t?P:null,c(O.current)),g.setPreview(F),g.setAsleep(q(O));let n=ye(O);if(n&&n.in<=2&&!ne?m.setBand(n.row,n.k,n.in===1?1:.5):m.setBand(0,1,0),G.setRules(fe()),ne)return;if(I)return G.setTurn(...I);let r=Q.names[O.current];ae(O.current)?G.setTurn(O.current,`${r} is thinking<span class="dots"></span>`):k.mode===`ai`?G.setTurn(O.current,`Your move`):G.setTurn(O.current,`${r} to move`)},me=()=>G.setPlayers(k.mode===`ai`?{[k.human]:`You`,[3-k.human]:`Computer · ${Ne[k.level].label}`}:{1:`Player 1`,2:`Player 2`}),he=e=>new Promise(t=>setTimeout(t,e));async function ge(){let e=j,t=Oe(O);if(t.over)return Se(t);if(ke(O)){M=!0,I=[O.current,`${Q.names[O.current]} passes`],K();let t=O.rules.night?`nothing to flank in daylight`:`no move flanks anything`;if(G.banner(`${Q.names[O.current]} passes<small>${t}</small>`,l(O.current)),R($.pass,{volume:.6}),await he(Q.passPauseMs),I=null,e!==j)return;let n=we(O,-1);return G.log({player:n.player,text:`Pass`,detail:``}),n.shift&&await be(n.shift),e===j?(M=!1,ge()):void 0}K(),je.refresh(),ae(O.current)&&_e()}async function _e(){let e=j;M=!0,K();let t=performance.now(),n=await Ze(O,k.level,{cancelled:()=>e!==j,sliceMs:5,pause:()=>new Promise(requestAnimationFrame)});e===j&&n!==void 0&&(await he(Math.max(0,Q.aiPauseMs-(performance.now()-t))),e===j&&(n!==-1&&await g.faceCell(n),e===j&&await xe(n)))}function ve({color:e,slow:n=.3,hold:i=.55,shake:a=.16}){if(r.slowMo(n,i),r.flash(e,.45),r.shake(a,.5),z?.duck(.3,1.2),t.quality!==`low`){let e={a:1};r.tween(e,{a:0},{duration:.9,onUpdate:()=>t.set({aberration:e.a*.9})}).then(()=>t.set({aberration:0}))}}async function be({row:e,k:t}){let n=j;G.banner(`Tectonic shift<small>band ${e+1} slides ${Math.abs(t)} ${t>0?`east`:`west`}</small>`,`#ffb08a`),R($.rumble,{volume:.7,rate:.7}),r.shake(.05,1.1),m.rowFlash(e,s.band),m.setBand(0,1,0),z?.duck(.5,.8),L.shifts++,await g.animateShift(e,t,O),n===j&&K()}async function xe(e){let t=j;M=!0,P=null;let n=we(O,e);if(!n)return M=!1;if(n.move===-1)return M=!1,ge();ae(n.player)||G.hideHelp();let i=O.cells.slice();if(n.shift){let{row:e,k:t}=n.shift;for(let n=0;n<16;n++)i[e*16+n]=O.cells[e*16+((n+t)%16+16)%16]}m.setCells(i),g.setGhost(null),g.setPreview([]);let a=Ee(O),o={1:a[1],2:a[2]};o[n.player]-=n.flipped.length,o[3-n.player]+=n.flipped.length,G.setScores(o);let u=n.lines.find(e=>e.length>=15),d=!!u,f=c(n.player);I=[n.player,`${Q.names[n.player]} captures ${n.flipped.length}`],G.setTurn(...I);let p=n.flipped.length>=6||d;L.best[n.player]=Math.max(L.best[n.player],n.flipped.length);let h=[d&&`ring`,n.nova?.length&&`nova`].filter(Boolean).join(` · `);G.log({player:n.player,text:Nt(e),detail:`+${n.flipped.length}${h?` · ${h}`:``}`}),await g.animateMove(n,{step:Q.flipStep,onLand:()=>{let t=g.normalOf(e);R(ce(n.player===1?$.ember:$.frost),{volume:.8,rate:.95+Math.random()*.1}),m.ripple(t,f),g.shockwave(e,f,{size:p?3.4:2.2}),r.burst(g.restPos(e),{color:f,count:p?40:24,speed:2.8,life:.6,size:.16,gravity:0,spread:0}),g.nudge(p?.6:.3),d?(L.rings[n.player]++,G.banner(`Ring closed!<small>${u.length} discs round the world</small>`,l(n.player),`big`),R($.ring,{volume:.75}),R($.boom,{volume:.5,rate:.8}),m.rowFlash(U(e),f,W(e)),ve({color:f})):p&&r.shake(.07,.25)},onNova:()=>{L.novas[n.player]++,G.banner(`Supernova!<small>${n.nova.length} touching disc${n.nova.length===1?``:`s`} flip</small>`,`#fff1cf`,`big`),R($.boom,{volume:.7}),R($.nova,{volume:.6}),g.shockwave(e,s.star,{size:6,duration:.9}),r.burst(g.restPos(e).multiplyScalar(1.02),{color:s.star,count:70,speed:4.5,life:.9,size:.2,gravity:0,spread:0}),m.ripple(g.normalOf(e),s.star),ve({color:`#fff1cf`,slow:.35,hold:.4,shake:.2})},onFlip:(e,t)=>{R($.flip,{volume:.3,rate:Math.min(2.4,.85+t*.07)}),r.burst(g.restPos(e),{color:f,count:8,speed:1.6,life:.4,size:.12,gravity:0,spread:0}),o[n.player]++,o[3-n.player]--,G.bump(n.player),G.setScores(o)}}),I=null,t===j&&(n.shift&&await be(n.shift),t===j&&(M=!1,G.setScores(Ee(O)),H(),ge()))}function Se(e){ne=!0,M=!1,K();let{winner:t,scores:n}=e,i=j,o=Q.names[t],s=t?`${o} wins`:`Draw`,l=t?`${o} holds ${n[t]} of ${128-[...O.cells].filter(e=>e===3).length} cells.`:`The planet is split exactly in two.`,u=k.mode===`ai`&&t===k.human;k.mode===`ai`&&t&&(s=u?`Victory`:`Defeat`,l=u?`You beat the ${Ne[k.level].label.toLowerCase()} computer. ${l}`:`The ${Ne[k.level].label.toLowerCase()} computer wins this one. ${l}`),G.setTurn(t||null,t?`${o} wins`:`Draw`);let d=k.mode===`ai`&&t&&!u;if(z?.duck(.15,d?5:6,{release:3}),R(d?$.lose:$.win,{volume:.9}),t){let e=O.history.entries.findLast(e=>e.move>=0),n=e?g.normalOf(e.move):a.position.clone().normalize(),o=c(t);m.flood(n,o),m.ripple(n,o),h.setAurora(o,t===1?`#ff3d6e`:`#7a4dff`,1.1);let s=[...O.cells].map((e,n)=>e===t?n:-1).filter(e=>e>=0);for(let e=0;e<12;e++)setTimeout(()=>{if(i!==j||!s.length)return;let t=ce(s);r.burst(g.restPos(t).multiplyScalar(1.15),{color:e%3?o:`#ffffff`,count:46,speed:3.2,life:1.1,size:.18,gravity:0,spread:0}),g.shockwave(t,o,{size:4,duration:.9})},300+e*220);r.flash(o,.6)}_.autoRotate=!0,g.flyTo(a.position.clone().setLength(21),{duration:2.4}),setTimeout(async()=>{if(i!==j)return;let e=[[`Biggest capture`,Math.max(L.best[1],L.best[2])],[`Rings closed`,L.rings[1]+L.rings[2]],...O.rules.nova?[[`Supernovas`,L.novas[1]+L.novas[2]]]:[],...O.rules.tectonic?[[`Shifts`,L.shifts]]:[],[`Moves`,O.history.entries.filter(e=>e.move>=0).length]],r=await G.end({title:s,color:t?c(t):null,scores:n,text:l,stats:e});i===j&&(_.autoRotate=!1,r===`again`?X():Ae())},2600)}function Ce(){m.flood(null),h.setAurora(s.auroraA,s.auroraB,.75),e.timeScale=1}async function X({intro:e=!1}={}){j++;let t=j;if(I=null,O=pe({rules:k.rules,seed:Math.random()*2**31>>>0}),D=q(O)[0]??0,L={best:{1:0,2:0},rings:{1:0,2:0},novas:{1:0,2:0},shifts:0},ne=!1,M=!0,P=null,ue=!1,z?.setIntensity(0,3),_.autoRotate=!1,Ce(),G.closeOverlays(),G.clearLog(),g.sync(O),me(),G.setScores(Ee(O)),K(),e){if(G.showPlayUi(!1),R($.whoosh,{volume:.45,rate:.75}),_.enabled=!1,await g.intro(v()),_.enabled=!0,t!==j)return;let e=B.filter(e=>O.rules[e]).map(e=>Tt[e].name);G.banner(`${e.length?`Cosmic match`:`Classic match`}<small>${e.length?e.join(` · `):`flank · wrap · close rings`}</small>`,`var(--ink)`)}else g.faceCell(55,{minAngle:.3});G.showPlayUi(!0),R($.start,{volume:.45}),m.ripple(g.normalOf(55),s.grid),M=!1,ge()}function De(){if(ie||!O.history.size)return;let e=O.history.stepsBackTo(e=>e.move!==-1&&!ae(e.player));if(e){j++,I=null;for(let t=0;t<e;t++)Te(O);ne=!1,M=!1,P=null,_.autoRotate=!1,Ce(),G.closeOverlays(),G.showPlayUi(!0),g.sync(O),G.setScores(Ee(O)),G.log({player:O.current,text:`Undo`,detail:`${e} move${e>1?`s`:``}`}),R($.undo,{volume:.7}),r.flash(`#6f5bff`,.25),H(),ge()}}async function Ae(){j++,M=!0,ie=!0,G.closeOverlays(),Ce(),_.autoRotate=!0,g.frame(.2),g.flyTo(a.position.clone().setLength(Q.camera.distance*1.3),{duration:1.2}),z?.muffle(900,1.2),z?.setIntensity(0,2),K(),k=await G.menu(k),ie=!1,t.quality=k.quality,z?.muffle(null,2),g.frame(0,1.2,Mt),de(),X({intro:!0})}let je=se(e,{targets:[m.mesh],cellAt:e=>g.cellAtPoint(e.point),onHover:e=>{P=e,oe()&&e!==null&&J(O,e).length&&R($.hover,{volume:.2}),K()},onPick:e=>{oe()&&(J(O,e).length?xe(e):R($.invalid,{volume:.4}))}}),Me=0;e.onUpdate((e,t)=>{d(),ee(Math.max(.001,t-Me)),Me=t,m.update(t),g.update(t),h.update(t,a,y,S),!ie&&(i.wasPressed(`KeyU`)&&De(),i.wasPressed(`KeyN`)&&X(),i.wasPressed(`KeyH`)&&(k.hints=!k.hints,K()),i.wasPressed(`KeyM`)&&V(),i.wasPressed(`Escape`)&&Ae())}),await n.preload(...$.ember,...$.frost,$.flip,$.hover,$.click).catch(e=>console.warn(e.message)),g.sync(O),K(),g.beam([0,1,2],s.a,{duration:.02}),g.shockwave(0,s.a,{duration:.02}),r.burst(new b,{count:1,life:.02}),o.compile(e.scene,a),Ae()}};export{Ft as default};