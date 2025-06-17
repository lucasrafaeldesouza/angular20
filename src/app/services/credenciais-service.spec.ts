import { TestBed } from '@angular/core/testing';
import { CredenciaisService } from './credenciais-service';

describe('CredenciaisService', () => {
  let service: CredenciaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredenciaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
