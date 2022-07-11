import { useEffect, useRef, useState } from "react";
import Nota from "./notes";
import "./style.css";
import {v4 as uuid} from "uuid"

const Ingreso = ()=>{
    const [titulos,setTitulos]= useState([])
    const titulo = useRef()
    const key = "nota"
    useEffect(()=> {
        const guardaTitulos = JSON.parse(localStorage.getItem(key));
            setTitulos( (titulosAnteriores) =>{
                return[...titulosAnteriores,...guardaTitulos];
            
        });
    },[])

    useEffect(()=> {
        localStorage.setItem(key,JSON.stringify(titulos))


    },[titulos])

    const [tareas,setTareas]= useState([])
    const tarea = useRef()


    useEffect(() => {
        const guardarTareas = JSON.parse(localStorage.getItem(key));
            setTareas( (tareasAnteriores) =>{
                return[...tareasAnteriores,...guardarTareas];
            });
    },[])

    useEffect(()=> {
        localStorage.setItem(key,JSON.stringify(tareas))
    },[tareas])

    

    const agregarContenido = () => {
        const valorTitulo = titulo.current.value;
        const valorTarea = tarea.current.value;
        if (valorTitulo ==="" && valorTarea ==="")return;

        const nuevaNota = {
            id:uuid(),
            titulo:valorTitulo,
            tarea:valorTarea
        }
        setTitulos((titulosAnteriores)=>{
            return[...titulosAnteriores,nuevaNota]


        })
        setTareas((tareasAnteriores)=> {return[...tareasAnteriores,nuevaNota]})

        
    }





    
    return(
        <div>
            <h1>Post It Simulator!</h1>
            <div className="menú">
                
                <div>
                    <input className="titulo" ref={titulo} type={"text"} placeholder="Título"></input>
                    
                </div>
                <div>
                    <input className="descri" ref={tarea} type={"text-tarea"} placeholder="Descripción"></input>
                </div>

                <input className="check" type={"checkbox"}></input>
                <label className="in">Importante!</label>
                <button onClick={agregarContenido}>AGREGAR</button>
            </div>
            <ul className="notes">
                {titulos.map((Item)=> <Nota contenido={Item.tarea} Título={Item.titulo} key={Item.id}/>)}
                

            </ul>


      
        </div>
        
    )
}




export default Ingreso;