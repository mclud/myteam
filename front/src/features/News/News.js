import React from "react";
import './News.css';

export default function News(props) {

    const { title, content, author } = props;

    // console.log('author is :', author);
    // console.log('title is :', title);
    // console.log('content is :', content);

    return (
        <div className="news">
            <div className="news-title">{title} par <span className="">{author}</span></div>
            <div className="news-content">{content}</div>
        </div>
    )
}