
import { useReducer, useState } from "react"
import { Button } from "./components/button"
import { Input } from "./components/input"
import { FaEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
const initialState = {
    email: '',
    name: '',
    password: '',
    confromPassword: ''
}
const errorState = {
    email: '',
    name: '',
    password: '',
    confromPassword: ''
}
const reduceHandler = (state, action) => {
    switch (action.type) {
        case 'email':
            return { ...state, email: action.payload }
        case 'password':
            return { ...state, password: action.payload }
        case 'conformPassword':
            return { ...state, confromPassword: action.payload }
        case 'name':
            return { ...state, name: action.payload }
    }
}

export function SignUp() {
    const [state, dispatch] = useReducer(reduceHandler, initialState)
    const [error, setError] = useState(errorState)
    const [passwordState, setPasswordState] = useState('hide')
    const [conformPasswordState, setConformPasswordState] = useState('hide')

    function formSubmitHandler(e) {
        e.preventDefault()
        const name = state.name;
        const email = state.email;
        const passowrd = state.password
        const confromPassword = state.confromPassword
        if (name.length < 3) {
            setError((curr) => ({ ...curr, name: "**required length for more than 3" }))
            return
        }
        if (!name.match('^[a-zA-Z]([a-zA-Z]*[0-9]+[a-zA-Z0-9]*|[a-zA-Z]*)$')
        ) {
            setError((curr) => ({ ...curr, name: "** Not valid name" }))
            return
        }
        if (!email.match(/^[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            setError((curr) => ({ ...curr, email: "** Invalid email format" }))
            return
        }
        if (!passowrd.match(/^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            setError((curr) => ({ ...curr, password: "** Password must be at least 8 characters long and include at least one lowercase letter, one number, and one special character (@$!%*?&)" }))
            return
        }

        if (passowrd !== confromPassword) {
            setError((curr) => ({ ...curr, confromPassword: "** Not matched " }))
            return
        }





    }
    return (
        <div className=" max-md:border border-black backdrop-blur-sm max-2xl:shadow-md rounded-md p-2 z-10 flex justify-center items-center flex-col select-none">

            <h1 className=" text-4xl  font-semibold">
                Sign Up
            </h1>
            <form className=" max-lg:w-[90vw] w-[35vw] max-w-[32rem] flex flex-col  gap-5 p-10" onSubmit={formSubmitHandler} >
                <div className=" flex gap-5 justify-between max-sm:flex-col">

                    <Input onChange={(e) => {
                        dispatch({ type: 'name', payload: e.target.value })
                        setError(errorState)
                    }} title={"Name"} type='text' error={error.name} />
                    <Input onChange={(e) => {
                        dispatch({ type: 'email', payload: e.target.value })
                        setError(errorState)
                    }} title={"Email"} type='text' error={error.email} />

                </div>



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


                <Input onChange={(e) => {
                    dispatch({ type: 'conformPassword', payload: e.target.value })
                    setError(errorState)
                }} title={"Confrom Password"}  type={conformPasswordState === 'hide' ? 'password' : 'text'} error={error.confromPassword} >
                    <button onClick={(e) => {
                        e.preventDefault()
                        setConformPasswordState((curr) => curr === 'show' ? 'hide' : 'show')
                    }}>
                        {
                            conformPasswordState === 'show' ? <FaEye /> : <IoMdEyeOff />
                        }

                    </button>
                </Input>
                <Button title="Sign Up" />

            </form>
            <h1 className=" text-gray-400 select-none">already have account ? <span className=" cursor-pointer font-semibold text-green-400">sing in</span></h1>
        </div>
    )
}