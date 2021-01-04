import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] =  [];
  isLoading = false;
  error = null;
  private errorSub: Subscription;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.errorSub = this.postService.error.subscribe(error => {
      this.error = error;
    })
    this.onFetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postService.createPost(postData);
  }

  onFetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(data => {
         // console.log(data);
          this.loadedPosts = data;
          this.isLoading = false;
      }, error => {
          this.error = error.message;
          this.isLoading = false;
          console.log(error);
      });
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePost().subscribe(res => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }
}
