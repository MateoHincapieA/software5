import {Entity, model, property, hasMany} from '@loopback/repository';
import {Productos} from './productos.model';
import {Inventarios} from './inventarios.model';

@model()
export class ProductoInventario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  codigo_producto_inventario?: number;
  @property({
    type: 'number',
    required: true,
  })
  codigo_inventario: number;

  @property({
    type: 'number',
    required: true,
  })
  unidades: number;

  @hasMany(() => Productos)
  codigo_producto: Productos[];

  @hasMany(() => Inventarios, {keyTo: 'codigo_inventario'})
  inventarios: Inventarios[];

  constructor(data?: Partial<ProductoInventario>) {
    super(data);
  }
}

export interface ProductoInventarioRelations {
  // describe navigational properties here
}

export type ProductoInventarioWithRelations = ProductoInventario & ProductoInventarioRelations;
