import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  private posts:Post[]=[];
  private postsUpdated = new Subject<Post[]>();

  getPostsListener(){
    return this.postsUpdated.asObservable();
  }
  

  addPost(title:string,content:string){
    const postData: Post ={ title:title,content:content};
    this.posts.push(postData);
    this.postsUpdated.next([...this.posts]);
  }
  getPosts(){
    // return [...this.posts];

    this.http.get<{message:string, posts:Post[]}>("http://localhost:3000/api/posts").subscribe((postData)=>{
      this.posts= postData.posts;
      console.log(postData.posts);
      console.log(this.posts);
      this.postsUpdated.next([...this.posts]);

    });
  }
}
