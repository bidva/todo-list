import Item from './Item';

export default class List {
  public id: string;
  public items: Array<Item> = [];
  constructor(id: string) {
    this.id = id;
  }
}
