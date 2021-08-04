import fs from 'fs';
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);
const k8sContext = kc.getCurrentContext();

const k8sNamespace = (() => {
  if (k8sContext === 'inClusterContext') {
    return fs.readFileSync('/var/run/secrets/kubernetes.io/serviceaccount/namespace', 'utf8');
  } else {
    return k8sContext.split('/')[0];
  }
})();

const k8sMeteor: [string, string, string, string] = ['meteor.operate-first.cloud', 'v1alpha1', k8sNamespace, 'meteors'];

export const listMeteors = async () => {
  const meteors = await k8sApi.listNamespacedCustomObject(...k8sMeteor);
  return meteors?.body?.items || [];
};
export const getMeteor = async (name: string) => {
  const meteor = await k8sApi.getNamespacedCustomObjectStatus(...k8sMeteor, name);
  return meteor?.body || null;
};

type MeteorSpec = {
  url: string;
  ref: string;
};

export const createMeteor = async (spec: MeteorSpec) => {
  const body = {
    apiVersion: 'meteor.operate-first.cloud/v1alpha1',
    kind: 'Meteor',
    metadata: {
      generateName: 'meteor-',
    },
    spec,
  };
  const meteor = await k8sApi.createNamespacedCustomObject(...k8sMeteor, body);
  return meteor?.body || null;
};
