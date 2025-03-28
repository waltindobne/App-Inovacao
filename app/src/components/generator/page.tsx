"use client"
import styles from "./generator.module.css";
import { SendHorizonal } from "lucide-react";

function Page(){
    return (
        <div className={styles.main}>
            <div className={styles.bodyResult}>
                <h1 className={styles.titulo}>Gerar perguntas</h1>
                <div className={styles.Result}>
                    <div className={styles.pergunta}>
                        <h1>1 -</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                    </div>
                    <div className={styles.pergunta}>
                        <h1>2 -</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                    </div>
                    <div className={styles.pergunta}>
                        <h1>3 -</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                    </div>
                    <div className={styles.pergunta}>
                        <h1>4 -</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                    </div>
                    <div className={styles.pergunta}>
                        <h1>5 -</h1>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima aliquam ipsam vitae, ad corporis pariatur error expedita dolores voluptatem ut tempora, autem consequatur nesciunt beatae. Porro animi laborum qui repellendus?</p>
                    </div>
                </div>
            </div>
            <div className={styles.bodyInsert}>
                <form action="" className={styles.formGenerator}>
                    <textarea name="" id="" placeholder="Descreva sua vaga aqui"></textarea>
                    <button type="submit"><SendHorizonal/></button>
                </form>
            </div>
        </div>
    )
}
export default Page;