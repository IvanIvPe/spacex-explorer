import React from 'react'
import styles from '@/app/components/Footer/Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()}  Created by Ivan</p>
    </footer>
  )
}

export default Footer