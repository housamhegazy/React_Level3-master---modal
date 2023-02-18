import React from "react";
import { db } from "../../firebase/config";
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function BtnsSection({ user , userId,DeleteBtn}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  if(value){
    return (
      <section className="btns flex mt">
        <button onClick={((eo)=>{
          DeleteBtn(eo)
        })} className="delete">Delete</button>
      </section>
    );
  }

}
