import { Injectable, signal } from '@angular/core';

export type ToastType = 'info' | 'warning' | 'error' | 'success';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // Estado reactivo para el toast
  public message = signal<string | null>(null);
  public type = signal<ToastType>('info');
  public visible = signal(false);

  show(msg: string, type: ToastType = 'info', duration: number = 5000) {
    this.message.set(msg);
    this.type.set(type);
    this.visible.set(true);

    // Auto-ocultar después de la duración
    setTimeout(() => {
      this.visible.set(false);
    }, duration);
  }

  hide() {
    this.visible.set(false);
  }
}
