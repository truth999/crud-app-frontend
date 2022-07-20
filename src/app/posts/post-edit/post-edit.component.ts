import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  post!: Post;
  postForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const postId = this.route.snapshot.paramMap.get('postId')!;

    this.postService.getPost(postId)
      .subscribe((response: any) => {
        this.post = response.post;

        this.initForm();
      });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const postId = this.route.snapshot.paramMap.get('postId')!;

      this.postService.updatePost(postId, this.postForm.value)
        .subscribe(() => this.router.navigate(['/posts'], { relativeTo: this.route }));
    }
  }

  onBack() {
    this.location.back();
  }

  private initForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, Validators.required),
      content: new FormControl(this.post.content, Validators.required)
    });
  }

}
