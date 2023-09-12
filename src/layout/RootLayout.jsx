import Header from './Header'
import Nav from './Nav'
import propTypes from 'prop-types';

function RootLayout ({ type = 'default', content = '', noEdit=true}) {
  return (
    <>
    <Header type={type} content={content} noEdit={noEdit}/>
    <Nav />
    </>
  )
}
RootLayout.propTypes = {
  type: propTypes.string,
  content: propTypes.string,
  noEdit: propTypes.bool
};
export default RootLayout