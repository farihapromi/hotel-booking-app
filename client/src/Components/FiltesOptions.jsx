export const CheckBox=({label,selected=false,onChange= () =>{}})=>{
    return(
        <label className='flex gap-3 items-center cursor-pointer'>
            <input type="checkbox" name="" id="" checked={selected}  onChange={(e)=>onChange(e.target.checked,label)}/>
            <span className='font-light select-none'>{label}</span>
        </label>
    )

}
export const RadioButton=({label,selected=false,onChange= () =>{}})=>{
    return(
        <label className='flex gap-3 items-center cursor-pointer'>
            <input type="radio" name="sortOption" id="" checked={selected}  onChange={(e)=>onChange(e.target.checked,label)}/>
            <span className='font-light select-none'>{label}</span>
        </label>
    )

}