import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutDefaultModule, LayoutDefaultOptions } from '@delon/theme/layout-default';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { ReuseTabModule } from '@delon/abc/reuse-tab';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'app-layout-default',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    LayoutDefaultModule,
    NzDropdownModule,
    NzAvatarModule,
    NzIconModule,
    NzMenuModule,
    ReuseTabModule,
  ],
  templateUrl: './default.component.html',
})
export class LayoutDefaultComponent {
  readonly user = inject(SettingsService).user;

  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`,
  };
}
