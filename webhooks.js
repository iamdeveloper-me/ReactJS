const LOADING = 'dashboard/webhooks/LOADING'
const LOADED = 'dashboard/webhooks/LOADED'
const FAILED = 'dashboard/webhooks/FAILED'

const SAVING_WEBHOOKS = 'dashboard/webhooks/SAVING_WEBHOOKS'
const SAVED_WEBHOOKS = 'dashboard/webhooks/SAVED_WEBHOOKS'

import {apiAction} from './requests'

export default function webhooks (state = {}, action = {}) {
  switch (action.type) {
    case LOADED:
      return {
        ...state,
        webhookslist: action.response.webhooks,
        webhooks_request: true,
        loading: false,
        error: null,
        errorwebhookurl: null,
        loadedAt: new Date()
      }
    case FAILED:
      return {
        ...state,
        loading: false,
        webhooks_request: false,
        errorwebhookurl: action.error.message,
        webhookslist: []
      }
    case LOADING:
      return {
        ...state,
        loading: true,
        errorwebhookurl: null,
        webhooks_request: false,
        error: action.error,
        webhookslist: []
      }
    case SAVING_WEBHOOKS:
      return {
        ...state,
        errorwebhookurl: null,
        webhooks_request: true,
        error: null
      }
    case SAVED_WEBHOOKS:
      return {
        ...state,
        errorwebhookurl: null,
        webhooks_request: false,
        error: null
      }
    case 'ADDING_WEBHOOKS':
      return {
        ...state,
        errorwebhookurl: null,
        webhooks_request: false,
        error: null
      }
    case 'ADDED_WEBHOOKS':
      return {
        ...state,
        errorwebhookurl: null,
        webhooks_request: false,
        error: null
      }
    default:
      return state
  }
}

export function getWebhooks (property_id) {
  return apiAction({
    types: [LOADING, LOADED, FAILED],
    method: 'GET',
    path: `/webhook/${property_id}`
  })
}

export function addWebhooks (values) {
  return apiAction({
    types: ['ADDING_WEBHOOKS', 'ADDED_WEBHOOKS', FAILED],
    method: 'POST',
    path: '/webhook',
    body: values
  })
}

export function deleteWebhooks (values) {
  return apiAction({
    types: ['DELETING_WEBHOOKS', 'DELETED_WEBHOOKS', FAILED],
    method: 'DELETE',
    path: '/webhook',
    body: values
  })
}
