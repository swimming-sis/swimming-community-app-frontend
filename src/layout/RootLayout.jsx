import Header from './Header'
import Nav from './Nav'
import propTypes from 'prop-types';

function RootLayout ({ 
  type = 'default', 
content = '', 
noEdit=true, 
...restProp}) {
  return (
    <>
    <Header 
    type={type} 
    content={content} 
    noEdit={noEdit} 
    {...restProp}
    />
    <Nav />
    </>
  )
}
RootLayout.propTypes = {
  type: propTypes.string,
  noEdit: propTypes.bool,
  content: propTypes.string,
};
export default RootLayout