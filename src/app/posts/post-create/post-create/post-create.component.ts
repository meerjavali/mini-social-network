import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from '../../post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  postId="";
  post:Post;
  mode="create";

  constructor(private postSer:PostService, private route:ActivatedRoute){
    this.route.params.subscribe((params)=>{
      if(params['id']){
        this.postId= params['id'];
        this.mode="edit";
        console.log("this is inside route params meer edit mode");
        this.post = this.postSer.getPost(this.postId);

      }
      else{
        this.mode = "create";
        console.log("this is inside route params meer create mode");
      }
        
      

    
      

    });
  }

  onAddPost(postForm:NgForm){
    if(this.mode==="edit"){
      this.postSer.updatePost( this.postId,postForm.value.title,postForm.value.content);
      postForm.resetForm();

    }
    if(this.mode==="create"){
      this.postSer.addPost( postForm.value.title,postForm.value.content);
      postForm.resetForm();
    }
    
    
  }
}
