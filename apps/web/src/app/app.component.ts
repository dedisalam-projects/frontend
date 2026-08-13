import { Component, ChangeDetectionStrategy, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuService } from '@delon/theme';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private menuSrv = inject(MenuService);

  ngOnInit(): void {
    this.menuSrv.add([
      {
        text: 'Main Menu',
        group: true,
        children: [
          {
            text: 'Dashboard',
            link: '/',
            icon: 'anticon-dashboard',
          },
          {
            text: 'User Profile',
            link: '/profile',
            icon: 'anticon-user',
          },
        ],
      },
    ]);
  }
}
