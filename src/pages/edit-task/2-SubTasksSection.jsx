import React, { useState } from "react";
import { db } from "../../firebase/config";
import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import Moment from "react-moment";
import { updateDoc, arrayUnion } from "firebase/firestore";

export default function SubTasksSection({
  user,
  userId,
  completeCheckBox,
  trashIcon,
  AddMoreBtn,
}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  const [showAddNewTask, setshowAddNewTask] = useState(false);
  const [newItem, setnewItem] = useState("");

  if (value) {
    return (
      <section className="sub-task">
        <div className="parent-time">
          <p className="time">
            <Moment fromNow date={value.data().id} />
          </p>
          <div className="parent-check">
            <input
              onChange={(eo) => {
                completeCheckBox(eo);
              }}
              checked={value.data().completed}
              type="checkbox"
              id="checkbox"
              name="vehicle3"
              value="Boat"
            />
            <label htmlFor="checkbox" className="checkmark">
              {" "}
              completed
            </label>
          </div>
        </div>
        <ul className="list">
          {value.data().tasks.map((ele) => {
            return (
              <li key={ele} className="card-task flex">
                <p>{ele}</p>
                <i
                  onClick={() => {
                    trashIcon(ele);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>

        {showAddNewTask && (
          <form
            className="add-new-task "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              value={newItem}
              onChange={(eo) => {
                setnewItem(eo.target.value);
              }}
              type="text"
              className="add-task"
            />
            <button
              onClick={async () => {
                await updateDoc(doc(db, user.uid, userId), {
                  tasks: arrayUnion(newItem),
                });
                setnewItem("");
              }}
              className="add"
              type="submit"
            >
              Add
            </button>
            <button
              onClick={() => {
                setshowAddNewTask(false);
              }}
              className="cancel"
            >
              cancel
            </button>
          </form>
        )}

        <div className="center mtt">
          <button
            onClick={() => {
              setshowAddNewTask(true);
            }}
            className="add-more-btn"
          >
            add more <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
}
