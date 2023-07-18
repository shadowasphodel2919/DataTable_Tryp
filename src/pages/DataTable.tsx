import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Tag, Button, InputGroup, InputLeftElement, Input, Heading } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons'

type DataTableProps = {
  headers: string[];
  rows: RowData[];
  caption?: string;
};
type RowData = {
  timestamp: string;
  purchaseId: string;
  mail: string;
  name: string;
  source: string;
  status: string;
};

const DataTable: React.FC<DataTableProps> = ({ headers, rows, caption }) => {
  const [sortName, setSortName] = useState<boolean>(false);
  const [data, setData] = useState<RowData[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const itemsPerPage = 5; 

  useEffect(() => {
    setData(rows);
  }, [rows]);

  useEffect(() => {
    setCurrentPage(1); // Reset
  }, [data]);
  useEffect(() => {
    setData(rows)
  }, [])
  useEffect(() => {
    const filteredRows = rows.filter((row) => {
      return (
        row.timestamp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.purchaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.mail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
    setData(filteredRows);
  }, [rows, searchQuery]);
  

  const handleHeaderClick = (column: string, index: number) => {
    if(index === 0){
      if(sortName){
        setSortName(false);
        rows.sort((a, b) => {
          const timestampA = new Date(a.timestamp);
          const timestampB = new Date(b.timestamp);
          return timestampA.getTime() - timestampB.getTime();
        });
      }
      else{
        setSortName(true);
        rows.sort((a, b) => {
          const timestampA = new Date(a.timestamp);
          const timestampB = new Date(b.timestamp);
          return timestampB.getTime() - timestampA.getTime();
        });
      }
    }
    if(index === 1){
      if(sortName){
        setSortName(false)
        rows.sort((a, b) => {
          const purchaseIdA = parseInt(a.purchaseId);
          const purchaseIdB = parseInt(b.purchaseId);
          return purchaseIdA - purchaseIdB;
        });
      }
      else{
        setSortName(true)
        rows.sort((a, b) => {
          const purchaseIdA = parseInt(a.purchaseId);
          const purchaseIdB = parseInt(b.purchaseId);
          return purchaseIdB - purchaseIdA;
        });
      }
    }
    if(index === 2){
      if(sortName){
        setSortName(false)
        rows.sort((a, b) => {
          const mailA = a.mail.toLowerCase();
          const mailB = b.mail.toLowerCase();
          return mailA.localeCompare(mailB);
        });
      }
      else{
        setSortName(true)
        rows.sort((a, b) => {
          const mailA = a.mail.toLowerCase();
          const mailB = b.mail.toLowerCase();
          return mailB.localeCompare(mailA);
        });
      }
    }
    if(index === 3){
      if(sortName){
        setSortName(false)
        rows.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return nameA.localeCompare(nameB);
        });
      }
      else{
        setSortName(true)
        rows.sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          return nameB.localeCompare(nameA);
        });
      }
    }
  }

  const getTimeAgo = (timestamp: string): string => {
    const currentTime = new Date();
    const previousTime = new Date(timestamp);

    const elapsedMilliseconds = currentTime.getTime() - previousTime.getTime();

    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    if (elapsedSeconds < 60) {
      return `${elapsedSeconds} seconds ago`;
    }

    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    if (elapsedMinutes < 60) {
      return `${elapsedMinutes} minutes ago`;
    }

    const elapsedHours = Math.floor(elapsedMinutes / 60);
    if (elapsedHours < 24) {
      return `${elapsedHours} hours ago`;
    }

    const elapsedDays = Math.floor(elapsedHours / 24);
    if (elapsedDays < 7) {
      return `${elapsedDays} days ago`;
    }

    const elapsedWeeks = Math.floor(elapsedDays / 7);
    if (elapsedWeeks < 4) {
      return `${elapsedWeeks} weeks ago`;
    }

    const elapsedMonths = Math.floor(elapsedDays / 30.44);
    if (elapsedMonths < 12) {
      return `${elapsedMonths} months ago`;
    }

    const elapsedYears = Math.floor(elapsedDays / 365);
    return `${elapsedYears} years ago`;
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      const maxPage = Math.ceil(data.length / itemsPerPage);
      return nextPage > maxPage ? maxPage : nextPage;
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage - 1;
      return nextPage < 1 ? 1 : nextPage;
    });
  };

  const onSubmit = (row: RowData): any =>{
    alert(`${row.name} selected`)
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageData = data.slice(startIndex, endIndex);

  return (
    <div>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search' size='lg' />
      </InputGroup>
      {caption && <Heading as='h3' size='lg'>{caption}</Heading>}
    <Table variant="striped">
      <Thead>
        <Tr>
          {headers?.map((header: string, index: number) => (
            <Th key={index} onClick={() => handleHeaderClick(header, index)} cursor="pointer">
              {header}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
      {currentPageData?.map((row: RowData, index: number) => (
          <Tr key={index}>
            <Td>{getTimeAgo(row.timestamp)}</Td>
          <Td>{row.purchaseId}</Td>
          <Td>{row.mail}</Td>
          <Td>{row.name}</Td>
          <Td>{row.source}</Td>
          <Td>
            {row.status === 'failed' && (
              <Tag colorScheme="red">Failed</Tag>
            )}
            {row.status === 'success' && (
              <Tag colorScheme="green">Success</Tag>
            )}
            {row.status === 'waiting' && (
              <Tag colorScheme="orange">Waiting</Tag>
            )}
          </Td>
          <Td><Button colorScheme='green' onClick={() => onSubmit(row)}>Select</Button></Td>
        </Tr>
      ))}
      </Tbody>
      {/* Pagination section */}
      <Tfoot>
        <Tr>
          <Td colSpan={headers?.length}>
            <Button
              colorScheme="teal"
              disabled={currentPage === 1}
              onClick={handlePreviousPage}
            >
              Previous Page
            </Button>
            <Button
              ml={4}
              colorScheme="teal"
              disabled={endIndex >= data.length}
              onClick={handleNextPage}
            >
              Next Page
            </Button>
            <span style={{ marginLeft: '10px' }}>
              Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
            </span>
          </Td>
        </Tr>
      </Tfoot>
    </Table>
    </div>
  );
};

export default DataTable;
