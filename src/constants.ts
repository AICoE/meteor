export enum HttpStatusCode {
  METHOD_NOT_ALLOWED = 405,
  OK = 200,
  CREATED = 201,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

export const PIPELINES = [
  {
    value: 'jupyterhub',
    label: 'JupyterHub',
    description: 'Build an image suitable for experiments in JupyterHub, including all dependencies resolved by Thoth Station',
    default: true,
  },
  {
    value: 'jupyterbook',
    label: 'Website',
    description: 'A static website generated via JupyterBook',
    default: true,
  },
];

export const DEFAULT_BRANCH_STRING = 'default';
export const DEFAULT_TTL_OPTION = '24h';

export const TTL_OPTIONS = {
  Never: null,
  '24h': 86400,
  '1 week': 604800,
};

export const LOCAL_STORAGE_METEORS_KEY = 'meteors';
