import React, { useState, useEffect } from "react";
import axios from "./axios_copy.js";

export default function Modal(props) {
    let { children, modal, setModal, modalid, article_id } = props;
    console.log("props:", props);
    const [media, setMedia] = useState([]);
    console.log("props modalid:", modalid);
    // console.log("modal:", modal);
    // console.log("article_id:", article_id);
    // console.log("word:", word);

    var iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    useEffect(() => {
        console.log("media in new useEffect:", media);
    }, [media]);

    useEffect(() => {
        console.log("Modal mounted!!");
        axios.get(`/api/modal/${article_id}`).then(({ data }) => {
            console.log("data in Modal:", data);
            for (let i = 0; i < data.length; i++) {
                if (modalid === data[i].word) {
                    console.log("newData[0].word:", data[0].word);
                    const newData = [];
                    newData.push(data[i]);
                    console.log("newData:", newData);
                    setMedia(newData);
                }
            }
            // console.log("data.word:", data.word);
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
                                <section className="modal-main">
                                    {children}

                                    <iframe
                                        seamless
                                        src={md.link}
                                        width="100%"
                                        height="100%"
                                    ></iframe>

                                    <button onClick={() => setModal(false)}>
                                        close
                                    </button>
                                </section>
                            </div>
                        );
                    })}
            </div>
        </React.Fragment>
    );
}
