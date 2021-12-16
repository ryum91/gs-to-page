import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Space, Card, Tag, Divider } from 'antd';
import { CopyOutlined, PlayCircleOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

import { GeneratePage } from './GeneratePage';
import './App.css';

const params = new URLSearchParams(window.location.search);
const key = params.get('key') ?? 'AIzaSyCVFJD2CdbZlE6TxlYvVWFMe3OXX03AKBE';
const id = params.get('id');

const colorSets = [
  'red',
  'gold',
  'green',
  'blue',
  'purple',
  'magenta',
  'orange',
  'lime',
  'cyan',
  'volcano',
  'geekblue',
];

function App() {
  const [title, setTitle] = useState<string>('');
  const [headers, setHeaders] = useState<string[]>([]);
  const [dataRows, setDataRows] = useState<Record<string, string>[]>([]);
  const [filters, setFilters] = useState<Record<string, string>[]>([]);

  const init = useCallback(async () => {
    if (!id) {
      return;
    }

    const docs = new GoogleSpreadsheet(id);
    docs.useApiKey(key);
    await docs.loadInfo();
    document.title = docs.title;
    setTitle(docs.title);

    const sheet = docs.sheetsByIndex[0];
    const rows = await sheet.getRows();

    const headerValues = sheet.headerValues;
    setHeaders(headerValues);
    setDataRows(
      rows.map((row) => {
        const result: Record<string, string> = {};

        headerValues.forEach((header) => {
          result[header] = row[header];
        });
        return result;
      })
    );
  }, []);

  useLayoutEffect(() => {
    init().catch((e) => {
      window.alert('ID나 KEY에 문제가 있습니다. 다시 확인해주세요.');
      window.location.href = `${window.location.origin}${window.location.pathname}`;
    });
  }, [init]);

  const filteredHeaders = useMemo(() => {
    return headers.filter(
      (header) => header !== '' && header !== 'name' && header !== 'link'
    );
  }, [headers]);

  const headerColors = useMemo(() => {
    return filteredHeaders.reduce((prev, header, index) => {
      prev[header] = colorSets[index];
      return prev;
    }, {} as Record<string, string>);
  }, [filteredHeaders]);

  const appendFilter = useCallback(
    (key: string, value: string) => {
      const isDuplicate = filters.some((filter) => {
        const [targetKey, targetValue] = Object.entries(filter)[0];
        return targetKey === key && targetValue === value;
      });

      if (isDuplicate) {
        return;
      }

      setFilters([...filters, { [key]: value }]);
    },
    [filters]
  );

  const removeFilter = useCallback(
    (key: string, value: string) => {
      setFilters(
        filters.filter((filter) => {
          const [targetKey, targetValue] = Object.entries(filter)[0];
          return !(targetKey === key && targetValue === value);
        })
      );
    },
    [filters]
  );

  const filteredDataRow = useMemo(() => {
    if (!filters.length) {
      return dataRows;
    }

    return dataRows.filter((dataRow) => {
      return filters.every((filter) => {
        const [filterKey, filterValue] = Object.entries(filter)[0];
        return dataRow[filterKey] === filterValue;
      });
    });
  }, [dataRows, filters]);

  // const headerOptions = useMemo(() => {
  //   return filteredHeaders.reduce((prev, header) => {
  //     prev[header] = dataRows
  //       .map((dataRow) => dataRow[header])
  //       .filter((data, index, origin) => origin.indexOf(data) === index);
  //     prev[header].push('ALL');
  //     return prev;
  //   }, {} as Record<string, string[]>);
  // }, [filteredHeaders, dataRows]);

  if (!id || !key) {
    return <GeneratePage />;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{title}</h1>
      </div>
      <div className="filters">
        <Space wrap>
          {!!filters.length && <br />}
          {filters.map((filter) => {
            const [key, value] = Object.entries(filter)[0];
            return (
              <Tag
                key={`${key}-${value}`}
                closable
                color={headerColors[key]}
                onClose={() => removeFilter(key, value)}
              >
                {value}
              </Tag>
            );
          })}
        </Space>
      </div>
      <Divider></Divider>
      <div className="contents">
        <Space align="center" wrap>
          {filteredDataRow.map((data, index) => {
            return (
              <Card
                key={index}
                title={data.name}
                size="small"
                actions={[
                  <PlayCircleOutlined
                    key="이동"
                    onClick={() => {
                      window.location.href = data.link;
                    }}
                  />,
                  <CopyOutlined
                    key="복사"
                    onClick={() => {
                      copy(data.link);
                      window.alert(`복사되었습니다.\n\n${data.link}`);
                    }}
                  />,
                ]}
              >
                {Object.keys(data)
                  .filter(
                    (key) =>
                      key !== '' &&
                      key !== 'name' &&
                      key !== 'link' &&
                      data[key] !== undefined
                  )
                  .map((categoryKey) => {
                    return (
                      <p key={categoryKey}>
                        <Tag
                          style={{ cursor: 'pointer' }}
                          color={headerColors[categoryKey]}
                          onClick={() =>
                            appendFilter(categoryKey, data[categoryKey])
                          }
                        >
                          {data[categoryKey]}
                        </Tag>
                      </p>
                    );
                  })}
              </Card>
            );
          })}
        </Space>
      </div>
    </div>
  );
}

export default App;
