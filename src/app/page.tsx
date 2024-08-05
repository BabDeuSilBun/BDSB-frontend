import { text } from 'stream/consumers';
import Loading from './loading';

export default function Home() {
  // const handleTestClick = async () => {
  //   try {
  //     const response = await fetch('http://www.test.com/test');
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
    <div>
      <Loading />
    </div>
  );
}
