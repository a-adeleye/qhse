export interface ItemModel {
  Id: number;
  UniformItem: { Title: string, Id: string };
  Title: string;
}

export interface UserItemModel {
  Id: number;
  ItemType: { Title: string, Id: number };
  Quantity: number;
  AvailableQuantity: number;
  InLaundry?: number;
  LastIssueDate: string;
  NextIssueDate: string;
  ReceivedDate: string;
  Readyforcollectiondate: string;
  CollectionDate: string;
  Remarks: string;
  Title: string;
  UniformCode: string;
  Status: string;
  Collected: string;
  Uniform: { Title: string };
  UniformItemId: { Title: string, Id: string };
}
