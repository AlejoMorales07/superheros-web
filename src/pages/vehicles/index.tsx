import React from 'react'
import Layout from 'src/components/Layout'
import { IProps } from './props.interface'

export default function index(props: IProps) {
  return (
    <Layout title="Vehículos">
      <div>hola mundo</div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const vehicles = await (await fetch('http://localhost:3000/api/vehicles')).json()
  return { props: { vehicles } }
}
