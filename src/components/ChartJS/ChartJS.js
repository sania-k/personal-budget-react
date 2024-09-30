import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, PieController);

function ChartJS() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); 

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    const getData = async () => {

      const res = await axios.get('/budget.json');
      const budgetData = res.data.budget;

      const labels = budgetData.map(item => item.title);
      const data = budgetData.map(item => item.budget);
      
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

    
      chartInstanceRef.current = new Chart(ctx, {
        type: 'pie', // Specify the chart type
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Budget',
              data: data,
              backgroundColor: [
                'SteelBlue', 
                'LightSkyBlue', 
                'CadetBlue', 
                'CornflowerBlue', 
                'DarkSlateBlue', 
                'MidnightBlue', 
                'PaleTurquoise'
              ]
            },
          ],
        }
      });
     };

     
    getData();

    
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} id="chartjs" width="400" height="400"></canvas>;
}

export default ChartJS;
