import Taro, {Component} from '@tarojs/taro';
import {View} from '@tarojs/components';
import { AtTimeline } from 'taro-ui';

import NoticeTitle from '../../../common/NoticeTitle/NoticeTitle';

import './ExamResultGrid.less';

class ExamResultGrid extends Component {
  render() {
    const {
      examName,
      yearTerm,
      date,
      examId,
      result,
      engListeningResult,
      engReadingResult,
      engWritingingResult,
    } = this.props;

    let timeLineNode = null;
    // 英语等级考试则为非字符串，不是则为空字符串
    if (!!engListeningResult) {
      timeLineNode = (
        <AtTimeline
          items={[
            { title: '学年学期： ' + yearTerm },
            { title: '考试日期： ' + date },
            { title: '准考证号： ' + examId },
            { title: '成绩： ' + result, color: 'yellow' },
            { title: '听力： ' + engListeningResult },
            { title: '阅读： ' + engReadingResult },
            { title: '作文： ' + engWritingingResult },
          ]}
        />
      );
    } else {
      timeLineNode = (
        <AtTimeline
          items={[
            { title: '学年学期： ' + yearTerm },
            { title: '考试日期： ' + date },
            { title: '准考证号： ' + examId },
            { title: '成绩： ' + result, color: 'yellow' },
          ]}
        />
      );
    }

    return (
      <View className='components_schoolservice_jwc_examresultgrid'>
        <NoticeTitle
          title={examName}
        />
        <View className='timelineWrapper'>
          {timeLineNode}
        </View>
      </View>
    );
  }
}

export default ExamResultGrid;
