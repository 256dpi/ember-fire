import Store from '@ember-data/store';

import CustomActions from '@256dpi/ember-fire/mixins/custom-actions';
import FilterRecords from '@256dpi/ember-fire/mixins/filter-records';

export default Store.extend(CustomActions, FilterRecords);
