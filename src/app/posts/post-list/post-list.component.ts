import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts()
      .subscribe((response: any) => {
        this.posts = response.posts;
      });
  }

  onAddPost() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onDeletePost(id: string) {
    this.postService.deletePost(id)
      .subscribe(() => this.posts = this.posts.filter((post: Post) => post._id !== id));
  }

}
