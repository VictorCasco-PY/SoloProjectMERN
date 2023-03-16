import { Fragment, useContext, useEffect } from "react"
import { FirstContext } from "../context/FirstContext";
import LoginRegister from "../components/LoginRegister"


const LoginPage = () => {

    const context = useContext(FirstContext);
    useEffect(() => {
        console.log(context);
    }, [])

    return (
        <Fragment>
            <LoginRegister />
        </Fragment>
    )
}
export default LoginPage;