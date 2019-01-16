/**
 * 搜索到的书显示列表
 * @time 2019/01/16
 * @author lxfriday
 */
import Taro, {Component} from '@tarojs/taro';
import {View, Text, Image} from '@tarojs/components';
import {AtActivityIndicator, AtDivider} from 'taro-ui';

import './List.less';

class List extends Component {
  render() {
    const {
      list,
      isLoading,
      loadEnded,
    } = this.props;
    const listNode = list.map((v, i) => (
      <View className='itemWrapper' key={i}>
        <View className='coverWrapper'>
          <Image
            src={v.bookImg}
            mode='aspectFill'
            className='cover'
          />
        </View>
        <View className='contentWrapper'>
          <View className=''>
            <Text className='title text-overflow'>
              {v.bookTitle}
            </Text>
          </View>
          <View className='authorAndPubYearWrapper'>
            <Text className='author'>{v.bookAuthor}</Text>
            <Text className='callNum'>{v.bookCallNum}</Text>
          </View>
          <View className='pressAndCalNumWrapper'>
            <Text className='press'>{v.bookPress}</Text>
            <Text className='pubYear'>{v.bookPublishYear}</Text>
          </View>
          <View className='bookCollectionInfo'>
            <Text className='total'>{'馆藏数： ' + v.bookCollectionInfo.total}</Text>
            <Text className='lend'>{'借出数： ' + v.bookCollectionInfo.lend}</Text>
          </View>
        </View>
      </View>
    ));

    return (
      <View className='components_schoolservice_library_searchbook_list'>
        {listNode}
        {isLoading && (
          <View className='loadingWrapper' >
            <AtActivityIndicator mode='center' />
          </View>
        )}
        {!isLoading && loadEnded && <AtDivider content='没有更多了' fontColor='#2d8cf0' lineColor='#2d8cf0' />}
      </View>
    );
  }
}

export default List;
