import Header from './Header'
import Nav from './Nav'
import propTypes from 'prop-types';

function RootLayout ({ condition = 'default', content = '', noEdit=true}) {
  return (
    <>
    <Header condition={condition} content={content} noEdit={noEdit}/>
    <Nav />
    </>
  )
}
RootLayout.propTypes = {
  condition: propTypes.string,
  content: propTypes.string,
  noEdit: propTypes.bool
};
export default RootLayout