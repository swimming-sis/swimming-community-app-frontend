import ButtonSubmit from '@/components/Button/ButtonSubmit';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-w-[320px] max-w-[699px] mx-auto px-[10px] font-pretendard relative h-screen overflow-y-scroll">
      <h1 className='sr-only'>어푸어푸</h1>
      <div className="w-full h-screen">
        <Logo width={200} height={100} className={'absolute top-1/3 left-1/2 -translate-x-1/2'} />
        <Link to='/signup'>
        <ButtonSubmit className={'absolute bottom-0 w-[calc(100%-20px)] h-28'} />
        </Link>
      </div>
    </div>
  );
}

export default Home;
