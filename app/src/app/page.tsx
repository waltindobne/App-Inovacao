import Image from "next/image";
import HomePage from "../components/home/page";
import Generator from "@/components/generator/page";
import Questions from "@/components/questions/page";
import FormComponent from "@/components/teste/FormComponent";
import Header  from "@/components/layout/header";
import Vagas from "@/components/candidate/page";

export default function Home(){
    return (
        <main>
            <Header/>
            <HomePage/>
        </main>
    )
}
