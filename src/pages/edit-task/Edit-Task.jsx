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
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { async } from "@firebase/util";


function EditTask() {  
  let { userId } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const [showData, setshowData] = useState(false);//used in delete btn of all Doc
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

  const DeleteBtn = async (eo) => {
    eo.preventDefault();
    setshowData(true); //when showData is true : dont render info of task bqz it is deleted
    await deleteDoc(doc(db, user.uid, userId));
    navigate("/", { replace: true }); // replace:true : to avoid back arrow onclick
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
      if (showData) {
        return (
          <>
            <header />
            <Loading />;
            <Footer />
          </>
        );
      }
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
              titleOnChange={titleOnChange}/>

            {/* sub tasks section */}
            <SubTasksSection
              user={user}
              userId={userId}
              completeCheckBox={completeCheckBox}
              trashIcon={trashIcon}
              AddMoreBtn={AddMoreBtn}
            />

            {/* add more btn & delete btn */}
            <BtnsSection user={user} userId={userId} DeleteBtn={DeleteBtn} />
          </div>
          <Footer />
        </div>
      );
    }
  }
}
export default EditTask;
