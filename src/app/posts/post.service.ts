import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }
  private posts:Post[]=[];
  private postsUpdated = new Subject<Post[]>();

  getPostsListener(){
    return this.postsUpdated.asObservable();
  }
  

  addPost(title:string,content:string){
    const postData: Post ={title:title,content:content};
    this.posts.push(postData);
    this.postsUpdated.next([...this.posts]);
  }
  getPosts(){
    return [...this.posts];
  }
}
