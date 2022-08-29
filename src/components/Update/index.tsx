import { EditOutlined } from '@ant-design/icons'
import { Button, Form, message, Modal } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import React, { FC, useRef } from 'react'
import { IProps } from './props.interface'

const UpdateComponent: FC<IProps> = props => {
  const { type, FormItems, formElements, afterUpdate, element } = props
  const formRef = useRef<FormInstance>(null)

  const onOk = async () => {
    const data = await formRef.current?.validateFields()
    try {
      await fetch(`http://localhost:3000/api${type}/${element.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).then(() => {
        message.success('Vehículo   actualizado')
        afterUpdate()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const modal = () => {
    for (const currentFormElement of formElements) {
      switch (currentFormElement.type) {
        case 'select':
          if (Object.keys(element[currentFormElement.name] as object).findIndex(e => e === '_id') !== -1) {
            element[currentFormElement.name] = element[currentFormElement.name]?._id
          }
          break
        case 'selectMultiple':
          if (element[currentFormElement.name].length > 0) {
            for (let l = 0; l < element[currentFormElement.name].length; l++) {
              if (element[currentFormElement.name][l] !== null) {
                if (Object.keys(element[currentFormElement.name][l] as object).findIndex(e => e === '_id') !== -1) {
                  element[currentFormElement.name][l] = element[currentFormElement.name][l]?._id
                }
              }
            }
          }
          break
      }
    }
    Modal.confirm({
      title: `Actualizar ${type === '/vehicles' ? 'Vehículo' : type === '/superpowers' ? 'Super Poder' : 'Mutante'}`,
      content: (
        <Form ref={formRef} initialValues={element}>
          {FormItems}
        </Form>
      ),
      onOk: onOk,
      cancelText: 'Cancelar',
      okCancel: true,
      centered: true,
      icon: false
    })
  }
  return <Button onClick={modal} shape="circle" icon={<EditOutlined />} />
}

export default React.memo(UpdateComponent)
