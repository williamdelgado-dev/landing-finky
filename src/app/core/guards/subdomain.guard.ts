import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { ConfigService } from '@institutional/services/config.service';

export const subdomainGuard: CanActivateFn = async () => {
  const configService = inject(ConfigService);

  const subdomain = configService.getSubdomain();

  if (subdomain) {
    // Si hay subdominio, permitimos que la ruta '' cargue el componente de landing
    // Pero necesitamos indicarle al componente que use el subdominio
    return true;
  }

  return true; // Dejamos pasar para que UnderConstruction se encargue o siga el flujo
};
