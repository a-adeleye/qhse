import {Injectable, signal} from '@angular/core';
import {SharePointService} from '@shared/services/sharepoint/sharepoint.service';
import {AuthService} from '@shared/services/auth/auth.service';
import {ItemModel, UserItemModel} from '@shared/models/item.model';
import {LocalStorageRefService} from '@shared/services/local-storage-ref.service';
import {BehaviorSubject, map, Observable, of} from 'rxjs';
import {concatMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ItemsService {
  itemTypes = signal<ItemModel[]>([]);
  subject = new BehaviorSubject<string | null>(null);

  constructor(private sharepointService: SharePointService,
              private localStorageRefService: LocalStorageRefService,
              private authService: AuthService) {
  }

  getUserItems() {
    const today = new Date().toISOString();
    const filter =
      `Employee/EMail eq '${this.authService.currentUser?.username}' and ` +
      `NextIssueDate gt datetime'${today}'`;
    const endpoint =
      `?$select=Id,Title,Employee/Id,Employee/EMail,` +
      `ItemType/Title,ItemType/Id,Quantity,LastIssueDate,NextIssueDate,Remarks,UniformCode` +
      `&$expand=Employee,ItemType` +
      `&$filter=${encodeURIComponent(filter)}`;
    return this.sharepointService
      .getListItems<UserItemModel>('Uniform Distribution Items', endpoint);
  }

  getDamagedOrLostItems() {
    const filter =
      `Employee/EMail eq '${this.authService.currentUser?.username}'`;
    const endpoint =
      `?$select=Id,Employee/Id,Employee/EMail,Uniform/Title,` +
      `ItemType/Title,ItemType/Id,Quantity,IncidentDate&Reason&$expand=Employee,ItemType,Uniform` +
      `&$filter=${encodeURIComponent(filter)}`;
    return this.sharepointService
      .getListItems<UserItemModel>('Uniform Loss or Damage', endpoint);
  }

  getLaundryItems() {
    const filter =
      `Employee/EMail eq '${this.authService.currentUser?.username}' and ` +
      `Collected eq 0`;
    const endpoint =
      `?$select=Id,Employee/Id,Employee/EMail,` +
      `ItemType/Title,ItemType/Id,Quantity,Collected,Status,ReceivedDate,Readyforcollectiondate,CollectionDate&Reason&$expand=Employee,ItemType` +
      `&$filter=${encodeURIComponent(filter)}`;
    return this.sharepointService
      .getListItems<UserItemModel>('Employee Laundry Log', endpoint);
  }

  getAllItems() {
    const endpoint =
      `?$select=Id,Title,UniformItem/Id,UniformItem/Title&$expand=UniformItem`;
    return this.sharepointService
      .getListItems<ItemModel>('Uniform Item Type', endpoint);
  }

  requestUniform(data: Record<string, unknown>) {
    return this.sharepointService.addListItem('Uniform Request', data);
  }

  sendToLaundry(data: Record<string, unknown>) {
    return this.sharepointService.addListItem('Employee Laundry Log', data);
  }

  addListItemWithAttachment(listName: string, data: Record<string, unknown>, file: File) {
    return this.sharepointService.batchCreateWithAttachment(listName, data, file);
  }

  uploadAttachment(
    file: File
  ): Observable<any> {
    return this.sharepointService.uploadAttachment('Uniform Distribution Items', 1156, file);
  }

  addDamagedItem(
    uniformItemId: number,
    damagePayload: Record<string, unknown>,
    attachment?: File
  ): Observable<any> {
    return this.sharepointService
      .getListItemById<{ d: { Quantity: number } }>(
        'Uniform Distribution Items',
        uniformItemId,
        'Quantity'
      )
      .pipe(
        map(({d: {Quantity}}) => {
          if (Quantity < 1) {
            throw new Error('Oops! You don’t have any items left to report as damaged.');
          }
          const damagedQuantity = damagePayload['Quantity'] as number;
          if (Quantity < damagedQuantity) {
            throw new Error('Invalid quantity reported. Please check your input and try again.');
          }
          return Quantity - damagedQuantity;
        }),
        concatMap(newQty =>
          this.sharepointService.addListItem('Uniform Loss or Damage', damagePayload)
            .pipe(map((res: any) => ({newQty, id: res.d.Id})))
        ),
        concatMap(({newQty, id}) =>
          attachment
            ? this.sharepointService.uploadAttachment('Uniform Loss or Damage', id, attachment)
              .pipe(map(() => newQty)) : of(newQty)
        ),
        concatMap(newQty =>
          this.sharepointService.updateListItem('Uniform Distribution Items', uniformItemId, {Quantity: newQty})
        )
      );
  }

  collectItemFromLaundry(itemId: number) {
    return this.sharepointService.updateListItem('Employee Laundry Log', itemId, {
      Collected: true,
      CollectionDate: new Date().toISOString()
    });
  }

  sendUpdate(message: string) {
    this.subject.next(message);
  }

  getUpdate() {
    return this.subject.asObservable();
  }
}
