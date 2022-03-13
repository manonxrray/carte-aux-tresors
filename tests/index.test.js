import { textToJson, createMap } from '../index';
import infoTest from './info.json';

test('map is correctly created', () => {
  const mapInfos = createMap(infoTest)
  expect(mapInfos).toEqual(
    [
      [ '.', 'M', '.' ],
      [ '.', 'A(Lara)', 'M' ],
      [ '.', '.', '.' ],
      [ 'T(2)', 'T(3)', '.' ]
    ]
  );
});