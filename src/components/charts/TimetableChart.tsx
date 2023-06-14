import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

import { ApexOptions } from 'apexcharts';
import { useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const options_initial: ApexOptions = {
    theme: {
       mode: 'dark'
    },
    chart: {
       id: 'apexchart-example',
       background: 'var(--grey-color)',
       toolbar: {
          show: false
       }
    },
    xaxis: {
       categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '']
    },
    dataLabels: {
       enabled: true,
       style: {
        colors: ['var(--grey-color)']  
      }
    },
    legend: {
       show: false
    },
    stroke: {
        curve: 'smooth'
    }
};

export default function TimetableChart ({
    timetable
}: { timetable: Array<any> })
{
    const [series, setSeries] = useState([{
        name: 'Lectures',
        data: [1,2,3,4,5,6,9]
     }]);


    useEffect(()=> {
        setSeries([{
            ...series[0],
            data: timetable.map (([_, days])=> days.length)
        }])
    }, [timetable]);

    const [isUnder800] = useMediaQuery("(max-width: 800px)");
    
    return <>
        <div>
            <Chart options={options_initial}  series={series} type="area" width={'100%'} height={isUnder800 ? 'auto' : '450'} />
        </div>
    </>
}
