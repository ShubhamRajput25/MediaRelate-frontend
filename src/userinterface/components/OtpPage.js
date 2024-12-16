import { useRef } from "react"
import { toast } from "react-toastify"
import { postData } from "../../services/fetchnodeservices"

export default function OtpPage(){
    const [otp, setOtp] = useState(["", "", "", ""])
    const inputRefs = useRef([])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const otpValue = otp.join("");
        if (otpValue.length === 4) {
          let result = await postData(``)
          if(result?.status){

          }else{
            
          }
        } else {
          toast?.error("Please enter a complete 4-digit OTP.");
        }
    }

    const handleChange = (e, index)=>{
        const value = e?.target?.value

        // allow only single digit input
        if (!/^[0-9]?$/.test(value)) return

        // set new otp in otp hook
        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        // move to the next input
        if(value && index < 3) {
            inputRefs?.current[index + 1]?.focus()
        }

    }

    const handleKeyDown = (e, index)=>{
        if(e.key === "Backspace") {
            if(otp[index] === ""){
                if(index > 0){
                    inputRefs?.current[index - 1]?.focus()
                }
            }else{
                const newOtp = [...otp]
                newOtp[index] = ""
                setOtp(newOtp)
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
          } else if (e.key === "ArrowRight" && index < 3) {
            inputRefs.current[index + 1].focus();
          }
    }

    return (<div className="otp-page">
        <h1>Enter OTP</h1>
        <form onSubmit={handleSubmit} className="otp-form" >
        <div className="otp-inputs">
            {otp?.map((digit, index)=>{
                <input 
                    key={index}
                    type="text"
                    maxLength="1"
                    onChange={(e)=>handleChange(e, index)}
                    ref={(el)=>(inputRefs.current[index] = el)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                />
            })}
        </div>
        <button type="submit" >Submit</button>
        </form>
    </div>)
}