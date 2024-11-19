const GenderChecker = ({ onCheckGender,selectGender}) => {
    return (
        <div className="flex ">
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectGender === 'male' ? "selected" : ""}`}>
                <span className="label-text text-white">Male</span>
            <input 
            checked={selectGender === 'male'}
            onChange={() => onCheckGender("male")} 
            type="checkbox" 
            className="checkbox border-slate-900" />
            </label>
        </div>
        
        <div className="form-control">
            <label className={`label gap-2 cursor-pointer ${selectGender === 'female' ? "selected" : "" }`}>
            <span className="label-text text-white">Female</span>
            <input 
            checked={selectGender === 'female'}
            onChange={() => onCheckGender("female")} 
            type="checkbox" 
            className="checkbox border-slate-900" />
            </label>
        </div>
        </div>
    )
}

export default GenderChecker;