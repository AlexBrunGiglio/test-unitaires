import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CharacterDto, CharactersService } from '../../../../providers/api-client.generated';
import { DialogService } from '../../../../services/dialog.service';

@Component({
  selector: 'app-home-public',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePublicComponent implements OnInit {
  characters: CharacterDto[] = [];
  constructor(
    private characterService: CharactersService,
    private dialogService: DialogService,
  ) { }

  async ngOnInit() {
    const getCharacters = await this.characterService.getAllCharacters().toPromise();
    if (!getCharacters.success) {
      this.dialogService.showSnackBar(getCharacters.message);
      return;
    }
    this.characters = getCharacters.characters;
  }

}
