import { Injectable, Injector } from '@angular/core';

@Injectable()
export class InjectorAccessorService {
  private static injector: Injector | null = null;

  constructor(injector: Injector) {
    InjectorAccessorService.injector = injector;
  }

  public static getInjector(): never | Injector {
    if (this.injector === null) {
      throw new Error('"NgxsExtensionsDecoratorsModule" is not imported.');
    }

    return this.injector;
  }
}
