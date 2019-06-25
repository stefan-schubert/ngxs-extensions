import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngxs/store';

class NgxsExtensionsDecoratorModuleNotImported extends Error {
  constructor() {
    super('"NgxsExtensionsDecoratorsModule" is not imported.');
  }
}

@Injectable()
export class StaticInjector {
  private static injector: Injector | null = null;

  constructor(injector: Injector) {
    StaticInjector.injector = injector;
  }

  public static getStore(): never | Store {
    if (this.injector === null) {
      throw new NgxsExtensionsDecoratorModuleNotImported();
    }

    return this.injector.get<Store>(Store);
  }
}
