import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model'
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit{
  //dummy posts
  // posts=[
  //   {title:"first post", content:"the first post\'s content"},
  //   {title:"second post", content:"the second post\'s content"},
  //   {title:"third post", content:"the third post\'s content"}
  // ];

  posts:Post[]=[];
  ngOnInit(): void {
    this.postSer.getPosts();
    this.postSer.getPostsListener().subscribe((posts:Post[])=>{
      this.posts=posts;

    });
  }

  constructor(private postSer:PostService){

  }


}

