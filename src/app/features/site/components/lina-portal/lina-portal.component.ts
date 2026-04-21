import { Component, signal, inject, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortalLinaService, PortalLinaPayload } from '../../services/portal-lina.service';

@Component({
  selector: 'app-lina-portal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lina-portal.component.html',
  styleUrl: './lina-portal.component.css',
})
export class LinaPortalComponent {
  private portalLinaService = inject(PortalLinaService);

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

  @HostListener('window:keydown.escape')
  onEscape() {
    if (this.isModalOpen()) {
      this.closeModal();
    }
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

    const payload: PortalLinaPayload = {
      phone: this.phone,
      name: this.name,
      Pantalla: 'faq',
    };

    console.log('[LinaPortal] Enviando solicitud:', payload);

    this.portalLinaService.requestPortalCall(payload).subscribe({
      next: () => {
        alert('¡Solicitud enviada! Lina te devolverá la llamada en unos segundos.');
        this.closeModal();
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('[LinaPortal] Error:', err);
        alert('Hubo un error al enviar la solicitud. Por favor intenta de nuevo.');
        this.isSubmitting.set(false);
      },
    });
  }
}
