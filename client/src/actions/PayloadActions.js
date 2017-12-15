import { Api } from '../api'
import * as Constants from '../constants'

export function loadPayloadStart () {
  return {
    type: Constants.LOAD_PAYLOAD_START
  }
}

export function loadPayloadSuccess ({ payload, payloadPages, payloadType, payloadSubtype, query, page }) {
  return {
    type: Constants.LOAD_PAYLOAD_SUCCESS,
    payload,
    payloadType,
    payloadSubtype,
    payloadPages,
    query,
    page
  }
}

export function loadPayloadFailure (error) {
  return {
    type: Constants.LOAD_PAYLOAD_FAILURE,
    error
  }
}

export function loadAbout () {
  return (dispatch) => {
    dispatch(loadPayloadStart())

    Api.getAbout().then(
      res => dispatch(loadPayloadSuccess({ ...res })),
      err => dispatch(loadPayloadFailure(err))
    ).catch(err => dispatch(loadPayloadFailure(err)))
  }
}

function handlePayload ({ dispatch, payload, payloadPages, payloadType, payloadSubtype, query, page }) {
  let items = {}
  let pages = []

  payload.forEach(payloadItem => {
    items[payloadItem.slug] = payloadItem
    pages.push(payloadItem.slug)
  })

  dispatch(loadPayloadSuccess({
    payload: items,
    payloadType,
    payloadSubtype: 'items',
    query,
    page
  }))

  payloadSubtype === 'items' || dispatch(loadPayloadSuccess({
    payload: pages,
    payloadType,
    payloadSubtype,
    payloadPages,
    query,
    page
  }))
}

export function loadPayload ({ payloadType, payloadSubtype, query, page }) {
  return (dispatch) => {
    dispatch(loadPayloadStart())

    Api.getPayload([
      payloadType,
      payloadSubtype !== 'pages' ? payloadSubtype : undefined,
      payloadSubtype === 'pages' && query !== 'index' ? 'tags' : undefined,
      query && unescape(query)
    ].filter(item => item !== undefined).join('/'), { page }).then(
      res => handlePayload({ ...res, payloadType, payloadSubtype, query, page, dispatch }),
      err => dispatch(loadPayloadFailure(err))
      ).catch(err => dispatch(loadPayloadFailure(err)))
  }
}

export function loadSearch ({ payloadType, query }) {
  return (dispatch) => {
    Api.getSearch(payloadType, query).then(
      res => dispatch(loadPayloadSuccess({ payload: res, payloadType, payloadSubtype: 'search', query })),
      err => dispatch(loadPayloadFailure(err))
    ).catch(err => dispatch(loadPayloadFailure(err)))
  }
}
