import { environment } from '../../../../environments/environment';
import { CharacterDto, CharactersService, GetCharactersResponse } from '../../../../providers/api-client.generated';
let httpClientSpy: { get: jasmine.Spy; };

describe('HomePublicComponent', () => {
  let characterService: CharactersService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    characterService = new CharactersService(<any>httpClientSpy, environment.apiBaseUrl, null);
  });

  it('should return list of characters', async () => {
    const list: GetCharactersResponse = {
      characters: [
        { uid: "1", name: "Value 1" },
        { uid: "2", name: "Value 2" },
      ], success: true, filteredResults: {},
    };
    httpClientSpy.get.and.returnValue(list);
    await characterService.getAllCharacters();
    expect(httpClientSpy.get.and.returnValue(list));
  });
});
