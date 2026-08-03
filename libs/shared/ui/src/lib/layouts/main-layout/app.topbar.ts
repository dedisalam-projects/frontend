import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzLayoutModule, NzIconModule],
  template: `
    <nz-header class="flex justify-between items-center bg-white px-6 shadow-sm border-b border-gray-100 h-16">
      <div class="flex items-center gap-4">
        <button
          type="button"
          class="p-2 rounded-full hover:bg-gray-100 transition-colors border-0 bg-transparent cursor-pointer flex items-center"
          (click)="layoutService.toggleSidebar()"
          title="Toggle Sidebar"
        >
          <span
            class="text-lg flex items-center hover:text-blue-600 transition-colors"
            nz-icon
            [nzType]="layoutService.isCollapsed() ? 'menu-unfold' : 'menu-fold'"
          ></span>
        </button>
        <h1 class="text-lg font-semibold m-0 text-gray-800">Admin Dashboard</h1>
      </div>

      <div class="flex items-center gap-4">
        <button
          type="button"
          class="p-2 rounded-full hover:bg-gray-100 transition-colors border-0 bg-transparent cursor-pointer flex items-center"
          (click)="toggleDarkMode()"
          title="Toggle Dark Mode"
        >
          <span
            nz-icon
            [nzType]="layoutService.isDarkTheme() ? 'moon' : 'sun'"
            class="text-lg text-gray-600"
          ></span>
        </button>

        <a
          href="https://github.com/dedisalam/fullstack"
          target="_blank"
          class="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600 flex items-center"
          title="GitHub Repository"
        >
          <span nz-icon nzType="github" class="text-lg"></span>
        </a>

        <div class="flex items-center gap-2 cursor-pointer pl-2">
          <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm">
            A
          </div>
          <span class="text-sm font-medium text-gray-700 hidden sm:inline">Admin User</span>
        </div>
      </div>
    </nz-header>
  `,
})
export class AppTopbar {
  layoutService = inject(LayoutService);

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
