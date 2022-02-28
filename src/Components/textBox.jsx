export const TextBox = ({ label, name, type, onChange, value, placeholder="", required=true}) => {
    return (
        <>
            <label for={name}>{label}</label>
            <input name={name} type={type} onChange={onChange} value={value} placeholder={placeholder} {...required? required: ""}/>
        </>
        
    )
}