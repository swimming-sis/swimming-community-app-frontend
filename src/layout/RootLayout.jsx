import Header from './Header'
import Nav from './Nav'
import propTypes from 'prop-types';

function RootLayout ({ type = 'default', content = '', noEdit=true, onSubmit}) {
  return (
    <>
    <Header type={type} content={content} noEdit={noEdit} onSubmit={onSubmit}/>
    <Nav />
    </>
  )
}
RootLayout.propTypes = {
  type: propTypes.string,
  content: propTypes.string,
  noEdit: propTypes.bool,
  onSubmit: propTypes.func
};
export default RootLayout