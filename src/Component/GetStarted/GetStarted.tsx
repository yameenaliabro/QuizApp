import { Form,Button,Typography} from "antd"
import {Outlet,useNavigate} from "react-router-dom"
import "./GetStarted.css"
function GetStarted(){
    let {Title} = Typography
    let navigate = useNavigate()
   let goquizhandler = () =>{
        navigate("/quiz-app")
    }
return(
    <div className="contain">
     <Form>
        <Title level={2}>Get Started Quiz  Best of Luck</Title>
        <Form.Item>
          <Button type="primary" block size="large" onClick={goquizhandler}>Get Started</Button>
        </Form.Item>
     </Form>
     <Outlet/>
     
    </div>
)
}
export default GetStarted