import styles from '../styles/Navigator.module.scss'
import { NavLink } from 'react-router-dom'
import { useRef } from 'react'

type NavObj = {
  to: string,
  content:string,
}

function Navigator({guidList}: { guidList: NavObj[] }) {
  const floatLineRef = useRef<HTMLSpanElement>(null)
  return (
    <div className={styles.nav}>
      <img alt='navHeader' src={require('../assets/navheader.png')}></img>
      {guidList.map((item, index) => (
        <NavLink to={item.to} className={({isActive}) => (isActive ? styles.selected:"")}>{item.content}</NavLink>
      ))}
      <span ref={floatLineRef}></span>
    </div>
  )
}

export default Navigator