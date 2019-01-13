import Taro, {Component} from '@tarojs/taro';
import {
  View,
  Text,
} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import { AtForm, AtInput, AtButton, AtSwitch } from 'taro-ui';
import storage from '../../../../utils/storage';

import './index.less';

@connect(({
  loading,
}) => ({ loading }))
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      saveInfo: true,
    };
  }

  config = {
    navigationBarTitleText: '环湖跑体测查询-登录'
  };

  componentDidMount() {
    this.getLocalData();
  }

  // 获取存储在本地的数据
  getLocalData = () => {
    Taro.getStorage({
      key: storage.pe,
    })
      .then(({ data }) => {
        this.setState({
          username: data.cardID,
          password: data.password,
        });
      })
      .catch(() => {});
  };

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
      saveInfo,
    } = this.state;
    this.props.dispatch({
      type: 'pe/getPEGradeEffect',
      payload: {
        data: {
          cardID: username,
          password,
          saveInfo,
        },
      }
    });
  };

  // 清空数据
  clearData = () => {
    this.setState({
      username: '',
      password: '',
    });
  };

  // 开启关闭密码保存
  handleToggleSavePass = (value) => {
    this.setState({ saveInfo: value });
  };

  render() {
    const {
      loading,
    } = this.props;
    const {
      username,
      password,
      saveInfo,
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
          <AtSwitch title='保存用户名密码' checked={saveInfo} onChange={this.handleToggleSavePass} />
        </AtForm>
        <View className='loginButtonWrapper'>
          <AtButton
            disabled={loading.effects['pe/getPEGradeEffect'] || !(username.length && password.length)}
            loading={loading.effects['pe/getPEGradeEffect']}
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
