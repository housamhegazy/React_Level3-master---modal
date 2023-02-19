import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import React, { useRef, useState } from "react";

export default function TitleSection({ user, userId, titleOnChange }) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  const inputElement = useRef(null);
  if (error) {
    return (
      <section>
        <h1>{error.message}</h1>
      </section>
    );
  }
  if (loading) {
    return <h1 className="center">loading...</h1>;
  }

  if (value) {
    return (
      <section className="title center">
        <h1>
          <input
            style={{
              textDecoration: value.data().completed
                ? "line-through wavy black 4px"
                : "none",
            }}
            onChange={(eo) => {
              titleOnChange(eo);
            }}
            onFocus={() => {
              // removeBorder();
            }}
            className="title-input center"
            type="text"
            defaultValue={value.data().title}
            ref={inputElement}
          />
          <i
            onClick={() => {
              inputElement.current.focus(); //current : the element
            }}
            className="fa-regular fa-pen-to-square"
          ></i>
        </h1>
      </section>
    );
  }
}
