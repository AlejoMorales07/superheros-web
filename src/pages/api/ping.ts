// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '../../utils/database'
import { sequelize } from '../../utils/database/database'

type Data = {
  message: string
  time: string
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await connection?.query('SELECT NOW()')
  console.log(response)
  res.status(200).json({ message: 'pong', time: response?.rows[0].now })
}
