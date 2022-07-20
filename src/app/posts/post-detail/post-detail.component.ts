import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!: Post;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    const postId = this.route.snapshot.paramMap.get('postId')!;

    this.postService.getPost(postId)
      .subscribe((response: any) => this.post = response.post);
  }

  onDelete(id: string): void {
    this.postService.deletePost(id)
      .subscribe(() => this.router.navigate(['/posts'], { relativeTo: this.route }));
  }

  onBack() {
    this.location.back();
  }

}
