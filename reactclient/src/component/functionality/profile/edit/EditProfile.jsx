import React, { useState } from 'react'
import { Tab, Nav, Col, Row } from 'react-bootstrap';
import EditInformation from './EditInformation';
import EditPictures from './EditPictures';

const EditProfile = () =>{
    const [currentTab, setCurrentTab] = useState(1);

    return(
        <div className='col-md-10'>
             <div className='col-md' >
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col style={{marginRight: '-1%'}}>
                <Nav variant='pills' className='flex-column'>
                  <Nav.Item>
                    <Nav.Link eventKey="first" onClick={() => setCurrentTab(1)}>Информация</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second" onClick={() => setCurrentTab(2)}>Изображения</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                  {currentTab === 1 ?
                      (<EditInformation/>)
                      :
                      (null)
                    }
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {currentTab === 2 ?
                      (<EditPictures/>)
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
    )
}

export default EditProfile;