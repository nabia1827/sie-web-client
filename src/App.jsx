import './App.css'
import React, { useState, useEffect } from "react";
import { ConfigProvider } from 'antd'
import RoutesApp from './routes/routes'
import { colors } from './utils/colors'

function App() {

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorBorder: colors.lightGray,
            colorPrimary:colors.blue,
            colorPrimaryHover: colors.blue,
            colorIconHover: colors.blue,
            fontFamily: "DM Sans",
            colorTextPlaceholder: colors.gray,
            colorLink:colors.lightBlack,
            colorLinkActive:colors.lightBlack,
            colorLinkHover:colors.blue,
            colorSuccess:colors.green,
            colorBgContainerDisabled:"rgba(244, 247, 254, 1)",
            colorTextDisabled:"rgb(146, 156, 173)"
          },
          components: {
            Input: {
              inputFontSizeLG:"14",
            },
            Menu: {
              darkItemSelectedBg:"#5271FF",
              collapsedWidth:"20",
            },
            Breadcrumb: {
              itemColor:"rgba(255, 255, 255, 0.6)",
              lastItemColor:"rgba(255, 255, 255, 0.6)",
              linkColor:"rgba(255, 255, 255, 0.6)",
              linkHoverColor:"rgba(255, 255, 255, 0.6)",
              separatorColor:"rgba(255, 255, 255, 0.6)",
            },
            Collapse: {
              headerBg:"white",
              contentPadding:"1.8em",
            },
            Progress: {
              remainingColor:"rgba(244, 247, 254, 1)"
            },
          },
          
        }}
      >
        <RoutesApp />
      </ConfigProvider>
      
    </>
  )
}

export default App