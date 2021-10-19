import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from 'src/app/shared/posts.service';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService } from '../shared/services/alert.service';
@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css'],
})
export class EditPageComponent implements OnInit {
  post: Post;
  submitted = false;
  uSub: Subscription;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id']);
        })
      )
      .subscribe((post: Post) => {
        this.post=post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        });
      });
  }

  submit() {
    if (!this.form.valid) {
      return;
    }
    this.submitted = true;
    this.uSub = this.postsService
      .update({
        ...this.post,
        text: this.form.value.text,
        title: this.form.value.title,
        author: this.post.author,
      })
      .subscribe(() => {
        this.submitted = false;
        this.alert.warning('Пост був відредагований');
      });
  }

  ngOnDestroy(){
    if (this.uSub) {
    this.uSub.unsubscribe();
    }
   }
}
