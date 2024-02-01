import { Injectable } from '@angular/core';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }
  posts:Post[]=[];

  addPost(title:string,content:string){
    const postData: Post ={title:title,content:content};
    this.posts.push(postData);
    console.log(postData);
  }
  getPosts(){
    return [...this.posts];
  }
}
