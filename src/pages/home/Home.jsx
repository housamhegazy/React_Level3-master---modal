import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import HomeModule from "./HomeModule";

// Level 3
import "./Home.css";
import { useState } from "react";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  //==========================================
  // useState and variables
  //==========================================
  const [array, setArray] = useState([]);
  const [subtask, setsubtask] = useState("");
  const [taskTitle, settaskTitle] = useState("");
  const [showSubmit, setshowSubmit] = useState(false);
  const [showMsg, setshowMsg] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const taskId = new Date().getTime();

  //==========================================
  // Functions
  //==========================================

  //send email verify
  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // ...
    });
  };
  // get subtask from input value
  const creatTitleFunc = (eo) => {
      settaskTitle(eo.target.value);
  };
  //send input value to subtask function
  const creatSubTaskFunc = (eo) => {
    setsubtask(eo.target.value);
  };
  //push subtask value to array func
  const addSubTask = () => {
    if (!array.includes(subtask) && subtask !== "") {
      array.push(subtask);
    }
    setsubtask(""); //to empty input after submit
  };

  // open and close model functions
  const openModel = () => {
    setshowModal(true);
  };
  const closeModel = () => {
    setshowModal(false);
    //when close model empty array and input fields
    setArray([]);
    settaskTitle("");
    setsubtask("")
  };
  // send data to firebase func
  const submitBtnFunc = async (eo) => {
    eo.preventDefault();
    if(array.length !== 0){
      setshowSubmit(true);
      await setDoc(doc(db, user.uid, `${taskId}`), {
      title: taskTitle,
      tasks: array,
      id: taskId,
    });
    setshowSubmit(false);
    setshowMsg(true);
    setTimeout(() => {
      setshowMsg(false);
    }, 4000);
    settaskTitle("");
    setArray([]);
    closeModel();
    }
    
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
            {/* show modal when press add tasks */}
            {showModal && (
              <HomeModule
                closeModel={closeModel}
                setshowMsg={setshowMsg}
                showSubmit={showSubmit}
                submitBtnFunc={submitBtnFunc}
                array={array}
                subtask={subtask}
                setsubtask={setsubtask}
                addSubTask={addSubTask}
                taskTitle={taskTitle}
                settaskTitle={settaskTitle}
                creatSubTaskFunc={creatSubTaskFunc}
                creatTitleFunc={creatTitleFunc}
              />
            )}
            {/* show message of success sending */}
            <p
              style={{ right: showMsg ? "20px" : "-100vw" }}
              className="showSuccessMsg"
            >
              tasks added successfully <i className="fa-solid fa-check"></i>
            </p>
          </main>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
