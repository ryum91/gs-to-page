import { Card, Space, Tag } from 'antd';
import { CopyOutlined, PlayCircleOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

interface Props {
  dataRows: Record<string, string>[];
  headerColors: Record<string, string>;
  appendFilter: (key: string, value: string) => void;
}

export const CardView = ({ dataRows, headerColors, appendFilter }: Props) => {
  return (
    <Space align="center" wrap>
      {dataRows.map((data, index) => {
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
                  <Tag
                    key={categoryKey}
                    style={{ cursor: 'pointer' }}
                    color={headerColors[categoryKey]}
                    onClick={() => appendFilter(categoryKey, data[categoryKey])}
                  >
                    {data[categoryKey]}
                  </Tag>
                );
              })}
          </Card>
        );
      })}
    </Space>
  );
};
