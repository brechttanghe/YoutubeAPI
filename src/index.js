import React, { Component } from 'react';
import ReactDom from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

/* You should add this to NODE.ENV variables (check Webpack DefinePlugin) */
const API_KEY = 'AIzaSyDVjBazhDoxGvn2pBfP38y-QQmIDQu9qpE';

class App extends Component {
    state = {
        video: [],
        selectedVideo: undefined,
    }

    /* Better to initialise after the component has rendered, not when it is constructed. */ 
    componentDidMount() {
        this.videoSearch('surfboards');
    }

    videoSearch = (term) => {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render(){
        const videoSearch = _.debounce((term) => this.videoSearch(term), 300);
        return(
            <div>
                <SearchBar onSearchTermChanged={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                    onVideoSelect= {selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos} />
            </div>
        );
    }
}


ReactDom.render(<App />, document.querySelector('.container'));
