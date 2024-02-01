import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(private postSer:PostService){}

  onAddPost(postForm:NgForm){
    this.postSer.addPost(postForm.value.title,postForm.value.content);
    postForm.reset();
    
  }
}
