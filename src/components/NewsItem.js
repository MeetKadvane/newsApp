import React from 'react'

const NewsItem = (props) => {
    let {title, description, imageUrl, newsUrl, author, date} = props;
    return (
      <div>
        <div className="card">
          <img src={!imageUrl?"https://www.ft.com/__origami/service/image/v2/images/raw/https%3A%2F%2Fd1e00ek4ebabms.cloudfront.net%2Fproduction%2Fc3a472c7-45c0-40c1-bf82-16d43c10e581.jpg?source=next-article&fit=scale-down&quality=highest&width=700&dpr=1":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body" >
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <p className='card-text'><small className='text-muted'>By {author?author : "Unkonwn"} on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem