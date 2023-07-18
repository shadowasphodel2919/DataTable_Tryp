import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import DataTable from './DataTable'
const inter = Inter({ subsets: ['latin'] })
import { useEffect, useState } from 'react'

type RowData = {
  timestamp: string;
  purchaseId: string;
  mail: string;
  name: string;
  source: string;
  status: string;
};

export default function Home() {
  const headers = ['Timestamp', 'Purchase Id', 'Mail', 'Name', 'Source', 'Status', 'Select'];
  const [jsonData, setJsonData] = useState<RowData[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        setJsonData(data as RowData[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <DataTable headers={headers} rows={jsonData} caption="Bookings"/>
    </>
  )
}
