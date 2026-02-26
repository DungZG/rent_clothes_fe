import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
    selector: 'app-main-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NzLayoutModule, HeaderComponent, FooterComponent],
    template: `
    <nz-layout class="main-layout">
      <app-header></app-header>
      <nz-content class="content-area">
        <router-outlet></router-outlet>
      </nz-content>
      <app-footer></app-footer>
    </nz-layout>
  `,
    styles: [`
    .main-layout {
      min-height: 100vh;
      background: #fff;
    }
    .content-area {
      min-height: calc(100vh - 80px - 400px); /* adjust based on header/footer height */
    }
  `]
})
export class MainLayoutComponent { }
