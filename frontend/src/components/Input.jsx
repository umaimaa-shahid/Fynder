function Input({
    type = "text",
    placeholder,
    value,
    onChange,
    fullWidth = true,
  }) {
    return (
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          bg-[#082226] text-white 
          border border-gray-600 
          px-4 py-2 rounded-xl 
          focus:outline-none focus:border-[#2DFFEA]
          placeholder:text-gray-400
          ${fullWidth ? "w-full" : ""}
        `}
      />
    );
  }
  
  export default Input;