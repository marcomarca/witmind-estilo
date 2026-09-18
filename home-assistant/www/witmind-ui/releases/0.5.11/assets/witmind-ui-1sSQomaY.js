(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const v=Object.freeze({title:"Showroom",subtitle:"Control operativo",siteLabel:"WTX · MDTC",logo:"/local/logo-witmind.png?v=2.0.0",weather:"weather.forecast_casa",mediaPlayer:"media_player.showroom_1",lightCountSensor:"sensor.showroom_luminarias_encendidas",energySensor:"sensor.showroom_energia_estimada",batteryLevel:"sensor.21051182g_battery_level",historyHours:12,chartHours:24,showForecast:!0,spots:[{entity:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",subtitle:"Zona ventana",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_2",name:"Spots 2x3",subtitle:"Muestra 2 × 3",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_3",name:"Spots 3x3",subtitle:"Muestra 3 × 3",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_4",name:"Spots TV",subtitle:"Zona audiovisual",icon:"spot"}],samples:[{entity:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",subtitle:"Temperaturas de color",icon:"panel"},{entity:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",subtitle:"Muestra suspendida",icon:"pendant"},{entity:"switch.interruptor_inteligente_2_switch_3",name:"Slims",subtitle:"Línea decorativa",icon:"strip"},{entity:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",subtitle:"Iluminación empotrada",icon:"downlight"},{entity:"switch.smart_relay_switch_4_switch",name:"Paneles",subtitle:"Control por relé",icon:"screen"}],reflector:{entity:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",subtitle:"Control aislado",icon:"reflector"},scenes:[{entity:"scene.presentacion",name:"Presentación",subtitle:"Ventana + TV",icon:"presentation",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_4"]},{entity:"scene.reunion",name:"Reunión",subtitle:"2x3 + Ventana",icon:"people",directOnly:!0,onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2"]}],sampleScenes:[{id:"spots",name:"Spots",subtitle:"Todos los spots",icon:"spot",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4"]},{id:"paneles",name:"Paneles",subtitle:"Solo paneles",icon:"screen",onEntities:["switch.smart_relay_switch_4_switch"]},{id:"slims",name:"Slims",subtitle:"Solo slims",icon:"strip",onEntities:["switch.interruptor_inteligente_2_switch_3"]},{id:"downlights",name:"Downlights",subtitle:"Solo downlights",icon:"downlight",onEntities:["switch.interruptor_inteligente_2_switch_4"]},{id:"paneles-3k-6k",name:"Paneles 3k/6k",subtitle:"Temperaturas de color",icon:"panel",onEntities:["switch.interruptor_inteligente_2_switch_1"]},{id:"colgantes",name:"Colgantes",subtitle:"Todas las colgantes",icon:"pendant",onEntities:["switch.interruptor_inteligente_2_switch_2"]}],powerOnScript:"script.showroom_encendido_general",powerOffScript:"script.showroom_apagado_general"}),B={"clear-night":"Noche despejada",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvia",snowy:"Nieve","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},R={"clear-night":"☾",cloudy:"☁",exceptional:"!",fog:"≋",hail:"◆",lightning:"ϟ","lightning-rainy":"ϟ",partlycloudy:"◒",pouring:"☂",rainy:"☂",snowy:"❄","snowy-rainy":"❄",sunny:"☀",windy:"≈","windy-variant":"≈"},V={spot:'<circle cx="12" cy="9" r="5"/><path d="M6 18h12M9 22h6M12 14v4"/>',panel:'<rect width="18" height="18" x="3" y="3" rx="3"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/>',pendant:'<line x1="12" x2="12" y1="2" y2="8"/><path d="M7 16a5 5 0 0 0 10 0V8H7v8Z"/><line x1="8" x2="16" y1="20" y2="20"/><line x1="10" x2="14" y1="23" y2="23"/>',strip:'<rect width="20" height="8" x="2" y="8" rx="2.5"/><circle cx="6" cy="12" r="1.2"/><circle cx="10" cy="12" r="1.2"/><circle cx="14" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',downlight:'<path d="M4 6h16l-3 8H7L4 6Z"/><path d="M9 18h6M10 21h4"/><path d="M12 2v4"/>',screen:'<rect width="20" height="14" x="2" y="3" rx="2.5"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',reflector:'<path d="M4 6h10l4 4v6l-4 4H4V6Z"/><line x1="18" x2="22" y1="10" y2="10"/><line x1="18" x2="22" y1="14" y2="14"/>',presentation:'<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',people:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',power:'<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/>',bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',play:'<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>',pause:'<rect width="4" height="16" x="6" y="4" rx="1.5" fill="currentColor" stroke="none"/><rect width="4" height="16" x="14" y="4" rx="1.5" fill="currentColor" stroke="none"/>',previous:'<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>',next:'<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',volumeDown:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',volumeUp:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',battery:'<rect width="16" height="10" x="2" y="7" rx="2.5"/><line x1="22" x2="22" y1="11" y2="13"/>',health:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',thermometer:'<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',status:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',energy:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'},ae=`
  <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" x2="21" y1="6" y2="6"></line>
    <line x1="3" x2="21" y1="12" y2="12"></line>
    <line x1="3" x2="21" y1="18" y2="18"></line>
  </svg>
`,re=`
  <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g class="theme-icon-sun">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </g>
    <path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
`;class se extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._hass=null,this._panel=null,this._narrow=!1,this._started=!1,this._renderQueued=!1,this._forecast=[],this._history=[],this._historyError="",this._liveStates=new Map,this._pendingSwitches=new Map,this._switchErrors=new Map,this._switchTimers=new Map,this._pendingAction="",this._confirmAction="",this._toast=null,this._toastTimer=null,this._clockTimer=null,this._historyTimer=null,this._unsubscribeStates=null,this._unsubscribeForecast=null,this._forecastEntity="",this._energyRange="day",this._energyDayOffset=0,this._energyData=[],this._energyLoading=!1,this._energyError=null,this._energyMonthTotal=null,this._energyRequestId=0,this._energyRefreshTimer=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._themeStorageKey="witmind-showroom-panel-theme",this._theme=this._loadTheme(),this._activeView="home",this.shadowRoot.addEventListener("click",e=>this._handleClick(e)),this.shadowRoot.addEventListener("scroll",e=>this._handleEnergyScroll(e),!0)}set hass(e){var o,n,l,c;const t=this._hass,i=this._config(),a=this._relevantHassChanged(t,e),r=!t||((o=t.states)==null?void 0:o[i.energySensor])!==((n=e==null?void 0:e.states)==null?void 0:n[i.energySensor]),s=!((l=t==null?void 0:t.states)!=null&&l[i.energySensor])&&!!((c=e==null?void 0:e.states)!=null&&c[i.energySensor]);this._hass=e,a&&this._syncStatesFromHass(),this.isConnected&&(this._started?r&&(s?this._loadEnergyStatistics():this._scheduleEnergyRefresh()):(this._started=!0,this._start()),a&&this._updateStatePresentation())}get hass(){return this._hass}set panel(e){const t=this._config().weather;this._panel=e;const i=this._config().weather;this._config().panelKind==="general"&&this._activeView==="home"&&(this._activeView="lights"),this._started&&t!==i&&(this._resetForecastSubscription(),this._subscribeWeather()),this._hass&&(this._syncStatesFromHass(),this._loadEnergyStatistics(),this._updateStatePresentation())}get panel(){return this._panel}set narrow(e){this._narrow=!!e,this.toggleAttribute("narrow",this._narrow)}get narrow(){return this._narrow}connectedCallback(){this._hass&&(this._started||(this._started=!0,this._start()),this._updateStatePresentation(),this._scheduleEnergyRefresh(!0))}disconnectedCallback(){clearInterval(this._clockTimer),clearInterval(this._historyTimer),clearTimeout(this._toastTimer),clearTimeout(this._energyRefreshTimer),this._energyRequestId+=1;for(const e of this._switchTimers.values())clearTimeout(e);this._switchTimers.clear(),this._resetForecastSubscription(),this._unsubscribeStates&&(this._unsubscribeStates(),this._unsubscribeStates=null),this._started=!1}_requestRender(){this._renderQueued||!this._hass||!this.shadowRoot||(this._renderQueued=!0,requestAnimationFrame(()=>{this._renderQueued=!1,this.render()}))}_updateStatePresentation(){var o;if(!((o=this.shadowRoot)!=null&&o.querySelector(".app-shell"))){this._requestRender();return}const e=n=>{var u;const l=n.dataset.entity;if(!l)return;const c=this._state(l),p=this._visibleSwitchState(l),h=p==="on",d=!c||["unknown","unavailable"].includes(c.state),m=this._pendingSwitches.has(l),f=this._switchErrors.get(l),_=f||(m?p==="on"?"Encendiendo…":"Apagando…":d?"No disponible":h?"Encendido":"Apagado");n.classList.toggle("is-on",h),n.classList.toggle("is-pending",m),n.classList.toggle("is-error",!!f),n.disabled=d,n.setAttribute("aria-pressed",String(h));const $=((u=n.querySelector(".device-copy strong"))==null?void 0:u.textContent)||l;n.setAttribute("aria-label",`${$}: ${_}`);const w=n.querySelector(".device-copy small");w&&(w.textContent=_)};this.shadowRoot.querySelectorAll('[data-action="toggle-switch"]').forEach(e),this.shadowRoot.querySelectorAll('[data-action="run-scene"]').forEach(n=>{const l=this._allScenes().find(m=>m.key===n.dataset.sceneKey);if(!l)return;const c=this._sceneStatus(l),p=this._pendingAction===l.key,h=p?"Aplicando...":c.active?"Activo":c.unavailable?"Sin datos":"Inactivo";n.classList.toggle("is-pending",p),n.classList.toggle("is-active",c.active),n.classList.toggle("is-unavailable",c.unavailable),n.disabled=!!(this._pendingAction&&!p),n.setAttribute("aria-pressed",String(c.active));const d=n.querySelector(".scene-state");d&&(d.textContent=h)});const t=this._config(),i=[...t.spots,...t.samples,...t.reflector?[t.reflector]:[]],a=i.filter(n=>this._visibleSwitchState(n.entity)==="on").length,r=this.shadowRoot.querySelector("[data-lights-summary]");r&&(r.textContent=`${a} de ${i.length}`);const s=this.shadowRoot.querySelector("[data-energy-summary]");s&&(s.textContent=this._energyMonthTotal===null?"Sin datos":`${this._formatEnergy(this._energyMonthTotal)} kWh`)}_handleClick(e){const t=e.target.closest("[data-action]");if(!t||!this._hass)return;const i=t.dataset.action;if(i==="toggle-menu"){this._toggleHomeAssistantMenu();return}if(i==="toggle-theme"){this._toggleTheme();return}if(i==="set-view"){const a=t.dataset.view;["home","lights","energy","system"].includes(a)&&(this._activeView=a,this._requestRender());return}if(i==="toggle-switch"){this._toggleSwitch(t.dataset.entity);return}if(i==="run-scene"){this._runScene(t.dataset.sceneKey||t.dataset.entity,t.dataset.label);return}if(i==="open-power-on"){this._pendingAction||(this._confirmAction="on",this._requestRender());return}if(i==="open-power-off"){this._pendingAction||(this._confirmAction="off",this._requestRender());return}if(i==="general-off"){const a=this._config().generalOffScript;a?this._hass.callService("script","turn_on",{entity_id:a}).catch(r=>{this._notify("No se pudo ejecutar Apagar todo Witmind.","error"),console.error("Error ejecutando el apagado general de Witmind:",r)}):this._notify("El apagado general aún no tiene una entidad configurada.","error");return}if(i==="cancel-power-confirm"){const a=e.target.closest("[data-dialog-card]");if(t.classList.contains("dialog-backdrop")&&a)return;this._pendingAction||(this._confirmAction="",this._requestRender());return}if(i==="confirm-power"){this._confirmGeneralPower();return}if(i==="clear-scene"){this._clearScene();return}if(i==="media"){this._mediaAction(t.dataset.service);return}if(i==="energy-range"){this._setEnergyRange(t.dataset.range);return}if(i==="energy-day-prev"){this._shiftEnergyDay(-1);return}if(i==="energy-day-next"){this._shiftEnergyDay(1);return}if(i==="energy-day-today"){this._resetEnergyDay();return}i==="refresh-energy"&&(this._energyLastLoadedAt=0,this._loadEnergyStatistics())}_toggleHomeAssistantMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_loadTheme(){try{return localStorage.getItem(this._themeStorageKey)==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem(this._themeStorageKey,this._theme)}catch(e){console.warn("No se pudo guardar el tema del showroom:",e)}}_toggleTheme(){this._theme=this._theme==="dark"?"light":"dark",this.setAttribute("data-theme",this._theme),this._saveTheme(),this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0})),this._requestRender()}set theme(e){e!=="dark"&&e!=="light"||(this._theme=e,this.setAttribute("data-theme",e),this._saveTheme())}get theme(){return this._theme}_config(){var m;const e=((m=this._panel)==null?void 0:m.config)||{},t=e.panel_kind==="lobby"||e.panel_kind==="general"||e.static_only===!0||e.staticOnly===!0,i=f=>Array.isArray(f)?[...new Set(f.filter(Boolean).map(_=>String(_)))]:[],a=(f,_)=>(Array.isArray(f)&&(f.length||t)?f:_).filter(w=>w==null?void 0:w.entity).map((w,u)=>({entity:String(w.entity),name:w.name||`Dispositivo ${u+1}`,subtitle:w.subtitle||"Iluminación",icon:w.icon||"bulb"})),r=a(e.spots,v.spots),s=a(e.samples||e.muestras,v.samples),o=[...r,...s].map(f=>f.entity),n=i(e.scene_control_entities||e.sceneControlEntities),l=n.length?n:o,c=(f,_,$)=>(Array.isArray(f)&&(f.length||t)?f:_).filter(u=>(u==null?void 0:u.entity)||(u==null?void 0:u.id)||(u==null?void 0:u.key)).map((u,b)=>{const x=u.entity?String(u.entity):"",M=String(u.id||u.key||x||`${$}-${b+1}`),y=_.find(z=>{const H=z.entity?String(z.entity):"",ie=String(z.id||z.key||H||"");return x&&H===x||ie===M}),A=x||(y!=null&&y.entity?String(y.entity):""),C=String(u.id||u.key||(y==null?void 0:y.id)||A||`${$}-${b+1}`),E=A||`${$}:${C}`,k=Array.isArray(u.on_entities)||Array.isArray(u.onEntities),L=Array.isArray(u.off_entities)||Array.isArray(u.offEntities),I=i(k?u.on_entities||u.onEntities:y==null?void 0:y.onEntities),ee=i(L?u.off_entities||u.offEntities:[]),te=L?ee.filter(z=>!I.includes(z)):l.filter(z=>!I.includes(z));return{key:E,id:C,entity:A,name:u.name||(y==null?void 0:y.name)||`Escena ${b+1}`,subtitle:u.subtitle||(y==null?void 0:y.subtitle)||"Escena del showroom",icon:u.icon||(y==null?void 0:y.icon)||"presentation",directOnly:u.direct_only??u.directOnly??(y==null?void 0:y.directOnly)??!1,onEntities:I,offEntities:te}}),p=e.reflector||v.reflector,h=Number(e.history_hours??e.historyHours),d=Number(e.chart_hours??e.chartHours);return{title:e.title||v.title,subtitle:e.subtitle||v.subtitle,siteLabel:e.site_label||e.siteLabel||v.siteLabel,logo:e.logo||v.logo,weather:e.weather||v.weather,mediaPlayer:e.media_player||e.mediaPlayer||v.mediaPlayer,lightCountSensor:e.light_count_sensor||e.lightCountSensor||v.lightCountSensor,energySensor:e.energy_sensor||e.energySensor||v.energySensor,batteryLevel:e.battery_level||e.batteryLevel||v.batteryLevel,powerOnScript:e.power_on_script||e.powerOnScript||v.powerOnScript,powerOffScript:e.power_off_script||e.powerOffScript||v.powerOffScript,historyHours:Number.isFinite(h)&&h>0?Math.min(24,h):v.historyHours,chartHours:Number.isFinite(d)&&d>0?Math.min(72,d):v.chartHours,showForecast:e.show_forecast??e.showForecast??v.showForecast,panelKind:e.panel_kind||e.panelKind||"showroom",staticOnly:e.static_only??e.staticOnly??!1,generalOffScript:e.general_off_script||e.generalOffScript||"",spots:r,samples:s,sceneControlEntities:l,reflector:p!=null&&p.entity?{entity:String(p.entity),name:p.name||v.reflector.name,subtitle:p.subtitle||v.reflector.subtitle,icon:p.icon||v.reflector.icon}:null,scenes:c(e.scenes,v.scenes,"scene"),sampleScenes:c(e.sample_scenes||e.sampleScenes,v.sampleScenes,"sample")}}_allDevices(){const e=this._config();return[...e.spots,...e.samples,...e.reflector?[e.reflector]:[]]}_allScenes(e=this._config()){return[...e.scenes,...e.sampleScenes]}_trackedEntities(){const e=this._config();return new Set([...this._allDevices().map(t=>t.entity),...e.sceneControlEntities,...this._allScenes(e).flatMap(t=>[t.entity,...t.onEntities,...t.offEntities]),e.weather,e.mediaPlayer,e.lightCountSensor,e.energySensor,e.batteryLevel,e.powerOnScript,e.powerOffScript].filter(Boolean))}_relevantHassChanged(e,t){var i,a;if(!e||!t)return!0;for(const r of this._trackedEntities())if(((i=e.states)==null?void 0:i[r])!==((a=t.states)==null?void 0:a[r]))return!0;return!1}async _start(){this._clockTimer=setInterval(()=>this._updateClock(),3e4),await Promise.allSettled([this._fetchCurrentStates(),this._subscribeStateChanges(),this._subscribeWeather(),this._loadEnergyStatistics()])}_syncStatesFromHass(){var e;if((e=this._hass)!=null&&e.states)for(const t of this._trackedEntities()){const i=this._hass.states[t];i&&this._applyLiveState(t,i)}}_applyLiveState(e,t){if(!t){this._liveStates.delete(e);return}this._liveStates.set(e,t);const i=this._pendingSwitches.get(e);if(i&&t.state===i.desired){this._pendingSwitches.delete(e),this._switchErrors.delete(e);const a=this._switchTimers.get(e);a&&clearTimeout(a),this._switchTimers.delete(e)}}async _fetchCurrentStates(){var e;if((e=this._hass)!=null&&e.callWS)try{const t=await this._hass.callWS({type:"get_states"}),i=this._trackedEntities();for(const a of t||[])i.has(a.entity_id)&&this._applyLiveState(a.entity_id,a);this._updateStatePresentation()}catch(t){console.error("No se pudieron sincronizar los estados del showroom:",t)}}async _subscribeStateChanges(){var e;if(!(!((e=this._hass)!=null&&e.connection)||this._unsubscribeStates))try{this._unsubscribeStates=await this._hass.connection.subscribeEvents(t=>{var a;const i=(a=t==null?void 0:t.data)==null?void 0:a.entity_id;!i||!this._trackedEntities().has(i)||(this._applyLiveState(i,t.data.new_state),i===this._config().energySensor&&this._scheduleEnergyRefresh(),this._updateStatePresentation())},"state_changed")}catch(t){console.error("No se pudo suscribir a state_changed:",t)}}_resetForecastSubscription(){this._unsubscribeForecast&&(this._unsubscribeForecast(),this._unsubscribeForecast=null),this._forecastEntity=""}async _subscribeWeather(){var t;const e=this._config();if(!(!((t=this._hass)!=null&&t.connection)||!e.weather)&&!(this._unsubscribeForecast&&this._forecastEntity===e.weather)){this._resetForecastSubscription();try{this._forecastEntity=e.weather,this._unsubscribeForecast=await this._hass.connection.subscribeMessage(i=>{this._forecast=Array.isArray(i==null?void 0:i.forecast)?i.forecast:[],this._requestRender()},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e.weather})}catch(i){this._forecastEntity="",console.error("No se pudo cargar el pronóstico:",i)}}}_energyRefreshInterval(){return this._energyRange==="day"?3e4:this._energyRange==="month"?12e4:3e5}_scheduleEnergyRefresh(e=!1){if(!this._hass||!this.isConnected||(clearTimeout(this._energyRefreshTimer),this._energyRange==="day"&&this._energyDayOffset!==0))return;const t=this._energyRefreshInterval(),i=this._energyLastLoadedAt?Date.now()-this._energyLastLoadedAt:0,a=e?0:this._energyLastLoadedAt?Math.max(1e3,t-i):t;this._energyRefreshTimer=setTimeout(()=>this._loadEnergyStatistics(),a)}_energyRangeDefinition(e=this._energyRange){const t=new Date;let i,a=t,r,s,o,n=!1;if(e==="year")i=new Date(t.getFullYear(),0,1,0,0,0,0),r="month",s=`Año ${t.getFullYear()}`,o="mes";else if(e==="month")i=new Date(t.getFullYear(),t.getMonth(),1,0,0,0,0),r="day",s=t.toLocaleDateString("es-BO",{month:"long",year:"numeric"}),o="día";else{const l=new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0);i=new Date(l.getFullYear(),l.getMonth(),l.getDate()+Math.min(0,Number(this._energyDayOffset)||0),0,0,0,0),n=i.getTime()===l.getTime(),a=n?t:new Date(i.getFullYear(),i.getMonth(),i.getDate()+1,0,0,0,0),r="hour",s=i.toLocaleDateString("es-BO",{weekday:"long",day:"numeric",month:"long"}),o="hora"}return{start:i,end:a,period:r,title:s,intervalLabel:o,isToday:n}}_energyValueToKWh(e,t){const i=Number(e);if(!Number.isFinite(i))return null;const a=String(t||"kWh").trim().toLowerCase().replaceAll(" ","");return a==="kwh"?i:a==="wh"?i/1e3:a==="mwh"?i*1e3:null}_deriveEnergyStateDeltas(e,t,i){const a=Number(t instanceof Date?t.getTime():t),r=Number(i instanceof Date?i.getTime():i),s=e.filter(l=>Number.isFinite(Number(l.start))&&Number.isFinite(Number(l.state))).sort((l,c)=>Number(l.start)-Number(c.start)),o=[];let n=null;for(const l of s){const c=Number(l.start),p=Number(l.state);if(c<a){n=p;continue}if(c>=r)break;let h=0;if(Number.isFinite(n)){const d=p-n;h=d>=0?d:Math.max(0,p)}o.push({...l,change:h}),n=p}return o}_aggregateEnergyDayRows(e,t,i){var l;const a=new Date(t.start),r=new Date(t.end),s=t.isToday?new Date(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),0,0,0):new Date(a.getFullYear(),a.getMonth(),a.getDate(),23,0,0,0),o=new Map;for(let c=new Date(a);c<=s;c.setHours(c.getHours()+1)){const p=c.getTime();o.set(p,{start:p,end:new Date(c.getFullYear(),c.getMonth(),c.getDate(),c.getHours()+1,0,0,0).getTime(),change:0,samples:0,partial:t.isToday&&p===s.getTime(),live:!1})}let n=null;for(const c of e){const p=new Date(Number(c.start));if(!Number.isFinite(p.getTime()))continue;const h=new Date(p.getFullYear(),p.getMonth(),p.getDate(),p.getHours(),0,0,0).getTime(),d=o.get(h);d&&(d.change+=Math.max(0,Number(c.change)||0),d.samples+=1,Number.isFinite(c.state)&&(!n||Number(c.end||c.start)>Number(n.end||n.start))&&(n=c))}if(t.isToday){const c=this._energyValueToKWh(i==null?void 0:i.state,(l=i==null?void 0:i.attributes)==null?void 0:l.unit_of_measurement),p=n==null?void 0:n.state,h=Number((n==null?void 0:n.end)||(n==null?void 0:n.start)),d=o.get(s.getTime());if(d&&Number.isFinite(c)&&Number.isFinite(p)&&Number.isFinite(h)&&h>=s.getTime()&&r.getTime()-h>=0&&r.getTime()-h<=900*1e3){const m=c-p;Number.isFinite(m)&&m>=0&&(d.change+=m,d.live=m>0)}}return[...o.values()].filter(c=>c.samples>0||c.live)}_calculateCurrentMonthEnergy(e,t,i){var h;const a=new Date(t),r=new Date(a.getFullYear(),a.getMonth(),1,0,0,0,0).getTime(),s=e.filter(d=>Number.isFinite(Number(d.start))&&Number(d.start)>=r).sort((d,m)=>Number(d.start)-Number(m.start));let o=s.reduce((d,m)=>d+Math.max(0,Number(m.change)||0),0),n=null;for(const d of s)Number.isFinite(Number(d.state))&&(!n||Number(d.end||d.start)>Number(n.end||n.start))&&(n=d);const l=this._energyValueToKWh(i==null?void 0:i.state,(h=i==null?void 0:i.attributes)==null?void 0:h.unit_of_measurement),c=Number(n==null?void 0:n.state),p=Number((n==null?void 0:n.end)||(n==null?void 0:n.start));if(Number.isFinite(l)&&Number.isFinite(c)&&Number.isFinite(p)&&p>=r&&p<=a.getTime()&&a.getTime()-p<=7200*1e3){const d=l-c;Number.isFinite(d)&&d>=0&&(o+=d)}return s.length||Number.isFinite(c)?o:null}_aggregateEnergyCalendarRows(e,t,i,a){var p;if(!["month","year"].includes(a))return[];const r=new Map;let s=null;for(const h of e){const d=Number(h.start);if(!Number.isFinite(d))continue;const m=new Date(d),f=a==="month"?new Date(m.getFullYear(),m.getMonth(),m.getDate(),0,0,0,0).getTime():new Date(m.getFullYear(),m.getMonth(),1,0,0,0,0).getTime(),_=r.get(f)||{start:f,change:0,samples:0,partial:!1,live:!1};_.change+=Math.max(0,Number(h.change)||0),_.samples+=1,r.set(f,_),Number.isFinite(Number(h.state))&&(!s||d>Number(s.start))&&(s=h)}const o=this._energyValueToKWh(i==null?void 0:i.state,(p=i==null?void 0:i.attributes)==null?void 0:p.unit_of_measurement),n=Number(s==null?void 0:s.state),l=Number(s==null?void 0:s.start),c=new Date(t.end);if(Number.isFinite(o)&&Number.isFinite(n)&&Number.isFinite(l)&&l<=c.getTime()&&c.getTime()-l<=7200*1e3){const h=o-n;if(Number.isFinite(h)&&h>=0){const d=a==="month"?new Date(c.getFullYear(),c.getMonth(),c.getDate(),0,0,0,0).getTime():new Date(c.getFullYear(),c.getMonth(),1,0,0,0,0).getTime(),m=r.get(d)||{start:d,change:0,samples:0,partial:!1,live:!1};m.change+=h,m.live=h>0,r.set(d,m)}}return[...r.values()].sort((h,d)=>Number(h.start)-Number(d.start))}_energyViewSignature(){return JSON.stringify([this._energyRange,this._energyDayOffset,this._energyMonthTotal,this._energyError||"",this._energyData.map(e=>[Number(e.start),Number(e.change)||0,Number(e.samples)||0,!!e.partial,!!e.live])])}async _loadEnergyStatistics(){var d;if(!((d=this._hass)!=null&&d.connection))return;clearTimeout(this._energyRefreshTimer);const e=this._config(),t=this._state(e.energySensor),i=Number(t==null?void 0:t.state);if(!t){this._energyData=[],this._energyMonthTotal=null,this._energyError=`No existe ${e.energySensor} en Home Assistant.`,this._energyLoading=!1,this._requestRender();return}if(!Number.isFinite(i)){this._energyData=[],this._energyMonthTotal=null,this._energyError=`${e.energySensor} no entrega un valor numérico.`,this._energyLoading=!1,this._requestRender();return}const a=++this._energyRequestId,r=this._energyViewSignature(),s=this._energyData.length>0,o=this._energyRangeDefinition(),n=new Date,l=new Date(n.getFullYear(),n.getMonth(),1,0,0,0,0),c=new Date(o.start.getTime()-3600*1e3),p=this._energyRange==="year"?"hour":"5minute",h=new Date(l.getTime()-3600*1e3);this._energyLoading=!0,this._energyError=null,s||this._requestRender();try{const m=await this._hass.connection.sendMessagePromise({type:"recorder/get_statistics_metadata",statistic_ids:[e.energySensor]});if(a!==this._energyRequestId)return;const _=(Array.isArray(m)?m:[]).find(E=>(E==null?void 0:E.statistic_id)===e.energySensor)||null;if(!_||!_.has_sum)throw new Error("La entidad no dispone de estadísticas acumulables. Verifica device_class: energy y state_class total/total_increasing.");const $=this._hass.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:c.toISOString(),end_time:o.end.toISOString(),statistic_ids:[e.energySensor],period:p,units:{energy:"kWh"},types:["state"]}),w=this._hass.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:h.toISOString(),end_time:n.toISOString(),statistic_ids:[e.energySensor],period:"hour",units:{energy:"kWh"},types:["state"]}),[u,b]=await Promise.all([$,w]);if(a!==this._energyRequestId)return;const x=E=>(Array.isArray(E==null?void 0:E[e.energySensor])?E[e.energySensor]:[]).map(k=>({start:Number(k.start),end:Number(k.end),change:k.change===void 0||k.change===null?null:Math.max(0,Number(k.change)||0),state:k.state===void 0||k.state===null?null:Number(k.state)})).filter(k=>Number.isFinite(k.start)&&(Number.isFinite(k.state)||Number.isFinite(k.change))),M=x(u),y=this._deriveEnergyStateDeltas(M,o.start,o.end);this._energyData=this._energyRange==="day"?this._aggregateEnergyDayRows(y,o,t):this._aggregateEnergyCalendarRows(y,o,t,this._energyRange);const A=x(b),C=this._deriveEnergyStateDeltas(A,l,n);if(this._energyMonthTotal=this._calculateCurrentMonthEnergy(C,n,t),this._energyRange==="month"&&this._energyData.length)this._energyMonthTotal=this._energyData.reduce((E,k)=>E+Math.max(0,Number(k.change)||0),0);else if(this._energyRange==="year"&&Number.isFinite(this._energyMonthTotal)){const E=new Date(n.getFullYear(),n.getMonth(),1,0,0,0,0).getTime(),k=this._energyData.find(L=>Number(L.start)===E);k&&(k.change=this._energyMonthTotal)}this._energyLastLoadedAt=Date.now(),this._energyError=null}catch(m){if(a!==this._energyRequestId)return;this._energyData=[],this._energyMonthTotal=null,this._energyError=(m==null?void 0:m.message)||"No se pudieron consultar las estadísticas energéticas.",console.error("Error cargando estadísticas de energía del showroom:",m)}finally{if(a===this._energyRequestId){this._energyLoading=!1;const m=r!==this._energyViewSignature();!s||m&&this._activeView==="energy"?this._requestRender():this._updateStatePresentation(),this._scheduleEnergyRefresh()}}}_setEnergyRange(e){!["day","month","year"].includes(e)||e===this._energyRange||(this._energyRange=e,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_shiftEnergyDay(e){if(this._energyRange!=="day")return;const t=Number(e);if(!Number.isFinite(t)||t===0)return;const i=Math.min(0,this._energyDayOffset+t);i!==this._energyDayOffset&&(this._energyDayOffset=i,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_resetEnergyDay(){this._energyRange!=="day"||this._energyDayOffset===0||(this._energyDayOffset=0,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_formatEnergy(e,t=2){const i=Number(e);return Number.isFinite(i)?i.toLocaleString("es-BO",{minimumFractionDigits:t,maximumFractionDigits:t}):"--"}_energyLabel(e,t=this._energyRange){const i=new Date(Number(e));return Number.isFinite(i.getTime())?t==="year"?i.toLocaleDateString("es-BO",{month:"short"}).replace(".",""):t==="month"?String(i.getDate()):i.toLocaleTimeString("es-BO",{hour:"2-digit",minute:"2-digit",hour12:!1}):"--"}_captureEnergyChartScroll(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-energy-scroll]");if(!e)return;const t=Math.max(0,e.scrollWidth-e.clientWidth);this._energyScrollLeft=e.scrollLeft,this._energyAutoFollow=t<=0||t-e.scrollLeft<=8}_handleEnergyScroll(e){var a,r;const t=(r=(a=e.target)==null?void 0:a.closest)==null?void 0:r.call(a,"[data-energy-scroll]");if(!t)return;const i=Math.max(0,t.scrollWidth-t.clientWidth);this._energyScrollLeft=t.scrollLeft,this._energyAutoFollow=i<=0||i-t.scrollLeft<=8}_restoreEnergyChartScroll(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-energy-scroll]");if(!e)return;const t=Math.max(0,e.scrollWidth-e.clientWidth);if(this._energyAutoFollow||this._energyScrollLeft===null){e.scrollLeft=t,this._energyScrollLeft=e.scrollLeft;return}e.scrollLeft=Math.max(0,Math.min(this._energyScrollLeft,t))}_energyChart(){const e=this._energyData;if(this._energyLoading&&!e.length)return'<div class="energy-empty"><span class="energy-spinner"></span>Consultando estadísticas de Home Assistant…</div>';if(this._energyError)return`<div class="energy-empty error">${this._icon("status")}<span>${this._escape(this._energyError)}</span></div>`;if(!e.length)return'<div class="energy-empty">No hay estadísticas de consumo disponibles para este período.</div>';const t=280,i=14,a=16,r=22,s=42,o=this._energyRange==="day"?64:this._energyRange==="month"?36:58,n=Math.max(620,e.length*o+i+a),l=t-r-s,c=n-i-a,p=Math.max(...e.map(u=>u.change),.001),h=this._energyRange==="day"?10:e.length>24?4:7,d=Math.max(6,(c-h*Math.max(0,e.length-1))/e.length),m=this._energyRange==="month"?Math.max(1,Math.ceil(e.length/10)):this._energyRange==="day"?2:1,f=[0,.25,.5,.75,1],_=f.map(u=>{const b=r+l*(1-u);return`<line x1="${i}" y1="${b.toFixed(1)}" x2="${n-a}" y2="${b.toFixed(1)}" class="energy-grid-line"/>`}).join(""),$=f.map(u=>{const b=r+l*(1-u),x=this._formatEnergy(p*u,p<1?2:1);return`<span class="energy-y-tick" style="top:${b.toFixed(1)}px">${this._escape(x)}</span>`}).join(""),w=e.map((u,b)=>{const x=i+b*(d+h),M=u.change>0?Math.max(2,u.change/p*l):1,y=r+l-M,A=b%m===0||b===e.length-1,C=this._energyLabel(u.start),E=u.partial?" · en curso":"",k=u.partial?`<text x="${(x+d/2).toFixed(1)}" y="${(r+10).toFixed(1)}" text-anchor="middle" class="energy-current-label">ahora</text>`:"";return`<g class="energy-bar-group ${u.partial?"is-current":""}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${d.toFixed(1)}" height="${M.toFixed(1)}" rx="${Math.min(4,d/2).toFixed(1)}" class="energy-bar ${u.partial?"is-partial":""}"><title>${this._escape(C)} · ${this._formatEnergy(u.change)} kWh${E}</title></rect>${k}${A?`<text x="${(x+d/2).toFixed(1)}" y="${t-14}" text-anchor="middle" class="energy-axis-text">${this._escape(C)}</text>`:""}</g>`}).join("");return`<div class="energy-chart-layout"><div class="energy-y-axis" aria-hidden="true"><span class="energy-y-unit">kWh</span>${$}</div><div class="energy-chart-wrap" data-energy-scroll><svg class="energy-chart" width="${n}" height="${t}" viewBox="0 0 ${n} ${t}" role="img" aria-label="Gráfica de consumo energético estimado en kWh">${_}${w}</svg></div></div>`}async _loadHistory(){var o;const e=this._config();if(!((o=this._hass)!=null&&o.callApi))return;const t=Math.max(e.historyHours,e.chartHours),i=new Date(Date.now()-t*60*60*1e3).toISOString(),a=new Date().toISOString(),r=[e.lightCountSensor,...e.spots.map(n=>n.entity),...e.samples.map(n=>n.entity)].filter(Boolean).join(",");if(!r)return;const s=`history/period/${encodeURIComponent(i)}?filter_entity_id=${encodeURIComponent(r)}&end_time=${encodeURIComponent(a)}&minimal_response&no_attributes`;try{this._history=await this._hass.callApi("GET",s),this._historyError=""}catch(n){this._history=[],this._historyError="No se pudo cargar el historial.",console.error("No se pudo cargar el historial del showroom:",n)}this._requestRender()}_state(e){var t,i;return this._liveStates.get(e)||((i=(t=this._hass)==null?void 0:t.states)==null?void 0:i[e])}_isUnavailable(e){var i;const t=(i=this._state(e))==null?void 0:i.state;return!t||t==="unknown"||t==="unavailable"}_visibleSwitchState(e){var t,i;return((t=this._pendingSwitches.get(e))==null?void 0:t.desired)||((i=this._state(e))==null?void 0:i.state)||"unavailable"}async _toggleSwitch(e){if(!e||!this._hass)return;const t=this._state(e);if(!t||["unknown","unavailable"].includes(t.state)){this._switchErrors.set(e,"No disponible"),this._updateStatePresentation();return}const a=this._visibleSwitchState(e)==="on"?"off":"on",r=a==="on"?"turn_on":"turn_off",s=e.split(".")[0]||"switch";this._pendingSwitches.set(e,{desired:a,startedAt:Date.now()}),this._switchErrors.delete(e),this._updateStatePresentation();try{await this._hass.callService(s,r,{entity_id:e});const o=this._switchTimers.get(e);o&&clearTimeout(o);const n=setTimeout(()=>this._verifySwitchState(e,a),6e3);this._switchTimers.set(e,n)}catch(o){this._pendingSwitches.delete(e),this._switchErrors.set(e,"La acción falló"),this._updateStatePresentation(),console.error(`Error ejecutando ${r} en ${e}:`,o)}}async _verifySwitchState(e,t){var a;await this._fetchCurrentStates();const i=((a=this._state(e))==null?void 0:a.state)===t;this._pendingSwitches.delete(e),this._switchTimers.delete(e),i?this._switchErrors.delete(e):this._switchErrors.set(e,"Sin confirmación"),this._updateStatePresentation()}_sceneStatus(e){const t=[...e.onEntities.map(r=>({entityId:r,desired:"on"})),...e.offEntities.map(r=>({entityId:r,desired:"off"}))];if(!t.length)return{active:!1,unavailable:!1,mismatches:[]};const i=t.some(({entityId:r})=>this._isUnavailable(r)),a=t.filter(({entityId:r,desired:s})=>{var o;return((o=this._state(r))==null?void 0:o.state)!==s});return{active:!i&&a.length===0,unavailable:i,mismatches:a}}_sceneExpectations(e){return[...e.offEntities.map(t=>({entityId:t,desired:"off"})),...e.onEntities.map(t=>({entityId:t,desired:"on"}))]}_markExpectedStates(e){const t=Date.now();for(const{entityId:i,desired:a}of e)this._pendingSwitches.set(i,{desired:a,startedAt:t}),this._switchErrors.delete(i)}_clearExpectedStates(e){for(const{entityId:t}of e){this._pendingSwitches.delete(t);const i=this._switchTimers.get(t);i&&clearTimeout(i),this._switchTimers.delete(t)}}async _setEntitiesState(e,t){const i=[...new Set((e||[]).filter(Boolean))];if(!i.length)return;const a=new Map;for(const s of i){const o=s.split(".")[0];o&&(a.has(o)||a.set(o,[]),a.get(o).push(s))}const r=t==="on"?"turn_on":"turn_off";for(const[s,o]of a)await this._hass.callService(s,r,{entity_id:o})}async _waitForExpectedStates(e,t=7e3){const i=Date.now()+t;let a=e;for(;Date.now()<i;){if(await this._fetchCurrentStates(),a=e.filter(({entityId:r,desired:s})=>{var o;return((o=this._state(r))==null?void 0:o.state)!==s}),!a.length)return{ok:!0,mismatches:[]};await new Promise(r=>setTimeout(r,450))}return{ok:!1,mismatches:a}}async _runScene(e,t){var o;if(!e||this._pendingAction)return;const i=this._config(),a=this._allScenes(i).find(n=>n.key===e||n.entity===e);if(!a){this._notify("La escena no está configurada.","error");return}const r=this._sceneExpectations(a);this._pendingAction=a.key,this._markExpectedStates(r),this._updateStatePresentation();let s=null;try{if(a.entity&&!a.directOnly)try{await this._hass.callService("scene","turn_on",{entity_id:a.entity})}catch(c){s=c,console.warn(`La escena ${a.entity} no respondió; se aplicará el perfil directo.`,c)}await this._setEntitiesState(a.offEntities,"off"),await this._setEntitiesState(a.onEntities,"on");const n=await this._waitForExpectedStates(r);if(!n.ok){const c=n.mismatches.map(p=>p.entityId).join(", ");throw new Error(`No se confirmaron los estados de: ${c}`)}const l=s?`${t||"Modo"} aplicado mediante control directo.`:`${t||"Modo"} activo.`;this._notify(l,"success")}catch(n){for(const{entityId:l,desired:c}of r)((o=this._state(l))==null?void 0:o.state)!==c&&this._switchErrors.set(l,"No confirmó el modo");this._notify("No se pudo aplicar completamente el modo seleccionado.","error"),console.error("Error aplicando modo del showroom:",n)}finally{this._clearExpectedStates(r),this._pendingAction="",await this._fetchCurrentStates(),this._updateStatePresentation()}}async _executeGeneralPower(e,t={}){var l;if(!this._hass||this._pendingAction||!["on","off"].includes(e))return!1;const i=this._config(),a=e==="on"?i.powerOnScript:i.powerOffScript,r=i.sceneControlEntities.map(c=>({entityId:c,desired:e})),s=t.successMessage||(e==="on"?"Iluminación general encendida.":"Iluminación general apagada."),o=t.errorMessage||(e==="on"?"No se pudo encender toda la iluminación.":"No se pudo apagar toda la iluminación.");this._pendingAction=a||`direct-power-${e}`,this._markExpectedStates(r),this._updateStatePresentation();let n=null;try{if(a)try{await this._hass.callService("script","turn_on",{entity_id:a})}catch(p){n=p,console.warn(`El script ${a} no respondió; se aplicará el control directo.`,p)}await this._setEntitiesState(i.sceneControlEntities,e);const c=await this._waitForExpectedStates(r);if(!c.ok){const p=c.mismatches.map(h=>h.entityId).join(", ");throw new Error(`No se confirmaron los estados de: ${p}`)}return this._confirmAction="",this._notify(s,"success"),!0}catch(c){for(const{entityId:p,desired:h}of r)((l=this._state(p))==null?void 0:l.state)!==h&&this._switchErrors.set(p,"Sin confirmación");return this._notify(o,"error"),console.error("Error ejecutando el control general del showroom:",{error:c,scriptError:n,desired:e}),!1}finally{this._clearExpectedStates(r),this._pendingAction="",await this._fetchCurrentStates(),this._updateStatePresentation()}}async _confirmGeneralPower(){const e=this._confirmAction;["on","off"].includes(e)&&await this._executeGeneralPower(e,{successMessage:e==="on"?"Toda la iluminación del showroom está encendida.":"Toda la iluminación del showroom está apagada."})}async _clearScene(){this._pendingAction||await this._executeGeneralPower("off",{successMessage:"Escena apagada. La iluminación del showroom quedó apagada.",errorMessage:"No se pudo apagar completamente la escena."})}async _mediaAction(e){const t=this._config().mediaPlayer;if(!(!t||!e||this._isUnavailable(t)))try{await this._hass.callService("media_player",e,{entity_id:t})}catch(i){this._notify("No se pudo controlar el reproductor.","error"),console.error(`Error ejecutando media_player.${e}:`,i)}}_updateToastPresentation(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("[data-toast]");if(!this._toast){e==null||e.remove();return}if(e){e.className=`toast ${this._escape(this._toast.type)}`,e.textContent=this._toast.message;return}const t=document.createElement("div");t.dataset.toast="",t.className=`toast ${this._escape(this._toast.type)}`,t.setAttribute("role","status"),t.textContent=this._toast.message,this.shadowRoot.append(t)}_notify(e,t="success"){var i;clearTimeout(this._toastTimer),this._toast={message:e,type:t},(i=this.shadowRoot)!=null&&i.querySelector(".app-shell")?this._updateToastPresentation():this._requestRender(),this._toastTimer=setTimeout(()=>{this._toast=null,this._updateToastPresentation()},4200)}_historyMap(){var t;const e=new Map;for(const i of this._history||[]){const a=(t=i==null?void 0:i[0])==null?void 0:t.entity_id;a&&e.set(a,i)}return e}_historySegments(e,t,i){if(!Array.isArray(e)||!e.length)return[];const a=e.map(s=>({state:s.state,time:new Date(s.last_changed||s.last_updated).getTime()})).filter(s=>Number.isFinite(s.time)).sort((s,o)=>s.time-o.time);if(!a.length)return[];const r=[];for(let s=0;s<a.length;s+=1){const o=a[s],n=a[s+1],l=Math.max(t,o.time),c=Math.min(i,(n==null?void 0:n.time)??i);c<=l||r.push({state:o.state,left:(l-t)/(i-t)*100,width:(c-l)/(i-t)*100})}return r}_sparkline(e,t){var m;const i=this._historyMap().get(e)||[],a=Date.now(),r=a-t*60*60*1e3,s=i.map(f=>({value:Number(f.state),time:new Date(f.last_changed||f.last_updated).getTime()})).filter(f=>Number.isFinite(f.value)&&Number.isFinite(f.time)&&f.time>=r).sort((f,_)=>f.time-_.time),o=Number((m=this._state(e))==null?void 0:m.state);if(Number.isFinite(o)&&s.push({value:o,time:a}),!s.length)return{path:"",min:"--",max:"--",avg:"--"};const n=s.map(f=>f.value),l=Math.min(...n),c=Math.max(...n),p=n.reduce((f,_)=>f+_,0)/n.length,h=c-l||1;return{path:s.map((f,_)=>{const $=(f.time-r)/(a-r)*300,w=66-(f.value-l)/h*52;return`${_?"L":"M"}${Math.max(0,Math.min(300,$)).toFixed(1)},${w.toFixed(1)}`}).join(" "),min:this._formatNumber(l),max:this._formatNumber(c),avg:this._formatNumber(p)}}_formatNumber(e){return Number.isFinite(e)?new Intl.NumberFormat("es-BO",{maximumFractionDigits:1}).format(e):"--"}_updateClock(){var o,n,l;if(!this.shadowRoot)return;const e=new Date,t=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",hour12:!0}).formatToParts(e),i=((o=t.find(c=>c.type==="hour"))==null?void 0:o.value)||"--",a=((n=t.find(c=>c.type==="minute"))==null?void 0:n.value)||"--",r=(((l=t.find(c=>c.type==="dayPeriod"))==null?void 0:l.value)||"").replaceAll(".","").replaceAll(" ","").toUpperCase();for(const c of this.shadowRoot.querySelectorAll("[data-clock-time]"))c.textContent=`${i}:${a}`;for(const c of this.shadowRoot.querySelectorAll("[data-clock-period]"))c.textContent=r||"";const s=this.shadowRoot.querySelector("[data-current-time]");s&&(s.dateTime=e.toISOString(),s.setAttribute("aria-label",`${i}:${a} ${r}`.trim()))}_icon(e,t=""){const i=V[e]||V.bulb;return`<svg class="icon ${this._escape(t)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`}_escape(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_renderDevice(e){const t=this._state(e.entity),i=this._visibleSwitchState(e.entity),a=i==="on",r=!t||["unknown","unavailable"].includes(t.state),s=this._pendingSwitches.has(e.entity),o=this._switchErrors.get(e.entity),n=o||(s?i==="on"?"Encendiendo…":"Apagando…":r?"No disponible":a?"Encendido":"Apagado");return`
      <button
        class="device ${a?"is-on":""} ${s?"is-pending":""} ${o?"is-error":""}"
        data-action="toggle-switch"
        data-entity="${this._escape(e.entity)}"
        aria-pressed="${a}"
        aria-label="${this._escape(`${e.name}: ${n}`)}"
        ${r?"disabled":""}
      >
        <span class="device-icon">${this._icon(e.icon)}</span>
        <span class="device-copy">
          <strong>${this._escape(e.name)}</strong>
          <small>${this._escape(n)}</small>
        </span>
        <span class="device-switch" aria-hidden="true"><i></i></span>
      </button>
    `}_renderDeviceGroup(e,t,i){return`
      <section class="surface control-section">
        <div class="section-heading compact-heading">
          <div>
            <span class="eyebrow">${this._escape(t)}</span>
            <h2>${this._escape(e)}</h2>
          </div>
        </div>
        <div class="device-grid">${i.map(a=>this._renderDevice(a)).join("")}</div>
      </section>
    `}_renderWeather(){const e=this._config(),t=this._state(e.weather);if(!t)return`
        <section class="surface weather-card is-unavailable">
          <span class="eyebrow">Clima</span>
          <h2>Entidad no encontrada</h2>
          <code>${this._escape(e.weather)}</code>
        </section>
      `;const i=t.attributes||{},a=t.state,r=this._forecast.slice(0,3);return`
      <section class="surface weather-card">
        <div class="weather-main">
          <div class="weather-symbol">${this._escape(R[a]||"·")}</div>
          <div class="weather-copy">
            <span class="eyebrow">Clima · Casa</span>
            <h2>${this._escape(B[a]||a)}</h2>
            <p>Humedad ${this._escape(i.humidity??"Sin datos")}% · Viento ${this._escape(i.wind_speed??"Sin datos")} ${this._escape(i.wind_speed_unit??"")}</p>
          </div>
          <strong class="temperature">${this._escape(i.temperature??"--")}${this._escape(i.temperature_unit??"°")}</strong>
        </div>
        ${e.showForecast?`
          <div class="forecast-row">
            ${r.length?r.map(s=>{const o=new Date(s.datetime),n=new Intl.DateTimeFormat("es-BO",{weekday:"short"}).format(o);return`
                <div class="forecast-item">
                  <span>${this._escape(n)}</span>
                  <b>${this._escape(R[s.condition]||"·")}</b>
                  <strong>${this._escape(s.temperature??s.native_temperature??"--")}°</strong>
                </div>
              `}).join(""):'<span class="forecast-empty">Pronóstico no disponible</span>'}
          </div>
        `:""}
      </section>
    `}_renderMedia(){const e=this._config(),t=this._state(e.mediaPlayer),i=!t||["unknown","unavailable"].includes(t.state),a=(t==null?void 0:t.attributes)||{},r=(t==null?void 0:t.state)==="playing",s=i?"No disponible":r?"Reproduciendo":(t==null?void 0:t.state)==="paused"?"En pausa":(t==null?void 0:t.state)==="idle"?"En espera":(t==null?void 0:t.state)||"Detenido",o=a.media_title||a.friendly_name||"Showroom 1",n=a.media_artist||a.source||"Música del showroom",l=Number(a.volume_level),c=(p,h,d,m=!1)=>`
      <button
        class="media-button ${m?"primary":""}"
        data-action="media"
        data-service="${p}"
        aria-label="${this._escape(d)}"
        title="${this._escape(d)}"
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
          ${c("volume_down","volumeDown","Bajar volumen")}
          ${c("media_previous_track","previous","Pista anterior")}
          ${c("media_play_pause",r?"pause":"play",r?"Pausar":"Reproducir",!0)}
          ${c("media_next_track","next","Pista siguiente")}
          ${c("volume_up","volumeUp","Subir volumen")}
        </div>
      </section>
    `}_renderSceneButton(e){const t=this._pendingAction===e.key,i=this._sceneStatus(e),a=t?"Aplicando...":i.active?"Activo":i.unavailable?"Sin datos":"Inactivo";return`
      <button
        class="scene ${t?"is-pending":""} ${i.active?"is-active":""} ${i.unavailable?"is-unavailable":""}"
        data-action="run-scene"
        data-scene-key="${this._escape(e.key)}"
        data-label="${this._escape(e.name)}"
        aria-pressed="${i.active}"
        aria-label="${this._escape(`${e.name}: ${a}`)}"
        ${this._pendingAction&&!t?"disabled":""}
      >
        <span class="scene-icon">${this._icon(e.icon)}</span>
        <span class="scene-copy">
          <strong>${this._escape(e.name)}</strong>
          <small>${this._escape(e.subtitle)}</small>
        </span>
        <span class="scene-state" aria-hidden="true">${this._escape(a)}</span>
      </button>
    `}_renderSceneBlock({eyebrow:e,title:t,scenes:i,className:a}){const r=this._config(),s=i.find(c=>this._sceneStatus(c).active),o=this._pendingAction===r.powerOffScript,n=r.sceneControlEntities.some(c=>{var p;return((p=this._state(c))==null?void 0:p.state)==="on"}),l=!!this._pendingAction||!n;return`
      <section class="surface scenes-card ${this._escape(a)}">
        <div class="section-heading compact-heading scenes-heading">
          <div>
            <span class="eyebrow">${this._escape(e)}</span>
            <h2>${this._escape(t)}</h2>
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
        <div class="scene-grid">${i.map(c=>this._renderSceneButton(c)).join("")}</div>
      </section>
    `}_renderScenes(){const e=this._config(),t=[...e.scenes,...e.sampleScenes],i=t.find(o=>this._sceneStatus(o).active),a=this._pendingAction===e.powerOffScript,r=e.sceneControlEntities.some(o=>{var n;return((n=this._state(o))==null?void 0:n.state)==="on"}),s=!!this._pendingAction||!r;return`
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
        <div class="scene-grid quick-scene-grid">${t.map(o=>this._renderSceneButton(o)).join("")}</div>
      </section>
    `}_renderGeneralControl(e=!0){const t=this._config(),i=this._pendingAction===t.powerOnScript,a=this._pendingAction===t.powerOffScript;return`
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
        ${e&&t.reflector?`
          <div class="isolated-control">
            <span class="isolated-label">Control aislado</span>
            ${this._renderDevice(t.reflector)}
          </div>
        `:""}
      </section>
    `}_renderActivity(){const e=this._energyRangeDefinition(),t=this._energyData.map(n=>Math.max(0,Number(n.change)||0)),i=t.reduce((n,l)=>n+l,0),a=t.length?i/t.length:0,r=t.length?Math.max(...t):0,s=new Date().toLocaleDateString("es-BO",{month:"short",year:"numeric"}).replace(".",""),o=this._energyRange==="day"?`${t.length} ${t.length===1?"hora":"horas"}`:this._energyRange==="month"?`${t.length} ${t.length===1?"día":"días"}`:`${t.length} ${t.length===1?"mes":"meses"}`;return`
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
          <div class="energy-stat"><small>Total del período</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(i)} kWh`}</strong><span>${this._escape(e.title)}</span></div>
          <div class="energy-stat"><small>Promedio por ${this._escape(e.intervalLabel)}</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(a)} kWh`}</strong><span>${this._escape(o)}</span></div>
          <div class="energy-stat"><small>Mayor intervalo</small><strong>${this._energyLoading&&!this._energyData.length?"…":`${this._formatEnergy(r)} kWh`}</strong><span>Pico estimado del período</span></div>
        </div>

        <div class="energy-note">9 circuitos incluidos. Potencia instalada conocida: 1.395 kW. Reflector exterior pendiente de potencia.</div>

        <div class="energy-chart-card">
          <div class="energy-chart-title"><strong>${this._energyRange==="day"?"Consumo por hora":this._energyRange==="month"?"Consumo por día":"Consumo por mes"}</strong><span>${this._escape(e.title)}</span></div>
          ${this._energyChart()}
        </div>
      </section>
    `}_renderSystem(){const e=this._config(),t=this._state(e.batteryLevel),i=Number(t==null?void 0:t.state);return`
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
    `}_renderConfirmDialog(){if(!["on","off"].includes(this._confirmAction))return"";const e=this._confirmAction==="on",t=this._config(),i=e?t.powerOnScript:t.powerOffScript,a=this._pendingAction===i,r=e?"¿Encender toda la iluminación?":"¿Apagar todo el showroom?",s=e?"Se encenderán las luminarias generales del showroom. Después podrás elegir una escena o ajustar cada zona de forma individual.":"Se apagarán las luminarias generales del showroom y cualquier escena activa.",o=e?"Sí, encender":"Sí, apagar";return`
      <div class="dialog-backdrop" data-action="cancel-power-confirm">
        <section class="dialog-card" role="dialog" aria-modal="true" aria-labelledby="power-dialog-title" data-dialog-card>
          <div class="dialog-icon ${e?"is-power-on":"is-power-off"}">${this._icon(e?"bulb":"power")}</div>
          <span class="eyebrow">Confirmar acción</span>
          <h2 id="power-dialog-title">${this._escape(r)}</h2>
          <p>${this._escape(s)}</p>
          <div class="dialog-actions">
            <button class="secondary-button" data-action="cancel-power-confirm" ${a?"disabled":""}>Cancelar</button>
            <button class="primary-button ${e?"confirm-on":""}" data-action="confirm-power" ${a?"disabled":""}>${a?"Ejecutando…":this._escape(o)}</button>
          </div>
        </section>
      </div>
    `}_renderNavigation(){const e=this._config().panelKind==="general"?[["lights","spot","Iluminación"],["energy","energy","Energía"],["system","health","Sistema"]]:[["home","bulb","Inicio"],["lights","spot","Iluminación"],["energy","energy","Energía"],["system","health","Sistema"]];return`
      <nav class="view-navigation ${e.length===3?"is-general":""}" aria-label="Secciones de ${this._escape(this._config().title)}">
        ${e.map(([t,i,a])=>`
          <button
            class="view-navigation-button ${this._activeView===t?"is-active":""}"
            data-action="set-view"
            data-view="${t}"
            aria-current="${this._activeView===t?"page":"false"}"
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
    `}_renderActiveView(e){if(e.staticOnly)return this._renderGeneralStatic();if(this._activeView==="lights"){const t=e.panelKind==="general"?"Circuitos":"Spots";return`
        <section class="view-panel view-lights" aria-labelledby="lights-view-title">
          <header class="view-heading">
            <div><span class="section-kicker">Control directo</span><h1 id="lights-view-title">Iluminación</h1></div>
            <span>${e.spots.length+e.samples.length+(e.reflector?1:0)} circuitos</span>
          </header>
          <div class="lighting-layout">
            <section class="surface control-section spots-section">
              <div class="section-heading compact-heading"><div><h2>${t}</h2></div></div>
              <div class="device-grid">${e.spots.map(i=>this._renderDevice(i)).join("")}</div>
            </section>
            ${e.samples.length?`<section class="surface control-section samples-section">
              <div class="section-heading compact-heading"><div><h2>Muestras</h2></div></div>
              <div class="device-grid">${e.samples.map(i=>this._renderDevice(i)).join("")}</div>
            </section>`:""}
            ${e.reflector?`<section class="surface control-section reflector-section"><div class="section-heading compact-heading"><div><h2>Exterior</h2></div></div>${this._renderDevice(e.reflector)}</section>`:""}
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
    `}render(){var h;if(!this.shadowRoot||!this._hass)return;this._captureEnergyChartScroll(),this.setAttribute("data-theme",this._theme);const e=this._config();this.setAttribute("data-panel-kind",e.panelKind);const t=e.staticOnly,i=this._state(e.weather),a=(i==null?void 0:i.attributes)||{},r=i==null?void 0:i.state,s=this._theme==="dark"?"claro":"oscuro",o=[...e.spots,...e.samples,...e.reflector?[e.reflector]:[]],n=o.filter(d=>this._visibleSwitchState(d.entity)==="on").length,l=(h=this._state(e.mediaPlayer))==null?void 0:h.state,c=l==="playing"?"Reproduciendo":l==="paused"?"En pausa":"Detenido",p=this._energyMonthTotal===null?"Sin datos":`${this._formatEnergy(this._energyMonthTotal)} kWh`;this.shadowRoot.innerHTML=`
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
            >${ae}</button>
            <div class="brand" aria-label="${this._escape(e.title)}">
              <strong class="brand-wordmark">WITMIND</strong>
              <span>${this._escape(e.siteLabel)}</span>
            </div>
          </div>
          ${t?"":`<div class="status-strip" aria-label="Resumen de ${this._escape(e.title)}">
            <button class="status-pill ${n?"is-active":""}" data-action="set-view" data-view="lights">
              <span class="status-pill-icon">${this._icon("bulb")}</span>
              <span><strong data-lights-summary>${n} de ${o.length}</strong><small>Luces</small></span>
            </button>
            ${e.panelKind==="general"?"":`<button class="status-pill ${l==="playing"?"is-active":""}" data-action="set-view" data-view="home">
              <span class="status-pill-icon">${this._icon("music")}</span>
              <span><strong>${this._escape(c)}</strong><small>Multimedia</small></span>
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
            <div class="header-weather" aria-label="Clima actual: ${this._escape(B[r]||r||"Sin datos")}, ${this._escape(a.temperature??"Sin datos")}${this._escape(a.temperature_unit??"°")}">
              <span aria-hidden="true">${this._escape(R[r]||"·")}</span>
              <strong>${this._escape(a.temperature??"--")}${this._escape(a.temperature_unit??"°")}</strong>
            </div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar a tema ${s}" title="Cambiar a tema ${s}">${re}</button>
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
    `,this._updateClock(),requestAnimationFrame(()=>this._restoreEnergyChartScroll())}}customElements.get("showroom-panel")||customElements.define("showroom-panel",se);const ne={"clear-night":"Noche despejada",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvia",snowy:"Nieve","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},oe={"clear-night":"☾",cloudy:"☁",exceptional:"!",fog:"≋",hail:"◆",lightning:"ϟ","lightning-rainy":"ϟ",partlycloudy:"◒",pouring:"☂",rainy:"☂",snowy:"❄","snowy-rainy":"❄",sunny:"☀",windy:"≈","windy-variant":"≈"},ce='<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',le='<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><g class="theme-icon-sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></g><path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',Y={bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>',panel:'<rect width="18" height="18" x="3" y="3" rx="3"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',corridor:'<path d="M4 3h16v18H4V3Zm2 2v14h5V5H6Zm7 0v14h5V5h-5Z"/>',workshop:'<path d="M3 7l9-5 9 5v14H3V7Zm2 1.2V19h4v-6h6v6h4V8.2l-7-3.9-7 3.9Z"/>',power:'<path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0"/>',energy:'<path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z"/>',shield:'<path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/>',office:'<path d="M3 4h18v16H3V4Zm4 4h4v3H7V8Zm6 0h4v3h-4V8ZM7 13h4v3H7v-3Zm6 0h4v3h-4v-3Z"/>'},T=g=>`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:0}).format(g)} W`;class de extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._started=!1,this._renderQueued=!1,this._pending=new Map,this._errors=new Map,this._pendingAction="",this._confirmAction="",this._toast="",this._toastTimer=null,this._theme=this._loadTheme(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",e=>this._handleClick(e))}set hass(e){var t;this._hass=e,this._started||(this._started=!0),this.isConnected&&((t=this.shadowRoot)!=null&&t.querySelector(".operations-shell")?this._updatePresentation():this._render())}get hass(){return this._hass}set panel(e){this._panel=e&&typeof e=="object"?e:{},this.isConnected&&this._render()}get panel(){return this._panel}set theme(e){if(e==="dark"||e==="light"){const t=this._theme!==e;this._theme=e,this.setAttribute("data-theme",e),this._saveTheme(),t&&this.isConnected&&this._queueRender()}}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._hass&&this._render()}disconnectedCallback(){this._toastTimer&&window.clearTimeout(this._toastTimer)}_kind(){return String(this._panel.panel_kind||this._panel.panelKind||"offices").toLowerCase()}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_toggleTheme(){this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))}_state(e){var t,i;return(i=(t=this._hass)==null?void 0:t.states)==null?void 0:i[e]}_isOn(e){var t;return((t=this._state(e))==null?void 0:t.state)==="on"||this._pending.get(e)==="on"}_unavailable(e){var i;const t=(i=this._state(e))==null?void 0:i.state;return!t||t==="unknown"||t==="unavailable"}_escape(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_icon(e){return`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Y[e]||Y.bulb}</svg>`}_devices(){const e=this._kind(),t=this._panel.power_watts||this._panel.powerWatts||this._panel.device_watts||{},i=a=>({...a,watts:a.watts??(Number(t[a.entity]||0)||void 0)});return e==="offices"?(this._panel.areas||[]).flatMap(a=>(a.devices||[]).map(i)):e==="recording"?(this._panel.switches||[]).map(i):(this._panel.zones||[]).flatMap(a=>(a.devices||(a.entities||[]).map(r=>({entity:r,name:r}))).map(i))}_powerTotal(e=this._devices()){return e.reduce((t,i)=>t+Number(i.watts||0),0)}_powerActive(e=this._devices()){return e.filter(t=>this._isOn(t.entity)).reduce((t,i)=>t+Number(i.watts||0),0)}_weather(){const e=this._state(this._panel.weather||"weather.forecast_casa");return{temperature:((e==null?void 0:e.attributes)||{}).temperature??"—",condition:ne[String((e==null?void 0:e.state)||"")]||String((e==null?void 0:e.state)||"Sin datos")}}_queueRender(){this._renderQueued||(this._renderQueued=!0,requestAnimationFrame(()=>{this._renderQueued=!1,this._render()}))}_render(){var h;if(!this.shadowRoot)return;const e=this._weather(),t=this._devices(),i=this._kind(),a=this._panel.title||(i==="recording"?"Sala de grabación":i==="control"?"Control general":"Oficinas"),r=this._panel.subtitle||"Control operativo",s=t.filter(d=>this._isOn(d.entity)).length,o=this._powerActive(t),n=this._powerTotal(t),l=new Date,c=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit"}).format(l);this.setAttribute("data-kind",this._kind()),this.setAttribute("data-theme",this._theme),this.shadowRoot.innerHTML=`
      <style>
        :host{display:block;min-height:100dvh;color:var(--wit-text-primary,#f5f6f4);background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums}:host([data-theme=light]){color:#172129;background:linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)}:host([data-theme=light]) .topbar,:host([data-theme=light]) .hero,:host([data-theme=light]) .surface{background:rgba(255,255,255,.9);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .device,:host([data-theme=light]) .action,:host([data-theme=light]) .area{background:rgba(247,250,250,.95);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .device-copy small,:host([data-theme=light]) .action small,:host([data-theme=light]) .area-head small,:host([data-theme=light]) .section-head small,:host([data-theme=light]) .hero p{color:#5f6b70}:host([data-theme=light]) .metric,:host([data-theme=light]) .weather{color:#526066;background:rgba(23,33,41,.06);border-color:rgba(23,33,41,.12)}
        *{box-sizing:border-box}button{font:inherit;color:inherit}button:focus-visible{outline:2px solid var(--wit-accent,#f26522);outline-offset:2px}.operations-shell{min-height:100dvh}.topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:14px;min-height:66px;padding:12px clamp(16px,3vw,36px);border-bottom:1px solid rgba(255,255,255,.08);background:rgba(7,17,24,.84);backdrop-filter:blur(18px)}.menu{width:44px;height:44px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);cursor:pointer}.menu span,.menu span:before,.menu span:after{display:block;width:18px;height:2px;margin:auto;background:currentColor;content:""}.menu span:before{transform:translateY(-6px)}.menu span:after{transform:translateY(4px)}.brand{min-width:0}.eyebrow{display:block;color:#f26522;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.brand h1{margin:2px 0 0;font-size:clamp(20px,2.5vw,30px);letter-spacing:-.03em}.top-meta{display:flex;align-items:center;gap:10px;margin-left:auto}.weather,.metric{padding:9px 13px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.04);font-size:12px;color:#adb4b6}.weather strong,.metric strong{color:#f5f6f4;margin-right:5px}.dashboard{width:min(1480px,100%);margin:auto;padding:clamp(16px,2.5vw,32px)}.hero{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;margin-bottom:18px;padding:24px;border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.86);box-shadow:0 16px 40px rgba(0,0,0,.24)}.hero h2{margin:4px 0 0;font-size:clamp(25px,4vw,40px);letter-spacing:-.04em}.hero p{margin:7px 0 0;color:#adb4b6}.metrics{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.surface{border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.82);box-shadow:0 16px 40px rgba(0,0,0,.2);overflow:hidden}.section{margin-top:16px;padding:18px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.section-head h3{margin:0;font-size:15px}.section-head small{color:#747e82}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}.device{min-height:78px;padding:13px;display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:11px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(27,40,46,.72);text-align:left;cursor:pointer;transition:transform 160ms,background 160ms,border-color 160ms}.device:hover:not(:disabled){transform:translateY(-1px);background:rgba(255,255,255,.07);border-color:rgba(242,101,34,.42)}.device.is-on{border-color:rgba(242,101,34,.5);background:rgba(242,101,34,.12)}.device.is-error{border-color:#ef4444}.device:disabled{cursor:not-allowed;opacity:.55}.device-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:11px;background:rgba(255,255,255,.06);color:#747e82}.is-on .device-icon{color:#f26522;background:rgba(242,101,34,.14)}.device-copy strong,.device-copy small{display:block}.device-copy strong{font-size:12px}.device-copy small{margin-top:4px;color:#747e82;font-size:10px}.device-state{text-align:right;color:#adb4b6;font-size:10px}.is-on .device-state{color:#f26522}.area{padding:16px;border:1px solid rgba(255,255,255,.07);border-radius:18px;background:rgba(7,17,24,.2)}.area+.area{margin-top:12px}.area-head{display:flex;justify-content:space-between;gap:10px;margin-bottom:12px}.area-head strong{font-size:14px}.area-head small{display:block;margin-top:4px;color:#747e82}.env{display:flex;gap:8px;flex-wrap:wrap;color:#adb4b6;font-size:11px}.env span{padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.05)}.action{min-height:70px;padding:14px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(27,40,46,.72);text-align:left;cursor:pointer}.action:hover:not(:disabled){border-color:rgba(242,101,34,.42);background:rgba(255,255,255,.07)}.action.danger{border-color:rgba(239,68,68,.32)}.action strong,.action small{display:block}.action strong{font-size:12px}.action small{margin-top:5px;color:#747e82;font-size:10px}.action .action-state{margin-top:7px;color:#f26522;font-size:10px}.toast{position:fixed;z-index:20;right:18px;bottom:18px;max-width:min(420px,calc(100vw - 36px));padding:13px 16px;border:1px solid rgba(242,101,34,.45);border-radius:14px;background:#162126;color:#f5f6f4;box-shadow:0 16px 42px rgba(0,0,0,.38);font-size:12px}@media(max-width:700px){.topbar{align-items:flex-start}.top-meta{display:none}.hero{grid-template-columns:1fr;padding:18px}.metrics{justify-content:flex-start}.dashboard{padding:14px}.grid{grid-template-columns:1fr}}
      </style>
      <div class="operations-shell">
        <header class="topbar">
          <div class="topbar-start">
            <button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de navegación de Home Assistant" title="Abrir menú">${ce}</button>
            <div class="brand" aria-label="Witmind ${this._escape(a)}"><strong class="brand-wordmark">WITMIND</strong><span>WTX · MDTC</span></div>
          </div>
          <div class="status-strip" aria-label="Resumen de ${this._escape(a)}">
            <button class="status-pill ${s?"is-active":""}" type="button"><span class="status-pill-icon">${this._icon("bulb")}</span><span><strong><span data-total-on>${s}</span> de ${t.length}</strong><small>Circuitos</small></span></button>
            <button class="status-pill ${o?"is-active":""}" type="button"><span class="status-pill-icon">${this._icon("power")}</span><span><strong data-active-power>${T(o)}</strong><small>Activos</small></span></button>
            <button class="status-pill" type="button"><span class="status-pill-icon">${this._icon("energy")}</span><span><strong data-installed-power>${T(n)}</strong><small>Instalados</small></span></button>
          </div>
          <div class="topbar-meta">
            <time class="header-clock"><strong>${this._escape(c)}</strong></time>
            <div class="header-weather" aria-label="Clima actual: ${this._escape(e.condition)}, ${this._escape(e.temperature)}°"><span aria-hidden="true">${this._escape(oe[String(((h=this._state(this._panel.weather||"weather.forecast_casa"))==null?void 0:h.state)||"")]||"·")}</span><strong>${this._escape(e.temperature)}°</strong></div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema" title="Cambiar tema">${le}</button>
          </div>
        </header>
        <main class="dashboard">
          <section class="workspace-heading"><div><span class="section-kicker">${this._escape(r)}</span><h1>${this._escape(a)}</h1></div><span class="workspace-summary">${t.length} circuitos · ${T(n)}</span></section>
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
    `,this.shadowRoot.append(p)}_renderOffices(){const e=this._panel.areas||[];return`<section class="view-panel offices-view" aria-label="Zonas operativas"><div class="section-heading compact-heading offices-section-heading"><div><span class="section-kicker">Zonas operativas</span><h2>Distribución de circuitos</h2></div><span>${e.reduce((i,a)=>i+(a.devices||[]).length,0)} circuitos</span></div><div class="lighting-layout offices-layout">${e.map(i=>{var n,l;const a=i.devices||[],r=i.environment||{},s=r.temperature?(n=this._state(r.temperature))==null?void 0:n.state:"",o=r.humidity?(l=this._state(r.humidity))==null?void 0:l.state:"";return`<section class="surface control-section office-section"><div class="section-heading compact-heading"><div><span class="eyebrow">Zona</span><h2>${this._escape(i.name)}</h2></div><div class="area-meta">${s?`<span>${this._escape(s)} °C</span>`:""}${o?`<span>${this._escape(o)} % HR</span>`:""}</div></div>${i.subtitle||i.descriptor?`<p class="area-description">${this._escape(i.subtitle||i.descriptor)}</p>`:""}<div class="device-grid">${a.map(c=>this._renderDevice(c)).join("")}</div></section>`}).join("")}</div></section>`}_renderRecording(){const e=this._panel.switches||[];return`<section class="surface section"><div class="section-head"><div><span class="eyebrow">Cuatro circuitos</span><h3>Sala de grabación</h3></div><button class="action compact-action danger" data-action="run-action" data-action-id="recording-off"><span class="action-icon">${this._icon("power")}</span><span>Apagar todo</span></button></div><div class="grid">${e.map(t=>this._renderDevice(t)).join("")}</div><div class="section-head section-footnote"><small>Estimación instalada: ${T(this._powerTotal(e))}. El valor representa potencia nominal, no consumo medido.</small></div></section>`}_renderControl(){return`<section class="surface section"><div class="section-head"><div><span class="eyebrow">Escenas y rutinas</span><h3>Control general</h3></div><small>Acciones verificadas</small></div><div class="control-actions">${[...this._panel.main_actions||[],...this._panel.daily_actions||[],...this._panel.danger_action?[this._panel.danger_action]:[]].map(t=>`<button class="action ${t.tone==="danger"?"danger":""}" data-action="run-action" data-action-id="${this._escape(t.id)}" ${this._pendingAction&&this._pendingAction!==t.id?"disabled":""}><span class="action-icon ${t.tone==="danger"?"is-danger":""}">${this._icon(t.icon||(t.tone==="danger"?"power":"bulb"))}</span><span class="action-copy"><strong>${this._escape(t.name)}</strong><small>${this._escape(t.subtitle||"Rutina operativa")}</small></span><span class="action-state">${this._pendingAction===t.id?"Aplicando…":t.tone==="danger"?"Confirmar":"Lista"}</span></button>`).join("")}</div></section><section class="surface section"><div class="section-head"><div><span class="eyebrow">Resumen de zonas</span><h3>Estado actual</h3></div></div>${(this._panel.zones||[]).map(t=>{const i=t.entities||[],a=i.filter(r=>this._isOn(r)).length;return`<div class="area"><div class="area-head"><div><strong>${this._escape(t.name)}</strong><small>${a} de ${i.length} circuitos activos</small></div><span class="device-state">${a?"Activo":"Apagado"}</span></div></div>`}).join("")}</section>${this._confirmAction?`<div class="toast" role="alert"><strong>¿Confirmar ${this._escape(this._confirmAction)}?</strong><button class="action compact-action" data-action="confirm-action" data-action-id="${this._escape(this._confirmAction)}">Confirmar</button><button class="action compact-action" data-action="cancel-action">Cancelar</button></div>`:""}`}_renderDevice(e){const t=this._isOn(e.entity),i=this._unavailable(e.entity),a=this._pending.has(e.entity),r=this._errors.get(e.entity),s=r||(a?t?"Encendiendo…":"Apagando…":i?"No disponible":t?"Encendido":"Apagado");return`<button class="device ${t?"is-on":""} ${a?"is-pending":""} ${r?"is-error":""}" data-action="toggle-switch" data-entity="${this._escape(e.entity)}" aria-pressed="${String(t)}" aria-label="${this._escape(`${e.name}: ${s}`)}" ${i||a?"disabled":""}><span class="device-icon">${this._icon(e.icon||"bulb")}</span><span class="device-copy"><strong>${this._escape(e.name)}</strong><small><span data-device-status="${this._escape(e.entity)}">${this._escape(s)}</span>${e.watts?` · ${T(e.watts)}`:""}</small></span><span class="device-switch" aria-hidden="true"><i></i></span></button>`}_updatePresentation(){var a,r,s,o,n;(a=this.shadowRoot)==null||a.querySelectorAll("[data-action=toggle-switch]").forEach(l=>{const c=l.dataset.entity||"",p=this._isOn(c),h=this._unavailable(c),d=this._pending.has(c),m=this._errors.get(c);l.classList.toggle("is-on",p),l.classList.toggle("is-error",!!m),l.disabled=h||d,l.setAttribute("aria-pressed",String(p));const f=l.querySelector("[data-device-status]");f&&(f.textContent=m||(d?p?"Encendiendo…":"Apagando…":h?"No disponible":p?"Encendido":"Apagado"))});const e=this._devices(),t=(r=this.shadowRoot)==null?void 0:r.querySelector("[data-total-on]"),i=(s=this.shadowRoot)==null?void 0:s.querySelector("[data-active-power]");t&&(t.textContent=String(e.filter(l=>this._isOn(l.entity)).length)),i&&(i.textContent=T(this._powerActive(e))),(o=t==null?void 0:t.closest(".status-pill"))==null||o.classList.toggle("is-active",e.some(l=>this._isOn(l.entity))),(n=i==null?void 0:i.closest(".status-pill"))==null||n.classList.toggle("is-active",this._powerActive(e)>0)}_handleClick(e){const t=e.target.closest("[data-action]");if(!t||!this._hass)return;const i=t.dataset.action;if(i==="toggle-menu"){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}));return}if(i==="toggle-theme"){this._toggleTheme();return}if(i==="toggle-switch"){this._toggleSwitch(t.dataset.entity||"");return}if(i==="run-action"){const a=t.dataset.actionId||"",r=this._findAction(a);(r==null?void 0:r.tone)==="danger"?this._confirmAction=a:this._executeAction(r),this._queueRender();return}if(i==="confirm-action"){const a=this._findAction(t.dataset.actionId||this._confirmAction);this._confirmAction="",this._executeAction(a),this._queueRender();return}i==="cancel-action"&&(this._confirmAction="",this._queueRender())}_findAction(e){const t=[...this._panel.main_actions||[],...this._panel.daily_actions||[],...this._panel.danger_action?[this._panel.danger_action]:[]];return e==="recording-off"?{id:e,name:"Apagar todo",subtitle:"Apaga los cuatro circuitos",tone:"danger",off_entities:(this._panel.switches||[]).map(i=>i.entity)}:t.find(i=>i.id===e)||null}async _toggleSwitch(e){var i;if(!e||this._pending.has(e)||!((i=this._hass)!=null&&i.callService))return;const t=this._isOn(e)?"off":"on";this._pending.set(e,t),this._errors.delete(e),this._updatePresentation();try{const[a]=e.split(".");if(await this._hass.callService(a,t==="on"?"turn_on":"turn_off",{entity_id:e}),!await this._waitForState(e,t))throw new Error("Home Assistant no confirmó el estado solicitado")}catch(a){this._errors.set(e,a instanceof Error?a.message:"No se pudo cambiar el circuito"),this._showToast(this._errors.get(e)||"No se pudo cambiar el circuito")}finally{this._pending.delete(e),this._updatePresentation()}}async _executeAction(e){var i;if(!e||this._pendingAction||!((i=this._hass)!=null&&i.callService))return;this._pendingAction=e.id,this._queueRender();const t=new Map;(e.on_entities||[]).forEach(a=>t.set(a,"on")),(e.off_entities||[]).forEach(a=>t.set(a,"off"));try{for(const r of e.service_entities||[]){const[s]=r.split(".");await this._hass.callService(s,"turn_on",{entity_id:r})}for(const[r,s]of t){const[o]=r.split(".");await this._hass.callService(o,s==="on"?"turn_on":"turn_off",{entity_id:r})}if((await Promise.all([...t].map(([r,s])=>this._waitForState(r,s)))).some(r=>!r))throw new Error("No todos los circuitos confirmaron el cambio");this._showToast(`${e.name} aplicado.`)}catch(a){this._showToast(a instanceof Error?a.message:"No se pudo ejecutar la acción")}finally{this._pendingAction="",this._queueRender()}}async _waitForState(e,t){var i;for(let a=0;a<20;a+=1){if(((i=this._state(e))==null?void 0:i.state)===t)return!0;await new Promise(r=>window.setTimeout(r,250))}return!1}_showToast(e){this._toast=e,this._toastTimer&&window.clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>{this._toast="",this._queueRender()},4200),this._queueRender()}}customElements.get("witmind-operations-panel")||customElements.define("witmind-operations-panel",de);const S=g=>String(g??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),N=(g,e=[])=>{if(Array.isArray(g))return g;for(const t of e)if(Array.isArray(g==null?void 0:g[t]))return g[t];return[]},pe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',he='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';class ge extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._loaded=!1,this._loading=!1,this._error="",this._calendar=[],this._rules=[],this._targets=[],this._sensors=[],this._history=[],this._theme=this._loadTheme(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",e=>this._click(e)),this.shadowRoot.addEventListener("submit",e=>this._submit(e))}set hass(e){var t;this._hass=e,this.isConnected&&((t=this.shadowRoot)!=null&&t.querySelector(".admin-shell")||this._render(),this._applyThemeStyles(),e&&!this._loaded&&this._load())}get hass(){return this._hass}set panel(e){this._panel=e||{},this._loaded=!1,this.isConnected&&(this._render(),this._applyThemeStyles(),this._hass&&this._load())}get panel(){return this._panel}set theme(e){if(e==="dark"||e==="light"){const t=this._theme!==e;this._theme=e,this.setAttribute("data-theme",e),this._saveTheme(),t&&this.isConnected&&(this._render(),this._applyThemeStyles())}}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._render(),this._applyThemeStyles(),this._hass&&!this._loaded&&this._load()}disconnectedCallback(){var e;(e=this._unsubscribe)==null||e.call(this)}_kind(){return String(this._panel.panel_kind||this._panel.panelKind||"calendar").toLowerCase()}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_toggleTheme(){this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))}_applyThemeStyles(){var i,a;const e=this._theme==="light";this.style.color=e?"#172129":"",this.style.background=e?"linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)":"";const t=(i=this.shadowRoot)==null?void 0:i.querySelector(".topbar");t&&!t.querySelector("[data-action=toggle-theme]")&&t.insertAdjacentHTML("beforeend",`<button class="menu" data-action="toggle-theme" aria-label="Cambiar tema">${this._theme==="dark"?"☼":"☾"}</button>`),(a=this.shadowRoot)==null||a.querySelectorAll(".topbar,.hero,.surface,.row").forEach(r=>{r.style.background=e?"rgba(255,255,255,.92)":"",r.style.borderColor=e?"rgba(23,33,41,.12)":"",r.style.color=e?"#172129":""})}_title(){return this._kind()==="notifications"?"Notificaciones Witmind":"Calendario laboral"}_subtitle(){return this._kind()==="notifications"?"Centro de avisos":"Planificación operativa"}_admin(){var e,t;return((t=(e=this._hass)==null?void 0:e.user)==null?void 0:t.is_admin)!==!1}async _request(e,t={}){var a,r;const i=(r=(a=this._hass)==null?void 0:a.connection)==null?void 0:r.sendMessagePromise;if(!i)throw new Error("Conexión de Home Assistant no disponible");return i({type:e,...t})}async _load(){var e,t,i;if(!this._loading){this._loading=!0,this._error="",this._render();try{if(this._kind()==="notifications"){const[a,r,s,o]=await Promise.all([this._request("witmind_notifications/rules/list"),this._request("witmind_notifications/targets/list"),this._request("witmind_notifications/sensors/list"),this._request("witmind_notifications/history/list",{limit:150})]);this._rules=N(a,["rules"]),this._targets=N(r,["targets"]),this._sensors=N(s,["sensors"]),this._history=N(o,["history","items"]);try{this._unsubscribe=await((i=(t=(e=this._hass)==null?void 0:e.connection)==null?void 0:t.subscribeEvents)==null?void 0:i.call(t,()=>void this._load(),"witmind_notifications_updated"))}catch{}}else{const a=await this._request("calendario_laboral/get");this._calendar=N(a,["holidays","records","items","events"]).slice().sort((r,s)=>String((r==null?void 0:r.date)||"").localeCompare(String((s==null?void 0:s.date)||"")))}this._loaded=!0}catch(a){this._error=a instanceof Error?a.message:"No se pudieron cargar los datos"}finally{this._loading=!1,this._render()}}}_render(){if(!this.shadowRoot)return;const e=this._kind();this.setAttribute("data-theme",this._theme),this.setAttribute("data-kind",e);const t=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",timeZone:"America/La_Paz"}).format(new Date),i=`<header class="topbar signature-topbar"><div class="signature-topbar-start"><button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${pe}</button><div class="signature-brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div></div><div class="signature-topbar-end"><time class="signature-clock">${S(t)}</time><button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${he}</button></div></header>`,a=`<section class="admin-heading"><div><span class="eyebrow">${S(this._subtitle())}</span><h1>${S(this._title())}</h1><p>${S(this._panel.description||(e==="calendar"?"Días laborables gestionados desde Home Assistant.":"Información conectada a Home Assistant."))}</p></div><button class="refresh" data-action="refresh">Actualizar</button></section>`;this.shadowRoot.innerHTML=`<style>
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
    </style><div class="admin-shell">${i}<main class="dashboard">${a}${this._error?`<div class="error">${S(this._error)}</div>`:this._loading?'<section class="surface empty">Cargando datos de Home Assistant…</section>':e==="notifications"?this._renderNotifications():this._renderCalendar()}</main></div>`}_renderCalendar(){const e=t=>{const i=String(t||""),a=/^\d{4}-\d{2}-\d{2}$/.test(i)?new Date(`${i}T12:00:00`):new Date(i);return Number.isNaN(a.getTime())?i||"Sin fecha":new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"short",year:"numeric",timeZone:"America/La_Paz"}).format(a)};return`<section class="surface calendar-surface"><div class="section-head"><div><span class="eyebrow">Días laborables</span><h3>Calendario</h3></div><span class="muted">${this._calendar.length} registros precargados</span></div>${this._calendar.length?`<div class="list">${this._calendar.map(t=>`<article class="row"><div><strong>${S(t.name||t.title||"Día laboral")}</strong><small>${S(e(t.date))}${t.description?` · ${S(t.description)}`:""}</small></div><div class="row-actions"><button class="small ${t.active===!1?"is-muted":"is-active"}" data-action="toggle-calendar" data-id="${S(t.id??t.record_id)}">${t.active===!1?"Activar":"Activo"}</button>${this._admin()?`<button class="small danger" data-action="delete-calendar" data-id="${S(t.id??t.record_id)}">Eliminar</button>`:""}</div></article>`).join("")}</div>`:'<div class="empty">No hay registros configurados.</div>'}<form class="form" data-form="calendar"><input name="date" type="date" required><input name="name" placeholder="Nombre del día" required><input name="description" placeholder="Descripción"><button class="primary" type="submit">Añadir</button></form></section>`}_renderNotifications(){return`<section class="surface"><div class="section-head"><div><span class="eyebrow">Reglas activas</span><h3>Notificaciones</h3></div><span class="muted">${this._rules.length} reglas · ${this._targets.length} destinos · ${this._sensors.length} sensores</span></div>${this._rules.length?`<div class="list">${this._rules.map(e=>{const t=e.id??e.rule_id,i=e.enabled!==!1,a=this._targets[0];return`<article class="row"><div><strong>${S(e.name||e.title||e.id||"Regla")}</strong><small>${S(e.description||e.sensor||e.entity_id||(i?"Activa":"Desactivada"))}</small></div><div class="row-actions"><button class="small" data-action="toggle-rule" data-id="${S(t)}" data-enabled="${String(i)}">${i?"Desactivar":"Activar"}</button>${a?`<button class="small" data-action="test-target" data-key="${S(a.key??a.id??a.device_id??"")}">Probar</button>`:""}${this._admin()?`<button class="small danger" data-action="delete-rule" data-id="${S(t)}">Eliminar</button>`:""}</div></article>`}).join("")}</div>`:'<div class="empty">No hay reglas disponibles.</div>'}</section><section class="surface"><div class="section-head"><div><span class="eyebrow">Destinos</span><h3>Canales de aviso</h3></div></div>${this._targets.length?`<div class="list">${this._targets.map(e=>`<div class="row"><div><strong>${S(e.name||e.alias||e.key||e.device_id||"Destino")}</strong><small>${S(e.notify_entity_id||e.legacy_service||e.device_id||"Canal configurado")}</small></div><button class="small" data-action="test-target" data-key="${S(e.key??e.id??e.device_id??"")}">Enviar prueba</button></div>`).join("")}</div>`:'<div class="empty">No hay destinos configurados.</div>'}</section><section class="surface"><div class="section-head"><div><span class="eyebrow">Actividad reciente</span><h3>Historial</h3></div><span class="muted">${this._history.length} eventos</span></div>${this._history.length?`<div class="list">${this._history.slice(0,12).map(e=>`<div class="row"><div><strong>${S(e.title||e.message||e.rule_name||"Aviso")}</strong><small>${S(e.created_at||e.timestamp||e.date||"")}</small></div></div>`).join("")}</div>`:'<div class="empty">Sin eventos recientes.</div>'}</section>`}_click(e){const t=e.target.closest("button[data-action]");if(!t)return;const i=t.dataset.action;i==="toggle-menu"?this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0})):i==="toggle-theme"?this._toggleTheme():i==="refresh"?this._load():i==="toggle-calendar"?this._calendarAction(t.dataset.id||"",t):i==="delete-calendar"?this._calendarAction(t.dataset.id||"",t,!0):i==="toggle-rule"?this._ruleAction("toggle",t.dataset.id||"",t.dataset.enabled==="true"):i==="test-target"?this._testTarget(t.dataset.key||""):i==="delete-rule"&&this._ruleAction("delete",t.dataset.id||"")}_submit(e){const t=e.target;if(t.dataset.form!=="calendar")return;e.preventDefault();const i=new FormData(t);this._request("calendario_laboral/add",{date:i.get("date"),name:i.get("name"),description:i.get("description"),active:!0}).then(()=>this._load()).catch(a=>{this._error=a instanceof Error?a.message:"No se pudo añadir",this._render()})}async _calendarAction(e,t,i=!1){if(!(!e||!this._admin()))try{const a=this._calendar.find(r=>String(r.id??r.record_id)===e);i?await this._request("calendario_laboral/delete",{record_id:e}):await this._request("calendario_laboral/update",{record_id:e,active:(a==null?void 0:a.active)===!1,date:a==null?void 0:a.date,name:(a==null?void 0:a.name)||(a==null?void 0:a.title),description:(a==null?void 0:a.description)||""}),await this._load()}catch(a){this._error=a instanceof Error?a.message:"No se pudo actualizar",this._render()}finally{t.disabled=!1}}async _ruleAction(e,t,i=!0){if(!(!t||!this._hass))try{if(e==="toggle"&&await this._request("witmind_notifications/rules/toggle",{rule_id:t,enabled:!i}),e==="test"&&await this._testTarget(""),e==="delete"){if(!this._admin())return;await this._request("witmind_notifications/rules/delete",{rule_id:t})}await this._load()}catch(a){this._error=a instanceof Error?a.message:"No se pudo ejecutar la acción",this._render()}}async _testTarget(e){const t=this._targets.find(i=>String(i.key??i.id??i.device_id??"")===e)||this._targets[0];if(t)try{await this._request("witmind_notifications/test",{recipient:{device_id:t.device_id,notify_entity_id:t.notify_entity_id,legacy_service:t.legacy_service,name:t.name},title:"Prueba Witmind",message:`Notificación de prueba para ${t.name||"destino configurado"}.`}),await this._load()}catch(i){this._error=i instanceof Error?i.message:"No se pudo enviar la prueba",this._render()}}}customElements.get("witmind-admin-panel")||customElements.define("witmind-admin-panel",ge);const me=g=>{const e=g.last_changed??g.last_updated;if(typeof e=="string"){const i=Date.parse(e);if(Number.isFinite(i))return i}const t=Number(g.lu??g.lc??g.timestamp);return Number.isFinite(t)?t<1e10?t*1e3:t:Number.NaN},ue=g=>String(g.state??g.s??"unknown");function fe(g){const e={},t=(i,a)=>{if(!i)return;const r=a.filter(s=>!!(s&&typeof s=="object")).map(s=>({state:ue(s),timestamp:me(s)})).filter(s=>Number.isFinite(s.timestamp)).sort((s,o)=>s.timestamp-o.timestamp);e[i]=r};return Array.isArray(g)?(g.forEach(i=>{if(!Array.isArray(i)||!i.length)return;const a=i[0];t(String(a.entity_id??a.entityId??""),i)}),e):(g&&typeof g=="object"&&Object.entries(g).forEach(([i,a])=>{Array.isArray(a)&&t(i,a)}),e)}function _e(g,e,t,i,a){const r=Math.max(6e4,a),s=Math.max(1,Math.ceil(Math.max(0,i-t)/r)),o=Array.from({length:s},(d,m)=>({start:t+m*r,end:Math.min(i,t+(m+1)*r),totalKwh:0,zones:{}})),n={},l=g.map(d=>{const m=Array.from({length:s},()=>0),f=(e[d.entity]||[]).filter(b=>b.timestamp<=i);let _="off";for(const b of f){if(b.timestamp>t)break;_=b.state}const $=[{state:_,timestamp:t},...f.filter(b=>b.timestamp>t&&b.timestamp<i)];$.forEach((b,x)=>{var A;if(b.state!=="on")return;let M=Math.max(t,b.timestamp);const y=Math.min(i,((A=$[x+1])==null?void 0:A.timestamp)??i);for(;M<y;){const C=Math.min(s-1,Math.floor((M-t)/r)),E=Math.min(y,t+(C+1)*r);m[C]+=Math.max(0,E-M)/36e5,M=E}});const w=m.reduce((b,x)=>b+x,0),u=d.watts===null?null:w*d.watts/1e3;return d.watts!==null&&(m.forEach((b,x)=>{const M=b*d.watts/1e3;o[x].totalKwh+=M,o[x].zones[d.zone]=(o[x].zones[d.zone]||0)+M}),n[d.zone]=(n[d.zone]||0)+(u||0)),{...d,hours:w,kwh:u,bucketHours:m}}),c=o.reduce((d,m)=>d+m.totalKwh,0),p=Math.max(0,...o.map(d=>d.totalKwh)),h=Math.max(0,o.findIndex(d=>d.totalKwh===p));return{buckets:o,circuits:l,totalKwh:c,zoneTotals:n,peakKwh:p,peakIndex:h,knownCircuits:g.filter(d=>d.watts!==null).length,totalCircuits:g.length}}function be(g){return Array.from({length:9},(e,t)=>{const i=(t+1)*10,a=Math.max(0,g)*(i/100);return{percent:i,savedKwh:a,remainingKwh:Math.max(0,g-a)}})}const G=[{entity:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",zone:"showroom",zoneLabel:"Showroom",watts:100},{entity:"switch.interruptor_inteligente_switch_2",name:"Spots 2x3",zone:"showroom",zoneLabel:"Showroom",watts:120},{entity:"switch.interruptor_inteligente_switch_3",name:"Spots 3x3",zone:"showroom",zoneLabel:"Showroom",watts:180},{entity:"switch.interruptor_inteligente_switch_4",name:"Spots TV",zone:"showroom",zoneLabel:"Showroom",watts:25},{entity:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",zone:"showroom",zoneLabel:"Showroom",watts:96},{entity:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",zone:"showroom",zoneLabel:"Showroom",watts:10},{entity:"switch.interruptor_inteligente_2_switch_3",name:"Slims",zone:"showroom",zoneLabel:"Showroom",watts:432},{entity:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",zone:"showroom",zoneLabel:"Showroom",watts:144},{entity:"switch.smart_relay_switch_4_switch",name:"Paneles",zone:"showroom",zoneLabel:"Showroom",watts:288},{entity:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",zone:"showroom",zoneLabel:"Showroom",watts:null},{entity:"switch.interruptor_inteligente_3_switch_1",name:"Central colgante",zone:"lobby",zoneLabel:"Lobby",watts:null},{entity:"switch.interruptor_inteligente_3_switch_2",name:"Spots 5W decorativos",zone:"lobby",zoneLabel:"Lobby",watts:null},{entity:"switch.interruptor_inteligente_3_switch_3",name:"Tira LED",zone:"lobby",zoneLabel:"Lobby",watts:null},{entity:"switch.interruptor_inteligente_3_switch_4",name:"Spots 10W",zone:"lobby",zoneLabel:"Lobby",watts:null},{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",zone:"offices",zoneLabel:"Oficinas",watts:48},{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",zone:"offices",zoneLabel:"Oficinas",watts:48},{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",zone:"offices",zoneLabel:"Oficinas",watts:168},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",zone:"offices",zoneLabel:"Oficinas",watts:168},{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",zone:"offices",zoneLabel:"Oficinas",watts:96},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",zone:"offices",zoneLabel:"Oficinas",watts:117},{entity:"switch.taller_interruptor_1",name:"Taller",zone:"offices",zoneLabel:"Oficinas",watts:144},{entity:"switch.4gang_switch_sala_grabacion_interruptor_1",name:"Tira LED",zone:"recording",zoneLabel:"Grabación",watts:24},{entity:"switch.4gang_switch_sala_grabacion_interruptor_2",name:"Paneles",zone:"recording",zoneLabel:"Grabación",watts:96},{entity:"switch.4gang_switch_sala_grabacion_interruptor_3",name:"Spots",zone:"recording",zoneLabel:"Grabación",watts:50},{entity:"switch.4gang_switch_sala_grabacion_interruptor_4",name:"Otras luces",zone:"recording",zoneLabel:"Grabación",watts:30}],K=[{id:"showroom",label:"Showroom",opacity:1},{id:"offices",label:"Oficinas",opacity:.74},{id:"recording",label:"Grabación",opacity:.5},{id:"lobby",label:"Lobby",opacity:.28}],ye='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',D='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z"></path></svg>',xe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';class we extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._range="day",this._report=null,this._loading=!1,this._error="",this._requestId=0,this._dimming=30,this._theme=this._loadTheme(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",e=>this._handleClick(e)),this.shadowRoot.addEventListener("input",e=>this._handleInput(e))}set hass(e){var i,a,r,s,o;const t=!((a=(i=this._hass)==null?void 0:i.connection)!=null&&a.sendMessagePromise)&&!!((r=e==null?void 0:e.connection)!=null&&r.sendMessagePromise);this._hass=e,this.isConnected&&((s=this.shadowRoot)!=null&&s.querySelector(".energy-panel")?this._updateLiveMetrics():this._render(),(t||!this._report&&!this._loading&&((o=e==null?void 0:e.connection)!=null&&o.sendMessagePromise))&&this._loadHistory())}get hass(){return this._hass}set panel(e){this._panel=e||{},this._report=null,this.isConnected&&(this._render(),this._hass&&this._loadHistory())}get panel(){return this._panel}set theme(e){if(e!=="dark"&&e!=="light")return;const t=this._theme!==e;this._theme=e,this.setAttribute("data-theme",e),this._saveTheme(),t&&this.isConnected&&this._render()}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._render(),this._hass&&!this._report&&this._loadHistory()}disconnectedCallback(){this._requestId+=1}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_escape(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_formatEnergy(e){return new Intl.NumberFormat("es-BO",{minimumFractionDigits:e<10?2:1,maximumFractionDigits:e<10?2:1}).format(e)}_formatPower(e){return e>=1e3?`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:2}).format(e/1e3)} kW`:`${Math.round(e)} W`}_circuits(){const e=this._panel.energy_circuits??this._panel.energyCircuits;if(!Array.isArray(e))return G;const t=new Map(e.filter(i=>i&&typeof i=="object").map(i=>[String(i.entity||""),i]));return G.map(i=>{const a=t.get(i.entity);if(!a)return i;const r=a.watts,s=Number(r),o=r===null?null:Number.isFinite(s)&&s>=0?s:i.watts;return{...i,...a,watts:o}})}_definition(){const e=Date.now();return this._range==="week"?{start:e-7*864e5,end:e,bucketMs:864e5,title:"Últimos 7 días",bucketLabel:"día"}:this._range==="month"?{start:e-30*864e5,end:e,bucketMs:864e5,title:"Últimos 30 días",bucketLabel:"día"}:{start:e-24*36e5,end:e,bucketMs:36e5,title:"Últimas 24 horas",bucketLabel:"hora"}}async _loadHistory(){var a,r;const e=(r=(a=this._hass)==null?void 0:a.connection)==null?void 0:r.sendMessagePromise;if(!e||this._loading)return;const t=++this._requestId,i=this._definition();this._loading=!0,this._error="",this._render();try{const s=await e({type:"history/history_during_period",start_time:new Date(i.start).toISOString(),end_time:new Date(i.end).toISOString(),entity_ids:this._circuits().map(o=>o.entity),minimal_response:!0,no_attributes:!0,significant_changes_only:!0});if(t!==this._requestId)return;this._report=_e(this._circuits(),fe(s),i.start,i.end,i.bucketMs)}catch(s){if(t!==this._requestId)return;this._error=s instanceof Error?s.message:"No se pudo cargar el historial",this._report=null}finally{t===this._requestId&&(this._loading=!1,this._render())}}_currentPower(){return this._circuits().reduce((e,t)=>{var i,a,r;return e+(t.watts!==null&&((r=(a=(i=this._hass)==null?void 0:i.states)==null?void 0:a[t.entity])==null?void 0:r.state)==="on"?t.watts:0)},0)}_activeCount(){return this._circuits().filter(e=>{var t,i,a;return((a=(i=(t=this._hass)==null?void 0:t.states)==null?void 0:i[e.entity])==null?void 0:a.state)==="on"}).length}_installedPower(){return this._circuits().reduce((e,t)=>e+(t.watts||0),0)}_updateLiveMetrics(){var i,a;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-live-active]"),t=(a=this.shadowRoot)==null?void 0:a.querySelector("[data-live-power]");e&&(e.textContent=`${this._activeCount()} de ${this._circuits().length}`),t&&(t.textContent=this._formatPower(this._currentPower()))}_handleClick(e){const t=e.target.closest("[data-action]");if(!t)return;const i=t.dataset.action;if(i==="toggle-menu"&&this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0})),i==="toggle-theme"&&(this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))),i==="range"){const a=t.dataset.range;(a==="day"||a==="week"||a==="month")&&(this._range=a,this._report=null,this._loadHistory())}i==="refresh"&&this._loadHistory()}_handleInput(e){const t=e.target.closest("[data-dimming]");t&&(this._dimming=Math.min(90,Math.max(10,Number(t.value)||10)),this._updateDimmingPresentation())}_updateDimmingPresentation(){var s,o,n,l;if(!this._report)return;const e=this._report.totalKwh*(this._dimming/100),t=Math.max(0,this._report.totalKwh-e),i=(s=this.shadowRoot)==null?void 0:s.querySelector("[data-dim-percent]"),a=(o=this.shadowRoot)==null?void 0:o.querySelector("[data-dim-saved]"),r=(n=this.shadowRoot)==null?void 0:n.querySelector("[data-dim-remaining]");i&&(i.textContent=`${this._dimming} %`),a&&(a.textContent=`${this._formatEnergy(e)} kWh`),r&&(r.textContent=`${this._formatEnergy(t)} kWh`),(l=this.shadowRoot)==null||l.querySelectorAll("[data-dim-point]").forEach(c=>c.classList.toggle("is-selected",Number(c.dataset.dimPoint)===this._dimming))}_bucketLabel(e,t){const i=new Date(e);return this._range==="day"?t%3===0?new Intl.DateTimeFormat("es-BO",{hour:"2-digit",minute:"2-digit",timeZone:"America/La_Paz"}).format(i):"":t%(this._range==="month"?4:1)===0?new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"short",timeZone:"America/La_Paz"}).format(i):""}_renderZoneChart(e){const l=Math.max(.001,...e.buckets.map(m=>m.totalKwh)),c=894/e.buckets.length,p=Math.max(5,Math.min(34,c*.66)),h=Array.from({length:5},(m,f)=>{const _=16+200*f/4,$=l*(1-f/4);return`<line x1="54" y1="${_}" x2="948" y2="${_}" class="chart-grid"></line><text x="46" y="${_+4}" text-anchor="end" class="chart-label">${this._formatEnergy($)}</text>`}).join(""),d=e.buckets.map((m,f)=>{let _=0;const $=54+c*f+(c-p)/2,w=K.map(b=>{const x=m.zones[b.id]||0,M=x/l*200;return _+=M,`<rect x="${$}" y="${216-_}" width="${p}" height="${Math.max(0,M)}" rx="3" class="zone-bar" style="opacity:${b.opacity}"><title>${b.label}: ${this._formatEnergy(x)} kWh</title></rect>`}).join(""),u=this._bucketLabel(m.start,f);return`${w}${u?`<text x="${$+p/2}" y="240" text-anchor="middle" class="chart-label">${this._escape(u)}</text>`:""}`}).join("");return`<div class="chart-scroll" data-no-swipe><svg class="zone-chart" viewBox="0 0 960 250" role="img" aria-label="Consumo estimado por zona y período">${h}${d}</svg></div>`}_renderUsage(e){const t=this._definition().bucketMs/36e5;return`<div class="usage-list">${e.circuits.map(i=>`<div class="usage-row"><div class="usage-name"><strong>${this._escape(i.name)}</strong><span>${this._escape(i.zoneLabel)} · ${i.watts===null?"Potencia pendiente":this._formatPower(i.watts)}</span></div><div class="usage-cells" style="--usage-columns:${i.bucketHours.length}">${i.bucketHours.map((a,r)=>`<i style="--usage:${Math.min(1,a/t)}" title="${this._escape(this._bucketLabel(e.buckets[r].start,r)||`Intervalo ${r+1}`)}: ${a.toFixed(2)} h"></i>`).join("")}</div><div class="usage-value"><strong>${i.hours.toFixed(1)} h</strong><span>${i.kwh===null?"Sin kWh":`${this._formatEnergy(i.kwh)} kWh`}</span></div></div>`).join("")}</div>`}_renderDimming(e){const t=be(e.totalKwh),i=760,a=220,r=48,s=20,o=34,n=Math.max(.001,t[t.length-1].savedKwh),l=t.map((h,d)=>({...h,x:r+d*((i-r-20)/(t.length-1)),y:s+(1-h.savedKwh/n)*(a-s-o)})),c=l.map((h,d)=>`${d?"L":"M"}${h.x.toFixed(1)},${h.y.toFixed(1)}`).join(" "),p=t.find(h=>h.percent===this._dimming)||t[2];return`<div class="dimming-layout"><div class="dimming-controls"><label for="building-dimming">Reducción de potencia <strong data-dim-percent>${this._dimming} %</strong></label><input id="building-dimming" data-dimming type="range" min="10" max="90" step="10" value="${this._dimming}" aria-label="Porcentaje de dimerización"><div class="dimming-metrics"><div><small>Ahorro estimado</small><strong data-dim-saved>${this._formatEnergy(p.savedKwh)} kWh</strong></div><div><small>Consumo restante</small><strong data-dim-remaining>${this._formatEnergy(p.remainingKwh)} kWh</strong></div></div><p>Modelo lineal sobre circuitos con potencia documentada. No representa una medición física ni confirma compatibilidad eléctrica con dimmers.</p></div><div class="chart-scroll" data-no-swipe><svg class="dimming-chart" viewBox="0 0 ${i} ${a}" role="img" aria-label="Ahorro estimado por porcentaje de dimerización"><line x1="${r}" y1="${a-o}" x2="${i-20}" y2="${a-o}" class="chart-grid"></line><path d="${c}" class="saving-line"></path>${l.map(h=>`<g><circle cx="${h.x}" cy="${h.y}" r="5" class="saving-point ${h.percent===this._dimming?"is-selected":""}" data-dim-point="${h.percent}"><title>${h.percent}%: ${this._formatEnergy(h.savedKwh)} kWh</title></circle><text x="${h.x}" y="${a-10}" text-anchor="middle" class="chart-label">${h.percent}%</text></g>`).join("")}</svg></div></div>`}_renderReport(e){var a;const t=this._definition(),i=this._bucketLabel(((a=e.buckets[e.peakIndex])==null?void 0:a.start)||t.start,e.peakIndex)||`Intervalo ${e.peakIndex+1}`;return`<div class="metrics-grid"><article><small>Consumo estimado</small><strong>${this._formatEnergy(e.totalKwh)} kWh</strong><span>${this._escape(t.title)}</span></article><article><small>Promedio por ${t.bucketLabel}</small><strong>${this._formatEnergy(e.totalKwh/e.buckets.length)} kWh</strong><span>${e.buckets.length} intervalos</span></article><article><small>Mayor intervalo</small><strong>${this._formatEnergy(e.peakKwh)} kWh</strong><span>${this._escape(i)}</span></article><article><small>Cobertura nominal</small><strong>${e.knownCircuits} de ${e.totalCircuits}</strong><span>${this._formatPower(this._installedPower())} documentados</span></article></div><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Consumo por zona</span><h2>Historial energético</h2></div><div class="legend">${K.map(r=>`<span style="--legend-opacity:${r.opacity}"><i></i>${r.label}</span>`).join("")}</div></div>${this._renderZoneChart(e)}</section><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Uso por iluminación</span><h2>Horas por circuito</h2></div><span class="section-meta">${e.totalCircuits} circuitos</span></div>${this._renderUsage(e)}</section><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Escenario de eficiencia</span><h2>Ahorro por dimerización</h2></div><span class="section-meta">10 % a 90 %</span></div>${this._renderDimming(e)}</section>`}_render(){if(!this.shadowRoot)return;this.setAttribute("data-theme",this._theme);const e=this._definition(),t=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",timeZone:"America/La_Paz"}).format(new Date),i=this._report;this.shadowRoot.innerHTML=`<style>
      :host{--primary:#f26522;--primary-soft:rgba(242,101,34,.12);--primary-border:rgba(242,101,34,.36);--canvas:#071118;--surface:rgba(16,25,30,.88);--surface-control:rgba(27,40,46,.72);--surface-hover:rgba(255,255,255,.07);--text-primary:#f5f6f4;--text-secondary:#adb4b6;--text-tertiary:#747e82;--border:rgba(255,255,255,.1);--border-subtle:rgba(255,255,255,.07);--shadow:rgba(0,0,0,.24);display:block;min-height:100dvh;color:var(--text-primary);background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums}:host([data-theme=light]){--canvas:#eef2f1;--surface:rgba(255,255,255,.92);--surface-control:rgba(247,250,250,.96);--surface-hover:#fff;--text-primary:#172129;--text-secondary:#526066;--text-tertiary:#7a868b;--border:rgba(23,33,41,.14);--border-subtle:rgba(23,33,41,.09);--shadow:rgba(50,65,68,.12);background:linear-gradient(155deg,#f5f1ed,#eef2f1 52%,#e8edec)}*{box-sizing:border-box}button,input{font:inherit}.energy-panel{min-height:100dvh}.topbar{position:sticky;top:0;z-index:20;min-height:80px;padding:12px clamp(18px,2.6vw,48px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;border-bottom:1px solid var(--border-subtle);background:color-mix(in srgb,var(--canvas) 88%,transparent);backdrop-filter:blur(18px)}.topbar-start,.topbar-end,.status-strip{display:flex;align-items:center;gap:10px}.topbar-end{justify-content:flex-end}.menu-button,.theme-button,.icon-button{width:48px;height:48px;display:grid;place-items:center;border:1px solid var(--border);border-radius:50%;background:var(--surface-control);color:var(--text-primary);cursor:pointer}.menu-button svg,.theme-button svg,.icon-button svg{width:20px;height:20px}.brand{display:flex;align-items:baseline;gap:10px}.brand strong{font-size:18px;letter-spacing:.06em}.brand span{color:var(--primary);font-size:9px;font-weight:800}.status-pill{min-width:112px;height:52px;padding:7px 14px;display:flex;align-items:center;gap:9px;border:1px solid var(--border);border-radius:999px;background:var(--surface-control)}.status-pill svg{width:18px;height:18px;color:var(--primary)}.status-pill strong,.status-pill small{display:block}.status-pill strong{font-size:11px}.status-pill small{margin-top:2px;color:var(--text-tertiary);font-size:8px}.clock{font-size:28px;font-weight:500;letter-spacing:-.05em}.dashboard{width:min(1540px,100%);margin:auto;padding:clamp(18px,2.4vw,34px);padding-bottom:100px}.workspace-heading{display:flex;align-items:end;justify-content:space-between;gap:18px;margin:8px 0 18px}.eyebrow{display:block;color:var(--primary);font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.workspace-heading h1{margin:4px 0 0;font-size:clamp(30px,4vw,44px);letter-spacing:-.045em}.workspace-heading p{max-width:650px;margin:7px 0 0;color:var(--text-secondary);font-size:12px;line-height:1.55}.toolbar{display:flex;align-items:center;gap:8px}.range-tabs{display:flex;padding:4px;border:1px solid var(--border);border-radius:14px;background:var(--surface)}.range-tabs button{min-width:70px;height:36px;border:0;border-radius:10px;background:transparent;color:var(--text-secondary);font-size:10px;font-weight:800;cursor:pointer}.range-tabs button.is-active{background:var(--primary);color:#fff;box-shadow:0 5px 16px rgba(242,101,34,.22)}.surface{border:1px solid var(--border-subtle);border-radius:22px;background:var(--surface);box-shadow:0 16px 40px var(--shadow)}.metrics-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.metrics-grid article{min-width:0;padding:15px 17px;border:1px solid var(--border);border-radius:16px;background:var(--surface-control)}.metrics-grid small,.metrics-grid strong,.metrics-grid span{display:block}.metrics-grid small{color:var(--text-tertiary);font-size:9px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}.metrics-grid strong{margin-top:6px;font-size:20px;letter-spacing:-.03em}.metrics-grid span{margin-top:4px;color:var(--text-tertiary);font-size:9px}.chart-card{margin-top:12px;padding:20px}.section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:14px}.section-head h2{margin:4px 0 0;font-size:18px;letter-spacing:-.025em}.section-meta{color:var(--text-tertiary);font-size:10px}.legend{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.legend span{display:flex;align-items:center;gap:5px;color:var(--text-tertiary);font-size:9px}.legend i{width:8px;height:8px;border-radius:3px;background:var(--primary);opacity:var(--legend-opacity)}.chart-scroll{width:100%;overflow-x:auto;overscroll-behavior-x:contain}.zone-chart,.dimming-chart{display:block;width:100%;min-width:720px;height:auto}.chart-grid{stroke:var(--border-subtle);stroke-width:1}.chart-label{fill:var(--text-tertiary);font:600 9px Manrope,sans-serif}.zone-bar{fill:var(--primary)}.usage-list{max-height:590px;display:grid;gap:6px;overflow:auto;padding-right:4px}.usage-row{display:grid;grid-template-columns:minmax(170px,1.1fr) minmax(320px,3fr) 88px;align-items:center;gap:12px;padding:9px 11px;border:1px solid var(--border-subtle);border-radius:13px;background:var(--surface-control)}.usage-name,.usage-value{min-width:0}.usage-name strong,.usage-name span,.usage-value strong,.usage-value span{display:block}.usage-name strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}.usage-name span,.usage-value span{margin-top:3px;color:var(--text-tertiary);font-size:8px}.usage-value{text-align:right}.usage-value strong{font-size:11px}.usage-cells{height:23px;display:grid;grid-template-columns:repeat(var(--usage-columns),minmax(4px,1fr));align-items:stretch;gap:2px}.usage-cells i{border-radius:3px;background:color-mix(in srgb,var(--primary) calc(12% + var(--usage) * 88%),var(--surface-control));box-shadow:inset 0 0 0 1px var(--border-subtle)}.dimming-layout{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(520px,1.6fr);align-items:center;gap:28px}.dimming-controls label{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:11px;font-weight:700}.dimming-controls label strong{color:var(--primary);font-size:20px}.dimming-controls input{width:100%;margin:18px 0;accent-color:var(--primary)}.dimming-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px}.dimming-metrics div{padding:12px;border:1px solid var(--border);border-radius:14px;background:var(--surface-control)}.dimming-metrics small,.dimming-metrics strong{display:block}.dimming-metrics small{color:var(--text-tertiary);font-size:8px;text-transform:uppercase}.dimming-metrics strong{margin-top:5px;font-size:15px}.dimming-controls p{margin:12px 0 0;color:var(--text-tertiary);font-size:9px;line-height:1.5}.saving-line{fill:none;stroke:var(--primary);stroke-width:3}.saving-point{fill:var(--surface);stroke:var(--primary);stroke-width:2;transition:r 160ms,fill 160ms}.saving-point.is-selected{r:8px;fill:var(--primary)}.state-card{min-height:300px;margin-top:12px;display:grid;place-items:center;padding:36px;text-align:center}.state-card strong{display:block;font-size:16px}.state-card span{display:block;max-width:560px;margin-top:8px;color:var(--text-tertiary);font-size:11px;line-height:1.5}.loader{width:34px;height:34px;margin:0 auto 14px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}button:focus-visible,input:focus-visible{outline:2px solid var(--primary);outline-offset:2px}button:active{transform:translateY(1px)}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}@media(max-width:1100px){.topbar{grid-template-columns:1fr auto}.status-strip{display:none}.metrics-grid{grid-template-columns:repeat(2,1fr)}.dimming-layout{grid-template-columns:1fr}.usage-row{grid-template-columns:minmax(150px,1fr) minmax(280px,2fr) 80px}}@media(max-width:760px){.topbar{min-height:68px;padding:10px 14px}.brand span{display:none}.menu-button,.theme-button{width:44px;height:44px}.clock{font-size:24px}.dashboard{padding:16px 14px 90px}.workspace-heading{display:grid;align-items:stretch;gap:12px;margin:4px 0 18px}.workspace-heading h1{font-size:26px}.workspace-heading p{max-width:none}.toolbar{justify-content:space-between}.range-tabs{flex:1}.range-tabs button{min-width:0;flex:1}}@media(max-width:700px){.metrics-grid{grid-template-columns:1fr}.chart-card{padding:16px}.section-head{display:grid}.legend{gap:8px}.usage-row{grid-template-columns:1fr 70px}.usage-cells{grid-column:1/-1;grid-row:2}.dimming-metrics{grid-template-columns:1fr}.zone-chart,.dimming-chart{min-width:620px}}
    </style><div class="energy-panel"><header class="topbar"><div class="topbar-start"><button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${ye}</button><div class="brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div></div><div class="status-strip"><div class="status-pill">${D}<span><strong data-live-active>${this._activeCount()} de ${this._circuits().length}</strong><small>Circuitos activos</small></span></div><div class="status-pill">${D}<span><strong data-live-power>${this._formatPower(this._currentPower())}</strong><small>Potencia actual</small></span></div><div class="status-pill">${D}<span><strong>${this._formatPower(this._installedPower())}</strong><small>Potencia conocida</small></span></div></div><div class="topbar-end"><time class="clock">${this._escape(t)}</time><button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${xe}</button></div></header><main class="dashboard"><section class="workspace-heading"><div><span class="eyebrow">Analítica del edificio</span><h1>Gestión de energía</h1><p>Consumo estimado, horas de uso y escenarios de ahorro para Showroom, Lobby, Oficinas y Sala de grabación.</p></div><div class="toolbar"><div class="range-tabs" role="tablist" aria-label="Período de análisis">${["day","week","month"].map(a=>`<button data-action="range" data-range="${a}" class="${this._range===a?"is-active":""}" role="tab" aria-selected="${this._range===a}">${a==="day"?"24 h":a==="week"?"7 días":"30 días"}</button>`).join("")}</div><button class="icon-button" data-action="refresh" aria-label="Actualizar historial" title="Actualizar">${D}</button></div></section>${this._loading?`<section class="surface state-card"><div><div class="loader"></div><strong>Cargando historial energético</strong><span>Consultando ${this._circuits().length} circuitos para ${this._escape(e.title.toLowerCase())}.</span></div></section>`:this._error?`<section class="surface state-card"><div><strong>No se pudo cargar el historial</strong><span>${this._escape(this._error)}. Usa Actualizar para volver a intentarlo.</span></div></section>`:i?this._renderReport(i):'<section class="surface state-card"><div><strong>Sin datos disponibles</strong><span>Home Assistant todavía no devolvió historial para este período.</span></div></section>'}</main></div>`}}customElements.get("witmind-energy-panel")||customElements.define("witmind-energy-panel",we);const U=8,ve=56,ke=24,$e=.45,Z=1.15;function X(g){return g.pointerType==="mouse"&&Number.isFinite(g.release)?g.release:g.lastMove}function Se(g,e){const t=Math.abs(g),i=Math.abs(e);return t<U&&i<U?"pending":t>i*Z?"horizontal":i>t*Z?"vertical":"pending"}function Ee(g){if(g.cancelled||g.axis!=="horizontal"||!Number.isFinite(g.dx))return 0;const e=Math.abs(g.dx),t=Math.max(1,g.elapsedMs),i=e>=ve,a=e>=ke&&e/t>=$e;return!i&&!a?0:g.dx<0?1:-1}const Me={panel_kind:"lobby",title:"Lobby",subtitle:"Control operativo",site_label:"WTX · MDTC",weather:"weather.forecast_casa",light_count_sensor:"sensor.lobby_luminarias_encendidas",energy_sensor:"sensor.showroom_energia_estimada",history_hours:4,chart_hours:24,show_forecast:!0,spots:[{entity:"switch.interruptor_inteligente_3_switch_1",name:"Central Colgante",subtitle:"Iluminación central",icon:"pendant"},{entity:"switch.interruptor_inteligente_3_switch_2",name:"Spots 5W Decorativos",subtitle:"Iluminación decorativa",icon:"spot"},{entity:"switch.interruptor_inteligente_3_switch_3",name:"Tira LED",subtitle:"Iluminación ambiental",icon:"strip"},{entity:"switch.interruptor_inteligente_3_switch_4",name:"Spots 10W",subtitle:"Iluminación principal",icon:"spot"}],samples:[],reflector:{entity:""},scene_control_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"],scenes:[{id:"visita",name:"Visita",subtitle:"Todos los circuitos",icon:"presentation",on_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"regular",name:"Regular",subtitle:"Solo Spots 10W",icon:"bulb",on_entities:["switch.interruptor_inteligente_3_switch_4"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3"]}],sample_scenes:[]},Ae={panel_kind:"general",static_only:!1,title:"Witmind General",subtitle:"Centro de control",site_label:"WTX · MDTC",weather:"weather.forecast_casa",show_forecast:!0,spots:[{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",subtitle:"Gerencia · 4×12 W nominal",icon:"bulb"},{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",subtitle:"Mindtec · 1×48 W nominal",icon:"bulb"},{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",subtitle:"Oficinas grandes · 4×42 W nominal",icon:"office"},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",subtitle:"Oficinas grandes · 4×42 W nominal",icon:"office"},{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",subtitle:"Pasillos y multifuncional · 4×24 W nominal",icon:"office"},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",subtitle:"Pasillos · 3×24 W + 3×15 W nominal",icon:"corridor"},{entity:"switch.taller_interruptor_1",name:"Taller",subtitle:"Taller · 3×48 W nominal",icon:"workshop"}],samples:[],reflector:{entity:""},scenes:[],sample_scenes:[],scene_control_entities:[]},F={panel_kind:"offices",title:"Oficinas",subtitle:"Control operativo",description:"Circuitos de oficinas con potencia nominal instalada.",weather:"weather.forecast_casa",power_watts:{"switch.oficina_gerencial_interruptor_1":48,"switch.oficina_mindtec_interruptor_1":48,"switch.oficina_grande_interruptor_1":168,"switch.oficina_grande_interruptor_2":168,"switch.b2_gang_interruptor_1":96,"switch.b2_gang_interruptor_2":117,"switch.taller_interruptor_1":144},areas:[{id:"gerencia",name:"Gerencia",environment:{temperature:"sensor.t_h_sensor_temperature",humidity:"sensor.t_h_sensor_humidity"},devices:[{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",subtitle:"4×12 W nominal",watts:48}]},{id:"mindtec",name:"Mindtec",devices:[{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",subtitle:"1×48 W nominal",watts:48}]},{id:"general",name:"Oficinas grandes",environment:{temperature:"sensor.t_h_sensor_2_temperature",humidity:"sensor.t_h_sensor_2_humidity"},devices:[{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",subtitle:"4×42 W nominal",watts:168},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",subtitle:"4×42 W nominal",watts:168}]},{id:"pasillos",name:"Pasillos y multifuncional",devices:[{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",subtitle:"4×24 W nominal",watts:96,icon:"office"},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",subtitle:"3×24 W + 3×15 W nominal",watts:117,icon:"corridor"}]},{id:"taller",name:"Taller",devices:[{entity:"switch.taller_interruptor_1",name:"Taller",subtitle:"3×48 W nominal",watts:144,icon:"workshop"}]}]},W={panel_kind:"recording",title:"Sala de grabación",subtitle:"Control operativo",description:"Cuatro circuitos con potencia nominal configurada.",weather:"weather.forecast_casa",power_watts:{"switch.4gang_switch_sala_grabacion_interruptor_1":24,"switch.4gang_switch_sala_grabacion_interruptor_2":96,"switch.4gang_switch_sala_grabacion_interruptor_3":50,"switch.4gang_switch_sala_grabacion_interruptor_4":30},switches:[{entity:"switch.4gang_switch_sala_grabacion_interruptor_1",name:"Tira LED",subtitle:"1×24 W nominal",watts:24,icon:"strip"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_2",name:"Paneles",subtitle:"2×48 W nominal",watts:96,icon:"panel"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_3",name:"Spots",subtitle:"5×10 W nominal",watts:50,icon:"spot"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_4",name:"Otras luces",subtitle:"3×10 W nominal",watts:30,icon:"bulb"}]},Ce={panel_kind:"control",title:"Control general",subtitle:"Centro de control",description:"Escenas y rutinas conectadas a Home Assistant.",weather:"weather.forecast_casa",device_watts:{...F.power_watts,...W.power_watts,"switch.interruptor_inteligente_switch_1":48,"switch.interruptor_inteligente_switch_2":48,"switch.interruptor_inteligente_switch_3":48,"switch.interruptor_inteligente_switch_4":48,"switch.interruptor_inteligente_2_switch_1":48,"switch.interruptor_inteligente_2_switch_2":48,"switch.interruptor_inteligente_2_switch_3":48,"switch.interruptor_inteligente_2_switch_4":48,"switch.smart_relay_switch_3_switch":48,"switch.smart_relay_switch_4_switch":48,"switch.interruptor_inteligente_3_switch_1":0,"switch.interruptor_inteligente_3_switch_2":0,"switch.interruptor_inteligente_3_switch_3":0,"switch.interruptor_inteligente_3_switch_4":0},zones:[{id:"showroom",name:"Showroom",entities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_4_switch","switch.smart_relay_switch_3_switch"]},{id:"lobby",name:"Lobby",entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"oficinas",name:"Oficinas",entities:Object.keys(F.power_watts)},{id:"grabacion",name:"Sala de grabación",entities:Object.keys(W.power_watts)}],main_actions:[{id:"showroom-reunion",name:"Reunión showroom",subtitle:"Escena de reunión",service_entities:["scene.reunion"],tone:"accent"},{id:"showroom-presentacion",name:"Presentación showroom",subtitle:"Escena de presentación",service_entities:["scene.presentacion"],tone:"accent"},{id:"showroom-apagado",name:"Apagar showroom",subtitle:"Apaga los circuitos del showroom",service_entities:["script.showroom_apagado_general"],tone:"danger"},{id:"lobby-regular",name:"Lobby regular",subtitle:"Solo iluminación principal",on_entities:["switch.interruptor_inteligente_3_switch_4"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3"]},{id:"lobby-visita",name:"Lobby visita",subtitle:"Todos los circuitos",on_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"lobby-apagado",name:"Apagar lobby",subtitle:"Apaga los cuatro circuitos",off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]}],daily_actions:[{id:"inicio-dia",name:"Inicio del día",subtitle:"Rutina de apertura",on_entities:["switch.interruptor_inteligente_3_switch_4","switch.oficina_gerencial_interruptor_1","switch.b2_gang_interruptor_1"],off_entities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.b2_gang_interruptor_2"]},{id:"fin-dia",name:"Fin del día",subtitle:"Rutina de cierre",service_entities:["script.showroom_apagado_general"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]}],danger_action:{id:"apagado-total",name:"Apagado total Witmind",subtitle:"Apaga showroom, lobby, oficinas y grabación",service_entities:["script.apagado_total_witmind"],tone:"danger"}},ze={panel_kind:"calendar",title:"Calendario laboral",subtitle:"Planificación operativa",description:"Días laborales gestionados desde Home Assistant."},Te={panel_kind:"notifications",title:"Notificaciones Witmind",subtitle:"Centro de avisos",description:"Reglas, destinos e historial de notificaciones."},Ne={panel_kind:"energy",title:"Gestión de energía",subtitle:"Analítica del edificio",description:"Consumo, historial de uso y simulación de dimerización."},q=[{id:"general",label:"General",icon:"⌂"},{id:"showroom",label:"Showroom",icon:"✦"},{id:"lobby",label:"Lobby",icon:"⌂"},{id:"offices",label:"Oficinas",icon:"▦"},{id:"recording",label:"Grabación",icon:"◈"},{id:"energy",label:"Energía",icon:"ϟ"},{id:"calendar",label:"Calendario",icon:"▣"},{id:"notifications",label:"Notificaciones",icon:"◉"},{id:"control",label:"Control",icon:"⚡"}],O=g=>{const e=String(g||"").trim().toLowerCase(),i={"oficinas-control":"offices",oficinas:"offices","sala-grabacion":"recording",grabacion:"recording",energia:"energy","gestion-energia":"energy","calendario-laboral":"calendar",calendario:"calendar",notificaciones:"notifications","control-general":"control"}[e]||e;return q.some(a=>a.id===i)?i:"showroom"},P=g=>JSON.parse(JSON.stringify(g));class Le extends HTMLElement{constructor(){super(...arguments),this._config={},this._hass=null,this._narrow=!1,this._activeId="showroom",this._pages=[],this._track=null,this._drag=null,this._dragging=!1,this._theme=this._loadTheme(),this._boundResize=()=>this._snap(!1),this._boundTheme=e=>{var i;const t=(i=e.detail)==null?void 0:i.theme;(t==="dark"||t==="light")&&this._setTheme(t)}}set config(e){this._config=e&&typeof e=="object"?e:{},this._activeId=O(this._config.panel_id||this._config.panelId||this._config.panel_kind),this.isConnected&&this._mountPages()}get config(){return this._config}set hass(e){this._hass=e,this._pages.forEach(t=>{const i=t.firstElementChild;i&&(i.hass=e||void 0)})}get hass(){return this._hass}set narrow(e){this._narrow=!!e,this.toggleAttribute("narrow",this._narrow),this._pages.forEach(t=>{const i=t.firstElementChild;i&&(i.narrow=this._narrow)})}get narrow(){return this._narrow}connectedCallback(){this.attachShadow({mode:"open"}),this._renderShell(),this._mountPages(),window.addEventListener("resize",this._boundResize,{passive:!0}),this.addEventListener("witmind-theme-change",this._boundTheme)}disconnectedCallback(){window.removeEventListener("resize",this._boundResize),this.removeEventListener("witmind-theme-change",this._boundTheme)}_renderShell(){var t;this.shadowRoot.innerHTML=`
      <style>
        :host { display:block; height:100dvh; min-height:100dvh; overflow:hidden; background:var(--wit-canvas,#071118); }
        .workspace { position:relative; width:100%; height:100%; min-height:0; overflow:hidden; }
        .track { display:flex; width:100%; height:100%; min-height:0; touch-action:pan-y pinch-zoom; transition:transform 280ms cubic-bezier(.2,.8,.2,1); will-change:transform; }
        .track.is-dragging { transition:none; cursor:grabbing; }
        .page { flex:0 0 100%; width:100%; min-width:100%; height:100%; min-height:0; overflow-x:hidden; overflow-y:auto; overscroll-behavior:contain; background:var(--wit-canvas,#071118); contain:layout paint; }
        .workspace-nav { position:fixed; z-index:80; left:50%; bottom:max(16px, env(safe-area-inset-bottom)); transform:translateX(-50%); display:flex; align-items:center; gap:6px; padding:5px; border:1px solid var(--wit-border-medium,rgba(255,255,255,.12)); border-radius:var(--wit-radius-pill,999px); background:var(--wit-surface-glass,rgba(7,17,24,.78)); box-shadow:var(--wit-shadow-dock,0 12px 32px rgba(0,0,0,.28)); backdrop-filter:blur(18px); }
        .workspace-nav button { width:var(--wit-touch-min,44px); height:var(--wit-touch-min,44px); display:grid; place-items:center; border:0; border-radius:var(--wit-radius-pill,999px); color:var(--wit-text-primary,#f5f6f4); background:transparent; cursor:pointer; font:inherit; }
        .workspace-nav button:hover:not(:disabled), .workspace-nav button:focus-visible { background:var(--wit-surface-interactive-hover,rgba(255,255,255,.1)); outline:2px solid var(--wit-accent,#f26522); outline-offset:1px; }
        .workspace-nav button:disabled { opacity:.35; cursor:not-allowed; }
        .workspace-nav .dot { width:9px; height:9px; padding:0; border:1px solid rgba(255,255,255,.5); background:transparent; }
        .workspace-nav .dot[aria-current="page"] { width:24px; border-color:var(--wit-accent,#f26522); background:var(--wit-accent,#f26522); }
        @media (prefers-reduced-motion:reduce) { .track { transition:none; } }
      </style>
      <div class="workspace" data-workspace>
        <div class="track" data-track></div>
        <nav class="workspace-nav" aria-label="Paneles Witmind" data-nav></nav>
      </div>
    `;const e=this.shadowRoot.querySelector("[data-track]");this._track=e,e.addEventListener("pointerdown",i=>this._onPointerDown(i)),e.addEventListener("pointermove",i=>this._onPointerMove(i)),e.addEventListener("pointerup",i=>this._onPointerUp(i)),e.addEventListener("pointercancel",i=>this._onPointerUp(i)),(t=this.shadowRoot.querySelector("[data-nav]"))==null||t.addEventListener("click",i=>this._onNavClick(i))}_panelConfigs(){const e=this._config.workspace_panels||this._config.workspacePanels,t=Array.isArray(e)?e:[],i=new Map(t.map(r=>{const s=r&&typeof r=="object"?r:{};return[O(s.id||s.panel_id||s.panelId||s.panel_kind),s]})),a=O(this._config.panel_id||this._config.panelId||this._config.panel_kind);return q.map(r=>{const s=r.id==="general"?Ae:r.id==="lobby"?Me:r.id==="offices"?F:r.id==="recording"?W:r.id==="energy"?Ne:r.id==="calendar"?ze:r.id==="notifications"?Te:r.id==="control"?Ce:{},o=i.get(r.id)||{},n=r.id===a?this._config:{},l={...P(s),...P(o),...P(n)};return r.id==="lobby"&&Array.isArray(n.devices)&&!Array.isArray(n.spots)&&(l.spots=n.devices),r.id==="general"?(l.panel_kind="general",l.static_only=!1):r.id==="lobby"?l.panel_kind="lobby":["offices","recording","control","energy","calendar","notifications"].includes(r.id)?l.panel_kind=r.id:(delete l.panel_kind,delete l.static_only),{...r,config:l}})}_mountPages(){this._track&&(this._track.innerHTML="",this._pages=[],this._panelConfigs().forEach((e,t)=>{const i=document.createElement("section");i.className="page",i.dataset.panelId=e.id,i.setAttribute("aria-label",e.label),i.setAttribute("aria-hidden",String(e.id!==this._activeId)),i.inert=e.id!==this._activeId,e.id===this._activeId&&this._attachPanel(i,e),this._track.append(i),this._pages.push(i),t===0&&(i.dataset.first="true")}),this._renderNav(),this._snap(!1))}_attachPanel(e,t){if(e.firstElementChild)return;const i=t.id==="energy"?"witmind-energy-panel":["offices","recording","control"].includes(t.id)?"witmind-operations-panel":["calendar","notifications"].includes(t.id)?"witmind-admin-panel":"showroom-panel",a=document.createElement(i);a.panel=i==="showroom-panel"?{config:t.config}:t.config,a.theme=this._theme,a.narrow=this._narrow,this._hass&&(a.hass=this._hass),e.append(a)}_activeIndex(){const e=this._pages.findIndex(t=>t.dataset.panelId===this._activeId);return e>=0?e:0}_renderNav(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-nav]");if(!e)return;const t=this._activeIndex();e.innerHTML=`
      <button type="button" data-direction="prev" aria-label="Panel anterior" ${t===0?"disabled":""}>‹</button>
      ${q.map(a=>`<button type="button" class="dot" data-panel="${a.id}" aria-label="Abrir ${a.label}" aria-current="${a.id===this._activeId?"page":"false"}"></button>`).join("")}
      <button type="button" data-direction="next" aria-label="Panel siguiente" ${t===this._pages.length-1?"disabled":""}>›</button>
    `}_onNavClick(e){const t=e.target.closest("button");t&&(t.dataset.panel?this._goTo(t.dataset.panel):this._goTo(this._activeIndex()+(t.dataset.direction==="next"?1:-1)))}_onPointerDown(e){if(!e.isPrimary||e.pointerType==="mouse"&&e.button!==0)return;const t=e.target,i=e.composedPath().some(a=>a instanceof HTMLElement&&!!a.closest("button,a,input,textarea,select,[data-no-swipe]"))||!!t.closest("button,a,input,textarea,select,[data-no-swipe]");this._drag={pointerId:e.pointerId,pointerType:e.pointerType,startX:e.clientX,startY:e.clientY,lastX:e.clientX,lastY:e.clientY,time:performance.now(),ignored:i,axis:"pending"},this._dragging=!1}_onPointerMove(e){var s,o,n;if(!this._drag||this._drag.ignored||this._drag.pointerId!==e.pointerId||!this._track)return;const t=((s=e.getCoalescedEvents)==null?void 0:s.call(e))||[],i=t[t.length-1]||e;this._drag.lastX=i.clientX,this._drag.lastY=i.clientY;const a=this._drag.lastX-this._drag.startX,r=this._drag.lastY-this._drag.startY;this._drag.axis==="pending"&&(this._drag.axis=Se(a,r)),this._drag.axis==="horizontal"&&(this._dragging||(this._dragging=!0,(n=(o=e.currentTarget).setPointerCapture)==null||n.call(o,e.pointerId)),this._track.classList.add("is-dragging"),this._track.style.transform=`translate3d(calc(${this._activeIndex()*-100}% + ${a}px), 0, 0)`,e.preventDefault())}_onPointerUp(e){var n,l,c;if(!this._drag||this._drag.pointerId!==e.pointerId)return;const t=this._drag,i=e.type==="pointercancel";i||(t.lastX=X({pointerType:t.pointerType,lastMove:t.lastX,release:e.clientX}),t.lastY=X({pointerType:t.pointerType,lastMove:t.lastY,release:e.clientY}));const a=t.lastX-t.startX,r=Math.max(1,performance.now()-this._drag.time),s=Ee({axis:t.axis,cancelled:i,dx:a,elapsedMs:r}),o=e.currentTarget;(n=o.hasPointerCapture)!=null&&n.call(o,e.pointerId)&&((l=o.releasePointerCapture)==null||l.call(o,e.pointerId)),(c=this._track)==null||c.classList.remove("is-dragging"),this._drag=null,this._dragging=!1,s?this._goTo(this._activeIndex()+s):this._snap(!0)}_goTo(e){const t=typeof e=="string"?this._pages.findIndex(a=>a.dataset.panelId===e):e;if(t<0||t>=this._pages.length){this._snap(!0);return}this._activeId=this._pages[t].dataset.panelId||this._activeId;const i=this._panelConfigs().find(a=>a.id===this._activeId);i&&this._attachPanel(this._pages[t],i),this._pages.forEach(a=>{const r=a.dataset.panelId===this._activeId;a.setAttribute("aria-hidden",String(!r)),a.inert=!r}),this._renderNav(),this._snap(!0),this.dispatchEvent(new CustomEvent("witmind-panel-change",{detail:{panelId:this._activeId},bubbles:!0,composed:!0}))}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_setTheme(e){if(this._theme!==e){this._theme=e;try{localStorage.setItem("witmind-showroom-panel-theme",e)}catch{}this._pages.forEach(t=>{const i=t.firstElementChild;i&&(i.setAttribute("data-theme",e),i.theme=e)})}}_snap(e=!0){this._track&&(this._track.classList.toggle("is-dragging",!e),this._track.style.transform=`translate3d(${this._activeIndex()*-100}%, 0, 0)`)}}customElements.get("witmind-workspace")||customElements.define("witmind-workspace",Le);const Q=()=>{var g,e;return((e=(g=globalThis.crypto)==null?void 0:g.randomUUID)==null?void 0:e.call(g))||`${Date.now()}-${Math.random().toString(16).slice(2)}`};class De{constructor(e=window.parent){this.target=e,this.states=new Map,this.listeners=new Set,this.pending=new Map,this.subscriptions=new Map,window.addEventListener("message",t=>this.onMessage(t)),this.post({type:"WITMIND_READY"})}subscribeEntities(e,t){return this.listeners.add(t),this.post({type:"WITMIND_SUBSCRIBE_ENTITIES",entityIds:[...new Set(e)]}),t(Object.fromEntries(this.states)),()=>this.listeners.delete(t)}getEntity(e){return this.states.get(e)}callService(e,t={},i){return this.request("WITMIND_CALL_SERVICE","WITMIND_SERVICE_RESULT",{service:e,serviceData:t,target:i})}toggleMenu(){this.post({type:"WITMIND_TOGGLE_MENU"})}dbRequest(e,t={}){return this.request("WITMIND_DB_REQUEST","WITMIND_DB_RESULT",{command:e,payload:t})}haRequest(e,t={}){return this.request("WITMIND_HA_COMMAND","WITMIND_HA_RESULT",{command:e,payload:t})}haSubscribe(e,t,i){const a=Q(),r=()=>{this.subscriptions.delete(a),this.post({type:"WITMIND_HA_UNSUBSCRIBE",requestId:a})};return new Promise((s,o)=>{const n=window.setTimeout(()=>{this.pending.delete(a),o(new Error("Timeout esperando suscripción HA"))},1e4);this.pending.set(a,{resolve:()=>{window.clearTimeout(n),s(r)},reject:o,timer:n}),this.subscriptions.set(a,i),this.post({type:"WITMIND_HA_SUBSCRIBE",requestId:a,command:e,payload:t})})}post(e){this.target.postMessage({protocol:1,source:"witmind-ui",...e},"*")}request(e,t,i){const a=Q();return new Promise((r,s)=>{const o=window.setTimeout(()=>{this.pending.delete(a),s(new Error(`Timeout esperando ${t}`))},1e4);this.pending.set(a,{resolve:r,reject:s,timer:o}),this.post({type:e,requestId:a,...i})})}onMessage(e){var a,r,s;if(e.source!==this.target||((a=e.data)==null?void 0:a.protocol)!==1||((r=e.data)==null?void 0:r.source)!=="witmind-ha")return;const t=e.data;if(t.type==="WITMIND_HA_EVENT"){(s=this.subscriptions.get(t.requestId))==null||s(t.result);return}if(t.type==="WITMIND_ENTITY_UPDATE"){Object.entries(t.states||{}).forEach(([n,l])=>this.states.set(n,l)),(t.removed||[]).forEach(n=>this.states.delete(n));const o=Object.fromEntries(this.states);this.listeners.forEach(n=>n(o));return}const i=this.pending.get(t.requestId);i&&(this.pending.delete(t.requestId),window.clearTimeout(i.timer),t.ok?i.resolve(t.result):i.reject(new Error(String(t.error||"Witmind request failed"))))}}const J=["weather.forecast_casa","media_player.showroom_1","sensor.showroom_luminarias_encendidas","sensor.showroom_energia_estimada","sensor.21051182g_battery_level","switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_3_switch","switch.smart_relay_switch_4_switch","switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4","scene.presentacion","scene.reunion","scene.visita","scene.regular","script.showroom_encendido_general","script.showroom_apagado_general","script.apagado_total_witmind","switch.oficina_gerencial_interruptor_1","switch.oficina_mindtec_interruptor_1","switch.oficina_grande_interruptor_1","switch.oficina_grande_interruptor_2","switch.b2_gang_interruptor_1","switch.b2_gang_interruptor_2","switch.taller_interruptor_1","sensor.t_h_sensor_temperature","sensor.t_h_sensor_humidity","sensor.t_h_sensor_2_temperature","sensor.t_h_sensor_2_humidity","switch.4gang_switch_sala_grabacion_interruptor_1","switch.4gang_switch_sala_grabacion_interruptor_2","switch.4gang_switch_sala_grabacion_interruptor_3","switch.4gang_switch_sala_grabacion_interruptor_4"],j=(g,e=new Set)=>(typeof g=="string"&&/^[a-z_]+\.[a-z0-9_]+$/i.test(g)?e.add(g):Array.isArray(g)?g.forEach(t=>j(t,e)):g&&typeof g=="object"&&Object.values(g).forEach(t=>j(t,e)),[...e]);class Ie extends HTMLElement{constructor(){super(...arguments),this.states={},this.previousStates={},this.eventListeners=new Set,this.panelConfig={},this.user={is_admin:!1,name:""},this.panelConfigSignature="",this.appliedTheme="",this.pendingNarrow=!1,this.messageHandler=e=>{var i,a,r,s;if(e.source!==window.parent||((i=e.data)==null?void 0:i.protocol)!==1||((a=e.data)==null?void 0:a.source)!=="witmind-ha")return;if(e.data.type==="WITMIND_INIT"&&e.data.panelConfig){const o=e.data.panelConfig,n=JSON.stringify(o),l=n!==this.panelConfigSignature,c=e.data.theme;if(!this.panel&&(c==="light"||c==="dark")){this.appliedTheme=c;try{localStorage.setItem("witmind-showroom-panel-theme",c)}catch{}}this.panelConfig=o,this.panelConfigSignature=n,this.user={is_admin:!!((r=e.data.user)!=null&&r.is_admin),name:String(((s=e.data.user)==null?void 0:s.name)||"")},this.pendingNarrow=!!e.data.narrow;const p=this.ensurePanel();!p&&l&&this.applyPanelConfig(),this.panel&&(this.panel.narrow=this.pendingNarrow),(p||l)&&this.resubscribeWithConfig()}const t=e.data.theme;(t==="light"||t==="dark")&&this.panel&&t!==this.appliedTheme&&(this.appliedTheme=t,this.panel.setAttribute("data-theme",t),this.panel.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:t},bubbles:!0,composed:!0})))}}connectedCallback(){this.attachShadow({mode:"open"}),window.addEventListener("message",this.messageHandler),this.shadowRoot.innerHTML='<style>:host{display:block;min-height:100dvh;background:var(--wit-surface,#071118)}.boot{min-height:100dvh;background:var(--wit-surface,#071118)}witmind-workspace{display:block;min-height:100dvh}</style><div class="boot" aria-label="Cargando panel Witmind"></div>',this.client=new De(window.parent),window.parent===window&&(this.panelConfigSignature=JSON.stringify(this.panelConfig),this.ensurePanel(),this.subscribe(J))}ensurePanel(){var t;if(this.panel)return!1;const e=document.createElement("witmind-workspace");return e.config=this.panelConfig,e.narrow=this.pendingNarrow,e.hass=this.createHassAdapter(),e.addEventListener("hass-toggle-menu",()=>{var i;return(i=this.client)==null?void 0:i.toggleMenu()}),this.panel=e,(t=this.shadowRoot.querySelector(".boot"))==null||t.replaceWith(e),!0}subscribe(e){var t;(t=this.unsubscribe)==null||t.call(this),this.unsubscribe=this.client.subscribeEntities(e,i=>{this.previousStates=this.states,this.states=i,this.panel.hass=this.createHassAdapter(),this.emitStateChanges()})}resubscribeWithConfig(){const e=[...new Set([...J,...j(this.panelConfig)])];this.subscribe(e)}applyPanelConfig(){this.panel&&(this.panel.config=this.panelConfig)}disconnectedCallback(){var e;(e=this.unsubscribe)==null||e.call(this),window.removeEventListener("message",this.messageHandler)}createHassAdapter(){const e=this.client;return{states:this.states,language:"es",user:this.user,selectedTheme:null,callService:(i,a,r={},s)=>e.callService(`${i}.${a}`,r,s),callWS:async i=>i.type==="get_states"?Object.values(this.states):e.haRequest(String(i.type||""),i),callApi:async(i,a)=>[],connection:{subscribeEvents:async(i,a)=>{const r=s=>{(!a||a==="state_changed")&&i(s)};return this.eventListeners.add(r),()=>this.eventListeners.delete(r)},sendMessagePromise:i=>e.haRequest(String(i.type||""),i),subscribeMessage:(i,a)=>e.haSubscribe(String(a.type||""),a,i)}}}emitStateChanges(){Object.entries(this.states).forEach(([e,t])=>{this.previousStates[e]!==t&&this.eventListeners.forEach(i=>i({event_type:"state_changed",data:{entity_id:e,new_state:t,old_state:this.previousStates[e]||null}}))})}}customElements.define("witmind-ui-app",Ie);
