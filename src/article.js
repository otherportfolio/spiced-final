import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";
import Modal from "./modal.js";

export default function Article(props) {
    const [article, setArticle] = useState([]);
    const [words, setWords] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalid, setId] = useState("");
    console.log("modal:", modal);
    console.log("modalid:", modalid);
    const article_id = props.match.params.article_id;
    console.log("article_id:", article_id);

    useEffect(() => {
        console.log("Article mounted!!");
        axios.get("/api/article").then(({ data }) => {
            console.log("results data in Article:", data);

            const dangerousHtml = [
                {
                    __html:
                        data[0].byline &&
                        data[0].byline.replace(
                            "tryniti",
                            "<span id='trinity'>tryniti<span/>"
                        ),
                },
                {
                    __html:
                        data[0].main &&
                        data[0].main.replace(
                            "Cardi B",
                            "<span id='Cardi B'>Cardi B<span/>"
                        ),
                },
            ];

            setModal();
            setWords(dangerousHtml);
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
                                    <div
                                        onClick={onHandleClick}
                                        className="article_main"
                                        dangerouslySetInnerHTML={words[1]}
                                    >
                                        {/* {text.main} */}
                                    </div>
                                    <div>
                                        <div
                                            onClick={onHandleClick}
                                            className="article_byline"
                                            dangerouslySetInnerHTML={words[0]}
                                        />
                                        <div className="article_endnotes">
                                            {text.endnotes}
                                        </div>
                                        {modal && (
                                            <Modal
                                                modal={modal}
                                                setModal={setModal}
                                                modalid={modalid}
                                                article_id={article_id}
                                                // word={word}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div> //article.map ends
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
