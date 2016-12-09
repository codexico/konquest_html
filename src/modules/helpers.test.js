import { nextArrayItem } from './helpers';

const arrayTest = ['a', 'b', 'c'];

it('should return the next item', () => {
    expect(nextArrayItem(arrayTest, 'a')).toEqual('b');
});

it('should return the first item if its the last', () => {
    expect(nextArrayItem(arrayTest, 'c')).toEqual('a');
});
