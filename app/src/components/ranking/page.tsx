"use client";
import styles from "./ranking.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function Page(){
    const router = useRouter();
    
    const returnHome = () => {
        router.push('/')
    }

    return(
        <div className={styles.main}>
            <h1 className={styles.titulo}>Ranking Candidatos</h1>
            <button className={styles.returnHome} onClick={returnHome}><ArrowBigLeft/>Home</button>
            <div className={styles.bodyRanking}>
                <h1 className={styles.tituloRanking}>Top Ranks</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui odit iste nihil, inventore quaerat, dolor laboriosam obcaecati autem hic neque exercitationem sunt dolore sed. Maiores ut odit officiis enim in.</p>
            </div>
        </div>
    )
}
export default Page;