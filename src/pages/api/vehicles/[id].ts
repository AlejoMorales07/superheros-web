import { NextApiRequest, NextApiResponse } from 'next'
import { pool } from 'src/utils/database'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req
  switch (method) {
    case 'GET':
      try {
        const text = 'SELECT * FROM vehicles WHERE id = $1'
        const values = [query.id]
        const response = await pool?.query(text, values)
        if (response?.rows.length === 0) {
          return res.status(404).json('Vehículo no encontrado')
        }
        return res.status(200).json(response?.rows[0])
      } catch (error: any) {
        return res.status(500).json(error.message)
      }
    case 'PUT':
      try {
        const { name, type } = body
        const text = 'UPDATE vehicles SET name = $2, type = $3 WHERE id = $1 RETURNING *'
        const values = [query.id, name, type]
        const response = await pool?.query(text, values)
        if (response?.rows.length === 0) {
          return res.status(404).json('Vehículo no encontrado')
        }
        return res.status(200).json(response?.rows[0])
      } catch (error: any) {
        return res.status(500).json(error.message)
      }
    case 'DELETE':
      try {
        const text = 'DELETE FROM vehicles WHERE id = $1 RETURNING *'
        const values = [query.id]
        const response = await pool?.query(text, values)
        if (response?.rows.length === 0) {
          return res.status(404).json('Vehículo no encontrado')
        }
        return res.status(200).json(response?.rows[0])
      } catch (error: any) {
        return res.status(500).json(error.message)
      }
    default:
      return res.status(400).json('Método no permitido')
  }
}
