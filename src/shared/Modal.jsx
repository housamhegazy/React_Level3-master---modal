import { Helmet } from "react-helmet-async";

function Modal({ closeModel, children,backgroundColor="whitesmoke"}) {
  return (
    <div className="parent-of-form">
      <Helmet>
        <style type="text/css">
          {`
          .parent-of-form{
            top:0;
            position: fixed;
            width:100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #33333388;
            
          }
          .modal{
            width: 400px;
            height: 333px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            animation:mymove .8s ;
            overflow-y: auto;

          } 

          @keyframes mymove{
            0% {scale:0;  transform: translateY(-100vh);}
            100% {scale:1;  transform: translateY(0);}
          }
          .add-task-content{
            height:100%;
            padding-top:50px
          }
          .modal::-webkit-scrollbar {
            width: .5em;
        }
        .modal::-webkit-scrollbar-track {
          -webkit-box-shadow:inset 0 0 16px 2px rgb(44 8 78);
      }
      .modal::-webkit-scrollbar-thumb {
        background-color: rgb(53 27 78);
        -webkit-box-shadow:inset 0 0 6px 4px rgb(99 45 151);
        border-radius:5px;
      }
      
           `}
        </style>
      </Helmet>
      <form style={{backgroundColor: `${backgroundColor}`}} className="modal">
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
