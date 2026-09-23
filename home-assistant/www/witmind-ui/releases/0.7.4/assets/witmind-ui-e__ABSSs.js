(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(a){if(a.ep)return;a.ep=!0;const r=t(a);fetch(a.href,r)}})();const M=Object.freeze({title:"Showroom",subtitle:"Control operativo",siteLabel:"WTX · MDTC",logo:"/local/logo-witmind.png?v=2.0.0",weather:"weather.forecast_casa",mediaPlayer:"media_player.showroom_1",lightCountSensor:"sensor.showroom_luminarias_encendidas",energySensor:"sensor.showroom_energia_estimada",batteryLevel:"sensor.21051182g_battery_level",historyHours:12,chartHours:24,showForecast:!0,spots:[{entity:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",subtitle:"Zona ventana",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_2",name:"Spots 2x3",subtitle:"Muestra 2 × 3",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_3",name:"Spots 3x3",subtitle:"Muestra 3 × 3",icon:"spot"},{entity:"switch.interruptor_inteligente_switch_4",name:"Spots TV",subtitle:"Zona audiovisual",icon:"spot"}],samples:[{entity:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",subtitle:"Temperaturas de color",icon:"panel"},{entity:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",subtitle:"Muestra suspendida",icon:"pendant"},{entity:"switch.interruptor_inteligente_2_switch_3",name:"Slims",subtitle:"Línea decorativa",icon:"strip"},{entity:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",subtitle:"Iluminación empotrada",icon:"downlight"},{entity:"switch.smart_relay_switch_4_switch",name:"Paneles",subtitle:"Control por relé",icon:"screen"}],reflector:{entity:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",subtitle:"Control aislado",icon:"reflector"},scenes:[{entity:"scene.presentacion",name:"Presentación",subtitle:"Ventana + TV",icon:"presentation",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_4"]},{entity:"scene.reunion",name:"Reunión",subtitle:"2x3 + Ventana",icon:"people",directOnly:!0,onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2"]}],sampleScenes:[{id:"spots",name:"Spots",subtitle:"Todos los spots",icon:"spot",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4"]},{id:"paneles",name:"Paneles",subtitle:"Solo paneles",icon:"screen",onEntities:["switch.smart_relay_switch_4_switch"]},{id:"slims",name:"Slims",subtitle:"Solo slims",icon:"strip",onEntities:["switch.interruptor_inteligente_2_switch_3"]},{id:"downlights",name:"Downlights",subtitle:"Solo downlights",icon:"downlight",onEntities:["switch.interruptor_inteligente_2_switch_4"]},{id:"paneles-3k-6k",name:"Paneles 3k/6k",subtitle:"Temperaturas de color",icon:"panel",onEntities:["switch.interruptor_inteligente_2_switch_1"]},{id:"colgantes",name:"Colgantes",subtitle:"Todas las colgantes",icon:"pendant",onEntities:["switch.interruptor_inteligente_2_switch_2"]}],powerOnScript:"script.showroom_encendido_general",powerOffScript:"script.showroom_apagado_general"}),Ie={"clear-night":"Noche despejada",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvia",snowy:"Nieve","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},ge={"clear-night":"☾",cloudy:"☁",exceptional:"!",fog:"≋",hail:"◆",lightning:"ϟ","lightning-rainy":"ϟ",partlycloudy:"◒",pouring:"☂",rainy:"☂",snowy:"❄","snowy-rainy":"❄",sunny:"☀",windy:"≈","windy-variant":"≈"},Re={spot:'<circle cx="12" cy="9" r="5"/><path d="M6 18h12M9 22h6M12 14v4"/>',panel:'<rect width="18" height="18" x="3" y="3" rx="3"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="3" x2="21" y1="15" y2="15"/><line x1="9" x2="9" y1="3" y2="21"/><line x1="15" x2="15" y1="3" y2="21"/>',pendant:'<line x1="12" x2="12" y1="2" y2="8"/><path d="M7 16a5 5 0 0 0 10 0V8H7v8Z"/><line x1="8" x2="16" y1="20" y2="20"/><line x1="10" x2="14" y1="23" y2="23"/>',strip:'<rect width="20" height="8" x="2" y="8" rx="2.5"/><circle cx="6" cy="12" r="1.2"/><circle cx="10" cy="12" r="1.2"/><circle cx="14" cy="12" r="1.2"/><circle cx="18" cy="12" r="1.2"/>',downlight:'<path d="M4 6h16l-3 8H7L4 6Z"/><path d="M9 18h6M10 21h4"/><path d="M12 2v4"/>',screen:'<rect width="20" height="14" x="2" y="3" rx="2.5"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',reflector:'<path d="M4 6h10l4 4v6l-4 4H4V6Z"/><line x1="18" x2="22" y1="10" y2="10"/><line x1="18" x2="22" y1="14" y2="14"/>',presentation:'<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',people:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',power:'<path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" x2="12" y1="2" y2="12"/>',bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',play:'<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>',pause:'<rect width="4" height="16" x="6" y="4" rx="1.5" fill="currentColor" stroke="none"/><rect width="4" height="16" x="14" y="4" rx="1.5" fill="currentColor" stroke="none"/>',previous:'<polygon points="19 20 9 12 19 4 19 20"/><line x1="5" x2="5" y1="19" y2="5"/>',next:'<polygon points="5 4 15 12 5 20 5 4"/><line x1="19" x2="19" y1="5" y2="19"/>',volumeDown:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>',volumeUp:'<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',refresh:'<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>',battery:'<rect width="16" height="10" x="2" y="7" rx="2.5"/><line x1="22" x2="22" y1="11" y2="13"/>',health:'<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',thermometer:'<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>',chart:'<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',status:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',energy:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'},Et=`
  <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <line x1="3" x2="21" y1="6" y2="6"></line>
    <line x1="3" x2="21" y1="12" y2="12"></line>
    <line x1="3" x2="21" y1="18" y2="18"></line>
  </svg>
`,Mt=`
  <svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <g class="theme-icon-sun">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
    </g>
    <path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
  </svg>
`;class At extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this._hass=null,this._panel=null,this._narrow=!1,this._started=!1,this._renderQueued=!1,this._forecast=[],this._history=[],this._historyError="",this._liveStates=new Map,this._pendingSwitches=new Map,this._switchErrors=new Map,this._switchTimers=new Map,this._pendingAction="",this._confirmAction="",this._toast=null,this._toastTimer=null,this._clockTimer=null,this._historyTimer=null,this._unsubscribeStates=null,this._unsubscribeForecast=null,this._forecastEntity="",this._energyRange="day",this._energyDayOffset=0,this._energyData=[],this._energyLoading=!1,this._energyError=null,this._energyMonthTotal=null,this._energyRequestId=0,this._energyRefreshTimer=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._themeStorageKey="witmind-showroom-panel-theme",this._theme=this._loadTheme(),this._activeView="home",this.shadowRoot.addEventListener("click",e=>this._handleClick(e)),this.shadowRoot.addEventListener("scroll",e=>this._handleEnergyScroll(e),!0)}set hass(e){var o,n,c,d;const t=this._hass,i=this._config(),a=this._relevantHassChanged(t,e),r=!t||((o=t.states)==null?void 0:o[i.energySensor])!==((n=e==null?void 0:e.states)==null?void 0:n[i.energySensor]),s=!((c=t==null?void 0:t.states)!=null&&c[i.energySensor])&&!!((d=e==null?void 0:e.states)!=null&&d[i.energySensor]);this._hass=e,a&&this._syncStatesFromHass(),this.isConnected&&(this._started?r&&(s?this._loadEnergyStatistics():this._scheduleEnergyRefresh()):(this._started=!0,this._start()),a&&this._updateStatePresentation())}get hass(){return this._hass}set panel(e){const t=this._config().weather;this._panel=e;const i=this._config().weather;this._config().panelKind==="general"&&this._activeView==="home"&&(this._activeView="lights"),this._started&&t!==i&&(this._resetForecastSubscription(),this._subscribeWeather()),this._hass&&(this._syncStatesFromHass(),this._loadEnergyStatistics(),this._updateStatePresentation())}get panel(){return this._panel}set narrow(e){this._narrow=!!e,this.toggleAttribute("narrow",this._narrow)}get narrow(){return this._narrow}connectedCallback(){this._hass&&(this._started||(this._started=!0,this._start()),this._updateStatePresentation(),this._scheduleEnergyRefresh(!0))}disconnectedCallback(){clearInterval(this._clockTimer),clearInterval(this._historyTimer),clearTimeout(this._toastTimer),clearTimeout(this._energyRefreshTimer),this._energyRequestId+=1;for(const e of this._switchTimers.values())clearTimeout(e);this._switchTimers.clear(),this._resetForecastSubscription(),this._unsubscribeStates&&(this._unsubscribeStates(),this._unsubscribeStates=null),this._started=!1}_requestRender(){this._renderQueued||!this._hass||!this.shadowRoot||(this._renderQueued=!0,requestAnimationFrame(()=>{this._renderQueued=!1,this.render()}))}_updateStatePresentation(){var o;if(!((o=this.shadowRoot)!=null&&o.querySelector(".app-shell"))){this._requestRender();return}const e=n=>{var b;const c=n.dataset.entity;if(!c)return;const d=this._state(c),h=this._visibleSwitchState(c),p=h==="on",g=!d||["unknown","unavailable"].includes(d.state),u=this._pendingSwitches.has(c),m=this._switchErrors.get(c),_=m||(u?h==="on"?"Encendiendo…":"Apagando…":g?"No disponible":p?"Encendido":"Apagado");n.classList.toggle("is-on",p),n.classList.toggle("is-pending",u),n.classList.toggle("is-error",!!m),n.disabled=g,n.setAttribute("aria-pressed",String(p));const k=((b=n.querySelector(".device-copy strong"))==null?void 0:b.textContent)||c;n.setAttribute("aria-label",`${k}: ${_}`);const S=n.querySelector(".device-copy small");S&&(S.textContent=_)};this.shadowRoot.querySelectorAll('[data-action="toggle-switch"]').forEach(e),this.shadowRoot.querySelectorAll('[data-action="run-scene"]').forEach(n=>{const c=this._allScenes().find(u=>u.key===n.dataset.sceneKey);if(!c)return;const d=this._sceneStatus(c),h=this._pendingAction===c.key,p=h?"Aplicando...":d.active?"Activo":d.unavailable?"Sin datos":"Inactivo";n.classList.toggle("is-pending",h),n.classList.toggle("is-active",d.active),n.classList.toggle("is-unavailable",d.unavailable),n.disabled=!!(this._pendingAction&&!h),n.setAttribute("aria-pressed",String(d.active));const g=n.querySelector(".scene-state");g&&(g.textContent=p)});const t=this._config(),i=[...t.spots,...t.samples,...t.reflector?[t.reflector]:[]],a=i.filter(n=>this._visibleSwitchState(n.entity)==="on").length,r=this.shadowRoot.querySelector("[data-lights-summary]");r&&(r.textContent=`${a} de ${i.length}`);const s=this.shadowRoot.querySelector("[data-energy-summary]");s&&(s.textContent=this._energyMonthTotal===null?"Sin datos":`${this._formatEnergy(this._energyMonthTotal)} kWh`)}_handleClick(e){const t=e.target.closest("[data-action]");if(!t||!this._hass)return;const i=t.dataset.action;if(i==="toggle-menu"){this._toggleHomeAssistantMenu();return}if(i==="toggle-theme"){this._toggleTheme();return}if(i==="set-view"){const a=t.dataset.view;["home","lights","energy","system"].includes(a)&&(this._activeView=a,this._requestRender());return}if(i==="toggle-switch"){this._toggleSwitch(t.dataset.entity);return}if(i==="run-scene"){this._runScene(t.dataset.sceneKey||t.dataset.entity,t.dataset.label);return}if(i==="open-power-on"){this._pendingAction||(this._confirmAction="on",this._requestRender());return}if(i==="open-power-off"){this._pendingAction||(this._confirmAction="off",this._requestRender());return}if(i==="general-off"){const a=this._config().generalOffScript;a?this._hass.callService("script","turn_on",{entity_id:a}).catch(r=>{this._notify("No se pudo ejecutar Apagar todo Witmind.","error"),console.error("Error ejecutando el apagado general de Witmind:",r)}):this._notify("El apagado general aún no tiene una entidad configurada.","error");return}if(i==="cancel-power-confirm"){const a=e.target.closest("[data-dialog-card]");if(t.classList.contains("dialog-backdrop")&&a)return;this._pendingAction||(this._confirmAction="",this._requestRender());return}if(i==="confirm-power"){this._confirmGeneralPower();return}if(i==="clear-scene"){this._clearScene();return}if(i==="media"){this._mediaAction(t.dataset.service);return}if(i==="energy-range"){this._setEnergyRange(t.dataset.range);return}if(i==="energy-day-prev"){this._shiftEnergyDay(-1);return}if(i==="energy-day-next"){this._shiftEnergyDay(1);return}if(i==="energy-day-today"){this._resetEnergyDay();return}i==="refresh-energy"&&(this._energyLastLoadedAt=0,this._loadEnergyStatistics())}_toggleHomeAssistantMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_loadTheme(){try{return localStorage.getItem(this._themeStorageKey)==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem(this._themeStorageKey,this._theme)}catch(e){console.warn("No se pudo guardar el tema del showroom:",e)}}_toggleTheme(){this._theme=this._theme==="dark"?"light":"dark",this.setAttribute("data-theme",this._theme),this._saveTheme(),this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0})),this._requestRender()}set theme(e){e!=="dark"&&e!=="light"||(this._theme=e,this.setAttribute("data-theme",e),this._saveTheme())}get theme(){return this._theme}_config(){var u;const e=((u=this._panel)==null?void 0:u.config)||{},t=e.panel_kind==="lobby"||e.panel_kind==="general"||e.static_only===!0||e.staticOnly===!0,i=m=>Array.isArray(m)?[...new Set(m.filter(Boolean).map(_=>String(_)))]:[],a=(m,_)=>(Array.isArray(m)&&(m.length||t)?m:_).filter(S=>S==null?void 0:S.entity).map((S,b)=>({entity:String(S.entity),name:S.name||`Dispositivo ${b+1}`,subtitle:S.subtitle||"Iluminación",icon:S.icon||"bulb"})),r=a(e.spots,M.spots),s=a(e.samples||e.muestras,M.samples),o=[...r,...s].map(m=>m.entity),n=i(e.scene_control_entities||e.sceneControlEntities),c=n.length?n:o,d=(m,_,k)=>(Array.isArray(m)&&(m.length||t)?m:_).filter(b=>(b==null?void 0:b.entity)||(b==null?void 0:b.id)||(b==null?void 0:b.key)).map((b,y)=>{const E=b.entity?String(b.entity):"",C=String(b.id||b.key||E||`${k}-${y+1}`),w=_.find(I=>{const Le=I.entity?String(I.entity):"",St=String(I.id||I.key||Le||"");return E&&Le===E||St===C}),T=E||(w!=null&&w.entity?String(w.entity):""),N=String(b.id||b.key||(w==null?void 0:w.id)||T||`${k}-${y+1}`),z=T||`${k}:${N}`,A=Array.isArray(b.on_entities)||Array.isArray(b.onEntities),re=Array.isArray(b.off_entities)||Array.isArray(b.offEntities),he=i(A?b.on_entities||b.onEntities:w==null?void 0:w.onEntities),$t=i(re?b.off_entities||b.offEntities:[]),kt=re?$t.filter(I=>!he.includes(I)):c.filter(I=>!he.includes(I));return{key:z,id:N,entity:T,name:b.name||(w==null?void 0:w.name)||`Escena ${y+1}`,subtitle:b.subtitle||(w==null?void 0:w.subtitle)||"Escena del showroom",icon:b.icon||(w==null?void 0:w.icon)||"presentation",directOnly:b.direct_only??b.directOnly??(w==null?void 0:w.directOnly)??!1,onEntities:he,offEntities:kt}}),h=e.reflector||M.reflector,p=Number(e.history_hours??e.historyHours),g=Number(e.chart_hours??e.chartHours);return{title:e.title||M.title,subtitle:e.subtitle||M.subtitle,siteLabel:e.site_label||e.siteLabel||M.siteLabel,logo:e.logo||M.logo,weather:e.weather||M.weather,mediaPlayer:e.media_player||e.mediaPlayer||M.mediaPlayer,lightCountSensor:e.light_count_sensor||e.lightCountSensor||M.lightCountSensor,energySensor:e.energy_sensor||e.energySensor||M.energySensor,batteryLevel:e.battery_level||e.batteryLevel||M.batteryLevel,powerOnScript:e.power_on_script||e.powerOnScript||M.powerOnScript,powerOffScript:e.power_off_script||e.powerOffScript||M.powerOffScript,historyHours:Number.isFinite(p)&&p>0?Math.min(24,p):M.historyHours,chartHours:Number.isFinite(g)&&g>0?Math.min(72,g):M.chartHours,showForecast:e.show_forecast??e.showForecast??M.showForecast,panelKind:e.panel_kind||e.panelKind||"showroom",staticOnly:e.static_only??e.staticOnly??!1,generalOffScript:e.general_off_script||e.generalOffScript||"",spots:r,samples:s,sceneControlEntities:c,reflector:h!=null&&h.entity?{entity:String(h.entity),name:h.name||M.reflector.name,subtitle:h.subtitle||M.reflector.subtitle,icon:h.icon||M.reflector.icon}:null,scenes:d(e.scenes,M.scenes,"scene"),sampleScenes:d(e.sample_scenes||e.sampleScenes,M.sampleScenes,"sample")}}_allDevices(){const e=this._config();return[...e.spots,...e.samples,...e.reflector?[e.reflector]:[]]}_allScenes(e=this._config()){return[...e.scenes,...e.sampleScenes]}_trackedEntities(){const e=this._config();return new Set([...this._allDevices().map(t=>t.entity),...e.sceneControlEntities,...this._allScenes(e).flatMap(t=>[t.entity,...t.onEntities,...t.offEntities]),e.weather,e.mediaPlayer,e.lightCountSensor,e.energySensor,e.batteryLevel,e.powerOnScript,e.powerOffScript].filter(Boolean))}_relevantHassChanged(e,t){var i,a;if(!e||!t)return!0;for(const r of this._trackedEntities())if(((i=e.states)==null?void 0:i[r])!==((a=t.states)==null?void 0:a[r]))return!0;return!1}async _start(){this._clockTimer=setInterval(()=>this._updateClock(),3e4),await Promise.allSettled([this._fetchCurrentStates(),this._subscribeStateChanges(),this._subscribeWeather(),this._loadEnergyStatistics()])}_syncStatesFromHass(){var e;if((e=this._hass)!=null&&e.states)for(const t of this._trackedEntities()){const i=this._hass.states[t];i&&this._applyLiveState(t,i)}}_applyLiveState(e,t){if(!t){this._liveStates.delete(e);return}this._liveStates.set(e,t);const i=this._pendingSwitches.get(e);if(i&&t.state===i.desired){this._pendingSwitches.delete(e),this._switchErrors.delete(e);const a=this._switchTimers.get(e);a&&clearTimeout(a),this._switchTimers.delete(e)}}async _fetchCurrentStates(){var e;if((e=this._hass)!=null&&e.callWS)try{const t=await this._hass.callWS({type:"get_states"}),i=this._trackedEntities();for(const a of t||[])i.has(a.entity_id)&&this._applyLiveState(a.entity_id,a);this._updateStatePresentation()}catch(t){console.error("No se pudieron sincronizar los estados del showroom:",t)}}async _subscribeStateChanges(){var e;if(!(!((e=this._hass)!=null&&e.connection)||this._unsubscribeStates))try{this._unsubscribeStates=await this._hass.connection.subscribeEvents(t=>{var a;const i=(a=t==null?void 0:t.data)==null?void 0:a.entity_id;!i||!this._trackedEntities().has(i)||(this._applyLiveState(i,t.data.new_state),i===this._config().energySensor&&this._scheduleEnergyRefresh(),this._updateStatePresentation())},"state_changed")}catch(t){console.error("No se pudo suscribir a state_changed:",t)}}_resetForecastSubscription(){this._unsubscribeForecast&&(this._unsubscribeForecast(),this._unsubscribeForecast=null),this._forecastEntity=""}async _subscribeWeather(){var t;const e=this._config();if(!(!((t=this._hass)!=null&&t.connection)||!e.weather)&&!(this._unsubscribeForecast&&this._forecastEntity===e.weather)){this._resetForecastSubscription();try{this._forecastEntity=e.weather,this._unsubscribeForecast=await this._hass.connection.subscribeMessage(i=>{this._forecast=Array.isArray(i==null?void 0:i.forecast)?i.forecast:[],this._requestRender()},{type:"weather/subscribe_forecast",forecast_type:"daily",entity_id:e.weather})}catch(i){this._forecastEntity="",console.error("No se pudo cargar el pronóstico:",i)}}}_energyRefreshInterval(){return this._energyRange==="day"?3e4:this._energyRange==="month"?12e4:3e5}_scheduleEnergyRefresh(e=!1){if(!this._hass||!this.isConnected||(clearTimeout(this._energyRefreshTimer),this._energyRange==="day"&&this._energyDayOffset!==0))return;const t=this._energyRefreshInterval(),i=this._energyLastLoadedAt?Date.now()-this._energyLastLoadedAt:0,a=e?0:this._energyLastLoadedAt?Math.max(1e3,t-i):t;this._energyRefreshTimer=setTimeout(()=>this._loadEnergyStatistics(),a)}_energyRangeDefinition(e=this._energyRange){const t=new Date;let i,a=t,r,s,o,n=!1;if(e==="year")i=new Date(t.getFullYear(),0,1,0,0,0,0),r="month",s=`Año ${t.getFullYear()}`,o="mes";else if(e==="month")i=new Date(t.getFullYear(),t.getMonth(),1,0,0,0,0),r="day",s=t.toLocaleDateString("es-BO",{month:"long",year:"numeric"}),o="día";else{const c=new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0);i=new Date(c.getFullYear(),c.getMonth(),c.getDate()+Math.min(0,Number(this._energyDayOffset)||0),0,0,0,0),n=i.getTime()===c.getTime(),a=n?t:new Date(i.getFullYear(),i.getMonth(),i.getDate()+1,0,0,0,0),r="hour",s=i.toLocaleDateString("es-BO",{weekday:"long",day:"numeric",month:"long"}),o="hora"}return{start:i,end:a,period:r,title:s,intervalLabel:o,isToday:n}}_energyValueToKWh(e,t){const i=Number(e);if(!Number.isFinite(i))return null;const a=String(t||"kWh").trim().toLowerCase().replaceAll(" ","");return a==="kwh"?i:a==="wh"?i/1e3:a==="mwh"?i*1e3:null}_deriveEnergyStateDeltas(e,t,i){const a=Number(t instanceof Date?t.getTime():t),r=Number(i instanceof Date?i.getTime():i),s=e.filter(c=>Number.isFinite(Number(c.start))&&Number.isFinite(Number(c.state))).sort((c,d)=>Number(c.start)-Number(d.start)),o=[];let n=null;for(const c of s){const d=Number(c.start),h=Number(c.state);if(d<a){n=h;continue}if(d>=r)break;let p=0;if(Number.isFinite(n)){const g=h-n;p=g>=0?g:Math.max(0,h)}o.push({...c,change:p}),n=h}return o}_aggregateEnergyDayRows(e,t,i){var c;const a=new Date(t.start),r=new Date(t.end),s=t.isToday?new Date(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),0,0,0):new Date(a.getFullYear(),a.getMonth(),a.getDate(),23,0,0,0),o=new Map;for(let d=new Date(a);d<=s;d.setHours(d.getHours()+1)){const h=d.getTime();o.set(h,{start:h,end:new Date(d.getFullYear(),d.getMonth(),d.getDate(),d.getHours()+1,0,0,0).getTime(),change:0,samples:0,partial:t.isToday&&h===s.getTime(),live:!1})}let n=null;for(const d of e){const h=new Date(Number(d.start));if(!Number.isFinite(h.getTime()))continue;const p=new Date(h.getFullYear(),h.getMonth(),h.getDate(),h.getHours(),0,0,0).getTime(),g=o.get(p);g&&(g.change+=Math.max(0,Number(d.change)||0),g.samples+=1,Number.isFinite(d.state)&&(!n||Number(d.end||d.start)>Number(n.end||n.start))&&(n=d))}if(t.isToday){const d=this._energyValueToKWh(i==null?void 0:i.state,(c=i==null?void 0:i.attributes)==null?void 0:c.unit_of_measurement),h=n==null?void 0:n.state,p=Number((n==null?void 0:n.end)||(n==null?void 0:n.start)),g=o.get(s.getTime());if(g&&Number.isFinite(d)&&Number.isFinite(h)&&Number.isFinite(p)&&p>=s.getTime()&&r.getTime()-p>=0&&r.getTime()-p<=900*1e3){const u=d-h;Number.isFinite(u)&&u>=0&&(g.change+=u,g.live=u>0)}}return[...o.values()].filter(d=>d.samples>0||d.live)}_calculateCurrentMonthEnergy(e,t,i){var p;const a=new Date(t),r=new Date(a.getFullYear(),a.getMonth(),1,0,0,0,0).getTime(),s=e.filter(g=>Number.isFinite(Number(g.start))&&Number(g.start)>=r).sort((g,u)=>Number(g.start)-Number(u.start));let o=s.reduce((g,u)=>g+Math.max(0,Number(u.change)||0),0),n=null;for(const g of s)Number.isFinite(Number(g.state))&&(!n||Number(g.end||g.start)>Number(n.end||n.start))&&(n=g);const c=this._energyValueToKWh(i==null?void 0:i.state,(p=i==null?void 0:i.attributes)==null?void 0:p.unit_of_measurement),d=Number(n==null?void 0:n.state),h=Number((n==null?void 0:n.end)||(n==null?void 0:n.start));if(Number.isFinite(c)&&Number.isFinite(d)&&Number.isFinite(h)&&h>=r&&h<=a.getTime()&&a.getTime()-h<=7200*1e3){const g=c-d;Number.isFinite(g)&&g>=0&&(o+=g)}return s.length||Number.isFinite(d)?o:null}_aggregateEnergyCalendarRows(e,t,i,a){var h;if(!["month","year"].includes(a))return[];const r=new Map;let s=null;for(const p of e){const g=Number(p.start);if(!Number.isFinite(g))continue;const u=new Date(g),m=a==="month"?new Date(u.getFullYear(),u.getMonth(),u.getDate(),0,0,0,0).getTime():new Date(u.getFullYear(),u.getMonth(),1,0,0,0,0).getTime(),_=r.get(m)||{start:m,change:0,samples:0,partial:!1,live:!1};_.change+=Math.max(0,Number(p.change)||0),_.samples+=1,r.set(m,_),Number.isFinite(Number(p.state))&&(!s||g>Number(s.start))&&(s=p)}const o=this._energyValueToKWh(i==null?void 0:i.state,(h=i==null?void 0:i.attributes)==null?void 0:h.unit_of_measurement),n=Number(s==null?void 0:s.state),c=Number(s==null?void 0:s.start),d=new Date(t.end);if(Number.isFinite(o)&&Number.isFinite(n)&&Number.isFinite(c)&&c<=d.getTime()&&d.getTime()-c<=7200*1e3){const p=o-n;if(Number.isFinite(p)&&p>=0){const g=a==="month"?new Date(d.getFullYear(),d.getMonth(),d.getDate(),0,0,0,0).getTime():new Date(d.getFullYear(),d.getMonth(),1,0,0,0,0).getTime(),u=r.get(g)||{start:g,change:0,samples:0,partial:!1,live:!1};u.change+=p,u.live=p>0,r.set(g,u)}}return[...r.values()].sort((p,g)=>Number(p.start)-Number(g.start))}_energyViewSignature(){return JSON.stringify([this._energyRange,this._energyDayOffset,this._energyMonthTotal,this._energyError||"",this._energyData.map(e=>[Number(e.start),Number(e.change)||0,Number(e.samples)||0,!!e.partial,!!e.live])])}async _loadEnergyStatistics(){var g;if(!((g=this._hass)!=null&&g.connection))return;clearTimeout(this._energyRefreshTimer);const e=this._config(),t=this._state(e.energySensor),i=Number(t==null?void 0:t.state);if(!t){this._energyData=[],this._energyMonthTotal=null,this._energyError=`No existe ${e.energySensor} en Home Assistant.`,this._energyLoading=!1,this._requestRender();return}if(!Number.isFinite(i)){this._energyData=[],this._energyMonthTotal=null,this._energyError=`${e.energySensor} no entrega un valor numérico.`,this._energyLoading=!1,this._requestRender();return}const a=++this._energyRequestId,r=this._energyViewSignature(),s=this._energyData.length>0,o=this._energyRangeDefinition(),n=new Date,c=new Date(n.getFullYear(),n.getMonth(),1,0,0,0,0),d=new Date(o.start.getTime()-3600*1e3),h=this._energyRange==="year"?"hour":"5minute",p=new Date(c.getTime()-3600*1e3);this._energyLoading=!0,this._energyError=null,s||this._requestRender();try{const u=await this._hass.connection.sendMessagePromise({type:"recorder/get_statistics_metadata",statistic_ids:[e.energySensor]});if(a!==this._energyRequestId)return;const _=(Array.isArray(u)?u:[]).find(z=>(z==null?void 0:z.statistic_id)===e.energySensor)||null;if(!_||!_.has_sum)throw new Error("La entidad no dispone de estadísticas acumulables. Verifica device_class: energy y state_class total/total_increasing.");const k=this._hass.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:d.toISOString(),end_time:o.end.toISOString(),statistic_ids:[e.energySensor],period:h,units:{energy:"kWh"},types:["state"]}),S=this._hass.connection.sendMessagePromise({type:"recorder/statistics_during_period",start_time:p.toISOString(),end_time:n.toISOString(),statistic_ids:[e.energySensor],period:"hour",units:{energy:"kWh"},types:["state"]}),[b,y]=await Promise.all([k,S]);if(a!==this._energyRequestId)return;const E=z=>(Array.isArray(z==null?void 0:z[e.energySensor])?z[e.energySensor]:[]).map(A=>({start:Number(A.start),end:Number(A.end),change:A.change===void 0||A.change===null?null:Math.max(0,Number(A.change)||0),state:A.state===void 0||A.state===null?null:Number(A.state)})).filter(A=>Number.isFinite(A.start)&&(Number.isFinite(A.state)||Number.isFinite(A.change))),C=E(b),w=this._deriveEnergyStateDeltas(C,o.start,o.end);this._energyData=this._energyRange==="day"?this._aggregateEnergyDayRows(w,o,t):this._aggregateEnergyCalendarRows(w,o,t,this._energyRange);const T=E(y),N=this._deriveEnergyStateDeltas(T,c,n);if(this._energyMonthTotal=this._calculateCurrentMonthEnergy(N,n,t),this._energyRange==="month"&&this._energyData.length)this._energyMonthTotal=this._energyData.reduce((z,A)=>z+Math.max(0,Number(A.change)||0),0);else if(this._energyRange==="year"&&Number.isFinite(this._energyMonthTotal)){const z=new Date(n.getFullYear(),n.getMonth(),1,0,0,0,0).getTime(),A=this._energyData.find(re=>Number(re.start)===z);A&&(A.change=this._energyMonthTotal)}this._energyLastLoadedAt=Date.now(),this._energyError=null}catch(u){if(a!==this._energyRequestId)return;this._energyData=[],this._energyMonthTotal=null,this._energyError=(u==null?void 0:u.message)||"No se pudieron consultar las estadísticas energéticas.",console.error("Error cargando estadísticas de energía del showroom:",u)}finally{if(a===this._energyRequestId){this._energyLoading=!1;const u=r!==this._energyViewSignature();!s||u&&this._activeView==="energy"?this._requestRender():this._updateStatePresentation(),this._scheduleEnergyRefresh()}}}_setEnergyRange(e){!["day","month","year"].includes(e)||e===this._energyRange||(this._energyRange=e,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_shiftEnergyDay(e){if(this._energyRange!=="day")return;const t=Number(e);if(!Number.isFinite(t)||t===0)return;const i=Math.min(0,this._energyDayOffset+t);i!==this._energyDayOffset&&(this._energyDayOffset=i,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_resetEnergyDay(){this._energyRange!=="day"||this._energyDayOffset===0||(this._energyDayOffset=0,this._energyData=[],this._energyError=null,this._energyLastLoadedAt=0,this._energyAutoFollow=!0,this._energyScrollLeft=null,this._loadEnergyStatistics())}_formatEnergy(e,t=2){const i=Number(e);return Number.isFinite(i)?i.toLocaleString("es-BO",{minimumFractionDigits:t,maximumFractionDigits:t}):"--"}_energyLabel(e,t=this._energyRange){const i=new Date(Number(e));return Number.isFinite(i.getTime())?t==="year"?i.toLocaleDateString("es-BO",{month:"short"}).replace(".",""):t==="month"?String(i.getDate()):i.toLocaleTimeString("es-BO",{hour:"2-digit",minute:"2-digit",hour12:!1}):"--"}_captureEnergyChartScroll(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-energy-scroll]");if(!e)return;const t=Math.max(0,e.scrollWidth-e.clientWidth);this._energyScrollLeft=e.scrollLeft,this._energyAutoFollow=t<=0||t-e.scrollLeft<=8}_handleEnergyScroll(e){var a,r;const t=(r=(a=e.target)==null?void 0:a.closest)==null?void 0:r.call(a,"[data-energy-scroll]");if(!t)return;const i=Math.max(0,t.scrollWidth-t.clientWidth);this._energyScrollLeft=t.scrollLeft,this._energyAutoFollow=i<=0||i-t.scrollLeft<=8}_restoreEnergyChartScroll(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-energy-scroll]");if(!e)return;const t=Math.max(0,e.scrollWidth-e.clientWidth);if(this._energyAutoFollow||this._energyScrollLeft===null){e.scrollLeft=t,this._energyScrollLeft=e.scrollLeft;return}e.scrollLeft=Math.max(0,Math.min(this._energyScrollLeft,t))}_energyChart(){const e=this._energyData;if(this._energyLoading&&!e.length)return'<div class="energy-empty"><span class="energy-spinner"></span>Consultando estadísticas de Home Assistant…</div>';if(this._energyError)return`<div class="energy-empty error">${this._icon("status")}<span>${this._escape(this._energyError)}</span></div>`;if(!e.length)return'<div class="energy-empty">No hay estadísticas de consumo disponibles para este período.</div>';const t=280,i=14,a=16,r=22,s=42,o=this._energyRange==="day"?64:this._energyRange==="month"?36:58,n=Math.max(620,e.length*o+i+a),c=t-r-s,d=n-i-a,h=Math.max(...e.map(b=>b.change),.001),p=this._energyRange==="day"?10:e.length>24?4:7,g=Math.max(6,(d-p*Math.max(0,e.length-1))/e.length),u=this._energyRange==="month"?Math.max(1,Math.ceil(e.length/10)):this._energyRange==="day"?2:1,m=[0,.25,.5,.75,1],_=m.map(b=>{const y=r+c*(1-b);return`<line x1="${i}" y1="${y.toFixed(1)}" x2="${n-a}" y2="${y.toFixed(1)}" class="energy-grid-line"/>`}).join(""),k=m.map(b=>{const y=r+c*(1-b),E=this._formatEnergy(h*b,h<1?2:1);return`<span class="energy-y-tick" style="top:${y.toFixed(1)}px">${this._escape(E)}</span>`}).join(""),S=e.map((b,y)=>{const E=i+y*(g+p),C=b.change>0?Math.max(2,b.change/h*c):1,w=r+c-C,T=y%u===0||y===e.length-1,N=this._energyLabel(b.start),z=b.partial?" · en curso":"",A=b.partial?`<text x="${(E+g/2).toFixed(1)}" y="${(r+10).toFixed(1)}" text-anchor="middle" class="energy-current-label">ahora</text>`:"";return`<g class="energy-bar-group ${b.partial?"is-current":""}"><rect x="${E.toFixed(1)}" y="${w.toFixed(1)}" width="${g.toFixed(1)}" height="${C.toFixed(1)}" rx="${Math.min(4,g/2).toFixed(1)}" class="energy-bar ${b.partial?"is-partial":""}"><title>${this._escape(N)} · ${this._formatEnergy(b.change)} kWh${z}</title></rect>${A}${T?`<text x="${(E+g/2).toFixed(1)}" y="${t-14}" text-anchor="middle" class="energy-axis-text">${this._escape(N)}</text>`:""}</g>`}).join("");return`<div class="energy-chart-layout"><div class="energy-y-axis" aria-hidden="true"><span class="energy-y-unit">kWh</span>${k}</div><div class="energy-chart-wrap" data-energy-scroll><svg class="energy-chart" width="${n}" height="${t}" viewBox="0 0 ${n} ${t}" role="img" aria-label="Gráfica de consumo energético estimado en kWh">${_}${S}</svg></div></div>`}async _loadHistory(){var o;const e=this._config();if(!((o=this._hass)!=null&&o.callApi))return;const t=Math.max(e.historyHours,e.chartHours),i=new Date(Date.now()-t*60*60*1e3).toISOString(),a=new Date().toISOString(),r=[e.lightCountSensor,...e.spots.map(n=>n.entity),...e.samples.map(n=>n.entity)].filter(Boolean).join(",");if(!r)return;const s=`history/period/${encodeURIComponent(i)}?filter_entity_id=${encodeURIComponent(r)}&end_time=${encodeURIComponent(a)}&minimal_response&no_attributes`;try{this._history=await this._hass.callApi("GET",s),this._historyError=""}catch(n){this._history=[],this._historyError="No se pudo cargar el historial.",console.error("No se pudo cargar el historial del showroom:",n)}this._requestRender()}_state(e){var t,i;return this._liveStates.get(e)||((i=(t=this._hass)==null?void 0:t.states)==null?void 0:i[e])}_isUnavailable(e){var i;const t=(i=this._state(e))==null?void 0:i.state;return!t||t==="unknown"||t==="unavailable"}_visibleSwitchState(e){var t,i;return((t=this._pendingSwitches.get(e))==null?void 0:t.desired)||((i=this._state(e))==null?void 0:i.state)||"unavailable"}async _toggleSwitch(e){if(!e||!this._hass)return;const t=this._state(e);if(!t||["unknown","unavailable"].includes(t.state)){this._switchErrors.set(e,"No disponible"),this._updateStatePresentation();return}const a=this._visibleSwitchState(e)==="on"?"off":"on",r=a==="on"?"turn_on":"turn_off",s=e.split(".")[0]||"switch";this._pendingSwitches.set(e,{desired:a,startedAt:Date.now()}),this._switchErrors.delete(e),this._updateStatePresentation();try{await this._hass.callService(s,r,{entity_id:e});const o=this._switchTimers.get(e);o&&clearTimeout(o);const n=setTimeout(()=>this._verifySwitchState(e,a),6e3);this._switchTimers.set(e,n)}catch(o){this._pendingSwitches.delete(e),this._switchErrors.set(e,"La acción falló"),this._updateStatePresentation(),console.error(`Error ejecutando ${r} en ${e}:`,o)}}async _verifySwitchState(e,t){var a;await this._fetchCurrentStates();const i=((a=this._state(e))==null?void 0:a.state)===t;this._pendingSwitches.delete(e),this._switchTimers.delete(e),i?this._switchErrors.delete(e):this._switchErrors.set(e,"Sin confirmación"),this._updateStatePresentation()}_sceneStatus(e){const t=[...e.onEntities.map(r=>({entityId:r,desired:"on"})),...e.offEntities.map(r=>({entityId:r,desired:"off"}))];if(!t.length)return{active:!1,unavailable:!1,mismatches:[]};const i=t.some(({entityId:r})=>this._isUnavailable(r)),a=t.filter(({entityId:r,desired:s})=>{var o;return((o=this._state(r))==null?void 0:o.state)!==s});return{active:!i&&a.length===0,unavailable:i,mismatches:a}}_sceneExpectations(e){return[...e.offEntities.map(t=>({entityId:t,desired:"off"})),...e.onEntities.map(t=>({entityId:t,desired:"on"}))]}_markExpectedStates(e){const t=Date.now();for(const{entityId:i,desired:a}of e)this._pendingSwitches.set(i,{desired:a,startedAt:t}),this._switchErrors.delete(i)}_clearExpectedStates(e){for(const{entityId:t}of e){this._pendingSwitches.delete(t);const i=this._switchTimers.get(t);i&&clearTimeout(i),this._switchTimers.delete(t)}}async _setEntitiesState(e,t){const i=[...new Set((e||[]).filter(Boolean))];if(!i.length)return;const a=new Map;for(const s of i){const o=s.split(".")[0];o&&(a.has(o)||a.set(o,[]),a.get(o).push(s))}const r=t==="on"?"turn_on":"turn_off";for(const[s,o]of a)await this._hass.callService(s,r,{entity_id:o})}async _waitForExpectedStates(e,t=7e3){const i=Date.now()+t;let a=e;for(;Date.now()<i;){if(await this._fetchCurrentStates(),a=e.filter(({entityId:r,desired:s})=>{var o;return((o=this._state(r))==null?void 0:o.state)!==s}),!a.length)return{ok:!0,mismatches:[]};await new Promise(r=>setTimeout(r,450))}return{ok:!1,mismatches:a}}async _runScene(e,t){var o;if(!e||this._pendingAction)return;const i=this._config(),a=this._allScenes(i).find(n=>n.key===e||n.entity===e);if(!a){this._notify("La escena no está configurada.","error");return}const r=this._sceneExpectations(a);this._pendingAction=a.key,this._markExpectedStates(r),this._updateStatePresentation();let s=null;try{if(a.entity&&!a.directOnly)try{await this._hass.callService("scene","turn_on",{entity_id:a.entity})}catch(d){s=d,console.warn(`La escena ${a.entity} no respondió; se aplicará el perfil directo.`,d)}await this._setEntitiesState(a.offEntities,"off"),await this._setEntitiesState(a.onEntities,"on");const n=await this._waitForExpectedStates(r);if(!n.ok){const d=n.mismatches.map(h=>h.entityId).join(", ");throw new Error(`No se confirmaron los estados de: ${d}`)}const c=s?`${t||"Modo"} aplicado mediante control directo.`:`${t||"Modo"} activo.`;this._notify(c,"success")}catch(n){for(const{entityId:c,desired:d}of r)((o=this._state(c))==null?void 0:o.state)!==d&&this._switchErrors.set(c,"No confirmó el modo");this._notify("No se pudo aplicar completamente el modo seleccionado.","error"),console.error("Error aplicando modo del showroom:",n)}finally{this._clearExpectedStates(r),this._pendingAction="",await this._fetchCurrentStates(),this._updateStatePresentation()}}async _executeGeneralPower(e,t={}){var c;if(!this._hass||this._pendingAction||!["on","off"].includes(e))return!1;const i=this._config(),a=e==="on"?i.powerOnScript:i.powerOffScript,r=i.sceneControlEntities.map(d=>({entityId:d,desired:e})),s=t.successMessage||(e==="on"?"Iluminación general encendida.":"Iluminación general apagada."),o=t.errorMessage||(e==="on"?"No se pudo encender toda la iluminación.":"No se pudo apagar toda la iluminación.");this._pendingAction=a||`direct-power-${e}`,this._markExpectedStates(r),this._updateStatePresentation();let n=null;try{if(a)try{await this._hass.callService("script","turn_on",{entity_id:a})}catch(h){n=h,console.warn(`El script ${a} no respondió; se aplicará el control directo.`,h)}await this._setEntitiesState(i.sceneControlEntities,e);const d=await this._waitForExpectedStates(r);if(!d.ok){const h=d.mismatches.map(p=>p.entityId).join(", ");throw new Error(`No se confirmaron los estados de: ${h}`)}return this._confirmAction="",this._notify(s,"success"),!0}catch(d){for(const{entityId:h,desired:p}of r)((c=this._state(h))==null?void 0:c.state)!==p&&this._switchErrors.set(h,"Sin confirmación");return this._notify(o,"error"),console.error("Error ejecutando el control general del showroom:",{error:d,scriptError:n,desired:e}),!1}finally{this._clearExpectedStates(r),this._pendingAction="",await this._fetchCurrentStates(),this._updateStatePresentation()}}async _confirmGeneralPower(){const e=this._confirmAction;["on","off"].includes(e)&&await this._executeGeneralPower(e,{successMessage:e==="on"?"Toda la iluminación del showroom está encendida.":"Toda la iluminación del showroom está apagada."})}async _clearScene(){this._pendingAction||await this._executeGeneralPower("off",{successMessage:"Escena apagada. La iluminación del showroom quedó apagada.",errorMessage:"No se pudo apagar completamente la escena."})}async _mediaAction(e){const t=this._config().mediaPlayer;if(!(!t||!e||this._isUnavailable(t)))try{await this._hass.callService("media_player",e,{entity_id:t})}catch(i){this._notify("No se pudo controlar el reproductor.","error"),console.error(`Error ejecutando media_player.${e}:`,i)}}_updateToastPresentation(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("[data-toast]");if(!this._toast){e==null||e.remove();return}if(e){e.className=`toast ${this._escape(this._toast.type)}`,e.textContent=this._toast.message;return}const t=document.createElement("div");t.dataset.toast="",t.className=`toast ${this._escape(this._toast.type)}`,t.setAttribute("role","status"),t.textContent=this._toast.message,this.shadowRoot.append(t)}_notify(e,t="success"){var i;clearTimeout(this._toastTimer),this._toast={message:e,type:t},(i=this.shadowRoot)!=null&&i.querySelector(".app-shell")?this._updateToastPresentation():this._requestRender(),this._toastTimer=setTimeout(()=>{this._toast=null,this._updateToastPresentation()},4200)}_historyMap(){var t;const e=new Map;for(const i of this._history||[]){const a=(t=i==null?void 0:i[0])==null?void 0:t.entity_id;a&&e.set(a,i)}return e}_historySegments(e,t,i){if(!Array.isArray(e)||!e.length)return[];const a=e.map(s=>({state:s.state,time:new Date(s.last_changed||s.last_updated).getTime()})).filter(s=>Number.isFinite(s.time)).sort((s,o)=>s.time-o.time);if(!a.length)return[];const r=[];for(let s=0;s<a.length;s+=1){const o=a[s],n=a[s+1],c=Math.max(t,o.time),d=Math.min(i,(n==null?void 0:n.time)??i);d<=c||r.push({state:o.state,left:(c-t)/(i-t)*100,width:(d-c)/(i-t)*100})}return r}_sparkline(e,t){var u;const i=this._historyMap().get(e)||[],a=Date.now(),r=a-t*60*60*1e3,s=i.map(m=>({value:Number(m.state),time:new Date(m.last_changed||m.last_updated).getTime()})).filter(m=>Number.isFinite(m.value)&&Number.isFinite(m.time)&&m.time>=r).sort((m,_)=>m.time-_.time),o=Number((u=this._state(e))==null?void 0:u.state);if(Number.isFinite(o)&&s.push({value:o,time:a}),!s.length)return{path:"",min:"--",max:"--",avg:"--"};const n=s.map(m=>m.value),c=Math.min(...n),d=Math.max(...n),h=n.reduce((m,_)=>m+_,0)/n.length,p=d-c||1;return{path:s.map((m,_)=>{const k=(m.time-r)/(a-r)*300,S=66-(m.value-c)/p*52;return`${_?"L":"M"}${Math.max(0,Math.min(300,k)).toFixed(1)},${S.toFixed(1)}`}).join(" "),min:this._formatNumber(c),max:this._formatNumber(d),avg:this._formatNumber(h)}}_formatNumber(e){return Number.isFinite(e)?new Intl.NumberFormat("es-BO",{maximumFractionDigits:1}).format(e):"--"}_updateClock(){var o,n,c;if(!this.shadowRoot)return;const e=new Date,t=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",hour12:!0}).formatToParts(e),i=((o=t.find(d=>d.type==="hour"))==null?void 0:o.value)||"--",a=((n=t.find(d=>d.type==="minute"))==null?void 0:n.value)||"--",r=(((c=t.find(d=>d.type==="dayPeriod"))==null?void 0:c.value)||"").replaceAll(".","").replaceAll(" ","").toUpperCase();for(const d of this.shadowRoot.querySelectorAll("[data-clock-time]"))d.textContent=`${i}:${a}`;for(const d of this.shadowRoot.querySelectorAll("[data-clock-period]"))d.textContent=r||"";const s=this.shadowRoot.querySelector("[data-current-time]");s&&(s.dateTime=e.toISOString(),s.setAttribute("aria-label",`${i}:${a} ${r}`.trim()))}_icon(e,t=""){const i=Re[e]||Re.bulb;return`<svg class="icon ${this._escape(t)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${i}</svg>`}_escape(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_renderDevice(e){const t=this._state(e.entity),i=this._visibleSwitchState(e.entity),a=i==="on",r=!t||["unknown","unavailable"].includes(t.state),s=this._pendingSwitches.has(e.entity),o=this._switchErrors.get(e.entity),n=o||(s?i==="on"?"Encendiendo…":"Apagando…":r?"No disponible":a?"Encendido":"Apagado");return`
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
          <div class="weather-symbol">${this._escape(ge[a]||"·")}</div>
          <div class="weather-copy">
            <span class="eyebrow">Clima · Casa</span>
            <h2>${this._escape(Ie[a]||a)}</h2>
            <p>Humedad ${this._escape(i.humidity??"Sin datos")}% · Viento ${this._escape(i.wind_speed??"Sin datos")} ${this._escape(i.wind_speed_unit??"")}</p>
          </div>
          <strong class="temperature">${this._escape(i.temperature??"--")}${this._escape(i.temperature_unit??"°")}</strong>
        </div>
        ${e.showForecast?`
          <div class="forecast-row">
            ${r.length?r.map(s=>{const o=new Date(s.datetime),n=new Intl.DateTimeFormat("es-BO",{weekday:"short"}).format(o);return`
                <div class="forecast-item">
                  <span>${this._escape(n)}</span>
                  <b>${this._escape(ge[s.condition]||"·")}</b>
                  <strong>${this._escape(s.temperature??s.native_temperature??"--")}°</strong>
                </div>
              `}).join(""):'<span class="forecast-empty">Pronóstico no disponible</span>'}
          </div>
        `:""}
      </section>
    `}_renderMedia(){const e=this._config(),t=this._state(e.mediaPlayer),i=!t||["unknown","unavailable"].includes(t.state),a=(t==null?void 0:t.attributes)||{},r=(t==null?void 0:t.state)==="playing",s=i?"No disponible":r?"Reproduciendo":(t==null?void 0:t.state)==="paused"?"En pausa":(t==null?void 0:t.state)==="idle"?"En espera":(t==null?void 0:t.state)||"Detenido",o=a.media_title||a.friendly_name||"Showroom 1",n=a.media_artist||a.source||"Música del showroom",c=Number(a.volume_level),d=(h,p,g,u=!1)=>`
      <button
        class="media-button ${u?"primary":""}"
        data-action="media"
        data-service="${h}"
        aria-label="${this._escape(g)}"
        title="${this._escape(g)}"
        ${i?"disabled":""}
      >${this._icon(p)}</button>
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
            <small>${Number.isFinite(c)?`Volumen ${Math.round(c*100)}%`:"Volumen no informado"}</small>
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
    `}_renderSceneBlock({eyebrow:e,title:t,scenes:i,className:a}){const r=this._config(),s=i.find(d=>this._sceneStatus(d).active),o=this._pendingAction===r.powerOffScript,n=r.sceneControlEntities.some(d=>{var h;return((h=this._state(d))==null?void 0:h.state)==="on"}),c=!!this._pendingAction||!n;return`
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
              ${c&&!o?"disabled":""}
            >
              <span>${this._icon("power")}</span>
              <strong>${o?"Apagando…":"Apagar escena"}</strong>
            </button>
          </div>
        </div>
        <div class="scene-grid">${i.map(d=>this._renderSceneButton(d)).join("")}</div>
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
    `}_renderActivity(){const e=this._energyRangeDefinition(),t=this._energyData.map(n=>Math.max(0,Number(n.change)||0)),i=t.reduce((n,c)=>n+c,0),a=t.length?i/t.length:0,r=t.length?Math.max(...t):0,s=new Date().toLocaleDateString("es-BO",{month:"short",year:"numeric"}).replace(".",""),o=this._energyRange==="day"?`${t.length} ${t.length===1?"hora":"horas"}`:this._energyRange==="month"?`${t.length} ${t.length===1?"día":"días"}`:`${t.length} ${t.length===1?"mes":"meses"}`;return`
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
            ${[["day","Día"],["month","Mes"],["year","Año"]].map(([n,c])=>`<button class="energy-tab ${this._energyRange===n?"is-active":""}" data-action="energy-range" data-range="${n}" role="tab" aria-selected="${this._energyRange===n}">${c}</button>`).join("")}
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
    `}render(){var p;if(!this.shadowRoot||!this._hass)return;this._captureEnergyChartScroll(),this.setAttribute("data-theme",this._theme);const e=this._config();this.setAttribute("data-panel-kind",e.panelKind);const t=e.staticOnly,i=this._state(e.weather),a=(i==null?void 0:i.attributes)||{},r=i==null?void 0:i.state,s=this._theme==="dark"?"claro":"oscuro",o=[...e.spots,...e.samples,...e.reflector?[e.reflector]:[]],n=o.filter(g=>this._visibleSwitchState(g.entity)==="on").length,c=(p=this._state(e.mediaPlayer))==null?void 0:p.state,d=c==="playing"?"Reproduciendo":c==="paused"?"En pausa":"Detenido",h=this._energyMonthTotal===null?"Sin datos":`${this._formatEnergy(this._energyMonthTotal)} kWh`;this.shadowRoot.innerHTML=`
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
            >${Et}</button>
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
            ${e.panelKind==="general"?"":`<button class="status-pill ${c==="playing"?"is-active":""}" data-action="set-view" data-view="home">
              <span class="status-pill-icon">${this._icon("music")}</span>
              <span><strong>${this._escape(d)}</strong><small>Multimedia</small></span>
            </button>`}
            <button class="status-pill" data-action="set-view" data-view="energy">
              <span class="status-pill-icon">${this._icon("energy")}</span>
              <span><strong data-energy-summary>${this._escape(h)}</strong><small>Este mes</small></span>
            </button>
          </div>`}
          <div class="topbar-meta">
            <time class="header-clock" data-current-time>
              <strong data-clock-time>--:--</strong>
              <span data-clock-period></span>
            </time>
            <div class="header-weather" aria-label="Clima actual: ${this._escape(Ie[r]||r||"Sin datos")}, ${this._escape(a.temperature??"Sin datos")}${this._escape(a.temperature_unit??"°")}">
              <span aria-hidden="true">${this._escape(ge[r]||"·")}</span>
              <strong>${this._escape(a.temperature??"--")}${this._escape(a.temperature_unit??"°")}</strong>
            </div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar a tema ${s}" title="Cambiar a tema ${s}">${Mt}</button>
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
    `,this._updateClock(),requestAnimationFrame(()=>this._restoreEnergyChartScroll())}}customElements.get("showroom-panel")||customElements.define("showroom-panel",At);const zt={"clear-night":"Noche despejada",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvia",snowy:"Nieve","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},Ct={"clear-night":"☾",cloudy:"☁",exceptional:"!",fog:"≋",hail:"◆",lightning:"ϟ","lightning-rainy":"ϟ",partlycloudy:"◒",pouring:"☂",rainy:"☂",snowy:"❄","snowy-rainy":"❄",sunny:"☀",windy:"≈","windy-variant":"≈"},Tt='<svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',Nt='<svg class="theme-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><g class="theme-icon-sun"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></g><path class="theme-icon-moon" d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',Pe={bulb:'<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5M9 18h6M10 22h4"/>',panel:'<rect width="18" height="18" x="3" y="3" rx="3"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',corridor:'<path d="M4 3h16v18H4V3Zm2 2v14h5V5H6Zm7 0v14h5V5h-5Z"/>',workshop:'<path d="M3 7l9-5 9 5v14H3V7Zm2 1.2V19h4v-6h6v6h4V8.2l-7-3.9-7 3.9Z"/>',power:'<path d="M12 2v10M18.4 6.6a9 9 0 1 1-12.8 0"/>',energy:'<path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z"/>',shield:'<path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/>',office:'<path d="M3 4h18v16H3V4Zm4 4h4v3H7V8Zm6 0h4v3h-4V8ZM7 13h4v3H7v-3Zm6 0h4v3h-4v-3Z"/>'},U=l=>`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:0}).format(l)} W`;class Dt extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._started=!1,this._renderQueued=!1,this._pending=new Map,this._errors=new Map,this._pendingAction="",this._confirmAction="",this._toast="",this._toastTimer=null,this._theme=this._loadTheme(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",e=>this._handleClick(e))}set hass(e){var t;this._hass=e,this._started||(this._started=!0),this.isConnected&&((t=this.shadowRoot)!=null&&t.querySelector(".operations-shell")?this._updatePresentation():this._render())}get hass(){return this._hass}set panel(e){this._panel=e&&typeof e=="object"?e:{},this.isConnected&&this._render()}get panel(){return this._panel}set theme(e){if(e==="dark"||e==="light"){const t=this._theme!==e;this._theme=e,this.setAttribute("data-theme",e),this._saveTheme(),t&&this.isConnected&&this._queueRender()}}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._hass&&this._render()}disconnectedCallback(){this._toastTimer&&window.clearTimeout(this._toastTimer)}_kind(){return String(this._panel.panel_kind||this._panel.panelKind||"offices").toLowerCase()}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_toggleTheme(){this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))}_state(e){var t,i;return(i=(t=this._hass)==null?void 0:t.states)==null?void 0:i[e]}_isOn(e){var t;return((t=this._state(e))==null?void 0:t.state)==="on"||this._pending.get(e)==="on"}_unavailable(e){var i;const t=(i=this._state(e))==null?void 0:i.state;return!t||t==="unknown"||t==="unavailable"}_escape(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_icon(e){return`<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${Pe[e]||Pe.bulb}</svg>`}_devices(){const e=this._kind(),t=this._panel.power_watts||this._panel.powerWatts||this._panel.device_watts||{},i=a=>({...a,watts:a.watts??(Number(t[a.entity]||0)||void 0)});return e==="offices"?(this._panel.areas||[]).flatMap(a=>(a.devices||[]).map(i)):e==="recording"?(this._panel.switches||[]).map(i):(this._panel.zones||[]).flatMap(a=>(a.devices||(a.entities||[]).map(r=>({entity:r,name:r}))).map(i))}_powerTotal(e=this._devices()){return e.reduce((t,i)=>t+Number(i.watts||0),0)}_powerActive(e=this._devices()){return e.filter(t=>this._isOn(t.entity)).reduce((t,i)=>t+Number(i.watts||0),0)}_weather(){const e=this._state(this._panel.weather||"weather.forecast_casa");return{temperature:((e==null?void 0:e.attributes)||{}).temperature??"—",condition:zt[String((e==null?void 0:e.state)||"")]||String((e==null?void 0:e.state)||"Sin datos")}}_queueRender(){this._renderQueued||(this._renderQueued=!0,requestAnimationFrame(()=>{this._renderQueued=!1,this._render()}))}_render(){var p;if(!this.shadowRoot)return;const e=this._weather(),t=this._devices(),i=this._kind(),a=this._panel.title||(i==="recording"?"Sala de grabación":i==="control"?"Control general":"Oficinas"),r=this._panel.subtitle||"Control operativo",s=t.filter(g=>this._isOn(g.entity)).length,o=this._powerActive(t),n=this._powerTotal(t),c=new Date,d=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit"}).format(c);this.setAttribute("data-kind",this._kind()),this.setAttribute("data-theme",this._theme),this.shadowRoot.innerHTML=`
      <style>
        :host{display:block;min-height:100dvh;color:var(--wit-text-primary,#f5f6f4);background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums}:host([data-theme=light]){color:#172129;background:linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)}:host([data-theme=light]) .topbar,:host([data-theme=light]) .hero,:host([data-theme=light]) .surface{background:rgba(255,255,255,.9);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .device,:host([data-theme=light]) .action,:host([data-theme=light]) .area{background:rgba(247,250,250,.95);border-color:rgba(23,33,41,.12);color:#172129}:host([data-theme=light]) .device-copy small,:host([data-theme=light]) .action small,:host([data-theme=light]) .area-head small,:host([data-theme=light]) .section-head small,:host([data-theme=light]) .hero p{color:#5f6b70}:host([data-theme=light]) .metric,:host([data-theme=light]) .weather{color:#526066;background:rgba(23,33,41,.06);border-color:rgba(23,33,41,.12)}
        *{box-sizing:border-box}button{font:inherit;color:inherit}button:focus-visible{outline:2px solid var(--wit-accent,#f26522);outline-offset:2px}.operations-shell{min-height:100dvh}.topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;gap:14px;min-height:66px;padding:12px clamp(16px,3vw,36px);border-bottom:1px solid rgba(255,255,255,.08);background:rgba(7,17,24,.84);backdrop-filter:blur(18px)}.menu{width:44px;height:44px;border:1px solid rgba(255,255,255,.12);border-radius:50%;background:rgba(255,255,255,.04);cursor:pointer}.menu span,.menu span:before,.menu span:after{display:block;width:18px;height:2px;margin:auto;background:currentColor;content:""}.menu span:before{transform:translateY(-6px)}.menu span:after{transform:translateY(4px)}.brand{min-width:0}.eyebrow{display:block;color:#f26522;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.brand h1{margin:2px 0 0;font-size:clamp(20px,2.5vw,30px);letter-spacing:-.03em}.top-meta{display:flex;align-items:center;gap:10px;margin-left:auto}.weather,.metric{padding:9px 13px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.04);font-size:12px;color:#adb4b6}.weather strong,.metric strong{color:#f5f6f4;margin-right:5px}.dashboard{width:min(1480px,100%);margin:auto;padding:clamp(16px,2.5vw,32px)}.hero{display:grid;grid-template-columns:1fr auto;gap:18px;align-items:center;margin-bottom:18px;padding:24px;border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.86);box-shadow:0 16px 40px rgba(0,0,0,.24)}.hero h2{margin:4px 0 0;font-size:clamp(25px,4vw,40px);letter-spacing:-.04em}.hero p{margin:7px 0 0;color:#adb4b6}.metrics{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.surface{border:1px solid rgba(255,255,255,.08);border-radius:22px;background:rgba(16,25,30,.82);box-shadow:0 16px 40px rgba(0,0,0,.2);overflow:hidden}.section{margin-top:16px;padding:18px}.section-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.section-head h3{margin:0;font-size:15px}.section-head small{color:#747e82}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:10px}.device{min-height:78px;padding:13px;display:grid;grid-template-columns:38px 1fr auto;align-items:center;gap:11px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(27,40,46,.72);text-align:left;cursor:pointer;transition:transform 160ms,background 160ms,border-color 160ms}.device:hover:not(:disabled){transform:translateY(-1px);background:rgba(255,255,255,.07);border-color:rgba(242,101,34,.42)}.device.is-on{border-color:rgba(242,101,34,.5);background:rgba(242,101,34,.12)}.device.is-error{border-color:#ef4444}.device:disabled{cursor:not-allowed;opacity:.55}.device-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:11px;background:rgba(255,255,255,.06);color:#747e82}.is-on .device-icon{color:#f26522;background:rgba(242,101,34,.14)}.device-copy strong,.device-copy small{display:block}.device-copy strong{font-size:12px}.device-copy small{margin-top:4px;color:#747e82;font-size:10px}.device-state{text-align:right;color:#adb4b6;font-size:10px}.is-on .device-state{color:#f26522}.area{padding:16px;border:1px solid rgba(255,255,255,.07);border-radius:18px;background:rgba(7,17,24,.2)}.area+.area{margin-top:12px}.area-head{display:flex;justify-content:space-between;gap:10px;margin-bottom:12px}.area-head strong{font-size:14px}.area-head small{display:block;margin-top:4px;color:#747e82}.env{display:flex;gap:8px;flex-wrap:wrap;color:#adb4b6;font-size:11px}.env span{padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.05)}.action{min-height:70px;padding:14px;border:1px solid rgba(255,255,255,.08);border-radius:15px;background:rgba(27,40,46,.72);text-align:left;cursor:pointer}.action:hover:not(:disabled){border-color:rgba(242,101,34,.42);background:rgba(255,255,255,.07)}.action.danger{border-color:rgba(239,68,68,.32)}.action strong,.action small{display:block}.action strong{font-size:12px}.action small{margin-top:5px;color:#747e82;font-size:10px}.action .action-state{margin-top:7px;color:#f26522;font-size:10px}.toast{position:fixed;z-index:20;right:18px;bottom:18px;max-width:min(420px,calc(100vw - 36px));padding:13px 16px;border:1px solid rgba(242,101,34,.45);border-radius:14px;background:#162126;color:#f5f6f4;box-shadow:0 16px 42px rgba(0,0,0,.38);font-size:12px}@media(max-width:700px){.topbar{align-items:flex-start}.top-meta{display:none}.hero{grid-template-columns:1fr;padding:18px}.metrics{justify-content:flex-start}.dashboard{padding:14px}.grid{grid-template-columns:1fr}}
      </style>
      <div class="operations-shell">
        <header class="topbar">
          <div class="topbar-start">
            <button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de navegación de Home Assistant" title="Abrir menú">${Tt}</button>
            <div class="brand" aria-label="Witmind ${this._escape(a)}"><strong class="brand-wordmark">WITMIND</strong><span>WTX · MDTC</span></div>
          </div>
          <div class="status-strip" aria-label="Resumen de ${this._escape(a)}">
            <button class="status-pill ${s?"is-active":""}" type="button"><span class="status-pill-icon">${this._icon("bulb")}</span><span><strong><span data-total-on>${s}</span> enc. · <span data-total-off>${t.length-s}</span> apag.</strong><small>Circuitos</small></span></button>
            <button class="status-pill ${o?"is-active":""}" type="button"><span class="status-pill-icon">${this._icon("power")}</span><span><strong data-active-power>${U(o)}</strong><small>Activos</small></span></button>
            <button class="status-pill" type="button"><span class="status-pill-icon">${this._icon("energy")}</span><span><strong data-installed-power>${U(n)}</strong><small>Instalados</small></span></button>
          </div>
          <div class="topbar-meta">
            <time class="header-clock"><strong>${this._escape(d)}</strong></time>
            <div class="header-weather" aria-label="Clima actual: ${this._escape(e.condition)}, ${this._escape(e.temperature)}°"><span aria-hidden="true">${this._escape(Ct[String(((p=this._state(this._panel.weather||"weather.forecast_casa"))==null?void 0:p.state)||"")]||"·")}</span><strong>${this._escape(e.temperature)}°</strong></div>
            <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema" title="Cambiar tema">${Nt}</button>
          </div>
        </header>
        <main class="dashboard">
          <section class="workspace-heading"><div><span class="section-kicker">${this._escape(r)}</span><h1>${this._escape(a)}</h1></div><span class="workspace-summary">${t.length} circuitos · ${U(n)}</span></section>
          ${i==="offices"?this._renderOffices():i==="recording"?this._renderRecording():this._renderControl()}
        </main>
        ${this._toast?`<div class="toast" role="status">${this._escape(this._toast)}</div>`:""}
      </div>
    `;const h=document.createElement("style");h.textContent=`
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
    `,this.shadowRoot.append(h)}_renderOffices(){const e=this._panel.areas||[];return`<section class="view-panel offices-view" aria-label="Zonas operativas"><div class="section-heading compact-heading offices-section-heading"><div><span class="section-kicker">Zonas operativas</span><h2>Distribución de circuitos</h2></div><span>${e.reduce((i,a)=>i+(a.devices||[]).length,0)} circuitos</span></div><div class="lighting-layout offices-layout">${e.map(i=>{var n,c;const a=i.devices||[],r=i.environment||{},s=r.temperature?(n=this._state(r.temperature))==null?void 0:n.state:"",o=r.humidity?(c=this._state(r.humidity))==null?void 0:c.state:"";return`<section class="surface control-section office-section"><div class="section-heading compact-heading"><div><span class="eyebrow">Zona</span><h2>${this._escape(i.name)}</h2></div><div class="area-meta">${s?`<span>${this._escape(s)} °C</span>`:""}${o?`<span>${this._escape(o)} % HR</span>`:""}</div></div>${i.subtitle||i.descriptor?`<p class="area-description">${this._escape(i.subtitle||i.descriptor)}</p>`:""}<div class="device-grid">${a.map(d=>this._renderDevice(d)).join("")}</div></section>`}).join("")}</div></section>`}_renderRecording(){const e=this._panel.switches||[];return`<section class="surface section"><div class="section-head"><div><span class="eyebrow">Cuatro circuitos</span><h3>Sala de grabación</h3></div><button class="action compact-action danger" data-action="run-action" data-action-id="recording-off"><span class="action-icon">${this._icon("power")}</span><span>Apagar todo</span></button></div><div class="grid">${e.map(t=>this._renderDevice(t)).join("")}</div><div class="section-head section-footnote"><small>Estimación instalada: ${U(this._powerTotal(e))}. El valor representa potencia nominal, no consumo medido.</small></div></section>`}_renderControl(){return`<section class="surface section"><div class="section-head"><div><span class="eyebrow">Escenas y rutinas</span><h3>Control general</h3></div><small>Acciones verificadas</small></div><div class="control-actions">${[...this._panel.main_actions||[],...this._panel.daily_actions||[],...this._panel.danger_action?[this._panel.danger_action]:[]].map(t=>`<button class="action ${t.tone==="danger"?"danger":""}" data-action="run-action" data-action-id="${this._escape(t.id)}" ${this._pendingAction&&this._pendingAction!==t.id?"disabled":""}><span class="action-icon ${t.tone==="danger"?"is-danger":""}">${this._icon(t.icon||(t.tone==="danger"?"power":"bulb"))}</span><span class="action-copy"><strong>${this._escape(t.name)}</strong><small>${this._escape(t.subtitle||"Rutina operativa")}</small></span><span class="action-state">${this._pendingAction===t.id?"Aplicando…":t.tone==="danger"?"Confirmar":"Lista"}</span></button>`).join("")}</div></section><section class="surface section"><div class="section-head"><div><span class="eyebrow">Resumen de zonas</span><h3>Estado actual</h3></div></div>${(this._panel.zones||[]).map(t=>{const i=t.entities||[],a=i.filter(r=>this._isOn(r)).length;return`<div class="area"><div class="area-head"><div><strong>${this._escape(t.name)}</strong><small>${a} de ${i.length} circuitos activos</small></div><span class="device-state">${a?"Activo":"Apagado"}</span></div></div>`}).join("")}</section>${this._confirmAction?`<div class="toast" role="alert"><strong>¿Confirmar ${this._escape(this._confirmAction)}?</strong><button class="action compact-action" data-action="confirm-action" data-action-id="${this._escape(this._confirmAction)}">Confirmar</button><button class="action compact-action" data-action="cancel-action">Cancelar</button></div>`:""}`}_renderDevice(e){const t=this._isOn(e.entity),i=this._unavailable(e.entity),a=this._pending.has(e.entity),r=this._errors.get(e.entity),s=r||(a?t?"Encendiendo…":"Apagando…":i?"No disponible":t?"Encendido":"Apagado");return`<button class="device ${t?"is-on":""} ${a?"is-pending":""} ${r?"is-error":""}" data-action="toggle-switch" data-entity="${this._escape(e.entity)}" aria-pressed="${String(t)}" aria-label="${this._escape(`${e.name}: ${s}`)}" ${i||a?"disabled":""}><span class="device-icon">${this._icon(e.icon||"bulb")}</span><span class="device-copy"><strong>${this._escape(e.name)}</strong><small><span data-device-status="${this._escape(e.entity)}">${this._escape(s)}</span>${e.watts?` · ${U(e.watts)}`:""}</small></span><span class="device-switch" aria-hidden="true"><i></i></span></button>`}_updatePresentation(){var o,n,c,d,h,p;(o=this.shadowRoot)==null||o.querySelectorAll("[data-action=toggle-switch]").forEach(g=>{const u=g.dataset.entity||"",m=this._isOn(u),_=this._unavailable(u),k=this._pending.has(u),S=this._errors.get(u);g.classList.toggle("is-on",m),g.classList.toggle("is-error",!!S),g.disabled=_||k,g.setAttribute("aria-pressed",String(m));const b=g.querySelector("[data-device-status]");b&&(b.textContent=S||(k?m?"Encendiendo…":"Apagando…":_?"No disponible":m?"Encendido":"Apagado"))});const e=this._devices(),t=e.filter(g=>this._isOn(g.entity)).length,i=e.length-t,a=(n=this.shadowRoot)==null?void 0:n.querySelector("[data-total-on]"),r=(c=this.shadowRoot)==null?void 0:c.querySelector("[data-total-off]"),s=(d=this.shadowRoot)==null?void 0:d.querySelector("[data-active-power]");a&&(a.textContent=String(t)),r&&(r.textContent=String(i)),s&&(s.textContent=U(this._powerActive(e))),(h=a==null?void 0:a.closest(".status-pill"))==null||h.classList.toggle("is-active",t>0),(p=s==null?void 0:s.closest(".status-pill"))==null||p.classList.toggle("is-active",this._powerActive(e)>0)}_handleClick(e){const t=e.target.closest("[data-action]");if(!t||!this._hass)return;const i=t.dataset.action;if(i==="toggle-menu"){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}));return}if(i==="toggle-theme"){this._toggleTheme();return}if(i==="toggle-switch"){this._toggleSwitch(t.dataset.entity||"");return}if(i==="run-action"){const a=t.dataset.actionId||"",r=this._findAction(a);(r==null?void 0:r.tone)==="danger"?this._confirmAction=a:this._executeAction(r),this._queueRender();return}if(i==="confirm-action"){const a=this._findAction(t.dataset.actionId||this._confirmAction);this._confirmAction="",this._executeAction(a),this._queueRender();return}i==="cancel-action"&&(this._confirmAction="",this._queueRender())}_findAction(e){const t=[...this._panel.main_actions||[],...this._panel.daily_actions||[],...this._panel.danger_action?[this._panel.danger_action]:[]];return e==="recording-off"?{id:e,name:"Apagar todo",subtitle:"Apaga los cuatro circuitos",tone:"danger",off_entities:(this._panel.switches||[]).map(i=>i.entity)}:t.find(i=>i.id===e)||null}async _toggleSwitch(e){var i;if(!e||this._pending.has(e)||!((i=this._hass)!=null&&i.callService))return;const t=this._isOn(e)?"off":"on";this._pending.set(e,t),this._errors.delete(e),this._updatePresentation();try{const[a]=e.split(".");if(await this._hass.callService(a,t==="on"?"turn_on":"turn_off",{entity_id:e}),!await this._waitForState(e,t))throw new Error("Home Assistant no confirmó el estado solicitado")}catch(a){this._errors.set(e,a instanceof Error?a.message:"No se pudo cambiar el circuito"),this._showToast(this._errors.get(e)||"No se pudo cambiar el circuito")}finally{this._pending.delete(e),this._updatePresentation()}}async _executeAction(e){var i;if(!e||this._pendingAction||!((i=this._hass)!=null&&i.callService))return;this._pendingAction=e.id,this._queueRender();const t=new Map;(e.on_entities||[]).forEach(a=>t.set(a,"on")),(e.off_entities||[]).forEach(a=>t.set(a,"off"));try{for(const r of e.service_entities||[]){const[s]=r.split(".");await this._hass.callService(s,"turn_on",{entity_id:r})}for(const[r,s]of t){const[o]=r.split(".");await this._hass.callService(o,s==="on"?"turn_on":"turn_off",{entity_id:r})}if((await Promise.all([...t].map(([r,s])=>this._waitForState(r,s)))).some(r=>!r))throw new Error("No todos los circuitos confirmaron el cambio");this._showToast(`${e.name} aplicado.`)}catch(a){this._showToast(a instanceof Error?a.message:"No se pudo ejecutar la acción")}finally{this._pendingAction="",this._queueRender()}}async _waitForState(e,t){var i;for(let a=0;a<20;a+=1){if(((i=this._state(e))==null?void 0:i.state)===t)return!0;await new Promise(r=>window.setTimeout(r,250))}return!1}_showToast(e){this._toast=e,this._toastTimer&&window.clearTimeout(this._toastTimer),this._toastTimer=window.setTimeout(()=>{this._toast="",this._queueRender()},4200),this._queueRender()}}customElements.get("witmind-operations-panel")||customElements.define("witmind-operations-panel",Dt);function ht(l,e){var t,i,a,r,s,o,n;if(!e)return"No hay una regla en edición.";if(l===1){const c=String(((t=e.source)==null?void 0:t.entity_id)||"").trim();return c?c.startsWith("sensor.")?"":"La entidad debe comenzar con sensor.*":"Selecciona un sensor de temperatura."}if(l===2){const c=e.condition,d=c.type;if(!["above","below","outside","inside"].includes(d))return"Tipo de condición no soportado.";const h=Number(c.hysteresis);if(!Number.isFinite(h)||h<0||h>50)return"La histéresis debe ser un número entre 0 y 50 °C.";const p=Number(c.for_seconds);if(!Number.isFinite(p)||p<0||p>86400)return"La duración debe estar entre 0 y 86 400 segundos (24 h).";if(["above","below"].includes(d)){const u=Number(c.threshold);if(!Number.isFinite(u))return"Introduce un umbral de temperatura válido."}else{const u=Number(c.lower),m=Number(c.upper);if(!Number.isFinite(u)||!Number.isFinite(m))return"Introduce límites numéricos válidos para el rango.";if(u>=m)return"El límite inferior debe ser estrictamente menor al superior.";if(d==="outside"&&h*2>=m-u)return"La histéresis es demasiado grande para ese rango (debe ser menor a la mitad del intervalo)."}const g=((i=e.behavior)==null?void 0:i.notification_mode)||"once";if(!["once","repeat","daily"].includes(g))return"Frecuencia de avisos no soportada.";if(g==="repeat"){const u=Number(((a=e.behavior)==null?void 0:a.reminder_interval_seconds)||0);if(!Number.isFinite(u)||u<60||u>604800)return"Para repetir avisos, indica un intervalo de al menos 1 minuto."}return""}if(l===3){const c=e.recipients||[];if(!c.length)return"Selecciona al menos un dispositivo destinatario.";if(c.length>25)return"Máximo 25 destinatarios por regla.";for(const d of c)if(!d.notify_entity_id&&!d.legacy_service)return`El dispositivo ${d.name||"seleccionado"} no tiene entidad ni acción notify válida.`;return""}if(l===4){const c=String(e.name||"").trim();if(!c)return"La regla necesita un nombre interno.";if(c.length>120)return"El nombre no puede superar los 120 caracteres.";if(String(((r=e.message)==null?void 0:r.title)||"").trim().length>240)return"El título no puede superar los 240 caracteres.";const h=String(((s=e.message)==null?void 0:s.body)||"").trim();return h?h.length>2e3?"El cuerpo del mensaje no puede superar los 2000 caracteres.":String(((o=e.message)==null?void 0:o.recovery_title)||"").trim().length>240?"El título de recuperación no puede superar los 240 caracteres.":String(((n=e.message)==null?void 0:n.recovery_body)||"").trim().length>2e3?"El cuerpo de recuperación no puede superar los 2000 caracteres.":"":"El mensaje de la notificación no puede quedar vacío."}return""}function Lt(l){for(let e=1;e<=4;e++){const t=ht(e,l);if(t)return{valid:!1,step:e,error:t}}return{valid:!0,step:0,error:""}}function It(l){var p,g;const e=String(l.name||"").trim(),t=l.condition,i=t.type,a=Math.max(0,Math.min(50,Number(t.hysteresis||0))),r=Math.max(0,Math.min(86400,Math.round(Number(t.for_seconds||0)))),s={type:i,hysteresis:a,for_seconds:r};["above","below"].includes(i)?s.threshold=Number(t.threshold):(s.lower=Number(t.lower),s.upper=Number(t.upper));const o=["once","repeat","daily"].includes(l.behavior.notification_mode)?l.behavior.notification_mode:"once";let n=0;o==="daily"?n=86400:o==="repeat"&&(n=Math.max(60,Math.min(604800,Math.round(Number(l.behavior.reminder_interval_seconds||1800)))));const c=(l.recipients||[]).map(u=>({target_id:u.target_id||void 0,identity_keys:Array.isArray(u.identity_keys)?[...u.identity_keys]:[],device_id:u.device_id||void 0,notify_entity_id:u.notify_entity_id||void 0,legacy_service:u.legacy_service||void 0,name:String(u.name||u.notify_entity_id||u.legacy_service||"Dispositivo"),custom_name:u.custom_name?String(u.custom_name).trim():null})),d=String(((p=l.message)==null?void 0:p.recovery_title)||"").trim(),h=String(((g=l.message)==null?void 0:g.recovery_body)||"").trim();return{name:e,enabled:!!l.enabled,source:{entity_id:l.source.entity_id,display_name:l.source.display_name||l.source.entity_id,area_name:l.source.area_name||null},condition:s,recipients:c,message:{title:String(l.message.title||e).trim(),body:String(l.message.body||"").trim(),recovery_title:d||null,recovery_body:h||null},behavior:{notification_mode:o,reminder_interval_seconds:n,notify_recovery:!!l.behavior.notify_recovery}}}function Rt(l){if(!l)return"—";const e=l,t=Math.round((Number(e.for_seconds)||0)/60),i=t?` · ${t} min`:"";return e.type==="above"?`≥ ${e.threshold??"—"} °C${i}`:e.type==="below"?`≤ ${e.threshold??"—"} °C${i}`:e.type==="outside"?`Fuera de ${e.lower??"—"}–${e.upper??"—"} °C${i}`:e.type==="inside"?`Dentro de ${e.lower??"—"}–${e.upper??"—"} °C${i}`:"—"}function Oe(l){var h,p,g,u,m;if(!l)return"";const e=l.condition,t=((h=l.source)==null?void 0:h.display_name)||((p=l.source)==null?void 0:p.entity_id)||"El sensor",i=Math.round(Number(e.for_seconds||0)/60),a=i?` durante ${i} minuto${i===1?"":"s"}`:"",r=Number(e.hysteresis||0),s=((g=l.behavior)==null?void 0:g.notification_mode)||"once";let o=" Enviará un solo aviso por incidencia.";if(s==="repeat"){const _=Math.max(1,Math.round(Number(((u=l.behavior)==null?void 0:u.reminder_interval_seconds)||1800)/60));o=` Mientras la incidencia siga activa, recordará cada ${_} minuto${_===1?"":"s"}.`}else s==="daily"&&(o=" Mientras la incidencia siga activa, enviará como máximo un recordatorio cada 24 horas.");const n=(m=l.behavior)!=null&&m.notify_recovery?" También avisará cuando la incidencia se considere resuelta.":"",c=" Después de resolverse, la regla queda lista automáticamente para detectar una incidencia nueva.";let d="";return e.type==="above"?d=`${t} activará la alerta al alcanzar o superar ${e.threshold} °C${a}. Con una histéresis de ${r} °C, se considera resuelta a ${Number(e.threshold)-r} °C o menos.`:e.type==="below"?d=`${t} activará la alerta al alcanzar o bajar de ${e.threshold} °C${a}. Con una histéresis de ${r} °C, se considera resuelta a ${Number(e.threshold)+r} °C o más.`:e.type==="outside"?d=`${t} activará la alerta al salir de ${e.lower}–${e.upper} °C${a}. Con histéresis de ${r} °C, se considera resuelta al retornar al intervalo seguro.`:d=`${t} activará la alerta al entrar en ${e.lower}–${e.upper} °C${a}. Con histéresis de ${r} °C, se considera resuelta al salir del intervalo seguro.`,`${d}${o}${n}${c}`}function Pt(l){const e=(l==null?void 0:l.notification_mode)||"once";return e==="once"?"Una vez por incidencia":e==="daily"?"Cada 24 h mientras siga activa":`Cada ${Math.max(1,Math.round(Number((l==null?void 0:l.reminder_interval_seconds)||1800)/60))} min mientras siga activa`}function ue(l,e,t="procesando…"){if(!l)return"";const i=Date.parse(l);if(!Number.isFinite(i))return"";const a=Math.max(0,i-e);if(a<=0)return t;const r=Math.ceil(a/1e3);if(r>=3600){const n=Math.floor(r/3600),c=Math.floor(r%3600/60);return`${n} h ${c} min`}const s=Math.floor(r/60),o=String(r%60).padStart(2,"0");return`${s}:${o}`}function Ot(l){if(l.enabled===!1)return{status:"disabled",label:"Deshabilitada"};const e=l.runtime;return e?e.sending?{status:"sending",label:e.retry_kind==="reminder"?"Enviando recordatorio…":"Enviando alerta…"}:e.retry_at?{status:"retry",label:`${e.active?"Alerta activa · ":""}Error de envío`,countdownType:"retry",countdownValue:e.retry_at}:e.active?e.next_reminder_at?{status:"alert",label:"Alerta activa",countdownType:"reminder",countdownValue:e.next_reminder_at}:{status:"alert",label:"Alerta activa"}:e.pending?{status:"pending",label:"Temporizando",countdownType:"pending",countdownValue:e.pending_until}:{status:"normal",label:"En espera"}:{status:"normal",label:"En espera"}}function Ft(l){return{duration:{title:"¿Qué significa “Durante”?",text:"Es el tiempo que la condición debe mantenerse de forma continua antes del primer aviso.",example:"Ejemplo: ≥ 21 °C durante 2 min. Si llega a 21 °C pero baja antes de completar 2 minutos, no se envía nada y el conteo vuelve a empezar cuando alcance nuevamente 21 °C."},hysteresis:{title:"¿Qué es la histéresis?",text:"Es un margen usado solo para decidir cuándo una incidencia ya terminó. Evita que una temperatura que oscila alrededor del umbral abra y cierre alertas repetidamente.",example:"Ejemplo: alerta ≥ 21 °C con histéresis 0,5 °C. La alerta empieza en 21 °C, pero no se considera resuelta hasta bajar a 20,5 °C o menos. Entre 20,5 y 21 °C sigue siendo la misma incidencia."},frequency:{title:"Frecuencia de avisos",text:"La frecuencia solo controla qué ocurre después del primer aviso mientras la misma incidencia continúa activa.",example:"Una vez por incidencia: un solo aviso. Repetir: vuelve a avisar cada X minutos. Cada 24 h: si el problema sigue activo 24 horas después, envía otro recordatorio. Al resolverse, cualquier opción queda lista automáticamente para una incidencia nueva."},recovery:{title:"Aviso al volver a la normalidad",text:"Es un mensaje adicional de cierre. No controla el rearme ni los recordatorios.",example:"Ejemplo: recibes una alerta por temperatura alta. Cuando baja hasta el valor de recuperación definido por la histéresis, puedes recibir otro mensaje indicando que la situación volvió a la normalidad. La regla queda rearmada automáticamente aunque esta opción esté desactivada."}}[l]||null}const f=l=>String(l??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"),O=(l,e=[])=>{if(Array.isArray(l))return l;for(const t of e)if(Array.isArray(l==null?void 0:l[t]))return l[t];return[]},qt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',Wt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>',me='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/></svg>',se='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 17h4"/></svg>',Ht='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 3v10m0 0a4 4 0 1 0 4 4 4 4 0 0 0-4-4Zm3-7h3M15 9h2"/></svg>',Fe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m4 20 4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Zm9.5-12.5 3 3"/></svg>',jt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5M14 11v5"/></svg>',Bt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m3 11 18-8-8 18-2-8-8-2Zm8 2 5-5"/></svg>',qe='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 3 2.5 20h19L12 3Zm0 6v5m0 3h.01"/></svg>',We='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>';class Ut extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._loaded=!1,this._loading=!1,this._busy=!1,this._error="",this._theme=this._loadTheme(),this._calendar=[],this._todayPayload=null,this._year="all",this._backendType="witmind_calendar",this._modal=null,this._toast="",this._toastAction="",this._toastTimer=null,this._undoDeletedRecord=null,this._notificationLoaded=!1,this._notificationLoading=!1,this._notificationTab="rules",this._rules=[],this._targets=[],this._sensors=[],this._history=[],this._historyTypeFilter="all",this._historyStatusFilter="all",this._historySearch="",this._historyLimit=50,this._notificationBusy="",this._notificationEditorOpen=!1,this._notificationEditorStep=1,this._editingRuleId=null,this._ruleDraft=null,this._deleteRuleId=null,this._renameTargetId=null,this._renameValue="",this._renameError="",this._editorError="",this._deleteError="",this._helpTopic=null,this._recoveryAccordionOpen=!1,this._notificationToast=null,this._notificationToastTimer=null,this._notificationRefreshTimer=null,this._notificationCountdownTimer=null,this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",e=>this._click(e)),this.shadowRoot.addEventListener("submit",e=>this._submit(e)),this.shadowRoot.addEventListener("input",e=>this._input(e)),this.shadowRoot.addEventListener("change",e=>this._change(e))}set hass(e){var a;const t=this._statesSignature(this._hass);if(this._hass=e,!this.isConnected)return;const i=this._statesSignature(e);(a=this.shadowRoot)!=null&&a.querySelector(".admin-shell")?t!==i&&!this._hasLiveInteraction()&&(this._render(),this._applyThemeStyles()):(this._render(),this._applyThemeStyles()),e&&!this._isLoadedForKind()&&this._load()}get hass(){return this._hass}set panel(e){this._panel=e||{},this._loaded=!1,this._notificationLoaded=!1,this.isConnected&&(this._render(),this._applyThemeStyles(),this._hass&&this._load())}get panel(){return this._panel}set theme(e){if(e==="dark"||e==="light"){const t=this._theme!==e;this._theme=e,this.setAttribute("data-theme",e),this._saveTheme(),t&&this.isConnected&&(this._render(),this._applyThemeStyles())}}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._startCountdownTimer(),this._render(),this._applyThemeStyles(),this._hass&&!this._isLoadedForKind()&&this._load()}disconnectedCallback(){var e;(e=this._calendarUnsubscribe)==null||e.call(this),this._calendarUnsubscribe=void 0,this._notificationUnsubscribe&&(this._notificationUnsubscribe(),this._notificationUnsubscribe=void 0),clearTimeout(this._toastTimer),clearTimeout(this._notificationToastTimer),clearTimeout(this._notificationRefreshTimer),clearInterval(this._notificationCountdownTimer),this._notificationRefreshTimer=null,this._notificationCountdownTimer=null}_kind(){return String(this._panel.panel_kind||this._panel.panelKind||"calendar").toLowerCase()}_isLoadedForKind(){return this._kind()==="notifications"?this._notificationLoaded:this._loaded}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_toggleTheme(){this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))}_applyThemeStyles(){const e=this._theme==="light";this.style.color=e?"#172129":"",this.style.background=e?"linear-gradient(155deg,#f4f7f7,#e9eeee 62%,#dde5e5)":""}_title(){return this._kind()==="notifications"?"Notificaciones Witmind":"Calendario laboral"}_subtitle(){return this._kind()==="notifications"?"Centro de avisos":"Planificación operativa"}_admin(){var e,t;return((t=(e=this._hass)==null?void 0:e.user)==null?void 0:t.is_admin)!==!1}_hasLiveModal(){var e;return!!(this._modal&&((e=this.shadowRoot)!=null&&e.querySelector(".modal-backdrop")))}_hasLiveInteraction(){return!!(this._hasLiveModal()||this._notificationEditorOpen||this._deleteRuleId||this._renameTargetId||this._helpTopic)}_statesSignature(e){var r,s,o,n,c;if(!(e!=null&&e.states))return"";if(this._kind()==="notifications"){const d=[];for(const h of this._rules){const p=e.states[h.source.entity_id];p&&d.push(`${h.source.entity_id}:${p.state}`)}if((s=(r=this._ruleDraft)==null?void 0:r.source)!=null&&s.entity_id){const h=e.states[this._ruleDraft.source.entity_id];h&&d.push(`draft:${this._ruleDraft.source.entity_id}:${h.state}`)}return d.join("|")}const t=((o=e.states["binary_sensor.dia_no_laborable"])==null?void 0:o.state)||"",i=((n=e.states["binary_sensor.bloqueo_automatizaciones_laborales"])==null?void 0:n.state)||"",a=((c=e.states["automation.taller_ciclo_10s"])==null?void 0:c.state)||"";return`${t}:${i}:${a}`}async _request(e,t={}){var a,r;const i=(r=(a=this._hass)==null?void 0:a.connection)==null?void 0:r.sendMessagePromise;if(!i)throw new Error("Conexión de Home Assistant no disponible");return i({type:e,...t})}_showToast(e,t=""){clearTimeout(this._toastTimer),this._toast=e,this._toastAction=t,this._render(),this._toastTimer=setTimeout(()=>{this._toast="",this._toastAction="",this._render()},8e3)}_showNotificationToast(e,t="success"){clearTimeout(this._notificationToastTimer),this._notificationToast={message:e,type:t},this._hasLiveInteraction()||this._render(),this._notificationToastTimer=setTimeout(()=>{this._notificationToast=null,this._hasLiveInteraction()||this._render()},5200)}async _load(){this._kind()==="notifications"?await this._loadNotifications(!0):await this._loadCalendar()}async _loadCalendar(){var e,t;if(!this._loading){this._loading=!0,this._error="",this._hasLiveModal()||this._render();try{let i=null;try{i=await this._request("witmind_calendar/get"),this._backendType="witmind_calendar"}catch{i=await this._request("calendario_laboral/get"),this._backendType="calendario_laboral"}if(this._todayPayload=i||{},this._calendar=O(i,["holidays","records","items","events"]).slice().sort((a,r)=>String((a==null?void 0:a.date)||"").localeCompare(String((r==null?void 0:r.date)||""))),!this._calendarUnsubscribe&&((t=(e=this._hass)==null?void 0:e.connection)!=null&&t.subscribeEvents))try{const a=await this._hass.connection.subscribeEvents(()=>void this._loadCalendar(),"witmind_calendar_updated"),r=await this._hass.connection.subscribeEvents(()=>void this._loadCalendar(),"calendario_laboral_updated");this._calendarUnsubscribe=()=>{typeof a=="function"&&a(),typeof r=="function"&&r()}}catch{}this._loaded=!0}catch(i){this._error=i instanceof Error?i.message:"No se pudieron cargar los datos del calendario"}finally{this._loading=!1,this._hasLiveModal()||this._render()}}}async _loadNotifications(e=!1){if(!this._notificationLoading){this._notificationLoading=!0,this._error="",e&&!this._hasLiveInteraction()&&this._render();try{const[t,i,a,r]=await Promise.all([this._request("witmind_notifications/rules/list"),this._request("witmind_notifications/targets/list"),this._request("witmind_notifications/sensors/list"),this._request("witmind_notifications/history/list",{limit:150})]);this._rules=O(t,["rules"]),this._targets=O(i,["targets"]),this._sensors=O(a,["sensors"]),this._history=O(r,["history","items"]),this._subscribeNotificationEvents(),this._notificationLoaded=!0}catch(t){this._error=t instanceof Error?t.message:"No se pudo conectar con witmind_notifications"}finally{this._notificationLoading=!1,this._hasLiveInteraction()||this._render()}}}_subscribeNotificationEvents(){var e,t;if(!(this._notificationUnsubscribe||!((t=(e=this._hass)==null?void 0:e.connection)!=null&&t.subscribeEvents)))try{this._hass.connection.subscribeEvents(()=>this._scheduleNotificationRefresh(),"witmind_notifications_updated").then(i=>{typeof i=="function"&&(this._notificationUnsubscribe=i)})}catch(i){console.warn("Witmind Notifications: suscripción de eventos no disponible",i)}}_scheduleNotificationRefresh(){clearTimeout(this._notificationRefreshTimer),this._notificationRefreshTimer=setTimeout(()=>{this._notificationRefreshTimer=null,this._refreshNotificationRuntime()},80)}async _refreshNotificationRuntime(){if(this._hass)try{const[e,t]=await Promise.all([this._request("witmind_notifications/rules/list"),this._request("witmind_notifications/history/list",{limit:150})]);this._rules=O(e,["rules"]),this._history=O(t,["history","items"]),this._hasLiveInteraction()||this._render()}catch(e){console.warn("Witmind Notifications: no se pudo refrescar el estado runtime",e)}}_startCountdownTimer(){this._notificationCountdownTimer||(this._notificationCountdownTimer=setInterval(()=>this._updatePendingCountdowns(),1e3))}_updatePendingCountdowns(){if(!this.shadowRoot)return;const e=Date.now();for(const t of this.shadowRoot.querySelectorAll("[data-pending-until]"))t.textContent=ue(t.dataset.pendingUntil,e,"procesando…");for(const t of this.shadowRoot.querySelectorAll("[data-reminder-at]"))t.textContent=ue(t.dataset.reminderAt,e,"ahora");for(const t of this.shadowRoot.querySelectorAll("[data-retry-at]"))t.textContent=ue(t.dataset.retryAt,e,"ahora")}_preferredSensors(){const e=this._panel.config||this._panel||{},t=Array.isArray(e.preferred_sensors)?e.preferred_sensors:[],i=new Map(t.map((a,r)=>[a.entity_id,{name:a.name,index:r}]));return this._sensors.map(a=>{const r=i.get(a.entity_id);return{...a,display_name:(r==null?void 0:r.name)||a.display_name||a.name,preferred:!!r,preferredIndex:(r==null?void 0:r.index)??9999}}).sort((a,r)=>a.preferred!==r.preferred?a.preferred?-1:1:a.preferred&&r.preferred?(a.preferredIndex??0)-(r.preferredIndex??0):String(a.display_name||a.name).localeCompare(String(r.display_name||r.name),"es"))}_findSensor(e){return e&&this._preferredSensors().find(t=>t.entity_id===e)||null}_liveSensorValue(e){var r,s,o;if(!e)return{value:null,raw:"—",unit:"°C",available:!1};const t=(s=(r=this._hass)==null?void 0:r.states)==null?void 0:s[e.entity_id];if(!t)return{value:e.value??null,raw:e.raw_value||"—",unit:e.unit||"°C",available:!!e.available};const i=Number(t.state),a=Number.isFinite(i)&&!["unknown","unavailable"].includes(String(t.state));return{value:a?i:null,raw:String(t.state),unit:String(((o=t.attributes)==null?void 0:o.unit_of_measurement)||e.unit||"°C"),available:a}}_findTarget(e){return e&&this._targets.find(t=>t.target_id===e||t.key===e||t.device_id===e||t.notify_entity_id===e||t.legacy_service===e)||null}_isRecipientSelected(e){var i;if(!((i=this._ruleDraft)!=null&&i.recipients))return!1;const t=e.target_id||e.key;return this._ruleDraft.recipients.some(a=>a.target_id&&a.target_id===t||a.device_id&&e.device_id&&a.device_id===e.device_id||a.notify_entity_id&&e.notify_entity_id&&a.notify_entity_id===e.notify_entity_id||a.legacy_service&&e.legacy_service&&a.legacy_service===e.legacy_service)}_newDraft(){const e=this._preferredSensors()[0]||null;return{name:e?`Temperatura · ${e.display_name||e.name}`:"Alerta de temperatura",enabled:!0,source:{entity_id:(e==null?void 0:e.entity_id)||"",display_name:(e==null?void 0:e.display_name)||(e==null?void 0:e.name)||"",area_name:(e==null?void 0:e.area_name)||null},condition:{type:"above",threshold:28,lower:18,upper:28,for_seconds:300,hysteresis:.5},recipients:[],message:{title:"Alerta de temperatura",body:"{sensor} alcanzó {value} {unit}. Umbral: {threshold} {unit}.",recovery_title:"",recovery_body:""},behavior:{notification_mode:"once",reminder_interval_seconds:1800,notify_recovery:!1}}}_draftFromRule(e){var s,o,n,c;const t=e.condition||{},i=e.behavior||{},a=e.message||{};let r="once";return["once","repeat","daily"].includes(i.notification_mode)?r=i.notification_mode:Number(i.reminder_interval_seconds??i.cooldown_seconds??0)>0&&(r="repeat"),{name:e.name||"",enabled:e.enabled!==!1,source:{entity_id:((s=e.source)==null?void 0:s.entity_id)||"",display_name:((o=e.source)==null?void 0:o.display_name)||((n=e.source)==null?void 0:n.entity_id)||"",area_name:((c=e.source)==null?void 0:c.area_name)||null},condition:{type:t.type||"above",threshold:t.threshold??28,lower:t.lower??18,upper:t.upper??28,for_seconds:t.for_seconds??300,hysteresis:t.hysteresis??.5},recipients:Array.isArray(e.recipients)?JSON.parse(JSON.stringify(e.recipients)):[],message:{title:a.title||e.name||"Alerta de temperatura",body:a.body||"{sensor}: {value} {unit}",recovery_title:a.recovery_title||"",recovery_body:a.recovery_body||""},behavior:{notification_mode:r,reminder_interval_seconds:Number(i.reminder_interval_seconds??i.cooldown_seconds??1800)||1800,notify_recovery:!!i.notify_recovery}}}_render(){if(!this.shadowRoot)return;const e=this._kind();this.setAttribute("data-theme",this._theme),this.setAttribute("data-kind",e);const t=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",timeZone:"America/La_Paz"}).format(new Date),i=`
      <header class="topbar signature-topbar">
        <div class="signature-topbar-start">
          <button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${qt}</button>
          <div class="signature-brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div>
        </div>
        <div class="signature-topbar-end">
          <time class="signature-clock">${f(t)}</time>
          <button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${Wt}</button>
        </div>
      </header>
    `,a=e==="notifications",r=`
      <section class="admin-heading">
        <div>
          <span class="eyebrow">${f(this._subtitle())}</span>
          <h1>${f(this._title())}</h1>
          <p>${f(this._panel.description||(a?"Alertas térmicas, destinatarios de la app móvil e historial de incidentes.":"Gestión de días no laborables y pausa de automatizaciones de la empresa."))}</p>
        </div>
        <div class="heading-actions">
          ${!a&&this._admin()?'<button class="primary" data-action="open-add-modal">+ Añadir feriado</button>':""}
          ${a&&this._admin()&&this._notificationTab==="rules"?'<button class="primary" data-action="new-rule">+ Nueva regla</button>':""}
          <button class="refresh" data-action="refresh" ${this._loading||this._notificationLoading?"disabled":""}>
            ${this._loading||this._notificationLoading?"Cargando…":"Actualizar"}
          </button>
        </div>
      </section>
    `,s=a?this._notificationLoading&&!this._notificationLoaded:this._loading&&!this._calendar.length;this.shadowRoot.innerHTML=`
      <style>${this._styles()}</style>
      <div class="admin-shell">
        ${i}
        <main class="dashboard">
          ${r}
          ${this._error?`<div class="error">${f(this._error)}</div>`:""}
          ${s?'<section class="surface empty">Cargando datos de Home Assistant…</section>':a?this._renderNotifications():this._renderCalendar()}
        </main>
        ${this._modal?this._renderCalendarModal():""}
        ${this._notificationEditorOpen?this._renderNotificationEditor():""}
        ${this._deleteRuleId?this._renderDeleteRuleModal():""}
        ${this._renameTargetId?this._renderRenameTargetModal():""}
        ${this._helpTopic?this._renderHelpModal():""}
        ${this._toast?`
          <div class="toast-banner">
            <span>${f(this._toast)}</span>
            ${this._toastAction==="undo"?'<button class="primary small" data-action="undo-delete">Deshacer</button>':""}
          </div>
        `:""}
        ${this._notificationToast?`
          <div class="toast-banner ${this._notificationToast.type}">
            <span>${f(this._notificationToast.message)}</span>
          </div>
        `:""}
      </div>
    `,this._updatePendingCountdowns()}_renderNotifications(){const e=this._rules.filter(o=>o.enabled!==!1).length,t=this._rules.filter(o=>{var n;return o.enabled!==!1&&((n=o.runtime)==null?void 0:n.active)}).length,i=this._targets.filter(o=>o.available).length,a=this._targets.length,r=this._history.find(o=>o.status==="sent"),s=r?`${this._formatHistoryDate(r.timestamp)} (${r.recipient||r.target||"Destino"})`:"Sin envíos recientes";return`
      <!-- Métricas de estado general -->
      <section class="hero-status-grid">
        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Reglas Operativas</span>
            <span class="status-badge ${t>0?"is-blocked":"is-working"}">
              ${t>0?`${t} en alerta`:"Normal"}
            </span>
          </div>
          <div class="status-value">${e} <span style="font-size:15px;font-weight:400;color:var(--wit-muted,#adb4b6);">/ ${this._rules.length} activas</span></div>
          <div class="status-sub">Vigilancia térmica continua</div>
        </div>

        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Dispositivos Móviles</span>
            <span class="status-badge ${i>0?"is-working":"is-muted"}">
              ${i>0?"Conectados":"Sin canal"}
            </span>
          </div>
          <div class="status-value">${i} <span style="font-size:15px;font-weight:400;color:var(--wit-muted,#adb4b6);">/ ${a} disponibles</span></div>
          <div class="status-sub">Integración Mobile App</div>
        </div>

        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Último Aviso</span>
            <span class="status-badge is-muted">Historial</span>
          </div>
          <div class="status-value" style="font-size:16px;line-height:1.3;margin-top:8px;">${f(s)}</div>
          <div class="status-sub">${this._history.length} eventos registrados</div>
        </div>
      </section>

      <!-- Pestañas de Navegación -->
      <div class="tab-bar">
        <button class="tab-btn ${this._notificationTab==="rules"?"active":""}" data-action="tab" data-tab="rules">
          Reglas (${this._rules.length})
        </button>
        <button class="tab-btn ${this._notificationTab==="devices"?"active":""}" data-action="tab" data-tab="devices">
          Dispositivos (${this._targets.length})
        </button>
        <button class="tab-btn ${this._notificationTab==="history"?"active":""}" data-action="tab" data-tab="history">
          Historial (${this._history.length})
        </button>
      </div>

      <!-- Contenido de la pestaña activa -->
      ${this._notificationTab==="rules"?this._renderRulesTab():""}
      ${this._notificationTab==="devices"?this._renderDevicesTab():""}
      ${this._notificationTab==="history"?this._renderHistoryTab():""}
    `}_renderRulesTab(){return this._rules.length?`
      <div class="rule-list">
        ${this._rules.map(e=>{var d,h,p,g,u;const t=f(e.id),i=this._findSensor((d=e.source)==null?void 0:d.entity_id),a=this._liveSensorValue(i),r=Ot(e),s=this._notificationBusy===`toggle:${e.id}`;let o="";r.countdownType==="retry"&&r.countdownValue?o=` · reintento <span class="runtime-countdown" data-retry-at="${f(r.countdownValue)}"></span>`:r.countdownType==="reminder"&&r.countdownValue?o=` · recordatorio <span class="runtime-countdown" data-reminder-at="${f(r.countdownValue)}"></span>`:r.countdownType==="pending"&&r.countdownValue&&(o=` <span class="runtime-countdown" data-pending-until="${f(r.countdownValue)}"></span>`);const n=(e.recipients||[]).some(m=>m.status==="stale_identity"||m.available===!1),c=(e.recipients||[]).map(m=>m.custom_name||m.name||m.notify_entity_id||m.legacy_service).join(" · ");return`
            <article class="surface rule-card ${r.status}">
              <div class="rule-card-head">
                <div class="rule-icon">${me}</div>
                <div class="rule-title">
                  <div class="rule-title-line">
                    <h3>${f(e.name)}</h3>
                    <span class="status-badge ${r.status}">
                      ${f(r.label)}${o}
                    </span>
                  </div>
                  <p>${f(((h=e.source)==null?void 0:h.display_name)||((p=e.source)==null?void 0:p.entity_id))}</p>
                </div>
                <button
                  class="switch-button ${e.enabled!==!1?"on":""}"
                  data-action="toggle-rule"
                  data-id="${t}"
                  data-enabled="${e.enabled!==!1}"
                  ${s?"disabled":""}
                  aria-label="Activar o desactivar regla"
                ><span></span></button>
              </div>

              <div class="rule-metrics">
                <div>
                  <small>Condición</small>
                  <strong>${f(Rt(e.condition))}</strong>
                </div>
                <div>
                  <small>Actual</small>
                  <strong>${a.available?`${Number(a.value).toFixed(1)} ${f(a.unit)}`:"—"}</strong>
                </div>
                <div>
                  <small>Avisos</small>
                  <strong>${f(Pt(e.behavior))}</strong>
                  <span>${(g=e.behavior)!=null&&g.notify_recovery?"Avisa al normalizarse":"Sin aviso de recuperación"}</span>
                </div>
              </div>

              <div class="rule-footer">
                <span class="recipient-line ${n?"stale-warning":""}">
                  ${se} ${n?"<strong>[Acción Requerida]</strong> ":""}${f(c||"Sin destinatarios asignados")}
                </span>
                <div class="card-actions">
                  ${this._admin()?`
                    <button class="small secondary" data-action="edit-rule" data-id="${t}" title="Editar regla">${Fe} <span>Editar</span></button>
                    <button class="small danger icon-btn" data-action="delete-rule" data-id="${t}" title="Eliminar regla" aria-label="Eliminar regla">${jt}</button>
                  `:""}
                </div>
              </div>

              ${(u=e.runtime)!=null&&u.last_error?`
                <div class="inline-error">
                  ${qe}
                  <span>${f(e.runtime.last_error)}</span>
                </div>
              `:""}
            </article>
          `}).join("")}
      </div>
    `:`
        <section class="surface empty-card">
          <div class="empty-icon">${me}</div>
          <h3>No hay reglas configuradas</h3>
          <p>Crea una regla para vigilar la temperatura de salas técnicas, servidores u oficinas y recibir alertas automáticas en teléfonos autorizados.</p>
          ${this._admin()?'<button class="primary" data-action="new-rule" style="margin-top:14px;">+ Crear primera regla</button>':""}
        </section>
      `}_renderDevicesTab(){return this._targets.length?`
      <div class="device-grid">
        ${this._targets.map(e=>{const t=this._notificationBusy===`test:${e.key}`,i=[e.manufacturer,e.model].filter(Boolean).join(" · ")||"Aplicación móvil",a=e.sw_version?`Firmware ${e.sw_version}`:"Firmware no informado",r=e.notify_entity_id||e.legacy_service||"Sin endpoint";return`
            <article class="surface device-card">
              <div class="device-card-head">
                <div class="device-icon">${se}</div>
                <div class="device-title">
                  <h3>${f(e.name)}</h3>
                  ${e.custom_name?`<small>Home Assistant: ${f(e.ha_name||"—")}</small>`:""}
                  <span class="availability-badge ${e.available?"ok":"bad"}">
                    ${e.available?"Disponible":"No disponible"}
                  </span>
                </div>
                ${this._admin()?`
                  <button class="small secondary icon-btn device-rename" data-action="rename-target" data-key="${f(e.target_id||e.key)}" title="Cambiar nombre amigable" aria-label="Cambiar nombre amigable">
                    ${Fe}
                  </button>
                `:""}
              </div>

              <dl class="device-data">
                <div><dt>Hardware</dt><dd>${f(i)}</dd></div>
                <div><dt>Software</dt><dd>${f(a)}</dd></div>
                ${e.area_name?`<div><dt>Área</dt><dd>${f(e.area_name)}</dd></div>`:""}
                <div><dt>Notificador</dt><dd><code>${f(r)}</code></dd></div>
                ${e.legacy_service&&e.notify_entity_id?`<div><dt>Compatibilidad</dt><dd><code>${f(e.legacy_service)}</code></dd></div>`:""}
              </dl>

              <button
                class="secondary test-button"
                data-action="test-target"
                data-key="${f(e.key)}"
                ${t?"disabled":""}
              >
                ${Bt} ${t?"Enviando prueba…":"Enviar prueba individual"}
              </button>
            </article>
          `}).join("")}
      </div>
    `:`
        <section class="surface empty-card">
          <div class="empty-icon">${se}</div>
          <h3>No se detectaron dispositivos de la App Móvil</h3>
          <p>Instala la aplicación oficial de Home Assistant en al menos un smartphone e inicia sesión para registrar un canal de notificación.</p>
        </section>
      `}_renderHistoryTab(){if(!this._history.length)return`
        <section class="surface empty-card">
          <div class="empty-icon">${me}</div>
          <h3>Sin actividad registrada</h3>
          <p>Las alertas térmicas, recordatorios periódicos, recuperaciones y pruebas de notificación se registrarán aquí.</p>
        </section>
      `;const e=this._historyTypeFilter,t=this._historyStatusFilter,i=this._historySearch.toLowerCase().trim(),a=this._history.filter(s=>!(e!=="all"&&s.event_type!==e||t!=="all"&&s.status!==t||i&&!`${s.rule_name||""} ${s.recipient||""} ${s.target||""} ${s.error||""}`.toLowerCase().includes(i))),r=a.slice(0,this._historyLimit);return`
      <section class="surface">
        <div class="history-filter-bar">
          <div class="filter-group">
            <span class="eyebrow" style="margin-right:4px;">Tipo:</span>
            <button class="filter-btn ${e==="all"?"active":""}" data-action="filter-history-type" data-type="all">Todos</button>
            <button class="filter-btn ${e==="alert"?"active":""}" data-action="filter-history-type" data-type="alert">Alertas</button>
            <button class="filter-btn ${e==="reminder"?"active":""}" data-action="filter-history-type" data-type="reminder">Recordatorios</button>
            <button class="filter-btn ${e==="recovery"?"active":""}" data-action="filter-history-type" data-type="recovery">Recuperaciones</button>
            <button class="filter-btn ${e==="test"?"active":""}" data-action="filter-history-type" data-type="test">Pruebas</button>
          </div>

          <div class="filter-group">
            <span class="eyebrow" style="margin-right:4px;">Estado:</span>
            <button class="filter-btn ${t==="all"?"active":""}" data-action="filter-history-status" data-status="all">Todos</button>
            <button class="filter-btn ${t==="sent"?"active":""}" data-action="filter-history-status" data-status="sent">Enviados</button>
            <button class="filter-btn ${t==="error"?"active":""}" data-action="filter-history-status" data-status="error">Errores</button>
          </div>

          <div class="history-search-wrapper">
            <input
              type="search"
              class="history-search-input"
              placeholder="Buscar regla, destinatario o error…"
              value="${f(this._historySearch)}"
              data-field="history-search"
            />
          </div>
        </div>

        <div class="history-meta-line">
          <span>Mostrando <strong>${r.length}</strong> de <strong>${a.length}</strong> eventos filtrados (de ${this._history.length} en memoria)</span>
        </div>

        ${r.length?`
          <div class="history-list">
            ${r.map(s=>{const o=s.status==="sent";let n="Alerta";return s.event_type==="reminder"?n="Recordatorio":s.event_type==="recovery"?n="Recuperación":s.event_type==="test"&&(n="Prueba manual"),`
                <div class="history-row">
                  <span class="history-dot ${o?"ok":"bad"}"></span>
                  <div class="history-main">
                    <div class="history-header-line">
                      <strong>${f(s.rule_name||n)}</strong>
                      <span class="history-tag ${s.event_type}">${f(n)}</span>
                      <span class="history-status-tag ${o?"ok":"bad"}">${o?"Enviado":"Error"}</span>
                    </div>
                    <small>Destinatario: ${f(s.recipient||s.target||"Destino")}</small>
                    ${s.error?`<div class="history-error-code">${f(s.error)}</div>`:""}
                  </div>
                  <div class="history-aside">
                    ${s.value!=null?`<strong>${Number(s.value).toFixed(1)} °C</strong>`:""}
                    <time>${f(this._formatHistoryDate(s.timestamp))}</time>
                  </div>
                </div>
              `}).join("")}
          </div>
          ${a.length>this._historyLimit?`
            <div style="text-align:center;margin-top:16px;">
              <button class="secondary" data-action="load-more-history">Cargar 50 eventos más</button>
            </div>
          `:""}
        `:`
          <div class="empty">No hay eventos que coincidan con los filtros aplicados.</div>
        `}
      </section>
    `}_formatHistoryDate(e){if(!e)return"—";try{return new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZone:"America/La_Paz"}).format(new Date(e))}catch{return String(e)}}_renderNotificationEditor(){var o;if(!this._notificationEditorOpen||!this._ruleDraft)return"";const e=this._ruleDraft,t=this._notificationEditorStep,i=!!this._editingRuleId,a=this._findSensor((o=e.source)==null?void 0:o.entity_id),r=this._liveSensorValue(a),s=["Sensor","Condición","Destinatarios","Mensaje"];return`
      <div class="modal-backdrop" data-action="close-editor-backdrop">
        <div class="modal-card wizard-card" data-editor-card>
          <div class="modal-head">
            <div>
              <span class="eyebrow">${i?"Editar Alerta":"Nueva Alerta Térmica"}</span>
              <h3>${i?f(e.name):"Configurar regla"}</h3>
            </div>
            <button class="small secondary icon-btn" data-action="close-editor" aria-label="Cerrar">✕</button>
          </div>

          <!-- Indicador de pasos del wizard -->
          <div class="wizard-steps">
            ${s.map((n,c)=>{const d=c+1,h=d===t,p=d<t;return`
                <div class="wizard-step-item ${h?"active":""} ${p?"past":""}">
                  <span class="step-num">${p?"✓":d}</span>
                  <span class="step-label">${n}</span>
                </div>
              `}).join("")}
          </div>

          ${this._editorError?`<div class="error" data-editor-error style="margin-bottom:14px;">${f(this._editorError)}</div>`:""}

          <!-- Cuerpo según el paso activo -->
          <div class="wizard-body">
            ${t===1?this._renderEditorStep1(e,a,r):""}
            ${t===2?this._renderEditorStep2(e):""}
            ${t===3?this._renderEditorStep3(e):""}
            ${t===4?this._renderEditorStep4(e,r):""}
          </div>

          <!-- Acciones del pie -->
          <div class="wizard-actions">
            <button type="button" class="secondary" data-action="close-editor">Cancelar</button>
            <div style="display:flex;gap:10px;">
              ${t>1?'<button type="button" class="secondary" data-action="editor-back">Anterior</button>':""}
              ${t<4?'<button type="button" class="primary" data-action="editor-next">Siguiente</button>':`
                <button type="button" class="primary" data-action="save-rule" ${this._notificationBusy==="save"?"disabled":""}>
                  ${We} ${this._notificationBusy==="save"?"Guardando…":i?"Guardar cambios":"Crear regla"}
                </button>
              `}
            </div>
          </div>
        </div>
      </div>
    `}_renderEditorStep1(e,t,i){return`
      <div class="editor-section">
        <label class="field-label">Sensor de temperatura a vigilar</label>
        <select class="field-control" data-field="sensor">
          <option value="">Selecciona un sensor…</option>
          ${this._preferredSensors().map(r=>`
            <option value="${f(r.entity_id)}" ${r.entity_id===e.source.entity_id?"selected":""}>
              ${r.preferred?"★ ":""}${f(r.display_name||r.name)} (${f(r.entity_id)})
            </option>
          `).join("")}
        </select>

        ${t?`
          <div class="sensor-preview-box">
            <div class="sensor-preview-icon">${Ht}</div>
            <div class="sensor-preview-copy">
              <small>${f(t.area_name||t.device_name||"Área no asignada")}</small>
              <strong>${f(t.display_name||t.name)}</strong>
              <code>${f(t.entity_id)}</code>
            </div>
            <div class="sensor-live-pill">
              <small>Valor en vivo</small>
              <strong>${i.available?`${Number(i.value).toFixed(1)} ${f(i.unit)}`:"—"}</strong>
            </div>
          </div>
        `:`
          <div class="empty" style="padding:16px;">Selecciona un sensor de la lista para previsualizar sus mediciones en tiempo real.</div>
        `}
      </div>
    `}_renderEditorStep2(e){const t=e.condition,i=["above","below"].includes(t.type),a=e.behavior.notification_mode,r=Math.max(1,Math.round(Number(e.behavior.reminder_interval_seconds||1800)/60)),s=Math.round(Number(t.for_seconds||0)/60);return`
      <div class="editor-section">
        <div class="field-grid two">
          <label>
            <span class="field-label">Tipo de condición</span>
            <select class="field-control" data-field="condition-type">
              <option value="above" ${t.type==="above"?"selected":""}>Mayor o igual (≥)</option>
              <option value="below" ${t.type==="below"?"selected":""}>Menor o igual (≤)</option>
              <option value="outside" ${t.type==="outside"?"selected":""}>Fuera de rango seguro</option>
              <option value="inside" ${t.type==="inside"?"selected":""}>Dentro de rango específico</option>
            </select>
          </label>

          ${i?`
            <label>
              <span class="field-label">Umbral de activación (°C)</span>
              <input type="number" step="0.1" class="field-control" data-field="threshold" value="${f(t.threshold)}" />
            </label>
          `:`
            <div class="field-grid two nested">
              <label>
                <span class="field-label">Límite Mín (°C)</span>
                <input type="number" step="0.1" class="field-control" data-field="lower" value="${f(t.lower)}" />
              </label>
              <label>
                <span class="field-label">Límite Máx (°C)</span>
                <input type="number" step="0.1" class="field-control" data-field="upper" value="${f(t.upper)}" />
              </label>
            </div>
          `}
        </div>

        <div class="field-grid two" style="margin-top:10px;">
          <div class="field-block">
            <div class="field-label-row">
              <label class="field-label">Durante (minutos)</label>
              <button type="button" class="help-btn" data-action="open-help" data-help="duration" title="Ayuda sobre Durante">?</button>
            </div>
            <input type="number" min="0" step="1" class="field-control" data-field="for-minutes" value="${f(s)}" />
          </div>

          <div class="field-block">
            <div class="field-label-row">
              <label class="field-label">Histéresis (°C)</label>
              <button type="button" class="help-btn" data-action="open-help" data-help="hysteresis" title="Ayuda sobre Histéresis">?</button>
            </div>
            <input type="number" min="0" max="50" step="0.1" class="field-control" data-field="hysteresis" value="${f(t.hysteresis)}" />
          </div>
        </div>

        <div class="condition-divider"></div>

        <div class="section-mini-head">
          <div>
            <small class="eyebrow">Política de Avisos</small>
            <strong>¿Con qué frecuencia deseas recibir notificaciones?</strong>
          </div>
          <button type="button" class="help-btn" data-action="open-help" data-help="frequency" title="Ayuda sobre frecuencia">?</button>
        </div>

        <div class="field-grid ${a==="repeat"?"two":"one"}" style="margin-top:8px;">
          <label>
            <span class="field-label">Frecuencia de alerta</span>
            <select class="field-control" data-field="notification-mode">
              <option value="once" ${a==="once"?"selected":""}>Una sola vez por incidencia</option>
              <option value="repeat" ${a==="repeat"?"selected":""}>Repetir mientras siga activa</option>
              <option value="daily" ${a==="daily"?"selected":""}>Cada 24 horas mientras siga activa</option>
            </select>
          </label>

          ${a==="repeat"?`
            <label>
              <span class="field-label">Repetir cada (minutos)</span>
              <input type="number" min="1" step="1" class="field-control" data-field="reminder-minutes" value="${f(r)}" />
            </label>
          `:""}
        </div>

        <label class="checkbox-row" style="margin-top:14px;">
          <input type="checkbox" data-field="notify-recovery" ${e.behavior.notify_recovery?"checked":""} />
          <span>
            <strong>Avisarme cuando vuelva a la normalidad</strong>
            <small style="display:block;color:var(--wit-muted,#adb4b6);">Envía un mensaje de confirmación cuando la temperatura regrese al rango seguro.</small>
          </span>
          <button type="button" class="help-btn" data-action="open-help" data-help="recovery" title="Ayuda sobre recuperación">?</button>
        </label>

        <div class="logic-preview-box">
          <span style="color:#34d399;">${We}</span>
          <span data-logic-preview-text>${f(Oe(e))}</span>
        </div>
      </div>
    `}_renderEditorStep3(e){return this._targets.length?`
      <div class="editor-section">
        <label class="field-label">Selecciona los teléfonos autorizados para recibir esta alerta:</label>
        <div class="target-picker">
          ${this._targets.map(t=>{const i=this._isRecipientSelected(t),a=t.notify_entity_id||t.legacy_service,r=e.recipients.some(s=>s.device_id===t.device_id&&s.status==="stale_identity");return`
              <label class="target-option ${i?"selected":""}">
                <input type="checkbox" data-field="recipient" value="${f(t.key)}" ${i?"checked":""} />
                <span class="target-option-icon">${se}</span>
                <span class="target-option-copy">
                  <strong>${f(t.name)}</strong>
                  <small>${f(t.custom_name?`HA: ${t.ha_name||"—"}`:t.model||"Mobile App")}</small>
                  <code>${f(a)}</code>
                  ${r?'<span class="stale-identity-tag">Requiere confirmación de identidad</span>':""}
                </span>
                <span class="availability-dot ${t.available?"ok":"bad"}" title="${t.available?"Disponible":"No disponible"}"></span>
              </label>
            `}).join("")}
        </div>
      </div>
    `:`
        <div class="inline-error">
          ${qe}
          <span>No hay dispositivos de la app móvil registrados. No se puede crear o guardar la regla sin destinatarios.</span>
        </div>
      `}_renderEditorStep4(e,t){const i=t.available?Number(t.value).toFixed(1):"28.5",a=(e.message.body||"").replaceAll("{sensor}",e.source.display_name||"Sensor Rack").replaceAll("{value}",i).replaceAll("{unit}",t.unit||"°C").replaceAll("{threshold}",String(e.condition.threshold??`${e.condition.lower}–${e.condition.upper}`)).replaceAll("{area}",e.source.area_name||"Sistemas").replaceAll("{time}","14:30");return`
      <div class="editor-section">
        <div class="form-group">
          <label>Nombre interno de la regla</label>
          <input type="text" class="field-control" data-field="rule-name" value="${f(e.name)}" maxlength="120" required />
        </div>

        <div class="form-group" style="margin-top:10px;">
          <label>Título de la notificación push</label>
          <input type="text" class="field-control" data-field="message-title" value="${f(e.message.title)}" maxlength="240" />
        </div>

        <div class="form-group" style="margin-top:10px;">
          <label>Cuerpo del mensaje</label>
          <textarea class="field-control textarea" data-field="message-body" maxlength="2000" rows="3">${f(e.message.body)}</textarea>
        </div>

        <div class="variable-chips">
          <span class="eyebrow" style="font-size:9px;">Variables disponibles:</span>
          <code>{sensor}</code>
          <code>{value}</code>
          <code>{unit}</code>
          <code>{threshold}</code>
          <code>{area}</code>
          <code>{time}</code>
        </div>

        <!-- Vista previa en vivo -->
        <div class="message-preview-card">
          <small class="eyebrow">Vista previa en smartphone</small>
          <strong data-message-preview-title>${f(e.message.title||e.name||"Alerta")}</strong>
          <p data-message-preview-body>${f(a)}</p>
        </div>

        <!-- Acordeón para mensaje de recuperación opcional -->
        <div class="recovery-accordion ${this._recoveryAccordionOpen?"open":""}">
          <button type="button" class="accordion-head" data-action="toggle-recovery-accordion">
            <span>Mensaje opcional de normalización (recuperación)</span>
            <span>${this._recoveryAccordionOpen?"▲":"▼"}</span>
          </button>
          ${this._recoveryAccordionOpen?`
            <div class="accordion-body">
              <div class="form-group">
                <label>Título al normalizarse</label>
                <input type="text" class="field-control" data-field="recovery-title" value="${f(e.message.recovery_title||"")}" placeholder="ej. Temperatura normalizada" maxlength="240" />
              </div>
              <div class="form-group" style="margin-top:8px;">
                <label>Mensaje al normalizarse</label>
                <textarea class="field-control textarea" data-field="recovery-body" rows="2" placeholder="ej. {sensor} regresó a valor seguro ({value} {unit})." maxlength="2000">${f(e.message.recovery_body||"")}</textarea>
              </div>
            </div>
          `:""}
        </div>

        <label class="checkbox-row" style="margin-top:14px;">
          <input type="checkbox" data-field="rule-enabled" ${e.enabled?"checked":""} />
          <span>Activar esta regla inmediatamente tras guardar</span>
        </label>
      </div>
    `}_renderDeleteRuleModal(){const e=this._rules.find(t=>t.id===this._deleteRuleId);return e?`
      <div class="modal-backdrop" data-action="cancel-delete-rule">
        <div class="modal-card dialog-card" data-delete-card>
          <div class="modal-head">
            <h3>¿Eliminar regla de notificación?</h3>
            <button class="small secondary icon-btn" data-action="cancel-delete-rule">✕</button>
          </div>
          <p style="color:var(--wit-muted,#adb4b6);font-size:14px;line-height:1.5;">
            Se eliminará la regla <strong>"${f(e.name)}"</strong>. Esta acción detendrá de inmediato su monitoreo y eliminará sus estados runtime en Home Assistant.
          </p>
          ${this._deleteError?`<div class="error" data-delete-error>${f(this._deleteError)}</div>`:""}
          <div class="modal-actions" style="margin-top:20px;">
            <button class="secondary" data-action="cancel-delete-rule">Cancelar</button>
            <button class="danger" data-action="confirm-delete-rule" ${this._notificationBusy==="delete"?"disabled":""}>
              ${this._notificationBusy==="delete"?"Eliminando…":"Eliminar regla"}
            </button>
          </div>
        </div>
      </div>
    `:""}_renderRenameTargetModal(){return this._findTarget(this._renameTargetId||"")?`
      <div class="modal-backdrop" data-action="close-rename-backdrop">
        <div class="modal-card dialog-card" data-rename-card>
          <div class="modal-head">
            <h3>Cambiar nombre amigable</h3>
            <button class="small secondary icon-btn" data-action="close-rename-target">✕</button>
          </div>
          <p style="color:var(--wit-muted,#adb4b6);font-size:13px;line-height:1.5;margin-bottom:12px;">
            Asigna un nombre descriptivo para identificar este teléfono en Witmind (ej. "Teléfono Guardia" o "Móvil Mantenimiento"). No modifica la entidad en Home Assistant.
          </p>
          ${this._renameError?`<div class="error" data-rename-error style="margin-bottom:12px;">${f(this._renameError)}</div>`:""}
          <div class="form-group">
            <label>Nombre amigable (máx 80 caracteres)</label>
            <input type="text" class="field-control" data-field="device-alias" value="${f(this._renameValue)}" maxlength="80" required />
          </div>
          <div class="modal-actions" style="margin-top:18px;justify-content:space-between;">
            <button class="secondary" data-action="clear-target-alias">Restaurar nombre original</button>
            <div style="display:flex;gap:10px;">
              <button class="secondary" data-action="close-rename-target">Cancelar</button>
              <button class="primary" data-action="save-target-alias" ${this._notificationBusy.startsWith("alias:")?"disabled":""}>
                ${this._notificationBusy.startsWith("alias:")?"Guardando…":"Guardar nombre"}
              </button>
            </div>
          </div>
        </div>
      </div>
    `:""}_renderHelpModal(){if(!this._helpTopic)return"";const e=Ft(this._helpTopic);return e?`
      <div class="modal-backdrop" data-action="close-help">
        <div class="modal-card dialog-card">
          <div class="modal-head">
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="help-symbol">?</span>
              <h3>${f(e.title)}</h3>
            </div>
            <button class="small secondary icon-btn" data-action="close-help">✕</button>
          </div>
          <p style="color:var(--wit-muted,#adb4b6);font-size:14px;line-height:1.6;margin:10px 0;">
            ${f(e.text)}
          </p>
          <div class="help-example-card">
            <strong>Ejemplo práctico:</strong>
            <p>${f(e.example)}</p>
          </div>
          <div class="modal-actions" style="margin-top:16px;">
            <button class="primary" data-action="close-help">Entendido</button>
          </div>
        </div>
      </div>
    `:""}_years(){var i;const e=(i=this._todayPayload)==null?void 0:i.years;if(Array.isArray(e)&&e.length)return e;const t=new Set;return this._calendar.forEach(a=>{const r=parseInt(String(a.date||"").slice(0,4),10);Number.isNaN(r)||t.add(r)}),Array.from(t).sort()}_filteredHolidays(){return this._year==="all"?this._calendar:this._calendar.filter(e=>String(e.date||"").startsWith(`${this._year}-`))}_formatDate(e){const t=String(e||""),i=/^\d{4}-\d{2}-\d{2}$/.test(t)?new Date(`${t}T12:00:00`):new Date(t);return Number.isNaN(i.getTime())?t||"Sin fecha":new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"short",year:"numeric",timeZone:"America/La_Paz"}).format(i)}_renderCalendar(){var h,p,g,u;const e=this._todayPayload||{},t=!!e.is_non_working_day,i=String(e.reason||(t?"No laborable":"Día laboral")),a=e.next_holiday,r=((h=this._hass)==null?void 0:h.states)||{},s=((p=r["automation.taller_ciclo_10s"])==null?void 0:p.state)||"inactivo",o=((g=r["automation.witmind_bloqueo_laboral_apagado_seguro"])==null?void 0:g.state)||"activo",n=((u=r["binary_sensor.bloqueo_automatizaciones_laborales"])==null?void 0:u.state)||(t?"on":"off"),c=this._years(),d=this._filteredHolidays();return`
      <!-- Tarjetas de estado operativo y observabilidad -->
      <section class="hero-status-grid">
        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Estado de Hoy</span>
            <span class="status-badge ${t?"is-blocked":"is-working"}">
              ${t?"Pausado · No laborable":"Operativo · Día laboral"}
            </span>
          </div>
          <div class="status-value">${f(i)}</div>
          <div class="status-sub">Fecha evaluada: ${f(e.today||new Date().toISOString().slice(0,10))}</div>
        </div>

        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Próximo Feriado</span>
            <span class="status-badge ${a?"is-blocked":"is-muted"}">
              ${a?f(this._formatDate(a.date)):"Ninguno"}
            </span>
          </div>
          <div class="status-value">${a?f(a.name):"Sin feriados activos"}</div>
          <div class="status-sub">${a!=null&&a.description?f(a.description):"Pausará automatizaciones laborales"}</div>
        </div>

        <div class="status-card">
          <div class="status-card-header">
            <span class="eyebrow">Protección Laboral</span>
            <span class="status-badge ${n==="on"?"is-blocked":"is-working"}">
              ${n==="on"?"Bloqueo Activo":"Permisivo"}
            </span>
          </div>
          <div class="status-sub" style="font-size: 11px; line-height: 1.6; margin-top: 4px;">
            • Taller (ciclo 10s): <strong>${f(s)}</strong><br>
            • Apagado seguro: <strong>${f(o)}</strong><br>
            • Sábado 13:00 / Domingo: <strong>regla activa</strong>
          </div>
        </div>
      </section>

      <!-- Lista de feriados con filtro por año -->
      <section class="surface">
        <div class="section-head">
          <div>
            <span class="eyebrow">Persistencia SQLite 3</span>
            <h3>Días festivos configurados</h3>
          </div>
          <div class="filter-group">
            <button class="filter-btn ${this._year==="all"?"active":""}" data-action="filter-year" data-year="all">Todos (${this._calendar.length})</button>
            ${c.map(m=>`<button class="filter-btn ${this._year===String(m)?"active":""}" data-action="filter-year" data-year="${m}">${m}</button>`).join("")}
          </div>
        </div>

        ${d.length?`
          <div class="list">
            ${d.map(m=>{const _=f(m.id??m.record_id),k=m.active!==!1;return`
                <article class="row">
                  <div class="row-details">
                    <strong>${f(m.name||"Feriado")}</strong>
                    <small>${f(this._formatDate(m.date))}${m.description?` · ${f(m.description)}`:""}</small>
                  </div>
                  <div class="row-actions">
                    <span class="status-badge ${k?"is-blocked":"is-muted"}" style="font-size: 10px; padding: 3px 8px;">
                      ${k?"Bloquea":"Inactivo"}
                    </span>
                    ${this._admin()?`
                      <button class="small ${k?"is-muted":"is-active"}" data-action="toggle-calendar" data-id="${_}">
                        ${k?"Desactivar":"Activar"}
                      </button>
                      <button class="small secondary" data-action="open-edit-modal" data-id="${_}">Editar</button>
                      <button class="small danger" data-action="delete-calendar" data-id="${_}">Eliminar</button>
                    `:""}
                  </div>
                </article>
              `}).join("")}
          </div>
        `:`
          <div class="empty">No hay registros configurados para el filtro seleccionado.</div>
        `}
      </section>
    `}_renderCalendarModal(){if(!this._modal)return"";const e=this._modal,t=e.mode==="add";return`
      <div class="modal-backdrop" data-action="close-modal-backdrop">
        <div class="modal-card">
          <div class="modal-head">
            <h3>${t?"Añadir feriado":"Editar feriado"}</h3>
            <button class="small secondary" data-action="close-modal" aria-label="Cerrar">✕</button>
          </div>
          ${e.error?`<div class="error" style="margin-bottom: 12px;">${f(e.error)}</div>`:""}
          <form class="modal-form" data-form="modal-calendar">
            <div class="form-group">
              <label>Fecha (YYYY-MM-DD)</label>
              <input type="date" name="date" value="${f(e.date)}" required />
            </div>
            <div class="form-group">
              <label>Nombre del día festivo</label>
              <input type="text" name="name" value="${f(e.name)}" placeholder="ej. Día del Trabajo" required maxlength="120" />
            </div>
            <div class="form-group">
              <label>Descripción o alcance</label>
              <textarea name="description" placeholder="Opcional: información adicional" maxlength="500">${f(e.description)}</textarea>
            </div>
            <label class="checkbox-row">
              <input type="checkbox" name="active" ${e.active?"checked":""} />
              <span>Activo (pausará las automatizaciones laborales de la empresa)</span>
            </label>
            <div class="modal-actions">
              <button type="button" class="secondary" data-action="close-modal">Cancelar</button>
              <button type="submit" class="primary" ${this._busy?"disabled":""}>
                ${this._busy?"Guardando…":t?"Añadir feriado":"Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    `}_input(e){const t=e.target,i=t.dataset.field;if(!i)return;const a=t.value??"";if(i==="history-search"){this._historySearch=a,this._render();return}if(i==="device-alias"){this._renameValue=a,this._renameError="";return}this._ruleDraft&&(i==="rule-name"&&(this._ruleDraft.name=a),i==="threshold"&&(this._ruleDraft.condition.threshold=a),i==="lower"&&(this._ruleDraft.condition.lower=a),i==="upper"&&(this._ruleDraft.condition.upper=a),i==="for-minutes"&&(this._ruleDraft.condition.for_seconds=Math.max(0,Number(a||0)*60)),i==="hysteresis"&&(this._ruleDraft.condition.hysteresis=a),i==="reminder-minutes"&&(this._ruleDraft.behavior.reminder_interval_seconds=Math.max(0,Number(a||0)*60)),i==="message-title"&&(this._ruleDraft.message.title=a),i==="message-body"&&(this._ruleDraft.message.body=a),i==="recovery-title"&&(this._ruleDraft.message.recovery_title=a),i==="recovery-body"&&(this._ruleDraft.message.recovery_body=a),this._editorError="",this._syncEditorPreviewsInPlace())}_change(e){var a;const t=e.target,i=t.dataset.field;if(!(!i||!this._ruleDraft))if(this._editorError="",i==="sensor"){const r=this._findSensor(t.value);this._ruleDraft.source={entity_id:(r==null?void 0:r.entity_id)||t.value,display_name:(r==null?void 0:r.display_name)||(r==null?void 0:r.name)||t.value,area_name:(r==null?void 0:r.area_name)||null},!this._editingRuleId&&r&&(this._ruleDraft.name=`Temperatura · ${r.display_name||r.name}`),this._render()}else if(i==="condition-type")this._ruleDraft.condition.type=t.value,this._render();else if(i==="recipient"){const r=t,s=this._findTarget(r.value);if(!s)return;const o=s.target_id||s.key,n=this._ruleDraft.recipients.findIndex(c=>c.target_id&&c.target_id===o||c.device_id&&s.device_id&&c.device_id===s.device_id||c.notify_entity_id&&s.notify_entity_id&&c.notify_entity_id===s.notify_entity_id||c.legacy_service&&s.legacy_service&&c.legacy_service===s.legacy_service);r.checked&&n===-1?this._ruleDraft.recipients.push({target_id:s.target_id||s.key,identity_keys:Array.isArray(s.identity_keys)?[...s.identity_keys]:[],device_id:s.device_id,notify_entity_id:s.notify_entity_id,legacy_service:s.legacy_service,name:s.name,custom_name:s.custom_name||null}):!r.checked&&n!==-1&&this._ruleDraft.recipients.splice(n,1),(a=r.closest(".target-option"))==null||a.classList.toggle("selected",r.checked)}else i==="notification-mode"?(this._ruleDraft.behavior.notification_mode=["once","repeat","daily"].includes(t.value)?t.value:"once",this._ruleDraft.behavior.notification_mode==="repeat"&&Number(this._ruleDraft.behavior.reminder_interval_seconds||0)<=0&&(this._ruleDraft.behavior.reminder_interval_seconds=1800),this._render()):i==="notify-recovery"?(this._ruleDraft.behavior.notify_recovery=t.checked,this._syncEditorPreviewsInPlace()):i==="rule-enabled"&&(this._ruleDraft.enabled=t.checked)}_syncEditorPreviewsInPlace(){var a;if(!this._ruleDraft||!this.shadowRoot)return;const e=this.shadowRoot.querySelector("[data-logic-preview-text]");e&&(e.textContent=Oe(this._ruleDraft));const t=this.shadowRoot.querySelector("[data-message-preview-title]"),i=this.shadowRoot.querySelector("[data-message-preview-body]");if(t&&(t.textContent=this._ruleDraft.message.title||this._ruleDraft.name||"Alerta"),i){const r=this._findSensor((a=this._ruleDraft.source)==null?void 0:a.entity_id),s=this._liveSensorValue(r),o=s.available?Number(s.value).toFixed(1):"28.5";i.textContent=(this._ruleDraft.message.body||"").replaceAll("{sensor}",this._ruleDraft.source.display_name||"Sensor Rack").replaceAll("{value}",o).replaceAll("{unit}",s.unit||"°C").replaceAll("{threshold}",String(this._ruleDraft.condition.threshold??`${this._ruleDraft.condition.lower}–${this._ruleDraft.condition.upper}`)).replaceAll("{area}",this._ruleDraft.source.area_name||"Sistemas").replaceAll("{time}","14:30")}}_click(e){const t=e.target;if(t.dataset.action==="close-modal-backdrop"){this._modal=null,this._render();return}if(t.dataset.action==="close-editor-backdrop"){if(this._notificationBusy)return;this._notificationEditorOpen=!1,this._ruleDraft=null,this._editingRuleId=null,this._render();return}if(t.dataset.action==="cancel-delete-rule"){this._deleteRuleId=null,this._render();return}if(t.dataset.action==="close-rename-backdrop"||t.dataset.action==="close-rename-target"){this._renameTargetId=null,this._renameValue="",this._renameError="",this._render();return}if(t.dataset.action==="close-help"){this._helpTopic=null,this._render();return}const i=t.closest("button[data-action]");if(!i)return;const a=i.dataset.action;if(a==="toggle-menu")this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}));else if(a==="toggle-theme")this._toggleTheme();else if(a==="refresh")this._load();else if(a==="tab")this._notificationTab=i.dataset.tab||"rules",this._render();else if(a==="new-rule")this._editingRuleId=null,this._ruleDraft=this._newDraft(),this._notificationEditorStep=1,this._notificationEditorOpen=!0,this._editorError="",this._recoveryAccordionOpen=!1,this._render();else if(a==="edit-rule"){const r=i.dataset.id,s=this._rules.find(o=>o.id===r);s&&(this._editingRuleId=r||null,this._ruleDraft=this._draftFromRule(s),this._notificationEditorStep=1,this._notificationEditorOpen=!0,this._editorError="",this._recoveryAccordionOpen=!!(this._ruleDraft.message.recovery_title||this._ruleDraft.message.recovery_body),this._render())}else if(a==="close-editor"){if(this._notificationBusy)return;this._notificationEditorOpen=!1,this._ruleDraft=null,this._editingRuleId=null,this._render()}else if(a==="editor-back")this._notificationEditorStep=Math.max(1,this._notificationEditorStep-1),this._editorError="",this._render();else if(a==="editor-next"){const r=ht(this._notificationEditorStep,this._ruleDraft);if(r){this._editorError=r,this._render();return}this._notificationEditorStep=Math.min(4,this._notificationEditorStep+1),this._editorError="",this._render()}else if(a==="save-rule")this._saveNotificationRule();else if(a==="toggle-rule")this._toggleNotificationRule(i.dataset.id||"",i.dataset.enabled!=="true");else if(a==="delete-rule")this._deleteRuleId=i.dataset.id||null,this._deleteError="",this._render();else if(a==="confirm-delete-rule")this._deleteNotificationRule();else if(a==="test-target")this._testNotificationTarget(i.dataset.key||"");else if(a==="rename-target"){const r=this._findTarget(i.dataset.key);r&&(this._renameTargetId=r.target_id||r.key,this._renameValue=r.custom_name||"",this._renameError="",this._render())}else if(a==="save-target-alias")this._saveTargetAlias(!1);else if(a==="clear-target-alias")this._saveTargetAlias(!0);else if(a==="open-help")this._helpTopic=i.dataset.help||null,this._render();else if(a==="toggle-recovery-accordion")this._recoveryAccordionOpen=!this._recoveryAccordionOpen,this._render();else if(a==="filter-history-type")this._historyTypeFilter=i.dataset.type||"all",this._render();else if(a==="filter-history-status")this._historyStatusFilter=i.dataset.status||"all",this._render();else if(a==="load-more-history")this._historyLimit+=50,this._render();else if(a==="filter-year")this._year=i.dataset.year||"all",this._render();else if(a==="open-add-modal")this._modal={mode:"add",date:new Date().toISOString().slice(0,10),name:"",description:"",active:!0},this._render();else if(a==="open-edit-modal"){const r=i.dataset.id,s=this._calendar.find(o=>String(o.id??o.record_id)===r);s&&(this._modal={mode:"edit",record_id:r,date:s.date,name:s.name,description:s.description||"",active:s.active!==!1},this._render())}else a==="close-modal"?(this._modal=null,this._render()):a==="toggle-calendar"?this._toggleCalendar(i.dataset.id||"",i):a==="delete-calendar"?this._deleteCalendar(i.dataset.id||""):a==="undo-delete"&&this._undoDelete()}async _saveNotificationRule(){if(!this._ruleDraft||this._notificationBusy)return;const e=Lt(this._ruleDraft);if(!e.valid){this._notificationEditorStep=e.step,this._editorError=e.error,this._render();return}this._notificationBusy="save",this._editorError="",this._render();try{const t=It(this._ruleDraft);this._editingRuleId?(await this._request("witmind_notifications/rules/update",{rule_id:this._editingRuleId,rule:t}),this._showNotificationToast(`Regla actualizada: ${t.name}`)):(await this._request("witmind_notifications/rules/create",{rule:t}),this._showNotificationToast(`Regla creada: ${t.name}`)),this._notificationEditorOpen=!1,this._ruleDraft=null,this._editingRuleId=null,await this._loadNotifications()}catch(t){this._editorError=t.message||"No se pudo guardar la regla",this._render()}finally{this._notificationBusy="",this._render()}}async _toggleNotificationRule(e,t){if(!(!e||this._notificationBusy)){this._notificationBusy=`toggle:${e}`,this._render();try{await this._request("witmind_notifications/rules/toggle",{rule_id:e,enabled:t}),await this._loadNotifications()}catch(i){this._showNotificationToast(i.message||"No se pudo cambiar el estado de la regla","error")}finally{this._notificationBusy="",this._render()}}}async _deleteNotificationRule(){if(!(!this._deleteRuleId||this._notificationBusy)){this._notificationBusy="delete",this._deleteError="",this._render();try{await this._request("witmind_notifications/rules/delete",{rule_id:this._deleteRuleId}),this._showNotificationToast("Regla eliminada exitosamente."),this._deleteRuleId=null,await this._loadNotifications()}catch(e){this._deleteError=e.message||"No se pudo eliminar la regla"}finally{this._notificationBusy="",this._render()}}}async _testNotificationTarget(e){const t=this._findTarget(e);if(!(!t||this._notificationBusy)){this._notificationBusy=`test:${t.key}`,this._render();try{await this._request("witmind_notifications/test",{recipient:{device_id:t.device_id,notify_entity_id:t.notify_entity_id,legacy_service:t.legacy_service,name:t.name},title:"Prueba Witmind",message:`Notificación de prueba enviada a ${t.name}.`}),this._showNotificationToast(`Prueba enviada a ${t.name}.`),await this._refreshNotificationRuntime()}catch(i){this._showNotificationToast(i.message||`Falló la prueba para ${t.name}`,"error")}finally{this._notificationBusy="",this._render()}}}async _saveTargetAlias(e=!1){const t=this._findTarget(this._renameTargetId||"");if(!t||this._notificationBusy.startsWith("alias:"))return;const i=e?"":String(this._renameValue||"").trim().replace(/\s+/g," ");if(!e&&!i){this._renameError="Escribe un nombre o usa 'Restaurar nombre original'.",this._render();return}if(i.length>80){this._renameError="El nombre puede tener como máximo 80 caracteres.",this._render();return}this._notificationBusy=`alias:${t.target_id||t.key}`,this._render();try{await this._request("witmind_notifications/targets/alias/set",{target_id:t.target_id||t.key,alias:i}),this._renameTargetId=null,this._renameValue="",this._renameError="",this._showNotificationToast(e?"Nombre de Home Assistant restaurado.":"Nombre amigable guardado."),await this._loadNotifications()}catch(a){this._renameError=a.message||"No se pudo guardar el alias"}finally{this._notificationBusy="",this._render()}}async _submit(e){const t=e.target;if(t.dataset.form!=="modal-calendar"||!this._modal||this._busy)return;e.preventDefault();const i=new FormData(t),a=String(i.get("date")||"").trim(),r=String(i.get("name")||"").trim(),s=String(i.get("description")||"").trim(),o=i.get("active")==="on";if(!a||!r){this._modal&&(this._modal.error="Fecha y nombre son obligatorios"),this._render();return}this._busy=!0;const n=this._backendType;try{this._modal.mode==="add"?(await this._request(`${n}/add`,{date:a,name:r,description:s,active:o}),this._showToast(`Feriado añadido: ${r}`)):(await this._request(`${n}/update`,{record_id:this._modal.record_id,date:a,name:r,description:s,active:o}),this._showToast(`Feriado actualizado: ${r}`)),this._modal=null,await this._loadCalendar()}catch(c){this._modal&&(this._modal.error=c.message||"Error al guardar el feriado"),this._render()}finally{this._busy=!1}}async _toggleCalendar(e,t){if(!e||!this._admin()||this._busy)return;const i=this._calendar.find(s=>String(s.id??s.record_id)===e);if(!i)return;this._busy=!0,t.disabled=!0;const a=i.active===!1,r=this._backendType;try{await this._request(`${r}/update`,{record_id:e,active:a,date:i.date,name:i.name,description:i.description||""}),this._showToast(a?`Feriado activado: ${i.name}`:`Feriado pausado: ${i.name}`),await this._loadCalendar()}catch(s){this._showToast(s.message||"No se pudo actualizar")}finally{this._busy=!1,t.disabled=!1}}async _deleteCalendar(e){if(!e||!this._admin()||this._busy)return;const t=this._calendar.find(a=>String(a.id??a.record_id)===e);if(!t||!confirm(`¿Eliminar definitivamente el feriado "${t.name}" (${this._formatDate(t.date)})?`))return;this._busy=!0;const i=this._backendType;try{await this._request(`${i}/delete`,{record_id:e}),this._undoDeletedRecord=t,this._showToast(`Eliminado: ${t.name}`,"undo"),await this._loadCalendar()}catch(a){this._showToast(a.message||"No se pudo eliminar")}finally{this._busy=!1}}async _undoDelete(){if(!this._undoDeletedRecord||this._busy)return;const e=this._undoDeletedRecord;this._busy=!0;const t=this._backendType;try{await this._request(`${t}/add`,{date:e.date,name:e.name,description:e.description||"",active:e.active!==!1}),this._undoDeletedRecord=null,this._showToast(`Feriado restaurado: ${e.name}`),await this._loadCalendar()}catch(i){this._showToast(i.message||"No se pudo restaurar")}finally{this._busy=!1}}_styles(){return`
      :host {
        display: block;
        min-height: 100dvh;
        color: #f5f6f4;
        background: linear-gradient(155deg, #040a0f, #071118 62%, #10191e);
        font-family: Manrope, system-ui, sans-serif;
      }
      * { box-sizing: border-box; }
      button, input, textarea, select { font: inherit; color: inherit; }
      button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible {
        outline: 2px solid #f26522;
        outline-offset: 2px;
      }
      .admin-shell { min-height: 100dvh; position: relative; }
      .signature-topbar {
        min-height: 80px;
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        padding: 12px clamp(18px, 2.6vw, 48px);
        position: sticky;
        top: 0;
        z-index: 20;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(7, 17, 24, 0.84);
        backdrop-filter: blur(18px);
      }
      .signature-topbar-start, .signature-topbar-end { display: flex; align-items: center; gap: 12px; }
      .signature-topbar-end { justify-content: flex-end; }
      .signature-brand { display: flex; align-items: baseline; gap: 10px; }
      .signature-brand strong { font-size: 18px; letter-spacing: 0.06em; }
      .signature-brand span { color: #f26522; font-size: 9px; font-weight: 800; }
      .signature-clock { font-size: 28px; font-weight: 600; letter-spacing: -0.05em; }
      .menu-button, .theme-button {
        width: 48px;
        height: 48px;
        display: grid;
        place-items: center;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.04);
        color: inherit;
        cursor: pointer;
      }
      .menu-button svg, .theme-button svg { width: 20px; height: 20px; }
      .dashboard { width: min(1200px, 100%); margin: auto; padding: clamp(16px, 3vw, 34px); }
      .admin-heading {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 18px;
        margin: 8px 0 20px;
      }
      .admin-heading h1 { margin: 4px 0 0; font-size: clamp(28px, 4vw, 42px); letter-spacing: -0.04em; line-height: 1.05; }
      .admin-heading p { max-width: 650px; margin: 7px 0 0; color: #adb4b6; font-size: 13px; line-height: 1.55; }
      .heading-actions { display: flex; align-items: center; gap: 10px; }
      .eyebrow { color: #f26522; font-size: 10px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; }

      /* Tab bar */
      .tab-bar {
        display: flex;
        gap: 8px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding-bottom: 10px;
      }
      .tab-btn {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 8px 16px;
        background: rgba(255, 255, 255, 0.04);
        color: #adb4b6;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .tab-btn:hover { background: rgba(255, 255, 255, 0.08); color: #f5f6f4; }
      .tab-btn.active {
        background: rgba(242, 101, 34, 0.16);
        border-color: rgba(242, 101, 34, 0.5);
        color: #f26522;
      }

      /* Métricas Hero */
      .hero-status-grid {
        display: grid;
        grid-template-columns: 1.2fr 1fr 1fr;
        gap: 14px;
        margin-bottom: 20px;
      }
      .status-card {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 20px;
        background: rgba(16, 25, 30, 0.84);
        padding: 20px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .status-card-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; }
      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 5px 10px;
        border-radius: 8px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .status-badge.is-blocked, .status-badge.alert { background: rgba(242, 101, 34, 0.15); border: 1px solid rgba(242, 101, 34, 0.4); color: #f26522; }
      .status-badge.is-working, .status-badge.normal { background: rgba(52, 211, 153, 0.15); border: 1px solid rgba(52, 211, 153, 0.35); color: #34d399; }
      .status-badge.is-muted, .status-badge.disabled { background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.14); color: #adb4b6; }
      .status-badge.sending, .status-badge.pending { background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.4); color: #60a5fa; }
      .status-badge.retry { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.4); color: #f87171; }
      .status-value { font-size: clamp(20px, 2.2vw, 28px); font-weight: 700; letter-spacing: -0.03em; margin: 4px 0 0; }
      .status-sub { color: #adb4b6; font-size: 12px; margin-top: 6px; }

      .surface {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 22px;
        background: rgba(16, 25, 30, 0.84);
        padding: 20px;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
        margin-bottom: 16px;
      }
      .section-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 16px;
        flex-wrap: wrap;
      }
      .section-head h3 { margin: 4px 0 0; font-size: 17px; }
      .filter-group { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
      .filter-btn {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 6px 12px;
        background: rgba(255, 255, 255, 0.04);
        color: #adb4b6;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .filter-btn.active {
        background: rgba(242, 101, 34, 0.15);
        border-color: rgba(242, 101, 34, 0.45);
        color: #f26522;
      }

      /* Reglas Card */
      .rule-list { display: grid; gap: 14px; }
      .rule-card {
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        background: rgba(27, 40, 46, 0.72);
        display: grid;
        gap: 16px;
        transition: border-color 0.2s ease;
      }
      .rule-card.alert { border-color: rgba(242, 101, 34, 0.4); box-shadow: 0 0 20px rgba(242, 101, 34, 0.12); }
      .rule-card.retry { border-color: rgba(239, 68, 68, 0.4); }
      .rule-card-head { display: flex; align-items: flex-start; gap: 14px; }
      .rule-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }
      .rule-icon svg { width: 22px; height: 22px; color: #f26522; }
      .rule-title { flex: 1; min-width: 0; }
      .rule-title-line { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
      .rule-title-line h3 { margin: 0; font-size: 17px; font-weight: 700; color: #f5f6f4; }
      .rule-title p { margin: 4px 0 0; color: #adb4b6; font-size: 13px; }

      /* Switch iOS-like */
      .switch-button {
        width: 46px;
        height: 26px;
        border-radius: 13px;
        background: rgba(255, 255, 255, 0.16);
        border: none;
        padding: 2px;
        cursor: pointer;
        position: relative;
        transition: background 0.2s ease;
        flex-shrink: 0;
      }
      .switch-button span {
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: #ffffff;
        transition: transform 0.2s ease;
      }
      .switch-button.on { background: #34d399; }
      .switch-button.on span { transform: translateX(20px); }

      .rule-metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(4, 10, 15, 0.4);
      }
      .rule-metrics div { display: flex; flex-direction: column; gap: 2px; }
      .rule-metrics small { color: #adb4b6; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
      .rule-metrics strong { font-size: 14px; font-weight: 700; color: #f5f6f4; }
      .rule-metrics span { font-size: 11px; color: #adb4b6; }

      .rule-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        flex-wrap: wrap;
        border-top: 1px solid rgba(255, 255, 255, 0.06);
        padding-top: 12px;
      }
      .recipient-line {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: #adb4b6;
      }
      .recipient-line svg { width: 16px; height: 16px; flex-shrink: 0; }
      .card-actions { display: flex; gap: 8px; align-items: center; }
      .card-actions button { display: inline-flex; align-items: center; gap: 6px; }
      .card-actions button svg { width: 15px; height: 15px; flex-shrink: 0; }

      .inline-error {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 10px;
        background: rgba(239, 68, 68, 0.12);
        border: 1px solid rgba(239, 68, 68, 0.3);
        color: #fca5a5;
        font-size: 12px;
      }
      .inline-error svg { width: 16px; height: 16px; flex-shrink: 0; }

      /* Dispositivos Card */
      .device-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 14px;
      }
      .device-card {
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        background: rgba(27, 40, 46, 0.72);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 14px;
      }
      .device-card-head { display: flex; align-items: flex-start; gap: 12px; }
      .device-icon {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        display: grid;
        place-items: center;
        flex-shrink: 0;
      }
      .device-icon svg { width: 20px; height: 20px; color: #60a5fa; }
      .device-title { flex: 1; min-width: 0; }
      .device-title h3 { margin: 0; font-size: 16px; font-weight: 700; color: #f5f6f4; }
      .device-title small { display: block; color: #adb4b6; font-size: 11px; margin-top: 2px; }
      .availability-badge {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 6px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        margin-top: 4px;
      }
      .availability-badge.ok { background: rgba(52, 211, 153, 0.15); color: #34d399; }
      .availability-badge.bad { background: rgba(239, 68, 68, 0.15); color: #f87171; }

      .device-data {
        margin: 0;
        display: grid;
        gap: 6px;
        font-size: 12px;
        padding: 10px 12px;
        border-radius: 10px;
        background: rgba(4, 10, 15, 0.35);
      }
      .device-data div { display: flex; justify-content: space-between; gap: 10px; }
      .device-data dt { color: #adb4b6; }
      .device-data dd { margin: 0; text-align: right; color: #f5f6f4; font-weight: 600; }
      .device-data code { font-size: 11px; color: #60a5fa; }
      .test-button { width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; }
      .test-button svg { width: 16px; height: 16px; }

      /* Historial */
      .history-filter-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 14px;
      }
      .history-search-wrapper { flex: 1; min-width: 200px; max-width: 320px; }
      .history-search-input {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        background: rgba(4, 10, 15, 0.6);
        color: #f5f6f4;
        font-size: 12px;
      }
      .history-meta-line { font-size: 12px; color: #adb4b6; margin-bottom: 12px; }
      .history-list { display: grid; gap: 8px; }
      .history-row {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 12px;
        align-items: center;
        padding: 12px 16px;
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 12px;
        background: rgba(27, 40, 46, 0.6);
      }
      .history-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
      }
      .history-dot.ok { background: #34d399; box-shadow: 0 0 8px rgba(52, 211, 153, 0.5); }
      .history-dot.bad { background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.5); }
      .history-main { min-width: 0; }
      .history-header-line { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
      .history-header-line strong { font-size: 14px; color: #f5f6f4; }
      .history-tag {
        font-size: 10px;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.08);
        color: #adb4b6;
        text-transform: uppercase;
      }
      .history-tag.alert { background: rgba(242, 101, 34, 0.15); color: #f26522; }
      .history-tag.reminder { background: rgba(59, 130, 246, 0.15); color: #60a5fa; }
      .history-tag.recovery { background: rgba(52, 211, 153, 0.15); color: #34d399; }
      .history-status-tag { font-size: 10px; font-weight: 700; }
      .history-status-tag.ok { color: #34d399; }
      .history-status-tag.bad { color: #f87171; }
      .history-main small { display: block; color: #adb4b6; font-size: 12px; margin-top: 2px; }
      .history-error-code {
        margin-top: 6px;
        padding: 6px 10px;
        border-radius: 6px;
        background: rgba(239, 68, 68, 0.12);
        color: #fca5a5;
        font-family: monospace;
        font-size: 11px;
        user-select: text;
      }
      .history-aside { text-align: right; }
      .history-aside strong { display: block; font-size: 13px; color: #f5f6f4; }
      .history-aside time { display: block; color: #adb4b6; font-size: 11px; margin-top: 2px; }

      /* Calendario lista */
      .list { display: grid; gap: 9px; }
      .row {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        background: rgba(27, 40, 46, 0.72);
      }
      .row-details strong { display: block; font-size: 15px; color: #f5f6f4; }
      .row-details small { display: block; margin-top: 4px; color: #adb4b6; font-size: 12px; }
      .row-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; align-items: center; }

      /* Botones comunes */
      .refresh, .primary, .danger, .secondary, .small {
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 12px;
        padding: 10px 15px;
        background: rgba(255, 255, 255, 0.05);
        cursor: pointer;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .primary { background: #f26522; border-color: #f26522; color: #040a0f; }
      .danger { border-color: rgba(239, 68, 68, 0.5); color: #ff9b9b; background: rgba(239, 68, 68, 0.1); }
      .secondary { background: rgba(255, 255, 255, 0.08); }
      .small { padding: 7px 11px; font-size: 12px; }
      .small.is-active { color: #34d399; border-color: rgba(52, 211, 153, 0.4); }
      .small.is-muted { color: #adb4b6; }
      .icon-btn {
        width: 34px;
        height: 34px;
        min-width: 34px;
        min-height: 34px;
        padding: 0;
        display: inline-grid;
        place-items: center;
        border-radius: 10px;
        flex-shrink: 0;
      }
      .icon-btn svg { width: 16px; height: 16px; display: block; }

      /* Modales */
      .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 50;
        background: rgba(4, 10, 15, 0.82);
        backdrop-filter: blur(12px);
        display: grid;
        place-items: center;
        padding: 20px;
        overflow-y: auto;
      }
      .modal-card {
        width: min(540px, 100%);
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 24px;
        background: #0d161d;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
        padding: 24px;
        max-height: min(90vh, 90dvh);
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
      }
      .wizard-card { width: min(680px, 100%); }
      .dialog-card { width: min(480px, 100%); }
      .modal-head { flex-shrink: 0; display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
      .modal-head h3 { margin: 2px 0 0; font-size: 20px; color: #f5f6f4; }

      /* Wizard Steps */
      .wizard-steps {
        flex-shrink: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 8px;
        margin-bottom: 16px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        padding-bottom: 12px;
      }
      .wizard-step-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #adb4b6;
        font-size: 12px;
        font-weight: 700;
      }
      .wizard-step-item .step-num {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.14);
        display: grid;
        place-items: center;
        font-size: 11px;
        flex-shrink: 0;
      }
      .wizard-step-item.active { color: #f26522; }
      .wizard-step-item.active .step-num { background: #f26522; color: #040a0f; border-color: #f26522; }
      .wizard-step-item.past { color: #34d399; }
      .wizard-step-item.past .step-num { background: rgba(52, 211, 153, 0.15); border-color: #34d399; color: #34d399; }

      .wizard-body {
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        display: grid;
        gap: 14px;
        padding-right: 4px;
      }
      .wizard-actions {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 16px;
        padding-top: 14px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      /* Form controls */
      .form-group { display: grid; gap: 6px; }
      .form-group label, .field-label { font-size: 11px; font-weight: 700; color: #adb4b6; text-transform: uppercase; letter-spacing: 0.05em; }
      .field-control {
        width: 100%;
        padding: 11px 14px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 12px;
        background: rgba(4, 10, 15, 0.7);
        color: #f5f6f4;
        font-size: 14px;
      }
      .field-control.textarea { min-height: 80px; resize: vertical; }
      .field-grid { display: grid; gap: 12px; }
      .field-grid.two { grid-template-columns: 1fr 1fr; }
      .field-grid.one { grid-template-columns: 1fr; }
      .field-grid.two.nested { grid-template-columns: 1fr 1fr; }
      .field-label-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
      .help-btn {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.08);
        border: 1px solid rgba(255, 255, 255, 0.16);
        color: #adb4b6;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        display: inline-grid;
        place-items: center;
      }
      .condition-divider { height: 1px; background: rgba(255, 255, 255, 0.08); margin: 12px 0; }
      .section-mini-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
      .section-mini-head strong { font-size: 13px; color: #f5f6f4; }
      .checkbox-row { display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; font-size: 13px; }
      .checkbox-row input { width: 18px; height: 18px; accent-color: #f26522; cursor: pointer; flex-shrink: 0; }
      .modal-actions { display: flex; justify-content: flex-end; gap: 10px; }

      /* Sensor preview box */
      .sensor-preview-box {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(4, 10, 15, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.08);
        margin-top: 10px;
      }
      .sensor-preview-icon { width: 36px; height: 36px; border-radius: 10px; background: rgba(242, 101, 34, 0.12); display: grid; place-items: center; flex-shrink: 0; }
      .sensor-preview-icon svg { width: 20px; height: 20px; color: #f26522; }
      .sensor-preview-copy { flex: 1; min-width: 0; }
      .sensor-preview-copy small { display: block; color: #adb4b6; font-size: 11px; }
      .sensor-preview-copy strong { display: block; color: #f5f6f4; font-size: 14px; }
      .sensor-preview-copy code { font-size: 11px; color: #60a5fa; }
      .sensor-live-pill { text-align: right; }
      .sensor-live-pill small { display: block; color: #adb4b6; font-size: 10px; text-transform: uppercase; }
      .sensor-live-pill strong { font-size: 16px; color: #34d399; }

      /* Logic preview box */
      .logic-preview-box {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        padding: 12px 14px;
        border-radius: 12px;
        background: rgba(52, 211, 153, 0.08);
        border: 1px solid rgba(52, 211, 153, 0.25);
        color: #f5f6f4;
        font-size: 12px;
        line-height: 1.5;
        margin-top: 12px;
      }
      .logic-preview-box svg { width: 18px; height: 18px; flex-shrink: 0; }

      /* Target Picker */
      .target-picker { display: grid; gap: 8px; max-height: 320px; overflow-y: auto; padding-right: 4px; }
      .target-option {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 14px;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        background: rgba(4, 10, 15, 0.5);
        cursor: pointer;
        transition: all 0.15s ease;
      }
      .target-option:hover { background: rgba(255, 255, 255, 0.04); }
      .target-option.selected { border-color: rgba(242, 101, 34, 0.5); background: rgba(242, 101, 34, 0.08); }
      .target-option input { width: 18px; height: 18px; accent-color: #f26522; cursor: pointer; flex-shrink: 0; }
      .target-option-icon { width: 32px; height: 32px; border-radius: 8px; background: rgba(255, 255, 255, 0.06); display: grid; place-items: center; flex-shrink: 0; }
      .target-option-icon svg { width: 16px; height: 16px; color: #60a5fa; }
      .target-option-copy { flex: 1; min-width: 0; }
      .target-option-copy strong { display: block; font-size: 14px; color: #f5f6f4; }
      .target-option-copy small { display: block; color: #adb4b6; font-size: 11px; }
      .target-option-copy code { font-size: 10px; color: #60a5fa; }
      .stale-identity-tag { display: inline-block; font-size: 10px; color: #f87171; background: rgba(239, 68, 68, 0.12); padding: 1px 6px; border-radius: 4px; margin-top: 2px; }
      .availability-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
      .availability-dot.ok { background: #34d399; }
      .availability-dot.bad { background: #ef4444; }

      /* Variable chips */
      .variable-chips { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
      .variable-chips code {
        padding: 3px 6px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: #f26522;
        font-size: 11px;
      }

      /* Smartphone Message Preview */
      .message-preview-card {
        padding: 14px 16px;
        border-radius: 14px;
        background: rgba(4, 10, 15, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 14px;
      }
      .message-preview-card strong { display: block; font-size: 14px; color: #f5f6f4; margin: 4px 0; }
      .message-preview-card p { margin: 0; font-size: 13px; color: #adb4b6; line-height: 1.45; }

      /* Acordeón recuperación */
      .recovery-accordion {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        background: rgba(4, 10, 15, 0.35);
        margin-top: 14px;
        overflow: hidden;
      }
      .accordion-head {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 14px;
        background: none;
        border: none;
        color: #adb4b6;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
      }
      .accordion-head:hover { color: #f5f6f4; }
      .accordion-body { padding: 14px; border-top: 1px solid rgba(255, 255, 255, 0.06); }

      /* Ayuda modal */
      .help-symbol {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(242, 101, 34, 0.15);
        border: 1px solid rgba(242, 101, 34, 0.4);
        color: #f26522;
        display: grid;
        place-items: center;
        font-weight: 800;
      }
      .help-example-card {
        padding: 12px 14px;
        border-radius: 10px;
        background: rgba(4, 10, 15, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.08);
        font-size: 12px;
        line-height: 1.5;
        color: #adb4b6;
      }
      .help-example-card strong { color: #f26522; display: block; margin-bottom: 2px; }

      /* Toast */
      .toast-banner {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 100;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 20px;
        border: 1px solid rgba(242, 101, 34, 0.4);
        border-radius: 14px;
        background: #15222c;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
        color: #f5f6f4;
        animation: slideUp 0.25s ease-out;
      }
      .toast-banner.error { border-color: rgba(239, 68, 68, 0.5); background: #2c1515; }
      @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

      .error { padding: 14px; border: 1px solid rgba(239, 68, 68, 0.5); border-radius: 14px; color: #ff9b9b; background: rgba(100, 20, 20, 0.2); margin-bottom: 16px; }
      .empty { padding: 32px; text-align: center; color: #adb4b6; font-size: 14px; }
      .empty-card { text-align: center; padding: 48px 24px; }
      .empty-icon { width: 56px; height: 56px; border-radius: 50%; background: rgba(255, 255, 255, 0.05); display: grid; place-items: center; margin: 0 auto 16px; }
      .empty-icon svg { width: 28px; height: 28px; color: #adb4b6; }
      .empty-card h3 { font-size: 18px; margin: 0 0 6px; }
      .empty-card p { color: #adb4b6; font-size: 13px; max-width: 480px; margin: 0 auto; line-height: 1.5; }

      /* Light Theme */
      :host([data-theme=light]) { color: #172129; background: linear-gradient(155deg, #f4f7f7, #e9eeee 62%, #dde5e5); }
      :host([data-theme=light]) .signature-topbar { background: rgba(255, 255, 255, 0.9); border-color: rgba(23, 33, 41, 0.12); color: #172129; }
      :host([data-theme=light]) .status-card, :host([data-theme=light]) .surface, :host([data-theme=light]) .rule-card, :host([data-theme=light]) .device-card { background: rgba(255, 255, 255, 0.92); border-color: rgba(23, 33, 41, 0.12); color: #172129; box-shadow: 0 10px 30px rgba(23, 33, 41, 0.06); }
      :host([data-theme=light]) .row { background: rgba(247, 250, 250, 0.95); border-color: rgba(23, 33, 41, 0.12); }
      :host([data-theme=light]) .row-details strong, :host([data-theme=light]) .rule-title-line h3, :host([data-theme=light]) .device-title h3 { color: #172129; }
      :host([data-theme=light]) .row-details small, :host([data-theme=light]) .status-sub, :host([data-theme=light]) .admin-heading p, :host([data-theme=light]) .rule-title p { color: #556268; }
      :host([data-theme=light]) .filter-btn, :host([data-theme=light]) .tab-btn { border-color: rgba(23, 33, 41, 0.14); background: rgba(247, 250, 250, 0.96); color: #556268; }
      :host([data-theme=light]) .refresh, :host([data-theme=light]) .secondary { border-color: rgba(23, 33, 41, 0.14); background: rgba(247, 250, 250, 0.96); color: #172129; }
      :host([data-theme=light]) .modal-card { background: #ffffff; border-color: rgba(23, 33, 41, 0.16); color: #172129; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.2); }
      :host([data-theme=light]) .field-control, :host([data-theme=light]) .modal-form input, :host([data-theme=light]) .modal-form textarea { background: #f7fafa; border-color: rgba(23, 33, 41, 0.18); color: #172129; }
      :host([data-theme=light]) .toast-banner { background: #ffffff; color: #172129; border-color: rgba(242, 101, 34, 0.4); }

      :host([data-theme=light]) .rule-metrics { background: rgba(235, 241, 242, 0.95); border: 1px solid rgba(23, 33, 41, 0.08); }
      :host([data-theme=light]) .rule-metrics strong { color: #172129; }
      :host([data-theme=light]) .rule-metrics small, :host([data-theme=light]) .rule-metrics span { color: #556268; }

      :host([data-theme=light]) .switch-button:not(.on) { background: rgba(23, 33, 41, 0.22); }
      :host([data-theme=light]) .switch-button:not(.on) span { background: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); }

      :host([data-theme=light]) .device-data { background: rgba(235, 241, 242, 0.95); border: 1px solid rgba(23, 33, 41, 0.08); }
      :host([data-theme=light]) .device-data dt { color: #556268; }
      :host([data-theme=light]) .device-data dd { color: #172129; }
      :host([data-theme=light]) .device-data code { color: #1d4ed8; }

      :host([data-theme=light]) .target-option { background: rgba(240, 244, 244, 0.9); border-color: rgba(23, 33, 41, 0.12); }
      :host([data-theme=light]) .target-option:hover { background: rgba(230, 237, 237, 1); }
      :host([data-theme=light]) .target-option.selected { background: rgba(242, 101, 34, 0.1); border-color: rgba(242, 101, 34, 0.6); }
      :host([data-theme=light]) .target-option-copy strong { color: #172129; }
      :host([data-theme=light]) .target-option-copy small { color: #556268; }

      :host([data-theme=light]) .logic-preview-box { background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.4); color: #064e3b; }
      :host([data-theme=light]) .sensor-preview-box { background: rgba(235, 241, 242, 0.95); border-color: rgba(23, 33, 41, 0.1); }
      :host([data-theme=light]) .sensor-preview-copy strong { color: #172129; }
      :host([data-theme=light]) .sensor-preview-copy small { color: #556268; }
      :host([data-theme=light]) .sensor-live-pill strong { color: #047857; }

      :host([data-theme=light]) .message-preview-card { background: rgba(235, 241, 242, 0.95); border-color: rgba(23, 33, 41, 0.12); }
      :host([data-theme=light]) .message-preview-card strong { color: #172129; }
      :host([data-theme=light]) .message-preview-card p { color: #334155; }

      :host([data-theme=light]) .history-row { background: rgba(255, 255, 255, 0.95); border-color: rgba(23, 33, 41, 0.1); }
      :host([data-theme=light]) .history-header-line strong { color: #172129; }
      :host([data-theme=light]) .history-main small { color: #556268; }
      :host([data-theme=light]) .history-aside strong { color: #172129; }
      :host([data-theme=light]) .history-aside time { color: #556268; }
      :host([data-theme=light]) .history-search-input { background: #ffffff; color: #172129; border-color: rgba(23, 33, 41, 0.18); }
      :host([data-theme=light]) .history-meta-line { color: #556268; }
      :host([data-theme=light]) .help-btn { background: rgba(23, 33, 41, 0.08); border-color: rgba(23, 33, 41, 0.18); color: #556268; }

      @media (max-width: 860px) {
        .hero-status-grid { grid-template-columns: 1fr; }
        .wizard-steps { grid-template-columns: 1fr 1fr; }
      }
      @media (max-width: 760px) {
        .signature-topbar { min-height: 68px; padding: 10px 14px; }
        .signature-brand { gap: 0; }
        .signature-brand span { display: none; }
        .signature-clock { font-size: 24px; }
        .dashboard { padding: 16px 14px 90px; }
        .admin-heading { display: grid; grid-template-columns: 1fr; gap: 14px; }
        .heading-actions { justify-content: flex-start; }
        .row { grid-template-columns: 1fr; gap: 10px; }
        .row-actions { justify-content: flex-start; }
        .field-grid.two { grid-template-columns: 1fr; }
        .history-filter-bar { flex-direction: column; align-items: flex-start; }
        .history-search-wrapper { max-width: 100%; width: 100%; }
        .history-row { grid-template-columns: auto 1fr; }
        .history-aside { grid-column: 2; text-align: left; margin-top: 4px; }
        .modal-backdrop { padding: 12px 10px; }
        .modal-card { padding: 18px 16px; border-radius: 20px; }
        .device-grid { grid-template-columns: 1fr; }
        .rule-footer { flex-direction: column; align-items: flex-start; gap: 10px; }
        .card-actions { width: 100%; justify-content: flex-end; }
      }
    `}}customElements.get("witmind-admin-panel")||customElements.define("witmind-admin-panel",Ut);const Vt=l=>{const e=l.last_changed??l.last_updated;if(typeof e=="string"){const i=Date.parse(e);if(Number.isFinite(i))return i}const t=Number(l.lu??l.lc??l.timestamp);return Number.isFinite(t)?t<1e10?t*1e3:t:Number.NaN},Xt=l=>String(l.state??l.s??"unknown");function Yt(l){const e={},t=(i,a)=>{if(!i)return;const r=a.filter(s=>!!(s&&typeof s=="object")).map(s=>({state:Xt(s),timestamp:Vt(s)})).filter(s=>Number.isFinite(s.timestamp)).sort((s,o)=>s.timestamp-o.timestamp);e[i]=r};return Array.isArray(l)?(l.forEach(i=>{if(!Array.isArray(i)||!i.length)return;const a=i[0];t(String(a.entity_id??a.entityId??""),i)}),e):(l&&typeof l=="object"&&Object.entries(l).forEach(([i,a])=>{Array.isArray(a)&&t(i,a)}),e)}function Gt(l,e,t,i,a){const r=Math.max(6e4,a),s=Math.max(1,Math.ceil(Math.max(0,i-t)/r)),o=Array.from({length:s},(g,u)=>({start:t+u*r,end:Math.min(i,t+(u+1)*r),totalKwh:0,zones:{}})),n={},c=l.map(g=>{const u=Array.from({length:s},()=>0),m=(e[g.entity]||[]).filter(y=>y.timestamp<=i);let _="off";for(const y of m){if(y.timestamp>t)break;_=y.state}const k=[{state:_,timestamp:t},...m.filter(y=>y.timestamp>t&&y.timestamp<i)];k.forEach((y,E)=>{var T;if(y.state!=="on")return;let C=Math.max(t,y.timestamp);const w=Math.min(i,((T=k[E+1])==null?void 0:T.timestamp)??i);for(;C<w;){const N=Math.min(s-1,Math.floor((C-t)/r)),z=Math.min(w,t+(N+1)*r);u[N]+=Math.max(0,z-C)/36e5,C=z}});const S=u.reduce((y,E)=>y+E,0),b=g.watts===null?null:S*g.watts/1e3;return g.watts!==null&&(u.forEach((y,E)=>{const C=y*g.watts/1e3;o[E].totalKwh+=C,o[E].zones[g.zone]=(o[E].zones[g.zone]||0)+C}),n[g.zone]=(n[g.zone]||0)+(b||0)),{...g,hours:S,kwh:b,bucketHours:u}}),d=o.reduce((g,u)=>g+u.totalKwh,0),h=Math.max(0,...o.map(g=>g.totalKwh)),p=Math.max(0,o.findIndex(g=>g.totalKwh===h));return{buckets:o,circuits:c,totalKwh:d,zoneTotals:n,peakKwh:h,peakIndex:p,knownCircuits:l.filter(g=>g.watts!==null).length,totalCircuits:l.length}}function Zt(l){return Array.from({length:9},(e,t)=>{const i=(t+1)*10,a=Math.max(0,l)*(i/100);return{percent:i,savedKwh:a,remainingKwh:Math.max(0,l-a)}})}const He=[{entity:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",zone:"showroom",zoneLabel:"Showroom",watts:100},{entity:"switch.interruptor_inteligente_switch_2",name:"Spots 2x3",zone:"showroom",zoneLabel:"Showroom",watts:120},{entity:"switch.interruptor_inteligente_switch_3",name:"Spots 3x3",zone:"showroom",zoneLabel:"Showroom",watts:180},{entity:"switch.interruptor_inteligente_switch_4",name:"Spots TV",zone:"showroom",zoneLabel:"Showroom",watts:25},{entity:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",zone:"showroom",zoneLabel:"Showroom",watts:96},{entity:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",zone:"showroom",zoneLabel:"Showroom",watts:10},{entity:"switch.interruptor_inteligente_2_switch_3",name:"Slims",zone:"showroom",zoneLabel:"Showroom",watts:432},{entity:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",zone:"showroom",zoneLabel:"Showroom",watts:144},{entity:"switch.smart_relay_switch_4_switch",name:"Paneles (relé)",zone:"showroom",zoneLabel:"Showroom",watts:288},{entity:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",zone:"showroom",zoneLabel:"Showroom",watts:100},{entity:"switch.interruptor_inteligente_3_switch_1",name:"Central Colgante",zone:"lobby",zoneLabel:"Lobby",watts:100},{entity:"switch.interruptor_inteligente_3_switch_2",name:"Spots 5W Decorativos",zone:"lobby",zoneLabel:"Lobby",watts:40},{entity:"switch.interruptor_inteligente_3_switch_3",name:"Tira LED",zone:"lobby",zoneLabel:"Lobby",watts:168},{entity:"switch.interruptor_inteligente_3_switch_4",name:"Spots 10W",zone:"lobby",zoneLabel:"Lobby",watts:205},{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",zone:"offices",zoneLabel:"Oficinas",watts:48},{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",zone:"offices",zoneLabel:"Oficinas",watts:48},{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",zone:"offices",zoneLabel:"Oficinas",watts:192},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",zone:"offices",zoneLabel:"Oficinas",watts:192},{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",zone:"offices",zoneLabel:"Oficinas",watts:96},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",zone:"offices",zoneLabel:"Oficinas",watts:117},{entity:"switch.taller_interruptor_1",name:"Taller",zone:"offices",zoneLabel:"Oficinas",watts:144},{entity:"switch.4gang_switch_sala_grabacion_interruptor_1",name:"Tiras LED",zone:"recording",zoneLabel:"Grabación",watts:42},{entity:"switch.4gang_switch_sala_grabacion_interruptor_2",name:"Paneles",zone:"recording",zoneLabel:"Grabación",watts:96},{entity:"switch.4gang_switch_sala_grabacion_interruptor_3",name:"Tracklight",zone:"recording",zoneLabel:"Grabación",watts:45},{entity:"switch.4gang_switch_sala_grabacion_interruptor_4",name:"Spots",zone:"recording",zoneLabel:"Grabación",watts:20}],je=[{id:"showroom",label:"Showroom",opacity:1},{id:"offices",label:"Oficinas",opacity:.74},{id:"recording",label:"Grabación",opacity:.5},{id:"lobby",label:"Lobby",opacity:.28}],Kt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="3" x2="21" y1="6" y2="6"></line><line x1="3" x2="21" y1="12" y2="12"></line><line x1="3" x2="21" y1="18" y2="18"></line></svg>',ne='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 2 5 13h6l-1 9 8-11h-6l1-9Z"></path></svg>',Qt='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>';class Jt extends HTMLElement{constructor(){super(),this._hass=null,this._panel={},this._range="day",this._report=null,this._loading=!1,this._error="",this._requestId=0,this._dimming=30,this._theme=this._loadTheme(),this.attachShadow({mode:"open"}),this.shadowRoot.addEventListener("click",e=>this._handleClick(e)),this.shadowRoot.addEventListener("input",e=>this._handleInput(e))}set hass(e){var i,a,r,s,o;const t=!((a=(i=this._hass)==null?void 0:i.connection)!=null&&a.sendMessagePromise)&&!!((r=e==null?void 0:e.connection)!=null&&r.sendMessagePromise);this._hass=e,this.isConnected&&((s=this.shadowRoot)!=null&&s.querySelector(".energy-panel")?this._updateLiveMetrics():this._render(),(t||!this._report&&!this._loading&&((o=e==null?void 0:e.connection)!=null&&o.sendMessagePromise))&&this._loadHistory())}get hass(){return this._hass}set panel(e){this._panel=e||{},this._report=null,this.isConnected&&(this._render(),this._hass&&this._loadHistory())}get panel(){return this._panel}set theme(e){if(e!=="dark"&&e!=="light")return;const t=this._theme!==e;this._theme=e,this.setAttribute("data-theme",e),this._saveTheme(),t&&this.isConnected&&this._render()}get theme(){return this._theme}connectedCallback(){this.setAttribute("data-theme",this._theme),this._render(),this._hass&&!this._report&&this._loadHistory()}disconnectedCallback(){this._requestId+=1}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_saveTheme(){try{localStorage.setItem("witmind-showroom-panel-theme",this._theme)}catch{}}_escape(e){return String(e??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}_formatEnergy(e){return new Intl.NumberFormat("es-BO",{minimumFractionDigits:e<10?2:1,maximumFractionDigits:e<10?2:1}).format(e)}_formatPower(e){return e>=1e3?`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:2}).format(e/1e3)} kW`:`${Math.round(e)} W`}_circuits(){const e=this._panel.energy_circuits??this._panel.energyCircuits;if(!Array.isArray(e))return He;const t=new Map(e.filter(i=>i&&typeof i=="object").map(i=>[String(i.entity||""),i]));return He.map(i=>{const a=t.get(i.entity);if(!a)return i;const r=a.watts,s=Number(r),o=r===null?null:Number.isFinite(s)&&s>=0?s:i.watts;return{...i,...a,watts:o}})}_definition(){const e=Date.now();return this._range==="week"?{start:e-7*864e5,end:e,bucketMs:864e5,title:"Últimos 7 días",bucketLabel:"día"}:this._range==="month"?{start:e-30*864e5,end:e,bucketMs:864e5,title:"Últimos 30 días",bucketLabel:"día"}:{start:e-24*36e5,end:e,bucketMs:36e5,title:"Últimas 24 horas",bucketLabel:"hora"}}async _loadHistory(){var a,r;const e=(r=(a=this._hass)==null?void 0:a.connection)==null?void 0:r.sendMessagePromise;if(!e||this._loading)return;const t=++this._requestId,i=this._definition();this._loading=!0,this._error="",this._render();try{const s=await e({type:"history/history_during_period",start_time:new Date(i.start).toISOString(),end_time:new Date(i.end).toISOString(),entity_ids:this._circuits().map(o=>o.entity),minimal_response:!0,no_attributes:!0,significant_changes_only:!0});if(t!==this._requestId)return;this._report=Gt(this._circuits(),Yt(s),i.start,i.end,i.bucketMs)}catch(s){if(t!==this._requestId)return;this._error=s instanceof Error?s.message:"No se pudo cargar el historial",this._report=null}finally{t===this._requestId&&(this._loading=!1,this._render())}}_currentPower(){return this._circuits().reduce((e,t)=>{var i,a,r;return e+(t.watts!==null&&((r=(a=(i=this._hass)==null?void 0:i.states)==null?void 0:a[t.entity])==null?void 0:r.state)==="on"?t.watts:0)},0)}_activeCount(){return this._circuits().filter(e=>{var t,i,a;return((a=(i=(t=this._hass)==null?void 0:t.states)==null?void 0:i[e.entity])==null?void 0:a.state)==="on"}).length}_installedPower(){return this._circuits().reduce((e,t)=>e+(t.watts||0),0)}_updateLiveMetrics(){var r,s;const e=(r=this.shadowRoot)==null?void 0:r.querySelector("[data-live-active]"),t=(s=this.shadowRoot)==null?void 0:s.querySelector("[data-live-power]"),i=this._activeCount(),a=this._circuits().length-i;e&&(e.textContent=`${i} enc. · ${a} apag.`),t&&(t.textContent=this._formatPower(this._currentPower()))}_handleClick(e){const t=e.target.closest("[data-action]");if(!t)return;const i=t.dataset.action;if(i==="toggle-menu"&&this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0})),i==="toggle-theme"&&(this.theme=this._theme==="dark"?"light":"dark",this.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:this._theme},bubbles:!0,composed:!0}))),i==="range"){const a=t.dataset.range;(a==="day"||a==="week"||a==="month")&&(this._range=a,this._report=null,this._loadHistory())}i==="refresh"&&this._loadHistory()}_handleInput(e){const t=e.target.closest("[data-dimming]");t&&(this._dimming=Math.min(90,Math.max(10,Number(t.value)||10)),this._updateDimmingPresentation())}_updateDimmingPresentation(){var s,o,n,c;if(!this._report)return;const e=this._report.totalKwh*(this._dimming/100),t=Math.max(0,this._report.totalKwh-e),i=(s=this.shadowRoot)==null?void 0:s.querySelector("[data-dim-percent]"),a=(o=this.shadowRoot)==null?void 0:o.querySelector("[data-dim-saved]"),r=(n=this.shadowRoot)==null?void 0:n.querySelector("[data-dim-remaining]");i&&(i.textContent=`${this._dimming} %`),a&&(a.textContent=`${this._formatEnergy(e)} kWh`),r&&(r.textContent=`${this._formatEnergy(t)} kWh`),(c=this.shadowRoot)==null||c.querySelectorAll("[data-dim-point]").forEach(d=>d.classList.toggle("is-selected",Number(d.dataset.dimPoint)===this._dimming))}_bucketLabel(e,t){const i=new Date(e);return this._range==="day"?t%3===0?new Intl.DateTimeFormat("es-BO",{hour:"2-digit",minute:"2-digit",timeZone:"America/La_Paz"}).format(i):"":t%(this._range==="month"?4:1)===0?new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"short",timeZone:"America/La_Paz"}).format(i):""}_renderZoneChart(e){const c=Math.max(.001,...e.buckets.map(u=>u.totalKwh)),d=894/e.buckets.length,h=Math.max(5,Math.min(34,d*.66)),p=Array.from({length:5},(u,m)=>{const _=16+200*m/4,k=c*(1-m/4);return`<line x1="54" y1="${_}" x2="948" y2="${_}" class="chart-grid"></line><text x="46" y="${_+4}" text-anchor="end" class="chart-label">${this._formatEnergy(k)}</text>`}).join(""),g=e.buckets.map((u,m)=>{let _=0;const k=54+d*m+(d-h)/2,S=je.map(y=>{const E=u.zones[y.id]||0,C=E/c*200;return _+=C,`<rect x="${k}" y="${216-_}" width="${h}" height="${Math.max(0,C)}" rx="3" class="zone-bar" style="opacity:${y.opacity}"><title>${y.label}: ${this._formatEnergy(E)} kWh</title></rect>`}).join(""),b=this._bucketLabel(u.start,m);return`${S}${b?`<text x="${k+h/2}" y="240" text-anchor="middle" class="chart-label">${this._escape(b)}</text>`:""}`}).join("");return`<div class="chart-scroll" data-no-swipe><svg class="zone-chart" viewBox="0 0 960 250" role="img" aria-label="Consumo estimado por zona y período">${p}${g}</svg></div>`}_renderUsage(e){const t=this._definition().bucketMs/36e5;return`<div class="usage-list">${e.circuits.map(i=>`<div class="usage-row"><div class="usage-name"><strong>${this._escape(i.name)}</strong><span>${this._escape(i.zoneLabel)} · ${i.watts===null?"Potencia pendiente":this._formatPower(i.watts)}</span></div><div class="usage-cells" style="--usage-columns:${i.bucketHours.length}">${i.bucketHours.map((a,r)=>`<i style="--usage:${Math.min(1,a/t)}" title="${this._escape(this._bucketLabel(e.buckets[r].start,r)||`Intervalo ${r+1}`)}: ${a.toFixed(2)} h"></i>`).join("")}</div><div class="usage-value"><strong>${i.hours.toFixed(1)} h</strong><span>${i.kwh===null?"Sin kWh":`${this._formatEnergy(i.kwh)} kWh`}</span></div></div>`).join("")}</div>`}_renderDimming(e){const t=Zt(e.totalKwh),i=760,a=220,r=48,s=20,o=34,n=Math.max(.001,t[t.length-1].savedKwh),c=t.map((p,g)=>({...p,x:r+g*((i-r-20)/(t.length-1)),y:s+(1-p.savedKwh/n)*(a-s-o)})),d=c.map((p,g)=>`${g?"L":"M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "),h=t.find(p=>p.percent===this._dimming)||t[2];return`<div class="dimming-layout"><div class="dimming-controls"><label for="building-dimming">Reducción de potencia <strong data-dim-percent>${this._dimming} %</strong></label><input id="building-dimming" data-dimming type="range" min="10" max="90" step="10" value="${this._dimming}" aria-label="Porcentaje de dimerización"><div class="dimming-metrics"><div><small>Ahorro estimado</small><strong data-dim-saved>${this._formatEnergy(h.savedKwh)} kWh</strong></div><div><small>Consumo restante</small><strong data-dim-remaining>${this._formatEnergy(h.remainingKwh)} kWh</strong></div></div><p>Modelo lineal sobre circuitos con potencia documentada. No representa una medición física ni confirma compatibilidad eléctrica con dimmers.</p></div><div class="chart-scroll" data-no-swipe><svg class="dimming-chart" viewBox="0 0 ${i} ${a}" role="img" aria-label="Ahorro estimado por porcentaje de dimerización"><line x1="${r}" y1="${a-o}" x2="${i-20}" y2="${a-o}" class="chart-grid"></line><path d="${d}" class="saving-line"></path>${c.map(p=>`<g><circle cx="${p.x}" cy="${p.y}" r="5" class="saving-point ${p.percent===this._dimming?"is-selected":""}" data-dim-point="${p.percent}"><title>${p.percent}%: ${this._formatEnergy(p.savedKwh)} kWh</title></circle><text x="${p.x}" y="${a-10}" text-anchor="middle" class="chart-label">${p.percent}%</text></g>`).join("")}</svg></div></div>`}_renderReport(e){var a;const t=this._definition(),i=this._bucketLabel(((a=e.buckets[e.peakIndex])==null?void 0:a.start)||t.start,e.peakIndex)||`Intervalo ${e.peakIndex+1}`;return`<div class="metrics-grid"><article><small>Consumo estimado</small><strong>${this._formatEnergy(e.totalKwh)} kWh</strong><span>${this._escape(t.title)}</span></article><article><small>Promedio por ${t.bucketLabel}</small><strong>${this._formatEnergy(e.totalKwh/e.buckets.length)} kWh</strong><span>${e.buckets.length} intervalos</span></article><article><small>Mayor intervalo</small><strong>${this._formatEnergy(e.peakKwh)} kWh</strong><span>${this._escape(i)}</span></article><article><small>Cobertura nominal</small><strong>${e.knownCircuits} de ${e.totalCircuits}</strong><span>${this._formatPower(this._installedPower())} documentados</span></article></div><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Consumo por zona</span><h2>Historial energético</h2></div><div class="legend">${je.map(r=>`<span style="--legend-opacity:${r.opacity}"><i></i>${r.label}</span>`).join("")}</div></div>${this._renderZoneChart(e)}</section><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Uso por iluminación</span><h2>Horas por circuito</h2></div><span class="section-meta">${e.totalCircuits} circuitos</span></div>${this._renderUsage(e)}</section><section class="surface chart-card"><div class="section-head"><div><span class="eyebrow">Escenario de eficiencia</span><h2>Ahorro por dimerización</h2></div><span class="section-meta">10 % a 90 %</span></div>${this._renderDimming(e)}</section>`}_render(){if(!this.shadowRoot)return;this.setAttribute("data-theme",this._theme);const e=this._definition(),t=new Intl.DateTimeFormat("es-BO",{hour:"numeric",minute:"2-digit",timeZone:"America/La_Paz"}).format(new Date),i=this._report;this.shadowRoot.innerHTML=`<style>
      :host{--primary:#f26522;--primary-soft:rgba(242,101,34,.12);--primary-border:rgba(242,101,34,.36);--canvas:#071118;--surface:rgba(16,25,30,.88);--surface-control:rgba(27,40,46,.72);--surface-hover:rgba(255,255,255,.07);--text-primary:#f5f6f4;--text-secondary:#adb4b6;--text-tertiary:#747e82;--border:rgba(255,255,255,.1);--border-subtle:rgba(255,255,255,.07);--shadow:rgba(0,0,0,.24);display:block;min-height:100dvh;color:var(--text-primary);background:linear-gradient(155deg,#040a0f,#071118 62%,#10191e);font-family:Manrope,system-ui,sans-serif;font-variant-numeric:tabular-nums}:host([data-theme=light]){--canvas:#eef2f1;--surface:rgba(255,255,255,.92);--surface-control:rgba(247,250,250,.96);--surface-hover:#fff;--text-primary:#172129;--text-secondary:#526066;--text-tertiary:#7a868b;--border:rgba(23,33,41,.14);--border-subtle:rgba(23,33,41,.09);--shadow:rgba(50,65,68,.12);background:linear-gradient(155deg,#f5f1ed,#eef2f1 52%,#e8edec)}*{box-sizing:border-box}button,input{font:inherit}.energy-panel{min-height:100dvh}.topbar{position:sticky;top:0;z-index:20;min-height:80px;padding:12px clamp(18px,2.6vw,48px);display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;border-bottom:1px solid var(--border-subtle);background:color-mix(in srgb,var(--canvas) 88%,transparent);backdrop-filter:blur(18px)}.topbar-start,.topbar-end,.status-strip{display:flex;align-items:center;gap:10px}.topbar-end{justify-content:flex-end}.menu-button,.theme-button,.icon-button{width:48px;height:48px;display:grid;place-items:center;border:1px solid var(--border);border-radius:50%;background:var(--surface-control);color:var(--text-primary);cursor:pointer}.menu-button svg,.theme-button svg,.icon-button svg{width:20px;height:20px}.brand{display:flex;align-items:baseline;gap:10px}.brand strong{font-size:18px;letter-spacing:.06em}.brand span{color:var(--primary);font-size:9px;font-weight:800}.status-pill{min-width:112px;height:52px;padding:7px 14px;display:flex;align-items:center;gap:9px;border:1px solid var(--border);border-radius:999px;background:var(--surface-control)}.status-pill svg{width:18px;height:18px;color:var(--primary)}.status-pill strong,.status-pill small{display:block}.status-pill strong{font-size:11px}.status-pill small{margin-top:2px;color:var(--text-tertiary);font-size:8px}.clock{font-size:28px;font-weight:500;letter-spacing:-.05em}.dashboard{width:min(1540px,100%);margin:auto;padding:clamp(18px,2.4vw,34px);padding-bottom:100px}.workspace-heading{display:flex;align-items:end;justify-content:space-between;gap:18px;margin:8px 0 18px}.eyebrow{display:block;color:var(--primary);font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}.workspace-heading h1{margin:4px 0 0;font-size:clamp(30px,4vw,44px);letter-spacing:-.045em}.workspace-heading p{max-width:650px;margin:7px 0 0;color:var(--text-secondary);font-size:12px;line-height:1.55}.toolbar{display:flex;align-items:center;gap:8px}.range-tabs{display:flex;padding:4px;border:1px solid var(--border);border-radius:14px;background:var(--surface)}.range-tabs button{min-width:70px;height:36px;border:0;border-radius:10px;background:transparent;color:var(--text-secondary);font-size:10px;font-weight:800;cursor:pointer}.range-tabs button.is-active{background:var(--primary);color:#fff;box-shadow:0 5px 16px rgba(242,101,34,.22)}.surface{border:1px solid var(--border-subtle);border-radius:22px;background:var(--surface);box-shadow:0 16px 40px var(--shadow)}.metrics-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.metrics-grid article{min-width:0;padding:15px 17px;border:1px solid var(--border);border-radius:16px;background:var(--surface-control)}.metrics-grid small,.metrics-grid strong,.metrics-grid span{display:block}.metrics-grid small{color:var(--text-tertiary);font-size:9px;font-weight:800;letter-spacing:.05em;text-transform:uppercase}.metrics-grid strong{margin-top:6px;font-size:20px;letter-spacing:-.03em}.metrics-grid span{margin-top:4px;color:var(--text-tertiary);font-size:9px}.chart-card{margin-top:12px;padding:20px}.section-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:14px}.section-head h2{margin:4px 0 0;font-size:18px;letter-spacing:-.025em}.section-meta{color:var(--text-tertiary);font-size:10px}.legend{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.legend span{display:flex;align-items:center;gap:5px;color:var(--text-tertiary);font-size:9px}.legend i{width:8px;height:8px;border-radius:3px;background:var(--primary);opacity:var(--legend-opacity)}.chart-scroll{width:100%;overflow-x:auto;overscroll-behavior-x:contain}.zone-chart,.dimming-chart{display:block;width:100%;min-width:720px;height:auto}.chart-grid{stroke:var(--border-subtle);stroke-width:1}.chart-label{fill:var(--text-tertiary);font:600 9px Manrope,sans-serif}.zone-bar{fill:var(--primary)}.usage-list{max-height:590px;display:grid;gap:6px;overflow:auto;padding-right:4px}.usage-row{display:grid;grid-template-columns:minmax(170px,1.1fr) minmax(320px,3fr) 88px;align-items:center;gap:12px;padding:9px 11px;border:1px solid var(--border-subtle);border-radius:13px;background:var(--surface-control)}.usage-name,.usage-value{min-width:0}.usage-name strong,.usage-name span,.usage-value strong,.usage-value span{display:block}.usage-name strong{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px}.usage-name span,.usage-value span{margin-top:3px;color:var(--text-tertiary);font-size:8px}.usage-value{text-align:right}.usage-value strong{font-size:11px}.usage-cells{height:23px;display:grid;grid-template-columns:repeat(var(--usage-columns),minmax(4px,1fr));align-items:stretch;gap:2px}.usage-cells i{border-radius:3px;background:color-mix(in srgb,var(--primary) calc(12% + var(--usage) * 88%),var(--surface-control));box-shadow:inset 0 0 0 1px var(--border-subtle)}.dimming-layout{display:grid;grid-template-columns:minmax(260px,.8fr) minmax(520px,1.6fr);align-items:center;gap:28px}.dimming-controls label{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:11px;font-weight:700}.dimming-controls label strong{color:var(--primary);font-size:20px}.dimming-controls input{width:100%;margin:18px 0;accent-color:var(--primary)}.dimming-metrics{display:grid;grid-template-columns:1fr 1fr;gap:8px}.dimming-metrics div{padding:12px;border:1px solid var(--border);border-radius:14px;background:var(--surface-control)}.dimming-metrics small,.dimming-metrics strong{display:block}.dimming-metrics small{color:var(--text-tertiary);font-size:8px;text-transform:uppercase}.dimming-metrics strong{margin-top:5px;font-size:15px}.dimming-controls p{margin:12px 0 0;color:var(--text-tertiary);font-size:9px;line-height:1.5}.saving-line{fill:none;stroke:var(--primary);stroke-width:3}.saving-point{fill:var(--surface);stroke:var(--primary);stroke-width:2;transition:r 160ms,fill 160ms}.saving-point.is-selected{r:8px;fill:var(--primary)}.state-card{min-height:300px;margin-top:12px;display:grid;place-items:center;padding:36px;text-align:center}.state-card strong{display:block;font-size:16px}.state-card span{display:block;max-width:560px;margin-top:8px;color:var(--text-tertiary);font-size:11px;line-height:1.5}.loader{width:34px;height:34px;margin:0 auto 14px;border:3px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}button:focus-visible,input:focus-visible{outline:2px solid var(--primary);outline-offset:2px}button:active{transform:translateY(1px)}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}@media(max-width:1100px){.topbar{grid-template-columns:1fr auto}.status-strip{display:none}.metrics-grid{grid-template-columns:repeat(2,1fr)}.dimming-layout{grid-template-columns:1fr}.usage-row{grid-template-columns:minmax(150px,1fr) minmax(280px,2fr) 80px}}@media(max-width:760px){.topbar{min-height:68px;padding:10px 14px}.brand span{display:none}.menu-button,.theme-button{width:44px;height:44px}.clock{font-size:24px}.dashboard{padding:16px 14px 90px}.workspace-heading{display:grid;align-items:stretch;gap:12px;margin:4px 0 18px}.workspace-heading h1{font-size:26px}.workspace-heading p{max-width:none}.toolbar{justify-content:space-between}.range-tabs{flex:1}.range-tabs button{min-width:0;flex:1}}@media(max-width:700px){.metrics-grid{grid-template-columns:1fr}.chart-card{padding:16px}.section-head{display:grid}.legend{gap:8px}.usage-row{grid-template-columns:1fr 70px}.usage-cells{grid-column:1/-1;grid-row:2}.dimming-metrics{grid-template-columns:1fr}.zone-chart,.dimming-chart{min-width:620px}}
    </style><div class="energy-panel"><header class="topbar"><div class="topbar-start"><button class="menu-button" data-action="toggle-menu" aria-label="Abrir menú de Home Assistant">${Kt}</button><div class="brand"><strong>WITMIND</strong><span>WTX · MDTC</span></div></div><div class="status-strip"><div class="status-pill">${ne}<span><strong data-live-active>${this._activeCount()} enc. · ${this._circuits().length-this._activeCount()} apag.</strong><small>Activos / Inactivos</small></span></div><div class="status-pill">${ne}<span><strong data-live-power>${this._formatPower(this._currentPower())}</strong><small>Potencia actual</small></span></div><div class="status-pill">${ne}<span><strong>${this._formatPower(this._installedPower())}</strong><small>Potencia conocida</small></span></div></div><div class="topbar-end"><time class="clock">${this._escape(t)}</time><button class="theme-button" data-action="toggle-theme" aria-label="Cambiar tema">${Qt}</button></div></header><main class="dashboard"><section class="workspace-heading"><div><span class="eyebrow">Analítica del edificio</span><h1>Gestión de energía</h1><p>Consumo estimado, horas de uso y escenarios de ahorro para Showroom, Lobby, Oficinas y Sala de grabación.</p></div><div class="toolbar"><div class="range-tabs" role="tablist" aria-label="Período de análisis">${["day","week","month"].map(a=>`<button data-action="range" data-range="${a}" class="${this._range===a?"is-active":""}" role="tab" aria-selected="${this._range===a}">${a==="day"?"24 h":a==="week"?"7 días":"30 días"}</button>`).join("")}</div><button class="icon-button" data-action="refresh" aria-label="Actualizar historial" title="Actualizar">${ne}</button></div></section>${this._loading?`<section class="surface state-card"><div><div class="loader"></div><strong>Cargando historial energético</strong><span>Consultando ${this._circuits().length} circuitos para ${this._escape(e.title.toLowerCase())}.</span></div></section>`:this._error?`<section class="surface state-card"><div><strong>No se pudo cargar el historial</strong><span>${this._escape(this._error)}. Usa Actualizar para volver a intentarlo.</span></div></section>`:i?this._renderReport(i):'<section class="surface state-card"><div><strong>Sin datos disponibles</strong><span>Home Assistant todavía no devolvió historial para este período.</span></div></section>'}</main></div>`}}customElements.get("witmind-energy-panel")||customElements.define("witmind-energy-panel",Jt);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oe=globalThis,Ce=oe.ShadowRoot&&(oe.ShadyCSS===void 0||oe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Te=Symbol(),Be=new WeakMap;let gt=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Te)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ce&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Be.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Be.set(t,e))}return e}toString(){return this.cssText}};const ei=l=>new gt(typeof l=="string"?l:l+"",void 0,Te),ti=(l,...e)=>{const t=l.length===1?l[0]:e.reduce((i,a,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+l[r+1],l[0]);return new gt(t,l,Te)},ii=(l,e)=>{if(Ce)l.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),a=oe.litNonce;a!==void 0&&i.setAttribute("nonce",a),i.textContent=t.cssText,l.appendChild(i)}},Ue=Ce?l=>l:l=>l instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ei(t)})(l):l;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ai,defineProperty:ri,getOwnPropertyDescriptor:si,getOwnPropertyNames:ni,getOwnPropertySymbols:oi,getPrototypeOf:li}=Object,P=globalThis,Ve=P.trustedTypes,ci=Ve?Ve.emptyScript:"",fe=P.reactiveElementPolyfillSupport,K=(l,e)=>l,we={toAttribute(l,e){switch(e){case Boolean:l=l?ci:null;break;case Object:case Array:l=l==null?l:JSON.stringify(l)}return l},fromAttribute(l,e){let t=l;switch(e){case Boolean:t=l!==null;break;case Number:t=l===null?null:Number(l);break;case Object:case Array:try{t=JSON.parse(l)}catch{t=null}}return t}},ut=(l,e)=>!ai(l,e),Xe={attribute:!0,type:String,converter:we,reflect:!1,useDefault:!1,hasChanged:ut};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),P.litPropertyMetadata??(P.litPropertyMetadata=new WeakMap);let V=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Xe){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);a!==void 0&&ri(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=si(this.prototype,e)??{get(){return this[t]},set(s){this[t]=s}};return{get:a,set(s){const o=a==null?void 0:a.call(this);r==null||r.call(this,s),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Xe}static _$Ei(){if(this.hasOwnProperty(K("elementProperties")))return;const e=li(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(K("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(K("properties"))){const t=this.properties,i=[...ni(t),...oi(t)];for(const a of i)this.createProperty(a,t[a])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,a]of t)this.elementProperties.set(i,a)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const a=this._$Eu(t,i);a!==void 0&&this._$Eh.set(a,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const a of i)t.unshift(Ue(a))}else e!==void 0&&t.push(Ue(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ii(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var r;const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(a!==void 0&&i.reflect===!0){const s=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:we).toAttribute(t,i.type);this._$Em=e,s==null?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){var r,s;const i=this.constructor,a=i._$Eh.get(e);if(a!==void 0&&this._$Em!==a){const o=i.getPropertyOptions(a),n=typeof o.converter=="function"?{fromAttribute:o.converter}:((r=o.converter)==null?void 0:r.fromAttribute)!==void 0?o.converter:we;this._$Em=a;const c=n.fromAttribute(t,o.type);this[a]=c??((s=this._$Ej)==null?void 0:s.get(a))??c,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){var s;if(e!==void 0){const o=this.constructor;if(a===!1&&(r=this[e]),i??(i=o.getPropertyOptions(e)),!((i.hasChanged??ut)(r,t)||i.useDefault&&i.reflect&&r===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},s){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,s??t??this[e]),r!==!0||s!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),a===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,s]of this._$Ep)this[r]=s;this._$Ep=void 0}const a=this.constructor.elementProperties;if(a.size>0)for(const[r,s]of a){const{wrapped:o}=s,n=this[r];o!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,s,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(a=>{var r;return(r=a.hostUpdate)==null?void 0:r.call(a)}),this.update(t)):this._$EM()}catch(a){throw e=!1,this._$EM(),a}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var a;return(a=i.hostUpdated)==null?void 0:a.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};V.elementStyles=[],V.shadowRootOptions={mode:"open"},V[K("elementProperties")]=new Map,V[K("finalized")]=new Map,fe==null||fe({ReactiveElement:V}),(P.reactiveElementVersions??(P.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=globalThis,Ye=l=>l,de=Q.trustedTypes,Ge=de?de.createPolicy("lit-html",{createHTML:l=>l}):void 0,mt="$lit$",R=`lit$${Math.random().toFixed(9).slice(2)}$`,ft="?"+R,di=`<${ft}>`,B=document,ee=()=>B.createComment(""),te=l=>l===null||typeof l!="object"&&typeof l!="function",Ne=Array.isArray,pi=l=>Ne(l)||typeof(l==null?void 0:l[Symbol.iterator])=="function",be=`[ 	
\f\r]`,Z=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ze=/-->/g,Ke=/>/g,F=RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Qe=/'/g,Je=/"/g,bt=/^(?:script|style|textarea|title)$/i,hi=l=>(e,...t)=>({_$litType$:l,strings:e,values:t}),$=hi(1),Y=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),et=new WeakMap,W=B.createTreeWalker(B,129);function _t(l,e){if(!Ne(l)||!l.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ge!==void 0?Ge.createHTML(e):e}const gi=(l,e)=>{const t=l.length-1,i=[];let a,r=e===2?"<svg>":e===3?"<math>":"",s=Z;for(let o=0;o<t;o++){const n=l[o];let c,d,h=-1,p=0;for(;p<n.length&&(s.lastIndex=p,d=s.exec(n),d!==null);)p=s.lastIndex,s===Z?d[1]==="!--"?s=Ze:d[1]!==void 0?s=Ke:d[2]!==void 0?(bt.test(d[2])&&(a=RegExp("</"+d[2],"g")),s=F):d[3]!==void 0&&(s=F):s===F?d[0]===">"?(s=a??Z,h=-1):d[1]===void 0?h=-2:(h=s.lastIndex-d[2].length,c=d[1],s=d[3]===void 0?F:d[3]==='"'?Je:Qe):s===Je||s===Qe?s=F:s===Ze||s===Ke?s=Z:(s=F,a=void 0);const g=s===F&&l[o+1].startsWith("/>")?" ":"";r+=s===Z?n+di:h>=0?(i.push(c),n.slice(0,h)+mt+n.slice(h)+R+g):n+R+(h===-2?o:g)}return[_t(l,r+(l[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};class ie{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,s=0;const o=e.length-1,n=this.parts,[c,d]=gi(e,t);if(this.el=ie.createElement(c,i),W.currentNode=this.el.content,t===2||t===3){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=W.nextNode())!==null&&n.length<o;){if(a.nodeType===1){if(a.hasAttributes())for(const h of a.getAttributeNames())if(h.endsWith(mt)){const p=d[s++],g=a.getAttribute(h).split(R),u=/([.?@])?(.*)/.exec(p);n.push({type:1,index:r,name:u[2],strings:g,ctor:u[1]==="."?mi:u[1]==="?"?fi:u[1]==="@"?bi:pe}),a.removeAttribute(h)}else h.startsWith(R)&&(n.push({type:6,index:r}),a.removeAttribute(h));if(bt.test(a.tagName)){const h=a.textContent.split(R),p=h.length-1;if(p>0){a.textContent=de?de.emptyScript:"";for(let g=0;g<p;g++)a.append(h[g],ee()),W.nextNode(),n.push({type:2,index:++r});a.append(h[p],ee())}}}else if(a.nodeType===8)if(a.data===ft)n.push({type:2,index:r});else{let h=-1;for(;(h=a.data.indexOf(R,h+1))!==-1;)n.push({type:7,index:r}),h+=R.length-1}r++}}static createElement(e,t){const i=B.createElement("template");return i.innerHTML=e,i}}function G(l,e,t=l,i){var s,o;if(e===Y)return e;let a=i!==void 0?(s=t._$Co)==null?void 0:s[i]:t._$Cl;const r=te(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==r&&((o=a==null?void 0:a._$AO)==null||o.call(a,!1),r===void 0?a=void 0:(a=new r(l),a._$AT(l,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=a:t._$Cl=a),a!==void 0&&(e=G(l,a._$AS(l,e.values),a,i)),e}class ui{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=((e==null?void 0:e.creationScope)??B).importNode(t,!0);W.currentNode=a;let r=W.nextNode(),s=0,o=0,n=i[0];for(;n!==void 0;){if(s===n.index){let c;n.type===2?c=new ae(r,r.nextSibling,this,e):n.type===1?c=new n.ctor(r,n.name,n.strings,this,e):n.type===6&&(c=new _i(r,this,e)),this._$AV.push(c),n=i[++o]}s!==(n==null?void 0:n.index)&&(r=W.nextNode(),s++)}return W.currentNode=B,a}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ae{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=(a==null?void 0:a.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),te(e)?e===x||e==null||e===""?(this._$AH!==x&&this._$AR(),this._$AH=x):e!==this._$AH&&e!==Y&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):pi(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==x&&te(this._$AH)?this._$AA.nextSibling.data=e:this.T(B.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:i}=e,a=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ie.createElement(_t(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===a)this._$AH.p(t);else{const s=new ui(a,this),o=s.u(this.options);s.p(t),this.T(o),this._$AH=s}}_$AC(e){let t=et.get(e.strings);return t===void 0&&et.set(e.strings,t=new ie(e)),t}k(e){Ne(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new ae(this.O(ee()),this.O(ee()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const a=Ye(e).nextSibling;Ye(e).remove(),e=a}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class pe{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=x,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=x}_$AI(e,t=this,i,a){const r=this.strings;let s=!1;if(r===void 0)e=G(this,e,t,0),s=!te(e)||e!==this._$AH&&e!==Y,s&&(this._$AH=e);else{const o=e;let n,c;for(e=r[0],n=0;n<r.length-1;n++)c=G(this,o[i+n],t,n),c===Y&&(c=this._$AH[n]),s||(s=!te(c)||c!==this._$AH[n]),c===x?e=x:e!==x&&(e+=(c??"")+r[n+1]),this._$AH[n]=c}s&&!a&&this.j(e)}j(e){e===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class mi extends pe{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===x?void 0:e}}class fi extends pe{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==x)}}class bi extends pe{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??x)===Y)return;const i=this._$AH,a=e===x&&i!==x||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==x&&(i===x||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class _i{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}}const _e=Q.litHtmlPolyfillSupport;_e==null||_e(ie,ae),(Q.litHtmlVersions??(Q.litHtmlVersions=[])).push("3.3.3");const yi=(l,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let a=i._$litPart$;if(a===void 0){const r=(t==null?void 0:t.renderBefore)??null;i._$litPart$=a=new ae(e.insertBefore(ee(),r),r,void 0,t??{})}return a._$AI(l),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis;class J extends V{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=yi(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Y}}var pt;J._$litElement$=!0,J.finalized=!0,(pt=j.litElementHydrateSupport)==null||pt.call(j,{LitElement:J});const ye=j.litElementPolyfillSupport;ye==null||ye({LitElement:J});(j.litElementVersions??(j.litElementVersions=[])).push("4.2.2");/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vi=[["path",{d:"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xi=[["path",{d:"m7 7 10 10"}],["path",{d:"M17 7v10H7"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wi=[["path",{d:"M7 7h10v10"}],["path",{d:"M7 17 17 7"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $i=[["path",{d:"M20 6 9 17l-5-5"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ki=[["path",{d:"m6 9 6 6 6-6"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Si=[["path",{d:"m9 18 6-6-6-6"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ei=[["path",{d:"m18 15-6-6-6 6"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mi=[["circle",{cx:"12",cy:"12",r:"10"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ai=[["circle",{cx:"12",cy:"12",r:"10"}],["polyline",{points:"12 6 12 12 16 14"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zi=[["rect",{width:"16",height:"16",x:"4",y:"4",rx:"2"}],["rect",{width:"6",height:"6",x:"9",y:"9",rx:"1"}],["path",{d:"M15 2v2"}],["path",{d:"M15 20v2"}],["path",{d:"M2 15h2"}],["path",{d:"M2 9h2"}],["path",{d:"M20 15h2"}],["path",{d:"M20 9h2"}],["path",{d:"M9 2v2"}],["path",{d:"M9 20v2"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ci=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ti=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ni=[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Di=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Li=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2"}],["path",{d:"M3 9h18"}],["path",{d:"M3 15h18"}],["path",{d:"M9 3v18"}],["path",{d:"M15 3v18"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ii=[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ri=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pi=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oi=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],["path",{d:"M9 18h6"}],["path",{d:"M10 22h4"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fi=[["polyline",{points:"15 3 21 3 21 9"}],["polyline",{points:"9 21 3 21 3 15"}],["line",{x1:"21",x2:"14",y1:"3",y2:"10"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qi=[["polyline",{points:"4 14 10 14 10 20"}],["polyline",{points:"20 10 14 10 14 4"}],["line",{x1:"14",x2:"21",y1:"10",y2:"3"}],["line",{x1:"3",x2:"10",y1:"21",y2:"14"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wi=[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hi=[["path",{d:"M12 2v20"}],["path",{d:"m15 19-3 3-3-3"}],["path",{d:"m19 9 3 3-3 3"}],["path",{d:"M2 12h20"}],["path",{d:"m5 9-3 3 3 3"}],["path",{d:"m9 5 3-3 3 3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ji=[["path",{d:"M9 18V5l12-2v13"}],["circle",{cx:"6",cy:"18",r:"3"}],["circle",{cx:"18",cy:"16",r:"3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bi=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tt=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ui=[["polygon",{points:"6 3 20 12 6 21 6 3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vi=[["path",{d:"M12 2v10"}],["path",{d:"M18.4 6.6a9 9 0 1 1-12.77.04"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xi=[["path",{d:"M4.9 19.1C1 15.2 1 8.8 4.9 4.9"}],["path",{d:"M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"}],["circle",{cx:"12",cy:"12",r:"2"}],["path",{d:"M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"}],["path",{d:"M19.1 4.9C23 8.8 23 15.1 19.1 19"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yi=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gi=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zi=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ki=[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"}],["circle",{cx:"12",cy:"12",r:"3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qi=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ji=[["polygon",{points:"19 20 9 12 19 4 19 20"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ea=[["polygon",{points:"5 4 15 12 5 20 5 4"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ta=[["line",{x1:"4",x2:"4",y1:"21",y2:"14"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ia=[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"}],["path",{d:"M20 3v4"}],["path",{d:"M22 5h-4"}],["path",{d:"M4 17v2"}],["path",{d:"M5 18H3"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const aa=[["circle",{cx:"12",cy:"12",r:"4"}],["path",{d:"M12 2v2"}],["path",{d:"M12 20v2"}],["path",{d:"m4.93 4.93 1.41 1.41"}],["path",{d:"m17.66 17.66 1.41 1.41"}],["path",{d:"M2 12h2"}],["path",{d:"M20 12h2"}],["path",{d:"m6.34 17.66-1.41 1.41"}],["path",{d:"m19.07 4.93-1.41 1.41"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ra=[["path",{d:"M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sa=[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17"}],["polyline",{points:"16 7 22 7 22 13"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const na=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oa=[["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",ry:"2"}],["polyline",{points:"17 2 12 7 7 2"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const la=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["path",{d:"M16 9a5 5 0 0 1 0 6"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ca=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const da=[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=[["path",{d:"M12 20h.01"}],["path",{d:"M2 8.82a15 15 0 0 1 20 0"}],["path",{d:"M5 12.859a10 10 0 0 1 14 0"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ha=[["path",{d:"M12.8 19.6A2 2 0 1 0 14 16H2"}],["path",{d:"M17.5 8a2.5 2.5 0 1 1 2 4H2"}],["path",{d:"M9.8 4.4A2 2 0 1 1 11 8H2"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]];/**
 * @license lucide v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=[["circle",{cx:"11",cy:"11",r:"8"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11"}]],ba={home:Ii,lightbulb:Oi,sun:aa,moon:Wi,zap:ua,music:ji,sliders:ta,activity:vi,shield:Qi,power:Vi,"chevron-right":Si,"chevron-down":ki,"chevron-up":Ei,x:ga,check:$i,"alert-triangle":na,"alert-circle":Mi,clock:Ai,thermometer:ra,droplets:Ci,wind:ha,sparkles:ia,play:Ui,pause:Bi,"skip-forward":ea,"skip-back":Ji,"volume-2":la,"volume-x":ca,"arrow-up-right":wi,"arrow-down-right":xi,layers:Pi,tv:oa,cpu:zi,"refresh-cw":Yi,eye:Ti,settings:Ki,flame:Ni,radio:Xi,wifi:pa,"wifi-off":da,maximize:Fi,minimize:qi,gauge:Di,"trending-up":sa,grid:Li,info:Ri,pencil:tt,edit:tt,move:Hi,"rotate-ccw":Gi,save:Zi,"zoom-in":ma,"zoom-out":fa};function v(l,e={}){const t=e.size||22,i=e.strokeWidth||1.8,a=e.color||"currentColor",r=e.className||"",s=ba[l.toLowerCase()];return s?$`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="${t}"
      height="${t}"
      viewBox="0 0 24 24"
      fill="none"
      stroke="${a}"
      stroke-width="${i}"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="wit-icon ${r}"
    >
      ${s.map(([o,n])=>o==="path"?$`<path d="${n.d}"></path>`:o==="circle"?$`<circle cx="${n.cx}" cy="${n.cy}" r="${n.r}"></circle>`:o==="line"?$`<line x1="${n.x1}" y1="${n.y1}" x2="${n.x2}" y2="${n.y2}"></line>`:o==="rect"?$`<rect width="${n.width}" height="${n.height}" x="${n.x}" y="${n.y}" rx="${n.rx||0}"></rect>`:o==="polygon"?$`<polygon points="${n.points}"></polygon>`:o==="polyline"?$`<polyline points="${n.points}"></polyline>`:null)}
    </svg>
  `:$`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="${t}"
        height="${t}"
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
    `}const _a=(l,e)=>{if(!Number.isFinite(l))return null;const t=String(e||"W").trim().toLowerCase();return t==="kw"?l*1e3:t==="mw"?l*1e6:t==="w"?l:null},L={weather:"weather.forecast_casa",showroomPower:"sensor.showroom_potencia_activa",showroomEnergy:"sensor.showroom_energia_activa",lobbyPower:"sensor.sensor_de_potencia_showroom_p"},le=[{id:"ground.showroom",floor:"ground",label:"Showroom",power:L.showroomPower,circuits:[{entity:"switch.interruptor_inteligente_switch_1",label:"Spots ventana",watts:100},{entity:"switch.interruptor_inteligente_switch_2",label:"Spots 2x3",watts:120},{entity:"switch.interruptor_inteligente_switch_3",label:"Spots 3x3",watts:180},{entity:"switch.interruptor_inteligente_switch_4",label:"Spots TV",watts:25},{entity:"switch.interruptor_inteligente_2_switch_1",label:"Paneles 3k/6k",watts:96},{entity:"switch.interruptor_inteligente_2_switch_2",label:"Colgantes",watts:10},{entity:"switch.interruptor_inteligente_2_switch_3",label:"Slims",watts:432},{entity:"switch.interruptor_inteligente_2_switch_4",label:"Downlights",watts:144},{entity:"switch.smart_relay_switch_4_switch",label:"Paneles (relé)",watts:288},{entity:"switch.smart_relay_switch_3_switch",label:"Reflector exterior",watts:100}],action:{label:"Modo reunión",serviceEntity:"scene.reunion",onEntities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2"],offEntities:["switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_4_switch","switch.smart_relay_switch_3_switch"]}},{id:"ground.witronix_admin",floor:"ground",label:"Witronix Admin",temperature:"sensor.t_h_sensor_temperature",humidity:"sensor.t_h_sensor_humidity",showInTable:!1,circuits:[]},{id:"ground.lobby",floor:"ground",label:"Lobby",power:L.lobbyPower,circuits:[{entity:"switch.interruptor_inteligente_3_switch_1",label:"Central Colgante",watts:100},{entity:"switch.interruptor_inteligente_3_switch_2",label:"Spots 5W Decorativos",watts:40},{entity:"switch.interruptor_inteligente_3_switch_3",label:"Tira LED",watts:168},{entity:"switch.interruptor_inteligente_3_switch_4",label:"Spots 10W",watts:205}],action:{label:"Modo regular",serviceEntity:"scene.regular",onEntities:["switch.interruptor_inteligente_3_switch_4"],offEntities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3"]}},{id:"ground.grabacion",floor:"ground",label:"Grabación",circuits:[{entity:"switch.4gang_switch_sala_grabacion_interruptor_1",label:"Tiras LED",watts:42},{entity:"switch.4gang_switch_sala_grabacion_interruptor_2",label:"Paneles",watts:96},{entity:"switch.4gang_switch_sala_grabacion_interruptor_3",label:"Tracklight",watts:45},{entity:"switch.4gang_switch_sala_grabacion_interruptor_4",label:"Spots",watts:20}],action:{label:"Iluminación completa",onEntities:["switch.4gang_switch_sala_grabacion_interruptor_1","switch.4gang_switch_sala_grabacion_interruptor_2","switch.4gang_switch_sala_grabacion_interruptor_3","switch.4gang_switch_sala_grabacion_interruptor_4"],offEntities:[]}},{id:"upper.witronix",floor:"upper",label:"Witronix",circuits:[{entity:"switch.oficina_gerencial_interruptor_1",label:"Witronix LED",watts:48}],action:{label:"Encender todo",onEntities:["switch.oficina_gerencial_interruptor_1"],offEntities:[]}},{id:"upper.mindtec",floor:"upper",label:"Mindtec",circuits:[{entity:"switch.oficina_mindtec_interruptor_1",label:"Mindtec",watts:48}],action:{label:"Encender todo",onEntities:["switch.oficina_mindtec_interruptor_1"],offEntities:[]}},{id:"upper.office_large",floor:"upper",label:"Oficina grande",temperature:"sensor.t_h_sensor_2_temperature",humidity:"sensor.t_h_sensor_2_humidity",circuits:[{entity:"switch.oficina_grande_interruptor_1",label:"Oficina general 1",watts:192},{entity:"switch.oficina_grande_interruptor_2",label:"Oficina general 2",watts:192}],action:{label:"Encender todo",onEntities:["switch.oficina_grande_interruptor_1","switch.oficina_grande_interruptor_2"],offEntities:[]}},{id:"upper.sala_multiuso",floor:"upper",label:"Sala multiuso",circuits:[{entity:"switch.b2_gang_interruptor_1",label:"Multifuncional",watts:96},{entity:"switch.b2_gang_interruptor_2",label:"Pasillos",watts:117}],action:{label:"Encender todo",onEntities:["switch.b2_gang_interruptor_1","switch.b2_gang_interruptor_2"],offEntities:[]}},{id:"upper.taller",floor:"upper",label:"Taller",circuits:[{entity:"switch.taller_interruptor_1",label:"Taller",watts:144}],action:{label:"Encender todo",onEntities:["switch.taller_interruptor_1"],offEntities:[]}}],yt={ground:[{zoneId:"ground.witronix_admin",left:8,top:13,width:22},{zoneId:"ground.showroom",left:8,top:47,width:22},{zoneId:"ground.lobby",left:38,top:51,width:21},{zoneId:"ground.grabacion",left:65,top:52,width:15}],upper:[{zoneId:"upper.mindtec",left:8,top:14,width:20},{zoneId:"upper.witronix",left:8,top:50,width:20},{zoneId:"upper.taller",left:41,top:16,width:16},{zoneId:"upper.sala_multiuso",left:38,top:50,width:18},{zoneId:"upper.office_large",left:62,top:50,width:20}]},ya=[...new Set([L.weather,L.showroomPower,L.showroomEnergy,...le.flatMap(l=>{var e,t,i;return[l.temperature,l.humidity,l.power,(e=l.action)==null?void 0:e.serviceEntity,...((t=l.action)==null?void 0:t.onEntities)||[],...((i=l.action)==null?void 0:i.offEntities)||[],...l.circuits.map(a=>a.entity)]})].filter(l=>!!l))],vt="witmind_building_layout_v2",xt={x:0,y:0,scale:1};function H(l,e,t){return Math.min(Math.max(l,e),t)}function wt(l){const e={},t=yt[l]||[];for(const i of t)e[i.zoneId]={zoneId:i.zoneId,left:i.left,top:i.top,width:i.width||21,scale:1};return e}function $e(l){return{image:{...xt},overlays:wt(l)}}function va(){return{ground:$e("ground"),upper:$e("upper")}}function ke(l){if(!l||typeof l!="object")return{...xt};const e=typeof l.x=="number"&&Number.isFinite(l.x)?H(Math.round(l.x*10)/10,-40,40):0,t=typeof l.y=="number"&&Number.isFinite(l.y)?H(Math.round(l.y*10)/10,-40,40):0,i=typeof l.scale=="number"&&Number.isFinite(l.scale)?H(Math.round(l.scale*100)/100,.6,2):1;return{x:e,y:t,scale:i}}function ce(l,e,t=21){const i=typeof(e==null?void 0:e.width)=="number"&&Number.isFinite(e.width)?H(Math.round(e.width*10)/10,10,60):t,a=typeof(e==null?void 0:e.scale)=="number"&&Number.isFinite(e.scale)?H(Math.round(e.scale*100)/100,.7,1.4):1,r=typeof(e==null?void 0:e.left)=="number"&&Number.isFinite(e.left)?H(Math.round(e.left*10)/10,-40,130):10,s=typeof(e==null?void 0:e.top)=="number"&&Number.isFinite(e.top)?H(Math.round(e.top*10)/10,-25,120):10;return{zoneId:l,left:r,top:s,width:i,scale:a}}function xa(){const l=va();if(typeof localStorage>"u")return l;try{const e=localStorage.getItem(vt);if(!e)return l;const t=JSON.parse(e);if(!t||typeof t!="object")return l;for(const i of["ground","upper"]){const a=t[i];if(a&&typeof a=="object"&&(l[i].image=ke(a.image),a.overlays&&typeof a.overlays=="object")){const r=wt(i);for(const[s,o]of Object.entries(a.overlays)){const n=r[s];l[i].overlays[s]=ce(s,o,(n==null?void 0:n.width)||21)}}}}catch(e){console.warn("No se pudieron cargar las personalizaciones del plano:",e)}return l}function q(l){if(!(typeof localStorage>"u"))try{localStorage.setItem(vt,JSON.stringify(l))}catch(e){console.warn("No se pudo guardar la personalización del plano en localStorage:",e)}}function wa(l,e){const t={...l,[e]:$e(e)};return q(t),t}const it={ground:{label:"Planta Baja",context:"Showroom",aspectRatio:1536/1024,images:{dark:{webp:"./building/planta-baja-dark.webp",png:"./building/planta-baja-dark.png"},light:{webp:"./building/planta-baja-light.webp",png:"./building/planta-baja-light.png"}}},upper:{label:"Planta Alta",context:"Taller",aspectRatio:1448/1086,images:{dark:{webp:"./building/planta-alta-dark.webp",png:"./building/planta-alta-dark.png"},light:{webp:"./building/planta-alta-light.webp",png:"./building/planta-alta-light.png"}}}},$a={"clear-night":"Despejado de noche",cloudy:"Nublado",exceptional:"Condición excepcional",fog:"Niebla",hail:"Granizo",lightning:"Tormenta eléctrica","lightning-rainy":"Tormenta y lluvia",partlycloudy:"Parcialmente nublado",pouring:"Lluvia intensa",rainy:"Lluvioso",snowy:"Nevado","snowy-rainy":"Aguanieve",sunny:"Soleado",windy:"Ventoso","windy-variant":"Viento y nubes"},D=l=>!l||l.state==="unknown"||l.state==="unavailable",X=(l,e)=>{var a;if(D(l))return null;const t=e?(a=l==null?void 0:l.attributes)==null?void 0:a[e]:l==null?void 0:l.state,i=Number(t);return Number.isFinite(i)?i:null},at=l=>{var t;const e=X(l);return e===null?null:_a(e,String(((t=l==null?void 0:l.attributes)==null?void 0:t.unit_of_measurement)||"W"))},De=class De extends J{constructor(){super(...arguments),this._hass=null,this._panel={},this._theme="dark",this._activeFloor="ground",this._actionState="idle",this._actionMessage="",this._clock=new Date,this._history=[],this._historyTrend=null,this._historyState="idle",this._historyRequested=!1,this._touchStartX=null,this._touchLastX=null,this._mouseStartX=null,this._mouseLastX=null,this._editMode=!1,this._layoutStore=xa(),this._draggingOverlay=null,this._resizingOverlay=null,this._draggingImage=null,this._resizeObserver=null,this._onWindowResize=()=>{this._updateFloorDimensions()},this._onTouchMove=e=>{if(this._editMode||this._touchStartX===null)return;const t=e.touches[0];t&&(this._touchLastX=t.clientX,Math.abs(t.clientX-this._touchStartX)>12&&e.preventDefault())},this._onTouchEnd=()=>{this._editMode||(this._touchStartX!==null&&this._touchLastX!==null&&this._finishFloorSwipe(this._touchLastX-this._touchStartX),this._touchStartX=null,this._touchLastX=null)},this._onTouchCancel=()=>{this._touchStartX=null,this._touchLastX=null},this._onPointerMove=e=>{this._editMode||this._mouseStartX!==null&&(this._mouseLastX=e.clientX)},this._onPointerUp=()=>{this._editMode||(this._mouseStartX!==null&&this._mouseLastX!==null&&this._finishFloorSwipe(this._mouseLastX-this._mouseStartX),this._mouseStartX=null,this._mouseLastX=null)},this._onPointerCancel=()=>{this._mouseStartX=null,this._mouseLastX=null},this._resetActiveFloor=()=>{this._layoutStore=wa(this._layoutStore,this._activeFloor),this.requestUpdate()},this._onOverlayPointerMove=e=>{if(!this._draggingOverlay)return;e.preventDefault(),e.stopPropagation();const{zoneId:t,startPointerX:i,startPointerY:a,startLeft:r,startTop:s,stageWidth:o,stageHeight:n,overlayWidth:c}=this._draggingOverlay,d=(e.clientX-i)/o*100,h=(e.clientY-a)/n*100,p=this._layoutStore[this._activeFloor].overlays[t];this._layoutStore[this._activeFloor].overlays[t]=ce(t,{...p,left:r+d,top:s+h,width:c},c),this.requestUpdate()},this._onOverlayPointerUp=e=>{if(this._draggingOverlay){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}this._draggingOverlay=null,q(this._layoutStore),this.requestUpdate()}},this._onOverlayResizeMove=e=>{if(!this._resizingOverlay)return;e.preventDefault(),e.stopPropagation();const{zoneId:t,startPointerX:i,startWidth:a,stageWidth:r}=this._resizingOverlay,s=(e.clientX-i)/r*100,o=this._layoutStore[this._activeFloor].overlays[t];this._layoutStore[this._activeFloor].overlays[t]=ce(t,{...o,width:a+s},a),this.requestUpdate()},this._onOverlayResizeUp=e=>{if(this._resizingOverlay){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}this._resizingOverlay=null,q(this._layoutStore),this.requestUpdate()}},this._onStagePointerDown=e=>{if(!this._editMode||e.button!==0)return;const t=e.target;if(t.closest(".zone-overlay")||t.closest("button"))return;e.preventDefault();const i=e.currentTarget;i.setPointerCapture(e.pointerId);const a=i.getBoundingClientRect(),r=this._layoutStore[this._activeFloor].image;this._draggingImage={startPointerX:e.clientX,startPointerY:e.clientY,startX:r.x,startY:r.y,stageWidth:a.width||1,stageHeight:a.height||1}},this._onStagePointerMove=e=>{if(!this._draggingImage)return;e.preventDefault();const{startPointerX:t,startPointerY:i,startX:a,startY:r,stageWidth:s,stageHeight:o}=this._draggingImage,n=(e.clientX-t)/s*100,c=(e.clientY-i)/o*100;this._layoutStore[this._activeFloor].image=ke({x:a+n,y:r+c,scale:this._layoutStore[this._activeFloor].image.scale}),this.requestUpdate()},this._onStagePointerUp=e=>{if(this._draggingImage){try{e.currentTarget.releasePointerCapture(e.pointerId)}catch{}this._draggingImage=null,q(this._layoutStore),this.requestUpdate()}}}set hass(e){const t=this._hass;this._hass=e,this.requestUpdate("hass",t),this.isConnected&&!this._historyRequested&&this._loadHistory()}get hass(){return this._hass}set panel(e){const t=this._panel;this._panel=e&&typeof e=="object"?e:{},this.requestUpdate("panel",t)}get panel(){return this._panel}set theme(e){if(e!=="dark"&&e!=="light")return;const t=this._theme;this._theme=e,this.setAttribute("data-theme",e),this.requestUpdate("theme",t)}get theme(){return this._theme}connectedCallback(){super.connectedCallback(),this.setAttribute("data-theme",this._theme),this._clockTimer=window.setInterval(()=>{this._clock=new Date,this.requestUpdate()},3e4),window.addEventListener("touchmove",this._onTouchMove,{passive:!1}),window.addEventListener("touchend",this._onTouchEnd,{passive:!0}),window.addEventListener("touchcancel",this._onTouchCancel,{passive:!0}),window.addEventListener("pointermove",this._onPointerMove),window.addEventListener("pointerup",this._onPointerUp),window.addEventListener("pointercancel",this._onPointerCancel),window.addEventListener("resize",this._onWindowResize),this._historyRequested||this._loadHistory()}disconnectedCallback(){super.disconnectedCallback(),this._clockTimer&&window.clearInterval(this._clockTimer),this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),window.removeEventListener("touchmove",this._onTouchMove),window.removeEventListener("touchend",this._onTouchEnd),window.removeEventListener("touchcancel",this._onTouchCancel),window.removeEventListener("pointermove",this._onPointerMove),window.removeEventListener("pointerup",this._onPointerUp),window.removeEventListener("pointercancel",this._onPointerCancel),window.removeEventListener("resize",this._onWindowResize)}firstUpdated(){const e=this.renderRoot.querySelector(".floor-viewport");e&&typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(()=>this._updateFloorDimensions()),this._resizeObserver.observe(e)),this._updateFloorDimensions()}updated(e){e.has("theme")&&this.setAttribute("data-theme",this._theme),this._updateFloorDimensions()}_updateFloorDimensions(){var c,d;const e=(c=this.renderRoot)==null?void 0:c.querySelector(".floor-viewport"),t=(d=this.renderRoot)==null?void 0:d.querySelector(".floor-stage");if(!e||!t)return;const i=e.getBoundingClientRect(),a=24,r=24,s=Math.max(10,i.width-a),o=Math.max(10,i.height-r),n=it[this._activeFloor].aspectRatio;s/o>n?(t.style.height=`${o}px`,t.style.width=`${o*n}px`):(t.style.width=`${s}px`,t.style.height=`${s/n}px`)}_state(e){var t,i;return(i=(t=this._hass)==null?void 0:t.states)==null?void 0:i[e]}_zones(){return le.filter(e=>e.floor===this._activeFloor)}_availableCircuits(e){return e.circuits.filter(t=>!D(this._state(t.entity)))}_onCircuits(e){return this._availableCircuits(e).filter(t=>{var i;return((i=this._state(t.entity))==null?void 0:i.state)==="on"})}_profileActive(e){return e.action?[...e.action.onEntities,...e.action.offEntities].some(i=>D(this._state(i)))?!1:e.action.onEntities.every(i=>{var a;return((a=this._state(i))==null?void 0:a.state)==="on"})&&e.action.offEntities.every(i=>{var a;return((a=this._state(i))==null?void 0:a.state)==="off"}):this._onCircuits(e).length>0}_zonePower(e){const t=e.power?at(this._state(e.power)):null;if(t!==null)return{value:t,measured:!0};const i=this._onCircuits(e).filter(a=>typeof a.watts=="number");return i.length?{value:i.reduce((a,r)=>a+Number(r.watts),0),measured:!1}:null}_format(e,t,i=0){return e===null?"No disponible":`${new Intl.NumberFormat("es-BO",{maximumFractionDigits:i}).format(e)} ${t}`}_weather(){const e=this._state(L.weather);return{available:!D(e),temperature:X(e,"temperature"),condition:$a[String((e==null?void 0:e.state)||"")]||(D(e)?"No disponible":String(e==null?void 0:e.state))}}_environment(){const e=this._zones().map(a=>a.temperature&&X(this._state(a.temperature))).filter(a=>typeof a=="number"),t=this._zones().map(a=>a.humidity&&X(this._state(a.humidity))).filter(a=>typeof a=="number"),i=a=>a.length?a.reduce((r,s)=>r+s,0)/a.length:null;return{temperature:i(e),humidity:i(t)}}_activePower(){const e=at(this._state(L.showroomPower));return e===null?null:e}async _loadHistory(){var i,a;const e=(a=(i=this._hass)==null?void 0:i.connection)==null?void 0:a.sendMessagePromise;if(!e||D(this._state(L.showroomPower))){this._historyState="unavailable",this.requestUpdate();return}this._historyRequested=!0,this._historyState="loading",this.requestUpdate();const t=Date.now();try{const r=await e({type:"history/history_during_period",start_time:new Date(t-1728e5).toISOString(),end_time:new Date(t).toISOString(),entity_ids:[L.showroomPower],minimal_response:!0,no_attributes:!0,significant_changes_only:!1}),s=Array.isArray(r)?Array.isArray(r[0])?r[0]:r:Object.values(r||{})[0],o=(Array.isArray(s)?s:[]).map(p=>({value:Number((p==null?void 0:p.state)??(p==null?void 0:p.s)),time:Date.parse(String((p==null?void 0:p.last_changed)??(p==null?void 0:p.last_updated)??(p==null?void 0:p.lu)??(p==null?void 0:p.lc)??""))})).filter(p=>Number.isFinite(p.value)&&Number.isFinite(p.time)),n=new Map;o.forEach(p=>n.set(Math.floor(p.time/36e5),p.value));const c=Math.floor(t/36e5),d=Array.from({length:24},(p,g)=>n.get(c-23+g)).filter(p=>typeof p=="number"),h=Array.from({length:24},(p,g)=>n.get(c-47+g)).filter(p=>typeof p=="number");if(this._history=d,d.length&&h.length){const p=d.reduce((u,m)=>u+m,0)/d.length,g=h.reduce((u,m)=>u+m,0)/h.length;this._historyTrend=g>0?(p-g)/g*100:null}this._historyState=d.length?"ready":"unavailable"}catch{this._historyState="error"}this.requestUpdate()}_setFloor(e){e!==this._activeFloor&&(this._activeFloor=e,this.requestUpdate())}_onTouchStart(e){if(this._editMode)return;const t=e.changedTouches[0]||e.touches[0];t&&(this._touchStartX=t.clientX,this._touchLastX=t.clientX)}_onPointerDown(e){this._editMode||e.pointerType==="touch"||e.button!==0||(this._mouseStartX=e.clientX,this._mouseLastX=e.clientX)}_finishFloorSwipe(e){this._editMode||Math.abs(e)<54||this._setFloor(e<0?"upper":"ground")}_toggleEditMode(){this._editMode=!this._editMode,this._editMode||q(this._layoutStore),this.requestUpdate()}_adjustImage(e,t,i=0){const a=this._layoutStore[this._activeFloor].image;this._layoutStore[this._activeFloor].image=ke({x:a.x+e,y:a.y+t,scale:a.scale+i}),q(this._layoutStore),this.requestUpdate()}_onOverlayPointerDown(e,t){if(!this._editMode||e.button!==0)return;const i=e.target;if(i.closest(".resize-handle")||i.closest("button"))return;e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId);const r=this.renderRoot.querySelector(".floor-stage"),s=r?r.getBoundingClientRect():{width:1,height:1},o=this._layoutStore[this._activeFloor].overlays[t],n=(o==null?void 0:o.left)??10,c=(o==null?void 0:o.top)??10,d=(o==null?void 0:o.width)??21,h=this._layoutStore[this._activeFloor].image.scale||1;this._draggingOverlay={zoneId:t,startPointerX:e.clientX,startPointerY:e.clientY,startLeft:n,startTop:c,stageWidth:(s.width||1)*h,stageHeight:(s.height||1)*h,overlayWidth:d}}_onOverlayResizeDown(e,t){if(!this._editMode||e.button!==0)return;e.preventDefault(),e.stopPropagation(),e.currentTarget.setPointerCapture(e.pointerId);const a=this.renderRoot.querySelector(".floor-stage"),r=a?a.getBoundingClientRect():{width:1},s=this._layoutStore[this._activeFloor].overlays[t],o=(s==null?void 0:s.width)??21,n=this._layoutStore[this._activeFloor].image.scale||1;this._resizingOverlay={zoneId:t,startPointerX:e.clientX,startWidth:o,stageWidth:(r.width||1)*n}}_adjustOverlaySize(e,t,i=0){const a=this._layoutStore[this._activeFloor].overlays[e];a&&(this._layoutStore[this._activeFloor].overlays[e]=ce(e,{...a,width:(a.width||21)+t,scale:(a.scale||1)+i},a.width||21),q(this._layoutStore),this.requestUpdate())}_renderEditToolbar(){const e=this._layoutStore[this._activeFloor].image,t=this._activeFloor==="ground"?"Planta Baja":"Planta Alta";return $`
      <div class="edit-toolbar" role="toolbar" aria-label="Herramientas de edición del plano">
        <div class="toolbar-section">
          <div class="toolbar-badge">
            ${v("pencil",{size:14})}
            <strong>MODO EDICIÓN</strong>
            <span>${t}</span>
          </div>
          <span class="toolbar-hint">Arrastra los elementos sobre el plano o calibra la imagen</span>
        </div>

        <div class="toolbar-controls">
          <div class="control-group" title="Desplazamiento horizontal y vertical de la imagen">
            <span class="control-label">Imagen</span>
            <button class="btn-ctrl" @click=${()=>this._adjustImage(-1,0)} title="Mover imagen a la izquierda">←</button>
            <button class="btn-ctrl" @click=${()=>this._adjustImage(0,-1)} title="Mover imagen hacia arriba">↑</button>
            <button class="btn-ctrl" @click=${()=>this._adjustImage(0,1)} title="Mover imagen hacia abajo">↓</button>
            <button class="btn-ctrl" @click=${()=>this._adjustImage(1,0)} title="Mover imagen a la derecha">→</button>
          </div>

          <div class="control-group" title="Zoom de la imagen">
            <span class="control-label">Zoom ${(e.scale*100).toFixed(0)}%</span>
            <button class="btn-ctrl" @click=${()=>this._adjustImage(0,0,-.05)} title="Alejar zoom" ?disabled=${e.scale<=.65}>-</button>
            <button class="btn-ctrl" @click=${()=>this._adjustImage(0,0,.05)} title="Acercar zoom" ?disabled=${e.scale>=1.95}>+</button>
            <button class="btn-ctrl btn-reset" @click=${()=>this._adjustImage(-e.x,-e.y,1-e.scale)} title="Centrar imagen">Centrar</button>
          </div>

          <div class="toolbar-actions">
            <button class="btn-action btn-danger" @click=${this._resetActiveFloor} title="Restablecer plano y elementos a valores de fábrica">
              ${v("rotate-ccw",{size:13})}
              <span>Restablecer</span>
            </button>
            <button class="btn-action btn-primary" @click=${()=>this._toggleEditMode()} title="Guardar cambios y salir">
              ${v("save",{size:13})}
              <span>Guardar</span>
            </button>
          </div>
        </div>
      </div>`}async _toggleZone(e){var a;if(!((a=this._hass)!=null&&a.callService)||this._actionState==="loading")return;const t=this._availableCircuits(e);if(!t.length)return;const i=e.action?!this._profileActive(e):this._onCircuits(e).length!==t.length;this._actionState="loading",this._actionMessage=`${i?"Encendiendo":"Apagando"} ${e.label}`,this.requestUpdate();try{if(e.action)if(!i)await this._hass.callService("switch","turn_off",{entity_id:t.map(r=>r.entity)});else{e.action.serviceEntity&&!D(this._state(e.action.serviceEntity))&&await this._hass.callService("scene","turn_on",{entity_id:e.action.serviceEntity});const r=e.action.offEntities.filter(o=>!D(this._state(o))),s=e.action.onEntities.filter(o=>!D(this._state(o)));r.length&&await this._hass.callService("switch","turn_off",{entity_id:r}),s.length&&await this._hass.callService("switch","turn_on",{entity_id:s})}else await this._hass.callService("switch",i?"turn_on":"turn_off",{entity_id:t.map(r=>r.entity)});this._actionState="idle",this._actionMessage=i&&e.action?`${e.action.label} aplicado en ${e.label}`:`Orden enviada a ${e.label}`}catch(r){this._actionState="error",this._actionMessage=r instanceof Error?r.message:"No se pudo ejecutar la acción"}this.requestUpdate()}async _setAll(e){var i;if(!((i=this._hass)!=null&&i.callService)||this._actionState==="loading")return;const t=le.flatMap(a=>this._availableCircuits(a).map(r=>r.entity));if(t.length){this._actionState="loading",this._actionMessage=e?"Encendiendo circuitos disponibles":"Apagando circuitos disponibles",this.requestUpdate();try{await this._hass.callService("switch",e?"turn_on":"turn_off",{entity_id:t}),this._actionState="idle",this._actionMessage="Orden enviada. Esperando confirmación de Home Assistant"}catch(a){this._actionState="error",this._actionMessage=a instanceof Error?a.message:"No se pudo ejecutar la acción"}this.requestUpdate()}}_scrollTo(e){var t;(t=this.renderRoot.querySelector(`#${e}`))==null||t.scrollIntoView({behavior:"smooth",block:"start"})}_toggleMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_renderZoneRow(e){var d;const t=this._availableCircuits(e),i=this._onCircuits(e),a=t.length-i.length,r=e.circuits.length-t.length,s=this._zonePower(e),o=this._profileActive(e),n=t.length?r?"warning":i.length?"normal":"off":"unavailable",c=n==="unavailable"?"No disponible":n==="warning"?"Parcial":n==="normal"?"Normal":"Apagada";return $`
      <div class="circuit-row" role="row">
        <div class="zone-name" role="cell">${v("lightbulb",{size:18})}<strong>${e.label}</strong></div>
        <div role="cell"><span class="status status-${n}"><i></i>${c}</span></div>
        <div role="cell" class="numeric">${s?this._format(s.value,"W"):"No disponible"}${s&&!s.measured?$`<small>nominal</small>`:x}</div>
        <div role="cell" class="numeric">${i.length} enc. · ${a} apag.</div>
        <div role="cell">
          <button class="toggle ${o?"is-on":""}" ?disabled=${!t.length||this._actionState==="loading"} @click=${()=>this._toggleZone(e)} aria-label="${o?"Apagar":"Activar"} ${((d=e.action)==null?void 0:d.label)||e.label}" aria-pressed=${o}><span></span></button>
        </div>
      </div>`}_renderFloorOverlays(){const e=this._layoutStore[this._activeFloor];return yt[this._activeFloor].map(i=>{const a=i.zoneId,r=le.find(g=>g.id===a);if(!r)return x;const s=this._availableCircuits(r),o=this._onCircuits(r),n=this._zonePower(r),c=r.temperature?X(this._state(r.temperature)):null,d=r.humidity?X(this._state(r.humidity)):null,h=s.length||n||c!==null||d!==null;if(!h&&!this._editMode)return x;const p=e.overlays[a]||{left:i.left,top:i.top,width:i.width||21};return $`
        <div
          class="zone-overlay ${o.length?"is-active":""} ${this._editMode?"is-editing":""}"
          style="left:${p.left}%;top:${p.top}%;width:${p.width||21}%;${p.scale&&p.scale!==1?`transform: scale(${p.scale}); transform-origin: top left;`:""}"
          @pointerdown=${g=>this._onOverlayPointerDown(g,a)}
          @pointermove=${this._onOverlayPointerMove}
          @pointerup=${this._onOverlayPointerUp}
          @pointercancel=${this._onOverlayPointerUp}
          title=${this._editMode?`Arrastrar ${r.label} (${p.left.toFixed(1)}%, ${p.top.toFixed(1)}%) - Ancho: ${(p.width||21).toFixed(0)}%`:r.label}
        >
          <div class="overlay-header">
            ${this._editMode?$`<span class="drag-handle">${v("move",{size:12})}</span>`:x}
            <strong>${r.label}</strong>
            ${this._editMode?$`
              <div class="overlay-size-ctrls">
                <button
                  type="button"
                  class="btn-size-mini"
                  @pointerdown=${g=>g.stopPropagation()}
                  @click=${g=>{g.stopPropagation(),this._adjustOverlaySize(a,-2)}}
                  title="Reducir ancho (-2%)"
                >-</button>
                <span class="size-pill">${(p.width||21).toFixed(0)}%</span>
                <button
                  type="button"
                  class="btn-size-mini"
                  @pointerdown=${g=>g.stopPropagation()}
                  @click=${g=>{g.stopPropagation(),this._adjustOverlaySize(a,2)}}
                  title="Aumentar ancho (+2%)"
                >+</button>
              </div>
            `:x}
          </div>
          <div class="overlay-metrics">
            ${s.length?$`<span title="${o.length} encendidos, ${s.length-o.length} apagados">${v("lightbulb",{size:12})}${o.length} enc. / ${s.length-o.length} apag.</span>`:x}
            ${n?$`<span>${v("zap",{size:12})}${this._format(n.value,"W")}</span>`:x}
            ${c!==null?$`<span>${v("thermometer",{size:12})}${this._format(c,"°C",1)}</span>`:x}
            ${d!==null?$`<span>${v("droplets",{size:12})}${this._format(d,"%",0)}</span>`:x}
            ${!h&&this._editMode?$`<span class="empty-badge">Sin telemetría</span>`:x}
          </div>
          ${this._editMode?$`
            <div
              class="resize-handle"
              title="Arrastra para redimensionar ancho (${(p.width||21).toFixed(0)}%)"
              @pointerdown=${g=>this._onOverlayResizeDown(g,a)}
              @pointermove=${this._onOverlayResizeMove}
              @pointerup=${this._onOverlayResizeUp}
              @pointercancel=${this._onOverlayResizeUp}
            >⤡</div>
          `:x}
        </div>`})}render(){var g;const e=it[this._activeFloor],t=this._theme==="light"?"light":"dark",i=e.images[t],a=this._weather(),r=this._environment(),s=this._activePower(),o=this._history.length?Math.max(...this._history,1):1,c=(Array.isArray(this._panel.alarm_entities)?this._panel.alarm_entities:[]).map(u=>this._state(u)).filter(u=>u&&!D(u)&&u.state!=="off"),d=!!((g=this._hass)!=null&&g.states&&Object.keys(this._hass.states).length),h=new Intl.DateTimeFormat("es-BO",{hour:"2-digit",minute:"2-digit",hour12:!1}).format(this._clock),p=new Intl.DateTimeFormat("es-BO",{day:"2-digit",month:"short",year:"numeric"}).format(this._clock);return $`
      <div class="bms-shell">
        <header class="topbar">
          <button class="menu-button" @click=${this._toggleMenu} aria-label="Abrir menú de Home Assistant">${v("sliders",{size:21})}</button>
          <div class="brand-mark">${v("home",{size:27})}<div><strong>WITMIND</strong><span>CONTROL DE EDIFICIO</span></div></div>
          <div class="title-block"><h1>Control de Edificio</h1><p>Sistema de gestión y monitoreo</p></div>
          <div class="header-status"><div class="clock"><strong>${h}</strong><span>${p}</span></div><div class="weather-chip">${v("sun",{size:22})}<span><strong>${this._format(a.temperature,"°C",1)}</strong>${a.condition}</span></div><div class="mode-chip ${d?"ok":"warn"}">${v(d?"check":"alert-circle",{size:18})}<span><small>Estado</small><strong>${d?"Supervisión activa":"Conexión pendiente"}</strong></span></div></div>
        </header>

        <nav class="section-nav" aria-label="Secciones del edificio">
          <button type="button" @click=${()=>this._scrollTo("floor-plan")}>Plano</button>
          <button type="button" @click=${()=>this._scrollTo("circuits")}>Circuitos</button>
          <button type="button" @click=${()=>this._scrollTo("environment")}>Ambiente</button>
          <button type="button" @click=${()=>this._scrollTo("alerts")}>Alarmas</button>
          <button type="button" @click=${()=>this._scrollTo("consumption")}>Consumo</button>
        </nav>

        <main class="dashboard-grid">
          <section class="main-column">
            <article id="floor-plan" class="panel floor-card">
              <div class="panel-head"><div class="panel-title">${v("home",{size:19})}<h2>PLANO DEL EDIFICIO <span>${e.context}</span></h2></div><div class="floor-selector" role="group" aria-label="Seleccionar planta"><button class=${this._activeFloor==="ground"?"selected":""} @click=${()=>this._setFloor("ground")}>Planta Baja</button><button class=${this._activeFloor==="upper"?"selected":""} @click=${()=>this._setFloor("upper")}>Planta Alta</button></div></div>
              <div class="floor-viewport ${this._editMode?"viewport-editing":""}" data-no-swipe @touchstart=${this._onTouchStart} @pointerdown=${this._onPointerDown} aria-label="${e.label}: ${e.context}">
                ${this._editMode?this._renderEditToolbar():x}

                <div
                  class="floor-stage ${this._editMode?"is-editing":""}"
                  @pointerdown=${this._onStagePointerDown}
                  @pointermove=${this._onStagePointerMove}
                  @pointerup=${this._onStagePointerUp}
                  @pointercancel=${this._onStagePointerUp}
                >
                  <div
                    class="floor-canvas"
                    style="transform: translate(${this._layoutStore[this._activeFloor].image.x}%, ${this._layoutStore[this._activeFloor].image.y}%) scale(${this._layoutStore[this._activeFloor].image.scale}); transform-origin: center center;"
                  >
                    <picture class="floor-picture">
                      <source srcset=${i.webp} type="image/webp" />
                      <img
                        src=${i.png}
                        alt="Plano arquitectónico real de ${e.label}"
                        draggable="false"
                      />
                    </picture>
                    <div class="floor-overlays" aria-label="Datos en tiempo real de ${e.label}">${this._renderFloorOverlays()}</div>
                  </div>
                </div>
                <div class="floor-caption"><strong>${e.label}</strong><span>${e.context}</span></div>
                
                <div class="viewport-tools">
                  <button
                    class="tool-btn pencil-btn ${this._editMode?"is-active":""}"
                    @click=${()=>this._toggleEditMode()}
                    aria-label="${this._editMode?"Guardar y finalizar edición":"Entrar en modo edición"}"
                    title="${this._editMode?"Guardar y salir del modo edición":"Editar plano (ajustar imagen y elementos flotantes)"}"
                  >
                    ${v(this._editMode?"check":"pencil",{size:18})}
                  </button>
                  <div class="compass" aria-label="Norte">N<span>↑</span></div>
                </div>
              </div>
            </article>

            <article id="circuits" class="panel circuits-card">
              <div class="panel-head"><div class="panel-title">${v("lightbulb",{size:19})}<h2>CIRCUITOS POR ZONA</h2></div><span class="head-meta">${e.label}</span></div>
              <div class="circuit-table" role="table" aria-label="Circuitos por zona">
                <div class="circuit-header" role="row"><span role="columnheader">Zona</span><span role="columnheader">Estado</span><span role="columnheader">Potencia</span><span role="columnheader">Circuitos</span><span role="columnheader">Acciones</span></div>
                ${this._zones().filter(u=>u.showInTable!==!1&&u.circuits.length).map(u=>this._renderZoneRow(u))}
              </div>
            </article>
          </section>

          <section class="side-column">
            <article id="alerts" class="panel side-card alerts-card">
              <div class="panel-head"><div class="panel-title warning-icon">${v("alert-triangle",{size:19})}<h2>ALARMAS / EVENTOS</h2></div><span class="head-meta">${c.length} activas</span></div>
              ${c.length?$`<div class="alert-list">${c.map(u=>{var m;return $`<div class="alert-row">${v("alert-triangle",{size:20})}<div><strong>${String(((m=u==null?void 0:u.attributes)==null?void 0:m.friendly_name)||(u==null?void 0:u.entity_id))}</strong><span>${String(u==null?void 0:u.state)}</span></div></div>`})}</div>`:$`<div class="empty-state">${v("shield",{size:26})}<div><strong>Sin alarmas configuradas</strong><span>Conecta entidades en <code>alarm_entities</code> para habilitar esta sección.</span></div></div>`}
            </article>

            <article id="environment" class="panel side-card">
              <div class="panel-head"><div class="panel-title">${v("sun",{size:19})}<h2>CONDICIONES AMBIENTALES</h2></div></div>
              <div class="environment-grid"><div>${v("thermometer",{size:27})}<strong>${this._format(r.temperature,"°C",1)}</strong><span>Interior promedio</span></div><div>${v("droplets",{size:27})}<strong>${this._format(r.humidity,"%",0)}</strong><span>Humedad promedio</span></div><div>${v("sun",{size:27})}<strong>${this._format(a.temperature,"°C",1)}</strong><span>Exterior</span></div><div>${v("activity",{size:27})}<strong class="condition">${a.condition}</strong><span>WTX - MDTC</span></div></div>
            </article>

            <article id="consumption" class="panel side-card consumption-card">
              <div class="panel-head"><div class="panel-title">${v("zap",{size:19})}<h2>CONSUMO ELÉCTRICO</h2></div></div>
              <div class="power-reading">${v("zap",{size:43})}<div><strong>${this._format(s,"W")}</strong><span>${s===null?"Medición no disponible":"Showroom - potencia activa"}</span></div>${this._historyTrend!==null?$`<b class=${this._historyTrend<=0?"trend good":"trend bad"}>${this._historyTrend>0?"+":""}${this._historyTrend.toFixed(0)} %<small>vs. 24 h previas</small></b>`:x}</div>
              ${this._historyState==="ready"?$`<div class="history-bars" aria-label="Histórico real de potencia de las últimas 24 horas">${this._history.map(u=>$`<i style="height:${Math.max(4,u/o*100)}%" title="${this._format(u,"W")}"></i>`)}</div>`:$`<div class="history-empty"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><p>${this._historyState==="loading"?"Cargando histórico real de Home Assistant":this._historyState==="error"?"No se pudo cargar el histórico":"Histórico no disponible para esta medición"}.</p></div>`}
            </article>

            <article class="panel side-card quick-card">
              <div class="panel-head"><div class="panel-title">${v("settings",{size:19})}<h2>CONTROLES RÁPIDOS</h2></div></div>
              <div class="quick-grid"><button @click=${()=>this._setAll(!0)} ?disabled=${this._actionState==="loading"}>${v("lightbulb",{size:25})}<span><strong>Encender luces</strong><small>Circuitos disponibles</small></span></button><button @click=${()=>this._setAll(!1)} ?disabled=${this._actionState==="loading"}>${v("power",{size:25})}<span><strong>Apagar luces</strong><small>Circuitos disponibles</small></span></button><button disabled>${v("sparkles",{size:25})}<span><strong>Modo ahorro</strong><small>No configurado</small></span></button><button disabled>${v("settings",{size:25})}<span><strong>Mantenimiento</strong><small>No configurado</small></span></button></div>
              ${this._actionMessage?$`<div class="action-feedback ${this._actionState}">${this._actionState==="loading"?v("refresh-cw",{size:15}):v(this._actionState==="error"?"alert-circle":"check",{size:15})}<span>${this._actionMessage}</span></div>`:x}
            </article>
          </section>
        </main>
      </div>`}};De.styles=ti`
    :host {
      display: block;
      min-height: 100dvh;
      color: #eaf0f1;
      background: #061118;
      font-family: Manrope, system-ui, sans-serif;
      font-variant-numeric: tabular-nums;
      --line: rgba(128, 183, 200, .16);
      --surface: rgba(8, 25, 34, .92);
      --surface-2: rgba(11, 33, 43, .86);
      --muted: #8fa5ad;
      --orange: #f26522;
      --cyan: #42b9e8;
      --green: #22d98b;
      --amber: #ffb32c;
      --danger: #ff4d5f;
    }
    :host([data-theme=light]) {
      color: #14232a;
      background: #eaf0f1;
      --line: rgba(22, 54, 67, .16);
      --surface: rgba(255, 255, 255, .94);
      --surface-2: #f3f7f8;
      --muted: #667b84;
    }
    * { box-sizing: border-box; }
    button { font: inherit; color: inherit; }
    :focus-visible { outline: 2px solid var(--orange); outline-offset: 2px; }

    .bms-shell {
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      background: radial-gradient(circle at 62% 0, rgba(18, 91, 112, .13), transparent 36%), linear-gradient(145deg, #040c11, #071720 58%, #061118);
    }
    :host([data-theme=light]) .bms-shell {
      background: linear-gradient(145deg, #edf3f4, #dce7e9);
    }

    .topbar {
      position: sticky;
      top: 0;
      z-index: 20;
      flex: none;
      min-height: 70px;
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 0 24px;
      border-bottom: 1px solid var(--line);
      background: rgba(5, 18, 25, .94);
      backdrop-filter: blur(18px);
    }
    :host([data-theme=light]) .topbar {
      background: rgba(247, 250, 250, .94);
    }

    .section-nav {
      position: sticky;
      top: 70px;
      z-index: 19;
      display: flex;
      align-items: center;
      gap: 6px;
      width: 100%;
      min-width: 0;
      padding: 6px 14px;
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      border-bottom: 1px solid var(--line);
      background: var(--surface);
      scrollbar-width: thin;
    }
    .section-nav button {
      flex: 0 0 auto;
      min-height: 40px;
      padding: 0 13px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--surface-2);
      color: inherit;
      cursor: pointer;
      font: inherit;
    }
    .section-nav button:hover { border-color: var(--orange); }

    #floor-plan, #circuits, #alerts, #environment, #consumption { scroll-margin-top: 136px; }

    .menu-button {
      display: none;
      width: 42px;
      height: 42px;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: var(--surface-2);
      cursor: pointer;
    }
    .brand-mark {
      display: flex;
      align-items: center;
      gap: 11px;
      min-width: 245px;
      color: var(--orange);
    }
    .brand-mark > svg { width: 33px; height: 33px; }
    .brand-mark div { display: grid; }
    .brand-mark strong { color: inherit; font-size: 20px; letter-spacing: .08em; }
    .brand-mark span { font-size: 9px; font-weight: 800; letter-spacing: .14em; }

    .title-block { padding-left: 22px; border-left: 1px solid var(--line); }
    .title-block h1 { margin: 0; font-size: 26px; letter-spacing: -.035em; }
    .title-block p { margin: 3px 0 0; color: var(--muted); font-size: 11px; }

    .header-status { display: flex; align-items: center; gap: 10px; margin-left: auto; }
    .clock { display: grid; padding-right: 14px; border-right: 1px solid var(--line); text-align: right; }
    .clock strong { font-size: 21px; }
    .clock span { color: var(--muted); font-size: 9px; text-transform: capitalize; }

    .weather-chip, .mode-chip {
      display: flex;
      align-items: center;
      gap: 9px;
      min-height: 42px;
      padding: 7px 12px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--surface-2);
    }
    .weather-chip > svg { color: var(--amber); }
    .weather-chip span, .mode-chip span { display: grid; }
    .weather-chip strong, .mode-chip strong { font-size: 11px; }
    .weather-chip span { color: var(--muted); font-size: 9px; }
    .mode-chip small { color: var(--muted); font-size: 8px; }
    .mode-chip.ok { border-color: rgba(34, 217, 139, .35); }
    .mode-chip.ok > svg, .mode-chip.ok strong { color: var(--green); }
    .mode-chip.warn > svg { color: var(--amber); }

    .dashboard-grid {
      min-width: 0;
      width: 100%;
      display: grid;
      grid-template-columns: minmax(0, 1.95fr) minmax(330px, 1fr);
      gap: 14px;
      padding: 14px;
    }
    .main-column, .side-column { min-width: 0; display: grid; align-content: start; gap: 14px; }

    .panel {
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 12px;
      background: linear-gradient(150deg, var(--surface), rgba(6, 24, 32, .94));
      box-shadow: inset 0 1px rgba(255, 255, 255, .025), 0 12px 30px rgba(0, 0, 0, .18);
    }
    :host([data-theme=light]) .panel { background: var(--surface); }

    .panel-head {
      min-height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 8px 14px;
      border-bottom: 1px solid var(--line);
    }
    .panel-title { display: flex; align-items: center; gap: 9px; }
    .panel-title > svg { color: var(--orange); }
    .panel-title h2 { margin: 0; font-size: 13px; letter-spacing: .055em; }
    .panel-title h2 span { color: var(--muted); font-weight: 500; }
    .warning-icon > svg { color: var(--amber); }
    .head-meta { color: var(--muted); font-size: 10px; }

    .floor-selector {
      display: flex;
      padding: 3px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--surface-2);
      gap: 2px;
    }
    .floor-selector button {
      min-height: 30px;
      padding: 0 12px;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: var(--muted);
      font-size: 10px;
      cursor: pointer;
    }
    .floor-selector button.selected {
      background: rgba(242, 101, 34, .16);
      color: #fff;
      box-shadow: inset 0 0 0 1px rgba(242, 101, 34, .32);
    }

    /* Floor Viewport and Stage */
    .floor-viewport {
      position: relative;
      height: min(56vh, 585px);
      min-height: 360px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 12px;
      background: radial-gradient(circle at center, rgba(21, 88, 110, .22), transparent 65%), #06131a;
      touch-action: pan-y;
      user-select: none;
      box-sizing: border-box;
    }
    .floor-stage {
      position: relative;
      max-width: 100%;
      max-height: 100%;
      display: block;
      margin: auto;
      flex-shrink: 0;
    }
    .floor-canvas {
      position: relative;
      width: 100%;
      height: 100%;
      transform-origin: center center;
      will-change: transform;
    }
    .floor-picture {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
    }
    .floor-picture img, .floor-stage img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: fill;
      filter: saturate(.88) contrast(1.04);
      transition: opacity .18s;
      pointer-events: none;
      user-select: none;
    }

    .floor-caption {
      position: absolute;
      left: 16px;
      bottom: 14px;
      display: flex;
      gap: 8px;
      align-items: baseline;
      padding: 7px 10px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: rgba(5, 18, 25, .82);
      backdrop-filter: blur(8px);
    }
    .floor-caption strong { font-size: 11px; }
    .floor-caption span { color: var(--muted); font-size: 9px; }

    .compass {
      position: absolute;
      right: 16px;
      top: 16px;
      width: 40px;
      height: 52px;
      display: grid;
      place-items: center;
      border: 1px solid var(--line);
      border-radius: 20px;
      background: rgba(5, 18, 25, .78);
      font-size: 9px;
    }
    .compass span { display: block; color: #dbe8eb; font-size: 22px; line-height: 17px; }

    .circuit-table { padding: 3px 10px 8px; }
    .circuit-header, .circuit-row {
      display: grid;
      grid-template-columns: minmax(150px, 1.5fr) minmax(95px, .8fr) minmax(105px, .8fr) 75px 70px;
      align-items: center;
      gap: 8px;
    }
    .circuit-header { min-height: 30px; color: var(--muted); font-size: 9px; }
    .circuit-row { min-height: 43px; border-top: 1px solid var(--line); font-size: 10px; }
    .zone-name { display: flex; align-items: center; gap: 9px; }
    .zone-name svg { color: var(--orange); }

    .status { display: inline-flex; align-items: center; gap: 6px; }
    .status i { width: 8px; height: 8px; border-radius: 50%; background: var(--muted); }
    .status-normal { color: var(--green); }
    .status-normal i { background: var(--green); box-shadow: 0 0 9px rgba(34, 217, 139, .55); }
    .status-off { color: var(--muted); }
    .status-warning { color: var(--amber); }
    .status-warning i { background: var(--amber); }

    .numeric { font-variant-numeric: tabular-nums; }
    .numeric small { display: block; color: var(--muted); font-size: 8px; }

    .toggle {
      width: 38px;
      height: 22px;
      padding: 2px;
      border: 1px solid var(--line);
      border-radius: 999px;
      background: #183039;
      cursor: pointer;
    }
    .toggle span {
      display: block;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #8ba1aa;
      transition: transform .16s, background .16s;
    }
    .toggle.is-on { border-color: var(--orange); background: rgba(242, 101, 34, .25); }
    .toggle.is-on span { transform: translateX(16px); background: #fff; }
    .toggle:disabled { opacity: .4; cursor: not-allowed; }

    .side-card { min-height: 0; }
    .side-card > .panel-head { min-height: 42px; }
    .side-card .panel-title h2 { font-size: 12px; }

    .empty-state {
      min-height: 98px;
      display: flex;
      align-items: center;
      gap: 13px;
      padding: 18px;
      color: var(--muted);
    }
    .empty-state > svg { color: var(--green); }
    .empty-state div { display: grid; gap: 4px; }
    .empty-state strong { color: inherit; font-size: 11px; }
    .empty-state span { font-size: 9px; line-height: 1.45; }
    .empty-state code { color: var(--orange); }

    .alert-list { padding: 4px 12px; }
    .alert-row {
      display: flex;
      gap: 10px;
      padding: 10px 0;
      border-bottom: 1px solid var(--line);
      color: var(--danger);
    }
    .alert-row div { display: grid; }
    .alert-row strong { font-size: 10px; }
    .alert-row span { color: var(--muted); font-size: 9px; }

    .environment-grid { display: grid; grid-template-columns: repeat(4, 1fr); padding: 10px; }
    .environment-grid > div {
      min-width: 0;
      display: grid;
      place-items: center;
      gap: 5px;
      padding: 10px 5px;
      border-right: 1px solid var(--line);
      text-align: center;
    }
    .environment-grid > div:last-child { border-right: 0; }
    .environment-grid svg { color: var(--cyan); }
    .environment-grid strong { font-size: 15px; }
    .environment-grid .condition { max-width: 95px; font-size: 10px; line-height: 1.25; }
    .environment-grid span { color: var(--muted); font-size: 8px; }

    .power-reading { display: flex; align-items: center; gap: 14px; padding: 13px 18px; }
    .power-reading > svg { color: var(--amber); }
    .power-reading div { display: grid; }
    .power-reading strong { font-size: 26px; line-height: 1; }
    .power-reading span { margin-top: 5px; color: var(--muted); font-size: 9px; }

    .history-empty {
      position: relative;
      height: 69px;
      display: flex;
      align-items: flex-end;
      gap: 5px;
      margin: 0 14px 12px;
      padding: 0 0 22px;
      border-bottom: 1px solid var(--line);
    }
    .history-empty > span {
      flex: 1;
      max-width: 22px;
      height: 12px;
      background: rgba(242, 101, 34, .16);
      border: 1px solid rgba(242, 101, 34, .2);
    }
    .history-empty > span:nth-child(2n) { height: 20px; }
    .history-empty > span:nth-child(3n) { height: 8px; }
    .history-empty p {
      position: absolute;
      left: 0;
      bottom: 1px;
      margin: 0;
      color: var(--muted);
      font-size: 8px;
    }

    .quick-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px; }
    .quick-grid button {
      min-height: 58px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 11px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--surface-2);
      text-align: left;
      cursor: pointer;
    }
    .quick-grid button:hover:not(:disabled) {
      border-color: rgba(242, 101, 34, .45);
      background: rgba(242, 101, 34, .09);
    }
    .quick-grid button > svg { color: var(--orange); }
    .quick-grid button span { display: grid; }
    .quick-grid strong { font-size: 10px; }
    .quick-grid small { margin-top: 3px; color: var(--muted); font-size: 8px; }
    .quick-grid button:disabled { opacity: .42; cursor: not-allowed; }

    .action-feedback {
      display: flex;
      align-items: center;
      gap: 7px;
      margin: 0 10px 10px;
      padding: 7px 9px;
      border: 1px solid var(--line);
      border-radius: 7px;
      color: var(--muted);
      font-size: 9px;
    }
    .action-feedback.loading svg { animation: spin 1s linear infinite; }
    .action-feedback.error { color: var(--danger); }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Zone Overlays */
    .floor-overlays { position: absolute; inset: 0; pointer-events: none; overflow: visible; }
    .zone-overlay {
      position: absolute;
      z-index: 2;
      display: grid;
      gap: 3px;
      padding: 5px 7px;
      border: 1px solid rgba(66, 185, 232, .3);
      border-radius: 7px;
      background: rgba(4, 17, 24, .86);
      box-shadow: 0 5px 18px rgba(0, 0, 0, .28);
      backdrop-filter: blur(7px);
    }
    .zone-overlay.is-active {
      border-color: rgba(34, 217, 139, .48);
      box-shadow: 0 0 16px rgba(34, 217, 139, .1);
    }
    .zone-overlay > strong {
      overflow: hidden;
      color: #edf6f7;
      font-size: 9px;
      line-height: 1.2;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .overlay-metrics { display: flex; flex-wrap: wrap; gap: 2px 6px; }
    .overlay-metrics span {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: #a9bec5;
      font-size: 7.5px;
      white-space: nowrap;
    }
    .overlay-metrics svg { color: var(--cyan); }
    .zone-overlay.is-active .overlay-metrics span:first-child svg { color: var(--green); }
    :host([data-theme=light]) .zone-overlay { background: rgba(247, 251, 251, .9); }
    :host([data-theme=light]) .zone-overlay > strong { color: #14232a; }

    @media (max-width: 1180px) {
      .topbar { min-height: 64px; padding: 0 14px; }
      .section-nav { top: 64px; }
      #floor-plan, #circuits, #alerts, #environment, #consumption { scroll-margin-top: 126px; }
      .brand-mark { min-width: auto; }
      .brand-mark div, .title-block p, .weather-chip span:not(:first-child) { display: none; }
      .title-block { padding-left: 14px; }
      .environment-grid { grid-template-columns: 1fr 1fr; }
      .environment-grid > div:nth-child(2) { border-right: 0; }
      .environment-grid > div:nth-child(-n+2) { border-bottom: 1px solid var(--line); }
      .zone-overlay { padding: 4px 6px; }
      .zone-overlay > strong { font-size: 8px; }
      .overlay-metrics span { font-size: 7px; }
    }

    :host([narrow]) .dashboard-grid {
      display: flex;
      flex-direction: column;
      padding: 8px;
    }
    :host([narrow]) .main-column,
    :host([narrow]) .side-column {
      display: contents;
    }
    :host([narrow]) .floor-card { order: 1; }
    :host([narrow]) .circuits-card { order: 2; }
    :host([narrow]) .alerts-card { order: 3; }
    :host([narrow]) #environment { order: 4; }
    :host([narrow]) #consumption { order: 5; }
    :host([narrow]) .quick-card { order: 6; }

    @media (max-width: 1024px) {
      .topbar { position: sticky; min-height: 64px; height: 64px; }
      .section-nav { top: 64px; }
      #floor-plan, #circuits, #alerts, #environment, #consumption { scroll-margin-top: 126px; }
      .menu-button { display: grid; place-items: center; }
      .brand-mark { display: none; }
      .title-block { border-left: 0; padding-left: 0; }
      .title-block h1 { font-size: 19px; }
      .header-status .weather-chip, .mode-chip { display: none; }
      .clock { border-right: 0; padding-right: 0; }
      .dashboard-grid { display: flex; flex-direction: column; padding: 8px; }
      .main-column, .side-column { display: contents; }
      .floor-card { order: 1; }
      .circuits-card { order: 2; }
      .alerts-card { order: 3; }
      #environment { order: 4; }
      #consumption { order: 5; }
      .quick-card { order: 6; }
      .floor-viewport { height: 52vh; min-height: 300px; padding: 10px; }
      .floor-selector button { padding: 0 9px; }
      .circuit-header { display: none; }
      .circuit-row { grid-template-columns: minmax(120px, 1.35fr) minmax(82px, .9fr) minmax(85px, .8fr) 55px; min-height: 50px; }
      .circuit-row > [role=cell]:nth-child(4) { display: none; }
      .panel { border-radius: 10px; }
      .zone-overlay { padding: 3px 5px; }
      .zone-overlay > strong { font-size: 7.5px; }
      .overlay-metrics { gap: 2px 4px; }
      .overlay-metrics span { font-size: 6.5px; }
    }

    @media (max-width: 520px) {
      .topbar { gap: 10px; }
      .section-nav button { min-height: 44px; }
      #floor-plan, #circuits, #alerts, #environment, #consumption { scroll-margin-top: 130px; }
      .clock strong { font-size: 17px; }
      .clock span { display: none; }
      .floor-viewport { height: 44vh; min-height: 240px; padding: 6px; }
      .panel-head { padding: 7px 10px; }
      .panel-title h2 { font-size: 11px; }
      .floor-selector button { font-size: 9px; }
      .circuit-table { padding: 3px 8px 7px; }
      .circuit-row { grid-template-columns: minmax(105px, 1.2fr) minmax(80px, .9fr) 68px 44px; gap: 4px; }
      .circuit-row > [role=cell]:nth-child(3) { font-size: 9px; }
      .zone-name { gap: 5px; }
      .zone-name svg { display: none; }
      .environment-grid { grid-template-columns: 1fr 1fr; }
      .quick-grid { grid-template-columns: 1fr; }
      .floor-caption { left: 8px; bottom: 8px; }
      .compass { right: 8px; top: 8px; }
      .side-card .panel-title h2 { font-size: 10px; }
      .zone-overlay { padding: 2px 4px; border-radius: 5px; }
      .zone-overlay > strong { font-size: 6.5px; }
      .overlay-metrics { gap: 1px 3px; }
      .overlay-metrics span { font-size: 5.5px; }
      .overlay-metrics svg { display: none; }
    }

    @media (prefers-reduced-motion: reduce) {
      * { scroll-behavior: auto !important; transition: none !important; animation: none !important; }
    }

    .trend { display: grid; margin-left: auto; color: var(--muted); font-size: 14px; text-align: right; }
    .trend.good { color: var(--green); }
    .trend.bad { color: var(--danger); }
    .trend small { color: var(--muted); font-size: 7px; font-weight: 500; }
    .history-bars {
      height: 69px;
      display: flex;
      align-items: flex-end;
      gap: 3px;
      margin: 0 14px 12px;
      padding: 4px 0 18px;
      border-bottom: 1px solid var(--line);
    }
    .history-bars i {
      flex: 1;
      min-width: 2px;
      max-width: 18px;
      background: var(--orange);
      box-shadow: 0 0 7px rgba(242, 101, 34, .22);
    }

    .circuits-card { min-height: 304px; }
    .circuit-table { min-height: 256px; }
    @media (max-width: 820px) {
      .circuits-card { min-height: 308px; }
      .circuit-table { min-height: 260px; }
    }

    .viewport-tools {
      position: absolute;
      right: 14px;
      top: 14px;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
    .tool-btn {
      width: 40px;
      height: 40px;
      display: grid;
      place-items: center;
      border: 1px solid var(--line);
      border-radius: 10px;
      background: rgba(5, 18, 25, .86);
      color: var(--muted);
      cursor: pointer;
      transition: all .18s ease;
      box-shadow: 0 4px 14px rgba(0, 0, 0, .25);
      backdrop-filter: blur(8px);
    }
    :host([data-theme=light]) .tool-btn { background: rgba(255, 255, 255, .9); color: #546e7a; }
    .tool-btn:hover { color: #fff; border-color: rgba(242, 101, 34, .5); background: rgba(14, 35, 45, .95); }
    .tool-btn.is-active {
      background: var(--orange);
      color: #fff;
      border-color: var(--orange);
      box-shadow: 0 0 16px rgba(242, 101, 34, .5);
    }

    .edit-toolbar {
      position: absolute;
      top: 12px;
      left: 12px;
      right: 66px;
      z-index: 9;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 8px 12px;
      border: 1px solid rgba(242, 101, 34, .35);
      border-radius: 10px;
      background: rgba(6, 20, 28, .94);
      box-shadow: 0 8px 24px rgba(0, 0, 0, .45);
      backdrop-filter: blur(14px);
      animation: fadeInDown .18s ease-out;
    }
    :host([data-theme=light]) .edit-toolbar {
      background: rgba(255, 255, 255, .96);
      border-color: rgba(242, 101, 34, .4);
      box-shadow: 0 8px 24px rgba(0, 0, 0, .15);
    }
    .toolbar-section { display: flex; align-items: center; gap: 10px; }
    .toolbar-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 8px;
      border-radius: 6px;
      background: rgba(242, 101, 34, .18);
      color: var(--orange);
      font-size: 10px;
    }
    .toolbar-badge strong { letter-spacing: .05em; }
    .toolbar-badge span { color: #fff; font-size: 9px; padding-left: 4px; border-left: 1px solid rgba(242, 101, 34, .3); }
    :host([data-theme=light]) .toolbar-badge span { color: #14232a; }
    .toolbar-hint { color: var(--muted); font-size: 9px; }
    .toolbar-controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .control-group {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: rgba(0, 0, 0, .22);
    }
    :host([data-theme=light]) .control-group { background: rgba(0, 0, 0, .04); }
    .control-label { font-size: 9px; color: var(--muted); padding-right: 3px; font-variant-numeric: tabular-nums; }
    .btn-ctrl {
      min-width: 24px;
      height: 24px;
      padding: 0 5px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--line);
      border-radius: 5px;
      background: var(--surface-2);
      color: #eaf0f1;
      font-size: 11px;
      font-weight: 700;
      cursor: pointer;
    }
    :host([data-theme=light]) .btn-ctrl { color: #14232a; }
    .btn-ctrl:hover:not(:disabled) { border-color: var(--orange); background: rgba(242, 101, 34, .2); }
    .btn-ctrl:disabled { opacity: .35; cursor: not-allowed; }
    .btn-ctrl.btn-reset { font-size: 9px; font-weight: 500; }
    .toolbar-actions { display: flex; align-items: center; gap: 6px; }
    .btn-action {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 26px;
      padding: 0 9px;
      border-radius: 6px;
      font-size: 9.5px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
    }
    .btn-action.btn-danger {
      background: rgba(255, 77, 95, .12);
      color: #ff6b7a;
      border-color: rgba(255, 77, 95, .28);
    }
    .btn-action.btn-danger:hover { background: rgba(255, 77, 95, .22); }
    .btn-action.btn-primary { background: var(--orange); color: #fff; }
    .btn-action.btn-primary:hover { background: #ff7537; box-shadow: 0 0 12px rgba(242, 101, 34, .4); }

    .floor-stage.is-editing { cursor: grab; }
    .floor-stage.is-editing:active { cursor: grabbing; }
    .floor-picture { display: block; width: 100%; height: 100%; transition: transform .08s ease-out; will-change: transform; }

    .zone-overlay.is-editing {
      cursor: grab;
      border: 1px dashed var(--orange) !important;
      background: rgba(6, 24, 34, .94) !important;
      box-shadow: 0 0 12px rgba(242, 101, 34, .4) !important;
      touch-action: none;
      user-select: none;
      pointer-events: auto !important;
    }
    :host([data-theme=light]) .zone-overlay.is-editing { background: rgba(255, 255, 255, .96) !important; }
    .zone-overlay.is-editing:active {
      cursor: grabbing;
      box-shadow: 0 0 18px rgba(242, 101, 34, .65) !important;
      z-index: 20;
    }

    .overlay-header { display: flex; align-items: center; gap: 5px; }
    .overlay-size-ctrls { display: inline-flex; align-items: center; gap: 2px; margin-left: auto; }
    .btn-size-mini {
      width: 16px;
      height: 16px;
      padding: 0;
      display: grid;
      place-items: center;
      border: 1px solid rgba(242, 101, 34, .5);
      border-radius: 3px;
      background: rgba(0, 0, 0, .38);
      color: #eaf0f1;
      font-size: 10px;
      font-weight: 700;
      cursor: pointer;
      line-height: 1;
    }
    :host([data-theme=light]) .btn-size-mini { background: rgba(0, 0, 0, .06); color: #14232a; }
    .btn-size-mini:hover { background: var(--orange); color: #fff; border-color: var(--orange); }
    .size-pill { font-size: 7.5px; color: var(--muted); padding: 0 2px; font-variant-numeric: tabular-nums; }
    .resize-handle {
      position: absolute;
      right: -4px;
      bottom: -4px;
      width: 16px;
      height: 16px;
      display: grid;
      place-items: center;
      color: var(--orange);
      font-size: 12px;
      font-weight: 900;
      cursor: nwse-resize;
      touch-action: none;
      user-select: none;
      background: rgba(6, 24, 34, .95);
      border: 1px solid var(--orange);
      border-radius: 4px;
      z-index: 25;
      line-height: 1;
    }
    .resize-handle:hover, .resize-handle:active {
      background: var(--orange);
      color: #fff;
      box-shadow: 0 0 10px rgba(242, 101, 34, .8);
    }
    :host([data-theme=light]) .resize-handle { background: rgba(255, 255, 255, .95); }
    .drag-handle { display: inline-flex; color: var(--orange); }
    .empty-badge { font-size: 7px; color: var(--muted); font-style: italic; }
    @keyframes fadeInDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }

    @media (max-width: 820px) {
      .edit-toolbar { right: 58px; padding: 6px 8px; gap: 6px; }
      .toolbar-hint { display: none; }
    }
    @media (max-width: 520px) {
      .edit-toolbar { right: 52px; top: 8px; left: 8px; }
      .toolbar-section { width: 100%; }
    }
  `;let Se=De;customElements.get("witmind-building-panel")||customElements.define("witmind-building-panel",Se);const rt=8,ka=56,Sa=24,Ea=.45,st=1.15;function nt(l){return l.pointerType==="mouse"&&Number.isFinite(l.release)?l.release:l.lastMove}function ot(l,e){const t=Math.abs(l),i=Math.abs(e);return t<rt&&i<rt?"pending":t>i*st?"horizontal":i>t*st?"vertical":"pending"}function lt(l){if(l.cancelled||l.axis!=="horizontal"||!Number.isFinite(l.dx))return 0;const e=Math.abs(l.dx),t=Math.max(1,l.elapsedMs),i=e>=ka,a=e>=Sa&&e/t>=Ea;return!i&&!a?0:l.dx<0?1:-1}const Ma={panel_kind:"lobby",title:"Lobby",subtitle:"Control operativo",site_label:"WTX · MDTC",weather:"weather.forecast_casa",light_count_sensor:"sensor.lobby_luminarias_encendidas",energy_sensor:"sensor.showroom_energia_estimada",history_hours:4,chart_hours:24,show_forecast:!0,spots:[{entity:"switch.interruptor_inteligente_3_switch_1",name:"Central Colgante",subtitle:"Iluminación central · 100 W",icon:"pendant"},{entity:"switch.interruptor_inteligente_3_switch_2",name:"Spots 5W Decorativos",subtitle:"Iluminación decorativa · 40 W",icon:"spot"},{entity:"switch.interruptor_inteligente_3_switch_3",name:"Tira LED",subtitle:"Iluminación ambiental · 168 W",icon:"strip"},{entity:"switch.interruptor_inteligente_3_switch_4",name:"Spots 10W",subtitle:"Iluminación principal · 205 W",icon:"spot"}],samples:[],reflector:{entity:""},scene_control_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"],scenes:[{id:"visita",name:"Visita",subtitle:"Todos los circuitos",icon:"presentation",on_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"regular",name:"Regular",subtitle:"Solo Spots 10W",icon:"bulb",on_entities:["switch.interruptor_inteligente_3_switch_4"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3"]}],sample_scenes:[]},Aa={panel_kind:"general",static_only:!1,title:"Control de Edificio",subtitle:"Sistema de gestión y monitoreo",site_label:"WTX · MDTC",weather:"weather.forecast_casa",show_forecast:!0,spots:[{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",subtitle:"Gerencia · 48 W nominal",icon:"bulb"},{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",subtitle:"Mindtec · 48 W nominal",icon:"bulb"},{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",subtitle:"Oficinas grandes · 4×48 W nominal (192 W)",icon:"office"},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",subtitle:"Oficinas grandes · 4×48 W nominal (192 W)",icon:"office"},{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",subtitle:"Pasillos y multifuncional · 4×24 W nominal (96 W)",icon:"office"},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",subtitle:"Pasillos · 3×24 W + 3×15 W nominal (117 W)",icon:"corridor"},{entity:"switch.taller_interruptor_1",name:"Taller",subtitle:"Taller · 3×48 W nominal (144 W)",icon:"workshop"}],samples:[],reflector:{entity:""},scenes:[],sample_scenes:[],scene_control_entities:[]},Ee={panel_kind:"offices",title:"Oficinas",subtitle:"Control operativo",description:"Circuitos de oficinas con potencia nominal instalada.",weather:"weather.forecast_casa",power_watts:{"switch.oficina_gerencial_interruptor_1":48,"switch.oficina_mindtec_interruptor_1":48,"switch.oficina_grande_interruptor_1":192,"switch.oficina_grande_interruptor_2":192,"switch.b2_gang_interruptor_1":96,"switch.b2_gang_interruptor_2":117,"switch.taller_interruptor_1":144},areas:[{id:"gerencia",name:"Gerencia",environment:{temperature:"sensor.t_h_sensor_temperature",humidity:"sensor.t_h_sensor_humidity"},devices:[{entity:"switch.oficina_gerencial_interruptor_1",name:"Witronix LED",subtitle:"48 W nominal",watts:48}]},{id:"mindtec",name:"Mindtec",devices:[{entity:"switch.oficina_mindtec_interruptor_1",name:"Mindtec",subtitle:"48 W nominal",watts:48}]},{id:"general",name:"Oficinas grandes",environment:{temperature:"sensor.t_h_sensor_2_temperature",humidity:"sensor.t_h_sensor_2_humidity"},devices:[{entity:"switch.oficina_grande_interruptor_1",name:"Oficina grande 1",subtitle:"4×48 W nominal (192 W)",watts:192},{entity:"switch.oficina_grande_interruptor_2",name:"Oficina grande 2",subtitle:"4×48 W nominal (192 W)",watts:192}]},{id:"pasillos",name:"Pasillos y multifuncional",devices:[{entity:"switch.b2_gang_interruptor_1",name:"Multifuncional",subtitle:"4×24 W nominal (96 W)",watts:96,icon:"office"},{entity:"switch.b2_gang_interruptor_2",name:"Pasillos",subtitle:"3×24 W + 3×15 W nominal (117 W)",watts:117,icon:"corridor"}]},{id:"taller",name:"Taller",devices:[{entity:"switch.taller_interruptor_1",name:"Taller",subtitle:"3×48 W nominal (144 W)",watts:144,icon:"workshop"}]}]},Me={panel_kind:"recording",title:"Sala de grabación",subtitle:"Control operativo",description:"Cuatro circuitos con potencia nominal configurada.",weather:"weather.forecast_casa",power_watts:{"switch.4gang_switch_sala_grabacion_interruptor_1":42,"switch.4gang_switch_sala_grabacion_interruptor_2":96,"switch.4gang_switch_sala_grabacion_interruptor_3":45,"switch.4gang_switch_sala_grabacion_interruptor_4":20},switches:[{entity:"switch.4gang_switch_sala_grabacion_interruptor_1",name:"Tiras LED",subtitle:"3×14 W nominal (42 W)",watts:42,icon:"strip"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_2",name:"Paneles",subtitle:"2×48 W nominal (96 W)",watts:96,icon:"panel"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_3",name:"Tracklight",subtitle:"3×15 W nominal (45 W)",watts:45,icon:"spot"},{entity:"switch.4gang_switch_sala_grabacion_interruptor_4",name:"Spots",subtitle:"4×5 W nominal (20 W)",watts:20,icon:"bulb"}]},za={panel_kind:"control",title:"Control general",subtitle:"Centro de control",description:"Escenas y rutinas conectadas a Home Assistant.",weather:"weather.forecast_casa",device_watts:{...Ee.power_watts,...Me.power_watts,"switch.interruptor_inteligente_switch_1":100,"switch.interruptor_inteligente_switch_2":120,"switch.interruptor_inteligente_switch_3":180,"switch.interruptor_inteligente_switch_4":25,"switch.interruptor_inteligente_2_switch_1":96,"switch.interruptor_inteligente_2_switch_2":10,"switch.interruptor_inteligente_2_switch_3":432,"switch.interruptor_inteligente_2_switch_4":144,"switch.smart_relay_switch_3_switch":100,"switch.smart_relay_switch_4_switch":288,"switch.interruptor_inteligente_3_switch_1":100,"switch.interruptor_inteligente_3_switch_2":40,"switch.interruptor_inteligente_3_switch_3":168,"switch.interruptor_inteligente_3_switch_4":205},zones:[{id:"showroom",name:"Showroom",entities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_4_switch","switch.smart_relay_switch_3_switch"]},{id:"lobby",name:"Lobby",entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"oficinas",name:"Oficinas",entities:Object.keys(Ee.power_watts)},{id:"grabacion",name:"Sala de grabación",entities:Object.keys(Me.power_watts)}],main_actions:[{id:"showroom-reunion",name:"Reunión showroom",subtitle:"Escena de reunión",service_entities:["scene.reunion"],tone:"accent"},{id:"showroom-presentacion",name:"Presentación showroom",subtitle:"Escena de presentación",service_entities:["scene.presentacion"],tone:"accent"},{id:"showroom-apagado",name:"Apagar showroom",subtitle:"Apaga los circuitos del showroom",service_entities:["script.showroom_apagado_general"],tone:"danger"},{id:"lobby-regular",name:"Lobby regular",subtitle:"Solo iluminación principal",on_entities:["switch.interruptor_inteligente_3_switch_4"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3"]},{id:"lobby-visita",name:"Lobby visita",subtitle:"Todos los circuitos",on_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]},{id:"lobby-apagado",name:"Apagar lobby",subtitle:"Apaga los cuatro circuitos",off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]}],daily_actions:[{id:"inicio-dia",name:"Inicio del día",subtitle:"Rutina de apertura",on_entities:["switch.interruptor_inteligente_3_switch_4","switch.oficina_gerencial_interruptor_1","switch.b2_gang_interruptor_1"],off_entities:["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.b2_gang_interruptor_2"]},{id:"fin-dia",name:"Fin del día",subtitle:"Rutina de cierre",service_entities:["script.showroom_apagado_general"],off_entities:["switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4"]}],danger_action:{id:"apagado-total",name:"Apagado total Witmind",subtitle:"Apaga showroom, lobby, oficinas y grabación",service_entities:["script.apagado_total_witmind"],tone:"danger"}},Ca={panel_kind:"calendar",title:"Calendario laboral",subtitle:"Planificación operativa",description:"Días laborales gestionados desde Home Assistant."},Ta={panel_kind:"notifications",title:"Notificaciones Witmind",subtitle:"Centro de avisos",description:"Reglas, destinos e historial de notificaciones."},Na={panel_kind:"energy",title:"Gestión de energía",subtitle:"Analítica del edificio",description:"Consumo, historial de uso y simulación de dimerización."},Ae=[{id:"general",label:"Edificio",icon:"⌂"},{id:"showroom",label:"Showroom",icon:"✦"},{id:"lobby",label:"Lobby",icon:"⌂"},{id:"offices",label:"Oficinas",icon:"▦"},{id:"recording",label:"Grabación",icon:"◈"},{id:"energy",label:"Energía",icon:"ϟ"},{id:"calendar",label:"Calendario",icon:"▣"},{id:"notifications",label:"Notificaciones",icon:"◉"},{id:"control",label:"Control",icon:"⚡"}],ve=l=>{const e=String(l||"").trim().toLowerCase(),i={"oficinas-control":"offices",oficinas:"offices","sala-grabacion":"recording",grabacion:"recording",energia:"energy","gestion-energia":"energy","calendario-laboral":"calendar",calendario:"calendar",notificaciones:"notifications","control-general":"control"}[e]||e;return Ae.some(a=>a.id===i)?i:"showroom"},xe=l=>JSON.parse(JSON.stringify(l));class Da extends HTMLElement{constructor(){super(...arguments),this._config={},this._hass=null,this._narrow=!1,this._activeId="showroom",this._navigationMode="carousel",this._pages=[],this._track=null,this._drag=null,this._touchDrag=null,this._dragging=!1,this._suppressClickUntil=0,this._theme=this._loadTheme(),this._boundResize=()=>{this._drag||this._touchDrag||this._snap(!1)},this._boundTouchMove=e=>this._onTouchMove(e),this._boundTouchEnd=e=>this._onTouchEnd(e),this._boundTouchCancel=e=>this._onTouchEnd(e),this._boundTheme=e=>{var i;const t=(i=e.detail)==null?void 0:i.theme;(t==="dark"||t==="light")&&this._setTheme(t)}}set navigationMode(e){const t=e==="host"?"host":"carousel";this._navigationMode!==t&&(this._navigationMode=t,this._drag=null,this._touchDrag=null,this._dragging=!1,this.isConnected&&this._mountPages())}get navigationMode(){return this._navigationMode}set config(e){var i,a;this._config=e&&typeof e=="object"?e:{};const t=ve(this._config.panel_id||this._config.panelId||this._config.panel_kind);if(this._activeId=t,this.isConnected)if(this._navigationMode==="host")if(((i=this._pages[0])==null?void 0:i.dataset.panelId)!==this._activeId||!this._pages.length)this._mountPages();else{const s=this._panelConfigs().find(n=>n.id===this._activeId),o=(a=this._pages[0])==null?void 0:a.firstElementChild;if(o&&s){const n=o.tagName.toLowerCase();o.panel=n==="showroom-panel"?{config:s.config}:s.config}}else this._mountPages()}get config(){return this._config}set hass(e){this._hass=e,this._pages.forEach(t=>{const i=t.firstElementChild;i&&(i.hass=e||void 0)})}get hass(){return this._hass}set narrow(e){this._narrow=!!e,this.toggleAttribute("narrow",this._narrow),this._pages.forEach(t=>{const i=t.firstElementChild;i&&(i.narrow=this._narrow)})}get narrow(){return this._narrow}connectedCallback(){this.attachShadow({mode:"open"}),this._renderShell(),this._mountPages(),window.addEventListener("resize",this._boundResize,{passive:!0}),window.addEventListener("touchmove",this._boundTouchMove,{passive:!1}),window.addEventListener("touchend",this._boundTouchEnd,{passive:!0}),window.addEventListener("touchcancel",this._boundTouchCancel,{passive:!0}),this.addEventListener("witmind-theme-change",this._boundTheme)}disconnectedCallback(){window.removeEventListener("resize",this._boundResize),window.removeEventListener("touchmove",this._boundTouchMove),window.removeEventListener("touchend",this._boundTouchEnd),window.removeEventListener("touchcancel",this._boundTouchCancel),this.removeEventListener("witmind-theme-change",this._boundTheme)}_renderShell(){var t;this.shadowRoot.innerHTML=`
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
    `;const e=this.shadowRoot.querySelector("[data-track]");this._track=e,e.addEventListener("pointerdown",i=>this._onPointerDown(i)),e.addEventListener("pointermove",i=>this._onPointerMove(i)),e.addEventListener("pointerup",i=>this._onPointerUp(i)),e.addEventListener("pointercancel",i=>this._onPointerUp(i)),e.addEventListener("touchstart",i=>this._onTouchStart(i),{passive:!0}),e.addEventListener("click",i=>this._onTrackClick(i),!0),(t=this.shadowRoot.querySelector("[data-nav]"))==null||t.addEventListener("click",i=>this._onNavClick(i))}_panelConfigs(){const e=this._config.workspace_panels||this._config.workspacePanels,t=Array.isArray(e)?e:[],i=new Map(t.map(r=>{const s=r&&typeof r=="object"?r:{};return[ve(s.id||s.panel_id||s.panelId||s.panel_kind),s]})),a=ve(this._config.panel_id||this._config.panelId||this._config.panel_kind);return Ae.map(r=>{const s=r.id==="general"?Aa:r.id==="lobby"?Ma:r.id==="offices"?Ee:r.id==="recording"?Me:r.id==="energy"?Na:r.id==="calendar"?Ca:r.id==="notifications"?Ta:r.id==="control"?za:{},o=i.get(r.id)||{},n=r.id===a?this._config:{},c={...xe(s),...xe(o),...xe(n)};return r.id==="lobby"&&Array.isArray(n.devices)&&!Array.isArray(n.spots)&&(c.spots=n.devices),r.id==="general"?(c.panel_kind="general",c.static_only=!1):r.id==="lobby"?c.panel_kind="lobby":["offices","recording","control","energy","calendar","notifications"].includes(r.id)?c.panel_kind=r.id:(delete c.panel_kind,delete c.static_only),{...r,config:c}})}_mountPages(){if(!this._track)return;this._track.innerHTML="",this._pages=[];const e=this._panelConfigs(),t=e.filter(a=>a.id===this._activeId);(this._navigationMode==="host"?t.length?t:e.slice(0,1):e).forEach((a,r)=>{const s=document.createElement("section");s.className="page",s.dataset.panelId=a.id,s.setAttribute("aria-label",a.label),s.setAttribute("aria-hidden",String(a.id!==this._activeId)),s.inert=a.id!==this._activeId,a.id===this._activeId&&this._attachPanel(s,a),this._track.append(s),this._pages.push(s),r===0&&(s.dataset.first="true")}),this._renderNav(),this._snap(!1)}_attachPanel(e,t){if(e.firstElementChild)return;const i=t.id==="general"?"witmind-building-panel":t.id==="energy"?"witmind-energy-panel":["offices","recording","control"].includes(t.id)?"witmind-operations-panel":["calendar","notifications"].includes(t.id)?"witmind-admin-panel":"showroom-panel",a=document.createElement(i);a.panel=i==="showroom-panel"?{config:t.config}:t.config,a.theme=this._theme,a.narrow=this._narrow,this._hass&&(a.hass=this._hass),e.append(a)}_activeIndex(){const e=this._pages.findIndex(t=>t.dataset.panelId===this._activeId);return e>=0?e:0}_renderNav(){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("[data-nav]");if(!e)return;if(this._navigationMode==="host"){e.classList.add("is-hidden"),e.innerHTML="";return}const t=this._activeIndex();e.classList.toggle("is-hidden",this._activeId==="general"),e.innerHTML=`
      <button type="button" data-direction="prev" aria-label="Panel anterior" ${t===0?"disabled":""}>‹</button>
      ${Ae.map(a=>`<button type="button" class="dot" data-panel="${a.id}" aria-label="Abrir ${a.label}" aria-current="${a.id===this._activeId?"page":"false"}"></button>`).join("")}
      <button type="button" data-direction="next" aria-label="Panel siguiente" ${t===this._pages.length-1?"disabled":""}>›</button>
    `}_onNavClick(e){const t=e.target.closest("button");t&&(t.dataset.panel?this._goTo(t.dataset.panel):this._goTo(this._activeIndex()+(t.dataset.direction==="next"?1:-1)))}_onPointerDown(e){if(this._navigationMode==="host"||e.pointerType==="touch"||!e.isPrimary||e.pointerType==="mouse"&&e.button!==0)return;const t=this._isSwipeIgnored(e);this._drag={pointerId:e.pointerId,pointerType:e.pointerType,startX:e.clientX,startY:e.clientY,lastX:e.clientX,lastY:e.clientY,time:performance.now(),ignored:t,axis:"pending"},this._dragging=!1}_onPointerMove(e){var s,o,n;if(this._navigationMode==="host"||!this._drag||this._drag.ignored||this._drag.pointerId!==e.pointerId||!this._track)return;const t=((s=e.getCoalescedEvents)==null?void 0:s.call(e))||[],i=t[t.length-1]||e;this._drag.lastX=i.clientX,this._drag.lastY=i.clientY;const a=this._drag.lastX-this._drag.startX,r=this._drag.lastY-this._drag.startY;this._drag.axis==="pending"&&(this._drag.axis=ot(a,r)),this._drag.axis==="horizontal"&&(this._dragging||(this._dragging=!0,(n=(o=e.currentTarget).setPointerCapture)==null||n.call(o,e.pointerId)),this._track.classList.add("is-dragging"),this._track.style.transform=`translate3d(calc(${this._activeIndex()*-100}% + ${a}px), 0, 0)`,e.preventDefault())}_onPointerUp(e){var c,d,h;if(this._navigationMode==="host"||!this._drag||this._drag.pointerId!==e.pointerId)return;const t=this._drag,i=e.type==="pointercancel";i||(t.lastX=nt({pointerType:t.pointerType,lastMove:t.lastX,release:e.clientX}),t.lastY=nt({pointerType:t.pointerType,lastMove:t.lastY,release:e.clientY}));const a=t.lastX-t.startX,r=Math.max(1,performance.now()-this._drag.time),s=lt({axis:t.axis,cancelled:i,dx:a,elapsedMs:r}),o=this._dragging&&t.axis==="horizontal",n=e.currentTarget;(c=n.hasPointerCapture)!=null&&c.call(n,e.pointerId)&&((d=n.releasePointerCapture)==null||d.call(n,e.pointerId)),(h=this._track)==null||h.classList.remove("is-dragging"),this._drag=null,this._dragging=!1,o&&(this._suppressClickUntil=performance.now()+500),s?this._goTo(this._activeIndex()+s):this._snap(!0)}_isSwipeIgnored(e){const t="input,textarea,select,[data-no-swipe]",i=e.target;return e.composedPath().some(a=>a instanceof HTMLElement&&!!a.closest(t))||i instanceof HTMLElement&&!!i.closest(t)}_onTouchStart(e){if(this._navigationMode==="host"||e.touches.length!==1||this._drag)return;const t=e.changedTouches[0]||e.touches[0];if(!t)return;const i=this._isSwipeIgnored(e);this._touchDrag={pointerId:t.identifier,pointerType:"touch",startX:t.clientX,startY:t.clientY,lastX:t.clientX,lastY:t.clientY,time:performance.now(),ignored:i,axis:"pending"},this._dragging=!1}_onTouchMove(e){const t=this._touchDrag;if(this._navigationMode==="host"||!t||t.ignored||!this._track)return;const i=Array.from(e.touches).find(s=>s.identifier===t.pointerId);if(!i)return;t.lastX=i.clientX,t.lastY=i.clientY;const a=t.lastX-t.startX,r=t.lastY-t.startY;t.axis==="pending"&&(t.axis=ot(a,r)),t.axis==="horizontal"&&(this._dragging=!0,this._track.classList.add("is-dragging"),this._track.style.transform=`translate3d(calc(${this._activeIndex()*-100}% + ${a}px), 0, 0)`,e.preventDefault())}_onTouchEnd(e){var c;const t=this._touchDrag;if(this._navigationMode==="host"||!t)return;const i=e.type==="touchcancel",a=Array.from(e.changedTouches).find(d=>d.identifier===t.pointerId);!i&&a&&(t.lastX=a.clientX,t.lastY=a.clientY);const r=t.lastX-t.startX,s=Math.max(1,performance.now()-t.time),o=lt({axis:t.axis,cancelled:i,dx:r,elapsedMs:s}),n=this._dragging&&t.axis==="horizontal";(c=this._track)==null||c.classList.remove("is-dragging"),this._touchDrag=null,this._dragging=!1,n&&(this._suppressClickUntil=performance.now()+500),o?this._goTo(this._activeIndex()+o):this._snap(!0)}_onTrackClick(e){performance.now()>this._suppressClickUntil||(this._suppressClickUntil=0,e.preventDefault(),e.stopImmediatePropagation())}_goTo(e){if(this._navigationMode==="host"){this._snap(!1);return}const t=typeof e=="string"?this._pages.findIndex(a=>a.dataset.panelId===e):e;if(t<0||t>=this._pages.length){this._snap(!0);return}this._activeId=this._pages[t].dataset.panelId||this._activeId;const i=this._panelConfigs().find(a=>a.id===this._activeId);i&&this._attachPanel(this._pages[t],i),this._pages.forEach(a=>{const r=a.dataset.panelId===this._activeId;a.setAttribute("aria-hidden",String(!r)),a.inert=!r}),this._renderNav(),this._snap(!0),this.dispatchEvent(new CustomEvent("witmind-panel-change",{detail:{panelId:this._activeId},bubbles:!0,composed:!0}))}_loadTheme(){try{return localStorage.getItem("witmind-showroom-panel-theme")==="light"?"light":"dark"}catch{return"dark"}}_setTheme(e){if(this._theme!==e){this._theme=e;try{localStorage.setItem("witmind-showroom-panel-theme",e)}catch{}this._pages.forEach(t=>{const i=t.firstElementChild;i&&(i.setAttribute("data-theme",e),i.theme=e)})}}_snap(e=!0){if(this._track){if(this._track.classList.toggle("is-dragging",!e),this._navigationMode==="host"){this._track.style.transform="translate3d(0%, 0, 0)";return}this._track.style.transform=`translate3d(${this._activeIndex()*-100}%, 0, 0)`}}}customElements.get("witmind-workspace")||customElements.define("witmind-workspace",Da);const ct=()=>{var l,e;return((e=(l=globalThis.crypto)==null?void 0:l.randomUUID)==null?void 0:e.call(l))||`${Date.now()}-${Math.random().toString(16).slice(2)}`};class La{constructor(e=window.parent){this.target=e,this.states=new Map,this.listeners=new Set,this.pending=new Map,this.subscriptions=new Map,window.addEventListener("message",t=>this.onMessage(t)),this.post({type:"WITMIND_READY"})}subscribeEntities(e,t){return this.listeners.add(t),this.post({type:"WITMIND_SUBSCRIBE_ENTITIES",entityIds:[...new Set(e)]}),t(Object.fromEntries(this.states)),()=>this.listeners.delete(t)}getEntity(e){return this.states.get(e)}callService(e,t={},i){return this.request("WITMIND_CALL_SERVICE","WITMIND_SERVICE_RESULT",{service:e,serviceData:t,target:i})}toggleMenu(){this.post({type:"WITMIND_TOGGLE_MENU"})}dbRequest(e,t={}){return this.request("WITMIND_DB_REQUEST","WITMIND_DB_RESULT",{command:e,payload:t})}haRequest(e,t={}){return this.request("WITMIND_HA_COMMAND","WITMIND_HA_RESULT",{command:e,payload:t})}haSubscribe(e,t,i){const a=ct(),r=()=>{this.subscriptions.delete(a),this.post({type:"WITMIND_HA_UNSUBSCRIBE",requestId:a})};return new Promise((s,o)=>{const n=window.setTimeout(()=>{this.pending.delete(a),o(new Error("Timeout esperando suscripción HA"))},1e4);this.pending.set(a,{resolve:()=>{window.clearTimeout(n),s(r)},reject:o,timer:n}),this.subscriptions.set(a,i),this.post({type:"WITMIND_HA_SUBSCRIBE",requestId:a,command:e,payload:t})})}post(e){this.target.postMessage({protocol:1,source:"witmind-ui",...e},"*")}request(e,t,i){const a=ct();return new Promise((r,s)=>{const o=window.setTimeout(()=>{this.pending.delete(a),s(new Error(`Timeout esperando ${t}`))},1e4);this.pending.set(a,{resolve:r,reject:s,timer:o}),this.post({type:e,requestId:a,...i})})}onMessage(e){var a,r,s;if(e.source!==this.target||((a=e.data)==null?void 0:a.protocol)!==1||((r=e.data)==null?void 0:r.source)!=="witmind-ha")return;const t=e.data;if(t.type==="WITMIND_HA_EVENT"){(s=this.subscriptions.get(t.requestId))==null||s(t.result);return}if(t.type==="WITMIND_ENTITY_UPDATE"){Object.entries(t.states||{}).forEach(([n,c])=>this.states.set(n,c)),(t.removed||[]).forEach(n=>this.states.delete(n));const o=Object.fromEntries(this.states);this.listeners.forEach(n=>n(o));return}const i=this.pending.get(t.requestId);i&&(this.pending.delete(t.requestId),window.clearTimeout(i.timer),t.ok?i.resolve(t.result):i.reject(new Error(String(t.error||"Witmind request failed"))))}}const dt=[...ya,"weather.forecast_casa","media_player.showroom_1","sensor.showroom_luminarias_encendidas","sensor.showroom_energia_estimada","sensor.21051182g_battery_level","switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_3_switch","switch.smart_relay_switch_4_switch","switch.interruptor_inteligente_3_switch_1","switch.interruptor_inteligente_3_switch_2","switch.interruptor_inteligente_3_switch_3","switch.interruptor_inteligente_3_switch_4","scene.presentacion","scene.reunion","scene.visita","scene.regular","script.showroom_encendido_general","script.showroom_apagado_general","script.apagado_total_witmind","switch.oficina_gerencial_interruptor_1","switch.oficina_mindtec_interruptor_1","switch.oficina_grande_interruptor_1","switch.oficina_grande_interruptor_2","switch.b2_gang_interruptor_1","switch.b2_gang_interruptor_2","switch.taller_interruptor_1","sensor.t_h_sensor_temperature","sensor.t_h_sensor_humidity","sensor.t_h_sensor_2_temperature","sensor.t_h_sensor_2_humidity","switch.4gang_switch_sala_grabacion_interruptor_1","switch.4gang_switch_sala_grabacion_interruptor_2","switch.4gang_switch_sala_grabacion_interruptor_3","switch.4gang_switch_sala_grabacion_interruptor_4","binary_sensor.dia_no_laborable","binary_sensor.bloqueo_automatizaciones_laborales","automation.taller_ciclo_10s","automation.witmind_bloqueo_laboral_apagado_seguro"],ze=(l,e=new Set)=>(typeof l=="string"&&/^[a-z_]+\.[a-z0-9_]+$/i.test(l)?e.add(l):Array.isArray(l)?l.forEach(t=>ze(t,e)):l&&typeof l=="object"&&Object.values(l).forEach(t=>ze(t,e)),[...e]);class Ia extends HTMLElement{constructor(){super(...arguments),this.states={},this.previousStates={},this.eventListeners=new Set,this.panelConfig={panel_id:"general",panel_kind:"general"},this.user={is_admin:!1,name:""},this.panelConfigSignature="",this.appliedTheme="",this.pendingNarrow=!1,this.navigationMode="carousel",this.messageHandler=e=>{var i,a,r,s;if(e.source!==window.parent||((i=e.data)==null?void 0:i.protocol)!==1||((a=e.data)==null?void 0:a.source)!=="witmind-ha")return;if(e.data.type==="WITMIND_INIT"&&e.data.panelConfig){this.navigationMode=e.data.navigationMode==="carousel"?"carousel":"host";const o=e.data.panelConfig,n=JSON.stringify(o),c=n!==this.panelConfigSignature,d=e.data.theme;if(!this.panel&&(d==="light"||d==="dark")){this.appliedTheme=d;try{localStorage.setItem("witmind-showroom-panel-theme",d)}catch{}}this.panelConfig=o,this.panelConfigSignature=n,this.user={is_admin:!!((r=e.data.user)!=null&&r.is_admin),name:String(((s=e.data.user)==null?void 0:s.name)||"")},this.pendingNarrow=!!e.data.narrow;const h=this.ensurePanel();h||(this.panel&&this.panel.navigationMode!==this.navigationMode&&(this.panel.navigationMode=this.navigationMode),c&&this.applyPanelConfig()),this.panel&&(this.panel.narrow=this.pendingNarrow),(h||c)&&this.resubscribeWithConfig()}const t=e.data.theme;(t==="light"||t==="dark")&&this.panel&&t!==this.appliedTheme&&(this.appliedTheme=t,this.panel.setAttribute("data-theme",t),this.panel.dispatchEvent(new CustomEvent("witmind-theme-change",{detail:{theme:t},bubbles:!0,composed:!0})))}}connectedCallback(){this.attachShadow({mode:"open"}),window.addEventListener("message",this.messageHandler),this.shadowRoot.innerHTML='<style>:host{display:block;min-height:100dvh;background:var(--wit-surface,#071118)}.boot{min-height:100dvh;background:var(--wit-surface,#071118)}witmind-workspace{display:block;min-height:100dvh}</style><div class="boot" aria-label="Cargando panel Witmind"></div>',this.client=new La(window.parent),window.parent===window&&(this.panelConfigSignature=JSON.stringify(this.panelConfig),this.ensurePanel(),this.subscribe(dt))}ensurePanel(){var t;if(this.panel)return!1;const e=document.createElement("witmind-workspace");return e.navigationMode=this.navigationMode,e.config=this.panelConfig,e.narrow=this.pendingNarrow,e.hass=this.createHassAdapter(),e.addEventListener("hass-toggle-menu",()=>{var i;return(i=this.client)==null?void 0:i.toggleMenu()}),this.panel=e,(t=this.shadowRoot.querySelector(".boot"))==null||t.replaceWith(e),!0}subscribe(e){var t;(t=this.unsubscribe)==null||t.call(this),this.unsubscribe=this.client.subscribeEntities(e,i=>{this.previousStates=this.states,this.states=i,this.panel.hass=this.createHassAdapter(),this.emitStateChanges()})}resubscribeWithConfig(){const e=[...new Set([...dt,...ze(this.panelConfig)])];this.subscribe(e)}applyPanelConfig(){this.panel&&(this.panel.config=this.panelConfig)}disconnectedCallback(){var e;(e=this.unsubscribe)==null||e.call(this),window.removeEventListener("message",this.messageHandler)}createHassAdapter(){const e=this.client;return{states:this.states,language:"es",user:this.user,selectedTheme:null,callService:(i,a,r={},s)=>e.callService(`${i}.${a}`,r,s),callWS:async i=>i.type==="get_states"?Object.values(this.states):e.haRequest(String(i.type||""),i),callApi:async(i,a)=>[],connection:{subscribeEvents:async(i,a)=>{const r=s=>{(!a||a==="state_changed")&&i(s)};return this.eventListeners.add(r),()=>this.eventListeners.delete(r)},sendMessagePromise:i=>e.haRequest(String(i.type||""),i),subscribeMessage:(i,a)=>e.haSubscribe(String(a.type||""),a,i)}}}emitStateChanges(){Object.entries(this.states).forEach(([e,t])=>{this.previousStates[e]!==t&&this.eventListeners.forEach(i=>i({event_type:"state_changed",data:{entity_id:e,new_state:t,old_state:this.previousStates[e]||null}}))})}}customElements.define("witmind-ui-app",Ia);
