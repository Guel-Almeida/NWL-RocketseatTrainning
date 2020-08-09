import path from 'path';
// usamos o module.exports porque o knex nao entende o export default ainda
module.exports = { 
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src','database','database.sqlite')
    },
    migrations:{
        directory:path.resolve(__dirname,'src','database','migrations')
    },
    useNullAsDefault:true
}