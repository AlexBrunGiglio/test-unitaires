import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterDto, CharactersService } from '../../../../providers/api-client.generated';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-details-character',
  templateUrl: './details-character.component.html',
  styleUrls: ['./details-character.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailsCharacterComponent implements OnInit {
  itemId: string;
  character: CharacterDto;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharactersService,
    private dialogService: DialogService,
  ) {
    const param = this.route.params.subscribe((param) => {
      this.itemId = param.id;
    });
  }

  async ngOnInit() {
    const gestCharacter = await this.characterService.getCharacter(this.itemId).toPromise();
    if (!gestCharacter.success) {
      this.dialogService.showSnackBar(gestCharacter.message);
      return;
    }
    this.character = gestCharacter.character;
  }

  addCart(value: number) {

  }
}
