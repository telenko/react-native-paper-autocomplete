import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import style from './style';

const CenterView: React.FC = ({ children }) => {
  return <View style={style.main}>{children}</View>;
}

CenterView.defaultProps = {
  children: null,
};

CenterView.propTypes = {
  children: PropTypes.node,
};

export default CenterView;