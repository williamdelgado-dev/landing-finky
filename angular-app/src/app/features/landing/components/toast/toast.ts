import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService, ToastType } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
        *ngIf="toastService.visible()" 
        class="toast-container"
        [ngClass]="typeClass()">
      <div class="toast-icon">
        <span *ngIf="toastService.type() === 'warning'">⚠️</span>
        <span *ngIf="toastService.type() === 'info'">ℹ️</span>
        <span *ngIf="toastService.type() === 'error'">❌</span>
        <span *ngIf="toastService.type() === 'success'">✅</span>
      </div>
      <div class="toast-content">
        <p>{{ toastService.message() }}</p>
      </div>
      <button class="toast-close" (click)="toastService.hide()">×</button>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 18px;
      min-width: 320px;
      max-width: 420px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      border: 1px solid rgba(0, 0, 0, 0.05);
      animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      font-family: 'Inter', sans-serif;
    }

    @keyframes slideIn {
      from { transform: translateX(120%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .toast-content p {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 500;
      color: #333;
      line-height: 1.4;
    }

    .toast-icon {
      font-size: 1.2rem;
      flex-shrink: 0;
    }

    .toast-close {
      margin-left: auto;
      background: none;
      border: none;
      font-size: 1.4rem;
      color: #999;
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
      transition: color 0.2s;
    }

    .toast-close:hover { color: #333; }

    /* Variantes por tipo */
    .toast-warning { border-left: 5px solid #F96123; border-right: 1px solid rgba(249, 97, 35, 0.15); }
    .toast-info { border-left: 5px solid #00ACCA; border-right: 1px solid rgba(0, 172, 202, 0.15); }
    .toast-error { border-left: 5px solid #ff4d4d; border-right: 1px solid rgba(255, 77, 77, 0.15); }
    .toast-success { border-left: 5px solid #2ecc71; border-right: 1px solid rgba(46, 204, 113, 0.15); }
  `]
})
export class ToastComponent {
  public toastService = inject(ToastService);

  public typeClass = computed(() => `toast-${this.toastService.type()}`);
}
