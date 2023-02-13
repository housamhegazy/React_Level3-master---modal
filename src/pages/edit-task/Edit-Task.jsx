import "./edit-task.css";
import { Helmet } from "react-helmet-async";
import Header from "comp/header";
import Footer from "comp/Footer";
function EditTask() {
  return (
    <div>
      <Helmet>
        <title>HOME Page</title>
      </Helmet>
      <Header />
      <div className="edit-task">
        {/* title */}
        <section className="title center">
          <h1>
            <input
              className="title-input center"
              type="text"
              defaultValue={"hello"}
            />
            <i className="fa-regular fa-pen-to-square"></i>
          </h1>
        </section>

        {/* sub tasks section */}
        <section className="sub-task">
          <div className="parent-time">
            <p className="time">created 6 days ago</p>
            <div className="parent-check">
              <input
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
            <li className="card-task flex">
              <p>sub task</p>
              <i className="fa-solid fa-trash"></i>
            </li>
            <li className="card-task flex">
              <p>sub task</p>
              <i className="fa-solid fa-trash"></i>
            </li>
          </ul>
        </section>

        {/* add more btn & delete btn */}
        <section className="btns flex mtt">
          <button className="add-more-btn">
            add more <i className="fa-solid fa-plus"></i>
          </button>
          <button className="delete">
            Delete
          </button>
        </section>
      </div>
      <Footer />
    </div>
  );
}
export default EditTask;
