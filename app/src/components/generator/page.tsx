"use client"
import styles from "./generator.module.css";
import { SendHorizonal, UploadIcon, Paperclip } from "lucide-react";

function Page(){
    return (
        <div className={styles.main}>
            {/*<div className={styles.bodyResult}>
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
            </div>*/}
            <div className={styles.bodyInsert}>
                <form action="" className={styles.formGenerator}>
                    <textarea name="" id="" placeholder="Descreva sua vaga aqui"></textarea>
                    <div className={styles.descricao}>
                        <input type="text" placeholder="Anotações"/>
                        <input type="text" placeholder="Trasncrição"/>
                    </div>
                    <div className={styles.descricao}>
                        <label className={styles.fileInputWrapper}>
                            <Paperclip/>
                            Anexar Curriculo Base
                            <input type="file" className={styles.fileCV} hidden/>
                        </label>
                        <input type="number" placeholder="Numero de Candidatos" required/>
                        <button type="submit"><SendHorizonal/></button>
                    </div>
                </form>
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
        </div>
    )
}
export default Page;