import styles from './TitleBar.module.css'

const TitleBar = (): React.ReactElement => {
  const close: React.MouseEventHandler = () => window.api.windowClose()
  const minimize: React.MouseEventHandler = () => window.api.windowMinimize()
  const maximize: React.MouseEventHandler = () => window.api.windowMaximize()
  return (
    <div className={styles.titleBar}>
      <div className={styles.titleBarControls}>
        <button className={styles.minimize} onClick={minimize} />
        <button className={styles.maximize} onClick={maximize} />
        <button className={styles.close} onClick={close} />
      </div>
    </div>
  )
}

export default TitleBar
