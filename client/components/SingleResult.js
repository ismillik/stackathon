import React from 'react';
import { connect } from 'react-redux';
import { getStreamResults } from '../store/infoCalls'

class SingleResult extends React.Component {
    constructor() {
        super();
    }
    componentDidMount() {
        const { match } = this.props;
        if (match.params.id) {
            this.props.getStreamResults(match.params.id);
        }
    }
    render() {
        console.log('These are the props!1!!!!!', this.props)
        if (!Object.keys(this.props.stream).length) {
            return (
                <div id="content-wrapper">
                    <h4>Loading your data...</h4>
                </div>
            )
        }
        const { stream } = this.props;
        const rating = stream.imdbRating/10;
        const cast = stream.cast.join(', ');
        const director = stream.significants[0];
        const posterURL = stream.posterURLs[342];

        return (
            <div id="content-wrapper">
                <div>
                    <h3>{stream.originalTitle}</h3>
                    <h5>
                        <span>{stream.year}</span>
                        <span>{stream.runtime} Minutes</span>
                        <span>IMDb Rating: {rating}/10</span>
                    </h5>
                </div>
                <div>
                    <img src={posterURL}/>
                </div>
                <div>
                    <p>{stream.tagline}</p>
                    <p>Director/Producer: {director}</p>
                    <p>Cast: {cast}</p>
                    <p>{stream.overview}</p>
                </div>
                <div>
                    <h3>Streaming Availability</h3>
                    
                </div>
            </div>
  
      )
    }
  }
  
  const mapStateToProps = (state) => {
    const stream = state.stream || {};
    return {
        stream
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    getStreamResults: (id) => dispatch(getStreamResults(id))
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(SingleResult);