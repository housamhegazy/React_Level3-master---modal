import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";

// Level 3
import "./Home.css";
import Modal from "shared/Modal";
import { useState } from "react";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);

  const [array, setArray] = useState([]);
  const [subtask, setsubtask] = useState("");
const addSubTask = ()=>{
  array.push(subtask)
  setsubtask("")//to empty input after submit 
}


  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // ...
    });
  };

  // open and close model
  const [showModal, setshowModal] = useState(false);
  const openModel = () => {
    setshowModal(true);
  };
  const closeModel = () => {
    setshowModal(false);
  };

  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <h1 style={{ fontSize: "28px" }}>
            {" "}
            <span>Welcome to React Level 2 🔥🔥🔥</span>{" "}
          </h1>
          <p className="pls">
            Please{" "}
            <Link style={{ fontSize: "30px" }} to="/signin">
              sign in
            </Link>{" "}
            to continue...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* options(filtered data) */}
            <section className="parent-of-btns flex mt">
              <button>newest first</button>
              <button>oldest first</button>
              <select id="lang">
                <option value="alltasks">alltasks</option>
                <option value="completed">completed</option>
                <option value="notcomleted">notcomleted</option>
              </select>
            </section>

            {/* show all tasks  */}
            <section className="all-tasks flex mt">
              <article dir="auto" className="one-task">
                <Link to="/edit-task">
                  <h2>new task</h2>
                  <ul>
                    <li>sub task</li>
                    <li>sub task</li>
                  </ul>
                  <p className="time">one day ago</p>
                </Link>
              </article>
            </section>

            {/* add new task  Btn */}
            <section className="mt">
              <button
                onClick={() => {
                  openModel();
                }}
                className="add-task-btn"
              >
                Add new task <i className="fa-solid fa-plus"></i>
              </button>
            </section>
            {/* show modal whene press add tasks */}
            {showModal && (
              <Modal closeModel={closeModel}>
                <div className="add-task-content">
                  <input
                    onChange={(eo) => {}}
                    required
                    placeholder=" add title : "
                    type="text"
                  />
                  <div>
                    <input
                      onChange={(eo) => {
                        setsubtask(eo.target.value);
                      }}
                      required
                      placeholder=" details : "
                      type="text"
                      value={subtask}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addSubTask();
                      }}
                      className="add"
                    >
                      add
                    </button>
                  </div>

                  <ul>
                    {array.map((ele) => (
                      <li key={ele}>{ele}</li>
                    ))}
                  </ul>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    submit
                  </button>
                </div>
              </Modal>
            )}
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
