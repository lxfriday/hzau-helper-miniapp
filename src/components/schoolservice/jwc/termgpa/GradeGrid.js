/**
 * 考试成绩列表的单个 Grid
 * @time 2019/01/14
 * @author lxfriday
 */
import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';

import './GradeGrid.less';

class GradeGrid extends Component {
  render() {
    const {
      yearTerm,
      college,
      courseName,
      courseType,
      courseGrade,
      gpa,
      credit,
    } = this.props;
    return (
      <View className='components_schoolservice_jwc_termgpa_gradegrid'>
        <View className='card_wrapper'>
          <View className='yearterm_college'>
            <View className='yearterm'>
              {yearTerm}
            </View>
            <View className='college'>
              {college}
            </View>
          </View>
          <View className='course_name_type'>
            <View className='coursename'>
              {courseName}
            </View>
            <View className='coursetype'>
              {courseType}
            </View>
          </View>
          <View className='courseinfo_wrapper'>
            <View className='coursegrade'>
              <Text className='title'>成绩：</Text>
              <Text className='info'>{courseGrade}</Text>
            </View>
            <View className='gpa'>
              <Text className='title'>绩点：</Text>
              <Text className='info'>{gpa}</Text>
            </View>
            <View className='credit'>
              <Text className='title'>学分：</Text>
              <Text className='info'>{credit}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default GradeGrid;
