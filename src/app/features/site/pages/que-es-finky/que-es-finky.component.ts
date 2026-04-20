import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalHeaderComponent } from '@site/components/header/header.component';
import { PortalFooterComponent } from '@site/components/footer/footer.component';

@Component({
  selector: 'app-que-es-finky',
  standalone: true,
  imports: [CommonModule, PortalHeaderComponent, PortalFooterComponent],
  templateUrl: './que-es-finky.component.html',
  styleUrl: './que-es-finky.component.css',
})
export class QueEsFinkyComponent {}
