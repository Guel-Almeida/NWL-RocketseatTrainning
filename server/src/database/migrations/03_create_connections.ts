import Knex from 'knex';


export async function up(knex: Knex){
    return knex.schema.createTable('connections',table =>{
        table.increments('id').primary();
       
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE') // caso haja mudanca no id do user ele atualiza para todos
        .onDelete('CASCADE') // caso user seja deleta suas conexoes sao eliminadas 

        table.timestamp('created_at')
        .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    });
}

export async function down(knex: Knex){
        return knex.schema.dropTable('class_schedule');
}