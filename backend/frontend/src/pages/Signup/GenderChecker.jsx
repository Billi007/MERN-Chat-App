const GenderChecker = ({ onCheckGender,selectGender}) => {
    console.log(selectGender)
    return (
        <div className="flex ">
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectGender === 'male' ? "selected" : ""}`}>
                <span className="label-text text-white text-xs">Male</span>
            <input 
           
            onChange={() => onCheckGender("male")} 
            type="checkbox" 
            className="checkbox border-white " />
            </label>
        </div>
        
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectGender === 'female' ? "selected" : "" }`}>
            <span className="label-text text-white text-xs">Female</span>
            <input 
    
            onChange={() => onCheckGender("female")} 
            type="checkbox" 
            className="checkbox border-white " />
            </label>
        </div>
        </div>
    )
}

export default GenderChecker;