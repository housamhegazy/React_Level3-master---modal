import { db } from "../../firebase/config";
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';



export default function TitleSection({ user , userId,titleOnChange}) {
    const [value, loading, error] = useDocument(doc(db, user.uid,userId))
  if (error) {
    return (
      <section>
        <h1>{error.message}</h1>
      </section>
    );
  }
  if (loading) {
    return <h1 className="center">loading...</h1>;
  }

  if (value) {
    return (
      <section className="title center">
        <h1>
          <input onChange={(eo)=>{
            titleOnChange(eo);
          }}
            className="title-input center"
            type="text"
            defaultValue={value.data().title}
          />
          <i className="fa-regular fa-pen-to-square"></i>
        </h1>
      </section>
    );
  }
}
