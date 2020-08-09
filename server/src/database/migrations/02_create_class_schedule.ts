import Knex from 'knex';


export async function up(knex: Knex){
    return knex.schema.createTable('class_schedule',table =>{
        table.increments('id').primary();
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table.integer('class_id')
        .notNullable()
        .references('id')
        .inTable('classes')
        .onUpdate('CASCADE') // caso haja mudanca no id do user ele atualiza para todos
        .onDelete('CASCADE') // caso user seja deleta suas conexoes sao eliminadas 
    });
}

export async function down(knex: Knex){
        return knex.schema.dropTable('class_schedule');
}