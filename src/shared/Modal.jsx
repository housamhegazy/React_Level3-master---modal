import { Helmet } from "react-helmet-async";

function Modal({ closeModel,children }) {
  return (
    <div className="parent-of-form">
      <Helmet>
        <style type="text/css">
        {
          `
          .parent-of-form{
            position: fixed;
            width:100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #33333388;
            
          }
          .modal{
            background-color: whitesmoke;
            width: 400px;
            height: 333px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            animation:mymove .8s ;
            overflow-y: scroll;

          } 

          @keyframes mymove{
            0% {scale:0;  transform: translateY(-100vh);}
            100% {scale:1;  transform: translateY(0);}
          }
          .add-task-content{
            height:100%;
            padding-top:50px
          }
           `
        }


        </style>
      </Helmet>
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







