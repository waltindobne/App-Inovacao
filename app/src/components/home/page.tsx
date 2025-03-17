"use client";
import styles from "./home.module.css";
import { SendHorizonal } from "lucide-react";
import { useRouter } from "next/navigation";

function Page(){
    const router = useRouter();

    const navigationToGenerate = () => {
        router.push('/generator')
    }
    const navigationToQuest = () => {
        router.push('/questions')
    }

    return(
        <div className={styles.main}>
            <button onClick={navigationToGenerate} className={styles.buttonAddQuest}>
                Descrever Vaga
            </button>
            <button onClick={navigationToQuest} className={styles.buttonAddQuest}>
                Responder Perguntas
            </button>
            
        </div>
    )
}
export default Page;