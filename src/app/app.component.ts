import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mean-course';

  posts:postData[]=[];

  postData(posts:postData){
    this.posts.push(posts);

  }
}

interface postData{
  title:string,
  content:string
}
