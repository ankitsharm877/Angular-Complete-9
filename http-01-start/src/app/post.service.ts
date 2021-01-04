import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import  { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  loadedPosts: Post[] =  [];
  error = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost(postData: Post) {
    // Send Http request
    this.http.post<Post>('https://jsonplaceholder.typicode.com/posts',postData, {
      observe: 'response'
    })
      .subscribe(data => {
        console.log(data);
      }, error => {
        this.error.next(error);
      });
  ;
  }

  fetchPosts() {
    // Send Http request
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts',{
          headers: new HttpHeaders({
            'accept': 'application/json'
          }),
          params : new HttpParams().set('print','pretty'),
          observe : 'body'
        })
        .pipe(map((res: Post[]) => {
            const posts: Post[] = [];
            for (const key in res) {
              posts.push({ ...res[key]});
            }
            return posts;
          }),
          catchError(errorRes => {
            //send to analytics server
            return throwError(errorRes);
          }));
  }

  deletePost() {
    return this.http.delete('https://jsonplaceholder.typicode.com/posts/1', {
      observe: 'events',
      responseType: 'json'
    }).pipe( 
        tap(event => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            console.log(event);
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
    );
  }
}
