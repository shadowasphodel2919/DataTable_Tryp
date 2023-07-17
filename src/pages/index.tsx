import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import DataTable from './DataTable'
const inter = Inter({ subsets: ['latin'] })

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
  const rows: RowData[] = [
    {
      timestamp: '2023-07-15 10:30:00',
      purchaseId: '123456',
      mail: 'john@example.com',
      name: 'John Doe',
      source: 'Website',
      status: 'success',
    },
    {
      timestamp: '2023-07-14 15:45:00',
      purchaseId: '789012',
      mail: 'jane@example.com',
      name: 'Jane Smith',
      source: 'App',
      status: 'waiting',
    },
    {
      timestamp: '2023-07-13 09:15:00',
      purchaseId: '345678',
      mail: 'alex@example.com',
      name: 'Alex Johnson',
      source: 'Website',
      status: 'failed',
    },
    {
      timestamp: '2023-07-12 12:00:00',
      purchaseId: '987654',
      mail: 'mike@example.com',
      name: 'Mike Anderson',
      source: 'App',
      status: 'success',
    },
    {
      timestamp: '2023-07-11 17:30:00',
      purchaseId: '654321',
      mail: 'emma@example.com',
      name: 'Emma Wilson',
      source: 'Website',
      status: 'waiting',
    },
    {
      timestamp: '2023-06-20 09:45:00',
      purchaseId: '543210',
      mail: 'alexander@example.com',
      name: 'Alexander Johnson',
      source: 'App',
      status: 'success',
    },
    {
      timestamp: '2023-06-19 14:20:00',
      purchaseId: '678905',
      mail: 'lisa@example.com',
      name: 'Lisa Smith',
      source: 'Website',
      status: 'failed',
    },
  ];

  return (
    <>
    <DataTable headers={headers} rows={rows} caption="Bookings"/>
    </>
  )
}
