/* eslint-disable jsx-a11y/anchor-is-valid */
import { List, Tag } from 'antd';
import copy from 'copy-to-clipboard';

interface Props {
  dataRows: Record<string, string>[];
  headerColors: Record<string, string>;
  appendFilter: (key: string, value: string) => void;
}

export const ListView = ({ dataRows, headerColors, appendFilter }: Props) => {
  return (
    <List
      bordered
      dataSource={dataRows}
      renderItem={(item) => (
        <List.Item
          actions={[
            <a
              key="이동"
              onClick={() => {
                window.location.href = item.link;
              }}
            >
              바로가기
            </a>,
            <a
              key="복사"
              onClick={() => {
                copy(item.link);
                window.alert(`복사되었습니다.\n\n${item.link}`);
              }}
            >
              복사
            </a>,
          ]}
        >
          <List.Item.Meta
            title={item.name}
            description={Object.keys(item)
              .filter(
                (key) =>
                  key !== '' &&
                  key !== 'name' &&
                  key !== 'link' &&
                  item[key] !== undefined
              )
              .map((categoryKey) => {
                return (
                  <Tag
                    key={categoryKey}
                    style={{ cursor: 'pointer' }}
                    color={headerColors[categoryKey]}
                    onClick={() => appendFilter(categoryKey, item[categoryKey])}
                  >
                    {item[categoryKey]}
                  </Tag>
                );
              })}
          />
        </List.Item>
      )}
    />
  );
};
