import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { $t, updatePreset, updateSurfacePalette } from '@primeuix/themes';
import { PrimeNG } from 'primeng/config';
import { SelectButtonModule } from 'primeng/selectbutton';
import { LayoutService } from './layout.service';
import { PRESETS, SURFACES, SurfacesType, KeyOfType } from './app.configurator.constants';

@Component({
  selector: 'app-configurator',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectButtonModule],
  template: `
    <div class="flex flex-col gap-4">
      <div>
        <span class="text-sm text-muted-color font-semibold">Primary</span>
        <div class="pt-2 flex gap-2 flex-wrap justify-start">
          @for (primaryColor of primaryColors(); track primaryColor.name) {
            <button
              type="button"
              [title]="primaryColor.name"
              (click)="updateColors($event, 'primary', primaryColor)"
              [ngClass]="{
                'outline outline-primary': primaryColor.name === selectedPrimaryColor(),
              }"
              class="cursor-pointer w-5 h-5 rounded-full flex shrink-0 items-center justify-center outline-offset-1 shadow"
              [style]="{
                'background-color':
                  primaryColor?.name === 'noir'
                    ? 'var(--text-color)'
                    : primaryColor?.palette?.['500'],
              }"
            ></button>
          }
        </div>
      </div>
      <div>
        <span class="text-sm text-muted-color font-semibold">Surface</span>
        <div class="pt-2 flex gap-2 flex-wrap justify-start">
          @for (surface of surfaces; track surface.name) {
            <button
              type="button"
              [title]="surface.name"
              (click)="updateColors($event, 'surface', surface)"
              class="cursor-pointer w-5 h-5 rounded-full flex shrink-0 items-center justify-center outline-offset-1 shadow"
              [ngClass]="{
                'outline outline-primary': selectedSurfaceColor()
                  ? selectedSurfaceColor() === surface.name
                  : layoutService.layoutConfig().darkTheme
                    ? surface.name === 'zinc'
                    : surface.name === 'slate',
              }"
              [style]="{
                'background-color': surface?.palette?.['500'],
              }"
            ></button>
          }
        </div>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-sm text-muted-color font-semibold">Presets</span>
        <p-selectbutton
          [options]="presets"
          [ngModel]="selectedPreset()"
          (ngModelChange)="onPresetChange($event)"
          [allowEmpty]="false"
          size="small"
        />
      </div>
      @if (showMenuModeButton()) {
        <div class="flex flex-col gap-2">
          <span class="text-sm font-semibold text-muted-color">Menu Mode</span>
          <p-selectbutton
            [ngModel]="menuMode()"
            (ngModelChange)="onMenuModeChange($event)"
            [options]="menuModeOptions"
            optionLabel="label"
            optionValue="value"
            [allowEmpty]="false"
            size="small"
          />
        </div>
      }
    </div>
  `,
  host: {
    class:
      'hidden absolute top-13 right-0 w-72 p-4 bg-surface-0 dark:bg-surface-900 border border-surface rounded-border origin-top shadow-[0px_3px_5px_rgba(0,0,0,0.02),0px_0px_2px_rgba(0,0,0,0.05),0px_1px_4px_rgba(0,0,0,0.08)] z-50',
  },
})
export class AppConfigurator {
  router = inject(Router);

  config: PrimeNG = inject(PrimeNG);

  layoutService: LayoutService = inject(LayoutService);

  platformId = inject(PLATFORM_ID);

  presets = Object.keys(PRESETS);

  surfaces = SURFACES;

  showMenuModeButton = signal(!this.router.url.includes('auth'));

