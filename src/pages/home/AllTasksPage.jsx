import { collection, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import Loading from "comp/Loading";
import Erroe404 from "pages/erroe404";
import Moment from "react-moment";
import { orderBy, query, limit } from "firebase/firestore";
import { useState } from "react";

function AllTasksFunc({ user }) {
  const allTasks = query(collection(db, user.uid), orderBy("id"));
  const completedTasks = query(
    collection(db, user.uid),
    where("completed", "==", true)
  );
  const notcompletedTasks = query(
    collection(db, user.uid),
    where("completed", "==", false)
  );

  const [initialdata, setinitialdata] = useState(allTasks);
  const [value, loading, error] = useCollection(initialdata);
  //opacity of order btns
  const [fullyopacity, setfullyopacity] = useState(false);
  //select box option value to change it onChange
  const [optValue, setoptValue] = useState("alltasks");
  if (error) {
    return (
      <section>
        <Erroe404 />
      </section>
    );
  }
  if (loading) {
    return <Loading />;
  }

  if (value) {
    return (
      <>
        {/* options(filtered data) */}
        <section className="parent-of-btns flex mt">
          {/* dont show buttons with completed and not completed filter */}
          {optValue === "alltasks" && (
            <>
              <button
                style={{ opacity: fullyopacity ? "1" : ".6" }}
                onClick={() => {
                  setinitialdata(
                    query(collection(db, user.uid), orderBy("id", "desc"))
                  );
                  setfullyopacity(true);
                }}
              >
                newest first
              </button>
              <button
                style={{ opacity: fullyopacity ? ".6" : "1" }}
                onClick={() => {
                  setinitialdata(
                    query(collection(db, user.uid), orderBy("id", "asc"))
                  );
                  setfullyopacity(false);
                }}
              >
                oldest first
              </button>
            </>
          )}
          <select
            onChange={(e) => {
              setoptValue(e.target.value);
              if (e.target.value === "alltasks") {
                setinitialdata(allTasks);
                setfullyopacity(false)
              }
              if (e.target.value === "completed") {
                setinitialdata(completedTasks);
              }
              if (e.target.value === "notcompleted") {
                setinitialdata(notcompletedTasks);
              }
            }}
            value={optValue}
          >
            <option value="alltasks">alltasks</option>
            <option value="completed">completed</option>
            <option value="notcompleted">notcompleted</option>
          </select>
        </section>
        <section className="all-tasks flex mt">
          {value.docs.length < 1 && (
            <h1>congratulation you finished all tasks</h1>
          )}
          {value.docs.map((item, index) => {
            return (
              <article key={item.data().id} dir="auto" className="one-task">
                <Link to={`/edit-task/${item.data().id}`}>
                  <h2>
                    {index + 1}-{item.data().title}
                  </h2>
                  <ul>
                    {item.data().tasks.map((ele, index) => {
                      if (index < 2) {
                        return <li dir="auto" key={ele}>{ele}</li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>
                  <div className="time">
                    <p>
                      <Moment fromNow date={item.data().id} />
                    </p>
                  </div>
                </Link>
              </article>
            );
          })}
        </section>
      </>
    );
  }
}

export default AllTasksFunc;
