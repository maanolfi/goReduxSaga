import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Creators as FavoriteActions } from '../../store/ducks/favorites'


const Main = (props) => {
  const [valueInput, setvalueInput] = useState('')

  const handleAddRepository = (e) => {
    e.preventDefault()
    props.addFavoriteRequest(valueInput)
    setvalueInput('')
  }


  return (
    <Fragment>
      <form onSubmit={handleAddRepository}>
        <input value={valueInput} placeholder='usuario/reposiorio'
          onChange={e => setvalueInput(e.target.value)}
        ></input>
        <button type='submit'>Adicionar</button>
        <br />
        {props.favorites.loading && <span>Carregando...</span>}
        {!!props.favorites.error && <span>{props.favorites.error}</span>}
      </form>

      <ul>
        {props.favorites.data.map(favorite => (
          <li key={favorite.id}>
            <p>
              <strong>{favorite.name}</strong> {favorite.description}
            </p>
            <a href={favorite.url}>Acessar</a>
          </li>

        ))}
      </ul>
    </Fragment>
  )
}

Main.propTypes = {
  addFavoriteRequest: PropTypes.func.isRequired,
  favorites: PropTypes.shape({
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
    })),
    error: PropTypes.oneOfType([PropTypes.string])
  }).isRequired
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Main)
