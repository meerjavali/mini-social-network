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
  addPost( title:string,content:string,image:File){
    // const postData: Post ={id:"", title:title,content:content};
    console.log("check in addPost",  title,content,image);
    const postData = new FormData();

    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image,title);
    
    
   return this.http.post<{message:string, post:Post}>("http://localhost:3000/api/posts", postData);
    // .subscribe((responseData)=>{
    //  console.log(responseData.message);

    // //  const id = responseData.postId;
    // //  postData.id= id.toString();
    // const post:Post ={id: responseData.post.id, title:title, content:content , imagePath: responseData.post.imagePath }
  
    //  this.posts.push(post);
    //  this.postsUpdated.next([...this.posts]);

    // });
    
  }

  updatePost(id:string, title:string, content:string, image: File | string){
    let postData: FormData | Post;
    if(typeof(image)==='object'){
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title)

    }
    else{
      postData ={
        id: id,
        title: title,
        content: content,
        imagePath: image
      }

    }
    return this.http.put<{message:string}>("http://localhost:3000/api/posts/"+id, postData);
    

  }
  getPost(postId:string){
    //we will get the post from mongo db not from local 
   //return {...this.posts.find(p=> p.id == postId)};
 console.log("check meer in get post");
   return this.http.get<{_id:string, title:string, content:string, imagePath:string}>("http://localhost:3000/api/posts/"+postId);

  }
  getPosts(){
    // return [...this.posts];
    console.log("check meer get posts");
    this.http.get<{message:string, posts:any}>("http://localhost:3000/api/posts")
    .pipe(map((postData)=>{
      return postData.posts.map((post: { title: any; _id: any; content: any, imagePath:string })=>{
        return {
          title:post.title,
          id:post._id,
          content:post.content,
          imagePath: post.imagePath
        }
      })
    }))
    .subscribe((transformedPosts)=>{
      this.posts= transformedPosts;
      console.log("this is post list ",transformedPosts);
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
