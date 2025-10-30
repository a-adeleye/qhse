import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {environment} from '@env';
import {ResponseModel} from '@shared/models/response.model';
import {concatMap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class SharePointService {

  constructor(private http: HttpClient) {
  }

  getSiteUsers(): Observable<any> {
    const apiUrl = `${environment.siteUrl}/siteusers`;
    const headers = new HttpHeaders({
      'Accept': 'application/json;odata=verbose'
    });
    return this.http.get<any>(apiUrl, { headers }).pipe(
      map(res => res.d?.results ?? [])
    );
  }

  getListItems<T>(listName: string, filter: string | null = null): Observable<ResponseModel<T>> {
    const endpoint = `${environment.siteUrl}/lists/getbytitle('${listName}')/items${filter ?? ''}`;
    return this.http.get<ResponseModel<T>>(endpoint);
  }

  addListItem(listName: string, data: Record<string, unknown>): Observable<any> {
    const endpoint = `${environment.siteUrl}/lists/getbytitle('${listName}')/items`;
    return this.http.post(endpoint, data);
  }

  addDeviceToken(data: Record<string, unknown>): Observable<any> {
    const endpoint = `${environment.siteUrl}/lists/getbytitle('FCM List')/items`;
    return this.http.post(endpoint, data);
  }

  updateListItem(
    listName: string,

    itemId: number,
    data: Record<string, unknown>
  ): Observable<any> {
    const endpoint = `${environment.siteUrl}/lists/getbytitle('${listName}')/items(${itemId})`;
    const headers = new HttpHeaders({
      'Accept': 'application/json;odata=nometadata',
      'Content-Type': 'application/json;odata=nometadata',
      'IF-MATCH': '*'
    });
    return this.http.patch(endpoint, data, {headers});
  }

  getListItemById<T>(
    listName: string,
    id: number,
    select: string = ''
  ): Observable<T> {
    const $select = select ? `?$select=${select}` : '';
    const url = `${environment.siteUrl}/lists/getbytitle('${listName}')/items(${id})${$select}`;
    return this.http.get<T>(url);
  }

  uploadAttachment(
    listName: string,
    itemId: number,
    file: File
  ): Observable<any> {
    const url = `${environment.siteUrl}/lists/getbytitle('${listName}')/items(${itemId})/AttachmentFiles/add(FileName='${file.name}')`;
    return this.getFormDigest().pipe(
      concatMap(digest => {
          return this.http.post(url, file, {
            headers: new HttpHeaders({
              'Accept': 'application/json;odata=nometadata',
              'X-RequestDigest': digest
            })
          })
        }
      )
    );
  }

  batchCreateWithAttachment(
    listName: string,
    itemPayload: any,
    file: File
  ): Observable<any> {
    const batchId = `batch_${crypto.randomUUID()}`;
    const changeId = `changeset_${crypto.randomUUID()}`;
    return this.getFormDigest().pipe(
      concatMap(digest => {
        const part1 = [
          `--${changeId}`,
          'Content-Type: application/http',
          'Content-Transfer-Encoding: binary',
          'Content-ID: 1',
          '',
          `POST ${environment.siteUrl}/_api/web/lists/getbytitle('${listName}')/items HTTP/1.1`,
          'Content-Type: application/json;odata=nometadata',
          '',
          JSON.stringify(itemPayload),
          ''
        ].join('\r\n');

        const part2 = [
          `--${changeId}`,
          'Content-Type: application/http',
          'Content-Transfer-Encoding: binary',
          '',
          `POST ${environment.siteUrl}/_api/web/lists/getbytitle('${listName}')/items(@{1}/ID)/AttachmentFiles/add(FileName='${file.name}') HTTP/1.1`,
          'Content-Type: application/octet-stream',
          '',
          file,
          ''
        ].join('\r\n');

        const body = [
          `--${batchId}`,
          `Content-Type: multipart/mixed; boundary=${changeId}`,
          '',
          part1,
          part2,
          `--${changeId}--`,
          `--${batchId}--`
        ].join('\r\n');

        const headers = new HttpHeaders({
          'Content-Type': `multipart/mixed;boundary=${batchId}`,
          'X-RequestDigest': digest,
          Accept: 'application/json;odata=nometadata'
        });

        return this.http.post(`${environment.siteUrl}/_api/$batch`, body, {headers});
      })
    );
  }

  private getFormDigest(): Observable<string> {
    return this.http
      .post<{ d: { GetContextWebInformation: { FormDigestValue: string } } }>(
        'https://jetexfs.sharepoint.com/sites/CorporateImage/_api/contextinfo',
        {},
        {headers: new HttpHeaders({Accept: 'application/json;odata=nometadata'})}
      )
      .pipe(map(res => res.d.GetContextWebInformation.FormDigestValue));
  }

}
