import React, { useState } from 'react'
import { Tab, Nav, Col, Row } from 'react-bootstrap';
import AllUsers from './AllUsers';
import BlockedUsers from './BlockedUsers';

const Control = () =>{
    const [currentTab, setCurrentTab] = useState(1);

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
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                      {currentTab === 1 ?
                          (<AllUsers/>)
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

export default Control;