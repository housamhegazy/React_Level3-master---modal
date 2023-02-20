import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import HomeModule from "./HomeModule";
import { doc, setDoc } from "firebase/firestore";
import AllTasksFunc from "./AllTasksPage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Level 3
import "./Home.css";
import { useState } from "react";

const Home = () => {
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
  }, []);
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
    setsubtask("");
  };
  // send data to firebase func
  const submitBtnFunc = async (eo) => {
    eo.preventDefault();
    if (array.length !== 0) {
      setshowSubmit(true);
      await setDoc(doc(db, user.uid, `${taskId}`), {
        completed: false,
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
    return (
      <>
        <Header />
        <Loading />
        <Footer />
      </>
    );
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
            {/* show all tasks  */}

            <AllTasksFunc user={user} />

            {/* add new task  Btn */}
            <section className="mt">
              <button dir="auto"
                onClick={() => {
                  openModel();
                }}
                className="add-task-btn"
              >
                {i18n.language === "en" && " Add new task "}
                {i18n.language === "ar" && "  اضافة مهمه جديده"}
                {i18n.language === "fr" && " Ajouter une nouvelle tâche"}
                
                <i className="fa-solid fa-plus"></i>
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
