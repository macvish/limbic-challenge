import { GenericObject } from "../shared/models";

export const getId = (arr: GenericObject[]): number => {
    const id = arr.length > 0 ? arr[arr.length - 1].id + 1 : 1

    return id
}
