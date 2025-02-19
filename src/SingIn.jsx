
import { useReducer, useState } from "react"
import { Button } from "./components/button"
import { Input } from "./components/input"
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
const initialState = {
    email: '',
    password: '',

}
const errorState = {
    email: '',
    password: '',

}
const reduceHandler = (state, action) => {
    switch (action.type) {
        case 'email':
            return { ...state, email: action.payload }
        case 'password':
            return { ...state, password: action.payload }

    }
}

export function SignIn() {
    const [state, dispatch] = useReducer(reduceHandler, initialState)
    const [error, setError] = useState(errorState)
    const [passwordState, setPasswordState] = useState('hide')

    function formSubmitHandler(e) {
        e.preventDefault()
        const email = state.email;
        const passowrd = state.password

        if (!email.match(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            setError((curr) => ({ ...curr, email: "** Invalid email format" }))
            return
        }
        if (!passowrd.match(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            setError((curr) => ({ ...curr, password: "** Password must be at least 8 characters long and include at least one lowercase letter, one number, and one special character (@$!%*?&)" }))
            return
        }






    }
    return (
        <div className=" backdrop-blur-sm bg-white max-2xl:shadow-md rounded-md p-2 z-10 flex justify-center items-center flex-col select-none">

            <h1 className=" text-4xl  font-semibold">
                Sign Up
            </h1>
            <form className=" max-lg:w-[90vw] w-[35vw] max-w-[32rem] flex flex-col  gap-3 p-10" onSubmit={formSubmitHandler} >

                <Input onChange={(e) => {
                    dispatch({ type: 'email', payload: e.target.value })
                    setError(errorState)
                }} title={"Email"} type='text' error={error.email} />





                <Input onChange={(e) => {
                    dispatch({ type: 'password', payload: e.target.value })
                    setError(errorState)
                }} title={"Password"} type={passwordState === 'hide' ? 'password' : 'text'} error={error.password} >
                    <button onClick={(e) => {
                        e.preventDefault()
                        setPasswordState((curr) => curr === 'show' ? 'hide' : 'show')
                    }}>
                        {
                            passwordState === 'show' ? <FaEye /> : <IoMdEyeOff />
                        }

                    </button>

                </Input>



                <Button title="Sign In" />

            </form>
            <h1 className=" text-gray-400 select-none">already have account ? <span className=" cursor-pointer font-semibold text-green-400">sing up</span></h1>
        </div>
    )
}