import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject, map } from 'rxjs';
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
  
  //sdgx8btyLMarGZKi
  addPost(title:string,content:string){
    const postData: Post ={id:"", title:title,content:content};
    
    this.http.post<{message:string, postId:String}>("http://localhost:3000/api/posts", postData).subscribe((responseData)=>{
     console.log(responseData.message);
     const id = responseData.postId;
     postData.id= id.toString();
     this.posts.push(postData);
     this.postsUpdated.next([...this.posts]);

    });
    
  }
  getPosts(){
    // return [...this.posts];

    this.http.get<{message:string, posts:any}>("http://localhost:3000/api/posts")
    .pipe(map((postData)=>{
      return postData.posts.map((post: { title: any; _id: any; content: any; })=>{
        return {
          title:post.title,
          id:post._id,
          content:post.content
        }
      })
    }))
    .subscribe((transformedPosts)=>{
      this.posts= transformedPosts;
      console.log(transformedPosts);
      console.log(this.posts);
      this.postsUpdated.next([...this.posts]);

    });
  }

  deletePost(id:string){
   // console.log(id);
    this.http.delete("http://localhost:3000/api/posts/"+id)
    .subscribe(()=>{
      //console.log("post successfully deleted!");
      const updatedPosts = this.posts.filter(post=>{
        console.log("post.id s",post.id);
        console.log("id ",id);
        return post.id !== id});
      this.posts=updatedPosts;
      console.log(this.posts);
      this.postsUpdated.next([...this.posts]);
    })
  }
}
