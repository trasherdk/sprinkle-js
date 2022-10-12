(function(a,b){typeof exports=="object"&&typeof module<"u"?b(exports):typeof define=="function"&&define.amd?define(["exports"],b):(a=typeof globalThis<"u"?globalThis:a||self,b(a.SprinkleJS={}))})(this,function(a){"use strict";const b=e=>typeof e=="string"?document.querySelector(e):e,T=(e,t,n=[])=>{Object.entries(t).forEach(([i,o])=>{if(typeof o=="object"){T(e,o,[...n,i]);return}let c=e;if(n.forEach(f=>{c=c[f]}),n[n.length-1]==="style"&&i.startsWith("--")){c.setProperty(i,o);return}if(i==="className"&&e instanceof SVGElement){c.setAttribute("class",o.toString());return}if(n.length===0&&i.startsWith("data-")){e.setAttribute(i,o);return}c[i]=o})},V=(e,t)=>[...Array(e).keys()].map(()=>Array(t).fill(0)),M=(e=[],t=[],n=(s,i)=>s===i)=>{var f,d,y,p,r,u;const s=V(e.length+1,t.length+1);for(let l=0;l<e.length+1;l+=1)s[l][0]=l;for(let l=0;l<t.length+1;l+=1)s[0][l]=l;for(let l=0;l<e.length;l+=1)for(let w=0;w<t.length;w+=1)if(n(e[l],t[w]))s[l+1][w+1]=s[l][w];else{const ee=Math.min(s[l+1][w],s[l][w+1])+1;s[l+1][w+1]=ee}const i=[];let o=e.length,c=t.length;for(;o>0&&c>0;)n(e[o-1],t[c-1])?(i.unshift({type:"=",value:e[o-1],skip:!1}),c-=1,o-=1):s[o-1][c]<s[o][c-1]?(i.unshift({type:"-",value:e[o-1],skip:!1}),o-=1):(i.unshift({type:"+",value:t[c-1],skip:!1}),c-=1);return o>0?i.unshift(...((y=(d=(f=e==null?void 0:e.slice)==null?void 0:f.call(e,0,o))==null?void 0:d.map)==null?void 0:y.call(d,l=>({type:"-",value:l,skip:!1})))||[]):c>0&&i.unshift(...((u=(r=(p=t==null?void 0:t.slice)==null?void 0:p.call(t,0,c))==null?void 0:r.map)==null?void 0:u.call(r,l=>({type:"+",value:l,skip:!1})))||[]),i},O=(e,t,n=0)=>e.find((s,i,...o)=>i>n&&t(s,i,...o)),A=e=>Object.prototype.toString.call(e).slice(8,-1),N=e=>{const t=document.createElement("template");return Object.assign(t,{innerHTML:e}),t.content},_=(e,t)=>e.getAttribute(t),E=e=>e instanceof Element?_(e,"key"):e.textContent;let m=[];const g=Symbol("is-reactive"),C=Symbol("memo");let k=null;const R=e=>{[...e].forEach(t=>{if(!t.toRun)return;const n=t.execute();n&&(t.cleanup=n)})},P=e=>{k=new Set;try{e()}finally{const t=new Set(k);k=null,R(t)}},U=(e,t,n)=>{let s=n.get(e);s||(s=new Set,n.set(e,s)),s.add(t),t.dependencies.add(s)},F=(e,t)=>{const n=e.get(t);if(!!n){if(k!==null){n.forEach(s=>k.add(s));return}R(n)}},J=(e,t)=>{if(e[g])return e;if(typeof e!="object")throw new Error("It's not possible to create a variable from a primitive value...you can use createRef");Object.keys(e||{}).forEach(o=>{const c=o;!!e[c]&&typeof e[c]=="object"&&(A(e[c])==="Object"||Array.isArray(e[c]))&&(e[c]=S(e[c],t==null?void 0:t[c]))});const s=new Map;return new Proxy(e,{get:(...o)=>{if(o[1]===g)return!0;const c=m[m.length-1];return c&&U(o[1],c,s),Reflect.get(...o)},set:(o,c,f)=>{var l;if(o[C]===!1&&c!==C)return!0;const d=c,y=(l=t==null?void 0:t[d])!=null?l:Object.is;let p=f;!!f&&typeof f=="object"&&(A(f)==="Object"||Array.isArray(f))&&!f[g]&&(p=S(f,y));const r=y(o[d],f),u=Reflect.set(o,c,p);return r||F(s,c),u}})},H=(e,t,n=":root")=>{const s=S(e,t);let i=b(n);return i||(console.warn("Impossible to find the right html element, attaching the variables to the root."),i=document.querySelector(":root")),h(()=>{Object.keys(s).forEach(c=>{var f;i.style.setProperty(`--${c}`,(f=s[c])==null?void 0:f.toString())})}),s},x=(e,t)=>{const n={value:e(),[C]:!1},s=S(n,t?{value:t}:void 0);return h(()=>{s[C]=!0,s.value=e(),s[C]=!1}),s},D=(e,t,n,s=window.localStorage)=>{if(typeof t!="object")throw new Error("It's not possible to create a variable from a primitive value...you can use createRef");let i=null;try{const c=s.getItem(e);c?i=JSON.parse(c):s.setItem(e,JSON.stringify(t))}catch{throw new Error("The specified key is associated with a non Object-like element")}const o=S(i!=null?i:t,n);return h(()=>{s.setItem(e,JSON.stringify(o))}),window.addEventListener("storage",c=>{if(c.storageArea===s&&c.key===e)try{if(c.newValue){const f=JSON.parse(c.newValue);Object.keys(f).forEach(y=>{o[y]=f[y]})}}catch{console.warn("The storage was modified but the resulting object is not parsable...the variable was not updated.")}}),o},W=(e,t)=>S({value:e},t?{value:t}:void 0),I=e=>{e.owned.forEach(t=>{t.toRun=!1,I(t)}),e.dependencies.forEach(t=>{t.delete(e)}),e.dependencies.clear()},j={createVariable:J,createEffect:e=>{const t=()=>{var o,c,f;if(!n.toRun)return;(f=(c=(o=n==null?void 0:n.owner)==null?void 0:o.owned)==null?void 0:c.push)==null||f.call(c,n),n.cleanup&&typeof n.cleanup=="function"&&n.cleanup(),I(n),m.push(n);let i;try{i=e()}finally{m.pop()}return i},n={execute:t,dependencies:new Set,owned:[],owner:m[m.length-1],toRun:!0},s=t();s&&(n.cleanup=s)},createComputed:x};let v={...j};const S=(e,t)=>v.createVariable(e,t),h=e=>v.createEffect(e),B=(e,t)=>v.createComputed(e,t),G=(e=j)=>(Object.keys(e).forEach(t=>{v[t]=e[t]}),()=>{v=j}),Q=e=>{const t=m;m=[];const n=e();return m=t,n},Y=(e,t)=>{const n=b(e);return h(()=>{n&&(n.textContent=t(n))}),n},$=(e,t)=>{const n=b(e);return h(()=>{n&&(n.innerHTML=t(n))}),n},z=(e,t,n)=>{const s=b(e);return h(()=>{s&&(n(s)?s.classList.add(t):s.classList.remove(t))}),s},X=(e,t)=>{const n=b(e);return h(()=>{if(n){const s=t(n);Object.keys(s||{}).forEach(o=>{s[o]?n.classList.add(o):n.classList.remove(o)})}}),n},Z=(e,t)=>{const n=b(e);return h(()=>{n&&(n.value=t(n))}),n},L=(e,t)=>{const n=b(e);return h(()=>T(n,t(n))),n},K=(e,t)=>{const n=b(e);if(!!n)return L(n,()=>({style:t(n)})),n},q=(e,t,n)=>{const s=b(e);return h(()=>{if(s===null)return;const i=t(s),o=N(i).childNodes,c=new Map,f=(r,u=!0)=>{const l=E(r);l!=null&&c.set(l,{element:r,isNew:u})};if(s.children.length===0){const r=Array.from(o);s.append(...r),r.forEach(u=>f(u)),typeof n=="function"&&h(()=>{n(s,c)});return}const d=M(Array.from(s.childNodes),Array.from(o),(r,u)=>E(r)!=null&&E(u)!=null?E(r)===E(u):r===u);let y=d.find(r=>r.type==="="),p=0;d.forEach(r=>{if(r.type==="+"){const u=O(d,l=>l.type==="-"&&E(l.value)===E(r.value),p);if(u&&(r.value=u.value,u.skip=!0),!y){s.append(r.value),f(r.value),p+=1;return}y.value.before(r.value),f(r.value)}else if(r.type==="-"){if(r.skip){p+=1;return}s.removeChild(r.value);const u=O(d,l=>l.type==="+"&&E(l.value)===E(r.value),p);u&&(u.value=r.value)}else y=O(d,u=>u.type==="=",p),f(r.value,!1);p+=1}),typeof n=="function"&&h(()=>{n(s,c)})}),s};a.batch=P,a.bindChildrens=q,a.bindClass=z,a.bindClasses=X,a.bindDom=L,a.bindInnerHTML=$,a.bindInputValue=Z,a.bindStyle=K,a.bindTextContent=Y,a.createComputed=B,a.createCssVariable=H,a.createEffect=h,a.createRef=W,a.createStored=D,a.createVariable=S,a.setup=G,a.untrack=Q,Object.defineProperties(a,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
