"use client";
import styles from "./home.module.css";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState , useEffect} from "react";

function Page(){
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const navigationToGenerate = () => {
        router.push('/generator')
    }
    const navigationToQuest = () => {
        router.push('/questions')
    }

    const toggleCurriculo = () => setIsOpen(!isOpen);

    return(
        <div className={styles.main}>
            <button onClick={navigationToGenerate} className={styles.buttonAddQuest}>
                Descrever Vaga
            </button>
            <button onClick={navigationToQuest} className={styles.buttonAddQuest}>
                Responder Perguntas
            </button>
            <h1 className={styles.titulo}>Candidatos</h1>
            <div className={styles.bodyCandidates}>
                <button onClick={toggleCurriculo} className={styles.candidate}>
                    <img src="https://media.licdn.com/dms/image/v2/D4D03AQE-gQEecOmEyg/profile-displayphoto-shrink_200_200/B4DZQgPyT.HwAY-/0/1735707797234?e=2147483647&v=beta&t=QXYg9A1fyjKX2FgWFC4p2eWl5-lGr6CvhkTgl1oaWGI" alt="" />
                    <div className={styles.details}>
                        <div className={styles.linha}>
                            <tr>nome:</tr>
                            <td>joão silva</td>
                        </div>
                        <div className={styles.linha}>
                            <tr>Email:</tr>
                            <td>joão silva</td>
                        </div>
                        <div className={styles.linha}>
                            <tr>Telefone:</tr>
                            <td>joão silva</td>
                        </div>
                        <div className={styles.linha}>
                            <tr>Vaga:</tr>
                            <td>joão silva</td>
                        </div>
                    </div>
                </button>
            </div>





            {isOpen && (
            <div className={styles.bodyCurriculo}>
                <div className={styles.curriculo}>
                    <div className={styles.cabecalho}>
                        <div className="flex">
                            <img src="https://media.licdn.com/dms/image/v2/D4D03AQE-gQEecOmEyg/profile-displayphoto-shrink_200_200/B4DZQgPyT.HwAY-/0/1735707797234?e=2147483647&v=beta&t=QXYg9A1fyjKX2FgWFC4p2eWl5-lGr6CvhkTgl1oaWGI" alt="" />
                            <div className={styles.details}>
                                <div className={styles.linha}>
                                    <tr>nome:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className={styles.linha}>
                                    <tr>Email:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className={styles.linha}>
                                    <tr>Telefone:</tr>
                                    <td>joão silva</td>
                                </div>
                                <div className={styles.linha}>
                                    <tr>Vaga:</tr>
                                    <td>joão silva</td>
                                </div>
                            </div>
                        </div>
                        <button onClick={toggleCurriculo}>X</button>
                    </div><br /><hr /><br />
                    <div className={styles.result}>
                        <b>1- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                        <b>2- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                        <b>3- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                        <b>4- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                        <b>5- Lorem ipsum dolor sit amet consectetur adipisicing elit.</b>
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam fugiat velit consequuntur adipisci temporibus reiciendis.</p>
                    </div>  
                </div>
            </div>
             )}
        </div>
    )
}
export default Page;