import React from "react";
import { db } from "../../firebase/config";
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
export default function BtnsSection({ user , userId}) {
  const [value, loading, error] = useDocument(doc(db, user.uid,userId))

  return (
    <section className="btns flex mt">
      <button className="delete">Delete</button>
    </section>
  );
}
