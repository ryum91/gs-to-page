import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { Space, Card, Tag } from 'antd';
import { CopyOutlined, PlayCircleOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

import { GeneratePage } from './GeneratePage';
import './App.css';

const params = new URLSearchParams(window.location.search);
const key = params.get('key');
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

  const init = useCallback(async () => {
    if (!id) {
      return;
    }

    if (!key) {
      return;
    }

    const resKey = JSON.parse(atob(key));
    const docs = new GoogleSpreadsheet(id);
    await docs.useServiceAccountAuth(resKey);
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
      window.alert('ID나 KEY에 문제가 있습니다. 확인해주세요.');
      window.location.href = window.location.origin;
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

  // const headerOptions = useMemo(() => {
  //   return filteredHeaders.reduce((prev, header) => {
  //     prev[header] = dataRows
  //       .map((dataRow) => dataRow[header])
  //       .filter((data, index, origin) => {
  //         return origin.indexOf(data) === index;
  //       });
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
      {/* <div className="filters">
        {filteredHeaders.map((header) => {
          return (
            <Select key={header}>
              {headerOptions[header]?.map((value, index) => {
                return (
                  <Select.Option key={`${value}-${index}`} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          );
        })}
      </div> */}
      <div className="contents">
        <Space wrap>
          {dataRows?.map((data, index) => {
            return (
              <Card
                key={index}
                title={data.name}
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
                        <Tag color={headerColors[categoryKey]}>
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
