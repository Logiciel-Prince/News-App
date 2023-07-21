import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
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
        let url = "https://newsapi.org/v2/top-headlines?from=2023-07-19&to=2023-07-20&sortBy=popularity&country=IN&apiKey=db1c06ae810c41fb8232ed9f0da5854c&page=1&pageSize=20";
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, totalResult: parseData.totalResults });
    }
    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?from=2023-07-19&to=2023-07-20&sortBy=popularity&country=IN&apiKey=db1c06ae810c41fb8232ed9f0da5854c&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles });
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles
        })
    }

    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResult / 20)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?from=2023-07-19&to=2023-07-20&sortBy=popularity&country=IN&apiKey=db1c06ae810c41fb8232ed9f0da5854c&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({ articles: parseData.articles });
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles
            })
        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h2>News Monkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 44) : "Nothing To read"} description={element.description ? element.description.slice(0, 88) : "Nothing To read"} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" class="btn btn-primary" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button type="button" class="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div >
        )
    }
}

export default News
