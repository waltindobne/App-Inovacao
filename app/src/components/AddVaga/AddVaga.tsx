"use client"

export default function Page(){
    return(
        <div className="w-full flex justify-center items-center">
            <form action="" className="w-lg p-8 flex flex-col bg-gray-100 rounded-xl border-2 border-blue-900">
                <h1 className="text-2xl text-blue-900 mb-4">Adicionar Vaga</h1>
                <div className="mb-3">
                    <label htmlFor="vaga" className="text-sky-950 font-bold">Vaga:</label>
                    <select name="vaga" id="" className="w-full p-2 text-slate-800 bg-white border border-slate-400 rounded-lg outline-0">
                        <option value="1" selected disabled>Selecione Uma Vaga</option>
                        <option value="1" >vaga1</option>
                        <option value="2">vaga2</option>
                        <option value="3">vaga3</option>
                        <option value="4">vaga4</option>
                        <option value="5">vaga5</option>
                    </select>
                </div>
                <div className="mb-1">
                    <label htmlFor="descricao" className="text-sky-950 font-bold">Descrição da Vaga:</label>
                    <textarea
                        name="descricao" id="" 
                        placeholder="Descrição da Vaga" 
                        className="w-full min-w-full min-h-30 max-h-30 p-2 text-slate-800 bg-white border border-slate-400 rounded-lg outline-0"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="empresa" className="text-sky-950 font-bold">Empresa responsavel:</label>
                    <input 
                        type="text" 
                        name="empresa" id="" 
                        placeholder="Empresa responsavel pela Vaga"
                        className="w-full p-2 bg-white border border-slate-400 rounded-md text-slate-800  outline-0"
                    />
                </div>
                <button className="w-full px-4 py-2 bg-white border-2 border-green-500 rounded-lg text-slate-800 font-bold hover:text-white hover:bg-green-500">Salvar</button>
            </form>
        </div>
    )
}