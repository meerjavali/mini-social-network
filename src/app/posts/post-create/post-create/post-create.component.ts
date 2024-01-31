import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredContent="";
  enteredTitle="";
  @Output() postDetails = new EventEmitter<{ title:string,content:string }>();

  newPost="Meerjavali";
  onAddPost(){
    const post={ title:this.enteredTitle, content:this.enteredContent };
    this.postDetails.emit(post);
  }
}
