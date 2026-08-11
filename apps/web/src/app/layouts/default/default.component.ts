import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutDefaultModule } from '@delon/theme/layout-default';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-layout-default',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LayoutDefaultModule,
    NzDropdownModule,
    NzAvatarModule,
    NzIconModule,
  ],
  templateUrl: './default.component.html',
})
export class LayoutDefaultComponent {}
