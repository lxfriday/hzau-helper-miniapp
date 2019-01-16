import Taro, {Component} from '@tarojs/taro';
import {View, Picker, ScrollView} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import {AtSearchBar, AtActivityIndicator, AtListItem} from 'taro-ui';

import List from '../../../../components/schoolservice/library/searchBook/List';
import MaskLoading from '../../../../components/common/MaskLoading/MaskLoading';

import './index.less';

@connect(({librarySearchBook, loading}) => ({
  librarySearchBook,
  loading,
}))
class Index extends Component {
  constructor(props) {
    super(props);
    this.searchTypeKey = [
      'WRD',
      'WTI',
      'TIT',
      'WAU',
      'WSU',
      'WPU',
    ];
    this.searTypeDesc = [
      '所有字段搜索',
      '题名关键字',
      '题名（精确匹配）',
      '著者',
      '主题词',
      '出版社',
    ];
    this.state = {
      keyword: '', // 搜索的关键字
      searchTypeIndex: '0',
    };
  }
  config = {
    navigationBarTitleText: '馆藏书搜索'
  };

  componentDidMount() {
    this.getPathToken();
  }

  handleInput = (value) => {
    this.setState({ keyword: value });
  };

  // 点击按钮进行搜索
  handleSearch = () => {
    const {
      keyword,
      searchTypeIndex,
    } = this.state;
    const searchType = this.searchTypeKey[searchTypeIndex];

    this.props.dispatch({
      type: 'librarySearchBook/getLibrarySearchBookEffect',
      payload: {
        data: {
          keyword,
          searchType,
        },
      },
    });
  };

  // 馆藏系统特色 pathtoken 加载
  getPathToken = () => {
    this.props.dispatch({
      type: 'librarySearchBook/getLibraryPathTokenEffect',
    });
  };

  // 选择类型
  handleSelectType = (e) => {
    this.setState({ searchTypeIndex: e.detail.value });
  };

  handleLoadMore = () => {
    const {
      loading,
      librarySearchBook: {
        pageInfo,
      },
    } = this.props;
    const isLoadingNextPage = loading.effects['librarySearchBook/getLibraryPageRecordEffect'];
    // 是否已经加载完了
    if(Number(pageInfo.recordTo) < Number(pageInfo.recordTotal)) {
      if(!isLoadingNextPage) {
        this.props.dispatch({
          type: 'librarySearchBook/getLibraryPageRecordEffect',
        });
      }
    }
  };

  render() {
    const {
      librarySearchBook: {
        bookInfo,
        pageInfo,
      },
      loading,
    } = this.props;
    const {
      keyword,
      searchTypeIndex,
    } = this.state;

    const isSearchLoading = !!loading.effects['librarySearchBook/getLibrarySearchBookEffect'];
    const isLoadingNextPage = !!loading.effects['librarySearchBook/getLibraryPageRecordEffect'];
    const loadEnded = pageInfo.recordTo === pageInfo.recordTotal;

    return (
      <ScrollView
        scrollY
        onScrollToLower={this.handleLoadMore}
        className='schoolservice_library_search'
      >
        {/* 搜索框 */}
        <AtSearchBar
          maxlength={100}
          value={keyword}
          onChange={this.handleInput}
          onActionClick={this.handleSearch}
        />
        {/* 搜索类型选择 */}
        <Picker
          mode='selector'
          range={this.searTypeDesc}
          onChange={this.handleSelectType}
        >
          <AtListItem title='搜索类型' extraText={this.searTypeDesc[searchTypeIndex]} />
        </Picker>
        <List
          list={bookInfo}
          isLoading={isLoadingNextPage}
          // 是否加载完了
          loadEnded={loadEnded}
        />
        <MaskLoading isOpened={isSearchLoading} />
      </ScrollView>
    );
  }
}

export default Index;
