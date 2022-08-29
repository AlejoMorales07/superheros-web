import { IFormElements } from 'src/interfaces/formElements.interface'

export interface IProps {
  type: string
  element: any
  FormItems: JSX.Element
  formElements: IFormElements[]
  afterUpdate: () => void
}
