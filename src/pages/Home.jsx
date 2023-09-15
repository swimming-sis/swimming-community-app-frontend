import ButtonSubmit from '@/components/Button/ButtonSubmit';
import Logo from '@/components/Logo';
import useStorage from '@/hooks/useStorage';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';


function Home() {
  const storage = useStorage('users', null);
  const navigate = useNavigate();
  const userData = storage.storageData;

  

  const handleCheck = () => {
    if (userData) {
      navigate('/main');
    } else {

    navigate('/');
  }
}


  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard relative h-screen overflow-y-scroll">
      <Helmet>
        <title className="sr-only">어푸어푸</title>
      </Helmet>
      <div className="w-full h-screen">
        <Logo width={200} height={100} className={'absolute top-1/3 left-1/2 -translate-x-1/2'} />
          <ButtonSubmit
          className={'absolute bottom-0 w-[calc(100%-20px)] h-28'} 
          onClick={handleCheck}/>
      </div>
    </div>
  );
}

export default Home;
