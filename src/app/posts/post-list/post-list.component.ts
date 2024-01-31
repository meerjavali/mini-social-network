import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  //dummy posts
  // posts=[
  //   {title:"first post", content:"the first post\'s content"},
  //   {title:"second post", content:"the second post\'s content"},
  //   {title:"third post", content:"the third post\'s content"}
  // ];

  @Input() posts:postsData[]=[];


}

interface postsData{
  title:string;
  content:string;
}
