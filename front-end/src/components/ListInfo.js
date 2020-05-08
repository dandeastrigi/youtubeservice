import React, { useState } from 'react'
import { Space, Modal } from 'antd'
import {
    InfoCircleOutlined
} from '@ant-design/icons';

export default function ListInfo() {
    const [ modalState, setModalState ] = useState(false);

    function showVideoListInfo() {
        setModalState(true)
    }
    
    function handleCancel(){
        setModalState(false)
    }
    
    function handleOk(){
        setModalState(false)
    }
 
    return(
          <div className="infoButton">
              <Space size="middle">  
                <InfoCircleOutlined onClick={showVideoListInfo} />
              </Space>
              <div className="infoModal">
                <Modal onCancel={handleCancel} onOk={handleOk} title="Informações" visible={modalState}>
                    <p>Not implemented yet</p>
                </Modal>
              </div>
          </div>
      )
  }