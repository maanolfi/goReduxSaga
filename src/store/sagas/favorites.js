import { call, put, select } from 'redux-saga/effects'

import api from '../../services/api'

import { Creators as favoriteActions } from '../ducks/favorites'

export function* addFavorite(action) {
  try {
    const { data } = yield call(api.get, `/repos/${action.payload.repository}`)

    const isDuplicate = yield select(state =>
      state.favorites.data.find(favorite => favorite.id === data.id))
    if (isDuplicate) {
      yield put(favoriteActions.addFavoriteFailure('Repositorio Duplicado'))
    } else {

      const repositoryData = {
        id: data.id,
        name: data.full_name,
        description: data.description,
        url: data.html_url
      }

      yield put(favoriteActions.addFavoriteSuccess(repositoryData))
    }



  } catch (error) {
    yield put(favoriteActions.addFavoriteFailure('Repositorio invalido'))
  }
}
