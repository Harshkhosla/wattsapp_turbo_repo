import { AuthComponent } from "../component/Authcomponent"


export default  async function Signin(){
  return (
    <div>
        <AuthComponent isSignin={false}/>
    </div>
  )
}
