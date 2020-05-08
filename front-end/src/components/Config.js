import React, { useState } from 'react'
import { Space, Modal, Form, Slider } from 'antd'
import User from '../data/User'
import {
    SettingFilled
} from '@ant-design/icons';
 
export default function ConfigButtons() {
    const [ modalState, setModalState ] = useState(false);
    const [ minutesToExpend, setMinutesToExpend] = useState(15);
    
    function goToUserConfig() {
        setModalState(true)
    }
    
    function handleCancel(){
        setModalState(false)
    }
    
    function saveUserConfig(){
        User.configs.minutes_to_expend = minutesToExpend
    }
    
    function handleOk(){
        setModalState(false)
        saveUserConfig()
    }
  
    return(
          <div className="configButtons">
              <Space size="middle">  
                <SettingFilled onClick={goToUserConfig} />
              </Space>
              <div className="configModal">
                <Modal onCancel={handleCancel} onOk={handleOk} title="Configurações" visible={modalState}>
                <Form>
                    <Form.Item>
                        <p>Quanto tempo você pode gastar diáriamente vendo videos esta semana?</p>
                        <Slider defaultValue={User.configs.minutes_to_expend} min={15} max={120} onChange={value => setMinutesToExpend(value)}/>
                        <p>{minutesToExpend} Minutos</p>
                    </Form.Item>
                </Form>
                </Modal>
              </div>
          </div>
      )
  }