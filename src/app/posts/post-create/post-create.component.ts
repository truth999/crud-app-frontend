import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postForm!: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    if (this.postForm.valid) {
      this.postService.addPost(this.postForm.value)
        .subscribe(() => this.router.navigate(['/posts'], { relativeTo: this.route }));
    }
  }

  private initForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
  }

  onBack() {
    this.location.back();
  }

}
