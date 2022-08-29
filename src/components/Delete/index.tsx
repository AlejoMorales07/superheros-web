import { DeleteOutlined } from '@ant-design/icons'
import { Button, message, Modal } from 'antd'
import React, { FC } from 'react'
import { IProps } from './props.interface'

const DeleteComponent: FC<IProps> = props => {
  const { type, element, afterDelete } = props

  const onOk = async () => {
    try {
      await fetch(`http://localhost:3000/api${type}/${element.id}`, {
        method: 'DELETE'
      }).then(() => {
        message.success(`${type === '/vehicles' ? 'Vehículo' : type === '/superpowers' ? 'Super Poder' : 'Mutante'} eliminado`)
        afterDelete()
      })
    } catch (error) {
      console.log(error)
    }
  }

  const modal = () => {
    Modal.confirm({
      title: `Desea eliminar ${element.name}`,
      onOk: onOk,
      cancelText: 'Cancelar',
      okCancel: true,
      centered: true,
      icon: false
    })
  }
  return <Button danger onClick={modal} shape="circle" icon={<DeleteOutlined />} />
}

export default React.memo(DeleteComponent)
