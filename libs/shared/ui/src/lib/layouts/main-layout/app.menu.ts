import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface MenuItem {
  label: string;
  icon?: string;
  routerLink?: string[];
  children?: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, NzMenuModule, NzIconModule],
  template: `
    <ul nz-menu nzMode="inline" class="h-full border-r-0">
      @for (item of menuItems; track item.label) {
        @if (item.children && item.children.length > 0) {
          <li nz-submenu [nzTitle]="item.label" [nzIcon]="item.icon || ''">
            <ul>
              @for (subItem of item.children; track subItem.label) {
                <li nz-menu-item nzMatchRouter>
                  <a [routerLink]="subItem.routerLink">
                    @if (subItem.icon) {
                      <span nz-icon [nzType]="subItem.icon"></span>
                    }
                    <span>{{ subItem.label }}</span>
                  </a>
                </li>
              }
            </ul>
          </li>
        } @else {
          <li nz-menu-item nzMatchRouter>
            <a [routerLink]="item.routerLink">
              @if (item.icon) {
                <span nz-icon [nzType]="item.icon"></span>
              }
              <span>{{ item.label }}</span>
            </a>
          </li>
        }
      }
    </ul>
  `,
})
export class AppMenu {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      routerLink: ['/'],
    },
    {
      label: 'Users',
      icon: 'user',
      routerLink: ['/users'],
    },
    {
      label: 'Settings',
      icon: 'setting',
      routerLink: ['/settings'],
    },
  ];
}
