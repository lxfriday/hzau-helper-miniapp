/**
 * 现代教育技术中农信-登录页面
 * @time 2019/01/16
 * @author lxfriday
 */
import Taro, {Component} from '@tarojs/taro';
import {View, Text, Image, Ad} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import {AtButton, AtForm, AtInput, AtSwitch} from 'taro-ui';
import MaskLoading from '../../../../components/common/MaskLoading/MaskLoading';
import storage from '../../../../utils/storage';

import './index.less';

@connect(({loading, zizhuLogin}) => ({
  loading,
  zizhuLogin,
}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      verifyCode: '',
      saveInfo: true,
      redirectUrl: '', // 登录成功之后，跳转的页面，在进入页面的时候回传入这个地址
    };
  }

  config = {
    navigationBarTitleText: '现代教育技术中心-登录'
  };

  componentDidMount() {
    const params = this.$router.params;
    this.getVeriCode();
    this.getLocalData();
    this.setState({ redirectUrl: params.from });
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  // 获取存储在本地的数据
  getLocalData = () => {
    Taro.getStorage({
      key: storage.zizhu,
    })
      .then(({ data }) => {
        this.setState({
          username: data.studentId,
          password: data.password,
        });
      })
      .catch(() => {});
  };

  // 获取登录时的验证码等信息
  getVeriCode = () => {
    this.props.dispatch({
      type: 'zizhuLogin/getZizhuSignInCodeEffect',
    });
  };


  handleUsernameChange = (e) => {
    this.setState({ username: e });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e });
  };

  handleVeriCodeChange = (e) => {
    this.setState({ verifyCode: e });
  };

  // 点击验证码，切换
  handleChangeVeriCode = () => {
    this.getVeriCode();
  };

  // 点击登录
  handleLogin = () => {
    const {
      username,
      password,
      verifyCode,
      saveInfo,
      redirectUrl,
    } = this.state;

    this.props.dispatch({
      type: 'zizhuLogin/zizhuSignInEffect',
      payload: {
        data: {
          username,
          password,
          saveInfo,
          verifyCode,
          redirectUrl,
        },
      }
    });
  };

  // 开启关闭密码保存
  handleToggleSavePass = (value) => {
    this.setState({ saveInfo: value });
  };


  render() {
    const {
      loading,
      zizhuLogin,
    } = this.props;
    const {
      username,
      password,
      verifyCode,
      saveInfo,
    } = this.state;
    return (
      <View className='schoolservice_zizhu_login'>
        <View className='titleWrapper'>
          <Text className='title'>
            现代教育技术中心校园网
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
          <AtInput
            name='verifyCode'
            title='验证码'
            type='verifyCode'
            value={verifyCode}
            maxlength={6}
            onChange={this.handleVeriCodeChange}
          >
            <Image src={`data:image/png;base64,${zizhuLogin.img}`} onClick={this.handleChangeVeriCode} />
          </AtInput>
          <AtSwitch title='保存用户名密码' checked={saveInfo} onChange={this.handleToggleSavePass} />
        </AtForm>
        <View className='loginButtonWrapper'>
          <AtButton
            disabled={loading.effects['zizhuLogin/zizhuSignInEffect'] || !(username.length && password.length && verifyCode.length)}
            loading={loading.effects['zizhuLogin/zizhuSignInEffect']}
            className='loginButton'
            full
            type='primary'
            onClick={this.handleLogin}
          >
            登录
          </AtButton>
        </View>
        <View>
          <Ad unitId='adunit-e5d93002179fb122' />
        </View>
        <MaskLoading isOpened={loading.effects['zizhuLogin/getZizhuSignInCodeEffect']} />
      </View>
    );
  }
}

export default Login;
