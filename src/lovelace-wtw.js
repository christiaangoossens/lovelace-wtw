import { LitElement, html, css, unsafeCSS } from "lit-element";
import bgImage from './wtw_heat.png';

class WTWCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    };
  }

  render() {
    return html`
    <ha-card>
    <div class="container">
      <div class="bg">
          <div class="flex-container">
              <div class="flex-col-out">
                  <div>${
                    this.hass.states["sensor.wtw_outside_temperature"].state
                  }°C</div>
                  <div class="fan-state"><ha-icon icon="mdi:fan"></ha-icon></ha-icon> ${Math.trunc(
                    this.hass.states["sensor.wtw_intake_fan_speed"].state
                  )}%</div>
                  <div>${
                    this.hass.states["sensor.wtw_exhaust_temperature"].state
                  }°C</div>
                  <div class="fan-state"><ha-icon icon="mdi:fan"></ha-icon> ${Math.trunc(
                    this.hass.states["sensor.wtw_exhaust_fan_speed"].state
                  )}%</div>
              </div>
              <div class="flex-col-main">
                  <div>${Math.trunc(
                    this.hass.states["sensor.wtw_comfort_temperature"].state
                  )}°C</div>
                  <div>${Math.trunc(
                    this.hass.states["sensor.wtw_ventilation_level"].state
                  )}</div>
              </div>
              <div class="flex-col-in">
                  <div>${
                    this.hass.states["sensor.wtw_return_temperature"].state
                  }°C</div>
                  <div class="fan-state"><ha-icon icon="mdi:fan"></ha-icon> ${Math.trunc(
                    this.hass.states["sensor.wtw_return_air_level"].state
                  )}%</div>
                  <div>${
                    this.hass.states["sensor.wtw_supply_temperature"].state
                  }°C</div>
                  <div class="fan-state"><ha-icon icon="mdi:fan"></ha-icon> ${Math.trunc(
                    this.hass.states["sensor.wtw_supply_air_level"].state
                  )}%</div>
              </div>
          </div>
      </div>
      </div>
      <div class="info-row">
      ${this.getFanTmpl()}
      ${this.getAirFilterTmpl()}
      ${this.getBypassTmpl()}
      ${this.getPreHeatTmpl()}
      ${this.getSummerModeTmpl()}
      </div>
    </ha-card>  
    `;
  }

  getFanTmpl() {
    if (this.hass.states["sensor.wtw_intake_fan_active"].state == "Yes") {
      return html`<ha-icon title="Intake Fan Active" icon="mdi:fan"></ha-icon>`;
    } else {
      return html`<ha-icon
        title="Intake Fan Inactive"
        class="inactive"
        icon="mdi:fan"
      ></ha-icon>`;
    }
  }

  getAirFilterTmpl() {
    if (this.hass.states["sensor.wtw_filter_status"].state == "Ok") {
      return html`<ha-icon
        title="Filters are OK"
        icon="mdi:air-filter"
      ></ha-icon>`;
    } else {
      return html`<ha-icon
        title="Filter Warning!"
        class="warning"
        icon="mdi:air-filter"
      ></ha-icon>`;
    }
  }

  getBypassTmpl() {
    if (Number(this.hass.states["sensor.wtw_bypass_factor"].state) > 0) {
      return html`<ha-icon
        title="Bypass Active"
        icon="mdi:electric-switch"
      ></ha-icon>`;
    } else {
      return html`<ha-icon
        title="Bypass Inactive"
        class="inactive"
        icon="mdi:electric-switch"
      ></ha-icon>`;
    }
  }

  getPreHeatTmpl() {
    if (Number(this.hass.states["sensor.wtw_valve_preheating"].state) > 0) {
      return html`<ha-icon
        title="Valve Preheating Active"
        icon="mdi:radiator"
      ></ha-icon>`;
    } else {
      return html`<ha-icon
        title="Valve Preheating Inactive"
        class="inactive"
        icon="mdi:radiator"
      ></ha-icon>`;
    }
  }

  getSummerModeTmpl() {
    if (this.hass.states["sensor.wtw_summer_mode"].state == "No") {
      return html`<ha-icon title="Winter Mode" icon="mdi:snowflake"></ha-icon>`;
    } else {
      return html`<ha-icon
        title="Summer Mode"
        class="inactive"
        icon="mdi:weather-sunny"
      ></ha-icon>`;
    }
  }

  setConfig(config) {
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 7;
  }

  static get styles() {
    return css`
      .container {
        padding: 10px;
      }
      .bg {
        background-image: url("${unsafeCSS(bgImage)}");
        height: 200px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position-y: center;
      }
      .not-found {
        background-color: yellow;
        font-family: sans-serif;
        font-size: 14px;
        padding: 8px;
      }
      .flex-container {
        display: flex;
        justify-content: space-between;
        height: 100%;
      }
      .flex-col-main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 30px 0px;
        font-size: x-large;
        text-align: center;
        font-weight: bold;
      }
      .flex-col-out {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .flex-col-in {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .fan-state {
        padding-top: 15px;
      }
      .spin {
        animation-name: spin;
        animation-duration: 2000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }

      .info-row {
        background: rgba(0, 0, 0, 0.2);
        margin-top: 10px;
        padding: 5px;
        border-top: rgba(0, 0, 0, 0.4);
        -webkit-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
        -moz-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
        box-shadow: 0px -2.5px 3px rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: space-around;
      }

      .inactive {
        opacity: 0.7;
      }

      .warning {
        color: #d80707db;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }
}

console.info("Loaded WTW card.");

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'wtw-card',
  name: 'WTW Card',
  description: 'WTW Card (specifically works with WHR 930 entities)',
});

customElements.define("wtw-card", WTWCard);