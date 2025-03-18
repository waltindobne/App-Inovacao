"use client"
import styles from "./questions.module.css";
import { Paperclip, Check } from "lucide-react";

function Page(){
    return(
        <div className={styles.main}>
            <h1 className={styles.titulo}>Perguntas e Respostas</h1>
            <div className={styles.bodyForm}>
                <form action="">
                    <div className={styles.perguntas}>
                        <p><b>1- </b>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, tenetur excepturi temporibus numquam quaerat exercitationem fugit natus sint fugiat rerum est animi mollitia at soluta praesentium accusamus ipsum nesciunt similique.</p>
                        <input type="text" placeholder="Digite aqui sua resposta"/>
                    </div>
                    <div className={styles.perguntas}>
                        <p><b>2- </b>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, tenetur excepturi temporibus numquam quaerat exercitationem fugit natus sint fugiat rerum est animi mollitia at soluta praesentium accusamus ipsum nesciunt similique.</p>
                        <input type="text" placeholder="Digite aqui sua resposta"/>
                    </div>
                    <div className={styles.perguntas}>
                        <p><b>3- </b>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, tenetur excepturi temporibus numquam quaerat exercitationem fugit natus sint fugiat rerum est animi mollitia at soluta praesentium accusamus ipsum nesciunt similique.</p>
                        <input type="text" placeholder="Digite aqui sua resposta"/>
                    </div>
                    <div className={styles.perguntas}>
                        <p><b>4- </b>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo, tenetur excepturi temporibus numquam quaerat exercitationem fugit natus sint fugiat rerum est animi mollitia at soluta praesentium accusamus ipsum nesciunt similique.</p>
                        <input type="text" placeholder="Digite aqui sua resposta"/>
                    </div>
                    <div className={styles.curriculo}>
                        <label className={styles.fileInputWrapper}>
                            <Paperclip/>
                            Anexar Curriculo Base
                            <input type="file" className={styles.fileCV} hidden/>
                        </label>
                    </div>
                    <button type="submit"><Check/>Confirmar</button>
                </form>
            </div>
        </div>
    )
}
export default Page;