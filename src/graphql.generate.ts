import { SchemaComposer } from 'graphql-compose';

const schemaComposer = new SchemaComposer();

import { AnnouncementQuery } from '@schemas/announcement/announcement.graph';

schemaComposer.Query.addFields({
    ...AnnouncementQuery
});

export default schemaComposer.buildSchema();
