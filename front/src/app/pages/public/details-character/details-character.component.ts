import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterDto, CharactersService, CommandDto, CommandsService } from '../../../../providers/api-client.generated';
import { AuthDataService } from '../../../../services/auth-data.service';
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
  cart = {} as CommandDto;
  valueItem: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharactersService,
    private dialogService: DialogService,
    private commandService: CommandsService,
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
    const getCart = await this.commandService.getCommand(AuthDataService.currentUser.id).toPromise();
    if (!getCart.success) {
      this.dialogService.showSnackBar(getCart.message);
      return;
    }
    this.cart = getCart.command;
    this.cart.products = [];
  }

  addCart(value: number) {
    console.log("🚀 ~ DetailsCharacterComponent ~ addCart ~ value", value);
    for (let index = value; index <= value; index++) {
      this.cart.products.push(this.character);
    }
    console.log("🚀 ~ DetailsCharacterComponent ~ addCart ~ this.cart", this.cart);
  }

  async saveCart() {
    this.cart.userId = AuthDataService.currentUser.id;
    const save = await this.commandService.createOrUpdateCommand(this.cart).toPromise();
    console.log("🚀 ~ DetailsCharacterComponent ~ saveCart ~ save", save);
    if (!save.success) {
      this.dialogService.showSnackBar(save.message);
      return;
    }
    this.cart = save.command;
  }
}
