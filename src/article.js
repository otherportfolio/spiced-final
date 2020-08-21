import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";
import Modal from "./modal.js";

export default function Article(props) {
    const [article, setArticle] = useState([]);
    const [words, setWords] = useState({});
    const [modal, setModal] = useState(false);
    const [modalid, setId] = useState("");
    const [word, setWord] = useState("");
    console.log("modal:", modal);
    const article_id = props.match.params.article_id;
    console.log("article_id:", article_id);
    console.log("word:", word);

    useEffect(() => {
        console.log("Article mounted!!");
        axios.get("/api/article").then(({ data }) => {
            console.log("results data in Article:", data);

            const dangerousHtml = {
                __html:
                    data[0].byline &&
                    data[0].byline.replace(
                        "tryniti",
                        "<span id='trinity'>tryniti<span/>"
                    ),
            };
            setModal();
            setWords(dangerousHtml);
            setWord(data[0].word);
            setArticle(data);
        });
    }, []);

    function onHandleClick(e) {
        console.log("clicked:");
        var el = e.target;
        console.log("el:", el);
        // console.log("el.type:", el.type);
        if (el.matches("span")) {
            console.log("el.id", el.id);
            setModal(!modal);
            setId(el.id);
            setWord(word);
            console.log("this is working!!!! modal:", modal);
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
                                            dangerouslySetInnerHTML={words}
                                        />
                                        {modal && (
                                            <Modal
                                                modal={modal}
                                                setModal={setModal}
                                                modalid={modalid}
                                                article_id={article_id}
                                                word={word}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
