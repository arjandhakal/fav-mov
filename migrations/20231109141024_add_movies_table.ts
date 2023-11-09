import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('movies', table => {
    table.increments('id').primary()
    table.string('title').notNullable()
    table.text('description')
    table
      .integer('user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('movie')
}
