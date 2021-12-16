import { Input, Button } from 'antd';
import copy from 'copy-to-clipboard';
import { useCallback, useState } from 'react';

export const GeneratePage = () => {
  const [id, setId] = useState<string>('');
  const [key, setKey] = useState<string>('');

  const [output, setOutput] = useState<string>('');

  const handleClick = useCallback((inputId: string, inputKey: string) => {
    try {
      setOutput(
        `${window.location.href}?id=${inputId}&key=${btoa(
          JSON.stringify(JSON.parse(inputKey))
        )}`
      );
      window.alert('생성되었습니다.');
    } catch (e) {
      window.alert('값이 입력되지 않았거나, 잘못되었습니다.');
    }
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1>Google SpreadSheet 페이지 만들기</h1>
      </div>
      <div className="contents">
        <Input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Google SpreadSheet ID"
        ></Input>
        <br />
        <br />
        <Input.TextArea
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="JSON Key"
          rows={10}
        ></Input.TextArea>
        <br />키 발급:{' '}
        <a href="https://console.cloud.google.com/apis/credentials">
          Google Cloud Platform
        </a>
        <br />
        <br />
        <Button style={{ width: '100%' }} onClick={() => handleClick(id, key)}>
          생성
        </Button>
        <br />
        <br />
        {!!output && (
          <>
            <Button
              onClick={() => {
                copy(output);
                window.alert('클립보드에 복사되었습니다.');
              }}
            >
              복사
            </Button>{' '}
            <Button onClick={() => (window.location.href = output)}>
              이동하기
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
