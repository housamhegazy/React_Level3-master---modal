import { collection, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import Loading from "comp/Loading";
import Erroe404 from "pages/erroe404";
import Moment from "react-moment";
import { orderBy, query, limit } from "firebase/firestore";
import { useState } from "react";
import { useTranslation } from "react-i18next";


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
  const { t, i18n } = useTranslation();

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
                {i18n.language === "en" && "  newest first"}
                {i18n.language === "ar" && "  الأحدث اولا "}
                {i18n.language === "fr" && "  le plus récent d'abord"}
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
                {i18n.language === "en" && "  oldest first"}
                {i18n.language === "ar" && "  الأقدم اولا "}
                {i18n.language === "fr" && "  le plus ancien en premier"}
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
            <option value="alltasks">
                {i18n.language === "en" && "alltasks"}
                {i18n.language === "ar" && "  جميع المهام"}
                {i18n.language === "fr" && "  Toutes les tâches"}
            </option>
            <option value="completed">
                {i18n.language === "en" && "completed"}
                {i18n.language === "ar" && "مكتمله"}
                {i18n.language === "fr" && "  complété"}
            </option>
            <option value="notcompleted">
                {i18n.language === "en" && "notcompleted"}
                {i18n.language === "ar" && "غير مكتمله"}
                {i18n.language === "fr" && "  pas achevé"}
            </option>
          </select>
        </section>
        <section className="all-tasks flex mt">
          {value.docs.length < 1 && (<>
            {i18n.language === "en" && <h1>congratulation you finished all tasks</h1>}
                {i18n.language === "ar" && <h1 dir="rtl">مبروك لقد انهيت  جميع المهام</h1>}
                {i18n.language === "fr" && <h1>félicitations vous avez terminé toutes les tâches</h1>}
          </>
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
