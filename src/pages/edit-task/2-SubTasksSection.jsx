import React from "react";
import { db } from "../../firebase/config";
// import Loading from "../../comp/Loading";
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import Moment from "react-moment";

export default function SubTasksSection({ user , userId}) {
  const [value, loading, error] = useDocument(doc(db, user.uid,userId))

  if(value){
    return (
      <section className="sub-task">
        <div className="parent-time">
          <p className="time"><Moment fromNow date={value.data().id} /></p>
          <div className="parent-check">
            <input type="checkbox" id="checkbox" name="vehicle3" value="Boat" />
            <label htmlFor="checkbox" className="checkmark">
              {" "}
              completed
            </label>
          </div>
        </div>
        <ul className="list">
        {value.data().tasks.map((ele)=>{
          return(
          <li key={ele} className="card-task flex">
            <p>{ele}</p>
            <i className="fa-solid fa-trash"></i>
          </li>
      
          )
        })}
        </ul>
        
      </section>
    );
  }

}
