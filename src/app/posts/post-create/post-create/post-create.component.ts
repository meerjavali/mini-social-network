import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../post.model';
import { mimeType } from '../mime-type.validator';


import { Router } from '@angular/router'

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  postId="";
  post:Post;
  mode="create";
  isLoading=false;
  form:FormGroup;
  imagePreview:string;
 
  ngOnInit(): void {
    this.form = new FormGroup({
      title : new FormControl(null, {validators:[Validators.required]}),
      content : new FormControl(null, {validators:[Validators.required]}),
      image : new FormControl(null, {validators:[Validators.required], asyncValidators:mimeType})
    })
    
  }

  constructor(private postSer:PostService, private route:ActivatedRoute, private router:Router){
    this.route.params.subscribe((params)=>{
      
      if(params['id']){
        this.postId= params['id'];
        this.isLoading=true;
        this.mode="edit";
        console.log("this is inside route params meer edit mode");
        this.postSer.getPost(this.postId).subscribe((post)=>{
          this.isLoading=false;
          this.post = {
            id:post._id, 
            title:post.title, 
            content:post.content,
            imagePath: post.imagePath,
            creator: post.creator
          }
          this.form.setValue({title:this.post.title,content:this.post.content, image: this.post.imagePath});
         
        })

      }
      else{
        this.mode = "create";
        console.log("this is inside route params meer create mode");
      }
        
      

    
      

    });
  }

  onAddPost(){
    if(this.mode==="edit"){
      this.postSer.updatePost( this.postId,this.form.value.title,this.form.value.content, this.form.value.image).subscribe((responseData)=>{
        
        console.log(responseData.message);
        this.form.reset();
      this.router.navigate(["/"]);
      })
      
      

    }
    if(this.mode==="create"){
      console.log(this.form.value.title,this.form.value.content, this.form.value.image);
      this.postSer.addPost( this.form.value.title,this.form.value.content, this.form.value.image).subscribe((responseData)=>{
        console.log(responseData.message);
        this.form.reset();
        this.router.navigate(["/"]);
      })
      
    }
    
    
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    // console.log(this.form);
    // console.log(file);

    // image preview logic start
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result as string;
    }
    
    reader.readAsDataURL(file);
    //image preview logic ends

  }
}
