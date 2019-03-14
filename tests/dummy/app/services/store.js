import DS from 'ember-data';

import CustomActions from '@256dpi/ember-fire/mixins/custom-actions';
import FindAndWatch from '@256dpi/ember-fire/mixins/find-and-watch';

export default DS.Store.extend(CustomActions, FindAndWatch);
