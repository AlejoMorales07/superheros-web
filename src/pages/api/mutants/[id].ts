import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      return res.status(200).json('Get a mutant')
    case 'PUT':
      return res.status(200).json('Update a mutant')
    case 'DELETE':
      return res.status(200).json('Delete a mutant')
    default:
      return res.status(400).json('Método no permitido')
  }
}
