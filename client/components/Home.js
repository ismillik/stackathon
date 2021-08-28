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
      
      <div id='content-wrapper'>
        <div id='content-block'>
        <div id='about'>
          <h3>conflux</h3>
          <p><i>(noun)  a flowing together of two or more streams</i></p>
          <p>Welcome! Simplify finding out where to stream your favorite shows and movies by merging your streams with conflux. Get started with the <i>Search by Title</i> field to search IMDb for your desired title. Then make your selection to find out where it can be streamed.</p>
          <div id='supported platforms'>
            <p><strong>Supported platforms</strong></p>
            <div id='all-logos'>
              <img src='/images/netflix.jpeg' alt='Netflix' className='mini-logo'/>
              <img src='/images/prime.jpeg' alt='Amazon Prime Video' className='mini-logo'/>
              <img src='/images/disney.jpeg' alt='Disney+' className='mini-logo'/>
              <img src='/images/hbo.jpeg' alt='HBO Max' className='mini-logo'/>
              <img src='/images/hulu.jpeg' alt='Hulu' className='mini-logo'/>
              <img src='/images/peacock.jpeg' alt='Peacock' className='mini-logo'/>
              <img src='/images/paramount.jpeg' alt='Paramount+' className='mini-logo'/>
              <img src='/images/starz.jpeg' alt='Starz' className='mini-logo'/>
              <img src='/images/showtime.jpeg' alt='Showtime' className='mini-logo'/>
              <img src='/images/apple.jpeg' alt='Apple TV+' className='mini-logo'/>
              <img src='/images/mubi.jpeg' alt='Mubi' className='mini-logo'/>
              <img src='/images/britbox.jpeg' alt='Britbox' className='mini-logo'/>
            </div>
          </div>
        </div>
        <div id='form'>
          <form onSubmit={handleSubmit}>
            <div className="formfield">
              <input
                id='searchTitle'
                type="text"
                name="searchTitle"
                value={this.state.searchTitle}
                onChange={handleChange}
              />
              <label id='titleLabel'>Search by Title</label>
             </div>
             <div className="formfield">
              <p><strong>Select</strong></p>
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
            <div className="formfield">
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
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
