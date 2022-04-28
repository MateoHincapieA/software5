import {Entity, model, property} from '@loopback/repository';

@model()
export class Inventarios extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigo_inventario?: number;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo_sede: string;


  constructor(data?: Partial<Inventarios>) {
    super(data);
  }
}

export interface InventariosRelations {
  // describe navigational properties here
}

export type InventariosWithRelations = Inventarios & InventariosRelations;
