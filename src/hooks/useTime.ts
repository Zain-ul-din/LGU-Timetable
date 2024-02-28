import axios from 'axios';
import { useEffect, useState } from 'react';

type UseTimeType = [Date, boolean];

const useTime = (): UseTimeType => {
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTime = async () => {
      const currTime = new Date(
        (await axios.get('http://worldtimeapi.org/api/timezone/Asia/Karachi')).data.datetime
      );

      setTime(currTime);
      setLoading(false);
    };

    fetchTime();

    const timeUpdater = setInterval(() => {
      setTime((prevTime) => {
        const updatedTime = new Date(prevTime);
        updatedTime.setSeconds(updatedTime.getSeconds() + 1);
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(timeUpdater);
  }, []);

  return [time, loading];
};

export default useTime;
