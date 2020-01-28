import * as contentful from 'contentful';

interface clientInterface extends contentful.ContentfulClientApi {
  drafts?: contentful.ContentfulClientApi
}

const client: clientInterface = contentful.createClient({
  space: "ru4ngbv83ee0",
  accessToken: "cRXTt1MPHCtFYnW9aaxUZyWsqfHJatYIcUg8GjYoJS8"
});

const drafts = contentful.createClient({
  host: 'preview.contentful.com',
  space: "ru4ngbv83ee0",
  accessToken: "cOYBbO1d2yCfsjKflP-ElR3O2X8vZLCtSd_wjj52_rg"
});

client.drafts = drafts;
export default client;