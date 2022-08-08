import { GenericObject } from "../shared/models";

export const getId = (arr: GenericObject[]): number => {
    const id = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1

    return id
}

export const responseTypes = [
    {
        value: 'input',
        label: 'Input Field'
    },
    {
        value: 'select',
        label: 'Select Field'
    },
    {
        value: 'radio',
        label: 'Radio Field'
    },
    {
        value: 'checkbox',
        label: 'Checkbox Field'
    },
    {
        value: 'textarea',
        label: 'TextArea Field'
    }
]
