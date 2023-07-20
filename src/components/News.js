import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = []
    constructor() {
        super();
        this.state = {
            articles: this.articles,
            loading: false
        }
    }
    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=IN&apiKey=db1c06ae810c41fb8232ed9f0da5854c";
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles });
    }
    render() {
        return (
            <div className='container my-3'>
                <h2>News Monkey - Top Headlines</h2>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title ? element.title.slice(0, 44) : "Nothing To Show"} description={element.description ? element.description.slice(0, 88) : "Nothing To Show"} imageUrl={element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
            </div >
        )
    }
}

export default News
