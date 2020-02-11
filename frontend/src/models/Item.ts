export default class Item {
  public id?: string;
  public title: string;
  public tempId?: string;

  constructor(title: string, id?: string, tempId?: string) {
    this.id = id;
    this.title = title;
    this.tempId = tempId;
  }
}
