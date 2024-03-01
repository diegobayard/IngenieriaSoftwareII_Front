import { TestBed } from '@angular/core/testing';

import { ContenidoUsuarioService } from './contenido-usuario.service';

describe('ContenidoUsuarioService', () => {
  let service: ContenidoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContenidoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
