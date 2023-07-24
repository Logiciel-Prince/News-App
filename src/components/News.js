import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'sports'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    articles = []
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false,
            page: 1
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?from=2023-07-19&to=2023-07-20sortBy=popularity&country=${this.props.country}&category=${this.props.category}&apiKey=db1c06ae810c41fb8232ed9f0da5854c&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResult: parseData.totalResults,
            loading: false
        });
    }
    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?from=2023-07-19&to=2023-07-20&sortBy=popularity&country=${this.props.country}&category=${this.props.category}&apiKey=db1c06ae810c41fb8232ed9f0da5854c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles });
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?from=2023-07-19&to=2023-07-20&sortBy=popularity&country=${this.props.country}&category=${this.props.category}&apiKey=db1c06ae810c41fb8232ed9f0da5854c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles });
        this.setState({
            page: this.state.page + 1,
            articles: parseData.articles,
            loading: false
        })
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{ margin: '35px 0px' }}>News Monkey - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 44) : "Nothing To read"} description={element.description ? element.description.slice(0, 88) : "Nothing To read"} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} type="button" class="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div >
        )
    }
}

export default News
