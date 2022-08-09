import moment from "moment";
import { Client, GenericObject } from "../shared/models";

export const getId = (arr: GenericObject[]): number => {
    const id = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1

    return id
}

export const responseTypes = [
    {
        value: 'text',
        label: 'Text Field'
    },
    {
        value: 'options',
        label: 'Options Field'
    },
    {
        value: 'multiOption',
        label: 'Multiple Options'
    },
    {
        value: 'textarea',
        label: 'TextArea Field'
    }
]

export const fakeUsers = [
    {
        id: 1,
        fullName: 'John Doe',
        age: 25,
        createdAt: moment().format(),
        updatedAt: moment().format()
    },
    {
        id: 2,
        fullName: 'John Jones',
        age: 30,
        createdAt: moment().format(),
        updatedAt: moment().format()
    }
]
