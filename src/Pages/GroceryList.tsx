import React, { useEffect } from "react"
import { Button, Checkbox, Col, Divider, Input, InputNumber, Row, Space, Typography } from "antd";
import { CenteredFullDiv, NoBreak, useCSS } from "../Utils/Layout.tsx";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Paragraph } = Typography;

interface GroceryListItemProps {
  itemId: number;
  name: string;
  quantity: number;
  done: boolean;
  getUserItems: () => void;
}

var syncIntervalId;

const startSyncInterval = (getUserItems) => {
  syncIntervalId = setInterval(() => {
    console.log('Syncing with the server...');
    setTimeout(() => {
      console.log('Sync completed.');
      getUserItems();
    }, 2000);
    // sync modifications with the server
  }, 10000);
}

const stopSyncInterval = () => {
  clearInterval(syncIntervalId);
}

const restartSyncInterval = (getUserItems) => {
  stopSyncInterval();
  startSyncInterval(getUserItems);
}

const GroceryListItem = ({ itemId, name, quantity, done, getUserItems }: GroceryListItemProps) => {
  const [itemData, setItemData] = React.useState({ itemId, name, quantity, done });

  return (
    <Col span={24}>
      <Row gutter={5} align={'middle'}>
        <Col span={2}>
          <Checkbox defaultChecked={itemData.done} onChange={(e) => {
            setItemData({ ...itemData, done: e.target.checked });
            restartSyncInterval(getUserItems);
          }} />
        </Col>
        <Col span={22}>
          <Space.Compact style={{ width: '100%' }}>
            <InputNumber min={1} max={50} defaultValue={itemData.quantity} onChange={(qty) => {
              if (!qty) return;

              setItemData({ ...itemData, quantity: qty });
              restartSyncInterval(getUserItems);
            }} />
            <Input
              defaultValue={itemData.name}
              suffix={<CloseOutlined />}
              onChange={(e) => {
                setItemData({ ...itemData, name: e.target.value });
                restartSyncInterval(getUserItems);
              }}
            />
          </Space.Compact>
        </Col>
      </Row>
    </Col>
  )
}

type GroceryListItems = Record<number, GroceryListItemProps>;

export const GroceryList = () => {
  const background = useCSS('background');
  const color = useCSS('color');

  const [items, setItems] = React.useState({} as GroceryListItems);

  const getUserItems = () => {
    // fetch user items from the server
    axios.get('https://my.api.mockaroo.com/grocery_list.json?key=207f0c70').then((response) => {
      var testData = [
        {
          "id": 1,
          "name": "Water - Mineral, Carbonated",
          "quantity": 1,
          "done": false
        },
        {
          "id": 2,
          "name": "Soup - Knorr, Veg / Beef",
          "quantity": 2,
          "done": false
        },
        {
          "id": 3,
          "name": "Crab - Blue, Frozen",
          "quantity": 3,
          "done": true
        },
        {
          "id": 4,
          "name": "Pork - Bacon,back Peameal",
          "quantity": 4,
          "done": true
        },
        {
          "id": 5,
          "name": "Wine - Rosso Toscano Igt",
          "quantity": 5,
          "done": false
        },
        {
          "id": 6,
          "name": "Syrup - Monin - Passion Fruit",
          "quantity": 6,
          "done": false
        },
        {
          "id": 7,
          "name": "Sauce - Hp",
          "quantity": 7,
          "done": true
        },
        {
          "id": 8,
          "name": "Mushroom - Portebello",
          "quantity": 8,
          "done": true
        },
        {
          "id": 9,
          "name": "Pork - Ham Hocks - Smoked",
          "quantity": 9,
          "done": true
        },
        {
          "id": 10,
          "name": "Salt - Rock, Course",
          "quantity": 10,
          "done": false
        },
        {
          "id": 11,
          "name": "Container - Foam Dixie 12 Oz",
          "quantity": 11,
          "done": true
        },
        {
          "id": 12,
          "name": "Wine - Penfolds Koonuga Hill",
          "quantity": 12,
          "done": false
        },
        {
          "id": 13,
          "name": "Chocolate - Compound Coating",
          "quantity": 13,
          "done": false
        },
        {
          "id": 14,
          "name": "Muffin - Banana Nut Individual",
          "quantity": 14,
          "done": false
        },
        {
          "id": 15,
          "name": "Mustard Prepared",
          "quantity": 15,
          "done": false
        },
        {
          "id": 16,
          "name": "Compound - Mocha",
          "quantity": 16,
          "done": true
        },
        {
          "id": 17,
          "name": "Cup Translucent 9 Oz",
          "quantity": 17,
          "done": false
        },
        {
          "id": 18,
          "name": "Onions Granulated",
          "quantity": 18,
          "done": false
        },
        {
          "id": 19,
          "name": "Munchies Honey Sweet Trail Mix",
          "quantity": 19,
          "done": true
        },
        {
          "id": 20,
          "name": "Coffee Beans - Chocolate",
          "quantity": 20,
          "done": true
        },
        {
          "id": 21,
          "name": "Beef - Ground Medium",
          "quantity": 21,
          "done": true
        },
        {
          "id": 22,
          "name": "Cheese - Gorgonzola",
          "quantity": 22,
          "done": false
        },
        {
          "id": 23,
          "name": "Icecream Cone - Areo Chocolate",
          "quantity": 23,
          "done": true
        },
        {
          "id": 24,
          "name": "Stainless Steel Cleaner Vision",
          "quantity": 24,
          "done": true
        },
        {
          "id": 25,
          "name": "Sobe - Orange Carrot",
          "quantity": 25,
          "done": false
        }
      ]
      const testItems = testData.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});

      // re-enable this line when the server is ready
      const items = response.data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
      setItems(testItems);
    });
  }

  useEffect(() => {
    if (Object.keys(items).length > 0) { return }
    getUserItems();
    startSyncInterval(getUserItems);

    return () => {
      stopSyncInterval();
    }
  }, []);


  return (
    <CenteredFullDiv style={{ paddingTop: '20px' }}>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Your <NoBreak>Grocery List</NoBreak></Title>
      <Divider />
      <Row gutter={[10, 24]}>
        {
          Object.keys(items).sort((itemId) => {
            return items[itemId].done ? 1 : -1;
          }).map((itemId) => {
            const item = items[itemId];
            return <GroceryListItem key={itemId} itemId={parseInt(itemId)} name={item.name} quantity={item.quantity} done={item.done} getUserItems={getUserItems} />
          })
        }
      </Row>
    </CenteredFullDiv>
  )
}
