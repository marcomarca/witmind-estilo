(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const b=Object.freeze({title:"Showroom",subtitle:"Control operativo",siteLabel:"WTX · MDTC",logo:"/local/logo-witmind.png?v=2.0.0",weather:"weather.forecast_casa",mediaPlayer:"media_player.showroom_1",lightCountSensor:"sensor.showroom_luminarias_encendidas",energySensor:"sensor.showroom_energia_estimada",batteryLevel:"sensor.21051182g_battery_level",historyHours:12,chartHours:24,showForecast:!0,spots:[{entity:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",subtitle:"Zona ventana",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_2",name:"Spots 2x3",subtitle:"Muestra 2 × 3",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_3",name:"Spots 3x3",subtitle:"Muestra 3 × 3",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_4",name:"Spots TV",subtitle:"Zona audiovisual",icon:"spot"}],samples:[{entity:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",subtitle:"Temperaturas de color",icon:"panel"},{entity:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",subtitle:"Muestra suspendida",icon:"pendant"},{entity:"switch.interruptor_inteligente_2_switch_3",name:"Slims",subtitle:"Línea decorativa",icon:"strip"},{entity:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",subtitle:"Iluminación empotrada",icon:"downlight"},{entity:"switch.smart_relay_switch_4_switch",name:"Paneles",subtitle:"Control por relé",icon:"screen"}],reflector:{entity:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",subtitle:"Control aislado",icon:"reflector"},scenes:[{entity:"scene.presentacion",name:"Presentación",subtitle:"Ventana + TV",icon:"presentation",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_4"]},{entity:"scene.reunion",name:"Reunión",subtitle:"2x3 + Ventana",icon:"people",directOnly:!0,onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2"]}],sampleScenes:[{id:"spots",name:"Spots",subtitle:"Todos los spots",icon:"spot",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4"]},{id:"paneles",name:"Paneles",subtitle:"Solo paneles",icon:"screen",onEntities:["switch.smart_relay_switch_4_switch"]},{id:"slims",name:"Slims",subtitle:"Solo slims",icon:"strip",onEntities:["switch.interruptor_inteligente_2_switch_3"]},{id:"downlights",name:"Downlights",subtitle:"Solo downlights",icon:"downlight",onEntities:["switch.interruptor_inteligente_2_switch_4"]},{id:"paneles-3k-6k",name:"Paneles 3k/6k",subtitle:"Temperaturas de color",icon:"panel",onEntities:["switch.interruptor_inteligente_2_switch_1"]},{id:"colgantes",name:"Colgantes",subtitle:"Todas las colgantes",icon:"pendant",onEntities:["switch.interruptor_inteligente_2_switch_2"]}],powerOnScript:"script.showroom_encendido_general",powerOffScript:"script.showroom_apagado_general"}),F={"clear-night":"Noche despejada",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvia",snowy:"Nieve","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},L={"clear-night":"☾",cloudy:"☁",exceptional:"!",fog:"≋",hail:"◆",lightning:"ϟ","lightning-rainy":"ϟ",partlycloudy:"◒",pouring:"☂",rainy:"☂",snowy:"❄","snowy-rainy":"❄",sunny:"☀",windy:"≈","windy-variant":"≈"},z={spot:'<circle cx="12" cy="9" r="5"/><path d="M6 18h12M9 22h6M12 14v4"/>',panel:'<rect width="18" height="18" x="3" y="3" rx="3"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/>',pendant:'<line x1="12" x2="12" y1="2" y2="8"/><path d="M7 16a5 5 0 0 0 10 0V8H7v8Z"/><line x1="8" x2="16" y1="20" y2="20"/><line x1="10" x2="14" y1="23" y2="23"/>',strip:'<rect width="20" height="8" x="2" y="8" rx="2.5"/><circle cx="6" cy="12" r="1.2"/><circle cx="10" cy="12" r="1.2"/><circle cx="14" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',downlight:'<path d="M4 6h16l-3 8H7L4 6Z"/><path d="M9 18h6M10 21h4"/><path d="M12 2v4"/>',screen:'<rect width="20" height="14" x="2" y="3" rx="2.5"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',reflector:'<path d="M4 6h10l4 4v6l-4 4H4V6Z"/><line x1="18" x2="22" y1="10" y2="10"/><line x1="18" x2="22" y1="14" y2="14"/>',presentation:'<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',people:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',power:'<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/>',bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',play:'<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>',pause:'<rect width="4" height="16" x="6" y="4" rx="1.5" fill="currentColor" stroke="none"/><rect width="4" height="16" x="14" y="4" rx="1.5" fill="currentColor" stroke="none"/>',previous:'<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>',next:'<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',volumeDown:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',volumeUp:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',battery:'<rect width="16" height="10" x="2" y="7" rx="2.5"/><line x1="22" x2="22" y1="11" y2="13"/>',health:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',thermometer:'<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',status:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',energy:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'},H=`
  <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" x2="21" y1="6" y2="6"></line>
    <line x1="3" x2="21" y1="12" y2="12"></line>
    <line x1="3" x2="21" y1="18" y2="18"></line>
  </svg>
`,j=`
  <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g class="theme-icon-sun">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </g>
    <path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
`;class B extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._hass=null,this._panel=null,this._narrow=!1,this._started=!1,this._renderQueued=!1,this._forecast=[],this._history=[],this._historyError="",this._liveStates=new Map,this._pendingSwitches=new Map,this._switchErrors=new Map,this._switchTimers=new Map,this._pendingAction="",this._confirmAction="",this._toast=null,this._toastTimer=null,this._clockTimer=null,this._historyTimer=null,this._unsubscribeStates=null,this._unsubscribeForecast=null,this._forecastEntity="",this._energyRange="day",this._energyDayOffset=0,this._energyData=[],this._energyLoading=!1,this._energyError=null,this._energyMonthTotal=null,this._energyRequestId=0,this._energyRefreshTimer=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._themeStorageKey="witmind-showroom-panel-theme",this._theme=this._loadTheme(),this._activeView="home",this.shadowRoot.addEventListener("click",e=>this._handleClick(e)),this.shadowRoot.addEventListener("scroll",e=>this._handleEnergyScroll(e),!0)}set hass(e){var o,s,l,c;const t=this._hass,r=this._config(),i=this._relevantHassChanged(t,e),a=!t||((o=t.states)==null?void 0:o[r.energySensor])!==((s=e==null?void 0:e.states)==null?void 0:s[r.energySensor]),n=!((l=t==null?void 0:t.states)!=null&&l[r.energySensor])&&!!((c=e==null?void 0:e.states)!=null&&c[r.energySensor]);this._hass=e,i&&this._syncStatesFromHass(),this._started?a&&(n?this._loadEnergyStatistics():this._scheduleEnergyRefresh()):(this._started=!0,this._start()),i&&this._updateStatePresentation()}get hass(){return this._hass}set panel(e){const t=this._config().weather;this._panel=e;const r=this._config().weather;this._started&&t!==r&&(this._resetForecastSubscription(),this._subscribeWeather()),this._hass&&(this._syncStatesFromHass(),this._loadEnergyStatistics(),this._updateStatePresentation())}get panel(){return this._panel}set narrow(e){this._narrow=!!e,this.toggleAttribute("narrow",this._narrow)}get narrow(){return this._narrow}connectedCallback(){this._hass&&(this._updateStatePresentation(),this._scheduleEnergyRefresh(!0))}disconnectedCallback(){clearInterval(this._clockTimer),clearInterval(this._historyTimer),clearTimeout(this._toastTimer),clearTimeout(this._energyRefreshTimer),this._energyRequestId+=1;for(const e of this._switchTimers.values())clearTimeout(e);this._switchTimers.clear(),this._resetForecastSubscription(),this._unsubscribeStates&&(this._unsubscribeStates(),this._unsubscribeStates=null),this._started=!1}_requestRender(){this._renderQueued||!this._hass||!this.shadowRoot||(this._renderQueued=!0,requestAnimationFrame(()=>{this._renderQueued=!1,this.render()}))}_updateStatePresentation(){var n;if(!((n=this.shadowRoot)!=null&&n.querySelector(".app-shell"))){this._requestRender();return}const e=o=>{var v;const s=o.dataset.entity;if(!s)return;const l=this._state(s),c=this._visibleSwitchState(s),d=c==="on",h=!l||["unknown","unavailable"].includes(l.state),p=this._pendingSwitches.has(s),u=this._switchErrors.get(s),m=u||(p?c==="on"?"Encendiendo…":"Apagando…":h?"No disponible":d?"Encendido":"Apagado");o.classList.toggle("is-on",d),o.classList.toggle("is-pending",p),o.classList.toggle("is-error",!!u),o.disabled=h,o.setAttribute("aria-pressed",String(d));const y=((v=o.querySelector(".device-copy strong"))==null?void 0:v.textContent)||s;o.setAttribute("aria-label",`${y}: ${m}`);const k=o.querySelector(".device-copy small");k&&(k.textContent=m)};this.shadowRoot.querySelectorAll('[data-action="toggle-switch"]').forEach(e),this.shadowRoot.querySelectorAll('[data-action="run-scene"]').forEach(o=>{const s=this._allScenes().find(p=>p.key===o.dataset.sceneKey);if(!s)return;const l=this._sceneStatus(s),c=this._pendingAction===s.key,d=c?"Aplicando...":l.active?"Activo":l.unavailable?"Sin datos":"Inactivo";o.classList.toggle("is-pending",c),o.classList.toggle("is-active",l.active),o.classList.toggle("is-unavailable",l.unavailable),o.setAttribute("aria-pressed",String(l.active));const h=o.querySelector(".scene-state");h&&(h.textContent=d)});const t=this._config(),r=[...t.spots,...t.samples,...t.reflector?[t.reflector]:[]],i=r.filter(o=>this._visibleSwitchState(o.entity)==="on").length,a=this.shadowRoot.querySelector("[data-lights-summary]");a&&(a.textContent=`${i} de ${r.length}`)}_handleClick(e){const t=e.target.closest("[data-action]");if(!t||!this._hass)return;const r=t.dataset.action;if(r==="toggle-menu"){this._toggleHomeAssistantMenu();return}if(r==="toggle-theme"){this._toggleTheme();return}if(r==="set-view"){const i=t.dataset.view;["home","lights","energy","system"].includes(i)&&(this._activeView=i,this._requestRender());return}if(r==="toggle-switch"){this._toggleSwitch(t.dataset.entity);return}if(r==="run-scene"){this._runScene(t.dataset.sceneKey||t.dataset.entity,t.dataset.label);return}if(r==="open-power-on"){this._pendingAction||(this._confirmAction="on",this._requestRender());return}if(r==="open-power-off"){this._pendingAction||(this._confirmAction="off",this._requestRender());return}if(r==="general-off"){const i=this._config().generalOffScript;i?this._hass.callService("script","turn_on",{entity_id:i}).catch(a=>{this._notify("No se pudo ejecutar Apagar todo Witmind.","error"),console.error("Error ejecutando el apagado general de Witmind:",a)}):this._notify("El apagado general aún no tiene una entidad configurada.","error");return}if(r==="cancel-power-confirm"){const i=e.target.closest("[data-dialog-card]");if(t.classList.contains("dialog-backdrop")&&i)return;this._pendingAction||(this._confirmAction="",this._requestRender());return}if(r==="confirm-power"){this._confirmGeneralPower();return}if(r==="clear-scene"){this._clearScene();return}if(r==="media"){this._mediaAction(t.dataset.service);return}if(r==="energy-range"){this._setEnergyRange(t.dataset.range);return}if(r==="energy-day-prev"){this._shiftEnergyDay(-1);return}if(r==="energy-day-next"){this._shiftEnergyDay(1);return}if(r==="energy-day-today"){this._resetEnergyDay();return}r==="refresh-energy"&&(this._energyLastLoadedAt=0,this._loadEnergyStatistics())}_toggleHomeAssistantMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_loadTheme(){try{return localStorage.getItem(this._themeStorageKey)==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem(this._themeStorageKey,this._theme)}catch(e){console.warn("No se pudo guardar el tema del showroom:",e)}}_toggleTheme(){this._theme=this._theme==="dark"?"light":"dark",this.setAttribute("data-theme",this._theme),this._saveTheme(),this._requestRender()}_config(){var u;const e=((u=this._panel)==null?void 0:u.config)||{},t=e.panel_kind==="lobby"||e.panel_kind==="general"||e.static_only===!0||e.staticOnly===!0,r=m=>Array.isArray(m)?[...new Set(m.filter(Boolean).map(y=>String(y)))]:[],i=(m,y)=>(Array.isArray(m)&&(m.length||t)?m:y).filter(v=>v==null?void 0:v.entity).map((v,g)=>({entity:String(v.entity),name:v.name||`Dispositivo ${g+1}`,subtitle:v.subtitle||"Iluminación",icon:v.icon||"bulb"})),a=i(e.spots,b.spots),n=i(e.samples||e.muestras,b.samples),o=[...a,...n].map(m=>m.entity),s=r(e.scene_control_entities||e.sceneControlEntities),l=s.length?s:o,c=(m,y,k)=>(Array.isArray(m)&&(m.length||t)?m:y).filter(g=>(g==null?void 0:g.entity)||(g==null?void 0:g.id)||(g==null?void 0:g.key)).map((g,S)=>{const $=g.entity?String(g.entity):"",D=String(g.id||g.key||$||`${k}-${S+1}`),f=y.find(E=>{const R=E.entity?String(E.entity):"",q=String(E.id||E.key||R||"");return $&&R===$||q===D}),M=$||(f!=null&&f.entity?String(f.entity):""),A=String(g.id||g.key||(f==null?void 0:f.id)||M||`${k}-${S+1}`),w=M||`${k}:${A}`,_=Array.isArray(g.on_entities)||Array.isArray(g.onEntities),N=Array.isArray(g.off_entities)||Array.isArray(g.offEntities),C=r(_?g.on_entities||g.onEntities:f==null?void 0:f.onEntities),P=r(N?g.off_entities||g.offEntities:[]),W=N?P.filter(E=>!C.includes(E)):l.filter(E=>!C.includes(E));return{key:w,id:A,entity:M,name:g.name||(f==null?void 0:f.name)||`Escena ${S+1}`,subtitle:g.subtitle||(f==null?void 0:f.subtitle)||"Escena del showroom",icon:g.icon||(f==null?void 0:f.icon)||"presentation",directOnly:g.direct_only??g.directOnly??(f==null?void 0:f.directOnly)??!1,onEntities:C,offEntities:W}}),d=e.reflector||b.reflector,h=Number(e.history_hours??e.historyHours),p=Number(e.chart_hours??e.chartHours);return{title:e.title||b.title,subtitle:e.subtitle||b.subtitle,siteLabel:e.site_label||e.siteLabel||b.siteLabel,logo:e.logo||b.logo,weather:e.weather||b.weather,mediaPlayer:e.media_player||e.mediaPlayer||b.mediaPlayer,lightCountSensor:e.light_count_sensor||e.lightCountSensor||b.lightCountSensor,energySensor:e.energy_sensor||e.energySensor||b.energySensor,batteryLevel:e.battery_level||e.batteryLevel||b.batteryLevel,powerOnScript:e.power_on_script||e.powerOnScript||b.powerOnScript,powerOffScript:e.power_off_script||e.powerOffScript||b.powerOffScript,historyHours:Number.isFinite(h)&&h>0?Math.min(24,h):b.historyHours,chartHours:Number.isFinite(p)&&p>0?Math.min(72,p):b.chartHours,showForecast:e.show_forecast??e.showForecast??b.showForecast,panelKind:e.panel_kind||e.panelKind||"showroom",staticOnly:e.static_only??e.staticOnly??!1,generalOffScript:e.general_off_script||e.generalOffScript||"",spots:a,samples:n,sceneControlEntities:l,reflector:d!=null&&d.entity?{entity:String(d.entity),name:d.name||b.reflector.name,subtitle:d.subtitle||b.reflector.subtitle,icon:d.icon||b.reflector.icon}:null,scenes:c(e.scenes,b.scenes,"scene"),sampleScenes:c(e.sample_scenes||e.sampleScenes,b.sampleScenes,"sample")}}_allDevices(){const e=this._config();return[...e.spots,...e.samples,...e.reflector?[e.reflector]:[]]}_allScenes(e=this._config()){return[...e.scenes,...e.sampleScenes]}_trackedEntities(){const e=this._config();return new Set([...this._allDevices().map(t=>t.entity),...e.sceneControlEntities,...this._allScenes(e).flatMap(t=>[t.entity,...t.onEntities,...t.offEntities]),e.weather,e.mediaPlayer,e.lightCountSensor,e.energySensor,e.batteryLevel,e.powerOnScript,e.powerOffScript].filter(Boolean))}_relevantHassChanged(e,t){var r,i;if(!e||!t)return!0;for(const a of this._trackedEntities())if(((r=e.states)==null?void 0:r[a])!==((i=t.states)==null?void 0:i[a]))return!0;return!1}async _start(){this._clockTimer=setInterval(()=>this._updateClock(),3e4),await Promise.allSettled([this._fetchCurrentStates(),this._subscribeStateChanges(),this._subscribeWeather(),this._loadEnergyStatistics()])}_syncStatesFromHass(){var e;if((e=this._hass)!=null&&e.states)for(const t of this._trackedEntities()){const r=this._hass.states[t];r&&this._applyLiveState(t,r)}}_applyLiveState(e,t){if(!t){this._liveStates.delete(e);return}this._liveStates.set(e,t);const r=this._pendingSwitches.get(e);if(r&&t.state===r.desired){this._pendingSwitches.delete(e),this._switchErrors.delete(e);const i=this._switchTimers.get(e);i&&clearTimeout(i),this._switchTimers.delete(e)}}async _fetchCurrentStates(){var e;if((e=this._hass)!=null&&e.callWS)try{const t=await this._hass.callWS({type:"get_states"}),r=this._trackedEntities();for(const i of t||[])r.has(i.entity_id)&&this._applyLiveState(i.entity_id,i);this._updateStatePresentation()}catch(t){console.error("No se pudieron sincronizar los estados del showroom:",t)}}async _subscribeStateChanges(){var e;if(!(!((e=this._hass)!=null&&e.connection)||this._unsubscribeStates))try{this._unsubscribeStates=await this._hass.connection.subscribeEvents(t=>{var i;const r=(i=t==null?void 0:t.data)==null?void 0:i.entity_id;!r||!this._trackedEntities().has(r)||(this._applyLiveState(r,t.data.new_state),r===this._config().energySensor&&this._scheduleEnergyRefresh(),this._updateStatePresentation())},"state_changed")}catch(t){console.error("No se pudo suscribir a state_changed:",t)}}_resetForecastSubscription(){this._unsubscribeForecast&&(this._unsubscribeForecast(),this._unsubscribeForecast=null),this._forecastEntity=""}async _subscribeWeather(){var t;const e=this._config();if(!(!((t=this._hass)!=null&&t.connection)||!e.weather)&&!(this._unsubscribeForecast&&this._forecastEntity===e.weather)){this._resetForecastSubscription();try{this._forecastEntity=e.weather,this._unsubscribeForecast=await this._hass.connection.subscribeMessage(r=>{this._forecast=Array.isArray(r==null?void 0:r.forecast)?r.forecast:[],this._requestRender()},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e.weather})}catch(r){this._forecastEntity="",console.error("No se pudo cargar el pronóstico:",r)}}}_energyRefreshInterval(){return this._energyRange==="day"?3e4:this._energyRange==="month"?12e4:3e5}_scheduleEnergyRefresh(e=!1){if(!this._hass||!this.isConnected||(clearTimeout(this._energyRefreshTimer),this._energyRange==="day"&&this._energyDayOffset!==0))return;const t=this._energyRefreshInterval(),r=this._energyLastLoadedAt?Date.now()-this._energyLastLoadedAt:0,i=e?0:this._energyLastLoadedAt?Math.max(1e3,t-r):t;this._energyRefreshTimer=setTimeout(()=>this._loadEnergyStatistics(),i)}_energyRangeDefinition(e=this._energyRange){const t=new Date;let r,i=t,a,n,o,s=!1;if(e==="year")r=new Date(t.getFullYear(),0,1,0,0,0,0),a="month",n=`Año ${t.getFullYear()}`,o="mes";else if(e==="month")r=new Date(t.getFullYear(),t.getMonth(),1,0,0,0,0),a="day",n=t.toLocaleDateString("es-BO",{month:"long",year:"numeric"}),o="día";else{const l=new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0);r=new Date(l.getFullYear(),l.getMonth(),l.getDate()+Math.min(0,Number(this._energyDayOffset)||0),0,0,0,0),s=r.getTime()===l.getTime(),i=s?t:new Date(r.getFullYear(),r.getMonth(),r.getDate()+1,0,0,0,0),a="hour",n=r.toLocaleDateString("es-BO",{weekday:"long",day:"numeric",month:"long"}),o="hora"}return{start:r,end:i,period:a,title:n,intervalLabel:o,isToday:s}}_energyValueToKWh(e,t){const r=Number(e);if(!Number.isFinite(r))return null;const i=String(t||"kWh").trim().toLowerCase().replaceAll(" ","");return i==="kwh"?r:i==="wh"?r/1e3:i==="mwh"?r*1e3:null}_deriveEnergyStateDeltas(e,t,r){const i=Number(t instanceof Date?t.getTime():t),a=Number(r instanceof Date?r.getTime():r),n=e.filter(l=>Number.isFinite(Number(l.start))&&Number.isFinite(Number(l.state))).sort((l,c)=>Number(l.start)-Number(c.start)),o=[];let s=null;for(const l of n){const c=Number(l.start),d=Number(l.state);if(c<i){s=d;continue}if(c>=a)break;let h=0;if(Number.isFinite(s)){const p=d-s;h=p>=0?p:Math.max(0,d)}o.push({...l,change:h}),s=d}return o}_aggregateEnergyDayRows(e,t,r){var l;const i=new Date(t.start),a=new Date(t.end),n=t.isToday?new Date(a.getFullYear(),a.getMonth(),a.getDate(),a.getHours(),0,0,0):new Date(i.getFullYear(),i.getMonth(),i.getDate(),23,0,0,0),o=new Map;for(let c=new Date(i);c<=n;c.setHours(c.getHours()+1)){const d=c.getTime();o.set(d,{start:d,end:new Date(c.getFullYear(),c.getMonth(),c.getDate(),c.getHours()+1,0,0,0).getTime(),change:0,samples:0,partial:t.isToday&&d===n.getTime(),live:!1})}let s=null;for(const c of e){const d=new Date(Number(c.start));if(!Number.isFinite(d.getTime()))continue;const h=new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours(),0,0,0).getTime(),p=o.get(h);p&&(p.change+=Math.max(0,Number(c.change)||0),p.samples+=1,Number.isFinite(c.state)&&(!s||Number(c.end||c.start)>Number(s.end||s.start))&&(s=c))}if(t.isToday){const c=this._energyValueToKWh(r==null?void 0:r.state,(l=r==null?void 0:r.attributes)==null?void 0:l.unit_of_measurement),d=s==null?void 0:s.state,h=Number((s==null?void 0:s.end)||(s==null?void 0:s.start)),p=o.get(n.getTime());if(p&&Number.isFinite(c)&&Number.isFinite(d)&&Number.isFinite(h)&&h>=n.getTime()&&a.getTime()-h>=0&&a.getTime()-h<=900*1e3){const u=c-d;Number.isFinite(u)&&u>=0&&(p.change+=u,p.live=u>0)}}return[...o.values()].filter(c=>c.samples>0||c.live)}_calculateCurrentMonthEnergy(e,t,r){var h;const i=new Date(t),a=new Date(i.getFullYear(),i.getMonth(),1,0,0,0,0).getTime(),n=e.filter(p=>Number.isFinite(Number(p.start))&&Number(p.start)>=a).sort((p,u)=>Number(p.start)-Number(u.start));let o=n.reduce((p,u)=>p+Math.max(0,Number(u.change)||0),0),s=null;for(const p of n)Number.isFinite(Number(p.state))&&(!s||Number(p.end||p.start)>Number(s.end||s.start))&&(s=p);const l=this._energyValueToKWh(r==null?void 0:r.state,(h=r==null?void 0:r.attributes)==null?void 0:h.unit_of_measurement),c=Number(s==null?void 0:s.state),d=Number((s==null?void 0:s.end)||(s==null?void 0:s.start));if(Number.isFinite(l)&&Number.isFinite(c)&&Number.isFinite(d)&&d>=a&&d<=i.getTime()&&i.getTime()-d<=7200*1e3){const p=l-c;Number.isFinite(p)&&p>=0&&(o+=p)}return n.length||Number.isFinite(c)?o:null}_aggregateEnergyCalendarRows(e,t,r,i){var d;if(!["month","year"].includes(i))return[];const a=new Map;let n=null;for(const h of e){const p=Number(h.start);if(!Number.isFinite(p))continue;const u=new Date(p),m=i==="month"?new Date(u.getFullYear(),u.getMonth(),u.getDate(),0,0,0,0).getTime():new Date(u.getFullYear(),u.getMonth(),1,0,0,0,0).getTime(),y=a.get(m)||{start:m,change:0,samples:0,partial:!1,live:!1};y.change+=Math.max(0,Number(h.change)||0),y.samples+=1,a.set(m,y),Number.isFinite(Number(h.state))&&(!n||p>Number(n.start))&&(n=h)}const o=this._energyValueToKWh(r==null?void 0:r.state,(d=r==null?void 0:r.attributes)==null?void 0:d.unit_of_measurement),s=Number(n==null?void 0:n.state),l=Number(n==null?void 0:n.start),c=new Date(t.end);if(Number.isFinite(o)&&Number.isFinite(s)&&Number.isFinite(l)&&l<=c.getTime()&&c.getTime()-l<=7200*1e3){const h=o-s;if(Number.isFinite(h)&&h>=0){const p=i==="month"?new Date(c.getFullYear(),c.getMonth(),c.getDate(),0,0,0,0).getTime():new Date(c.getFullYear(),c.getMonth(),1,0,0,0,0).getTime(),u=a.get(p)||{start:p,change:0,samples:0,partial:!1,live:!1};u.change+=h,u.live=h>0,a.set(p,u)}}return[...a.values()].sort((h,p)=>Number(h.start)-Number(p.start))}_energyViewSignature(){return JSON.stringify([this._energyRange,this._energyDayOffset,this._energyMonthTotal,this._energyError||"",this._energyData.map(e=>[Number(e.start),Number(e.change)||0,Number(e.samples)||0,!!e.partial,!!e.live])])}async _loadEnergyStatistics(){var p;if(!((p=this._hass)!=null&&p.connection))return;clearTimeout(this._energyRefreshTimer);const e=this._config(),t=this._state(e.energySensor),r=Number(t==null?void 0:t.state);if(!t){this._energyData=[],this._energyMonthTotal=null,this._energyError=`No existe ${e.energySensor} en Home Assistant.`,this._energyLoading=!1,this._requestRender();return}if(!Number.isFinite(r)){this._energyData=[],this._energyMonthTotal=null,this._energyError=`${e.energySensor} no entrega un valor numérico.`,this._energyLoading=!1,this._requestRender();return}const i=++this._energyRequestId,a=this._energyViewSignature(),n=this._energyData.length>0,o=this._energyRangeDefinition(),s=new Date,l=new Date(s.getFullYear(),s.getMonth(),1,0,0,0,0),c=new Date(o.start.getTime()-3600*1e3),d=this._energyRange==="year"?"hour":"5minute",h=new Date(l.getTime()-3600*1e3);this._energyLoading=!0,this._energyError=null,n||this._requestRender();try{const u=await this._hass.connection.sendMessagePromise({type:"recorder/get_statistics_metadata",statistic_ids:[e.energySensor]});if(i!==this._energyRequestId)return;const y=(Array.isArray(u)?u:[]).find(w=>(w==null?void 0:w.statistic_id)===e.energySensor)||null;if(!y||!y.has_sum)throw new Error("La entidad no dispone de estadísticas acumulables. Verifica device_class: energy y state_class total/total_increasing.");const k=this._hass.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:c.toISOString(),end_time:o.end.toISOString(),statistic_ids:[e.energySensor],period:d,units:{energy:"kWh"},types:["state"]}),v=this._hass.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:h.toISOString(),end_time:s.toISOString(),statistic_ids:[e.energySensor],period:"hour",units:{energy:"kWh"},types:["state"]}),[g,S]=await Promise.all([k,v]);if(i!==this._energyRequestId)return;const $=w=>(Array.isArray(w==null?void 0:w[e.energySensor])?w[e.energySensor]:[]).map(_=>({start:Number(_.start),end:Number(_.end),change:_.change===void 0||_.change===null?null:Math.max(0,Number(_.change)||0),state:_.state===void 0||_.state===null?null:Number(_.state)})).filter(_=>Number.isFinite(_.start)&&(Number.isFinite(_.state)||Number.isFinite(_.change))),D=$(g),f=this._deriveEnergyStateDeltas(D,o.start,o.end);this._energyData=this._energyRange==="day"?this._aggregateEnergyDayRows(f,o,t):this._aggregateEnergyCalendarRows(f,o,t,this._energyRange);const M=$(S),A=this._deriveEnergyStateDeltas(M,l,s);if(this._energyMonthTotal=this._calculateCurrentMonthEnergy(A,s,t),this._energyRange==="month"&&this._energyData.length)this._energyMonthTotal=this._energyData.reduce((w,_)=>w+Math.max(0,Number(_.change)||0),0);else if(this._energyRange==="year"&&Number.isFinite(this._energyMonthTotal)){const w=new Date(s.getFullYear(),s.getMonth(),1,0,0,0,0).getTime(),_=this._energyData.find(N=>Number(N.start)===w);_&&(_.change=this._energyMonthTotal)}this._energyLastLoadedAt=Date.now(),this._energyError=null}catch(u){if(i!==this._energyRequestId)return;this._energyData=[],this._energyMonthTotal=null,this._energyError=(u==null?void 0:u.message)||"No se pudieron consultar las estadísticas energéticas.",console.error("Error cargando estadísticas de energía del showroom:",u)}finally{if(i===this._energyRequestId){this._energyLoading=!1;const u=a!==this._energyViewSignature();(!n||u)&&this._requestRender(),this._scheduleEnergyRefresh()}}}_setEnergyRange(e){!["day","month","year"].includes(e)||e===this._energyRange||(this._energyRange=e,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_shiftEnergyDay(e){if(this._energyRange!=="day")return;const t=Number(e);if(!Number.isFinite(t)||t===0)return;const r=Math.min(0,this._energyDayOffset+t);r!==this._energyDayOffset&&(this._energyDayOffset=r,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_resetEnergyDay(){this._energyRange!=="day"||this._energyDayOffset===0||(this._energyDayOffset=0,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_formatEnergy(e,t=2){const r=Number(e);return Number.isFinite(r)?r.toLocaleString("es-BO",{minimumFractionDigits:t,maximumFractionDigits:t}):"--"}_energyLabel(e,t=this._energyRange){const r=new Date(Number(e));return Number.isFinite(r.getTime())?t==="year"?r.toLocaleDateString("es-BO",{month:"short"}).replace(".",""):t==="month"?String(r.getDate()):r.toLocaleTimeString("es-BO",{hour:"2-digit",minute:"2-digit",hour12:!1}):"--"}_captureEnergyChartScroll(){var r;const e=(r=this.shadowRoot)==null?void 0:r.querySelector("[data-energy-scroll]");if(!e)return;const t=Math.max(0,e.scrollWidth-e.clientWidth);this._energyScrollLeft=e.scrollLeft,this._energyAutoFollow=t<=0||t-e.scrollLeft<=8}_handleEnergyScroll(e){var i,a;const t=(a=(i=e.target)==null?void 0:i.closest)==null?void 0:a.call(i,"[data-energy-scroll]");if(!t)return;const r=Math.max(0,t.scrollWidth-t.clientWidth);this._energyScrollLeft=t.scrollLeft,this._energyAutoFollow=r<=0||r-t.scrollLeft<=8}_restoreEnergyChartScroll(){var r;const e=(r=this.shadowRoot)==null?void 0:r.querySelector("[data-energy-scroll]");if(!e)return;const t=Math.max(0,e.scrollWidth-e.clientWidth);if(this._energyAutoFollow||this._energyScrollLeft===null){e.scrollLeft=t,this._energyScrollLeft=e.scrollLeft;return}e.scrollLeft=Math.max(0,Math.min(this._energyScrollLeft,t))}_energyChart(){const e=this._energyData;if(this._energyLoading&&!e.length)return'<div class="energy-empty"><span class="energy-spinner"></span>Consultando estadísticas de Home Assistant…</div>';if(this._energyError)return`<div class="energy-empty error">${this._icon("status")}<span>${this._escape(this._energyError)}</span></div>`;if(!e.length)return'<div class="energy-empty">No hay estadísticas de consumo disponibles para este período.</div>';const t=280,r=14,i=16,a=22,n=42,o=this._energyRange==="day"?64:this._energyRange==="month"?36:58,s=Math.max(620,e.length*o+r+i),l=t-a-n,c=s-r-i,d=Math.max(...e.map(g=>g.change),.001),h=this._energyRange==="day"?10:e.length>24?4:7,p=Math.max(6,(c-h*Math.max(0,e.length-1))/e.length),u=this._energyRange==="month"?Math.max(1,Math.ceil(e.length/10)):this._energyRange==="day"?2:1,m=[0,.25,.5,.75,1],y=m.map(g=>{const S=a+l*(1-g);return`<line x1="${r}" y1="${S.toFixed(1)}" x2="${s-i}" y2="${S.toFixed(1)}" class="energy-grid-line"/>`}).join(""),k=m.map(g=>{const S=a+l*(1-g),$=this._formatEnergy(d*g,d<1?2:1);return`<span class="energy-y-tick" style="top:${S.toFixed(1)}px">${this._escape($)}</span>`}).join(""),v=e.map((g,S)=>{const $=r+S*(p+h),D=g.change>0?Math.max(2,g.change/d*l):1,f=a+l-D,M=S%u===0||S===e.length-1,A=this._energyLabel(g.start),w=g.partial?" · en curso":"",_=g.partial?`<text x="${($+p/2).toFixed(1)}" y="${(a+10).toFixed(1)}" text-anchor="middle" class="energy-current-label">ahora</text>`:"";return`<g class="energy-bar-group ${g.partial?"is-current":""}"><rect x="${$.toFixed(1)}" y="${f.toFixed(1)}" width="${p.toFixed(1)}" height="${D.toFixed(1)}" rx="${Math.min(4,p/2).toFixed(1)}" class="energy-bar ${g.partial?"is-partial":""}"><title>${this._escape(A)} · ${this._formatEnergy(g.change)} kWh${w}</title></rect>${_}${M?`<text x="${($+p/2).toFixed(1)}" y="${t-14}" text-anchor="middle" class="energy-axis-text">${this._escape(A)}</text>`:""}</g>`}).join("");return`<div class="energy-chart-layout"><div class="energy-y-axis" aria-hidden="true"><span class="energy-y-unit">kWh</span>${k}</div><div class="energy-chart-wrap" data-energy-scroll><svg class="energy-chart" width="${s}" height="${t}" viewBox="0 0 ${s} ${t}" role="img" aria-label="Gráfica de consumo energético estimado en kWh">${y}${v}</svg></div></div>`}async _loadHistory(){var o;const e=this._config();if(!((o=this._hass)!=null&&o.callApi))return;const t=Math.max(e.historyHours,e.chartHours),r=new Date(Date.now()-t*60*60*1e3).toISOString(),i=new Date().toISOString(),a=[e.lightCountSensor,...e.spots.map(s=>s.entity),...e.samples.map(s=>s.entity)].filter(Boolean).join(",");if(!a)return;const n=`history/period/${encodeURIComponent(r)}?filter_entity_id=${encodeURIComponent(a)}&end_time=${encodeURIComponent(i)}&minimal_response&no_attributes`;try{this._history=await this._hass.callApi("GET",n),this._historyError=""}catch(s){this._history=[],this._historyError="No se pudo cargar el historial.",console.error("No se pudo cargar el historial del showroom:",s)}this._requestRender()}_state(e){var t,r;return this._liveStates.get(e)||((r=(t=this._hass)==null?void 0:t.states)==null?void 0:r[e])}_isUnavailable(e){var r;const t=(r=this._state(e))==null?void 0:r.state;return!t||t==="unknown"||t==="unavailable"}_visibleSwitchState(e){var t,r;return((t=this._pendingSwitches.get(e))==null?void 0:t.desired)||((r=this._state(e))==null?void 0:r.state)||"unavailable"}async _toggleSwitch(e){if(!e||!this._hass)return;const t=this._state(e);if(!t||["unknown","unavailable"].includes(t.state)){this._switchErrors.set(e,"No disponible"),this._updateStatePresentation();return}const i=this._visibleSwitchState(e)==="on"?"off":"on",a=i==="on"?"turn_on":"turn_off",n=e.split(".")[0]||"switch";this._pendingSwitches.set(e,{desired:i,startedAt:Date.now()}),this._switchErrors.delete(e),this._updateStatePresentation();try{await this._hass.callService(n,a,{entity_id:e});const o=this._switchTimers.get(e);o&&clearTimeout(o);const s=setTimeout(()=>this._verifySwitchState(e,i),6e3);this._switchTimers.set(e,s)}catch(o){this._pendingSwitches.delete(e),this._switchErrors.set(e,"La acción falló"),this._updateStatePresentation(),console.error(`Error ejecutando ${a} en ${e}:`,o)}}async _verifySwitchState(e,t){var i;await this._fetchCurrentStates();const r=((i=this._state(e))==null?void 0:i.state)===t;this._pendingSwitches.delete(e),this._switchTimers.delete(e),r?this._switchErrors.delete(e):this._switchErrors.set(e,"Sin confirmación"),this._updateStatePresentation()}_sceneStatus(e){const t=[...e.onEntities.map(a=>({entityId:a,desired:"on"})),...e.offEntities.map(a=>({entityId:a,desired:"off"}))];if(!t.length)return{active:!1,unavailable:!1,mismatches:[]};const r=t.some(({entityId:a})=>this._isUnavailable(a)),i=t.filter(({entityId:a,desired:n})=>{var o;return((o=this._state(a))==null?void 0:o.state)!==n});return{active:!r&&i.length===0,unavailable:r,mismatches:i}}_sceneExpectations(e){return[...e.offEntities.map(t=>({entityId:t,desired:"off"})),...e.onEntities.map(t=>({entityId:t,desired:"on"}))]}_markExpectedStates(e){const t=Date.now();for(const{entityId:r,desired:i}of e)this._pendingSwitches.set(r,{desired:i,startedAt:t}),this._switchErrors.delete(r)}_clearExpectedStates(e){for(const{entityId:t}of e){this._pendingSwitches.delete(t);const r=this._switchTimers.get(t);r&&clearTimeout(r),this._switchTimers.delete(t)}}async _setEntitiesState(e,t){const r=[...new Set((e||[]).filter(Boolean))];if(!r.length)return;const i=new Map;for(const n of r){const o=n.split(".")[0];o&&(i.has(o)||i.set(o,[]),i.get(o).push(n))}const a=t==="on"?"turn_on":"turn_off";for(const[n,o]of i)await this._hass.callService(n,a,{entity_id:o})}async _waitForExpectedStates(e,t=7e3){const r=Date.now()+t;let i=e;for(;Date.now()<r;){if(await this._fetchCurrentStates(),i=e.filter(({entityId:a,desired:n})=>{var o;return((o=this._state(a))==null?void 0:o.state)!==n}),!i.length)return{ok:!0,mismatches:[]};await new Promise(a=>setTimeout(a,450))}return{ok:!1,mismatches:i}}async _runScene(e,t){var o;if(!e||this._pendingAction)return;const r=this._config(),i=this._allScenes(r).find(s=>s.key===e||s.entity===e);if(!i){this._notify("La escena no está configurada.","error");return}const a=this._sceneExpectations(i);this._pendingAction=i.key,this._markExpectedStates(a),this._updateStatePresentation();let n=null;try{if(i.entity&&!i.directOnly)try{await this._hass.callService("scene","turn_on",{entity_id:i.entity})}catch(c){n=c,console.warn(`La escena ${i.entity} no respondió; se aplicará el perfil directo.`,c)}await this._setEntitiesState(i.offEntities,"off"),await this._setEntitiesState(i.onEntities,"on");const s=await this._waitForExpectedStates(a);if(!s.ok){const c=s.mismatches.map(d=>d.entityId).join(", ");throw new Error(`No se confirmaron los estados de: ${c}`)}const l=n?`${t||"Modo"} aplicado mediante control directo.`:`${t||"Modo"} activo.`;this._notify(l,"success")}catch(s){for(const{entityId:l,desired:c}of a)((o=this._state(l))==null?void 0:o.state)!==c&&this._switchErrors.set(l,"No confirmó el modo");this._notify("No se pudo aplicar completamente el modo seleccionado.","error"),console.error("Error aplicando modo del showroom:",s)}finally{this._clearExpectedStates(a),this._pendingAction="",await this._fetchCurrentStates(),this._updateStatePresentation()}}async _executeGeneralPower(e,t={}){var l;if(!this._hass||this._pendingAction||!["on","off"].includes(e))return!1;const r=this._config(),i=e==="on"?r.powerOnScript:r.powerOffScript,a=r.sceneControlEntities.map(c=>({entityId:c,desired:e})),n=t.successMessage||(e==="on"?"Iluminación general encendida.":"Iluminación general apagada."),o=t.errorMessage||(e==="on"?"No se pudo encender toda la iluminación.":"No se pudo apagar toda la iluminación.");this._pendingAction=i||`direct-power-${e}`,this._markExpectedStates(a),this._updateStatePresentation();let s=null;try{if(i)try{await this._hass.callService("script","turn_on",{entity_id:i})}catch(d){s=d,console.warn(`El script ${i} no respondió; se aplicará el control directo.`,d)}await this._setEntitiesState(r.sceneControlEntities,e);const c=await this._waitForExpectedStates(a);if(!c.ok){const d=c.mismatches.map(h=>h.entityId).join(", ");throw new Error(`No se confirmaron los estados de: ${d}`)}return this._confirmAction="",this._notify(n,"success"),!0}catch(c){for(const{entityId:d,desired:h}of a)((l=this._state(d))==null?void 0:l.state)!==h&&this._switchErrors.set(d,"Sin confirmación");return this._notify(o,"error"),console.error("Error ejecutando el control general del showroom:",{error:c,scriptError:s,desired:e}),!1}finally{this._clearExpectedStates(a),this._pendingAction="",await this._fetchCurrentStates(),this._updateStatePresentation()}}async _confirmGeneralPower(){const e=this._confirmAction;["on","off"].includes(e)&&await this._executeGeneralPower(e,{successMessage:e==="on"?"Toda la iluminación del showroom está encendida.":"Toda la iluminación del showroom está apagada."})}async _clearScene(){this._pendingAction||await this._executeGeneralPower("off",{successMessage:"Escena apagada. La iluminación del showroom quedó apagada.",errorMessage:"No se pudo apagar completamente la escena."})}async _mediaAction(e){const t=this._config().mediaPlayer;if(!(!t||!e||this._isUnavailable(t)))try{await this._hass.callService("media_player",e,{entity_id:t})}catch(r){this._notify("No se pudo controlar el reproductor.","error"),console.error(`Error ejecutando media_player.${e}:`,r)}}_updateToastPresentation(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("[data-toast]");if(!this._toast){e==null||e.remove();return}if(e){e.className=`toast ${this._escape(this._toast.type)}`,e.textContent=this._toast.message;return}const t=document.createElement("div");t.dataset.toast="",t.className=`toast ${this._escape(this._toast.type)}`,t.setAttribute("role","status"),t.textContent=this._toast.message,this.shadowRoot.append(t)}_notify(e,t="success"){var r;clearTimeout(this._toastTimer),this._toast={message:e,type:t},(r=this.shadowRoot)!=null&&r.querySelector(".app-shell")?this._updateToastPresentation():this._requestRender(),this._toastTimer=setTimeout(()=>{this._toast=null,this._updateToastPresentation()},4200)}_historyMap(){var t;const e=new Map;for(const r of this._history||[]){const i=(t=r==null?void 0:r[0])==null?void 0:t.entity_id;i&&e.set(i,r)}return e}_historySegments(e,t,r){if(!Array.isArray(e)||!e.length)return[];const i=e.map(n=>({state:n.state,time:new Date(n.last_changed||n.last_updated).getTime()})).filter(n=>Number.isFinite(n.time)).sort((n,o)=>n.time-o.time);if(!i.length)return[];const a=[];for(let n=0;n<i.length;n+=1){const o=i[n],s=i[n+1],l=Math.max(t,o.time),c=Math.min(r,(s==null?void 0:s.time)??r);c<=l||a.push({state:o.state,left:(l-t)/(r-t)*100,width:(c-l)/(r-t)*100})}return a}_sparkline(e,t){var u;const r=this._historyMap().get(e)||[],i=Date.now(),a=i-t*60*60*1e3,n=r.map(m=>({value:Number(m.state),time:new Date(m.last_changed||m.last_updated).getTime()})).filter(m=>Number.isFinite(m.value)&&Number.isFinite(m.time)&&m.time>=a).sort((m,y)=>m.time-y.time),o=Number((u=this._state(e))==null?void 0:u.state);if(Number.isFinite(o)&&n.push({value:o,time:i}),!n.length)return{path:"",min:"--",max:"--",avg:"--"};const s=n.map(m=>m.value),l=Math.min(...s),c=Math.max(...s),d=s.reduce((m,y)=>m+y,0)/s.length,h=c-l||1;return{path:n.map((m,y)=>{const k=(m.time-a)/(i-a)*300,v=66-(m.value-l)/h*52;return`${y?"L":"M"}${Math.max(0,Math.min(300,k)).toFixed(1)},${v.toFixed(1)}`}).join(" "),min:this._formatNumber(l),max:this._formatNumber(c),avg:this._formatNumber(d)}}_formatNumber(e){return Number.isFinite(e)?new Intl.NumberFormat("es-BO",{maximumFractionDigits:1}).format(e):"--"}_updateClock(){var o,s,l;if(!this.shadowRoot)return;const e=new Date,t=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",hour12:!0}).formatToParts(e),r=((o=t.find(c=>c.type==="hour"))==null?void 0:o.value)||"--",i=((s=t.find(c=>c.type==="minute"))==null?void 0:s.value)||"--",a=(((l=t.find(c=>c.type==="dayPeriod"))==null?void 0:l.value)||"").replaceAll(".","").replaceAll(" ","").toUpperCase();for(const c of this.shadowRoot.querySelectorAll("[data-clock-time]"))c.textContent=`${r}:${i}`;for(const c of this.shadowRoot.querySelectorAll("[data-clock-period]"))c.textContent=a||"";const n=this.shadowRoot.querySelector("[data-current-time]");n&&(n.dateTime=e.toISOString(),n.setAttribute("aria-label",`${r}:${i} ${a}`.trim()))}_icon(e,t=""){const r=z[e]||z.bulb;return`<svg class="icon ${this._escape(t)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${r}</svg>`}_escape(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_renderDevice(e){const t=this._state(e.entity),r=this._visibleSwitchState(e.entity),i=r==="on",a=!t||["unknown","unavailable"].includes(t.state),n=this._pendingSwitches.has(e.entity),o=this._switchErrors.get(e.entity),s=o||(n?r==="on"?"Encendiendo…":"Apagando…":a?"No disponible":i?"Encendido":"Apagado");return`
      <button
        class="device ${i?"is-on":""} ${n?"is-pending":""} ${o?"is-error":""}"
        data-action="toggle-switch"
        data-entity="${this._escape(e.entity)}"
        aria-pressed="${i}"
        aria-label="${this._escape(`${e.name}: ${s}`)}"
        ${a?"disabled":""}
      >
        <span class="device-icon">${this._icon(e.icon)}</span>
        <span class="device-copy">
          <strong>${this._escape(e.name)}</strong>
          <small>${this._escape(s)}</small>
        </span>
        <span class="device-switch" aria-hidden="true"><i></i></span>
      </button>
    `}_renderDeviceGroup(e,t,r){return`
      <section class="surface control-section">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">${this._escape(t)}</span>
            <h2>${this._escape(e)}</h2>
          </div>
        </div>
        <div class="device-grid">${r.map(i=>this._renderDevice(i)).join("")}</div>
      </section>
    `}_renderWeather(){const e=this._config(),t=this._state(e.weather);if(!t)return`
        <section class="surface weather-card is-unavailable">
          <span class="eyebrow">Clima</span>
          <h2>Entidad no encontrada</h2>
          <code>${this._escape(e.weather)}</code>
        </section>
      `;const r=t.attributes||{},i=t.state,a=this._forecast.slice(0,3);return`
      <section class="surface weather-card">
        <div class="weather-main">
          <div class="weather-symbol">${this._escape(L[i]||"·")}</div>
          <div class="weather-copy">
            <span class="eyebrow">Clima · Casa</span>
            <h2>${this._escape(F[i]||i)}</h2>
            <p>Humedad ${this._escape(r.humidity??"Sin datos")}% · Viento ${this._escape(r.wind_speed??"Sin datos")} ${this._escape(r.wind_speed_unit??"")}</p>
          </div>
          <strong class="temperature">${this._escape(r.temperature??"--")}${this._escape(r.temperature_unit??"°")}</strong>
        </div>
        ${e.showForecast?`
          <div class="forecast-row">
            ${a.length?a.map(n=>{const o=new Date(n.datetime),s=new Intl.DateTimeFormat("es-BO",{weekday:"short"}).format(o);return`
                <div class="forecast-item">
                  <span>${this._escape(s)}</span>
                  <b>${this._escape(L[n.condition]||"·")}</b>
                  <strong>${this._escape(n.temperature??n.native_temperature??"--")}°</strong>
                </div>
              `}).join(""):'<span class="forecast-empty">Pronóstico no disponible</span>'}
          </div>
        `:""}
      </section>
    `}_renderMedia(){const e=this._config(),t=this._state(e.mediaPlayer),r=!t||["unknown","unavailable"].includes(t.state),i=(t==null?void 0:t.attributes)||{},a=(t==null?void 0:t.state)==="playing",n=r?"No disponible":a?"Reproduciendo":(t==null?void 0:t.state)==="paused"?"En pausa":(t==null?void 0:t.state)==="idle"?"En espera":(t==null?void 0:t.state)||"Detenido",o=i.media_title||i.friendly_name||"Showroom 1",s=i.media_artist||i.source||"Música del showroom",l=Number(i.volume_level),c=(d,h,p,u=!1)=>`
      <button
        class="media-button ${u?"primary":""}"
        data-action="media"
        data-service="${d}"
        aria-label="${this._escape(p)}"
        title="${this._escape(p)}"
        ${r?"disabled":""}
      >${this._icon(h)}</button>
    `;return`
      <section class="surface media-card ${r?"is-unavailable":""}">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">Multimedia</span>
            <h2>Música</h2>
          </div>
          <span class="media-state ${a?"is-playing":""}">${this._escape(n)}</span>
        </div>
        <div class="media-body">
          <div class="media-art">${this._icon("music")}</div>
          <div class="media-copy">
            <strong>${this._escape(o)}</strong>
            <span>${this._escape(s)}</span>
            <small>${Number.isFinite(l)?`Volumen ${Math.round(l*100)}%`:"Volumen no informado"}</small>
          </div>
        </div>
        <div class="media-controls">
          ${c("volume_down","volumeDown","Bajar volumen")}
          ${c("media_previous_track","previous","Pista anterior")}
          ${c("media_play_pause",a?"pause":"play",a?"Pausar":"Reproducir",!0)}
          ${c("media_next_track","next","Pista siguiente")}
          ${c("volume_up","volumeUp","Subir volumen")}
        </div>
      </section>
    `}_renderSceneButton(e){const t=this._pendingAction===e.key,r=this._sceneStatus(e),i=t?"Aplicando...":r.active?"Activo":r.unavailable?"Sin datos":"Inactivo";return`
      <button
        class="scene ${t?"is-pending":""} ${r.active?"is-active":""} ${r.unavailable?"is-unavailable":""}"
        data-action="run-scene"
        data-scene-key="${this._escape(e.key)}"
        data-label="${this._escape(e.name)}"
        aria-pressed="${r.active}"
        aria-label="${this._escape(`${e.name}: ${i}`)}"
        ${this._pendingAction&&!t?"disabled":""}
      >
        <span class="scene-icon">${this._icon(e.icon)}</span>
        <span class="scene-copy">
          <strong>${this._escape(e.name)}</strong>
          <small>${this._escape(e.subtitle)}</small>
        </span>
        <span class="scene-state" aria-hidden="true">${this._escape(i)}</span>
      </button>
    `}_renderSceneBlock({eyebrow:e,title:t,scenes:r,className:i}){const a=this._config(),n=r.find(c=>this._sceneStatus(c).active),o=this._pendingAction===a.powerOffScript,s=a.sceneControlEntities.some(c=>{var d;return((d=this._state(c))==null?void 0:d.state)==="on"}),l=!!this._pendingAction||!s;return`
      <section class="surface scenes-card ${this._escape(i)}">
        <div class="section-heading compact-heading scenes-heading">
          <div>
            <span class="eyebrow">${this._escape(e)}</span>
            <h2>${this._escape(t)}</h2>
          </div>
          <div class="scene-heading-actions">
            <span class="scene-summary ${n?"is-active":""}">
              ${this._escape(o?"Apagando…":n?n.name:"Selección manual")}
            </span>
            <button
              class="clear-scene-button"
              data-action="clear-scene"
              aria-label="Apagar toda la iluminación de escenas"
              title="Apagar escena"
              ${l&&!o?"disabled":""}
            >
              <span>${this._icon("power")}</span>
              <strong>${o?"Apagando…":"Apagar escena"}</strong>
            </button>
          </div>
        </div>
        <div class="scene-grid">${r.map(c=>this._renderSceneButton(c)).join("")}</div>
      </section>
    `}_renderScenes(){const e=this._config(),t=[...e.scenes,...e.sampleScenes],r=t.find(o=>this._sceneStatus(o).active),i=this._pendingAction===e.powerOffScript,a=e.sceneControlEntities.some(o=>{var s;return((s=this._state(o))==null?void 0:s.state)==="on"}),n=!!this._pendingAction||!a;return`
      <section class="surface scenes-card quick-scenes-card">
        <div class="section-heading compact-heading scenes-heading">
          <div>
            <span class="section-kicker">Ambientes</span>
            <h2>Escenas rápidas</h2>
          </div>
          <div class="scene-heading-actions">
            <span class="scene-summary ${r?"is-active":""}">${this._escape(i?"Apagando...":r?r.name:"Manual")}</span>
            <button
              class="clear-scene-button"
              data-action="clear-scene"
              aria-label="Apagar toda la iluminación de escenas"
              title="Apagar escena"
              ${n&&!i?"disabled":""}
            >
              <span>${this._icon("power")}</span>
              <strong>${i?"Apagando...":"Apagar"}</strong>
            </button>
          </div>
        </div>
        <div class="scene-grid quick-scene-grid">${t.map(o=>this._renderSceneButton(o)).join("")}</div>
      </section>
    `}_renderGeneralControl(e=!0){const t=this._config(),r=this._pendingAction===t.powerOnScript,i=this._pendingAction===t.powerOffScript;return`
      <section class="surface general-card">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">Acciones rápidas</span>
            <h2>Control general</h2>
          </div>
        </div>
        <div class="general-actions">
          <button class="general-action power-on" data-action="open-power-on" ${this._pendingAction?"disabled":""}>
            <span>${this._icon("bulb")}</span>
            <strong>${r?"Encendiendo…":"Encender todo"}</strong>
          </button>
          <button class="general-action power-off" data-action="open-power-off" ${this._pendingAction?"disabled":""}>
            <span>${this._icon("power")}</span>
            <strong>${i?"Apagando…":"Apagar todo"}</strong>
          </button>
        </div>
        ${e&&t.reflector?`
          <div class="isolated-control">
            <span class="isolated-label">Control aislado</span>
            ${this._renderDevice(t.reflector)}
          </div>
        `:""}
      </section>
    `}_renderActivity(){const e=this._energyRangeDefinition(),t=this._energyData.map(s=>Math.max(0,Number(s.change)||0)),r=t.reduce((s,l)=>s+l,0),i=t.length?r/t.length:0,a=t.length?Math.max(...t):0,n=new Date().toLocaleDateString("es-BO",{month:"short",year:"numeric"}).replace(".",""),o=this._energyRange==="day"?`${t.length} ${t.length===1?"hora":"horas"}`:this._energyRange==="month"?`${t.length} ${t.length===1?"día":"días"}`:`${t.length} ${t.length===1?"mes":"meses"}`;return`
      <section class="surface activity-card energy-shell">
        <div class="energy-header">
          <div class="energy-heading">
            <div class="energy-heading-icon">${this._icon("energy")}</div>
            <div>
              <span class="eyebrow">Estimación por estados ON/OFF</span>
              <h2>Consumo energético</h2>
            </div>
          </div>
          <div class="energy-current" title="Consumo estimado desde el inicio del mes actual hasta ahora">
            <small>Consumo del mes</small>
            <strong>${this._energyLoading&&this._energyMonthTotal===null?"...":this._energyMonthTotal===null?"Sin datos":`${this._formatEnergy(this._energyMonthTotal)} kWh`}</strong>
            <span>${this._escape(n)} · hasta ahora</span>
          </div>
        </div>

        <div class="energy-toolbar">
          <div class="energy-tabs" role="tablist" aria-label="Período de consumo energético">
            ${[["day","Día"],["month","Mes"],["year","Año"]].map(([s,l])=>`<button class="energy-tab ${this._energyRange===s?"is-active":""}" data-action="energy-range" data-range="${s}" role="tab" aria-selected="${this._energyRange===s}">${l}</button>`).join("")}
          </div>
          <div class="energy-toolbar-actions">
            ${this._energyRange==="day"?`<div class="energy-day-nav" aria-label="Navegar por días"><button class="energy-day-step" data-action="energy-day-prev" title="Día anterior" aria-label="Día anterior">‹</button><button class="energy-day-current" data-action="energy-day-today" title="${this._energyDayOffset===0?"Hoy":"Volver a hoy"}">${this._energyDayOffset===0?"Hoy":this._energyDayOffset===-1?"Ayer":`${Math.abs(this._energyDayOffset)} d`}</button><button class="energy-day-step" data-action="energy-day-next" title="Día siguiente" aria-label="Día siguiente" ${this._energyDayOffset===0?"disabled":""}>›</button></div>`:""}
            <button class="icon-button" data-action="refresh-energy" aria-label="Actualizar consumo" title="Actualizar consumo">${this._icon("refresh")}</button>
          </div>
        </div>

        <div class="energy-summary">
          <div class="energy-stat"><small>Total del período</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(r)} kWh`}</strong><span>${this._escape(e.title)}</span></div>
          <div class="energy-stat"><small>Promedio por ${this._escape(e.intervalLabel)}</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(i)} kWh`}</strong><span>${this._escape(o)}</span></div>
          <div class="energy-stat"><small>Mayor intervalo</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(a)} kWh`}</strong><span>Pico estimado del período</span></div>
        </div>

        <div class="energy-note">9 circuitos incluidos. Potencia instalada conocida: 1.395 kW. Reflector exterior pendiente de potencia.</div>

        <div class="energy-chart-card">
          <div class="energy-chart-title"><strong>${this._energyRange==="day"?"Consumo por hora":this._energyRange==="month"?"Consumo por día":"Consumo por mes"}</strong><span>${this._escape(e.title)}</span></div>
          ${this._energyChart()}
        </div>
      </section>
    `}_renderSystem(){const e=this._config(),t=this._state(e.batteryLevel),r=Number(t==null?void 0:t.state);return`
      <section class="surface system-card">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">Infraestructura</span>
            <h2>Sistema</h2>
          </div>
        </div>
        <div class="system-grid">
          <article class="system-tile system-tile-wide ${Number.isFinite(r)?r>60?"good":r>25?"warning":"danger":"muted"}">
            <span class="system-icon">${this._icon("battery")}</span>
            <div><small>Batería Pad</small><strong>${Number.isFinite(r)?`${this._escape(r)}%`:"No disponible"}</strong></div>
          </article>
        </div>
      </section>
    `}_renderConfirmDialog(){if(!["on","off"].includes(this._confirmAction))return"";const e=this._confirmAction==="on",t=this._config(),r=e?t.powerOnScript:t.powerOffScript,i=this._pendingAction===r,a=e?"¿Encender toda la iluminación?":"¿Apagar todo el showroom?",n=e?"Se encenderán las luminarias generales del showroom. Después podrás elegir una escena o ajustar cada zona de forma individual.":"Se apagarán las luminarias generales del showroom y cualquier escena activa.",o=e?"Sí, encender":"Sí, apagar";return`
      <div class="dialog-backdrop" data-action="cancel-power-confirm">
        <section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="power-dialog-title" data-dialog-card>
          <div class="dialog-icon ${e?"is-power-on":"is-power-off"}">${this._icon(e?"bulb":"power")}</div>
          <span class="eyebrow">Confirmar acción</span>
          <h2 id="power-dialog-title">${this._escape(a)}</h2>
          <p>${this._escape(n)}</p>
          <div class="dialog-actions">
            <button class="secondary-button" data-action="cancel-power-confirm" ${i?"disabled":""}>Cancelar</button>
            <button class="primary-button ${e?"confirm-on":""}" data-action="confirm-power" ${i?"disabled":""}>${i?"Ejecutando…":this._escape(o)}</button>
          </div>
        </section>
      </div>
    `}_renderNavigation(){return`
      <nav class="view-navigation" aria-label="Secciones del showroom">
        ${[["home","bulb","Inicio"],["lights","spot","Iluminación"],["energy","energy","Energía"],["system","health","Sistema"]].map(([t,r,i])=>`
          <button
            class="view-navigation-button ${this._activeView===t?"is-active":""}"
            data-action="set-view"
            data-view="${t}"
            aria-current="${this._activeView===t?"page":"false"}"
          >
            ${this._icon(r)}
            <span>${i}</span>
          </button>
        `).join("")}
      </nav>
    `}_renderGeneralStatic(){return`
      <section class="view-panel view-general" aria-label="Witmind General">
        <section class="surface general-overview-card">
          <div class="general-overview-copy">
            <span class="section-kicker">Centro de control</span>
            <h2>Witmind General</h2>
            <p>Vista general del sistema. Los módulos de control se habilitarán progresivamente.</p>
          </div>
          <div class="general-overview-mark">W</div>
        </section>
        <div class="general-static-layout">
          <section class="surface general-card static-actions-card">
            <div class="section-heading compact-heading">
              <div><span class="eyebrow">Accesos rápidos</span><h2>Operación</h2></div>
            </div>
            <button class="general-action power-off static-action" data-action="general-off" aria-label="Apagar todo Witmind">
              <span>${this._icon("power")}</span>
              <strong>Apagar todo Witmind</strong>
              <small>Acción general pendiente de entidad</small>
            </button>
          </section>
          ${this._renderWeather()}
        </div>
        <section class="surface general-status-card">
          <div class="section-heading compact-heading">
            <div><span class="eyebrow">Estado del sistema</span><h2>Preparado para ampliar</h2></div>
            <span class="static-status-dot">En línea</span>
          </div>
          <div class="static-status-grid">
            <div><small>Iluminación</small><strong>Configuración pendiente</strong></div>
            <div><small>Energía</small><strong>Sin datos conectados</strong></div>
            <div><small>Automatizaciones</small><strong>Próximamente</strong></div>
          </div>
        </section>
      </section>
    `}_renderActiveView(e){return e.staticOnly||e.panelKind==="general"?this._renderGeneralStatic():this._activeView==="lights"?`
        <section class="view-panel view-lights" aria-labelledby="lights-view-title">
          <header class="view-heading">
            <div><span class="section-kicker">Control directo</span><h1 id="lights-view-title">Iluminación</h1></div>
            <span>${e.spots.length+e.samples.length+(e.reflector?1:0)} circuitos</span>
          </header>
          <div class="lighting-layout">
            <section class="surface control-section spots-section">
              <div class="section-heading compact-heading"><div><h2>Spots</h2></div></div>
              <div class="device-grid">${e.spots.map(t=>this._renderDevice(t)).join("")}</div>
            </section>
            <section class="surface control-section samples-section">
              <div class="section-heading compact-heading"><div><h2>Muestras</h2></div></div>
              <div class="device-grid">${e.samples.map(t=>this._renderDevice(t)).join("")}</div>
            </section>
            ${e.reflector?`<section class="surface control-section reflector-section"><div class="section-heading compact-heading"><div><h2>Exterior</h2></div></div>${this._renderDevice(e.reflector)}</section>`:""}
          </div>
        </section>
      `:this._activeView==="energy"?`<section class="view-panel view-energy" aria-label="Energía">${this._renderActivity()}</section>`:this._activeView==="system"?`
        <section class="view-panel view-system" aria-labelledby="system-view-title">
          <header class="view-heading"><div><span class="section-kicker">Estado</span><h1 id="system-view-title">Sistema</h1></div></header>
          <div class="system-layout">${this._renderWeather()}${this._renderSystem()}</div>
        </section>
      `:`
      <section class="view-panel view-home" aria-label="Inicio">
        ${this._renderScenes()}
        <div class="home-layout">
          ${this._renderGeneralControl(!1)}
          ${this._renderMedia()}
        </div>
      </section>
    `}render(){var h;if(!this.shadowRoot||!this._hass)return;this._captureEnergyChartScroll(),this.setAttribute("data-theme",this._theme);const e=this._config(),t=e.staticOnly||e.panelKind==="general",r=this._state(e.weather),i=(r==null?void 0:r.attributes)||{},a=r==null?void 0:r.state,n=this._theme==="dark"?"claro":"oscuro",o=[...e.spots,...e.samples,...e.reflector?[e.reflector]:[]],s=o.filter(p=>this._visibleSwitchState(p.entity)==="on").length,l=(h=this._state(e.mediaPlayer))==null?void 0:h.state,c=l==="playing"?"Reproduciendo":l==="paused"?"En pausa":"Detenido",d=this._energyMonthTotal===null?"Sin datos":`${this._formatEnergy(this._energyMonthTotal)} kWh`;this.shadowRoot.innerHTML=`
      <style>
        :host {
          --primary: #f26522;
          --primary-hover: #e05413;
          --primary-soft: rgba(242, 101, 34, 0.12);
          --primary-medium: rgba(242, 101, 34, 0.20);
          --primary-border: rgba(242, 101, 34, 0.38);
          --primary-glow: rgba(242, 101, 34, 0.25);
          
          --background: #071118;
          --background-secondary: #10191e;
          --background-deep: #040a0f;
          
          --surface: rgba(16, 25, 30, 0.88);
          --surface-strong: rgba(27, 40, 46, 0.94);
          --surface-hover: rgba(255, 255, 255, 0.06);
          --surface-active: rgba(242, 101, 34, 0.12);
          --surface-control: rgba(27, 40, 46, 0.70);
          
          --text-primary: #f5f6f4;
          --text-secondary: #adb4b6;
          --text-tertiary: #747e82;
          
          --border-subtle: rgba(255, 255, 255, 0.06);
          --border-default: rgba(255, 255, 255, 0.09);
          --border-emphasis: rgba(255, 255, 255, 0.16);
          
          --icon-muted: #747e82;
          --track: rgba(255, 255, 255, 0.06);
          --grid-line: rgba(255, 255, 255, 0.06);
          --header: rgba(16, 25, 30, 0.85);
          --overlay: rgba(4, 10, 15, 0.80);
          --modal: #10191e;
          --shadow: rgba(0, 0, 0, 0.40);
          --shadow-strong: rgba(0, 0, 0, 0.65);
          
          --success: #22c55e;
          --warning: #f59e0b;
          --error: #ef4444;
          --info: #38bdf8;
          
          --radius-sm: 10px;
          --radius-md: 16px;
          --radius-lg: 22px;
          --radius-pill: 999px;
          --motion: 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
          
          display: block;
          min-height: 100%;
          container-type: inline-size;
          container-name: showroom-panel;
          color: var(--text-primary);
          background:
            radial-gradient(circle at 10% 4%, rgba(242, 101, 34, 0.08), transparent 36%),
            radial-gradient(circle at 90% 0%, rgba(16, 32, 45, 0.6), transparent 30%),
            linear-gradient(155deg, var(--background-deep), var(--background) 60%, var(--background-secondary));
          font-family: "Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          font-feature-settings: "tnum" 1;
          font-variant-numeric: tabular-nums;
          -webkit-font-smoothing: antialiased;
        }

        :host([data-theme="light"]) {
          --background: #f3f3ef;
          --background-secondary: #e6e8e3;
          --background-deep: #ffffff;
          
          --surface: rgba(255, 255, 255, 0.90);
          --surface-strong: rgba(255, 255, 255, 0.98);
          --surface-hover: rgba(0, 0, 0, 0.04);
          --surface-active: rgba(242, 101, 34, 0.10);
          --surface-control: rgba(0, 0, 0, 0.035);
          
          --text-primary: #151b1e;
          --text-secondary: #586266;
          --text-tertiary: #8a9499;
          
          --border-subtle: rgba(0, 0, 0, 0.06);
          --border-default: rgba(0, 0, 0, 0.09);
          --border-emphasis: rgba(0, 0, 0, 0.16);
          
          --icon-muted: #8a9499;
          --track: rgba(0, 0, 0, 0.06);
          --grid-line: rgba(0, 0, 0, 0.07);
          --header: rgba(255, 255, 255, 0.88);
          --overlay: rgba(15, 20, 24, 0.50);
          --modal: #ffffff;
          --shadow: rgba(0, 0, 0, 0.08);
          --shadow-strong: rgba(0, 0, 0, 0.22);
          
          background:
            radial-gradient(circle at 10% 4%, rgba(242, 101, 34, 0.07), transparent 36%),
            radial-gradient(circle at 90% 0%, rgba(220, 230, 235, 0.5), transparent 30%),
            linear-gradient(155deg, var(--background-deep), var(--background) 60%, var(--background-secondary));
        }

        * { box-sizing: border-box; }
        button, code { font: inherit; }
        button { color: inherit; }
        button:focus-visible { outline: 2px solid var(--primary); outline-offset: 2px; }
        button:disabled { cursor: not-allowed; opacity: 0.45; }

        .app-shell { min-height: 100vh; }
        .topbar {
          position: sticky;
          top: 0;
          z-index: 20;
          min-height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 10px clamp(16px, 2.4vw, 32px);
          border-bottom: 1px solid var(--border-subtle);
          background: var(--header);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .topbar-start { min-width: 0; display: flex; align-items: center; gap: 12px; }
        .brand { min-width: 0; display: flex; align-items: center; gap: 12px; }
        .logo-frame {
          flex: 0 0 auto;
          width: 124px;
          height: 40px;
          padding: 4px 8px;
          display: grid;
          place-items: center;
          overflow: hidden;
          border: 1px solid var(--border-subtle);
          border-radius: 12px;
          background: var(--surface-control);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: background var(--motion), border-color var(--motion);
        }
        .brand-logo, .logo-frame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          filter: brightness(0) invert(1);
          mix-blend-mode: screen;
          transition: filter var(--motion);
        }
        :host([data-theme="light"]) .brand-logo,
        :host([data-theme="light"]) .logo-frame img {
          filter: none;
          mix-blend-mode: multiply;
        }
        .topbar-meta { display: flex; align-items: center; justify-content: flex-end; margin-left: auto; }
        .menu-button,
        .theme-button {
          width: 40px;
          height: 40px;
          flex: 0 0 40px;
          display: grid;
          place-items: center;
          border: 1px solid var(--border-default);
          border-radius: 50%;
          background: var(--surface-control);
          cursor: pointer;
          transition: transform var(--motion), background var(--motion), border-color var(--motion);
        }
        .menu-button:hover,
        .theme-button:hover { background: var(--surface-hover); border-color: var(--primary-border); }
        .menu-icon, .theme-icon { width: 20px; height: 20px; }
        .theme-icon-sun, .theme-icon-moon { transform-origin: center; transition: opacity 220ms, transform 220ms; }
        .theme-icon-sun { opacity: 0; transform: rotate(-50deg) scale(0.65); }
        .theme-icon-moon { opacity: 1; transform: rotate(0) scale(1); }
        :host([data-theme="light"]) .theme-icon-sun { opacity: 1; transform: rotate(0) scale(1); }
        :host([data-theme="light"]) .theme-icon-moon { opacity: 0; transform: rotate(45deg) scale(0.65); }

        .dashboard { width: min(1480px, 100%); margin: 0 auto; padding: clamp(14px, 2vw, 28px); }
        .surface {
          min-width: 0;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          background: var(--surface);
          box-shadow: 0 16px 40px var(--shadow), inset 0 1px 0 rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          overflow: hidden;
        }

        .overview-grid { margin-top: 4px; display: grid; grid-template-columns: 1fr; gap: 14px; }
        .hero-card {
          min-height: 104px;
          padding: 18px 24px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 24px;
          background:
            radial-gradient(circle at 92% 16%, rgba(242, 101, 34, 0.10), transparent 36%),
            var(--surface);
        }
        .hero-copy { min-width: 0; }
        .hero-card h1 {
          margin: 0;
          font-size: clamp(26px, 2.8vw, 36px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.035em;
        }
        .hero-card h1 span { color: var(--primary); }
        .hero-status {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 20px;
        }
        .hero-clock {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          color: var(--text-primary);
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
        }
        .hero-clock strong {
          font-size: clamp(26px, 2.8vw, 34px);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .hero-clock span {
          color: var(--text-secondary);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }
        .hero-weather {
          min-width: 130px;
          padding-left: 20px;
          display: grid;
          grid-template-columns: 36px auto;
          align-items: center;
          gap: 10px;
          border-left: 1px solid var(--border-default);
        }
        .hero-weather-symbol {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: var(--primary-soft);
          color: var(--primary);
          font-size: 19px;
        }
        .hero-weather-copy { min-width: 0; }
        .hero-weather-copy strong,
        .hero-weather-copy small {
          display: block;
          white-space: nowrap;
        }
        .hero-weather-copy strong {
          margin: 0;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.05;
        }
        .hero-weather-copy small {
          margin: 0 0 3px;
          color: var(--text-secondary);
          font-size: 10px;
          font-weight: 700;
          line-height: 1.1;
        }

        .eyebrow {
          width: fit-content;
          display: inline-flex;
          align-items: center;
          min-height: 22px;
          margin: 0 0 4px;
          padding: 0 10px;
          border: 1px solid var(--primary-border);
          border-radius: var(--radius-pill);
          background: var(--primary-soft);
          color: var(--primary);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .primary-grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 14px; margin-top: 14px; align-items: start; }
        .media-card { grid-column: 1 / -1; padding: 18px; }
        .control-section.spots-section,
        .control-section.samples-section { grid-column: 1 / -1; padding: 18px; }
        .scenes-card { grid-column: 1 / -1; padding: 18px; }
        .presentation-scenes-card .scene-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .sample-scenes-card .scene-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .general-card { grid-column: 1 / -1; padding: 18px; }
        .system-card { grid-column: span 4; padding: 18px; }
        .activity-card { grid-column: span 8; padding: 18px; }
        .general-overview-card { display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: clamp(22px, 3vw, 34px); background: radial-gradient(circle at 88% 18%, var(--primary-soft), transparent 38%), var(--surface); }
        .general-overview-copy { min-width: 0; }
        .general-overview-copy h2 { margin: 5px 0 0; font-size: clamp(24px, 3vw, 34px); font-weight: 800; letter-spacing: -0.04em; }
        .general-overview-copy p { max-width: 560px; margin: 9px 0 0; color: var(--text-secondary); font-size: 12px; line-height: 1.5; }
        .general-overview-mark { width: 64px; height: 64px; flex: 0 0 auto; display: grid; place-items: center; border: 1px solid var(--primary-border); border-radius: 20px; background: var(--primary-soft); color: var(--primary); font-size: 28px; font-weight: 800; }
        .general-static-layout { display: grid; grid-template-columns: minmax(260px, .8fr) minmax(360px, 1.2fr); gap: 14px; margin-top: 14px; }
        .general-static-layout > .surface { min-height: 220px; padding: 20px; }
        .static-actions-card { display: flex; flex-direction: column; }
        .static-action { width: 100%; min-height: 92px; margin-top: auto; display: grid; grid-template-columns: 38px minmax(0, 1fr); justify-content: flex-start; text-align: left; cursor: pointer; }
        .static-action strong, .static-action small { grid-column: 2; }
        .static-action > span { grid-row: 1 / span 2; width: 38px; height: 38px; }
        .static-action small { color: var(--text-tertiary); font-size: 9px; font-weight: 600; }
        .general-status-card { margin-top: 14px; padding: 20px; }
        .static-status-dot { padding: 5px 9px; border: 1px solid rgba(34,197,94,.28); border-radius: var(--radius-pill); color: var(--success); font-size: 9px; font-weight: 800; }
        .static-status-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
        .static-status-grid > div { min-height: 66px; padding: 12px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); }
        .static-status-grid small, .static-status-grid strong { display: block; }
        .static-status-grid small { color: var(--text-tertiary); font-size: 9px; font-weight: 700; }
        .static-status-grid strong { margin-top: 7px; font-size: 11px; font-weight: 700; }

        .section-heading { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .compact-heading { margin-bottom: 12px; }
        .section-heading h2 { margin: 4px 0 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }

        .device-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .spots-section .device-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .samples-section .device-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        
        .device {
          min-width: 0;
          min-height: 60px;
          padding: 10px 12px;
          display: grid;
          grid-template-columns: 36px minmax(0, 1fr) 32px;
          gap: 10px;
          align-items: center;
          border: 1px solid var(--border-default);
          border-radius: 14px;
          background: var(--surface-control);
          text-align: left;
          cursor: pointer;
          transition: transform var(--motion), background var(--motion), border-color var(--motion), box-shadow var(--motion);
        }
        .device:hover:not(:disabled) { border-color: var(--primary-border); background: var(--surface-hover); transform: translateY(-1px); }
        .device.is-on { border-color: var(--primary-border); background: var(--surface-active); box-shadow: 0 4px 20px var(--primary-glow); }
        .device.is-error { border-color: rgba(239, 68, 68, 0.5); }
        .device.is-pending { animation: pulse 1.1s ease-in-out infinite alternate; }

        .device-icon, .scene-icon, .system-icon, .media-art, .general-action > span {
          display: grid;
          place-items: center;
          color: var(--icon-muted);
        }
        .device-icon { width: 36px; height: 36px; border-radius: 11px; background: var(--track); transition: color var(--motion), background var(--motion); }
        .device.is-on .device-icon { color: var(--primary); background: var(--primary-soft); }
        .icon { width: 20px; height: 20px; }

        .device-copy { min-width: 0; }
        .device-copy strong, .device-copy small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .device-copy strong { font-size: 12px; font-weight: 700; }
        .device-copy small { margin-top: 2px; color: var(--text-secondary); font-size: 10px; font-weight: 600; }
        .device.is-on .device-copy small { color: var(--primary); }

        .device-switch { width: 32px; height: 18px; padding: 2px; display: flex; align-items: center; border: 1px solid var(--border-default); border-radius: 999px; background: var(--track); transition: background var(--motion), border-color var(--motion); }
        .device-switch i { width: 12px; height: 12px; border-radius: 50%; background: var(--icon-muted); transition: transform var(--motion), background var(--motion); }
        .device.is-on .device-switch { border-color: var(--primary-border); background: var(--primary-medium); }
        .device.is-on .device-switch i { transform: translateX(14px); background: var(--primary); }

        .media-body { min-height: 76px; display: grid; grid-template-columns: 56px minmax(0, 1fr); gap: 14px; align-items: center; }
        .media-art { width: 56px; height: 56px; border-radius: 16px; background: linear-gradient(145deg, var(--primary-medium), var(--surface-control)); color: var(--primary); border: 1px solid var(--primary-border); }
        .media-art .icon { width: 26px; height: 26px; }
        .media-copy { min-width: 0; }
        .media-copy strong, .media-copy span, .media-copy small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .media-copy strong { font-size: 14px; font-weight: 700; }
        .media-copy span { margin-top: 3px; color: var(--text-secondary); font-size: 11px; }
        .media-copy small { margin-top: 6px; color: var(--text-tertiary); font-size: 10px; font-weight: 700; }
        .media-state { padding: 4px 10px; border: 1px solid var(--border-default); border-radius: var(--radius-pill); color: var(--text-secondary); font-size: 10px; font-weight: 700; }
        .media-state.is-playing { color: var(--success); border-color: rgba(34, 197, 94, 0.35); background: rgba(34, 197, 94, 0.10); }
        .media-controls { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-top: 12px; }
        .media-button { min-height: 42px; display: grid; place-items: center; border: 1px solid var(--border-default); border-radius: 12px; background: var(--surface-control); cursor: pointer; transition: all var(--motion); }
        .media-button:hover:not(:disabled) { background: var(--surface-hover); border-color: var(--primary-border); }
        .media-button.primary { color: white; background: var(--primary); border-color: transparent; box-shadow: 0 6px 20px var(--primary-glow); }
        .media-button.primary:hover:not(:disabled) { background: var(--primary-hover); transform: translateY(-1px); }

        .scenes-heading { align-items: center; }
        .scene-heading-actions { display: flex; align-items: center; justify-content: flex-end; gap: 8px; }
        .scene-summary { min-height: 28px; padding: 0 10px; display: inline-flex; align-items: center; border: 1px solid var(--border-default); border-radius: var(--radius-pill); background: var(--surface-control); color: var(--text-secondary); font-size: 10px; font-weight: 700; }
        .scene-summary.is-active { border-color: var(--primary-border); background: var(--primary-soft); color: var(--primary); }
        
        .clear-scene-button { min-height: 36px; padding: 0 12px; display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid var(--border-default); border-radius: var(--radius-pill); background: var(--surface-control); color: var(--text-primary); font: inherit; cursor: pointer; transition: all var(--motion); }
        .clear-scene-button:hover:not(:disabled) { border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.08); color: var(--error); }
        .clear-scene-button:active:not(:disabled) { transform: scale(0.98); }
        .clear-scene-button:disabled { cursor: not-allowed; opacity: 0.45; }
        .clear-scene-button span { width: 18px; height: 18px; display: grid; place-items: center; }
        .clear-scene-button strong { font-size: 10px; font-weight: 700; white-space: nowrap; }

        .scene-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
        .scene { position: relative; min-height: 68px; padding: 10px 12px; display: grid; grid-template-columns: 38px minmax(0, 1fr) auto; gap: 10px; align-items: center; overflow: hidden; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); text-align: left; cursor: pointer; transition: all var(--motion); }
        .scene:hover:not(:disabled) { border-color: var(--primary-border); background: var(--surface-hover); transform: translateY(-1px); }
        .scene.is-pending { border-color: var(--primary-border); background: var(--surface-active); animation: pulse 1.1s ease-in-out infinite alternate; }
        .scene.is-active { border-color: var(--primary-border); background: var(--surface-active); box-shadow: 0 4px 20px var(--primary-glow); }
        .scene.is-unavailable { opacity: 0.6; }
        
        .scene-icon { width: 38px; height: 38px; border-radius: 12px; background: var(--track); color: var(--icon-muted); transition: all var(--motion); }
        .scene.is-active .scene-icon, .scene.is-pending .scene-icon { background: var(--primary-soft); color: var(--primary); }
        .scene-copy { min-width: 0; }
        .scene strong, .scene small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .scene strong { font-size: 12px; font-weight: 700; }
        .scene small { margin-top: 2px; color: var(--text-secondary); font-size: 10px; }
        
        .scene-state { min-height: 24px; padding: 0 8px; display: inline-flex; align-items: center; border: 1px solid var(--border-default); border-radius: var(--radius-pill); color: var(--text-tertiary); font-size: 9px; font-weight: 700; white-space: nowrap; }
        .scene.is-active .scene-state { border-color: var(--primary-border); background: var(--primary-soft); color: var(--primary); }

        .general-actions { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .general-action { min-height: 56px; padding: 8px 14px; display: flex; align-items: center; justify-content: center; gap: 10px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); cursor: pointer; transition: all var(--motion); }
        .general-action > span { width: 32px; height: 32px; border-radius: 10px; }
        .general-action strong { font-size: 11px; font-weight: 700; }
        .general-action.power-on > span { color: var(--success); background: rgba(34, 197, 94, 0.12); }
        .general-action.power-off > span { color: var(--error); background: rgba(239, 68, 68, 0.12); }
        .general-action:hover:not(:disabled) { background: var(--surface-hover); transform: translateY(-1px); border-color: var(--border-emphasis); }
        
        .isolated-control { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle); }
        .isolated-label { display: block; margin-bottom: 6px; color: var(--text-tertiary); font-size: 9px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
        .isolated-control .device { width: 100%; }

        .energy-shell { grid-column: span 8; padding: 18px; }
        .energy-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; }
        .energy-heading { display: flex; align-items: center; gap: 12px; min-width: 0; }
        .energy-heading-icon { width: 40px; height: 40px; flex: 0 0 auto; display: grid; place-items: center; border-radius: 12px; background: var(--primary-soft); color: var(--primary); border: 1px solid var(--primary-border); }
        .energy-heading-icon .icon { width: 22px; height: 22px; }
        .energy-heading h2 { margin: 3px 0 0; font-size: 18px; font-weight: 800; letter-spacing: -0.02em; }
        
        .energy-current { min-width: 180px; padding: 10px 14px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); text-align: right; }
        .energy-current small, .energy-current strong, .energy-current span { display: block; }
        .energy-current small { color: var(--text-tertiary); font-size: 9px; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase; }
        .energy-current strong { margin-top: 3px; font-size: 20px; font-weight: 800; color: var(--primary); }
        .energy-current span { margin-top: 3px; color: var(--text-tertiary); font-size: 9px; text-transform: capitalize; }
        
        .energy-toolbar { margin-top: 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
        .energy-tabs { display: inline-flex; padding: 3px; border: 1px solid var(--border-default); border-radius: 12px; background: var(--surface-control); }
        .energy-tab { min-width: 60px; height: 32px; padding: 0 12px; border: 0; border-radius: 9px; background: transparent; color: var(--text-secondary); cursor: pointer; font: inherit; font-size: 10px; font-weight: 700; transition: all var(--motion); }
        .energy-tab.is-active { background: var(--primary); color: white; box-shadow: 0 4px 14px var(--primary-glow); }
        
        .energy-toolbar-actions { display: flex; align-items: center; gap: 8px; }
        .energy-day-nav { display: inline-flex; align-items: center; gap: 4px; padding: 3px; border: 1px solid var(--border-default); border-radius: 12px; background: var(--surface-control); }
        .energy-day-nav button { height: 32px; border: 0; border-radius: 9px; background: transparent; color: var(--text-secondary); cursor: pointer; font: inherit; font-size: 10px; font-weight: 700; transition: all var(--motion); }
        .energy-day-nav button:hover:not(:disabled) { color: var(--text-primary); background: var(--surface-hover); }
        .energy-day-nav button:disabled { opacity: 0.35; cursor: default; }
        .energy-day-step { width: 32px; font-size: 16px !important; line-height: 1; }
        .energy-day-current { min-width: 60px; padding: 0 10px; color: var(--primary) !important; }
        
        .energy-summary { margin-top: 12px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
        .energy-stat { min-width: 0; padding: 12px 14px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); }
        .energy-stat small { display: block; color: var(--text-tertiary); font-size: 9px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
        .energy-stat strong { display: block; margin-top: 4px; font-size: 18px; font-weight: 800; }
        .energy-stat span { display: block; margin-top: 3px; color: var(--text-tertiary); font-size: 9px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        
        .energy-note { margin-top: 10px; padding: 8px 12px; border: 1px solid var(--border-subtle); border-radius: 11px; color: var(--text-tertiary); background: var(--surface-control); font-size: 9px; line-height: 1.45; }
        .energy-chart-card { margin-top: 10px; padding: 14px 12px 8px; border: 1px solid var(--border-default); border-radius: 16px; background: var(--surface-control); }
        .energy-chart-title { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 0 4px 10px; }
        .energy-chart-title strong { font-size: 11px; font-weight: 700; }
        .energy-chart-title span { color: var(--text-tertiary); font-size: 9px; text-transform: capitalize; }
        
        .energy-chart-layout { width: 100%; display: flex; min-width: 0; align-items: stretch; }
        .energy-y-axis { position: relative; z-index: 2; flex: 0 0 54px; height: 280px; border-right: 1px solid var(--border-subtle); background: var(--surface-control); }
        .energy-y-unit { position: absolute; top: 2px; left: 6px; color: var(--text-tertiary); font-size: 9px; font-weight: 800; letter-spacing: 0.04em; }
        .energy-y-tick { position: absolute; right: 8px; transform: translateY(-50%); color: var(--text-tertiary); font-size: 10px; font-weight: 700; white-space: nowrap; }
        .energy-chart-wrap { min-width: 0; flex: 1 1 auto; overflow-x: auto; overflow-y: hidden; overscroll-behavior-x: contain; scrollbar-width: thin; scroll-behavior: smooth; }
        .energy-chart { display: block; width: auto; min-width: 100%; height: 280px; overflow: visible; }
        .energy-grid-line { stroke: var(--grid-line); stroke-width: 1; }
        .energy-axis-text { fill: var(--text-tertiary); font-family: "Manrope", sans-serif; font-size: 10px; font-weight: 600; }
        .energy-current-label { fill: var(--primary); font-family: "Manrope", sans-serif; font-size: 9px; font-weight: 800; letter-spacing: 0.03em; text-transform: uppercase; }
        .energy-bar { fill: var(--primary); opacity: 0.85; transition: opacity var(--motion), transform var(--motion); transform-box: fill-box; transform-origin: bottom; }
        .energy-bar.is-partial { opacity: 1; stroke: var(--primary); stroke-width: 1.4; stroke-dasharray: 4 3; }
        .energy-bar-group:hover .energy-bar { opacity: 1; filter: drop-shadow(0 0 8px var(--primary-glow)); }
        
        .energy-empty { min-height: 220px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 24px; color: var(--text-tertiary); text-align: center; font-size: 11px; line-height: 1.5; }
        .energy-empty.error { color: var(--error); }
        .energy-empty .icon { width: 20px; height: 20px; }
        .energy-spinner { width: 18px; height: 18px; border: 2px solid var(--border-default); border-top-color: var(--primary); border-radius: 50%; animation: energy-spin 0.8s linear infinite; }
        @keyframes energy-spin { to { transform: rotate(360deg); } }
        
        .icon-button { width: 36px; height: 36px; display: grid; place-items: center; border: 1px solid var(--border-default); border-radius: 11px; background: var(--surface-control); cursor: pointer; transition: all var(--motion); }
        .icon-button:hover { border-color: var(--primary-border); color: var(--primary); }

        .system-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        .system-tile { min-height: 60px; padding: 10px 12px; display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 10px; align-items: center; border: 1px solid var(--border-default); border-radius: 14px; background: var(--surface-control); }
        .system-icon { width: 36px; height: 36px; border-radius: 11px; background: var(--track); color: var(--icon-muted); }
        .system-tile.good .system-icon { color: var(--success); background: rgba(34, 197, 94, 0.12); }
        .system-tile.warning .system-icon { color: var(--warning); background: rgba(245, 158, 11, 0.12); }
        .system-tile.danger .system-icon { color: var(--error); background: rgba(239, 68, 68, 0.12); }
        .system-tile small, .system-tile strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .system-tile small { color: var(--text-secondary); font-size: 10px; font-weight: 700; }
        .system-tile strong { margin-top: 3px; font-size: 13px; font-weight: 700; }
        .system-tile-wide { grid-column: 1 / -1; }

        .dialog-backdrop { position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 20px; background: var(--overlay); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
        .dialog-card { width: min(440px, 100%); padding: 26px; border: 1px solid var(--primary-border); border-radius: 24px; background: var(--modal); box-shadow: 0 24px 70px var(--shadow-strong); text-align: center; }
        .dialog-icon { width: 56px; height: 56px; margin: 0 auto 14px; display: grid; place-items: center; border-radius: 50%; }
        .dialog-icon.is-power-off { background: rgba(239, 68, 68, 0.12); color: var(--error); }
        .dialog-icon.is-power-on { background: rgba(34, 197, 94, 0.12); color: var(--success); }
        .dialog-icon .icon { width: 28px; height: 28px; }
        .primary-button.confirm-on { background: var(--success); box-shadow: 0 8px 22px rgba(34, 197, 94, 0.25); }
        .dialog-card h2 { margin: 10px 0 8px; font-size: 22px; font-weight: 800; }
        .dialog-card p { margin: 0; color: var(--text-secondary); font-size: 12px; line-height: 1.55; }
        .dialog-card code { color: var(--primary); font-size: 11px; overflow-wrap: anywhere; }
        .dialog-actions { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 22px; }
        .dialog-actions button { min-height: 48px; border-radius: var(--radius-pill); font-weight: 800; cursor: pointer; transition: all var(--motion); }
        .secondary-button { border: 1px solid var(--border-default); background: var(--surface-control); color: var(--text-primary); }
        .secondary-button:hover { background: var(--surface-hover); border-color: var(--border-emphasis); }
        .primary-button { border: 0; background: var(--primary); color: white; box-shadow: 0 8px 24px var(--primary-glow); }
        .primary-button:hover { background: var(--primary-hover); transform: translateY(-1px); }
        
        .toast { position: fixed; right: 24px; bottom: 24px; z-index: 110; max-width: min(380px, calc(100vw - 32px)); padding: 14px 18px; border: 1px solid var(--border-default); border-radius: 14px; background: var(--modal); box-shadow: 0 18px 45px var(--shadow-strong); font-size: 12px; font-weight: 700; backdrop-filter: blur(16px); }
        .toast.success { border-color: rgba(34, 197, 94, 0.4); color: var(--success); }
        .toast.error { border-color: rgba(239, 68, 68, 0.4); color: var(--error); }
        .is-unavailable { opacity: 0.65; }

        @keyframes pulse { 0% { opacity: 0.55; } 100% { opacity: 1; } }

        /* Responsive Layouts */
        @media (max-width: 1180px) {
          .presentation-scenes-card,
          .sample-scenes-card,
          .spots-section,
          .samples-section,
          .general-card,
          .media-card { grid-column: 1 / -1; }
          .presentation-scenes-card .scene-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .sample-scenes-card .scene-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .spots-section .device-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .samples-section .device-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @container showroom-panel (max-width: 1180px) {
          .presentation-scenes-card,
          .sample-scenes-card,
          .spots-section,
          .samples-section,
          .general-card,
          .media-card { grid-column: 1 / -1; }
          .spots-section .device-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .samples-section .device-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        @media (max-width: 960px) {
          .spots-section .device-grid,
          .samples-section .device-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @container showroom-panel (max-width: 960px) {
          .spots-section .device-grid,
          .samples-section .device-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 768px) {
          .dashboard { padding: 12px 10px; }
          .hero-card { min-height: 0; padding: 16px 18px; grid-template-columns: 1fr !important; gap: 12px; }
          .hero-copy { border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px; }
          .hero-card h1 { font-size: clamp(22px, 5.5vw, 30px); }
          .hero-status { justify-content: space-between; width: 100%; align-items: center; flex-direction: row; gap: 12px; }
          .hero-clock strong { font-size: 26px; }
          .hero-weather { border-left: 0; padding-left: 0; }
          .device-grid, .scene-grid, .system-grid { grid-template-columns: 1fr !important; }
          .system-card, .activity-card, .energy-shell { grid-column: 1 / -1; }
          .energy-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .energy-chart { min-width: 560px; }
        }

        @container showroom-panel (max-width: 768px) {
          .dashboard { padding: 12px 10px; }
          .hero-card { min-height: 0; padding: 16px 18px; grid-template-columns: 1fr !important; gap: 12px; }
          .hero-copy { border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px; }
          .hero-card h1 { font-size: clamp(22px, 5.5vw, 30px); }
          .hero-status { justify-content: space-between; width: 100%; align-items: center; flex-direction: row; gap: 12px; }
          .hero-clock strong { font-size: 26px; }
          .hero-weather { border-left: 0; padding-left: 0; }
          .device-grid, .scene-grid, .system-grid { grid-template-columns: 1fr !important; }
          .system-card, .activity-card, .energy-shell { grid-column: 1 / -1; }
          .energy-summary { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .energy-chart { min-width: 560px; }
        }

        @media (max-width: 520px) {
          .general-actions { grid-template-columns: 1fr; }
          .general-action { justify-content: flex-start; }
          .media-card .section-heading { align-items: flex-start; flex-direction: column; }
          .media-state { max-width: 100%; }
          .energy-header { display: grid; grid-template-columns: 1fr; }
          .energy-current { min-width: 0; width: 100%; text-align: left; }
          .energy-toolbar { align-items: stretch; flex-direction: column; }
          .energy-tabs { display: grid; grid-template-columns: repeat(3, 1fr); }
          .energy-toolbar-actions { justify-content: space-between; }
          .energy-summary { grid-template-columns: 1fr; }
        }

        @container showroom-panel (max-width: 520px) {
          .general-actions { grid-template-columns: 1fr; }
          .general-action { justify-content: flex-start; }
          .media-card .section-heading { align-items: flex-start; flex-direction: column; }
          .media-state { max-width: 100%; }
          .energy-header { display: grid; grid-template-columns: 1fr; }
          .energy-current { min-width: 0; width: 100%; text-align: left; }
          .energy-toolbar { align-items: stretch; flex-direction: column; }
          .energy-tabs { display: grid; grid-template-columns: repeat(3, 1fr); }
          .energy-toolbar-actions { justify-content: space-between; }
          .energy-summary { grid-template-columns: 1fr; }
        }

        /* Witmind Signature operational layout */
        :host {
          --background: var(--wit-canvas, #071118);
          --background-secondary: var(--wit-canvas, #071118);
          --background-deep: var(--wit-canvas, #071118);
          --surface: var(--wit-surface, rgba(16, 25, 30, 0.90));
          --surface-strong: var(--wit-surface-raised, #162126);
          --surface-control: var(--wit-surface-interactive, #1b282e);
          --surface-hover: var(--wit-surface-interactive-hover, #23333b);
          --surface-active: var(--wit-surface-active, rgba(242, 101, 34, 0.14));
          --text-primary: var(--wit-text-primary, #f5f6f4);
          --text-secondary: var(--wit-text-secondary, #adb4b6);
          --text-tertiary: var(--wit-text-tertiary, #747e82);
          --border-subtle: var(--wit-border-subtle, rgba(255, 255, 255, 0.06));
          --border-default: var(--wit-border-default, rgba(255, 255, 255, 0.09));
          --header: var(--wit-surface-glass, rgba(16, 25, 30, 0.88));
          min-height: 100dvh;
          background:
            radial-gradient(760px 460px at 88% -8%, rgba(242, 101, 34, 0.12), transparent 68%),
            var(--background);
        }
        :host([data-theme="light"]) {
          --background: var(--wit-canvas-light, #f3f3ef);
          --background-secondary: var(--wit-canvas-light, #f3f3ef);
          --background-deep: var(--wit-canvas-light, #f3f3ef);
          --surface: var(--wit-surface-light, rgba(255, 255, 255, 0.88));
          --surface-strong: var(--wit-surface-raised-light, #ffffff);
          --surface-control: var(--wit-surface-interactive-light, #f8fafc);
          --surface-hover: #f4f5f2;
          --surface-active: rgba(242, 101, 34, 0.10);
          --text-primary: #182126;
          --text-secondary: #667176;
          --text-tertiary: #92999c;
          --border-subtle: rgba(18, 32, 38, 0.06);
          --border-default: rgba(18, 32, 38, 0.09);
          --header: rgba(255, 255, 255, 0.88);
          background:
            radial-gradient(760px 460px at 88% -8%, rgba(242, 101, 34, 0.09), transparent 68%),
            var(--background);
        }
        .app-shell { min-height: 100dvh; }
        .topbar {
          position: relative;
          min-height: 80px;
          padding: 14px clamp(20px, 3vw, 44px);
          gap: 24px;
          border-bottom-color: var(--border-subtle);
          box-shadow: none;
        }
        .topbar-start { flex: 0 0 auto; gap: 14px; }
        .menu-button, .theme-button {
          width: 44px;
          height: 44px;
          flex-basis: 44px;
          background: transparent;
          border-color: var(--border-default);
        }
        .brand { display: grid; gap: 1px; line-height: 1; }
        .brand-wordmark { font-size: 17px; font-weight: 760; letter-spacing: 0.055em; }
        .brand > span { color: var(--primary); font-size: 9px; font-weight: 750; letter-spacing: 0.10em; }
        .status-strip { min-width: 0; display: flex; align-items: center; justify-content: center; gap: 8px; flex: 1 1 auto; }
        .status-pill {
          min-height: 48px;
          padding: 0 14px;
          display: grid;
          grid-template-columns: 24px auto;
          align-items: center;
          gap: 9px;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-pill);
          color: var(--text-primary);
          background: var(--surface);
          text-align: left;
          cursor: pointer;
          transition: transform var(--motion), border-color var(--motion), background var(--motion);
        }
        .status-pill:hover { transform: translateY(-1px); border-color: var(--primary-border); }
        .status-pill:active { transform: scale(0.98); }
        .status-pill.is-active { border-color: var(--primary-border); background: var(--surface-active); }
        .status-pill-icon { display: grid; place-items: center; color: var(--text-tertiary); }
        .status-pill.is-active .status-pill-icon { color: var(--primary); }
        .status-pill strong, .status-pill small { display: block; white-space: nowrap; }
        .status-pill strong { font-size: 11px; font-weight: 680; }
        .status-pill small { margin-top: 2px; color: var(--text-tertiary); font-size: 9px; font-weight: 560; }
        .topbar-meta { gap: 14px; }
        .header-clock { display: inline-flex; align-items: baseline; gap: 5px; white-space: nowrap; }
        .header-clock strong { font-size: 30px; font-weight: 470; letter-spacing: -0.045em; }
        .header-clock span { color: var(--text-tertiary); font-size: 9px; font-weight: 720; letter-spacing: 0.08em; }
        .header-weather { min-width: 74px; padding-left: 14px; display: flex; align-items: center; gap: 7px; border-left: 1px solid var(--border-default); }
        .header-weather span { color: var(--primary); font-size: 18px; }
        .header-weather strong { font-size: 13px; font-weight: 700; }

        .dashboard { width: min(1480px, 100%); padding: clamp(20px, 2.6vw, 40px); }
        .workspace-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: 22px; }
        .workspace-heading h1, .view-heading h1 { margin: 3px 0 0; font-size: clamp(26px, 2.6vw, 36px); font-weight: 720; letter-spacing: -0.035em; line-height: 1.05; }
        .section-kicker { color: var(--primary); font-size: 10px; font-weight: 720; letter-spacing: 0.09em; text-transform: uppercase; }
        .view-navigation {
          display: inline-grid;
          grid-template-columns: repeat(4, auto);
          gap: 3px;
          padding: 4px;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-pill);
          background: var(--surface);
        }
        .view-navigation-button {
          min-height: 44px;
          padding: 0 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: var(--radius-pill);
          background: transparent;
          color: var(--text-secondary);
          font: inherit;
          font-size: 11px;
          font-weight: 650;
          cursor: pointer;
          transition: color var(--motion), background var(--motion), transform var(--motion);
        }
        .view-navigation-button .icon { width: 17px; height: 17px; }
        .view-navigation-button:hover { color: var(--text-primary); }
        .view-navigation-button:active { transform: scale(0.97); }
        .view-navigation-button.is-active { color: #ffffff; background: var(--primary); }

        .view-panel { animation: view-enter 180ms cubic-bezier(0.2, 0.8, 0.2, 1); }
        @keyframes view-enter { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
        .view-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
        .view-heading > span { color: var(--text-tertiary); font-size: 11px; font-weight: 620; }
        .surface {
          border-color: var(--border-default);
          border-radius: var(--radius-lg);
          background: var(--surface);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.025);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        :host([data-theme="light"]) .surface { box-shadow: 0 12px 34px rgba(18, 32, 38, 0.055); }

        .quick-scenes-card { padding: clamp(18px, 2vw, 26px); }
        .quick-scene-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
        .section-heading h2 { font-size: 19px; font-weight: 700; }
        .scene {
          min-height: 76px;
          padding: 12px;
          grid-template-columns: 40px minmax(0, 1fr);
          gap: 11px;
          border-radius: var(--radius-control, 14px);
          background: var(--surface-control);
          box-shadow: none;
        }
        .scene-icon { width: 40px; height: 40px; border-radius: 12px; }
        .scene strong { font-size: 12px; font-weight: 680; }
        .scene small { color: var(--text-tertiary); font-size: 9px; font-weight: 540; }
        .scene-state { display: none; }
        .scene.is-active { border-color: var(--primary-border); background: var(--surface-active); box-shadow: inset 3px 0 0 var(--primary); }
        .scene-summary { background: transparent; }
        .clear-scene-button { min-height: 40px; background: transparent; }
        .home-layout { margin-top: 14px; display: grid; grid-template-columns: minmax(300px, 0.85fr) minmax(420px, 1.15fr); gap: 14px; align-items: stretch; }
        .home-layout > .surface { min-height: 220px; padding: 20px; }
        .general-card, .media-card, .system-card, .activity-card, .energy-shell { grid-column: auto; }
        .general-actions { gap: 10px; }
        .general-action { min-height: 68px; background: var(--surface-control); }
        .general-action strong { font-size: 12px; font-weight: 680; }
        .media-body { min-height: 72px; }
        .media-controls { margin-top: 14px; }
        .media-button { min-height: 46px; }

        .lighting-layout { display: grid; grid-template-columns: 5fr 7fr; gap: 14px; align-items: start; }
        .lighting-layout .surface { padding: 22px; }
        .spots-section, .samples-section, .reflector-section { grid-column: auto; }
        .lighting-layout .device-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .samples-section .device:last-child { grid-column: 1 / -1; }
        .reflector-section { grid-column: 1 / 2; }
        .device {
          min-height: 70px;
          padding: 12px 14px;
          border-radius: var(--radius-control, 14px);
          background: var(--surface-control);
          box-shadow: none;
        }
        .device-copy strong { font-size: 12px; font-weight: 680; }
        .device-copy small { color: var(--text-tertiary); font-size: 9px; font-weight: 540; }
        .device.is-on { box-shadow: inset 3px 0 0 var(--primary); }

        .view-energy .energy-shell { padding: clamp(18px, 2.2vw, 28px); }
        .energy-heading .eyebrow, .general-card .eyebrow, .media-card .eyebrow, .system-card .eyebrow, .weather-card .eyebrow { padding: 0; min-height: 0; border: 0; background: transparent; color: var(--text-tertiary); }
        .energy-current, .energy-stat, .energy-note, .energy-chart-card { box-shadow: none; }
        .system-layout { display: grid; grid-template-columns: 1.3fr 0.7fr; gap: 14px; }
        .system-layout > .surface { min-height: 260px; padding: 24px; }
        .weather-main { display: grid; grid-template-columns: 48px minmax(0, 1fr) auto; gap: 14px; align-items: center; }
        .weather-symbol { width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; color: var(--primary); background: var(--primary-soft); font-size: 22px; }
        .weather-copy h2 { margin: 3px 0 0; font-size: 20px; font-weight: 700; }
        .weather-copy p { margin: 5px 0 0; color: var(--text-tertiary); font-size: 10px; }
        .temperature { font-size: 30px; font-weight: 560; letter-spacing: -0.04em; }
        .forecast-row { margin-top: 24px; padding-top: 18px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; border-top: 1px solid var(--border-subtle); }
        .forecast-item { display: grid; gap: 5px; text-align: center; }
        .forecast-item span { color: var(--text-tertiary); font-size: 9px; text-transform: capitalize; }
        .forecast-item b { color: var(--primary); font-size: 18px; font-weight: 500; }
        .forecast-item strong { font-size: 12px; }
        .system-grid { margin-top: 18px; }
        .system-tile { min-height: 76px; }

        @container showroom-panel (max-width: 1080px) {
          .status-pill { padding: 0 11px; }
          .status-pill small { display: none; }
          .view-navigation-button { padding: 0 12px; }
          .quick-scene-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .home-layout, .lighting-layout, .system-layout, .general-static-layout { grid-template-columns: 1fr; }
          .reflector-section { grid-column: auto; }
        }
        @container showroom-panel (max-width: 860px) {
          .status-strip { display: none; }
        }
        @container showroom-panel (max-width: 760px) {
          .topbar { min-height: 68px; padding: 10px 14px; gap: 10px; }
          .brand > span, .status-strip, .header-weather { display: none; }
          .header-clock strong { font-size: 24px; }
          .dashboard { padding: 16px 14px 88px; }
          .workspace-heading { display: grid; gap: 16px; align-items: stretch; }
          .workspace-heading > div { display: none; }
          .view-navigation { width: 100%; grid-template-columns: repeat(4, 1fr); border-radius: 18px; }
          .view-navigation-button { padding: 0 8px; gap: 5px; }
          .view-navigation-button span { font-size: 9px; }
          .quick-scene-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .scene-heading-actions .scene-summary { display: none; }
          .home-layout, .general-static-layout { grid-template-columns: 1fr; }
          .static-status-grid { grid-template-columns: 1fr; }
          .general-overview-card { align-items: flex-start; }
          .lighting-layout .device-grid { grid-template-columns: 1fr; }
          .samples-section .device:last-child { grid-column: auto; }
          .system-layout > .surface { min-height: 0; }
          .energy-current { min-width: 0; text-align: left; }
        }
        @container showroom-panel (max-width: 460px) {
          .brand { display: none; }
          .topbar-meta { gap: 8px; }
          .quick-scene-grid { grid-template-columns: 1fr !important; }
          .view-navigation-button .icon { display: none; }
          .dialog-actions { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation: none !important; transition-duration: 0.01ms !important; }
        }
      </style>

      <div class="app-shell">
        <header class="topbar">
          <div class="topbar-start">
            <button
              class="menu-button"
              data-action="toggle-menu"
              aria-label="Abrir menú de navegación de Home Assistant"
              title="Abrir menú"
            >${H}</button>
            <div class="brand" aria-label="Witmind Showroom">
              <strong class="brand-wordmark">WITMIND</strong>
              <span>${this._escape(e.siteLabel)}</span>
            </div>
          </div>
          ${t?"":`<div class="status-strip" aria-label="Resumen del showroom">
            <button class="status-pill ${s?"is-active":""}" data-action="set-view" data-view="lights">
              <span class="status-pill-icon">${this._icon("bulb")}</span>
              <span><strong data-lights-summary>${s} de ${o.length}</strong><small>Luces</small></span>
            </button>
            <button class="status-pill ${l==="playing"?"is-active":""}" data-action="set-view" data-view="home">
              <span class="status-pill-icon">${this._icon("music")}</span>
              <span><strong>${this._escape(c)}</strong><small>Multimedia</small></span>
            </button>
            <button class="status-pill" data-action="set-view" data-view="energy">
              <span class="status-pill-icon">${this._icon("energy")}</span>
              <span><strong>${this._escape(d)}</strong><small>Este mes</small></span>
            </button>
          </div>`}
          <div class="topbar-meta">
            <time class="header-clock" data-current-time>
              <strong data-clock-time>--:--</strong>
              <span data-clock-period></span>
            </time>
            <div class="header-weather" aria-label="Clima actual: ${this._escape(F[a]||a||"Sin datos")}, ${this._escape(i.temperature??"Sin datos")}${this._escape(i.temperature_unit??"°")}">
              <span aria-hidden="true">${this._escape(L[a]||"·")}</span>
              <strong>${this._escape(i.temperature??"--")}${this._escape(i.temperature_unit??"°")}</strong>
            </div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar a tema ${n}" title="Cambiar a tema ${n}">${j}</button>
          </div>
        </header>

        <main class="dashboard">
          <section class="workspace-heading">
            <div>
              <span class="section-kicker">${this._escape(e.subtitle)}</span>
              <h1>${this._escape(e.title)}</h1>
            </div>
            ${t?"":this._renderNavigation()}
          </section>
          ${this._renderActiveView(e)}
        </main>
      </div>

      ${this._renderConfirmDialog()}
      ${this._toast?`<div data-toast class="toast ${this._escape(this._toast.type)}" role="status">${this._escape(this._toast.message)}</div>`:""}
    `,this._updateClock(),requestAnimationFrame(()=>this._restoreEnergyChartScroll())}}customElements.get("showroom-panel")||customElements.define("showroom-panel",B);const O=()=>{var x,e;return((e=(x=globalThis.crypto)==null?void 0:x.randomUUID)==null?void 0:e.call(x))||`${Date.now()}-${Math.random().toString(16).slice(2)}`};class V{constructor(e=window.parent){this.target=e,this.states=new Map,this.listeners=new Set,this.pending=new Map,this.subscriptions=new Map,window.addEventListener("message",t=>this.onMessage(t)),this.post({type:"WITMIND_READY"})}subscribeEntities(e,t){return this.listeners.add(t),this.post({type:"WITMIND_SUBSCRIBE_ENTITIES",entityIds:[...new Set(e)]}),t(Object.fromEntries(this.states)),()=>this.listeners.delete(t)}getEntity(e){return this.states.get(e)}callService(e,t={},r){return this.request("WITMIND_CALL_SERVICE","WITMIND_SERVICE_RESULT",{service:e,serviceData:t,target:r})}toggleMenu(){this.post({type:"WITMIND_TOGGLE_MENU"})}dbRequest(e,t={}){return this.request("WITMIND_DB_REQUEST","WITMIND_DB_RESULT",{command:e,payload:t})}haRequest(e,t={}){return this.request("WITMIND_HA_COMMAND","WITMIND_HA_RESULT",{command:e,payload:t})}haSubscribe(e,t,r){const i=O(),a=()=>{this.subscriptions.delete(i),this.post({type:"WITMIND_HA_UNSUBSCRIBE",requestId:i})};return new Promise((n,o)=>{const s=window.setTimeout(()=>{this.pending.delete(i),o(new Error("Timeout esperando suscripción HA"))},1e4);this.pending.set(i,{resolve:()=>{window.clearTimeout(s),n(a)},reject:o,timer:s}),this.subscriptions.set(i,r),this.post({type:"WITMIND_HA_SUBSCRIBE",requestId:i,command:e,payload:t})})}post(e){this.target.postMessage({protocol:1,source:"witmind-ui",...e},"*")}request(e,t,r){const i=O();return new Promise((a,n)=>{const o=window.setTimeout(()=>{this.pending.delete(i),n(new Error(`Timeout esperando ${t}`))},1e4);this.pending.set(i,{resolve:a,reject:n,timer:o}),this.post({type:e,requestId:i,...r})})}onMessage(e){var i,a,n;if(e.source!==this.target||((i=e.data)==null?void 0:i.protocol)!==1||((a=e.data)==null?void 0:a.source)!=="witmind-ha")return;const t=e.data;if(t.type==="WITMIND_HA_EVENT"){(n=this.subscriptions.get(t.requestId))==null||n(t.result);return}if(t.type==="WITMIND_ENTITY_UPDATE"){Object.entries(t.states||{}).forEach(([s,l])=>this.states.set(s,l)),(t.removed||[]).forEach(s=>this.states.delete(s));const o=Object.fromEntries(this.states);this.listeners.forEach(s=>s(o));return}const r=this.pending.get(t.requestId);r&&(this.pending.delete(t.requestId),window.clearTimeout(r.timer),t.ok?r.resolve(t.result):r.reject(new Error(String(t.error||"Witmind request failed"))))}}const I=["weather.forecast_casa","media_player.showroom_1","sensor.showroom_luminarias_encendidas","sensor.showroom_energia_estimada","sensor.21051182g_battery_level","switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_3_switch","switch.smart_relay_switch_4_switch","scene.presentacion","scene.reunion","script.showroom_encendido_general","script.showroom_apagado_general"],T=(x,e=new Set)=>(typeof x=="string"&&/^[a-z_]+\.[a-z0-9_]+$/i.test(x)?e.add(x):Array.isArray(x)?x.forEach(t=>T(t,e)):x&&typeof x=="object"&&Object.values(x).forEach(t=>T(t,e)),[...e]);class Y extends HTMLElement{constructor(){super(...arguments),this.states={},this.previousStates={},this.eventListeners=new Set,this.panelConfig={},this.messageHandler=e=>{var r,i;if(e.source!==window.parent||((r=e.data)==null?void 0:r.protocol)!==1||((i=e.data)==null?void 0:i.source)!=="witmind-ha")return;e.data.type==="WITMIND_INIT"&&e.data.panelConfig&&(this.panelConfig=e.data.panelConfig,this.applyPanelConfig(),this.resubscribeWithConfig());const t=e.data.theme;(t==="light"||t==="dark")&&this.panel&&this.panel.setAttribute("theme",t)}}connectedCallback(){this.attachShadow({mode:"open"}),window.addEventListener("message",this.messageHandler),this.shadowRoot.innerHTML="<style>:host{display:block;min-height:100dvh;background:var(--wit-surface,#071118)} showroom-panel{display:block;min-height:100dvh}</style><showroom-panel></showroom-panel>",this.panel=this.shadowRoot.querySelector("showroom-panel"),this.panel.addEventListener("hass-toggle-menu",()=>{var e;return(e=this.client)==null?void 0:e.toggleMenu()}),this.client=new V(window.parent),this.applyPanelConfig(),this.subscribe(I),this.panel.hass=this.createHassAdapter()}subscribe(e){var t;(t=this.unsubscribe)==null||t.call(this),this.unsubscribe=this.client.subscribeEntities(e,r=>{this.previousStates=this.states,this.states=r,this.panel.hass=this.createHassAdapter(),this.emitStateChanges()})}resubscribeWithConfig(){const e=String(this.panelConfig.panel_kind||this.panelConfig.panelKind||"").toLowerCase(),t=["weather.forecast_casa"],r=e==="lobby"||e==="general"?[...new Set([...t,...T(this.panelConfig)])]:[...new Set([...I,...T(this.panelConfig)])];this.subscribe(r)}applyPanelConfig(){if(!this.panel)return;const e=this.panelConfig,t=String(e.panel_kind||e.panelKind||"").toLowerCase();if(t!=="lobby"&&t!=="general")return;const r=t==="general",i=Array.isArray(e.devices)?e.devices:[],a=Array.isArray(e.scenes)?e.scenes:[];this.panel.panel={config:{panel_kind:t,static_only:r||e.static_only===!0||e.staticOnly===!0,title:e.title||(r?"Witmind General":"Lobby"),subtitle:e.subtitle||(r?"Centro de control":"Control operativo"),site_label:e.site_label||e.siteLabel||"WTX · MDTC",logo:e.logo||"/local/logo-witmind.png?v=2.0.0",weather:e.weather||"weather.forecast_casa",light_count_sensor:r?"":e.light_count_sensor||"sensor.lobby_luminarias_encendidas",energy_sensor:r?"":e.energy_sensor||"sensor.showroom_energia_estimada",history_hours:e.history_hours||4,chart_hours:e.chart_hours||24,show_forecast:e.show_forecast??!0,spots:r?[]:i,samples:[],reflector:{entity:""},scene_control_entities:r?[]:e.scene_control_entities||e.sceneControlEntities||i.map(n=>n.entity),scenes:r?[]:a.map(n=>({...n,onEntities:n.on_entities||n.onEntities||[],offEntities:n.off_entities||n.offEntities||[],directOnly:!0})),sample_scenes:[],power_on_script:"",power_off_script:"",general_off_script:e.general_off_script||e.generalOffScript||""}}}disconnectedCallback(){var e;(e=this.unsubscribe)==null||e.call(this),window.removeEventListener("message",this.messageHandler)}createHassAdapter(){const e=this.client;return{states:this.states,language:"es",selectedTheme:null,callService:(r,i,a={},n)=>e.callService(`${r}.${i}`,a,n),callWS:async r=>r.type==="get_states"?Object.values(this.states):e.haRequest(String(r.type||""),r),callApi:async(r,i)=>[],connection:{subscribeEvents:async(r,i)=>{const a=n=>{(!i||i==="state_changed")&&r(n)};return this.eventListeners.add(a),()=>this.eventListeners.delete(a)},sendMessagePromise:r=>e.haRequest(String(r.type||""),r),subscribeMessage:(r,i)=>e.haSubscribe(String(i.type||""),i,r)}}}emitStateChanges(){Object.entries(this.states).forEach(([e,t])=>{this.previousStates[e]!==t&&this.eventListeners.forEach(r=>r({event_type:"state_changed",data:{entity_id:e,new_state:t,old_state:this.previousStates[e]||null}}))})}}customElements.define("witmind-ui-app",Y);
