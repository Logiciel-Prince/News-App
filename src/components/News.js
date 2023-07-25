import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

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
    constructor(props) {
        super(props);
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResult: 0,
        }
        document.title = `${this.props.category} - NewsMonkey`;
    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?from=2023-07-19&to=2023-07-20sortBy=popularity&country=${this.props.country}&category=${this.props.category}&apiKey=db1c06ae810c41fb8232ed9f0da5854c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResult: parseData.totalResults,
            loading: false
        });
    }
    async componentDidMount() {
        this.updateNews();
        this.setState({
            page: this.state.page + 1
        })
    }
    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?from=2023-07-19&to=2023-07-20sortBy=popularity&country=${this.props.country}&category=${this.props.category}&apiKey=db1c06ae810c41fb8232ed9f0da5854c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResult: parseData.totalResults,
            loading: false
        });
    };
    handlePrevClick = async () => {
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({
            page: this.state.page + 1
        })
        this.updateNews();
    }
    render() {
        return (
            <>
                <h2 className='text-center' style={{ margin: '35px 0px' }}>News Monkey - Top Headlines</h2>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResult}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 80) : "Nothing To read"} description={element.description ? element.description.slice(0, 160) : "Nothing To read"} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </ >
        )
    }
}

export default News
