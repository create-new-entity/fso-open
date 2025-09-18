import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"


const Filter = () => {
    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        dispatch(changeFilter(e.target.value))
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