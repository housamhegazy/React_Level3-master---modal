import "./edit-task.css";
import { Helmet } from "react-helmet-async";
import Header from "comp/header";
import Footer from "comp/Footer";
import { auth } from "../../firebase/config";
import Loading from "comp/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TitleSection from "./1-TitleSection";
import SubTasksSection from "./2-SubTasksSection";
import BtnsSection from "./3-BtnsSection";
import { useParams } from "react-router-dom";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { async } from "@firebase/util";

function EditTask() {
  let { userId } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });
  //here we put all functions of all sections and send at to section as params
  //===============================
  //title section functions
  //===============================
  const titleOnChange = async (eo) => {
    await updateDoc(doc(db, user.uid, userId), {
      title: eo.target.value,
    });
  };
  //===============================
  //subtasks section functions
  //===============================
  const completeCheckBox = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, userId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, userId), {
        completed: false,
      });
    }
  };
  const trashIcon = async (ele) => {
    await updateDoc(doc(db, user.uid, userId), {
      tasks: arrayRemove(ele),
    });
  };
  //===============================
  //Btns section functions
  //===============================

  const AddMoreBtn = async (eo) => {
    eo.preventDefault();
    
  };

  const DeleteBtn = (eo) => {
    eo.preventDefault();
  };

  if (error) {
    return (
      <>
        <Helmet>
          <title>error Page</title>
        </Helmet>
        <Header />
        <h1>error : {error.message}</h1>
        <Footer />
      </>
    );
  }

  if (loading) {
    return <Loading />;
  }
  if (user) {
    if (user.emailVerified) {
      return (
        <div>
          <Helmet>
            <title>edit task Page</title>
          </Helmet>
          <Header />
          <div className="edit-task">
            {/* title */}

            <TitleSection
              user={user}
              userId={userId}
              titleOnChange={titleOnChange}
            />

            {/* sub tasks section */}

            <SubTasksSection
              user={user}
              userId={userId}
              completeCheckBox={completeCheckBox}
              trashIcon={trashIcon} AddMoreBtn={AddMoreBtn}/>

            {/* add more btn & delete btn */}
            <BtnsSection user={user} userId={userId}/>
          </div>
          <Footer />
        </div>
      );
    }
  }
}
export default EditTask;
