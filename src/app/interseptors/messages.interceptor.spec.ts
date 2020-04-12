import { TestBed } from '@angular/core/testing';

import { MessagesInterceptor } from './messages.interceptor';

describe('MessagesInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MessagesInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: MessagesInterceptor = TestBed.inject(MessagesInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
