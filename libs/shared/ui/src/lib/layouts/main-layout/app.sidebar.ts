import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AppMenu } from './app.menu';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzLayoutModule, AppMenu],
  template: `
    <nz-sider
      [nzCollapsed]="layoutService.isCollapsed()"
      [nzCollapsible]="true"
      [nzTrigger]="null"
      nzWidth="240px"
      class="min-h-screen bg-white border-r border-gray-200"
    >
      <div class="h-16 flex items-center justify-center border-b border-gray-100 px-4">
        <span class="text-lg font-bold text-blue-600 truncate">
          {{ layoutService.isCollapsed() ? 'OS' : 'Optimus System' }}
        </span>
      </div>
      <app-menu></app-menu>
    </nz-sider>
  `,
})
export class AppSidebar {
  layoutService = inject(LayoutService);
}
