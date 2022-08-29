import { IFormElements } from 'src/interfaces/interfaces'

export interface IProps {
  type: string
  element: any
  FormItems: JSX.Element
  formElements: IFormElements[]
  afterUpdate: () => void
}
