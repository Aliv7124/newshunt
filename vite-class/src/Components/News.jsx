import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from "../Spinner"
import PropTypes from 'prop-types';

export class News extends Component {
    static defaultProps = {
        category: 'general',
        pagesize: 8
    }

    static propTypes = {
        category: PropTypes.string,
        pagesize: PropTypes.number
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        };
    }

      async fetchNews(page, category) {
        this.setState({ loading: true });
        let url = `https://newshunt-backend.onrender.com/news?category=${category}&page=${page}&pagesize=${this.props.pagesize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles || [],
            loading: false,
            page: page
        });
    }

    async componentDidMount() {
        this.fetchNews(1, this.props.category);
    }

    async componentDidUpdate(prevProps) {
        // If category changes, reload news
        if (prevProps.category !== this.props.category) {
            this.fetchNews(1, this.props.category);
        }
    }

    handleNextClick = async () => {
        this.fetchNews(this.state.page + 1, this.props.category);
    }

    handlePrevClick = async () => {
        if (this.state.page > 1) {
            this.fetchNews(this.state.page - 1, this.props.category);
        }
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '35px 0px' }}>
                    NewsHunt - Top {this.props.category} Headlines
                </h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={element.title ? element.title : ""}
                                    description={element.description ? element.description : ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>
                        &larr; Previous
                    </button>
                    <button className="btn btn-dark" onClick={this.handleNextClick}>
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
