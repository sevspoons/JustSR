import Header from '../component/Header';
import Choice from '../component/Choice';
import '../styles/HomePage.scss';
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
    <div>
      <Header classname="header" content="HELLO"/>
      <Choice classname='choice' content={content} handleClickFunc={addClickNum} />
    </div>
  );
}



export default HomePage;