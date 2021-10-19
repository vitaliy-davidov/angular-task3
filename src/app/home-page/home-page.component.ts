import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/posts.service';
import { Observable } from 'rxjs';
import { Post } from '../shared/interfaces';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  posts$: Observable<Post[]>;
  constructor(private postsService: PostService) {}
  ngOnInit(): void {
    this.posts$ = this.postsService.getAll();
  }
}
