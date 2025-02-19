
import { Calendar } from './Caledar'
import { SignUp } from './SignUp'

import { SignIn } from './SingIn'
function App() {
  return(
  <>
  
  <div className=' relative p-3 flex h-screen  items-center justify-center'>
  <SignUp/>
  <img className=' max-sm:mb-96 max-2xl:absolute w-full h-full object-contain' src={'../public/execersice.png'}/>

  </div>
  </>
  
  )
}

export default App
