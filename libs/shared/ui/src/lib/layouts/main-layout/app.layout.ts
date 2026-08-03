import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NzLayoutModule, AppTopbar, AppSidebar, AppFooter],
  template: `
    <nz-layout class="min-h-screen">
      <app-sidebar></app-sidebar>
      <nz-layout class="flex flex-col min-h-screen bg-gray-50">
        <app-topbar></app-topbar>
        <nz-content class="p-6 flex-grow">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100 min-h-[calc(100vh-160px)]">
            <router-outlet></router-outlet>
          </div>
        </nz-content>
        <app-footer></app-footer>
      </nz-layout>
    </nz-layout>
  `,
})
export class AppLayout {
  layoutService = inject(LayoutService);
}
