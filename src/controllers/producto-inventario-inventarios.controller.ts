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
  Inventarios,
} from '../models';
import {ProductoInventarioRepository} from '../repositories';

export class ProductoInventarioInventariosController {
  constructor(
    @repository(ProductoInventarioRepository) protected productoInventarioRepository: ProductoInventarioRepository,
  ) { }

  @get('/producto-inventarios/{id}/inventarios', {
    responses: {
      '200': {
        description: 'Array of ProductoInventario has many Inventarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inventarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Inventarios>,
  ): Promise<Inventarios[]> {
    return this.productoInventarioRepository.inventarios(id).find(filter);
  }

  @post('/producto-inventarios/{id}/inventarios', {
    responses: {
      '200': {
        description: 'ProductoInventario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inventarios)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ProductoInventario.prototype.codigo_producto_inventario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventarios, {
            title: 'NewInventariosInProductoInventario',
            exclude: ['codigo_inventario'],
            optional: ['codigo_inventario']
          }),
        },
      },
    }) inventarios: Omit<Inventarios, 'codigo_inventario'>,
  ): Promise<Inventarios> {
    return this.productoInventarioRepository.inventarios(id).create(inventarios);
  }

  @patch('/producto-inventarios/{id}/inventarios', {
    responses: {
      '200': {
        description: 'ProductoInventario.Inventarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventarios, {partial: true}),
        },
      },
    })
    inventarios: Partial<Inventarios>,
    @param.query.object('where', getWhereSchemaFor(Inventarios)) where?: Where<Inventarios>,
  ): Promise<Count> {
    return this.productoInventarioRepository.inventarios(id).patch(inventarios, where);
  }

  @del('/producto-inventarios/{id}/inventarios', {
    responses: {
      '200': {
        description: 'ProductoInventario.Inventarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inventarios)) where?: Where<Inventarios>,
  ): Promise<Count> {
    return this.productoInventarioRepository.inventarios(id).delete(where);
  }
}
