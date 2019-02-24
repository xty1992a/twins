/**
 * Created by rule on 2019/2/24.
 */
import data from '../../static/mock.json'

const getList = guid => data.goodsList.filter(it => it.categoryGuid === guid)

export const getCategory = () => Promise.resolve({data: data.category, success: true})

export const getGoodsList = guid => Promise.resolve({data: getList(guid), success: true})
