import styles from '../styles/Choice.module.scss';

function Choice({classname,content,handleClickFunc}:
  {classname:string,content:string,handleClickFunc:Function}) {

  function handleClick() {
    console.log('choice clicked');
    handleClickFunc(7);
  }
  return (
    <div className={styles[classname]}>
      <h2 onClick={handleClick}>{content}</h2>
    </div>
  )
}

export default Choice;