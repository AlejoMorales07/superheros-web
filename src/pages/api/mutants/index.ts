import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req
  switch (method) {
    case 'GET':
      return res.status(200).json('Get')
    case 'POST':
      return res.status(200).json('Post')
    case 'DELETE':
      return res.status(200).json('Delete')
    default:
      return res.status(400).json('Método no permitido')
  }
}
