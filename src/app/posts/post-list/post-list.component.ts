import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post.model'
import { PostService } from '../post.service';
import { PageEvent } from '@angular/material/paginator';

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
  isLoading=false;
  posts:Post[]=[];
  totalposts;
  pageSizeOptions=[1,2,5,10];
  currentPage=1;
  pageSize=2;
  ngOnInit(): void {
    this.isLoading=true;
    this.postSer.getPosts(this.pageSize, this.currentPage);
    this.postSer.getPostsListener().subscribe((postData:{posts:Post[],postCount:number})=>{
      this.isLoading=false;
      this.posts=postData.posts;
      this.totalposts = postData.postCount;

    });
  }

  constructor(private postSer:PostService){

  }

  onChangePage(pageData: PageEvent){
    this.isLoading=true;
    this.currentPage = pageData.pageIndex +1;
    this.pageSize = pageData.pageSize;
    this.postSer.getPosts(this.pageSize, this.currentPage);
    

  }

  onDelete(postid:string){
    this.isLoading=true;
    this.postSer.deletePost(postid).subscribe(()=>{
      this.postSer.getPosts(this.pageSize, this.currentPage);
    })
  }


}

