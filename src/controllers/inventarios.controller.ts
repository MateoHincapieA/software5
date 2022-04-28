import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Inventarios} from '../models';
import {InventariosRepository} from '../repositories';

export class InventariosController {
  constructor(
    @repository(InventariosRepository)
    public inventariosRepository : InventariosRepository,
  ) {}

  @post('/inventarios')
  @response(200, {
    description: 'Inventarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Inventarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventarios, {
            title: 'NewInventarios',
            exclude: ['codigo_inventario'],
          }),
        },
      },
    })
    inventarios: Omit<Inventarios, 'codigo_inventario'>,
  ): Promise<Inventarios> {
    return this.inventariosRepository.create(inventarios);
  }

  @get('/inventarios/count')
  @response(200, {
    description: 'Inventarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Inventarios) where?: Where<Inventarios>,
  ): Promise<Count> {
    return this.inventariosRepository.count(where);
  }

  @get('/inventarios')
  @response(200, {
    description: 'Array of Inventarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Inventarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Inventarios) filter?: Filter<Inventarios>,
  ): Promise<Inventarios[]> {
    return this.inventariosRepository.find(filter);
  }

  @patch('/inventarios')
  @response(200, {
    description: 'Inventarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventarios, {partial: true}),
        },
      },
    })
    inventarios: Inventarios,
    @param.where(Inventarios) where?: Where<Inventarios>,
  ): Promise<Count> {
    return this.inventariosRepository.updateAll(inventarios, where);
  }

  @get('/inventarios/{id}')
  @response(200, {
    description: 'Inventarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inventarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Inventarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Inventarios>
  ): Promise<Inventarios> {
    return this.inventariosRepository.findById(id, filter);
  }

  @patch('/inventarios/{id}')
  @response(204, {
    description: 'Inventarios PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inventarios, {partial: true}),
        },
      },
    })
    inventarios: Inventarios,
  ): Promise<void> {
    await this.inventariosRepository.updateById(id, inventarios);
  }

  @put('/inventarios/{id}')
  @response(204, {
    description: 'Inventarios PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() inventarios: Inventarios,
  ): Promise<void> {
    await this.inventariosRepository.replaceById(id, inventarios);
  }

  @del('/inventarios/{id}')
  @response(204, {
    description: 'Inventarios DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.inventariosRepository.deleteById(id);
  }
}
