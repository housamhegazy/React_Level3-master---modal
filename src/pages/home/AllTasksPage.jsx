import { collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/config";
import Loading from "comp/Loading";
import Erroe404 from "pages/erroe404";
import Moment from "react-moment";
function AllTasksFunc({user}) {
  const [value, loading, error] = useCollection(collection(db, user.uid));

  if (error) {
    return (<section><Erroe404 /></section>);
  }
  if (loading) {
    return <Loading />;
  }


  if (value) {
    return (
      <section className="all-tasks flex mt">

      {value.docs.map((item,index)=>{
        return (
          <article key={item.data().id} dir="auto" className="one-task">
            <Link to="/edit-task">
              <h2>{index+1}-{item.data().title}</h2>
              <ul>
                {item.data().tasks.map((ele,index)=>{
                  if(index < 2){
                    return (
                      <li key={ele}>{ele}</li>
                    )
                  }else{
                    return (false)
                  }
                })}
                
              </ul>
              <p className="time">one day ago</p>
              <div className="info">
                <p>created at : <Moment fromNow date={item.data().id} /></p>
              </div>
            </Link>
        </article>
        )
      })}


      </section>
    );
  }
}

export default AllTasksFunc;
