import {Entity, model, property} from '@loopback/repository';

@model()
export class Productos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigo_producto?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_producto: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion_producto: string;

  @property({
    type: 'number',
    required: true,
  })
  codigo_disenno: number;

  @property({
    type: 'number',
    required: true,
  })
  costo_produccion: number;

  @property({
    type: 'number',
    required: true,
  })
  valor_venta: number;

  @property({
    type: 'number',
    required: true,
  })
  unidades: number;

  @property({
    type: 'number',
  })
  productoInventarioId?: number;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}

export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
