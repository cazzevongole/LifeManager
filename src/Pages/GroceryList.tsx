import React from "react"
import { Button, Checkbox, Col, Divider, Flex, Input, InputNumber, Row, Space, Typography } from "antd";
import { CenteredFullDiv, NoBreak, useCSS } from "../Utils/Layout.tsx";
import { CloseOutlined } from "@ant-design/icons";
import { falseFirstSorting, trueFirstSorting } from "../Utils/Data.tsx";

const { Title, Paragraph } = Typography;

interface GroceryListItemProps {
  name: string;
  quantity: number;
  done: boolean;
}
const GroceryListItem = ({ name, quantity, done }: GroceryListItemProps) => {

  return (
    <Col span={24}>
      <Row gutter={5}>
        <Col span={2}>
          <Checkbox checked={done} />
        </Col>
        <Col span={22}>
          <Space.Compact style={{width: '100%'}}>
            <InputNumber min={1} max={50} defaultValue={quantity}  />
            <Input
              defaultValue={name} 
              suffix={<CloseOutlined />}
            />
          </Space.Compact>
        </Col>
      </Row>
    </Col>
  )
}

export const GroceryList = () => {
  const background = useCSS('background');
  const color = useCSS('color');

  const items = [
    { name: 'Apples', quantity: 3, done: false },
    { name: 'Bananas', quantity: 6, done: true },
    { name: 'Oranges', quantity: 4, done: false },
    { name: 'Pineapple', quantity: 1, done: true },
    { name: 'Milk', quantity: 1, done: false },
    { name: 'Bread', quantity: 1, done: false },
    { name: 'Eggs', quantity: 12, done: true },
    { name: 'Butter', quantity: 1, done: false },
    { name: 'Cheese', quantity: 1, done: true },
    { name: 'Yogurt', quantity: 4, done: false },
    { name: 'Cereal', quantity: 1, done: false},
    { name: 'Pasta', quantity: 1, done: true },
    { name: 'Rice', quantity: 1, done: false },
    { name: 'Beans', quantity: 1, done: false },
    { name: 'Chicken', quantity: 1, done: true },
    { name: 'Beef', quantity: 1, done: false },
    { name: 'Pork', quantity: 1, done: false },
    { name: 'Fish', quantity: 1, done: true },
    { name: 'Shrimp', quantity: 1, done: false },
    { name: 'Crab', quantity: 1, done: false},
    { name: 'Lobster', quantity: 1, done: true},
    { name: 'Scallops', quantity: 1, done: false},
    { name: 'Mussels', quantity: 1, done: false},
    { name: 'Clams', quantity: 1, done: true},
    { name: 'Oysters', quantity: 1, done: false},
    { name: 'Squid', quantity: 1, done: false},
  ] as GroceryListItemProps[];

  return (
    <CenteredFullDiv style={{paddingTop: '20px'}}>
      <Title style={{ backgroundColor: background, color: color, textAlign: 'center' }}>Your <NoBreak>Grocery List</NoBreak></Title>
      <Divider />
      <Row gutter={[10, 24]}>
        {
          items.sort((a, b) => trueFirstSorting(a.done, b.done)).map((item, index) => (
            <GroceryListItem key={index} {...item} />
          ))
        }
      </Row>
    </CenteredFullDiv>
  )
}