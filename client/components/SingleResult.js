import React from 'react';
import { connect } from 'react-redux';
import { getImdbResults } from '../store/infoCalls'

class SingleResult extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div id="content-wrapper">
            <div>
                <h3>This is a single result.</h3>
            </div>
        </div>
  
      )
    }
  }
  
  const mapStateToProps = state => {
    return {
      username: state.auth.username
    }
  }
  
  const mapDispatchToProps = (dispatch, { history }) => ({
    getImdbResults: (title, type) => dispatch(getImdbResults(title, type, history))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleResult);