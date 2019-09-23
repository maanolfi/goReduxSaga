import { all, takeLatest } from 'redux-saga/effects'

import { Types as favoritesTypes } from '../ducks/favorites'
import { addFavorite } from './favorites'

export default function* rootSagas() {
  yield all([
    takeLatest(favoritesTypes.ADD_REQUEST, addFavorite),
  ])
}
