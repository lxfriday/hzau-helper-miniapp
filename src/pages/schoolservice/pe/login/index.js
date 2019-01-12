import Taro, {Component} from '@tarojs/taro';
import {
  View,
  Text,
} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import { AtForm, AtInput, AtButton } from 'taro-ui';

import './index.less';

@connect(() => ({}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }


  config = {
    navigationBarTitleText: '环湖跑体测查询-登录'
  };

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  handleUsernameChange = (e) => {
    this.setState({ username: e });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e });
  };

  // 点击登录
  handleLogin = () => {
    const {
      username,
      password,
    } = this.state;
    console.log({
      username,
      password,
    });
  };

  // 清空数据
  clearData = () => {
    this.setState({
      username: '',
      password: '',
    });
  };

  render() {
    const {
      username,
      password,
    } = this.state;
    return (
      <View className='schoolservice_pe_login'>
        <View className='titleWrapper'>
          <Text className='title'>
            体育管理系统
          </Text>
        </View>
        <AtForm className='form'>
          <AtInput
            name='username'
            title='学号'
            type='text'
            value={username}
            maxlength={20}
            onChange={this.handleUsernameChange}
          />
          <AtInput
            name='password'
            title='密码'
            type='password'
            value={password}
            maxlength={50}
            onChange={this.handlePasswordChange}
          />
        </AtForm>
        <View className='loginButtonWrapper'>
          <AtButton
            disabled={!(username.length && password.length)}
            className='loginButton'
            full
            type='primary'
            onClick={this.handleLogin}
          >
            登录
          </AtButton>
        </View>
      </View>
    );
  }
}

export default Index;
