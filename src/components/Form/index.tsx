import { Form, Input, Select } from 'antd'
import React, { FC } from 'react'
import { IProps } from './props.interface'

const FormComponent: FC<IProps> = props => {
  const { formElements } = props

  return (
    <>
      {formElements.map((element, i) => {
        let children: JSX.Element = <></>
        switch (element.type) {
          case 'select':
            children = (
              <Select
                placeholder={`Seleccione el ${element.label}`}
                filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
              >
                {element.data?.map((e: { id: string; name: string }) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
            )
            break
          case 'selectMultiple':
            children = (
              <Select
                mode="multiple"
                placeholder={`Seleccione los ${element.label}`}
                filterOption={(input, option) => (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())}
              >
                {element.data?.map((e: { id: string; name: string }) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
            )
            break
          default:
            children = <Input placeholder={`Escribe el ${element.label}`} autoComplete="off" />
            break
        }

        return (
          <Form.Item label={element.label} key={element.name} name={element.name} rules={[{ required: true, message: 'Campo requerido' }]}>
            {children}
          </Form.Item>
        )
      })}
    </>
  )
}

export default React.memo(FormComponent)
