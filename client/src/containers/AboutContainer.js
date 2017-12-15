import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'

import { loadAbout } from '../actions'
import { About } from '../components'

class AboutContainer extends React.Component {
  static propTypes = {
    about: React.PropTypes.object,
    load: React.PropTypes.func
  }

  componentDidMount () {
    document.title = 'About | Karthik M A M'
    _.isEmpty(this.props.about) && this.props.load()
  }

  render () {
    return _.isEmpty(this.props.about) ? <span /> : <About about={this.props.about} />
  }
}

let connector = connect(
  state => ({ about: state.about }),
  dispatch => ({ load: bindActionCreators(loadAbout, dispatch) })
)(AboutContainer)

export { connector as AboutContainer }
