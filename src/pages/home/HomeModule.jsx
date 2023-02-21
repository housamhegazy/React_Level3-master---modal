import ReactLoading from "react-loading";
import Modal from "shared/Modal";

function HomeModule({
  closeModel,
  setshowMsg,
  submitBtnFunc,
  showSubmit,
  array,
  subtask,
  setsubtask,
  addSubTask,
  taskTitle,
  settaskTitle,
  creatSubTaskFunc,
  creatTitleFunc
}) {
  return (
    <Modal closeModel={closeModel} backgroundColor={"whitesmoke"} >
      <div className="add-task-content">
        {/* store input value of title in useState */}
        <input
          onChange={(eo) => {
            creatTitleFunc(eo)
          }}
          required
          placeholder=" add title : "
          type="text"
          value={taskTitle}
        />
        <div className={"task-field"}>
          {/* store input value in useState */}
          <input style={{marginBottom:"0"}}
            onChange={(eo) => {
              creatSubTaskFunc(eo)
            }}
            required
            placeholder=" details : "
            type="text"
            value={subtask}
          />
          {/* push subtask to array */}
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
        {/* get tasks list from array to page*/}
        
        <ul>
          {array.map((ele) => (
            <li key={`${Math.random()}`}>{ele}</li>
          ))}
        </ul>
        {/* submit to send tasks to firebase */}
        <button
          className="submitBtn mtt"
          onClick={(eo) => {
            submitBtnFunc(eo);
          }}
        >
          {showSubmit ? (
            <ReactLoading type={"spin"} color={"red"} height={20} width={20} />
          ) : (
            "submit"
          )}
        </button>
      </div>
    </Modal>
  );
}
export default HomeModule;
