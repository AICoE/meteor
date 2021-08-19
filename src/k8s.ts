import fs from 'fs';
const k8s = require('@kubernetes/client-node');

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sCustomApi = kc.makeApiClient(k8s.CustomObjectsApi);
const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
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
  const meteors = await k8sCustomApi.listNamespacedCustomObject(...k8sMeteor);
  return meteors?.body?.items || [];
};
export const getMeteor = async (name: string) => {
  const meteor = await k8sCustomApi.getNamespacedCustomObjectStatus(...k8sMeteor, name);
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
  const meteor = await k8sCustomApi.createNamespacedCustomObject(...k8sMeteor, body);
  return meteor?.body || null;
};

export const getConsoleUrl = async () => {
  const consoleResource = await k8sCoreApi.readNamespacedConfigMap('console-public', 'openshift-config-managed');
  return consoleResource?.body.data.consoleURL || '';
};
