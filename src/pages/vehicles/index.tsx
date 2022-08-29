import { Card, Empty } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Create from 'src/components/Create'
import Delete from 'src/components/Delete'
import Form from 'src/components/Form'
import Layout from 'src/components/Layout'
import Update from 'src/components/Update'
import { IVehicles } from 'src/interfaces/interfaces'
import { formElements } from './components/formElements'

export default function index() {
  const [vehicles, setVehicles] = useState<IVehicles[]>([] as IVehicles[])
  const router = useRouter()
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const data = await (await fetch(`http://localhost:3000/api${router.pathname}`)).json()
    setVehicles(data)
  }

  return (
    <Layout title="Vehículos" create={<Create type={router.pathname} FormItems={<Form formElements={formElements} />} afterCreate={getData} />}>
      <div className="container">
        {vehicles.length !== 0 ? (
          <div className="containerData">
            {vehicles.map(vehicle => (
              <Card>
                <h1>{vehicle.name}</h1>
                <p>{`Tipo: ${vehicle.type}`}</p>
                <div className="buttons">
                  <Update
                    type={router.pathname}
                    element={vehicle}
                    FormItems={<Form formElements={formElements} />}
                    formElements={formElements}
                    afterUpdate={getData}
                  />
                  <Delete type={router.pathname} element={vehicle} afterDelete={getData} />
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
