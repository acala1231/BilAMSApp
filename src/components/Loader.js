import React from 'react'
import { useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native';

import { loaderStlye } from 'styles/styles'


const Loader = () => {
  const isLoading = useSelector(state => state.loader.isLoading);

  return (
    <>
      {isLoading ?
        <ActivityIndicator
          style={loaderStlye.indicator}
          size={'large'}
        />
        :
        null
      }
    </>
  )
};

export default Loader;