import "./edit-task.css";
import { Helmet } from "react-helmet-async";
import Header from "comp/header";
import Footer from "comp/Footer";
import { auth } from "../../firebase/config";
import Loading from "comp/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TitleSection from "./1-TitleSection";
import SubTasksSection from "./2-SubTasksSection";
import BtnsSection from "./3-BtnsSection";
import { useParams } from "react-router-dom";

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

            <TitleSection user={user} userId={userId} />

            {/* sub tasks section */}

            <SubTasksSection user={user} userId={userId} />

            {/* add more btn & delete btn */}
            <BtnsSection user={user} userId={userId} />
          </div>
          <Footer />
        </div>
      );
    }
  }
}
export default EditTask;
