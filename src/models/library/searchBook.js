import Taro from '@tarojs/taro';
import {
  libraryPathTokenService,
  librarySearchSuggestService,
  librarySearchBookService,
  libraryPageRecordService,
} from '../../services/API';

const initialState = {
  pathToken: '', // 馆藏系统特色 pathtoken /F/ 后面的一串字符串
  suggest: [
    // ['java', 1455], // [书名,检索次数]
    // ['javascript', 164],
    // ['java web', 140],
    // ['java游戏编程', 123],
    // ['java从入门到精通', 79],
    // ['java编程思想', 74],
    // ['java 游戏 编程', 66],
    // ['java 从 入门 到 精通', 45],
  ],
  bookInfo: [
  ],
  pageInfo: {
    recordFrom: '0', // 当前页的起始记录条
    recordTo: '0', // 当前页的结束记录条
    recordTotal: '10000', // 系统里面总的记录条数
    recordMax: '0', // 最大显示记录数（系统默认为1000）
  },
  homeUrl: '', // 在加载下一页的时候用到
};

export default {
  namespace: 'librarySearchBook',
  state: {
    ...initialState,
  },
  effects: {
    * getLibraryPathTokenEffect(_, { put, call }) {
      const result = yield call(libraryPathTokenService);
      if(result && !result.errno) {
        const rdata = result.data;

        yield put({
          type: 'saveData',
          payload: {
            pathToken: rdata.pathToken,
          },
        });
      } else {
        Taro.showToast({
          title: '获取 pathtoken 基础信息失败',
          icon: 'none',
        });
      }
    },
    * getLibrarySearchSuggestEffect({ payload: { data } }, { put, call }) {
      const result = yield call(librarySearchSuggestService, {
        keyword: data.keyword,
      });
      if(result && !result.errno) {
        const { suggest } = result.data;

        const suggestArr = [];
        Object.keys(suggest).map(v => {
          suggestArr.push([
            v,
            suggest[v],
          ]);
        });

        yield put({
          type: 'saveData',
          payload: {
            suggest: suggestArr,
          },
        });
      } else {
        Taro.showToast({
          title: '获取搜索推荐信息失败',
          icon: 'none',
        });
      }
    },
    * getLibrarySearchBookEffect({ payload: { data } }, { put, call, select }) {
      const librarySearchBook = yield select(state => state.librarySearchBook);

      const result = yield call(librarySearchBookService, {
        searchType: data.searchType,
        keyword: data.keyword,
        pathToken: librarySearchBook.pathToken,
      });

      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveData',
          payload: {
            bookInfo: rdata.bookInfo,
            pageInfo: rdata.pageInfo,
            homeUrl: rdata.homeUrl,
          },
        });

        yield put({
          type: 'getLibraryPathTokenEffect',
        });
      } else {
        Taro.showToast({
          title: '馆藏书搜索失败，可能没有该类型的搜索结果',
          icon: 'none',
        });
      }
    },
    * getLibraryPageRecordEffect(_, { put, call, select }) {
      const librarySearchBook = yield select(state => state.librarySearchBook);
      const result = yield call(libraryPageRecordService, {
        start: String(Number(librarySearchBook.pageInfo.recordTo) + 1),
        homeUrl: librarySearchBook.homeUrl,
      });
      if(result && !result.errno) {
        const rdata = result.data;
        yield put({
          type: 'saveLibraryPageRecord',
          payload: {
            bookInfo: rdata.bookInfo,
            pageInfo: rdata.pageInfo,
          },
        });
      } else {
        Taro.showToast({
          title: '馆藏书加载失败',
          icon: 'none',
        });
      }
    },
  },
  reducers: {
    // 退出页面之后重置页面
    resetData() {
      return {
        ...initialState,
      };
    },
    saveData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    saveLibraryPageRecord(state, { payload }) {
      return {
        ...state,
        bookInfo: [...state.bookInfo, ...payload.bookInfo],
        pageInfo: payload.pageInfo,
      };
    },
  },
};
