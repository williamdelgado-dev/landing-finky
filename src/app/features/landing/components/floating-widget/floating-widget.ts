import { Component, signal, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LandingConfig } from '../../models/landing-config.model';
import { LinaService, LinaCallPayload } from '../../services/lina.service';

@Component({
  selector: 'app-floating-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './floating-widget.html',
  styleUrl: './floating-widget.css',
})
export class FloatingWidgetComponent {
  private linaService = inject(LinaService);

  @Input('config') universityConfig: LandingConfig | null = null;
  public isModalOpen = signal(false);
  public isSubmitting = signal(false);

  // Form fields
  public name = '';
  public phone = '';
  public habeasData = false;

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  resetForm() {
    this.name = '';
    this.phone = '';
    this.habeasData = false;
  }

  async sendCallbackRequest() {
    if (!this.name || !this.phone) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (!this.habeasData) {
      alert('Debes aceptar la política de privacidad');
      return;
    }

    this.isSubmitting.set(true);

    const timestamp = Date.now();
    const payload: LinaCallPayload = {
      phone: this.phone,
      caller_id: `${this.phone}_${timestamp}`,
      promptType: this.universityConfig?.prompt_version || 'finky',
      customContext: {
        nombre: this.name,
        phone: `57${this.phone}`,
      },
    };

    console.log('[FloatingWidget] Payload para llamada:', payload);

    this.linaService.requestNewCall(payload).subscribe({
      next: (response) => {
        alert('Solicitud enviada con éxito. Pronto nos contactaremos contigo.');
        this.closeModal();
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('[FloatingWidget] Error:', err);
        alert('Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
        this.isSubmitting.set(false);
      },
    });
  }
}
