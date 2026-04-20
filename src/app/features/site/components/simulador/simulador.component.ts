import { Component, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { formatCOP } from '@site/data/finky-data';

@Component({
  selector: 'app-portal-simulador',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="simulador">
      <h3 class="simulador-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#FF6B35"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
        Simular crédito
        @if (universidad) {
          <span class="uni-label">en {{ universidad }}</span>
        }
      </h3>

      <div class="fields">
        <div class="field">
          <label class="label" for="valorInput">Valor del semestre</label>
          <div class="input-with-symbol">
            <span class="currency-symbol">$</span>
            <input
              id="valorInput"
              type="text"
              class="digital-input"
              [value]="formatCOP(monto)"
              (input)="onManualInput($event)"
              placeholder="0"
            />
          </div>
        </div>

        <!-- CUOTAS -->
        <div class="field">
          <p class="label">¿En cuántas cuotas quieres pagar?</p>
          <div class="cuotas-grid">
            @for (n of cuotasOptions; track n) {
              <button
                (click)="cuotas = n"
                [class.active]="cuotas === n"
                class="cuota-btn"
              >
                {{ n }} cuotas
              </button>
            }
          </div>
        </div>

        <!-- DATOS DE CONTACTO (Finky.la style) -->
        <div class="form-group">
          <div class="field">
            <label class="label" for="nombreInput">Nombre completo</label>
            <input id="nombreInput" type="text" class="text-input" placeholder="Ingresa tu nombre" />
          </div>
          <div class="field">
            <label class="label" for="phoneInput">Número de celular</label>
            <input id="phoneInput" type="tel" class="text-input" placeholder="3XX XXX XXXX" />
          </div>
        </div>

        <div class="tyc-check">
          <input type="checkbox" id="tyc" class="checkbox" />
          <label for="tyc">Acepto los <a href="#">términos y condiciones</a> y el tratamiento de datos.</label>
        </div>

        <div class="desglose">
          <div class="desglose-row">
            <span class="desglose-label">Valor solicitado</span>
            <span class="desglose-value">{{ '$' + formatCOP(monto) }}</span>
          </div>
          <div class="desglose-row">
            <span class="desglose-label">Tarifa de servicio Finky</span>
            <span class="desglose-value">{{ '$' + formatCOP(tarifaFinky) }}</span>
          </div>
          <div class="desglose-total">
            <span class="total-label">Total a financiar</span>
            <span class="total-value">{{ '$' + formatCOP(total) }}</span>
          </div>
        </div>

        <div class="cuota-result">
          <p class="cuota-result-label">Pago mensual estimado de</p>
          <p class="cuota-result-value">{{ '$' + formatCOP(cuotaMensual) }}</p>
        </div>

        <button class="solicitar-btn">Solicitar crédito</button>
      </div>
    </div>
  `,
  styles: [
    `
      .simulador {
        box-sizing: border-box;
        background: white;
        border-radius: 32px;
        box-shadow: 0 30px 100px rgba(0, 0, 0, 0.06);
        padding: 32px;
        border: 1px solid #f3f4f6;
        width: 100%;
        max-width: 100%;
      }
      .simulador * {
        box-sizing: border-box;
      }
      .simulador-title {
        font-size: 22px;
        font-weight: 800;
        color: #111827;
        margin-bottom: 32px;
        display: flex;
        align-items: center;
        gap: 12px;
        letter-spacing: -0.01em;
      }
      .fields {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }
      .label {
        display: block;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.05em;
        color: #6b7280;
        margin-bottom: 12px;
      }
      .range-input {
        width: 100%;
        height: 6px;
        border-radius: 3px;
        background: #f3f4f6;
        -webkit-appearance: none;
        appearance: none;
        cursor: pointer;
        padding: 0;
      }
      .range-input::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #ff6b35;
        cursor: pointer;
        border: 4px solid white;
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
      }
      .monto-display {
        font-size: 32px;
        font-weight: 800;
        color: #ff6b35;
        margin-top: 12px;
        letter-spacing: -0.03em;
      }
      .cuotas-grid {
        display: flex;
        gap: 12px;
      }
      .cuota-btn {
        flex: 1;
        padding: 12px;
        border-radius: 9999px;
        font-weight: 700;
        border: 2px solid #f3f4f6;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: white;
        color: #6b7280;
        font-size: 15px;
      }
      .cuota-btn.active {
        background: #ff6b35;
        border-color: #ff6b35;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
      }
      .desglose {
        background: #f9fafb;
        border-radius: 20px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .desglose-row {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #4b5563;
      }
      .desglose-value {
        font-weight: 700;
        color: #111827;
      }
      .desglose-total {
        border-top: 1px solid #e5e7eb;
        padding-top: 16px;
        display: flex;
        justify-content: space-between;
        font-size: 16px;
      }
      .total-label {
        font-weight: 800;
        color: #111827;
      }
      .total-value {
        font-weight: 800;
        color: #ff6b35;
      }
      .cuota-result {
        text-align: center;
        background: #3e2a7e;
        border-radius: 24px;
        padding: 32px;
        transition: transform 0.3s;
      }
      .cuota-result:hover {
        transform: translateY(-5px);
      }
      .cuota-result-label {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
      }
      .cuota-result-value {
        font-size: 40px;
        font-weight: 800;
        color: white;
        letter-spacing: -0.02em;
      }
      .solicitar-btn {
        width: 100%;
        background: #111827;
        color: white;
        font-weight: 700;
        padding: 20px;
        border-radius: 9999px;
        border: none;
        cursor: pointer;
        font-size: 16px;
        letter-spacing: 0.05em;
        transition: all 0.3s;
      }
      .solicitar-btn:hover {
        background: #1f2937;
        transform: translateY(-2px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
      .input-with-symbol {
        position: relative;
        margin-bottom: 32px;
        width: 100%;
      }
      .currency-symbol {
        position: absolute;
        left: 24px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 28px;
        font-weight: 800;
        color: #ff6b35;
        z-index: 10;
      }
      .digital-input {
        width: 100%;
        display: block;
        background: #ffffff;
        border: 2px solid #f3f4f6;
        border-radius: 20px;
        padding: 20px 20px 20px 54px;
        font-size: 32px;
        font-weight: 800;
        color: #ff6b35;
        outline: none;
        transition: all 0.3s;
        letter-spacing: -0.02em;
        margin: 0;
      }
      .digital-input:focus {
        border-color: #ff6b35;
        box-shadow: 0 15px 40px rgba(255, 107, 53, 0.1);
      }
      .range-labels {
        display: flex;
        justify-content: space-between;
        margin-top: 12px;
        font-size: 12px;
        font-weight: 600;
        color: #9ca3af;
      }
      .form-group {
        display: flex;
        flex-direction: row;
        gap: 20px;
        width: 100%;
      }
      .form-group .field {
        flex: 1;
        min-width: 0;
      }
      .text-input {
        width: 100%;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 14px 16px;
        font-size: 15px;
        color: #111827;
        outline: none;
        transition: all 0.2s;
      }
      .text-input:focus {
        border-color: #ff6b35;
        background: white;
        box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
      }
      .tyc-check {
        display: flex;
        gap: 12px;
        align-items: flex-start;
        font-size: 13px;
        color: #6b7280;
        line-height: 1.4;
      }
      .tyc-check a {
        color: #ff6b35;
        font-weight: 600;
        text-decoration: none;
      }
      .checkbox {
        width: 18px;
        height: 18px;
        accent-color: #ff6b35;
        margin-top: 2px;
      }

      /* RESPONSIVE < 600px */
      @media (max-width: 600px) {
        :host .simulador {
          padding: 16px !important;
          border-radius: 20px !important;
        }
        :host .simulador-title {
          font-size: 18px !important;
          margin-bottom: 20px !important;
        }
        :host .digital-input {
          font-size: 24px !important;
          padding: 16px 16px 16px 44px !important;
        }
        :host .currency-symbol {
          font-size: 20px !important;
          left: 16px !important;
        }
        :host .form-group {
          flex-direction: column !important;
          gap: 12px !important;
        }
        :host .form-group .field {
          width: 100% !important;
        }
        :host .cuotas-grid {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 8px !important;
        }
        :host .cuota-btn {
          font-size: 13px !important;
          padding: 10px !important;
          width: 100% !important;
        }
        :host .cuota-result-value {
          font-size: 32px !important;
        }
        :host .fields {
          padding-bottom: 60px !important; /* Espacio extra para lina */
        }
      }
    `,
  ],
})
export class PortalSimuladorComponent {
  @Input() universidad?: string;
  @Input() carrera?: string;

  monto = 5000000;
  cuotas = 6;
  cuotasOptions = [3, 4, 5, 6];
  seguro = 17000;

  formatCOP = formatCOP;

  onManualInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, '');
    const numValue = parseInt(value, 10) || 0;
    
    if (numValue > 15000000) {
      this.monto = 15000000;
    } else {
      this.monto = numValue;
    }
  }

  get fianza(): number {
    return Math.round(this.monto * 0.0264);
  }
  get tarifaFinky(): number {
    return Math.round(this.monto * 0.1152);
  }
  get total(): number {
    return this.monto + this.fianza + this.seguro + this.tarifaFinky;
  }
  get cuotaMensual(): number {
    return Math.round(this.total / this.cuotas);
  }
}
