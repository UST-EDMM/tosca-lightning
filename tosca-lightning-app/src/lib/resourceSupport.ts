export interface IdentifiableResource {
  id: string;
}

export interface ResourceMap<T extends IdentifiableResource> {
  [id: string]: T
}

export function createResourceMap<T extends IdentifiableResource>(items: T[]): ResourceMap<T> {
  return items.reduce((result: ResourceMap<T>, item: T) => {
    if (item.id) {
      result[item.id] = item;
    }
    return result;
  }, {});
}
