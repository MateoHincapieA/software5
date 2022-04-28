import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgreSqLsourceDataSource} from '../datasources';
import {Productos, ProductosRelations} from '../models';

export class ProductosRepository extends DefaultCrudRepository<
  Productos,
  typeof Productos.prototype.codigo_producto,
  ProductosRelations
> {
  constructor(
    @inject('datasources.postgreSQLsource') dataSource: PostgreSqLsourceDataSource,
  ) {
    super(Productos, dataSource);
  }
}
