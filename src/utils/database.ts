import { Pool } from 'pg'

let pool: Pool | undefined

if (!pool) {
  pool = new Pool({
    user: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'mutantsdb'
  })
}

export { pool }
