import { ModuleWithProviders, NgModule, Self } from '@angular/core';
import { InjectorAccessorService } from './core/internal/injector-accessor.service';

@NgModule()
export class NgxsExtensionsDecoratorsModule {
  constructor(@Self() private injectorAccessorService: InjectorAccessorService) {}

  public static forRoot(): ModuleWithProviders<NgxsExtensionsDecoratorsModule> {
    return {
      ngModule: NgxsExtensionsDecoratorsModule,
      providers: [InjectorAccessorService],
    };
  }
}
