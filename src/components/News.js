import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url);
    let parsedata = await data.json()
    console.log(parsedata);
    setArticles(parsedata.articles)
    setTotalResults(parsedata.totalResults)
    setLoading(false)
    props.setProgress(100);
}

useEffect(() => {
  document.title = `NewsMonkey - ${capitalizeFirstLetter(props.category)}`
  updateNews();
  // eslint-disable-next-linet
  }, [])

  const fetchMoreData = async () => {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
      setPage(page + 1);
    let data = await fetch(url);
    let parsedata = await data.json()
    console.log(parsedata);
    setArticles(articles.concat(parsedata.articles),)
    setTotalResults(parsedata.totalResults)
  };
    return (
      <div className='container mt-3'>
      <h1 className='text-center' style={{margin:"35px", marginTop: "80px"}}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

          <div className="container">
            <div className="row">
            {articles.map((element,)=>{
              return  <div className="col-md-4" key={element.url}>
                <NewsItem title = {element.title?element.title.slice(0, 45):""} description = {element.description?element.description.slice(0, 80):""} imageUrl = {element.urlToImage} newsUrl = {element.url} author = {element.author} date = {element.publishedAt} />
              </div>
            

            })}
            
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between mt-3 mb-3">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.hadlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.hadleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
}

News.defaultProps = {
    country: 'us',
    pageSize: 5,
    category:'general'
  }

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

export default News