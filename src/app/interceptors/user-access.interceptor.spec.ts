import { TestBed } from '@angular/core/testing';

import { UserAccessInterceptor } from './user-access.interceptor';

describe('UserAccessInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserAccessInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UserAccessInterceptor = TestBed.inject(UserAccessInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
