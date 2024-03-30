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
  private postsUpdated = new Subject<{posts: Post[], postCount:number}>();

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
        imagePath: image,
        creator: ''
      }

    }
    return this.http.put<{message:string}>("http://localhost:3000/api/posts/"+id, postData);
    

  }
  getPost(postId:string){
    //we will get the post from mongo db not from local 
   //return {...this.posts.find(p=> p.id == postId)};
 console.log("check meer in get post");
   return this.http.get<{_id:string, title:string, content:string, imagePath:string, creator: string}>("http://localhost:3000/api/posts/"+postId);

  }
  getPosts(pageSize:number , page:number){
    // return [...this.posts];
   // console.log("check meer get posts");
   const queryParams = `postSize=${pageSize}&page=${page}`
    this.http.get<{message:string, posts:any, maxPosts:number}>("http://localhost:3000/api/posts?"+queryParams)
    .pipe(map((postData)=>{
      // lecture 91 to understand this
      return { posts: postData.posts.map((post: { title: any; _id: any; content: any, imagePath:string, creator:string })=>{
        return {
          title:post.title,
          id:post._id,
          content:post.content,
          imagePath: post.imagePath,
          creator: post.creator
        }
      }),
      maxPosts:postData.maxPosts
    }
    }))
    .subscribe((transformedPostData)=>{
      this.posts= transformedPostData.posts;
      console.log(this.posts);
      //console.log("this is post list ",transformedPostData);
      this.postsUpdated.next({
        posts:[...this.posts], 
        postCount: transformedPostData.maxPosts
      });

    });
  }

  deletePost(id:string){
   // console.log(id);
   return this.http.delete("http://localhost:3000/api/posts/"+id);
    // .subscribe(()=>{
    //   //console.log("post successfully deleted!");
    //   const updatedPosts = this.posts.filter(post=>{
    //     console.log("post.id s",post.id);
    //     console.log("id ",id);
    //     return post.id !== id});
    //   this.posts=updatedPosts;
    //   console.log(this.posts);
    //   this.postsUpdated.next({[...this.posts]});
    // })
  }
}
