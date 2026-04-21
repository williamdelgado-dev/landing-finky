import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortalHeaderComponent } from '@site/components/header/header.component';
import { PortalFooterComponent } from '@site/components/footer/footer.component';

import { LinaPortalComponent } from '@site/components/lina-portal/lina-portal.component';

@Component({
  selector: 'app-que-es-finky',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    PortalHeaderComponent, 
    PortalFooterComponent,
    LinaPortalComponent
  ],
  templateUrl: './que-es-finky.component.html',
  styleUrl: './que-es-finky.component.css',
})
export class QueEsFinkyComponent {}
