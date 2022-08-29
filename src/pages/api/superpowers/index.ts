import { NextApiRequest, NextApiResponse } from 'next'
import { pool } from 'src/utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM superpowers'
        const response = await pool?.query(query)
        return res.status(200).json(response?.rows)
      } catch (error: any) {
        return res.status(400).json(error.message)
      }
    case 'POST':
      try {
        const { name } = body
        const query = 'INSERT INTO superpowers(name) VALUES($1) RETURNING *'
        const values = [name]
        const response = await pool?.query(query, values)
        return res.status(200).json(response?.rows[0])
      } catch (error: any) {
        return res.status(400).json(error.message)
      }
    case 'DELETE':
      try {
        const query = 'DELETE FROM superpowers RETURNING *'
        const response = await pool?.query(query)
        return res.status(200).json(response?.rows)
      } catch (error: any) {
        return res.status(400).json(error.message)
      }
    default:
      return res.status(400).json('Método no permitido')
  }
}
