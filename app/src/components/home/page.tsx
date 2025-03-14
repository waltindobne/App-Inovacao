"useClient";
import styles from "./home.module.css";
import { SendHorizonal } from "lucide-react";

function Page(){
    return(
        <div className={styles.main}>
            <div className={styles.cabecalho}>Chat Perguntas Curriculo</div>
            <div className={styles.mensagem}>
                <div className={styles.perguntas}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, veniam eveniet! Assumenda temporibus voluptate quod earum provident eligendi id necessitatibus veniam nesciunt tenetur deleniti, saepe, architecto aspernatur corporis quidem culpa.</div>
                <div className={styles.respostas}>
                    <div className={styles.quadroResposta}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quos obcaecati harum esse, enim dolorum asperiores quae consequuntur beatae, unde et nulla libero. Enim ea sequi, quae nemo obcaecati mollitia.
                    </div>
                </div>
                <div className={styles.perguntas}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo, veniam eveniet! Assumenda temporibus voluptate quod earum provident eligendi id necessitatibus veniam nesciunt tenetur deleniti, saepe, architecto aspernatur corporis quidem culpa.</div>
                <div className={styles.respostas}>
                    <div className={styles.quadroResposta}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime quos obcaecati harum esse, enim dolorum asperiores quae consequuntur beatae, unde et nulla libero. Enim ea sequi, quae nemo obcaecati mollitia.
                    </div>
                </div>
            </div>
            <div className={styles.formMenssage}>
                <input type="text" placeholder="Digite aqui"/>
                <button type="submit"><SendHorizonal/></button>
            </div>
        </div>
    )
}
export default Page;