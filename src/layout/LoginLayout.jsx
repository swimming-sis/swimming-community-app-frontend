import Logo from "@/components/Logo"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import propTypes from 'prop-types';

function LoginLayout ({content}) {
  return(
    <>
    <Helmet>
        <title className="sr-only">{content}</title>
      </Helmet>
    <Link to="/">
      <Logo width={200} height={100} className={'mt-10 mb-8'} />
    </Link>
    </>

  )
}
LoginLayout.propTypes = {
  content: propTypes.string,
};



export default LoginLayout