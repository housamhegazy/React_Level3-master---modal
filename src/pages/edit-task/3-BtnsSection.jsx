import React from "react";
import { useEffect } from "react";
import { db } from "../../firebase/config";
// import Loading from "../../comp/Loading";
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useNavigate } from "react-router";
export default function BtnsSection({ user , userId}) {
  const [value, loading, error] = useDocument(doc(db, user.uid,userId))

  return (
    <section className="btns flex mtt">
      <button className="add-more-btn">
        add more <i className="fa-solid fa-plus"></i>
      </button>
      <button className="delete">Delete</button>
    </section>
  );
}
