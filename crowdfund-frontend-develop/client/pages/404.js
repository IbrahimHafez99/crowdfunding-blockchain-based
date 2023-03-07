import styles from "../styles/404.module.css";
export default function Custom404() {
  return (
    <div className={styles.html}>
      <div className={styles.error}>404</div>
      <br />
      <br />
      <span className={styles.info}>File not found</span>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        className={styles.static}
      />
    </div>
  );
}

Custom404.getLayout = function (page) {
  return <>{page}</>;
};
