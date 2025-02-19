export function Input({ type, placeholder, title, error, onChange, children }) {
    return (
        <div>
            <h1>{title}</h1>
            <div className={` group ${error ? "bg-red-100" : ""} outline-none border border-gray-300 rounded-md py-1 px-2 w-full ${error && "border-red-400" } flex gap-2 items-center`} >
                <input className=" w-full outline-none" onChange={onChange} type={type} placeholder={placeholder} />
                {
                    children
                }
            </div>

            <h1 className=" text-red-500 text-sm">{error}</h1>
        </div>

    )
}