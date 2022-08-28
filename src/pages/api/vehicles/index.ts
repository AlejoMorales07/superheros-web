import { NextApiRequest, NextApiResponse } from 'next'
import { pool } from 'src/utils/database'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        const query = 'SELECT * FROM vehicles'
        const response = await pool?.query(query)
        return res.status(200).json(response?.rows)
      } catch (error: any) {
        return res.status(400).json(error.message)
      }
    case 'POST':
      try {
        const { name, type } = body
        const query = 'INSERT INTO vehicles(name, type) VALUES($1, $2) RETURNING *'
        const values = [name, type]
        const response = await pool?.query(query, values)
        return res.status(200).json(response?.rows[0])
      } catch (error: any) {
        return res.status(400).json(error.message)
      }
    case 'DELETE':
      try {
        const query = 'DELETE FROM vehicles RETURNING *'
        const response = await pool?.query(query)
        console.log(response)
        return res.status(200).json(response?.rows)
      } catch (error: any) {
        return res.status(400).json(error.message)
      }
    default:
      return res.status(400).json('Método no permitido')
  }
}
