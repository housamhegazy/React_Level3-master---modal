
function Modal({ closeModel,children }) {
  return (
    <div className="parent-of-form">
      <form className="modal">
        <div
          onClick={() => {
            closeModel();
          }}
          className="close"
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
        {children}
      </form>
    </div>
  );
}
export default Modal;







