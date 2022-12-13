import { Tab, Nav, Col, Row, Container } from 'react-bootstrap';
import React from 'react'
import { useState } from 'react';
import MyFriend from './MyFriend';
import RequestFriend from './RequestFriend';
import SearchFriend from './SearchFriend';

const Friend = () => {
  const [currentTab, setCurrentTab] = useState(1);

  

  return (
    <div className="col-md-10">
      <div className='col-md'>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col>
                <Nav variant='pills' className='flex-column'>
                  <Nav.Item>
                    <Nav.Link eventKey="first" onClick={() => setCurrentTab(1)}>Мои друзья</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" onClick={() => setCurrentTab(2)}>Заявки в друзья</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third" onClick={() => setCurrentTab(3)}>Поиск друзей</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                  {currentTab === 1 ?
                      (<MyFriend/>)
                      :
                      (null)
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {currentTab === 2 ?
                      (<RequestFriend/>)
                      :
                      (null)
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    {currentTab === 3 ?
                      (<SearchFriend/>)
                      :
                      (null)
                    }
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
      </div>
    </div>
  );
}

export default Friend;