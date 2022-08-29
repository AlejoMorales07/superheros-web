import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, message, Modal } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import React, { FC, useRef } from 'react'
import { IProps } from './props.interface'

const CreateComponent: FC<IProps> = props => {
  const { type, FormItems, afterCreate } = props
  const formRef = useRef<FormInstance>(null)

  const onOk = async () => {
    const data = await formRef.current?.validateFields()
    try {
      await fetch(`http://localhost:3000/api${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(() => {
        message.success('Vehículo creado')
        afterCreate()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const modal = () => {
    Modal.confirm({
      title: `Crear ${type === '/vehicles' ? 'Vehículo' : type === '/superpowers' ? 'Super Poder' : 'Mutante'}`,
      content: <Form ref={formRef}>{FormItems}</Form>,
      onOk: onOk,
      cancelText: 'Cancelar',
      okCancel: true,
      centered: true,
      icon: false
    })
  }
  return <Button onClick={modal} shape="circle" icon={<PlusOutlined />} />
}

export default React.memo(CreateComponent)
