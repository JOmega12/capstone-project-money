import { useState } from "react"


export const ChangeCategory = () => {

    const [categoryName, setCategoryName] = useState("");



    const handleSubmit = (e) => {

    }


    return(
        <>
        <div action=""
            onSubmit={}
        >
            <input type="text" name="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Change Name"/>
            <button>Save</button>
            <button>Cancel</button>
        </div>
        </>
    )
}