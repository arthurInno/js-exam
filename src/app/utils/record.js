import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExportConfig from 'aws-exports';
import * as mutations from '../../graphql/mutations.js';
import * as subscriptions from '../../graphql/subscriptions.js';

Amplify.configure(awsExportConfig);

const createRecord = async () => {
  const params = {
    input: {
      subjectId: 'interviewee01',
      history: [],
      timeBegin: parseInt(new Date().getTime() / 1000, 10) // must to be Int
    }
  };
  const { data } = await API.graphql(
    graphqlOperation(mutations.createRecord, params)
  );
  return data.createRecord;
};
const updateRecord = async (oldHistory, newHistory) => {
  const params = {
    input: {
      history: [...oldHistory, newHistory]
    }
  };
  const result = await API.graphql(
    graphqlOperation(mutations.updateRecord, params)
  );
  return result;
};

const subscribeOnCreateRecord = async (callback) => {
  API.graphql(graphqlOperation(subscriptions.onCreateRecord)).subscribe({
    next: ({ value }) => {
      callback(value);
    }
  });
};

const subscribeOnUpdateRecord = async (callback) => {
  API.graphql(graphqlOperation(subscriptions.onUpdateRecord)).subscribe({
    next: ({ value }) => {
      callback(value);
    }
  });
};
export {
  createRecord,
  updateRecord,
  subscribeOnCreateRecord,
  subscribeOnUpdateRecord
};