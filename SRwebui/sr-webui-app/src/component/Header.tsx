import styles from '../styles/Header.module.scss'

function Header({classname,content}:{classname:string,content:string}){
  return (
    <div className={styles[classname]}>
      <h1>this is a header</h1>
      <br></br>
      <h3>{content}</h3>
    </div>
  )
}
export default Header;