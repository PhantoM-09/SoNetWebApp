import React, { useState } from 'react'
import { useContext } from 'react';
import { Tab, Nav, Col, Row } from 'react-bootstrap';
import { Context } from '../../..';
import Administration from './administration/Administration';
import DeleteUsers from './administration/Administration';
import AdminList from './administration/AdminList';
import BlockedUsers from './administration/block/BlockedUsers';

const Control = () => {
  const [currentTab, setCurrentTab] = useState(1);
  const { user } = useContext(Context);

  return (
    <div className="col-md-10">
      <div className='col-md'>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col>
              <Nav variant='pills' className='flex-column'>
                <Nav.Item>
                  <Nav.Link eventKey="first" onClick={() => setCurrentTab(1)}>Пользователи</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second" onClick={() => setCurrentTab(2)}>Журнал блокировок</Nav.Link>
                </Nav.Item>
                {user.userType === 'MainAdmin'
                  ?
                  (<Nav.Item>
                    <Nav.Link eventKey="third" onClick={() => setCurrentTab(3)}>Администраторы</Nav.Link>
                  </Nav.Item>)
                  :
                  (null)}

              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {currentTab === 1 ?
                    (<Administration />)
                    :
                    (null)
                  }
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  {currentTab === 2 ?
                    (<BlockedUsers />)
                    :
                    (null)
                  }
                </Tab.Pane>
                {user.userType === 'MainAdmin'
                  ?
                  ( <Tab.Pane eventKey="third">
                  {currentTab === 3 ?
                    (<AdminList />)
                    :
                    (null)
                  }
                </Tab.Pane>)
                  :
                  (null)}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default Control;