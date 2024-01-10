import {
  FastifyBaseLogger,
  FastifyPluginAsync,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerBase,
  RawServerDefault,
} from 'fastify'

import { EnvSchemaType } from '../schemas/dotenv'
import knex from 'knex'

declare module 'fastify' {
  type UserDataSource = {
    findUser: (email: string) => Promise<QueryResult<any>>
  }

  export interface FastifyRequest {
    generateToken: (payload: Record<string, any>) => string
  }
  export interface FastifyInstance<
    RawServer extends RawServerBase = RawServerDefault,
    RawRequest extends
      RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
    RawReply extends
      RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
    Logger = FastifyBaseLogger,
  > {
    knex: knex
    config: EnvSchemaType
    usersDataSource: UserDataSource
    authenticate: (request: FastifyRequest, reply: FastifyReply) => void
  }
}
