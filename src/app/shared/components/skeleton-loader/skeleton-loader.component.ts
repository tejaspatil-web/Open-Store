import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent implements OnInit {
  public cards: Array<number>;

  ngOnInit() {
    this.cards = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      this.cards.push(i);
    }
  }
}
