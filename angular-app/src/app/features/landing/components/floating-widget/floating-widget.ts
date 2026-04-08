import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-floating-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './floating-widget.html',
  styleUrl: './floating-widget.css'
})
export class FloatingWidgetComponent {
  private http = inject(HttpClient);

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

    const payload = {
      phone: this.phone,
      name: this.name,
      Pantalla: 'b4m'
    };

    this.http.post('https://api-production.finky.la/api/user/callback-ai/create-callback-ai-v2', payload)
      .subscribe({
        next: (response: any) => {
          alert('Solicitud enviada con éxito. Pronto nos contactaremos contigo.');
          this.closeModal();
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error('[FloatingWidget] Error:', err);
          alert('Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
          this.isSubmitting.set(false);
        }
      });
  }
}
