exports.up = function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('email', 255).notNullable()
        table.string('password', 255).notNullable()
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('users')
}
