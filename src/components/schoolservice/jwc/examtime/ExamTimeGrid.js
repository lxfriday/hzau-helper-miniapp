import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import {AtTimeline} from 'taro-ui';

import NoticeTitle from '../../../common/NoticeTitle/NoticeTitle';

import './ExamTimeGrid.less';

class ExamTimeGrid extends Component {
  render() {
    const {
      courseName,
      location,
      date,
    } = this.props;

    return (
      <View className='components_schoolservice_jwc_examtimegrid'>
        <NoticeTitle title={courseName} />
        <View className='timelineWrapper'>
          <AtTimeline
            items={[
              { title: location },
              { title: date },
            ]}
          />
        </View>
      </View>
    );
  }
}

export default ExamTimeGrid;
