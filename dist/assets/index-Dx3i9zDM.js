var de=Object.defineProperty;var _e=(t,e,n)=>e in t?de(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var dt=(t,e,n)=>(_e(t,typeof e!="symbol"?e+"":e,n),n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();function b(){}const Kt=t=>t;function Z(t,e){for(const n in e)t[n]=e[n];return t}function pe(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function Vt(t){return t()}function Ct(){return Object.create(null)}function M(t){t.forEach(Vt)}function et(t){return typeof t=="function"}function D(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}function he(t){return Object.keys(t).length===0}function Wt(t,...e){if(t==null){for(const r of e)r(void 0);return b}const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Q(t,e,n){t.$$.on_destroy.push(Wt(e,n))}function St(t,e,n,r){if(t){const o=Jt(t,e,n,r);return t[0](o)}}function Jt(t,e,n,r){return t[1]&&r?Z(n.ctx.slice(),t[1](r(e))):n.ctx}function Et(t,e,n,r){if(t[2]&&r){const o=t[2](r(n));if(e.dirty===void 0)return o;if(typeof o=="object"){const s=[],i=Math.max(e.dirty.length,o.length);for(let l=0;l<i;l+=1)s[l]=e.dirty[l]|o[l];return s}return e.dirty|o}return e.dirty}function Ot(t,e,n,r,o,s){if(o){const i=Jt(e,n,r,s);t.p(i,o)}}function Nt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let r=0;r<n;r++)e[r]=-1;return e}return-1}function At(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}const Qt=typeof window<"u";let Xt=Qt?()=>window.performance.now():()=>Date.now(),Rt=Qt?t=>requestAnimationFrame(t):b;const F=new Set;function Zt(t){F.forEach(e=>{e.c(t)||(F.delete(e),e.f())}),F.size!==0&&Rt(Zt)}function te(t){let e;return F.size===0&&Rt(Zt),{promise:new Promise(n=>{F.add(e={c:t,f:n})}),abort(){F.delete(e)}}}function S(t,e){t.appendChild(e)}function ee(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function me(t){const e=N("style");return e.textContent="/* empty */",ge(ee(t),e),e.sheet}function ge(t,e){return S(t.head||t,e),e.sheet}function L(t,e,n){t.insertBefore(e,n||null)}function C(t){t.parentNode&&t.parentNode.removeChild(t)}function N(t){return document.createElement(t)}function ne(t){return document.createTextNode(t)}function j(){return ne(" ")}function K(){return ne("")}function _t(t,e,n,r){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n,r)}function be(t){return function(e){return e.preventDefault(),t.call(this,e)}}function v(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ye(t){return Array.from(t.childNodes)}function st(t,e){t.value=e??""}function we(t,e,{bubbles:n=!1,cancelable:r=!1}={}){return new CustomEvent(t,{detail:e,bubbles:n,cancelable:r})}function Lt(t,e){return new t(e)}const lt=new Map;let ut=0;function ke(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function ve(t,e){const n={stylesheet:me(e),rules:{}};return lt.set(t,n),n}function re(t,e,n,r,o,s,i,l=0){const c=16.666/r;let u=`{
`;for(let h=0;h<=1;h+=c){const y=e+(n-e)*s(h);u+=h*100+`%{${i(y,1-y)}}
`}const a=u+`100% {${i(n,1-n)}}
}`,f=`__svelte_${ke(a)}_${l}`,p=ee(t),{stylesheet:m,rules:d}=lt.get(p)||ve(p,t);d[f]||(d[f]=!0,m.insertRule(`@keyframes ${f} ${a}`,m.cssRules.length));const g=t.style.animation||"";return t.style.animation=`${g?`${g}, `:""}${f} ${r}ms linear ${o}ms 1 both`,ut+=1,f}function yt(t,e){const n=(t.style.animation||"").split(", "),r=n.filter(e?s=>s.indexOf(e)<0:s=>s.indexOf("__svelte")===-1),o=n.length-r.length;o&&(t.style.animation=r.join(", "),ut-=o,ut||$e())}function $e(){Rt(()=>{ut||(lt.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&C(e)}),lt.clear())})}let tt;function I(t){tt=t}function nt(){if(!tt)throw new Error("Function called outside component initialization");return tt}function Se(t){nt().$$.on_mount.push(t)}function Ee(t){nt().$$.on_destroy.push(t)}function pt(t,e){return nt().$$.context.set(t,e),e}function wt(t){return nt().$$.context.get(t)}const q=[],It=[];let H=[];const Tt=[],Oe=Promise.resolve();let kt=!1;function Ne(){kt||(kt=!0,Oe.then(Pt))}function G(t){H.push(t)}const ht=new Set;let z=0;function Pt(){if(z!==0)return;const t=tt;do{try{for(;z<q.length;){const e=q[z];z++,I(e),Re(e.$$)}}catch(e){throw q.length=0,z=0,e}for(I(null),q.length=0,z=0;It.length;)It.pop()();for(let e=0;e<H.length;e+=1){const n=H[e];ht.has(n)||(ht.add(n),n())}H.length=0}while(q.length);for(;Tt.length;)Tt.pop()();kt=!1,ht.clear(),I(t)}function Re(t){if(t.fragment!==null){t.update(),M(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(G)}}function Pe(t){const e=[],n=[];H.forEach(r=>t.indexOf(r)===-1?e.push(r):n.push(r)),n.forEach(r=>r()),H=e}let J;function oe(){return J||(J=Promise.resolve(),J.then(()=>{J=null})),J}function ft(t,e,n){t.dispatchEvent(we(`${e?"intro":"outro"}${n}`))}const ct=new Set;let T;function V(){T={r:0,c:[],p:T}}function W(){T.r||M(T.c),T=T.p}function k(t,e){t&&t.i&&(ct.delete(t),t.i(e))}function $(t,e,n,r){if(t&&t.o){if(ct.has(t))return;ct.add(t),T.c.push(()=>{ct.delete(t),r&&(n&&t.d(1),r())}),t.o(e)}else r&&r()}const se={duration:0};function Ce(t,e,n){const r={direction:"in"};let o=e(t,n,r),s=!1,i,l,c=0;function u(){i&&yt(t,i)}function a(){const{delay:p=0,duration:m=300,easing:d=Kt,tick:g=b,css:h}=o||se;h&&(i=re(t,0,1,m,p,d,h,c++)),g(0,1);const y=Xt()+p,O=y+m;l&&l.abort(),s=!0,G(()=>ft(t,!0,"start")),l=te(w=>{if(s){if(w>=O)return g(1,0),ft(t,!0,"end"),u(),s=!1;if(w>=y){const R=d((w-y)/m);g(R,1-R)}}return s})}let f=!1;return{start(){f||(f=!0,yt(t),et(o)?(o=o(r),oe().then(a)):a())},invalidate(){f=!1},end(){s&&(u(),s=!1)}}}function Ae(t,e,n){const r={direction:"out"};let o=e(t,n,r),s=!0,i;const l=T;l.r+=1;let c;function u(){const{delay:a=0,duration:f=300,easing:p=Kt,tick:m=b,css:d}=o||se;d&&(i=re(t,1,0,f,a,p,d));const g=Xt()+a,h=g+f;G(()=>ft(t,!1,"start")),"inert"in t&&(c=t.inert,t.inert=!0),te(y=>{if(s){if(y>=h)return m(0,1),ft(t,!1,"end"),--l.r||M(l.c),!1;if(y>=g){const O=p((y-g)/f);m(1-O,O)}}return s})}return et(o)?oe().then(()=>{o=o(r),u()}):u(),{end(a){a&&"inert"in t&&(t.inert=c),a&&o.tick&&o.tick(1,0),s&&(i&&yt(t,i),s=!1)}}}function Mt(t,e){const n=e.token={};function r(o,s,i,l){if(e.token!==n)return;e.resolved=l;let c=e.ctx;i!==void 0&&(c=c.slice(),c[i]=l);const u=o&&(e.current=o)(c);let a=!1;e.block&&(e.blocks?e.blocks.forEach((f,p)=>{p!==s&&f&&(V(),$(f,1,1,()=>{e.blocks[p]===f&&(e.blocks[p]=null)}),W())}):e.block.d(1),u.c(),k(u,1),u.m(e.mount(),e.anchor),a=!0),e.block=u,e.blocks&&(e.blocks[s]=u),a&&Pt()}if(pe(t)){const o=nt();if(t.then(s=>{I(o),r(e.then,1,e.value,s),I(null)},s=>{if(I(o),r(e.catch,2,e.error,s),I(null),!e.hasCatch)throw s}),e.current!==e.pending)return r(e.pending,0),!0}else{if(e.current!==e.then)return r(e.then,1,e.value,t),!0;e.resolved=t}}function Le(t,e,n){const r=e.slice(),{resolved:o}=t;t.current===t.then&&(r[t.value]=o),t.current===t.catch&&(r[t.error]=o),t.block.p(r,n)}function jt(t,e){const n={},r={},o={$$scope:1};let s=t.length;for(;s--;){const i=t[s],l=e[s];if(l){for(const c in i)c in l||(r[c]=1);for(const c in l)o[c]||(n[c]=l[c],o[c]=1);t[s]=l}else for(const c in i)o[c]=1}for(const i in r)i in n||(n[i]=void 0);return n}function it(t){return typeof t=="object"&&t!==null?t:{}}function Y(t){t&&t.c()}function x(t,e,n){const{fragment:r,after_update:o}=t.$$;r&&r.m(e,n),G(()=>{const s=t.$$.on_mount.map(Vt).filter(et);t.$$.on_destroy?t.$$.on_destroy.push(...s):M(s),t.$$.on_mount=[]}),o.forEach(G)}function U(t,e){const n=t.$$;n.fragment!==null&&(Pe(n.after_update),M(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Ie(t,e){t.$$.dirty[0]===-1&&(q.push(t),Ne(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function rt(t,e,n,r,o,s,i=null,l=[-1]){const c=tt;I(t);const u=t.$$={fragment:null,ctx:[],props:s,update:b,not_equal:o,bound:Ct(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:Ct(),dirty:l,skip_bound:!1,root:e.target||c.$$.root};i&&i(u.root);let a=!1;if(u.ctx=n?n(t,e.props||{},(f,p,...m)=>{const d=m.length?m[0]:p;return u.ctx&&o(u.ctx[f],u.ctx[f]=d)&&(!u.skip_bound&&u.bound[f]&&u.bound[f](d),a&&Ie(t,f)),p}):[],u.update(),a=!0,M(u.before_update),u.fragment=r?r(u.ctx):!1,e.target){if(e.hydrate){const f=ye(e.target);u.fragment&&u.fragment.l(f),f.forEach(C)}else u.fragment&&u.fragment.c();e.intro&&k(t.$$.fragment),x(t,e.target,e.anchor),Pt()}I(c)}class ot{constructor(){dt(this,"$$");dt(this,"$$set")}$destroy(){U(this,1),this.$destroy=b}$on(e,n){if(!et(n))return b;const r=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return r.push(n),()=>{const o=r.indexOf(n);o!==-1&&r.splice(o,1)}}$set(e){this.$$set&&!he(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const Te="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Te);const xt={},vt={},Me={},ie=/^:(.+)/,Ut=4,je=3,xe=2,Ue=1,De=1,$t=t=>t.replace(/(^\/+|\/+$)/g,"").split("/"),mt=t=>t.replace(/(^\/+|\/+$)/g,""),ze=(t,e)=>{const n=t.default?0:$t(t.path).reduce((r,o)=>(r+=Ut,o===""?r+=De:ie.test(o)?r+=xe:o[0]==="*"?r-=Ut+Ue:r+=je,r),0);return{route:t,score:n,index:e}},Be=t=>t.map(ze).sort((e,n)=>e.score<n.score?1:e.score>n.score?-1:e.index-n.index),Dt=(t,e)=>{let n,r;const[o]=e.split("?"),s=$t(o),i=s[0]==="",l=Be(t);for(let c=0,u=l.length;c<u;c++){const a=l[c].route;let f=!1;if(a.default){r={route:a,params:{},uri:e};continue}const p=$t(a.path),m={},d=Math.max(s.length,p.length);let g=0;for(;g<d;g++){const h=p[g],y=s[g];if(h&&h[0]==="*"){const w=h==="*"?"*":h.slice(1);m[w]=s.slice(g).map(decodeURIComponent).join("/");break}if(typeof y>"u"){f=!0;break}const O=ie.exec(h);if(O&&!i){const w=decodeURIComponent(y);m[O[1]]=w}else if(h!==y){f=!0;break}}if(!f){n={route:a,params:m,uri:"/"+s.slice(0,g).join("/")};break}}return n||r||null},zt=(t,e)=>`${mt(e==="/"?t:`${mt(t)}/${mt(e)}`)}/`,ce=()=>typeof window<"u"&&"document"in window&&"location"in window,qe=t=>({params:t&4}),Bt=t=>({params:t[2]});function qt(t){let e,n,r,o;const s=[He,Fe],i=[];function l(c,u){return c[0]?0:1}return e=l(t),n=i[e]=s[e](t),{c(){n.c(),r=K()},m(c,u){i[e].m(c,u),L(c,r,u),o=!0},p(c,u){let a=e;e=l(c),e===a?i[e].p(c,u):(V(),$(i[a],1,1,()=>{i[a]=null}),W(),n=i[e],n?n.p(c,u):(n=i[e]=s[e](c),n.c()),k(n,1),n.m(r.parentNode,r))},i(c){o||(k(n),o=!0)},o(c){$(n),o=!1},d(c){c&&C(r),i[e].d(c)}}}function Fe(t){let e;const n=t[8].default,r=St(n,t,t[7],Bt);return{c(){r&&r.c()},m(o,s){r&&r.m(o,s),e=!0},p(o,s){r&&r.p&&(!e||s&132)&&Ot(r,n,o,o[7],e?Et(n,o[7],s,qe):Nt(o[7]),Bt)},i(o){e||(k(r,o),e=!0)},o(o){$(r,o),e=!1},d(o){r&&r.d(o)}}}function He(t){let e,n,r,o={ctx:t,current:null,token:null,hasCatch:!1,pending:Ke,then:Ge,catch:Ye,value:12,blocks:[,,,]};return Mt(n=t[0],o),{c(){e=K(),o.block.c()},m(s,i){L(s,e,i),o.block.m(s,o.anchor=i),o.mount=()=>e.parentNode,o.anchor=e,r=!0},p(s,i){t=s,o.ctx=t,i&1&&n!==(n=t[0])&&Mt(n,o)||Le(o,t,i)},i(s){r||(k(o.block),r=!0)},o(s){for(let i=0;i<3;i+=1){const l=o.blocks[i];$(l)}r=!1},d(s){s&&C(e),o.block.d(s),o.token=null,o=null}}}function Ye(t){return{c:b,m:b,p:b,i:b,o:b,d:b}}function Ge(t){var l;let e,n,r;const o=[t[2],t[3]];var s=((l=t[12])==null?void 0:l.default)||t[12];function i(c,u){let a={};for(let f=0;f<o.length;f+=1)a=Z(a,o[f]);return u!==void 0&&u&12&&(a=Z(a,jt(o,[u&4&&it(c[2]),u&8&&it(c[3])]))),{props:a}}return s&&(e=Lt(s,i(t))),{c(){e&&Y(e.$$.fragment),n=K()},m(c,u){e&&x(e,c,u),L(c,n,u),r=!0},p(c,u){var a;if(u&1&&s!==(s=((a=c[12])==null?void 0:a.default)||c[12])){if(e){V();const f=e;$(f.$$.fragment,1,0,()=>{U(f,1)}),W()}s?(e=Lt(s,i(c,u)),Y(e.$$.fragment),k(e.$$.fragment,1),x(e,n.parentNode,n)):e=null}else if(s){const f=u&12?jt(o,[u&4&&it(c[2]),u&8&&it(c[3])]):{};e.$set(f)}},i(c){r||(e&&k(e.$$.fragment,c),r=!0)},o(c){e&&$(e.$$.fragment,c),r=!1},d(c){c&&C(n),e&&U(e,c)}}}function Ke(t){return{c:b,m:b,p:b,i:b,o:b,d:b}}function Ve(t){let e,n,r=t[1]&&t[1].route===t[5]&&qt(t);return{c(){r&&r.c(),e=K()},m(o,s){r&&r.m(o,s),L(o,e,s),n=!0},p(o,[s]){o[1]&&o[1].route===o[5]?r?(r.p(o,s),s&2&&k(r,1)):(r=qt(o),r.c(),k(r,1),r.m(e.parentNode,e)):r&&(V(),$(r,1,1,()=>{r=null}),W())},i(o){n||(k(r),n=!0)},o(o){$(r),n=!1},d(o){o&&C(e),r&&r.d(o)}}}function We(t,e,n){let r,{$$slots:o={},$$scope:s}=e,{path:i=""}=e,{component:l=null}=e,c={},u={};const{registerRoute:a,unregisterRoute:f,activeRoute:p}=wt(vt);Q(t,p,d=>n(1,r=d));const m={path:i,default:i===""};return a(m),Ee(()=>{f(m)}),t.$$set=d=>{n(11,e=Z(Z({},e),At(d))),"path"in d&&n(6,i=d.path),"component"in d&&n(0,l=d.component),"$$scope"in d&&n(7,s=d.$$scope)},t.$$.update=()=>{if(r&&r.route===m){n(2,c=r.params);const{component:d,path:g,...h}=e;n(3,u=h),d&&(d.toString().startsWith("class ")?n(0,l=d):n(0,l=d())),ce()&&!r.preserveScroll&&(window==null||window.scrollTo(0,0))}},e=At(e),[l,r,c,u,p,m,i,s,o]}class gt extends ot{constructor(e){super(),rt(this,e,We,Ve,D,{path:6,component:0})}}const B=[];function Je(t,e){return{subscribe:X(t,e).subscribe}}function X(t,e=b){let n;const r=new Set;function o(l){if(D(t,l)&&(t=l,n)){const c=!B.length;for(const u of r)u[1](),B.push(u,t);if(c){for(let u=0;u<B.length;u+=2)B[u][0](B[u+1]);B.length=0}}}function s(l){o(l(t))}function i(l,c=b){const u=[l,c];return r.add(u),r.size===1&&(n=e(o,s)||b),l(t),()=>{r.delete(u),r.size===0&&n&&(n(),n=null)}}return{set:o,update:s,subscribe:i}}function Qe(t,e,n){const r=!Array.isArray(t),o=r?[t]:t;if(!o.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const s=e.length<2;return Je(n,(i,l)=>{let c=!1;const u=[];let a=0,f=b;const p=()=>{if(a)return;f();const d=e(r?u[0]:u,i,l);s?i(d):f=et(d)?d:b},m=o.map((d,g)=>Wt(d,h=>{u[g]=h,a&=~(1<<g),c&&p()},()=>{a|=1<<g}));return c=!0,p(),function(){M(m),f(),c=!1}})}const bt=t=>({...t.location,state:t.history.state,key:t.history.state&&t.history.state.key||"initial"}),Xe=t=>{const e=[];let n=bt(t);return{get location(){return n},listen(r){e.push(r);const o=()=>{n=bt(t),r({location:n,action:"POP"})};return t.addEventListener("popstate",o),()=>{t.removeEventListener("popstate",o);const s=e.indexOf(r);e.splice(s,1)}},navigate(r,{state:o,replace:s=!1,preserveScroll:i=!1,blurActiveElement:l=!0}={}){o={...o,key:Date.now()+""};try{s?t.history.replaceState(o,"",r):t.history.pushState(o,"",r)}catch{t.location[s?"replace":"assign"](r)}n=bt(t),e.forEach(c=>c({location:n,action:"PUSH",preserveScroll:i})),l&&document.activeElement.blur()}}},Ze=(t="/")=>{let e=0;const n=[{pathname:t,search:""}],r=[];return{get location(){return n[e]},addEventListener(o,s){},removeEventListener(o,s){},history:{get entries(){return n},get index(){return e},get state(){return r[e]},pushState(o,s,i){const[l,c=""]=i.split("?");e++,n.push({pathname:l,search:c}),r.push(o)},replaceState(o,s,i){const[l,c=""]=i.split("?");n[e]={pathname:l,search:c},r[e]=o}}}},tn=Xe(ce()?window:Ze()),en=t=>({route:t&4,location:t&2}),Ft=t=>({route:t[2]&&t[2].uri,location:t[1]}),nn=t=>({route:t&4,location:t&2}),Ht=t=>({route:t[2]&&t[2].uri,location:t[1]});function rn(t){let e;const n=t[15].default,r=St(n,t,t[14],Ft);return{c(){r&&r.c()},m(o,s){r&&r.m(o,s),e=!0},p(o,s){r&&r.p&&(!e||s&16390)&&Ot(r,n,o,o[14],e?Et(n,o[14],s,en):Nt(o[14]),Ft)},i(o){e||(k(r,o),e=!0)},o(o){$(r,o),e=!1},d(o){r&&r.d(o)}}}function on(t){let e=t[1].pathname,n,r,o=Yt(t);return{c(){o.c(),n=K()},m(s,i){o.m(s,i),L(s,n,i),r=!0},p(s,i){i&2&&D(e,e=s[1].pathname)?(V(),$(o,1,1,b),W(),o=Yt(s),o.c(),k(o,1),o.m(n.parentNode,n)):o.p(s,i)},i(s){r||(k(o),r=!0)},o(s){$(o),r=!1},d(s){s&&C(n),o.d(s)}}}function Yt(t){let e,n,r,o;const s=t[15].default,i=St(s,t,t[14],Ht);return{c(){e=N("div"),i&&i.c()},m(l,c){L(l,e,c),i&&i.m(e,null),o=!0},p(l,c){i&&i.p&&(!o||c&16390)&&Ot(i,s,l,l[14],o?Et(s,l[14],c,nn):Nt(l[14]),Ht)},i(l){o||(k(i,l),l&&G(()=>{o&&(r&&r.end(1),n=Ce(e,t[3],{}),n.start())}),o=!0)},o(l){$(i,l),n&&n.invalidate(),l&&(r=Ae(e,t[3],{})),o=!1},d(l){l&&C(e),i&&i.d(l),l&&r&&r.end()}}}function sn(t){let e,n,r,o;const s=[on,rn],i=[];function l(c,u){return c[0]?0:1}return e=l(t),n=i[e]=s[e](t),{c(){n.c(),r=K()},m(c,u){i[e].m(c,u),L(c,r,u),o=!0},p(c,[u]){let a=e;e=l(c),e===a?i[e].p(c,u):(V(),$(i[a],1,1,()=>{i[a]=null}),W(),n=i[e],n?n.p(c,u):(n=i[e]=s[e](c),n.c()),k(n,1),n.m(r.parentNode,r))},i(c){o||(k(n),o=!0)},o(c){$(n),o=!1},d(c){c&&C(r),i[e].d(c)}}}function cn(t,e,n){let r,o,s,i,{$$slots:l={},$$scope:c}=e,{basepath:u="/"}=e,{url:a=null}=e,{viewtransition:f=null}=e,{history:p=tn}=e;const m=(_,P,A)=>{const E=f(A);return typeof(E==null?void 0:E.fn)=="function"?E.fn(_,E):E};pt(Me,p);const d=wt(xt),g=wt(vt),h=X([]);Q(t,h,_=>n(12,o=_));const y=X(null);Q(t,y,_=>n(2,i=_));let O=!1;const w=d||X(a?{pathname:a}:p.location);Q(t,w,_=>n(1,r=_));const R=g?g.routerBase:X({path:u,uri:u});Q(t,R,_=>n(13,s=_));const le=Qe([R,y],([_,P])=>{if(!P)return _;const{path:A}=_,{route:E,uri:ae}=P;return{path:E.default?A:E.path.replace(/\*.*$/,""),uri:ae}}),ue=_=>{const{path:P}=s;let{path:A}=_;if(_._path=A,_.path=zt(P,A),typeof window>"u"){if(O)return;const E=Dt([_],r.pathname);E&&(y.set(E),O=!0)}else h.update(E=>[...E,_])},fe=_=>{h.update(P=>P.filter(A=>A!==_))};let at=!1;return d||(Se(()=>p.listen(P=>{n(11,at=P.preserveScroll||!1),w.set(P.location)})),pt(xt,w)),pt(vt,{activeRoute:y,base:R,routerBase:le,registerRoute:ue,unregisterRoute:fe}),t.$$set=_=>{"basepath"in _&&n(8,u=_.basepath),"url"in _&&n(9,a=_.url),"viewtransition"in _&&n(0,f=_.viewtransition),"history"in _&&n(10,p=_.history),"$$scope"in _&&n(14,c=_.$$scope)},t.$$.update=()=>{if(t.$$.dirty&8192){const{path:_}=s;h.update(P=>P.map(A=>Object.assign(A,{path:zt(_,A._path)})))}if(t.$$.dirty&6146){const _=Dt(o,r.pathname);y.set(_&&{..._,preserveScroll:at})}},[f,r,i,m,h,y,w,R,u,a,p,at,o,s,c,l]}class ln extends ot{constructor(e){super(),rt(this,e,cn,sn,D,{basepath:8,url:9,viewtransition:0,history:10})}}function un(t){let e,n,r,o,s,i,l,c,u,a,f,p,m,d,g,h,y,O;return{c(){e=N("section"),n=N("div"),r=N("h2"),r.textContent="Sign In",o=j(),s=N("form"),i=N("div"),l=N("label"),l.textContent="Username:",c=j(),u=N("input"),a=j(),f=N("div"),p=N("label"),p.textContent="Password:",m=j(),d=N("input"),g=j(),h=N("button"),h.textContent="Sign In",v(r,"id","h"),v(r,"class","svelte-1kl1wwe"),v(l,"for","username"),v(l,"class","form-label svelte-1kl1wwe"),v(u,"type","text"),v(u,"id","username"),v(u,"class","form-input svelte-1kl1wwe"),v(u,"placeholder","Enter your username"),v(i,"class","form-group svelte-1kl1wwe"),v(p,"for","password"),v(p,"class","form-label svelte-1kl1wwe"),v(d,"type","password"),v(d,"id","password"),v(d,"class","form-input svelte-1kl1wwe"),v(d,"placeholder","Enter your password"),v(f,"class","form-group svelte-1kl1wwe"),v(h,"type","submit"),v(h,"class","form-button svelte-1kl1wwe"),v(n,"class","form-container svelte-1kl1wwe"),v(e,"class","universe svelte-1kl1wwe")},m(w,R){L(w,e,R),S(e,n),S(n,r),S(n,o),S(n,s),S(s,i),S(i,l),S(i,c),S(i,u),st(u,t[0]),S(s,a),S(s,f),S(f,p),S(f,m),S(f,d),st(d,t[1]),S(s,g),S(s,h),y||(O=[_t(u,"input",t[3]),_t(d,"input",t[4]),_t(s,"submit",be(t[2]))],y=!0)},p(w,[R]){R&1&&u.value!==w[0]&&st(u,w[0]),R&2&&d.value!==w[1]&&st(d,w[1])},i:b,o:b,d(w){w&&C(e),y=!1,M(O)}}}function fn(t,e,n){let r="",o="";function s(){console.log("Submitted:",r,o)}function i(){r=this.value,n(0,r)}function l(){o=this.value,n(1,o)}return[r,o,s,i,l]}class Gt extends ot{constructor(e){super(),rt(this,e,fn,un,D,{})}}class an extends ot{constructor(e){super(),rt(this,e,null,null,D,{})}}function dn(t){let e,n,r,o,s,i;return e=new gt({props:{path:"/",component:Gt}}),r=new gt({props:{path:"/sign-in",component:Gt}}),s=new gt({props:{path:"/sign-up",component:an}}),{c(){Y(e.$$.fragment),n=j(),Y(r.$$.fragment),o=j(),Y(s.$$.fragment)},m(l,c){x(e,l,c),L(l,n,c),x(r,l,c),L(l,o,c),x(s,l,c),i=!0},p:b,i(l){i||(k(e.$$.fragment,l),k(r.$$.fragment,l),k(s.$$.fragment,l),i=!0)},o(l){$(e.$$.fragment,l),$(r.$$.fragment,l),$(s.$$.fragment,l),i=!1},d(l){l&&(C(n),C(o)),U(e,l),U(r,l),U(s,l)}}}function _n(t){let e,n;return e=new ln({props:{$$slots:{default:[dn]},$$scope:{ctx:t}}}),{c(){Y(e.$$.fragment)},m(r,o){x(e,r,o),n=!0},p(r,[o]){const s={};o&1&&(s.$$scope={dirty:o,ctx:r}),e.$set(s)},i(r){n||(k(e.$$.fragment,r),n=!0)},o(r){$(e.$$.fragment,r),n=!1},d(r){U(e,r)}}}class pn extends ot{constructor(e){super(),rt(this,e,null,_n,D,{})}}new pn({target:document.body});