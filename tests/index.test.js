import { textToJson, createMap } from '../index';
import infoTest from './info.json';

test('map is correctly created', () => {
  const textToTest = './tests/info.txt';
  const convertedText = textToJson(textToTest);
  expect(convertedText).toEqual(
    {
      C: [ [ 3, 4 ] ],
      M: [ [ 1, 0 ], [ 2, 1 ] ],
      T: [ [ 0, 3, 2 ], [ 1, 3, 3 ] ],
      A: [ [ 'Lara', 1, 1, 'S', 'AADADAGGA' ] ]
    }
  );
});

test('map is correctly created', () => {
  const mapInfos = createMap(infoTest);
  expect(mapInfos).toEqual(
    [
      [ '.', 'M', '.' ],
      [ '.', 'A(Lara)', 'M' ],
      [ '.', '.', '.' ],
      [ 'T(2)', 'T(3)', '.' ]
    ]
  );
});

test('C details are not empty', () => {
  const mapInfos = infoTest;
  expect(mapInfos[0]).not.toBe(null)
});
