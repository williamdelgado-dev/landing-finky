import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfigService } from '../../features/landing/services/config.service';

export const subdomainGuard: CanActivateFn = async (route, state) => {
  const configService = inject(ConfigService);
  const router = inject(Router);
  
  const subdomain = configService.getSubdomain();
  
  if (subdomain) {
    // Si hay subdominio, permitimos que la ruta '' cargue el componente de landing
    // Pero necesitamos indicarle al componente que use el subdominio
    return true; 
  }
  
  return true; // Dejamos pasar para que UnderConstruction se encargue o siga el flujo
};
