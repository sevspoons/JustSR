import Header from '../component/Header';
import Choice from '../component/Choice';
import { useSelector,useDispatch } from 'react-redux';
import { State } from '../stores/store';

function HomePage() {
  const count = useSelector((s:State) => s.count);
  const dispatch = useDispatch();
  const content :string = "the Choice has been clicked " + count + " times!";

  function addClickNum(num:number) {
    dispatch({
      type: 'ADD-NUM',
      addNum: num,
    })
  }
  return (
    <div className="App">
      <Header classname="header" content="HELLO"/>
      <Choice classname='choice' content={content} handleClickFunc={addClickNum}></Choice>
    </div>
  );
}



export default HomePage;