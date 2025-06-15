import { TestBed } from '@angular/core/testing';

import { EnviaFormulario } from './envia-formulario';

describe('EnviaFormulario', () => {
  let service: EnviaFormulario;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviaFormulario);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
