import{A as O,E as D,b as l,i as L,n as C,r as u,a as R,t as H}from"./state-CPx13wj7.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j={CHILD:2},B=t=>(...a)=>({_$litDirective$:t,values:a});class N{constructor(a){}get _$AU(){return this._$AM._$AU}_$AT(a,e,s){this._$Ct=a,this._$AM=e,this._$Ci=s}_$AS(a,e){return this.update(a,e)}update(a,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class T extends N{constructor(a){if(super(a),this.it=O,a.type!==j.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(a){if(a===O||a==null)return this._t=void 0,this.it=a;if(a===D)return a;if(typeof a!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(a===this.it)return this._t;this.it=a;const e=[a];return e.raw=e,this._t={_$litType$:this.constructor.resultType,strings:e,values:[]}}}T.directiveName="unsafeHTML",T.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class E extends T{}E.directiveName="unsafeSVG",E.resultType=2;const G=B(E),I={bulb:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>',zap:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',sun:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><line x1="12" y1="2" x2="12" y2="4"></line><line x1="12" y1="20" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"></line><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="4" y2="12"></line><line x1="20" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="6.34" y2="17.66"></line><line x1="17.66" y1="6.34" x2="19.07" y2="4.93"></line></svg>',music:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>',sparkles:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path></svg>',users:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',moon:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>',calendar:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>',layers:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',battery:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="10" x="2" y="7" rx="2" ry="2"></rect><line x1="22" x2="22" y1="11" y2="13"></line></svg>',checkCircle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',alertTriangle:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',play:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',pause:'<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg>',skipBack:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" x2="5" y1="19" y2="5"></line></svg>',skipForward:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" x2="19" y1="5" y2="19"></line></svg>',close:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'};function r(t){const a=t in I?I[t]:t;return l`${G(a||"")}`}const U={"light.salon_principal":{entity_id:"light.salon_principal",state:"on",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Luz General Salón",brightness:215,color_temp:320,supported_features:43},context:{id:"ctx_1"}},"light.salon_ambiente":{entity_id:"light.salon_ambiente",state:"on",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Fosa Arquitectónica LED",brightness:160,color_temp:380,supported_features:43},context:{id:"ctx_2"}},"light.comedor":{entity_id:"light.comedor",state:"off",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Lámpara Colgante Comedor",brightness:0,supported_features:43},context:{id:"ctx_3"}},"light.cocina":{entity_id:"light.cocina",state:"on",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Iluminación Técnica Cocina",brightness:255,supported_features:43},context:{id:"ctx_4"}},"light.master_suite":{entity_id:"light.master_suite",state:"off",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Master Suite DALI",brightness:0,supported_features:43},context:{id:"ctx_5"}},"light.terraza":{entity_id:"light.terraza",state:"on",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Balizas Exteriores Terraza",brightness:180,supported_features:43},context:{id:"ctx_6"}},"sensor.potencia_total":{entity_id:"sensor.potencia_total",state:"432",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Consumo Activo Showroom",unit_of_measurement:"W",device_class:"power",state_class:"measurement"},context:{id:"ctx_7"}},"sensor.energia_diaria":{entity_id:"sensor.energia_diaria",state:"26.11",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Consumo Total Hoy",unit_of_measurement:"kWh",device_class:"energy"},context:{id:"ctx_8"}},"sensor.solar_produccion":{entity_id:"sensor.solar_produccion",state:"3420",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Producción Fotovoltaica",unit_of_measurement:"W",device_class:"power"},context:{id:"ctx_9"}},"sensor.bateria_soc":{entity_id:"sensor.bateria_soc",state:"88",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Batería Almacenamiento",unit_of_measurement:"%",device_class:"battery"},context:{id:"ctx_10"}},"climate.termostato_salon":{entity_id:"climate.termostato_salon",state:"heat",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Clima Salón Principal",current_temperature:21.5,temperature:22,current_humidity:48,hvac_action:"heating",hvac_modes:["off","heat","cool","auto"]},context:{id:"ctx_11"}},"media_player.sonos_salon":{entity_id:"media_player.sonos_salon",state:"playing",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Sonos Architectural Salón",media_title:"Modul 29_14",media_artist:"Nik Bärtsch's Ronin",media_album_name:"Awase (ECM Records)",source:"Tidal Master Lossless",volume_level:.42,is_volume_muted:!1,media_duration:382,media_position:124},context:{id:"ctx_12"}},"scene.showroom_confort":{entity_id:"scene.showroom_confort",state:"scenery",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Ambiente Confort",icon:"sun"},context:{id:"ctx_13"}},"scene.showroom_cine":{entity_id:"scene.showroom_cine",state:"scenery",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Modo Cine / Lounge",icon:"moon"},context:{id:"ctx_14"}},"scene.showroom_reunion":{entity_id:"scene.showroom_reunion",state:"scenery",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Presentación & Reunión",icon:"sparkles"},context:{id:"ctx_15"}},"scene.showroom_noche":{entity_id:"scene.showroom_noche",state:"scenery",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Apagado General",icon:"power"},context:{id:"ctx_16"}},"weather.showroom":{entity_id:"weather.showroom",state:"sunny",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Exterior Showroom",temperature:22.4,humidity:45,wind_speed:11,pressure:1018},context:{id:"ctx_17"}}};class V{constructor(){this._listeners=new Set,this._hass={states:{...U},language:"es",selectedTheme:null,callService:this._callService.bind(this),callWS:this._callWS.bind(this),connection:{subscribeEvents:async()=>()=>{},sendMessagePromise:async()=>({})}}}getHass(){return this._hass}subscribe(a){return this._listeners.add(a),a(this._hass),()=>this._listeners.delete(a)}_notify(){this._hass={...this._hass,states:{...this._hass.states}};for(const a of this._listeners)a(this._hass)}async _callService(a,e,s){const i=s==null?void 0:s.entity_id;if(!i)return;const c=this._hass.states[i];if(!c)return;const n={...c,last_updated:new Date().toISOString()};if(a==="light"){if(e==="turn_on")n.state="on",(s==null?void 0:s.brightness)!==void 0&&(n.attributes={...n.attributes,brightness:s.brightness}),(s==null?void 0:s.color_temp)!==void 0&&(n.attributes={...n.attributes,color_temp:s.color_temp});else if(e==="turn_off")n.state="off",n.attributes={...n.attributes,brightness:0};else if(e==="toggle"){const d=c.state==="on"?"off":"on";n.state=d,d==="on"&&!n.attributes.brightness&&(n.attributes={...n.attributes,brightness:255})}}else if(a==="media_player"){if(e==="media_play_pause")n.state=c.state==="playing"?"paused":"playing";else if(e==="media_play")n.state="playing";else if(e==="media_pause")n.state="paused";else if(e==="volume_set"&&(s==null?void 0:s.volume_level)!==void 0)n.attributes={...n.attributes,volume_level:s.volume_level};else if(e==="volume_mute"){const d=!c.attributes.is_volume_muted;n.attributes={...n.attributes,is_volume_muted:d}}}else a==="scene"&&e==="turn_on"&&(i==="scene.showroom_noche"?Object.keys(this._hass.states).forEach(d=>{d.startsWith("light.")&&(this._hass.states[d]={...this._hass.states[d],state:"off"})}):i==="scene.showroom_confort"&&this._hass.states["light.salon_principal"]&&(this._hass.states["light.salon_principal"]={...this._hass.states["light.salon_principal"],state:"on",attributes:{...this._hass.states["light.salon_principal"].attributes,brightness:180}}));return this._hass.states[i]=n,this._notify(),{success:!0}}async _callWS(a){return{result:"ok"}}}const _=new V;typeof window<"u"&&(window.mockHassProvider=_,window.registerMockHassConsumer=t=>{_.subscribe(a=>{t.hass=a})});var F=Object.defineProperty,q=Object.getOwnPropertyDescriptor,v=(t,a,e,s)=>{for(var i=s>1?void 0:s?q(a,e):a,c=t.length-1,n;c>=0;c--)(n=t[c])&&(i=(s?n(a,e,i):n(i))||i);return s&&i&&F(a,e,i),i};const b=[{id:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",subtitle:"Zona ventana",watts:100},{id:"switch.interruptor_inteligente_switch_2",name:"Spots 2×3",subtitle:"Muestra 2 × 3",watts:120},{id:"switch.interruptor_inteligente_switch_3",name:"Spots 3×3",subtitle:"Muestra 3 × 3",watts:180},{id:"switch.interruptor_inteligente_switch_4",name:"Spots TV",subtitle:"Zona audiovisual",watts:25}],x=[{id:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",subtitle:"Temperaturas color",watts:96},{id:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",subtitle:"Muestra suspendida",watts:10},{id:"switch.interruptor_inteligente_2_switch_3",name:"Slims",subtitle:"Línea decorativa",watts:432},{id:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",subtitle:"Iluminación empotrada",watts:144},{id:"switch.smart_relay_switch_4_switch",name:"Paneles",subtitle:"Control por relé",watts:288}],h={id:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",subtitle:"Control aislado",watts:0},f=[...b,...x,h],M=1395,o={weather:"weather.forecast_casa",media:"media_player.showroom_1",lightCount:"sensor.showroom_luminarias_encendidas",energy:"sensor.showroom_energia_estimada",power:"sensor.showroom_potencia_estimada",battery:"sensor.21051182g_battery_level",presentation:"scene.presentacion",meeting:"scene.reunion",allOn:"script.showroom_encendido_general",allOff:"script.showroom_apagado_general"};let p=class extends R{constructor(){super(...arguments),this.theme="dark",this._page=0,this._sheet=null,this._timeStr="",this._dateStr="",this._stats=[],this._recentActivity=[{text:"Spots ventana encendidos",time:"hace 2 min",type:"light"},{text:"Ambient Lounge reproducción iniciada",time:"hace 6 min",type:"media"},{text:"Escena Presentación aplicada",time:"hace 14 min",type:"scene"},{text:"Sincronización de telemetría OK",time:"hace 18 min",type:"system"}]}connectedCallback(){super.connectedCallback();const t=new URLSearchParams(window.location.search).get("theme");(t==="light"||t==="dark")&&(this.theme=t),this.hasAttribute("theme")||this.setAttribute("theme",this.theme),this._updateClock(),this._timeInterval=window.setInterval(()=>this._updateClock(),1e3),!this.hass&&_&&(this._unsubscribeHass=_.subscribe(a=>{this.hass=a,this.requestUpdate()})),this._subscribeEvents(),this._fetchStatistics()}disconnectedCallback(){super.disconnectedCallback(),this._timeInterval&&clearInterval(this._timeInterval),this._unsubscribeHass&&this._unsubscribeHass(),this._unsubEvents&&this._unsubEvents()}updated(t){super.updated(t),t.has("theme")&&(document.documentElement.setAttribute("theme",this.theme),this.theme==="light"?(document.body.classList.add("light-theme"),document.body.classList.remove("dark-theme")):(document.body.classList.add("dark-theme"),document.body.classList.remove("light-theme")))}_updateClock(){const t=new Date;this._timeStr=`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;const a=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],e=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];this._dateStr=`${a[t.getDay()]}, ${t.getDate()} ${e[t.getMonth()]}`}_subscribeEvents(){var t,a;if((a=(t=this.hass)==null?void 0:t.connection)!=null&&a.subscribeEvents)try{this.hass.connection.subscribeEvents(e=>{var s,i,c,n;if((e==null?void 0:e.event_type)==="state_changed"&&((s=e==null?void 0:e.data)!=null&&s.entity_id)){const d=e.data.entity_id,g=(i=e.data.new_state)==null?void 0:i.state,w=((n=(c=e.data.new_state)==null?void 0:c.attributes)==null?void 0:n.friendly_name)||d.split(".")[1]||d,y=d.startsWith("switch")?"light":d.startsWith("media")?"media":"scene";this._recentActivity.unshift({text:`${w}: ${g==="on"?"Encendido":g==="off"?"Apagado":g}`,time:"hace un momento",type:y}),this._recentActivity.length>8&&this._recentActivity.pop(),this.requestUpdate()}},"state_changed").then(e=>{this._unsubEvents=e}).catch(()=>{})}catch{}}async _fetchStatistics(){var t,a,e,s;if((a=(t=this.hass)==null?void 0:t.connection)!=null&&a.sendMessagePromise||(e=this.hass)!=null&&e.callWS)try{const i=Date.now(),c=i-24*3600*1e3,n={type:"recorder/statistics_during_period",start_time:new Date(c).toISOString(),end_time:new Date(i).toISOString(),statistic_ids:[o.energy],period:"hour"};let d=null;(s=this.hass.connection)!=null&&s.sendMessagePromise?d=await this.hass.connection.sendMessagePromise(n):this.hass.callWS&&(d=await this.hass.callWS(n)),d&&d[o.energy]&&(this._stats=d[o.energy],this.requestUpdate())}catch{}}_state(t){var a,e;return(e=(a=this.hass)==null?void 0:a.states)==null?void 0:e[t]}_value(t,a="—"){var e;return((e=this._state(t))==null?void 0:e.state)??a}_attr(t,a,e=null){var s,i;return((i=(s=this._state(t))==null?void 0:s.attributes)==null?void 0:i[a])??e}_callService(t,a,e={}){var s;(s=this.hass)!=null&&s.callService&&this.hass.callService(t,a,e)}_toggleSwitch(t){const e=this._value(t,"off")==="on"?"turn_off":"turn_on";this._callService("switch",e,{entity_id:t})}_toggleTheme(){this.theme=this.theme==="light"?"dark":"light",this.setAttribute("theme",this.theme)}_openSheet(t){this._sheet=t}_closeSheet(){this._sheet=null}_setPage(t){var e,s,i;if(this._page=t,(e=this.shadowRoot)==null?void 0:e.querySelector("#carouselTrack")){const c=(i=(s=this.shadowRoot)==null?void 0:s.querySelectorAll(".carousel-pane"))==null?void 0:i[t];c&&c.scrollIntoView({behavior:"smooth",block:"nearest",inline:"start"})}}_detectActiveAmbience(){const t=this._value("switch.interruptor_inteligente_switch_1"),a=this._value("switch.interruptor_inteligente_switch_2"),e=this._value("switch.interruptor_inteligente_switch_3"),s=this._value("switch.interruptor_inteligente_switch_4"),i=this._value("switch.interruptor_inteligente_2_switch_3"),c=Number(this._value(o.lightCount,"0"));return c===0?{name:"Reposo",sub:"Todo apagado",isPreset:!1}:t==="on"&&s==="on"&&a==="off"&&e==="off"&&i==="off"?{name:"Presentación",sub:"Ventana + TV activas",isPreset:!0}:t==="on"&&a==="on"&&e==="off"&&s==="off"&&i==="off"?{name:"Reunión",sub:"Spots 2×3 + Ventana",isPreset:!0}:c===9?{name:"Encendido Total",sub:"Todos los circuitos",isPreset:!0}:{name:"Personalizado",sub:`${c} luminarias activas`,isPreset:!1}}_renderStatusPills(t,a,e,s,i,c){return l`
      ${c?l`
            <div class="status-pill is-warning" id="pillBatWarn" @click=${()=>this._setPage(1)}>
              <span class="pill-icon">${r("alertTriangle")}</span>
              <div class="pill-texts">
                <span class="pill-title">Batería baja</span>
                <span class="pill-meta">${i}%</span>
              </div>
            </div>
          `:null}

      <div class="status-pill is-active-pill" id="pillLights" @click=${()=>this._openSheet("lights")}>
        <span class="pill-icon active-accent">${r("bulb")}</span>
        <div class="pill-texts">
          <span class="pill-title">${t} luces</span>
          <span class="pill-meta">${a} W</span>
        </div>
      </div>

      <div class="status-pill" id="pillMedia" @click=${()=>this._callService("media_player","media_play_pause",{entity_id:o.media})}>
        <span class="pill-icon ${e?"active-accent":""}">${r("music")}</span>
        <div class="pill-texts">
          <span class="pill-title">${e?"Ambient Lounge":"Audio en pausa"}</span>
          <span class="pill-meta">Witmind Studio</span>
        </div>
      </div>

      <div class="status-pill" id="pillEnergy" @click=${()=>this._setPage(1)}>
        <span class="pill-icon">${r("zap")}</span>
        <div class="pill-texts">
          <span class="pill-title">${s} kWh</span>
          <span class="pill-meta">Consumo hoy</span>
        </div>
      </div>
    `}_renderHeroWidget(t,a){return l`
      <section class="card hero-card">
        <div class="hero-brand-col">
          <span class="hero-kicker">SHOWROOM WITMIND</span>
          <h1 class="hero-title">Iluminación de precisión</h1>
          <p class="hero-caption">
            ${t} de ${f.length} luminarias activas • ${a} W de carga
          </p>
        </div>
        <div class="hero-segmented-nav">
          <button
            class="nav-segment-btn ${this._page===0?"is-selected":""}"
            id="navSegHome"
            @click=${()=>this._setPage(0)}
          >
            Inicio
          </button>
          <button
            class="nav-segment-btn"
            id="navSegLights"
            @click=${()=>this._openSheet("lights")}
          >
            Luces
          </button>
          <button
            class="nav-segment-btn ${this._page===1?"is-selected":""}"
            id="navSegMore"
            @click=${()=>this._setPage(1)}
          >
            Analítica
          </button>
        </div>
      </section>
    `}_renderWeatherWidget(t,a,e){return l`
      <div class="card weather-card interactive" id="widgetWeather" @click=${()=>this._setPage(1)}>
        <div class="card-head">
          <span class="card-kicker">Clima</span>
          <span class="card-head-icon">${r("sun")}</span>
        </div>
        <div class="weather-kpi-block">
          <div class="kpi-display">${t}°</div>
          <div class="kpi-sub-label">${a==="sunny"?"Soleado":a} • Humedad ${e}%</div>
        </div>
        <div class="weather-week-strip">
          <div class="fc-col"><span>Hoy</span><strong class="active-accent">24°</strong></div>
          <div class="fc-col"><span>Mañana</span><strong>23°</strong></div>
          <div class="fc-col"><span>Sáb</span><strong>25°</strong></div>
          <div class="fc-col"><span>Dom</span><strong>21°</strong></div>
        </div>
      </div>
    `}_renderEnergyWidget(t,a){return l`
      <div class="card energy-card interactive" id="widgetEnergy" @click=${()=>this._setPage(1)}>
        <div class="card-head">
          <span class="card-kicker">Energía</span>
          <span class="card-head-icon">${r("zap")}</span>
        </div>
        <div class="energy-kpi-block">
          <div class="kpi-display">${t} W</div>
          <div class="kpi-sub-label">${a} kWh consumidos</div>
        </div>
        ${this._renderCleanSparkline(this._stats)}
      </div>
    `}_renderCleanSparkline(t){if(!t||t.length===0)return l`
        <div class="sparkline-bars">
          <span style="height: 25%;"></span>
          <span style="height: 40%;"></span>
          <span style="height: 60%;"></span>
          <span style="height: 85%;" class="is-hot"></span>
          <span style="height: 100%;" class="is-hot"></span>
          <span style="height: 70%;"></span>
          <span style="height: 45%;"></span>
          <span style="height: 30%;"></span>
        </div>
      `;const a=Math.max(...t.map(e=>e.mean||(e.change?e.change*1e3:0)),100);return l`
      <div class="sparkline-bars">
        ${t.slice(0,16).map(e=>{const s=e.mean||(e.change?e.change*1e3:0),i=Math.max(12,Math.min(100,s/a*100)),c=s>a*.4;return l`<span style="height: ${i}%;" class="${c?"is-hot":""}"></span>`})}
      </div>
    `}_renderPowerGaugeWidget(t){const a=Math.min(100,Math.max(0,Math.round(t/M*100))),e=`${a*2.51} 251.2`,s=a>85?"var(--state-danger)":a>60?"var(--state-warning)":"var(--accent)";return l`
      <div class="card gauge-card">
        <div class="card-head">
          <span class="card-kicker">Carga Eléctrica</span>
          <span class="card-head-meta">${M} W MAX</span>
        </div>
        <div class="gauge-box">
          <svg class="gauge-svg" viewBox="0 0 100 100">
            <circle class="gauge-track" cx="50" cy="50" r="40"/>
            <circle
              class="gauge-indicator"
              cx="50"
              cy="50"
              r="40"
              style="stroke-dasharray: ${e}; stroke: ${s};"
            />
          </svg>
          <div class="gauge-center-data">
            <span class="gauge-value">${a}%</span>
            <span class="gauge-sub">${t} W</span>
          </div>
        </div>
        <div class="gauge-footer-note">Capacidad nominal activa</div>
      </div>
    `}_renderActiveAmbienceWidget(t){return l`
      <div class="card ambience-card">
        <div class="card-head">
          <span class="card-kicker">Ambiente Activo</span>
          <span class="status-badge ${t.isPreset?"is-preset":""}">${t.isPreset?"PRESET":"MANUAL"}</span>
        </div>
        <div class="ambience-center">
          <div class="ambience-title">${t.name}</div>
          <div class="ambience-sub">${t.sub}</div>
        </div>
        <div class="ambience-footer">
          <span class="active-accent" style="font-size: 11px; font-weight: 520;">Control dinámico del showroom</span>
        </div>
      </div>
    `}_renderRoomsWidget(t,a,e,s,i){return l`
      <div class="card rooms-card">
        <div class="card-head">
          <span class="card-kicker">Zonas</span>
          <span class="card-head-icon">${r("layers")}</span>
        </div>
        <div class="rooms-stack">
          <div class="room-row interactive" id="rowSpots" @click=${()=>this._openSheet("lights")}>
            <div class="room-left">
              <span class="room-indicator ${t>0?"is-on":""}">${r("bulb")}</span>
              <span class="room-title">Spots</span>
            </div>
            <span class="room-tag ${t>0?"is-on":""}">${t} / 4</span>
          </div>

          <div class="room-row interactive" id="rowSamples" @click=${()=>this._openSheet("lights")}>
            <div class="room-left">
              <span class="room-indicator ${a>0?"is-on":""}">${r("layers")}</span>
              <span class="room-title">Muestrarios & Paneles</span>
            </div>
            <span class="room-tag ${a>0?"is-on":""}">${a} / 5</span>
          </div>

          <div class="room-row interactive" id="rowReflector" @click=${()=>this._toggleSwitch(h.id)}>
            <div class="room-left">
              <span class="room-indicator ${e>0?"is-on":""}">${r("bulb")}</span>
              <span class="room-title">Reflector Exterior</span>
            </div>
            <span class="room-tag ${e>0?"is-on":""}">${e>0?"On":"Off"}</span>
          </div>

          <div class="room-row interactive" id="rowMedia" @click=${()=>this._callService("media_player","media_play_pause",{entity_id:o.media})}>
            <div class="room-left">
              <span class="room-indicator ${s?"is-on":""}">${r("music")}</span>
              <span class="room-title">Multimedia</span>
            </div>
            <span class="room-tag ${s?"is-on":""}">${s?"Playing":"Paused"}</span>
          </div>

          <div class="room-row interactive" id="rowEnergy" @click=${()=>this._setPage(1)}>
            <div class="room-left">
              <span class="room-indicator is-on">${r("zap")}</span>
              <span class="room-title">Carga General</span>
            </div>
            <span class="room-tag is-on">${i} W</span>
          </div>
        </div>
      </div>
    `}_renderShortcutsWidget(){return l`
      <div class="card shortcuts-card">
        <div class="card-head">
          <span class="card-kicker">Accesos Rápidos</span>
          <span class="card-head-meta">2 × 3</span>
        </div>
        <div class="shortcuts-grid">
          <div class="sc-item interactive" id="scPres" @click=${()=>this._callService("scene","turn_on",{entity_id:o.presentation})}>
            <span class="sc-ico">${r("sparkles")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Presentación</span>
              <span class="sc-sub-text">Ventana + TV</span>
            </div>
          </div>

          <div class="sc-item interactive" id="scMeet" @click=${()=>this._callService("scene","turn_on",{entity_id:o.meeting})}>
            <span class="sc-ico">${r("users")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Reunión</span>
              <span class="sc-sub-text">2×3 + Ventana</span>
            </div>
          </div>

          <div class="sc-item interactive is-highlight" id="scAllOn" @click=${()=>this._callService("script","showroom_encendido_general",{entity_id:o.allOn})}>
            <span class="sc-ico active-accent">${r("sun")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Todos ON</span>
              <span class="sc-sub-text">General</span>
            </div>
          </div>

          <div class="sc-item interactive is-dim" id="scAllOff" @click=${()=>this._callService("script","showroom_apagado_general",{entity_id:o.allOff})}>
            <span class="sc-ico">${r("moon")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Todos OFF</span>
              <span class="sc-sub-text">Apagado</span>
            </div>
          </div>

          <div class="sc-item interactive" id="scSpotsOnly" @click=${()=>b.forEach(t=>this._callService("switch","turn_on",{entity_id:t.id}))}>
            <span class="sc-ico">${r("bulb")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Solo Spots</span>
              <span class="sc-sub-text">4 circuitos</span>
            </div>
          </div>

          <div class="sc-item interactive" id="scSamplesOnly" @click=${()=>x.forEach(t=>this._callService("switch","turn_on",{entity_id:t.id}))}>
            <span class="sc-ico">${r("layers")}</span>
            <div class="sc-text-col">
              <span class="sc-heading">Solo Muestras</span>
              <span class="sc-sub-text">5 paneles</span>
            </div>
          </div>
        </div>
      </div>
    `}_renderCalendarWidget(){return l`
      <div class="card calendar-card">
        <div class="card-head">
          <span class="card-kicker">Agenda</span>
          <span class="card-head-icon">${r("calendar")}</span>
        </div>
        <div class="calendar-events-stack">
          <div class="agenda-group">
            <span class="agenda-subhead">HOY</span>
            <div class="event-item">
              <span class="event-hour">09:00</span>
              <span class="event-title">Presentación ejecutiva showroom</span>
            </div>
            <div class="event-item">
              <span class="event-hour">11:30</span>
              <span class="event-title">Reunión técnica de iluminación</span>
            </div>
          </div>
          <div class="agenda-group">
            <span class="agenda-subhead">MAÑANA</span>
            <div class="event-item">
              <span class="event-hour">10:00</span>
              <span class="event-title">Demostración dinámica para clientes</span>
            </div>
          </div>
        </div>
      </div>
    `}_renderMediaWidget(t,a,e,s){return l`
      <div class="card media-expanded-card">
        <div class="card-head">
          <span class="card-kicker">Reproductor de Medios</span>
          <span class="card-head-meta">${s}% Vol</span>
        </div>
        <div class="media-body-row">
          <div class="media-cover-box">${r("music")}</div>
          <div class="media-title-col">
            <div class="media-headline">${t}</div>
            <div class="media-subhead">${a}</div>
          </div>
        </div>
        <div class="media-ctrl-row">
          <div class="media-transport-group">
            <button class="transport-btn" id="btnMediaPrev" @click=${()=>this._callService("media_player","media_previous_track",{entity_id:o.media})}>
              ${r("skipBack")}
            </button>
            <button class="transport-btn is-play-action" id="btnMediaPlay" @click=${()=>this._callService("media_player","media_play_pause",{entity_id:o.media})}>
              ${r(e?"pause":"play")}
            </button>
            <button class="transport-btn" id="btnMediaNext" @click=${()=>this._callService("media_player","media_next_track",{entity_id:o.media})}>
              ${r("skipForward")}
            </button>
          </div>
          <div class="media-vol-group">
            <button class="vol-btn" id="btnVolDown" @click=${()=>this._callService("media_player","volume_down",{entity_id:o.media})}>−</button>
            <button class="vol-btn" id="btnVolUp" @click=${()=>this._callService("media_player","volume_up",{entity_id:o.media})}>+</button>
          </div>
        </div>
      </div>
    `}_renderLightsSummaryWidget(t,a,e,s,i){return l`
      <div class="card lights-card interactive" id="widgetLights" @click=${()=>this._openSheet("lights")}>
        <div class="card-head">
          <span class="card-kicker">Iluminación</span>
          <span class="card-head-icon active-accent">${r("bulb")}</span>
        </div>
        <div class="lights-kpi-block">
          <div class="kpi-display">${t} / ${f.length}</div>
          <div class="kpi-sub-label">Luminarias encendidas • ${i} W</div>
        </div>
        <div class="lights-breakdown-row">
          <span class="chip-label">Spots: <strong>${a}/4</strong></span>
          <span class="chip-label">Muestras: <strong>${e}/5</strong></span>
          <span class="chip-label">Reflector: <strong>${s}/1</strong></span>
        </div>
      </div>
    `}_renderScenesWidget(){return l`
      <div class="card scenes-card">
        <div class="card-head">
          <span class="card-kicker">Escenas de Iluminación</span>
        </div>
        <div class="scenes-quad-grid">
          <div class="scene-box interactive" id="scenePres" @click=${()=>this._callService("scene","turn_on",{entity_id:o.presentation})}>
            <span class="scene-ico">${r("sparkles")}</span>
            <span>Presentación</span>
          </div>
          <div class="scene-box interactive" id="sceneMeet" @click=${()=>this._callService("scene","turn_on",{entity_id:o.meeting})}>
            <span class="scene-ico">${r("users")}</span>
            <span>Reunión</span>
          </div>
          <div class="scene-box interactive is-accent" id="sceneAllOn" @click=${()=>this._callService("script","showroom_encendido_general",{entity_id:o.allOn})}>
            <span class="scene-ico">${r("sun")}</span>
            <span>Encender todo</span>
          </div>
          <div class="scene-box interactive" id="sceneAllOff" @click=${()=>this._callService("script","showroom_apagado_general",{entity_id:o.allOff})}>
            <span class="scene-ico">${r("moon")}</span>
            <span>Apagar todo</span>
          </div>
        </div>
      </div>
    `}_renderRecentActivityWidget(){return l`
      <div class="card activity-card">
        <div class="card-head">
          <span class="card-kicker">Actividad Reciente</span>
          <span class="status-badge" style="color: var(--state-success);">${r("checkCircle")} EN VIVO</span>
        </div>
        <div class="activity-feed">
          ${this._recentActivity.map(t=>l`
            <div class="activity-entry">
              <span class="entry-bullet"></span>
              <div class="entry-texts">
                <span class="entry-msg">${t.text}</span>
                <span class="entry-time">${t.time}</span>
              </div>
            </div>
          `)}
        </div>
      </div>
    `}_renderDiagnosticsWidget(){return l`
      <div class="card diag-card">
        <div class="card-head">
          <span class="card-kicker">Diagnóstico del Sistema</span>
          <span class="status-badge" style="color: var(--state-success);">SISTEMA OK</span>
        </div>
        <div class="diag-quad">
          <div class="diag-cell">
            <span class="cell-label">Home Assistant</span>
            <span class="cell-val" style="color: var(--state-success);">Conectado</span>
          </div>
          <div class="diag-cell">
            <span class="cell-label">Weather API</span>
            <span class="cell-val" style="color: var(--state-success);">Suscrito</span>
          </div>
          <div class="diag-cell">
            <span class="cell-label">Recorder</span>
            <span class="cell-val" style="color: var(--state-success);">Sincronizado</span>
          </div>
          <div class="diag-cell">
            <span class="cell-label">Circuitos</span>
            <span class="cell-val">${f.length} Online</span>
          </div>
        </div>
      </div>
    `}_renderSystemWidget(t){return l`
      <div class="card system-card">
        <div class="card-head">
          <span class="card-kicker">Estado General</span>
        </div>
        <div class="system-list">
          <div class="system-row">
            <span>Tablet Showroom</span>
            <strong>${t}% Batería</strong>
          </div>
          <div class="system-row">
            <span>Servidor HA</span>
            <strong>Mock HA Provider</strong>
          </div>
          <div class="system-row">
            <span>Última sincronización</span>
            <strong>${this._timeStr}</strong>
          </div>
        </div>
      </div>
    `}_renderBottomDock(t,a,e,s){return l`
      <nav class="wit-dock">
        <button class="dock-btn" id="dockLights" @click=${()=>this._openSheet("lights")}>
          <span class="active-accent">${r("bulb")}</span>
          <span>Luces ${t}</span>
        </button>
        <button class="dock-btn" id="dockPower" @click=${()=>this._setPage(1)}>
          <span>${r("zap")}</span>
          <span>${a} W</span>
        </button>
        <button class="dock-btn" id="dockMedia" @click=${()=>this._callService("media_player","media_play_pause",{entity_id:o.media})}>
          <span>${r("music")}</span>
          <span>${e?"❚❚":"▶"}</span>
        </button>
        <button class="dock-btn" id="dockBattery" @click=${()=>this._setPage(1)}>
          <span>${r("battery")}</span>
          <span>${s}%</span>
        </button>
        <div class="dock-dots-group">
          <div
            class="dock-dot ${this._page===0?"is-active":""}"
            id="dockDot0"
            title="Página 1: Operación"
            @click=${()=>this._setPage(0)}
          ></div>
          <div
            class="dock-dot ${this._page===1?"is-active":""}"
            id="dockDot1"
            title="Página 2: Analítica"
            @click=${()=>this._setPage(1)}
          ></div>
        </div>
      </nav>
    `}_renderLightsSheet(t,a){return l`
      <div
        class="sheet-scrim"
        id="sheetScrim"
        @click=${e=>{e.target.id==="sheetScrim"&&this._closeSheet()}}
      >
        <div class="sheet-modal">
          <div class="sheet-header">
            <div>
              <h2 class="sheet-title">Control de Luminarias</h2>
              <p class="sheet-meta">${t} de ${f.length} encendidas • ${a} W de carga</p>
            </div>
            <button class="sheet-close-btn" id="sheetCloseBtn" @click=${()=>this._closeSheet()}>
              ${r("close")}
            </button>
          </div>

          <div class="sheet-group">
            <span class="sheet-group-label">SPOTS</span>
            <div class="switches-stack">
              ${b.map(e=>{const s=this._value(e.id)==="on";return l`
                  <div
                    class="switch-row interactive ${s?"is-on":""}"
                    data-entity-id="${e.id}"
                    @click=${()=>this._toggleSwitch(e.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${s?"active-accent":""}">${r("bulb")}</span>
                      <div class="switch-texts">
                        <span class="switch-name">${e.name}</span>
                        <span class="switch-meta">${e.subtitle} • ${e.watts} W</span>
                      </div>
                    </div>
                    <div class="switch-toggle"></div>
                  </div>
                `})}
            </div>
          </div>

          <div class="sheet-group">
            <span class="sheet-group-label">MUESTRARIOS & PANELES</span>
            <div class="switches-stack">
              ${x.map(e=>{const s=this._value(e.id)==="on";return l`
                  <div
                    class="switch-row interactive ${s?"is-on":""}"
                    data-entity-id="${e.id}"
                    @click=${()=>this._toggleSwitch(e.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${s?"active-accent":""}">${r("bulb")}</span>
                      <div class="switch-texts">
                        <span class="switch-name">${e.name}</span>
                        <span class="switch-meta">${e.subtitle} • ${e.watts} W</span>
                      </div>
                    </div>
                    <div class="switch-toggle"></div>
                  </div>
                `})}
            </div>
          </div>

          <div class="sheet-group">
            <span class="sheet-group-label">REFLECTOR EXTERIOR</span>
            <div class="switches-stack">
              <div
                class="switch-row interactive ${this._value(h.id)==="on"?"is-on":""}"
                data-entity-id="${h.id}"
                @click=${()=>this._toggleSwitch(h.id)}
              >
                <div class="switch-left">
                  <span class="switch-icon ${this._value(h.id)==="on"?"active-accent":""}">${r("bulb")}</span>
                  <div class="switch-texts">
                    <span class="switch-name">${h.name}</span>
                    <span class="switch-meta">${h.subtitle}</span>
                  </div>
                </div>
                <div class="switch-toggle"></div>
              </div>
            </div>
          </div>

          <div class="sheet-actions">
            <button
              class="sheet-action-btn is-danger"
              id="modalTurnAllOff"
              @click=${()=>this._callService("script","showroom_apagado_general",{entity_id:o.allOff})}
            >
              Apagar todo
            </button>
            <button
              class="sheet-action-btn is-primary"
              id="modalTurnAllOn"
              @click=${()=>this._callService("script","showroom_encendido_general",{entity_id:o.allOn})}
            >
              Encender todo
            </button>
          </div>
        </div>
      </div>
    `}render(){const t=Number(this._value(o.power,"0")),a=Number(this._value(o.energy,"26.11")).toFixed(2),e=Number(this._value(o.battery,"98")),s=e<25,i=this._value(o.weather,"sunny"),c=this._attr(o.weather,"temperature","23.5"),n=this._attr(o.weather,"humidity","48"),g=this._value(o.media,"paused")==="playing",w=this._attr(o.media,"media_title","Ambient Lounge Experience"),y=this._attr(o.media,"media_artist","Witmind Studio"),W=Math.round((this._attr(o.media,"volume_level",.65)||.65)*100),k=b.filter(A=>this._value(A.id)==="on").length,S=x.filter(A=>this._value(A.id)==="on").length,$=this._value(h.id)==="on"?1:0,m=k+S+$,P=this._detectActiveAmbience(),z=this.theme==="light";return l`
      <div class="app-frame">
        <!-- HEADER -->
        <header class="header">
          <div class="header-brand-wrap">
            <div class="brand-block">
              <span class="brand-name">WITMIND</span>
              <span class="brand-site">SHOWROOM · WTX MDTC</span>
            </div>

            <div class="pills-strip">
              ${this._renderStatusPills(m,t,g,a,e,s)}
            </div>
          </div>

          <div class="header-clock-wrap">
            <div class="clock-digits" id="witClockDigits">${this._timeStr}</div>
            <div class="clock-date-row">
              <span class="date-label" id="witDateLabel">${this._dateStr}</span>
              <button
                class="theme-toggle-btn"
                id="btnThemeToggle"
                title="Cambiar tema claro/oscuro"
                @click=${this._toggleTheme}
              >
                ${z?"☀️ Claro":"🌙 Oscuro"}
              </button>
            </div>
          </div>
        </header>

        <!-- HORIZONTAL 2-PAGE CAROUSEL -->
        <div class="carousel-track" id="carouselTrack">
          <!-- PAGE 1: Operation / Glance -->
          <div class="carousel-pane">
            ${this._renderHeroWidget(m,t)}

            <!-- Grid 1: 4 Quad Cards -->
            <div class="grid-top-quad">
              ${this._renderWeatherWidget(c,i,n)}
              ${this._renderEnergyWidget(t,a)}
              ${this._renderPowerGaugeWidget(t)}
              ${this._renderActiveAmbienceWidget(P)}
            </div>

            <!-- Grid 2: 3 Mid Trio Cards -->
            <div class="grid-mid-trio">
              ${this._renderRoomsWidget(k,S,$,g,t)}
              ${this._renderShortcutsWidget()}
              ${this._renderCalendarWidget()}
            </div>
          </div>

          <!-- PAGE 2: Analytics & Extended Controls -->
          <div class="carousel-pane">
            <div class="grid-page2-pair">
              ${this._renderMediaWidget(w,y,g,W)}
              ${this._renderLightsSummaryWidget(m,k,S,$,t)}
            </div>

            <div class="grid-page2-pair">
              ${this._renderScenesWidget()}
              ${this._renderRecentActivityWidget()}
            </div>

            <div class="grid-page2-pair">
              ${this._renderDiagnosticsWidget()}
              ${this._renderSystemWidget(e)}
            </div>
          </div>
        </div>

        <!-- BOTTOM TRANSLUCENT DOCK -->
        ${this._renderBottomDock(m,t,g,e)}

        <!-- LIGHTS SHEET MODAL -->
        ${this._sheet==="lights"?this._renderLightsSheet(m,t):""}
      </div>
    `}};p.styles=L`
    :host {
      /* Brand Accent Tokens (Emitted Light) */
      --accent: #f26522;
      --accent-hover: #dc581a;
      --accent-soft: rgba(242, 101, 34, 0.12);
      --accent-border: rgba(242, 101, 34, 0.34);
      --accent-glow: rgba(242, 101, 34, 0.16);

      /* Global State Tokens */
      --state-success: #16a34a;
      --state-warning: #d97706;
      --state-danger: #dc2626;

      /* Typography Scale (Manrope) */
      --font-ui: "Manrope", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

      /* Spacing Scale (4, 8, 12, 16, 24, 32, 40, 48) */
      --s1: 4px;
      --s2: 8px;
      --s3: 12px;
      --s4: 16px;
      --s5: 24px;
      --s6: 32px;
      --s8: 40px;
      --s10: 48px;

      /* Radii (Architectural Invariants) */
      --r-control: 14px;
      --r-card: 22px;
      --r-panel: 28px;
      --r-pill: 999px;

      /* Motion */
      --motion-fast: 140ms;
      --motion-normal: 200ms;
      --motion-slow: 300ms;
      --ease-apple: cubic-bezier(0.2, 0.8, 0.2, 1);

      /* Touch Target Standard */
      --touch-min: 44px;
      --touch-target: 48px;

      /* DARK THEME (Default) — 3-Layer Surfaces */
      --canvas: #071118;
      --surface: rgba(16, 25, 30, 0.88);
      --surface-raised: #162126;
      --surface-interactive: #1b282e;
      --glass: rgba(20, 30, 35, 0.72);
      --text-1: #f5f6f4;
      --text-2: #adb4b6;
      --text-3: #747e82;
      --line: rgba(255, 255, 255, 0.08);

      display: block;
      width: 100%;
      min-height: 100dvh;
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
      overflow-x: hidden;
      container-type: inline-size;
      container-name: showroom-container;

      font-family: var(--font-ui);
      font-feature-settings: "tnum" 1;
      color: var(--text-1);

      /* Atmospheric subtle background */
      background:
        radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.14), transparent 65%),
        radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.06), transparent 70%),
        var(--canvas);
      position: relative;
    }

    /* LIGHT THEME (Studio Frost / Porcelain) */
    :host([theme="light"]) {
      --canvas: #f3f3ef;
      --surface: rgba(255, 255, 255, 0.88);
      --surface-raised: #ffffff;
      --surface-interactive: #f8fafc;
      --glass: rgba(255, 255, 255, 0.82);
      --text-1: #182126;
      --text-2: #667176;
      --text-3: #92999c;
      --line: rgba(18, 32, 38, 0.08);

      background:
        radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.10), transparent 65%),
        radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.04), transparent 70%),
        var(--canvas);
      color: var(--text-1);
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
    }

    /* Numeral Tabular Font Standard */
    .tnum, [data-tnum="true"], .clock-digits, .kpi-display, .gauge-value, .cell-val {
      font-feature-settings: "tnum" 1;
      font-variant-numeric: tabular-nums;
    }

    /* Main Workspace Frame */
    .app-frame {
      position: relative;
      z-index: 1;
      max-width: 1480px;
      margin: 0 auto;
      min-height: 100dvh;
      display: flex;
      flex-direction: column;
      padding:
        max(var(--s5), env(safe-area-inset-top))
        max(var(--s6), env(safe-area-inset-right))
        max(104px, calc(env(safe-area-inset-bottom) + 84px))
        max(var(--s6), env(safe-area-inset-left));
      gap: var(--s5);
      transition: padding var(--motion-normal) var(--ease-apple), gap var(--motion-normal) var(--ease-apple);
    }

    /* CARD SYSTEM (Level 1 Surface) */
    .card {
      position: relative;
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--r-card);
      padding: var(--s5);
      display: flex;
      flex-direction: column;
      transition: transform var(--motion-fast) var(--ease-apple),
                  border-color var(--motion-fast) var(--ease-apple),
                  box-shadow var(--motion-fast) var(--ease-apple);
      overflow: hidden;
    }
    .card.interactive {
      cursor: pointer;
    }
    .card.interactive:hover {
      border-color: rgba(255, 255, 255, 0.18);
      transform: translateY(-1px);
    }
    :host([theme="light"]) .card.interactive:hover {
      border-color: rgba(18, 32, 38, 0.16);
    }
    .card.interactive:active {
      transform: scale(0.985);
    }

    /* Card Header */
    .card-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--s2);
    }
    .card-kicker {
      font-size: var(--s3);
      font-weight: 640;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-2);
    }
    .card-head-icon {
      color: var(--text-3);
      display: flex;
      align-items: center;
    }
    .card-head-meta {
      font-size: 11px;
      font-weight: 520;
      color: var(--text-3);
    }

    /* HEADER & TOP STATUS AREA */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--s1) 0;
      gap: var(--s4);
      min-height: 56px;
    }

    .header-brand-wrap {
      display: flex;
      align-items: center;
      gap: var(--s5);
      min-width: 0;
      flex: 1 1 auto;
    }
    .brand-block {
      display: flex;
      flex-direction: column;
      line-height: 1.1;
      flex-shrink: 0;
    }
    .brand-name {
      font-size: 18px;
      font-weight: 720;
      letter-spacing: 0.02em;
      color: var(--text-1);
    }
    .brand-site {
      font-size: 11px;
      font-weight: 640;
      letter-spacing: 0.08em;
      color: var(--accent);
      text-transform: uppercase;
    }

    .pills-strip {
      display: flex;
      align-items: center;
      gap: var(--s2);
      flex-wrap: nowrap;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      padding: 2px 2px 4px 2px;
    }
    .pills-strip::-webkit-scrollbar {
      display: none;
    }
    .status-pill {
      min-height: 48px;
      padding: 0 var(--s4);
      background: var(--glass);
      border: 1px solid var(--line);
      border-radius: var(--r-pill);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      display: inline-flex;
      align-items: center;
      gap: var(--s2);
      cursor: pointer;
      flex-shrink: 0;
      transition: transform var(--motion-fast) var(--ease-apple),
                  border-color var(--motion-fast) var(--ease-apple),
                  background var(--motion-fast) var(--ease-apple);
    }
    .status-pill:hover {
      border-color: var(--accent-border);
      transform: translateY(-1px);
    }
    .status-pill:active {
      transform: scale(0.97);
    }
    .status-pill.is-active-pill {
      border-color: var(--accent-border);
    }
    .status-pill.is-warning {
      border-color: rgba(217, 119, 6, 0.4);
      background: rgba(217, 119, 6, 0.1);
    }

    .pill-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-2);
    }
    .pill-icon.active-accent { color: var(--accent); }

    .pill-texts {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      white-space: nowrap;
    }
    .pill-title {
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-1);
    }
    .pill-meta {
      font-size: 11px;
      font-weight: 520;
      color: var(--text-2);
    }

    .header-clock-wrap {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      text-align: right;
      line-height: 1;
      flex-shrink: 0;
    }
    .clock-digits {
      font-size: clamp(38px, 4vw, 56px);
      font-weight: 450;
      letter-spacing: -0.04em;
      color: var(--text-1);
    }
    .clock-date-row {
      display: flex;
      align-items: center;
      gap: var(--s2);
      margin-top: var(--s1);
    }
    .date-label {
      font-size: var(--s3);
      font-weight: 520;
      color: var(--text-2);
      white-space: nowrap;
    }
    .theme-toggle-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--s1);
      min-height: 32px;
      padding: 4px 12px;
      border-radius: var(--r-pill);
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-2);
      font-size: 11px;
      font-weight: 640;
      cursor: pointer;
      transition: all var(--motion-fast);
      font-family: inherit;
    }
    .theme-toggle-btn:hover {
      color: var(--text-1);
      border-color: var(--accent-border);
    }
    .theme-toggle-btn:active {
      transform: scale(0.96);
    }

    /* HORIZONTAL CAROUSEL (CSS Scroll Snap) */
    .carousel-track {
      display: flex;
      width: 100%;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
      gap: var(--s6);
    }
    .carousel-track::-webkit-scrollbar { display: none; }

    .carousel-pane {
      flex: 0 0 100%;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      display: flex;
      flex-direction: column;
      gap: var(--s5);
    }

    /* HERO WIDGET */
    .hero-card {
      padding: var(--s5) var(--s6);
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      background: var(--surface-raised);
      border: 1px solid var(--accent-border);
    }
    .hero-brand-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .hero-kicker {
      font-size: 11px;
      font-weight: 720;
      letter-spacing: 0.1em;
      color: var(--accent);
      text-transform: uppercase;
    }
    .hero-title {
      font-size: 28px;
      font-weight: 720;
      letter-spacing: -0.02em;
      color: var(--text-1);
      line-height: 1.15;
    }
    .hero-caption {
      font-size: var(--s4);
      color: var(--text-2);
    }
    .hero-segmented-nav {
      display: flex;
      gap: var(--s1);
      background: var(--surface-interactive);
      padding: var(--s1);
      border-radius: var(--r-pill);
      border: 1px solid var(--line);
      flex-shrink: 0;
    }
    .nav-segment-btn {
      background: transparent;
      border: none;
      color: var(--text-2);
      min-height: 44px;
      padding: 0 var(--s4);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--r-pill);
      font-size: var(--s3);
      font-weight: 640;
      cursor: pointer;
      transition: all var(--motion-fast);
      font-family: inherit;
    }
    .nav-segment-btn:hover { color: var(--text-1); }
    .nav-segment-btn:active { transform: scale(0.97); }
    .nav-segment-btn.is-selected {
      background: var(--accent);
      color: #ffffff;
    }

    /* GRIDS SYSTEM (Page 1) */
    .grid-top-quad {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: var(--s5);
    }

    .grid-mid-trio {
      display: grid;
      grid-template-columns: 1.1fr 1.3fr 1.2fr;
      gap: var(--s5);
    }

    /* WEATHER WIDGET */
    .weather-card {
      justify-content: space-between;
      min-height: 185px;
    }
    .weather-kpi-block { margin: var(--s1) 0; }
    .kpi-display {
      font-size: 32px;
      font-weight: 520;
      letter-spacing: -0.03em;
      color: var(--text-1);
    }
    .kpi-sub-label {
      font-size: var(--s3);
      color: var(--text-2);
      margin-top: 2px;
    }
    .weather-week-strip {
      display: flex;
      justify-content: space-between;
      padding-top: var(--s2);
      border-top: 1px solid var(--line);
      font-size: 11px;
      color: var(--text-2);
    }
    .fc-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    /* ENERGY WIDGET */
    .energy-card {
      justify-content: space-between;
      min-height: 185px;
    }
    .sparkline-bars {
      display: flex;
      align-items: flex-end;
      gap: 4px;
      height: 32px;
      padding-top: var(--s1);
    }
    .sparkline-bars span {
      flex: 1;
      border-radius: 2px 2px 0 0;
      background: rgba(255, 255, 255, 0.12);
    }
    :host([theme="light"]) .sparkline-bars span {
      background: rgba(18, 32, 38, 0.08);
    }
    .sparkline-bars span.is-hot {
      background: var(--accent);
    }

    /* POWER GAUGE WIDGET */
    .gauge-card {
      justify-content: space-between;
      min-height: 185px;
    }
    .gauge-box {
      position: relative;
      width: 76px;
      height: 76px;
      margin: 0 auto;
    }
    .gauge-svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
    }
    .gauge-track {
      fill: none;
      stroke: var(--line);
      stroke-width: 8;
    }
    .gauge-indicator {
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      transition: stroke-dasharray var(--motion-slow) var(--ease-apple);
    }
    .gauge-center-data {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1.1;
    }
    .gauge-value {
      font-size: 16px;
      font-weight: 720;
      color: var(--text-1);
    }
    .gauge-sub {
      font-size: 10px;
      color: var(--text-3);
    }
    .gauge-footer-note {
      font-size: 11px;
      color: var(--text-3);
      text-align: center;
    }

    /* AMBIENCE WIDGET */
    .ambience-card {
      justify-content: space-between;
      min-height: 185px;
    }
    .status-badge {
      padding: 2px 8px;
      border-radius: var(--r-pill);
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-2);
      font-size: 10px;
      font-weight: 720;
      letter-spacing: 0.06em;
    }
    .status-badge.is-preset {
      background: var(--accent-soft);
      border-color: var(--accent-border);
      color: var(--accent);
    }
    .ambience-center { margin: var(--s1) 0; }
    .ambience-title {
      font-size: 20px;
      font-weight: 720;
      color: var(--text-1);
    }
    .ambience-sub {
      font-size: var(--s3);
      color: var(--text-2);
      margin-top: 2px;
    }
    .ambience-footer {
      padding-top: var(--s2);
      border-top: 1px solid var(--line);
    }

    /* ROOMS WIDGET */
    .rooms-card { gap: var(--s3); }
    .rooms-stack {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .room-row {
      min-height: 48px;
      padding: 8px 12px;
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: all var(--motion-fast);
    }
    .room-row:hover {
      border-color: var(--accent-border);
    }
    .room-left {
      display: flex;
      align-items: center;
      gap: var(--s2);
    }
    .room-indicator {
      color: var(--text-3);
      display: flex;
    }
    .room-indicator.is-on { color: var(--accent); }
    .room-title {
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-1);
    }
    .room-tag {
      padding: 2px 8px;
      border-radius: var(--r-pill);
      background: var(--line);
      font-size: 11px;
      font-weight: 640;
      color: var(--text-2);
    }
    .room-tag.is-on {
      background: var(--accent-soft);
      color: var(--accent);
      border: 1px solid var(--accent-border);
    }

    /* SHORTCUTS (2x3) */
    .shortcuts-card { gap: var(--s3); }
    .shortcuts-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s2);
    }
    .sc-item {
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      padding: var(--s2) var(--s3);
      display: flex;
      align-items: center;
      gap: var(--s2);
      cursor: pointer;
      min-height: 48px;
      transition: all var(--motion-fast);
    }
    .sc-item:hover {
      border-color: var(--accent-border);
      transform: translateY(-1px);
    }
    .sc-item:active {
      transform: scale(0.97);
    }
    .sc-item.is-highlight {
      background: var(--accent-soft);
      border-color: var(--accent-border);
    }
    .sc-ico {
      display: flex;
      color: var(--text-2);
      flex-shrink: 0;
    }
    .sc-text-col {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      min-width: 0;
    }
    .sc-heading {
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sc-sub-text {
      font-size: 11px;
      color: var(--text-3);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* CALENDAR WIDGET */
    .calendar-card { gap: var(--s3); }
    .calendar-events-stack {
      display: flex;
      flex-direction: column;
      gap: var(--s2);
    }
    .agenda-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .agenda-subhead {
      font-size: 10px;
      font-weight: 720;
      letter-spacing: 0.08em;
      color: var(--text-3);
    }
    .event-item {
      display: flex;
      align-items: center;
      gap: var(--s2);
      min-height: 38px;
      padding: 6px 10px;
      background: var(--surface-interactive);
      border-radius: 8px;
      border-left: 2px solid var(--accent);
      font-size: 12px;
    }
    .event-hour {
      font-weight: 720;
      color: var(--accent);
      flex-shrink: 0;
    }
    .event-title {
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* PAGE 2 GRIDS & WIDGETS */
    .grid-page2-pair {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s5);
    }

    /* MEDIA EXPANDED */
    .media-expanded-card {
      min-height: 210px;
      justify-content: space-between;
    }
    .media-body-row {
      display: flex;
      align-items: center;
      gap: var(--s4);
      margin: var(--s2) 0;
    }
    .media-cover-box {
      width: 52px;
      height: 52px;
      border-radius: var(--r-control);
      background: linear-gradient(135deg, var(--accent) 0%, #1a1a24 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      flex-shrink: 0;
    }
    .media-title-col {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow: hidden;
    }
    .media-headline {
      font-size: var(--s4);
      font-weight: 720;
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .media-subhead {
      font-size: var(--s3);
      color: var(--text-2);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .media-ctrl-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: var(--s3);
      border-top: 1px solid var(--line);
    }
    .media-transport-group {
      display: flex;
      align-items: center;
      gap: var(--s3);
    }
    .transport-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--motion-fast);
    }
    .transport-btn:hover { border-color: var(--accent-border); }
    .transport-btn:active { transform: scale(0.95); }
    .transport-btn.is-play-action {
      background: var(--accent);
      color: #ffffff;
      border: none;
    }
    .media-vol-group {
      display: flex;
      gap: 8px;
    }
    .vol-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 18px;
      font-weight: 640;
    }
    .vol-btn:hover { border-color: var(--accent-border); }
    .vol-btn:active { transform: scale(0.95); }

    /* LIGHTS SUMMARY */
    .lights-card {
      min-height: 210px;
      justify-content: space-between;
    }
    .lights-kpi-block { margin: var(--s1) 0; }
    .lights-breakdown-row {
      display: flex;
      gap: var(--s2);
      padding-top: var(--s2);
      border-top: 1px solid var(--line);
      flex-wrap: wrap;
    }
    .chip-label {
      padding: 4px 10px;
      border-radius: var(--r-pill);
      background: var(--surface-interactive);
      font-size: 11px;
      color: var(--text-2);
    }

    /* SCENES 2x2 */
    .scenes-card { gap: var(--s3); }
    .scenes-quad-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s2);
    }
    .scene-box {
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      min-height: 52px;
      padding: var(--s3) var(--s4);
      display: flex;
      align-items: center;
      gap: var(--s2);
      cursor: pointer;
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-1);
      transition: all var(--motion-fast);
    }
    .scene-box:hover { border-color: var(--accent-border); }
    .scene-box:active { transform: scale(0.97); }
    .scene-box.is-accent {
      border-color: var(--accent-border);
      background: var(--accent-soft);
    }
    .scene-ico { display: flex; flex-shrink: 0; }

    /* RECENT ACTIVITY */
    .activity-card { gap: var(--s2); }
    .activity-feed {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .activity-entry {
      display: flex;
      align-items: center;
      gap: var(--s2);
      min-height: 36px;
      padding: 6px 10px;
      background: var(--surface-interactive);
      border-radius: 8px;
      font-size: 12px;
    }
    .entry-bullet {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      flex-shrink: 0;
    }
    .entry-texts {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      min-width: 0;
    }
    .entry-msg {
      font-weight: 640;
      color: var(--text-1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .entry-time { font-size: 10px; color: var(--text-3); }

    /* DIAGNOSTICS */
    .diag-card { gap: var(--s2); }
    .diag-quad {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--s2);
    }
    .diag-cell {
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-height: 52px;
    }
    .cell-label { font-size: 11px; color: var(--text-3); font-weight: 640; }
    .cell-val { font-size: var(--s3); font-weight: 720; color: var(--state-success); }

    /* SYSTEM CARD */
    .system-card { justify-content: space-between; }
    .system-list {
      display: flex;
      flex-direction: column;
      gap: var(--s2);
      margin-top: var(--s1);
    }
    .system-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: var(--s3);
      padding: 8px 0;
      border-bottom: 1px solid var(--line);
    }
    .system-row strong { color: var(--text-1); }

    /* BOTTOM DOCK (Floating Architectural Pill) */
    .wit-dock {
      position: fixed;
      bottom: max(16px, env(safe-area-inset-bottom));
      left: 50%;
      transform: translateX(-50%);
      background: var(--glass);
      border: 1px solid var(--line);
      border-radius: var(--r-pill);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
      padding: 6px var(--s3);
      display: flex;
      align-items: center;
      gap: var(--s2);
      z-index: 2000;
      max-width: calc(100vw - 32px);
    }
    :host([theme="light"]) .wit-dock {
      box-shadow: 0 16px 40px rgba(18, 32, 38, 0.14);
    }
    .dock-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--s2);
      min-height: 44px;
      padding: 0 var(--s4);
      border-radius: var(--r-pill);
      font-size: var(--s3);
      font-weight: 640;
      color: var(--text-2);
      background: transparent;
      border: none;
      cursor: pointer;
      transition: all var(--motion-fast);
      font-family: inherit;
      white-space: nowrap;
    }
    .dock-btn:hover {
      color: var(--text-1);
      background: var(--line);
    }
    .dock-btn:active {
      transform: scale(0.96);
    }
    .dock-dots-group {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 var(--s1);
    }
    .dock-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--line);
      cursor: pointer;
      transition: all var(--motion-normal);
    }
    .dock-dot.is-active {
      width: 20px;
      border-radius: var(--r-pill);
      background: var(--accent);
    }

    /* MODAL SHEETS & BOTTOM SHEETS */
    .sheet-scrim {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      z-index: 5000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--s5);
      animation: fadeIn var(--motion-fast) ease-out;
    }
    :host([theme="light"]) .sheet-scrim {
      background: rgba(18, 32, 38, 0.4);
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .sheet-modal {
      background: var(--surface-raised);
      border: 1px solid var(--line);
      border-radius: var(--r-panel);
      width: min(620px, calc(100vw - 40px));
      max-height: 85dvh;
      overflow-y: auto;
      padding: var(--s5);
      display: flex;
      flex-direction: column;
      gap: var(--s5);
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7);
      animation: scaleUp var(--motion-normal) var(--ease-apple);
    }
    @keyframes scaleUp {
      from { transform: scale(0.96); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .sheet-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .sheet-title {
      font-size: 20px;
      font-weight: 720;
      color: var(--text-1);
    }
    .sheet-meta {
      font-size: var(--s3);
      color: var(--text-2);
    }
    .sheet-close-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      color: var(--text-2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all var(--motion-fast);
    }
    .sheet-close-btn:hover {
      color: var(--text-1);
      border-color: var(--accent-border);
    }
    .sheet-close-btn:active {
      transform: scale(0.95);
    }

    .sheet-group-label {
      font-size: 11px;
      font-weight: 720;
      letter-spacing: 0.08em;
      color: var(--text-3);
      margin-bottom: var(--s2);
      display: block;
    }
    .switches-stack {
      display: flex;
      flex-direction: column;
      gap: var(--s2);
    }
    .switch-row {
      min-height: 60px;
      padding: 0 var(--s4);
      background: var(--surface-interactive);
      border: 1px solid var(--line);
      border-radius: var(--r-control);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all var(--motion-fast);
    }
    .switch-row:hover { border-color: var(--accent-border); }
    .switch-row:active { transform: scale(0.985); }
    .switch-row.is-on {
      border-color: var(--accent-border);
      background: var(--accent-soft);
    }
    .switch-left {
      display: flex;
      align-items: center;
      gap: var(--s3);
    }
    .switch-icon {
      display: flex;
      color: var(--text-3);
    }
    .switch-texts {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }
    .switch-name { font-size: var(--s3); font-weight: 640; color: var(--text-1); }
    .switch-meta { font-size: 11px; color: var(--text-2); }

    .switch-toggle {
      width: 48px;
      height: 26px;
      border-radius: var(--r-pill);
      background: var(--line);
      position: relative;
      transition: all var(--motion-normal);
      flex-shrink: 0;
    }
    .switch-toggle::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      top: 3px;
      left: 3px;
      transition: transform var(--motion-normal);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
    .switch-row.is-on .switch-toggle {
      background: var(--accent);
    }
    .switch-row.is-on .switch-toggle::after {
      transform: translateX(22px);
    }

    .sheet-actions {
      display: flex;
      gap: var(--s2);
      margin-top: var(--s2);
    }
    .sheet-action-btn {
      flex: 1;
      min-height: 48px;
      border-radius: var(--r-control);
      border: 1px solid var(--line);
      font-size: var(--s3);
      font-weight: 640;
      cursor: pointer;
      transition: all var(--motion-fast);
      font-family: inherit;
    }
    .sheet-action-btn:active { transform: scale(0.97); }
    .sheet-action-btn.is-primary {
      background: var(--accent);
      color: #ffffff;
      border: none;
    }
    .sheet-action-btn.is-danger {
      background: rgba(220, 38, 38, 0.15);
      color: var(--state-danger);
      border-color: rgba(220, 38, 38, 0.3);
    }

    .active-accent { color: var(--accent) !important; }

    /* ==========================================================================
       ARCHITECTURAL RESPONSIVE ADAPTATION SYSTEM (witmind-ui skill)
       Tier 1: Desktop (> 1200px)
       Tier 2: Laptop & Tablet Landscape (900px – 1199px)
       Tier 3: Tablet Portrait & Compact Panel (640px – 899px)
       Tier 4: Mobile Handheld (< 640px)
       ========================================================================== */

    /* Tier 2: Laptop & Tablet Landscape (<= 1180px) */
    @media (max-width: 1180px) {
      .app-frame {
        padding:
          max(var(--s4), env(safe-area-inset-top))
          max(var(--s5), env(safe-area-inset-right))
          max(100px, calc(env(safe-area-inset-bottom) + 78px))
          max(var(--s5), env(safe-area-inset-left));
        gap: var(--s4);
      }
      .grid-top-quad {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--s4);
      }
      .grid-mid-trio {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--s4);
      }
      .calendar-card {
        grid-column: 1 / -1;
      }
    }

    /* Tier 3: Tablet Portrait (<= 960px) */
    @media (max-width: 960px) {
      .header {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas:
          "brand clock"
          "pills pills";
        gap: var(--s3);
        min-height: auto;
      }
      .header-brand-wrap {
        display: contents;
      }
      .brand-block {
        grid-area: brand;
      }
      .header-clock-wrap {
        grid-area: clock;
      }
      .pills-strip {
        grid-area: pills;
        width: 100%;
        padding-bottom: 2px;
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 28px), transparent 100%);
        mask-image: linear-gradient(to right, black calc(100% - 28px), transparent 100%);
      }
      .grid-mid-trio {
        grid-template-columns: 1fr;
        gap: var(--s4);
      }
      .calendar-card {
        grid-column: auto;
      }
    }

    /* Tier 4: Mobile & Touch Compact (<= 640px) */
    @media (max-width: 640px) {
      .app-frame {
        padding:
          max(var(--s3), env(safe-area-inset-top))
          max(var(--s3), env(safe-area-inset-right))
          max(92px, calc(env(safe-area-inset-bottom) + 72px))
          max(var(--s3), env(safe-area-inset-left));
        gap: var(--s3);
      }
      .card {
        padding: var(--s4);
      }
      .clock-digits {
        font-size: clamp(28px, 6.5vw, 36px);
      }
      .date-label {
        font-size: 11px;
      }
      .theme-toggle-btn {
        min-height: 28px;
        padding: 2px 8px;
        font-size: 10px;
      }
      .hero-card {
        flex-direction: column;
        align-items: stretch;
        gap: var(--s4);
        padding: var(--s4);
      }
      .hero-title {
        font-size: clamp(20px, 4.8vw, 24px);
      }
      .hero-segmented-nav {
        width: 100%;
        display: flex;
      }
      .nav-segment-btn {
        flex: 1;
        text-align: center;
        min-height: 44px;
        padding: 0 var(--s2);
      }
      .grid-top-quad {
        grid-template-columns: 1fr;
        gap: var(--s3);
      }
      .grid-mid-trio {
        grid-template-columns: 1fr;
        gap: var(--s3);
      }
      .grid-page2-pair {
        grid-template-columns: 1fr;
        gap: var(--s3);
      }
      .shortcuts-grid {
        grid-template-columns: 1fr 1fr;
        gap: var(--s2);
      }
      .sc-item {
        min-height: 48px;
        padding: 6px 10px;
      }
      .wit-dock {
        width: calc(100vw - 24px);
        max-width: 480px;
        justify-content: space-around;
        padding: 4px 6px;
        gap: 4px;
      }
      .dock-btn {
        padding: 0 var(--s2);
        min-height: 44px;
        font-size: 12px;
        gap: 6px;
      }
      .dock-dots-group {
        display: none;
      }

      /* Mobile Bottom Sheet Modal Transition */
      .sheet-scrim {
        align-items: flex-end;
        padding: 0;
      }
      .sheet-modal {
        width: 100%;
        max-height: 88dvh;
        border-radius: var(--r-panel) var(--r-panel) 0 0;
        border-bottom: none;
        padding: var(--s4) var(--s4) max(var(--s5), env(safe-area-inset-bottom)) var(--s4);
        gap: var(--s4);
        animation: slideUpSheet var(--motion-normal) var(--ease-apple);
      }
      @keyframes slideUpSheet {
        from { transform: translateY(100%); }
        to { transform: translateY(0); }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
  `;v([C({type:String,reflect:!0})],p.prototype,"theme",2);v([C({type:Object})],p.prototype,"hass",2);v([u()],p.prototype,"_page",2);v([u()],p.prototype,"_sheet",2);v([u()],p.prototype,"_timeStr",2);v([u()],p.prototype,"_dateStr",2);v([u()],p.prototype,"_stats",2);v([u()],p.prototype,"_recentActivity",2);p=v([H("showroom-witmind-signature")],p);
