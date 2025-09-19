import { useDispatch } from "react-redux"
import { filter } from "../reducers/filterReducer"


const Filter = () => {
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        dispatch(filter(e.target.value))
    }
    
    return (
        <div>
            <label>
                Filter
                <input onChange={handleInputChange}/>
            </label>
        </div>
    )
}

export default Filter