  menuModeOptions = [
    { label: 'Static', value: 'static' },
    { label: 'Overlay', value: 'overlay' },
  ];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.onPresetChange(this.layoutService.layoutConfig().preset);
    }
  }

  selectedPrimaryColor = computed(() => {
    return this.layoutService.layoutConfig().primary;
  });

  selectedSurfaceColor = computed(() => this.layoutService.layoutConfig().surface);

  selectedPreset = computed(() => this.layoutService.layoutConfig().preset);

  menuMode = computed(() => this.layoutService.layoutConfig().menuMode);

  primaryColors = computed<SurfacesType[]>(() => {
    const presetPalette =
      PRESETS[this.layoutService.layoutConfig().preset as KeyOfType<typeof PRESETS>].primitive;
    const colors = [
      'emerald',
      'green',
      'lime',
      'orange',
      'amber',
      'yellow',
      'teal',
      'cyan',
      'sky',
      'blue',
      'indigo',
      'violet',
      'purple',
      'fuchsia',
      'pink',
      'rose',
    ];
    const palettes: SurfacesType[] = [{ name: 'noir', palette: {} }];

    colors.forEach((color) => {
      palettes.push({
        name: color,
        palette: presetPalette?.[
          color as KeyOfType<typeof presetPalette>
        ] as SurfacesType['palette'],
      });
    });

    return palettes;
  });

  getPresetExt() {
    const color: SurfacesType =
      this.primaryColors().find((c) => c.name === this.selectedPrimaryColor()) || {};
    const preset = this.layoutService.layoutConfig().preset;

    if (color.name === 'noir') {
      return {
        semantic: {
          primary: {
            50: '{surface.50}',
            100: '{surface.100}',
            200: '{surface.200}',
            300: '{surface.300}',
            400: '{surface.400}',
            500: '{surface.500}',
            600: '{surface.600}',
            700: '{surface.700}',
            800: '{surface.800}',
            900: '{surface.900}',
            950: '{surface.950}',
          },
          colorScheme: {
            light: {
              primary: {
                color: '{primary.950}',
                contrastColor: '#ffffff',
                hoverColor: '{primary.800}',
                activeColor: '{primary.700}',
              },
              highlight: {
                background: '{primary.950}',
                focusBackground: '{primary.700}',
                color: '#ffffff',
                focusColor: '#ffffff',
              },
            },
            dark: {
              primary: {
                color: '{primary.50}',
                contrastColor: '{primary.950}',
                hoverColor: '{primary.200}',
                activeColor: '{primary.300}',
              },
              highlight: {
                background: '{primary.50}',
                focusBackground: '{primary.300}',
                color: '{primary.950}',
                focusColor: '{primary.950}',
              },
            },
          },
        },
      };
    } else {
      if (preset === 'Nora') {
        return {
          semantic: {
            primary: color.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.600}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.700}',
                  activeColor: '{primary.800}',
                },
                highlight: {
                  background: '{primary.600}',
                  focusBackground: '{primary.700}',
                  color: '#ffffff',
                  focusColor: '#ffffff',
                },
              },
              dark: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.400}',
                  activeColor: '{primary.300}',
                },
                highlight: {
                  background: '{primary.500}',
                  focusBackground: '{primary.400}',
                  color: '{surface.900}',
                  focusColor: '{surface.900}',
                },
              },
            },
          },
        };
      } else {
        return {
          semantic: {
            primary: color.palette,
            colorScheme: {
              light: {
                primary: {
                  color: '{primary.500}',
                  contrastColor: '#ffffff',
                  hoverColor: '{primary.600}',
                  activeColor: '{primary.700}',
                },
                highlight: {
                  background: '{primary.50}',
                  focusBackground: '{primary.100}',
                  color: '{primary.700}',
                  focusColor: '{primary.800}',
                },
              },
              dark: {
                primary: {
                  color: '{primary.400}',
                  contrastColor: '{surface.900}',
                  hoverColor: '{primary.300}',
                  activeColor: '{primary.200}',
                },
                highlight: {
                  background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                  focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                  color: 'rgba(255,255,255,.87)',
                  focusColor: 'rgba(255,255,255,.87)',
                },
              },
            },
          },
        };
      }
    }
  }

  updateColors(event: MouseEvent, type: 'primary' | 'surface', color: SurfacesType) {
    if (type === 'primary') {
      this.layoutService.layoutConfig.update((state) => ({
        ...state,
        primary: color.name || 'noir',
      }));
    } else if (type === 'surface') {
      this.layoutService.layoutConfig.update((state) => ({ ...state, surface: color.name }));
    }
    this.applyTheme(type, color);

    event.stopPropagation();
  }

  applyTheme(type: 'primary' | 'surface', color: SurfacesType) {
    if (type === 'primary') {
      updatePreset(this.getPresetExt());
    } else if (type === 'surface') {
      updateSurfacePalette(color.palette);
    }
  }

  onPresetChange(event: string) {
    this.layoutService.layoutConfig.update((state) => ({ ...state, preset: event }));
    const preset = PRESETS[event as KeyOfType<typeof PRESETS>];
    const surfacePalette = this.surfaces.find(
      (s) => s.name === this.selectedSurfaceColor(),
    )?.palette;

    let themeConfig = $t().preset(preset).preset(this.getPresetExt());

    if (surfacePalette) {
      themeConfig = themeConfig.surfacePalette(surfacePalette);
    }

    themeConfig.use({ useDefaultOptions: true });
  }

  onMenuModeChange(event: string) {
    this.layoutService.layoutConfig.update((prev) => ({ ...prev, menuMode: event }));
  }
}
