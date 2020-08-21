import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";

export default function Modal(props) {
    let { url, children, modal, setModal, modalid, article_id, word } = props;
    const [media, setMedia] = useState([]);
    console.log("props modal:", modalid);
    console.log("modal:", modal);
    console.log("article_id:", article_id);
    console.log("word:", word);

    useEffect(() => {
        console.log("Modal mounted!!");
        axios.get(`/api/modal/${article_id} / ${word}`).then(({ data }) => {
            console.log("data in Modal:", data);
            setMedia(data);
        });
        if (modal === false) {
            return null;
        }
    }, []);

    return (
        <React.Fragment>
            <div>
                {media &&
                    media.map((md, id) => {
                        return (
                            <div key={id}>
                                <div>{md.word}</div>
                            </div>
                        );
                    })}
                <section className="modal-main">
                    {children}
                    <img src={url} />
                    <button onClick={() => setModal(false)}>close</button>
                </section>
            </div>
        </React.Fragment>
    );
}
