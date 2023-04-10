import { useEffect, useState } from "react";
import "./proc.css"
import {  useDispatch, useSelector } from "react-redux";
import { getProcessOne } from "../redux/slices/processSlice";
import AddProcess from "../utils/AddProc";
import { ReactSVG } from "react-svg";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ProcessOne() {
    
    const dispatch = useDispatch()
    

    useEffect(() => {
        dispatch(getProcessOne())
    }, [])  

    const {processOne} = useSelector(state => state.processReducer);
    const [cards, setCards] = useState("")
    
    useEffect(() => {
        setCards(processOne)
    }, [processOne])
    
    function handleOnDragEnd(result){
        if(!result.destination) return;
        const items = Array.from(cards);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem)

        setCards(items);
    }
    
    return <div className="proc1">
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="proc1-content" direction="horizontal">
                {(provided) => (
                <div className="proc1-content" 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}>
            
                    {cards && cards.map(({id, name, svg, color}, index) => {
                        return (
                            <Draggable key={id} 
                                draggableId={id.toString()}
                                index={index}>
                                {(provided) => ( 
                                <li className=".li" 
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef} >
                                    
                            <div className="svgOne">
                                {svg && <ReactSVG
                                    src={svg}
                                    beforeInjection={(img) => {
                                        img.classList.add('svg');
                                        img.setAttribute('class', 'svg')
                                        img.setAttribute("style", `fill : ${color}` )
                                    }}/>
                                }
                            </div>
                            <div className="colordivOne">
                                <div className="colordiv" style={{background: `linear-gradient(90deg, ${color}, ${cards[index+1] ? cards[index+1].color : "green"})`}}>  
                                    <div style={{backgroundColor : color, 
                                        height: "15px",width: "15px", borderRadius: "50%"}}></div>
                                    </div>
                                </div> 
                            <div className="nameOne"><span className="name">{name}</span></div>
                        
                        </li>)}
                            </Draggable>
                        )})}
                        {provided.placeholder}
                    </div>)}
                </Droppable>
            </DragDropContext> 
        <AddProcess/>
    </div>
}