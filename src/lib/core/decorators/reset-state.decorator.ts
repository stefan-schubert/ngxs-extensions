import { ensureStoreMetadata, StateContext, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectorAccessorService } from '../internal/injector-accessor.service';
import { uniqueId } from '../internal/utils';

/**
 * Decorator to reset state to default on method call.
 *
 * @param stateClass state to get defaults from
 */
export function ResetStateToDefault(stateClass: any) {
  return function(target: any, key: string, descriptor: TypedPropertyDescriptor<any>) {
    // create meta data
    const id = uniqueId();
    const fn = `resetAction${id}`;
    const type = `[${stateClass.name}] ResetAction-${id}`;
    const meta = ensureStoreMetadata(stateClass);

    if (meta.actions.hasOwnProperty(type)) {
      throw new Error(`Method decorated with such type \`${type}\` already exists`);
    }

    // set action handler on state class
    stateClass.prototype[fn] = ({ setState }: StateContext<any>) => {
      setState(meta.defaults);
    };

    // set meta data
    meta.actions[type] = [
      {
        fn,
        options: {},
        type,
      },
    ];

    // wrap original function to call dispatch after method has finished
    const original: Function = descriptor.value;
    function dispatch() {
      InjectorAccessorService.getInjector()
        .get<Store>(Store)
        .dispatch({ type });
    }
    function wrapper(this: any, ...args: any[]) {
      const result = original.apply(this, args);
      // handle observable
      if (result instanceof Observable) {
        result.toPromise().then(dispatch);
        return result;
      }
      // handle promise
      if (result instanceof Promise) {
        return result.then(dispatch);
      }
      // handle sync call
      dispatch();
      return result;
    }
    descriptor.value = wrapper;

    // return descriptor
    return descriptor;
  };
}
