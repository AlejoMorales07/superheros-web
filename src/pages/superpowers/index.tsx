import { Card, Empty } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Create from 'src/components/Create'
import Delete from 'src/components/Delete'
import Form from 'src/components/Form'
import Layout from 'src/components/Layout'
import Update from 'src/components/Update'
import { ISuperPowers } from 'src/interfaces/interfaces'

import { formElements } from './components/formElements'

export default function index() {
  const [superpowers, setSuperpowers] = useState<ISuperPowers[]>([] as ISuperPowers[])
  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const data = await (await fetch(`http://localhost:3000/api${router.pathname}`)).json()
    setSuperpowers(data)
  }

  return (
    <Layout title="Super Poderes" create={<Create type={router.pathname} FormItems={<Form formElements={formElements} />} afterCreate={getData} />}>
      <div className="container">
        {superpowers.length !== 0 ? (
          <div className="containerData">
            {superpowers.map(superpower => (
              <Card>
                <h1>{superpower.name}</h1>
                <div className="buttons">
                  <Update
                    type={router.pathname}
                    element={superpower}
                    FormItems={<Form formElements={formElements} />}
                    formElements={formElements}
                    afterUpdate={getData}
                  />
                  <Delete type={router.pathname} element={superpower} afterDelete={getData} />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </div>
    </Layout>
  )
}
