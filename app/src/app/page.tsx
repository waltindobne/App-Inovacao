import Image from "next/image";
import HomePage from "../components/home/page";
import Generator from "@/components/generator/page";
import Questions from "@/components/questions/page";
import FormComponent from "@/components/teste/FormComponent";
import MostrarDados  from "@/components/teste/MostrarDados";

export default function Home(){
    return (
        <main>
            <HomePage/>
        </main>
    )
}
