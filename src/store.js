import { writable } from 'svelte/store';
export const currentPage = writable('overview');
export const deviceno = writable(0);
export const ip="localhost:3333";


const cpuData = writable({ CpuPercUsed: 0, RamPercUsed: 0, Temperature: 0 });
let token=localStorage.getItem('Token');
console.log(token);
const fetchCpuData = async () => {
    try {
        const response = await fetch(`http://${ip}/hardware/ussage`,  {
      
          method: 'GET',
          headers: {
            'Tokenstring': `${token}`
          }
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            cpuData.set(data);
            cpuData.subscribe(value => {
              console.log(value.CpuPercUsed);
            });
        } else {
            console.error('Failed to fetch CPU data:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching CPU data:', error);
    }
};

const startFetching = () => {
    fetchCpuData(); 
    setInterval(fetchCpuData, 1000); 
};

export { cpuData, startFetching };
