import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FbCreateresponse, Post } from './interfaces';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}
  create(post: Post): Observable<Post> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post).pipe(
      map((response: FbCreateresponse) => {
        return { ...post, id: response.name, date: new Date(post.date) };
      })
    );
  }
  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`).pipe(
      map((respose: { [key: string]: any }) => {
        return Object.keys(respose).map((key) => ({
          ...respose[key],
          id: key,
          date: new Date(respose[key].date),
        }));
      })
    );
  }
}
