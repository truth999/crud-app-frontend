import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsUrl = environment.apiUrl + 'posts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get<any>(this.postsUrl);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post<any>(this.postsUrl, post, this.httpOptions);
  }

  getPost(postId: string): Observable<any> {
    return this.http.get<any>(`${this.postsUrl}/${postId}`);
  }

  updatePost(postId: string, post: Post): Observable<any> {
    return this.http.put<any>(`${this.postsUrl}/${postId}`, post, this.httpOptions);
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.postsUrl}/${postId}`, this.httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message));
  }
}
