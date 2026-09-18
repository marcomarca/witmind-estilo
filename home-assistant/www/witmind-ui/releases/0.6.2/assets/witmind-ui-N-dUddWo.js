(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function e(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=e(a);fetch(a.href,r)}})();const S=Object.freeze({title:"Showroom",subtitle:"Control operativo",siteLabel:"WTX · MDTC",logo:"/local/logo-witmind.png?v=2.0.0",weather:"weather.forecast_casa",mediaPlayer:"media_player.showroom_1",lightCountSensor:"sensor.showroom_luminarias_encendidas",energySensor:"sensor.showroom_energia_estimada",batteryLevel:"sensor.21051182g_battery_level",historyHours:12,chartHours:24,showForecast:!0,spots:[{entity:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",subtitle:"Zona ventana",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_2",name:"Spots 2x3",subtitle:"Muestra 2 × 3",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_3",name:"Spots 3x3",subtitle:"Muestra 3 × 3",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_4",name:"Spots TV",subtitle:"Zona audiovisual",icon:"spot"}],samples:[{entity:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",subtitle:"Temperaturas de color",icon:"panel"},{entity:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",subtitle:"Muestra suspendida",icon:"pendant"},{entity:"switch.interruptor_inteligente_2_switch_3",name:"Slims",subtitle:"Línea decorativa",icon:"strip"},{entity:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",subtitle:"Iluminación empotrada",icon:"downlight"},{entity:"switch.smart_relay_switch_4_switch",name:"Paneles",subtitle:"Control por relé",icon:"screen"}],reflector:{entity:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",subtitle:"Control aislado",icon:"reflector"},scenes:[{entity:"scene.presentacion",name:"Presentación",subtitle:"Ventana + TV",icon:"presentation",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_4"]},{entity:"scene.reunion",name:"Reunión",subtitle:"2x3 + Ventana",icon:"people",directOnly:!0,onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2"]}],sampleScenes:[{id:"spots",name:"Spots",subtitle:"Todos los spots",icon:"spot",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4"]},{id:"paneles",name:"Paneles",subtitle:"Solo paneles",icon:"screen",onEntities:["switch.smart_relay_switch_4_switch"]},{id:"slims",name:"Slims",subtitle:"Solo slims",icon:"strip",onEntities:["switch.interruptor_inteligente_2_switch_3"]},{id:"downlights",name:"Downlights",subtitle:"Solo downlights",icon:"downlight",onEntities:["switch.interruptor_inteligente_2_switch_4"]},{id:"paneles-3k-6k",name:"Paneles 3k/6k",subtitle:"Temperaturas de color",icon:"panel",onEntities:["switch.interruptor_inteligente_2_switch_1"]},{id:"colgantes",name:"Colgantes",subtitle:"Todas las colgantes",icon:"pendant",onEntities:["switch.interruptor_inteligente_2_switch_2"]}],powerOnScript:"script.showroom_encendido_general",powerOffScript:"script.showroom_apagado_general"}),At={"clear-night":"Noche despejada",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvia",snowy:"Nieve","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},lt={"clear-night":"☾",cloudy:"☁",exceptional:"!",fog:"≋",hail:"◆",lightning:"ϟ","lightning-rainy":"ϟ",partlycloudy:"◒",pouring:"☂",rainy:"☂",snowy:"❄","snowy-rainy":"❄",sunny:"☀",windy:"≈","windy-variant":"≈"},Mt={spot:'<circle cx="12" cy="9" r="5"/><path d="M6 18h12M9 22h6M12 14v4"/>',panel:'<rect width="18" height="18" x="3" y="3" rx="3"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/>',pendant:'<line x1="12" x2="12" y1="2" y2="8"/><path d="M7 16a5 5 0 0 0 10 0V8H7v8Z"/><line x1="8" x2="16" y1="20" y2="20"/><line x1="10" x2="14" y1="23" y2="23"/>',strip:'<rect width="20" height="8" x="2" y="8" rx="2.5"/><circle cx="6" cy="12" r="1.2"/><circle cx="10" cy="12" r="1.2"/><circle cx="14" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',downlight:'<path d="M4 6h16l-3 8H7L4 6Z"/><path d="M9 18h6M10 21h4"/><path d="M12 2v4"/>',screen:'<rect width="20" height="14" x="2" y="3" rx="2.5"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',reflector:'<path d="M4 6h10l4 4v6l-4 4H4V6Z"/><line x1="18" x2="22" y1="10" y2="10"/><line x1="18" x2="22" y1="14" y2="14"/>',presentation:'<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',people:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',power:'<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/>',bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',play:'<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>',pause:'<rect width="4" height="16" x="6" y="4" rx="1.5" fill="currentColor" stroke="none"/><rect width="4" height="16" x="14" y="4" rx="1.5" fill="currentColor" stroke="none"/>',previous:'<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>',next:'<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',volumeDown:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',volumeUp:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',battery:'<rect width="16" height="10" x="2" y="7" rx="2.5"/><line x1="22" x2="22" y1="11" y2="13"/>',health:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',thermometer:'<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',status:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',energy:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'},oe=`
  <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" x2="21" y1="6" y2="6"></line>
    <line x1="3" x2="21" y1="12" y2="12"></line>
    <line x1="3" x2="21" y1="18" y2="18"></line>
  </svg>
`,ce=`
  <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g class="theme-icon-sun">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </g>
    <path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
`;class le extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._hass=null,this._panel=null,this._narrow=!1,this._started=!1,this._renderQueued=!1,this._forecast=[],this._history=[],this._historyError="",this._liveStates=new Map,this._pendingSwitches=new Map,this._switchErrors=new Map,this._switchTimers=new Map,this._pendingAction="",this._confirmAction="",this._toast=null,this._toastTimer=null,this._clockTimer=null,this._historyTimer=null,this._unsubscribeStates=null,this._unsubscribeForecast=null,this._forecastEntity="",this._energyRange="day",this._energyDayOffset=0,this._energyData=[],this._energyLoading=!1,this._energyError=null,this._energyMonthTotal=null,this._energyRequestId=0,this._energyRefreshTimer=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._themeStorageKey="witmind-showroom-panel-theme",this._theme=this._loadTheme(),this._activeView="home",this.shadowRoot.addEventListener("click",t=>this._handleClick(t)),this.shadowRoot.addEventListener("scroll",t=>this._handleEnergyScroll(t),!0)}set hass(t){var o,n,l,d;const e=this._hass,i=this._config(),a=this._relevantHassChanged(e,t),r=!e||((o=e.states)==null?void 0:o[i.energySensor])!==((n=t==null?void 0:t.states)==null?void 0:n[i.energySensor]),s=!((l=e==null?void 0:e.states)!=null&&l[i.energySensor])&&!!((d=t==null?void 0:t.states)!=null&&d[i.energySensor]);this._hass=t,a&&this._syncStatesFromHass(),this.isConnected&&(this._started?r&&(s?this._loadEnergyStatistics():this._scheduleEnergyRefresh()):(this._started=!0,this._start()),a&&this._updateStatePresentation())}get hass(){return this._hass}set panel(t){const e=this._config().weather;this._panel=t;const i=this._config().weather;this._config().panelKind==="general"&&this._activeView==="home"&&(this._activeView="lights"),this._started&&e!==i&&(this._resetForecastSubscription(),this._subscribeWeather()),this._hass&&(this._syncStatesFromHass(),this._loadEnergyStatistics(),this._updateStatePresentation())}get panel(){return this._panel}set narrow(t){this._narrow=!!t,this.toggleAttribute("narrow",this._narrow)}get narrow(){return this._narrow}connectedCallback(){this._hass&&(this._started||(this._started=!0,this._start()),this._updateStatePresentation(),this._scheduleEnergyRefresh(!0))}disconnectedCallback(){clearInterval(this._clockTimer),clearInterval(this._historyTimer),clearTimeout(this._toastTimer),clearTimeout(this._energyRefreshTimer),this._energyRequestId+=1;for(const t of this._switchTimers.values())clearTimeout(t);this._switchTimers.clear(),this._resetForecastSubscription(),this._unsubscribeStates&&(this._unsubscribeStates(),this._unsubscribeStates=null),this._started=!1}_requestRender(){this._renderQueued||!this._hass||!this.shadowRoot||(this._renderQueued=!0,requestAnimationFrame(()=>{this._renderQueued=!1,this.render()}))}_updateStatePresentation(){var o;if(!((o=this.shadowRoot)!=null&&o.querySelector(".app-shell"))){this._requestRender();return}const t=n=>{var m;const l=n.dataset.entity;if(!l)return;const d=this._state(l),p=this._visibleSwitchState(l),h=p==="on",g=!d||["unknown","unavailable"].includes(d.state),u=this._pendingSwitches.has(l),_=this._switchErrors.get(l),b=_||(u?p==="on"?"Encendiendo…":"Apagando…":g?"No disponible":h?"Encendido":"Apagado");n.classList.toggle("is-on",h),n.classList.toggle("is-pending",u),n.classList.toggle("is-error",!!_),n.disabled=g,n.setAttribute("aria-pressed",String(h));const A=((m=n.querySelector(".device-copy strong"))==null?void 0:m.textContent)||l;n.setAttribute("aria-label",`${A}: ${b}`);const $=n.querySelector(".device-copy small");$&&($.textContent=b)};this.shadowRoot.querySelectorAll('[data-action="toggle-switch"]').forEach(t),this.shadowRoot.querySelectorAll('[data-action="run-scene"]').forEach(n=>{const l=this._allScenes().find(u=>u.key===n.dataset.sceneKey);if(!l)return;const d=this._sceneStatus(l),p=this._pendingAction===l.key,h=p?"Aplicando...":d.active?"Activo":d.unavailable?"Sin datos":"Inactivo";n.classList.toggle("is-pending",p),n.classList.toggle("is-active",d.active),n.classList.toggle("is-unavailable",d.unavailable),n.disabled=!!(this._pendingAction&&!p),n.setAttribute("aria-pressed",String(d.active));const g=n.querySelector(".scene-state");g&&(g.textContent=h)});const e=this._config(),i=[...e.spots,...e.samples,...e.reflector?[e.reflector]:[]],a=i.filter(n=>this._visibleSwitchState(n.entity)==="on").length,r=this.shadowRoot.querySelector("[data-lights-summary]");r&&(r.textContent=`${a} de ${i.length}`);const s=this.shadowRoot.querySelector("[data-energy-summary]");s&&(s.textContent=this._energyMonthTotal===null?"Sin datos":`${this._formatEnergy(this._energyMonthTotal)} kWh`)}_handleClick(t){const e=t.target.closest("[data-action]");if(!e||!this._hass)return;const i=e.dataset.action;if(i==="toggle-menu"){this._toggleHomeAssistantMenu();return}if(i==="toggle-theme"){this._toggleTheme();return}if(i==="set-view"){const a=e.dataset.view;["home","lights","energy","system"].includes(a)&&(this._activeView=a,this._requestRender());return}if(i==="toggle-switch"){this._toggleSwitch(e.dataset.entity);return}if(i==="run-scene"){this._runScene(e.dataset.sceneKey||e.dataset.entity,e.dataset.label);return}if(i==="open-power-on"){this._pendingAction||(this._confirmAction="on",this._requestRender());return}if(i==="open-power-off"){this._pendingAction||(this._confirmAction="off",this._requestRender());return}if(i==="general-off"){const a=this._config().generalOffScript;a?this._hass.callService("script","turn_on",{entity_id:a}).catch(r=>{this._notify("No se pudo ejecutar Apagar todo Witmind.","error"),console.error("Error ejecutando el apagado general de Witmind:",r)}):this._notify("El apagado general aún no tiene una entidad configurada.","error");return}if(i==="cancel-power-confirm"){const a=t.target.closest("[data-dialog-card]");if(e.classList.contains("dialog-backdrop")&&a)return;this._pendingAction||(this._confirmAction="",this._requestRender());return}if(i==="confirm-power"){this._confirmGeneralPower();return}if(i==="clear-scene"){this._clearScene();return}if(i==="media"){this._mediaAction(e.dataset.service);return}if(i==="energy-range"){this._setEnergyRange(e.dataset.range);return}if(i==="energy-day-prev"){this._shiftEnergyDay(-1);return}if(i==="energy-day-next"){this._shiftEnergyDay(1);return}if(i==="energy-day-today"){this._resetEnergyDay();return}i==="refresh-energy"&&(this._energyLastLoadedAt=0,this._loadEnergyStatistics())}_toggleHomeAssistantMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_loadTheme(){try{return localStorage.getItem(this._themeStorageKey)==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem(this._themeStorageKey,this._theme)}catch(t){console.warn("No se pudo guardar el tema del showroom:",t)}}_toggleTheme(){this._theme=this._theme==="dark"?"light":"dark",this.setAttribute("data-theme",this._theme),this._saveTheme(),this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0})),this._requestRender()}set theme(t){t!=="dark"&&t!=="light"||(this._theme=t,this.setAttribute("data-theme",t),this._saveTheme())}get theme(){return this._theme}_config(){var u;const t=((u=this._panel)==null?void 0:u.config)||{},e=t.panel_kind==="lobby"||t.panel_kind==="general"||t.static_only===!0||t.staticOnly===!0,i=_=>Array.isArray(_)?[...new Set(_.filter(Boolean).map(b=>String(b)))]:[],a=(_,b)=>(Array.isArray(_)&&(_.length||e)?_:b).filter($=>$==null?void 0:$.entity).map(($,m)=>({entity:String($.entity),name:$.name||`Dispositivo ${m+1}`,subtitle:$.subtitle||"Iluminación",icon:$.icon||"bulb"})),r=a(t.spots,S.spots),s=a(t.samples||t.muestras,S.samples),o=[...r,...s].map(_=>_.entity),n=i(t.scene_control_entities||t.sceneControlEntities),l=n.length?n:o,d=(_,b,A)=>(Array.isArray(_)&&(_.length||e)?_:b).filter(m=>(m==null?void 0:m.entity)||(m==null?void 0:m.id)||(m==null?void 0:m.key)).map((m,y)=>{const v=m.entity?String(m.entity):"",z=String(m.id||m.key||v||`${A}-${y+1}`),x=b.find(D=>{const Et=D.entity?String(D.entity):"",ne=String(D.id||D.key||Et||"");return v&&Et===v||ne===z}),T=v||(x!=null&&x.entity?String(x.entity):""),N=String(m.id||m.key||(x==null?void 0:x.id)||T||`${A}-${y+1}`),C=T||`${A}:${N}`,E=Array.isArray(m.on_entities)||Array.isArray(m.onEntities),it=Array.isArray(m.off_entities)||Array.isArray(m.offEntities),ct=i(E?m.on_entities||m.onEntities:x==null?void 0:x.onEntities),re=i(it?m.off_entities||m.offEntities:[]),se=it?re.filter(D=>!ct.includes(D)):l.filter(D=>!ct.includes(D));return{key:C,id:N,entity:T,name:m.name||(x==null?void 0:x.name)||`Escena ${y+1}`,subtitle:m.subtitle||(x==null?void 0:x.subtitle)||"Escena del showroom",icon:m.icon||(x==null?void 0:x.icon)||"presentation",directOnly:m.direct_only??m.directOnly??(x==null?void 0:x.directOnly)??!1,onEntities:ct,offEntities:se}}),p=t.reflector||S.reflector,h=Number(t.history_hours??t.historyHours),g=Number(t.chart_hours??t.chartHours);return{title:t.title||S.title,subtitle:t.subtitle||S.subtitle,siteLabel:t.site_label||t.siteLabel||S.siteLabel,logo:t.logo||S.logo,weather:t.weather||S.weather,mediaPlayer:t.media_player||t.mediaPlayer||S.mediaPlayer,lightCountSensor:t.light_count_sensor||t.lightCountSensor||S.lightCountSensor,energySensor:t.energy_sensor||t.energySensor||S.energySensor,batteryLevel:t.battery_level||t.batteryLevel||S.batteryLevel,powerOnScript:t.power_on_script||t.powerOnScript||S.powerOnScript,powerOffScript:t.power_off_script||t.powerOffScript||S.powerOffScript,historyHours:Number.isFinite(h)&&h>0?Math.min(24,h):S.historyHours,chartHours:Number.isFinite(g)&&g>0?Math.min(72,g):S.chartHours,showForecast:t.show_forecast??t.showForecast??S.showForecast,panelKind:t.panel_kind||t.panelKind||"showroom",staticOnly:t.static_only??t.staticOnly??!1,generalOffScript:t.general_off_script||t.generalOffScript||"",spots:r,samples:s,sceneControlEntities:l,reflector:p!=null&&p.entity?{entity:String(p.entity),name:p.name||S.reflector.name,subtitle:p.subtitle||S.reflector.subtitle,icon:p.icon||S.reflector.icon}:null,scenes:d(t.scenes,S.scenes,"scene"),sampleScenes:d(t.sample_scenes||t.sampleScenes,S.sampleScenes,"sample")}}_allDevices(){const t=this._config();return[...t.spots,...t.samples,...t.reflector?[t.reflector]:[]]}_allScenes(t=this._config()){return[...t.scenes,...t.sampleScenes]}_trackedEntities(){const t=this._config();return new Set([...this._allDevices().map(e=>e.entity),...t.sceneControlEntities,...this._allScenes(t).flatMap(e=>[e.entity,...e.onEntities,...e.offEntities]),t.weather,t.mediaPlayer,t.lightCountSensor,t.energySensor,t.batteryLevel,t.powerOnScript,t.powerOffScript].filter(Boolean))}_relevantHassChanged(t,e){var i,a;if(!t||!e)return!0;for(const r of this._trackedEntities())if(((i=t.states)==null?void 0:i[r])!==((a=e.states)==null?void 0:a[r]))return!0;return!1}async _start(){this._clockTimer=setInterval(()=>this._updateClock(),3e4),await Promise.allSettled([this._fetchCurrentStates(),this._subscribeStateChanges(),this._subscribeWeather(),this._loadEnergyStatistics()])}_syncStatesFromHass(){var t;if((t=this._hass)!=null&&t.states)for(const e of this._trackedEntities()){const i=this._hass.states[e];i&&this._applyLiveState(e,i)}}_applyLiveState(t,e){if(!e){this._liveStates.delete(t);return}this._liveStates.set(t,e);const i=this._pendingSwitches.get(t);if(i&&e.state===i.desired){this._pendingSwitches.delete(t),this._switchErrors.delete(t);const a=this._switchTimers.get(t);a&&clearTimeout(a),this._switchTimers.delete(t)}}async _fetchCurrentStates(){var t;if((t=this._hass)!=null&&t.callWS)try{const e=await this._hass.callWS({type:"get_states"}),i=this._trackedEntities();for(const a of e||[])i.has(a.entity_id)&&this._applyLiveState(a.entity_id,a);this._updateStatePresentation()}catch(e){console.error("No se pudieron sincronizar los estados del showroom:",e)}}async _subscribeStateChanges(){var t;if(!(!((t=this._hass)!=null&&t.connection)||this._unsubscribeStates))try{this._unsubscribeStates=await this._hass.connection.subscribeEvents(e=>{var a;const i=(a=e==null?void 0:e.data)==null?void 0:a.entity_id;!i||!this._trackedEntities().has(i)||(this._applyLiveState(i,e.data.new_state),i===this._config().energySensor&&this._scheduleEnergyRefresh(),this._updateStatePresentation())},"state_changed")}catch(e){console.error("No se pudo suscribir a state_changed:",e)}}_resetForecastSubscription(){this._unsubscribeForecast&&(this._unsubscribeForecast(),this._unsubscribeForecast=null),this._forecastEntity=""}async _subscribeWeather(){var e;const t=this._config();if(!(!((e=this._hass)!=null&&e.connection)||!t.weather)&&!(this._unsubscribeForecast&&this._forecastEntity===t.weather)){this._resetForecastSubscription();try{this._forecastEntity=t.weather,this._unsubscribeForecast=await this._hass.connection.subscribeMessage(i=>{this._forecast=Array.isArray(i==null?void 0:i.forecast)?i.forecast:[],this._requestRender()},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:t.weather})}catch(i){this._forecastEntity="",console.error("No se pudo cargar el pronóstico:",i)}}}_energyRefreshInterval(){return this._energyRange==="day"?3e4:this._energyRange==="month"?12e4:3e5}_scheduleEnergyRefresh(t=!1){if(!this._hass||!this.isConnected||(clearTimeout(this._energyRefreshTimer),this._energyRange==="day"&&this._energyDayOffset!==0))return;const e=this._energyRefreshInterval(),i=this._energyLastLoadedAt?Date.now()-this._energyLastLoadedAt:0,a=t?0:this._energyLastLoadedAt?Math.max(1e3,e-i):e;this._energyRefreshTimer=setTimeout(()=>this._loadEnergyStatistics(),a)}_energyRangeDefinition(t=this._energyRange){const e=new Date;let i,a=e,r,s,o,n=!1;if(t==="year")i=new Date(e.getFullYear(),0,1,0,0,0,0),r="month",s=`Año ${e.getFullYear()}`,o="mes";else if(t==="month")i=new Date(e.getFullYear(),e.getMonth(),1,0,0,0,0),r="day",s=e.toLocaleDateString("es-BO",{month:"long",year:"numeric"}),o="día";else{const l=new Date(e.getFullYear(),e.getMonth(),e.getDate(),0,0,0,0);i=new Date(l.getFullYear(),l.getMonth(),l.getDate()+Math.min(0,Number(this._energyDayOffset)||0),0,0,0,0),n=i.getTime()===l.getTime(),a=n?e:new Date(i.getFullYear(),i.getMonth(),i.getDate()+1,0,0,0,0),r="hour",s=i.toLocaleDateString("es-BO",{weekday:"long",day:"numeric",month:"long"}),o="hora"}return{start:i,end:a,period:r,title:s,intervalLabel:o,isToday:n}}_energyValueToKWh(t,e){const i=Number(t);if(!Number.isFinite(i))return null;const a=String(e||"kWh").trim().toLowerCase().replaceAll(" ","");return a==="kwh"?i:a==="wh"?i/1e3:a==="mwh"?i*1e3:null}_deriveEnergyStateDeltas(t,e,i){const a=Number(e instanceof Date?e.getTime():e),r=Number(i instanceof Date?i.getTime():i),s=t.filter(l=>Number.isFinite(Number(l.start))&&Number.isFinite(Number(l.state))).sort((l,d)=>Number(l.start)-Number(d.start)),o=[];let n=null;for(const l of s){const d=Number(l.start),p=Number(l.state);if(d<a){n=p;continue}if(d>=r)break;let h=0;if(Number.isFinite(n)){const g=p-n;h=g>=0?g:Math.max(0,p)}o.push({...l,change:h}),n=p}return o}_aggregateEnergyDayRows(t,e,i){var l;const a=new Date(e.start),r=new Date(e.end),s=e.isToday?new Date(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),0,0,0):new Date(a.getFullYear(),a.getMonth(),a.getDate(),23,0,0,0),o=new Map;for(let d=new Date(a);d<=s;d.setHours(d.getHours()+1)){const p=d.getTime();o.set(p,{start:p,end:new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()+1,0,0,0).getTime(),change:0,samples:0,partial:e.isToday&&p===s.getTime(),live:!1})}let n=null;for(const d of t){const p=new Date(Number(d.start));if(!Number.isFinite(p.getTime()))continue;const h=new Date(p.getFullYear(),p.getMonth(),p.getDate(),p.getHours(),0,0,0).getTime(),g=o.get(h);g&&(g.change+=Math.max(0,Number(d.change)||0),g.samples+=1,Number.isFinite(d.state)&&(!n||Number(d.end||d.start)>Number(n.end||n.start))&&(n=d))}if(e.isToday){const d=this._energyValueToKWh(i==null?void 0:i.state,(l=i==null?void 0:i.attributes)==null?void 0:l.unit_of_measurement),p=n==null?void 0:n.state,h=Number((n==null?void 0:n.end)||(n==null?void 0:n.start)),g=o.get(s.getTime());if(g&&Number.isFinite(d)&&Number.isFinite(p)&&Number.isFinite(h)&&h>=s.getTime()&&r.getTime()-h>=0&&r.getTime()-h<=900*1e3){const u=d-p;Number.isFinite(u)&&u>=0&&(g.change+=u,g.live=u>0)}}return[...o.values()].filter(d=>d.samples>0||d.live)}_calculateCurrentMonthEnergy(t,e,i){var h;const a=new Date(e),r=new Date(a.getFullYear(),a.getMonth(),1,0,0,0,0).getTime(),s=t.filter(g=>Number.isFinite(Number(g.start))&&Number(g.start)>=r).sort((g,u)=>Number(g.start)-Number(u.start));let o=s.reduce((g,u)=>g+Math.max(0,Number(u.change)||0),0),n=null;for(const g of s)Number.isFinite(Number(g.state))&&(!n||Number(g.end||g.start)>Number(n.end||n.start))&&(n=g);const l=this._energyValueToKWh(i==null?void 0:i.state,(h=i==null?void 0:i.attributes)==null?void 0:h.unit_of_measurement),d=Number(n==null?void 0:n.state),p=Number((n==null?void 0:n.end)||(n==null?void 0:n.start));if(Number.isFinite(l)&&Number.isFinite(d)&&Number.isFinite(p)&&p>=r&&p<=a.getTime()&&a.getTime()-p<=7200*1e3){const g=l-d;Number.isFinite(g)&&g>=0&&(o+=g)}return s.length||Number.isFinite(d)?o:null}_aggregateEnergyCalendarRows(t,e,i,a){var p;if(!["month","year"].includes(a))return[];const r=new Map;let s=null;for(const h of t){const g=Number(h.start);if(!Number.isFinite(g))continue;const u=new Date(g),_=a==="month"?new Date(u.getFullYear(),u.getMonth(),u.getDate(),0,0,0,0).getTime():new Date(u.getFullYear(),u.getMonth(),1,0,0,0,0).getTime(),b=r.get(_)||{start:_,change:0,samples:0,partial:!1,live:!1};b.change+=Math.max(0,Number(h.change)||0),b.samples+=1,r.set(_,b),Number.isFinite(Number(h.state))&&(!s||g>Number(s.start))&&(s=h)}const o=this._energyValueToKWh(i==null?void 0:i.state,(p=i==null?void 0:i.attributes)==null?void 0:p.unit_of_measurement),n=Number(s==null?void 0:s.state),l=Number(s==null?void 0:s.start),d=new Date(e.end);if(Number.isFinite(o)&&Number.isFinite(n)&&Number.isFinite(l)&&l<=d.getTime()&&d.getTime()-l<=7200*1e3){const h=o-n;if(Number.isFinite(h)&&h>=0){const g=a==="month"?new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0,0).getTime():new Date(d.getFullYear(),d.getMonth(),1,0,0,0,0).getTime(),u=r.get(g)||{start:g,change:0,samples:0,partial:!1,live:!1};u.change+=h,u.live=h>0,r.set(g,u)}}return[...r.values()].sort((h,g)=>Number(h.start)-Number(g.start))}_energyViewSignature(){return JSON.stringify([this._energyRange,this._energyDayOffset,this._energyMonthTotal,this._energyError||"",this._energyData.map(t=>[Number(t.start),Number(t.change)||0,Number(t.samples)||0,!!t.partial,!!t.live])])}async _loadEnergyStatistics(){var g;if(!((g=this._hass)!=null&&g.connection))return;clearTimeout(this._energyRefreshTimer);const t=this._config(),e=this._state(t.energySensor),i=Number(e==null?void 0:e.state);if(!e){this._energyData=[],this._energyMonthTotal=null,this._energyError=`No existe ${t.energySensor} en Home Assistant.`,this._energyLoading=!1,this._requestRender();return}if(!Number.isFinite(i)){this._energyData=[],this._energyMonthTotal=null,this._energyError=`${t.energySensor} no entrega un valor numérico.`,this._energyLoading=!1,this._requestRender();return}const a=++this._energyRequestId,r=this._energyViewSignature(),s=this._energyData.length>0,o=this._energyRangeDefinition(),n=new Date,l=new Date(n.getFullYear(),n.getMonth(),1,0,0,0,0),d=new Date(o.start.getTime()-3600*1e3),p=this._energyRange==="year"?"hour":"5minute",h=new Date(l.getTime()-3600*1e3);this._energyLoading=!0,this._energyError=null,s||this._requestRender();try{const u=await this._hass.connection.sendMessagePromise({type:"recorder/get_statistics_metadata",statistic_ids:[t.energySensor]});if(a!==this._energyRequestId)return;const b=(Array.isArray(u)?u:[]).find(C=>(C==null?void 0:C.statistic_id)===t.energySensor)||null;if(!b||!b.has_sum)throw new Error("La entidad no dispone de estadísticas acumulables. Verifica device_class: energy y state_class total/total_increasing.");const A=this._hass.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:d.toISOString(),end_time:o.end.toISOString(),statistic_ids:[t.energySensor],period:p,units:{energy:"kWh"},types:["state"]}),$=this._hass.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:h.toISOString(),end_time:n.toISOString(),statistic_ids:[t.energySensor],period:"hour",units:{energy:"kWh"},types:["state"]}),[m,y]=await Promise.all([A,$]);if(a!==this._energyRequestId)return;const v=C=>(Array.isArray(C==null?void 0:C[t.energySensor])?C[t.energySensor]:[]).map(E=>({start:Number(E.start),end:Number(E.end),change:E.change===void 0||E.change===null?null:Math.max(0,Number(E.change)||0),state:E.state===void 0||E.state===null?null:Number(E.state)})).filter(E=>Number.isFinite(E.start)&&(Number.isFinite(E.state)||Number.isFinite(E.change))),z=v(m),x=this._deriveEnergyStateDeltas(z,o.start,o.end);this._energyData=this._energyRange==="day"?this._aggregateEnergyDayRows(x,o,e):this._aggregateEnergyCalendarRows(x,o,e,this._energyRange);const T=v(y),N=this._deriveEnergyStateDeltas(T,l,n);if(this._energyMonthTotal=this._calculateCurrentMonthEnergy(N,n,e),this._energyRange==="month"&&this._energyData.length)this._energyMonthTotal=this._energyData.reduce((C,E)=>C+Math.max(0,Number(E.change)||0),0);else if(this._energyRange==="year"&&Number.isFinite(this._energyMonthTotal)){const C=new Date(n.getFullYear(),n.getMonth(),1,0,0,0,0).getTime(),E=this._energyData.find(it=>Number(it.start)===C);E&&(E.change=this._energyMonthTotal)}this._energyLastLoadedAt=Date.now(),this._energyError=null}catch(u){if(a!==this._energyRequestId)return;this._energyData=[],this._energyMonthTotal=null,this._energyError=(u==null?void 0:u.message)||"No se pudieron consultar las estadísticas energéticas.",console.error("Error cargando estadísticas de energía del showroom:",u)}finally{if(a===this._energyRequestId){this._energyLoading=!1;const u=r!==this._energyViewSignature();!s||u&&this._activeView==="energy"?this._requestRender():this._updateStatePresentation(),this._scheduleEnergyRefresh()}}}_setEnergyRange(t){!["day","month","year"].includes(t)||t===this._energyRange||(this._energyRange=t,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_shiftEnergyDay(t){if(this._energyRange!=="day")return;const e=Number(t);if(!Number.isFinite(e)||e===0)return;const i=Math.min(0,this._energyDayOffset+e);i!==this._energyDayOffset&&(this._energyDayOffset=i,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_resetEnergyDay(){this._energyRange!=="day"||this._energyDayOffset===0||(this._energyDayOffset=0,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_formatEnergy(t,e=2){const i=Number(t);return Number.isFinite(i)?i.toLocaleString("es-BO",{minimumFractionDigits:e,maximumFractionDigits:e}):"--"}_energyLabel(t,e=this._energyRange){const i=new Date(Number(t));return Number.isFinite(i.getTime())?e==="year"?i.toLocaleDateString("es-BO",{month:"short"}).replace(".",""):e==="month"?String(i.getDate()):i.toLocaleTimeString("es-BO",{hour:"2-digit",minute:"2-digit",hour12:!1}):"--"}_captureEnergyChartScroll(){var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-energy-scroll]");if(!t)return;const e=Math.max(0,t.scrollWidth-t.clientWidth);this._energyScrollLeft=t.scrollLeft,this._energyAutoFollow=e<=0||e-t.scrollLeft<=8}_handleEnergyScroll(t){var a,r;const e=(r=(a=t.target)==null?void 0:a.closest)==null?void 0:r.call(a,"[data-energy-scroll]");if(!e)return;const i=Math.max(0,e.scrollWidth-e.clientWidth);this._energyScrollLeft=e.scrollLeft,this._energyAutoFollow=i<=0||i-e.scrollLeft<=8}_restoreEnergyChartScroll(){var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-energy-scroll]");if(!t)return;const e=Math.max(0,t.scrollWidth-t.clientWidth);if(this._energyAutoFollow||this._energyScrollLeft===null){t.scrollLeft=e,this._energyScrollLeft=t.scrollLeft;return}t.scrollLeft=Math.max(0,Math.min(this._energyScrollLeft,e))}_energyChart(){const t=this._energyData;if(this._energyLoading&&!t.length)return'<div class="energy-empty"><span class="energy-spinner"></span>Consultando estadísticas de Home Assistant…</div>';if(this._energyError)return`<div class="energy-empty error">${this._icon("status")}<span>${this._escape(this._energyError)}</span></div>`;if(!t.length)return'<div class="energy-empty">No hay estadísticas de consumo disponibles para este período.</div>';const e=280,i=14,a=16,r=22,s=42,o=this._energyRange==="day"?64:this._energyRange==="month"?36:58,n=Math.max(620,t.length*o+i+a),l=e-r-s,d=n-i-a,p=Math.max(...t.map(m=>m.change),.001),h=this._energyRange==="day"?10:t.length>24?4:7,g=Math.max(6,(d-h*Math.max(0,t.length-1))/t.length),u=this._energyRange==="month"?Math.max(1,Math.ceil(t.length/10)):this._energyRange==="day"?2:1,_=[0,.25,.5,.75,1],b=_.map(m=>{const y=r+l*(1-m);return`<line x1="${i}" y1="${y.toFixed(1)}" x2="${n-a}" y2="${y.toFixed(1)}" class="energy-grid-line"/>`}).join(""),A=_.map(m=>{const y=r+l*(1-m),v=this._formatEnergy(p*m,p<1?2:1);return`<span class="energy-y-tick" style="top:${y.toFixed(1)}px">${this._escape(v)}</span>`}).join(""),$=t.map((m,y)=>{const v=i+y*(g+h),z=m.change>0?Math.max(2,m.change/p*l):1,x=r+l-z,T=y%u===0||y===t.length-1,N=this._energyLabel(m.start),C=m.partial?" · en curso":"",E=m.partial?`<text x="${(v+g/2).toFixed(1)}" y="${(r+10).toFixed(1)}" text-anchor="middle" class="energy-current-label">ahora</text>`:"";return`<g class="energy-bar-group ${m.partial?"is-current":""}"><rect x="${v.toFixed(1)}" y="${x.toFixed(1)}" width="${g.toFixed(1)}" height="${z.toFixed(1)}" rx="${Math.min(4,g/2).toFixed(1)}" class="energy-bar ${m.partial?"is-partial":""}"><title>${this._escape(N)} · ${this._formatEnergy(m.change)} kWh${C}</title></rect>${E}${T?`<text x="${(v+g/2).toFixed(1)}" y="${e-14}" text-anchor="middle" class="energy-axis-text">${this._escape(N)}</text>`:""}</g>`}).join("");return`<div class="energy-chart-layout"><div class="energy-y-axis" aria-hidden="true"><span class="energy-y-unit">kWh</span>${A}</div><div class="energy-chart-wrap" data-energy-scroll><svg class="energy-chart" width="${n}" height="${e}" viewBox="0 0 ${n} ${e}" role="img" aria-label="Gráfica de consumo energético estimado en kWh">${b}${$}</svg></div></div>`}async _loadHistory(){var o;const t=this._config();if(!((o=this._hass)!=null&&o.callApi))return;const e=Math.max(t.historyHours,t.chartHours),i=new Date(Date.now()-e*60*60*1e3).toISOString(),a=new Date().toISOString(),r=[t.lightCountSensor,...t.spots.map(n=>n.entity),...t.samples.map(n=>n.entity)].filter(Boolean).join(",");if(!r)return;const s=`history/period/${encodeURIComponent(i)}?filter_entity_id=${encodeURIComponent(r)}&end_time=${encodeURIComponent(a)}&minimal_response&no_attributes`;try{this._history=await this._hass.callApi("GET",s),this._historyError=""}catch(n){this._history=[],this._historyError="No se pudo cargar el historial.",console.error("No se pudo cargar el historial del showroom:",n)}this._requestRender()}_state(t){var e,i;return this._liveStates.get(t)||((i=(e=this._hass)==null?void 0:e.states)==null?void 0:i[t])}_isUnavailable(t){var i;const e=(i=this._state(t))==null?void 0:i.state;return!e||e==="unknown"||e==="unavailable"}_visibleSwitchState(t){var e,i;return((e=this._pendingSwitches.get(t))==null?void 0:e.desired)||((i=this._state(t))==null?void 0:i.state)||"unavailable"}async _toggleSwitch(t){if(!t||!this._hass)return;const e=this._state(t);if(!e||["unknown","unavailable"].includes(e.state)){this._switchErrors.set(t,"No disponible"),this._updateStatePresentation();return}const a=this._visibleSwitchState(t)==="on"?"off":"on",r=a==="on"?"turn_on":"turn_off",s=t.split(".")[0]||"switch";this._pendingSwitches.set(t,{desired:a,startedAt:Date.now()}),this._switchErrors.delete(t),this._updateStatePresentation();try{await this._hass.callService(s,r,{entity_id:t});const o=this._switchTimers.get(t);o&&clearTimeout(o);const n=setTimeout(()=>this._verifySwitchState(t,a),6e3);this._switchTimers.set(t,n)}catch(o){this._pendingSwitches.delete(t),this._switchErrors.set(t,"La acción falló"),this._updateStatePresentation(),console.error(`Error ejecutando ${r} en ${t}:`,o)}}async _verifySwitchState(t,e){var a;await this._fetchCurrentStates();const i=((a=this._state(t))==null?void 0:a.state)===e;this._pendingSwitches.delete(t),this._switchTimers.delete(t),i?this._switchErrors.delete(t):this._switchErrors.set(t,"Sin confirmación"),this._updateStatePresentation()}_sceneStatus(t){const e=[...t.onEntities.map(r=>({entityId:r,desired:"on"})),...t.offEntities.map(r=>({entityId:r,desired:"off"}))];if(!e.length)return{active:!1,unavailable:!1,mismatches:[]};const i=e.some(({entityId:r})=>this._isUnavailable(r)),a=e.filter(({entityId:r,desired:s})=>{var o;return((o=this._state(r))==null?void 0:o.state)!==s});return{active:!i&&a.length===0,unavailable:i,mismatches:a}}_sceneExpectations(t){return[...t.offEntities.map(e=>({entityId:e,desired:"off"})),...t.onEntities.map(e=>({entityId:e,desired:"on"}))]}_markExpectedStates(t){const e=Date.now();for(const{entityId:i,desired:a}of t)this._pendingSwitches.set(i,{desired:a,startedAt:e}),this._switchErrors.delete(i)}_clearExpectedStates(t){for(const{entityId:e}of t){this._pendingSwitches.delete(e);const i=this._switchTimers.get(e);i&&clearTimeout(i),this._switchTimers.delete(e)}}async _setEntitiesState(t,e){const i=[...new Set((t||[]).filter(Boolean))];if(!i.length)return;const a=new Map;for(const s of i){const o=s.split(".")[0];o&&(a.has(o)||a.set(o,[]),a.get(o).push(s))}const r=e==="on"?"turn_on":"turn_off";for(const[s,o]of a)await this._hass.callService(s,r,{entity_id:o})}async _waitForExpectedStates(t,e=7e3){const i=Date.now()+e;let a=t;for(;Date.now()<i;){if(await this._fetchCurrentStates(),a=t.filter(({entityId:r,desired:s})=>{var o;return((o=this._state(r))==null?void 0:o.state)!==s}),!a.length)return{ok:!0,mismatches:[]};await new Promise(r=>setTimeout(r,450))}return{ok:!1,mismatches:a}}async _runScene(t,e){var o;if(!t||this._pendingAction)return;const i=this._config(),a=this._allScenes(i).find(n=>n.key===t||n.entity===t);if(!a){this._notify("La escena no está configurada.","error");return}const r=this._sceneExpectations(a);this._pendingAction=a.key,this._markExpectedStates(r),this._updateStatePresentation();let s=null;try{if(a.entity&&!a.directOnly)try{await this._hass.callService("scene","turn_on",{entity_id:a.entity})}catch(d){s=d,console.warn(`La escena ${a.entity} no respondió; se aplicará el perfil directo.`,d)}await this._setEntitiesState(a.offEntities,"off"),await this._setEntitiesState(a.onEntities,"on");const n=await this._waitForExpectedStates(r);if(!n.ok){const d=n.mismatches.map(p=>p.entityId).join(", ");throw new Error(`No se confirmaron los estados de: ${d}`)}const l=s?`${e||"Modo"} aplicado mediante control directo.`:`${e||"Modo"} activo.`;this._notify(l,"success")}catch(n){for(const{entityId:l,desired:d}of r)((o=this._state(l))==null?void 0:o.state)!==d&&this._switchErrors.set(l,"No confirmó el modo");this._notify("No se pudo aplicar completamente el modo seleccionado.","error"),console.error("Error aplicando modo del showroom:",n)}finally{this._clearExpectedStates(r),this._pendingAction="",await this._fetchCurrentStates(),this._updateStatePresentation()}}async _executeGeneralPower(t,e={}){var l;if(!this._hass||this._pendingAction||!["on","off"].includes(t))return!1;const i=this._config(),a=t==="on"?i.powerOnScript:i.powerOffScript,r=i.sceneControlEntities.map(d=>({entityId:d,desired:t})),s=e.successMessage||(t==="on"?"Iluminación general encendida.":"Iluminación general apagada."),o=e.errorMessage||(t==="on"?"No se pudo encender toda la iluminación.":"No se pudo apagar toda la iluminación.");this._pendingAction=a||`direct-power-${t}`,this._markExpectedStates(r),this._updateStatePresentation();let n=null;try{if(a)try{await this._hass.callService("script","turn_on",{entity_id:a})}catch(p){n=p,console.warn(`El script ${a} no respondió; se aplicará el control directo.`,p)}await this._setEntitiesState(i.sceneControlEntities,t);const d=await this._waitForExpectedStates(r);if(!d.ok){const p=d.mismatches.map(h=>h.entityId).join(", ");throw new Error(`No se confirmaron los estados de: ${p}`)}return this._confirmAction="",this._notify(s,"success"),!0}catch(d){for(const{entityId:p,desired:h}of r)((l=this._state(p))==null?void 0:l.state)!==h&&this._switchErrors.set(p,"Sin confirmación");return this._notify(o,"error"),console.error("Error ejecutando el control general del showroom:",{error:d,scriptError:n,desired:t}),!1}finally{this._clearExpectedStates(r),this._pendingAction="",await this._fetchCurrentStates(),this._updateStatePresentation()}}async _confirmGeneralPower(){const t=this._confirmAction;["on","off"].includes(t)&&await this._executeGeneralPower(t,{successMessage:t==="on"?"Toda la iluminación del showroom está encendida.":"Toda la iluminación del showroom está apagada."})}async _clearScene(){this._pendingAction||await this._executeGeneralPower("off",{successMessage:"Escena apagada. La iluminación del showroom quedó apagada.",errorMessage:"No se pudo apagar completamente la escena."})}async _mediaAction(t){const e=this._config().mediaPlayer;if(!(!e||!t||this._isUnavailable(e)))try{await this._hass.callService("media_player",t,{entity_id:e})}catch(i){this._notify("No se pudo controlar el reproductor.","error"),console.error(`Error ejecutando media_player.${t}:`,i)}}_updateToastPresentation(){if(!this.shadowRoot)return;const t=this.shadowRoot.querySelector("[data-toast]");if(!this._toast){t==null||t.remove();return}if(t){t.className=`toast ${this._escape(this._toast.type)}`,t.textContent=this._toast.message;return}const e=document.createElement("div");e.dataset.toast="",e.className=`toast ${this._escape(this._toast.type)}`,e.setAttribute("role","status"),e.textContent=this._toast.message,this.shadowRoot.append(e)}_notify(t,e="success"){var i;clearTimeout(this._toastTimer),this._toast={message:t,type:e},(i=this.shadowRoot)!=null&&i.querySelector(".app-shell")?this._updateToastPresentation():this._requestRender(),this._toastTimer=setTimeout(()=>{this._toast=null,this._updateToastPresentation()},4200)}_historyMap(){var e;const t=new Map;for(const i of this._history||[]){const a=(e=i==null?void 0:i[0])==null?void 0:e.entity_id;a&&t.set(a,i)}return t}_historySegments(t,e,i){if(!Array.isArray(t)||!t.length)return[];const a=t.map(s=>({state:s.state,time:new Date(s.last_changed||s.last_updated).getTime()})).filter(s=>Number.isFinite(s.time)).sort((s,o)=>s.time-o.time);if(!a.length)return[];const r=[];for(let s=0;s<a.length;s+=1){const o=a[s],n=a[s+1],l=Math.max(e,o.time),d=Math.min(i,(n==null?void 0:n.time)??i);d<=l||r.push({state:o.state,left:(l-e)/(i-e)*100,width:(d-l)/(i-e)*100})}return r}_sparkline(t,e){var u;const i=this._historyMap().get(t)||[],a=Date.now(),r=a-e*60*60*1e3,s=i.map(_=>({value:Number(_.state),time:new Date(_.last_changed||_.last_updated).getTime()})).filter(_=>Number.isFinite(_.value)&&Number.isFinite(_.time)&&_.time>=r).sort((_,b)=>_.time-b.time),o=Number((u=this._state(t))==null?void 0:u.state);if(Number.isFinite(o)&&s.push({value:o,time:a}),!s.length)return{path:"",min:"--",max:"--",avg:"--"};const n=s.map(_=>_.value),l=Math.min(...n),d=Math.max(...n),p=n.reduce((_,b)=>_+b,0)/n.length,h=d-l||1;return{path:s.map((_,b)=>{const A=(_.time-r)/(a-r)*300,$=66-(_.value-l)/h*52;return`${b?"L":"M"}${Math.max(0,Math.min(300,A)).toFixed(1)},${$.toFixed(1)}`}).join(" "),min:this._formatNumber(l),max:this._formatNumber(d),avg:this._formatNumber(p)}}_formatNumber(t){return Number.isFinite(t)?new Intl.NumberFormat("es-BO",{maximumFractionDigits:1}).format(t):"--"}_updateClock(){var o,n,l;if(!this.shadowRoot)return;const t=new Date,e=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",hour12:!0}).formatToParts(t),i=((o=e.find(d=>d.type==="hour"))==null?void 0:o.value)||"--",a=((n=e.find(d=>d.type==="minute"))==null?void 0:n.value)||"--",r=(((l=e.find(d=>d.type==="dayPeriod"))==null?void 0:l.value)||"").replaceAll(".","").replaceAll(" ","").toUpperCase();for(const d of this.shadowRoot.querySelectorAll("[data-clock-time]"))d.textContent=`${i}:${a}`;for(const d of this.shadowRoot.querySelectorAll("[data-clock-period]"))d.textContent=r||"";const s=this.shadowRoot.querySelector("[data-current-time]");s&&(s.dateTime=t.toISOString(),s.setAttribute("aria-label",`${i}:${a} ${r}`.trim()))}_icon(t,e=""){const i=Mt[t]||Mt.bulb;return`<svg class="icon ${this._escape(e)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`}_escape(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_renderDevice(t){const e=this._state(t.entity),i=this._visibleSwitchState(t.entity),a=i==="on",r=!e||["unknown","unavailable"].includes(e.state),s=this._pendingSwitches.has(t.entity),o=this._switchErrors.get(t.entity),n=o||(s?i==="on"?"Encendiendo…":"Apagando…":r?"No disponible":a?"Encendido":"Apagado");return`
      <button
        class="device ${a?"is-on":""} ${s?"is-pending":""} ${o?"is-error":""}"
        data-action="toggle-switch"
        data-entity="${this._escape(t.entity)}"
        aria-pressed="${a}"
        aria-label="${this._escape(`${t.name}: ${n}`)}"
        ${r?"disabled":""}
      >
        <span class="device-icon">${this._icon(t.icon)}</span>
        <span class="device-copy">
          <strong>${this._escape(t.name)}</strong>
          <small>${this._escape(n)}</small>
        </span>
        <span class="device-switch" aria-hidden="true"><i></i></span>
      </button>
    `}_renderDeviceGroup(t,e,i){return`
      <section class="surface control-section">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">${this._escape(e)}</span>
            <h2>${this._escape(t)}</h2>
          </div>
        </div>
        <div class="device-grid">${i.map(a=>this._renderDevice(a)).join("")}</div>
      </section>
    `}_renderWeather(){const t=this._config(),e=this._state(t.weather);if(!e)return`
        <section class="surface weather-card is-unavailable">
          <span class="eyebrow">Clima</span>
          <h2>Entidad no encontrada</h2>
          <code>${this._escape(t.weather)}</code>
        </section>
      `;const i=e.attributes||{},a=e.state,r=this._forecast.slice(0,3);return`
      <section class="surface weather-card">
        <div class="weather-main">
          <div class="weather-symbol">${this._escape(lt[a]||"·")}</div>
          <div class="weather-copy">
            <span class="eyebrow">Clima · Casa</span>
            <h2>${this._escape(At[a]||a)}</h2>
            <p>Humedad ${this._escape(i.humidity??"Sin datos")}% · Viento ${this._escape(i.wind_speed??"Sin datos")} ${this._escape(i.wind_speed_unit??"")}</p>
          </div>
          <strong class="temperature">${this._escape(i.temperature??"--")}${this._escape(i.temperature_unit??"°")}</strong>
        </div>
        ${t.showForecast?`
          <div class="forecast-row">
            ${r.length?r.map(s=>{const o=new Date(s.datetime),n=new Intl.DateTimeFormat("es-BO",{weekday:"short"}).format(o);return`
                <div class="forecast-item">
                  <span>${this._escape(n)}</span>
                  <b>${this._escape(lt[s.condition]||"·")}</b>
                  <strong>${this._escape(s.temperature??s.native_temperature??"--")}°</strong>
                </div>
              `}).join(""):'<span class="forecast-empty">Pronóstico no disponible</span>'}
          </div>
        `:""}
      </section>
    `}_renderMedia(){const t=this._config(),e=this._state(t.mediaPlayer),i=!e||["unknown","unavailable"].includes(e.state),a=(e==null?void 0:e.attributes)||{},r=(e==null?void 0:e.state)==="playing",s=i?"No disponible":r?"Reproduciendo":(e==null?void 0:e.state)==="paused"?"En pausa":(e==null?void 0:e.state)==="idle"?"En espera":(e==null?void 0:e.state)||"Detenido",o=a.media_title||a.friendly_name||"Showroom 1",n=a.media_artist||a.source||"Música del showroom",l=Number(a.volume_level),d=(p,h,g,u=!1)=>`
      <button
        class="media-button ${u?"primary":""}"
        data-action="media"
        data-service="${p}"
        aria-label="${this._escape(g)}"
        title="${this._escape(g)}"
        ${i?"disabled":""}
      >${this._icon(h)}</button>
    `;return`
      <section class="surface media-card ${i?"is-unavailable":""}">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">Multimedia</span>
            <h2>Música</h2>
          </div>
          <span class="media-state ${r?"is-playing":""}">${this._escape(s)}</span>
        </div>
        <div class="media-body">
          <div class="media-art">${this._icon("music")}</div>
          <div class="media-copy">
            <strong>${this._escape(o)}</strong>
            <span>${this._escape(n)}</span>
            <small>${Number.isFinite(l)?`Volumen ${Math.round(l*100)}%`:"Volumen no informado"}</small>
          </div>
        </div>
        <div class="media-controls">
          ${d("volume_down","volumeDown","Bajar volumen")}
          ${d("media_previous_track","previous","Pista anterior")}
          ${d("media_play_pause",r?"pause":"play",r?"Pausar":"Reproducir",!0)}
          ${d("media_next_track","next","Pista siguiente")}
          ${d("volume_up","volumeUp","Subir volumen")}
        </div>
      </section>
    `}_renderSceneButton(t){const e=this._pendingAction===t.key,i=this._sceneStatus(t),a=e?"Aplicando...":i.active?"Activo":i.unavailable?"Sin datos":"Inactivo";return`
      <button
        class="scene ${e?"is-pending":""} ${i.active?"is-active":""} ${i.unavailable?"is-unavailable":""}"
        data-action="run-scene"
        data-scene-key="${this._escape(t.key)}"
        data-label="${this._escape(t.name)}"
        aria-pressed="${i.active}"
        aria-label="${this._escape(`${t.name}: ${a}`)}"
        ${this._pendingAction&&!e?"disabled":""}
      >
        <span class="scene-icon">${this._icon(t.icon)}</span>
        <span class="scene-copy">
          <strong>${this._escape(t.name)}</strong>
          <small>${this._escape(t.subtitle)}</small>
        </span>
        <span class="scene-state" aria-hidden="true">${this._escape(a)}</span>
      </button>
    `}_renderSceneBlock({eyebrow:t,title:e,scenes:i,className:a}){const r=this._config(),s=i.find(d=>this._sceneStatus(d).active),o=this._pendingAction===r.powerOffScript,n=r.sceneControlEntities.some(d=>{var p;return((p=this._state(d))==null?void 0:p.state)==="on"}),l=!!this._pendingAction||!n;return`
      <section class="surface scenes-card ${this._escape(a)}">
        <div class="section-heading compact-heading scenes-heading">
          <div>
            <span class="eyebrow">${this._escape(t)}</span>
            <h2>${this._escape(e)}</h2>
          </div>
          <div class="scene-heading-actions">
            <span class="scene-summary ${s?"is-active":""}">
              ${this._escape(o?"Apagando…":s?s.name:"Selección manual")}
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
        <div class="scene-grid">${i.map(d=>this._renderSceneButton(d)).join("")}</div>
      </section>
    `}_renderScenes(){const t=this._config(),e=[...t.scenes,...t.sampleScenes],i=e.find(o=>this._sceneStatus(o).active),a=this._pendingAction===t.powerOffScript,r=t.sceneControlEntities.some(o=>{var n;return((n=this._state(o))==null?void 0:n.state)==="on"}),s=!!this._pendingAction||!r;return`
      <section class="surface scenes-card quick-scenes-card">
        <div class="section-heading compact-heading scenes-heading">
          <div>
            <span class="section-kicker">Ambientes</span>
            <h2>Escenas rápidas</h2>
          </div>
          <div class="scene-heading-actions">
            <span class="scene-summary ${i?"is-active":""}">${this._escape(a?"Apagando...":i?i.name:"Manual")}</span>
            <button
              class="clear-scene-button"
              data-action="clear-scene"
              aria-label="Apagar toda la iluminación de escenas"
              title="Apagar escena"
              ${s&&!a?"disabled":""}
            >
              <span>${this._icon("power")}</span>
              <strong>${a?"Apagando...":"Apagar"}</strong>
            </button>
          </div>
        </div>
        <div class="scene-grid quick-scene-grid">${e.map(o=>this._renderSceneButton(o)).join("")}</div>
      </section>
    `}_renderGeneralControl(t=!0){const e=this._config(),i=this._pendingAction===e.powerOnScript,a=this._pendingAction===e.powerOffScript;return`
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
            <strong>${i?"Encendiendo…":"Encender todo"}</strong>
          </button>
          <button class="general-action power-off" data-action="open-power-off" ${this._pendingAction?"disabled":""}>
            <span>${this._icon("power")}</span>
            <strong>${a?"Apagando…":"Apagar todo"}</strong>
          </button>
        </div>
        ${t&&e.reflector?`
          <div class="isolated-control">
            <span class="isolated-label">Control aislado</span>
            ${this._renderDevice(e.reflector)}
          </div>
        `:""}
      </section>
    `}_renderActivity(){const t=this._energyRangeDefinition(),e=this._energyData.map(n=>Math.max(0,Number(n.change)||0)),i=e.reduce((n,l)=>n+l,0),a=e.length?i/e.length:0,r=e.length?Math.max(...e):0,s=new Date().toLocaleDateString("es-BO",{month:"short",year:"numeric"}).replace(".",""),o=this._energyRange==="day"?`${e.length} ${e.length===1?"hora":"horas"}`:this._energyRange==="month"?`${e.length} ${e.length===1?"día":"días"}`:`${e.length} ${e.length===1?"mes":"meses"}`;return`
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
            <span>${this._escape(s)} · hasta ahora</span>
          </div>
        </div>

        <div class="energy-toolbar">
          <div class="energy-tabs" role="tablist" aria-label="Período de consumo energético">
            ${[["day","Día"],["month","Mes"],["year","Año"]].map(([n,l])=>`<button class="energy-tab ${this._energyRange===n?"is-active":""}" data-action="energy-range" data-range="${n}" role="tab" aria-selected="${this._energyRange===n}">${l}</button>`).join("")}
          </div>
          <div class="energy-toolbar-actions">
            ${this._energyRange==="day"?`<div class="energy-day-nav" aria-label="Navegar por días"><button class="energy-day-step" data-action="energy-day-prev" title="Día anterior" aria-label="Día anterior">‹</button><button class="energy-day-current" data-action="energy-day-today" title="${this._energyDayOffset===0?"Hoy":"Volver a hoy"}">${this._energyDayOffset===0?"Hoy":this._energyDayOffset===-1?"Ayer":`${Math.abs(this._energyDayOffset)} d`}</button><button class="energy-day-step" data-action="energy-day-next" title="Día siguiente" aria-label="Día siguiente" ${this._energyDayOffset===0?"disabled":""}>›</button></div>`:""}
            <button class="icon-button" data-action="refresh-energy" aria-label="Actualizar consumo" title="Actualizar consumo">${this._icon("refresh")}</button>
          </div>
        </div>

        <div class="energy-summary">
          <div class="energy-stat"><small>Total del período</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(i)} kWh`}</strong><span>${this._escape(t.title)}</span></div>
          <div class="energy-stat"><small>Promedio por ${this._escape(t.intervalLabel)}</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(a)} kWh`}</strong><span>${this._escape(o)}</span></div>
          <div class="energy-stat"><small>Mayor intervalo</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(r)} kWh`}</strong><span>Pico estimado del período</span></div>
        </div>

        <div class="energy-note">9 circuitos incluidos. Potencia instalada conocida: 1.395 kW. Reflector exterior pendiente de potencia.</div>

        <div class="energy-chart-card">
          <div class="energy-chart-title"><strong>${this._energyRange==="day"?"Consumo por hora":this._energyRange==="month"?"Consumo por día":"Consumo por mes"}</strong><span>${this._escape(t.title)}</span></div>
          ${this._energyChart()}
        </div>
      </section>
    `}_renderSystem(){const t=this._config(),e=this._state(t.batteryLevel),i=Number(e==null?void 0:e.state);return`
      <section class="surface system-card">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">Infraestructura</span>
            <h2>Sistema</h2>
          </div>
        </div>
        <div class="system-grid">
          <article class="system-tile system-tile-wide ${Number.isFinite(i)?i>60?"good":i>25?"warning":"danger":"muted"}">
            <span class="system-icon">${this._icon("battery")}</span>
            <div><small>Batería Pad</small><strong>${Number.isFinite(i)?`${this._escape(i)}%`:"No disponible"}</strong></div>
          </article>
        </div>
      </section>
    `}_renderConfirmDialog(){if(!["on","off"].includes(this._confirmAction))return"";const t=this._confirmAction==="on",e=this._config(),i=t?e.powerOnScript:e.powerOffScript,a=this._pendingAction===i,r=t?"¿Encender toda la iluminación?":"¿Apagar todo el showroom?",s=t?"Se encenderán las luminarias generales del showroom. Después podrás elegir una escena o ajustar cada zona de forma individual.":"Se apagarán las luminarias generales del showroom y cualquier escena activa.",o=t?"Sí, encender":"Sí, apagar";return`
      <div class="dialog-backdrop" data-action="cancel-power-confirm">
        <section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="power-dialog-title" data-dialog-card>
          <div class="dialog-icon ${t?"is-power-on":"is-power-off"}">${this._icon(t?"bulb":"power")}</div>
          <span class="eyebrow">Confirmar acción</span>
          <h2 id="power-dialog-title">${this._escape(r)}</h2>
          <p>${this._escape(s)}</p>
          <div class="dialog-actions">
            <button class="secondary-button" data-action="cancel-power-confirm" ${a?"disabled":""}>Cancelar</button>
            <button class="primary-button ${t?"confirm-on":""}" data-action="confirm-power" ${a?"disabled":""}>${a?"Ejecutando…":this._escape(o)}</button>
          </div>
        </section>
      </div>
    `}_renderNavigation(){const t=this._config().panelKind==="general"?[["lights","spot","Iluminación"],["energy","energy","Energía"],["system","health","Sistema"]]:[["home","bulb","Inicio"],["lights","spot","Iluminación"],["energy","energy","Energía"],["system","health","Sistema"]];return`
      <nav class="view-navigation ${t.length===3?"is-general":""}" aria-label="Secciones de ${this._escape(this._config().title)}">
        ${t.map(([e,i,a])=>`
          <button
            class="view-navigation-button ${this._activeView===e?"is-active":""}"
            data-action="set-view"
            data-view="${e}"
            aria-current="${this._activeView===e?"page":"false"}"
          >
            ${this._icon(i)}
            <span>${a}</span>
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
    `}_renderActiveView(t){if(t.staticOnly)return this._renderGeneralStatic();if(this._activeView==="lights"){const e=t.panelKind==="general"?"Circuitos":"Spots";return`
        <section class="view-panel view-lights" aria-labelledby="lights-view-title">
          <header class="view-heading">
            <div><span class="section-kicker">Control directo</span><h1 id="lights-view-title">Iluminación</h1></div>
            <span>${t.spots.length+t.samples.length+(t.reflector?1:0)} circuitos</span>
          </header>
          <div class="lighting-layout">
            <section class="surface control-section spots-section">
              <div class="section-heading compact-heading"><div><h2>${e}</h2></div></div>
              <div class="device-grid">${t.spots.map(i=>this._renderDevice(i)).join("")}</div>
            </section>
            ${t.samples.length?`<section class="surface control-section samples-section">
              <div class="section-heading compact-heading"><div><h2>Muestras</h2></div></div>
              <div class="device-grid">${t.samples.map(i=>this._renderDevice(i)).join("")}</div>
            </section>`:""}
            ${t.reflector?`<section class="surface control-section reflector-section"><div class="section-heading compact-heading"><div><h2>Exterior</h2></div></div>${this._renderDevice(t.reflector)}</section>`:""}
          </div>
        </section>
      `}return this._activeView==="energy"?`<section class="view-panel view-energy" aria-label="Energía">${this._renderActivity()}</section>`:this._activeView==="system"?`
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
    `}render(){var h;if(!this.shadowRoot||!this._hass)return;this._captureEnergyChartScroll(),this.setAttribute("data-theme",this._theme);const t=this._config();this.setAttribute("data-panel-kind",t.panelKind);const e=t.staticOnly,i=this._state(t.weather),a=(i==null?void 0:i.attributes)||{},r=i==null?void 0:i.state,s=this._theme==="dark"?"claro":"oscuro",o=[...t.spots,...t.samples,...t.reflector?[t.reflector]:[]],n=o.filter(g=>this._visibleSwitchState(g.entity)==="on").length,l=(h=this._state(t.mediaPlayer))==null?void 0:h.state,d=l==="playing"?"Reproduciendo":l==="paused"?"En pausa":"Detenido",p=this._energyMonthTotal===null?"Sin datos":`${this._formatEnergy(this._energyMonthTotal)} kWh`;this.shadowRoot.innerHTML=`
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
        .view-navigation.is-general { grid-template-columns: repeat(3, auto); }
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
          :host([data-panel-kind="showroom"]) .workspace-heading > div,
          :host([data-panel-kind="lobby"]) .workspace-heading > div { display: block; }
          :host([data-panel-kind="showroom"]) .workspace-heading,
          :host([data-panel-kind="lobby"]) .workspace-heading { gap: 12px; margin-bottom: 18px; }
          :host([data-panel-kind="showroom"]) .workspace-heading h1,
          :host([data-panel-kind="lobby"]) .workspace-heading h1 { font-size: 26px; }
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
          .topbar-start { gap: 8px; }
          .brand { display: grid; min-width: 0; }
          .brand-wordmark { font-size: 15px; letter-spacing: .045em; }
          .topbar-meta { gap: 8px; }
          .header-clock strong { font-size: 22px; }
          .theme-button { width: 40px; height: 40px; flex-basis: 40px; }
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
            >${oe}</button>
            <div class="brand" aria-label="${this._escape(t.title)}">
              <strong class="brand-wordmark">WITMIND</strong>
              <span>${this._escape(t.siteLabel)}</span>
            </div>
          </div>
          ${e?"":`<div class="status-strip" aria-label="Resumen de ${this._escape(t.title)}">
            <button class="status-pill ${n?"is-active":""}" data-action="set-view" data-view="lights">
              <span class="status-pill-icon">${this._icon("bulb")}</span>
              <span><strong data-lights-summary>${n} de ${o.length}</strong><small>Luces</small></span>
            </button>
            ${t.panelKind==="general"?"":`<button class="status-pill ${l==="playing"?"is-active":""}" data-action="set-view" data-view="home">
              <span class="status-pill-icon">${this._icon("music")}</span>
              <span><strong>${this._escape(d)}</strong><small>Multimedia</small></span>
            </button>`}
            <button class="status-pill" data-action="set-view" data-view="energy">
              <span class="status-pill-icon">${this._icon("energy")}</span>
              <span><strong data-energy-summary>${this._escape(p)}</strong><small>Este mes</small></span>
            </button>
          </div>`}
          <div class="topbar-meta">
            <time class="header-clock" data-current-time>
              <strong data-clock-time>--:--</strong>
              <span data-clock-period></span>
            </time>
            <div class="header-weather" aria-label="Clima actual: ${this._escape(At[r]||r||"Sin datos")}, ${this._escape(a.temperature??"Sin datos")}${this._escape(a.temperature_unit??"°")}">
              <span aria-hidden="true">${this._escape(lt[r]||"·")}</span>
              <strong>${this._escape(a.temperature??"--")}${this._escape(a.temperature_unit??"°")}</strong>
            </div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar a tema ${s}" title="Cambiar a tema ${s}">${ce}</button>
          </div>
        </header>

        <main class="dashboard">
          <section class="workspace-heading">
            <div>
              <span class="section-kicker">${this._escape(t.subtitle)}</span>
              <h1>${this._escape(t.title)}</h1>
            </div>
            ${e?"":this._renderNavigation()}
          </section>
          ${this._renderActiveView(t)}
        </main>
      </div>

      ${this._renderConfirmDialog()}
      ${this._toast?`<div data-toast class="toast ${this._escape(this._toast.type)}" role="status">${this._escape(this._toast.message)}</div>`:""}
    `,this._updateClock(),requestAnimationFrame(()=>this._restoreEnergyChartScroll())}}customElements.get("showroom-panel")||customElements.define("showroom-panel",le);const de={"clear-night":"Noche despejada",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvia",snowy:"Nieve","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},he={"clear-night":"☾",cloudy:"☁",exceptional:"!",fog:"≋",hail:"◆",lightning:"ϟ","lightning-rainy":"ϟ",partlycloudy:"◒",pouring:"☂",rainy:"☂",snowy:"❄","snowy-rainy":"❄",sunny:"☀",windy:"≈","windy-variant":"≈"},pe='<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',ge='<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><g class="theme-icon-sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></g><path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',Ct={bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>',panel:'<rect width="18" height="18" x="3" y="3" rx="3"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',corridor:'<path d="M4 3h16v18H4V3Zm2 2v14h5V5H6Zm7 0v14h5V5h-5Z"/>',workshop:'<path d="M3 7l9-5 9 5v14H3V7Zm2 1.2V19h4v-6h6v6h4V8.2l-7-3.9-7 3.9Z"/>',power:'<path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0"/>',energy:'<path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z"/>',shield:'<path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/>',office:'<path d="M3 4h18v16H3V4Zm4 4h4v3H7V8Zm6 0h4v3h-4V8ZM7 13h4v3H7v-3Zm6 0h4v3h-4v-3Z"/>'},q=c=>`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:0}).format(c)} W`;class ue extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._started=!1,this._renderQueued=!1,this._pending=new Map,this._errors=new Map,this._pendingAction="",this._confirmAction="",this._toast="",this._toastTimer=null,this._theme=this._loadTheme(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",t=>this._handleClick(t))}set hass(t){var e;this._hass=t,this._started||(this._started=!0),this.isConnected&&((e=this.shadowRoot)!=null&&e.querySelector(".operations-shell")?this._updatePresentation():this._render())}get hass(){return this._hass}set panel(t){this._panel=t&&typeof t=="object"?t:{},this.isConnected&&this._render()}get panel(){return this._panel}set theme(t){if(t==="dark"||t==="light"){const e=this._theme!==t;this._theme=t,this.setAttribute("data-theme",t),this._saveTheme(),e&&this.isConnected&&this._queueRender()}}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._hass&&this._render()}disconnectedCallback(){this._toastTimer&&window.clearTimeout(this._toastTimer)}_kind(){return String(this._panel.panel_kind||this._panel.panelKind||"offices").toLowerCase()}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_toggleTheme(){this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))}_state(t){var e,i;return(i=(e=this._hass)==null?void 0:e.states)==null?void 0:i[t]}_isOn(t){var e;return((e=this._state(t))==null?void 0:e.state)==="on"||this._pending.get(t)==="on"}_unavailable(t){var i;const e=(i=this._state(t))==null?void 0:i.state;return!e||e==="unknown"||e==="unavailable"}_escape(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_icon(t){return`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Ct[t]||Ct.bulb}</svg>`}_devices(){const t=this._kind(),e=this._panel.power_watts||this._panel.powerWatts||this._panel.device_watts||{},i=a=>({...a,watts:a.watts??(Number(e[a.entity]||0)||void 0)});return t==="offices"?(this._panel.areas||[]).flatMap(a=>(a.devices||[]).map(i)):t==="recording"?(this._panel.switches||[]).map(i):(this._panel.zones||[]).flatMap(a=>(a.devices||(a.entities||[]).map(r=>({entity:r,name:r}))).map(i))}_powerTotal(t=this._devices()){return t.reduce((e,i)=>e+Number(i.watts||0),0)}_powerActive(t=this._devices()){return t.filter(e=>this._isOn(e.entity)).reduce((e,i)=>e+Number(i.watts||0),0)}_weather(){const t=this._state(this._panel.weather||"weather.forecast_casa");return{temperature:((t==null?void 0:t.attributes)||{}).temperature??"—",condition:de[String((t==null?void 0:t.state)||"")]||String((t==null?void 0:t.state)||"Sin datos")}}_queueRender(){this._renderQueued||(this._renderQueued=!0,requestAnimationFrame(()=>{this._renderQueued=!1,this._render()}))}_render(){var h;if(!this.shadowRoot)return;const t=this._weather(),e=this._devices(),i=this._kind(),a=this._panel.title||(i==="recording"?"Sala de grabación":i==="control"?"Control general":"Oficinas"),r=this._panel.subtitle||"Control operativo",s=e.filter(g=>this._isOn(g.entity)).length,o=this._powerActive(e),n=this._powerTotal(e),l=new Date,d=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit"}).format(l);this.setAttribute("data-kind",this._kind()),this.setAttribute("data-theme",this._theme),this.shadowRoot.innerHTML=`
      <style>
        :host{display:block;min-height:100dvh;color:var(--wit-text-primary,#f5f6f4);background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums}:host([data-theme=light]){color:#172129;background:linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)}:host([data-theme=light]) .topbar,:host([data-theme=light]) .hero,:host([data-theme=light]) .surface{background:rgba(255,255,255,.9);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .device,:host([data-theme=light]) .action,:host([data-theme=light]) .area{background:rgba(247,250,250,.95);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .device-copy small,:host([data-theme=light]) .action small,:host([data-theme=light]) .area-head small,:host([data-theme=light]) .section-head small,:host([data-theme=light]) .hero p{color:#5f6b70}:host([data-theme=light]) .metric,:host([data-theme=light]) .weather{color:#526066;background:rgba(23,33,41,.06);border-color:rgba(23,33,41,.12)}
        *{box-sizing:border-box}button{font:inherit;color:inherit}button:focus-visible{outline:2px solid var(--wit-accent,#f26522);outline-offset:2px}.operations-shell{min-height:100dvh}.topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:14px;min-height:66px;padding:12px clamp(16px,3vw,36px);border-bottom:1px solid rgba(255,255,255,.08);background:rgba(7,17,24,.84);backdrop-filter:blur(18px)}.menu{width:44px;height:44px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);cursor:pointer}.menu span,.menu span:before,.menu span:after{display:block;width:18px;height:2px;margin:auto;background:currentColor;content:""}.menu span:before{transform:translateY(-6px)}.menu span:after{transform:translateY(4px)}.brand{min-width:0}.eyebrow{display:block;color:#f26522;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.brand h1{margin:2px 0 0;font-size:clamp(20px,2.5vw,30px);letter-spacing:-.03em}.top-meta{display:flex;align-items:center;gap:10px;margin-left:auto}.weather,.metric{padding:9px 13px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.04);font-size:12px;color:#adb4b6}.weather strong,.metric strong{color:#f5f6f4;margin-right:5px}.dashboard{width:min(1480px,100%);margin:auto;padding:clamp(16px,2.5vw,32px)}.hero{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;margin-bottom:18px;padding:24px;border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.86);box-shadow:0 16px 40px rgba(0,0,0,.24)}.hero h2{margin:4px 0 0;font-size:clamp(25px,4vw,40px);letter-spacing:-.04em}.hero p{margin:7px 0 0;color:#adb4b6}.metrics{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.surface{border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.82);box-shadow:0 16px 40px rgba(0,0,0,.2);overflow:hidden}.section{margin-top:16px;padding:18px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.section-head h3{margin:0;font-size:15px}.section-head small{color:#747e82}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}.device{min-height:78px;padding:13px;display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:11px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(27,40,46,.72);text-align:left;cursor:pointer;transition:transform 160ms,background 160ms,border-color 160ms}.device:hover:not(:disabled){transform:translateY(-1px);background:rgba(255,255,255,.07);border-color:rgba(242,101,34,.42)}.device.is-on{border-color:rgba(242,101,34,.5);background:rgba(242,101,34,.12)}.device.is-error{border-color:#ef4444}.device:disabled{cursor:not-allowed;opacity:.55}.device-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:11px;background:rgba(255,255,255,.06);color:#747e82}.is-on .device-icon{color:#f26522;background:rgba(242,101,34,.14)}.device-copy strong,.device-copy small{display:block}.device-copy strong{font-size:12px}.device-copy small{margin-top:4px;color:#747e82;font-size:10px}.device-state{text-align:right;color:#adb4b6;font-size:10px}.is-on .device-state{color:#f26522}.area{padding:16px;border:1px solid rgba(255,255,255,.07);border-radius:18px;background:rgba(7,17,24,.2)}.area+.area{margin-top:12px}.area-head{display:flex;justify-content:space-between;gap:10px;margin-bottom:12px}.area-head strong{font-size:14px}.area-head small{display:block;margin-top:4px;color:#747e82}.env{display:flex;gap:8px;flex-wrap:wrap;color:#adb4b6;font-size:11px}.env span{padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.05)}.action{min-height:70px;padding:14px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(27,40,46,.72);text-align:left;cursor:pointer}.action:hover:not(:disabled){border-color:rgba(242,101,34,.42);background:rgba(255,255,255,.07)}.action.danger{border-color:rgba(239,68,68,.32)}.action strong,.action small{display:block}.action strong{font-size:12px}.action small{margin-top:5px;color:#747e82;font-size:10px}.action .action-state{margin-top:7px;color:#f26522;font-size:10px}.toast{position:fixed;z-index:20;right:18px;bottom:18px;max-width:min(420px,calc(100vw - 36px));padding:13px 16px;border:1px solid rgba(242,101,34,.45);border-radius:14px;background:#162126;color:#f5f6f4;box-shadow:0 16px 42px rgba(0,0,0,.38);font-size:12px}@media(max-width:700px){.topbar{align-items:flex-start}.top-meta{display:none}.hero{grid-template-columns:1fr;padding:18px}.metrics{justify-content:flex-start}.dashboard{padding:14px}.grid{grid-template-columns:1fr}}
      </style>
      <div class="operations-shell">
        <header class="topbar">
          <div class="topbar-start">
            <button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de navegación de Home Assistant" title="Abrir menú">${pe}</button>
            <div class="brand" aria-label="Witmind ${this._escape(a)}"><strong class="brand-wordmark">WITMIND</strong><span>WTX · MDTC</span></div>
          </div>
          <div class="status-strip" aria-label="Resumen de ${this._escape(a)}">
            <button class="status-pill ${s?"is-active":""}" type="button"><span class="status-pill-icon">${this._icon("bulb")}</span><span><strong><span data-total-on>${s}</span> de ${e.length}</strong><small>Circuitos</small></span></button>
            <button class="status-pill ${o?"is-active":""}" type="button"><span class="status-pill-icon">${this._icon("power")}</span><span><strong data-active-power>${q(o)}</strong><small>Activos</small></span></button>
            <button class="status-pill" type="button"><span class="status-pill-icon">${this._icon("energy")}</span><span><strong data-installed-power>${q(n)}</strong><small>Instalados</small></span></button>
          </div>
          <div class="topbar-meta">
            <time class="header-clock"><strong>${this._escape(d)}</strong></time>
            <div class="header-weather" aria-label="Clima actual: ${this._escape(t.condition)}, ${this._escape(t.temperature)}°"><span aria-hidden="true">${this._escape(he[String(((h=this._state(this._panel.weather||"weather.forecast_casa"))==null?void 0:h.state)||"")]||"·")}</span><strong>${this._escape(t.temperature)}°</strong></div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema" title="Cambiar tema">${ge}</button>
          </div>
        </header>
        <main class="dashboard">
          <section class="workspace-heading"><div><span class="section-kicker">${this._escape(r)}</span><h1>${this._escape(a)}</h1></div><span class="workspace-summary">${e.length} circuitos · ${q(n)}</span></section>
          ${i==="offices"?this._renderOffices():i==="recording"?this._renderRecording():this._renderControl()}
        </main>
        ${this._toast?`<div class="toast" role="status">${this._escape(this._toast)}</div>`:""}
      </div>
    `;const p=document.createElement("style");p.textContent=`
      :host {
        --primary: #f26522;
        --primary-hover: #e05413;
        --primary-soft: rgba(242, 101, 34, .12);
        --primary-border: rgba(242, 101, 34, .38);
        --primary-glow: rgba(242, 101, 34, .22);
        --background: #071118;
        --background-secondary: #10191e;
        --background-deep: #040a0f;
        --surface: rgba(16, 25, 30, .88);
        --surface-strong: rgba(27, 40, 46, .94);
        --surface-hover: rgba(255, 255, 255, .06);
        --surface-active: rgba(242, 101, 34, .12);
        --surface-control: rgba(27, 40, 46, .70);
        --text-primary: #f5f6f4;
        --text-secondary: #adb4b6;
        --text-tertiary: #747e82;
        --border-subtle: rgba(255, 255, 255, .06);
        --border-default: rgba(255, 255, 255, .09);
        --border-emphasis: rgba(255, 255, 255, .16);
        --header: rgba(16, 25, 30, .85);
        --shadow: rgba(0, 0, 0, .40);
        --radius-sm: 10px;
        --radius-md: 16px;
        --radius-lg: 22px;
        --radius-pill: 999px;
        display: block;
        min-height: 100%;
        color: var(--text-primary);
        background:
          radial-gradient(circle at 10% 4%, rgba(242, 101, 34, .08), transparent 36%),
          radial-gradient(circle at 90% 0%, rgba(16, 32, 45, .6), transparent 30%),
          linear-gradient(155deg, var(--background-deep), var(--background) 60%, var(--background-secondary));
        font-family: "Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
      }
      :host([data-theme="light"]) {
        --background: #f3f3ef;
        --background-secondary: #e6e8e3;
        --background-deep: #fff;
        --surface: rgba(255, 255, 255, .90);
        --surface-strong: rgba(255, 255, 255, .98);
        --surface-hover: rgba(0, 0, 0, .04);
        --surface-active: rgba(242, 101, 34, .10);
        --surface-control: rgba(0, 0, 0, .035);
        --text-primary: #151b1e;
        --text-secondary: #586266;
        --text-tertiary: #8a9499;
        --border-subtle: rgba(0, 0, 0, .06);
        --border-default: rgba(0, 0, 0, .09);
        --border-emphasis: rgba(0, 0, 0, .16);
        --header: rgba(255, 255, 255, .88);
        --shadow: rgba(0, 0, 0, .08);
        background:
          radial-gradient(circle at 10% 4%, rgba(242, 101, 34, .07), transparent 36%),
          radial-gradient(circle at 90% 0%, rgba(220, 230, 235, .5), transparent 30%),
          linear-gradient(155deg, var(--background-deep), var(--background) 60%, var(--background-secondary));
      }
      .operations-shell { min-height: 100%; background: transparent; }
      .topbar-start { min-width: 0; display: flex; align-items: center; gap: 12px; }
      .brand { min-width: 0; display: flex; align-items: baseline; gap: 12px; }
      .brand-wordmark { color: var(--text-primary); font-size: 17px; font-weight: 850; letter-spacing: .08em; line-height: 1; }
      .brand > span { color: var(--primary); font-size: 9px; font-weight: 800; letter-spacing: .08em; }
      .menu-button, .theme-button { width: 40px; height: 40px; flex: 0 0 40px; display: grid; place-items: center; border: 1px solid var(--border-default); border-radius: 50%; background: var(--surface-control); cursor: pointer; transition: transform 180ms, background 180ms, border-color 180ms; }
      .menu-button:hover, .theme-button:hover { background: var(--surface-hover); border-color: var(--primary-border); }
      .menu-icon { width: 20px; height: 20px; display: block; }
      .theme-icon { width: 20px; height: 20px; }
      .theme-icon-sun, .theme-icon-moon { transform-origin: center; transition: opacity 220ms, transform 220ms; }
      .theme-icon-sun { opacity: 0; transform: rotate(-50deg) scale(.65); }
      .theme-icon-moon { opacity: 1; transform: rotate(0) scale(1); }
      :host([data-theme="light"]) .theme-icon-sun { opacity: 1; transform: rotate(0) scale(1); }
      :host([data-theme="light"]) .theme-icon-moon { opacity: 0; transform: rotate(45deg) scale(.65); }
      .status-strip { display: flex; align-items: center; gap: 8px; margin-left: auto; }
      .status-pill { min-height: 42px; padding: 0 13px; display: inline-flex; align-items: center; gap: 9px; border: 1px solid var(--border-default); border-radius: var(--radius-pill); background: var(--surface-control); color: var(--text-secondary); text-align: left; cursor: default; }
      .status-pill-icon { width: 22px; height: 22px; display: grid; place-items: center; color: var(--text-tertiary); }
      .status-pill-icon .icon { width: 18px; height: 18px; }
      .status-pill span:last-child { display: grid; gap: 2px; }
      .status-pill strong, .status-pill small { display: block; white-space: nowrap; }
      .status-pill strong { color: var(--text-primary); font-size: 11px; font-weight: 800; }
      .status-pill small { color: var(--text-tertiary); font-size: 9px; font-weight: 700; }
      .status-pill.is-active { border-color: var(--primary-border); background: var(--primary-soft); }
      .status-pill.is-active .status-pill-icon, .status-pill.is-active strong { color: var(--primary); }
      .header-clock { display: inline-flex; align-items: baseline; color: var(--text-primary); white-space: nowrap; font-variant-numeric: tabular-nums; }
      .header-clock strong { font-size: 26px; font-weight: 800; letter-spacing: -.04em; }
      .header-weather { min-height: 32px; display: inline-flex; align-items: center; gap: 7px; margin-left: 8px; padding-left: 12px; border-left: 1px solid var(--border-default); color: var(--text-secondary); }
      .header-weather > span { width: 20px; height: 20px; display: grid; place-items: center; color: var(--primary); }
      .header-weather .icon { width: 17px; height: 17px; }
      .header-weather strong { color: var(--text-primary); font-size: 13px; }
      .topbar {
        min-height: 64px;
        padding: 10px clamp(16px, 2.4vw, 32px);
        gap: 16px;
        border-bottom: 1px solid var(--border-subtle);
        background: var(--header);
        box-shadow: 0 1px 0 rgba(255,255,255,.02);
      }
      .menu {
        width: 40px;
        height: 40px;
        flex: 0 0 40px;
        border-color: var(--border-default);
        background: var(--surface-control);
        color: var(--text-secondary);
      }
      .menu:hover { background: var(--surface-hover); border-color: var(--primary-border); }
      .brand { display: flex; align-items: baseline; gap: 10px; }
      .eyebrow { color: var(--primary); letter-spacing: .13em; }
      .brand h1 { color: var(--text-primary); font-weight: 800; }
      :host([data-kind="offices"]) .topbar-meta,
      :host([data-kind="recording"]) .topbar-meta,
      :host([data-kind="control"]) .topbar-meta {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 12px;
        margin-left: auto;
      }
      .top-meta { gap: 8px; }
      .weather, .metric {
        min-height: 32px;
        display: inline-flex;
        align-items: center;
        padding: 0 12px;
        border-color: var(--border-default);
        background: var(--surface-control);
        color: var(--text-secondary);
      }
      .weather strong, .metric strong { color: var(--text-primary); }
      .dashboard { width: min(1480px, 100%); padding: clamp(14px, 2vw, 28px); }
      .workspace-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
      .section-kicker { display: block; color: var(--primary); font-size: 10px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
      .workspace-heading h1, .view-heading h1 { margin: 4px 0 0; color: var(--text-primary); font-size: clamp(28px, 3.2vw, 40px); font-weight: 800; letter-spacing: -.04em; line-height: 1.05; }
      .workspace-summary, .view-heading > span { color: var(--text-tertiary); font-size: 11px; font-weight: 700; }
      .view-panel { animation: view-enter 180ms cubic-bezier(.2,.8,.2,1); }
      .view-heading { display: flex; align-items: flex-end; justify-content: space-between; gap: 20px; margin-bottom: 18px; }
      .lighting-layout { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; align-items: start; }
      .offices-section-heading { margin-bottom: 14px; }
      .offices-section-heading h2 { margin: 4px 0 0; color: var(--text-primary); font-size: 19px; font-weight: 800; letter-spacing: -.02em; }
      .offices-section-heading > span { color: var(--text-tertiary); font-size: 11px; font-weight: 700; }
      .office-section { min-width: 0; padding: 18px; }
      .office-section .section-heading {
        min-height: 46px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: start;
        gap: 12px;
        margin-bottom: 12px;
      }
      .office-section .section-heading > div:first-child { min-width: 0; }
      .office-section .section-heading h2 { margin: 4px 0 0; color: var(--text-primary); font-size: 18px; font-weight: 800; letter-spacing: -.02em; }
      .area-meta { min-height: 25px; display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 6px; color: var(--text-tertiary); font-size: 10px; font-weight: 700; }
      .area-meta:empty { display: none; }
      .area-meta span { min-height: 25px; display: inline-flex; align-items: center; padding: 5px 9px; border: 1px solid var(--border-default); border-radius: var(--radius-pill); background: var(--surface-control); white-space: nowrap; line-height: 1; }
      .area-description { margin: -4px 0 12px; color: var(--text-tertiary); font-size: 10px; line-height: 1.4; }
      .device-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
      .hero {
        min-height: 104px;
        margin: 0 0 14px;
        padding: 18px 24px;
        border: 1px solid var(--border-subtle);
        border-radius: var(--radius-lg);
        background:
          radial-gradient(circle at 92% 16%, rgba(242, 101, 34, .10), transparent 36%),
          var(--surface);
        box-shadow: 0 16px 40px var(--shadow), inset 0 1px 0 rgba(255,255,255,.03);
        backdrop-filter: blur(20px);
      }
      .hero h2 { color: var(--text-primary); font-weight: 800; }
      .hero p { color: var(--text-secondary); line-height: 1.5; }
      .metrics { gap: 8px; }
      .surface {
        margin-top: 14px;
        border-color: var(--border-subtle);
        border-radius: var(--radius-lg);
        background: var(--surface);
        box-shadow: 0 16px 40px var(--shadow), inset 0 1px 0 rgba(255,255,255,.03);
        backdrop-filter: blur(20px);
      }
      .section { padding: 20px; }
      .section-head { margin-bottom: 16px; }
      .section-head h3 { color: var(--text-primary); font-size: 18px; letter-spacing: -.02em; }
      .section-head small, .area-head small, .device-copy small, .action small { color: var(--text-tertiary); }
      .area {
        padding: 18px 0 0;
        border: 0;
        border-top: 1px solid var(--border-subtle);
        border-radius: 0;
        background: transparent;
      }
      .area:first-of-type { padding-top: 2px; border-top: 0; }
      .area + .area { margin-top: 18px; }
      .area-head { margin-bottom: 12px; }
      .area-head strong { color: var(--text-primary); font-size: 14px; }
      .env span { border: 1px solid var(--border-default); background: var(--surface-control); color: var(--text-secondary); }
      .grid { gap: 10px; }
      .device, .action {
        min-height: 70px;
        padding: 12px 14px;
        display: grid;
        grid-template-columns: 36px minmax(0, 1fr) 32px;
        align-items: center;
        gap: 10px;
        border-color: var(--border-default);
        border-radius: 14px;
        background: var(--surface-control);
        color: var(--text-primary);
        transition: transform 180ms cubic-bezier(.2,.8,.2,1), background 180ms, border-color 180ms, box-shadow 180ms;
      }
      .device:hover:not(:disabled), .action:hover:not(:disabled) { border-color: var(--primary-border); background: var(--surface-hover); transform: translateY(-1px); }
      .device.is-on { border-color: var(--primary-border); background: var(--surface-active); box-shadow: 0 4px 20px var(--primary-glow); }
      .device.is-on { box-shadow: inset 3px 0 0 var(--primary); }
      .device.is-pending { animation: pulse 1.1s ease-in-out infinite alternate; }
      .device-icon { background: var(--surface-control); color: var(--text-tertiary); }
      .is-on .device-icon { color: var(--primary); background: var(--primary-soft); }
      .device-copy strong, .action strong { color: var(--text-primary); }
      .device-copy strong, .device-copy small { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .device-copy strong { font-size: 12px; font-weight: 680; }
      .device-copy small { margin-top: 2px; font-size: 9px; font-weight: 540; }
      .device.is-on .device-copy small { color: var(--primary); }
      .device-state { color: var(--text-secondary); }
      .is-on .device-state, .action .action-state { color: var(--primary); }
      .device-switch { width: 32px; height: 18px; padding: 2px; display: flex; align-items: center; border: 1px solid var(--border-default); border-radius: 999px; background: var(--surface-control); }
      .device-switch i { width: 12px; height: 12px; border-radius: 50%; background: var(--text-tertiary); transition: transform 180ms, background 180ms; }
      .device.is-on .device-switch { border-color: var(--primary-border); background: rgba(242,101,34,.20); }
      .device.is-on .device-switch i { transform: translateX(14px); background: var(--primary); }
      .action.danger { border-color: rgba(239, 68, 68, .34); }
      /* Actions use the same readable card pattern as Showroom's quick actions.
         They must not inherit the three-column circuit grid. */
      .control-actions { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
      .control-actions .action { min-height: 78px; padding: 12px 14px; display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; align-items: center; gap: 10px; text-align: left; }
      .action-icon { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 11px; color: var(--primary); background: var(--primary-soft); }
      .action-icon .icon { width: 18px; height: 18px; }
      .action-icon.is-danger { color: #ef4444; background: rgba(239,68,68,.12); }
      .action-copy { min-width: 0; }
      .action-copy strong, .action-copy small { display: block; overflow: hidden; text-overflow: ellipsis; white-space: normal; }
      .action-copy strong { font-size: 12px; line-height: 1.2; }
      .action-copy small { margin-top: 4px; font-size: 10px; line-height: 1.3; }
      .control-actions .action-state { margin: 0; max-width: 72px; color: var(--primary); font-size: 10px; font-weight: 700; line-height: 1.25; text-align: right; }
      .control-actions .danger .action-state { color: #ef4444; }
      .section-head > .compact-action, .compact-action { min-height: 42px; padding: 8px 14px; display: inline-flex; grid-template-columns: none; align-items: center; justify-content: center; gap: 8px; white-space: nowrap; }
      .compact-action .action-icon { width: 22px; height: 22px; border-radius: 7px; }
      .compact-action .action-icon .icon { width: 14px; height: 14px; }
      .section-footnote { margin-top: 18px; margin-bottom: 0; }
      .section-footnote small { line-height: 1.45; }
      .toast .compact-action { min-height: 36px; margin-left: 8px; padding: 7px 10px; }
      .toast { border-color: var(--primary-border); background: var(--surface-strong); color: var(--text-primary); box-shadow: 0 16px 42px var(--shadow); }
      @keyframes view-enter { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }
      @keyframes pulse { from { opacity: .65; } to { opacity: 1; } }
      @media (max-width: 960px) { .status-strip { display: none; } .lighting-layout { grid-template-columns: 1fr; } }
      @media (max-width: 760px) {
        :host([data-kind="offices"]) .topbar,
        :host([data-kind="recording"]) .topbar,
        :host([data-kind="control"]) .topbar {
          min-height: 68px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
        }
        :host([data-kind="offices"]) .topbar-start,
        :host([data-kind="recording"]) .topbar-start,
        :host([data-kind="control"]) .topbar-start {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        :host([data-kind="offices"]) .brand,
        :host([data-kind="recording"]) .brand,
        :host([data-kind="control"]) .brand { display: flex; align-items: baseline; gap: 0; }
        :host([data-kind="offices"]) .brand > span,
        :host([data-kind="recording"]) .brand > span,
        :host([data-kind="control"]) .brand > span,
        :host([data-kind="offices"]) .header-weather,
        :host([data-kind="recording"]) .header-weather,
        :host([data-kind="control"]) .header-weather { display: none; }
        :host([data-kind="offices"]) .menu-button,
        :host([data-kind="recording"]) .menu-button,
        :host([data-kind="control"]) .menu-button,
        :host([data-kind="offices"]) .theme-button,
        :host([data-kind="recording"]) .theme-button,
        :host([data-kind="control"]) .theme-button { width: 44px; height: 44px; }
        :host([data-kind="offices"]) .header-clock strong,
        :host([data-kind="recording"]) .header-clock strong,
        :host([data-kind="control"]) .header-clock strong { font-size: 24px; }
        :host([data-kind="offices"]) .workspace-heading,
        :host([data-kind="recording"]) .workspace-heading,
        :host([data-kind="control"]) .workspace-heading {
          display: flex;
          align-items: flex-end;
          gap: 14px;
          margin-bottom: 16px;
        }
        :host([data-kind="offices"]) .workspace-heading h1,
        :host([data-kind="recording"]) .workspace-heading h1,
        :host([data-kind="control"]) .workspace-heading h1 { font-size: 26px; }
        :host([data-kind="offices"]) .workspace-summary,
        :host([data-kind="recording"]) .workspace-summary,
        :host([data-kind="control"]) .workspace-summary { margin-left: auto; text-align: right; }
      }
      @media (max-width: 700px) {
        .brand { display: block; }
        .brand-wordmark { font-size: 16px; }
        .brand > span { display: none; }
        .topbar { min-height: 68px; padding: 10px 14px; gap: 10px; }
        .topbar-meta { gap: 6px; }
        .header-clock strong { font-size: 22px; }
        .header-weather { display: none; }
        .workspace-heading { display: grid; gap: 14px; align-items: stretch; }
        .view-heading { align-items: flex-start; }
        .section { padding: 16px; }
        .dashboard { padding: 14px; }
        .device-grid { grid-template-columns: 1fr; }
        .control-actions { grid-template-columns: 1fr; }
      }
      @media (max-width: 420px) {
        .office-section .section-heading { grid-template-columns: 1fr; gap: 8px; }
        .area-meta { justify-content: flex-start; }
      }
      @media (min-width: 701px) and (max-width: 1100px) { .control-actions { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
    `,this.shadowRoot.append(p)}_renderOffices(){const t=this._panel.areas||[];return`<section class="view-panel offices-view" aria-label="Zonas operativas"><div class="section-heading compact-heading offices-section-heading"><div><span class="section-kicker">Zonas operativas</span><h2>Distribución de circuitos</h2></div><span>${t.reduce((i,a)=>i+(a.devices||[]).length,0)} circuitos</span></div><div class="lighting-layout offices-layout">${t.map(i=>{var n,l;const a=i.devices||[],r=i.environment||{},s=r.temperature?(n=this._state(r.temperature))==null?void 0:n.state:"",o=r.humidity?(l=this._state(r.humidity))==null?void 0:l.state:"";return`<section class="surface control-section office-section"><div class="section-heading compact-heading"><div><span class="eyebrow">Zona</span><h2>${this._escape(i.name)}</h2></div><div class="area-meta">${s?`<span>${this._escape(s)} °C</span>`:""}${o?`<span>${this._escape(o)} % HR</span>`:""}</div></div>${i.subtitle||i.descriptor?`<p class="area-description">${this._escape(i.subtitle||i.descriptor)}</p>`:""}<div class="device-grid">${a.map(d=>this._renderDevice(d)).join("")}</div></section>`}).join("")}</div></section>`}_renderRecording(){const t=this._panel.switches||[];return`<section class="surface section"><div class="section-head"><div><span class="eyebrow">Cuatro circuitos</span><h3>Sala de grabación</h3></div><button class="action compact-action danger" data-action="run-action" data-action-id="recording-off"><span class="action-icon">${this._icon("power")}</span><span>Apagar todo</span></button></div><div class="grid">${t.map(e=>this._renderDevice(e)).join("")}</div><div class="section-head section-footnote"><small>Estimación instalada: ${q(this._powerTotal(t))}. El valor representa potencia nominal, no consumo medido.</small></div></section>`}_renderControl(){return`<section class="surface section"><div class="section-head"><div><span class="eyebrow">Escenas y rutinas</span><h3>Control general</h3></div><small>Acciones verificadas</small></div><div class="control-actions">${[...this._panel.main_actions||[],...this._panel.daily_actions||[],...this._panel.danger_action?[this._panel.danger_action]:[]].map(e=>`<button class="action ${e.tone==="danger"?"danger":""}" data-action="run-action" data-action-id="${this._escape(e.id)}" ${this._pendingAction&&this._pendingAction!==e.id?"disabled":""}><span class="action-icon ${e.tone==="danger"?"is-danger":""}">${this._icon(e.icon||(e.tone==="danger"?"power":"bulb"))}</span><span class="action-copy"><strong>${this._escape(e.name)}</strong><small>${this._escape(e.subtitle||"Rutina operativa")}</small></span><span class="action-state">${this._pendingAction===e.id?"Aplicando…":e.tone==="danger"?"Confirmar":"Lista"}</span></button>`).join("")}</div></section><section class="surface section"><div class="section-head"><div><span class="eyebrow">Resumen de zonas</span><h3>Estado actual</h3></div></div>${(this._panel.zones||[]).map(e=>{const i=e.entities||[],a=i.filter(r=>this._isOn(r)).length;return`<div class="area"><div class="area-head"><div><strong>${this._escape(e.name)}</strong><small>${a} de ${i.length} circuitos activos</small></div><span class="device-state">${a?"Activo":"Apagado"}</span></div></div>`}).join("")}</section>${this._confirmAction?`<div class="toast" role="alert"><strong>¿Confirmar ${this._escape(this._confirmAction)}?</strong><button class="action compact-action" data-action="confirm-action" data-action-id="${this._escape(this._confirmAction)}">Confirmar</button><button class="action compact-action" data-action="cancel-action">Cancelar</button></div>`:""}`}_renderDevice(t){const e=this._isOn(t.entity),i=this._unavailable(t.entity),a=this._pending.has(t.entity),r=this._errors.get(t.entity),s=r||(a?e?"Encendiendo…":"Apagando…":i?"No disponible":e?"Encendido":"Apagado");return`<button class="device ${e?"is-on":""} ${a?"is-pending":""} ${r?"is-error":""}" data-action="toggle-switch" data-entity="${this._escape(t.entity)}" aria-pressed="${String(e)}" aria-label="${this._escape(`${t.name}: ${s}`)}" ${i||a?"disabled":""}><span class="device-icon">${this._icon(t.icon||"bulb")}</span><span class="device-copy"><strong>${this._escape(t.name)}</strong><small><span data-device-status="${this._escape(t.entity)}">${this._escape(s)}</span>${t.watts?` · ${q(t.watts)}`:""}</small></span><span class="device-switch" aria-hidden="true"><i></i></span></button>`}_updatePresentation(){var a,r,s,o,n;(a=this.shadowRoot)==null||a.querySelectorAll("[data-action=toggle-switch]").forEach(l=>{const d=l.dataset.entity||"",p=this._isOn(d),h=this._unavailable(d),g=this._pending.has(d),u=this._errors.get(d);l.classList.toggle("is-on",p),l.classList.toggle("is-error",!!u),l.disabled=h||g,l.setAttribute("aria-pressed",String(p));const _=l.querySelector("[data-device-status]");_&&(_.textContent=u||(g?p?"Encendiendo…":"Apagando…":h?"No disponible":p?"Encendido":"Apagado"))});const t=this._devices(),e=(r=this.shadowRoot)==null?void 0:r.querySelector("[data-total-on]"),i=(s=this.shadowRoot)==null?void 0:s.querySelector("[data-active-power]");e&&(e.textContent=String(t.filter(l=>this._isOn(l.entity)).length)),i&&(i.textContent=q(this._powerActive(t))),(o=e==null?void 0:e.closest(".status-pill"))==null||o.classList.toggle("is-active",t.some(l=>this._isOn(l.entity))),(n=i==null?void 0:i.closest(".status-pill"))==null||n.classList.toggle("is-active",this._powerActive(t)>0)}_handleClick(t){const e=t.target.closest("[data-action]");if(!e||!this._hass)return;const i=e.dataset.action;if(i==="toggle-menu"){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}));return}if(i==="toggle-theme"){this._toggleTheme();return}if(i==="toggle-switch"){this._toggleSwitch(e.dataset.entity||"");return}if(i==="run-action"){const a=e.dataset.actionId||"",r=this._findAction(a);(r==null?void 0:r.tone)==="danger"?this._confirmAction=a:this._executeAction(r),this._queueRender();return}if(i==="confirm-action"){const a=this._findAction(e.dataset.actionId||this._confirmAction);this._confirmAction="",this._executeAction(a),this._queueRender();return}i==="cancel-action"&&(this._confirmAction="",this._queueRender())}_findAction(t){const e=[...this._panel.main_actions||[],...this._panel.daily_actions||[],...this._panel.danger_action?[this._panel.danger_action]:[]];return t==="recording-off"?{id:t,name:"Apagar todo",subtitle:"Apaga los cuatro circuitos",tone:"danger",off_entities:(this._panel.switches||[]).map(i=>i.entity)}:e.find(i=>i.id===t)||null}async _toggleSwitch(t){var i;if(!t||this._pending.has(t)||!((i=this._hass)!=null&&i.callService))return;const e=this._isOn(t)?"off":"on";this._pending.set(t,e),this._errors.delete(t),this._updatePresentation();try{const[a]=t.split(".");if(await this._hass.callService(a,e==="on"?"turn_on":"turn_off",{entity_id:t}),!await this._waitForState(t,e))throw new Error("Home Assistant no confirmó el estado solicitado")}catch(a){this._errors.set(t,a instanceof Error?a.message:"No se pudo cambiar el circuito"),this._showToast(this._errors.get(t)||"No se pudo cambiar el circuito")}finally{this._pending.delete(t),this._updatePresentation()}}async _executeAction(t){var i;if(!t||this._pendingAction||!((i=this._hass)!=null&&i.callService))return;this._pendingAction=t.id,this._queueRender();const e=new Map;(t.on_entities||[]).forEach(a=>e.set(a,"on")),(t.off_entities||[]).forEach(a=>e.set(a,"off"));try{for(const r of t.service_entities||[]){const[s]=r.split(".");await this._hass.callService(s,"turn_on",{entity_id:r})}for(const[r,s]of e){const[o]=r.split(".");await this._hass.callService(o,s==="on"?"turn_on":"turn_off",{entity_id:r})}if((await Promise.all([...e].map(([r,s])=>this._waitForState(r,s)))).some(r=>!r))throw new Error("No todos los circuitos confirmaron el cambio");this._showToast(`${t.name} aplicado.`)}catch(a){this._showToast(a instanceof Error?a.message:"No se pudo ejecutar la acción")}finally{this._pendingAction="",this._queueRender()}}async _waitForState(t,e){var i;for(let a=0;a<20;a+=1){if(((i=this._state(t))==null?void 0:i.state)===e)return!0;await new Promise(r=>window.setTimeout(r,250))}return!1}_showToast(t){this._toast=t,this._toastTimer&&window.clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>{this._toast="",this._queueRender()},4200),this._queueRender()}}customElements.get("witmind-operations-panel")||customElements.define("witmind-operations-panel",ue);const M=c=>String(c??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),V=(c,t=[])=>{if(Array.isArray(c))return c;for(const e of t)if(Array.isArray(c==null?void 0:c[e]))return c[e];return[]},me='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',_e='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';class fe extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._loaded=!1,this._loading=!1,this._error="",this._calendar=[],this._rules=[],this._targets=[],this._sensors=[],this._history=[],this._theme=this._loadTheme(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",t=>this._click(t)),this.shadowRoot.addEventListener("submit",t=>this._submit(t))}set hass(t){var e;this._hass=t,this.isConnected&&((e=this.shadowRoot)!=null&&e.querySelector(".admin-shell")||this._render(),this._applyThemeStyles(),t&&!this._loaded&&this._load())}get hass(){return this._hass}set panel(t){this._panel=t||{},this._loaded=!1,this.isConnected&&(this._render(),this._applyThemeStyles(),this._hass&&this._load())}get panel(){return this._panel}set theme(t){if(t==="dark"||t==="light"){const e=this._theme!==t;this._theme=t,this.setAttribute("data-theme",t),this._saveTheme(),e&&this.isConnected&&(this._render(),this._applyThemeStyles())}}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._render(),this._applyThemeStyles(),this._hass&&!this._loaded&&this._load()}disconnectedCallback(){var t;(t=this._unsubscribe)==null||t.call(this)}_kind(){return String(this._panel.panel_kind||this._panel.panelKind||"calendar").toLowerCase()}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_toggleTheme(){this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))}_applyThemeStyles(){var i,a;const t=this._theme==="light";this.style.color=t?"#172129":"",this.style.background=t?"linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)":"";const e=(i=this.shadowRoot)==null?void 0:i.querySelector(".topbar");e&&!e.querySelector("[data-action=toggle-theme]")&&e.insertAdjacentHTML("beforeend",`<button class="menu" data-action="toggle-theme" aria-label="Cambiar tema">${this._theme==="dark"?"☼":"☾"}</button>`),(a=this.shadowRoot)==null||a.querySelectorAll(".topbar,.hero,.surface,.row").forEach(r=>{r.style.background=t?"rgba(255,255,255,.92)":"",r.style.borderColor=t?"rgba(23,33,41,.12)":"",r.style.color=t?"#172129":""})}_title(){return this._kind()==="notifications"?"Notificaciones Witmind":"Calendario laboral"}_subtitle(){return this._kind()==="notifications"?"Centro de avisos":"Planificación operativa"}_admin(){var t,e;return((e=(t=this._hass)==null?void 0:t.user)==null?void 0:e.is_admin)!==!1}async _request(t,e={}){var a,r;const i=(r=(a=this._hass)==null?void 0:a.connection)==null?void 0:r.sendMessagePromise;if(!i)throw new Error("Conexión de Home Assistant no disponible");return i({type:t,...e})}async _load(){var t,e,i;if(!this._loading){this._loading=!0,this._error="",this._render();try{if(this._kind()==="notifications"){const[a,r,s,o]=await Promise.all([this._request("witmind_notifications/rules/list"),this._request("witmind_notifications/targets/list"),this._request("witmind_notifications/sensors/list"),this._request("witmind_notifications/history/list",{limit:150})]);this._rules=V(a,["rules"]),this._targets=V(r,["targets"]),this._sensors=V(s,["sensors"]),this._history=V(o,["history","items"]);try{this._unsubscribe=await((i=(e=(t=this._hass)==null?void 0:t.connection)==null?void 0:e.subscribeEvents)==null?void 0:i.call(e,()=>void this._load(),"witmind_notifications_updated"))}catch{}}else{const a=await this._request("calendario_laboral/get");this._calendar=V(a,["holidays","records","items","events"]).slice().sort((r,s)=>String((r==null?void 0:r.date)||"").localeCompare(String((s==null?void 0:s.date)||"")))}this._loaded=!0}catch(a){this._error=a instanceof Error?a.message:"No se pudieron cargar los datos"}finally{this._loading=!1,this._render()}}}_render(){if(!this.shadowRoot)return;const t=this._kind();this.setAttribute("data-theme",this._theme),this.setAttribute("data-kind",t);const e=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",timeZone:"America/La_Paz"}).format(new Date),i=`<header class="topbar signature-topbar"><div class="signature-topbar-start"><button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${me}</button><div class="signature-brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div></div><div class="signature-topbar-end"><time class="signature-clock">${M(e)}</time><button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${_e}</button></div></header>`,a=`<section class="admin-heading"><div><span class="eyebrow">${M(this._subtitle())}</span><h1>${M(this._title())}</h1><p>${M(this._panel.description||(t==="calendar"?"Días laborables gestionados desde Home Assistant.":"Información conectada a Home Assistant."))}</p></div><button class="refresh" data-action="refresh">Actualizar</button></section>`;this.shadowRoot.innerHTML=`<style>
      :host{display:block;min-height:100dvh;color:#f5f6f4;background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif}*{box-sizing:border-box}button,input,textarea{font:inherit;color:inherit}button:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid #f26522;outline-offset:2px}.admin-shell{min-height:100dvh}.topbar{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:14px;min-height:66px;padding:12px clamp(16px,3vw,36px);border-bottom:1px solid rgba(255,255,255,.08);background:rgba(7,17,24,.84);backdrop-filter:blur(18px)}.menu{width:44px;height:44px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);cursor:pointer}.menu span,.menu span:before,.menu span:after{display:block;width:18px;height:2px;margin:auto;background:currentColor;content:""}.menu span:before{transform:translateY(-6px)}.menu span:after{transform:translateY(4px)}.brand h1{margin:2px 0 0;font-size:clamp(20px,2.5vw,30px);letter-spacing:-.03em}.eyebrow{color:#f26522;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.dashboard{width:min(1200px,100%);margin:auto;padding:clamp(16px,3vw,34px)}.hero,.surface{border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.84);box-shadow:0 16px 40px rgba(0,0,0,.2)}.hero{display:flex;align-items:center;justify-content:space-between;gap:18px;padding:24px;margin-bottom:16px}.hero h2{margin:5px 0 0;font-size:clamp(26px,4vw,42px);letter-spacing:-.04em}.hero p{margin:8px 0 0;color:#adb4b6}.refresh,.primary,.danger,.small{border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:11px 14px;background:rgba(255,255,255,.05);cursor:pointer}.primary{background:#f26522;border-color:#f26522;color:#111}.danger{border-color:rgba(239,68,68,.5);color:#ff9b9b}.small{padding:7px 10px;font-size:11px}.surface{padding:18px}.surface+.surface{margin-top:14px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.section-head h3{margin:4px 0 0;font-size:16px}.muted{color:#adb4b6;font-size:12px}.list{display:grid;gap:9px}.row{display:grid;grid-template-columns:1fr auto;align-items:center;gap:14px;padding:13px;border:1px solid rgba(255,255,255,.08);border-radius:14px;background:rgba(27,40,46,.72)}.row strong,.row small{display:block}.row strong{color:#f5f6f4}.row small{margin-top:4px;color:#adb4b6;font-size:11px}.row-actions{display:flex;gap:7px;flex-wrap:wrap;justify-content:flex-end}.small.is-active{color:#f26522;border-color:rgba(242,101,34,.42)}.small.is-muted{color:#adb4b6}.form{display:grid;grid-template-columns:repeat(3,1fr) auto;gap:9px;margin-top:14px}.form input,.form textarea{width:100%;padding:11px 12px;border:1px solid rgba(255,255,255,.12);border-radius:11px;background:rgba(7,17,24,.75)}.form textarea{min-height:42px;resize:vertical}.error{padding:12px;border:1px solid rgba(239,68,68,.5);border-radius:12px;color:#ff9b9b;background:rgba(100,20,20,.18)}.empty{padding:28px;text-align:center;color:#adb4b6}:host([data-theme=light]){color:#172129;background:linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)}:host([data-theme=light]) .topbar{background:rgba(255,255,255,.9);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .hero,:host([data-theme=light]) .surface{background:rgba(255,255,255,.9);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .row{background:rgba(247,250,250,.95);border-color:rgba(23,33,41,.12)}:host([data-theme=light]) .row strong{color:#172129}:host([data-theme=light]) .row small,:host([data-theme=light]) .hero p,:host([data-theme=light]) .muted,:host([data-theme=light]) .empty{color:#5f6b70}:host([data-theme=light]) .form input,:host([data-theme=light]) .form textarea{background:#f7fafa;border-color:rgba(23,33,41,.16);color:#172129}@media(max-width:700px){.hero{align-items:flex-start;flex-direction:column;padding:18px}.form{grid-template-columns:1fr}.row{grid-template-columns:1fr}.row-actions{justify-content:flex-start}}:host([data-kind=calendar]) .calendar-topbar{min-height:80px;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:12px clamp(18px,2.6vw,48px)}.calendar-topbar-start,.calendar-topbar-end{display:flex;align-items:center;gap:12px}.calendar-topbar-end{justify-content:flex-end}.menu-button,.theme-button{width:48px;height:48px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);color:inherit;cursor:pointer}.menu-button svg,.theme-button svg{width:20px;height:20px}.calendar-brand{display:flex;align-items:baseline;gap:10px}.calendar-brand strong{font-size:18px;letter-spacing:.06em}.calendar-brand span{color:#f26522;font-size:9px;font-weight:800}.calendar-clock{font-size:28px;font-weight:600;letter-spacing:-.05em}.calendar-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:8px 0 18px}.calendar-heading h1{margin:4px 0 0;font-size:clamp(30px,4vw,44px);letter-spacing:-.045em;line-height:1.05}.calendar-heading p{max-width:650px;margin:7px 0 0;color:#adb4b6;font-size:12px;line-height:1.55}:host([data-theme=light]) .menu-button,:host([data-theme=light]) .theme-button{border-color:rgba(23,33,41,.14);background:rgba(247,250,250,.96)}:host([data-theme=light]) .calendar-heading p{color:#526066}:host([data-theme=light]) .calendar-heading .refresh{border-color:rgba(23,33,41,.14);background:rgba(247,250,250,.96);color:#172129}:host([data-kind=calendar]) .calendar-surface{margin-top:0}@media(max-width:760px){:host([data-kind=calendar]) .calendar-topbar{min-height:68px;padding:10px 14px}.menu-button,.theme-button{width:44px;height:44px}.calendar-brand{gap:0}.calendar-brand span{display:none}.calendar-clock{font-size:24px}.dashboard{padding:16px 14px 90px}.calendar-heading{display:grid;align-items:stretch;gap:12px;margin:4px 0 18px}.calendar-heading h1{font-size:26px}.calendar-heading p{max-width:none}.calendar-heading .refresh{justify-self:end}}
      .signature-topbar{min-height:80px;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;padding:12px clamp(18px,2.6vw,48px)}
      .signature-topbar-start,.signature-topbar-end{display:flex;align-items:center;gap:12px}
      .signature-topbar-end{justify-content:flex-end}
      .signature-brand{display:flex;align-items:baseline;gap:10px}
      .signature-brand strong{font-size:18px;letter-spacing:.06em}
      .signature-brand span{color:#f26522;font-size:9px;font-weight:800}
      .signature-clock{font-size:28px;font-weight:600;letter-spacing:-.05em}
      .admin-heading{display:flex;align-items:flex-end;justify-content:space-between;gap:18px;margin:8px 0 18px}
      .admin-heading h1{margin:4px 0 0;font-size:clamp(30px,4vw,44px);letter-spacing:-.045em;line-height:1.05}
      .admin-heading p{max-width:650px;margin:7px 0 0;color:#adb4b6;font-size:12px;line-height:1.55}
      :host([data-theme=light]) .admin-heading p{color:#526066}
      :host([data-theme=light]) .admin-heading .refresh{border-color:rgba(23,33,41,.14);background:rgba(247,250,250,.96);color:#172129}
      @media(max-width:760px){
        .signature-topbar{min-height:68px;padding:10px 14px}
        .signature-brand{gap:0}
        .signature-brand span{display:none}
        .signature-clock{font-size:24px}
        .admin-heading{display:grid;grid-template-columns:minmax(0,1fr);align-items:stretch;justify-content:stretch;gap:12px;margin:4px 0 18px}
        .admin-heading h1{font-size:26px}
        .admin-heading p{max-width:none}
        .admin-heading .refresh{justify-self:end}
      }
    </style><div class="admin-shell">${i}<main class="dashboard">${a}${this._error?`<div class="error">${M(this._error)}</div>`:this._loading?'<section class="surface empty">Cargando datos de Home Assistant…</section>':t==="notifications"?this._renderNotifications():this._renderCalendar()}</main></div>`}_renderCalendar(){const t=e=>{const i=String(e||""),a=/^\d{4}-\d{2}-\d{2}$/.test(i)?new Date(`${i}T12:00:00`):new Date(i);return Number.isNaN(a.getTime())?i||"Sin fecha":new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"short",year:"numeric",timeZone:"America/La_Paz"}).format(a)};return`<section class="surface calendar-surface"><div class="section-head"><div><span class="eyebrow">Días laborables</span><h3>Calendario</h3></div><span class="muted">${this._calendar.length} registros precargados</span></div>${this._calendar.length?`<div class="list">${this._calendar.map(e=>`<article class="row"><div><strong>${M(e.name||e.title||"Día laboral")}</strong><small>${M(t(e.date))}${e.description?` · ${M(e.description)}`:""}</small></div><div class="row-actions"><button class="small ${e.active===!1?"is-muted":"is-active"}" data-action="toggle-calendar" data-id="${M(e.id??e.record_id)}">${e.active===!1?"Activar":"Activo"}</button>${this._admin()?`<button class="small danger" data-action="delete-calendar" data-id="${M(e.id??e.record_id)}">Eliminar</button>`:""}</div></article>`).join("")}</div>`:'<div class="empty">No hay registros configurados.</div>'}<form class="form" data-form="calendar"><input name="date" type="date" required><input name="name" placeholder="Nombre del día" required><input name="description" placeholder="Descripción"><button class="primary" type="submit">Añadir</button></form></section>`}_renderNotifications(){return`<section class="surface"><div class="section-head"><div><span class="eyebrow">Reglas activas</span><h3>Notificaciones</h3></div><span class="muted">${this._rules.length} reglas · ${this._targets.length} destinos · ${this._sensors.length} sensores</span></div>${this._rules.length?`<div class="list">${this._rules.map(t=>{const e=t.id??t.rule_id,i=t.enabled!==!1,a=this._targets[0];return`<article class="row"><div><strong>${M(t.name||t.title||t.id||"Regla")}</strong><small>${M(t.description||t.sensor||t.entity_id||(i?"Activa":"Desactivada"))}</small></div><div class="row-actions"><button class="small" data-action="toggle-rule" data-id="${M(e)}" data-enabled="${String(i)}">${i?"Desactivar":"Activar"}</button>${a?`<button class="small" data-action="test-target" data-key="${M(a.key??a.id??a.device_id??"")}">Probar</button>`:""}${this._admin()?`<button class="small danger" data-action="delete-rule" data-id="${M(e)}">Eliminar</button>`:""}</div></article>`}).join("")}</div>`:'<div class="empty">No hay reglas disponibles.</div>'}</section><section class="surface"><div class="section-head"><div><span class="eyebrow">Destinos</span><h3>Canales de aviso</h3></div></div>${this._targets.length?`<div class="list">${this._targets.map(t=>`<div class="row"><div><strong>${M(t.name||t.alias||t.key||t.device_id||"Destino")}</strong><small>${M(t.notify_entity_id||t.legacy_service||t.device_id||"Canal configurado")}</small></div><button class="small" data-action="test-target" data-key="${M(t.key??t.id??t.device_id??"")}">Enviar prueba</button></div>`).join("")}</div>`:'<div class="empty">No hay destinos configurados.</div>'}</section><section class="surface"><div class="section-head"><div><span class="eyebrow">Actividad reciente</span><h3>Historial</h3></div><span class="muted">${this._history.length} eventos</span></div>${this._history.length?`<div class="list">${this._history.slice(0,12).map(t=>`<div class="row"><div><strong>${M(t.title||t.message||t.rule_name||"Aviso")}</strong><small>${M(t.created_at||t.timestamp||t.date||"")}</small></div></div>`).join("")}</div>`:'<div class="empty">Sin eventos recientes.</div>'}</section>`}_click(t){const e=t.target.closest("button[data-action]");if(!e)return;const i=e.dataset.action;i==="toggle-menu"?this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0})):i==="toggle-theme"?this._toggleTheme():i==="refresh"?this._load():i==="toggle-calendar"?this._calendarAction(e.dataset.id||"",e):i==="delete-calendar"?this._calendarAction(e.dataset.id||"",e,!0):i==="toggle-rule"?this._ruleAction("toggle",e.dataset.id||"",e.dataset.enabled==="true"):i==="test-target"?this._testTarget(e.dataset.key||""):i==="delete-rule"&&this._ruleAction("delete",e.dataset.id||"")}_submit(t){const e=t.target;if(e.dataset.form!=="calendar")return;t.preventDefault();const i=new FormData(e);this._request("calendario_laboral/add",{date:i.get("date"),name:i.get("name"),description:i.get("description"),active:!0}).then(()=>this._load()).catch(a=>{this._error=a instanceof Error?a.message:"No se pudo añadir",this._render()})}async _calendarAction(t,e,i=!1){if(!(!t||!this._admin()))try{const a=this._calendar.find(r=>String(r.id??r.record_id)===t);i?await this._request("calendario_laboral/delete",{record_id:t}):await this._request("calendario_laboral/update",{record_id:t,active:(a==null?void 0:a.active)===!1,date:a==null?void 0:a.date,name:(a==null?void 0:a.name)||(a==null?void 0:a.title),description:(a==null?void 0:a.description)||""}),await this._load()}catch(a){this._error=a instanceof Error?a.message:"No se pudo actualizar",this._render()}finally{e.disabled=!1}}async _ruleAction(t,e,i=!0){if(!(!e||!this._hass))try{if(t==="toggle"&&await this._request("witmind_notifications/rules/toggle",{rule_id:e,enabled:!i}),t==="test"&&await this._testTarget(""),t==="delete"){if(!this._admin())return;await this._request("witmind_notifications/rules/delete",{rule_id:e})}await this._load()}catch(a){this._error=a instanceof Error?a.message:"No se pudo ejecutar la acción",this._render()}}async _testTarget(t){const e=this._targets.find(i=>String(i.key??i.id??i.device_id??"")===t)||this._targets[0];if(e)try{await this._request("witmind_notifications/test",{recipient:{device_id:e.device_id,notify_entity_id:e.notify_entity_id,legacy_service:e.legacy_service,name:e.name},title:"Prueba Witmind",message:`Notificación de prueba para ${e.name||"destino configurado"}.`}),await this._load()}catch(i){this._error=i instanceof Error?i.message:"No se pudo enviar la prueba",this._render()}}}customElements.get("witmind-admin-panel")||customElements.define("witmind-admin-panel",fe);const be=c=>{const t=c.last_changed??c.last_updated;if(typeof t=="string"){const i=Date.parse(t);if(Number.isFinite(i))return i}const e=Number(c.lu??c.lc??c.timestamp);return Number.isFinite(e)?e<1e10?e*1e3:e:Number.NaN},ye=c=>String(c.state??c.s??"unknown");function xe(c){const t={},e=(i,a)=>{if(!i)return;const r=a.filter(s=>!!(s&&typeof s=="object")).map(s=>({state:ye(s),timestamp:be(s)})).filter(s=>Number.isFinite(s.timestamp)).sort((s,o)=>s.timestamp-o.timestamp);t[i]=r};return Array.isArray(c)?(c.forEach(i=>{if(!Array.isArray(i)||!i.length)return;const a=i[0];e(String(a.entity_id??a.entityId??""),i)}),t):(c&&typeof c=="object"&&Object.entries(c).forEach(([i,a])=>{Array.isArray(a)&&e(i,a)}),t)}function we(c,t,e,i,a){const r=Math.max(6e4,a),s=Math.max(1,Math.ceil(Math.max(0,i-e)/r)),o=Array.from({length:s},(g,u)=>({start:e+u*r,end:Math.min(i,e+(u+1)*r),totalKwh:0,zones:{}})),n={},l=c.map(g=>{const u=Array.from({length:s},()=>0),_=(t[g.entity]||[]).filter(y=>y.timestamp<=i);let b="off";for(const y of _){if(y.timestamp>e)break;b=y.state}const A=[{state:b,timestamp:e},..._.filter(y=>y.timestamp>e&&y.timestamp<i)];A.forEach((y,v)=>{var T;if(y.state!=="on")return;let z=Math.max(e,y.timestamp);const x=Math.min(i,((T=A[v+1])==null?void 0:T.timestamp)??i);for(;z<x;){const N=Math.min(s-1,Math.floor((z-e)/r)),C=Math.min(x,e+(N+1)*r);u[N]+=Math.max(0,C-z)/36e5,z=C}});const $=u.reduce((y,v)=>y+v,0),m=g.watts===null?null:$*g.watts/1e3;return g.watts!==null&&(u.forEach((y,v)=>{const z=y*g.watts/1e3;o[v].totalKwh+=z,o[v].zones[g.zone]=(o[v].zones[g.zone]||0)+z}),n[g.zone]=(n[g.zone]||0)+(m||0)),{...g,hours:$,kwh:m,bucketHours:u}}),d=o.reduce((g,u)=>g+u.totalKwh,0),p=Math.max(0,...o.map(g=>g.totalKwh)),h=Math.max(0,o.findIndex(g=>g.totalKwh===p));return{buckets:o,circuits:l,totalKwh:d,zoneTotals:n,peakKwh:p,peakIndex:h,knownCircuits:c.filter(g=>g.watts!==null).length,totalCircuits:c.length}}function ve(c){return Array.from({length:9},(t,e)=>{const i=(e+1)*10,a=Math.max(0,c)*(i/100);return{percent:i,savedKwh:a,remainingKwh:Math.max(0,c-a)}})}const zt=[{entity:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",zone:"showroom",zoneLabel:"Showroom",watts:100},{entity:"switch.interruptor_inteligente_switch_2",name:"Spots 2x3",zone:"showroom",zoneLabel:"Showroom",watts:120},{entity:"switch.interruptor_inteligente_switch_3",name:"Spots 3x3",zone:"showroom",zoneLabel:"Showroom",watts:180},{entity:"switch.interruptor_inteligente_switch_4",name:"Spots TV",zone:"showroom",zoneLabel:"Showroom",watts:25},{entity:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",zone:"showroom",zoneLabel:"Showroom",watts:96},{entity:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",zone:"showroom",zoneLabel:"Showroom",watts:10},{entity:"switch.interruptor_inteligente_2_switch_3",name:"Slims",zone:"showroom",zoneLabel:"Showroom",watts:432},{entity:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",zone:"showroom",zoneLabel:"Showroom",watts:144},{entity:"switch.smart_relay_switch_4_switch",name:"Paneles",zone:"showroom",zoneLabel:"Showroom",watts:288},{entity:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",zone:"showroom",zoneLabel:"Showroom",watts:null},{entity:"switch.interruptor_inteligente_3_switch_1",name:"Central colgante",zone:"lobby",zoneLabel:"Lobby",watts:null},{entity:"switch.interruptor_inteligente_3_switch_2",name:"Spots 5W decorativos",zone:"lobby",zoneLabel:"Lobby",watts:null},{entity:"switch.interruptor_inteligente_3_switch_3",name:"Tira LED",zone:"lobby",zoneLabel:"Lobby",watts:null},{entity:"switch.interruptor_inteligente_3_switch_4",name:"Spots 10W",zone:"lobby",zoneLabel:"Lobby",watts:null},{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",zone:"offices",zoneLabel:"Oficinas",watts:48},{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",zone:"offices",zoneLabel:"Oficinas",watts:48},{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",zone:"offices",zoneLabel:"Oficinas",watts:168},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",zone:"offices",zoneLabel:"Oficinas",watts:168},{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",zone:"offices",zoneLabel:"Oficinas",watts:96},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",zone:"offices",zoneLabel:"Oficinas",watts:117},{entity:"switch.taller_interruptor_1",name:"Taller",zone:"offices",zoneLabel:"Oficinas",watts:144},{entity:"switch.4gang_switch_sala_grabacion_interruptor_1",name:"Tira LED",zone:"recording",zoneLabel:"Grabación",watts:24},{entity:"switch.4gang_switch_sala_grabacion_interruptor_2",name:"Paneles",zone:"recording",zoneLabel:"Grabación",watts:96},{entity:"switch.4gang_switch_sala_grabacion_interruptor_3",name:"Spots",zone:"recording",zoneLabel:"Grabación",watts:50},{entity:"switch.4gang_switch_sala_grabacion_interruptor_4",name:"Otras luces",zone:"recording",zoneLabel:"Grabación",watts:30}],Tt=[{id:"showroom",label:"Showroom",opacity:1},{id:"offices",label:"Oficinas",opacity:.74},{id:"recording",label:"Grabación",opacity:.5},{id:"lobby",label:"Lobby",opacity:.28}],ke='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',at='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z"></path></svg>',$e='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';class Se extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._range="day",this._report=null,this._loading=!1,this._error="",this._requestId=0,this._dimming=30,this._theme=this._loadTheme(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",t=>this._handleClick(t)),this.shadowRoot.addEventListener("input",t=>this._handleInput(t))}set hass(t){var i,a,r,s,o;const e=!((a=(i=this._hass)==null?void 0:i.connection)!=null&&a.sendMessagePromise)&&!!((r=t==null?void 0:t.connection)!=null&&r.sendMessagePromise);this._hass=t,this.isConnected&&((s=this.shadowRoot)!=null&&s.querySelector(".energy-panel")?this._updateLiveMetrics():this._render(),(e||!this._report&&!this._loading&&((o=t==null?void 0:t.connection)!=null&&o.sendMessagePromise))&&this._loadHistory())}get hass(){return this._hass}set panel(t){this._panel=t||{},this._report=null,this.isConnected&&(this._render(),this._hass&&this._loadHistory())}get panel(){return this._panel}set theme(t){if(t!=="dark"&&t!=="light")return;const e=this._theme!==t;this._theme=t,this.setAttribute("data-theme",t),this._saveTheme(),e&&this.isConnected&&this._render()}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._render(),this._hass&&!this._report&&this._loadHistory()}disconnectedCallback(){this._requestId+=1}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_escape(t){return String(t??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_formatEnergy(t){return new Intl.NumberFormat("es-BO",{minimumFractionDigits:t<10?2:1,maximumFractionDigits:t<10?2:1}).format(t)}_formatPower(t){return t>=1e3?`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:2}).format(t/1e3)} kW`:`${Math.round(t)} W`}_circuits(){const t=this._panel.energy_circuits??this._panel.energyCircuits;if(!Array.isArray(t))return zt;const e=new Map(t.filter(i=>i&&typeof i=="object").map(i=>[String(i.entity||""),i]));return zt.map(i=>{const a=e.get(i.entity);if(!a)return i;const r=a.watts,s=Number(r),o=r===null?null:Number.isFinite(s)&&s>=0?s:i.watts;return{...i,...a,watts:o}})}_definition(){const t=Date.now();return this._range==="week"?{start:t-7*864e5,end:t,bucketMs:864e5,title:"Últimos 7 días",bucketLabel:"día"}:this._range==="month"?{start:t-30*864e5,end:t,bucketMs:864e5,title:"Últimos 30 días",bucketLabel:"día"}:{start:t-24*36e5,end:t,bucketMs:36e5,title:"Últimas 24 horas",bucketLabel:"hora"}}async _loadHistory(){var a,r;const t=(r=(a=this._hass)==null?void 0:a.connection)==null?void 0:r.sendMessagePromise;if(!t||this._loading)return;const e=++this._requestId,i=this._definition();this._loading=!0,this._error="",this._render();try{const s=await t({type:"history/history_during_period",start_time:new Date(i.start).toISOString(),end_time:new Date(i.end).toISOString(),entity_ids:this._circuits().map(o=>o.entity),minimal_response:!0,no_attributes:!0,significant_changes_only:!0});if(e!==this._requestId)return;this._report=we(this._circuits(),xe(s),i.start,i.end,i.bucketMs)}catch(s){if(e!==this._requestId)return;this._error=s instanceof Error?s.message:"No se pudo cargar el historial",this._report=null}finally{e===this._requestId&&(this._loading=!1,this._render())}}_currentPower(){return this._circuits().reduce((t,e)=>{var i,a,r;return t+(e.watts!==null&&((r=(a=(i=this._hass)==null?void 0:i.states)==null?void 0:a[e.entity])==null?void 0:r.state)==="on"?e.watts:0)},0)}_activeCount(){return this._circuits().filter(t=>{var e,i,a;return((a=(i=(e=this._hass)==null?void 0:e.states)==null?void 0:i[t.entity])==null?void 0:a.state)==="on"}).length}_installedPower(){return this._circuits().reduce((t,e)=>t+(e.watts||0),0)}_updateLiveMetrics(){var i,a;const t=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-live-active]"),e=(a=this.shadowRoot)==null?void 0:a.querySelector("[data-live-power]");t&&(t.textContent=`${this._activeCount()} de ${this._circuits().length}`),e&&(e.textContent=this._formatPower(this._currentPower()))}_handleClick(t){const e=t.target.closest("[data-action]");if(!e)return;const i=e.dataset.action;if(i==="toggle-menu"&&this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0})),i==="toggle-theme"&&(this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))),i==="range"){const a=e.dataset.range;(a==="day"||a==="week"||a==="month")&&(this._range=a,this._report=null,this._loadHistory())}i==="refresh"&&this._loadHistory()}_handleInput(t){const e=t.target.closest("[data-dimming]");e&&(this._dimming=Math.min(90,Math.max(10,Number(e.value)||10)),this._updateDimmingPresentation())}_updateDimmingPresentation(){var s,o,n,l;if(!this._report)return;const t=this._report.totalKwh*(this._dimming/100),e=Math.max(0,this._report.totalKwh-t),i=(s=this.shadowRoot)==null?void 0:s.querySelector("[data-dim-percent]"),a=(o=this.shadowRoot)==null?void 0:o.querySelector("[data-dim-saved]"),r=(n=this.shadowRoot)==null?void 0:n.querySelector("[data-dim-remaining]");i&&(i.textContent=`${this._dimming} %`),a&&(a.textContent=`${this._formatEnergy(t)} kWh`),r&&(r.textContent=`${this._formatEnergy(e)} kWh`),(l=this.shadowRoot)==null||l.querySelectorAll("[data-dim-point]").forEach(d=>d.classList.toggle("is-selected",Number(d.dataset.dimPoint)===this._dimming))}_bucketLabel(t,e){const i=new Date(t);return this._range==="day"?e%3===0?new Intl.DateTimeFormat("es-BO",{hour:"2-digit",minute:"2-digit",timeZone:"America/La_Paz"}).format(i):"":e%(this._range==="month"?4:1)===0?new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"short",timeZone:"America/La_Paz"}).format(i):""}_renderZoneChart(t){const l=Math.max(.001,...t.buckets.map(u=>u.totalKwh)),d=894/t.buckets.length,p=Math.max(5,Math.min(34,d*.66)),h=Array.from({length:5},(u,_)=>{const b=16+200*_/4,A=l*(1-_/4);return`<line x1="54" y1="${b}" x2="948" y2="${b}" class="chart-grid"></line><text x="46" y="${b+4}" text-anchor="end" class="chart-label">${this._formatEnergy(A)}</text>`}).join(""),g=t.buckets.map((u,_)=>{let b=0;const A=54+d*_+(d-p)/2,$=Tt.map(y=>{const v=u.zones[y.id]||0,z=v/l*200;return b+=z,`<rect x="${A}" y="${216-b}" width="${p}" height="${Math.max(0,z)}" rx="3" class="zone-bar" style="opacity:${y.opacity}"><title>${y.label}: ${this._formatEnergy(v)} kWh</title></rect>`}).join(""),m=this._bucketLabel(u.start,_);return`${$}${m?`<text x="${A+p/2}" y="240" text-anchor="middle" class="chart-label">${this._escape(m)}</text>`:""}`}).join("");return`<div class="chart-scroll" data-no-swipe><svg class="zone-chart" viewBox="0 0 960 250" role="img" aria-label="Consumo estimado por zona y período">${h}${g}</svg></div>`}_renderUsage(t){const e=this._definition().bucketMs/36e5;return`<div class="usage-list">${t.circuits.map(i=>`<div class="usage-row"><div class="usage-name"><strong>${this._escape(i.name)}</strong><span>${this._escape(i.zoneLabel)} · ${i.watts===null?"Potencia pendiente":this._formatPower(i.watts)}</span></div><div class="usage-cells" style="--usage-columns:${i.bucketHours.length}">${i.bucketHours.map((a,r)=>`<i style="--usage:${Math.min(1,a/e)}" title="${this._escape(this._bucketLabel(t.buckets[r].start,r)||`Intervalo ${r+1}`)}: ${a.toFixed(2)} h"></i>`).join("")}</div><div class="usage-value"><strong>${i.hours.toFixed(1)} h</strong><span>${i.kwh===null?"Sin kWh":`${this._formatEnergy(i.kwh)} kWh`}</span></div></div>`).join("")}</div>`}_renderDimming(t){const e=ve(t.totalKwh),i=760,a=220,r=48,s=20,o=34,n=Math.max(.001,e[e.length-1].savedKwh),l=e.map((h,g)=>({...h,x:r+g*((i-r-20)/(e.length-1)),y:s+(1-h.savedKwh/n)*(a-s-o)})),d=l.map((h,g)=>`${g?"L":"M"}${h.x.toFixed(1)},${h.y.toFixed(1)}`).join(" "),p=e.find(h=>h.percent===this._dimming)||e[2];return`<div class="dimming-layout"><div class="dimming-controls"><label for="building-dimming">Reducción de potencia <strong data-dim-percent>${this._dimming} %</strong></label><input id="building-dimming" data-dimming type="range" min="10" max="90" step="10" value="${this._dimming}" aria-label="Porcentaje de dimerización"><div class="dimming-metrics"><div><small>Ahorro estimado</small><strong data-dim-saved>${this._formatEnergy(p.savedKwh)} kWh</strong></div><div><small>Consumo restante</small><strong data-dim-remaining>${this._formatEnergy(p.remainingKwh)} kWh</strong></div></div><p>Modelo lineal sobre circuitos con potencia documentada. No representa una medición física ni confirma compatibilidad eléctrica con dimmers.</p></div><div class="chart-scroll" data-no-swipe><svg class="dimming-chart" viewBox="0 0 ${i} ${a}" role="img" aria-label="Ahorro estimado por porcentaje de dimerización"><line x1="${r}" y1="${a-o}" x2="${i-20}" y2="${a-o}" class="chart-grid"></line><path d="${d}" class="saving-line"></path>${l.map(h=>`<g><circle cx="${h.x}" cy="${h.y}" r="5" class="saving-point ${h.percent===this._dimming?"is-selected":""}" data-dim-point="${h.percent}"><title>${h.percent}%: ${this._formatEnergy(h.savedKwh)} kWh</title></circle><text x="${h.x}" y="${a-10}" text-anchor="middle" class="chart-label">${h.percent}%</text></g>`).join("")}</svg></div></div>`}_renderReport(t){var a;const e=this._definition(),i=this._bucketLabel(((a=t.buckets[t.peakIndex])==null?void 0:a.start)||e.start,t.peakIndex)||`Intervalo ${t.peakIndex+1}`;return`<div class="metrics-grid"><article><small>Consumo estimado</small><strong>${this._formatEnergy(t.totalKwh)} kWh</strong><span>${this._escape(e.title)}</span></article><article><small>Promedio por ${e.bucketLabel}</small><strong>${this._formatEnergy(t.totalKwh/t.buckets.length)} kWh</strong><span>${t.buckets.length} intervalos</span></article><article><small>Mayor intervalo</small><strong>${this._formatEnergy(t.peakKwh)} kWh</strong><span>${this._escape(i)}</span></article><article><small>Cobertura nominal</small><strong>${t.knownCircuits} de ${t.totalCircuits}</strong><span>${this._formatPower(this._installedPower())} documentados</span></article></div><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Consumo por zona</span><h2>Historial energético</h2></div><div class="legend">${Tt.map(r=>`<span style="--legend-opacity:${r.opacity}"><i></i>${r.label}</span>`).join("")}</div></div>${this._renderZoneChart(t)}</section><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Uso por iluminación</span><h2>Horas por circuito</h2></div><span class="section-meta">${t.totalCircuits} circuitos</span></div>${this._renderUsage(t)}</section><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Escenario de eficiencia</span><h2>Ahorro por dimerización</h2></div><span class="section-meta">10 % a 90 %</span></div>${this._renderDimming(t)}</section>`}_render(){if(!this.shadowRoot)return;this.setAttribute("data-theme",this._theme);const t=this._definition(),e=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",timeZone:"America/La_Paz"}).format(new Date),i=this._report;this.shadowRoot.innerHTML=`<style>
      :host{--primary:#f26522;--primary-soft:rgba(242,101,34,.12);--primary-border:rgba(242,101,34,.36);--canvas:#071118;--surface:rgba(16,25,30,.88);--surface-control:rgba(27,40,46,.72);--surface-hover:rgba(255,255,255,.07);--text-primary:#f5f6f4;--text-secondary:#adb4b6;--text-tertiary:#747e82;--border:rgba(255,255,255,.1);--border-subtle:rgba(255,255,255,.07);--shadow:rgba(0,0,0,.24);display:block;min-height:100dvh;color:var(--text-primary);background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums}:host([data-theme=light]){--canvas:#eef2f1;--surface:rgba(255,255,255,.92);--surface-control:rgba(247,250,250,.96);--surface-hover:#fff;--text-primary:#172129;--text-secondary:#526066;--text-tertiary:#7a868b;--border:rgba(23,33,41,.14);--border-subtle:rgba(23,33,41,.09);--shadow:rgba(50,65,68,.12);background:linear-gradient(155deg,#f5f1ed,#eef2f1 52%,#e8edec)}*{box-sizing:border-box}button,input{font:inherit}.energy-panel{min-height:100dvh}.topbar{position:sticky;top:0;z-index:20;min-height:80px;padding:12px clamp(18px,2.6vw,48px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;border-bottom:1px solid var(--border-subtle);background:color-mix(in srgb,var(--canvas) 88%,transparent);backdrop-filter:blur(18px)}.topbar-start,.topbar-end,.status-strip{display:flex;align-items:center;gap:10px}.topbar-end{justify-content:flex-end}.menu-button,.theme-button,.icon-button{width:48px;height:48px;display:grid;place-items:center;border:1px solid var(--border);border-radius:50%;background:var(--surface-control);color:var(--text-primary);cursor:pointer}.menu-button svg,.theme-button svg,.icon-button svg{width:20px;height:20px}.brand{display:flex;align-items:baseline;gap:10px}.brand strong{font-size:18px;letter-spacing:.06em}.brand span{color:var(--primary);font-size:9px;font-weight:800}.status-pill{min-width:112px;height:52px;padding:7px 14px;display:flex;align-items:center;gap:9px;border:1px solid var(--border);border-radius:999px;background:var(--surface-control)}.status-pill svg{width:18px;height:18px;color:var(--primary)}.status-pill strong,.status-pill small{display:block}.status-pill strong{font-size:11px}.status-pill small{margin-top:2px;color:var(--text-tertiary);font-size:8px}.clock{font-size:28px;font-weight:500;letter-spacing:-.05em}.dashboard{width:min(1540px,100%);margin:auto;padding:clamp(18px,2.4vw,34px);padding-bottom:100px}.workspace-heading{display:flex;align-items:end;justify-content:space-between;gap:18px;margin:8px 0 18px}.eyebrow{display:block;color:var(--primary);font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.workspace-heading h1{margin:4px 0 0;font-size:clamp(30px,4vw,44px);letter-spacing:-.045em}.workspace-heading p{max-width:650px;margin:7px 0 0;color:var(--text-secondary);font-size:12px;line-height:1.55}.toolbar{display:flex;align-items:center;gap:8px}.range-tabs{display:flex;padding:4px;border:1px solid var(--border);border-radius:14px;background:var(--surface)}.range-tabs button{min-width:70px;height:36px;border:0;border-radius:10px;background:transparent;color:var(--text-secondary);font-size:10px;font-weight:800;cursor:pointer}.range-tabs button.is-active{background:var(--primary);color:#fff;box-shadow:0 5px 16px rgba(242,101,34,.22)}.surface{border:1px solid var(--border-subtle);border-radius:22px;background:var(--surface);box-shadow:0 16px 40px var(--shadow)}.metrics-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.metrics-grid article{min-width:0;padding:15px 17px;border:1px solid var(--border);border-radius:16px;background:var(--surface-control)}.metrics-grid small,.metrics-grid strong,.metrics-grid span{display:block}.metrics-grid small{color:var(--text-tertiary);font-size:9px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}.metrics-grid strong{margin-top:6px;font-size:20px;letter-spacing:-.03em}.metrics-grid span{margin-top:4px;color:var(--text-tertiary);font-size:9px}.chart-card{margin-top:12px;padding:20px}.section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:14px}.section-head h2{margin:4px 0 0;font-size:18px;letter-spacing:-.025em}.section-meta{color:var(--text-tertiary);font-size:10px}.legend{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.legend span{display:flex;align-items:center;gap:5px;color:var(--text-tertiary);font-size:9px}.legend i{width:8px;height:8px;border-radius:3px;background:var(--primary);opacity:var(--legend-opacity)}.chart-scroll{width:100%;overflow-x:auto;overscroll-behavior-x:contain}.zone-chart,.dimming-chart{display:block;width:100%;min-width:720px;height:auto}.chart-grid{stroke:var(--border-subtle);stroke-width:1}.chart-label{fill:var(--text-tertiary);font:600 9px Manrope,sans-serif}.zone-bar{fill:var(--primary)}.usage-list{max-height:590px;display:grid;gap:6px;overflow:auto;padding-right:4px}.usage-row{display:grid;grid-template-columns:minmax(170px,1.1fr) minmax(320px,3fr) 88px;align-items:center;gap:12px;padding:9px 11px;border:1px solid var(--border-subtle);border-radius:13px;background:var(--surface-control)}.usage-name,.usage-value{min-width:0}.usage-name strong,.usage-name span,.usage-value strong,.usage-value span{display:block}.usage-name strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}.usage-name span,.usage-value span{margin-top:3px;color:var(--text-tertiary);font-size:8px}.usage-value{text-align:right}.usage-value strong{font-size:11px}.usage-cells{height:23px;display:grid;grid-template-columns:repeat(var(--usage-columns),minmax(4px,1fr));align-items:stretch;gap:2px}.usage-cells i{border-radius:3px;background:color-mix(in srgb,var(--primary) calc(12% + var(--usage) * 88%),var(--surface-control));box-shadow:inset 0 0 0 1px var(--border-subtle)}.dimming-layout{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(520px,1.6fr);align-items:center;gap:28px}.dimming-controls label{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:11px;font-weight:700}.dimming-controls label strong{color:var(--primary);font-size:20px}.dimming-controls input{width:100%;margin:18px 0;accent-color:var(--primary)}.dimming-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px}.dimming-metrics div{padding:12px;border:1px solid var(--border);border-radius:14px;background:var(--surface-control)}.dimming-metrics small,.dimming-metrics strong{display:block}.dimming-metrics small{color:var(--text-tertiary);font-size:8px;text-transform:uppercase}.dimming-metrics strong{margin-top:5px;font-size:15px}.dimming-controls p{margin:12px 0 0;color:var(--text-tertiary);font-size:9px;line-height:1.5}.saving-line{fill:none;stroke:var(--primary);stroke-width:3}.saving-point{fill:var(--surface);stroke:var(--primary);stroke-width:2;transition:r 160ms,fill 160ms}.saving-point.is-selected{r:8px;fill:var(--primary)}.state-card{min-height:300px;margin-top:12px;display:grid;place-items:center;padding:36px;text-align:center}.state-card strong{display:block;font-size:16px}.state-card span{display:block;max-width:560px;margin-top:8px;color:var(--text-tertiary);font-size:11px;line-height:1.5}.loader{width:34px;height:34px;margin:0 auto 14px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}button:focus-visible,input:focus-visible{outline:2px solid var(--primary);outline-offset:2px}button:active{transform:translateY(1px)}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}@media(max-width:1100px){.topbar{grid-template-columns:1fr auto}.status-strip{display:none}.metrics-grid{grid-template-columns:repeat(2,1fr)}.dimming-layout{grid-template-columns:1fr}.usage-row{grid-template-columns:minmax(150px,1fr) minmax(280px,2fr) 80px}}@media(max-width:760px){.topbar{min-height:68px;padding:10px 14px}.brand span{display:none}.menu-button,.theme-button{width:44px;height:44px}.clock{font-size:24px}.dashboard{padding:16px 14px 90px}.workspace-heading{display:grid;align-items:stretch;gap:12px;margin:4px 0 18px}.workspace-heading h1{font-size:26px}.workspace-heading p{max-width:none}.toolbar{justify-content:space-between}.range-tabs{flex:1}.range-tabs button{min-width:0;flex:1}}@media(max-width:700px){.metrics-grid{grid-template-columns:1fr}.chart-card{padding:16px}.section-head{display:grid}.legend{gap:8px}.usage-row{grid-template-columns:1fr 70px}.usage-cells{grid-column:1/-1;grid-row:2}.dimming-metrics{grid-template-columns:1fr}.zone-chart,.dimming-chart{min-width:620px}}
    </style><div class="energy-panel"><header class="topbar"><div class="topbar-start"><button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${ke}</button><div class="brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div></div><div class="status-strip"><div class="status-pill">${at}<span><strong data-live-active>${this._activeCount()} de ${this._circuits().length}</strong><small>Circuitos activos</small></span></div><div class="status-pill">${at}<span><strong data-live-power>${this._formatPower(this._currentPower())}</strong><small>Potencia actual</small></span></div><div class="status-pill">${at}<span><strong>${this._formatPower(this._installedPower())}</strong><small>Potencia conocida</small></span></div></div><div class="topbar-end"><time class="clock">${this._escape(e)}</time><button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${$e}</button></div></header><main class="dashboard"><section class="workspace-heading"><div><span class="eyebrow">Analítica del edificio</span><h1>Gestión de energía</h1><p>Consumo estimado, horas de uso y escenarios de ahorro para Showroom, Lobby, Oficinas y Sala de grabación.</p></div><div class="toolbar"><div class="range-tabs" role="tablist" aria-label="Período de análisis">${["day","week","month"].map(a=>`<button data-action="range" data-range="${a}" class="${this._range===a?"is-active":""}" role="tab" aria-selected="${this._range===a}">${a==="day"?"24 h":a==="week"?"7 días":"30 días"}</button>`).join("")}</div><button class="icon-button" data-action="refresh" aria-label="Actualizar historial" title="Actualizar">${at}</button></div></section>${this._loading?`<section class="surface state-card"><div><div class="loader"></div><strong>Cargando historial energético</strong><span>Consultando ${this._circuits().length} circuitos para ${this._escape(t.title.toLowerCase())}.</span></div></section>`:this._error?`<section class="surface state-card"><div><strong>No se pudo cargar el historial</strong><span>${this._escape(this._error)}. Usa Actualizar para volver a intentarlo.</span></div></section>`:i?this._renderReport(i):'<section class="surface state-card"><div><strong>Sin datos disponibles</strong><span>Home Assistant todavía no devolvió historial para este período.</span></div></section>'}</main></div>`}}customElements.get("witmind-energy-panel")||customElements.define("witmind-energy-panel",Se);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rt=globalThis,vt=rt.ShadowRoot&&(rt.ShadyCSS===void 0||rt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,kt=Symbol(),Nt=new WeakMap;let Qt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==kt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(vt&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Nt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Nt.set(e,t))}return t}toString(){return this.cssText}};const Ee=c=>new Qt(typeof c=="string"?c:c+"",void 0,kt),Ae=(c,...t)=>{const e=c.length===1?c[0]:t.reduce((i,a,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+c[r+1],c[0]);return new Qt(e,c,kt)},Me=(c,t)=>{if(vt)c.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),a=rt.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=e.cssText,c.appendChild(i)}},Lt=vt?c=>c:c=>c instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Ee(e)})(c):c;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Ce,defineProperty:ze,getOwnPropertyDescriptor:Te,getOwnPropertyNames:Ne,getOwnPropertySymbols:Le,getPrototypeOf:Ie}=Object,O=globalThis,It=O.trustedTypes,De=It?It.emptyScript:"",dt=O.reactiveElementPolyfillSupport,G=(c,t)=>c,_t={toAttribute(c,t){switch(t){case Boolean:c=c?De:null;break;case Object:case Array:c=c==null?c:JSON.stringify(c)}return c},fromAttribute(c,t){let e=c;switch(t){case Boolean:e=c!==null;break;case Number:e=c===null?null:Number(c);break;case Object:case Array:try{e=JSON.parse(c)}catch{e=null}}return e}},Jt=(c,t)=>!Ce(c,t),Dt={attribute:!0,type:String,converter:_t,reflect:!1,useDefault:!1,hasChanged:Jt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),O.litPropertyMetadata??(O.litPropertyMetadata=new WeakMap);let j=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(t,i,e);a!==void 0&&ze(this.prototype,t,a)}}static getPropertyDescriptor(t,e,i){const{get:a,set:r}=Te(this.prototype,t)??{get(){return this[e]},set(s){this[e]=s}};return{get:a,set(s){const o=a==null?void 0:a.call(this);r==null||r.call(this,s),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Dt}static _$Ei(){if(this.hasOwnProperty(G("elementProperties")))return;const t=Ie(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(G("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(G("properties"))){const e=this.properties,i=[...Ne(e),...Le(e)];for(const a of i)this.createProperty(a,e[a])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,a]of e)this.elementProperties.set(i,a)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const a=this._$Eu(e,i);a!==void 0&&this._$Eh.set(a,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const a of i)e.unshift(Lt(a))}else t!==void 0&&e.push(Lt(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Me(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){var r;const i=this.constructor.elementProperties.get(t),a=this.constructor._$Eu(t,i);if(a!==void 0&&i.reflect===!0){const s=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:_t).toAttribute(e,i.type);this._$Em=t,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(t,e){var r,s;const i=this.constructor,a=i._$Eh.get(t);if(a!==void 0&&this._$Em!==a){const o=i.getPropertyOptions(a),n=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:_t;this._$Em=a;const l=n.fromAttribute(e,o.type);this[a]=l??((s=this._$Ej)==null?void 0:s.get(a))??l,this._$Em=null}}requestUpdate(t,e,i,a=!1,r){var s;if(t!==void 0){const o=this.constructor;if(a===!1&&(r=this[t]),i??(i=o.getPropertyOptions(t)),!((i.hasChanged??Jt)(r,e)||i.useDefault&&i.reflect&&r===((s=this._$Ej)==null?void 0:s.get(t))&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,s??e??this[t]),r!==!0||s!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),a===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[r,s]of a){const{wrapped:o}=s,n=this[r];o!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,s,n)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$EO)==null||i.forEach(a=>{var r;return(r=a.hostUpdate)==null?void 0:r.call(a)}),this.update(e)):this._$EM()}catch(a){throw t=!1,this._$EM(),a}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(i=>{var a;return(a=i.hostUpdated)==null?void 0:a.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};j.elementStyles=[],j.shadowRootOptions={mode:"open"},j[G("elementProperties")]=new Map,j[G("finalized")]=new Map,dt==null||dt({ReactiveElement:j}),(O.reactiveElementVersions??(O.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=globalThis,Pt=c=>c,nt=Z.trustedTypes,Ot=nt?nt.createPolicy("lit-html",{createHTML:c=>c}):void 0,te="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,ee="?"+P,Pe=`<${ee}>`,W=document,Q=()=>W.createComment(""),J=c=>c===null||typeof c!="object"&&typeof c!="function",$t=Array.isArray,Oe=c=>$t(c)||typeof(c==null?void 0:c[Symbol.iterator])=="function",ht=`[ 	
\f\r]`,Y=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Rt=/-->/g,Ft=/>/g,R=RegExp(`>|${ht}(?:([^\\s"'>=/]+)(${ht}*=${ht}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ht=/'/g,Wt=/"/g,ie=/^(?:script|style|textarea|title)$/i,Re=c=>(t,...e)=>({_$litType$:c,strings:t,values:e}),k=Re(1),B=Symbol.for("lit-noChange"),w=Symbol.for("lit-nothing"),qt=new WeakMap,F=W.createTreeWalker(W,129);function ae(c,t){if(!$t(c)||!c.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ot!==void 0?Ot.createHTML(t):t}const Fe=(c,t)=>{const e=c.length-1,i=[];let a,r=t===2?"<svg>":t===3?"<math>":"",s=Y;for(let o=0;o<e;o++){const n=c[o];let l,d,p=-1,h=0;for(;h<n.length&&(s.lastIndex=h,d=s.exec(n),d!==null);)h=s.lastIndex,s===Y?d[1]==="!--"?s=Rt:d[1]!==void 0?s=Ft:d[2]!==void 0?(ie.test(d[2])&&(a=RegExp("</"+d[2],"g")),s=R):d[3]!==void 0&&(s=R):s===R?d[0]===">"?(s=a??Y,p=-1):d[1]===void 0?p=-2:(p=s.lastIndex-d[2].length,l=d[1],s=d[3]===void 0?R:d[3]==='"'?Wt:Ht):s===Wt||s===Ht?s=R:s===Rt||s===Ft?s=Y:(s=R,a=void 0);const g=s===R&&c[o+1].startsWith("/>")?" ":"";r+=s===Y?n+Pe:p>=0?(i.push(l),n.slice(0,p)+te+n.slice(p)+P+g):n+P+(p===-2?o:g)}return[ae(c,r+(c[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]};class tt{constructor({strings:t,_$litType$:e},i){let a;this.parts=[];let r=0,s=0;const o=t.length-1,n=this.parts,[l,d]=Fe(t,e);if(this.el=tt.createElement(l,i),F.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(a=F.nextNode())!==null&&n.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(const p of a.getAttributeNames())if(p.endsWith(te)){const h=d[s++],g=a.getAttribute(p).split(P),u=/([.?@])?(.*)/.exec(h);n.push({type:1,index:r,name:u[2],strings:g,ctor:u[1]==="."?We:u[1]==="?"?qe:u[1]==="@"?je:ot}),a.removeAttribute(p)}else p.startsWith(P)&&(n.push({type:6,index:r}),a.removeAttribute(p));if(ie.test(a.tagName)){const p=a.textContent.split(P),h=p.length-1;if(h>0){a.textContent=nt?nt.emptyScript:"";for(let g=0;g<h;g++)a.append(p[g],Q()),F.nextNode(),n.push({type:2,index:++r});a.append(p[h],Q())}}}else if(a.nodeType===8)if(a.data===ee)n.push({type:2,index:r});else{let p=-1;for(;(p=a.data.indexOf(P,p+1))!==-1;)n.push({type:7,index:r}),p+=P.length-1}r++}}static createElement(t,e){const i=W.createElement("template");return i.innerHTML=t,i}}function X(c,t,e=c,i){var s,o;if(t===B)return t;let a=i!==void 0?(s=e._$Co)==null?void 0:s[i]:e._$Cl;const r=J(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==r&&((o=a==null?void 0:a._$AO)==null||o.call(a,!1),r===void 0?a=void 0:(a=new r(c),a._$AT(c,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=a:e._$Cl=a),a!==void 0&&(t=X(c,a._$AS(c,t.values),a,i)),t}class He{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,a=((t==null?void 0:t.creationScope)??W).importNode(e,!0);F.currentNode=a;let r=F.nextNode(),s=0,o=0,n=i[0];for(;n!==void 0;){if(s===n.index){let l;n.type===2?l=new et(r,r.nextSibling,this,t):n.type===1?l=new n.ctor(r,n.name,n.strings,this,t):n.type===6&&(l=new Ue(r,this,t)),this._$AV.push(l),n=i[++o]}s!==(n==null?void 0:n.index)&&(r=F.nextNode(),s++)}return F.currentNode=W,a}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class et{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,a){this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=X(this,t,e),J(t)?t===w||t==null||t===""?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==B&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Oe(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==w&&J(this._$AH)?this._$AA.nextSibling.data=t:this.T(W.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:i}=t,a=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=tt.createElement(ae(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===a)this._$AH.p(e);else{const s=new He(a,this),o=s.u(this.options);s.p(e),this.T(o),this._$AH=s}}_$AC(t){let e=qt.get(t.strings);return e===void 0&&qt.set(t.strings,e=new tt(t)),e}k(t){$t(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,a=0;for(const r of t)a===e.length?e.push(i=new et(this.O(Q()),this.O(Q()),this,this.options)):i=e[a],i._$AI(r),a++;a<e.length&&(this._$AR(i&&i._$AB.nextSibling,a),e.length=a)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t!==this._$AB;){const a=Pt(t).nextSibling;Pt(t).remove(),t=a}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class ot{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,a,r){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=a,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=w}_$AI(t,e=this,i,a){const r=this.strings;let s=!1;if(r===void 0)t=X(this,t,e,0),s=!J(t)||t!==this._$AH&&t!==B,s&&(this._$AH=t);else{const o=t;let n,l;for(t=r[0],n=0;n<r.length-1;n++)l=X(this,o[i+n],e,n),l===B&&(l=this._$AH[n]),s||(s=!J(l)||l!==this._$AH[n]),l===w?t=w:t!==w&&(t+=(l??"")+r[n+1]),this._$AH[n]=l}s&&!a&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class We extends ot{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}}class qe extends ot{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==w)}}class je extends ot{constructor(t,e,i,a,r){super(t,e,i,a,r),this.type=5}_$AI(t,e=this){if((t=X(this,t,e,0)??w)===B)return;const i=this._$AH,a=t===w&&i!==w||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==w&&(i===w||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Ue{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){X(this,t)}}const pt=Z.litHtmlPolyfillSupport;pt==null||pt(tt,et),(Z.litHtmlVersions??(Z.litHtmlVersions=[])).push("3.3.3");const Be=(c,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let a=i._$litPart$;if(a===void 0){const r=(e==null?void 0:e.renderBefore)??null;i._$litPart$=a=new et(t.insertBefore(Q(),r),r,void 0,e??{})}return a._$AI(c),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis;class K extends j{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Be(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return B}}var Kt;K._$litElement$=!0,K.finalized=!0,(Kt=H.litElementHydrateSupport)==null||Kt.call(H,{LitElement:K});const gt=H.litElementPolyfillSupport;gt==null||gt({LitElement:K});(H.litElementVersions??(H.litElementVersions=[])).push("4.2.2");/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xe=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ve=[["path",{d:"m7 7 10 10"}],["path",{d:"M17 7v10H7"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ge=[["path",{d:"M20 6 9 17l-5-5"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ze=[["path",{d:"m6 9 6 6 6-6"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ke=[["path",{d:"m9 18 6-6-6-6"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qe=[["path",{d:"m18 15-6-6-6 6"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Je=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ti=[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 14"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ei=[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1"}],["path",{d:"M15 2v2"}],["path",{d:"M15 20v2"}],["path",{d:"M2 15h2"}],["path",{d:"M2 9h2"}],["path",{d:"M20 15h2"}],["path",{d:"M20 9h2"}],["path",{d:"M9 2v2"}],["path",{d:"M9 20v2"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ii=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ai=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ri=[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const si=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ni=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}],["path",{d:"M9 3v18"}],["path",{d:"M15 3v18"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oi=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ci=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const li=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const di=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hi=[["polyline",{points:"15 3 21 3 21 9"}],["polyline",{points:"9 21 3 21 3 15"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pi=[["polyline",{points:"4 14 10 14 10 20"}],["polyline",{points:"20 10 14 10 14 4"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gi=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ui=[["path",{d:"M9 18V5l12-2v13"}],["circle",{cx:"6",cy:"18",r:"3"}],["circle",{cx:"18",cy:"16",r:"3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mi=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _i=[["polygon",{points:"6 3 20 12 6 21 6 3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fi=[["path",{d:"M12 2v10"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bi=[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yi=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xi=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wi=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vi=[["polygon",{points:"19 20 9 12 19 4 19 20"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ki=[["polygon",{points:"5 4 15 12 5 20 5 4"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $i=[["line",{x1:"4",x2:"4",y1:"21",y2:"14"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Si=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}],["path",{d:"M4 17v2"}],["path",{d:"M5 18H3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ei=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ai=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mi=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17"}],["polyline",{points:"16 7 22 7 22 13"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ci=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zi=[["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",ry:"2"}],["polyline",{points:"17 2 12 7 7 2"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ti=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ni=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Li=[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ii=[["path",{d:"M12 20h.01"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pi=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oi=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]],Ri={home:oi,lightbulb:di,sun:Ei,moon:gi,zap:Oi,music:ui,sliders:$i,activity:Xe,shield:wi,power:fi,"chevron-right":Ke,"chevron-down":Ze,"chevron-up":Qe,x:Pi,check:Ge,"alert-triangle":Ci,"alert-circle":Je,clock:ti,thermometer:Ai,droplets:ii,wind:Di,sparkles:Si,play:_i,pause:mi,"skip-forward":ki,"skip-back":vi,"volume-2":Ti,"volume-x":Ni,"arrow-up-right":Ye,"arrow-down-right":Ve,layers:li,tv:zi,cpu:ei,"refresh-cw":yi,eye:ai,settings:xi,flame:ri,radio:bi,wifi:Ii,"wifi-off":Li,maximize:hi,minimize:pi,gauge:si,"trending-up":Mi,grid:ni,info:ci};function f(c,t={}){const e=t.size||22,i=t.strokeWidth||1.8,a=t.color||"currentColor",r=t.className||"",s=Ri[c.toLowerCase()];return s?k`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${e}"
      height="${e}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${a}"
      stroke-width="${i}"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="wit-icon ${r}"
    >
      ${s.map(([o,n])=>o==="path"?k`<path d="${n.d}"></path>`:o==="circle"?k`<circle cx="${n.cx}" cy="${n.cy}" r="${n.r}"></circle>`:o==="line"?k`<line x1="${n.x1}" y1="${n.y1}" x2="${n.x2}" y2="${n.y2}"></line>`:o==="rect"?k`<rect width="${n.width}" height="${n.height}" x="${n.x}" y="${n.y}" rx="${n.rx||0}"></rect>`:o==="polygon"?k`<polygon points="${n.points}"></polygon>`:o==="polyline"?k`<polyline points="${n.points}"></polyline>`:null)}
    </svg>
  `:k`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${e}"
        height="${e}"
        viewBox="0 0 24 24"
        fill="none"
        stroke="${a}"
        stroke-width="${i}"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="wit-icon ${r}"
      >
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
    `}const Fi=(c,t)=>{if(!Number.isFinite(c))return null;const e=String(t||"W").trim().toLowerCase();return e==="kw"?c*1e3:e==="mw"?c*1e6:e==="w"?c:null},I={weather:"weather.forecast_casa",showroomPower:"sensor.showroom_potencia_activa",showroomEnergy:"sensor.showroom_energia_activa",lobbyPower:"sensor.sensor_de_potencia_showroom_p"},st=[{id:"ground.showroom",floor:"ground",label:"Showroom",power:I.showroomPower,circuits:[{entity:"switch.interruptor_inteligente_switch_1",label:"Spots ventana",watts:100},{entity:"switch.interruptor_inteligente_switch_2",label:"Spots 2x3",watts:120},{entity:"switch.interruptor_inteligente_switch_3",label:"Spots 3x3",watts:180},{entity:"switch.interruptor_inteligente_switch_4",label:"Spots TV",watts:25},{entity:"switch.interruptor_inteligente_2_switch_1",label:"Paneles 3k/6k",watts:96},{entity:"switch.interruptor_inteligente_2_switch_2",label:"Colgantes",watts:10},{entity:"switch.interruptor_inteligente_2_switch_3",label:"Slims",watts:432},{entity:"switch.interruptor_inteligente_2_switch_4",label:"Downlights",watts:144},{entity:"switch.smart_relay_switch_4_switch",label:"Paneles",watts:288},{entity:"switch.smart_relay_switch_3_switch",label:"Reflector exterior"}],action:{label:"Modo reunión",serviceEntity:"scene.reunion",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2"],offEntities:["switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_4_switch","switch.smart_relay_switch_3_switch"]}},{id:"ground.witronix_admin",floor:"ground",label:"Witronix Admin",temperature:"sensor.t_h_sensor_temperature",humidity:"sensor.t_h_sensor_humidity",showInTable:!1,circuits:[]},{id:"ground.lobby",floor:"ground",label:"Lobby",power:I.lobbyPower,circuits:[{entity:"switch.interruptor_inteligente_3_switch_1",label:"Central colgante"},{entity:"switch.interruptor_inteligente_3_switch_2",label:"Spots decorativos"},{entity:"switch.interruptor_inteligente_3_switch_3",label:"Tira LED"},{entity:"switch.interruptor_inteligente_3_switch_4",label:"Spots principales"}],action:{label:"Modo invitados",onEntities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"],offEntities:[]}},{id:"ground.grabacion",floor:"ground",label:"Grabación",circuits:[{entity:"switch.4gang_switch_sala_grabacion_interruptor_1",label:"Tira LED",watts:24},{entity:"switch.4gang_switch_sala_grabacion_interruptor_2",label:"Paneles",watts:96},{entity:"switch.4gang_switch_sala_grabacion_interruptor_3",label:"Spots",watts:50},{entity:"switch.4gang_switch_sala_grabacion_interruptor_4",label:"Otras luces",watts:30}],action:{label:"Iluminación completa",onEntities:["switch.4gang_switch_sala_grabacion_interruptor_1","switch.4gang_switch_sala_grabacion_interruptor_2","switch.4gang_switch_sala_grabacion_interruptor_3","switch.4gang_switch_sala_grabacion_interruptor_4"],offEntities:[]}},{id:"upper.witronix",floor:"upper",label:"Witronix",circuits:[{entity:"switch.oficina_gerencial_interruptor_1",label:"Witronix LED",watts:48}]},{id:"upper.mindtec",floor:"upper",label:"Mindtec",circuits:[{entity:"switch.oficina_mindtec_interruptor_1",label:"Iluminación Mindtec",watts:48}]},{id:"upper.office_large",floor:"upper",label:"Oficina grande",temperature:"sensor.t_h_sensor_2_temperature",humidity:"sensor.t_h_sensor_2_humidity",circuits:[{entity:"switch.oficina_grande_interruptor_1",label:"Oficina grande 1",watts:168},{entity:"switch.oficina_grande_interruptor_2",label:"Oficina grande 2",watts:168}]},{id:"upper.sala_multiuso",floor:"upper",label:"Sala multiuso",circuits:[{entity:"switch.b2_gang_interruptor_1",label:"Multifuncional",watts:96},{entity:"switch.b2_gang_interruptor_2",label:"Pasillos",watts:117}]},{id:"upper.taller",floor:"upper",label:"Taller",circuits:[{entity:"switch.taller_interruptor_1",label:"Iluminación Taller",watts:144}]}],Hi={ground:[{zoneId:"ground.witronix_admin",left:8,top:12,width:22},{zoneId:"ground.showroom",left:8,top:54,width:23},{zoneId:"ground.lobby",left:39,top:48,width:22},{zoneId:"ground.grabacion",left:67,top:57,width:22}],upper:[{zoneId:"upper.office_large",left:8,top:22,width:25},{zoneId:"upper.witronix",left:8,top:55,width:20},{zoneId:"upper.mindtec",left:8,top:9,width:20},{zoneId:"upper.sala_multiuso",left:37,top:58,width:23},{zoneId:"upper.taller",left:48,top:16,width:18}]},Wi=[...new Set([I.weather,I.showroomPower,I.showroomEnergy,...st.flatMap(c=>{var t,e,i;return[c.temperature,c.humidity,c.power,(t=c.action)==null?void 0:t.serviceEntity,...((e=c.action)==null?void 0:e.onEntities)||[],...((i=c.action)==null?void 0:i.offEntities)||[],...c.circuits.map(a=>a.entity)]})].filter(c=>!!c))],qi={ground:{label:"Planta Baja",context:"Showroom",image:"./building/planta-baja.png"},upper:{label:"Planta Alta",context:"Taller",image:"./building/planta-alta.png"}},ji={"clear-night":"Despejado de noche",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvioso",snowy:"Nevado","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},L=c=>!c||c.state==="unknown"||c.state==="unavailable",U=(c,t)=>{var a;if(L(c))return null;const e=t?(a=c==null?void 0:c.attributes)==null?void 0:a[t]:c==null?void 0:c.state,i=Number(e);return Number.isFinite(i)?i:null},jt=c=>{var e;const t=U(c);return t===null?null:Fi(t,String(((e=c==null?void 0:c.attributes)==null?void 0:e.unit_of_measurement)||"W"))},St=class St extends K{constructor(){super(...arguments),this._hass=null,this._panel={},this._theme="dark",this._activeFloor="ground",this._actionState="idle",this._actionMessage="",this._clock=new Date,this._history=[],this._historyTrend=null,this._historyState="idle",this._historyRequested=!1,this._touchStartX=null,this._touchLastX=null,this._mouseStartX=null,this._mouseLastX=null,this._onTouchMove=t=>{if(this._touchStartX===null)return;const e=t.touches[0];e&&(this._touchLastX=e.clientX,Math.abs(e.clientX-this._touchStartX)>12&&t.preventDefault())},this._onTouchEnd=()=>{this._touchStartX!==null&&this._touchLastX!==null&&this._finishFloorSwipe(this._touchLastX-this._touchStartX),this._touchStartX=null,this._touchLastX=null},this._onTouchCancel=()=>{this._touchStartX=null,this._touchLastX=null},this._onPointerMove=t=>{this._mouseStartX!==null&&(this._mouseLastX=t.clientX)},this._onPointerUp=()=>{this._mouseStartX!==null&&this._mouseLastX!==null&&this._finishFloorSwipe(this._mouseLastX-this._mouseStartX),this._mouseStartX=null,this._mouseLastX=null},this._onPointerCancel=()=>{this._mouseStartX=null,this._mouseLastX=null}}set hass(t){const e=this._hass;this._hass=t,this.requestUpdate("hass",e),this.isConnected&&!this._historyRequested&&this._loadHistory()}get hass(){return this._hass}set panel(t){const e=this._panel;this._panel=t&&typeof t=="object"?t:{},this.requestUpdate("panel",e)}get panel(){return this._panel}set theme(t){if(t!=="dark"&&t!=="light")return;const e=this._theme;this._theme=t,this.setAttribute("data-theme",t),this.requestUpdate("theme",e)}get theme(){return this._theme}connectedCallback(){super.connectedCallback(),this.setAttribute("data-theme",this._theme),this._clockTimer=window.setInterval(()=>{this._clock=new Date,this.requestUpdate()},3e4),window.addEventListener("touchmove",this._onTouchMove,{passive:!1}),window.addEventListener("touchend",this._onTouchEnd,{passive:!0}),window.addEventListener("touchcancel",this._onTouchCancel,{passive:!0}),window.addEventListener("pointermove",this._onPointerMove),window.addEventListener("pointerup",this._onPointerUp),window.addEventListener("pointercancel",this._onPointerCancel),this._historyRequested||this._loadHistory()}disconnectedCallback(){super.disconnectedCallback(),this._clockTimer&&window.clearInterval(this._clockTimer),window.removeEventListener("touchmove",this._onTouchMove),window.removeEventListener("touchend",this._onTouchEnd),window.removeEventListener("touchcancel",this._onTouchCancel),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),window.removeEventListener("pointercancel",this._onPointerCancel)}updated(t){t.has("theme")&&this.setAttribute("data-theme",this._theme)}_state(t){var e,i;return(i=(e=this._hass)==null?void 0:e.states)==null?void 0:i[t]}_zones(){return st.filter(t=>t.floor===this._activeFloor)}_availableCircuits(t){return t.circuits.filter(e=>!L(this._state(e.entity)))}_onCircuits(t){return this._availableCircuits(t).filter(e=>{var i;return((i=this._state(e.entity))==null?void 0:i.state)==="on"})}_profileActive(t){return t.action?[...t.action.onEntities,...t.action.offEntities].some(i=>L(this._state(i)))?!1:t.action.onEntities.every(i=>{var a;return((a=this._state(i))==null?void 0:a.state)==="on"})&&t.action.offEntities.every(i=>{var a;return((a=this._state(i))==null?void 0:a.state)==="off"}):this._onCircuits(t).length>0}_zonePower(t){const e=t.power?jt(this._state(t.power)):null;if(e!==null)return{value:e,measured:!0};const i=this._onCircuits(t).filter(a=>typeof a.watts=="number");return i.length?{value:i.reduce((a,r)=>a+Number(r.watts),0),measured:!1}:null}_format(t,e,i=0){return t===null?"No disponible":`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:i}).format(t)} ${e}`}_weather(){const t=this._state(I.weather);return{available:!L(t),temperature:U(t,"temperature"),condition:ji[String((t==null?void 0:t.state)||"")]||(L(t)?"No disponible":String(t==null?void 0:t.state))}}_environment(){const t=this._zones().map(a=>a.temperature&&U(this._state(a.temperature))).filter(a=>typeof a=="number"),e=this._zones().map(a=>a.humidity&&U(this._state(a.humidity))).filter(a=>typeof a=="number"),i=a=>a.length?a.reduce((r,s)=>r+s,0)/a.length:null;return{temperature:i(t),humidity:i(e)}}_activePower(){const t=jt(this._state(I.showroomPower));return t===null?null:t}async _loadHistory(){var i,a;const t=(a=(i=this._hass)==null?void 0:i.connection)==null?void 0:a.sendMessagePromise;if(!t||L(this._state(I.showroomPower))){this._historyState="unavailable",this.requestUpdate();return}this._historyRequested=!0,this._historyState="loading",this.requestUpdate();const e=Date.now();try{const r=await t({type:"history/history_during_period",start_time:new Date(e-1728e5).toISOString(),end_time:new Date(e).toISOString(),entity_ids:[I.showroomPower],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),s=Array.isArray(r)?Array.isArray(r[0])?r[0]:r:Object.values(r||{})[0],o=(Array.isArray(s)?s:[]).map(h=>({value:Number((h==null?void 0:h.state)??(h==null?void 0:h.s)),time:Date.parse(String((h==null?void 0:h.last_changed)??(h==null?void 0:h.last_updated)??(h==null?void 0:h.lu)??(h==null?void 0:h.lc)??""))})).filter(h=>Number.isFinite(h.value)&&Number.isFinite(h.time)),n=new Map;o.forEach(h=>n.set(Math.floor(h.time/36e5),h.value));const l=Math.floor(e/36e5),d=Array.from({length:24},(h,g)=>n.get(l-23+g)).filter(h=>typeof h=="number"),p=Array.from({length:24},(h,g)=>n.get(l-47+g)).filter(h=>typeof h=="number");if(this._history=d,d.length&&p.length){const h=d.reduce((u,_)=>u+_,0)/d.length,g=p.reduce((u,_)=>u+_,0)/p.length;this._historyTrend=g>0?(h-g)/g*100:null}this._historyState=d.length?"ready":"unavailable"}catch{this._historyState="error"}this.requestUpdate()}_setFloor(t){t!==this._activeFloor&&(this._activeFloor=t,this.requestUpdate())}_onTouchStart(t){const e=t.changedTouches[0]||t.touches[0];e&&(this._touchStartX=e.clientX,this._touchLastX=e.clientX)}_onPointerDown(t){t.pointerType==="touch"||t.button!==0||(this._mouseStartX=t.clientX,this._mouseLastX=t.clientX)}_finishFloorSwipe(t){Math.abs(t)<54||this._setFloor(t<0?"upper":"ground")}async _toggleZone(t){var a;if(!((a=this._hass)!=null&&a.callService)||this._actionState==="loading")return;const e=this._availableCircuits(t);if(!e.length)return;const i=t.action?!this._profileActive(t):this._onCircuits(t).length!==e.length;this._actionState="loading",this._actionMessage=`${i?"Encendiendo":"Apagando"} ${t.label}`,this.requestUpdate();try{if(t.action)if(!i)await this._hass.callService("switch","turn_off",{entity_id:e.map(r=>r.entity)});else{t.action.serviceEntity&&!L(this._state(t.action.serviceEntity))&&await this._hass.callService("scene","turn_on",{entity_id:t.action.serviceEntity});const r=t.action.offEntities.filter(o=>!L(this._state(o))),s=t.action.onEntities.filter(o=>!L(this._state(o)));r.length&&await this._hass.callService("switch","turn_off",{entity_id:r}),s.length&&await this._hass.callService("switch","turn_on",{entity_id:s})}else await this._hass.callService("switch",i?"turn_on":"turn_off",{entity_id:e.map(r=>r.entity)});this._actionState="idle",this._actionMessage=i&&t.action?`${t.action.label} aplicado en ${t.label}`:`Orden enviada a ${t.label}`}catch(r){this._actionState="error",this._actionMessage=r instanceof Error?r.message:"No se pudo ejecutar la acción"}this.requestUpdate()}async _setAll(t){var i;if(!((i=this._hass)!=null&&i.callService)||this._actionState==="loading")return;const e=st.flatMap(a=>this._availableCircuits(a).map(r=>r.entity));if(e.length){this._actionState="loading",this._actionMessage=t?"Encendiendo circuitos disponibles":"Apagando circuitos disponibles",this.requestUpdate();try{await this._hass.callService("switch",t?"turn_on":"turn_off",{entity_id:e}),this._actionState="idle",this._actionMessage="Orden enviada. Esperando confirmación de Home Assistant"}catch(a){this._actionState="error",this._actionMessage=a instanceof Error?a.message:"No se pudo ejecutar la acción"}this.requestUpdate()}}_scrollTo(t){var e;(e=this.renderRoot.querySelector(`#${t}`))==null||e.scrollIntoView({behavior:"smooth",block:"start"})}_toggleMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_renderZoneRow(t){var l;const e=this._availableCircuits(t),i=this._onCircuits(t),a=t.circuits.length-e.length,r=this._zonePower(t),s=this._profileActive(t),o=e.length?a?"warning":i.length?"normal":"off":"unavailable",n=o==="unavailable"?"No disponible":o==="warning"?"Parcial":o==="normal"?"Normal":"Apagada";return k`
      <div class="circuit-row" role="row">
        <div class="zone-name" role="cell">${f("lightbulb",{size:18})}<strong>${t.label}</strong></div>
        <div role="cell"><span class="status status-${o}"><i></i>${n}</span></div>
        <div role="cell" class="numeric">${r?this._format(r.value,"W"):"No disponible"}${r&&!r.measured?k`<small>nominal</small>`:w}</div>
        <div role="cell" class="numeric">${e.length} / ${t.circuits.length}</div>
        <div role="cell">
          <button class="toggle ${s?"is-on":""}" ?disabled=${!e.length||this._actionState==="loading"} @click=${()=>this._toggleZone(t)} aria-label="${s?"Apagar":"Activar"} ${((l=t.action)==null?void 0:l.label)||t.label}" aria-pressed=${s}><span></span></button>
        </div>
      </div>`}_renderFloorOverlays(){return Hi[this._activeFloor].map(t=>{const e=st.find(l=>l.id===t.zoneId);if(!e)return w;const i=this._availableCircuits(e),a=this._onCircuits(e),r=this._zonePower(e),s=e.temperature?U(this._state(e.temperature)):null,o=e.humidity?U(this._state(e.humidity)):null;return i.length||r||s!==null||o!==null?k`
        <div class="zone-overlay ${a.length?"is-active":""}" style="left:${t.left}%;top:${t.top}%;width:${t.width||21}%">
          <strong>${e.label}</strong>
          <div class="overlay-metrics">
            ${i.length?k`<span>${f("lightbulb",{size:12})}${a.length}/${i.length}</span>`:w}
            ${r?k`<span>${f("zap",{size:12})}${this._format(r.value,"W")}</span>`:w}
            ${s!==null?k`<span>${f("thermometer",{size:12})}${this._format(s,"°C",1)}</span>`:w}
            ${o!==null?k`<span>${f("droplets",{size:12})}${this._format(o,"%",0)}</span>`:w}
          </div>
        </div>`:w})}render(){var p;const t=qi[this._activeFloor],e=this._weather(),i=this._environment(),a=this._activePower(),r=this._history.length?Math.max(...this._history,1):1,o=(Array.isArray(this._panel.alarm_entities)?this._panel.alarm_entities:[]).map(h=>this._state(h)).filter(h=>h&&!L(h)&&h.state!=="off"),n=!!((p=this._hass)!=null&&p.states&&Object.keys(this._hass.states).length),l=new Intl.DateTimeFormat("es-BO",{hour:"2-digit",minute:"2-digit",hour12:!1}).format(this._clock),d=new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"short",year:"numeric"}).format(this._clock);return k`
      <div class="bms-shell">
        <header class="topbar">
          <button class="menu-button" @click=${this._toggleMenu} aria-label="Abrir menú de Home Assistant">${f("sliders",{size:21})}</button>
          <div class="brand-mark">${f("home",{size:27})}<div><strong>WITMIND</strong><span>CONTROL DE EDIFICIO</span></div></div>
          <div class="title-block"><h1>Control de Edificio</h1><p>Sistema de gestión y monitoreo</p></div>
          <div class="header-status"><div class="clock"><strong>${l}</strong><span>${d}</span></div><div class="weather-chip">${f("sun",{size:22})}<span><strong>${this._format(e.temperature,"°C",1)}</strong>${e.condition}</span></div><div class="mode-chip ${n?"ok":"warn"}">${f(n?"check":"alert-circle",{size:18})}<span><small>Estado</small><strong>${n?"Supervisión activa":"Conexión pendiente"}</strong></span></div></div>
        </header>

        <aside class="sidebar" aria-label="Secciones del edificio">
          <div class="side-brand">${f("home",{size:24})}<span>WITMIND</span></div>
          <nav>
            <button class="active" @click=${()=>this._scrollTo("floor-plan")}>${f("home")}<span>Inicio</span></button>
            <button @click=${()=>this._scrollTo("consumption")}>${f("zap")}<span>Eléctrico</span></button>
            <button @click=${()=>this._scrollTo("environment")}>${f("sun")}<span>Clima</span></button>
            <button @click=${()=>this._scrollTo("circuits")}>${f("lightbulb")}<span>Iluminación</span></button>
            <button @click=${()=>this._scrollTo("alerts")}>${f("shield")}<span>Seguridad</span></button>
            <button @click=${()=>this._scrollTo("consumption")}>${f("activity")}<span>Energía</span></button>
            <button disabled>${f("layers")}<span>Reportes</span></button>
            <button disabled>${f("settings")}<span>Configuración</span></button>
          </nav>
          <div class="operator"><span class="operator-avatar">W</span><div><strong>Operación</strong><small>Home Assistant</small></div></div>
        </aside>

        <main class="dashboard-grid">
          <section class="main-column">
            <article id="floor-plan" class="panel floor-card">
              <div class="panel-head"><div class="panel-title">${f("home",{size:19})}<h2>PLANO DEL EDIFICIO <span>${t.context}</span></h2></div><div class="floor-selector" role="group" aria-label="Seleccionar planta"><button class=${this._activeFloor==="ground"?"selected":""} @click=${()=>this._setFloor("ground")}>Planta Baja</button><button class=${this._activeFloor==="upper"?"selected":""} @click=${()=>this._setFloor("upper")}>Planta Alta</button></div></div>
              <div class="floor-viewport" data-no-swipe @touchstart=${this._onTouchStart} @pointerdown=${this._onPointerDown} aria-label="${t.label}: ${t.context}">
                <img src=${t.image} alt="Plano arquitectónico real de ${t.label}" draggable="false" />
                <div class="floor-overlays" aria-label="Datos en tiempo real de ${t.label}">${this._renderFloorOverlays()}</div>
                <div class="floor-caption"><strong>${t.label}</strong><span>${t.context}</span></div>
                <div class="compass" aria-label="Norte">N<span>↑</span></div>
              </div>
            </article>

            <article id="circuits" class="panel circuits-card">
              <div class="panel-head"><div class="panel-title">${f("lightbulb",{size:19})}<h2>CIRCUITOS POR ZONA</h2></div><span class="head-meta">${t.label}</span></div>
              <div class="circuit-table" role="table" aria-label="Circuitos por zona">
                <div class="circuit-header" role="row"><span role="columnheader">Zona</span><span role="columnheader">Estado</span><span role="columnheader">Potencia</span><span role="columnheader">Circuitos</span><span role="columnheader">Acciones</span></div>
                ${this._zones().filter(h=>h.showInTable!==!1&&h.circuits.length).map(h=>this._renderZoneRow(h))}
              </div>
            </article>
          </section>

          <section class="side-column">
            <article id="alerts" class="panel side-card alerts-card">
              <div class="panel-head"><div class="panel-title warning-icon">${f("alert-triangle",{size:19})}<h2>ALARMAS / EVENTOS</h2></div><span class="head-meta">${o.length} activas</span></div>
              ${o.length?k`<div class="alert-list">${o.map(h=>{var g;return k`<div class="alert-row">${f("alert-triangle",{size:20})}<div><strong>${String(((g=h==null?void 0:h.attributes)==null?void 0:g.friendly_name)||(h==null?void 0:h.entity_id))}</strong><span>${String(h==null?void 0:h.state)}</span></div></div>`})}</div>`:k`<div class="empty-state">${f("shield",{size:26})}<div><strong>Sin alarmas configuradas</strong><span>Conecta entidades en <code>alarm_entities</code> para habilitar esta sección.</span></div></div>`}
            </article>

            <article id="environment" class="panel side-card">
              <div class="panel-head"><div class="panel-title">${f("sun",{size:19})}<h2>CONDICIONES AMBIENTALES</h2></div></div>
              <div class="environment-grid"><div>${f("thermometer",{size:27})}<strong>${this._format(i.temperature,"°C",1)}</strong><span>Interior promedio</span></div><div>${f("droplets",{size:27})}<strong>${this._format(i.humidity,"%",0)}</strong><span>Humedad promedio</span></div><div>${f("sun",{size:27})}<strong>${this._format(e.temperature,"°C",1)}</strong><span>Exterior</span></div><div>${f("activity",{size:27})}<strong class="condition">${e.condition}</strong><span>WTX - MDTC</span></div></div>
            </article>

            <article id="consumption" class="panel side-card consumption-card">
              <div class="panel-head"><div class="panel-title">${f("zap",{size:19})}<h2>CONSUMO ELÉCTRICO</h2></div></div>
              <div class="power-reading">${f("zap",{size:43})}<div><strong>${this._format(a,"W")}</strong><span>${a===null?"Medición no disponible":"Showroom - potencia activa"}</span></div>${this._historyTrend!==null?k`<b class=${this._historyTrend<=0?"trend good":"trend bad"}>${this._historyTrend>0?"+":""}${this._historyTrend.toFixed(0)} %<small>vs. 24 h previas</small></b>`:w}</div>
              ${this._historyState==="ready"?k`<div class="history-bars" aria-label="Histórico real de potencia de las últimas 24 horas">${this._history.map(h=>k`<i style="height:${Math.max(4,h/r*100)}%" title="${this._format(h,"W")}"></i>`)}</div>`:k`<div class="history-empty"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><p>${this._historyState==="loading"?"Cargando histórico real de Home Assistant":this._historyState==="error"?"No se pudo cargar el histórico":"Histórico no disponible para esta medición"}.</p></div>`}
            </article>

            <article class="panel side-card quick-card">
              <div class="panel-head"><div class="panel-title">${f("settings",{size:19})}<h2>CONTROLES RÁPIDOS</h2></div></div>
              <div class="quick-grid"><button @click=${()=>this._setAll(!0)} ?disabled=${this._actionState==="loading"}>${f("lightbulb",{size:25})}<span><strong>Encender luces</strong><small>Circuitos disponibles</small></span></button><button @click=${()=>this._setAll(!1)} ?disabled=${this._actionState==="loading"}>${f("power",{size:25})}<span><strong>Apagar luces</strong><small>Circuitos disponibles</small></span></button><button disabled>${f("sparkles",{size:25})}<span><strong>Modo ahorro</strong><small>No configurado</small></span></button><button disabled>${f("settings",{size:25})}<span><strong>Mantenimiento</strong><small>No configurado</small></span></button></div>
              ${this._actionMessage?k`<div class="action-feedback ${this._actionState}">${this._actionState==="loading"?f("refresh-cw",{size:15}):f(this._actionState==="error"?"alert-circle":"check",{size:15})}<span>${this._actionMessage}</span></div>`:w}
            </article>
          </section>
        </main>
      </div>`}};St.styles=Ae`
    :host{display:block;min-height:100dvh;color:#eaf0f1;background:#061118;font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums;--line:rgba(128,183,200,.16);--surface:rgba(8,25,34,.92);--surface-2:rgba(11,33,43,.86);--muted:#8fa5ad;--orange:#f26522;--cyan:#42b9e8;--green:#22d98b;--amber:#ffb32c;--danger:#ff4d5f}:host([data-theme=light]){color:#14232a;background:#eaf0f1;--line:rgba(22,54,67,.16);--surface:rgba(255,255,255,.94);--surface-2:#f3f7f8;--muted:#667b84}*{box-sizing:border-box}button{font:inherit;color:inherit}:focus-visible{outline:2px solid var(--orange);outline-offset:2px}.bms-shell{min-height:100dvh;display:grid;grid-template:70px 1fr/200px 1fr;background:radial-gradient(circle at 62% 0,rgba(18,91,112,.13),transparent 36%),linear-gradient(145deg,#040c11,#071720 58%,#061118)}:host([data-theme=light]) .bms-shell{background:linear-gradient(145deg,#edf3f4,#dce7e9)}.topbar{grid-column:1/-1;position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:20px;padding:0 24px;border-bottom:1px solid var(--line);background:rgba(5,18,25,.94);backdrop-filter:blur(18px)}:host([data-theme=light]) .topbar{background:rgba(247,250,250,.94)}.menu-button{display:none;width:42px;height:42px;border:1px solid var(--line);border-radius:10px;background:var(--surface-2);cursor:pointer}.brand-mark{display:flex;align-items:center;gap:11px;min-width:245px;color:var(--orange)}.brand-mark>svg{width:33px;height:33px}.brand-mark div{display:grid}.brand-mark strong{color:inherit;font-size:20px;letter-spacing:.08em}.brand-mark span{font-size:9px;font-weight:800;letter-spacing:.14em}.title-block{padding-left:22px;border-left:1px solid var(--line)}.title-block h1{margin:0;font-size:26px;letter-spacing:-.035em}.title-block p{margin:3px 0 0;color:var(--muted);font-size:11px}.header-status{display:flex;align-items:center;gap:10px;margin-left:auto}.clock{display:grid;padding-right:14px;border-right:1px solid var(--line);text-align:right}.clock strong{font-size:21px}.clock span{color:var(--muted);font-size:9px;text-transform:capitalize}.weather-chip,.mode-chip{display:flex;align-items:center;gap:9px;min-height:42px;padding:7px 12px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2)}.weather-chip>svg{color:var(--amber)}.weather-chip span,.mode-chip span{display:grid}.weather-chip strong,.mode-chip strong{font-size:11px}.weather-chip span{color:var(--muted);font-size:9px}.mode-chip small{color:var(--muted);font-size:8px}.mode-chip.ok{border-color:rgba(34,217,139,.35)}.mode-chip.ok>svg,.mode-chip.ok strong{color:var(--green)}.mode-chip.warn>svg{color:var(--amber)}.sidebar{position:sticky;top:70px;height:calc(100dvh - 70px);display:flex;flex-direction:column;padding:14px 10px;border-right:1px solid var(--line);background:rgba(5,19,27,.78)}:host([data-theme=light]) .sidebar{background:rgba(241,246,247,.84)}.side-brand{display:none}.sidebar nav{display:grid;gap:6px}.sidebar nav button{min-height:51px;display:flex;align-items:center;gap:14px;padding:0 14px;border:1px solid transparent;border-radius:9px;background:transparent;color:#a6bac1;text-align:left;cursor:pointer}.sidebar nav button:hover:not(:disabled){background:rgba(255,255,255,.04)}.sidebar nav button.active{border-color:rgba(242,101,34,.3);border-left:3px solid var(--orange);background:linear-gradient(90deg,rgba(242,101,34,.17),rgba(242,101,34,.05));color:#fff}.sidebar nav button.active svg{color:var(--orange)}.sidebar nav button:disabled{opacity:.4;cursor:not-allowed}.operator{display:flex;align-items:center;gap:10px;margin-top:auto;padding:12px;border-top:1px solid var(--line)}.operator-avatar{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--line);border-radius:50%;background:var(--surface-2);font-weight:800}.operator div{display:grid}.operator strong{font-size:11px}.operator small{color:var(--muted);font-size:9px}.dashboard-grid{min-width:0;display:grid;grid-template-columns:minmax(0,1.95fr) minmax(330px,1fr);gap:14px;padding:14px}.main-column,.side-column{min-width:0;display:grid;align-content:start;gap:14px}.panel{overflow:hidden;border:1px solid var(--line);border-radius:12px;background:linear-gradient(150deg,var(--surface),rgba(6,24,32,.94));box-shadow:inset 0 1px rgba(255,255,255,.025),0 12px 30px rgba(0,0,0,.18)}:host([data-theme=light]) .panel{background:var(--surface)}.panel-head{min-height:46px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:8px 14px;border-bottom:1px solid var(--line)}.panel-title{display:flex;align-items:center;gap:9px}.panel-title>svg{color:var(--orange)}.panel-title h2{margin:0;font-size:13px;letter-spacing:.055em}.panel-title h2 span{color:var(--muted);font-weight:500}.warning-icon>svg{color:var(--amber)}.head-meta{color:var(--muted);font-size:10px}.floor-selector{display:flex;padding:3px;border:1px solid var(--line);border-radius:8px;background:rgba(0,0,0,.18)}.floor-selector button{min-height:30px;padding:0 12px;border:0;border-radius:6px;background:transparent;color:var(--muted);font-size:10px;cursor:pointer}.floor-selector button.selected{background:rgba(242,101,34,.16);color:#fff;box-shadow:inset 0 0 0 1px rgba(242,101,34,.32)}.floor-viewport{position:relative;height:min(56vh,585px);min-height:360px;display:grid;place-items:center;overflow:hidden;padding:12px;background:radial-gradient(circle at center,rgba(21,88,110,.22),transparent 65%),#06131a;touch-action:pan-y;user-select:none}.floor-viewport img{width:100%;height:100%;object-fit:contain;filter:saturate(.88) contrast(1.04);transition:opacity .18s}.floor-caption{position:absolute;left:16px;bottom:14px;display:flex;gap:8px;align-items:baseline;padding:7px 10px;border:1px solid var(--line);border-radius:7px;background:rgba(5,18,25,.82);backdrop-filter:blur(8px)}.floor-caption strong{font-size:11px}.floor-caption span{color:var(--muted);font-size:9px}.compass{position:absolute;right:16px;top:16px;width:40px;height:52px;display:grid;place-items:center;border:1px solid var(--line);border-radius:20px;background:rgba(5,18,25,.78);font-size:9px}.compass span{display:block;color:#dbe8eb;font-size:22px;line-height:17px}.circuit-table{padding:3px 10px 8px}.circuit-header,.circuit-row{display:grid;grid-template-columns:minmax(150px,1.5fr) minmax(95px,.8fr) minmax(105px,.8fr) 75px 70px;align-items:center;gap:8px}.circuit-header{min-height:30px;color:var(--muted);font-size:9px}.circuit-row{min-height:43px;border-top:1px solid var(--line);font-size:10px}.zone-name{display:flex;align-items:center;gap:9px}.zone-name svg{color:var(--orange)}.status{display:inline-flex;align-items:center;gap:6px}.status i{width:8px;height:8px;border-radius:50%;background:var(--muted)}.status-normal{color:var(--green)}.status-normal i{background:var(--green);box-shadow:0 0 9px rgba(34,217,139,.55)}.status-off{color:var(--muted)}.status-warning{color:var(--amber)}.status-warning i{background:var(--amber)}.numeric{font-variant-numeric:tabular-nums}.numeric small{display:block;color:var(--muted);font-size:8px}.toggle{width:38px;height:22px;padding:2px;border:1px solid var(--line);border-radius:999px;background:#183039;cursor:pointer}.toggle span{display:block;width:16px;height:16px;border-radius:50%;background:#8ba1aa;transition:transform .16s,background .16s}.toggle.is-on{border-color:var(--orange);background:rgba(242,101,34,.25)}.toggle.is-on span{transform:translateX(16px);background:#fff}.toggle:disabled{opacity:.4;cursor:not-allowed}.side-card{min-height:0}.side-card>.panel-head{min-height:42px}.side-card .panel-title h2{font-size:12px}.empty-state{min-height:98px;display:flex;align-items:center;gap:13px;padding:18px;color:var(--muted)}.empty-state>svg{color:var(--green)}.empty-state div{display:grid;gap:4px}.empty-state strong{color:inherit;font-size:11px}.empty-state span{font-size:9px;line-height:1.45}.empty-state code{color:var(--orange)}.alert-list{padding:4px 12px}.alert-row{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);color:var(--danger)}.alert-row div{display:grid}.alert-row strong{font-size:10px}.alert-row span{color:var(--muted);font-size:9px}.environment-grid{display:grid;grid-template-columns:repeat(4,1fr);padding:10px}.environment-grid>div{min-width:0;display:grid;place-items:center;gap:5px;padding:10px 5px;border-right:1px solid var(--line);text-align:center}.environment-grid>div:last-child{border-right:0}.environment-grid svg{color:var(--cyan)}.environment-grid strong{font-size:15px}.environment-grid .condition{max-width:95px;font-size:10px;line-height:1.25}.environment-grid span{color:var(--muted);font-size:8px}.power-reading{display:flex;align-items:center;gap:14px;padding:13px 18px}.power-reading>svg{color:var(--amber)}.power-reading div{display:grid}.power-reading strong{font-size:26px;line-height:1}.power-reading span{margin-top:5px;color:var(--muted);font-size:9px}.history-empty{position:relative;height:69px;display:flex;align-items:flex-end;gap:5px;margin:0 14px 12px;padding:0 0 22px;border-bottom:1px solid var(--line)}.history-empty>span{flex:1;max-width:22px;height:12px;background:rgba(242,101,34,.16);border:1px solid rgba(242,101,34,.2)}.history-empty>span:nth-child(2n){height:20px}.history-empty>span:nth-child(3n){height:8px}.history-empty p{position:absolute;left:0;bottom:1px;margin:0;color:var(--muted);font-size:8px}.quick-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;padding:10px}.quick-grid button{min-height:58px;display:flex;align-items:center;gap:10px;padding:9px 11px;border:1px solid var(--line);border-radius:8px;background:var(--surface-2);text-align:left;cursor:pointer}.quick-grid button:hover:not(:disabled){border-color:rgba(242,101,34,.45);background:rgba(242,101,34,.09)}.quick-grid button>svg{color:var(--orange)}.quick-grid button span{display:grid}.quick-grid strong{font-size:10px}.quick-grid small{margin-top:3px;color:var(--muted);font-size:8px}.quick-grid button:disabled{opacity:.42;cursor:not-allowed}.action-feedback{display:flex;align-items:center;gap:7px;margin:0 10px 10px;padding:7px 9px;border:1px solid var(--line);border-radius:7px;color:var(--muted);font-size:9px}.action-feedback.loading svg{animation:spin 1s linear infinite}.action-feedback.error{color:var(--danger)}@keyframes spin{to{transform:rotate(360deg)}}
    .floor-overlays{position:absolute;inset:0;pointer-events:none}.zone-overlay{position:absolute;z-index:2;display:grid;gap:4px;padding:6px 8px;border:1px solid rgba(66,185,232,.3);border-radius:7px;background:rgba(4,17,24,.86);box-shadow:0 5px 18px rgba(0,0,0,.28);backdrop-filter:blur(7px)}.zone-overlay.is-active{border-color:rgba(34,217,139,.48);box-shadow:0 0 16px rgba(34,217,139,.1)}.zone-overlay>strong{overflow:hidden;color:#edf6f7;font-size:9px;line-height:1.2;text-overflow:ellipsis;white-space:nowrap}.overlay-metrics{display:flex;flex-wrap:wrap;gap:3px 7px}.overlay-metrics span{display:inline-flex;align-items:center;gap:3px;color:#a9bec5;font-size:8px;white-space:nowrap}.overlay-metrics svg{color:var(--cyan)}.zone-overlay.is-active .overlay-metrics span:first-child svg{color:var(--green)}:host([data-theme=light]) .zone-overlay{background:rgba(247,251,251,.9)}:host([data-theme=light]) .zone-overlay>strong{color:#14232a}
    @media(max-width:1180px){.bms-shell{grid-template:64px 1fr/70px 1fr}.topbar{padding:0 14px}.brand-mark{min-width:auto}.brand-mark div,.title-block p,.weather-chip span:not(:first-child){display:none}.title-block{padding-left:14px}.sidebar{top:64px;height:calc(100dvh - 64px);padding:10px 7px}.sidebar nav button{justify-content:center;padding:0}.sidebar nav button span,.operator div{display:none}.operator{justify-content:center;padding:10px 0}.dashboard-grid{grid-template-columns:minmax(0,1.55fr) minmax(300px,1fr);padding:10px;gap:10px}.main-column,.side-column{gap:10px}.environment-grid{grid-template-columns:1fr 1fr}.environment-grid>div:nth-child(2){border-right:0}.environment-grid>div:nth-child(-n+2){border-bottom:1px solid var(--line)}.zone-overlay{padding:5px 6px}.zone-overlay>strong{font-size:8px}.overlay-metrics span{font-size:7px}}
    @media(max-width:820px){.bms-shell{display:block}.topbar{position:sticky;height:64px}.menu-button{display:grid;place-items:center}.brand-mark{display:none}.title-block{border-left:0;padding-left:0}.title-block h1{font-size:19px}.header-status .weather-chip,.mode-chip{display:none}.clock{border-right:0;padding-right:0}.sidebar{display:none}.dashboard-grid{display:flex;flex-direction:column;padding:8px}.main-column,.side-column{display:contents}.floor-card{order:1}.circuits-card{order:2}.alerts-card{order:3}#environment{order:4}#consumption{order:5}.quick-card{order:6}.floor-viewport{height:48vh;min-height:300px}.floor-selector button{padding:0 9px}.circuit-header{display:none}.circuit-row{grid-template-columns:minmax(120px,1.35fr) minmax(82px,.9fr) minmax(85px,.8fr) 55px;min-height:50px}.circuit-row>[role=cell]:nth-child(4){display:none}.panel{border-radius:10px}}
    @media(max-width:520px){.topbar{gap:10px}.clock strong{font-size:17px}.clock span{display:none}.floor-viewport{height:42vh;min-height:250px;padding:5px}.panel-head{padding:7px 10px}.panel-title h2{font-size:11px}.floor-selector button{font-size:9px}.circuit-table{padding:3px 8px 7px}.circuit-row{grid-template-columns:minmax(105px,1.2fr) minmax(80px,.9fr) 68px 44px;gap:4px}.circuit-row>[role=cell]:nth-child(3){font-size:9px}.zone-name{gap:5px}.zone-name svg{display:none}.environment-grid{grid-template-columns:1fr 1fr}.quick-grid{grid-template-columns:1fr}.floor-caption{left:8px;bottom:8px}.compass{right:8px;top:8px}.side-card .panel-title h2{font-size:10px}.zone-overlay{width:auto!important;max-width:34%;padding:4px}.zone-overlay>strong{font-size:7px}.overlay-metrics{gap:2px 5px}.overlay-metrics span{font-size:6px}.overlay-metrics svg{display:none}}
    @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important;animation:none!important}}
    .trend{display:grid;margin-left:auto;color:var(--muted);font-size:14px;text-align:right}.trend.good{color:var(--green)}.trend.bad{color:var(--danger)}.trend small{color:var(--muted);font-size:7px;font-weight:500}.history-bars{height:69px;display:flex;align-items:flex-end;gap:3px;margin:0 14px 12px;padding:4px 0 18px;border-bottom:1px solid var(--line)}.history-bars i{flex:1;min-width:2px;max-width:18px;background:var(--orange);box-shadow:0 0 7px rgba(242,101,34,.22)}
    .circuits-card{min-height:304px}.circuit-table{min-height:256px}
    @media(max-width:820px){.circuits-card{min-height:308px}.circuit-table{min-height:260px}}
  `;let ft=St;customElements.get("witmind-building-panel")||customElements.define("witmind-building-panel",ft);const Ut=8,Ui=56,Bi=24,Xi=.45,Bt=1.15;function Xt(c){return c.pointerType==="mouse"&&Number.isFinite(c.release)?c.release:c.lastMove}function Vt(c,t){const e=Math.abs(c),i=Math.abs(t);return e<Ut&&i<Ut?"pending":e>i*Bt?"horizontal":i>e*Bt?"vertical":"pending"}function Yt(c){if(c.cancelled||c.axis!=="horizontal"||!Number.isFinite(c.dx))return 0;const t=Math.abs(c.dx),e=Math.max(1,c.elapsedMs),i=t>=Ui,a=t>=Bi&&t/e>=Xi;return!i&&!a?0:c.dx<0?1:-1}const Vi={panel_kind:"lobby",title:"Lobby",subtitle:"Control operativo",site_label:"WTX · MDTC",weather:"weather.forecast_casa",light_count_sensor:"sensor.lobby_luminarias_encendidas",energy_sensor:"sensor.showroom_energia_estimada",history_hours:4,chart_hours:24,show_forecast:!0,spots:[{entity:"switch.interruptor_inteligente_3_switch_1",name:"Central Colgante",subtitle:"Iluminación central",icon:"pendant"},{entity:"switch.interruptor_inteligente_3_switch_2",name:"Spots 5W Decorativos",subtitle:"Iluminación decorativa",icon:"spot"},{entity:"switch.interruptor_inteligente_3_switch_3",name:"Tira LED",subtitle:"Iluminación ambiental",icon:"strip"},{entity:"switch.interruptor_inteligente_3_switch_4",name:"Spots 10W",subtitle:"Iluminación principal",icon:"spot"}],samples:[],reflector:{entity:""},scene_control_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"],scenes:[{id:"visita",name:"Visita",subtitle:"Todos los circuitos",icon:"presentation",on_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"regular",name:"Regular",subtitle:"Solo Spots 10W",icon:"bulb",on_entities:["switch.interruptor_inteligente_3_switch_4"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3"]}],sample_scenes:[]},Yi={panel_kind:"general",static_only:!1,title:"Control de Edificio",subtitle:"Sistema de gestión y monitoreo",site_label:"WTX · MDTC",weather:"weather.forecast_casa",show_forecast:!0,spots:[{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",subtitle:"Gerencia · 4×12 W nominal",icon:"bulb"},{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",subtitle:"Mindtec · 1×48 W nominal",icon:"bulb"},{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",subtitle:"Oficinas grandes · 4×42 W nominal",icon:"office"},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",subtitle:"Oficinas grandes · 4×42 W nominal",icon:"office"},{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",subtitle:"Pasillos y multifuncional · 4×24 W nominal",icon:"office"},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",subtitle:"Pasillos · 3×24 W + 3×15 W nominal",icon:"corridor"},{entity:"switch.taller_interruptor_1",name:"Taller",subtitle:"Taller · 3×48 W nominal",icon:"workshop"}],samples:[],reflector:{entity:""},scenes:[],sample_scenes:[],scene_control_entities:[]},bt={panel_kind:"offices",title:"Oficinas",subtitle:"Control operativo",description:"Circuitos de oficinas con potencia nominal instalada.",weather:"weather.forecast_casa",power_watts:{"switch.oficina_gerencial_interruptor_1":48,"switch.oficina_mindtec_interruptor_1":48,"switch.oficina_grande_interruptor_1":168,"switch.oficina_grande_interruptor_2":168,"switch.b2_gang_interruptor_1":96,"switch.b2_gang_interruptor_2":117,"switch.taller_interruptor_1":144},areas:[{id:"gerencia",name:"Gerencia",environment:{temperature:"sensor.t_h_sensor_temperature",humidity:"sensor.t_h_sensor_humidity"},devices:[{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",subtitle:"4×12 W nominal",watts:48}]},{id:"mindtec",name:"Mindtec",devices:[{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",subtitle:"1×48 W nominal",watts:48}]},{id:"general",name:"Oficinas grandes",environment:{temperature:"sensor.t_h_sensor_2_temperature",humidity:"sensor.t_h_sensor_2_humidity"},devices:[{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",subtitle:"4×42 W nominal",watts:168},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",subtitle:"4×42 W nominal",watts:168}]},{id:"pasillos",name:"Pasillos y multifuncional",devices:[{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",subtitle:"4×24 W nominal",watts:96,icon:"office"},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",subtitle:"3×24 W + 3×15 W nominal",watts:117,icon:"corridor"}]},{id:"taller",name:"Taller",devices:[{entity:"switch.taller_interruptor_1",name:"Taller",subtitle:"3×48 W nominal",watts:144,icon:"workshop"}]}]},yt={panel_kind:"recording",title:"Sala de grabación",subtitle:"Control operativo",description:"Cuatro circuitos con potencia nominal configurada.",weather:"weather.forecast_casa",power_watts:{"switch.4gang_switch_sala_grabacion_interruptor_1":24,"switch.4gang_switch_sala_grabacion_interruptor_2":96,"switch.4gang_switch_sala_grabacion_interruptor_3":50,"switch.4gang_switch_sala_grabacion_interruptor_4":30},switches:[{entity:"switch.4gang_switch_sala_grabacion_interruptor_1",name:"Tira LED",subtitle:"1×24 W nominal",watts:24,icon:"strip"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_2",name:"Paneles",subtitle:"2×48 W nominal",watts:96,icon:"panel"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_3",name:"Spots",subtitle:"5×10 W nominal",watts:50,icon:"spot"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_4",name:"Otras luces",subtitle:"3×10 W nominal",watts:30,icon:"bulb"}]},Gi={panel_kind:"control",title:"Control general",subtitle:"Centro de control",description:"Escenas y rutinas conectadas a Home Assistant.",weather:"weather.forecast_casa",device_watts:{...bt.power_watts,...yt.power_watts,"switch.interruptor_inteligente_switch_1":48,"switch.interruptor_inteligente_switch_2":48,"switch.interruptor_inteligente_switch_3":48,"switch.interruptor_inteligente_switch_4":48,"switch.interruptor_inteligente_2_switch_1":48,"switch.interruptor_inteligente_2_switch_2":48,"switch.interruptor_inteligente_2_switch_3":48,"switch.interruptor_inteligente_2_switch_4":48,"switch.smart_relay_switch_3_switch":48,"switch.smart_relay_switch_4_switch":48,"switch.interruptor_inteligente_3_switch_1":0,"switch.interruptor_inteligente_3_switch_2":0,"switch.interruptor_inteligente_3_switch_3":0,"switch.interruptor_inteligente_3_switch_4":0},zones:[{id:"showroom",name:"Showroom",entities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_4_switch","switch.smart_relay_switch_3_switch"]},{id:"lobby",name:"Lobby",entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"oficinas",name:"Oficinas",entities:Object.keys(bt.power_watts)},{id:"grabacion",name:"Sala de grabación",entities:Object.keys(yt.power_watts)}],main_actions:[{id:"showroom-reunion",name:"Reunión showroom",subtitle:"Escena de reunión",service_entities:["scene.reunion"],tone:"accent"},{id:"showroom-presentacion",name:"Presentación showroom",subtitle:"Escena de presentación",service_entities:["scene.presentacion"],tone:"accent"},{id:"showroom-apagado",name:"Apagar showroom",subtitle:"Apaga los circuitos del showroom",service_entities:["script.showroom_apagado_general"],tone:"danger"},{id:"lobby-regular",name:"Lobby regular",subtitle:"Solo iluminación principal",on_entities:["switch.interruptor_inteligente_3_switch_4"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3"]},{id:"lobby-visita",name:"Lobby visita",subtitle:"Todos los circuitos",on_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"lobby-apagado",name:"Apagar lobby",subtitle:"Apaga los cuatro circuitos",off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]}],daily_actions:[{id:"inicio-dia",name:"Inicio del día",subtitle:"Rutina de apertura",on_entities:["switch.interruptor_inteligente_3_switch_4","switch.oficina_gerencial_interruptor_1","switch.b2_gang_interruptor_1"],off_entities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.b2_gang_interruptor_2"]},{id:"fin-dia",name:"Fin del día",subtitle:"Rutina de cierre",service_entities:["script.showroom_apagado_general"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]}],danger_action:{id:"apagado-total",name:"Apagado total Witmind",subtitle:"Apaga showroom, lobby, oficinas y grabación",service_entities:["script.apagado_total_witmind"],tone:"danger"}},Zi={panel_kind:"calendar",title:"Calendario laboral",subtitle:"Planificación operativa",description:"Días laborales gestionados desde Home Assistant."},Ki={panel_kind:"notifications",title:"Notificaciones Witmind",subtitle:"Centro de avisos",description:"Reglas, destinos e historial de notificaciones."},Qi={panel_kind:"energy",title:"Gestión de energía",subtitle:"Analítica del edificio",description:"Consumo, historial de uso y simulación de dimerización."},xt=[{id:"general",label:"Edificio",icon:"⌂"},{id:"showroom",label:"Showroom",icon:"✦"},{id:"lobby",label:"Lobby",icon:"⌂"},{id:"offices",label:"Oficinas",icon:"▦"},{id:"recording",label:"Grabación",icon:"◈"},{id:"energy",label:"Energía",icon:"ϟ"},{id:"calendar",label:"Calendario",icon:"▣"},{id:"notifications",label:"Notificaciones",icon:"◉"},{id:"control",label:"Control",icon:"⚡"}],ut=c=>{const t=String(c||"").trim().toLowerCase(),i={"oficinas-control":"offices",oficinas:"offices","sala-grabacion":"recording",grabacion:"recording",energia:"energy","gestion-energia":"energy","calendario-laboral":"calendar",calendario:"calendar",notificaciones:"notifications","control-general":"control"}[t]||t;return xt.some(a=>a.id===i)?i:"showroom"},mt=c=>JSON.parse(JSON.stringify(c));class Ji extends HTMLElement{constructor(){super(...arguments),this._config={},this._hass=null,this._narrow=!1,this._activeId="showroom",this._pages=[],this._track=null,this._drag=null,this._touchDrag=null,this._dragging=!1,this._suppressClickUntil=0,this._theme=this._loadTheme(),this._boundResize=()=>{this._drag||this._touchDrag||this._snap(!1)},this._boundTouchMove=t=>this._onTouchMove(t),this._boundTouchEnd=t=>this._onTouchEnd(t),this._boundTouchCancel=t=>this._onTouchEnd(t),this._boundTheme=t=>{var i;const e=(i=t.detail)==null?void 0:i.theme;(e==="dark"||e==="light")&&this._setTheme(e)}}set config(t){this._config=t&&typeof t=="object"?t:{},this._activeId=ut(this._config.panel_id||this._config.panelId||this._config.panel_kind),this.isConnected&&this._mountPages()}get config(){return this._config}set hass(t){this._hass=t,this._pages.forEach(e=>{const i=e.firstElementChild;i&&(i.hass=t||void 0)})}get hass(){return this._hass}set narrow(t){this._narrow=!!t,this.toggleAttribute("narrow",this._narrow),this._pages.forEach(e=>{const i=e.firstElementChild;i&&(i.narrow=this._narrow)})}get narrow(){return this._narrow}connectedCallback(){this.attachShadow({mode:"open"}),this._renderShell(),this._mountPages(),window.addEventListener("resize",this._boundResize,{passive:!0}),window.addEventListener("touchmove",this._boundTouchMove,{passive:!1}),window.addEventListener("touchend",this._boundTouchEnd,{passive:!0}),window.addEventListener("touchcancel",this._boundTouchCancel,{passive:!0}),this.addEventListener("witmind-theme-change",this._boundTheme)}disconnectedCallback(){window.removeEventListener("resize",this._boundResize),window.removeEventListener("touchmove",this._boundTouchMove),window.removeEventListener("touchend",this._boundTouchEnd),window.removeEventListener("touchcancel",this._boundTouchCancel),this.removeEventListener("witmind-theme-change",this._boundTheme)}_renderShell(){var e;this.shadowRoot.innerHTML=`
      <style>
        :host { display:block; height:100dvh; min-height:100dvh; overflow:hidden; background:var(--wit-canvas,#071118); }
        .workspace { position:relative; width:100%; height:100%; min-height:0; overflow:hidden; }
        .track { display:flex; width:100%; height:100%; min-height:0; touch-action:pan-y pinch-zoom; transition:transform 280ms cubic-bezier(.2,.8,.2,1); will-change:transform; }
        .track.is-dragging { transition:none; cursor:grabbing; }
        .page { flex:0 0 100%; width:100%; min-width:100%; height:100%; min-height:0; overflow-x:hidden; overflow-y:auto; overscroll-behavior:contain; background:var(--wit-canvas,#071118); contain:layout paint; }
        @media (min-width:821px) { .page[data-panel-id="general"] { scrollbar-gutter:stable; } }
        .workspace-nav { position:fixed; z-index:80; left:50%; bottom:max(16px, env(safe-area-inset-bottom)); transform:translateX(-50%); display:flex; align-items:center; gap:6px; padding:5px; border:1px solid var(--wit-border-medium,rgba(255,255,255,.12)); border-radius:var(--wit-radius-pill,999px); background:var(--wit-surface-glass,rgba(7,17,24,.78)); box-shadow:var(--wit-shadow-dock,0 12px 32px rgba(0,0,0,.28)); backdrop-filter:blur(18px); }
        .workspace-nav button { width:var(--wit-touch-min,44px); height:var(--wit-touch-min,44px); display:grid; place-items:center; border:0; border-radius:var(--wit-radius-pill,999px); color:var(--wit-text-primary,#f5f6f4); background:transparent; cursor:pointer; font:inherit; }
        .workspace-nav button:hover:not(:disabled), .workspace-nav button:focus-visible { background:var(--wit-surface-interactive-hover,rgba(255,255,255,.1)); outline:2px solid var(--wit-accent,#f26522); outline-offset:1px; }
        .workspace-nav button:disabled { opacity:.35; cursor:not-allowed; }
        .workspace-nav .dot { width:9px; height:9px; padding:0; border:1px solid rgba(255,255,255,.5); background:transparent; }
        .workspace-nav .dot[aria-current="page"] { width:24px; border-color:var(--wit-accent,#f26522); background:var(--wit-accent,#f26522); }
        .workspace-nav.is-hidden { display:none; }
        @media (prefers-reduced-motion:reduce) { .track { transition:none; } }
      </style>
      <div class="workspace" data-workspace>
        <div class="track" data-track></div>
        <nav class="workspace-nav" aria-label="Paneles Witmind" data-nav></nav>
      </div>
    `;const t=this.shadowRoot.querySelector("[data-track]");this._track=t,t.addEventListener("pointerdown",i=>this._onPointerDown(i)),t.addEventListener("pointermove",i=>this._onPointerMove(i)),t.addEventListener("pointerup",i=>this._onPointerUp(i)),t.addEventListener("pointercancel",i=>this._onPointerUp(i)),t.addEventListener("touchstart",i=>this._onTouchStart(i),{passive:!0}),t.addEventListener("click",i=>this._onTrackClick(i),!0),(e=this.shadowRoot.querySelector("[data-nav]"))==null||e.addEventListener("click",i=>this._onNavClick(i))}_panelConfigs(){const t=this._config.workspace_panels||this._config.workspacePanels,e=Array.isArray(t)?t:[],i=new Map(e.map(r=>{const s=r&&typeof r=="object"?r:{};return[ut(s.id||s.panel_id||s.panelId||s.panel_kind),s]})),a=ut(this._config.panel_id||this._config.panelId||this._config.panel_kind);return xt.map(r=>{const s=r.id==="general"?Yi:r.id==="lobby"?Vi:r.id==="offices"?bt:r.id==="recording"?yt:r.id==="energy"?Qi:r.id==="calendar"?Zi:r.id==="notifications"?Ki:r.id==="control"?Gi:{},o=i.get(r.id)||{},n=r.id===a?this._config:{},l={...mt(s),...mt(o),...mt(n)};return r.id==="lobby"&&Array.isArray(n.devices)&&!Array.isArray(n.spots)&&(l.spots=n.devices),r.id==="general"?(l.panel_kind="general",l.static_only=!1):r.id==="lobby"?l.panel_kind="lobby":["offices","recording","control","energy","calendar","notifications"].includes(r.id)?l.panel_kind=r.id:(delete l.panel_kind,delete l.static_only),{...r,config:l}})}_mountPages(){this._track&&(this._track.innerHTML="",this._pages=[],this._panelConfigs().forEach((t,e)=>{const i=document.createElement("section");i.className="page",i.dataset.panelId=t.id,i.setAttribute("aria-label",t.label),i.setAttribute("aria-hidden",String(t.id!==this._activeId)),i.inert=t.id!==this._activeId,t.id===this._activeId&&this._attachPanel(i,t),this._track.append(i),this._pages.push(i),e===0&&(i.dataset.first="true")}),this._renderNav(),this._snap(!1))}_attachPanel(t,e){if(t.firstElementChild)return;const i=e.id==="general"?"witmind-building-panel":e.id==="energy"?"witmind-energy-panel":["offices","recording","control"].includes(e.id)?"witmind-operations-panel":["calendar","notifications"].includes(e.id)?"witmind-admin-panel":"showroom-panel",a=document.createElement(i);a.panel=i==="showroom-panel"?{config:e.config}:e.config,a.theme=this._theme,a.narrow=this._narrow,this._hass&&(a.hass=this._hass),t.append(a)}_activeIndex(){const t=this._pages.findIndex(e=>e.dataset.panelId===this._activeId);return t>=0?t:0}_renderNav(){var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-nav]");if(!t)return;const e=this._activeIndex();t.classList.toggle("is-hidden",this._activeId==="general"),t.innerHTML=`
      <button type="button" data-direction="prev" aria-label="Panel anterior" ${e===0?"disabled":""}>‹</button>
      ${xt.map(a=>`<button type="button" class="dot" data-panel="${a.id}" aria-label="Abrir ${a.label}" aria-current="${a.id===this._activeId?"page":"false"}"></button>`).join("")}
      <button type="button" data-direction="next" aria-label="Panel siguiente" ${e===this._pages.length-1?"disabled":""}>›</button>
    `}_onNavClick(t){const e=t.target.closest("button");e&&(e.dataset.panel?this._goTo(e.dataset.panel):this._goTo(this._activeIndex()+(e.dataset.direction==="next"?1:-1)))}_onPointerDown(t){if(t.pointerType==="touch"||!t.isPrimary||t.pointerType==="mouse"&&t.button!==0)return;const e=this._isSwipeIgnored(t);this._drag={pointerId:t.pointerId,pointerType:t.pointerType,startX:t.clientX,startY:t.clientY,lastX:t.clientX,lastY:t.clientY,time:performance.now(),ignored:e,axis:"pending"},this._dragging=!1}_onPointerMove(t){var s,o,n;if(!this._drag||this._drag.ignored||this._drag.pointerId!==t.pointerId||!this._track)return;const e=((s=t.getCoalescedEvents)==null?void 0:s.call(t))||[],i=e[e.length-1]||t;this._drag.lastX=i.clientX,this._drag.lastY=i.clientY;const a=this._drag.lastX-this._drag.startX,r=this._drag.lastY-this._drag.startY;this._drag.axis==="pending"&&(this._drag.axis=Vt(a,r)),this._drag.axis==="horizontal"&&(this._dragging||(this._dragging=!0,(n=(o=t.currentTarget).setPointerCapture)==null||n.call(o,t.pointerId)),this._track.classList.add("is-dragging"),this._track.style.transform=`translate3d(calc(${this._activeIndex()*-100}% + ${a}px), 0, 0)`,t.preventDefault())}_onPointerUp(t){var l,d,p;if(!this._drag||this._drag.pointerId!==t.pointerId)return;const e=this._drag,i=t.type==="pointercancel";i||(e.lastX=Xt({pointerType:e.pointerType,lastMove:e.lastX,release:t.clientX}),e.lastY=Xt({pointerType:e.pointerType,lastMove:e.lastY,release:t.clientY}));const a=e.lastX-e.startX,r=Math.max(1,performance.now()-this._drag.time),s=Yt({axis:e.axis,cancelled:i,dx:a,elapsedMs:r}),o=this._dragging&&e.axis==="horizontal",n=t.currentTarget;(l=n.hasPointerCapture)!=null&&l.call(n,t.pointerId)&&((d=n.releasePointerCapture)==null||d.call(n,t.pointerId)),(p=this._track)==null||p.classList.remove("is-dragging"),this._drag=null,this._dragging=!1,o&&(this._suppressClickUntil=performance.now()+500),s?this._goTo(this._activeIndex()+s):this._snap(!0)}_isSwipeIgnored(t){const e="input,textarea,select,[data-no-swipe]",i=t.target;return t.composedPath().some(a=>a instanceof HTMLElement&&!!a.closest(e))||i instanceof HTMLElement&&!!i.closest(e)}_onTouchStart(t){if(t.touches.length!==1||this._drag)return;const e=t.changedTouches[0]||t.touches[0];if(!e)return;const i=this._isSwipeIgnored(t);this._touchDrag={pointerId:e.identifier,pointerType:"touch",startX:e.clientX,startY:e.clientY,lastX:e.clientX,lastY:e.clientY,time:performance.now(),ignored:i,axis:"pending"},this._dragging=!1}_onTouchMove(t){const e=this._touchDrag;if(!e||e.ignored||!this._track)return;const i=Array.from(t.touches).find(s=>s.identifier===e.pointerId);if(!i)return;e.lastX=i.clientX,e.lastY=i.clientY;const a=e.lastX-e.startX,r=e.lastY-e.startY;e.axis==="pending"&&(e.axis=Vt(a,r)),e.axis==="horizontal"&&(this._dragging=!0,this._track.classList.add("is-dragging"),this._track.style.transform=`translate3d(calc(${this._activeIndex()*-100}% + ${a}px), 0, 0)`,t.preventDefault())}_onTouchEnd(t){var l;const e=this._touchDrag;if(!e)return;const i=t.type==="touchcancel",a=Array.from(t.changedTouches).find(d=>d.identifier===e.pointerId);!i&&a&&(e.lastX=a.clientX,e.lastY=a.clientY);const r=e.lastX-e.startX,s=Math.max(1,performance.now()-e.time),o=Yt({axis:e.axis,cancelled:i,dx:r,elapsedMs:s}),n=this._dragging&&e.axis==="horizontal";(l=this._track)==null||l.classList.remove("is-dragging"),this._touchDrag=null,this._dragging=!1,n&&(this._suppressClickUntil=performance.now()+500),o?this._goTo(this._activeIndex()+o):this._snap(!0)}_onTrackClick(t){performance.now()>this._suppressClickUntil||(this._suppressClickUntil=0,t.preventDefault(),t.stopImmediatePropagation())}_goTo(t){const e=typeof t=="string"?this._pages.findIndex(a=>a.dataset.panelId===t):t;if(e<0||e>=this._pages.length){this._snap(!0);return}this._activeId=this._pages[e].dataset.panelId||this._activeId;const i=this._panelConfigs().find(a=>a.id===this._activeId);i&&this._attachPanel(this._pages[e],i),this._pages.forEach(a=>{const r=a.dataset.panelId===this._activeId;a.setAttribute("aria-hidden",String(!r)),a.inert=!r}),this._renderNav(),this._snap(!0),this.dispatchEvent(new CustomEvent("witmind-panel-change",{detail:{panelId:this._activeId},bubbles:!0,composed:!0}))}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_setTheme(t){if(this._theme!==t){this._theme=t;try{localStorage.setItem("witmind-showroom-panel-theme",t)}catch{}this._pages.forEach(e=>{const i=e.firstElementChild;i&&(i.setAttribute("data-theme",t),i.theme=t)})}}_snap(t=!0){this._track&&(this._track.classList.toggle("is-dragging",!t),this._track.style.transform=`translate3d(${this._activeIndex()*-100}%, 0, 0)`)}}customElements.get("witmind-workspace")||customElements.define("witmind-workspace",Ji);const Gt=()=>{var c,t;return((t=(c=globalThis.crypto)==null?void 0:c.randomUUID)==null?void 0:t.call(c))||`${Date.now()}-${Math.random().toString(16).slice(2)}`};class ta{constructor(t=window.parent){this.target=t,this.states=new Map,this.listeners=new Set,this.pending=new Map,this.subscriptions=new Map,window.addEventListener("message",e=>this.onMessage(e)),this.post({type:"WITMIND_READY"})}subscribeEntities(t,e){return this.listeners.add(e),this.post({type:"WITMIND_SUBSCRIBE_ENTITIES",entityIds:[...new Set(t)]}),e(Object.fromEntries(this.states)),()=>this.listeners.delete(e)}getEntity(t){return this.states.get(t)}callService(t,e={},i){return this.request("WITMIND_CALL_SERVICE","WITMIND_SERVICE_RESULT",{service:t,serviceData:e,target:i})}toggleMenu(){this.post({type:"WITMIND_TOGGLE_MENU"})}dbRequest(t,e={}){return this.request("WITMIND_DB_REQUEST","WITMIND_DB_RESULT",{command:t,payload:e})}haRequest(t,e={}){return this.request("WITMIND_HA_COMMAND","WITMIND_HA_RESULT",{command:t,payload:e})}haSubscribe(t,e,i){const a=Gt(),r=()=>{this.subscriptions.delete(a),this.post({type:"WITMIND_HA_UNSUBSCRIBE",requestId:a})};return new Promise((s,o)=>{const n=window.setTimeout(()=>{this.pending.delete(a),o(new Error("Timeout esperando suscripción HA"))},1e4);this.pending.set(a,{resolve:()=>{window.clearTimeout(n),s(r)},reject:o,timer:n}),this.subscriptions.set(a,i),this.post({type:"WITMIND_HA_SUBSCRIBE",requestId:a,command:t,payload:e})})}post(t){this.target.postMessage({protocol:1,source:"witmind-ui",...t},"*")}request(t,e,i){const a=Gt();return new Promise((r,s)=>{const o=window.setTimeout(()=>{this.pending.delete(a),s(new Error(`Timeout esperando ${e}`))},1e4);this.pending.set(a,{resolve:r,reject:s,timer:o}),this.post({type:t,requestId:a,...i})})}onMessage(t){var a,r,s;if(t.source!==this.target||((a=t.data)==null?void 0:a.protocol)!==1||((r=t.data)==null?void 0:r.source)!=="witmind-ha")return;const e=t.data;if(e.type==="WITMIND_HA_EVENT"){(s=this.subscriptions.get(e.requestId))==null||s(e.result);return}if(e.type==="WITMIND_ENTITY_UPDATE"){Object.entries(e.states||{}).forEach(([n,l])=>this.states.set(n,l)),(e.removed||[]).forEach(n=>this.states.delete(n));const o=Object.fromEntries(this.states);this.listeners.forEach(n=>n(o));return}const i=this.pending.get(e.requestId);i&&(this.pending.delete(e.requestId),window.clearTimeout(i.timer),e.ok?i.resolve(e.result):i.reject(new Error(String(e.error||"Witmind request failed"))))}}const Zt=[...Wi,"weather.forecast_casa","media_player.showroom_1","sensor.showroom_luminarias_encendidas","sensor.showroom_energia_estimada","sensor.21051182g_battery_level","switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_3_switch","switch.smart_relay_switch_4_switch","switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4","scene.presentacion","scene.reunion","scene.visita","scene.regular","script.showroom_encendido_general","script.showroom_apagado_general","script.apagado_total_witmind","switch.oficina_gerencial_interruptor_1","switch.oficina_mindtec_interruptor_1","switch.oficina_grande_interruptor_1","switch.oficina_grande_interruptor_2","switch.b2_gang_interruptor_1","switch.b2_gang_interruptor_2","switch.taller_interruptor_1","sensor.t_h_sensor_temperature","sensor.t_h_sensor_humidity","sensor.t_h_sensor_2_temperature","sensor.t_h_sensor_2_humidity","switch.4gang_switch_sala_grabacion_interruptor_1","switch.4gang_switch_sala_grabacion_interruptor_2","switch.4gang_switch_sala_grabacion_interruptor_3","switch.4gang_switch_sala_grabacion_interruptor_4"],wt=(c,t=new Set)=>(typeof c=="string"&&/^[a-z_]+\.[a-z0-9_]+$/i.test(c)?t.add(c):Array.isArray(c)?c.forEach(e=>wt(e,t)):c&&typeof c=="object"&&Object.values(c).forEach(e=>wt(e,t)),[...t]);class ea extends HTMLElement{constructor(){super(...arguments),this.states={},this.previousStates={},this.eventListeners=new Set,this.panelConfig={panel_id:"general",panel_kind:"general"},this.user={is_admin:!1,name:""},this.panelConfigSignature="",this.appliedTheme="",this.pendingNarrow=!1,this.messageHandler=t=>{var i,a,r,s;if(t.source!==window.parent||((i=t.data)==null?void 0:i.protocol)!==1||((a=t.data)==null?void 0:a.source)!=="witmind-ha")return;if(t.data.type==="WITMIND_INIT"&&t.data.panelConfig){const o=t.data.panelConfig,n=JSON.stringify(o),l=n!==this.panelConfigSignature,d=t.data.theme;if(!this.panel&&(d==="light"||d==="dark")){this.appliedTheme=d;try{localStorage.setItem("witmind-showroom-panel-theme",d)}catch{}}this.panelConfig=o,this.panelConfigSignature=n,this.user={is_admin:!!((r=t.data.user)!=null&&r.is_admin),name:String(((s=t.data.user)==null?void 0:s.name)||"")},this.pendingNarrow=!!t.data.narrow;const p=this.ensurePanel();!p&&l&&this.applyPanelConfig(),this.panel&&(this.panel.narrow=this.pendingNarrow),(p||l)&&this.resubscribeWithConfig()}const e=t.data.theme;(e==="light"||e==="dark")&&this.panel&&e!==this.appliedTheme&&(this.appliedTheme=e,this.panel.setAttribute("data-theme",e),this.panel.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:e},bubbles:!0,composed:!0})))}}connectedCallback(){this.attachShadow({mode:"open"}),window.addEventListener("message",this.messageHandler),this.shadowRoot.innerHTML='<style>:host{display:block;min-height:100dvh;background:var(--wit-surface,#071118)}.boot{min-height:100dvh;background:var(--wit-surface,#071118)}witmind-workspace{display:block;min-height:100dvh}</style><div class="boot" aria-label="Cargando panel Witmind"></div>',this.client=new ta(window.parent),window.parent===window&&(this.panelConfigSignature=JSON.stringify(this.panelConfig),this.ensurePanel(),this.subscribe(Zt))}ensurePanel(){var e;if(this.panel)return!1;const t=document.createElement("witmind-workspace");return t.config=this.panelConfig,t.narrow=this.pendingNarrow,t.hass=this.createHassAdapter(),t.addEventListener("hass-toggle-menu",()=>{var i;return(i=this.client)==null?void 0:i.toggleMenu()}),this.panel=t,(e=this.shadowRoot.querySelector(".boot"))==null||e.replaceWith(t),!0}subscribe(t){var e;(e=this.unsubscribe)==null||e.call(this),this.unsubscribe=this.client.subscribeEntities(t,i=>{this.previousStates=this.states,this.states=i,this.panel.hass=this.createHassAdapter(),this.emitStateChanges()})}resubscribeWithConfig(){const t=[...new Set([...Zt,...wt(this.panelConfig)])];this.subscribe(t)}applyPanelConfig(){this.panel&&(this.panel.config=this.panelConfig)}disconnectedCallback(){var t;(t=this.unsubscribe)==null||t.call(this),window.removeEventListener("message",this.messageHandler)}createHassAdapter(){const t=this.client;return{states:this.states,language:"es",user:this.user,selectedTheme:null,callService:(i,a,r={},s)=>t.callService(`${i}.${a}`,r,s),callWS:async i=>i.type==="get_states"?Object.values(this.states):t.haRequest(String(i.type||""),i),callApi:async(i,a)=>[],connection:{subscribeEvents:async(i,a)=>{const r=s=>{(!a||a==="state_changed")&&i(s)};return this.eventListeners.add(r),()=>this.eventListeners.delete(r)},sendMessagePromise:i=>t.haRequest(String(i.type||""),i),subscribeMessage:(i,a)=>t.haSubscribe(String(a.type||""),a,i)}}}emitStateChanges(){Object.entries(this.states).forEach(([t,e])=>{this.previousStates[t]!==e&&this.eventListeners.forEach(i=>i({event_type:"state_changed",data:{entity_id:t,new_state:e,old_state:this.previousStates[t]||null}}))})}}customElements.define("witmind-ui-app",ea);
