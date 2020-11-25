import Store from '@ember-data/store';

import CustomActions from '../mixins/custom-actions';
import FilterRecords from '../mixins/filter-records';

export default class extends Store.extend(CustomActions, FilterRecords) {}
