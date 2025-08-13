import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface InputProps {
    value: string;
    type: string;
    label?: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Inputs: React.FC<InputProps> = ({ value, type, label, placeholder, onChange }) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        //     <div>
        //         <label className='ml-18 text-slate-800'>{label}</label>
        //         <div className="input-box">
        //             <input type={type == 'password' ? showPassword ? 'text' : 'password' : type}
        //                 placeholder={placeholder}
        //                 value={value}
        //                 onChange={(e) => onChange(e)}
        //                 className="w-full bg-transparent outline-none"
        //             />
        //             {type === "password" && (
        //                 <>
        //                     {showPassword ? (
        //                         <FaRegEye
        //                             size={22}
        //                             className='text-gray-800 cursor-pointer'
        //                             onClick={() => toggleShowPassword()}
        //                         />
        //                     ) : (
        //                         <FaRegEyeSlash
        //                             size={22}
        //                             className='text-slate-800 cursor-pointer'
        //                             onClick={() => toggleShowPassword()}
        //                         />
        //                     )}
        //                 </>
        //             )}
        //         </div>
        //     </div>
        // )


        <div className="w-full">
            {label && (
                <label className='block text-slate-800 text-sm font-medium mb-2'>
                    {label}
                </label>
            )}
            <div className="input-box">
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className="flex-1 bg-transparent outline-none text-sm sm:text-base"
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="flex-shrink-0 p-1 hover:bg-slate-200 rounded transition-colors"
                    >
                        {showPassword ? (
                            <FaRegEye
                                size={20}
                                className='text-gray-600'
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={20}
                                className='text-slate-600'
                            />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Inputs;