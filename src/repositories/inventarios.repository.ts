import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {PostgreSqLsourceDataSource} from '../datasources';
import {Inventarios, InventariosRelations} from '../models';

export class InventariosRepository extends DefaultCrudRepository<
  Inventarios,
  typeof Inventarios.prototype.codigo_inventario,
  InventariosRelations
> {
  constructor(
    @inject('datasources.postgreSQLsource') dataSource: PostgreSqLsourceDataSource,
  ) {
    super(Inventarios, dataSource);
  }
}
