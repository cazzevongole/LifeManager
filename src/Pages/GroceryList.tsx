import React, { useContext, useEffect, useState } from "react"
import { Checkbox, Col, Divider, Input, InputNumber, Row, Space, Typography, message } from "antd";
import { CenteredFullDiv, NoBreak, useCSS } from "../Utils/Layout.tsx";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import { SpinContext } from "../App.tsx";

const { Title, Paragraph } = Typography;

type GroceryListItemType = {
  id: number;
  name: string;
  quantity: number;
  done: boolean;
}

type GroceryListItems = Record<number, GroceryListItemType>;

interface GroceryListItemComponentProps {
  id: number;
  name: string;
  quantity: number;
  done: boolean;
  items: GroceryListItems;
  setItems: React.Dispatch<React.SetStateAction<GroceryListItems>>;
}

var syncIntervalId;

const startSyncInterval = (getUserItems) => {
  stopSyncInterval();
  message.info('Sync will start in 10 seconds.');
  syncIntervalId = setInterval(() => {
    message.loading('Syncing with the server...');
    setTimeout(() => {
      message.info('Sync completed.');
      getUserItems();
    }, 2000);
    // sync modifications with the server
  }, 10000);
}

const stopSyncInterval = () => {
  if (syncIntervalId) clearInterval(syncIntervalId);
}

const GroceryListItem = ({ id, name, quantity, done, items, setItems }: GroceryListItemComponentProps) => {
  const [itemData, setItemData] = useState({ id, name, quantity, done });

  const updateItemData = (field: string, value: any) => {
    var itemId = itemData.id;
    setItemData({ ...itemData, [field]: value });
    setItems({ ...items, [itemId]: { ...itemData, [field]: value } });
  }

  return (
    <Col span={24}>
      <Row gutter={5} align={'middle'} style={{ width: '100%' }}>
        <Col span={2}>
          <Checkbox checked={itemData.done} onChange={(e) => {
            updateItemData('done', e.target.checked);
          }} />
        </Col>
        <Col span={22}>
          <Space.Compact style={{ width: '100%' }}>
            <InputNumber min={1} max={50} value={itemData.quantity} onChange={(qty) => {
              if (!qty) return;

              updateItemData('quantity', qty);
            }} />
            <Input
              value={itemData.name}
              placeholder="Type something here..."
              suffix={<CloseOutlined onClick={(e) => setItems((prevItems) => {
                const newItems = { ...prevItems };
                delete newItems[id];
                return newItems;
              })} />}
              onChange={(e) => {
                updateItemData('name', e.target.value);
              }}
            />
          </Space.Compact>
        </Col>
      </Row>
    </Col>
  )
}

const GroceryListNewItem = ({ id, name, quantity, done, items, setItems }: GroceryListItemComponentProps) => {
  const [itemData, setItemData] = useState({ id, name, quantity, done });

  const updateItemData = (field: string, value: any) => {
    setItemData({ ...itemData, [field]: value });
  }
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (!itemData.name) return;

        var newItemId = Object.keys(items).length + 1;

        setItems({ ...items, [newItemId]: itemData });
        setItemData({ id: 0, name: '', quantity: 1, done: false });
      }
    }
    document.addEventListener('keypress', handleKeyPress);

    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    }
  }, [itemData]);

  return (
    <Col span={24}>
      <Row gutter={5} align={'middle'} style={{ width: '100%' }}>
        <Col span={2}>
          <Checkbox 
          checked={itemData.done} 
          onChange={(e) => {
            updateItemData('done', e.target.checked);
          }}
          disabled
          />
        </Col>
        <Col span={22}>
          <Space.Compact style={{ width: '100%' }}>
            <InputNumber min={1} max={50} value={itemData.quantity} onChange={(qty) => {
              if (!qty) return;

              updateItemData('quantity', qty);
            }} />
            <Input
              value={itemData.name}
              placeholder="Type something here..."
              onChange={(e) => {
                updateItemData('name', e.target.value);
              }}
            />
          </Space.Compact>
        </Col>
      </Row>
    </Col>
  )
}

export const GroceryList = () => {
  const setSpin = useContext(SpinContext);

  const background = useCSS('background');
  const color = useCSS('color');

  const [items, setItems] = useState({} as GroceryListItems);

  const getUserItems = () => {
    // fetch user items from the server
    axios.get('https://mlmz8xrgxj.execute-api.eu-north-1.amazonaws.com/default/getUserGroceryList?user=cazzevongole').then((response) => {
      const items = response.data?.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      setItems(items);
      setSpin && setSpin(false);
    });
  }

  useEffect(() => {
    if (Object.keys(items).length > 0) { return }

    setSpin && setSpin(true);
    getUserItems();
  }, []);

  return (
    <CenteredFullDiv style={{ paddingTop: '20px' }}>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Your <NoBreak>Grocery List</NoBreak></Title>
      <Divider />
      <Row gutter={[10, 0]} style={{ width: '100%' }}>
        <Col span={24}>
          <Title level={5} style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Add a new item</Title>
        </Col>
        <GroceryListNewItem key={0} id={0} name={''} quantity={1} done={false} items={items} setItems={setItems} />
      </Row>
      <Divider />
      <Row key={'existing-items'} gutter={[10, 24]} style={{ width: '100%' }}>
        {
          Object.keys(items).length > 0 &&
          Object.keys(items).sort((itemId) => {
            return items[itemId].done ? 1 : -1;
          }).map((itemId) => {
            const item = items[itemId];
            return <GroceryListItem key={itemId} id={parseInt(itemId)} name={item.name} quantity={item.quantity} done={item.done} items={items} setItems={setItems} />
          })
        }
      </Row>
    </CenteredFullDiv>
  )
}
