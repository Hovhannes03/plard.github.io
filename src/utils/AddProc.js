import { useState } from "react"
import "../components/proc.css"
// import { getProcessOne } from "../redux/slices/processSlice"
import { useDispatch } from "react-redux"
import AddPostImg from "./addPostImg"
import { TextField } from "@mui/material"
import AddColor from "./addColor"
import { addProc, getProcessOne } from "../redux/slices/processSlice"
// import { TextField } from "@mui/material"


export default function AddProcess({colorAddButton}) {
    const dispatch = useDispatch()
    const [modal, setModal] = useState(false)
    const [name, setName] = useState("")
    const [images, setImages] = useState("")
    const [color, setColor] = useState("")
    const [btnValue, setBtnValue] = useState("+")
    function toggleModal() { 
      setModal(!modal)
    }

    return <div className="addProc">
      <button className="add" style={{backgroundColor : colorAddButton}}
        onClick={() => {
          setModal(!modal)
          btnValue === "+" 
          ? setBtnValue("v") 
          : setBtnValue("+")

          btnValue === "v" && name !== "" && color !== "" && images !== "" && dispatch(addProc({
            name: name,
            svg: images[0].file.name,
            color: color
          })).then(() => dispatch(getProcessOne()))
          setName("")
          setColor("")
          setImages("")
          }}>
          {btnValue}
      </button>
      {modal &&
        <div className='modal'>
          <div className='modal-content'>

            <div className="img-name-postModal">
                <AddPostImg className="img-addpost"
                  images = {images}
                  setImages = {setImages}
                />
                
                <TextField
                    id="standard-basic" 
                    label="Про" 
                    variant="standard" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    type="text" placeholder="Process" 
                />
            </div>
            <AddColor 
              setColor = {setColor}
            />
            {/* <button className='addCat' onClick={() => {
                name !== "" && color !== "" && images !== "" && toggleModal()
                name !== "" && color !== "" && images !== "" && dispatch(addProc({
                  name: name,
                  svg: images[0].file.name,
                  color: color
                })).then(() => dispatch(getProcessOne()))
                setName("")
                setColor("")
                setImages("")
            }}>
              Add
            </button> */}
          </div>
        </div>
        
      }
      {
        // modal ? document.body.classList.add("activeModal") : document.body.classList.remove("activeModal")
      }
    </div> 
  
}