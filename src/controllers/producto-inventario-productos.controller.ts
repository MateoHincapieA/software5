import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ProductoInventario,
  Productos,
} from '../models';
import {ProductoInventarioRepository} from '../repositories';

export class ProductoInventarioProductosController {
  constructor(
    @repository(ProductoInventarioRepository) protected productoInventarioRepository: ProductoInventarioRepository,
  ) { }

  @get('/producto-inventarios/{id}/productos', {
    responses: {
      '200': {
        description: 'Array of ProductoInventario has many Productos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Productos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Productos>,
  ): Promise<Productos[]> {
    return this.productoInventarioRepository.codigo_producto(id).find(filter);
  }

  @post('/producto-inventarios/{id}/productos', {
    responses: {
      '200': {
        description: 'ProductoInventario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Productos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProductoInventario.prototype.codigo_producto_inventario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {
            title: 'NewProductosInProductoInventario',
            exclude: ['codigo_producto'],
            optional: ['productoInventarioId']
          }),
        },
      },
    }) productos: Omit<Productos, 'codigo_producto'>,
  ): Promise<Productos> {
    return this.productoInventarioRepository.codigo_producto(id).create(productos);
  }

  @patch('/producto-inventarios/{id}/productos', {
    responses: {
      '200': {
        description: 'ProductoInventario.Productos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos, {partial: true}),
        },
      },
    })
    productos: Partial<Productos>,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.productoInventarioRepository.codigo_producto(id).patch(productos, where);
  }

  @del('/producto-inventarios/{id}/productos', {
    responses: {
      '200': {
        description: 'ProductoInventario.Productos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Productos)) where?: Where<Productos>,
  ): Promise<Count> {
    return this.productoInventarioRepository.codigo_producto(id).delete(where);
  }
}
