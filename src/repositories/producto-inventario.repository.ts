import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgreSqLsourceDataSource} from '../datasources';
import {ProductoInventario, ProductoInventarioRelations, Productos, Inventarios} from '../models';
import {ProductosRepository} from './productos.repository';
import {InventariosRepository} from './inventarios.repository';

export class ProductoInventarioRepository extends DefaultCrudRepository<
  ProductoInventario,
  typeof ProductoInventario.prototype.codigo_producto_inventario,
  ProductoInventarioRelations
> {

  public readonly codigo_producto: HasManyRepositoryFactory<Productos, typeof ProductoInventario.prototype.codigo_producto_inventario>;

  public readonly inventarios: HasManyRepositoryFactory<Inventarios, typeof ProductoInventario.prototype.codigo_producto_inventario>;

  constructor(
    @inject('datasources.postgreSQLsource') dataSource: PostgreSqLsourceDataSource, @repository.getter('ProductosRepository') protected productosRepositoryGetter: Getter<ProductosRepository>, @repository.getter('InventariosRepository') protected inventariosRepositoryGetter: Getter<InventariosRepository>,
  ) {
    super(ProductoInventario, dataSource);
    this.inventarios = this.createHasManyRepositoryFactoryFor('inventarios', inventariosRepositoryGetter,);
    this.registerInclusionResolver('inventarios', this.inventarios.inclusionResolver);
    this.codigo_producto = this.createHasManyRepositoryFactoryFor('codigo_producto', productosRepositoryGetter,);
    this.registerInclusionResolver('codigo_producto', this.codigo_producto.inclusionResolver);
  }
}
