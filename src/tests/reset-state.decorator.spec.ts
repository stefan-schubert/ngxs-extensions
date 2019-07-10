import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Action, NgxsModule, State, StateContext, Store } from '@ngxs/store';
import { NgxsExtensionsDecoratorsModule, ResetStateToDefault } from '../';
import { of } from 'rxjs';

interface StateModel {
  property: string;
}

class TestAction {
  static readonly type = '[TestState] TestAction';
}

@State<StateModel>({
  name: 'testState',
  defaults: { property: 'default' },
})
class TestState {
  @Action(TestAction)
  doAction({ setState }: StateContext<StateModel>) {
    setState({ property: 'modified' });
  }
}

@Component({ template: '' })
class TestComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(new TestAction());
  }

  @ResetStateToDefault(TestState)
  resetWithObservable() {
    return of(undefined);
  }

  @ResetStateToDefault(TestState)
  resetWithPromise() {
    return Promise.resolve();
  }

  @ResetStateToDefault(TestState)
  resetSync() {}
}

describe('ResetStateToDefault', () => {
  let store: Store;
  let fixture: ComponentFixture<TestComponent>;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TestState]), NgxsExtensionsDecoratorsModule.forRoot()],
      declarations: [TestComponent],
    });

    store = TestBed.get(Store);
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  it('should reset state - sync', () => {
    expect(store.selectSnapshot(TestState)).toEqual({ property: 'default' });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(store.selectSnapshot(TestState)).toEqual({ property: 'modified' });
    expect(dispatchSpy).toHaveBeenCalled();

    fixture.componentInstance.resetSync();

    expect(store.selectSnapshot(TestState)).toEqual({ property: 'default' });
  });

  it('should reset state - promise', fakeAsync(() => {
    expect(store.selectSnapshot(TestState)).toEqual({ property: 'default' });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(store.selectSnapshot(TestState)).toEqual({ property: 'modified' });
    expect(dispatchSpy).toHaveBeenCalled();

    fixture.componentInstance.resetWithPromise();
    tick();

    expect(store.selectSnapshot(TestState)).toEqual({ property: 'default' });
  }));

  it('should reset state - sync', fakeAsync(() => {
    expect(store.selectSnapshot(TestState)).toEqual({ property: 'default' });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(store.selectSnapshot(TestState)).toEqual({ property: 'modified' });
    expect(dispatchSpy).toHaveBeenCalled();

    fixture.componentInstance.resetWithObservable();
    tick();

    expect(store.selectSnapshot(TestState)).toEqual({ property: 'default' });
  }));
});
