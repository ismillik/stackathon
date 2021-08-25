import React from 'react';
import { connect } from 'react-redux';
import { getImdbResults } from '../store/infoCalls'

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTitle: '',
      searchType: 'get-movies-by-title' 
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log(this.state)
    this.props.getImdbResults(this.state.searchTitle, this.state.searchType);
  }

  render() {
    const { handleChange, handleSubmit } = this;
    
    return (
      <div id="content-wrapper">
        <div>
          <form onSubmit={handleSubmit} >
            <div className="formfield">
              <input
                type="text"
                name="searchTitle"
                value={this.state.searchTitle}
                onChange={handleChange}
              />
              <label>Search by Title</label>
              <br />
              <p>Select a type:</p>
              <input 
                type='radio'
                id= 'movie'
                name='searchType'
                value = 'get-movies-by-title'
                defaultChecked
                onChange = {handleChange}
              />
              <label htmlFor='movie'>Movie</label>
              <input 
                type='radio'
                id= 'tvShow'
                name='searchType'
                value = 'get-shows-by-title'
                onChange = {handleChange}
              />
              <label htmlFor='tvShow'>TV Show</label>
            </div>
            <button type='submit'>Submit</button>
          </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
