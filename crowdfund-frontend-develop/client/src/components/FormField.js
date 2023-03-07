const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  isDate,
}) => {
  if (isTextArea) {
    return (
      <label className="flex-1 w-full flex flex-col">
        {labelName && (
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
            {labelName}
          </span>
        )}

        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      </label>
    );
  } else if (isDate) {
    return (
      <label className="flex-1 w-full flex flex-col">
        {labelName && (
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
            {labelName}
          </span>
        )}
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          min={new Date().toISOString().split("T")[0]}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      </label>
    );
  } else {
    return (
      <label className="flex-1 w-full flex flex-col">
        {labelName && (
          <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
            {labelName}
          </span>
        )}
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      </label>
    );
  }
};

export default FormField;
