import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { Container } from './styles';

const footer = ({ total }) => <p>Você tem {total} repositrios</p>

const mapStateToProps = state => ({
  total: state.favorites.data.length
});

footer.propTypes = {
  total: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(footer)
