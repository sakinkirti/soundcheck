import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const PostGrid = ({colCount, children, md}) => {

  let rowCount = Math.floor(children.length/colCount) +1;
  let index = 0;

  const buildGrid = () => {
    return (
      renderRows()
    )
  }

  const renderRows = () => {
    let rows = []
    for (let row = 0; row < rowCount; row++) {
      rows.push(
        <Row className='row'>
          {renderCols()}
        </Row>
      )
    }
    return rows
  }

  const renderCols = () => {
    let cols = []
    for (let col = 0; col < colCount; col++) {
      if (index < children.length) {
        cols.push(
          <Col md={md} className='col' style={{marginBottom: '15px'}}>
            {children[index]}
          </Col>
        )
        index++
      }
    }
    return cols
  }

  return (
    <Container style={{backgroundColor: 'white'}}>
      {buildGrid()}
    </Container>
  )
}

export default PostGrid