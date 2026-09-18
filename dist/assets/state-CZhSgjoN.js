import{f as u,u as l}from"./lit-element-zjFD_iJQ.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const m=t=>(r,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(t,r)}):customElements.define(t,r)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const d={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:u},p=(t=d,r,e)=>{const{kind:a,metadata:i}=e;let o=globalThis.litPropertyMetadata.get(i);if(o===void 0&&globalThis.litPropertyMetadata.set(i,o=new Map),a==="setter"&&((t=Object.create(t)).wrapped=!0),o.set(e.name,t),a==="accessor"){const{name:s}=e;return{set(n){const c=r.get.call(this);r.set.call(this,n),this.requestUpdate(s,c,t,!0,n)},init(n){return n!==void 0&&this.C(s,void 0,t,n),n}}}if(a==="setter"){const{name:s}=e;return function(n){const c=this[s];r.call(this,n),this.requestUpdate(s,c,t,!0,n)}}throw Error("Unsupported decorator location: "+a)};function f(t){return(r,e)=>typeof e=="object"?p(t,r,e):((a,i,o)=>{const s=i.hasOwnProperty(o);return i.constructor.createProperty(o,a),s?Object.getOwnPropertyDescriptor(i,o):void 0})(t,r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function b(t){return f({...t,state:!0,attribute:!1})}export{f as n,b as r,m as t};
