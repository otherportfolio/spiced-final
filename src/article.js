import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";
// import SC from "./api/spotify.js";

export default function Article() {
    const [article, setArticle] = useState([]);
    const [word, setWord] = useState({});

    // var iframeElement = document.querySelector("iframe");
    // var widget1 = SC.Widget(iframeElement);

    useEffect(() => {
        console.log("Article mounted!!");

        axios.get("/api/article").then(({ data }) => {
            console.log("results data in Article:", data);
            const dangerousHtml = {
                __html:
                    data[0].byline &&
                    data[0].byline.replace("tryniti", "<span>tryniti</span>"),
            };
            setWord(dangerousHtml);
            setArticle(data);
        });
    }, []);

    function onHandleClick(e) {
        console.log("clicked:");
        var el = e.target;
        console.log("el:", el);
        console.log("el.type:", el.type);
        if (el.matches("span")) {
            console.log(":)");
        }
    }

    return (
        <React.Fragment>
            <div>
                {article &&
                    article.map((text, id) => {
                        return (
                            <div key={id}>
                                <div className="article_parent">
                                    <div className="article_title">
                                        {text.title}
                                    </div>
                                    <div className="article_subline">
                                        {text.subline}
                                    </div>
                                    <div className="article_author">
                                        {text.author}
                                    </div>
                                    <div className="article_intro">
                                        {text.intro}
                                    </div>
                                    <div className="article_main">
                                        {text.main}
                                    </div>
                                    <div className="article_endnotes">
                                        {text.endnotes}
                                    </div>
                                    <div>
                                        <div
                                            onClick={onHandleClick}
                                            className="article_byline"
                                            dangerouslySetInnerHTML={word}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
