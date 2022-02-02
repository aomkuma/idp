import { TestBed } from '@angular/core/testing';

import { BaseUrlInterceptorInterceptor } from './base-url-interceptor.interceptor';

describe('BaseUrlInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BaseUrlInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: BaseUrlInterceptorInterceptor = TestBed.inject(BaseUrlInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
