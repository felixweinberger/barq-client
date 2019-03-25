import { normalize, schema } from 'normalizr';

const item = new schema.Entity('item', {}, { idAttribute: '_id' });

const category = new schema.Entity('category', {
  items: [item],
}, { idAttribute: '_id' });

const bar = new schema.Entity('bar', {
  menu: [category],
}, { idAttribute: 'barId' });

const normalizeBar = data => normalize(data, bar);

export default normalizeBar;
