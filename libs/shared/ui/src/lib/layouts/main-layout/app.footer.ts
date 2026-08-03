import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [NzLayoutModule],
  template: `
    <nz-footer class="text-center text-gray-500 text-sm py-4 border-t border-gray-100 bg-white">
      Optimus System &copy; {{ currentYear }} - Powered by
      <a
        href="https://ng.ant.design"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 font-semibold hover:underline"
      >
        NG-ZORRO
      </a>
    </nz-footer>
  `,
})
export class AppFooter {
  currentYear = new Date().getFullYear();
}
