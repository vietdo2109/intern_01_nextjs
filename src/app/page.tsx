import styles from "./page.module.css";
import SignUp from "./(auth)/signup/page";
export default function Home() {
  return (
    <div className={styles.page}>
      <SignUp />
    </div>
  );
}
