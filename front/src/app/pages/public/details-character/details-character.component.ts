import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-character',
  templateUrl: './details-character.component.html',
  styleUrls: ['./details-character.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsCharacterComponent implements OnInit {
  itemId: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    const param = this.route.params.subscribe((param) => {
      this.itemId = param.id;
    });
  }

  ngOnInit() {

  }

}
