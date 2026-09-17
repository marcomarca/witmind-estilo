import{s as O,i as C,n as g,c as H,a as z,r as o,b as u,t as A}from"./icon-B7B9oo7c.js";const ct={"light.salon_principal":{entity_id:"light.salon_principal",state:"on",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Luz General Salón",brightness:215,color_temp:320,supported_features:43},context:{id:"ctx_1"}},"light.salon_ambiente":{entity_id:"light.salon_ambiente",state:"on",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Fosa Arquitectónica LED",brightness:160,color_temp:380,supported_features:43},context:{id:"ctx_2"}},"light.comedor":{entity_id:"light.comedor",state:"off",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Lámpara Colgante Comedor",brightness:0,supported_features:43},context:{id:"ctx_3"}},"light.cocina":{entity_id:"light.cocina",state:"on",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Iluminación Técnica Cocina",brightness:255,supported_features:43},context:{id:"ctx_4"}},"light.master_suite":{entity_id:"light.master_suite",state:"off",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Master Suite DALI",brightness:0,supported_features:43},context:{id:"ctx_5"}},"light.terraza":{entity_id:"light.terraza",state:"on",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Balizas Exteriores Terraza",brightness:180,supported_features:43},context:{id:"ctx_6"}},"sensor.potencia_total":{entity_id:"sensor.potencia_total",state:"432",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Consumo Activo Showroom",unit_of_measurement:"W",device_class:"power",state_class:"measurement"},context:{id:"ctx_7"}},"sensor.energia_diaria":{entity_id:"sensor.energia_diaria",state:"26.11",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Consumo Total Hoy",unit_of_measurement:"kWh",device_class:"energy"},context:{id:"ctx_8"}},"sensor.solar_produccion":{entity_id:"sensor.solar_produccion",state:"3420",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Producción Fotovoltaica",unit_of_measurement:"W",device_class:"power"},context:{id:"ctx_9"}},"sensor.bateria_soc":{entity_id:"sensor.bateria_soc",state:"88",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Batería Almacenamiento",unit_of_measurement:"%",device_class:"battery"},context:{id:"ctx_10"}},"climate.termostato_salon":{entity_id:"climate.termostato_salon",state:"heat",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Clima Salón Principal",current_temperature:21.5,temperature:22,current_humidity:48,hvac_action:"heating",hvac_modes:["off","heat","cool","auto"]},context:{id:"ctx_11"}},"media_player.sonos_salon":{entity_id:"media_player.sonos_salon",state:"playing",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Sonos Architectural Salón",media_title:"Modul 29_14",media_artist:"Nik Bärtsch's Ronin",media_album_name:"Awase (ECM Records)",source:"Tidal Master Lossless",volume_level:.42,is_volume_muted:!1,media_duration:382,media_position:124},context:{id:"ctx_12"}},"scene.showroom_confort":{entity_id:"scene.showroom_confort",state:"scenery",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Ambiente Confort",icon:"sun"},context:{id:"ctx_13"}},"scene.showroom_cine":{entity_id:"scene.showroom_cine",state:"scenery",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Modo Cine / Lounge",icon:"moon"},context:{id:"ctx_14"}},"scene.showroom_reunion":{entity_id:"scene.showroom_reunion",state:"scenery",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Presentación & Reunión",icon:"sparkles"},context:{id:"ctx_15"}},"scene.showroom_noche":{entity_id:"scene.showroom_noche",state:"scenery",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Apagado General",icon:"power"},context:{id:"ctx_16"}},"weather.showroom":{entity_id:"weather.showroom",state:"sunny",last_changed:new Date().toISOString(),last_updated:new Date().toISOString(),attributes:{friendly_name:"Exterior Showroom",temperature:22.4,humidity:45,wind_speed:11,pressure:1018},context:{id:"ctx_17"}}};class lt{constructor(){this._listeners=new Set,this._hass={states:{...ct},language:"es",selectedTheme:null,callService:this._callService.bind(this),callWS:this._callWS.bind(this),connection:{subscribeEvents:async()=>()=>{},sendMessagePromise:async()=>({})}}}getHass(){return this._hass}subscribe(e){return this._listeners.add(e),e(this._hass),()=>this._listeners.delete(e)}_notify(){this._hass={...this._hass,states:{...this._hass.states}};for(const e of this._listeners)e(this._hass)}async _callService(e,i,s){const a=s==null?void 0:s.entity_id;if(!a)return;const n=this._hass.states[a];if(!n)return;const r={...n,last_updated:new Date().toISOString()};if(e==="light"){if(i==="turn_on")r.state="on",(s==null?void 0:s.brightness)!==void 0&&(r.attributes={...r.attributes,brightness:s.brightness}),(s==null?void 0:s.color_temp)!==void 0&&(r.attributes={...r.attributes,color_temp:s.color_temp});else if(i==="turn_off")r.state="off",r.attributes={...r.attributes,brightness:0};else if(i==="toggle"){const c=n.state==="on"?"off":"on";r.state=c,c==="on"&&!r.attributes.brightness&&(r.attributes={...r.attributes,brightness:255})}}else if(e==="media_player"){if(i==="media_play_pause")r.state=n.state==="playing"?"paused":"playing";else if(i==="media_play")r.state="playing";else if(i==="media_pause")r.state="paused";else if(i==="volume_set"&&(s==null?void 0:s.volume_level)!==void 0)r.attributes={...r.attributes,volume_level:s.volume_level};else if(i==="volume_mute"){const c=!n.attributes.is_volume_muted;r.attributes={...r.attributes,is_volume_muted:c}}}else e==="scene"&&i==="turn_on"&&(a==="scene.showroom_noche"?Object.keys(this._hass.states).forEach(c=>{c.startsWith("light.")&&(this._hass.states[c]={...this._hass.states[c],state:"off"})}):a==="scene.showroom_confort"&&this._hass.states["light.salon_principal"]&&(this._hass.states["light.salon_principal"]={...this._hass.states["light.salon_principal"],state:"on",attributes:{...this._hass.states["light.salon_principal"].attributes,brightness:180}}));return this._hass.states[a]=r,this._notify(),{success:!0}}async _callWS(e){return{result:"ok"}}}const N=new lt;typeof window<"u"&&(window.mockHassProvider=N,window.registerMockHassConsumer=t=>{N.subscribe(e=>{t.hass=e})});var dt=Object.defineProperty,pt=Object.getOwnPropertyDescriptor,V=(t,e,i,s)=>{for(var a=s>1?void 0:s?pt(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&dt(e,i,a),a};let y=class extends z{constructor(){super(...arguments),this.theme="dark",this._timeStr="",this._dateStr=""}connectedCallback(){super.connectedCallback(),this._updateClock(),this._timer=window.setInterval(()=>this._updateClock(),1e3)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&clearInterval(this._timer)}_updateClock(){const t=new Date;this._timeStr=`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`;const e=["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"],i=["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];this._dateStr=`${e[t.getDay()]}, ${t.getDate()} ${i[t.getMonth()]}`}_toggleTheme(){const t=this.theme==="dark"?"light":"dark";this.dispatchEvent(new CustomEvent("theme-change",{detail:{theme:t},bubbles:!0,composed:!0}))}_handlePillClick(t){this.dispatchEvent(new CustomEvent("pill-action",{detail:{action:t},bubbles:!0,composed:!0}))}render(){var d,p,v,h,f,x,m,w,b;const t=((d=this.hass)==null?void 0:d.states)||{},e=((v=(p=t["weather.forecast_casa"])==null?void 0:p.attributes)==null?void 0:v.temperature)??"24",i=((h=t["weather.forecast_casa"])==null?void 0:h.state)??"sunny";let s=0;const a=["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_4_switch","switch.smart_relay_switch_3_switch"];for(const _ of a)((f=t[_])==null?void 0:f.state)==="on"&&s++;const n=((x=t["media_player.showroom_1"])==null?void 0:x.state)==="playing",r=((w=(m=t["media_player.showroom_1"])==null?void 0:m.attributes)==null?void 0:w.media_title)??"Ambient Lounge",c=((b=t["sensor.showroom_energia_estimada"])==null?void 0:b.state)??"4.8";return u`
      <header class="header">
        <div class="header-brand-wrap">
          <div class="brand-block">
            <span class="brand-name">WITMIND</span>
            <span class="brand-site">SHOWROOM</span>
          </div>

          <div class="pills-strip">
            <div class="status-pill" @click=${()=>this._handlePillClick("weather")}>
              <span class="pill-icon">${o("sun",{size:18})}</span>
              <div class="pill-texts">
                <span class="pill-title">${e}°C</span>
                <span class="pill-meta">${i==="sunny"?"Soleado":i}</span>
              </div>
            </div>

            <div class="status-pill is-active-pill" @click=${()=>this._handlePillClick("lights")}>
              <span class="pill-icon active-accent">${o("lightbulb",{size:18})}</span>
              <div class="pill-texts">
                <span class="pill-title">${s} / 10 On</span>
                <span class="pill-meta">Iluminación</span>
              </div>
            </div>

            <div class="status-pill" @click=${()=>this._handlePillClick("media")}>
              <span class="pill-icon">${o("music",{size:18})}</span>
              <div class="pill-texts">
                <span class="pill-title">${n?"Playing":"Sonos"}</span>
                <span class="pill-meta">${r}</span>
              </div>
            </div>

            <div class="status-pill" @click=${()=>this._handlePillClick("energy")}>
              <span class="pill-icon">${o("zap",{size:18})}</span>
              <div class="pill-texts">
                <span class="pill-title">${c} kWh</span>
                <span class="pill-meta">Consumo hoy</span>
              </div>
            </div>
          </div>
        </div>

        <div class="header-clock-wrap">
          <div class="clock-digits">${this._timeStr}</div>
          <div class="clock-date-row">
            <span class="date-label">${this._dateStr}</span>
            <button class="theme-toggle-btn" @click=${this._toggleTheme}>
              ${o(this.theme==="dark"?"sun":"moon",{size:12})}
              <span>${this.theme==="dark"?"Light":"Dark"}</span>
            </button>
          </div>
        </div>
      </header>
    `}};y.styles=[O,C`
      :host {
        display: block;
        width: 100%;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 4px 0;
        gap: 16px;
      }

      .header-brand-wrap {
        display: flex;
        align-items: center;
        gap: 24px;
      }

      .brand-block {
        display: flex;
        flex-direction: column;
        line-height: 1.1;
      }

      .brand-name {
        font-size: 18px;
        font-weight: 720;
        letter-spacing: 0.02em;
        color: var(--wit-text-primary);
      }

      .brand-site {
        font-size: 11px;
        font-weight: 640;
        letter-spacing: 0.08em;
        color: var(--wit-accent);
        text-transform: uppercase;
      }

      .pills-strip {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }

      .status-pill {
        min-height: 48px;
        padding: 0 16px;
        background: var(--wit-surface-glass);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-pill);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
        user-select: none;
      }

      .status-pill:hover {
        border-color: var(--wit-border-accent);
        transform: translateY(-1px);
      }

      .status-pill:active {
        transform: scale(0.985);
      }

      .status-pill.is-active-pill {
        border-color: var(--wit-border-accent);
      }

      .pill-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--wit-text-secondary);
      }

      .pill-icon.active-accent {
        color: var(--wit-accent);
      }

      .pill-texts {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .pill-title {
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
      }

      .pill-meta {
        font-size: 11px;
        font-weight: 520;
        color: var(--wit-text-secondary);
      }

      .header-clock-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        text-align: right;
        line-height: 1;
      }

      .clock-digits {
        font-size: clamp(48px, 5vw, 60px);
        font-weight: 450;
        letter-spacing: -0.04em;
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
      }

      .clock-date-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 4px;
      }

      .date-label {
        font-size: 12px;
        font-weight: 520;
        color: var(--wit-text-secondary);
      }

      .theme-toggle-btn {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 3px 10px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-secondary);
        font-size: 11px;
        font-weight: 640;
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
        user-select: none;
      }

      .theme-toggle-btn:hover {
        color: var(--wit-text-primary);
        border-color: var(--wit-border-accent);
      }

      @media (max-width: 1024px) {
        .pills-strip {
          display: none;
        }
      }
    `];V([g({type:Object})],y.prototype,"hass",2);V([g({type:String})],y.prototype,"theme",2);V([H()],y.prototype,"_timeStr",2);V([H()],y.prototype,"_dateStr",2);y=V([A("wit-app-header")],y);var ht=Object.defineProperty,ut=Object.getOwnPropertyDescriptor,q=(t,e,i,s)=>{for(var a=s>1?void 0:s?ut(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&ht(e,i,a),a};let L=class extends z{constructor(){super(...arguments),this.activePage=0}_handleAction(t){this.dispatchEvent(new CustomEvent("dock-action",{detail:{action:t},bubbles:!0,composed:!0}))}_setPage(t){this.dispatchEvent(new CustomEvent("page-change",{detail:{page:t},bubbles:!0,composed:!0}))}render(){var r,c,d,p,v;const t=((r=this.hass)==null?void 0:r.states)||{};let e=0;const i=["switch.interruptor_inteligente_switch_1","switch.interruptor_inteligente_switch_2","switch.interruptor_inteligente_switch_3","switch.interruptor_inteligente_switch_4","switch.interruptor_inteligente_2_switch_1","switch.interruptor_inteligente_2_switch_2","switch.interruptor_inteligente_2_switch_3","switch.interruptor_inteligente_2_switch_4","switch.smart_relay_switch_4_switch","switch.smart_relay_switch_3_switch"];for(const h of i)((c=t[h])==null?void 0:c.state)==="on"&&e++;const s=((d=t["sensor.showroom_potencia_estimada"])==null?void 0:d.state)??"432",a=((p=t["media_player.showroom_1"])==null?void 0:p.state)==="playing",n=((v=t["sensor.21051182g_battery_level"])==null?void 0:v.state)??"88";return u`
      <nav class="wit-dock" aria-label="Navegación rápida">
        <button class="dock-btn" @click=${()=>this._handleAction("lights")}>
          <span class="active-accent">${o("lightbulb",{size:18})}</span>
          <span>Luces ${e}</span>
        </button>

        <button class="dock-btn" @click=${()=>this._handleAction("energy")}>
          <span>${o("zap",{size:18})}</span>
          <span>${s} W</span>
        </button>

        <button class="dock-btn" @click=${()=>this._handleAction("media")}>
          <span>${o("music",{size:18})}</span>
          <span>${a?"❚❚":"▶"}</span>
        </button>

        <button class="dock-btn" @click=${()=>this._handleAction("battery")}>
          <span>${o("battery-charging",{size:16})}</span>
          <span>${n}%</span>
        </button>

        <div class="dock-dots-group">
          <div
            class="dock-dot ${this.activePage===0?"is-active":""}"
            title="Página 1: Operación"
            @click=${()=>this._setPage(0)}
          ></div>
          <div
            class="dock-dot ${this.activePage===1?"is-active":""}"
            title="Página 2: Analítica"
            @click=${()=>this._setPage(1)}
          ></div>
        </div>
      </nav>
    `}};L.styles=[O,C`
      :host {
        display: block;
        position: fixed;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 2000;
        pointer-events: auto;
      }

      .wit-dock {
        background: var(--wit-surface-glass);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-pill);
        backdrop-filter: blur(24px);
        -webkit-backdrop-filter: blur(24px);
        box-shadow: var(--wit-shadow-dock);
        padding: 6px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        user-select: none;
      }

      .dock-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        border-radius: var(--wit-radius-pill);
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-secondary);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
        font-family: inherit;
        font-variant-numeric: tabular-nums;
      }

      .dock-btn:hover {
        color: var(--wit-text-primary);
        background: var(--wit-border-subtle);
      }

      .dock-btn:active {
        transform: scale(0.97);
      }

      .active-accent {
        color: var(--wit-accent);
      }

      .dock-dots-group {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 0 4px;
      }

      .dock-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--wit-border-subtle);
        cursor: pointer;
        transition: all var(--wit-duration-normal) var(--wit-ease-default);
      }

      .dock-dot.is-active {
        width: 20px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-accent);
      }
    `];q([g({type:Object})],L.prototype,"hass",2);q([g({type:Number})],L.prototype,"activePage",2);L=q([A("wit-bottom-dock")],L);var gt=Object.defineProperty,vt=Object.getOwnPropertyDescriptor,F=(t,e,i,s)=>{for(var a=s>1?void 0:s?vt(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&gt(e,i,a),a};const J=[{id:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",subtitle:"Zona ventana",watts:100},{id:"switch.interruptor_inteligente_switch_2",name:"Spots 2×3",subtitle:"Muestra 2 × 3",watts:120},{id:"switch.interruptor_inteligente_switch_3",name:"Spots 3×3",subtitle:"Muestra 3 × 3",watts:180},{id:"switch.interruptor_inteligente_switch_4",name:"Spots TV",subtitle:"Zona audiovisual",watts:25}],Q=[{id:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",subtitle:"Temperaturas color",watts:96},{id:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",subtitle:"Muestra suspendida",watts:10},{id:"switch.interruptor_inteligente_2_switch_3",name:"Slims",subtitle:"Línea decorativa",watts:432},{id:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",subtitle:"Iluminación empotrada",watts:144},{id:"switch.smart_relay_switch_4_switch",name:"Paneles",subtitle:"Control por relé",watts:288}],tt={id:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",subtitle:"Control aislado",watts:0},mt=[...J,...Q,tt],Z=1395;let j=class extends z{constructor(){super(...arguments),this.theme="dark"}_handleLightsSheetOpen(){this.dispatchEvent(new CustomEvent("open-lights-sheet",{bubbles:!0,composed:!0}))}_handleViewChange(t){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:t},bubbles:!0,composed:!0}))}_applyScene(t){this.hass&&this.hass.callService("scene","turn_on",{entity_id:t})}render(){var m,w,b,_,E,I,P,D,R,T,M;const t=((m=this.hass)==null?void 0:m.states)||{};let e=0,i=0,s=0,a=0;for(const l of J)((w=t[l.id])==null?void 0:w.state)==="on"&&(e++,i+=l.watts,s++);for(const l of Q)((b=t[l.id])==null?void 0:b.state)==="on"&&(e++,i+=l.watts,a++);const n=((_=t[tt.id])==null?void 0:_.state)==="on"?1:0;n&&e++;const r=((I=(E=t["weather.forecast_casa"])==null?void 0:E.attributes)==null?void 0:I.temperature)??"24",c=((P=t["weather.forecast_casa"])==null?void 0:P.state)??"sunny",d=((R=(D=t["weather.forecast_casa"])==null?void 0:D.attributes)==null?void 0:R.humidity)??"45",p=((T=t["sensor.showroom_energia_estimada"])==null?void 0:T.state)??"4.8",v=((M=t["media_player.showroom_1"])==null?void 0:M.state)==="playing",h=Math.min(100,Math.max(0,Math.round(i/Z*100))),f=`${h*2.51} 251.2`,x=h>85?"var(--wit-danger)":h>60?"var(--wit-warning)":"var(--wit-accent)";return u`
      <!-- HERO WIDGET -->
      <section class="hero-card">
        <div class="hero-brand-col">
          <span class="hero-kicker">SHOWROOM WITMIND</span>
          <h1 class="hero-title">Iluminación de precisión</h1>
          <p class="hero-caption">
            ${e} de ${mt.length} luminarias activas • ${i} W de carga
          </p>
        </div>
        <div class="hero-segmented-nav">
          <button class="nav-segment-btn is-selected" @click=${()=>this._handleViewChange("home")}>
            Inicio
          </button>
          <button class="nav-segment-btn" @click=${this._handleLightsSheetOpen}>
            Luces
          </button>
          <button class="nav-segment-btn" @click=${()=>this._handleViewChange("energy")}>
            Analítica
          </button>
        </div>
      </section>

      <!-- TOP QUAD GRID -->
      <div class="grid-top-quad">
        <!-- 1. Clima -->
        <div class="card weather-card interactive" @click=${()=>this._handleViewChange("weather")}>
          <div class="card-head">
            <span class="card-kicker">Clima</span>
            <span class="card-head-icon">${o("sun",{size:18})}</span>
          </div>
          <div class="weather-kpi-block">
            <div class="kpi-display">${r}°</div>
            <div class="kpi-sub-label">${c==="sunny"?"Soleado":c} • Humedad ${d}%</div>
          </div>
          <div class="weather-week-strip">
            <div class="fc-col"><span>Hoy</span><strong class="active-accent">24°</strong></div>
            <div class="fc-col"><span>Mañana</span><strong>23°</strong></div>
            <div class="fc-col"><span>Sáb</span><strong>25°</strong></div>
            <div class="fc-col"><span>Dom</span><strong>21°</strong></div>
          </div>
        </div>

        <!-- 2. Energía -->
        <div class="card energy-card interactive" @click=${()=>this._handleViewChange("energy")}>
          <div class="card-head">
            <span class="card-kicker">Energía</span>
            <span class="card-head-icon">${o("zap",{size:18})}</span>
          </div>
          <div class="weather-kpi-block">
            <div class="kpi-display">${i} W</div>
            <div class="kpi-sub-label">${p} kWh consumidos</div>
          </div>
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
        </div>

        <!-- 3. Power Gauge -->
        <div class="card gauge-card">
          <div class="card-head">
            <span class="card-kicker">Carga Eléctrica</span>
            <span class="card-head-meta">${Z} W MAX</span>
          </div>
          <div class="gauge-box">
            <svg class="gauge-svg" viewBox="0 0 100 100">
              <circle class="gauge-track" cx="50" cy="50" r="40"/>
              <circle
                class="gauge-indicator"
                cx="50"
                cy="50"
                r="40"
                style="stroke-dasharray: ${f}; stroke: ${x};"
              />
            </svg>
            <div class="gauge-center-data">
              <span class="gauge-value">${h}%</span>
              <span class="gauge-sub">${i} W</span>
            </div>
          </div>
          <div class="gauge-footer-note">Capacidad nominal activa</div>
        </div>

        <!-- 4. Ambiente Activo -->
        <div class="card ambience-card">
          <div class="card-head">
            <span class="card-kicker">Ambiente Activo</span>
            <span class="status-badge is-preset">PRESET</span>
          </div>
          <div class="ambience-center">
            <div class="ambience-title">Presentación</div>
            <div class="ambience-sub">Spots ventana + TV</div>
          </div>
          <div class="ambience-footer">
            <span class="active-accent" style="font-size: 11px; font-weight: 520;">Control dinámico del showroom</span>
          </div>
        </div>
      </div>

      <!-- MID TRIO GRID -->
      <div class="grid-mid-trio">
        <!-- 1. Zonas -->
        <div class="card rooms-card">
          <div class="card-head">
            <span class="card-kicker">Zonas</span>
            <span class="card-head-icon">${o("layers",{size:18})}</span>
          </div>
          <div class="rooms-stack">
            <div class="room-row" @click=${this._handleLightsSheetOpen}>
              <div class="room-left">
                <span class="room-indicator ${s>0?"is-on":""}">
                  ${o("lightbulb",{size:18})}
                </span>
                <span class="room-title">Spots</span>
              </div>
              <span class="room-tag ${s>0?"is-on":""}">${s} / 4</span>
            </div>

            <div class="room-row" @click=${this._handleLightsSheetOpen}>
              <div class="room-left">
                <span class="room-indicator ${a>0?"is-on":""}">
                  ${o("layers",{size:18})}
                </span>
                <span class="room-title">Muestrarios & Paneles</span>
              </div>
              <span class="room-tag ${a>0?"is-on":""}">${a} / 5</span>
            </div>

            <div class="room-row" @click=${this._handleLightsSheetOpen}>
              <div class="room-left">
                <span class="room-indicator ${n>0?"is-on":""}">
                  ${o("lightbulb",{size:18})}
                </span>
                <span class="room-title">Reflector Exterior</span>
              </div>
              <span class="room-tag ${n>0?"is-on":""}">${n>0?"On":"Off"}</span>
            </div>

            <div class="room-row" @click=${()=>this._handleViewChange("media")}>
              <div class="room-left">
                <span class="room-indicator ${v?"is-on":""}">
                  ${o("music",{size:18})}
                </span>
                <span class="room-title">Multimedia</span>
              </div>
              <span class="room-tag ${v?"is-on":""}">${v?"Playing":"Paused"}</span>
            </div>

            <div class="room-row" @click=${()=>this._handleViewChange("energy")}>
              <div class="room-left">
                <span class="room-indicator is-on">
                  ${o("zap",{size:18})}
                </span>
                <span class="room-title">Carga General</span>
              </div>
              <span class="room-tag is-on">${i} W</span>
            </div>
          </div>
        </div>

        <!-- 2. Accesos Rápidos (2x3 Grid) -->
        <div class="card shortcuts-card">
          <div class="card-head">
            <span class="card-kicker">Accesos Rápidos</span>
            <span class="card-head-meta">2 × 3</span>
          </div>
          <div class="shortcuts-grid">
            <div class="sc-item" @click=${()=>this._applyScene("scene.presentacion")}>
              <span class="sc-ico">${o("sparkles",{size:18})}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Presentación</span>
                <span class="sc-sub-text">Ventana + TV</span>
              </div>
            </div>

            <div class="sc-item" @click=${()=>this._applyScene("scene.reunion")}>
              <span class="sc-ico">${o("users",{size:18})}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Reunión</span>
                <span class="sc-sub-text">2×3 + Ventana</span>
              </div>
            </div>

            <div class="sc-item is-highlight" @click=${()=>{var l;return(l=this.hass)==null?void 0:l.callService("script","showroom_encendido_general",{})}}>
              <span class="sc-ico active-accent">${o("sun",{size:18})}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Todos ON</span>
                <span class="sc-sub-text">General</span>
              </div>
            </div>

            <div class="sc-item" @click=${()=>{var l;return(l=this.hass)==null?void 0:l.callService("script","showroom_apagado_general",{})}}>
              <span class="sc-ico">${o("moon",{size:18})}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Todos OFF</span>
                <span class="sc-sub-text">Apagado</span>
              </div>
            </div>

            <div class="sc-item" @click=${this._handleLightsSheetOpen}>
              <span class="sc-ico">${o("lightbulb",{size:18})}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Solo Spots</span>
                <span class="sc-sub-text">4 circuitos</span>
              </div>
            </div>

            <div class="sc-item" @click=${this._handleLightsSheetOpen}>
              <span class="sc-ico">${o("layers",{size:18})}</span>
              <div class="sc-text-col">
                <span class="sc-heading">Solo Muestras</span>
                <span class="sc-sub-text">5 paneles</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Agenda Calendar -->
        <div class="card calendar-card">
          <div class="card-head">
            <span class="card-kicker">Agenda</span>
            <span class="card-head-icon">${o("calendar",{size:18})}</span>
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
      </div>
    `}};j.styles=[O,C`
      :host {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
      }

      /* HERO WIDGET */
      .hero-card {
        padding: 24px 32px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: var(--wit-surface-raised);
        border: 1px solid var(--wit-border-accent);
        border-radius: var(--wit-radius-card, 22px);
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
        color: var(--wit-accent);
        text-transform: uppercase;
      }

      .hero-title {
        font-size: 28px;
        font-weight: 720;
        letter-spacing: -0.02em;
        color: var(--wit-text-primary);
        margin: 0;
      }

      .hero-caption {
        font-size: 16px;
        color: var(--wit-text-secondary);
        margin: 0;
        font-variant-numeric: tabular-nums;
      }

      .hero-segmented-nav {
        display: flex;
        gap: 4px;
        background: var(--wit-surface-interactive);
        padding: 4px;
        border-radius: var(--wit-radius-pill);
        border: 1px solid var(--wit-border-interactive);
      }

      .nav-segment-btn {
        background: transparent;
        border: none;
        color: var(--wit-text-secondary);
        padding: 8px 16px;
        border-radius: var(--wit-radius-pill);
        font-size: 12px;
        font-weight: 640;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
        font-family: inherit;
        user-select: none;
      }

      .nav-segment-btn:hover {
        color: var(--wit-text-primary);
      }

      .nav-segment-btn.is-selected {
        background: var(--wit-accent);
        color: #ffffff;
      }

      /* GRIDS */
      .grid-top-quad {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
      }

      @media (max-width: 1180px) {
        .grid-top-quad {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 650px) {
        .grid-top-quad {
          grid-template-columns: 1fr;
        }
      }

      .grid-mid-trio {
        display: grid;
        grid-template-columns: 1.1fr 1.3fr 1.3fr;
        gap: 24px;
      }

      @media (max-width: 1100px) {
        .grid-mid-trio {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 720px) {
        .grid-mid-trio {
          grid-template-columns: 1fr;
        }
      }

      /* CARDS */
      .card {
        position: relative;
        background: var(--wit-surface);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-card, 22px);
        padding: 24px;
        display: flex;
        flex-direction: column;
        transition: transform var(--wit-duration-fast) var(--wit-ease-default),
                    border-color var(--wit-duration-fast) var(--wit-ease-default);
        overflow: hidden;
      }

      .card.interactive {
        cursor: pointer;
        user-select: none;
      }

      .card.interactive:hover {
        border-color: var(--wit-border-accent);
        transform: translateY(-1px);
      }

      .card.interactive:active {
        transform: scale(0.985);
      }

      .card-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .card-kicker {
        font-size: 12px;
        font-weight: 640;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--wit-text-secondary);
      }

      .card-head-icon {
        color: var(--wit-text-tertiary);
        display: flex;
        align-items: center;
      }

      .card-head-meta {
        font-size: 11px;
        font-weight: 520;
        color: var(--wit-text-tertiary);
      }

      .active-accent {
        color: var(--wit-accent);
      }

      /* WEATHER CARD */
      .weather-card {
        justify-content: space-between;
        min-height: 185px;
      }

      .weather-kpi-block {
        margin: 4px 0;
      }

      .kpi-display {
        font-size: 32px;
        font-weight: 520;
        letter-spacing: -0.03em;
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
      }

      .kpi-sub-label {
        font-size: 12px;
        color: var(--wit-text-secondary);
        margin-top: 2px;
      }

      .weather-week-strip {
        display: flex;
        justify-content: space-between;
        padding-top: 8px;
        border-top: 1px solid var(--wit-border-subtle);
        font-size: 11px;
        color: var(--wit-text-secondary);
      }

      .fc-col {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        font-variant-numeric: tabular-nums;
      }

      /* ENERGY CARD */
      .energy-card {
        justify-content: space-between;
        min-height: 185px;
      }

      .sparkline-bars {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 32px;
        padding-top: 4px;
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
        background: var(--wit-accent);
      }

      /* POWER GAUGE CARD */
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
        stroke: var(--wit-border-subtle);
        stroke-width: 8;
      }

      .gauge-indicator {
        fill: none;
        stroke-width: 8;
        stroke-linecap: round;
        transition: stroke-dasharray var(--wit-duration-modal) var(--wit-ease-default);
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
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
      }

      .gauge-sub {
        font-size: 10px;
        color: var(--wit-text-tertiary);
        font-variant-numeric: tabular-nums;
      }

      .gauge-footer-note {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        text-align: center;
      }

      /* AMBIENCE CARD */
      .ambience-card {
        justify-content: space-between;
        min-height: 185px;
      }

      .status-badge {
        padding: 2px 8px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-secondary);
        font-size: 10px;
        font-weight: 720;
        letter-spacing: 0.06em;
      }

      .status-badge.is-preset {
        background: var(--wit-accent-muted);
        border-color: var(--wit-border-accent);
        color: var(--wit-accent);
      }

      .ambience-center {
        margin: 4px 0;
      }

      .ambience-title {
        font-size: 20px;
        font-weight: 720;
        color: var(--wit-text-primary);
      }

      .ambience-sub {
        font-size: 12px;
        color: var(--wit-text-secondary);
        margin-top: 2px;
      }

      .ambience-footer {
        padding-top: 8px;
        border-top: 1px solid var(--wit-border-subtle);
      }

      /* ROOMS CARD */
      .rooms-card {
        gap: 12px;
      }

      .rooms-stack {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .room-row {
        padding: 8px 12px;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transition: all var(--wit-duration-fast);
      }

      .room-row:hover {
        border-color: var(--wit-border-accent);
        background: var(--wit-surface-interactive-hover, var(--wit-surface-interactive));
      }

      .room-left {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .room-indicator {
        color: var(--wit-text-tertiary);
        display: flex;
      }

      .room-indicator.is-on {
        color: var(--wit-accent);
      }

      .room-title {
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .room-tag {
        padding: 2px 8px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-border-subtle);
        font-size: 11px;
        font-weight: 640;
        color: var(--wit-text-secondary);
        font-variant-numeric: tabular-nums;
      }

      .room-tag.is-on {
        background: var(--wit-accent-muted);
        color: var(--wit-accent);
        border: 1px solid var(--wit-border-accent);
      }

      /* SHORTCUTS CARD */
      .shortcuts-card {
        gap: 12px;
      }

      .shortcuts-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .sc-item {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        min-height: 48px;
        user-select: none;
        transition: all var(--wit-duration-fast);
      }

      .sc-item:hover {
        border-color: var(--wit-border-accent);
        transform: translateY(-1px);
      }

      .sc-item.is-highlight {
        background: var(--wit-accent-muted);
        border-color: var(--wit-border-accent);
      }

      .sc-ico {
        display: flex;
        color: var(--wit-text-secondary);
      }

      .sc-text-col {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .sc-heading {
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .sc-sub-text {
        font-size: 11px;
        color: var(--wit-text-tertiary);
      }

      /* CALENDAR CARD */
      .calendar-card {
        gap: 12px;
      }

      .calendar-events-stack {
        display: flex;
        flex-direction: column;
        gap: 8px;
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
        color: var(--wit-text-tertiary);
      }

      .event-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background: var(--wit-surface-interactive);
        border-radius: 8px;
        border-left: 2px solid var(--wit-accent);
        font-size: 12px;
      }

      .event-hour {
        font-weight: 720;
        color: var(--wit-accent);
        font-variant-numeric: tabular-nums;
      }

      .event-title {
        color: var(--wit-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `];F([g({type:Object})],j.prototype,"hass",2);F([g({type:String})],j.prototype,"theme",2);j=F([A("wit-home-view")],j);var wt=Object.defineProperty,bt=Object.getOwnPropertyDescriptor,B=(t,e,i,s)=>{for(var a=s>1?void 0:s?bt(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&wt(e,i,a),a};const et=[{id:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",subtitle:"Zona ventana",watts:100},{id:"switch.interruptor_inteligente_switch_2",name:"Spots 2×3",subtitle:"Muestra 2 × 3",watts:120},{id:"switch.interruptor_inteligente_switch_3",name:"Spots 3×3",subtitle:"Muestra 3 × 3",watts:180},{id:"switch.interruptor_inteligente_switch_4",name:"Spots TV",subtitle:"Zona audiovisual",watts:25}],at=[{id:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",subtitle:"Temperaturas color",watts:96},{id:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",subtitle:"Muestra suspendida",watts:10},{id:"switch.interruptor_inteligente_2_switch_3",name:"Slims",subtitle:"Línea decorativa",watts:432},{id:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",subtitle:"Iluminación empotrada",watts:144},{id:"switch.smart_relay_switch_4_switch",name:"Paneles",subtitle:"Control por relé",watts:288}],S={id:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",subtitle:"Control aislado",watts:0},X=[...et,...at,S];let W=class extends z{constructor(){super(...arguments),this.open=!1}_toggle(t){var s;if(!this.hass)return;const i=(((s=this.hass.states[t])==null?void 0:s.state)||"off")==="on"?"turn_off":"turn_on";this.hass.callService("switch",i,{entity_id:t})}_close(){this.open=!1,this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}render(){var s,a,n,r;if(!this.open)return null;const t=((s=this.hass)==null?void 0:s.states)||{};let e=0,i=0;for(const c of X)((a=t[c.id])==null?void 0:a.state)==="on"&&(e++,i+=c.watts);return u`
      <div class="sheet-scrim" @click=${c=>{c.target===c.currentTarget&&this._close()}}>
        <div class="sheet-modal" role="dialog" aria-modal="true">
          <div class="sheet-header">
            <div>
              <h2 class="sheet-title">Control de Luminarias</h2>
              <p class="sheet-meta">
                ${e} de ${X.length} encendidas • ${i} W de carga
              </p>
            </div>
            <button class="sheet-close-btn" @click=${this._close} aria-label="Cerrar">
              ${o("x",{size:16})}
            </button>
          </div>

          <!-- SPOTS -->
          <div class="sheet-group">
            <span class="sheet-group-label">SPOTS</span>
            <div class="switches-stack">
              ${et.map(c=>{var p;const d=((p=t[c.id])==null?void 0:p.state)==="on";return u`
                  <div
                    class="switch-row ${d?"is-on":""}"
                    @click=${()=>this._toggle(c.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${d?"active-accent":""}">
                        ${o("lightbulb",{size:18})}
                      </span>
                      <div class="switch-texts">
                        <span class="switch-name">${c.name}</span>
                        <span class="switch-meta">${c.subtitle} • ${c.watts} W</span>
                      </div>
                    </div>
                    <div class="switch-toggle"></div>
                  </div>
                `})}
            </div>
          </div>

          <!-- MUESTRARIOS & PANELES -->
          <div class="sheet-group">
            <span class="sheet-group-label">MUESTRARIOS & PANELES</span>
            <div class="switches-stack">
              ${at.map(c=>{var p;const d=((p=t[c.id])==null?void 0:p.state)==="on";return u`
                  <div
                    class="switch-row ${d?"is-on":""}"
                    @click=${()=>this._toggle(c.id)}
                  >
                    <div class="switch-left">
                      <span class="switch-icon ${d?"active-accent":""}">
                        ${o("layers",{size:18})}
                      </span>
                      <div class="switch-texts">
                        <span class="switch-name">${c.name}</span>
                        <span class="switch-meta">${c.subtitle} • ${c.watts} W</span>
                      </div>
                    </div>
                    <div class="switch-toggle"></div>
                  </div>
                `})}
            </div>
          </div>

          <!-- REFLECTOR EXTERIOR -->
          <div class="sheet-group">
            <span class="sheet-group-label">REFLECTOR EXTERIOR</span>
            <div class="switches-stack">
              <div
                class="switch-row ${((n=t[S.id])==null?void 0:n.state)==="on"?"is-on":""}"
                @click=${()=>this._toggle(S.id)}
              >
                <div class="switch-left">
                  <span class="switch-icon ${((r=t[S.id])==null?void 0:r.state)==="on"?"active-accent":""}">
                    ${o("lightbulb",{size:18})}
                  </span>
                  <div class="switch-texts">
                    <span class="switch-name">${S.name}</span>
                    <span class="switch-meta">${S.subtitle}</span>
                  </div>
                </div>
                <div class="switch-toggle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `}};W.styles=[O,C`
      :host {
        display: contents;
      }

      .sheet-scrim {
        position: fixed;
        inset: 0;
        background: var(--wit-surface-overlay, rgba(0, 0, 0, 0.65));
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        z-index: 5000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        animation: fadeIn var(--wit-duration-fast) ease-out;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      .sheet-modal {
        background: var(--wit-surface-raised);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-panel, 28px);
        width: min(620px, calc(100vw - 40px));
        max-height: 85dvh;
        overflow-y: auto;
        padding: 24px;
        display: flex;
        flex-direction: column;
        gap: 24px;
        box-shadow: var(--wit-shadow-sheet);
        animation: scaleUp var(--wit-duration-normal) var(--wit-ease-default);
      }

      @keyframes scaleUp {
        from { transform: scale(0.95); opacity: 0; }
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
        color: var(--wit-text-primary);
      }

      .sheet-meta {
        font-size: 12px;
        color: var(--wit-text-secondary);
        margin-top: 2px;
        font-variant-numeric: tabular-nums;
      }

      .sheet-close-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-secondary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
      }

      .sheet-close-btn:hover {
        color: var(--wit-text-primary);
        border-color: var(--wit-border-accent);
      }

      .sheet-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .sheet-group-label {
        font-size: 10px;
        font-weight: 720;
        letter-spacing: 0.08em;
        color: var(--wit-text-tertiary);
        text-transform: uppercase;
      }

      .switches-stack {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .switch-row {
        padding: 10px 14px;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        user-select: none;
        transition: all var(--wit-duration-fast) var(--wit-ease-default);
      }

      .switch-row:hover {
        border-color: var(--wit-border-accent);
        background: var(--wit-surface-interactive-hover, var(--wit-surface-interactive));
      }

      .switch-row.is-on {
        border-color: var(--wit-border-accent);
      }

      .switch-left {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .switch-icon {
        color: var(--wit-text-tertiary);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .switch-icon.active-accent {
        color: var(--wit-accent);
      }

      .switch-texts {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .switch-name {
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .switch-meta {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        font-variant-numeric: tabular-nums;
      }

      .switch-toggle {
        width: 44px;
        height: 24px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-border-subtle);
        position: relative;
        transition: background-color var(--wit-duration-fast) var(--wit-ease-default);
        flex-shrink: 0;
      }

      .switch-row.is-on .switch-toggle {
        background: var(--wit-accent);
      }

      .switch-toggle::after {
        content: "";
        position: absolute;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #ffffff;
        top: 3px;
        left: 3px;
        transition: transform var(--wit-duration-fast) var(--wit-ease-default);
      }

      .switch-row.is-on .switch-toggle::after {
        transform: translateX(20px);
      }
    `];B([g({type:Boolean,reflect:!0})],W.prototype,"open",2);B([g({type:Object})],W.prototype,"hass",2);W=B([A("wit-lights-sheet")],W);var ft=Object.defineProperty,xt=Object.getOwnPropertyDescriptor,U=(t,e,i,s)=>{for(var a=s>1?void 0:s?xt(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&ft(e,i,a),a};const st=[{id:"switch.interruptor_inteligente_switch_1",name:"Spots ventana",subtitle:"Zona ventana",watts:100},{id:"switch.interruptor_inteligente_switch_2",name:"Spots 2×3",subtitle:"Muestra 2 × 3",watts:120},{id:"switch.interruptor_inteligente_switch_3",name:"Spots 3×3",subtitle:"Muestra 3 × 3",watts:180},{id:"switch.interruptor_inteligente_switch_4",name:"Spots TV",subtitle:"Zona audiovisual",watts:25}],it=[{id:"switch.interruptor_inteligente_2_switch_1",name:"Paneles 3k/6k",subtitle:"Temperaturas color",watts:96},{id:"switch.interruptor_inteligente_2_switch_2",name:"Colgantes",subtitle:"Muestra suspendida",watts:10},{id:"switch.interruptor_inteligente_2_switch_3",name:"Slims",subtitle:"Línea decorativa",watts:432},{id:"switch.interruptor_inteligente_2_switch_4",name:"Downlights",subtitle:"Iluminación empotrada",watts:144},{id:"switch.smart_relay_switch_4_switch",name:"Paneles",subtitle:"Control por relé",watts:288}],rt={id:"switch.smart_relay_switch_3_switch",name:"Reflector exterior",subtitle:"Control aislado",watts:0},K=[...st,...it,rt];let $=class extends z{constructor(){super(...arguments),this.theme="dark",this._recentActivity=[{text:"Spots ventana encendidos",time:"hace 2 min",type:"light"},{text:"Ambient Lounge reproducción iniciada",time:"hace 6 min",type:"media"},{text:"Escena Presentación aplicada",time:"hace 14 min",type:"scene"},{text:"Sincronización de telemetría OK",time:"hace 18 min",type:"system"}]}_handleLightsSheetOpen(){this.dispatchEvent(new CustomEvent("open-lights-sheet",{bubbles:!0,composed:!0}))}_handleViewChange(t){this.dispatchEvent(new CustomEvent("view-change",{detail:{view:t},bubbles:!0,composed:!0}))}_toggleMedia(){this.hass&&this.hass.callService("media_player","media_play_pause",{entity_id:"media_player.showroom_1"})}_applyScene(t){this.hass&&this.hass.callService("scene","turn_on",{entity_id:t})}render(){var x,m,w,b,_,E,I,P,D,R,T,M;const t=((x=this.hass)==null?void 0:x.states)||{};let e=0,i=0,s=0,a=0;for(const l of st)((m=t[l.id])==null?void 0:m.state)==="on"&&(e++,i+=l.watts,s++);for(const l of it)((w=t[l.id])==null?void 0:w.state)==="on"&&(e++,i+=l.watts,a++);const n=((b=t[rt.id])==null?void 0:b.state)==="on"?1:0;n&&e++;const r=((_=t["media_player.showroom_1"])==null?void 0:_.state)==="playing",c=((I=(E=t["media_player.showroom_1"])==null?void 0:E.attributes)==null?void 0:I.media_title)??"Ambient Lounge",d=((D=(P=t["media_player.showroom_1"])==null?void 0:P.attributes)==null?void 0:D.media_artist)??"Savant Sound Lab",p=(T=(R=t["media_player.showroom_1"])==null?void 0:R.attributes)!=null&&T.volume_level?Math.round(t["media_player.showroom_1"].attributes.volume_level*100):45,v=((M=t["sensor.21051182g_battery_level"])==null?void 0:M.state)??"88",h=[45,30,25,20,22,35,80,140,220,310,420,480,510,490,440,380,410,560,680,720,640,490,280,110],f=Math.max(...h);return u`
      <!-- HERO WIDGET -->
      <section class="hero-card">
        <div class="hero-brand-col">
          <span class="hero-kicker">SHOWROOM WITMIND</span>
          <h1 class="hero-title">Analítica & Control Extendido</h1>
          <p class="hero-caption">
            Telemetría de consumo eléctrico, automatización y control multimedia
          </p>
        </div>
        <div class="hero-segmented-nav">
          <button class="nav-segment-btn" @click=${()=>this._handleViewChange("home")}>
            Inicio
          </button>
          <button class="nav-segment-btn" @click=${this._handleLightsSheetOpen}>
            Luces
          </button>
          <button class="nav-segment-btn is-selected" @click=${()=>this._handleViewChange("energy")}>
            Analítica
          </button>
        </div>
      </section>

      <!-- PAGE 2 PAIR -->
      <div class="grid-page2-pair">
        <!-- Media Expanded -->
        <div class="card media-expanded-card">
          <div class="card-head">
            <span class="card-kicker">Reproductor de Medios</span>
            <span class="card-head-meta">${p}% Vol</span>
          </div>
          <div class="media-body-row">
            <div class="media-cover-box">${o("music",{size:24})}</div>
            <div class="media-title-col">
              <div class="media-headline">${c}</div>
              <div class="media-subhead">${d}</div>
            </div>
          </div>
          <div class="media-ctrl-row">
            <div class="media-transport-group">
              <button class="transport-btn">${o("skip-back",{size:16})}</button>
              <button class="transport-btn is-play-action" @click=${this._toggleMedia}>
                ${o(r?"pause":"play",{size:18})}
              </button>
              <button class="transport-btn">${o("skip-forward",{size:16})}</button>
            </div>
            <div class="media-vol-group">
              <button class="vol-btn">−</button>
              <button class="vol-btn">+</button>
            </div>
          </div>
        </div>

        <!-- Lights Summary Card -->
        <div class="card lights-card interactive" @click=${this._handleLightsSheetOpen}>
          <div class="card-head">
            <span class="card-kicker">Iluminación</span>
            <span class="card-head-icon active-accent">${o("lightbulb",{size:18})}</span>
          </div>
          <div class="lights-kpi-block">
            <div class="kpi-display">${e} / ${K.length}</div>
            <div class="kpi-sub-label">Luminarias encendidas • ${i} W</div>
          </div>
          <div class="lights-breakdown-row">
            <span class="chip-label">Spots: <strong>${s}/4</strong></span>
            <span class="chip-label">Muestras: <strong>${a}/5</strong></span>
            <span class="chip-label">Reflector: <strong>${n}/1</strong></span>
          </div>
        </div>
      </div>

      <!-- DETAILED ENERGY CHART -->
      <div class="card">
        <div class="card-head">
          <span class="card-kicker">Perfil Horario de Demanda Energética</span>
          <span class="card-head-meta">24 Horas • Potencia Activa (W)</span>
        </div>
        <div class="energy-chart-track">
          ${h.map((l,Y)=>{const nt=Math.max(8,Math.min(100,l/f*100)),ot=l>f*.75;return u`
              <div class="chart-col" title="${Y}h: ${l} W">
                <div
                  class="chart-col-fill ${ot?"is-peak":""}"
                  style="height: ${nt}%;"
                ></div>
                <span class="chart-col-label">${Y%3===0?`${Y}h`:""}</span>
              </div>
            `})}
        </div>
      </div>

      <!-- QUAD GRID (Page 2) -->
      <div class="grid-top-quad">
        <!-- 1. Escenas 2x2 -->
        <div class="card scenes-card">
          <div class="card-head">
            <span class="card-kicker">Escenas de Iluminación</span>
          </div>
          <div class="scenes-quad-grid">
            <div class="scene-box" @click=${()=>this._applyScene("scene.presentacion")}>
              <span class="scene-ico">${o("sparkles",{size:18})}</span>
              <span>Presentación</span>
            </div>
            <div class="scene-box" @click=${()=>this._applyScene("scene.reunion")}>
              <span class="scene-ico">${o("users",{size:18})}</span>
              <span>Reunión</span>
            </div>
            <div class="scene-box is-accent" @click=${()=>{var l;return(l=this.hass)==null?void 0:l.callService("script","showroom_encendido_general",{})}}>
              <span class="scene-ico active-accent">${o("sun",{size:18})}</span>
              <span>Encender todo</span>
            </div>
            <div class="scene-box" @click=${()=>{var l;return(l=this.hass)==null?void 0:l.callService("script","showroom_apagado_general",{})}}>
              <span class="scene-ico">${o("moon",{size:18})}</span>
              <span>Apagar todo</span>
            </div>
          </div>
        </div>

        <!-- 2. Actividad Reciente -->
        <div class="card activity-card">
          <div class="card-head">
            <span class="card-kicker">Actividad Reciente</span>
            <span class="status-badge" style="color: var(--wit-success);">${o("check",{size:12})} EN VIVO</span>
          </div>
          <div class="activity-feed">
            ${this._recentActivity.map(l=>u`
              <div class="activity-entry">
                <span class="entry-bullet"></span>
                <div class="entry-texts">
                  <span class="entry-msg">${l.text}</span>
                  <span class="entry-time">${l.time}</span>
                </div>
              </div>
            `)}
          </div>
        </div>

        <!-- 3. Diagnóstico -->
        <div class="card diag-card">
          <div class="card-head">
            <span class="card-kicker">Diagnóstico del Sistema</span>
            <span class="status-badge" style="color: var(--wit-success);">SISTEMA OK</span>
          </div>
          <div class="diag-quad">
            <div class="diag-cell">
              <span class="cell-label">Home Assistant</span>
              <span class="cell-val">Conectado</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Weather API</span>
              <span class="cell-val">Suscrito</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Recorder</span>
              <span class="cell-val">Sincronizado</span>
            </div>
            <div class="diag-cell">
              <span class="cell-label">Circuitos</span>
              <span class="cell-val">${K.length} Online</span>
            </div>
          </div>
        </div>

        <!-- 4. Estado General -->
        <div class="card system-card">
          <div class="card-head">
            <span class="card-kicker">Estado General</span>
          </div>
          <div class="system-list">
            <div class="system-row">
              <span>Tablet Showroom</span>
              <strong>${v}% Batería</strong>
            </div>
            <div class="system-row">
              <span>Servidor HA</span>
              <strong>Mock HA Provider</strong>
            </div>
            <div class="system-row">
              <span>Última sincronización</span>
              <strong>En tiempo real</strong>
            </div>
          </div>
        </div>
      </div>
    `}};$.styles=[O,C`
      :host {
        display: flex;
        flex-direction: column;
        gap: 24px;
        width: 100%;
      }

      /* HERO WIDGET */
      .hero-card {
        padding: 24px 32px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background: var(--wit-surface-raised);
        border: 1px solid var(--wit-border-accent);
        border-radius: var(--wit-radius-card, 22px);
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
        color: var(--wit-accent);
        text-transform: uppercase;
      }

      .hero-title {
        font-size: 28px;
        font-weight: 720;
        letter-spacing: -0.02em;
        color: var(--wit-text-primary);
        margin: 0;
      }

      .hero-caption {
        font-size: 16px;
        color: var(--wit-text-secondary);
        margin: 0;
        font-variant-numeric: tabular-nums;
      }

      .hero-segmented-nav {
        display: flex;
        gap: 4px;
        background: var(--wit-surface-interactive);
        padding: 4px;
        border-radius: var(--wit-radius-pill);
        border: 1px solid var(--wit-border-interactive);
      }

      .nav-segment-btn {
        background: transparent;
        border: none;
        color: var(--wit-text-secondary);
        padding: 8px 16px;
        border-radius: var(--wit-radius-pill);
        font-size: 12px;
        font-weight: 640;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
        font-family: inherit;
        user-select: none;
      }

      .nav-segment-btn:hover {
        color: var(--wit-text-primary);
      }

      .nav-segment-btn.is-selected {
        background: var(--wit-accent);
        color: #ffffff;
      }

      /* CARDS */
      .card {
        position: relative;
        background: var(--wit-surface);
        border: 1px solid var(--wit-border-subtle);
        border-radius: var(--wit-radius-card, 22px);
        padding: 24px;
        display: flex;
        flex-direction: column;
        transition: transform var(--wit-duration-fast) var(--wit-ease-default),
                    border-color var(--wit-duration-fast) var(--wit-ease-default);
        overflow: hidden;
      }

      .card.interactive {
        cursor: pointer;
        user-select: none;
      }

      .card.interactive:hover {
        border-color: var(--wit-border-accent);
        transform: translateY(-1px);
      }

      .card-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
      }

      .card-kicker {
        font-size: 12px;
        font-weight: 640;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: var(--wit-text-secondary);
      }

      .card-head-meta {
        font-size: 11px;
        font-weight: 520;
        color: var(--wit-text-tertiary);
      }

      .active-accent {
        color: var(--wit-accent);
      }

      /* PAGE 2 PAIR (Media + Lights) */
      .grid-page2-pair {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
      }

      @media (max-width: 900px) {
        .grid-page2-pair {
          grid-template-columns: 1fr;
        }
      }

      /* MEDIA EXPANDED */
      .media-expanded-card {
        min-height: 210px;
        justify-content: space-between;
      }

      .media-body-row {
        display: flex;
        align-items: center;
        gap: 16px;
        margin: 8px 0;
      }

      .media-cover-box {
        width: 52px;
        height: 52px;
        border-radius: var(--wit-radius-control, 14px);
        background: linear-gradient(135deg, var(--wit-accent) 0%, #1a1a24 100%);
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
        font-size: 16px;
        font-weight: 720;
        color: var(--wit-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .media-subhead {
        font-size: 12px;
        color: var(--wit-text-secondary);
      }

      .media-ctrl-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        border-top: 1px solid var(--wit-border-subtle);
      }

      .media-transport-group {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .transport-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all var(--wit-duration-fast);
      }

      .transport-btn:hover {
        border-color: var(--wit-border-accent);
      }

      .transport-btn.is-play-action {
        background: var(--wit-accent);
        color: #ffffff;
        border: none;
      }

      .media-vol-group {
        display: flex;
        gap: 6px;
      }

      .vol-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 16px;
        font-weight: 640;
      }

      /* LIGHTS SUMMARY */
      .lights-card {
        min-height: 210px;
        justify-content: space-between;
      }

      .lights-kpi-block {
        margin: 4px 0;
      }

      .kpi-display {
        font-size: 32px;
        font-weight: 520;
        letter-spacing: -0.03em;
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
      }

      .kpi-sub-label {
        font-size: 12px;
        color: var(--wit-text-secondary);
        margin-top: 2px;
      }

      .lights-breakdown-row {
        display: flex;
        gap: 8px;
        padding-top: 8px;
        border-top: 1px solid var(--wit-border-subtle);
        flex-wrap: wrap;
      }

      .chip-label {
        padding: 4px 10px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-surface-interactive);
        font-size: 11px;
        color: var(--wit-text-secondary);
        font-variant-numeric: tabular-nums;
      }

      /* DETAILED ENERGY CHART */
      .energy-chart-track {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 140px;
        padding: 10px 0;
        border-bottom: 1px solid var(--wit-border-subtle);
      }

      .chart-col {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        gap: 6px;
      }

      .chart-col-fill {
        width: 100%;
        border-radius: 2px 2px 0 0;
        background: var(--wit-accent);
        opacity: 0.85;
        transition: height var(--wit-duration-modal) var(--wit-ease-default);
      }

      .chart-col-fill.is-peak {
        background: var(--wit-text-primary);
      }

      .chart-col-label {
        font-size: 9px;
        color: var(--wit-text-tertiary);
        font-variant-numeric: tabular-nums;
      }

      /* QUAD GRID (Page 2) */
      .grid-top-quad {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 24px;
      }

      @media (max-width: 1180px) {
        .grid-top-quad {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 650px) {
        .grid-top-quad {
          grid-template-columns: 1fr;
        }
      }

      /* SCENES 2x2 */
      .scenes-card {
        gap: 12px;
      }

      .scenes-quad-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .scene-box {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 640;
        color: var(--wit-text-primary);
        user-select: none;
        transition: all var(--wit-duration-fast);
      }

      .scene-box:hover {
        border-color: var(--wit-border-accent);
      }

      .scene-box.is-accent {
        border-color: var(--wit-border-accent);
        background: var(--wit-accent-muted);
      }

      .scene-ico {
        display: flex;
      }

      /* ACTIVITY */
      .activity-card {
        gap: 8px;
      }

      .status-badge {
        padding: 2px 8px;
        border-radius: var(--wit-radius-pill);
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        color: var(--wit-text-secondary);
        font-size: 10px;
        font-weight: 720;
        letter-spacing: 0.06em;
      }

      .activity-feed {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .activity-entry {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 10px;
        background: var(--wit-surface-interactive);
        border-radius: 8px;
        font-size: 12px;
      }

      .entry-bullet {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--wit-accent);
      }

      .entry-texts {
        display: flex;
        flex-direction: column;
        line-height: 1.2;
      }

      .entry-msg {
        font-weight: 640;
        color: var(--wit-text-primary);
      }

      .entry-time {
        font-size: 10px;
        color: var(--wit-text-tertiary);
      }

      /* DIAGNOSTICS */
      .diag-card {
        gap: 8px;
      }

      .diag-quad {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
      }

      .diag-cell {
        background: var(--wit-surface-interactive);
        border: 1px solid var(--wit-border-interactive);
        border-radius: var(--wit-radius-control, 14px);
        padding: 8px 12px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .cell-label {
        font-size: 11px;
        color: var(--wit-text-tertiary);
        font-weight: 640;
      }

      .cell-val {
        font-size: 12px;
        font-weight: 720;
        color: var(--wit-success);
      }

      /* SYSTEM */
      .system-card {
        justify-content: space-between;
      }

      .system-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 4px;
      }

      .system-row {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding: 6px 0;
        border-bottom: 1px solid var(--wit-border-subtle);
      }

      .system-row strong {
        color: var(--wit-text-primary);
        font-variant-numeric: tabular-nums;
      }
    `];U([g({type:Object})],$.prototype,"hass",2);U([g({type:String})],$.prototype,"theme",2);U([H()],$.prototype,"_recentActivity",2);$=U([A("wit-energy-view")],$);var _t=Object.defineProperty,yt=Object.getOwnPropertyDescriptor,G=(t,e,i,s)=>{for(var a=s>1?void 0:s?yt(e,i):e,n=t.length-1,r;n>=0;n--)(r=t[n])&&(a=(s?r(e,i,a):r(a))||a);return s&&a&&_t(e,i,a),a};let k=class extends z{constructor(){super(...arguments),this.theme="dark",this._page=0,this._lightsSheetOpen=!1}connectedCallback(){super.connectedCallback();const t=new URLSearchParams(window.location.search).get("theme");(t==="light"||t==="dark")&&(this.theme=t),!this.hass&&N&&(this._unsubscribeHass=N.subscribe(e=>{this.hass=e}))}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeHass&&this._unsubscribeHass()}updated(t){super.updated(t),t.has("theme")&&(document.documentElement.setAttribute("theme",this.theme),this.theme==="light"?(document.body.classList.add("light-theme"),document.body.classList.remove("dark-theme")):(document.body.classList.add("dark-theme"),document.body.classList.remove("light-theme")))}_handleThemeChange(t){this.theme=t.detail.theme}_handleViewChange(t){const e=t.detail.view;e==="home"?this._page=0:e==="energy"&&(this._page=1)}_handlePageChange(t){this._page=t.detail.page}_handleDockAction(t){const e=t.detail.action;e==="lights"?this._lightsSheetOpen=!0:e==="energy"?this._page=1:e==="media"&&this.hass&&this.hass.callService("media_player","media_play_pause",{entity_id:"media_player.showroom_1"})}_handlePillAction(t){const e=t.detail.action;e==="lights"?this._lightsSheetOpen=!0:e==="energy"&&(this._page=1)}render(){return u`
      <div class="app-frame">
        <wit-app-header
          .hass=${this.hass}
          .theme=${this.theme}
          @theme-change=${this._handleThemeChange}
          @pill-action=${this._handlePillAction}
        ></wit-app-header>

        <main class="main-content">
          ${this._page===0?u`
                <wit-home-view
                  .hass=${this.hass}
                  .theme=${this.theme}
                  @open-lights-sheet=${()=>this._lightsSheetOpen=!0}
                  @view-change=${this._handleViewChange}
                ></wit-home-view>
              `:u`
                <wit-energy-view
                  .hass=${this.hass}
                  .theme=${this.theme}
                  @open-lights-sheet=${()=>this._lightsSheetOpen=!0}
                  @view-change=${this._handleViewChange}
                ></wit-energy-view>
              `}
        </main>

        <!-- Lighting Sheet Modal -->
        <wit-lights-sheet
          ?open=${this._lightsSheetOpen}
          .hass=${this.hass}
          @close=${()=>this._lightsSheetOpen=!1}
        ></wit-lights-sheet>

        <!-- Bottom Floating Dock Navigation -->
        <wit-bottom-dock
          .hass=${this.hass}
          .activePage=${this._page}
          @dock-action=${this._handleDockAction}
          @page-change=${this._handlePageChange}
        ></wit-bottom-dock>
      </div>
    `}};k.styles=[O,C`
      :host {
        display: block;
        width: 100%;
        min-height: 100dvh;
        background-color: var(--wit-canvas);
        color: var(--wit-text-primary);
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
        overflow-x: hidden;
        position: relative;
        background:
          radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.14), transparent 65%),
          radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.06), transparent 70%),
          var(--wit-canvas);
      }

      :host([theme="light"]) {
        background:
          radial-gradient(900px 600px at 85% 15%, rgba(242, 101, 34, 0.10), transparent 65%),
          radial-gradient(700px 500px at 15% 85%, rgba(242, 101, 34, 0.04), transparent 70%),
          var(--wit-canvas);
      }

      .app-frame {
        position: relative;
        z-index: 1;
        max-width: 1480px;
        margin: 0 auto;
        min-height: 100dvh;
        display: flex;
        flex-direction: column;
        padding:
          max(24px, env(safe-area-inset-top))
          max(32px, env(safe-area-inset-right))
          max(96px, env(safe-area-inset-bottom))
          max(32px, env(safe-area-inset-left));
        gap: 24px;
        box-sizing: border-box;
      }

      .main-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 24px;
        animation: fade-in 200ms var(--wit-ease-default);
      }

      @keyframes fade-in {
        from { opacity: 0; transform: translateY(4px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `];G([g({type:String,reflect:!0})],k.prototype,"theme",2);G([g({type:Object})],k.prototype,"hass",2);G([H()],k.prototype,"_page",2);G([H()],k.prototype,"_lightsSheetOpen",2);k=G([A("showroom-witmind-signature")],k);
